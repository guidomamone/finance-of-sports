# Kazajistán — notas generales (sourcing, sesión 2026-10-03)

## DFO — Depositario de Informes Financieros (`https://opi.dfo.kz`), modo invitado

- Búsqueda de entidades (sin login): `https://opi.dfo.kz/ru/opi/list?oq=&flBin=<БИН>&flNameRu=<texto>&flBlock=Active_Свободно`
  (el parámetro `flBlock` es obligatorio; `flNameRu` es substring del nombre en ruso, sin tildes; resultados paginados `&page=N`).
  El texto de cada resultado trae `БИН: <12 dígitos>` y el nombre; el enlace va a `/ru/opi/list/<id>/view`.
- Informes por entidad (todo sin login, `curl` simple funciona; no usar User-Agent especial):
  - `GET /ru/report-json/<id>/get-plugins` → plugins (`665 - для нефинансовых организаций (с 01.01.2020)` = informe anual de no financieras;
    `МСФО` para financieras; `189 …`; `Аффилированные лица`…) con `ReportsCount`.
  - `GET /ru/report-json/<id>/get-reports?pluginId=<plugin>` → `[{ReportId, LoadDate}]` (un informe por ejercicio; el ejercicio es el año anterior al de `LoadDate`).
  - `GET /ru/report-json/<id>/get-nodes?pluginId=…&reportId=…` → nodos (`3` Estados financieros, `4` Nota explicativa, `5` Decisión de aprobación, `6` Informe de auditoría, `7` Archivos adjuntos).
  - `GET /ru/render-blocks/<id>/get-node-data?pluginId=…&reportId=…&nodeId=<n>` → HTML con los enlaces `/ru/file-download/<token>` y
    el tamaño. `GET https://opi.dfo.kz/ru/file-download/<token>` devuelve el PDF directo (probado: 19,5 MB, 95 págs.).
  - **Nodo 3** (`Ф1 balance`, `Ф2 PyG`, `Ф3 flujo`, `Ф4 patrimonio`) viene como una planilla en base64+gzip dentro de la página, PERO
    sus celdas numéricas están vacías/en cero en los 9 informes inspeccionados; los valores reales los carga el visor desde
    `/grid-data/<plugin>-<reportId>-3-1`, que da 401 sin token. No se insistió ni se guardaron esas planillas vacías; los PDF del nodo 6 sirven.
- Script reutilizable: `Admin/sourcing-europa-este-scripts/dfo.py <БИН> <carpeta>` (Python + curl; baja nodos 4, 6 y 7 de cada informe).
- Gotchas: los archivos pesan 2-56 MB (descarga lenta, hasta ~1 min cada uno); pocos `.docx` de notas. El DFO marca a veces la entidad como "Архивный объект" aunque tenga informes.
- Ojo: **no es un registro de empresas**, solo de OPI (sociedades por acciones, estatales, emisores, bancos, etc.); un club privado (TOO) no aparece.

## Dudas / gestiones

- Astana y Kairat: sin canal público; candidatos a mail (no escrito).
- Kaspiy FK: ¿por qué solo 2021-2022 en el DFO?

## Pendientes (venían del TODO)

- (ex to-do 135) **Candidatos a mail (existencia confirmada o muy probable, no escritos; Guido decide y aprueba cada envío, proceso en `club-outreach`)**: Astana y Kairat (no están en el DFO).

## Duplicados con años distintos (encontrados el 2026-10-05, to-do 140(c))

El inventario (`tools/inventario-transcripciones.mjs`) marca como `duplicado` el PDF idéntico a otro de la misma carpeta. Cuando las copias tienen años distintos en el nombre, un año que figuraba como conseguido en realidad falta.

- Kaspiy: `rep17291-2023-08-31-n7-ПОБ.pdf` y `rep11779-2022-09-06-n7-ПОБ.pdf` son el MISMO archivo (el de 2023 es una nueva bajada del de 2022). El de 2023 falta.
