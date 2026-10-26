<!-- md: los informes de terceros (UEFA, Deloitte y similares) guardados para consultar | leer: antes de armar la página de blog o de citar un informe externo -->
# Informes externos

Informes de otros que el sitio NO publica ni copia. Se guardan para leer qué dicen y, eventualmente, sumarles nuestros datos en una página de blog (su punto del TODO).
Los PDF no se trackean (`.gitignore`); la transcripción sí. Nada de acá entra en lo que se cobra ni en los datos del sitio: ninguna cifra de estos informes se carga como dato; antes de
citar una, su fila en `Admin/fuentes-externas.md` y su término de uso.

| Carpeta | Informe | Fuente | Bajado | Transcripción |
|---|---|---|---|---|
| `uefa/` | UEFA, *The European Club Finance and Investment Landscape*, edición 2025 (112 páginas, 58,6 MB) | https://ecfil.uefa.com/2025 (PDF en inglés) | 2026-10-26 | `uefa/ecfil-2025.md`, Mistral OCR (`node tools/mistral-ocr-transcribe.mjs`, US$ 0,45) |

## Qué trae el informe de UEFA (leído el 2026-10-26)

- **No trae ingresos por club.** Trae agregados: la primera división de cada país (55 ligas) y, en los capítulos, gráficos de los 20 o 25 clubes más grandes que son IMÁGENES (la transcripción deja `![img-N.jpeg]` y no sus valores).
- El **apéndice «KPI APPENDIX»** (desde la pág. 72, tabla por país) da, por liga: ingresos totales, entradas, derechos de TV locales, ingresos de UEFA, relación sueldos/ingresos, gastos operativos, resultado de transferencias, resultado antes de impuestos, patrimonio neto, deuda bancaria, costo del plantel, propiedad de los clubes e inversión. En la transcripción algunos países salen como tabla de texto y otros como imágenes.
- Capítulos: ingresos (08), costos operativos (32), traspasos y rentabilidad (42), balances (54), inversión (66), apéndice (72).
