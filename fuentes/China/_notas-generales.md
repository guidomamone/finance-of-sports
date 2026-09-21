# Notas generales — China

## Barrido 2026-09-17: cuarto país nuevo de la lista de "30 mejores ligas del mundo" (orden
## alfabético, después de Alemania/Austria/Bélgica). Dead-end estructural confirmado para los 16
## clubes actuales de la Chinese Super League (CSL) — con UNA excepción histórica real, spectacular
## pero fuera del scope actual (Guangzhou Evergrande, ya no juega en la CSL).

**Los 16 clubes de la CSL 2025/26** (confirmado vía Wikipedia antes de arrancar, la composición
cambió mucho por las crisis 2021-2023): Shanghai Port, Shanghai Shenhua, Chengdu Rongcheng, Beijing
Guoan, Shandong Taishan, Tianjin Jinmen Tiger, Zhejiang, Yunnan Yukun, Qingdao West Coast, Henan,
Dalian Yingbo, Shenzhen Peng City, Wuhan Three Towns, Qingdao Hainiu, Liaoning Tieren, Chongqing
Tonglianglong.

## 0. Por qué China es un dead-end distinto a los anteriores: ni siquiera hay una forma jurídica
## "SA/plc" estándar que dispare una obligación de depósito público

En Alemania/Austria/Bélgica el ángulo que funcionó fue "¿qué obliga a publicar la forma jurídica que
usan los clubes de este país?" (GmbH/AG → HGB, SA/NV → Code des sociétés). En China ese ángulo no
aplica igual: casi todos los clubes de la CSL son 有限责任公司 (LLC, sociedades de responsabilidad
limitada) 100% controladas por UN solo accionista corporativo (un conglomerado inmobiliario, una
empresa estatal local, un banco, una constructora) — bajo la Company Law china, una LLC de socio
único NO tiene obligación de depositar sus cuentas anuales ante ningún registro consultable
públicamente (a diferencia del Handelsregister/HGB alemán o el Companies House británico, que
obligan a CUALQUIER sociedad, sin importar cuántos socios tenga). El único mecanismo que sí genera
disclosure público en China es que el ACCIONISTA sea una empresa que cotiza en bolsa (Shanghai,
Shenzhen o Hong Kong) y desglose el club como filial/segmento en sus propios EEFF auditados — el
mismo patrón que ya funcionó con Ollamani/Club América (México) y MSG Sports/Braves Holdings
(EE.UU.), sección 7 y 10 del skill.

**Metodología seguida, club por club**: para cada uno de los 16, se identificó primero el accionista
controlante real (a menudo distinto del nombre "obvio" del club, y cambiante — la CSL tuvo una ola de
reestructuraciones societarias 2023-2025 por la crisis), y se chequeó si ESE accionista cotiza en
alguna bolsa. Resultado: **15 de los 16 clubes tienen accionista controlante privado o estatal SIN
cotización pública** (dead-end estructural, sin disclosure posible por esta vía). El único caso con
accionista que SÍ cotiza es Shanghai Port — ver sección 1, con matiz importante: cotiza pero el
disclosure resultante es inservible para el sitio.

## 1. Shanghai Port — el único accionista controlante que cotiza en bolsa de los 16, pero el
## disclosure resultante NO sirve para cargar datos del club

El 100% de **Shanghai Port F.C.** (上海海港足球俱乐部有限公司) es propiedad de **上海国际港务（集团）
股份有限公司** (Shanghai International Port Group, SIPG), que cotiza en la Bolsa de Shanghái
(SSE: **600018**, ~RMB 150.000M de utilidad neta 2024) — confirmado leyendo el propio reporte anual.

- **Se descargó y leyó completo el Reporte Anual 2024 de SIPG** (333 páginas, PDF con capa de texto
  nativa, sin necesidad de OCR —
  `http://www.sse.com.cn/disclosure/listedinfo/announcement/c/new/2025-04-01/600018_20250401_M8XW.pdf`,
  descargable directo con `curl`, sin WAF) buscando explícitamente "足球" (fútbol) en las 16.848
  líneas de texto extraídas con `pdftotext -layout`.
