#!/bin/bash
# uso: wpmedia.sh <origin> <termino> -> PDFs de la mediateca WordPress que matchean
for p in 1 2 3; do
curl -s -m 40 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/124.0" "$1/wp-json/wp/v2/media?per_page=100&page=$p&search=$2&mime_type=application/pdf" | grep -aoE '"source_url":"[^"]*"' | sed 's/"source_url":"//;s/"$//;s/\\//g'
done | sort -u
