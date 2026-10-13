# Lillestrøm Sportsklubb (LSK)

- **Deporte**: Fútbol
- **Liga / competencia**: Eliteserien (Noruega, 1ª división)
- **Entidad legal**: LILLESTRØM SPORTSKLUBB, org.nr. 967 732 311, forma jurídica **FLI**. Fundada
  1917-04-02, Lillestrøm. Se buscó explícitamente una AS dedicada al fútbol profesional (mismo
  patrón que Sandefjord/Fredrikstad/Vålerenga) — **no existe ninguna**: las únicas AS relacionadas
  con "LSK" en el registro son `LSK Eiendom AS` (inmobiliaria), `LSK-Hallen AS` (operador del
  estadio/pabellón) y una `LSK Holding AS` que resultó ser un HOMÓNIMO sin relación real (con sede
  en Kristiansand, no en Lillestrøm — descartada).
- **Canal**: Regnskapsregisteret, descarga directa
  `https://data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/967732311/<año>`.

## Qué se bajó (sesión 2026-09-17)

**Solo 4 ejercicios**, `Clubes/Noruega/Lillestrøm/`: `aarsregnskap-2008.pdf` a
`aarsregnskap-2011.pdf`. Nada depositado desde 2012 en adelante bajo esta entidad — el peor
resultado de profundidad histórica de los 16 clubes de esta sesión después de KFUM Oslo.

Escaneos sin capa de texto.

## Dudas / pendientes — resultado llamativo, vale la pena escribirle al club

- **El club SÍ publica voluntariamente "Årsberetning" (memoria + resultado) en su propio sitio
  (`lsk.no`) hasta 2023** (`https://www.lsk.no/nyheter/her-kan-du-laste-ned-arsberetningen-for-2023/`)
  pero el organismo regulador no muestra ningún depósito posterior a 2011 bajo el org.nr. correcto
  — contradicción real, no explicada en esta sesión. El PDF de 2023 descargado del sitio del club
  tiene capa de texto (Calibri/Arial embebidos) y menciona subsidiarias (`Åråsen Eiendom AS`,
  `LSK-Hallen AS`), pero no se encontró una tabla de resultado/balance formal dentro de sus 66
  páginas en esta sesión (puede estar en páginas no revisadas, o el documento puede ser solo la
  memoria narrativa sin los estados contables formales adjuntos).
  - **Candidato fuerte para `dudas-por-club.md`**: preguntarle al club directamente por qué su
    årsregnskap no aparece en Regnskapsregisteret desde 2012, y si el `Årsberetning` que publican en
    su sitio incluye o no el estado de resultados y balance auditado completo (y si es así, pedir el
    documento completo si el sitio no lo tiene íntegro).
  - Se descargó (no incluido en `Clubes/` porque no es el documento oficial buscado, solo referencia
    de esta sesión) `lsk.no/.../Årsberetning LSK 2023 oppdatert.pdf` para esta investigación — si se
    decide usarlo como fuente secundaria voluntaria, hay que revisarlo página por página primero.

- Último chequeo: 2026-09-17.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: sitio oficial: HIT (`lsk.no/om-klubben/arsmote` y `lsk.no/nyheter/her-kan-du-laste-ned-arsberetningen-for-<año>`) · registro Brønnøysund: agotado (0 depósitos desde 2012 bajo 967732311; LSK Kvinner FK y LSK-Hallen AS son otras entidades) · Wayback CDX de dominio: HIT (completó 2018-2021) · barrido: 2 (Sonnet) — 2026-10-08

**Resuelta la contradicción de la sesión anterior**: las "Årsberetning" de LSK NO son solo memoria: traen el **årsregnskap completo del club** (Resultatregnskap, Balanse, notas, revisors beretning) y, desde 2023, también el **konsern** (grupo). Siete informes nuevos en `Clubes/Noruega/Lillestrøm/`:
- `lsk-arsberetning-2018-escaneo.pdf` (61 págs.) y `-2019-escaneo.pdf` (57 págs.): escaneos; el OCR encuentra "Driftsinntekter" en las págs. de cuentas (35-49 el 2018; 34-51 el 2019).
- `lsk-arsberetning-2020.pdf` (51 págs.), `-2021.pdf` (56), `-2022.pdf` (56): con capa de texto. Sum driftsinntekter: 2020 NOK 56.364.322 · 2021 NOK 83.180.665 · 2022 NOK 109.895.118.
- `lsk-arsberetning-2023.pdf` (66 págs.): la tabla que precede al "Balanse - konsern" da NOK 217.376.006 (2023) contra 152.657.470 (2022); son cifras del konsern (el 2022 del club solo era 109.895.118). Falta ubicar el estado del club solo de 2023. Existe además una versión "finale" de 68 págs. (11 MB) en `lsk.no/om-klubben/arsmote/_/attachment/inline/67d103fc-...-Årsberetning finale 2023.pdf`, no guardada porque parece la misma cifra; comparar si hay dudas.
- `lsk-arsberetning-2024.pdf` (76 págs., "ÅRSREGNSKAP 2024 LSK" p. 4 y "KONSERN" p. 51 según su índice): la captura de Wayback 20250906 salió truncada a 5 MiB; se usó la de 20250225.
- `lsk-arsberetning-2025.pdf` (67 págs.): club NOK 10,3 M y 128,9 M (dos estados en el mismo informe; revisar cuál es club y cuál konsern).
- Ojo al categorizar: hay que elegir entre club solo y konsern, y el perímetro cambió en 2023.
- Falta 2012-2017: el sitio solo conserva desde 2018 y Wayback no tiene los de antes.

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 1 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas ninguna; `wf-src-*`: 1 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
