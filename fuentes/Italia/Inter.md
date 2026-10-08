# Inter (FC Internazionale Milano)

**Ángulos**: sitio oficial: agotado (investor-relations + club-transparency) · Wayback CDX: usado (FY2018 y FY2019 de Inter Media, otra entidad) · búsqueda web: Exa · regulador/país: no aplica · barrido: 3 (Sonnet+Exa) — 2026-10-07

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: F.C. Internazionale Milano S.p.A. (Gruppo FC Inter), dueño desde mayo 2024:
  Oaktree Capital Management (ejecutó la prenda sobre las acciones de Suning/Grand Tower tras el
  default de la deuda). El club NO cotiza directo, pero SÍ publica estados financieros completos
  porque **una subsidiaria del grupo, Inter Media and Communication S.p.A., emitió bonos** (Senior
  Secured Notes) que cotizan y la obligan a disclosure — mismo patrón "vehículo de deuda cotizante"
  que abre la puerta a las cuentas del club entero.
- **Canal**: sección propia `inter.it/en/club/investor-relations`, gratis, sin login. Publica DOS
  perímetros distintos que no hay que confundir: "Inter Media and Communication S.p.A." (el emisor
  del bono, un vehículo de derechos de media/sponsor, NO el club entero) e "FC Inter Group" /
  "Gruppo FC Inter" (el grupo consolidado completo, lo que corresponde cargar al sitio).

## Qué se bajó (sesión 2026-09-17)

**5 ejercicios del perímetro "FC Inter Group" (consolidado completo)**, en `Clubes/Italia/Inter/`:
FY2019/20, FY2021/22, FY2022/23, FY2023/24 y FY2024/25 —
`Inter-fascicolo-bilancio-consolidato-<ejercicio>.pdf`.

- **FY2019/20 se recuperó de Wayback Machine**: la URL original (`static.inter.it/media/downloads/...`)
  ya no resuelve — el subdominio `static.inter.it` fue dado de baja. `curl` a esa URL da
  `Could not resolve host`. Snapshot de Wayback del 2022-01-23 sirvió el PDF completo (4,6 MB,
  `pdfinfo` OK).
- **FY2020/21 NO se encontró como "FC Inter Group" completo** — el selector de esa temporada solo
  ofrece el reporte de "Inter Media and Communication S.p.A." (el vehículo de deuda, no el club
  entero) más un "Management Report" suelto sin los estados contables completos. No se cargó nada de
  ese ejercicio para no mezclar perímetros.
- **FY2017/18 y FY2018/19 tampoco tienen "FC Inter Group"**: solo existe el reporte de Inter Media
  (perímetro distinto, ver arriba) — mismo criterio, no se bajaron.

## Verificación hecha en esta sesión

5 PDF confirmados `PDF document` real, entre 4,7 MB y 24,7 MB. Sin truncamientos.

## Dudas / pendientes

Confirmar con Guido si el perímetro "Inter Media and Communication S.p.A." (que SÍ tiene serie
ininterrumpida 2017-2025, con textos íntegros en inglés y cero necesidad de OCR) vale la pena cargar
como dato complementario o directamente descartarlo por no ser el club entero — candidato para
`dudas-por-club.md`.

- Último chequeo: 2026-09-17.

- **Color de marca**: `#00239C` (azul) — nerazzurro (it.wikipedia, Football_Club_Internazionale_Milano); desempate por el theme-color de inter.it (#011ea0); hex de footylogos. Elegido por Claude (Guido delega el color, 2026-10-06), verificado 2026-10-06.

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2022 desde `Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2021-22.pdf` (sourceId `inter-it-fascicolo-bilancio-consolidato-2021-22`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2025 desde `Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.pdf` (sourceId `inter-it-fascicolo-bilancio-consolidato-2024-25`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2020 desde `Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2019-20.pdf` (sourceId `inter-it-fascicolo-bilancio-consolidato-2019-20`).

## Sesión de sourcing Italia sección 1 (2026-10-07): +3 ejercicios (2017/18, 2018/19, 2020/21), total 8

La página `inter.it/it/club/club-transparency` (no solo `investor-relations`) lista el consolidado del Gruppo FC Internazionale por partes; `static.inter.it` está muerto pero las mismas rutas sirven en `www.inter.it`.

- **2020/21** (consolidado, traducción al inglés, 76 págs, completo con notas): `https://www.inter.it/media/pdf/Inter-management-report-30.06.2021b.pdf` -> `Inter-fascicolo-bilancio-consolidato-2020-21-en.pdf`. Las partes en italiano están en `inter.it/media/downloads/2022/2022_04_11_16_37_*Consolidato Inter {Nota integrativa|Relazione sulla gestione|IV CEE|Rendiconto Finanziario|Relazione collegio sindacale|Relazione societa revisione} 30.06.2021.pdf` (no bajadas: se prefirió el único PDF completo).
- **2018/19** (italiano, partes unidas con `pdfunite`, 67 págs): `https://www.inter.it/media/downloads/2020/2020_04_27_09_27_05FC%20Group%20Nota%20Integrativa%2030.06.2019%20ITA.pdf` + `..._09_29_03FC Group Relazione sulla Gestione...`, `..._09_30_04FC Group IV CEE...`, `..._09_32_12FC Group Rendiconto Finanziario...`, `..._09_30_25FC Group Relazione Collegio Sindacale 30.06.2019.pdf`, `..._09_32_42FC Group Auditors Report 30.06.2019 ITA.pdf` -> `Inter-fascicolo-bilancio-consolidato-2018-19.pdf`. Texto nativo salvo el informe de revisión (escaneo).
- **2017/18** (italiano, partes unidas, 66 págs, **escaneado, sin capa de texto**): `https://www.inter.it/media/jpg/img2017/club-transparency/2017-18/Gruppo_FC_Internazionale_Milano_{Nota_Integrativa|Relazione_sulla_Gestione_e_Schemi_di_Bilancio|Rendiconto_Finanziario|Relazione_Collegio_Sindacale|Relazione_Societ%C3%A0_di_Revisione}.pdf` -> `Inter-fascicolo-bilancio-consolidato-2017-18.pdf`.
- **Sin encontrar**: 2016/17 y antes (la página no lista nada anterior a 2017-18). Los `Appendix 1 ... Annual Financial Statements` de 2018/2019/2021 en `inter.it/media/downloads/` son de **Inter Media and Communication S.p.A.** (subsidiaria del bond), NO del grupo: no se bajaron.
- **2025/26**: el CdA aprobó el proyecto el 2026-09-24 (utile 22,7 M, ricavi 518 M; asamblea a mediados de octubre); el fascicolo todavía no está publicado. Revisar a partir de noviembre.

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2019 desde `Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2018-19.pdf` (sourceId `inter-it-fascicolo-bilancio-consolidato-2018-19`).
