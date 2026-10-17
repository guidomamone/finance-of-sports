#!/bin/zsh
# ocr.sh <pdf> : escribe <pdf sin .pdf>.ocr-borrador.md con Tesseract (eng, psm 6, 300 dpi), una marca --- pág. N --- por página.
# Las imágenes quedan en $IMGROOT/<hash>/p-N.png para revisar páginas con Read.
pdf="$1"; base="${pdf%.pdf}"; out="$base.ocr-borrador.md"
IMGROOT=${TMPDIR:-/tmp}/fos-ocr-img
h=$(echo -n "$pdf" | md5 | cut -c1-10); d="$IMGROOT/$h"; mkdir -p "$d"
n=$(pdfinfo "$pdf" 2>/dev/null | grep -a "^Pages:" | awk '{print $2}')
: > "$out"
for i in $(seq 1 $n); do
  pdftoppm -png -r 300 -f $i -l $i "$pdf" "$d/p" >/dev/null 2>&1
  f=$(ls "$d"/p-*$i.png 2>/dev/null | grep -E "p-0*$i.png$" | head -1)
  [ -n "$f" ] && mv "$f" "$d/p-$i.png"
  echo "--- pág. $i ---" >> "$out"; echo >> "$out"
  tesseract "$d/p-$i.png" - -l eng --psm 6 2>/dev/null >> "$out"; echo >> "$out"
done
echo "OK $n páginas -> $out ; imágenes en $d/p-N.png"
