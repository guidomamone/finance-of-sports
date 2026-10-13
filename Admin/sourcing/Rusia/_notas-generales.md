# Rusia — notas generales

## Canal encontrado: `bo.nalog.gov.ru` (Ресурс БФО, Federal Tax Service / ФНС)

Decimoquinto país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17/18), después
de República Checa. A diferencia de lo esperado por el contexto geopolítico (sanciones desde 2022,
aislamiento de varios servicios rusos), el registro estatal de estados contables **SÍ es accesible
desde este entorno, sin ningún bloqueo geográfico detectado**:

- `egrul.nalog.ru` (el registro mercantil EGRUL propiamente dicho, para razón social/ИНН/ОГРН) da
  **timeout de conexión** (`curl: (28) Connection timed out`) tanto en `egrul.nalog.ru` como en su
  dominio nuevo `egrul.nalog.gov.ru` — este sí parece bloqueado o inalcanzable desde este entorno.
- `bo.nalog.ru` (el que menciona la consigna) redirige (HTTP 302) a un dominio nuevo,
  **`bo.nalog.gov.ru`** — con el dominio nuevo, el sitio carga perfecto (HTTP 200, SPA React
  completa, sin CAPTCHA, sin login). El nombre del recurso es "Ресурс БФО" (бухгалтерская
  (финансовая) отчетность — estados contables/financieros).

**El sitio expone una API JSON pública sin autenticación, 100% scripteable por `curl`** — mismo
nivel que Bélgica/Dinamarca/Grecia/Noruega/República Checa, el mejor grupo de canales del proyecto:

- Buscar entidad: `https://bo.nalog.gov.ru/advanced-search/organizations/search?query=<INN o
  nombre>&page=0&size=20` → JSON con `id` (identificador interno del recurso, NO es el ИНН),
  `inn`, `ogrn`, `shortName`, `okved2`, `statusCode`, y un resumen `bfo` del último ejercicio
  (incluye `hasAz`: si tiene dictamen de auditor cargado).
- Listar TODOS los ejercicios de una entidad: `https://bo.nalog.gov.ru/nbo/organizations/<id>/bfo/`
  → array con un objeto por año, cada uno con `typeCorrections[0].correction.id` = el ID del
  reporte puntual (lo que hace falta para descargar).
- Descargar el dictamen de auditor: `https://bo.nalog.gov.ru/download/audit/<reportId>` → PDF
  directo (o HTTP 400 JSON si esa entidad/año no tiene dictamen cargado).
- Descargar las notas al balance: `https://bo.nalog.gov.ru/download/clarification/<reportId>` →
  mismo patrón.
- Página humana (para citar): `https://bo.nalog.gov.ru/organizations-card/<id>`.

**El histórico solo llega hasta 2021** (el dropdown de "Отчетный período" del buscador ofrece
2021-2026): la ley rusa que creó este depósito único estatal (ГИРБО) obliga la presentación
digital recién desde los ejercicios 2019/2020, así que 2021 parece ser el techo real de
disponibilidad para cualquier entidad, no una limitación de búsqueda — confirmado porque ninguno
de los 16 clubes (algunos con décadas de historia, ej. Zenit desde 1993, CSKA desde 1994) tiene un
ejercicio anterior a 2021 en el listado completo que devuelve `/bfo/` (que no pagina, trae todo de
una).

**Dos documentos por ejercicio, no siempre ambos presentes**: cada depósito anual puede traer el
dictamen de auditor (`audit`) Y/O las notas explicativas al balance y al estado de resultados
(`clarification`) como PDFs separados — pero NINGUNO de los 16 clubes tiene los 5 años (2021-2025)
completos en ambos documentos. El patrón más común es "falta el dictamen de auditor en años
viejos" (Rubin, Orenburg, Akron, Rostov 2021) o "falta las notas en años viejos" (Krasnodar,
Spartak, CSKA, Dynamo Moscow, Sochi, Pari NN). El campo `hasAz`/`requiredAz` de la API anticipa
esto con precisión: cuando `requiredAz: false` para un año (empresas chicas exentas de auditoría
obligatoria bajo la ley contable rusa, umbral por ingresos/activos), ese año casi nunca tiene PDF
de auditor aunque el balance sí esté cargado como dato estructurado.

**Caso límite real: Akhmat Grozny tiene `requiredAz: true` los 5 años pero `hasAz: false` los 5
años** — es decir, la ley SÍ le exige auditoría pero el club nunca subió el dictamen al depósito
(solo subió las notas explicativas, y solo para 2025). Esto es un incumplimiento de disclosure del
propio club/su auditor ante el depósito estatal, no un problema de acceso — ver duda propuesta más
abajo para `dudas-por-club.md`.

**Los datos estructurados (balance, estado de resultados, flujo de fondos, cambios en el
patrimonio) están disponibles como JSON aunque no haya PDF** — la página humana
(`organizations-card/<id>`) los muestra en tablas para cada ejercicio incluso cuando no hay ningún
documento descargable. Esto es sourcing puro (no se cargó nada al sitio ni se transcribió), pero
vale la pena que quien haga el mapeo de datos sepa que, para años sin PDF, la cifra oficial
igual existe y es consultable en la página (no haría falta inventar ni saltear el año — aunque
sin el respaldo de un PDF descargable para citar como fuente primaria, que es el estándar del
proyecto).

