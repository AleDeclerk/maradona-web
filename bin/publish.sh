#!/bin/bash
# Sync vault → commit → push. Vercel hace auto-deploy.
# Usage: ./bin/publish.sh ["mensaje custom"]
set -e

WEB_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$WEB_ROOT"

"$WEB_ROOT/bin/sync.sh"

if [ -z "$(git status --porcelain content/wiki/)" ]; then
  echo "✓ Sin cambios en el vault. Nada para publicar."
  exit 0
fi

git add content/wiki/

MSG="${1:-content: sync vault $(date +%Y-%m-%d)}"
git commit -m "$MSG"
echo "→ Pusheando…"
git push
echo "✓ Listo. Vercel está rebuildando: https://vercel.com/alejandros-projects-f173d310/maradona-web"
