# Dynamo Kyiv

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: Футбольний клуб "Динамо" Київ, ТОВ (sociedad de responsabilidad
  limitada) — EDRPOU no verificado en esta sesión (no hizo falta llegar tan lejos, ver dead-end
  abajo). Por ser ТОВ, estructuralmente no puede aparecer en SMIDA (esa base solo cubre emisores de
  acciones, ver `_notas-generales.md`).

## Qué se probó (sesión 2026-09-18) — dead-end, sin lead nuevo

1. Sitio oficial `fcdynamo.com` — revisado el menú completo vía JS
   (`document.querySelectorAll('a')` filtrado por "фінанс|звіт|прозор|financ|documents|dokument"):
   **CERO resultados**. El sitio solo tiene noticias, videos, partidos, plantel, historia, tienda y
   contacto — ninguna sección de transparencia/estados financieros.
2. `WebSearch`/`site:fcdynamo.com фінансова звітність баланс` — sin resultados relevantes.
3. No se intentó el Єдиний державний реєстр (solo sirve identidad, no balances — ver
   `_notas-generales.md`) ni SMIDA (no aplica, es ТОВ).

**Motivo del bloqueo**: el club simplemente no publica — no hay ningún indicio de portal caído,
login, o captcha que superar. Es el mismo patrón de "no cumplió la obligación de publicar" que
Zorya y Kryvbas.

## Sugerencia para una sesión futura

Sin ángulo nuevo evidente. Si se retoma, el único camino no explorado es un pedido directo al club
(ver `dudas-por-club.md`) — Dynamo Kyiv es uno de los clubes más grandes y mediáticos del país, así
que la ausencia total de disclosure público llama la atención y podría ser una pregunta legítima
para hacerles llegar.

- Último chequeo: 2026-09-18.

## Chequeo 2026-10-03 (sesión Europa del Este) — CORRIGE el "dead-end" de arriba

**Ángulos**: sitio oficial: agotado (la sección existe: `fcdynamo.com/pages/40`, "Документація", con la información financiera del último año) · Wayback CDX (`fcdynamo.com`): agotado (una sola captura de un PDF bajo `/pages/40/`) · búsqueda web: agotado (agregadores, solo leads) · barrido: 2 (Sonnet).

- **Entidad**: ТОВ «ФУТБОЛЬНИЙ КЛУБ «ДИНАМО» КИЇВ» (carátula de la consolidada). La nota anterior decía "sin sección financiera en el sitio": estaba mal, la sección está bajo "Документація" (menú "Клуб" sin enlace en la portada), no bajo un nombre de "financiera".
- **En disco** (`Clubes/Ucrania/Dynamo Kyiv/`): `dynamo-kyiv-auditor-2025.pdf` (7 págs., "Звіт незалежного аудитора за 2025 рік") y `dynamo-kyiv-financiera-2025.pdf` (2 págs., "Фінансова інформація за 2025 рік", sin capa de texto); `dynamo-kyiv-consolidada.pdf` (50 págs., **estados financieros consolidados** con dictamen, de la captura Wayback `20250316145405` de `.../content/pages/40/Консолідована-фінансова-звітність.pdf`; el encabezado de las notas dice "за рік, що закінчився 31 грудня 2020 року": OCR de la página 20; verificar si es 2020 o un año posterior antes de cargar). Las páginas de texto del PDF están en Tahoma sin ToUnicode (mojibake de `pdftotext`): tratar como escaneo.
- **Pendiente**: la página `/pages/40` se actualiza cada año reemplazando el anterior; los ejercicios 2021-2024 pueden estar en capturas de Wayback de la página HTML (`fcdynamo.com/pages/40`, sin capturas listadas por el CDX consultado) — reintentar con otra consulta. Candidato a mail: pedir los consolidados 2021-2024.

**Lead sin verificar (agregador)**: `opendatabot.ua/c/00305981` (EDRPOU 00305981, "ФК Динамо Київ") muestra cifras 2024 (ingresos 913,7 M UAH, pérdida neta 784,1 M UAH, activos 4.455 M UAH) y ofrece `Баланс_2024.xlsx` / `Фінансові результати_2024.xlsx`. Fuente NO oficial. Encontrado 2026-10-03.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: sitio oficial: HIT (descubierto con búsqueda semántica Exa) · barrido: 3 (Exa) — 2026-10-08

4 documentos en carpeta (2025).

- Nuevo: «Консолідована фінансова звітність» (50 págs., NSFR/MSFO consolidado); corresponde al ejercicio 2020 (cierre 31-dic-2020, según el informe del auditor).
