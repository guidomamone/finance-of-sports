# Gimnasia y Esgrima (La Plata)

## Cargado al sitio (2026-09-23): 3 balances + 3 presupuestos, `clubId: 'gimnasiaesgrima-ar'`

Los 9 documentos de la sesión anterior (ver más abajo) quedaron transcriptos y cargados en
`data/gimnasiaesgrima-ar-data.js`. Los 8 documentos con texto nativo se transcribieron con
`pdftotext -layout` (uno de ellos, `presupuesto-2024-2025.pdf`, tiene una fuente subseteada sin
tabla ToUnicode para los montos/meses — se resolvió leyendo visualmente la página renderizada, ver
la nota al principio de `Clubes/Argentina/Gimnasia y Esgrima LP/presupuesto-2024-2025.md`). El único
escaneado (`informe-comision-revisora-2023-2024.pdf`, 3 págs) se transcribió con Tesseract OCR
(`--psm 3`, sin necesidad de deskew, `--psm 0` confirmó `Rotate: 0` en las 3 páginas) — es
puramente narrativo, sin cifras.

Mapeo de ejercicios (confirmado leyendo el título/período de cada presupuesto, no asumido): el
presupuesto que viene empaquetado con cada balance es el aprobado para el ejercicio SIGUIENTE, no
el mismo — cruzando por ejercicio real:
- **2023 (136°, año corriente)**: solo balance, `sourceId: gimnasiaesgrima-ar-balance-2022-2023`.
  Opinión de auditoría CON SALVEDADES (cesión de derechos de TV al ex-presidente Gabriel Pellegrino,
  documentación UIF faltante) y párrafo de incertidumbre por empresa en funcionamiento. Club en
  concurso preventivo de acreedores desde 2017 (vigente). Sin gestión asignada: la Comisión
  Directiva cambió a mediados de este ejercicio (Pellegrino → Cowen, nov/dic 2022).
- **2024 (137°)**: balance real (primario) + `presupuesto-2023-2024.pdf` como overlay de
  Presupuesto — ejercicio dual (`reportType: official_budget_and_balance`).
- **2025 (138°)**: balance real (primario) + `presupuesto-2024-2025.pdf` como overlay — ejercicio
  dual también.
- **2026 (139°, todavía sin balance real)**: solo `presupuesto-2025-2026.pdf`, standalone
  (`reportType: official_budget`).

Gestión: Mariano Cowen, Presidente, confirmado en la Comisión Directiva impresa de los balances
2023-24/2024-25 y firmante de los 2 presupuestos de esos ejercicios.

FX: los 3 balances declaran Anexo de moneda extranjera pero con VARIAS cotizaciones por línea (BNA
vs. MEP) — se usó la cotización BNA (la de la mayoría de la deuda en USD): 268,00 (30/6/2023),
932,50 (30/6/2024), 1.215,00 (30/6/2025), `fxSource: document_close`. Los presupuestos no declaran
TC propio: **corregido en la integración centralizada** — los 2 overlays (2024/2025) NO reusan el
`document_close` del balance pareado (ese TC lo declara el balance, no el presupuesto: etiquetarlo
`document_close` en el overlay mentía la procedencia), quedaron `fxSource: 'market_close'`
referenciando `FX_CLOSE` a la fecha de cierre del ejercicio (`ARS@2024-06-30`:909,
`ARS@2025-06-30`:1203, ya existían de otro club). El standalone 2026 quedó `fxRef:
'ARS@2026-06-30'`:1482 (dólar mayorista BCRA vía Rava, agregado en esta sesión).

