# Inglaterra — notas generales (sesión 2026-09-13, primer barrido)

**Primer país anglosajón del proyecto, y el primero con más de un deporte.** Hasta esta sesión el
sitio tenía 41 clubes de 6 países, todos de fútbol. Inglaterra entra con 4 deportes a la vez
(fútbol, rugby union, cricket y Fórmula 1) porque el hallazgo NO es un canal por deporte: es un
canal por FORMA JURÍDICA, y da igual a qué juegue la entidad.

## 1. Companies House — el canal, y por qué es el mejor del proyecto hasta ahora

Toda sociedad limitada registrada en Inglaterra y Gales (y Escocia, con números `SC`) está obligada
por la Companies Act 2006 a depositar cuentas anuales auditadas ante **Companies House**, y el
registro las publica enteras, **gratis, sin login, sin API key y sin límite de descargas**. No hay
equivalente a la pelea de la CMF chilena con los parámetros `auth`/`send`, ni al pago del OMPIC
marroquí, ni al login de socios uruguayo: es un `curl` con un User-Agent de navegador.

Comparado con los canales ya conocidos del proyecto:

| | Chile (CMF) | Colombia (SIIS) | Inglaterra (Companies House) |
|---|---|---|---|
| Cobertura | solo clubes RVEMI | solo clubes S.A. | **toda sociedad limitada, sin excepción** |
| Navegación | clics reales obligatorios | visor + Referer + materializar | URL directa, predecible |
| Histórico | 16-17 años | hasta 10 ejercicios | 6-21 ejercicios según club |
| Deportes | fútbol | fútbol | cualquiera |

**Los 3 pasos, todos con `curl -sL -A "<UA de navegador>"`:**

1. **Buscar la sociedad**
   `https://find-and-update.company-information.service.gov.uk/search/companies?q=<nombre>`
   Devuelve HTML con `href="/company/<número>"`. El número es la clave de todo lo demás.
2. **Listar el historial de presentaciones**
   `https://find-and-update.company-information.service.gov.uk/company/<número>/filing-history`
   Cada fila trae la descripción (`Group of companies' accounts made up to 31 May 2025`) y un
   `filing-history/<transactionId>/document`. OJO: el parámetro `?category=accounts` de la URL
   **no filtra nada** en la respuesta que llega por `curl` (devuelve el historial completo igual),
   así que hay que filtrar por texto del lado de uno. Son ~25 filas por página, `?page=2` y
   siguientes para ir más atrás.
3. **Bajar el PDF**
   `https://find-and-update.company-information.service.gov.uk/company/<número>/filing-history/<transactionId>/document?format=pdf&download=0`
   Devuelve el PDF directo (HTTP 200, `application/pdf`), 0,9-4,5 MB.

## 2. Qué significa cada tipo de presentación (esto SÍ cambia qué se puede cargar)

La descripción de la fila no es decorativa, dice qué hay adentro:

- **`Group of companies' accounts`** — cuentas CONSOLIDADAS del grupo. Es lo que hay que preferir
  siempre: incluye las subsidiarias (estadio, merchandising, media) y es lo comparable con lo que
  publica la prensa como "los ingresos del club".
- **`Full accounts`** — cuentas completas de UNA sola sociedad. Sirve igual, pero puede dejar afuera
  actividad que el club tiene en otra sociedad del grupo. Manchester City, Aston Villa y West Ham
  presentan así.
- **`Accounts for a medium company`** — acá está la trampa: la ley permite a una sociedad mediana
  presentar cuentas abreviadas SIN cuenta de resultados. **No asumir que no sirve: hay que abrir y
  mirar.** Verificado en esta sesión con Bath Rugby FY2024/25, que a pesar de la etiqueta trae el
  P&L completo (`TURNOVER 23.339.778`, contra 20.822.985 del ejercicio anterior). Harlequins presentó
  así 2023/24 y 2024/25 — por eso de Harlequins se bajó además el `Full accounts` de 2022/23, como
  respaldo por si esos dos resultan abreviados de verdad.
- **`Accounts for a dormant company`** / **`Micro company accounts`** — sociedad vacía. Si el club
  aparece así, esa NO es la sociedad operativa: hay otra. Pasó con `DURHAM COUNTY CRICKET CLUB`
  (02597613), que es un cascarón; el club de verdad es una registered society (ver sección 4).

## 3. Gotcha grande: los PDF de Companies House son ESCANEOS, sin capa de texto

