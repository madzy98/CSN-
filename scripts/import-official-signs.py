#!/usr/bin/env python3
"""Import official CSN plates from Sia Signum. Container convert only. No redraw."""

from __future__ import annotations

import io
import json
import re
import time
from collections import defaultdict
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path("/workspace")
OUT_DIR = ROOT / "public" / "signs"
DATA_PATH = ROOT / "src" / "data" / "officialSigns.json"
LEGAL = "https://likumi.lv/ta/id/274865-celu-satiksmes-noteikumi#piel4"
SIGNUM = "https://celuaprikojums.lv"
UA = "Mozilla/5.0 CSN-plus-asset-import"

# Official names from CSN 4. pielikums (current MK 279). Duplicate numbers keep
# the appendix title; variants are the same numbered plate family.
NAMES: dict[str, str] = {
    "101": "Vienādas nozīmes ceļu krustojums",
    "102": "Lokveida krustojums",
    "103": "Bīstams pagrieziens",
    "104": "Bīstams pagrieziens",
    "105": "Bīstami pagriezieni",
    "106": "Bīstami pagriezieni",
    "107": "Ceļa sašaurinājums",
    "108": "Ceļa sašaurinājums",
    "109": "Ceļa sašaurinājums",
    "110": "Stāvs lejupceļš",
    "111": "Stāvs augšupceļš",
    "112": "Nelīdzens ceļš",
    "113": "Ātrumvalnis",
    "114": "Ceļa seguma maiņa",
    "115": "Slidens ceļš",
    "116": "Uzbērta grants vai šķembas",
    "117": "Akmeņu nogruvumi",
    "118": "Uz ceļa strādā",
    "119": "Ceļš ar bīstamām nomalēm",
    "120": "Gājēju pāreja",
    "121": "Bērni",
    "122": "Divvirzienu satiksme",
    "123": "Luksofors",
    "124": "Mājdzīvnieki",
    "125": "Savvaļas dzīvnieki",
    "126": "Paceļams tilts",
    "127": "Krastmala",
    "128": "Sānvējš",
    "129": "Zemu lidojošas lidmašīnas",
    "130": "Velosipēdu ceļa šķērsošana",
    "131": "Tramvaja sliežu šķērsošana",
    "132": "Dzelzceļa pārbrauktuve ar barjeru",
    "133": "Dzelzceļa pārbrauktuve bez barjeras",
    "134": "Viensliežu dzelzceļa pārbrauktuve",
    "135": "Daudzsliežu dzelzceļa pārbrauktuve",
    "136": "Tuvojas dzelzceļa pārbrauktuve",
    "137": "Tuvojas dzelzceļa pārbrauktuve",
    "138": "Tuvojas dzelzceļa pārbrauktuve",
    "139": "Tuvojas dzelzceļa pārbrauktuve",
    "140": "Tuvojas dzelzceļa pārbrauktuve",
    "141": "Tuvojas dzelzceļa pārbrauktuve",
    "142": "Bīstami",
    "143": "Sastrēgums",
    "201": "Galvenais ceļš",
    "202": "Galvenā ceļa beigas",
    "203": "Krustojums ar mazāk svarīgu ceļu",
    "204": "Krustojums ar mazāk svarīgu ceļu",
    "205": "Krustojums ar mazāk svarīgu ceļu",
    "206": "Dodiet ceļu",
    "207": "Neapstājoties tālāk braukt aizliegts",
    "208": "Priekšroka pretim braucošajiem",
    "209": "Priekšroka attiecībā pret pretim braucošajiem",
    "301": "Iebraukt aizliegts",
    "302": "Braukt aizliegts",
    "303": "Mehāniskajiem transportlīdzekļiem braukt aizliegts",
    "304": "Motocikliem braukt aizliegts",
    "305": "Velosipēdiem braukt aizliegts",
    "306": "Kravas automobiļiem braukt aizliegts",
    "307": "Ar piekabi braukt aizliegts",
    "308": "Traktoriem braukt aizliegts",
    "309": "Gājējiem iet aizliegts",
    "310": "Platuma ierobežojums",
    "311": "Augstuma ierobežojums",
    "312": "Masas ierobežojums",
    "313": "Ass slodzes ierobežojums",
    "314": "Garuma ierobežojums",
    "315": "Nogriezties pa labi aizliegts",
    "316": "Nogriezties pa kreisi aizliegts",
    "317": "Apgriezties braukšanai pretējā virzienā aizliegts",
    "318": "Minimālās distances ierobežojums",
    "319": "Apdzīt aizliegts",
    "320": "Apdzīšanas aizliegums beidzas",
    "321": "Kravas automobiļiem apdzīt aizliegts",
    "322": "Kravas automobiļiem apdzīšanas aizliegums beidzas",
    "323": "Maksimālā ātruma ierobežojums",
    "324": "Maksimālā ātruma ierobežojums beidzas",
    "325": "Skaņas signālu lietot aizliegts",
    "326": "Apstāties aizliegts",
    "327": "Stāvēt aizliegts",
    "328": "Nepāra datumos stāvēt aizliegts",
    "329": "Pāra datumos stāvēt aizliegts",
    "330": "Visi ierobežojumi beidzas",
    "331": "Muita",
    "332": "Policija",
    "333": "Tālāk braukt bīstami",
    "334": "Transportlīdzekļiem ar bīstamu kravu braukt aizliegts",
    "401": "Braukt taisni",
    "402": "Braukt pa labi",
    "403": "Braukt pa kreisi",
    "404": "Braukt taisni vai pa labi",
    "405": "Braukt taisni vai pa kreisi",
    "406": "Braukt pa labi vai pa kreisi",
    "407": "Braukt pa labi",
    "408": "Braukt pa kreisi",
    "409": "Braukt pa loku",
    "410": "Šķēršli apbraukt pa labo pusi",
    "411": "Šķēršli apbraukt pa kreiso pusi",
    "412": "Šķēršli apbraukt pa labo vai pa kreiso pusi",
    "413": "Velosipēdu ceļš",
    "414": "Velosipēdu ceļa beigas",
    "415": "Gājēju ceļš",
    "416": "Gājēju ceļa beigas",
    "417": "Kopīgs gājēju un velosipēdu ceļš",
    "418": "Kopīga gājēju un velosipēdu ceļa beigas",
    "419": "Gājēju un velosipēdu ceļš",
    "420": "Gājēju un velosipēdu ceļa beigas",
    "421": "Gājēju un velosipēdu ceļš",
    "422": "Gājēju un velosipēdu ceļa beigas",
    "423": "Minimālā ātruma ierobežojums",
    "424": "Minimālā ātruma ierobežojuma beigas",
    "425": "Transportlīdzekļiem ar bīstamu kravu braukt taisni",
    "426": "Transportlīdzekļiem ar bīstamu kravu braukt pa labi",
    "427": "Transportlīdzekļiem ar bīstamu kravu braukt pa kreisi",
    "501": "Vienvirziena ceļš",
    "502": "Vienvirziena ceļa beigas",
    "503": "Izbraukšana uz vienvirziena ceļa",
    "504": "Izbraukšana uz vienvirziena ceļa",
    "505": "Josla pasažieru sabiedriskajiem transportlīdzekļiem",
    "506": "Joslas pasažieru sabiedriskajiem transportlīdzekļiem beigas",
    "507": "Ceļš ar joslu pasažieru sabiedriskajiem transportlīdzekļiem",
    "508": "Ceļa ar joslu pasažieru sabiedriskajiem transportlīdzekļiem beigas",
    "509": "Izbraukšana uz ceļa ar joslu pasažieru sabiedriskajiem transportlīdzekļiem",
    "510": "Izbraukšana uz ceļa ar joslu pasažieru sabiedriskajiem transportlīdzekļiem",
    "511": "Minimālā braukšanas ātruma ierobežojums joslās",
    "512": "Maksimālā braukšanas ātruma ierobežojums joslās",
    "513": "Braukšanas virzieni joslās",
    "514": "Braukšanas virziens joslā",
    "515": "Braukšanas virziens joslā",
    "516": "Braukšanas virziens joslā",
    "517": "Braukšanas virzieni joslā",
    "518": "Braukšanas virzieni joslā",
    "519": "Apdzīvotas vietas sākums",
    "520": "Apdzīvotas vietas beigas",
    "521": "Pilsētas vai ciema nosaukums",
    "522": "Pilsētas vai ciema nosaukums",
    "523": "Stāvēšanas aizlieguma zona",
    "524": "Stāvēšanas aizlieguma zonas beigas",
    "525": "Maksimālā ātruma ierobežojuma zona",
    "526": "Maksimālā ātruma ierobežojuma zonas beigas",
    "527": "Gājēju ceļu zona",
    "528": "Gājēju ceļu zonas beigas",
    "529": "Stāvvietu zona",
    "530": "Stāvvietu zonas beigas",
    "531": "Ieteicamā ātruma zona",
    "532": "Ieteicamā ātruma zonas beigas",
    "533": "Dzīvojamā zona",
    "534": "Dzīvojamās zonas beigas",
    "535": "Gājēju pāreja",
    "536": "Gājēju pāreja",
    "537": "Stāvvieta",
    "538": "Stāvvietas beigas",
    "539": "Maksas stāvvieta",
    "540": "Maksas stāvvietas beigas",
    "541": "Autobusa un trolejbusa pietura",
    "542": "Tramvaja pietura",
    "543": "Vieglo taksometru stāvvieta",
    "544": "Tunelis",
    "545": "Tuneļa beigas",
    "546": "Apstāšanās vieta",
    "547": "Pierobežas sākums",
    "548": "Pierobežas beigas",
    "549": "Pierobežas joslas sākums",
    "550": "Pierobežas joslas beigas",
    "551": "Robežšķērsošanas vieta",
    "552": "Ātrgaitas ceļš",
    "553": "Ātrgaitas ceļa beigas",
    "554": "Piespiedu apstāšanās vieta",
    "555": "Apdzīvotas vietas sākums",
    "556": "Apdzīvotas vietas beigas",
    "601": "Medicīniskās palīdzības punkts",
    "602": "Slimnīca",
    "603": "Degvielas uzpildes stacija",
    "604": "Stāvparks",
    "605": "Tehniskās apkopes punkts",
    "606": "Automobiļu mazgātava",
    "607": "Telefons",
    "608": "Restorāns",
    "609": "Kafejnīca",
    "610": "Viesnīca, motelis vai viesu māja",
    "611": "Jaunatnes tūrisma mītne",
    "612": "Kempings",
    "613": "Kempingpiekabju stāvvieta",
    "614": "Kempings un kempingpiekabju stāvvieta",
    "615": "Atpūtas vieta",
    "616": "Gājēju maršruts",
    "617": "Tualete",
    "618": "Peldvieta vai peldbaseins",
    "619": "Tūrisma informācija",
    "620": "Policija",
    "621": "Ceļu policija",
    "622": "Pasts",
    "623": "Radiokanāls ceļu satiksmes informācijas sniegšanai",
    "624": "Lidosta (lidlauks)",
    "625": "Autoosta",
    "626": "Dzelzceļa stacija",
    "627": "Jūras pasažieru stacija",
    "628": "Prāmis",
    "629": "Kravas osta",
    "630": "Informācijas bloks",
    "631": "Ievērojama vieta",
    "632": "Ugunsdzēšamais aparāts",
    "633": "Avārijas tālrunis",
    "634": "Lauku tūrisma mītne",
    "701": "Iepriekšējs virzienu rādītājs",
    "702": "Iepriekšējs virzienu rādītājs",
    "703": "Virzienu rādītājs",
    "704": "Virziena rādītājs",
    "705": "Virziena rādītājs",
    "706": "Virziena rādītājs",
    "707": "Attālumu rādītājs",
    "708": "Ūdensšķēršļa nosaukums",
    "709": "Braukšanas shēma",
    "710": "Šķēršļa apbraukšanas virziens",
    "711": "Strupceļš",
    "712": "Iepriekšējs virziena rādītājs strupceļam",
    "713": "Iepriekšējs virziena rādītājs strupceļam",
    "714": "Joslas sākums",
    "715": "Joslas sākums",
    "716": "Joslas beigas",
    "717": "Joslas beigas",
    "718": "Braukšanas virzieni joslās",
    "719": "Braukšanas virzieni joslās",
    "720": "Braukšanas virzieni joslās",
    "721": "Joslas piekļaušanās pamatjoslām",
    "722": "Joslas piekļaušanās pamatjoslām",
    "723": "Apgriešanās vieta",
    "724": "Satiksmes ierobežojumi Latvijā",
    "725": "Ieteicamais ātrums",
    "726": "Kravas automobiļu braukšanas virziens",
    "727": "Kravas automobiļu braukšanas virziens",
    "728": "Kravas automobiļu braukšanas virziens",
    "729": "Gājēju apakšzemes vai virszemes pāreja",
    "730": "Apbraukšanas ceļa shēma",
    "731": "Apbraukšanas ceļa virziens",
    "732": "Apbraukšanas ceļa virziens",
    "733": "Apbraukšanas ceļa virziens",
    "734": "Apbraukšanas ceļa beigas",
    "735": "Iepriekšējs norādītājs pārkārtoties",
    "736": "Iepriekšējs norādītājs pārkārtoties",
    "737": "Iepriekšējs norādītājs pārkārtoties",
    "738": "Iepriekšējs norādītājs pārkārtoties",
    "739": "Kilometru rādītājs",
    "740": "Ceļa numurs",
    "741": "Ceļa numurs",
    "742": "Ceļa numurs",
    "743": "Ceļa numurs un virziens",
    "744": "Ceļa numurs un virziens",
    "745": "Ceļa numurs un virziens",
    "746": "Maiņvirziena satiksme",
    "747": "Maiņvirziena satiksmes beigas",
    "748": "Izbraukšana uz ceļa, kur organizēta maiņvirziena satiksme",
    "749": "Valsts nosaukums",
    "750": "Administratīvās teritorijas nosaukums",
    "751": "Tūrisma objektu teritorija",
    "752": "Avārijas izeja",
    "753": "Avārijas izejas virziens",
    "801": "Attālums līdz objektam",
    "802": "Attālums līdz objektam",
    "803": "Darbības zona",
    "804": "Darbības zona",
    "805": "Darbības zona",
    "806": "Darbības zona",
    "807": "Darbības zona",
    "808": "Darbības zona",
    "809": "Darbības zona",
    "810": "Darbības zona",
    "811": "Darbības zona",
    "812": "Darbības zona",
    "813": "Darbības zona",
    "814": "Darbības virziens",
    "815": "Darbības virzieni",
    "816": "Darbības virziens",
    "817": "Braukšanas josla",
    "818": "Transportlīdzekļa veids",
    "819": "Transportlīdzekļa veids",
    "820": "Transportlīdzekļa veids",
    "821": "Transportlīdzekļa veids",
    "822": "Transportlīdzekļa veids",
    "823": "Transportlīdzekļa veids",
    "824": "Transportlīdzekļa veids",
    "825": "Darbdienās",
    "826": "Sestdienās, svētdienās un svētku dienās",
    "827": "Darbības laiks",
    "828": "Darbības laiks",
    "829": "Darbības laiks",
    "830": "Transportlīdzekļa novietojuma veids stāvvietā",
    "831": "Transportlīdzekļa novietojuma veids stāvvietā",
    "832": "Transportlīdzekļa novietojuma veids stāvvietā",
    "833": "Transportlīdzekļa novietojuma veids stāvvietā",
    "834": "Transportlīdzekļa novietojuma veids stāvvietā",
    "835": "Transportlīdzekļa novietojuma veids stāvvietā",
    "836": "Transportlīdzekļa novietojuma veids stāvvietā",
    "837": "Transportlīdzekļa novietojuma veids stāvvietā",
    "838": "Transportlīdzekļa novietojuma veids stāvvietā",
    "839": "Transportlīdzekļa novietojuma veids stāvvietā",
    "840": "Stāvēšanas laiks",
    "841": "Automobiļu apskates vieta",
    "842": "Pilnas masas ierobežojums",
    "843": "Neredzīgi gājēji",
    "844": "Personām ar invaliditāti",
    "845": "Mitrs segums",
    "846": "Slidens segums",
    "847": "Galvenā ceļa virziens",
    "848": "Strādā autoevakuators",
    "849": "Pārējā papildinformācija",
    "850": "Ātrumvalnis",
    "851": "Maksas stāvvietas darbības laiks",
    "852": "Izslēgt motoru",
    "853": "Kontroles ierīce",
}

