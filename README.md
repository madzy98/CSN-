# CSN+

Latvian Category B driving-theory trainer. Web app (TanStack Start) with an optional Android WebView wrapper.

## Run

```bash
npm install
npm run dev
```

App: `http://localhost:8080`

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production |

## Android

Source lives in `android-app/`. Do not commit the upload keystore. Sign locally with:

```bash
export CSNPLUS_KEYSTORE_PASSWORD=...
export CSNPLUS_KEY_PASSWORD=...
```

## License

Private. All rights reserved.
