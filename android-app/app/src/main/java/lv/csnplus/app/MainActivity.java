package lv.csnplus.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {
    private WebView web;
    private static final String HOST = "app.csnplus.lv";
    private static final String ORIGIN = "https://app.csnplus.lv";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        web = new WebView(this);
        web.setBackgroundColor(0xFF07080A);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setCacheMode(WebSettings.LOAD_NO_CACHE);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);
        s.setUserAgentString(s.getUserAgentString() + " CSNplusApp/1.6.0");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                String host = request.getUrl().getHost();
                if (host == null || !HOST.equals(host)) {
                    return super.shouldInterceptRequest(view, request);
                }
                String path = request.getUrl().getPath();
                if (path == null || path.isEmpty() || "/".equals(path)) {
                    path = "/index.html";
                }
                WebResourceResponse local = openAsset(path);
                if (local != null) {
                    return local;
                }
                if (path.indexOf('.') < 0) {
                    local = openAsset("/index.html");
                    if (local != null) {
                        return local;
                    }
                }
                return super.shouldInterceptRequest(view, request);
            }
        });
        web.setWebChromeClient(new WebChromeClient());
        web.loadUrl(ORIGIN + "/");
        setContentView(web);
    }

    private WebResourceResponse openAsset(String path) {
        String rel = path.startsWith("/") ? path.substring(1) : path;
        if (rel.contains("..")) {
            return null;
        }
        try {
            InputStream is = getAssets().open("www/" + rel);
            String mime = mimeFor(rel);
            Map<String, String> headers = new HashMap<String, String>();
            headers.put("Cache-Control", "no-cache");
            return new WebResourceResponse(mime, encodingFor(mime), 200, "OK", headers, is);
        } catch (IOException e) {
            return null;
        }
    }

    private static String encodingFor(String mime) {
        if (mime.startsWith("text/")
                || mime.contains("javascript")
                || mime.contains("json")
                || mime.contains("svg")
                || mime.contains("xml")) {
            return "utf-8";
        }
        return null;
    }

    private static String mimeFor(String path) {
        String p = path.toLowerCase();
        if (p.endsWith(".html")) return "text/html";
        if (p.endsWith(".js") || p.endsWith(".mjs")) return "application/javascript";
        if (p.endsWith(".css")) return "text/css";
        if (p.endsWith(".json")) return "application/json";
        if (p.endsWith(".svg")) return "image/svg+xml";
        if (p.endsWith(".png")) return "image/png";
        if (p.endsWith(".jpg") || p.endsWith(".jpeg")) return "image/jpeg";
        if (p.endsWith(".webp")) return "image/webp";
        if (p.endsWith(".woff2")) return "font/woff2";
        if (p.endsWith(".woff")) return "font/woff";
        if (p.endsWith(".ttf")) return "font/ttf";
        if (p.endsWith(".wasm")) return "application/wasm";
        if (p.endsWith(".webmanifest")) return "application/manifest+json";
        if (p.endsWith(".map")) return "application/json";
        if (p.endsWith(".txt")) return "text/plain";
        if (p.endsWith(".ico")) return "image/x-icon";
        return "application/octet-stream";
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) {
            web.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
