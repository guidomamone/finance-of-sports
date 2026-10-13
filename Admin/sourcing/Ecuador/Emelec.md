# Emelec (Club Sport Emelec)

**Ángulos**: sitio oficial: **ENCONTRADO vía Wayback** (el sitio fue rehecho y ya no sirve los PDFs) · regulador/país: no aplica (club civil) · Wayback CDX: **ENCONTRADO** (2023 auditado) · búsqueda web: sin más años · barrido: 4 (Sonnet) — 2026-10-03

- Sin PDFs ni fuente pública identificada. Ninguno de los dos tiene una sección de transparencia o
  estados financieros en su propio sitio (barcelonasc.com.ec, emelec.com.ec — se probaron rutas
  típicas tipo `/transparencia/` y `/estados-financieros/`, ambas 404). No se intentó buscarlos en
  Supercias por NIT/RUC en esta sesión (ver limitación del portal arriba) — pendiente para una
  sesión futura, si se consigue el RUC exacto de cada uno.
- **Actualización 2026-09-13**: mismo hallazgo estructural que Barcelona SC (ver
  `_notas-generales.md`) — a la fecha, ningún club ecuatoriano, Emelec incluido, es todavía una
  S.A.D.P./SAD; el reglamento que habilita la conversión recién se emitió en junio de 2026 y no hay
  evidencia de que Emelec haya iniciado el trámite (a diferencia de Barcelona SC, que sí lo está
  "analizando" públicamente — no se encontró declaración equivalente de Emelec en esta sesión).
  - Se releyó el menú completo del sitio oficial (`emelec.com.ec`) esta sesión: navegación es
    prácticamente toda anclas internas (`#socios`, `#propietarios`, `#boletos`) más una app externa
    de socios/boletería (`app.emelec.com.ec`). El footer lista "Estatutos"/"Reglamentos" pero como
    links `#` (no funcionales/placeholder en el HTML servido, no un documento real detectable). Sin
    ningún link a transparencia, estados financieros, balance o informe económico.
  - RUC de "Club Sport Emelec" (la entidad civil, no una SAD que no existe): 0990166900001 —
    confirmado vía rucecuador.com/sri-en-linea.com, de baja confianza para uso en Supercias (ver
    nota general: Supercias no regula sociedades civiles deportivas, así que este RUC no sirve para
    ese portal de todas formas).
  - No se encontró cobertura de prensa que linkee o adjunte un PDF real con cifras auditadas de
    Emelec — como con Barcelona SC, hay mucha cobertura de su situación económica pero siempre
    narrativa, sin documento fuente citado.
- Pendiente: igual que Barcelona SC — retomar si Emelec anuncia inicio de proceso de conversión a
  SAD. Sin ángulo nuevo mientras tanto.
- Contacto: sin sección propia identificada; supercias.gob.ec no aplica todavía (ver arriba).
- Último chequeo: 2026-09-13.

## Barrido 2026-10-03 (sourcing Perú/Ecuador, Sonnet) — HALLAZGO: Estados Financieros 2023 auditados

La corrección de la nota de 2026-09-13 ("sin PDFs"): el sitio viejo (WordPress, `emelec.com.ec/content/uploads/2024/08/`) publicó en agosto de 2024, junto a la convocatoria a asamblea de socios, el
**"CLUB SPORT EMELEC — Estados Financieros al 31 de diciembre de 2023, con el informe de los auditores independientes"** (carátula verificada a ojo).
- Guardado: `Clubes/Ecuador/Emelec/informe-financiero-2023.pdf` (40 págs, ESCANEADO, sin capa de texto → requiere OCR/Mistral; es 1 ejercicio, estados devengados auditados). Fuente: Wayback `20250803112828` de `https://emelec.com.ec/content/uploads/2024/08/EMELEC-INFORME-FINANCIERO-2023.pdf` (el sitio actual rehecho devuelve 404). OJO: la captura `20241012190121` está TRUNCADA a 1.048.576 bytes (PDF roto); sirvió la de 2025-08. El archivo `1.-INFORME-FINANCIERO-1.pdf` (captura 2024-08-15) es el mismo documento (misma carátula y 40 págs) — no se guardó duplicado.
- Otros PDFs de esa tanda en el mismo directorio, NO descargados por no ser financieros directos: `ACTA-DE-ASAMBLEA-SCAN.pdf`, `Adobe-Scan-13-ago-2024.pdf`, `Presentacion1.pdf`, `Exo-pag-7-mar-23-5-1.pdf`, `20240814122858.pdf` (posible presentación/acta del informe: vale abrir si se onboardea 2023).
- Ejercicios anteriores (2018-2022): CDX del dominio completo (19.522 URLs) NO muestra ningún otro informe financiero; el club presentó informes a socios solo en esa asamblea. Prensa dice que los auditados se publican en redes sociales (no verificable). Ejercicios en disco: **1** (2023).
- Candidato a mail/socio: pedir los estados auditados 2019-2022 y 2024 (el estatuto/asamblea los trata como informe anual).