SKIP_IMG = re.compile(
    r"cela_zime|stabs|staba|stativs|kronstein|logo|icon|menu|noma|barjera",
    re.I,
)
NUM_FILE = re.compile(r"/(\d{3,4})(?:-\d+x\d+)?\.(?:jpe?g|png|webp)$", re.I)


def session() -> requests.Session:
    s = requests.Session()
    s.headers["User-Agent"] = UA
    return s


def parse_sitemap(s: requests.Session) -> dict[str, list[str]]:
    xml = s.get(f"{SIGNUM}/product-sitemap.xml", timeout=60).text
    locs = re.findall(r"<loc><!\[CDATA\[(.*?)\]\]></loc>", xml) or re.findall(
        r"<loc>(.*?)</loc>", xml
    )
    by: dict[str, list[str]] = defaultdict(list)
    pat = re.compile(r"/product/cela-zime-nr-(\d+)(-f-|-f/|/)", re.I)
    plain = re.compile(r"/product/cela-zime-nr-(\d+)-", re.I)
    for u in locs:
        if "cela-zime-nr-" not in u:
            continue
        if re.search(r"nr-\d+-f(?:-|/)", u):
            m = re.search(r"nr-(\d+)-f", u)
            if m:
                by[m.group(1)].append("F:" + u)
            continue
        m = plain.search(u)
        if m:
            by[m.group(1)].append(u)
    return by


