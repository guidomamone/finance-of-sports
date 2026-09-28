# River Plate

## Canal CNV (Comisión Nacional de Valores) — el hallazgo grande, 2026-09-28

**River es emisor regulado por la CNV desde que lanzó su primera Obligación Negociable (bono),
febrero 2025** (fue el primer club de fútbol argentino en hacerlo) — eso lo obliga a publicar sus
estados contables en la Autopista de Información Financiera (AIF), un canal VERDADERAMENTE oficial,
mejor que cualquier mirror. Al inscribirse subió de una vez varios ejercicios históricos, no solo el
más reciente. Ficha pública del emisor (sin login):
`https://www.cnv.gov.ar/SitioWeb/Empresas/Empresa/30526748448` → pestaña "Información Financiera" →
"Estados Contables" lista TODAS las presentaciones con su fecha de cierre.

**Cómo descargar un adjunto de una presentación de la AIF (mecanismo genérico, sirve para
cualquier CUIT, no solo River)** — la URL pública `aif2.cnv.gov.ar/presentations/publicview/<GUID>`
no tiene un botón de descarga directo (dispara un flujo `jQuery.fileDownload` pensado para navegador
autenticado), pero se puede repetir con 2 pasos y CURL PURO, sin sesión ni cookies:
1. Abrir la presentación en el Browser pane, esperar a que cargue el adjunto (AJAX), y sacar el
   `data-guid` del ícono de descarga (`<a class="downloadFile" data-guid="...">`, visible vía
   `document.querySelectorAll('a.downloadFile')` en la consola).
2. `GET https://aif2.cnv.gov.ar/api/ValetKeyProvider/GetPublicValetKey/<GUID>?operation=DownloadBlob`
   → devuelve `{"valetKeyData": "..."}` (un token temporario, sin necesidad de login).
3. `POST https://blob.cnv.gov.ar/BlobWebService.svc/DownloadBlob/<GUID>` con body
   `ValetKey=<valetKeyData>` (form-urlencoded) → devuelve el PDF crudo.

Bonus: cada presentación de Estados Contables también trae una tabla "Estados Contables Básicos y
Principales Índices" con el balance ya tipeado a mano por el club al presentar (CAJA Y BANCOS,
TOTAL DEL ACTIVO, PASIVO CORRIENTE, etc., paginado en la propia página) — sirve como VERIFICACIÓN
cruzada contra lo que se transcriba del PDF, no como reemplazo del documento.

