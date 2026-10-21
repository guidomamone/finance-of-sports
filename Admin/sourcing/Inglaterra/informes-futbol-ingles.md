# Informes agregados del fútbol inglés y de otras ligas (to-do 332)

Chequeo 2026-10-20; segunda vuelta el mismo día. Los tres informes ingleses están bajados y transcriptos con Mistral (aprobado por Guido; US$ 1,65 en total), en esta carpeta, junto a su PDF: `deloitte-arff-2026`, `uefa-ecfil-2025`, `ifr-state-of-the-game-2026` (`.pdf` y `.md`). Los PDFs no se trackean; los `.md` quedaron sin ignorar en `.gitignore`: **no se agregan al commit** (la principal decide si los ignora). No se tocó ningún dato cargado ni texto del sitio.

## 1. Los tres informes, uno por uno

### Deloitte, Annual Review of Football Finance 2026 («Defending from the front», 35ª edición, jul-2026)

- **De qué trata:** el estado financiero anual del fútbol inglés (hombres y mujeres) y, en un capítulo, de las cinco grandes ligas europeas. Responde: ¿cuánto ganaron y perdieron los clubes?, ¿qué pesan los sueldos?, ¿cuánta deuda hay?, ¿qué vale subir a la Premier?
- **Qué datos trae:** por club solo en los apéndices (Tablas 1 a 3): Premier (20), Championship (24) y WSL (12), con ingresos, sueldos, resultado operativo, resultado antes de impuestos, patrimonio neto, deuda/caja neta, gasto en instalaciones y asistencia, dos años. League One y League Two: solo total y promedio de la división (confirmado en la transcripción). Por liga europea: ingresos por rubro de las 5 grandes (capítulo «Europe's top leagues»). Fuente declarada: las cuentas de cada club (Companies House o el club) y la EFL; el propio informe avisa que ajusta cifras por comparabilidad y que no las auditó.
- **Años y frecuencia:** anual, cada julio. Cada edición trae 2 temporadas (2024/25 y 2023/24) más proyecciones 2025/26 y 2026/27.
- **Titulares:**
  - Mercado europeo de fútbol: +6%, más de €40 mil millones por primera vez; las 5 grandes son €22 mil millones (54%).
  - Premier: ingresos £6,8bn (+8%); matchday supera £1bn por primera vez; sueldos récord £4,4bn (65% de los ingresos); pérdida antes de impuestos £948m (contra £135m); solo 8 clubes con resultado operativo positivo; deuda neta £3,6bn más £1,7bn por transferencias; £1,3bn de inyecciones de capital en 11 clubes.
  - Championship: ingresos £942m (primera baja desde el covid), sueldos récord £903m, pérdida £355m, deuda neta £1,4bn (65% préstamos del dueño).
  - League One: ingresos £282m (+29%), pérdida promedio £7,2m por club.
  - WSL: ingresos £90m (+39%), pérdida £42m.
  - Capítulo «Championship challenge» con causas y remedios.
- **Uso en Ligas:** (a) link al PDF como «lectura recomendada»; (b) cifra de contexto citada con su fuente (p. ej. «la Premier perdió £948m antes de impuestos en 2024/25»); (c) fuera de Ligas, control cruzado barato de ingresos y sueldos de Premier y Championship contra lo cargado (las diferencias de perímetro y cierre están en las notas de las tablas).

### UEFA, European Club Finance and Investment Landscape 2025 (ECFIL)

- **De qué trata:** el panorama financiero de todos los clubes de primera de Europa (el único informe que cubre todas las primeras divisiones). Responde: ¿cuánto ingresan, gastan, ganan y deben los clubes europeos, y quién invierte en ellos?
- **Qué datos trae:** agregados por rubro (gate, TV, comercial, UEFA, sueldos, no-sueldos, transferencias, financiamiento, resultado, balance, deuda, insolvencias, propiedad) para las 54 primeras divisiones, con el top 20 de ligas y el top 25 de clubes en cada rubro; apéndice con KPI por país y directorio de países y clubes (págs. 73-101). Base: envíos de 725 clubes de FY2024 más estimaciones de los 14 restantes y FY2025 con los que reportaron temprano.
- **Años y frecuencia:** anual (la serie de benchmarking de licencias de UEFA, ahora con este nombre); esta edición mira 2015-2025.
- **Titulares:** ingresos de primeras divisiones que pasan €30bn en 2025; ingresos de UEFA a clubes superan €3bn; en 2024 primer resultado operativo positivo en cinco años; más de la mitad de los clubes con ganancia antes de impuestos por primera vez desde antes de la pandemia, y pérdida conjunta de €1,1bn; los costos no salariales pasan de 30% a 36% de los ingresos entre 2021 y 2025; los cinco mayores costos netos de transferencias son clubes ingleses; deuda en balance +8% en 2024.
- **Uso en Ligas:** cifra de contexto para comparar una liga con el resto de Europa («ingresos de la liga X, puesto N de 54»); link. Poco útil para contrastar un club puntual.

### IFR, State of the Game 2026 (borrador en consulta hasta el 8-dic-2026)

- **De qué trata:** el primer informe del regulador independiente inglés, creado por la Football Governance Act 2025, que supervisa 116 clubes de las 5 divisiones de hombres (Premier a National League). Responde: ¿qué tan sana es la economía del fútbol inglés y dónde están los riesgos sistémicos?
- **Qué datos trae:** agregados por división y por grupo de clubes (big six, con y sin paracaídas), no por club. Pide datos a competiciones y clubes con poderes legales: Premier y EFL 2021/22 a 2025/26 (2025/26 mezcla datos reales y proyectados), National League solo 2025/26. Más encuestas a hinchas y entrevistas con dueños. 245 páginas: ingresos, sueldos, agentes, estadios, rentabilidad, deuda y financiamiento, liquidez, solvencia, casos de crisis, saltos de ingresos entre divisiones, inversores, derechos de TV, deuda por transferencias.
- **Años y frecuencia:** es el primero; la ley lo exige periódico. Final antes del 24-may-2027 (dato de la nota anterior, no re-verificado). Serie histórica desde 1992.
- **Titulares:** ingresos de unos £9bn en 2025/26, más del 80% en la Premier; 94% de los clubes con pérdida; deuda de £4,1bn (2024/25) a £5,1bn proyectada para 2026/27; factoring de transferencias de £55m a £779m; dos tercios de los clubes no sobrevivirían 90 días sin fondos del dueño; más del 60% de los clubes de EFL y National League con pasivos mayores a sus activos; el club con más ingresos de la Premier gana 605 veces lo del que menos en la National League; 17 clubes tendrían pérdida aunque los jugadores jugaran gratis.
- **Uso en Ligas:** cifra de contexto con la etiqueta «borrador» (hasta que salga el final); link. El texto es el insumo más rico para una nota o sección de noticias, porque explica el porqué.
- **Descarga:** `https://sotg.footballregulator.org.uk/api/media/file/IFR%20State%20of%20the%20Game%20Report.pdf` (el mismo path en `www.footballregulator.org.uk` da 404).

## 2. Otros informes parecidos

Marcados con «verificado» los que Sourcing 3 abrió o leyó en el buscador; el resto es lo que dice el resultado de búsqueda y no se abrió.

| Informe | Quién | ¿Público? | Qué cubre |
|---|---|---|---|
| **Deloitte ARFF, ediciones anteriores** | Deloitte | Gratis en su página (URL por edición sin verificar) | Premier y Championship por club, 2 años por edición |
| **Deloitte Football Money League** | Deloitte | Resumen gratis; no se verificó el PDF | Ranking de los 20 clubes con más ingresos del mundo, anual (cita en prensa para 2024/25) |
| **Football Benchmark, «Football Clubs' Valuation: The European Elite»** (antes KPMG) | Football Benchmark (escindida de KPMG) | Hay página de descarga por edición (2018 a 2025); no se verificó si pide registro. PDFs viejos de KPMG sí abiertos en `assets.kpmg.com` | Valor de empresa (EV) de los 32 clubes europeos más importantes; 2025 es la 10ª edición, Real Madrid primero con €6,3bn. Es valuación, no balance |
| **UEFA Club Licensing Benchmarking Report** | UEFA | Gratis | Es el antecesor del ECFIL: la UEFA cambió el nombre; el ECFIL de arriba es la edición vigente |
| **DFL Wirtschaftsreport 2024/25** (Alemania) | DFL | Gratis, PDFs en `report.bundesliga.de/2425/` (verificado en el buscador) | 1ª y 2ª Bundesliga (36 clubes), ingresos €6,33bn, ganancia operativa €271,5m, 13 clubes de primera con ganancia. Agregado por liga; no hay club por club en lo visto |
| **LaLiga, Informe económico-financiero 2024/25** (España) | LaLiga | Gratis, PDF en `assets.laliga.com` (no abierto) | Ingresos normalizados €5.464m (+8,1%) de los clubes de LaLiga; presentado el 18-mar-2026. Anual, sale en marzo. Agregado |
| **Calcio e Finanza, análisis de bilancios de Serie A** (Italia) | Medio especializado | Gratis la nota; no es informe oficial | Serie A 2024/25: ingresos €4.038m, pérdida unos €349m, deuda bruta €4,89bn. Club por club en notas. La FIGC publica su «ReportCalcio» (no apareció en la búsqueda) |
| **DNCG / LFP** (Francia) | DNCG y LFP | No se halló un informe anual público de la DNCG; la DNCG publica comunicados de sus decisiones | Control de cuentas; Francia ya tiene bilans por club en `paises/Francia.md` |
| **EY Brasil, Relatório financeiro dos clubes 2025** | EY | Gratis, PDF en `ey.com` (en el buscador, no abierto) | 20 clubes de Série A: ingresos R$ 14,9bn (+33%), deuda R$ 15,3bn, deuda neta vs. ingresos por club. Anual, sale en julio. Con club por club |
| **Liga Portugal** | Liga de Clubes | Solo cuentas de la propia liga; no se halló informe agregado de clubes | Sin informe utilizable |
| **SPFL** (Escocia) | SPFL | Cuentas de la liga y un estudio económico de 2020 | Sin informe agregado de clubes. Capology tiene datos escritos por club (terceros) |
| **AFA, Informe de Clubes 2025** (Argentina) | AFA | Público (enero 2026) | Institucionalidad y socios, no finanzas. Para deuda hay rankings del BCRA en prensa |
| **Swiss Ramble** (Kieran O'Connor) y **Price of Football** (Kieran Maguire) | Autores independientes | Mayormente de pago; la Substack pasó a modelo pago | Análisis club por club desde las cuentas de Companies House; sirve para contrastar, no es fuente primaria. Se puede citar, no linkear como fuente |
| Premier League, EFL, FA | — | No publican un informe financiero agregado propio | Los números de la EFL llegan vía Deloitte; la Premier publica reglas (PSR), no un consolidado |

## 3. Qué falta verificar antes de usar cada uno

- Football Benchmark, LaLiga, EY y DFL: abrir el PDF y confirmar que baja sin registro antes de linkear.
- ReportCalcio (FIGC), Liga Portugal y los demás países de la pestaña Ligas: el 336 lo hace liga por liga.
- Ediciones viejas de Deloitte: probar la URL de cada año.

## 4. Propuesta: cómo podría verse una sección de informes en Ligas

Es una idea, no un diseño ni código.

- **Dónde:** al final de la ficha de cada liga, un bloque «Informes de esta liga», y una vista aparte «Informes» con todos.
- **Qué lleva cada informe, en una tarjeta:** título, quién lo publica, año, qué cubre (liga, nivel de detalle: por club o agregado), una frase de qué responde, y el link al PDF original. Nada de PDFs alojados en el sitio: solo link a la fuente.
- **Una cifra de contexto por tarjeta**, con la fuente al lado y el año: «Premier League, 2024/25: pérdida antes de impuestos de £948m (Deloitte)». Si la cifra es de un borrador o de una proyección, lo dice (el IFR es borrador hasta mayo de 2027).
- **Dos niveles:** informes que cubren varias ligas (UEFA ECFIL, Deloitte, Football Benchmark) arriba como «Europa»; los de una sola liga, dentro de ella.
- **Lo que no hace:** no reemplaza ni mezcla con los datos de clubes cargados, no resume con opinión propia y no cita informes de pago como fuente.
- **Quién lo mantiene:** una lista chica en un archivo de datos (una línea por informe y edición), revisada cuando sale una edición nueva (Deloitte en julio, LaLiga en marzo, EY en julio, UEFA anual, DFL en enero).
- **Variante «noticias»:** si Guido prefiere noticias, sería la misma tarjeta con fecha y un titular, ordenada por fecha de publicación. Cuesta más mantener porque exige leer cada edición; la lista de informes es más barata.
