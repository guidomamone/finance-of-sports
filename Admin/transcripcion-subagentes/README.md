# Transcripción de PDFs del Reino Unido con subagentes

Cola para transcribir con subagentes de Claude los PDFs de Inglaterra, Escocia, Gales e Irlanda del Norte que no tienen `.md`
(casi todos escaneos de Companies House). Cada subagente: Tesseract (`ocr.sh`) + revisión de las páginas clave contra la imagen.

- `chunks.txt`: un bloque por línea (hasta 3 PDFs del mismo club, separados por `|`), ordenado: primero clubes que ya tienen
  algún `.md`, del año más nuevo al más viejo; los `wf-*` al final (varios resultaron duplicados, ver `hallazgos-por-documento.txt`).
- `pos.txt`: último bloque tomado. `claim.sh` toma el siguiente (con lock).
- `INSTRUCCIONES.md`: lo que lee cada subagente. Prompt de cada uno: "Corré <ruta>/claim.sh UNA sola vez y seguí INSTRUCCIONES.md".
- `reglas.md`: las reglas para transcribir UN PDF digital a Markdown (paso 0: leer la portada antes de transcribir; lo que lee cada subagente además de `INSTRUCCIONES.md`).
- `commit-listos.sh`: commitea los `.md` nuevos cuyo borrador ya no existe (un borrador presente = transcripción a medias).
- Costo medido por documento (30-100 páginas): Opus ~150-350k tokens y 4-12 minutos; Sonnet ~120-250k tokens y 2-6 minutos, pero
  algunos revisan contra la imagen solo los estados principales y corrigen las notas por sumas.