**Documentos encontrados así (2026-09-28), descargados a `Clubes/Argentina/River/`, TODOS
legalizados/firmados, TODOS pendientes de transcripción a `.md` todavía**:
- `estados-contables-2020-2021.pdf` (Ejercicio 120, individual, "EECC 2021 River Plate legalizados
  (2).pdf", 3,7 MB, 65 pág.) — presentación CNV #3248465.
- `estados-contables-2020-2021-consolidado.pdf` (mismo ejercicio, versión CONSOLIDADA, "EECC 2021
  River Plate legalizados.pdf", 2,0 MB, 63 pág.) — presentación #3241487. Preferir la individual
  para cargar datos (mismo criterio que ya usan Boca/Racing/el resto), esta queda de respaldo.
- `estados-contables-2021-2022.pdf` (Ejercicio 121, "EECC-2022 legalizados (003).pdf", 5,6 MB,
  64 pág.) — presentación #3241505.
- `estados-contables-2022-2023.pdf` (Ejercicio 122, "EECC 2022-2023 legalizados.pdf", 8,0 MB,
  64 pág.) — presentación #3241507.
- `estados-contables-2023-2024-cnv.pdf` (Ejercicio 123, "EECC Club Atlético River Plate al 31 08
  2024 - legalizado.pdf", 8,0 MB, 67 pág.) — presentación #3319515. Es el MISMO ejercicio que ya
  está cargado en el sitio vía el mirror de tuRiver (ver abajo) pero ahora también hay copia
  oficial CNV — no hace falta recargarlo, pero si se re-verifica algo de ese ejercicio, esta es la
  fuente mejor.
- `estados-contables-cierre-2025-12-31.pdf` — VER SECCIÓN SIGUIENTE, es un hallazgo con una
  pregunta abierta, no asumir que es "Ejercicio 124" sin más.
- `acta-asamblea-estados-contables-cierre-2025-12-31.pdf` (18 MB, 21 pág.) — acta de la asamblea
  que aprobó el documento anterior, adjunta a la misma presentación.

**Todos son PDFs sin capa de texto usable en las tablas numéricas (Producer distinto por doc, la
mayoría escaneos legalizados)** salvo excepciones puntuales — pasarlos por el pipeline de
transcripción de `CLAUDE.md` ("Cada PDF nuevo": Mistral OCR primero) antes de mapear cualquier dato.

## Hallazgo con pregunta abierta: ¿River cambió su cierre de ejercicio a diciembre?

`estados-contables-cierre-2025-12-31.pdf` (presentación CNV #3525618, filed 15/05/2026, GUID
`a234187b-cd20-4c6c-9452-7df3d7aca3d6`) tiene **Período del Balance: Anual, Fecha de Cierre:
31/12/2025, Tipo: Individual** — un cierre en DICIEMBRE, no en agosto como los 123 ejercicios
anteriores (River siempre cerró 31/8). El total del activo que reporta (`$720.893.046.856`) es
~70x el de 2021, consistente con varios años de inflación pero también con un período más largo de
lo normal. **No se llegó a confirmar contra el documento en sí** (no tiene capa de texto en las
páginas numéricas) si esto es: (a) un cambio genuino de ejercicio fiscal a calendario, con un
"período irregular" de transición (set-2024 a dic-2025, ~16 meses) que no se filtró como tal en la
CNV, o (b) un ejercicio anual normal set-2025/dic-2025 que implicaría que hubo un ejercicio
intermedio más corto no visto acá. Encontrado el MISMO documento también en Scribd
(`scribd.com/document/1026996624/EECC-Club-AtlA-tico-River-Plate-al-31-12-2025-Firmado-1`,
bloqueado por su "Client Challenge" para bots — no hace falta pagarlo, ya lo tenemos gratis por
CNV) — corrobora que el documento es real y circula, no resuelve la pregunta del período. **Anotado
en `Admin/dudas-por-club.md`** para cuando se transcriba: la respuesta va a estar en las primeras
páginas del propio PDF (dice el período exacto que cubre) o en el acta de asamblea adjunta.

## Lo que sigue faltando: Ejercicio 118 (2018-19) y 119 (2019-20)

Ninguno de los dos aparece en la CNV (el canal solo tiene desde el cierre 2021-08-31 en adelante —
consistente con que River recién se hizo emisor regulado en 2024/2025 y subió unos pocos años
hacia atrás, no todo su historial). Se agotaron, sin resultado, estas vías (2026-09-28):
- **Prensa con cifras específicas** (NO es el documento, pero sirve para tie-out si algún día
  aparece): La Página Millonaria publicó activo/pasivo/déficit exactos del Ejercicio 118
  (`lapaginamillonaria.com/riverplate/river-balance-2018-19-...`: pasivo $3.998.735.404, activo
  $5.073.203.577, déficit $859.880.151) — coincide con la cifra de pasivo citada independientemente
  por otro blog (`tradicionalriver.blogspot.com`). Para el 119 (2019-20), Olé y Doble Amarilla
  cubrieron la aprobación en asamblea con cifras (superávit $523.521.891, activo $6.215.512.239,
  pasivo $4.390.067.690) — ver `dobleamarilla.com.ar/mas-alla-del-futbol/river-le-dio-visto-bueno...`
  y `ole.com.ar/river-plate/balance-river-superavit-pasivo-reduccion...`.
- **`cariverplate.com.ar`** (dominio viejo de River, CARP = Club Atlético River Plate): HOY
  redirige (302) a `riverplate.com`, ya no es un dominio propio con contenido distinto. Barrido de
  dominio completo por Wayback CDX (539 PDFs archivados) encontró `MEMORIA 2018-2019 CARP
  (WEB).pdf` (13,2 MB) y `Anexo 2019-20.pdf` (16,9 MB, "ANEXOS EJERCICIO ADMINISTRATIVO 2019-2020")
  — ambos descargados y revisados a fondo: **el primero es la misma Memoria narrativa sin EECC que
  ya se tiene** (archivo distinto por bytes, mismo contenido categoría); **el segundo, pese al
  nombre "Anexo", es el anexo DEPORTIVO** (estadísticas de jugadores, partidos, titular/suplente,
  minutos jugados — nada de estados contables). Descartado, no vale la pena volver a mirar este
  dominio para años faltantes.
- **Wayback CDX sobre `riverplate.com`** (dominio oficial actual, filtro PDF): 6 resultados, 0
  relevantes (ninguno con "contable"/"balance"/"estado"/"ejercicio"/"financ" en el nombre).
- Conclusión: para estos 2 ejercicios, la vía que falta probar es la gestión de Guido por IGJ (ver
  abajo) — no queda ningún ángulo de sourcing mecánico sin agotar.

## Canal OFICIAL alternativo, investigado 2026-09-23 (to-do 53), NO explotado todavía

River es una asociación civil inscripta en la IGJ (CUIT `30-52674844-8`, sede Figueroa Alcorta
7597, CABA — confirmado en el Boletín Oficial y en el propio estatuto social,
https://www.riverplate.com/docs/socios/estatuto-social.pdf). La IGJ tiene un trámite público
"Solicitar un informe de balances presentados en la IGJ"
(https://www.argentina.gob.ar/servicio/solicitar-un-informe-de-balances-presentados-en-la-inspeccion-general-de-justicia)
que devuelve los estados contables que la entidad ya presentó — cubriría justo los años que la CNV
no tiene (118 y 119, previos a que River fuera emisor regulado). PERO: el trámite se hace por TAD
(Trámites a Distancia), exige clave fiscal AFIP nivel 2+ o usuario Mi Argentina — o sea la
identidad de una PERSONA, no algo que un agente pueda iniciar — y tiene costo ("5 módulos"). **Es
una gestión para Guido, no una búsqueda para sourcear solo.**

## Memoria narrativa (SIN estados contables) — fuente agotada, no volver

https://www.riverplate.com/docs/socios/memoria-YYYY-YYYY.pdf — el dominio oficial de River solo
publica el reporte de gestión narrativo (fútbol, infraestructura, marca, redes sociales, etc.),
nunca el balance auditado. Se probaron y confirmaron 7 años directos (2018-19 a 2025) en
`Clubes/Argentina/River/`, pero NINGUNO tiene estados contables — ver `river-data.js` para el
detalle de este hallazgo. No cargar más años de esta fuente esperando encontrar el balance ahí, no
está.

## Ejercicio N° 123 (2023-24) — mirror no-oficial, ya cargado (ver también CNV arriba)

Estados Contables (balance auditado real), Ejercicio N° 123 (1°/9/2023 al 31/8/2024) —
https://turiver.s3.us-west-000.backblazeb2.com/original/4X/1/7/a/17ac4c09709f687d2249c3e21b8e7c5262b78116.pdf
— encontrado en una réplica de la comunidad tuRiver (turiver.com), no en el dominio oficial. Ya
cargado en el sitio (Ejercicio 2024), marcado como fuente no-primaria (secondary_mirror) pero con
banner explicando que el documento en sí es el balance auditado real, no placeholder ni prensa.
Desde la Versión 32, cargado en ARS nativo con el tipo de cambio que declara el propio balance
($950,50, Anexo V) — antes se usaba $953,50, investigado externamente. **Barrido de dominio
completo de `turiver.com` y su bucket de Backblaze por Wayback CDX (2026-09-28)**: encontró 5 PDFs
más alojados ahí además del ya conocido, TODOS ajenos al fútbol (tabla de pases de jugadores de
terceros clubes, lista de fallecidos, un libro sobre el fascismo italiano, un manual de manejo) —
el bucket es de uso general del foro (Discourse), no un repositorio de balances. Descartado como
ángulo para encontrar más ejercicios de River ahí.
- Color de marca: `#E30520` — CSS del sitio oficial (`riverplate.com/assets/index-NnUNf_7i.css`,
  82 ocurrencias), verificado 2026-09-21. No coincide con la tabla por liga de footylogos, que da
  #ED192D.
