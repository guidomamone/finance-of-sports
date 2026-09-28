# Green Bay Packers

**Ángulos**: sitio oficial: parcial — encontrados 3 Annual Reports reales (FY2017, FY2020, FY2022) vía
el portal de shareholders (Broadridge), pero los de FY2023-FY2026 no se encontraron descargables
(solo cifras citadas en notas de packers.com/prensa) · regulador/país: no aplica — la SEC no exige
nada porque las acciones de Green Bay Packers, Inc. no cotizan en ningún mercado (no hay obligación
de registro bajo la Exchange Act pese a ser "propiedad pública") · Wayback CDX: parcial — dominio
`packers.com` sin barrer completo, sí se barrió `shareholder.broadridge.com` (dominio del portal de
shareholders) encontrando los 3 PDFs de arriba · búsqueda web: agotado para años recientes (solo
cifras de prensa, sin PDF nuevo encontrado) · barrido: 1 (Sonnet) — 2026-09-27

- **Deporte**: Fútbol americano
- **Liga / competencia**: NFL (Estados Unidos) — División Norte de la Conferencia Nacional
- **Entidad legal**: **Green Bay Packers, Inc.** — el ÚNICO club de las 4 grandes ligas de EE.UU. de
  propiedad pública sin fines de lucro: ~5,2 millones de acciones en manos de ~539.000 accionistas
  (ninguno puede tener más de 200.000 acciones, las acciones no pagan dividendo ni se revalorizan, y
  no cotizan en ningún mercado — existen para financiar el estadio, no como inversión). Por eso NO es
  un emisor de la SEC (confirmado: no aparece en `company_tickers.json`, el padrón completo de
  emisores) — la obligación de reportar de la Exchange Act depende de cotizar en un mercado público o
  superar un umbral de tenedores de un valor NO listado, y las acciones de los Packers están
  estructuradas para no disparar ninguna de las dos.

## Por qué esto NO es un dead-end (a diferencia de las otras 3 grandes ligas)

La estructura societaria hace que el club esté OBLIGADO, por sus propios estatutos, a rendir cuentas
ante sus accionistas una vez al año: la Asamblea Anual de Accionistas (fines de julio, en Lambeau
Field) incluye un **"Treasurer's Report to Shareholders"** con Estado de Resultados y Balance
resumidos, auditados por una firma independiente (Wipfli LLP). Ese reporte se publica como parte de
un **Annual Report** en PDF, distribuido originalmente a través del portal de shareholder services
que la organización tiene tercerizado en Broadridge Financial Solutions
(`shareholder.broadridge.com`).

**Gotcha real encontrado**: el portal en vivo (`shareholder.broadridge.com/gbp/`) está atrás de un
login (es para accionistas registrados), y las URLs directas de los PDFs de años recientes que cita
la prensa (ej. `shareholder.broadridge.com/pdf/2022-packers-annual-report.pdf`) devuelven **HTTP 404
en vivo hoy** — Broadridge los da de baja con el tiempo. Pero Wayback Machine SÍ los había archivado
cuando estaban públicos, así que siguen siendo recuperables ahí. Confirmado también el gotcha ya
documentado en `club-sourcing` (sección 0.1, familia 3): la primera captura de
`green-bay-packers-2017-annual-report.pdf` en Wayback estaba truncada a exactamente 1.048.576 bytes
(1 MiB) — `pdfinfo` no devolvía ninguna página. Reintentando con otro timestamp de la misma URL
(`20201112013454` en vez de `20200928124524`) se consiguió la versión completa (24 páginas).

## Qué se bajó (sesión 2026-09-27)

En `Clubes/Estados Unidos/Green Bay Packers/`:

- `green-bay-packers-annual-report-2016-17.pdf` (24 páginas, 2,0 MB) — ejercicio fiscal 2016-17
  (año fiscal termina el 31/3). Vía Wayback, timestamp `20201112013454` de
  `shareholder.broadridge.com/pdf/gbp/green-bay-packers-2017-annual-report.pdf`.
- `green-bay-packers-annual-report-2019-20.pdf` (24 páginas, 2,0 MB) — ejercicio fiscal 2019-20. Vía
  Wayback, timestamp `20210304142025` de
  `shareholder.broadridge.com/pdf/gbp/green-bay-packers-2020-annual-report.pdf`.
- `green-bay-packers-annual-report-2021-22.pdf` (28 páginas, 3,5 MB) — ejercicio fiscal 2021-22. Vía
  Wayback, timestamp `20260412234319` de
  `shareholder.broadridge.com/pdf/2022-packers-annual-report.pdf`.

