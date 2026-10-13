#!/bin/bash
# uso: cdxm.sh dominio1 dominio2 ...  -> PDFs archivados (todos) por dominio, con pausa entre consultas
for d in "$@"; do
  echo "=== $d"
  curl -s -m 120 "http://web.archive.org/cdx/search/cdx?url=${d}&matchType=domain&output=txt&fl=timestamp,original,statuscode&filter=mimetype:application/pdf&collapse=urlkey&limit=3000" | grep -av '^$' | head -${MAXL:-60}
  echo "(exit ${PIPESTATUS[0]})"
  sleep 8
done
