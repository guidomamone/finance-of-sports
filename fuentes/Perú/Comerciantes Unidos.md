# Comerciantes Unidos (Club Comerciantes Unidos de Cutervo)

**Ángulos**: sitio oficial: agotado · regulador/país: no aplica (asociación) · Wayback CDX: no intentado · búsqueda web: tesis USAT (2013-2015) · barrido: 4 (Sonnet) — 2026-10-03


- Sin PDF oficial del club ni fuente institucional identificada. Dead-end estructural: el nombre
  legal completo es "Asociación Social Deportiva y Cultural Comerciantes Unidos" (fundado
  19/09/2002, Cutervo, Cajamarca) — tipo societario **Asociación**, sin obligación legal de
  publicar estados financieros.
- Sitio oficial (clubcomerciantesunidos.com) revisado completo: sin sección de transparencia,
  estados financieros, memoria anual ni balance — solo noticias, historia del club, directorio,
  trofeos, estadio, plantel, cuerpo técnico, divisiones menores y contacto.
- Contacto: clubcomerciantesunidos.com (sin sección de transparencia).
- Último chequeo: 2026-09-13 (dead-end institucional) — **superado el 2026-09-26 por hallazgo de
  Exa**, ver abajo.

## Chequeo 2026-09-26 (Exa, GRUPO D del test de sourcing) — ENCONTRADO

3 queries de Exa para este club ("balance auditado memoria y balance Comerciantes Unidos Cutervo
Perú", "asamblea Comerciantes Unidos Cutervo aprobó balance estados financieros", "tesis análisis
solvencia rentabilidad Comerciantes Unidos Cutervo pdf repositorio"). La primera query ya trajo la
referencia (vía Alicia/Concytec y el catálogo ODUCAL) a una tesis de grado de la Universidad
Católica Santo Toribio de Mogrovejo (USAT):

> Ruiz Pastor, Raxor Kenny; Saucedo Becerra, Uber (2019). *Análisis del impacto en la solvencia y
> rentabilidad en la aplicación de la ley 29504 [transformación en sociedad anónima abierta] del
> club deportivo Comerciantes Unidos de Cutervo, período 2013-2014-2015*.

Repositorio: `https://repositorio.usat.edu.pe/handle/20.500.12423/4991` (el `hdl.handle.net`
redirige ahí). El enlace de descarga directa del bitstream es
`https://repositorio.usat.edu.pe/bitstreams/d02cc688-04a5-4958-836a-fb621e941341/download`.

**Descargado y verificado**: `pdfinfo` confirma PDF válido, 74 páginas, con capa de texto (Word
2019). `pdftotext` + grep confirman que el documento SÍ contiene el Estado de Situación Financiera
INDIVIDUAL del club para 2013, 2014 y 2015 (en miles de nuevos soles), con análisis horizontal y
vertical completo: Total Activos Corrientes, Total Pasivos, composición del Patrimonio neto, etc.
Ejemplo de cifra real extraída: Total Activos 2015 = S/. 493,796.00 (2014: S/. 400,632.86; 2013:
S/. 438,143.95). Es una fuente secundaria (trabajo académico, no el balance oficial del club
directamente), pero reproduce estados financieros reales, no proyecciones ni plantilla vacía —
punto a favor: no es el mismo documento que ya se descartó como "solo transferencias" en otros
clubes de este barrido (sin homonimia: es indudablemente el club de Cutervo, Cajamarca, Liga 1
peruana).

Guardado en `Clubes/Perú/Comerciantes Unidos/tesis-solvencia-rentabilidad-2013-2015.pdf`
(carpeta creada esta sesión). **Pendiente para una sesión de onboarding de datos** (no se hizo en
esta sesión, que fue solo de sourcing): transcribir a `.md` siguiendo el flujo de `CLAUDE.md` /
`club-data-mapping` antes de extraer o cargar ninguna cifra al sitio, y evaluar si conviene citarla
como fuente secundaria (con la salvedad de que es un trabajo de tesis, no el balance auditado
oficial) o usarla solo como pista para pedirle al club/USAT el balance original.
- Candidato: no amerita mail todavía — primero hay que transcribir y evaluar la tesis en una
  sesión de onboarding; recién ahí se sabrá si falta pedir el balance oficial al club.

## Barrido 2026-10-03 (sourcing Perú/Ecuador, Sonnet)

Sigue con la tesis USAT como única fuente en disco (estados individuales 2013-2015 = 3 ejercicios secundarios, no oficiales). Sin ángulo nuevo en esta pasada: asociación civil sin obligación de publicar; la ley 29504 que cita la tesis (transformación en S.A.A.) nunca se aplicó al club, así que no hay SMV.
