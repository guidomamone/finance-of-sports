#!/bin/bash
# uso: links.sh <url> [regex]  -> lista links (href) del html que matchean regex (default dokument|pārskat|parskat|finan|report|pdf|annual)
re="${2:-dokument|pārskat|parskat|finan|report|\.pdf|annual|gada|statement|audit|licen}"
re=$(echo "$re" | tr ',' '|')
curl -s -m 40 -L -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36" -w "\n[HTTP %{http_code} %{size_download} %{url_effective}]\n" "$1" -o /private/tmp/claude-501/-Users-guidopablomamonesoneira-Claude-Projects-finance-of-sports/22d04170-782b-46dc-bf69-c079c7b3b1b2/scratchpad/_l.html
T=/private/tmp/claude-501/-Users-guidopablomamonesoneira-Claude-Projects-finance-of-sports/22d04170-782b-46dc-bf69-c079c7b3b1b2/scratchpad/_l.html
grep -aoE 'href="[^"#]+"' $T | sed 's/href="//;s/"$//' | grep -aiE "$re" | sort -u | head -${3:-40}
