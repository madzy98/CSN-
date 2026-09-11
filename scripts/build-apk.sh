#!/usr/bin/env bash
# Build a sideloadable, signed CSN+ APK with the web app bundled in assets.
set -euo pipefail

ROOT=/workspace
APP="$ROOT/android-app"
SDK="$ROOT/android-sdk"
BT="$SDK/build-tools/34.0.0"
PL="$SDK/platforms/android-34/android.jar"
KS="$APP/app/csnplus.jks"
WWW="$APP/app/src/main/assets/www"
WORK=/tmp/csn-apk-build
JAVA_HOME="${JAVA_HOME:-/usr/lib/jvm/java-17-openjdk-amd64}"
export JAVA_HOME
export PATH="$JAVA_HOME/bin:$PATH"

echo "[apk] packing web assets"
rm -rf "$WWW"
mkdir -p "$WWW"

copy_tree() {
  src="$1"
  if [ ! -d "$src" ]; then return; fi
  tar -C "$src" --exclude='*.apk' --exclude='*.zip' --exclude='.DS_Store' -cf - . | tar -C "$WWW" -xf -
}
copy_tree "$ROOT/public"
copy_tree "$ROOT/.vercel/output/static"
copy_tree "$ROOT/.output/public"
if [ -d "$ROOT/dist/assets" ]; then
  mkdir -p "$WWW/assets"
  tar -C "$ROOT/dist/assets" -cf - . | tar -C "$WWW/assets" -xf -
fi
find "$WWW" \( -name '*.apk' -o -name '*.zip' \) -delete

echo "[apk] capturing production HTML"
HTML_OK=0
for port in 8081 4173 3000; do
  if curl -fsS -o "$WWW/index.html" "http://127.0.0.1:${port}/" 2>/dev/null; then
    if grep -q '<div' "$WWW/index.html"; then
      HTML_OK=1
      echo "[apk] HTML from :$port ($(wc -c < "$WWW/index.html") bytes)"
      break
    fi
  fi
done
if [ "$HTML_OK" != 1 ]; then
  echo "[apk] ERROR: no production HTML. Start vite preview first." >&2
  exit 1
fi

python3 - << 'PY'
from pathlib import Path
import re
p = Path("/workspace/android-app/app/src/main/assets/www/index.html")
raw = p.read_bytes().replace(b"\x00", b"")
text = raw.decode("utf-8", "replace")
text = re.sub(r'<script src="https://grok\.com/[^"]*" defer></script>', "", text)
p.write_text(text, encoding="utf-8")
print("[apk] sanitized index.html", p.stat().st_size)
PY

# Rewrite absolute origin-less paths stay as /... — WebView intercepts app.csnplus.lv.

echo "[apk] launcher icons"
python3 - << 'PY'
from PIL import Image
from pathlib import Path
src = Path("/workspace/play-store/icon-512.png")
im = Image.open(src).convert("RGBA")
sizes = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}
root = Path("/workspace/android-app/app/src/main/res")
for folder, px in sizes.items():
    d = root / folder
    d.mkdir(parents=True, exist_ok=True)
    im.resize((px, px), Image.Resampling.LANCZOS).save(d / "ic_launcher.png", "PNG")
print("icons ok")
PY

echo "[apk] compile resources"
rm -rf "$WORK"
mkdir -p "$WORK/compiled" "$WORK/gen" "$WORK/classes" "$WORK/dex"
find "$APP/app/src/main/res" -type f | while read -r f; do
  "$BT/aapt2" compile -o "$WORK/compiled/" "$f"
done

FLAT=( "$WORK/compiled/"*.flat )
"$BT/aapt2" link \
  -o "$WORK/base.apk" \
  -I "$PL" \
  --manifest "$APP/app/src/main/AndroidManifest.xml" \
  --java "$WORK/gen" \
  --auto-add-overlay \
  -A "$APP/app/src/main/assets" \
  --min-sdk-version 24 \
  --target-sdk-version 34 \
  --version-code 17000 \
  --version-name 1.7.0 \
  "${FLAT[@]}"

R_JAVA=$(find "$WORK/gen" -name 'R.java' | head -1)
echo "[apk] javac $R_JAVA"
javac --release 17 -classpath "$PL" -d "$WORK/classes" \
  "$R_JAVA" \
  "$APP/app/src/main/java/lv/csnplus/app/MainActivity.java"

echo "[apk] d8"
CLASS_FILES=$(find "$WORK/classes" -name '*.class' | tr '\n' ' ')
# shellcheck disable=SC2086
"$BT/d8" --release --lib "$PL" --min-api 24 --output "$WORK/dex" $CLASS_FILES

echo "[apk] merge dex uncompressed + v1 sign"
python3 - << PY
import shutil, zipfile
from pathlib import Path
work = Path("$WORK")
src = work / "base.apk"
dst = work / "with-dex.apk"
shutil.copy(src, dst)
# aapt2 already aligned resources.arsc as STORED; add dex uncompressed
with zipfile.ZipFile(dst, "a") as z:
    z.write(work / "dex" / "classes.dex", "classes.dex", compress_type=zipfile.ZIP_STORED)
print("merged dex")
PY

"$BT/zipalign" -f -p 4 "$WORK/with-dex.apk" "$WORK/aligned.apk"
# min-sdk 21 forces v1 JAR signature so OEM installers accept sideload
"$BT/apksigner" sign \
  --ks "$KS" \
  --ks-key-alias csnplus \
  --ks-pass pass:csnplus-upload \
  --key-pass pass:csnplus-upload \
  --min-sdk-version 21 \
  --v1-signing-enabled true \
  --v2-signing-enabled true \
  --v3-signing-enabled true \
  --out "$WORK/CSNplus.apk" \
  "$WORK/aligned.apk"

"$BT/apksigner" verify --verbose "$WORK/CSNplus.apk" | head -20
"$BT/aapt" dump badging "$WORK/CSNplus.apk" | head -12
ls -lh "$WORK/CSNplus.apk"

cp -f "$WORK/CSNplus.apk" "$ROOT/public/CSNplus.apk"
cp -f "$WORK/CSNplus.apk" "$ROOT/public/CSNplus-1.7.0.apk"
cp -f "$WORK/CSNplus.apk" "$ROOT/CSNplus.apk"
cp -f "$WORK/CSNplus.apk" "$ROOT/CSNplus-1.7.0.apk"
cp -f "$WORK/CSNplus.apk" "$ROOT/play-store/CSNplus.apk"
echo "[apk] done $(wc -c < "$ROOT/public/CSNplus.apk") bytes"
