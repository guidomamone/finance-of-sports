#!/bin/bash
# uso: bgsearch.sh <nombre en cirílico> [filtro-regex]  -> UIC | nombre (registro mercantil búlgaro)
for p in 1 2 3 4 5 6 7 8; do
  for try in 1 2 3 4; do
    out=$(curl -s -m 40 -G "https://portal.registryagency.bg/CR/api/Deeds/Summary" --data-urlencode "page=$p" --data-urlencode "pageSize=25" --data-urlencode "count=0" --data-urlencode "name=$1" --data-urlencode "selectedSearchFilter=1" --data-urlencode "includeHistory=false" -w "\n%{http_code}")
    code=$(echo "$out" | tail -1)
    [ "$code" = "200" ] && break
    sleep $((5*try))
  done
  body=$(echo "$out" | sed '$d')
  [ "$body" = "[]" ] && break
  echo "$body" | python3 -c "
import json,sys
try:
    d=json.load(sys.stdin)
except Exception:
    d=[]
for x in (d if isinstance(d,list) else []):
    if isinstance(x,dict): print(x.get('ident'),'|',x.get('companyFullName'))
"
  sleep 2
done | grep -aiE "${2:-.}"
