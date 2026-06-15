# Deploying Operon v2 to GitHub Pages

The marketing site is a static build in `operon-v2/site/`, produced by:

```bash
cd operon-v2
npm ci
npm run build
```

## Automatic deploy

Pushes to `main` that touch `operon-v2/**` run `.github/workflows/deploy-operon-pages.yml`, which builds, validates, and publishes to GitHub Pages.

### One-time GitHub setup

1. Open **Settings → Pages** on `BergerLiviusz/Operon-Landing-page`.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. After the first successful workflow run, set **Custom domain** to `www.operonworks.hu` (or confirm the `CNAME` file was deployed).
4. Enable **Enforce HTTPS** once DNS is verified.

### DNS (at your domain host)

Add a **CNAME** record:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| CNAME | www  | bergerliviusz.github.io  |

Optional: redirect bare `operonworks.hu` to `www.operonworks.hu` using your DNS/hosting panel.

## Local preview

```bash
cd operon-v2
npm run dev
```

Opens `http://localhost:3002/`.

## Build inputs

- `sources/sui-sample-template-operon` — home ZipIt export
- `sources/sui-sanoke-template-operon-page2` — developers ZipIt export
- `branding/` — Operon CSS, JS, copy, and assets

Built output (`site/`) is gitignored; CI generates it on each deploy.
