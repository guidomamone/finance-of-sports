# Brøndby IF

- **Deporte**: Fútbol
- **Liga / competencia**: Superliga (Dinamarca, 1ª división)
- **Entidad legal**: Brøndbyernes I.F. Fodbold A/S (CVR 83 93 34 10), Brøndby Stadion 30, 2605
  Brøndby.
- **Canal**: `distribution.virk.dk`. Ver `fuentes/Dinamarca/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-17)

**30 ejercicios, serie COMPLETA 1995-2025**, `Clubes/Dinamarca/Brøndby/`:

- Calendario (ene-dic) 1995 a 2022 — `aarsrapport-1995-12-31.tif` a `aarsrapport-2022-12-31.xhtml`.
- Ejercicio de TRANSICIÓN de 18 meses (01/01/2023 a 30/06/2024, al cambiar el cierre de ejercicio):
  `aarsrapport-2023-2024-06-30-transicion.xhtml`.
- Fiscal julio-junio desde 2024/25: `aarsrapport-2025-06-30.xhtml`.
- Formatos: `.tif` hasta 2013, `.pdf` con capa de texto real 2014-2020, `.xhtml` (ESEF/iXBRL) desde
  2021.

## Gotcha encontrado en esta sesión: el "PDF" del ejercicio 2024/25 es una carátula vacía

El depósito de `aarsrapport-2025-06-30` incluía tanto un PDF (1.441 bytes) como un `.xhtml`
(412 KB) — el PDF resultó ser solo una carátula genérica de 1 página ("PDF generado por
erhvervsstyrelsen.dk", sin contenido real), no el informe completo. Se descartó y se guardó el
`.xhtml` en su lugar (que sí tiene el contenido completo). Ver sección 1 de
`fuentes/Dinamarca/_notas-generales.md` — puede repetirse en otros clubes/ejercicios recientes,
chequear el tamaño del PDF antes de asumir que es el documento completo.

## Verificación hecha en esta sesión

CVR 83 93 34 10 confirmado vía `cvrapi.dk` (dirección y forma societaria Aktieselskab).

## Dudas / pendientes

Ninguna.

- **CARGADO al sitio (2026-09-25)**: ejercicio 2020, `data/brondby-dk-data.js` (clubId
  `brondby-dk`). Tie-out exacto (se corrigió un typo de decimal en la transcripción original: un
  sub-ítem "Bestyrelseshonorar" transcripto como -499 en vez de -0,499, encontrado por el
  chequeo de `node tools/audit.js`).

- Último chequeo: 2026-09-17.
