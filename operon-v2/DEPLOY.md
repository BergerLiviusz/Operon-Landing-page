# Deploying Operon v2 to GitHub Pages

The marketing site is a static build in `operon-v2/site/`, produced by:

```bash
cd operon-v2
npm ci
npm run build
```

## Automatic deploy

Pushes to `main` that touch `operon-v2/**` run `.github/workflows/deploy-operon-pages.yml`, which:

1. Builds and validates the site
2. Publishes it to the **`gh-pages`** branch

## One-time GitHub setup

1. Open **Settings → Pages** on [Operon-Landing-page](https://github.com/BergerLiviusz/Operon-Landing-page/settings/pages).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to `gh-pages` and folder **`/ (root)`**, then **Save**.
4. Run the workflow once (push to `main` or **Actions → Deploy Operon v2 → Run workflow**).
5. After the workflow succeeds, confirm **Custom domain** shows `www.operonworks.hu` (written by the deploy action).
6. Enable **Enforce HTTPS** once DNS is verified.

> If you previously tried **GitHub Actions** as the Pages source and saw a 404 deploy error, switch to **Deploy from a branch → gh-pages** as above.

## DNS (at your domain host)

Add a **CNAME** record:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| CNAME | www  | bergerliviusz.github.io  |

Optional: redirect bare `operonworks.hu` to `www.operonworks.hu` using your DNS/hosting panel.

## Live URLs

- Custom domain: `https://www.operonworks.hu`
- Default Pages URL: `https://bergerliviusz.github.io/Operon-Landing-page/`

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