Medido con el mismo criterio que ya usa el proyecto para Racing (`pdftotext` y chars/página): el
PDF de Arsenal FY2024/25 devuelve **34 caracteres para 34 páginas**, o sea ~1 char/pág. Son imágenes
TIFF empaquetadas en PDF (el metadato lo confirma: `Creator: go-tiff2pdf`, `Producer: libtiff /
tiff2pdf`). Esto vale para TODOS los documentos de Companies House chequeados en esta sesión, sean
de fútbol, rugby o F1.

Consecuencia práctica: para transcribirlos hay que ir por OCR, exactamente el flujo que ya está
documentado en `club-data-mapping/SKILL.md` sección 15, pero con **`-l eng` en vez de `-l spa`**.
Probado en esta sesión y la calidad es muy buena a 200 dpi (`pdftoppm -png -r 200` +
`tesseract --psm 6`): el texto corrido sale limpio y las tablas numéricas también.

Se probó además si Companies House sirve el iXBRL original (`?format=xhtml` y `?format=xml`, que
serían texto de máquina y ahorrarían el OCR entero): devuelve **HTTP 500** para las cuentas de
Arsenal. Vale reintentarlo por sociedad antes de OCRear — una sociedad que presentó
electrónicamente podría tenerlo —, pero no contar con eso.

## 4. Los clubes de cricket NO están en Companies House: están en el registro de mutuales de la FCA

Los condados de cricket no son sociedades limitadas sino **registered societies** (ex "industrial
and provident societies"), y se las reconoce porque su número termina en `R` (`27896R` Surrey,
`28451R` Lancashire). Buscadas en Companies House aparecen listadas, pero **su historial de
presentaciones viene vacío** — no es un error, es que no depositan ahí.

Depositan en el **Mutuals Public Register de la FCA** (`mutuals.fca.org.uk`), que resultó ser un
canal todavía MEJOR que Companies House:

1. **Buscar**: `https://mutuals.fca.org.uk/Search/Search?SearchTerm=<nombre>` → HTML con
   `href="/Search/Society/<societyId>"` (id numérico interno, distinto del número de registro).
2. **Listar documentos** (JSON, sin login):
   `https://mutuals.fca.org.uk/Documents/GetSocietiesDocument?societyId=<id>`
   Cada fila es `[fecha, nombre de archivo, categoría1, categoría2, docId, texto del link]`.
   **Gotcha de parseo**: el endpoint devuelve DOS formas distintas según la sociedad — a veces un
   array JSON pelado, a veces un objeto `{sEcho, iTotalRecords, aaData}` con el array adentro. Hay
   que contemplar las dos o el listado sale vacío sin avisar (pasó en esta sesión: 6 condados
   dieron "0 memorias" hasta arreglar el parseo).
3. **Bajar**: `https://mutuals.fca.org.uk/Documents/Download/<docId>`.
4. **Atajo de descubrimiento**: la FCA publica el padrón COMPLETO de las 32.430 sociedades
   registradas como un CSV abierto en
   `https://fcastoragemprprod.blob.core.windows.net/societylist/SocietyList.csv`
   (nombre, número, tipo, dirección, alta/baja, estado). Filtrando por nombre se encuentra de una
   cualquier club constituido así, sin ir de a uno — 43 entidades con "cricket" en el nombre.

**Por qué es mejor que Companies House**: estos PDFs **SÍ tienen capa de texto** (57.000 a 131.000
caracteres por documento), o sea `pdftotext -layout` y listo, sin OCR. Y el histórico es mucho más
profundo: Surrey tiene **35 memorias anuales desde 1994**, Warwickshire 37 desde 1993. Es la serie
más larga de cualquier canal del proyecto.

El formato es un formulario `Annual Return (AR30)` de la FCA con los estados financieros auditados
completos adjuntos atrás — o sea que el documento trae la memoria del club entera, no solo el
formulario.

## 5. Lo que queda sin explorar (sugerencias concretas, no "buscar más")

- **El resto de la Premier League y toda la EFL**: el canal es el mismo, cambia el número de
  sociedad. 92 clubes profesionales, todos obligados. No hay nada que investigar, es ejecutar.
- **Los 9 condados de cricket restantes**: ya están identificados en el CSV de la FCA; en esta
  sesión se verificó que Essex, Glamorgan, Somerset y Derbyshire tienen 22-30 memorias cada uno,
  y solo se bajaron las de Surrey, Lancashire, Yorkshire y Warwickshire.
- **Premiership Rugby completo**: faltan Bristol, Gloucester, Sale, Saracens, Exeter. Ojo con
  Exeter: `EXETER RUGBY GROUP LIMITED` (03311324) no devolvió ninguna presentación de cuentas en
  el primer chequeo — verificar si la sociedad operativa es `EXETER RUGBY CLUB LIMITED` (03320422)
  antes de darlo por dead-end.
