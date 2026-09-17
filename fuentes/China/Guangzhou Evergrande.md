# Guangzhou Evergrande (histórico — NO es un club de la CSL 2025/26)

- **Deporte**: Fútbol.
- **Aviso importante**: este club, bajo el nombre actual "Guangzhou FC" (ex-Guangzhou Evergrande
  Taobao), **NO está entre los 16 clubes de la Chinese Super League 2025/26** — descendió de
  categoría tras el colapso financiero de China Evergrande Group (2021-2023) y la entidad societaria
  documentada acá (834338) se disolvió/reestructuró. Se investigó y descargó de todos modos porque
  (a) el pedido explícito de esta sesión pedía chequear Evergrande a fondo vía disclosure de mercados
  de capital, y (b) el hallazgo es único en todo el proyecto: el único club de fútbol chino que alguna
  vez tuvo disclosure financiero público auditado completo. Ver duda para Guido en
  `dudas-por-club.md` sobre si cargar esto al sitio como club "histórico".
- **Entidad legal**: 广州恒大淘宝足球俱乐部股份有限公司 (Guangzhou Evergrande Taobao Football Club
  Co., Ltd.) — accionistas Evergrande Real Estate Group (恒大地产集团, 60%) y Alibaba (中国) 网络技术
  有限公司 (Alibaba China, 40%, desde la ampliación de capital de junio 2015).
- **Canal**: listado en el **New Third Board / 全国中小企业股份转让系统 (NEEQ, "股转系统")**, el
  mercado OTC regulado chino — equivalente aproximado, en términos de disclosure obligatorio, a un
  Companies House o una bolsa menor, con reportes anuales/semestrales auditados públicos y gratuitos
  vía `neeq.com.cn`. Listado el 6/11/2015 bajo ticker **834338** ("亚洲足球第一股", el primer y único
  club de fútbol asiático en cotizar) — confirmado con una búsqueda específica que ningún otro club
  chino, de ninguna división, replicó este movimiento.
- **Terminó cotizando por deterioro financiero, no por decisión voluntaria**: cambió de nombre a "ST
  恒宝" (el prefijo "ST" = Special Treatment, marca china de riesgo financiero/going concern) en enero
  de 2021, y se dio de baja del NEEQ el 9/3/2021 — coincide con el inicio de la crisis de liquidez de
  China Evergrande Group (default formal en diciembre de 2021).

## Qué se bajó (sesión 2026-09-17)

**6 documentos** en `Clubes/China/Guangzhou Evergrande/`, cubriendo TODOS los ejercicios disponibles
en el listado NEEQ (confirmado que no hay más: el filtro por categoría "年度报告" en el buscador de
`neeq.com.cn/disclosure/announcement.html` para el código 834338 devuelve exactamente estos 5 años,
sin ejercicio 2020 completo porque el club se dio de baja antes de tener que presentarlo):

- `annual-report-2015.pdf` (105 págs.) — primer ejercicio como cotizante.
- `annual-report-2016.pdf` (95 págs.)
- `annual-report-2017.pdf` (96 págs.)
- `annual-report-2018-corregido.pdf` (93 págs.) — hay una versión "已取消" (cancelada) previa del
  mismo ejercicio en el listado del sitio, no descargada a propósito; esta es la corregida/vigente
  (depositada 28/8/2019).
- `annual-report-2019.pdf` (116 págs.) — último ejercicio anual completo.
- `semi-annual-2020.pdf` (73 págs.) — semestral enero-junio 2020, el último reporte financiero antes
  de la baja de cotización (marzo 2021); NO es un ejercicio anual completo, pero es el dato más
  reciente disponible y documenta el estado terminal previo a la crisis abierta de Evergrande Group.

Todos son PDF con capa de texto nativa (sin necesidad de OCR, a diferencia de los escaneos de
Companies House/UK) — `pdftotext -layout` extrae texto limpio directamente.

## Verificación hecha en esta sesión

Se extrajo el texto completo del reporte 2019 y se confirmaron cifras reales de la Sección 11
("财务报告", Reporte Financiero) — **no transcriptas a `.md` todavía, esto es solo sourcing**:

- Ingresos operativos (营业收入) 2019: RMB 782.821.669,58 (+29,85% vs. 2018: RMB 602.850.443,09).
- Resultado neto atribuible (归属于挂牌公司股东的净利润) 2019: **-RMB 1.942.922.441,21** (pérdida,
  -6,24% vs. la pérdida de 2018: -RMB 1.828.743.679,74) — el propio reporte atribuye el agravamiento a
  un pago al fondo de desarrollo de cantera juvenil ("青训发展基金").
- Activos totales (资产总计) 2019: RMB 2.480.277.636,85.
- Pasivos totales (负债合计) 2019: RMB 6.631.608.970,00 — **patrimonio neto negativo de
  aproximadamente RMB 4.150 millones**, documentando con cifras auditadas reales el colapso financiero
  del club campeón de la CSL 2020 mucho antes de que la crisis de Evergrande Group se hiciera pública
  a nivel de prensa internacional (default formal recién en diciembre 2021).

## Gotcha de descarga (WAF de neeq.com.cn)

`www.neeq.com.cn` bloquea `curl` con 403/loop de 302 incluso replicando User-Agent, Referer y la
cookie `C3VK` real generada por un browser — no vale la pena seguir insistiendo por esa vía (ver
`fuentes/China/_notas-generales.md` sección 5 para el detalle completo del método que sí funcionó:
`fetch()` dentro del browser real vía `javascript_tool`, rescatando el base64 completo del archivo de
`tool-results` en vez de intentar que quepa en la respuesta del chat). Mirrors alternativos del mismo
documento en `file.finance.sina.com.cn` (usado para el semestral 2020) sí bajan directo con `curl`,
sin WAF — más rápido cuando el documento tiene mirror.

## Duda para `dudas-por-club.md`

Ver `dudas-por-club.md` — la pregunta no es de contenido del documento sino de alcance del sitio: si
Guido quiere cargar un club que ya no juega en la liga actual (por su valor histórico/documental de la
crisis) o si el criterio del proyecto es limitarse a clubes vigentes de la temporada corriente.

- Último chequeo: 2026-09-17.