**Color de marca: `brandColor: null`** — Club de Gimnasia y Esgrima La Plata ("el Lobo") es un caso
de "camiseta blanca con acento fuerte" (confirmado en es.wikipedia.org: "camiseta blanca con una
franja horizontal azul marino" desde 1910; confirmado también vía nota de prensa propia del club,
"El Lobo estrena sus camisetas para la temporada 2024", gimnasia.org.ar, que describe "color blanca
con franja azul en el pecho"). Mismo criterio que River/Vélez/Sevilla/Real Madrid/Valencia/Once
Caldas (ver club-or-year-onboarding SKILL.md sección 3.1b): no se resuelve buscando más, es decisión
de producto. **Confirmado en la integración centralizada**: se queda en `null`. Verificado
2026-09-23.

Liga/categoría en los 4 ejercicios (2022-23 a 2025-26): Primera División / Liga Profesional
Argentina, confirmado vía en.wikipedia.org ("2025 Club de Gimnasia y Esgrima La Plata season": 2025
fue su "11ma temporada consecutiva" en Primera División, o sea desde ~2015) — no hubo descenso a
Primera Nacional en ninguno de los 4 ejercicios cargados.

## Lo nuevo (2026-09-22): el club SÍ publica balances reales — estaban en otro archivo, no en la Memoria

Hasta esta sesión, este club figuraba como "4 memorias descargadas, SIN datos financieros
cargables", y eso era cierto: las 4 memorias son narrativas. **Lo que faltaba entender es que
Gimnasia publica el Balance como un PDF SEPARADO de la Memoria**, en el mismo post de convocatoria a
asamblea. La Memoria no tiene ni una fila de estados contables porque no le corresponde: está todo
en el archivo `Balance-*.pdf` de al lado. 9 documentos nuevos descargados en
`Clubes/Argentina/Gimnasia y Esgrima LP/`, todos con capa de texto nativa (cero OCR):

| Ejercicio | Balance | Otros |
|---|---|---|
| 136° (2022-23) | `balance-general-2022-2023.pdf` (28 págs) | `informe-auditoria-2022-2023.pdf` (6), `memoria-2022-2023.pdf` (95), `presupuesto-2023-2024.pdf` (3) |
| 137° (2023-24) | `balance-2023-2024.pdf` (30 págs) | `informe-comision-revisora-2023-2024.pdf` (3), `presupuesto-2024-2025.pdf` (4) |
| 138° (2024-25) | `balance-2024-2025.pdf` (31 págs) | `informe-comision-revisora-2024-2025.pdf` (5), `presupuesto-2025-2026.pdf` (5) |

- **Los presupuestos vienen con desglose MENSUAL** (12 columnas jul→jun + total del período), con el
  árbol completo de rubros (RECURSOS DE FUTBOL → venta de entradas → competiciones oficiales
  L.P.F./internacionales/amistosos; participación; abonos estadio; retransmisión y derechos de TV;
  marketing y publicidad; etc.). Mismo nivel de detalle que el Presupuesto 2025 de Instituto, y
  además alineado a TEMPORADA (jul-jun), así que acá NO aplica el problema de "presupuesto
  calendario partido en dos mitades" que bloqueó la carga en Instituto.
- **Dónde están exactamente**: el sitio NO tiene sección fija de transparencia. Cada ejercicio cuelga
  de un post `gimnasia.org.ar/convocatoria-a-asamblea-general-ordinaria-<N>/`, numerados con el
  sufijo de WordPress. Hoy existen del 1 al 7 (el 8 da 404); los que traen PDFs son el **-5**
  (2022-23), el **-6** (2023-24) y el **-7** (2024-25). El -2 linkea a `sys.gimnasia.org.ar`
  (ver pendientes). Cuando se publique el ejercicio 2025-26, esperar que aparezca en el **-8**.
- **Dos hosts distintos para los archivos, y hay que mirar los dos**: el 136° está en
  `files.myperfit.net/gimnasiaesgrima/b957af9f/...` (el CDN de la plataforma de mailing que usa el
  club, con un hash en el nombre del archivo que NO se puede adivinar), y el 137°/138° en
  `gimnasia.org.ar/wp-content/uploads/<año>/10/...`. Si una sesión futura solo mira `wp-content`, se
  pierde el 136°.

## Lo que ya estaba (memorias narrativas, confirmado sin cifras)

- Memoria, Ejercicio N°131 (2017-18) — gimnasia.org.ar/wp-content/uploads/2018/10/Memoria2017-2018.pdf (135 págs).
- Memoria, Ejercicio N°134 (2020-21) — .../uploads/2021/10/Club-de-Gimnasia-y-Esgrima-La-Plata-Memoria-del-Ejercicio-134.pdf (124 págs).
- 137° Memoria y Balance General, Ejercicio 2023-24 — .../uploads/2024/10/ALTA_myb_2023_2024-1.pdf.
- 138° Memoria y Balance General, Ejercicio 2024-25 — .../uploads/2025/10/Memoria-Ejercicio-2024-2025.pdf.
- **Revisados a fondo en la Versión 95: ninguno de los 4 tiene datos financieros cargables** — son
  reportes narrativos/institucionales (magazine-style, 106-135 páginas cada uno). Eso sigue siendo
  cierto; lo que cambió es que ahora sabemos que el balance vive aparte (arriba).

## Pendiente

- Ejercicios 132/133 (2018-19, 2019-20) y 135 (2021-22). El post
  `convocatoria-a-asamblea-general-ordinaria-2/` linkea 3 PDFs en un subdominio de archivo,
  `sys.gimnasia.org.ar/archives/doc03.pdf`, `doc04.pdf` y `doc05.pdf` — **ese subdominio no resuelve
  hoy** (connect timeout, no 404: es DNS/hosting caído, no archivo borrado). Reintentar en una sesión
  futura, y si sigue caído probar Wayback Machine de esas 3 URLs exactas. Un post viejo
  (`balance-y-memoria-2018-2019/`) linkea además
  `archivoweb.gimnasia.org.ar/asamblea/Balance2018-2019.pdf` y `.../Memoria2018-2019.pdf`: ese host
  SÍ resuelve pero devuelve **404** para ambos archivos. Esas 2 URLs son el mejor candidato para
  Wayback en una próxima sesión (la CDX API estaba con rate-limit cuando se intentó acá).
- Ejercicio 139° (2025-26), cuando se publique (esperable oct-2026, post `-8`).
- El portal de autogestión de socios (autogestion.gimnasia.org.ar) sigue con login y no se probó.
- Contacto: no se encontró mail institucional directo; sección Socios de gimnasia.org.ar o el portal
  autogestion.gimnasia.org.ar.
- Último chequeo: 2026-09-23.