- **Rugby league (Super League)** y **netball/hockey**: mismo canal, sin chequear todavía.
- **Escocia**: es el mismo Companies House con números `SC` (ver `fuentes/Escocia/`).

## 6. Barrido de profundidad y EFL (sesión 2026-10-03)

**Objetivo de la sesión**: que cada club tenga al menos 5 ejercicios en disco, y sumar clubes de la EFL.
Herramientas nuevas, reusables: `node tools/companies-house-fetch.mjs <número|nombre> --list` (lista
ejercicios; con un nombre en vez de número busca la sociedad) y `--club "<Carpeta>" --slug <x> --want 5`
(baja los que falten); `node tools/fca-mutuals-fetch.mjs <societyId> ...` para los condados de cricket.
Para fútbol, rugby y F1 sale la serie completa en 1-2 minutos por club.

**Resultado**: los 33 clubes que ya existían llegaron a 5+ ejercicios; Manchester United quedó con 6
20-F de la SEC (2020/21 a 2025/26, incluido el presentado el 24/9/2026); se agregaron 43 clubes de
Championship, League One y League Two con 5 ejercicios cada uno.

**Reglas que salieron (para el próximo barrido):**

- **Cuentas "Total exemption full accounts" / "small" / "micro" = régimen de sociedad chica, sin
  cuenta de resultados.** El script las saltea salvo `--include-small`. Oxford United 2021/22-2022/23
  están así (hueco en la serie). No contar como ejercicio útil sin abrirlo y ver si trae TURNOVER.
- **CORRECCIÓN (barrido de clubes cortos, mismo día): la etiqueta NO decide, hay que abrir y mirar.** El
  filtro del script es solo una heurística. Con P&L aunque diga "small"/"Total exemption": Newport
  (2018/19-2022/23, 18-22 págs.), Crawley (2016/17-2018/19, 13-15 págs.), Bromley (2019-2024, 17-19 págs.),
  Oxford (2019/20-2022/23, 21-22 págs.). Sin P&L: Barnet, Salford, Notts County, Doncaster Rovers,
  Port Vale, Stockport, Fleetwood Wanderers 2021/22+, Crawley 2019/20+ (casi siempre ≤15 págs.).
  Regla práctica: con `--include-small` bajar 1 ejercicio, OCR de todas las páginas y buscar `TURNOVER` /
  "Profit and loss account"; el frase "elected not to include a copy of the profit and loss account" o
  "Income Statement has not been delivered" confirma la omisión.
- **La operativa no siempre lleva el nombre del club** (hallar por PSC, por prensa o por búsqueda web):
  Portsmouth = Portsmouth Community Football Club Limited 07940335; Fleetwood = Fleetwood Wanderers Limited
  03359117 (holding Jaymel 06989818); Newport = Newport Association Football Club Limited 02395863;
  Bromley = Bromley F.C. (95) Limited 03060560; Chesterfield = CFC 2001 Ltd 04273743; MK Dons = Milton
  Keynes Dons Limited 04787003; Bolton = holding Football Ventures (Whites) Limited 11761052; Salford =
  holding Project 92 Limited 09112699; Doncaster = Doncaster Rovers Limited 03739676.
- **Hay sociedades con el nombre del club que son cascarones.** Doncaster Rovers FC Ltd (00170192): el
  balance 2025/26 muestra solo pasivos (£264 K), sin actividad; Bolton Wanderers Football Club
  Limited (12184224) y Portsmouth Football Club Limited (11538360) presentan "dormant". La operativa
  está en otra sociedad (holding de los dueños): hay que encontrarla por directores/PSC, no por nombre.
- **Elegir holding vs. operativa**: si la holding presenta `Group of companies' accounts` se baja esa
  (Cardiff 04044254, Blackpool 12022161); si no, la operativa. El script ya prioriza group > full.
- **Fechas absurdas** (1974 -> "2074"): Companies House parsea mal años de 2 dígitos de presentaciones
  de los 70. El script descarta fechas futuras.
- **Pendientes con paso concreto**: Bolton, Doncaster, Portsmouth, Port Vale (08876768 presenta Total
  exemption; su holding 11954695 no tiene filings) — buscar la sociedad operativa/holding;
  Derby County (la entidad vieja `DC Realisations 1`, 00049139, está en administración; la nueva no
  apareció por búsqueda de nombre); Stockport County (no apareció la sociedad por nombre).
- **Falta aún**: League Two completa, Sheffield Wednesday plc (00062478), 9 condados de cricket
  (ver sección 5), el resto de Premiership Rugby y Super League.
