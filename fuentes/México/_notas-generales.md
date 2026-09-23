# Notas generales — México (Liga MX)

## Metodología, sesión 2026-09-13 (sourcing CONCACAF)

El supuesto de partida de esta sesión era que "Liga MX no tiene tradición de disclosure público,
clubes son propiedad privada de grupos de medios/empresarios (Televisa, Salinas, etc.) sin obligación
de publicar" — **ese supuesto general sigue siendo cierto para la enorme mayoría de los 18 clubes**,
pero tiene una excepción real y significativa que vale la pena que una sesión futura explote más:

- **Club América es hoy, de hecho, un caso "Chile/Colombia"**: dejó de ser subsidiaria interna de
  Grupo Televisa el 31/01/2024 cuando Televisa escindió su negocio de fútbol + Estadio Azteca +
  editoriales + juegos en una compañía nueva, **Ollamani, S.A.B.**, que cotiza en la BMV (clave
  `AGUILAS`) y por lo tanto está obligada por la CNBV a publicar Estados Financieros Consolidados
  auditados bajo IFRS. Ollamani desglosa "Segmento de Fútbol" (Club América + Estadio Banorte) como
  uno de sus tres segmentos operativos reportables (IFRS 8), con ingresos y utilidad segmentados
  (aunque sin balance por segmento). Ver `fuentes/México/Club América.md` para el detalle completo y
  los PDFs ya descargados (2024 y 2025, ambos con capa de texto).
- **Chivas (Club Deportivo Guadalajara / Grupo Omnilife-Amaury Vergara)**: hubo intención pública
  (bajo Jorge Vergara, y reiterada por Amaury Vergara en 2024) de salir a bolsa, pero confirmado que
  a la fecha de esta sesión NO cotiza — sigue siendo 100% privada, sin obligación de disclosure. Vale
  la pena volver a chequear en el futuro si concreta la salida a bolsa (várias notas de prensa
   -Forbes México, El Universal- lo mencionan como plan de mediano plazo, no como hecho consumado).
- **Cruz Azul**: propiedad de una cooperativa (no una S.A.), con asamblea general y auditoría externa
  confirmada por prensa ("sin salvedades" 2020-2025), pero sin ningún documento público descargable
  encontrado — dead-end documentado en `fuentes/México/Cruz Azul.md`, con un ángulo pendiente (INAES/
  Secretaría de Economía, registro de cooperativas) no explorado todavía.
- **Resto de clubes de Liga MX** (Monterrey/FEMSA, Tigres/CEMEX-FEMSA, Pachuca/Grupo Pachuca, León,
  Toluca, Necaxa, Santos Laguna, Puebla, Querétaro, Mazatlán, Juárez, Atlas, Atlético San Luis,
  Tijuana): no se investigó cada uno individualmente en esta sesión por falta de tiempo — el
  supuesto de partida (privados, sin obligación CNBV) sigue siendo razonable como prior, pero dado
  que apareció una excepción real (América/Ollamani) donde no se esperaba ninguna, **vale la pena que
  una sesión futura chequee puntualmente si alguno de estos grupos matriz (sobre todo los que ya
  cotizan en BMV por otro negocio, ej. FEMSA-Monterrey/Tigres, CEMEX-Tigres) desglosa el fútbol como
  segmento en SUS PROPIOS reportes CNBV**, antes de asumir que el mismo hallazgo de Ollamani es único.

## Barrido completo de Liga MX, sesión 2026-09-22

Se trackearon los **16 clubes que faltaban** (quedan los 18 de la Liga MX 2025/26 con archivo propio).
Resultado: 2 hallazgos reales nuevos, 14 dead-ends documentados, y **tres hallazgos estructurales de
país** que hacen defendibles esos dead-ends en vez de dejarlos como "no se encontró".

### 1. El regulador deportivo exige y blinda: el Reglamento de Control Económico de la LIGA MX

**Este es el hallazgo que explica México entero.** La FMF/LIGA MX publica en
`fmf.mx/justicia-deportiva/reglamentos` su **Reglamento de Control Económico** (edición 2026 en
`fmf.mx/docs/reglamentos/531.pdf`, 50 páginas, con capa de texto; copia guardada en
`Clubes/México/_Liga-MX-Control-Economico/reglamento-de-control-economico-2026.pdf`). Dice, textual:

