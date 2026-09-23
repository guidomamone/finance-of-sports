# Gimnasia y Esgrima (La Plata)

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
- Último chequeo: 2026-09-22.
