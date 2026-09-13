# Club América (Club de Fútbol América — Ollamani, S.A.B.)

- **Hit real, rompe el supuesto "Liga MX = sin disclosure" (sesión 2026-09-13, sourcing CONCACAF).**
  Club América dejó de ser una subsidiaria interna de Grupo Televisa el 31/01/2024: Televisa escindió
  ("spin-off") su negocio de fútbol + Estadio Azteca (rebautizado Estadio Banorte) + editoriales
  (Editorial Televisa) + juegos y sorteos (Play City) en una compañía nueva, **Ollamani, S.A.B.**, que
  cotiza en la Bolsa Mexicana de Valores (BMV) desde el 20/02/2024 bajo la clave **AGUILAS** (ticker
  Yahoo: `AGUILASCPO.MX`). Al ser una Sociedad Anónima Bursátil regulada por la CNBV, Ollamani está
  OBLIGADA a publicar Estados Financieros Consolidados auditados bajo IFRS, trimestrales y anuales,
  igual que cualquier emisora mexicana — mismo principio que el hallazgo de Chile (CMF) o Colombia
  (Supersociedades), acá vía CNBV/BMV.
- **Descargados y guardados** en `Clubes/México/Club América/`:
  - `reporte-financiero-ollamani-2024-auditado.pdf` — Reporte Financiero BMV, trimestre 4D-2024
    (periodo inicial 1-feb-2024 a 31-dic-2024, primer ejercicio de la compañía tras el spin-off),
    102 páginas, CON capa de texto (no escaneado).
  - `reporte-financiero-ollamani-2025-auditado.pdf` — mismo formato BMV, ejercicio 2025 completo
    (1-ene a 31-dic-2025), 113 páginas, con capa de texto.
  - Ambos bajados directo de `ollamani.com.mx/reportes-3/` (sección "Reportes" del sitio oficial de
    la compañía, que espeja lo publicado en bmv.com.mx y gob.mx/cnbv).
- **OJO — no es un balance "solo del club", es un segmento dentro de una compañía más grande.**
  Ollamani reporta bajo IFRS 8 tres segmentos operativos: (i) **Segmento de Fútbol** — incluye Club
  América (varonil Y femenil) MÁS el Estadio Banorte/Azteca —, (ii) Segmento de Juegos (17
  establecimientos "Play City", máquinas tragamonedas), y (iii) Segmento de Editoriales y
  Distribuidoras (revistas). El PDF trae, para cada trimestre y para el acumulado anual: ingresos del
  segmento Fútbol, utilidad del segmento Fútbol (antes de D&A), y el % que representa sobre el total
  consolidado — pero NO un balance separado (activos/pasivos) por segmento, solo P&L segmentado. Cifras
  concretas ya verificadas en el PDF 2024 (período inicial feb-dic 2024, auditado): ingresos del
  segmento Fútbol $2,726.6 millones MXN (45.2% del total consolidado), utilidad del segmento $584.1
  millones MXN (21.4% del total). El texto aclara que los ingresos de Fútbol son "principalmente
  ingresos por publicidad y patrocinios, así como ventas de taquilla y esquilmos" — es decir, incluye
  ingresos del estadio, no solo del club como entidad deportiva.
  - **Para una futura sesión de onboarding**: esto va a necesitar una decisión de mapeo (ver
    `dudas-por-club.md` si hace falta preguntarle a Guido) sobre si cargar el segmento "Fútbol"
    completo (Club América + Estadio Banorte) como si fuera el club, aclarando la mezcla en el
    disclaimer de fuente, o esperar a ver si Ollamani desglosa más granular en notas a los estados
    financieros (no se revisó la nota completa de segmentos en el cuerpo de los EEFF, solo el MD&A
    inicial del reporte BMV — pendiente para la sesión de mapeo).
- **Estructura societaria**: Ollamani, S.A.B. es la controladora pública; "Club de Fútbol América"
  aparece nombrado explícitamente como subsidiaria/marca dentro del documento (ej. referencia a
  "CLUB DE FÚTBOL AMÉRICA" en el anexo de garantías/cartas de crédito del reporte 2025). El accionista
  de control post-spin-off sigue siendo el grupo Televisa/Salinas Pliego; en dic-2025 Ollamani anunció
  una alianza estratégica con General Atlantic (fondo de inversión).
- **Pendiente para completar la serie**: el reporte BMV es solo el resumen trimestral/MD&A — falta
  revisar si el "Informe Anual 2024" completo (`Grupo-Ollamani-Informe-anual-Accionistas-2024.pdf`,
  también en `ollamani.com.mx/reportes-3/`) trae el balance consolidado completo con notas, y si hay
  trimestres previos a 4D-2024 desglosados por separado. También pendiente confirmar si el segmento
  Fútbol trae cifra de traspasos de jugadores (transfer fees) por separado, dato clave para el
  criterio de "resultado neto de pases" que usa el resto del sitio.
- Contacto/fuente: `ollamani.com.mx/reportes-3/` (sección Reportes del sitio oficial), espejado en
  `bmv.com.mx/es/emisoras/informacionfinanciera/AGUILAS-36159-CGEN_CAPIT` (BMV) y `gob.mx/cnbv` (CNBV).
- Último chequeo: 2026-09-13.

## CARGADO al sitio (sesión de onboarding, ver Versión 107 en CHANGELOG.md/finance-of-sports-project.md)

El Ejercicio 2025 (año calendario completo, 1/1/2025-31/12/2025) ya está cargado en
`data/clubamerica-data.js`, vía la Nota de Segmentos IFRS 8 del `reporte-financiero-ollamani-2025-auditado.pdf`
(transcripción de las páginas relevantes en `Clubes/México/Club América/segmento-futbol-2025.md`).
Decisiones de mapeo (segment bundling con Estadio Banorte, `officialPAT` deliberadamente `null`
porque la "utilidad de segmento" impresa NO es un PAT comparable, `grossDebt`/`cash` en 0/0 por
ausencia de balance a nivel de segmento, discrepancia de tipo de cambio dentro del propio
documento) documentadas en el comentario de cabecera de `data/clubamerica-data.js` y en el registro
narrativo completo de `finance-of-sports-project.md` (Versión 107).

El Ejercicio 2024 (`reporte-financiero-ollamani-2024-auditado.pdf`, período inicial de 11 meses,
1/2/2024-31/12/2024) sigue SIN cargar a propósito — no es un año calendario completo, y esta sesión
se limitó a "un solo ejercicio, el más reciente y completo" (ver to-do #15 en `index.html` y
`dudas-por-club.md` para la pregunta abierta de si vale la pena sumarlo igual).
