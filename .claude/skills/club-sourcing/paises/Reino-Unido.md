# Reino Unido — Companies House, sirve para CUALQUIER deporte

Toda sociedad limitada británica está obligada por la Companies Act 2006 a depositar cuentas anuales
auditadas, y **Companies House las publica enteras, gratis, sin login, sin API key y sin límite** —
un `curl` con User-Agent de navegador alcanza. No hay equivalente al `auth`/`send` de la CMF chilena,
al Referer del SIIS colombiano ni al pago del OMPIC marroquí. Último chequeo: 2026-09-16.

Como la obligación es por forma jurídica y no por deporte, de un solo barrido salieron 24 entidades
de 4 deportes: 10 clubes de fútbol (9 Premier League + Celtic en Escocia), 4 de rugby union
(Premiership), 4 condados de cricket y 5 escuderías de Fórmula 1.

**Los 3 pasos:**
1. Buscar: `.../search/companies?q=<nombre>` → `href="/company/<número>"`.
2. Listar: `.../company/<número>/filing-history` (y `?page=2` para ir más atrás). El parámetro
   `?category=accounts` **no filtra nada** por `curl`, hay que filtrar por texto uno mismo.
3. Bajar: `.../company/<número>/filing-history/<transactionId>/document?format=pdf&download=0`.
   (Host: `find-and-update.company-information.service.gov.uk`.)

**El tipo de presentación dice qué hay adentro, y hay que leerlo:**
- `Group of companies' accounts` = consolidadas, es lo que conviene.
- `Full accounts` = una sola sociedad; puede dejar afuera actividad del grupo (Manchester City y
  Aston Villa presentan así, y su grupo controlante es otra entidad).
- `Accounts for a medium company` = **puede** venir sin cuenta de resultados, pero no siempre:
  verificado que Bath Rugby FY2024/25 trae el P&L completo igual. No descartar por la etiqueta, abrir
  y buscar `TURNOVER`.
- `Accounts for a dormant company` / `Micro company accounts` = sociedad vacía; la operativa es otra.

**Gotcha central: los PDF de Companies House son ESCANEOS** (`Creator: go-tiff2pdf`), ~1 char/página
con `pdftotext`. Hay que OCRear con el flujo ya conocido del proyecto pero con `-l eng` en vez de
`-l spa`; probado a 200 dpi con `--psm 6` y la calidad es muy buena. Se probó pedir el iXBRL original
(`?format=xhtml` / `?format=xml`, que evitaría el OCR entero): devolvió **HTTP 500**. Vale reintentar
por sociedad, no contar con eso.

**Los clubes de cricket NO están en Companies House.** Son *registered societies* (número terminado
en `R`) y depositan en el **Mutuals Public Register de la FCA**. Buscados en Companies House aparecen
pero con historial de presentaciones VACÍO — no es que no publiquen, es el registro equivocado. El
canal de la FCA resultó incluso mejor:
- Buscar: `https://mutuals.fca.org.uk/Search/Search?SearchTerm=<nombre>` → `/Search/Society/<id>`.
- Listar (JSON, sin login): `https://mutuals.fca.org.uk/Documents/GetSocietiesDocument?societyId=<id>`.
  **Gotcha de parseo**: devuelve dos formas distintas según la sociedad, a veces un array pelado y a
  veces `{sEcho, iTotalRecords, aaData}`. Si no se contemplan las dos, el listado sale vacío sin
  error (6 condados dieron "0 memorias" hasta arreglarlo).
- Bajar: `https://mutuals.fca.org.uk/Documents/Download/<docId>`.
- **Atajo de descubrimiento**: el padrón COMPLETO de las 32.430 sociedades registradas está como CSV
  abierto en `https://fcastoragemprprod.blob.core.windows.net/societylist/SocietyList.csv`. Filtrando
  por nombre se encuentran todas las de un deporte de una (43 con "cricket").