def pick_product(urls: list[str]) -> str | None:
    normal = [u for u in urls if not u.startswith("F:")]
    return normal[0] if normal else None


def save_png(raw: bytes, dest: Path) -> bool:
    im = Image.open(io.BytesIO(raw))
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if "A" in im.mode else "RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "PNG")
    return dest.exists() and dest.stat().st_size > 200


def try_cdn(s: requests.Session, number: str) -> bytes | None:
    for url in (
        f"{SIGNUM}/wp-content/uploads/2018/10/{number}.jpg",
        f"{SIGNUM}/wp-content/uploads/2018/10/{number}.png",
        f"{SIGNUM}/wp-content/uploads/2018/10/{number}.JPG",
    ):
        r = s.get(url, timeout=30)
        if r.status_code == 200 and r.headers.get("content-type", "").startswith("image/"):
            return r.content
    return None


def scrape_product_image(s: requests.Session, url: str, number: str) -> bytes | None:
    html = s.get(url, timeout=30).text
    soup = BeautifulSoup(html, "lxml")
    candidates: list[str] = []
    gallery = soup.select(".woocommerce-product-gallery img, img.wp-post-image")
    for img in gallery:
        for attr in ("data-large_image", "data-src", "src"):
            src = img.get(attr) or ""
            if "wp-content/uploads" in src:
                candidates.append(src.split(" ")[0])
                break
        srcset = img.get("srcset") or ""
        parts = [p.strip().split(" ")[0] for p in srcset.split(",") if p.strip()]
        if parts:
            candidates.append(parts[-1])
    # Prefer filename that is exactly {number}.jpg / full-size not -100x100
    ranked: list[str] = []
    for src in candidates:
        if SKIP_IMG.search(src):
            continue
        m = NUM_FILE.search(src.split("?")[0])
        if m and m.group(1) == number:
            ranked.append(src)
    for src in ranked:
        if re.search(r"-\d+x\d+\.", src):
            src = re.sub(r"-\d+x\d+\.(jpe?g|png|webp)$", r".\1", src, flags=re.I)
        r = s.get(src, timeout=30)
        if r.status_code == 200 and r.headers.get("content-type", "").startswith("image/"):
            return r.content
    return None