- **Artículo 26** — "Los Clubes afiliados a la LIGA MX deberán entregar y presentar anualmente estados
  financieros dictaminados por un tercero independiente", conforme a las Normas de Información
  Financiera mexicanas, **a nombre de la persona moral que ostenta la titularidad de los derechos de
  afiliación del Club**, con balance al 31 de diciembre y estado de resultados / cambios en el capital
  contable / flujos de efectivo por el año calendario, comparativos, **dentro de los 120 días de
  cerrado el ejercicio (30 de abril)**. Además deben acompañarlos con una cuenta de resultados en el
  formato de presupuesto de la LIGA MX **desglosada por equipo y por torneo**.
- **Artículo 12** — "La información, datos y documentos que los Clubes entreguen y proporcionen en el
  cumplimiento de este reglamento **tendrán carácter confidencial**. El medio oficial para transmitir
  la información es el SICE (Sistema de Control Económico de la LIGA MX)". El anexo de la carta que
  firma cada club lo repite invocando la Ley Federal de Protección de Datos Personales en Posesión de
  los Particulares.
- El reglamento incluso enlista las firmas de auditoría autorizadas para dictaminar.

O sea: **los 18 clubes tienen estados financieros auditados, en año calendario, en formato
homogéneo — y son sistemáticamente confidenciales por diseño.** Es el mismo patrón que FEDEFUT en
Costa Rica y la CFA en China (el regulador deportivo exige y blinda), pero acá está verificado en el
texto del reglamento, no inferido de prensa. Y es lo OPUESTO a Croacia (HNS), Países Bajos (KNVB) o
Italia (licencia UEFA), donde el mandato de licencia empuja al club a PUBLICAR.

### 2. No hay un registro mercantil mexicano que sirva, y no vale la pena volver a probarlo

México no tiene equivalente a Companies House, al Unternehmensregister ni a la Centrale des bilans. El
**Registro Público de Comercio** (y los registros estatales tipo IFREM) inscribe actos societarios —
constitución, poderes, fusiones—, no estados financieros depositados y consultables por terceros. Los
estados financieros de una S.A. mexicana van al **SAT** (dictamen fiscal), que es información fiscal
reservada, no pública. Por eso, en México, el único canal real de disclosure es el **mercado de
valores (CNBV/BMV)** cuando el club o su controlante cotiza — que es exactamente el caso Ollamani.

### 3. El listado completo de emisoras de la BMV: solo hay UN club de fútbol, y ya está cargado