**Ningún formato nuevo para el `.gitignore`**: todo lo bajado es PDF (`*.pdf`, ya cubierto). *(Actualizado 2026-10-03: ver la sección siguiente — los datos estructurados sí son JSON y ZIP, que ahora también están en el `.gitignore`.)*

## Hallazgo 2026-10-03: el balance y el estado de resultados oficiales se pueden bajar de cada año, con o sin auditoría

La sección anterior dice que "los datos estructurados están disponibles como JSON aunque no haya PDF" pero solo en la página humana. Hay dos endpoints públicos más (sin captcha, sin login, `curl`/`urllib` puro) que los bajan como archivo, para el `reportId` de cada año (el mismo `typeCorrections[0].correction.id` que ya usa el listado `/nbo/organizations/<id>/bfo/`):

- **`https://bo.nalog.gov.ru/nbo/bfo/details/<reportId>`** → JSON con `balance` (formulario 0710001, filas `current1100`/`current1600`... con año actual, anterior y anteanterior), `financialResult` (0710002: `current2110` ingresos, `2120` costo de ventas, `2200` resultado de ventas, `2400` resultado neto), `capitalChange`, `fundsMovement` y la ficha de la entidad. Cifras en **miles de rublos**.
- **`https://bo.nalog.gov.ru/download/bfo/<reportId>?type=XLS`** → ZIP con el `.xlsx` de las formas (el parámetro `type` es un enum de Java: solo `XLS` dio 200; `PDF`, `XLSX`, `XML`, etc. dan 400).

Con eso se bajaron, para los 16 clubes y todos sus ejercicios 2021-2025, `bfo-<año>-datos.json` y `bfo-<año>-formas-xls.zip` en `Clubes/Rusia/<Club>/` (15 clubes con 5 ejercicios, Baltika con 4: la entidad solo presenta desde 2022). **Sanity check**: Zenit 2025, `current2110` = 22.070.930 (miles de RUB = 22,1 mil millones). Esto resuelve los clubes con menos de 5 PDFs: Akhmat Grozny (solo notas 2025; ahora tiene 5 ejercicios estructurados aunque el dictamen siga sin existir), Akron Tolyatti (años previos exentos de auditoría, ahora con balance y resultados 2021-2025) y Dynamo Makhachkala (2021-2023 sin auditoría exigida, ahora con datos). Son la **misma fuente primaria** (la propia presentación del club al depósito del Estado), no un agregador.

Script reproducible: `Admin/` no lo guarda (vive en el scratchpad de la sesión); la lógica es listar `/bfo/` y pedir los dos endpoints por `reportId`. **`.gitignore`**: `Clubes/**/*.json`, `*.zip`, `*.xls`, `*.xlsx` agregados el 2026-10-03 (documento fuente crudo queda local, mismo criterio que XML/DOCX/TIFF).

**Gotcha de tooling — timeouts de conexión frecuentes con archivos grandes**: la conexión a
`bo.nalog.gov.ru` es lenta e inestable desde este entorno (varios `curl` de 5-30 MB cortaron a los
25s con `Operation timed out`, aunque el servidor sí soporta byte-ranges `Accept-Ranges: bytes`).
**Cuidado**: un `curl` cortado a los 25s con `-w "%{http_code}"` puede igual imprimir `200` (el
código de estado ya se había recibido en los headers antes de que se cortara el cuerpo) — un
chequeo ingenuo de `[[ "$code" == "200" ]]` da falsos positivos y deja PDFs truncados sin darse
cuenta. Pasó en la primera pasada de esta sesión (16 archivos truncados marcados como "OK", todos
en Baltika/CSKA/Krylia Sovetov/Akron/Krasnodar). **La vuelta que funcionó**: validar cada PDF con
`pdfinfo archivo.pdf 2>&1 | grep -a "^Pages:"` después de cada descarga (no confiar en el código
HTTP solo), y reintentar con `curl -C -` (resume) hasta 5 veces con `-m 200` (200s, no 25s) si la
validación falla. Con esto, las 105 descargas finales (16 clubes) pasaron `pdfinfo` limpio.

## Cómo mantener este archivo

Si se agrega un club nuevo de fútbol ruso (u otro deporte) en el futuro, seguir el mismo
procedimiento: buscar la razón social exacta (no el nombre público del club) en
`bo.nalog.gov.ru/advanced-search/organizations/search?query=<candidato>`, cruzar el `okved2`
(93.11/93.12/93.19 para clubes deportivos) y el `gainSum` (debe tener escala de club profesional,
no una PYME homónima) antes de asumir que el primer resultado es el correcto — varios nombres de
club rusos tienen decenas de homónimos (sociedades de garajes «Динамо», condominios «Динамо»,
etc.), ver el caso Dynamo Makhachkala abajo como ejemplo extremo de esto.