- **Estos PDF SÍ tienen capa de texto** (57.000-131.000 caracteres): `pdftotext -layout` y listo, sin
  OCR. Y el histórico es mucho más profundo que Companies House: Warwickshire tiene 37 memorias desde
  1993 y Surrey 35 desde 1994 — la serie más larga de todo el proyecto.

**Escocia** es el mismo Companies House, con números `SC` (Celtic = `SC003487`).

**Los 20 clubes de la Premier League 2025/26 están cubiertos.** Dos gotchas que costó encontrar:

- **La entidad correcta a veces es una HOLDING separada de la operativa, y el nombre no siempre lo
  delata.** Crystal Palace no está bajo "CPFC Limited" sino bajo `CPFC 2010 Limited` (n° 07206409);
  Burnley no está bajo la sociedad histórica `Burnley Football & Athletic Company, Limited`
  (00054222) sino bajo `Burnley FC Holdings Limited` (n° 08335231). El indicio para elegir bien:
  filtrar candidatos por SIC "93120 Activities of sport clubs", comparar cuál presenta `Group of
  companies' accounts` (consolidado, lo que conviene) en vez de solo `Full accounts`, y cruzar los
  directores listados con los dueños conocidos del club por prensa (Steve Parish/Josh
  Harris/Woody Johnson para Palace, Alan Pace/ALK Capital para Burnley) antes de asumir que la
  primera coincidencia de nombre es la correcta.
- **Un club con historia de administración judicial puede tener DOS entidades en Companies House,
  y el historial de la nueva no llega más atrás de su año de incorporación.** Leeds United tiene una
  entidad vieja disuelta (`Leeds United Association Football Club Limited (The)`, n° 00170600,
  dissolved 2019) y la actual (06233875, incorporada 2007) — el filing history de la actual no
  cubre nada anterior a 2013. Si en el futuro se agrega un club de la EFL con pasado de
  administración/liquidación (ej. Portsmouth, Bury), buscar ambas entidades antes de concluir que
  "no hay historial viejo".
- **La fecha de cierre de ejercicio puede cambiar dentro de la misma serie de un club** (no es un
  error de transcripción): Wolves y Nottingham Forest cerraban el 31 de mayo y pasaron al 30 de
  junio en su presentación más reciente; Burnley pasó del 30 de junio al 31 de julio en 2020. Antes
  de cargar al sitio un ejercicio de transición, chequear si cubre 12 o 13 meses.

**Qué queda de Reino Unido**: los clubes de la EFL (segunda a cuarta división), los 9 condados de
cricket restantes (ya identificados en el CSV), el resto de Premiership Rugby, la Super League de
rugby league, y profundizar el histórico (años extra) de los 20 clubes de Premier ya cubiertos. No
hay nada que investigar en ninguno de esos, es ejecutar el mismo procedimiento.

## Redes sociales y sitios de fans

**Reddit: SÍ rinde, pero no con WebSearch/Exa ni con la API oficial — piloto del 2026-09-27, to-do
81 de `Admin/TODO.md`.** `WebSearch` (`site:reddit.com`) y Exa (con `includeDomains` real) no
devuelven NINGÚN contenido de `reddit.com`, mismo patrón que `twitter.com`/`x.com` (to-do 80) — es
un límite de esas dos herramientas, no de Reddit. La API oficial de Reddit también está cerrada para
este uso (solo aprueba apps nuevas con "valid moderation use case", ver to-do 81 para el detalle).

**Lo que sí funcionó: Arctic Shift (`arctic-shift.photon-reddit.com`) y PullPush (`pullpush.io`)**,
dos archivos comunitarios de Reddit (sucesores de Pushshift) gratis y sin cuenta. Con ellos, 4 de 5
clubes ingleses dieron HIT real: `r/nffc` (discusión de un filing en Companies House), `r/Everton`
(post oficial del club anunciando su Annual Report and Accounts real), `r/NUFC` (varios filings de
Companies House citados con detalle) y `r/Gunners` (un acuerdo de préstamo de Arsenal registrado en
Companies House). `r/safc` (Sunderland, 6.787 miembros) dio MISS — 0 resultados en 3 términos
financieros pese a que el subreddit está activo.

