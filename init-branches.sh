#!/usr/bin/env bash
set -euo pipefail

SRC="$(cd "$(dirname "$0")/../files-mentioned-by-the-user-operon" && pwd)"
LANDING="$(cd "$(dirname "$0")" && pwd)"

echo "Source monorepo: $SRC"
echo "Landing repo:    $LANDING"

rm -rf "$LANDING/.git" 2>/dev/null || true
mkdir -p "$LANDING"
cd "$LANDING"

git init -b alternate-version

rsync -a \
  --exclude node_modules \
  --exclude .next \
  --exclude dist \
  --exclude .vinext \
  --exclude .wrangler \
  --exclude work \
  --exclude operon-v2 \
  --exclude 'sui-sample-template-operon' \
  --exclude 'sui-sanoke-template-operon-page2' \
  --exclude 'sui_developers___*' \
  --exclude public/operon-sui \
  --exclude .git \
  "$SRC/" "$LANDING/"

git add -A
git commit -m "$(cat <<'EOF'
Alternate version: React/vinext Operon landing page (v1).

Original Next.js/vinext marketing site preserved as the alternate implementation branch.
EOF
)"

git checkout --orphan main
git rm -rf . >/dev/null 2>&1 || true

rsync -a \
  --exclude site \
  --exclude node_modules \
  --exclude audit \
  "$SRC/operon-v2/" "$LANDING/"

mkdir -p "$LANDING/sources"
rsync -a "$SRC/sui-sample-template-operon/" "$LANDING/sources/sui-sample-template-operon/"
rsync -a "$SRC/sui-sanoke-template-operon-page2/" "$LANDING/sources/sui-sanoke-template-operon-page2/"

cat > "$LANDING/.gitignore" <<'EOF'
site/
node_modules/
audit/
.env*
.DS_Store
EOF

# Standalone package identity
node -e "
const fs=require('fs');
const p=JSON.parse(fs.readFileSync('package.json','utf8'));
p.name='operon-landing-page';
p.description='Operon ERP landing page — Sui.io-grade clone with Operon branding (v2)';
fs.writeFileSync('package.json', JSON.stringify(p,null,2)+'\n');
"

git add -A
git commit -m "$(cat <<'EOF'
Operon landing page v2: Sui.io clone with Operon ERP branding.

Static Sui ZipIt export rebuilt as standalone site with GSAP/Lenis interactions,
Hungarian Operon copy, and Operon navbar logo. Run: npm install && npm run dev (port 3002).
EOF
)"

echo ""
echo "Branches ready:"
git branch -a
git log --oneline --all | head -5