Se obtuvo el **listado completo de emisoras del mercado de capitales** al 22/09/2026 (109 claves) del
propio buscador de `bmv.com.mx/es/mercados/capitales`, botón "Ver Todas", leído con el Browser pane
(la página arma la tabla por JavaScript; `curl` plano no la sirve). Recorrido entero: la única clave
de un club de fútbol es **`AGUILAS`** (Ollamani/Club América). Dos falsos positivos a no repetir:
`DIABLOI` es un ETF de Actinver sobre el índice S&P/BMV DIBol (no el Toluca, pese al apodo "Diablos
Rojos"), y `SPORT` es Grupo Sports World (gimnasios).

Complemento: barrido de **SEC EDGAR full-text** con los nombres de los 18 clubes y de sus grupos
controlantes (Orlegi, Grupo Pachuca, Grupo Caliente, NX Football, Sinergia Deportiva…). **Ningún club
de Liga MX tiene filings propios ante la SEC.** Todos los hits son de terceros: patrocinadores
(Aeroméxico–Toluca, Under Armour, Reebok, Anheuser-Busch, Constellation, América Móvil), derechos de
TV (Fox), casas de apuestas (Codere Online) y ruido de homónimos.

### 4. Controlantes cotizantes: consolidan, pero casi nunca desglosan

El supuesto de que "si el dueño cotiza, hay cifras" se probó club por club y **casi siempre falla**.
Lo que quedó verificado con documento en la mano:

| Club | Controlante cotizante | Qué dice el documento |
|---|---|---|
| Club América | Ollamani, S.A.B. (BMV `AGUILAS`) | **Segmento "Fútbol" con ingresos y utilidad propios** — el único hit completo, ya cargado |
| Tigres UANL | CEMEX (BMV + NYSE) | Lista a `Sinergia Deportiva, S.A. de C.V.` en el **Exhibit 8.1 de sus 20-F (2017-2026)**, pero **cero menciones en el cuerpo del 20-F**: segmentos geográficos, sin fútbol |
| Monterrey | FEMSA (BMV + NYSE) | **Ni siquiera lo nombra**: no califica como "significant subsidiary" y el 20-F 2025 no menciona "soccer"/"football"/"Rayados"/"fútbol" ni una vez |
| Mazatlán FC | TV Azteca (BMV `AZTECA`) | Lo lista como subsidiaria 100% en el Reporte Anual 2022, pero **TV Azteca no tiene segmento "Fútbol"** (sus segmentos son Operación doméstica / Guatemala y Honduras / Exportaciones / Golf) |
| Atlas | TV Azteca (2014-jul 2019) | **HIT**: la VENTA a Orlegi lo convirtió en operación discontinua bajo IFRS 5, con P&L condensado 2018/2019 y activos netos dispuestos — ver `Atlas.md` |

**La lección reutilizable**: cuando un controlante cotizante NO desglosa al club como segmento, el
momento en que sí aparecen cifras es **cuando lo vende** — IFRS 5 obliga a desglosar el componente
discontinuado. Conviene revisar los ejercicios de VENTA, no los de tenencia.

**Gotcha que costó el hallazgo más grande de la sesión**: el mismo mecanismo debería haber dado cifras
de Mazatlán FC (vendido al Atlante en dic-2025 por USD 65 millones), pero **TV Azteca dejó de presentar
información periódica a la BMV después del 4T-2022** — verificado en
`bmv.com.mx/es/emisoras/informacionfinanciera/AZTECA-5730-CGEN_CAPIT`, último estado financiero básico
subido el 26/04/2023 y último reporte anual el XBRL de 2022. Antes de contar con un emisor mexicano
como fuente, chequear que siga presentando.

### 5. Ángulo nuevo y reutilizable: el club mexicano como FILIAL de un club europeo que sí publica

**Atlético San Luis** salió por una puerta que no estaba en la metodología: es filial al 88,14% del
**Club Atlético de Madrid, S.A.D.**, y la nota de "Inversión en empresas del grupo y asociadas" de las
Cuentas Anuales del Atleti —públicas, gratis, y ya descargadas en este repo desde la sesión de
España— trae capital, reservas, resultado del ejercicio y resultado de explotación de
`Club Atlético de Madrid Potosí, S.A.P.I. de C.V.`, ejercicio por ejercicio desde 2018-19. Ver
`Atlético San Luis.md`. **Generalización**: cuando un club de un país opaco pertenece a un grupo
multiclub cuya cabecera está en un país con registro abierto, las cuentas de la cabecera son el canal.

### 6. Los clubes universitarios: transparencia pública que llega al subsidio, no al balance

Dos clubes de Liga MX cuelgan de universidades públicas (sujetos obligados de transparencia): **Pumas**
de la UNAM y **Tigres** de la UANL. En ambos casos el club opera bajo una persona moral **privada**
(Club Universidad Nacional, A.C. y Sinergia Deportiva, S.A. de C.V.), así que la ley de transparencia
no alcanza sus estados financieros. Lo que SÍ alcanza es el dinero que la universidad le transfiere o
recibe: el **INAI ordenó a la UNAM** transparentar los montos entregados al club (resolución de
enero-2022, antecedente RRA-10748/19), y de ahí salieron cifras puntuales y citables. Es un canal real
pero de techo bajo — ver `Pumas UNAM.md` y `Tigres UANL.md`.

### 7. Lead sin explotar, FUERA del fútbol: Diablos Rojos del México cotiza en la BMV

Apareció al recorrer el listado de emisoras y **no se siguió porque esta sesión era solo de Liga MX**:
**Diablos Rojos del México, S.A.P.I.B. de C.V.** (béisbol, LMB) **listó en la BMV el 20/12/2024** bajo
la clave `DIABLOS` mediante un listado sin oferta pública, a MXN 1.000 por título, y por lo tanto
**reporta trimestralmente a la CNBV**. Es el segundo caso mexicano del patrón Ollamani y el primer club
de béisbol del proyecto. Decisión para Guido: si vale la pena abrir béisbol/LMB, este es el candidato
obvio y el canal ya está probado (BMV/CNBV, mismo flujo que `AGUILAS`).

## Cómo mantener esta nota

Si una sesión futura confirma otro club de Liga MX con disclosure público real (vía CNBV/BMV u otro
mecanismo), agregar su archivo en `fuentes/México/<Club>.md` y sumarlo a la lista de arriba. Si se
confirma que Chivas efectivamente salió a bolsa, mover esa entrada de "posible/pendiente" a "hit real"
con su propio archivo.

Si una sesión futura confirma que un club antes privado pasó a tener un controlante cotizante (la
venta de León en curso es el caso más probable a corto plazo), rehacer el chequeo de segmentos e
IFRS 5 sobre el nuevo dueño antes de dar el club por perdido.
