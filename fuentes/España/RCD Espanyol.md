# Reial Club Deportiu Espanyol de Barcelona, S.A.D.

**Ángulos**: sitio oficial: parcial — falta 2021-22 y 2022-23 · Wayback CDX: parcial — rcdespanyol.com/assets/docs/transparencia: 30 anexos revisados, 1 hallazgo (Memoria 20-21) · búsqueda web: no intentado · regulador/país: no aplica · barrido: 2 (Sonnet) — 2026-10-03

- **Hit bueno (2026-09-16).** 2 ejercicios descargados a `Clubes/España/RCD Espanyol/`, encontrados
  navegando la página de transparencia con el browser:
  - `cuentas-anuales-2024-2025.pdf` (199 págs.) — link "Anexo Cuentas Anuales"/"Cuentas Anuales
    2024-2025" en la propia página, host propio `rcdespanyol.com/assets/docs/transparencia/`.
  - `cuentas-anuales-gestion-auditoria-2023-2024.pdf` (192 págs., nombre de archivo de origen
    `CCAA_I_GESTION_I_ AUDITORIA.pdf`, con un espacio en el nombre que hay que url-encodear como `%20`
    al bajarlo con `curl`) — link "Cuentas Anuales 2023-2024" en la misma sección.
  - Ambos parecen escaneos (no se confirmó capa de texto en esta sesión, pendiente `pdffonts`/OCR
    antes de mapear).
- **Gotcha de URL, no de bloqueo anti-bot**: la URL corta `rcdespanyol.com/es/transparencia/` (la que
  aparece en resultados de búsqueda y en el propio índice de `_notas-generales.md` de una sesión
  anterior) está **rota** — un `curl` a esa URL entra en un loop infinito de redirects 302 a sí misma
  (confirmado, no es un bloqueo de bot: el navegador también la reporta como fallida). La URL viva
  actual es más larga: `rcdespanyol.com/es/transparencia-compliance-canaleticoycomunicaciones`. Ver
  `_notas-generales.md` para más detalle, puede repetirse con otro club si cambia su estructura de
  URLs.
- Pendiente: ejercicios anteriores a 2023-24 (la página tiene "Anexo 17" a "Anexo 21" y otros con
  contenido de temporadas previas mezclado con otros indicadores INFUT, no explorado a fondo).
- Contacto: `rcdespanyol.com/es/transparencia-compliance-canaleticoycomunicaciones`.
- **CARGADO al sitio (2026-09-22, clubId `espanyol-es`).** Ejercicio 2023/2024 (cierre 30/6/2024,
  jugado en Segunda División: Espanyol había descendido al cierre de 2022/23 y recién ascendió de
  vuelta ganando el playoff el 23/6/2024, sobre el final de este mismo ejercicio) y Ejercicio
  2024/2025 (cierre 30/6/2025, LaLiga). El PDF de 2023-24 es texto nativo, sin problema. El de
  2024-25 SÍ es un escaneo con ruido de OCR real en la cuenta de pérdidas y ganancias (varios dígitos
  mal leídos, y la sección final de impuestos/resultado salió directamente ilegible en la
  transcripción) — se re-renderizó la página 12 del PDF a imagen (300 DPI) y se leyó directo con el
  Read tool, ver comentario de cabecera de `data/espanyol-es-data.js`. FX: `EUR@2024-06-30` y
  `EUR@2025-06-30` (cierre BCE, ya en `data/currency-map.js`). Liga: 2023/24 (Segunda División) queda
  FUERA de `data/club-leagues/es.js` a propósito; 2024/25 sí lleva `es-laliga`, verificado contra
  Wikipedia/UEFA. Color de marca: `#007fc8` — Wikipedia en español (bicolor blanco/azul a rayas; con
  el otro color blanco, gana el azul por el criterio de desempate de
  `club-or-year-onboarding/SKILL.md` §3) + teamcolorcodes.com, verificado 2026-09-22.
- Último chequeo: 2026-09-22.

## Sourcing España/Francia (2026-10-03)

Del listado de Wayback de `rcdespanyol.com/assets/docs/transparencia/` salió la **Memoria Integrada 2020-21** (Junta General del 9-dic-2021, "Comptes Anuals i Informe de Gestió"): `Memoria_21_mes_res_part1.pdf` (36 págs.) y `part2.pdf` (158 págs.), guardadas como `memoria-integrada-2020-2021-parte1/2-cuentas.pdf` (la parte 2 es la que debería traer los comptes anuals; sin verificar página por página). Los anexos 3-46 son documentación de transparencia no financiera; `ANEXO_21.pdf` es la verificación del EINF 2021/22 (no financiera). → **3 ejercicios** (20-21, 23-24, 24-25). Faltan 2021-22 y 2022-23.

PDFs guardados en `Clubes/España/RCD Espanyol/` (no se transcribieron ni se cargaron al sitio). Último chequeo: 2026-10-03.