- **El club SÍ aparece nombrado, tres veces, pero nunca con cifras propias**:
  1. En la nota "5. Alcance de la consolidación", listado #101 de 150 subsidiarias consolidadas:
     "上海海港足球俱乐部有限公司" — capital registrado RMB 100.000.000, rubro "文化体育" (cultura y
     deporte), 100.00% de participación, incorporada vía "combinación de negocios bajo control no
     común" en algún momento del historial. También aparece #105 "上海浦东足球场运营管理有限公司"
     (gestión del estadio de Pudong, también 100%).
  2. En las biografías de directivos (el actual presidente de SIPG fue presidente del club).
  3. En una nota sobre adquisición de la operación del estadio de Pudong en mayo 2024.
  - **Pero NINGUNA cifra de ingresos/resultado/activos propia del club**: la tabla "重要非全资子公司的
    主要财务信息" (información financiera de subsidiarias NO enteramente propias) que SÍ desglosa
    ingresos/utilidad neta/activos de 6 terminales portuarias, por definición NO incluye al club
    porque es 100% propiedad de SIPG (la tabla solo cubre subsidiarias con accionistas minoritarios).
    Y la nota de "6. Información de segmentos" desglosa el negocio en 5 segmentos operativos
    (contenedores, granel, logística portuaria, servicios portuarios, "otros negocios") — el club cae
    dentro de "otros negocios" mezclado con inmobiliaria, energía y otras inversiones no-portuarias,
    sin desglose propio.
  - **Conclusión**: mismo patrón de "perímetro nunca es un club standalone" que MSG Sports/Ollamani
    (sección 7/10 del skill), pero más limitado todavía — ni siquiera hay nota de segmento separable.
    SIPG confirma que el club existe, cuánto capital tiene registrado y que es 100% suyo, pero no da
    ningún dato utilizable para `revenueLines`/`expenseLines`.
- Se probó lo mismo por completitud con **Zhejiang FC** (accionistas: 杭州市商贸旅游集团 60%, 浙江省
  能源集团 40% — ninguno cotiza directamente, aunque Zhejiang Energy Group tiene subsidiarias listadas
  como 浙能电力/600023.SH, no se confirmó que la participación en el club esté dentro de esa
  subsidiaria cotizante en particular y no en el holding no-cotizante — **sin verificar a fondo, queda
  como ángulo abierto para una sesión futura** si se quiere profundizar).

## 2. Los otros 14 clubes: accionista controlante confirmado NO cotizante (dead-end confirmado,
## no reintentar sin evidencia de cambio societario)

Ver también la ficha individual de cada club en `fuentes/China/<Club>.md`. Resumen:

- **Shanghai Shenhua**: 100% de Shanghai Jiushi Group (久事集团, holding estatal de Shanghái) desde
  abril 2023 (antes era de Greenland Holdings/绿地控股, 600606.SH, que SÍ cotiza — pero Greenland
  vendió su 100% en 2023, así que ese lead quedó cerrado). Jiushi Group en sí no cotiza (tiene
  subsidiarias cotizantes como Qiangsheng Holdings/600662.SH para transporte, pero el fútbol está
  bajo "久事体育", sin evidencia de estar dentro de la parte cotizante).
- **Beijing Guoan**: 100% de Zhonghe Group (中赫集团, inmobiliaria privada) desde junio 2021, cuando
  CITIC Limited (0267.HK, SÍ cotiza en Hong Kong) vendió su 36% restante — ese lead también quedó
  cerrado, CITIC ya no tiene participación.
- **Shandong Taishan**: consorcio Jinan Wenlü (济南文旅, 40%) + Shandong Luneng Group (~30,69%) +
  State Grid Shandong (~29,31%) — ninguno cotiza directamente como entidad tenedora del club.
- **Tianjin Jinmen Tiger**: propiedad directa de la Oficina de Deportes de Tianjin (organismo de
  gobierno), ya no de TEDA Holding (la desarrolladora estatal que le dio el nombre históricamente).
- **Henan**: reestructurado en 2023, accionistas actuales Zhengfa Group (郑发集团) y Yujian Sports
  Group (豫健体育集团) — **Jianye Real Estate/建业地产 (HKEX: 0832.HK) YA NO es accionista** (pasó de
  socio a "socio estratégico" sin equity). Nota: Jianye SÍ fue accionista real (vía el consorcio 4:3:3
  con Zhengzhou/Luoyang 2021-2023) durante el período que cotizaba — **no se revisó si sus EEFF de
  esos años (2021-2022) desglosaban el club como inversión asociada, queda como ángulo sin cerrar**,
  ver duda para `dudas-por-club.md`.
- **Dalian Yingbo**: 100% de Dalian Tongshun Construction Development Group (大连统顺建设发展集团,
  constructora privada), sin cotización.
- **Shenzhen Peng City**: Jianteng Fund (53%) + City Football Group (47%, el mismo grupo de Abu Dhabi
  dueño de Manchester City) — CFG no es una entidad que publique estados financieros públicos (es un
  vehículo de inversión privado, aunque Silver Lake tiene participación minoritaria en CFG mismo, CFG
  no cotiza ni está obligado a publicar).