**La variable que decide HIT/MISS es el tamaño del subreddit, no que sea un club inglés**: los 4 HIT
fueron en comunidades de ~22.000 miembros para arriba (nffc 21,9k, Everton 61,7k, NUFC 76k, Gunners
431k); el único MISS (Sunderland) tiene 6,8k. El mismo patrón se repitió en Brasil y Argentina (ver
`paises/Brasil.md`) con clubes de subreddits grandes — la hipótesis de que esto es "cosa de países
angloparlantes" quedó refutada por los datos. Antes de descartar un club por esto, chequear el
tamaño de su subreddit real (`/api/subreddits/search?subreddit_prefix=` de Arctic Shift), no su
país.

## Barrido de profundidad y EFL (2026-10-03) — herramientas y reglas

**No hace falta bajar a mano**: `node tools/companies-house-fetch.mjs <número|nombre> --list` lista los
ejercicios (con un nombre en vez de número busca la sociedad); `--club "<Carpeta>" --slug <x> --want 5`
baja los que falten hasta tener 5. Para cricket: `node tools/fca-mutuals-fetch.mjs <societyId> ...`
(el societyId sale de `https://mutuals.fca.org.uk/Search/Search?SearchTerm=<número>R`). Para Manchester
United y otros cotizantes en EE.UU., el canal es EDGAR (20-F), no Companies House.

- **"Total exemption full accounts" / "small" / "micro" NO implican ni dan por hecho falta de cuenta de
  resultados**: verificado por OCR que Newport, Bromley, Crawley 2016-19 y Oxford 2019/20-2022/23 SÍ la
  traen, y que Barnet, Salford (sociedad propia), Notts County, Doncaster, Port Vale, Stockport y Crawley
  2019/20+ NO (omiten el income statement, s.444 Companies Act). Casi siempre son documentos de ≤15
  páginas. El script las saltea salvo `--include-small`; hay que bajar una y buscar TURNOVER.
- **El nombre del club puede ser un cascarón.** Doncaster Rovers FC Ltd (00170192) muestra solo pasivos;
  Bolton (12184224) y Portsmouth (11538360) presentan "dormant". La sociedad operativa es otra (holding
  del dueño): se encuentra por directores/PSC o por búsqueda web, no por nombre. Resueltos así: Bolton ->
  Football Ventures (Whites) Ltd 11761052; Portsmouth -> Portsmouth Community Football Club Ltd 07940335;
  Fleetwood -> Fleetwood Wanderers Ltd 03359117; Salford -> Project 92 Ltd 09112699; Chesterfield -> CFC
  2001 Ltd 04273743; Doncaster -> Doncaster Rovers Limited 03739676 (sin P&L).
- **Holding vs. operativa**: si la holding presenta `Group of companies' accounts`, se baja esa (Cardiff
  04044254, Blackpool 12022161); si no, la operativa. Un club reconstituido tras administración tiene una
  entidad nueva con serie corta (Wigan 13161421: exactamente 5 ejercicios desde 2021).
- **Un club puede presentar versión "Amended" (AAMD)** además de la original (Exeter 2024/25, Norwich
  2019/20): verificar cuál es la vigente.
- **Fechas absurdas**: Companies House parsea mal presentaciones de los años 70 (1974 sale como 2074);
  hay que descartar fechas futuras.
- **FCA: el mismo ejercicio puede tener dos documentos** (reenvío; Leicestershire 2025): queda el de
  mayor `docId`.
- Estado: Premier, Championship y gran parte de League One/Two cubiertos con 5 ejercicios; detalle y
  pendientes en `fuentes/Inglaterra/_notas-generales.md` sección 6.
