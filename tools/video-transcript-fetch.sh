#!/usr/bin/env bash
# Baja la transcripción automática de un video de YouTube (asamblea/presentación filmada) para poder
# grepear cifras habladas que nunca se publicaron como PDF — ver Admin/CHANGELOG.md, to-do 77.
#
# Gratis, sin API de pago: usa yt-dlp (herramienta open-source, no la API oficial de YouTube) para
# bajar el subtítulo auto-generado. Necesita el flag --extractor-args "youtube:player_client=android"
# porque YouTube bloquea el cliente "web" por default con un error de streaming (SABR) — con
# player_client=android sí funciona, probado 2026-09-27.
#
# Instalar una sola vez: pip3 install --user yt-dlp
#
# NO es parte de la escalera rutinaria de sourcing, y no se sale a buscar videos de forma proactiva
# en cada club nuevo (decisión de Guido, to-do 77 cerrado): correrlo SOLO cuando el sourcing normal
# (familias 1-4 de club-sourcing/SKILL.md) ya dejó anotado un video como lead concreto — un post,
# una nota, una convocatoria que menciona una transmisión/grabación de la asamblea.
#
# Uso:
#   tools/video-transcript-fetch.sh "<URL o ID de YouTube>" [idioma, default es]
#
# Ejemplo:
#   tools/video-transcript-fetch.sh "https://www.youtube.com/watch?v=l_12ZrJdXoY"
#   → guarda el .vtt en el directorio actual y grepea palabras clave financieras automáticamente.

set -euo pipefail

URL="${1:?Uso: tools/video-transcript-fetch.sh \"<URL o ID de YouTube>\" [idioma]}"
LANG="${2:-es}"

python3 -m yt_dlp \
  --write-auto-sub --sub-lang "$LANG" --skip-download --sub-format vtt \
  --extractor-args "youtube:player_client=android" \
  "$URL"

echo
echo "--- Líneas con palabras clave financieras (revisar a mano, no asumir exactas) ---"
grep -iE "activo|pasivo|patrimonio neto|superávit|superhábito|déficit|ingresos|egresos|estado de situación patrimonial" *.vtt || echo "(sin matches — puede que este video no lea cifras de balance)"