def main() -> None:
    s = session()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    products = parse_sitemap(s)
    print("signum product numbers", len(products))

    records = []
    imported = []
    missing = []

    numbers = sorted(set(NAMES) | set(products), key=lambda n: int(n))
    # Master legal list is NAMES; extra Signum-only numbers still recorded.
    for number in numbers:
        name = NAMES.get(number)
        if name is None:
            slug = pick_product(products.get(number, [])) or ""
            name = slug.split(f"nr-{number}-")[-1].strip("/").replace("-", " ") if slug else ""
        dest = OUT_DIR / f"{number}.png"
        product = pick_product(products.get(number, []))
        raw = try_cdn(s, number)
        source = f"{SIGNUM}/wp-content/uploads/2018/10/{number}.jpg" if raw else None
        if raw is None and product:
            time.sleep(0.15)
            raw = scrape_product_image(s, product, number)
            source = product if raw else None
        rec = {
            "number": number,
            "name": name,
            "legal_source": LEGAL,
            "product_url": product,
        }
        if raw and save_png(raw, dest):
            rec["file"] = f"/signs/{number}.png"
            rec["status"] = "imported"
            rec["image_source"] = source
            imported.append(number)
            print("OK", number, dest.stat().st_size)
        else:
            rec["file"] = None
            rec["status"] = "missing_image"
            missing.append(number)
            print("MISSING", number)
        records.append(rec)

    records.sort(key=lambda r: int(r["number"]))
    DATA_PATH.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n")
    print("wrote", DATA_PATH, "imported", len(imported), "missing", len(missing))
    (OUT_DIR / "_import-report.json").write_text(
        json.dumps({"imported": imported, "missing": missing}, indent=2)
    )


if __name__ == "__main__":
    main()