- **Wuhan Three Towns**: el inversor original (Wuhan Zall/卓尔控股, privado) dejó de aportar capital en
  2023 y el club buscó reestructuración societaria; hay evidencia de involucramiento de Huayuan
  Securities (华源证券, correduría estatal de Wuhan) pero no se confirmó como accionista formal del
  club en esta sesión — Huayuan Securities en sí tampoco parece cotizar en bolsa (es una correduría
  regional controlada por el gobierno municipal, no un emisor). Ángulo sin cerrar.
- **Qingdao West Coast**: 中创恒泰集团 (inversión privada), con problemas de pago documentados por
  prensa (rescate de RMB 50M del gobierno local en 2024) — sin cotización.
- **Qingdao Hainiu**: Zhongneng Group (中能集团), con atrasos salariales documentados por prensa — sin
  cotización, grupo "ya no puede sostener" el club según prensa 2025.
- **Yunnan Yukun**: Yukun Steel Group (玉昆钢铁集团, siderúrgica privada de Yuxi) — sin cotización.
- **Chongqing Tonglianglong**: 84,2% de Chongqing Jiayuqi Sports Culture Development (重庆家瑜琪体育
  文化发展有限公司, privada) — Southwest Securities (西南证券, SSE: 600369, SÍ cotiza) es solo
  patrocinador principal/naming partner 2026, NO accionista — confirmado explícitamente en la nota de
  prensa del acuerdo.
- **Chengdu Rongcheng**: 95% de Chengdu Xingcheng Investment Group (成都兴城投资集团, holding estatal
  municipal). Xingcheng Group en sí no cotiza, aunque tiene otras inversiones en empresas que sí
  cotizan (ej. Hongri Pharmaceutical/红日药业, A-share) — sin relación con el fútbol, no ayuda.
- **Liaoning Tieren**: club recién renombrado (2024, ex-Liaoning Shenyang Urban), sin información de
  accionista controlante ni de cotización encontrada en esta sesión — el club más pequeño/nuevo de los
  16, no se profundizó más allá de la búsqueda inicial. Ángulo sin cerrar por falta de tiempo, no por
  dead-end confirmado.

## 3. ¿Agregado de liga entera, como DFL/ÖFBL/Pro League? No existe

Se buscó explícitamente si la CFA (Chinese Football Association) o el operador de la liga (中超公司/
la nueva "中足联", creada 2024 tras la reforma post-crisis) publican un agregado financiero anual de
todos los clubes, siguiendo el patrón que funcionó en Alemania/Austria/Bélgica. **No existe**:

- La CFA SÍ publica su propio reporte financiero anual (deuda de ~RMB 1.200M en 2022, cobertura de
  prensa vía jiemian.com/zhihu.com) — pero es el balance de LA ASOCIACIÓN misma (sueldos de
  federativos, selecciones nacionales, cantera), no un agregado de los clubes.
- No se encontró ningún reporte tipo "中超财务报告" con cifras club por club.
- **La CFA SÍ exige, pero NO publica**: el "中国足球协会职业俱乐部财务监管规程" (reglamento de
  supervisión financiera de clubes profesionales, versión 2019,
  `thecfa.cn/thecfa/upload/20181229/20181229133536140.pdf`) obliga a cada club a presentar
  anualmente ante la CFA un reporte de auditoría firmado por un contador certificado, como condición
  de licencia/registro (準入) — pero el reglamento no prevé publicación pública de esos reportes, solo
  uso interno regulatorio. **Mismo patrón exacto que Costa Rica/FEDEFUT** (sección 7 del skill): el
  regulador deportivo exige y blinda, no exige y publica.

## 4. El hallazgo real de la sesión: Guangzhou Evergrande Taobao (834338, 新三板/NEEQ) — pero YA NO
## juega en la CSL

Un solo club chino en toda la historia se financió cotizando: **Guangzhou Evergrande Taobao Football
Club Co., Ltd.** (广州恒大淘宝足球俱乐部股份有限公司), que se listó en el **New Third Board / 全国中
小企业股份转让系统 (NEEQ/股转系统, el mercado OTC regulado chino, equivalente aproximado a un
Companies House con estados financieros auditados completos)** el 6/11/2015 bajo el ticker **834338**
— la prensa lo llama explícitamente "el primer y único stock de fútbol de Asia" ("亚洲足球第一股"), y
una búsqueda específica de otros clubes chinos en NEEQ no encontró ningún otro caso — es un evento
único, no un canal replicable para el resto de la liga.

- **5 ejercicios anuales completos descargados** (2015-2019) más el **semestral de 2020** (el último
  reporte antes de la salida de bolsa), en `Clubes/China/Guangzhou Evergrande/` — ver
  `fuentes/China/Guangzhou Evergrande.md` para el detalle completo, las cifras clave y el gotcha de
  descarga (WAF de neeq.com.cn bloquea `curl` con 403/302 incluso con cookies replicadas — la vuelta
  que funcionó fue `fetch()` + `btoa()` dentro del browser real, ver esa ficha).
