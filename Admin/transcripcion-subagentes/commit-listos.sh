#!/bin/zsh
# Agrega y commitea los .md nuevos de Clubes/ del Reino Unido cuyo borrador ya no existe.
cd /Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports
n=0
git status --porcelain -uall -- Clubes/Inglaterra Clubes/Escocia Clubes/Gales "Clubes/Irlanda del Norte" | grep '^?? ' | sed 's/^?? //; s/^"//; s/"$//' | grep '\.md$' | grep -v '\.ocr-borrador\.md$' | while read f; do
  [ -f "${f%.md}.ocr-borrador.md" ] && continue
  head -1 "$f" | grep -q '^> Transcripción' || { echo "SIN CABECERA: $f"; continue; }
  git add -- "$f"; n=$((n+1))
done
c=$(git diff --cached --name-only | wc -l | tr -d ' ')
[ "$c" = 0 ] && { echo "nada para commitear"; exit 0; }
git commit -q -m "Transcripciones del Reino Unido: $c PDFs más (Tesseract + revisión de subagentes contra la imagen)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" && echo "commit con $c archivos"
