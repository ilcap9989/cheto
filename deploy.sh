#!/bin/bash
# Pubblica la dashboard Cheto su GitHub Pages.
# Uso:  ./deploy.sh "messaggio del commit"
# Se il messaggio non viene passato, ne genera uno con la data.

set -e
cd "$(dirname "$0")"

# git a volte lascia dei lock quando il file viene toccato da processi esterni
rm -f .git/HEAD.lock .git/index.lock 2>/dev/null || true

MSG="${1:-Aggiornamento piano $(date '+%d/%m/%Y')}"

if [ -z "$(git status --porcelain)" ]; then
  echo "Nessuna modifica da pubblicare."
  exit 0
fi

git add -A
git commit -m "$MSG"

if git remote get-url origin >/dev/null 2>&1; then
  git push origin "$(git rev-parse --abbrev-ref HEAD)"
  echo ""
  echo "Fatto. La pagina si aggiorna entro un paio di minuti."
  git remote get-url origin | sed -E 's#(git@github.com:|https://github.com/)([^/]+)/(.+)(\.git)?#Indirizzo: https://\2.github.io/\3/#' | sed 's/\.git\/$/\//'
else
  echo ""
  echo "Commit fatto in locale, ma non c'e' ancora un remote 'origin'."
  echo "Consulta PUBBLICA.md per collegare il repository GitHub."
fi