- **Por qué NO está en `Clubes/China/<Club>/` estándar ni en el índice de clubes activos**: Guangzhou
  (rebautizado "Guangzhou FC" tras el colapso de Evergrande) **no está entre los 16 clubes de la CSL
  2025/26** — descendió a categorías inferiores tras la crisis 2021-2023 y la propia entidad societaria
  del período NEEQ (834338) se disolvió/reestructuró. Es un hallazgo HISTÓRICO valioso (documenta la
  crisis financiera del club campeón 2020 con cifras auditadas reales, incluyendo pérdidas netas
  multimillonarias en RMB), no un club actual de la liga que se esté sourceando. Se descargó de todos
  modos por su valor documental excepcional y porque el pedido explícito de Guido mencionaba
  investigar Evergrande a fondo — queda pendiente de decisión de Guido si se quiere cargar al sitio
  como club "histórico"/fuera de temporada actual (ver duda en `dudas-por-club.md`).

## 5. Gotcha de tooling: neeq.com.cn tiene un WAF que bloquea `curl` incluso con cookies reales
## replicadas, pero `fetch()` desde el browser real sí pasa — y el resultado de `javascript_tool`
## se puede rescatar del archivo de disco aunque el chat lo trunque

`www.neeq.com.cn` devuelve **403 Forbidden** (a veces via un loop de 302 que resetea una cookie
`C3VK` cada vez) a cualquier `curl`, incluso copiando el User-Agent, Referer Y el valor exacto de la
cookie `C3VK` que el browser real generó — parece atado a fingerprint TLS/IP, no solo a cookie o
header, así que **no vale la pena seguir intentando replicar la sesión por curl**. Lo que sí funcionó:

1. Navegar la página real del browser tool (`https://www.neeq.com.cn/disclosure/announcement.html`),
   buscar el código de la entidad (834338) en el buscador propio del sitio, filtrar por categoría
   "年度报告" en el filtro de "公告分类" (clic directo en el label, no hay `<select>` tradicional).
2. Para bajar cada PDF: `fetch(url)` dentro de `javascript_tool`, convertir el `ArrayBuffer` a base64
   con un loop `String.fromCharCode` + `btoa` (los PDFs de ~1,5-3,5 MB dan strings base64 de
   2-3,4 millones de caracteres, que exceden el límite de salida del tool).
3. **El error de "excede el máximo de tokens" NO es un fallo real**: el mensaje de error indica que el
   resultado completo se guardó de todos modos en un archivo
   `.../tool-results/mcp-Claude_Browser-javascript_tool-<timestamp>.txt` (formato JSON
   `[{type,text}]`) accesible con Bash normal — se puede leer ese archivo con `python3 -c "import
   json,base64; ...` para extraer el campo `text` (el base64 completo, sin truncar) y decodificarlo
   directo al PDF final. Mucho más simple que intentar bajar en chunks manuales, y confirmado con los
   5+1 archivos de esta sesión (todos abren bien con `pdftotext`/`file`, páginas completas, sin
   corrupción).
4. Intentar el mismo patrón `<a download>` + `.click()` para que el browser lo guarde solo en
   `~/Downloads` **NO funcionó en este entorno** (archivo nunca apareció, ni con `fetch()+Blob` ni con
   clic real sobre el ícono PDF de la página) — no perder tiempo con esa vía acá, ir directo al método
   de `javascript_tool` + archivo de tool-results.
5. Mirrors alternativos (`file.finance.sina.com.cn`, `pdf.dfcfw.com` de Eastmoney,
   `stock.tianyancha.com`) de los MISMOS documentos **sí bajan directo con `curl`, sin WAF** — se
   confirmó con el semestral 2020 vía sina.com.cn. Si un documento de neeq.com.cn falla, buscar
   primero si algún agregador financiero lo mirrorea antes de pelear con el WAF.

## Cómo mantener esta nota

Actualizar si algún club de la CSL cambia de accionista controlante hacia una entidad cotizante
(pasó varias veces en 2023-2025 por la crisis, así que vale la pena rechequear cada 1-2 años), si se
confirma o descarta el ángulo abierto de Henan/Jianye 2021-2022, Wuhan Three Towns/Huayuan Securities,
Zhejiang/Zhejiang Energy Group o Liaoning Tieren (sin profundizar en esta sesión), o si la CFA/中足联
empieza a publicar un agregado de liga (poco probable dado el patrón de confidencialidad ya
confirmado, pero revisar si cambia la normativa).
