# FC Basel

- **Deporte**: Fútbol
- **Liga / competencia**: Super League (Suiza, 1ª división)
- **Entidad legal**: FC Basel 1893 AG (CHE-112.786.916, sede Basilea) — sociedad operadora del fútbol
  profesional; el Verein "FC Basel 1893" es la asociación matriz, reportada por separado desde 2021.
- **Canal**: sitio propio del club, `fcb.ch/pages/geschaftsberichte` (antes
  `fcb.ch/club/geschaeftsunterlagen/geschaeftsberichte`, redirige ahí). Confirmado real: publisher
  "fcb.ch" en el propio dominio, PDF con texto nativo (sin OCR), verificado con `pdftotext` sobre
  varios ejercicios (tablas de Bilanz/GuV legibles).

## Qué se bajó (sesión 2026-09-17)

**18 documentos, `Clubes/Suiza/Basel/`**, cubriendo **17 ejercicios (2005-2021)**:

- `geschaeftsbericht-2005.pdf` a `geschaeftsbericht-2020.pdf` — un documento combinado (AG + Verein)
  por año, 2005 a 2020.
- `geschaeftsbericht-unternehmen-2021.pdf` — Geschäftsbericht de la AG (empresa), ejercicio 2021.
- `jahresbericht-verein-2021.pdf` — Jahresbericht del Verein FC Basel 1893, ejercicio 2021 (a partir de
  este año el club separó los dos reportes).

Todos con capa de texto nativa. Verificado con `pdftotext -layout` sobre 2005 (confirma título
"Geschäftsbericht 1. Januar 2005 bis 31. Dezember 2005" e índice con "Die FCB-Jahresrechnung") y sobre
2021-Unternehmen (confirma "Total Aktiven" con cifras en CHF en la Bilanz).

## Dead-end confirmado para 2022 en adelante (sesión 2026-09-17)

La página `fcb.ch/pages/geschaftsberichte` (verificada renderizada completa con el Browser pane, no
solo `curl`) lista como último año disponible 2021 — no hay PDF para 2022, 2023, 2024 ni 2025. Prensa
confirma que el club sigue comunicando cifras (`fcb.ch/aktuell/news/alle-news/
medienorientierung-finanzen-2025`, "FCB verzeichnet erneut Gewinn" en Blick/BaZ), pero solo como rueda
de prensa/Mitgliederversammlung verbal — sin PDF adjunto en la nota, y ningún documento nuevo apareció
en la página de Geschäftsberichte. No se investigó más a fondo (no hay indicio de que exista un PDF
oculto en otra sección); si Guido quiere esos 4 ejercicios, la vía sería pedirle al club directamente
o cubrir el hueco con el agregado de la SFL.

## Fuente alternativa para 2022-2025: SFL Finanzzahlen

Ver `fuentes/Suiza/_notas-generales.md` sección 2 y `Clubes/Suiza/_SFL-Finanzzahlen/` — Basel aparece
en los 5 ejercicios del agregado de liga (2021-2025), así que los años sin Geschäftsbericht propio
tienen igual una Bilanz + Erfolgsrechuung resumida ahí (menos detallada que el Geschäftsbericht
completo, pero real y auditada).

- Último chequeo: 2026-09-17.
