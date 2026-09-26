# Inventario pendiente: PDFs sin transcribir + transcripciones sin cargar

**Por qué existe este archivo (2026-09-25, pedido explícito de Guido: "hace la lista entera de pdfs
que faltan transcribir y de transcripciones que faltan y ponelos en un mismo to-do así la siguiente
sesión no tiene que hacer de detective").** Hasta ahora, cada sesión de onboarding tenía que volver a
recorrer `Clubes/` a mano para saber qué había disponible y qué de eso ya estaba cargado. Este
archivo es esa foto completa, tomada una vez, para que la próxima sesión la lea en vez de
reconstruirla. Es una FOTO, no un archivo vivo: a medida que se onboardeen clubes/ejercicios de
acá, TACHAR o borrar la línea correspondiente (no dejarla "resuelta" al lado de las demás — mismo
criterio que ya rige para `Admin/TODO.md`). Si aparecen documentos nuevos, agregarlos donde
corresponda.

**Cómo se armó**: 1 barrido directo del filesystem (`find` + comparación de nombres de archivo, sin
agente, 100% determinístico) para la Sección 1; 2 agentes Explore en paralelo (América+Asia y
Europa) cruzando `Admin/ESTADO.md` (CLUB-INDEX) + cabecera de cada `data/<clubId>-data.js` contra
cada `.md` de `Clubes/`, para la Sección 2. Medido el 2026-09-25, sobre 161 clubes cargados / 291
ejercicios, 3299 PDFs y 1297 `.md` en `Clubes/`.

**Antes de usar cualquier archivo de acá**: seguí el proceso normal — `club-sourcing` si es país
nuevo, `club-data-mapping` para categorizar, `club-or-year-onboarding` para el proceso de carga.
Este archivo solo te ahorra el paso de "¿qué hay y qué falta?", no reemplaza la verificación de
`club-data-mapping` sección 6 (sumar a mano contra los subtotales impresos) para ningún documento.

---

## Por dónde conviene empezar (los clusters de mejor relación esfuerzo/resultado)

1. **Chile — Colo-Colo, Universidad Católica, Universidad de Chile** (sección 2.1): ~41 ejercicios-año
   ya transcriptos, EEFF IFRS auditados de buena calidad, país/moneda/liga ya con todo el scaffolding
   armado (solo 3 años cargados de 14-17 disponibles por club). Es el hallazgo más grande de todo
   este inventario y el de menor riesgo.
2. **Bélgica y Dinamarca** (sección 2.1): ~510 ejercicios-año entre ambos países, series históricas
   completas de los 14+10 clubes ya cargados, mismo tipo de documento que el ejercicio ya cargado de
   cada uno. Cero scaffolding nuevo.
3. **España y Alemania** (sección 2.1): ~130 ejercicios-año de clubes grandes ya cargados (Real
   Madrid, FC Barcelona, Atlético de Madrid, Sevilla, Real Betis, Dortmund, RB Leipzig, Hamburger SV,
   TSG Hoffenheim), documentos oficiales bien estructurados.
4. **Croacia** (sección 2.1): ~36 ejercicios-año de los 8 clubes ya cargados.
5. Recién después, los países 100% nuevos con `.md` ya listo (sección 2.3): Corea del Sur (4 clubes,
   26 ejercicios), Austria/Escocia/Italia/Francia/Portugal (1-2 clubes cada uno, series completas).

---

## Sección 1 — PDFs sin transcribir todavía (2047 archivos, 15 países)

Un PDF "sin transcribir" es uno que no tiene ningún `.md` con el mismo nombre base en su misma
carpeta. **Antes de transcribir cualquiera de estos, recordá la regla de CLAUDE.md**: pdftotext
primero, y si no da texto real, OCR con Tesseract (`club-data-mapping` sección 15) — no asumir que
hace falta el Read tool sobre imágenes sin medir primero.

**Los países SIN ningún club cargado hoy tienen la mayoría de este volumen** (Noruega, República
Checa, Grecia, Portugal, Ucrania, Rusia, Italia, Turquía, Suiza): para esos, antes de transcribir en
masa, conviene primero abrir 1-2 PDFs de muestra por club y confirmar que son balances/DRE reales (no
memorias narrativas) — la sección 3 de este archivo ya tiene varios ejemplos de PDFs que, una vez
transcriptos, resultaron ser la entidad equivocada o el período equivocado.

### Argentina — 8 PDFs, 5 clubes
- **Banfield** (1): `informe-mercado-de-pases-2026.pdf`
- **Ferro Carril Oeste** (4): `balance-ejercicio-121-2024-25.pdf`, `memoria-ejercicio-121-2024-25.pdf`, `memoria-y-balance-ejercicio-117-2020-21.pdf`, `memoria-y-balance-ejercicio-122-2025-26.pdf`
- **Gimnasia y Esgrima LP** (1): `memoria-2022-2023.pdf`
- **Newell's Old Boys** (1): `resumen-anual-actividades-2012-2013.pdf`
- **Temperley** (1): `informe-gestion-primer-ano-lecchi-2025.pdf` (ojo: ver sección 3, Temperley es dead-end conocido — este PDF puntual no se revisó, pero el patrón del club es "Memoria sin balance")

### Brasil — 194 PDFs, 13 clubes (clubes sin ningún dato cargado todavía)
- **Athletic Club** (6): `balanco-2024-assinado.pdf`, `dre-2024-assinado.pdf`, `publicacao-relatorios-contabeis.pdf`, `relatorio-auditoria-2023.pdf`, `relatorio-auditoria-2024.pdf`, `relatorio-auditoria-2025.pdf` — **ojo**: `node tools/audit.js` ya avisa (`clubid-amenazado-por-sourcing`) que si este club se carga hay que renombrar el `athleticclub` español existente a `athleticclub-es` PRIMERO.
- **Avai** (7): `demonstracoes-contabeis-2021.pdf` … `-2025.pdf`, `relatorio-auditores-2021.pdf`, `relatorio-auditores-2024.pdf`
- **CRB** (10): `balanco-patrimonial-2020.pdf` … `-2025-corrigido.pdf`, `demonstracoes-contabeis-2024.pdf`, `-2025.pdf`, `relatorio-auditoria-2022.pdf`, `-2023.pdf`
- **Criciuma** (16): `balanco-2015.pdf` … `-2020.pdf` (+ `-2019-escaneado.pdf`), `balanco-auditado-2016.pdf`, `demonstracoes-financeiras-2013.pdf`, `-2022.pdf`, `demonstrativo-financeiro-2012.pdf`, `-2014.pdf`, `-2021.pdf`, `relatorio-auditoria-2025.pdf`, `relatorio-de-balanco-2023.pdf`, `-2024.pdf`
- **Cuiaba** (5): `balanco-financeiro-2022.pdf`, `-2024.pdf`, `-2025.pdf`, `balanco-patrimonial-2023.pdf`, `demonstracoes-financeiras-2023-auditadas.pdf`
- **Ferroviaria** (24): `balancete-2022.pdf`, `balanco-2010.pdf`, `-2012.pdf` a `-2018.pdf`, `-2022.pdf`, `-2023.pdf` (varios con variante `-a`/`-b`), `demonstracoes-financeiras-2021.pdf`, `-2023-fpf.pdf`, `-2024.pdf`, `-2025.pdf`, `dlpa-2022.pdf`, `dre-2017.pdf`, `-2018.pdf`, `-2022.pdf`, `-2023.pdf`, `relatorio-dos-auditores-2022.pdf`
- **Goias** (17): `balanco-publicado-2024-2023.pdf`, `demonstracoes-contabeis-2008-2007.pdf` … `-2017-2016.pdf`, `-2021.pdf`, `-2022-fgf-go.pdf`, `-2022.pdf`, `-2023.pdf`, `-2024.pdf`, `-2025.pdf`
- **Ituano** (22): `2010-anexo-a.pdf` … `2017-ituano-balanco-auditado-assinado-2018.pdf`, `balanco-e-relatorio-auditoria-2022-ituano.pdf`, `balanco-ituano-2019.pdf`, `-2020-e-parecer-da-auditoria.pdf`, `-2021-e-relatorio-de-auditoria.pdf`, `relatorio-auditoria-ifc-2023.pdf`, `relatorio-de-auditoria-2018-audit-consult-novo.pdf`, `-ituano-2019.pdf` (nota: Ituano YA tiene 1 ejercicio 2024 cargado con otro documento — esto es backlog de años anteriores)
- **Mirassol** (34): serie completa 2012-2025 en anexos sueltos + los 7 archivos del ejercicio 2025 (bp/dfc/dmpl/dra/dre/laudo/notas/relatorio) — Mirassol YA tiene 2024 cargado, este es el backlog 2012-2023 + 2025
- **Novorizontino** (16): `balanco-2010.pdf` … `-2016.pdf`, `demonstracoes-financeiras-2018.pdf` … `-2025.pdf`, `dre-e-fluxo-de-caixa-2017.pdf`
- **Paysandu** (15): `balanco-2021.pdf`, `-2023.pdf`, `-2024.pdf`, `-2025.pdf`, `dfc/dmpl/dra/dre-2021.pdf`, `dre-2023.pdf`, `-2024.pdf`, `-2025.pdf`, `notas-explicativas-2021.pdf`, `relatorio-administrativo-2025.pdf`, `relatorio-auditores-2021.pdf`, `-2025.pdf`
- **Remo** (18): `balanco-2023.pdf`, `-2024.pdf`, `balanco-patrimonial-2020.pdf`, `demonstracoes-contabeis-2021.pdf`, `-2022.pdf`, `demonstracoes-financeiras-2025.pdf`, `dfc/dmpl/dre-2019.pdf` y `-2020.pdf`, `dre-2022.pdf` a `-2024.pdf`, `parecer-auditoria-2019.pdf`, `relatorio-auditor-independente-2022.pdf`, `relatorio-auditoria-2020.pdf`
- **Vila Nova** (4): `demonstrativo-financeiro-2022.pdf` … `-2025.pdf`

### Colombia — 184 PDFs, 10 clubes (mismo patrón en todos: certificación EF + dictamen revisor fiscal + estados financieros, un trío por año, 2016-2025 aprox.)
- **Aguilas Doradas** (23), **Alianza FC** (22), **Atletico Bucaramanga** (22), **Boyaca Chico** (7), **Envigado** (26, club ya cargado con otro ejercicio — este es backlog de años previos), **Fortaleza CEIF** (23), **La Equidad** (23), **Llaneros** (23), **Once Caldas** (14, club ya cargado — backlog de años previos), **Union Magdalena** (1: `dictamen-revisor-fiscal-2021.pdf`, club ya cargado con el ejercicio 2018).
  Ver listado completo de nombres de archivo en el scratchpad de la sesión 2026-09-25 si hace falta
  el detalle exacto — el patrón es idéntico en los 10 clubes (`certificacion-ef-YYYY.pdf` +
  `dictamen-revisor-fiscal-YYYY.pdf` + `estados-financieros-YYYY.pdf`, un trío por año).

### Países Bajos — 137 PDFs, 18 clubes (ninguno de los 4 ya cargados — Ajax/AZ/Feyenoord/PSV — tiene backlog; son los OTROS 18 clubes de Eredivisie/Eerste Divisie sin nada cargado: Excelsior, FC Groningen, FC Twente, FC Utrecht, FC Volendam, Fortuna Sittard, Go Ahead Eagles, Heracles Almelo, NAC Breda, NEC, PEC Zwolle, SC Heerenveen, Sparta Rotterdam, Telstar, y otros)

### Portugal — 128 PDFs, 16 clubes; Noruega — 369 PDFs, 15 clubes; República Checa — 351 PDFs, 16 clubes; Grecia — 242 PDFs, 14 clubes; Ucrania — 102 PDFs, 8 clubes; Rusia — 101 PDFs, 14 clubes; Italia — 93 PDFs, 15 clubes; Turquía — 78 PDFs, 7 clubes; Suiza — 58 PDFs, 6 clubes
Países 100% sin cargar, con volumen grande de PDFs pero (ver Sección 2.3) muy pocos `.md` ya hechos
todavía — la mayoría de este volumen es trabajo de transcripción de cero, no de carga. El detalle
archivo por archivo de estos 9 países está en el scratchpad de la sesión 2026-09-25
(`pdfs-sin-transcribir.txt`); si hace falta regenerarlo, el script de una línea es:
```
find Clubes -type f -iname "*.pdf" | while read f; do
  base="${f%.*}"; [ -f "${base}.md" ] || echo "$f"
done
```
(agrupar el resultado por país/club con lo que prefiera la sesión que lo use).

### México — 1 PDF; Croacia — 1 PDF
Volumen mínimo, no amerita detalle en tabla.

---

## Sección 2 — Transcripciones (`.md`) que YA EXISTEN pero no están cargadas al sitio

### 2.1 — Ejercicio nuevo de un club YA CARGADO

**Convención de todas las listas de abajo**: `<Club> (clubId, cargado: <años>) — N ejercicios nuevos: <archivos o rango>`.

**ESPAÑA**
- Athletic Club (athleticclub, cargado 2024/25) — 3: `cuentas-anuales-2021-2022.md`, `-2022-2023.md`, `-2023-2024.md`
- Atlético de Madrid (atleticomadrid, cargado 2024/25) — 11: `cuentas-anuales-2013-2014.md` … `-2023-2024.md` (serie consecutiva)
- Celta de Vigo (celtavigo, cargado 2024/25) — 3: `cuentas-anuales-2018-2019.md`, `cuentas-anuales-consolidadas-2023-2024.md`, `informacion-financiera-reformulada-2021-2022.md` (esta última: confirmar si es un balance completo o solo el ajuste reformulado antes de cargar)
- Deportivo Alavés (deportivoalaves, cargado 2024/25) — 8: `cuentas-anuales-2016-2017.md` … `-2023-2024.md`
- FC Barcelona (fcbarcelona, cargado 2024/25) — 21: `memoria-2003-04.md` … `memoria-2023-24.md` (⚠️ son "memoria", confirmar que tienen el balance auditado completo y no solo un resumen narrativo antes de tratarlas como equivalentes al 2024/25 ya cargado)
- Real Betis (realbetis, cargado 2024/25) — 6: `cuentas-anuales-2020-2021.md`, `-2022-2023.md`, `cuentas-anuales-consolidadas-2019-2020.md` + `cuentas-anuales-individual-2019-2020.md`, `cuentas-anuales-consolidadas-2021-2022.md` + su informe de auditoría separado
- Real Madrid (realmadrid, cargado 2024/25) — 21: `informe-economico-2003-2004.md` … `-2023-2024.md`
- Sevilla FC (sevillafc, cargado 2024/25) — 3: `cuentas-anuales-2021-2022.md`, `-2022-2023.md` (la versión FINAL, no el borrador rechazado — ver descartados), `-2023-2024.md`
- Valencia CF (valenciacf, cargado 2024/25) — 2: `cuentas-anuales-consolidadas-2023-2024.md`, `cuentas-anuales-individual-2023-2024.md`

**ALEMANIA**
- Borussia Dortmund (dortmund-de, cargado 2023/24-2024/25) — 5: `geschaeftsbericht-2018-19.md` … `-2022-23.md`
- Hamburger SV (hamburgersv-de, cargado 2023/24-2024/25) — 6 (2 ejercicios × 3 documentos paralelos): `ev-bilanz-2021-22.md`, `ev-guv-2021-22.md`, `fussball-ag-jahresabschluss-2021-22.md`, y los mismos 3 para `-2022-23.md`
- TSG Hoffenheim (hoffenheim-de, cargado 2023/24-2024/25) — 14: `jahresabschluss-2009-10.md`, `-2010-11.md`, `-2011-12.md` + `konzernabschluss-2012-13.md` … `-2022-23.md` (11 años consolidados)
- Borussia Mönchengladbach (monchengladbach-de, cargado 2023-2024, calendario) — 2: `jahresabschluss-2021.md`, `-2022.md`
- RB Leipzig (rbleipzig-de, cargado 2021/22-2024/25) — 7: `jahresabschluss-2014.md`, `-2015.md`, `-2016.md`, `-2017.md`, `-2018-19.md`, `-2019-20.md`, `-2020-21.md` (⚠️ NO usar `jahresabschluss-2018-stub.md`, marcado explícito como stub incompleto en la propia cabecera del data.js)

**BÉLGICA** (los 14 clubes cargados tienen TODOS solo 1 ejercicio, 2024/25 — el resto de cada serie sigue transcripto y sin cargar; formato `jaarrekening-<año>-06-30-individual.md` salvo donde se indica)
- Anderlecht — 14 (2011-2024) · Antwerp — 13 (2012-2024) · Cercle Brugge — 10 (2015-2024) · Charleroi — 24 (2001-2024, la serie más larga) · Club Brugge — 33 (1999-2024, con versión `-consolidado.md` en paralelo desde 2020 y 1 corrección en 2013/2020) · Dender EH — 14 (con huecos: 2008,2010,2014,2015,2017-2024) · Genk — 18 (2007-2024) · Gent — 25 (2005-2024, con hueco 2015→2016 y cambio de cierre a 31/5 en 2016-17, más versión `-consolidado.md` desde 2017) · Mechelen — 19 (2007-2024) · Sint-Truiden — 12 (2013-2024) · Standard Liège — 30 (1999-2024, con 4 correcciones) · Union Saint-Gilloise — 27 (1999-2024, con 1 corrección) · Westerlo — 26 (1998-2013 cierre 31/12, luego 2015-2024 cierre 30/6, sin año de transición 2014) · Zulte Waregem — 13 (2012-2024)

**DINAMARCA** (todos con 1 solo ejercicio cargado; formato `aarsrapport-<fecha cierre>.md`)
- AGF (cargado 2020/21) — 7 (2013/14-2019/20) · Brøndby (cargado 2020) — 6 (2014-2019) · FC Fredericia (cargado 2019) — 11: 7 con MISMO formato que el 2019 ya cargado (2012-2018) + 4 con ⚠️ formato "Bruttofortjeneste" sin desglose de Nettoomsætning desde 2020 (2020-2023, mismo problema legal danés que ya documenta `club-data-mapping` sección 20 — revisar antes de cargar) · FC København (cargado 2024) — 1 candidato directo (`aarsrapport-2023-12-31.md`, ⚠️ posible período parcial ~9 meses, la entidad se constituyó 29/3/2023, verificar) + 7 de la entidad PSE consolidada (⚠️ ver descartados, NO es la entidad correcta sin desmezclar) · FC Midtjylland (cargado 2018/19) — 10 (2013/14-2017/18 y 2019/20-2023/24, el último con cierre 31/7 a verificar) · FC Nordsjælland (cargado 2024) — 11 (2013-2023) · Randers FC (cargado 2022/23) — 10 (2012/13-2021/22) · Silkeborg IF (cargado 2024) — 12 (2012-2023) · SønderjyskE (cargado 2021/22) — 9 (2012/13-2020/21) · Vejle (cargado 2024) — 12 (2012-2023) · Viborg FF (cargado 2023/24) — 12 (2011/12-2022/23)

**CROACIA** (todos con 1 solo ejercicio; formato `financijsko-izvjesce-<año>.md`)
- Dinamo Zagreb (cargado 2024) — 4 (2019-2022) · Gorica (cargado 2025) — 6 (2019-2024) · Hajduk Split (cargado 2024) — 6 (2018,2019,2020,2022,2023,2025 — huecos en 2021 y 2024) · Istra 1961 (cargado 2025) — 5 (2020-2024) · Osijek (cargado 2025) — 6 (2018,2019,2020,2022,2023,2024 — hueco en 2021) · Rijeka (cargado 2024) — 8 (2017-2023 y 2025) · Slaven Belupo (cargado 2025) — 1 (`financijsko-izvjesce-2024.md`)

**ARGENTINA**
- Los Andes (losandes-ar, cargado ejercicios 104 y 105 = 2019/20 y 2020/21) — 11: `balance-ejercicio-93-2008-09.md` … `-103-2018-19.md` (serie completa hacia atrás, confirmado explícito en la cabecera del data.js)
- Argentinos Juniors (cargado 2014/15-2018/19) — hasta 4 ejercicios potenciales dentro de `resumen-organo-fiscalizacion-2022.md` (que a pesar del nombre trae comparativos 2019-2023) — ⚠️ el Superávit 2019 de ESTE documento no coincide con el ya cargado (probablemente cifras reexpresadas por inflación, mismo bug ya documentado en la cabecera de `argentinosjuniors-data.js`) — resolver esa reconciliación ANTES de cargar, no asumir cuál versión es la correcta.
- Instituto ACC (cargado 2023/24, solo balance) — presupuesto 2025: `presupuesto-2025.md` + `presupuesto-2025-premisas.md`

**MÉXICO**
- Club América (cargado 2025) — 1: `reporte-financiero-ollamani-2024-auditado.md` (documento propio y auditado del ejercicio 2024, no usado todavía)

**BRASIL** (ejercicios adicionales de clubes ya cargados)
- Fluminense (cargado solo 2024-2025) — 14: `demonstracoes-financeiras-2010.md` … `-2023.md`
- Internacional (cargado solo 2024) — 17: `relatorio-anual-2007.md` … `-2023.md`
- Ceará (cargado 2024-2025) — 5: `demonstracoes-contabeis-2019-e-2018.md`, `-2020.md`, `-2021.md`, `-2022.md`, `-2023.md` (⚠️ además, 2024 se cargó desde la columna comparativa de `-2025.md`; existe `demonstracoes-contabeis-2024.md` como documento PROPIO sin usar — evaluar si conviene re-cargar 2024 desde su propio documento, regla de "nunca usar comparativa cuando hay documento propio")
- Palmeiras (cargado 2024-2025) — 6: `demonstracoes-financeiras-2017-2018.md` … `-2022-2023.md`
- Corinthians (cargado 2024-2025) — 6: `balanco-2016-2017.md`, `demonstracoes-financeiras-2018-2019.md` … `-2022-2023.md`
- São Paulo (cargado 2023-2024) — 3: `demonstracoes-financeiras-2018-2019.md`, `-2020-2021.md`, `-2021-2022.md`
- Santos (cargado 2024-2025) — 1: `demonstracoes-financeiras-2020-2021.md`
- Sport Recife (cargado solo 2025) — 5: `demonstracoes-financeiras-2020-e-2019.md` … `-2024-e-2023.md` (confirmado explícito en la cabecera del data.js)
- Botafogo-SP (cargado solo 2024) — 2: `demonstracoes-financeiras-2019-2020.md`, `demonstracoes-contabeis-2022-2023.md` (confirmado explícito en la cabecera)
- Chapecoense (cargado 2017 y 2021) — 1: `demonstracoes-financeiras-2016.md`
- Atlético Goianiense (cargado solo 2025) — la columna 2024 (déficit R$45.111 mil) ya está DENTRO del archivo ya transcripto `demonstracoes-financeiras-2024-2025.md` — no requiere transcripción nueva, solo cargar esa columna como ejercicio propio.
- Bahia (cargado solo SAF 2024-2025) — 3 con matiz: `demonstracoes-financeiras-associacao-2020-2021.md`, `-2021-2022.md`, `-2022-2023.md` — la SAF se constituyó apenas el 27/2/2023, así que para 2020-2022 la associação SÍ era la entidad futbolística real (no es "entidad equivocada" sin más, a diferencia de Botafogo/Vasco — ver sección 3). Evaluar caso por caso el corte exacto de 2023.

**COLOMBIA**
- Millonarios (cargado solo 2025) — 2: `informe-gestion-2023.md`, `informe-gestion-2024.md` (confirmado con cifras reales de Patrimonio/Ingresos, no son informes narrativos vacíos)

**JAPÓN** — estructura distinta (un solo documento anual cubre los 60 clubes de J1/J2/J3 a la vez)
- Los 10 clubes ya cargados (todos con solo el ejercicio 2025) tienen 2023 y 2024 disponibles como columnas comparativas DENTRO del mismo `club_doc-2025.md` ya transcripto — sin transcribir nada nuevo, se pueden cargar 2 ejercicios más de los 10 clubes de una.
- Hay 13 archivos más (`club_doc-2012.md` … `club_doc-2024.md`), cada uno con otra ventana de 3 años solapados, potencialmente dando TODOS los años 2010-2024 de los mismos 10 clubes.
- **TO-DO EXPLÍCITO, no resuelto en esta sesión**: abrir `Clubes/Japón/_J.League (todos los clubes)/club_doc-2025.md` y extraer el listado completo de los ~60 clubes (texto en japonés, tablas grandes) para identificar cuáles de los ~50 NO cargados todavía son candidatos a CLUB NUEVO. Nadie llegó a hacer esto por el volumen de texto a procesar — es la tarea más grande sin cerrar de todo este inventario del lado de Asia.

### 2.2 — Club nuevo en un país YA CARGADO (con `.md` ya listo)

- **Colombia — Deportes Tolima**: carpeta completa (`certificacion-ef-2025.md`, `dictamen-revisor-fiscal-2025.md`, `estados-financieros-2025.md`), mismo formato que los 10 clubes colombianos ya cargados, listo para onboarding directo.
- **Bélgica — OH Leuven**: 9 años (2017/18-2024/25, con cambio de cierre de 31/12 a 30/6 en el medio).
- **Bélgica — RAAL La Louvière**: 8 años (2018-2025, cierre 30/6).
- **Dinamarca — OB**: 8 años (2014-2021, calendario).
- **Croacia — Vukovar 1991**: 2 archivos (2025).
- **Chile — Colo-Colo, Universidad Católica, Universidad de Chile** (clubes YA cargados, pero esto es tan grande que tiene su propia entrada):
  - Colo-Colo: cargados SOLO 2022, 2023, 2024. **Sin cargar: 2009-2021 + 2025 (14 años)**, todos `estados-financieros-<año>.md` ya transcriptos.
  - Universidad Católica (Cruzados): mismo patrón — cargados SOLO 2022-2024. **Sin cargar: 2009-2021 + 2025 (14 años)** + `memoria-anual-2023.md` (narrativa, probablemente sin aporte nuevo).
  - Universidad de Chile (Azul Azul): cargados SOLO 2022-2024. **Sin cargar: 2010-2021 + 2025 (13 años, no hay 2009)** + `memoria-anual-2011.md` (narrativa).
  - Verificado con `grep` directo de las claves de año en cada `data/<club>-data.js` — no es un resumen del índice, es así de literal. **Es el hallazgo más grande de todo este inventario.**

### 2.3 — País 100% nuevo, con `.md` ya existente y de calidad razonable

- **Austria — Rapid Wien**: 13 archivos, serie 2010/11-2024/25 casi completa.
- **Escocia — Celtic**: 1 archivo (`celtic-plc-group-accounts-2024-25.md`).
- **Italia — Cremonese**: 1 archivo (2024). **Hellas Verona**: 2 archivos (2023, consolidado + individual).
- **Francia — Olympique Lyonnais**: 9 archivos, 2007/08-2024/25 con huecos, formato DNCG regulatorio.
- **Portugal — Tondela**: 1 archivo (2021, verificado con contenido real de balance).
- **Rusia — Dynamo Makhachkala**: 2 archivos utilizables (2024, 2025 — dictamen + estados financieros, entidad АНО/organización no comercial).
- **Ucrania — Kolos Kovalivka**: 1 archivo (2025, ⚠️ capa de texto original corrupta/mojibake, ver `Admin/CONVENCIONES.md`/gotcha de CLAUDE.md sobre mojibake cirílico, ya transcripto por OCR). **Obolon**: 1 archivo (2025, ⚠️ mismo tipo de OCR sobre escaneo).
- **Turquía — İstanbul Başakşehir**: 1 archivo (2019 completo, con dictamen + balance + P&L). **Gaziantep FK**: 2 archivos utilizables pero ⚠️ AMBOS del mismo período PARCIAL (01.06.2023-31.12.2023, 7 meses, no un ejercicio anual). **Kocaelispor**: 1 archivo ⚠️ bundlea año completo 2019 + parcial ene-jul 2020, y es un "Dernek"/asociación, no una SAD.
- **Corea del Sur** (país entero sin cargar, 0 en el índice): **FC Seoul** — 10 ejercicios (fy2016-fy2025). **Jeju SK** — 10 ejercicios (fy2016-fy2025). **Daejeon Hana Citizen** — 4 ejercicios (fy2016-fy2019). **Jeonbuk Hyundai Motors** — 2 ejercicios (fy2024-fy2025). ⚠️ SALVEDAD para los 4: la portada de cada PDF viene con OCR corrupto (logo/imagen en la página 1), pero el CUERPO del informe (balance, estado de resultados) es texto nativo legible — confirmado con grep, pero una sesión futura debería re-verificar más a fondo antes de cargar números, no asumir que todo el documento es limpio solo porque el cuerpo lo es.
- **China — Guangzhou Evergrande** (país entero sin cargar): 5 ejercicios anuales completos (2015-2019, con 2018 en versión "corregido"), misma salvedad de portada OCR corrupta que Corea, cuerpo confirmado legible con cifras reales.

### 2.4 — Variantes/complementos del mismo ejercicio YA cargado (no son ejercicio nuevo, prioridad baja)

España (Athletic/Atlético/Celta/Alavés/Barcelona/Madrid/Sevilla/Valencia/Villarreal) y Alemania
(RB Leipzig 2023/24) tienen ~21 archivos que son el MISMO ejercicio ya cargado pero con documentación
más completa (cuentas consolidadas + individuales, informe de auditoría separado, memoria de gestión)
de la que hoy solo se usó una porción (ej. Real Madrid 2024/25 solo cargó `-cuenta-resultados.md`,
pero también existen `informe-economico-2024-2025.md`, `informe-gestion-consolidado-2024-2025.md`,
`registro-cuentas-anuales-club-y-ee-ff-2024-2025.md` con posible detalle de balance/deuda sin
incorporar). Prioridad baja: no dan un ejercicio nuevo, pero podrían completar `grossDebt`/`cash`/más
desglose de un ejercicio que ya está cargado. No se detalla archivo por archivo acá — quien quiera
profundizar un club puntual, revisar su carpeta comparando contra el `sourceId` ya usado en su
`data/<club>-data.js`.

---

## Sección 3 — Descartados (NO usar como candidatos, con motivo verificado)

**Mala calidad de OCR** (`Admin/TODO.md` punto 60, sin cambios):
`Clubes/Brasil/Amazonas/balancos-2022-2023.md` · `Clubes/Noruega/KFUM/aarsregnskap-osloKFUM-2018.md`
y `-2019.md` · `Clubes/Turquía/Gaziantep FK/gaziantepfk-nakit-akis-tablosu.md` y `-gelir-tablosu.md`
· `Clubes/Rusia/Dynamo Makhachkala/2025-poyasneniya.md` · `Clubes/Portugal/Estrela da Amadora/
relatorio-contas-2022-23.md`, `-2023-24.md`, `-2021-22.md`.

**Solo "Memoria"/narrativa, sin un Estado de Recursos y Gastos ni Situación Patrimonial real**
(mismo patrón que Temperley/Belgrano, confirmados en sesiones anteriores de esta misma fecha):
`Clubes/Argentina/Temperley/*.md` (las 3 memorias) · `Clubes/Argentina/Belgrano/memoria-anual-2020.md`
y `-2019.md` · `Clubes/Argentina/Ferro Carril Oeste/memoria-ejercicio-120-2023-24.md` ·
`Clubes/Argentina/Gimnasia y Esgrima LP/memoria-2017-2018.md` y `memoria-2020-2021.md` ·
`Clubes/Argentina/Unión/memoria-ejercicio-114-2019-2020.md` + `informe-comision-revisora-cuentas-
114.md` · `Clubes/Argentina/San Lorenzo/informe-de-gestion-2012-2019.md` ·
`Clubes/Argentina/Racing/informegestion*.md` (2010,2011,2016,2017,2021) e `informe-de-gestion-
2025-primer-semestre.md`, `-segundo-semestre-de-2025.md`, `-primer-semestre-de-2026.md` (todos
informes de gestión deportiva/institucional, sin cifras contables) · `Clubes/Argentina/All Boys/
asamblea-general-ordinaria-2024-presentacion.md` (OCR garbled, sospechoso, sin confirmar si es
recuperable con más esfuerzo).

**Período parcial, no un ejercicio anual completo**:
`Clubes/Chile/Palestino/estados-financieros-2018.md` (intermedio de 6 meses) ·
`Clubes/España/CA Osasuna/auditoria_intermedios2022.md` ·
`Clubes/China/Guangzhou Evergrande/semi-annual-2020.md` ·
`Clubes/Ecuador/Deportivo Cuenca/informe-presidencia-movimientos-bancarios-ene-jun-2026.md` y
`informe-sri-iess-ene-jun-2026.md` (además, ninguno de los 2 es un estado financiero, son informes
acotados a bancos/impuestos) · `Clubes/Turquía/Gaziantep FK/gaziantepfk-finansal-durum-tablosu.md`
y `-ozsermaye-degisim-tablosu.md` (7 meses, ver nota en sección 2.3 — quedaron LISTADOS como
candidatos ahí a pesar de ser parciales, decisión pendiente de Guido sobre si vale la pena un
ejercicio de 7 meses etiquetado como tal, o directamente descartarlos).

**Entidad equivocada** (social/civil/holding en vez de la sociedad anónima deportiva que compite,
mismo patrón en varios países — antes de cargar cualquier club nuevo, confirmar SIEMPRE qué entidad
legal firma el documento):
`Clubes/Ecuador/LDU Quito/*.md` (los 3 archivos, incluido el que no tiene el prefijo `CUIDADO-`,
confirmado con `diff` que es el mismo documento) · `Clubes/Brasil/Botafogo/demonstracoes-financeiras-
associacao-2023.md` (associação, no la SAF que ya compite desde 2022) · `Clubes/Brasil/Vasco da Gama/
dre-balanco-patrimonial-2024.md` y `demonstracoes-financeiras-associacao-crvg-2022.md` (CRVG social,
no la SAF) · `Clubes/España/Real Betis/documento-sin-identificar-cuentas2021-2022-origen.md`
(Fundación Real Betis Balompié, no la S.A.D.) · `Clubes/Dinamarca/FC København/aarsrapport-2014-12-
31-PSE-consolidado.md` … `-2020-12-31-PSE-consolidado.md` (7 archivos, PARKEN Sport & Entertainment
A/S consolidada — mezcla estadio/retail/fútbol femenino, no la entidad futbolística pura) ·
`Clubes/Rusia/Akhmat Grozny/2025-poyasneniya.md` (NO es del club: es una plantilla oficial rusa en
blanco, documento de ejemplo del regulador, verificado abriendo el archivo).

**Sociedad recién constituida sin actividad real ese ejercicio**:
`Clubes/Brasil/Coritiba/` — el ejercicio 2022 de la SAF (constituida 3/2/2022, operacional recién
desde 1/7/2023) es una sociedad sin actividad, Prejuízo nominal sin cifra real que cargar.

**Versión descartada por el propio club** (existe una versión final/correcta en la misma carpeta,
usar ESA, no esta):
`Clubes/España/Sevilla FC/cuentas-anuales-2022-2023-borrador-rechazado.md` (usar
`cuentas-anuales-2022-2023.md`, la versión final aprobada, ya listada en sección 2.1) ·
`Clubes/Alemania/RB Leipzig/jahresabschluss-2018-stub.md` (la propia cabecera del data.js lo marca
"stub incompleto, NO USAR" — usar el resto de la serie, ya listada en sección 2.1).

**Sin dictamen de auditor, export crudo de software contable** (calidad cuestionable, ya excluido
explícitamente para los mismos años de la SAF en la cabecera de `fortaleza-br-data.js` — aplicar
mismo criterio salvo que no exista alternativa mejor):
`Clubes/Brasil/Fortaleza/balancete-anual-associacao-2018.md` … `-2025.md` (8 archivos) y
`balancete-anual-saf-2024.md`/`-2025.md` (2 archivos).

**Otro deporte, no fútbol** (Inglaterra tiene carpetas de clubes de F1/rugby/cricket con `.md` ya
transcripto — el sitio es de clubes de fútbol, confirmar con Guido antes de sumar cualquiera de
estos si en algún momento se evalúa expandir el alcance):
Aston Martin F1, McLaren Racing, Mercedes F1, Williams Racing, Red Bull Racing (Fórmula 1) ·
Bath Rugby, Harlequins, Leicester Tigers, Northampton Saints (rugby) · Lancashire CCC, Surrey CCC,
Warwickshire CCC, Yorkshire CCC (cricket).

**Documentos agregados de liga completa, no de un club individual** (material de referencia, no
candidatos a onboarding de club):
`Clubes/Alemania/_DFL-Finanzkennzahlen/*.md` (7) · `Clubes/Bélgica/_Deloitte-ProLeague-Report/*.md`
(5) · `Clubes/Austria/_Bundesliga-Finanzkennzahlen/*.md` (8) · `Clubes/Francia/_DNCG-Agregado-Liga/
*.md` (49).

---

## Sección 4 — Preguntas abiertas sin resolver en este inventario (no son dead-ends, son to-do de una sesión futura)

- **Japón**: extraer del `.md` de la J.League (texto en japonés) la lista completa de los ~60 clubes
  de J1/J2/J3 para identificar candidatos a club nuevo — ver sección 2.1.
- **Argentinos Juniors**: reconciliar por qué `resumen-organo-fiscalizacion-2022.md` da un Superávit
  2019 distinto al ya cargado (¿cifras reexpresadas por inflación de años distintos?) antes de cargar
  los hasta 4 ejercicios nuevos que ese documento podría dar.
- **Bahia**: decidir el corte exacto de cuándo la associação deja de ser la entidad futbolística real
  y pasa a serlo la SAF (constituida 27/2/2023) — probablemente 2020-2022 sí son candidatos legítimos
  y 2023 requiere mirar el documento con cuidado.
- **Ceará 2024**: evaluar si conviene re-cargar el ejercicio 2024 desde su propio documento
  (`demonstracoes-contabeis-2024.md`) en vez de la columna comparativa del documento de 2025 —
  viola en teoría la regla de "nunca usar comparativa cuando hay documento propio disponible"
  (`club-data-mapping` sección 6, punto 5).
- **FC København 2023**: confirmar si `aarsrapport-2023-12-31.md` es un período parcial (~9 meses,
  la entidad se constituyó 29/3/2023) antes de cargarlo como ejercicio completo.
- **Gaziantep FK y Kocaelispor (Turquía)**: decidir con Guido si un ejercicio parcial de 7 meses
  (Gaziantep) o un documento que bundlea 2 períodos distintos (Kocaelispor) amerita cargarse con la
  salvedad explícita, o se descartan igual que Palestino/Osasuna intermedio.
- **Corea del Sur y China**: re-verificar la portada con OCR corrupto de cada documento no bloquea el
  cuerpo (ya confirmado por grep), pero conviene una lectura más profunda antes de mapear números
  reales — ninguno de los 2 países se cargó todavía, así que el riesgo es bajo (no hay nada publicado
  que corregir después).

---

## Cómo mantener este archivo

Es una FOTO puntual (2026-09-25). A medida que se onboardee algo de acá, borrar esa línea (no
tacharla ni marcarla "hecho" — mismo criterio que `Admin/TODO.md`). Si una sesión futura hace un
barrido nuevo y encuentra que algo cambió (un PDF nuevo llegó, una entrada de acá resultó ser otro
dead-end no listado), actualizar en el momento, no dejarlo para después. Si este archivo se vacía
del todo algún día, borrarlo (o archivarlo en `Admin/Archive/` si tiene valor histórico) en vez de
dejarlo como un README vacío.