Los 3 son HTML→PDF con texto real (no escaneos, `pdftotext -layout` los lee perfecto), cada uno con
su "Treasurer's Report to Shareholders": Statement of Income (Revenue por National/Local, Expenses
por Player costs/Team/Sales-marketing-fan engagement/Facilities/G&A, Profit from Operations, Net
Income) y Balance Sheet (Assets: Cash & investments, Unamortized signing bonuses net, Property &
equipment net, Other; Liabilities & Equity: Debt, Compensation liabilities, Other liabilities,
Equity), con comparativo del año anterior y un gráfico de barras con 4 años de histórico cada uno —
o sea que estos 3 PDFs solapados entre sí dan una serie de revenue/expenses continua desde FY2016
hasta FY2022 sin huecos.

**Normativa contable**: US GAAP. Auditor: Wipfli LLP (confirmado en el PDF de FY2022: "unqualified
opinion", los estados FY2022 y FY2021 "presented fairly in conformity with U.S. generally accepted
accounting principles").

## Cifras de control ya verificadas (leídas de los propios documentos)

| Ejercicio fiscal (cierra 31/3) | Total revenue | Total expenses | Profit from Operations | Net Income |
|---|---|---|---|---|
| FY2016 (comparativo en el PDF de FY2017) | $408,711 miles | $333,687 miles | $75,024 miles | $48,941 miles |
| FY2017 | $441,402 miles | $376,050 miles | $65,352 miles | $72,772 miles |
| FY2019 (comparativo en el PDF de FY2020) | $477,943 miles | $477,219 miles | $724 miles | $8,368 miles |
| FY2020 | $506,885 miles | $436,582 miles | $70,303 miles | $34,862 miles |
| FY2021 (comparativo en el PDF de FY2022) | $371,065 miles | $409,851 miles | $(38,786) miles | $60,679 miles |
| FY2022 | $579,011 miles | $501,286 miles | $77,726 miles | $61,572 miles |

Las 6 columnas están verificadas línea por línea contra los 3 PDFs (cada uno trae el ejercicio
propio y el anterior como comparativo) — entre los tres se arma una serie sin huecos de FY2016 a
FY2022, salvo FY2018 (ninguno de los 3 PDFs bajados lo trae como comparativo; el gráfico de barras sí
lo menciona: revenue $454,4 M según el PDF de FY2020). El desglose completo por rubro (Player costs,
Team, Sales & marketing/fan engagement, Facilities/Operations & maintenance, G&A) y el Balance Sheet
de cada ejercicio están en el cuerpo de cada PDF, listos para `club-data-mapping` cuando se decida
onboardear este club.

**Moneda**: USD nativo, no hace falta conversión.

## Qué falta (ejercicios FY2023 a FY2026, conocidos por prensa pero sin PDF confirmado)

Prensa (`packers.com/news`, Fox11, CBS Sports, Sportico) cita cifras de los últimos 4 ejercicios,
señal fuerte de que el documento SÍ existe y se sigue publicando cada año en el mismo formato:

- FY2023: operating profit $68,6 M.
- FY2024: operating profit $60,1 M.
- FY2025: operating profit $83,7 M, revenue total $719 M (Sportico).
- FY2026: revenue total $753 M, net income $132,5 M, operating loss $1,1 M (por única vez, por
  costos de jugadores), non-operating income $133,6 M (incluye la venta de NFL Network a ESPN).

No se encontró el PDF descargable de ninguno de estos 4 años — ni en `packers.com` ni en
`shareholder.broadridge.com` (probados los patrones de nombre de archivo `<año>-packers-annual-
report.pdf` y `green-bay-packers-<año>-annual-report.pdf` para 2018, 2019, 2021, 2023, 2024, 2025 y
2026: todos 404 en vivo y sin captura en Wayback). Es probable que Broadridge haya migrado la
distribución a otro dominio (el CSP del portal en vivo menciona `materials.proxyvote.com`, otro
producto de Broadridge para materiales de asamblea) o que el reporte ya no se aloje como PDF público
sino solo se entregue a accionistas registrados vía el login. **Próximo paso concreto si se retoma**:
buscar en `materials.proxyvote.com` con el identificador de la asamblea de Packers, o pedirle
directamente a shareholder services (`shareholderservices@packers.com`, 855-846-7225) el PDF de los
últimos ejercicios — no es un mail "candidato a outreach" en el sentido de `club-outreach` (no hay
duda de club, es simplemente el canal de distribución activo hoy), así que no se anotó en
`Admin/dudas-por-club.md`.

- Último chequeo: 2026-09-27.
