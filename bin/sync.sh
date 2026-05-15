#!/bin/bash
# Sincroniza el vault de Obsidian (fuente de verdad del corpus) con content/wiki/ del proyecto web.
# Usage: ./bin/sync.sh
set -e

VAULT="${MARADONA_VAULT:-$HOME/Downloads/maradona-vault/wiki}"
WEB_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$WEB_ROOT/content/wiki"

if [ ! -d "$VAULT" ]; then
  echo "✗ No encuentro el vault en $VAULT"
  echo "  Configurá MARADONA_VAULT si está en otro lado."
  exit 1
fi

echo "→ Sincronizando $VAULT → $DEST"
rsync -a --delete --exclude='.DS_Store' "$VAULT/" "$DEST/"
echo "✓ Sync completo. $(find "$DEST" -name '*.md' | wc -l | tr -d ' ') archivos en content/wiki/"
