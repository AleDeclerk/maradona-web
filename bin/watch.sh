#!/bin/bash
# Watcher: cuando cambia algo en el vault, sincroniza al instante.
# Requiere fswatch (brew install fswatch).
# Útil mientras editás en Obsidian y querés ver los cambios en local sin commitar.
# Usage: ./bin/watch.sh
set -e

VAULT="${MARADONA_VAULT:-$HOME/Downloads/maradona-vault/wiki}"
WEB_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if ! command -v fswatch >/dev/null 2>&1; then
  echo "✗ Falta fswatch. Instalalo con: brew install fswatch"
  exit 1
fi

echo "→ Vigilando $VAULT (Ctrl+C para parar)"
"$WEB_ROOT/bin/sync.sh"
fswatch -o "$VAULT" | while read -r _; do
  "$WEB_ROOT/bin/sync.sh"
done
