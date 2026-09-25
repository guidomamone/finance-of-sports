# Dudas por club

Este archivo es para anotar preguntas puntuales que quedaron SIN respuesta clara después de leer los
documentos oficiales de un club — cosas que valdría la pena preguntarle directo al club (prensa,
área de socios, o quien corresponda) en vez de asumir o inventar un criterio. Complementa a
`fuentes/README.md` (que es sobre DÓNDE está cada documento) y a los comentarios de cada
`data/<club>-data.js` (que son sobre CÓMO se categorizó cada línea puntual) — acá van específicamente
las preguntas abiertas, para no perderlas sueltas en el medio de un comentario de código.

Cómo se agrega algo acá: una sección por club, una línea por pregunta, con el formato:

- **[tema de la pregunta]**: [la pregunta concreta, con la cita/página/documento exacto de donde
  salió la duda] — a quién preguntarle: [contacto, si ya se investigó uno en `fuentes/README.md`].

Antes de agregar una pregunta acá, primero intentar resolverla con lo que ya está disponible (el
propio documento, otro ejercicio del mismo club, o los criterios ya documentados en
`.claude/skills/club-data-mapping/SKILL.md`) — esto es solo para lo que de verdad no se puede
inferir con confianza de la fuente.

**Criterio (agregado Versión 83, a pedido de Guido)**: esto también incluye buscar en fuentes
públicas fácilmente verificables (Wikipedia, la nota de prensa del propio club, un buscador) ANTES
de anotar una pregunta acá — ej. "¿desde cuándo preside fulano?" casi siempre se resuelve en una
búsqueda, no hace falta reservarla para reach-out directo al club. Esta lista es para lo que ni la
fuente ni una búsqueda rápida resuelven (categorización ambigua de un rubro específico del balance,
un criterio interno del club que no está publicado en ningún lado). Dicho esto, el costo de
sobre-anotar acá es bajo — Guido prefiere ver una pregunta de más y descartarla él mismo, a que se
pierda una duda real por autocensura. Ante la duda, anotarla igual.

---

## Boca Juniors

*(sin dudas pendientes por ahora — la pregunta de esta sesión, "por qué no hay Deuda en el
Ejercicio 2027", se resolvió leyendo el propio documento: un Presupuesto no incluye Estado de
Situación Patrimonial, solo Estado de Recursos y Gastos + Presupuesto Financiero, así que
estructuralmente no puede tener grossDebt/cash — no es que falte cargar un dato, es que el
documento no lo tiene. No hace falta preguntarle esto al club.)*

## Racing Club

*(sin dudas pendientes por ahora — la pregunta de esta sesión, "por qué la deuda pasa de 32M a 0",
también se resolvió leyendo el propio archivo: el Ejercicio 2025/2026 es un Presupuesto, mismo
motivo que Boca arriba.)*

## Vélez Sarsfield

*(la pregunta de "desde cuándo preside Berlanga" se resolvió con una búsqueda simple — nota oficial
del club del 12/11/2023 anunciando su asunción — sin necesidad de reach-out. Ver `data/clubs.js`,
comentario de `gestionesByClub.velez`. No es algo para preguntarle al club.)*

- **"Uso del estadio" ($6.442,5 M, Ejercicio 2025)**: se asumió que es alquiler del José Amalfitani
  para recitales/eventos no deportivos (hay una línea "Recitales a devengar" en otra nota del
  balance que lo sugiere), categorizado como `other_income` por no tener una categoría propia. Vale
  confirmar con el club si esto es 100% no-fútbol o si incluye algo de recaudación de entradas
  propia mezclada — cambiaría si esa plata debería ir a `matchday_competition` en cambio.
  ACTUALIZADO 2026-09-22 (Versión 189): la línea pasó a la categoría nueva `stadium_other` y ahora
  se muestra dentro de la fila "Estadio", junto con la recaudación de partidos. **La pregunta al
  club sigue abierta igual**, pero ahora importa menos para el visitante: las dos categorías caen
  en la misma fila, así que si la respuesta fuera "incluye recaudación", el número visible no se
  movería — solo cambiaría qué renglón del acordeón la muestra.

## Rosario Central

- **Dos cotizaciones de USD en el mismo balance (Ejercicio 2022/2023)**: el Anexo IV (moneda
  extranjera) declara $255,00 para USD del lado del Activo (Caja y bancos) y $268,00 del lado del
  Pasivo (Acreedores varios fútbol) — mismo ejercicio, mismo cierre, dos cotizaciones distintas
  (probablemente comprador/vendedor). Se usó $255,00 (coherente con `cash`) como fx único del sitio,
  pero es una aproximación. Mismo patrón se repitió en Estudiantes LP 2022 ($125,03/$125,23) y San
  Lorenzo 2013 ($5,355/$5,388) — parece ser una práctica contable habitual (no un error), pero vale
  confirmar con algún club si hay un criterio único preferible para reportar (ej. el promedio, o
  siempre "comprador").

## Estudiantes de La Plata

- **Atribución de gestión, Ejercicio 2024 (cierre 30/6/2024)**: el balance está firmado por Juan
  Sebastián Verón como Presidente (proclamado el 6/4/2024, ~3 meses antes del cierre), pero Martín
  Gorostegui presidió la gran mayoría de los meses de ese mismo ejercicio (jul-2023 a abr-2024). Se
  cargó `gestionId:'veron'` (criterio de "quien firma/está a cargo al cierre", igual que
  Berlanga/Belloso), pero vale confirmar con Guido si prefiere el criterio de "quien presidió más
  meses" para casos como este, que daría Gorostegui en cambio.

## Argentinos Juniors

- **Mes exacto de la primera asunción de Cristian Malaspina en 2015**: confirmado que es presidente
  "desde 2015" (reelecto dic-2019, dic-2023), pero no se encontró el mes exacto de esa primera
  asunción. Si fue DESPUÉS del cierre del Ejercicio 2015 (30/6/2015), ese ejercicio en particular no
  debería caer bajo su gestión (se cargó con `gestionId:null` por las dudas, ver
  `data/argentinosjuniors-data.js`). A quién preguntarle: prensa institucional del club o
  argentinosjuniors.com.ar/institucional.
- **El archivo "balance-2018-2019.pdf" del club es en realidad la Memoria narrativa completa**, sin
  una sola cifra de balance — el nombre del archivo no es fiable como indicador de contenido (mismo
  hallazgo que ya tenía river-data.js). Por eso el Ejercicio 2019 sigue viniendo de la presentación
  de asamblea (ver duda de abajo), no de un balance auditado propio — si el club publica en el
  futuro el balance completo con Anexos de ese ejercicio, se podría re-cargar con detalle real.
- **Ejercicio 2019 sin balance auditado propio para confirmar si sus cifras son nominales**: se
  descubrió que la "presentación de asamblea" usada para 2015-2019 está en pesos AJUSTADOS POR
  INFLACIÓN (no nominales) — 2015-2018 se reemplazaron con los 3 balances auditados reales
  (encontrado vía OCR), pero 2019 no tiene un balance real descargado, así que sigue viniendo de esa
  misma presentación. Al ser el año más reciente de la restatement, sus cifras probablemente ya sean
  ~nominales (el ajuste por inflación restated hacia atrás no cambia el año base), pero no hay forma
  de confirmarlo con certeza sin el documento primario. Si el club publica el balance auditado real
  del Ejercicio 2018/2019, reemplazar y confirmar/corregir esta cifra.

## San Lorenzo de Almagro

- **Atribución de gestión, Ejercicio 2023/2024 (cierre 30/6/2024)**: el ejercicio quedó dividido
  casi exactamente a la mitad entre 2 presidentes — Marcelo Tinelli (jul-2023 a 26/12/2023) y
  Marcelo Moretti (26/12/2023 a jun-2024, electo 17/12/2023). Se cargó `gestionId:'moretti'`
  (criterio de "quien está a cargo al cierre", igual que Berlanga/Belloso/Verón), pero por lo pareja
  que fue la división de meses (~6 vs. ~6) es el caso más ambiguo de todos los que se cargaron con
  este criterio — vale confirmar con Guido si prefiere el criterio de "quien presidió más meses"
  para casos tan parejos como este (mismo tipo de duda que Estudiantes LP 2024, Gorostegui/Verón).
- **Presupuesto en caja, separado en Ordinario/Extraordinario, en vez de un presupuesto económico
  devengado**: a diferencia de los balances auditados del propio club (que sí devengan, Estado de
  Recursos y Gastos normal), el Presupuesto 2023-2024 (`Clubes/Argentina/San Lorenzo/
  presupuesto-2023-2024.md`) es un presupuesto de CAJA mensual, con una sección "Extraordinaria"
  separada para financiamiento (aportes bancarios/dirigenciales y su cancelación), obras de capital,
  compra/venta de jugadores en términos de desembolso de caja, y cancelación de deuda vieja — nada
  de eso se cargó al sitio (ver `.claude/skills/club-data-mapping/SKILL.md` sección 16), solo la
  sección Ordinaria. Vale preguntarle al club: ¿por qué presupuestan en base caja separando
  ordinario/extraordinario en vez de un presupuesto económico devengado, como si sus propios
  balances auditados sí lo hacen? ¿Es una decisión de gestión (foco en liquidez/caja para
  planificación) o simplemente el formato que usa el área de Presupuesto y Finanzas del club?
- **Tipo de cambio del Ejercicio 2011, sin confirmar con la misma precisión que el resto**: el
  balance 2011-12 (Deloitte) no separa claramente una cotización de USD para su columna comparativa
  2011 en el Anexo de moneda extranjera — se usó $4,11, una aproximación externa del dólar oficial
  de mediados de 2011, documentada como MENOS confiable que el resto de los tipos de cambio de este
  club (todos los demás salen de un Anexo propio del balance correspondiente). No cambia ningún
  número en pesos (ARS), solo el toggle a USD de ese año puntual.

## Unión (Santa Fe)

- **Anexo IV (Gastos) del Ejercicio 119 no se pudo leer con columnas de departamento confiables**:
  el OCR mezcló las columnas (Administración/Partidos y estadio/Fútbol/Subcomisiones) en la
  extracción. Se cargaron con confianza solo "Sueldos y Jornales de Fútbol" (checksum exacto) y las
  2 líneas de Amortizaciones (checksum exacto contra el total del estado principal); el resto de
  cada categoría se cargó a nivel agregado en vez de adivinar el departamento de cada fila. Si en el
  futuro se consigue una copia de mejor calidad del PDF (no escaneada, o un escaneo más nítido), vale
  re-extraer con el detalle completo.
- **Anexo V (moneda extranjera) del Ejercicio 119 no se pudo leer en absoluto** (ni rotado, ni a
  600dpi) — se usó el dólar oficial vendedor BNA de cierre (30/6/2025) en su lugar, investigado
  externamente en vez de leído del propio documento.
- **Ningún archivo de los Ejercicios 116/117/118 (2021-22 a 2023-24) incluye una página de Estado de
  Situación Patrimonial completa** en el escaneo descargado (se buscó explícitamente "TOTAL DEL
  ACTIVO"/"TOTAL ACTIVO" en el texto completo de los 3 archivos, sin encontrarlo — puede ser que el
  escaneo de Wayback Machine haya recortado esa página, o que estas versiones "Rectificativas" solo
  incluyan los estados que efectivamente rectifican). Por eso Deuda Neta/Caja quedaron sin cargar
  para esos 3 ejercicios (si sí están para 2025). Vale pedirle al club (o reintentar directo en
  clubaunion.com.ar cuando el sitio esté online, ver `fuentes/README.md`) una copia completa que
  incluya el Balance General de esos 3 años.

## Independiente (Ejercicio N°122, 2025-26, sesión 2026-09-23)

- **Ejercicio N°121 (2024-25) NO cargado a propósito** (decisión de Guido, confirmada antes de
  arrancar esta sesión): sus cifras solo existen como columna comparativa DENTRO del documento del
  122 (reexpresada a la fecha de cierre del 122, no a la suya propia) y como cifras de prensa —
  ninguna de las 2 es el documento propio del 121, que todavía no está publicado por el club (ver
  to-do 59 en `Admin/TODO.md`, pedírselo directo). Si en algún momento aparece el PDF propio del
  121, cargarlo como ejercicio real de pleno derecho, no como lo que ya tenemos acá.
- **Qué torneo(s) cubre exactamente "Otras Competiciones" del Anexo D (Fútbol Profesional)**: el
  Estado de Recursos y Gastos de este ejercicio separa "RECAUDACIONES PARTIDOS" bajo el encabezado
  explícito "PARTIDOS COPA ARGENTINA, COPA SUPERLIGA Y COPA SUDAMERICANA" (con el desglose fino de
  entradas/TV/publicidad/plateas) de una sección aparte "OTRAS COMPETICIONES" que da solo un
  ingreso/gasto lump (2.792,306789 M / 20,781644 M de ingresos/gastos, 2026) sin desglosar por
  naturaleza. No quedó claro si "Otras Competiciones" es el torneo doméstico (Liga Profesional,
  que por volumen de partidos debería ser la mayor fuente de recaudación, no una fracción chica) o
  algo más acotado (amistosos, Trofeo de Campeones). Se cargó a `matchday_competition` por default
  conservador (mismo criterio que "recaudación de entradas sin separar premios"), pero valdría
  confirmar con el club/auditor qué agrupa exactamente esa fila — a quién preguntarle:
  socios@clubaindependiente.com.ar o el contador que firma el balance (Dr. Walter Hugo Rivero).
- **Por qué "Estadio" y "Parque Santo Domingo" no tienen línea de INGRESO en el Anexo V este año**
  (ambos ejercicios, 2026 y 2025, muestran "-"), cuando el 120° Ejercicio (2023-24) sí tenía una
  línea real "Estadio (concesiones, no recaudación de partidos)" con plata (72,525021 M). Hipótesis
  no confirmada en el comentario de `data/independiente-data.js`: esa recaudación podría estar
  embebida este año dentro de "Publicidad y concesiones" del Anexo D (Fútbol Profesional) en vez de
  quedar como línea de departamento aparte — no se pudo confirmar con lo que dice el documento.

## Rosario Central (Ejercicio 2024-25, sesión 2026-09-23)

- **"Ingresos por ventas tiendas" / "Costo de mercadería vendida"** (3.880,59M / 2.673,79M): venta
  minorista de indumentaria/merchandising del club, sin categoría propia en `category-map.js` hoy
  (cargadas a `other_income`/`other_expenses`) — candidatas a `merchandise_sales`/
  `cost_of_goods_sold` si más clubes reportan una tienda con este volumen (no es solo Rosario
  Central: Talleres también tenía una línea de tienda neta de costo en la Versión 207).
- **"Ingresos fútbol profesional" (2.732,08M) y "Gastos de fútbol profesional" (5.308,77M)**: líneas
  residuales sin más desglose en el documento (a diferencia de TV/entradas/sponsors, que sí tienen
  fila propia) — vale preguntarle al club qué componen específicamente.
- **"Gastos bancarios y financieros" (889,62M)**: categorizado como `admin_general_expense`
  (comisiones/gastos operativos, distinto del resultado financiero ya separado en `netInterest`),
  sin certeza total de que no incluya algo de naturaleza financiera pura.
- **"Servicios de terceros" (1.438,05M)**: ambiguo entre honorarios profesionales y servicios
  operativos tercerizados, fue a `other_expenses`.

## Racing Club (hallazgo de esta sesión, no una pregunta para el club)

- **Categorización interna inconsistente, Ejercicios 2009/2010/2012/2014**: 5 líneas de revenue
  ("Desafectación de previsiones y provisiones", "Condonaciones") están etiquetadas
  `exceptional_items`, una categoría que solo existe en `EXPENSE_CATEGORIES`, no en
  `REVENUE_CATEGORIES` — no rompe ningún total (el revenue se suma sin filtrar por categoría), pero
  sí podría no aparecer bien agrupado en "Formato Simplificado". Encontrado con un script de
  auditoría en el navegador (`REVENUE_CATEGORIES`/`EXPENSE_CATEGORIES` vs. cada línea cargada) al
  verificar los clubes nuevos de esta sesión — no es de esta sesión, viene de una carga anterior de
  Racing. Queda como to-do de limpieza, no es urgente (no afecta ningún número mostrado).

## Club América (Ollamani, S.A.B.)

- **Dos tipos de cambio de cierre distintos para la MISMA fecha, dentro del MISMO reporte**: el
  Reporte Financiero BMV 2025 (`Clubes/México/Club América/reporte-financiero-ollamani-2025-auditado.pdf`)
  declara $18.0012 MXN/USD al 31/12/2025 en la sección MD&A (pág. 7, comentario de "Gastos
  financieros, neto") pero $17.9528 MXN/USD para la MISMA fecha en la Nota a los estados financieros
  auditados (pág. 104, footnote de la misma partida). Se usó $17.9528 (la cifra de la Nota formal)
  para `data/clubamerica-data.js`, pero no se encontró una explicación de por qué el mismo documento
  trae dos cifras — a quién preguntarle: Ollamani Investor Relations (contacto en
  ollamani.com.mx/reportes-3/, o el propio `ir@ollamani.com.mx` si existe, no confirmado).
- **¿Vale la pena cargar el Ejercicio 2024 (11 meses) como 2do punto de la serie?**: PDF ya
  descargado (`reporte-financiero-ollamani-2024-auditado.pdf`), cubre el período inicial de la
  compañía (1/2/2024 a 31/12/2024, no un año calendario completo por el spin-off de fin de enero
  2024) — no es una duda para el club, es una decisión de producto para Guido (¿mostrar un ejercicio
  de 11 meses al lado de uno de 12 sin aclarar la diferencia de longitud confunde más de lo que
  aporta?).

## Deportes Tolima (hallazgo de esta sesión — NO se cargó al sitio por esto)

- **El resultado neto (utilidad) del Ejercicio 2025 tiene 3 cifras distintas, sin poder reconciliar
  ninguna con confianza**: (1) la vista SIIS resume "Resultado del ejercicio $359,205 M" (ver
  `fuentes/Colombia/Deportes Tolima.md`); (2) el propio documento (`estados-financieros-2025.pdf`,
  Nota 18(3), tabla "RESUMEN ESTADOS DE RESULTADOS AÑO 2011 A 2025 — UTILIDADES NETAS DE LOS
  EJERCICIOS NIFF") da $914.330.454 PESOS COMPLETOS para 2025 (= $914,330454 M, verificado que esta
  tabla usa pesos completos y no miles, cruzando la magnitud de varios años contra lo esperable —
  ej. 2019 daría $5.879.763.018.000 M si fuera miles, un número absurdo); (3) sumando línea por línea
  las Notas 19 (Ingresos, $49.330,876 M, EXACTO) - 20 (Gastos de Administración, $5.110,640 M) - 21
  (Gastos de Ventas, $39.666,001 M) + Nota 22 (Ingresos/Gastos no operacionales netos, -$730,592 M) -
  Nota 23 (Impuesto de renta, $638,668 M) da un resultado de ~$3.184,975 M — un TERCER número,
  distinto de los otros dos por un orden de magnitud. El documento descargado (`Clubes/Colombia/
  Deportes Tolima/estados-financieros-2025.pdf`, transcripción completa en
  `estados-financieros-2025.md` en la misma carpeta) trae solo las NOTAS a los estados financieros
  (igual que Once Caldas), no el Estado de Resultado Integral primario como tabla aparte, así que no
  hay forma de confirmar cuál de las 3 cifras es la correcta con lo que se tiene. La Nota 2 del
  documento explica que el club adoptó el Grupo 1 del DUR 2420 con transición 1-ene-2023 (decisión de
  enero de 2024) — es posible que la discrepancia venga de ahí (cifras bajo distinto marco técnico
  según qué tabla se mire), pero no se pudo confirmar. **Pregunta para el club/SIIS**: ¿cuál es el
  resultado neto oficial del Ejercicio 2025 (año calendario 2025), y por qué la tabla histórica de la
  Nota 18(3) da una cifra distinta a la que muestra SIIS? Se necesitaría el Estado de Resultado
  Integral primario (no solo las notas) para resolver esto — re-descargar de SIIS
  (siis.ia.supersociedades.gov.co, NIT 890700863) buscando si hay otro radicado con la tabla completa.
- Los ingresos SÍ están confirmados con alta confianza ($49.330,876 M, Nota 19, coincide exacto con
  la vista SIIS) — si en el futuro se resuelve la duda de arriba, la carga de este club puede
  retomarse rápido, ya está toda la categorización de ingresos hecha (ver
  `estados-financieros-2025.md` para el detalle completo de las Notas 19-23).

## Once Caldas (hallazgo de esta sesión, no bloqueó la carga pero queda una pregunta)

- **El PAT (resultado del ejercicio) 2025 está confirmado triple ($9.138,546 M — Nota 2, Informe del
  Revisor Fiscal, y vista SIIS coinciden), pero no se pudo reconstruir línea por línea desde las
  Notas 20-27 sin usar un residuo**: sumando Ingresos (Nota 20) - Costo de Ventas (Nota 21) - Gastos
  de Administración (Nota 22) - Gastos de Ventas (Nota 23) + Ingresos Financieros (Nota 24) + Otros
  Ingresos (Nota 25) - Gastos Financieros (Nota 26) - Otros Gastos (Nota 27) da un PRETAX de
  $13.446,121 M, que NO coincide con lo que el propio documento llama "Utilidad contable" en su nota
  de conciliación fiscal (Nota 15, $9.846,710 M) — una diferencia de ~$3.599 M sin explicación
  disponible en las notas descargadas (no hay una línea de "ganancia extraordinaria" ni similar,
  pese a que la compañía sigue en un acuerdo de reestructuración de pasivos desde 2012, lo que
  sugiere que podría haber un ítem de este tipo no desglosado en el documento). Se cargó el club de
  todos modos (ver `data/oncecaldas-data.js`, comentario de cabecera) usando el PAT confirmado como
  ancla y despejando `tax` como residuo (pretax línea por línea menos PAT confirmado), documentado
  explícito en el código como una aproximación, no un número impreso. **Pregunta para el club/SIIS**:
  ¿qué explica la diferencia entre la "Utilidad contable" de la Nota 15 ($9.846,710 M) y la suma de
  Ingresos/Gastos operativos + financieros de las Notas 20-27 (~$13.446,121 M pretax)? Se necesitaría
  el Estado de Resultado Integral primario (no solo las notas) para confirmar.

## Mirassol Futebol Clube (hallazgo de esta sesión, no bloqueó la carga del resultado, sí la del patrimonio)

- **El Patrimônio Líquido del informe de auditoría 2024 no cierra consigo mismo.** La sección
  "1.5.1 Superávits Acumulados" dice saldo inicial de superávits acumulados R$ 27.272.986,96 y
  superávit del ejercicio R$ 4.143.614,12, lo que sumaría R$ 31.416.601,08; pero el propio párrafo
  (y la sección 1.5 anterior) imprime saldo final de R$ 30.267.600,99. Diferencia de
  R$ 1.149.000,09 sin ninguna explicación en el documento (no hay línea de ajuste de ejercicios
  anteriores, ni de reclasificación). **Pregunta para el club/auditor**: ¿qué movimiento explica esa
  diferencia, y cuál de los dos saldos finales es el correcto?
- **Consecuencia práctica**: NO se cargó ningún dato patrimonial de Mirassol al sitio. Las 3 cifras
  del resultado del ejercicio (receita R$ 59.339.448,33, despesas operacionais R$ 19.090.092,99,
  superávit R$ 4.143.614,12) sí cierran exacto entre sí y con el porcentaje de custos que el propio
  documento publica a 14 decimales, así que el ejercicio 2024 se cargó igual, solo sin patrimonio.
  Ver `data/mirassol-data.js`.
- **Aparte, el documento tiene varios errores de redacción** que conviene tener en cuenta si alguien
  vuelve a leerlo: cifras cuya versión en letras no coincide con el número (el PL final
  R$ 30.267.600,99 está escrito en letras como el saldo inicial; las disponibilidades
  R$ 11.583.747,40 aparecen escritas como "...setecentos e quarenta e dois reais"), y porcentajes de
  variación que en realidad son el coeficiente ("um aumento de 1,473791289594634%" para algo que
  creció ~47%). Ninguno afecta las cifras cargadas, pero bajan la confianza general en el documento.
- **Sobre la falta de desglose**: el PDF no son las demonstrações contábeis, es el informe narrativo
  del auditor SOBRE ellas. **Pregunta para el club**: ¿publican en algún lado las demonstrações
  contábeis completas (DRE y balanço patrimonial como tablas) del ejercicio 2024? Con eso el club
  pasaría de 1 línea de ingresos a un desglose real.

## Clubes que NO son de fútbol (sesión 2026-09-13, primer sourcing multideporte)

Estas 4 no son preguntas para un club: son decisiones de criterio del PROYECTO que aparecieron al
sumar deportes nuevos, y que conviene que resuelva Guido antes de que se carguen los primeros
documentos, porque después son caras de cambiar. Se anotan acá y no en un comentario de código
porque no hay ningún archivo de club todavía donde ponerlas.

- **¿Cuál es el "país" de una escudería de Fórmula 1?**: las 5 escuderías bajadas están registradas
  en Inglaterra y depositan ahí sus cuentas, pero compiten con licencia de otra nacionalidad —
  Mercedes corre con licencia **alemana** desde Brackley (Inglaterra) y Red Bull Racing con licencia
  **austríaca** desde Milton Keynes (Inglaterra). Por ahora quedaron archivadas bajo `Inglaterra`
  (que es de donde sale el documento), pero el sitio muestra el país como un dato del club, no del
  documento. ¿País = registro societario, o país = licencia de competencia? — esto no se pregunta a
  ningún club, lo define el sitio.
- **¿Qué hacer con un documento que cubre DOS clubes de DOS deportes?**: el 10-K de Madison Square
  Garden Sports Corp. consolida a los New York Knicks (NBA) y a los New York Rangers (NHL) en un solo
  estado, con ingresos combinados de USD 1.154 M en FY2026. Falta chequear si la nota de segmentos
  los desglosa; si no lo hace, ¿se carga el bundle aclarando la mezcla (como se hizo con Club América
  dentro de Ollamani), se carga como una entidad sola llamada "MSG Sports", o no se carga? Ver
  `fuentes/Estados Unidos/New York Knicks.md`.
- **Atlanta Braves: ¿consolidado o solo el segmento de béisbol?**: Atlanta Braves Holdings reporta
  dos segmentos, el club y el desarrollo inmobiliario The Battery Atlanta. El total consolidado 2025
  es USD 732,5 M. ¿Se muestra el consolidado (que incluye ingresos que no son deporte) o solo el
  segmento de béisbol? Mismo tipo de decisión que ya se tomó en México, conviene que sea el mismo
  criterio.
- **¿Un equipo de F1 es un "club"?**: el esquema del sitio asume club-temporada-liga. Una escudería
  no tiene socios, ni ascensos, ni mercado de pases en el sentido del fútbol, y su ejercicio coincide
  exacto con el campeonato. Antes de cargar la primera, definir si entra en el mismo esquema o si
  necesita un tratamiento propio.

## Japón — J.League y sus 10 clubes (la misma pregunta, a los dos lados)

Contexto (verificado con 3 fuentes independientes, ver `fuentes/Japón/_notas-generales.md`): el
disclosure oficial de la liga (`club_doc-<AÑO>.pdf`) publica **3 cifras por club** — 売上高 (ingreso
total), スポンサー収入 (sponsors) y 入場料収入 (entradas) — y nada más. Las otras 6 categorías de
ingreso (Ｊリーグ配分金 distribución de liga, 移籍補償金等収入 transferencias, 物販収入
merchandising, アカデミー関連収入 academia, 女子チーム関連収入 femenino, その他収入 otros)
existen en el vocabulario de la liga y se publican **solo como promedio de J1/J2/J3**, nunca por
club. Consecuencia en el sitio: los 10 clubes japoneses muestran ~58% de sus ingresos en una sola
fila, "Fútbol profesional (sin desglosar por la fuente)". Y no hay NINGÚN dato de gastos por club en
ninguna edición, así que `expenseLinesByYear` de los 10 está vacío.

Esto no se puede resolver leyendo más documentos: ya se buscó. Hay que preguntar. Son dos preguntas
distintas, y conviene hacer las dos porque cualquiera de las dos que salga bien resuelve el punto.

- **A la LIGA — ¿existe el desglose por club y no está publicado, o no existe?**: la liga arma los
  promedios divisionales de las 8 categorías (Apéndice 3-1/3-2 del disclosure, y la Ｊリーグ
  クラブ経営ガイド entera) a partir de lo que le reportan los clubes bajo el Club Licensing System,
  así que el dato por club tiene que existir del lado de la liga. ¿Se puede pedir? ¿Hay una versión
  del disclosure con más detalle para prensa o investigación? Y la segunda mitad: ¿publican en algún
  lado el desglose de GASTOS por club (人件費 / masa salarial en particular), o el único corte
  disponible es el divisional? — a quién preguntarle: 公益社団法人日本プロサッカーリーグ (J.League),
  formulario de contacto corporativo en https://aboutj.jleague.jp/corporate/contact/ (la sección
  corporativa es la que publica el disclosure, no el sitio de hinchas jleague.jp).
- **A CADA CLUB — ¿publican ustedes su propio 決算公告 / 事業報告 completo?**: los 10 son sociedades
  japonesas (株式会社) y la ley societaria obliga a publicar el 決算公告 (aviso de cierre de
  ejercicio). Si alguno publica un estado de resultados completo por su cuenta — en su web, en el
  boletín oficial (官報), o en el informe de su asamblea — ese club pasa de 3 líneas a un desglose
  real, sin depender de la liga. Empezar por Gamba Osaka, que es el caso que disparó esto
  (https://www.gamba-osaka.net/contact/), y repetir con los otros 9 si la respuesta sirve.
- **Lo que NO hay que hacer mientras tanto**: circulan notas de análisis japonesas con un desglose
  por club de 4 líneas (una de note.com da para Gamba 2024: 72,2億 total, 22,6 sponsors, 11,9
  entradas, **7,6 物販**, 22,5 otros). Los 3 primeros números salen del disclosure oficial; el de
  物販 no está en ninguna edición de ese documento, así que es una estimación del analista o viene de
  una fuente que la nota no cita. No cargarlo sin identificar de dónde sale.

## CA Osasuna

*(RESUELTO en gran parte, sesión 2026-09-22, al cargar los ejercicios 2021/2022 y 2023/2024: los dos
PDFs SÍ tienen capa de texto real (la premisa "escaneado sin capa de texto" del sourcing del
2026-09-16 estaba vencida) y los dos son el informe de auditoría + cuentas anuales completo (balance,
cuenta de pérdidas y ganancias, memoria), no un fragmento — se confirmó leyendo el texto interno de
cada uno, con período jul-jun literal en la carátula: "1 de julio de 2021 al 30 de junio de 2022" y
"1 de julio de 2023 al 30 de junio de 2024". Ver `data/osasuna-es-data.js`.

Lo que SIGUE abierto: si el club cambió a ejercicio CALENDARIO después de 2024 — la noticia de
`osasuna.es/en/noticia151` sobre un cierre a 31/12/2025 puede ser real para un ejercicio de
TRANSICIÓN posterior a los 2 ya cargados (no contradice lo confirmado acá). Si se carga un ejercicio
2025 o posterior de Osasuna, confirmar el período exacto antes de asumir jul-jun — a quién
preguntarle: prensa deportiva navarra, o directo al club vía su área de socios.)*

## Borussia Mönchengladbach

*(RESUELTO, sesión 2026-09-17: se bajó el PDF pendiente y el Lagebericht 2024 confirma
explícitamente que la "Borussia VfL 1900 Mönchengladbach GmbH" es la operadora de la
Lizenzspielermannschaft — el fútbol profesional, no otra unidad de negocio. La prensa que la
describía como "club e.V. sin escindir" estaba desactualizada/imprecisa. Ver
`fuentes/Alemania/Borussia Mönchengladbach.md`.)*

## FK Austria Wien (sourcing de Austria, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿El club publicó alguna vez un Geschäftsbericht completo descargable?**: solo se encontró un
  intento roto de 2019/20 (link muerto, sin snapshot en Wayback Machine). No se pudo confirmar si
  existe un archivo histórico en algún otro lado — a quién preguntarle: directo al club (prensa o
  área de socios/accionistas), ya que la Firmenbuch confirma que la FK Austria Wien AG sí deposita
  cuentas pero el documento está bloqueado por login+pago (ver `fuentes/Austria/Austria Wien.md`).

## OH Leuven (sourcing de Bélgica, sesión 2026-09-17, no bloqueó la elección de entidad pero queda sin confirmar)

- **¿Qué son las otras 2 entidades "Oud-Heverlee Leuven"?**: además de la BV correcta (0668.426.703,
  la que tiene turnover real), existen "OUD-HEVERLEE LEUVEN" NV (0864.391.150) y "OUD - HEVERLEE
  LEUVEN" VZW (0430.065.732), ambas con el campo Omzet en blanco en su depósito más reciente. Es
  razonable asumir que una es la asociación histórica madre y la otra una sociedad patrimonial
  (estadio/estructura), mismo patrón que Hamburger SV en Alemania, pero no se abrió ninguno de los 2
  PDFs para confirmarlo — a quién preguntarle: no hace falta, alcanza con abrir esos 2 PDFs en una
  sesión futura si se necesita el dato.

## Cercle Brugge (sourcing de Bélgica, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Existía el club bajo otra razón social antes de 2015?**: no se encontró ningún depósito
  anterior a 2015 para "Cercle Brugge" ni para ninguna entidad con ese nombre. Club Brugge sí tenía
  este patrón (operaba como "De Klokke" hasta 2011) — no está confirmado si a Cercle Brugge le pasa
  lo mismo o si simplemente no hay registro más antiguo en la Centrale des bilans.

## Guangzhou Evergrande (sourcing de China, sesión 2026-09-17, pregunta de criterio para Guido, no para el club)

- **¿Cargar al sitio un club que ya no juega en la CSL actual?**: es el único club chino que alguna
  vez cotizó con disclosure completo (NEEQ:834338, 2015-2021) — 5 ejercicios anuales reales
  (2015-2019) + semestral 2020 ya descargados en `Clubes/China/Guangzhou Evergrande/`, con cifras
  reales de la crisis (FY2019: ingresos RMB 783M, pérdida neta -RMB 1.943M, patrimonio neto negativo
  ~RMB 4.150M). El club descendió y prácticamente desapareció tras el colapso del grupo Evergrande.
  Tiene valor documental único (es la única serie financiera auditada real de un club chino, y
  documenta con números una de las quiebras más grandes del fútbol mundial), pero no es un club
  vigente de la temporada corriente — no está claro si el criterio del proyecto es limitarse a
  clubes activos o si vale la pena cargarlo igual como caso histórico. Decisión de Guido, no del
  club.

## Henan (sourcing de China, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Vale la pena revisar los EEFF de Jianye Real Estate (HKEX:0832) de 2021-2023?**: durante ese
  período Jianye tuvo ~30% del club vía un consorcio — no se confirmó si sus estados financieros
  desglosaron esa inversión asociada. El accionista ya vendió su parte, así que no es urgente, pero
  queda como pista sin agotar para una sesión futura.

## Daejeon Hana Citizen (sourcing de Corea del Sur, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Por qué se corta el 사업보고서 después de FY2019?**: el club se reestructuró con la entrada de
  Hana Financial Group en 2020. No se confirmó si desde entonces existe disclosure bajo otra figura
  societaria (la entidad nueva podría tener otra razón social en DART) — a quién preguntarle: buscar
  primero en DART con el nombre de la nueva entidad antes de preguntarle al club.

## Ulsan HD (sourcing de Corea del Sur, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Por qué esta filial de HD Hyundai no deposita informe de auditoría en DART?**: la entidad
  existe en el registro pero con 0 informes en 10 años, a diferencia de Jeonbuk Hyundai Motors
  (filial de un grupo del mismo tamaño, que sí deposita). ¿Hay alguna exención societaria — socio
  único que garantiza la deuda, similar al §264b del HGB alemán (sección 12 del skill)? — a quién
  preguntarle: no hace falta preguntarle al club, se puede confirmar revisando la estructura
  societaria de HD Hyundai en una sesión futura.

## Pohang Steelers (sourcing de Corea del Sur, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Es realmente una sociedad separada con CIF propio?**: no se confirmó si Pohang Steelers opera
  como una entidad legal separada de POSCO o si es un departamento interno sin personería propia —
  si tiene entidad propia, no está claro por qué nunca depositó nada en DART.

## Lokomotiva (sourcing de Croacia, sesión 2026-09-17, decisión de Guido, no pregunta al club)

- **¿Vale la pena pagar Scribd para 2 ejercicios?**: se identificaron los ejercicios 2024 y 2025 del
  club, pero están alojados en Scribd, que exige cuenta/login para descargar (URLs exactas en
  `fuentes/Croacia/Lokomotiva.md`). Si Guido quiere pagar/crear la cuenta él mismo, ahí están los
  links; si no, el club queda sin datos por ahora.

## FC København (sourcing de Dinamarca, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Existía una entidad "solo fútbol masculino" antes de 2023?**: F.C. København P/S (CVR
  43952161) se constituyó recién el 29/03/2023, así que solo tiene 3 ejercicios. Antes de esa
  fecha, el fútbol parece haber estado dentro del consolidado de PARKEN Sport & Entertainment A/S
  sin desglose propio — no se confirmó si hay otra entidad previa dada de baja, o si el desglose
  por segmento existe dentro del propio informe consolidado.

## OB (sourcing de Dinamarca, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿El informe de Odense Sport & Event A/S desglosa el fútbol como segmento propio?**: la sociedad
  mezcla fútbol profesional con ferias/hoteles/eventos en su objeto social. No se revisó si el
  informe trae un desglose IFRS 8 por segmento que permita aislar el perímetro de OB, o si va todo
  junto sin desglose — determina si esta fuente alcanza para cargar al sitio tal cual.

## AS Monaco (sourcing de Francia, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Cuál es la relación exacta entre la SIREN francesa y la sociedad monegasca real?**: el informe
  DNCG describe al club como "SA à loi monégasque" (la única entidad de Ligue 1 de derecho NO
  francés), pero existe además una SIREN francesa parecida (515109692, "AS Monaco Football Club
  SA") sin confirmar si es la misma entidad con doble registro o una filial menor.

## Olympique Lyonnais (sourcing de Francia, sesión 2026-09-17, no bloqueó la descarga pero queda sin cerrar)

- **¿El DEU de Eagle Football Group desglosa el segmento "Olympique Lyonnais" puro?**: el documento
  consolida el fútbol de Lyon con otros clubes del grupo (Botafogo, RWD Molenbeek, y Crystal Palace
  hasta 2025) — no se confirmó si trae un desglose por segmento que aísle a Lyon, o si hace falta
  cruzarlo con el bilan individual de la SASP vía el agregado DNCG para tener el perímetro correcto.

## Grecia — huecos genuinos sin explicación encontrada (sourcing, sesión 2026-09-17, no son preguntas para el club, son pendientes técnicos)

- **Aris**: falta el ejercicio FY2019/20 pese a continuidad en el resto de los años — no se encontró
  ningún depósito en el ΓΕΜΗ para ese año.
- **Atromitos**: falta el ejercicio FY2017/18, mismo patrón.
- **Panetolikos**: faltan FY2018/19 y FY2020/21 — el único club griego con dos huecos.
- **PAOK**: falta el ejercicio FY2017/18.

## AEK Athens (sourcing de Grecia, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Cuál de las dos versiones del ejercicio 2021/22 usar?**: hay dos archivos depositados,
  `Notes_IFRS_2022` y `FS_orthi_epanalipsi_2022` ("orthi epanalipsi" = repetición/corrección), sin
  que el nombre del archivo aclare cuál es la versión final a usar.
- **2 archivos sin fecha de ejercicio confirmada**: `AEK_oikonomika_stoixeia.pdf` y
  `AEK_oikonomikes_katastaseis.pdf` (los IDs de ΓΕΜΗ más antiguos de la ficha del club) — falta
  abrirlos y confirmar a qué ejercicio corresponden.

## Panserraikos (sourcing de Grecia, sesión 2026-09-17, no bloqueó la descarga pero queda sin confirmar)

- **¿El perímetro societario es el mismo si se completa la serie histórica?**: la entidad activa es
  una refundación de 2020 tras la liquidación de la ΠΑΕ anterior (y existió una tercera entidad
  "1964" ya borrada del registro). Si en el futuro se busca completar la serie más atrás de 2020,
  hay que confirmar primero si esos balances viejos corresponden al mismo perímetro del club actual
  o a la entidad liquidada.

## Bologna (sourcing de Italia, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Sigue publicando el fascicolo completo?**: hay 2 ejercicios (2017/18, 2022/23) pero un gap sin
  explicar en 2023/24-2024/25, justo cuando el club mejoró sus resultados deportivos — no se
  encontró en ningún canal si dejó de publicar o si solo cambió de ubicación.

## Cagliari (sourcing de Italia, sesión 2026-09-17, accionable, no es duda para el club sino un aviso)

- **El link oficial "Informazioni finanziarie" del sitio del club apunta a un Google Drive borrado o
  roto (404)** — se le podría pedir directo al club que lo arregle, ya que aparentemente sí tenían
  intención de publicar.

## Parma (sourcing de Italia, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Cuánto dura el ejercicio de transición jun→dic 2018?**: no se confirmó si cubre 12 meses o si
  hay un puente de 18 meses no localizado en ningún otro documento.

## Genoa (sourcing de Italia, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Cuánto dura el ejercicio de transición dic→jun 30.06.2024?**: no se confirmó si cubre 6 o 12
  meses.

## Inter (sourcing de Italia, sesión 2026-09-17, pregunta de criterio, no para el club)

- **¿Cargar el perímetro "Inter Media and Communication S.p.A."?**: hay una serie 2017-2025 (sin
  OCR todavía) de esta entidad, que no es el club entero sino una unidad de negocio — decisión de
  Guido si vale la pena cargarla como dato complementario o descartarla por no representar al club.

## Vålerenga (sourcing de Noruega, sesión 2026-09-17, no bloqueó la descarga pero queda sin cerrar — la más importante de las 5)

- **¿Cuál de las 3 entidades es "el club" a cargar?**: hay 3 entidades activas con depósitos
  (Elite FLI con 18 ejercicios, una AS comercial con 17, y una FLI paraguas con 11) — no está
  confirmado cuál concentra el fútbol profesional real, o si hace falta consolidar más de una.

## Bodø/Glimt (sourcing de Noruega, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Por qué falta el período 2018-2022?**: justo coincide con los años de título del club — no se
  encontró ningún depósito para esos ejercicios pese a continuidad antes y después.

## KFUM (Oslo) (sourcing de Noruega, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Por qué no hay nada depositado desde 2019?**: el club ascendió a la Eliteserien después de esa
  fecha, y no se encontró ningún depósito posterior pese a la obligación de licencia.

## Lillestrøm (sourcing de Noruega, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **Contradicción entre la memoria propia del club y el registro oficial**: el sitio propio
  (lsk.no) publica su memoria hasta 2023, pero el Regnskapsregisteret no tiene ningún depósito desde
  2011 — no se confirmó si cambiaron de entidad legal sin actualizar el registro, o si el registro
  está desactualizado.

## FC Groningen (sourcing de Países Bajos, sesión 2026-09-17, no bloqueó la descarga pero queda sin confirmar)

- **¿"FC Groningen" y "FC Groningen Beheer" son la misma entidad?**: el ejercicio 2017/18 tiene dos
  jaarverslagen separados con esos dos nombres — no se confirmó si es una renombrada de la otra o si
  una es la holding (Beheer = "gestión/administración" en neerlandés) y la otra la operativa, con
  perímetros distintos.

## FC Volendam (sourcing de Países Bajos, sesión 2026-09-17, no bloqueó la descarga pero queda sin confirmar)

- **¿"Stichting Óók FC Volendam" es una fundación de apoyo distinta del club?**: los documentos
  2013-2019 están bajo esa entidad (carpeta `/1071/`), y los de 2019/20 en adelante bajo "Stichting
  R.K.F.C. Volendam" (carpeta `/1137/`) — el nombre de la primera ("Óók", "también" en neerlandés)
  sugiere que podría ser una fundación de apoyo/hinchas, no el club mismo. No se descargaron esos
  documentos por esta duda sin resolver.

## Países Bajos — forma jurídica Stichting, no BV/NV (sourcing, sesión 2026-09-17, pregunta de criterio)

- **Heracles Almelo y FC Volendam operan como "Stichting" (fundación) en vez de BV/NV** — no se
  confirmó si el criterio de mapeo de `club-data-mapping/SKILL.md` (pensado para sociedades
  mercantiles) aplica igual a una fundación sin fines de lucro, o si hace falta un criterio aparte.

## Tondela (sourcing de Portugal, sesión 2026-09-17, pregunta real para el club)

- **¿Por qué solo hay un ejercicio publicado en todo el historial del dominio?**: el club tiene SAD
  y juega en Primeira Liga (obligación de licencia), pero solo se encontró el ejercicio 2020/21
  (parcial, rescatado vía arquivo.pt) en todo el historial del sitio — vale la pena preguntarle
  directo al club si publica en algún otro canal o por qué dejó de hacerlo.

## Arouca (sourcing de Portugal, sesión 2026-09-17, accionable, no es duda para el club sino un aviso)

- **Pedirle al club que resuba sus Relatório e Contas**: se confirmó (vía metadata de Wayback
  Machine) que existieron 4 ejercicios (2021/22-2024/25), pero ya no hay ninguna copia completa en
  ningún archivo web consultado (Wayback los trunca a 5 MB) — el club podría resolverlo resubiendo
  los PDFs a su sitio.

## Slovan Liberec (sourcing de República Checa, sesión 2026-09-17, sospecha técnica, no es duda para el club)

- **17 años sin depósito (2006-2021) en una entidad que sí deposita el resto de la serie**: se
  sospecha que el filtro de búsqueda por texto "účetní závěrka" puede estar dejando afuera un tipo
  de "listina" (documento) distinto en el registro, no que sea un dead-end real de esos años —
  retomar con otros filtros antes de asumir que el hueco es genuino.

## Slovácko (sourcing de República Checa, sesión 2026-09-17, misma sospecha que Slovan Liberec)

- **Serie muy discontinua (10 de ~25 ejercicios posibles)** — mismo tipo de sospecha que Slovan
  Liberec: podría ser un problema del filtro de búsqueda usado, no falta real de depósitos.

## Dukla Praha (sourcing de República Checa, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **Faltan justo los 2 ejercicios más recientes (2024-25)**: posible atraso de depósito (todavía no
  se presentó), no un hueco histórico — vale la pena reintentar en una sesión futura sin asumir que
  no existen.

## República Checa — depósitos duplicados sin abrir (sourcing, sesión 2026-09-17, pendiente técnico)

- Varios pares de depósitos del mismo ejercicio sin abrir para confirmar si son idénticos o una
  corrección del otro: Slavia Praha (1998, 2002, 2022), Bohemians Praha 1905 (2012), Mladá Boleslav
  (2011-12).

## Akhmat Grozny (sourcing de Rusia, sesión 2026-09-17/18, pregunta real para el club)

- **¿Por qué nunca depositó el dictamen de auditor?**: el registro lo marca `requiredAz: true`
  (legalmente obligado) para los 5 ejercicios 2021-2025, pero nunca lo hizo — solo hay notas al
  balance de 2025. Vale la pena preguntarle directo al club si existe por otro canal o si hay un
  problema de auditoría de fondo.

## Spartak Moscow (sourcing de Rusia, sesión 2026-09-17/18, no bloqueó nada, solo sin cerrar)

- **`2025-poyasneniya.pdf` (notas al balance) tiene solo 1 página / 7 KB**, sospechosamente chico
  comparado con las notas de otros clubes (cientos de KB a varios MB) — revisar el contenido antes
  de usarlo como fuente, podría estar truncado o ser solo una carátula.

## Rubin Kazan (sourcing de Rusia, sesión 2026-09-17/18, no bloqueó nada, solo sin cerrar)

- **2021 y 2022 no tienen ningún documento** (ni auditoría ni notas), a diferencia del resto de la
  serie 2023-2025 — evaluar si vale la pena perseguir esos 2 años puntuales en una sesión futura.

## Young Boys (sourcing de Suiza, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **Falta el ejercicio 2019**: existe el dato de referencia mencionado en el post de 2020, pero no
  se ubicó el documento/post propio de 2019 en ningún canal.

## Thun (sourcing de Suiza, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **Hueco en el ejercicio 2017** entre 2016/17 y 2018 — podría ser un año de transición de ejercicio
  fiscal (de temporada a año calendario), no confirmado.

## Zürich (sourcing de Suiza, sesión 2026-09-17, pregunta de criterio, no bloqueante)

- **El Geschäftsbericht 2011 existe en Yumpu (subido por la cuenta oficial del club) pero tiene la
  descarga deshabilitada** — se puede leer online pero no bajar. Decisión de Guido si vale la pena
  perseguirlo (buscar el PDF original en Wayback Machine) o dejarlo así.

## Kocaelispor (sourcing de Turquía, sesión 2026-09-18, pregunta real para el club)

- **¿La entidad del documento de 2019 (Kocaelispor Kulübü Derneği) es la misma que ascendió a la
  Süper Lig 2025/26?**: el club tuvo un historial reciente de refundaciones/dificultades
  institucionales — antes de comparar series o cargar cualquier dato, confirmar si es la misma
  entidad legal o si hubo una refundación en el medio.

## Trabzonspor

*(RESUELTO, sesión 2026-09-18: el propio İzahname 2025 dice textualmente que "Trabzonspor Sportif
Yatırım ve Futbol İşletmeciliği A.Ş., payları 2005 yılında halka arz edilmiş olup..." — salió a
bolsa en 2005. La entidad operativa (Futbol A.Ş.) se constituyó el 21 de abril de 2004 en Trabzon.
De paso se completó la serie completa 2015/16-2024/25, así que el hueco que motivaba la pregunta ya
no existe. Ver `fuentes/Turquía/Trabzonspor.md`.)*

## Polissya (sourcing de Ucrania, sesión 2026-09-18, no bloqueó la descarga pero queda sin confirmar)

- **Dos EDRPOU candidatos**: 40372249 (la empresa comunal confirmada) y 44547377 (sin relación
  aclarada) — confirmar cuál corresponde a los PDF descargados antes de cargar los datos.

## Obolon (sourcing de Ucrania, sesión 2026-09-18, pregunta real, no bloqueó nada)

- **¿El PDF financiero de 2025 es del club de fútbol o de la cervecera ПрАТ "ОБОЛОНЬ" (EDRPOU
  05391057)?**: comparten sitio/patrocinio pero podrían ser entidades legales distintas — confirmar
  antes de cargar cualquier cifra.

## Kolos Kovalivka (sourcing de Ucrania, sesión 2026-09-18, pregunta real para el club)

- **¿Por qué solo publica un informe de procedimientos acordados, no el paquete completo?**: el
  sitio propio solo tiene ese informe (sobre información adicional), no el balance/resultados/flujo
  completo, a diferencia del resto del país. No está claro si el club no llega al umbral de
  "empresa mediana" que obliga a publicar por el art. 14, o si simplemente no publicó el resto —
  vale la pena preguntarles directo si Guido quiere el paquete completo.

## Dynamo Kyiv / Zorya / Kryvbas (sourcing de Ucrania, sesión 2026-09-18, pregunta real para los 3 clubes)

- **¿Por qué ninguno tiene sección de transparencia financiera?**: la mayoría del resto de la liga
  sí publica por el art. 14 de la Ley de Contabilidad, pero estos 3 no tienen ninguna señal de
  bloqueo técnico, simplemente no hay sección — candidatos directos para un "reach out" a los
  clubes preguntando dónde publican (si lo hacen) su balance auditado.

## Otros clubes (si se agregan más adelante)

*(agregar una sección nueva por club acá)*

## Independiente Medellín (sourcing de Colombia, sesión 2026-09-22, bloquea el club entero)

- **¿Qué entidad presenta hoy los estados financieros del club, y ante quién?** Es el único club de
  la Primera A 2025 que no aparece por ninguna vía en SIIS (Supersociedades): ni por nombre, ni por
  NIT candidato (890900575), ni en el listado completo de entidades con CIIU deportivo
  (R9311/R9312/R9319), que esta sesión se recorrió entero. Los directorios empresariales listan
  `DEPORTIVO INDEPENDIENTE MEDELLIN S.A.` como **"en liquidación"**, mientras que la entidad que
  opera se presenta como **Corporación Deportiva Independiente Medellín**. Si es una corporación y
  no una sociedad, queda estructuralmente fuera del perímetro de Supersociedades, que es el único
  canal del país — y entonces el club nunca va a tener balance público salvo que lo publique por su
  cuenta (su sitio no tiene ninguna sección de transparencia, menú completo revisado). La pregunta
  concreta: *"¿la Corporación Deportiva Independiente Medellín presenta estados financieros ante
  algún organismo de control? ¿Dónde se pueden consultar los del último ejercicio?"* — a quién
  preguntarle: info@dimoficial.com (el único contacto administrativo publicado).

## Águilas Doradas / Talento Dorado S.A. (sourcing de Colombia, sesión 2026-09-22, no bloqueó nada)

- **¿El perímetro de Talento Dorado S.A. es solo el club de fútbol?** Los estados financieros del
  club se depositan en SIIS bajo **TALENTO DORADO S.A.** (NIT 900456885, Rionegro, Antioquia), que
  es la sociedad dueña del club. Pero la misma sociedad figura también como dueña del equipo de
  **futsal** Águilas Doradas. No se abrieron los PDF esta sesión (es sourcing puro), así que queda
  sin confirmar si los estados mezclan las dos actividades o si el futsal es inmaterial. Hay que
  chequearlo en la nota de contexto operacional antes de cargar cualquier cifra — mismo criterio de
  perímetro que ya se aplicó a Ollamani/Club América y a MSG Sports.



## Alquileres y arrendamientos sin especificar (pregunta común a 6 clubes)

Salió del relevamiento del 2026-09-22 (`auditorias/2026-09-22-catchall-no-futbol.md`) al crear la
categoría `stadium_other`. Estos 6 clubes tienen una línea de ingreso por alquiler o arrendamiento
cuyo rótulo NO dice de qué propiedad se trata, así que no se puede saber si es el estadio (y va a
la fila "Estadio") o la sede/otra propiedad (y se queda en "Otros ingresos"). Se dejaron todas en
`other_income`, que es lo conservador, pero varias pesan de verdad:

- **Argentinos Juniors — "Diversos (alquileres, concesiones, etc.)"**: hasta **14,2% de sus
  ingresos** (Ejercicio 2017), la línea no futbolística más grande de todo el relevamiento después
  del colegio de Vélez. El balance no la abre. ¿Qué se alquila y cuánto es cada cosa?
- **Unión de Santa Fe — "Recursos por alquiler de instalaciones"**: crece de 12,1 M a 103,4 M ARS
  entre ejercicios. ¿Qué instalaciones — el 15 de Abril, el estadio cubierto, La Tatenguita?
- **Racing — "Ingresos Alquiler"** (9 ejercicios): ¿el Cilindro, o propiedades de la sede?
- **Rosario Central — "Alquileres" y "Concesiones"**: ¿el Gigante de Arroyito o el complejo?
- **Envigado — "Arrendamientos"**: ¿el Polideportivo Sur, que además no es propio?
- **Botafogo — "Locações"** (17,0 M BRL): ¿el Nilton Santos, o inmuebles del club?

Por qué vale preguntarlo y no deducirlo: el estadio es la unidad de negocio que más le interesa a
un hincha o a un periodista, y meter ahí un alquiler que en realidad es de un local de la sede
sería inventar. La pregunta concreta para cada club es la misma: *"la línea X de su Estado de
Recursos y Gastos, ¿corresponde al estadio o a otras propiedades del club? Si es mixta, ¿cuánto es
cada parte?"*.

## Onboarding de 20 clubes nuevos (Colombia, España, Alemania, Inglaterra — sesión 2026-09-22)

Dudas que quedaron de cargar los 20 clubes de esta sesión (Colombia: América de Cali, Atlético
Nacional, Deportivo Cali, Independiente Santa Fe, Junior de Barranquilla; España: Getafe, Girona,
Espanyol, Elche, Osasuna; Alemania: Köln, Eintracht Frankfurt, Werder Bremen, Augsburg, Stuttgart;
Inglaterra: Arsenal, Liverpool, Manchester City, Everton, Tottenham Hotspur). Los tie-outs de los 20
cierran (exactos o con ruido de redondeo de pocas unidades sobre millones, documentado en cada
archivo) — estas son dudas de CATEGORIZACIÓN o de dato puntual, no de que algo no cierre.

- **América de Cali (`americadecali-co`)**: "Derechos deportivos" y "Amortizaciones" aparecen como 2
  conceptos separados dentro de Costos deportivos — ¿son 2 hechos económicos distintos o el mismo
  contado 2 veces? Se cargaron ambos como `player_amortisation` por prudencia. Además, "Gasto de
  ventas" (Nota 22) tiene un residuo de $346 M sin desglosar línea por línea.
- **Deportivo Cali (`depcali-co`)**: `tax` es un residuo (pretax propio menos PAT confirmado por
  SIIS), no una cifra impresa directamente — ¿por qué el documento no imprime el desglose completo
  corriente/diferido como una cifra final única, a diferencia de los demás clubes colombianos de
  esta tanda?
- **Independiente Santa Fe (`santafe-co`)**: la Nota 21 (Ingresos) suma $2.294.550.661 MÁS que el
  total impreso por el propio documento, aunque cada línea individual reconcilia contra su propia
  variación 2024→2025 — es un error de cuadre de la FUENTE (se cargó el total impreso, con una línea
  de ajuste explícita visible). Además, el nombre del Representante Legal salió parcialmente
  ilegible en el OCR de la certificación ("LUIS ?DUARDO MENDEZ B.") — usar `gestionId:'actual'`
  hasta confirmar.
- **Getafe CF (`getafe-es`)**: "Ingresos LNFP" (330K€ 2024, 361K€ 2025) — ¿es distribución de TV,
  solidaridad, u otro concepto de la liga? Se cargó como `other_income` por descarte.
- **Girona FC (`girona-es`)**: "Ingresos accesorios y otros de gestión corriente" es una línea
  enorme sin desglose (43% del revenue en 2019/20, 22% en 2024/25) — ¿derechos de TV agrupados?
  ¿ingresos comerciales del City Football Group? Categorizado como `other_income` por descarte.
- **1. FC Köln (`koln-de`)**: "Abschreibungen auf Finanzanlagen und auf Wertpapiere des
  Umlaufvermögens" (TEUR 3.000, 2024/25 — deterioro de la participación en SK Gaming Beteiligungs
  GmbH) se sumó a `netInterest` por su posición en el esquema §275 Abs. 2 HGB (dentro del bloque de
  Finanzergebnis), no a `expenseLines` — ¿Guido prefiere otro tratamiento?
- **FC Augsburg (`augsburg-de`)**: "Auflösung Unterschiedsbetrag aus der Kapitalkonsolidierung"
  (reversión anual de un pasivo de primera consolidación, ítem puramente contable) se cargó como
  `other_income` a falta de un campo dedicado — **¿el sitio debería tener un meta field propio para
  ítems no-operativos de consolidación en los Konzernabschluss alemanes?** Probablemente se repita en
  otros clubes con subsidiarias no 100%-propias.
- **Eintracht Frankfurt (`eintrachtfrankfurt-de`)**: (a) "Frauen und Jugendfußball" combinado en una
  sola línea (7,6 M EUR) sin poder separar `womens_football` de `youth_football` — cargado como
  `other_income`; (b) "Transfer" (comisiones de agentes + fees, mezcla costos de compra Y venta de
  jugadores, 26-39 M EUR) no tiene categoría propia distinta de `player_amortisation` (que es
  específicamente para amortizar el plantel propio) — cargado como `other_expenses`. **¿Vale la pena
  una categoría `player_transaction_costs` separada?**
- **VfB Stuttgart (`stuttgart-de`)**: "Handel und Sonstiges" (el rubro de revenue que más creció:
  57,5M→81,1M→109,5M EUR) mezcla merchandising con venta NETA de jugadores sin desglose exacto (el
  Anhang confirma que el ingreso de transferencias está "unter den Umsatzerlöse ausgewiesen" pero sin
  decir en qué renglón) — cargado como `lump_football_operations` en vez de `player_sales`,
  consecuencia: "Venta de Jugadores" muestra $0 en Formato Simplificado pese a ventas reales (Endo,
  Mavropanos, Sosa 2023). **Pedirle a VfB Stuttgart el desglose exacto.**
- **Arsenal (`arsenal-gb`)**: (a) "Share of joint venture operating loss" (participación en el
  resultado de Arsenal Broadband Limited, −£1,9-1,7M) no encaja en ningún campo de `fiscalYearMeta` —
  se cargó como `revenueLine` `other_income` negativa a falta de un campo para "resultado de
  sociedades vinculadas por método de participación"; (b) staff costs sin desglose por área (todo a
  `wages_squad`), infla el ratio salarios/ingresos frente a clubes que sí separan.
- **Everton (`everton-gb`)**: "Profit on disposal of investments" 2025 (£49,2M, venta de Everton FC
  Women Ltd y Goodison Park Stadium Ltd A LA MATRIZ Roundhouse — deconsolidación intragrupo, no venta
  de jugadores ni de activos operativos) se cargó en `assetSales` a falta de una categoría para
  "ganancia por reestructuración corporativa/deconsolidación".
- **Manchester City (`mancity-gb`)**: (a) employee costs sin desglose por área, todo a `wages_squad`;
  (b) una celda ambigua de "profit/loss on disposal PP&E" 2023-24 se reconstruyó cruzando contra
  2024-25 (tie-out cierra, pero vale revisar el PDF original si hay dudas); (c) `netInterest` tomado
  del Statement of P&L primario y no de las Notas 9/10 (hay una discrepancia real entre ambos, por
  FX/derivados, sin investigar la razón contable exacta); (d) `grossDebt:0` es un cero REAL — la
  deuda del term loan de City Football Group no está en el perímetro de esta sociedad (Manchester
  City Football Club Limited, cuentas individuales, no las consolidadas del grupo).
- **Tottenham Hotspur (`tottenham-gb`)**: (a) "Commercial" (Nota 2) mezcla Sponsorship/Merchandising/
  ingresos no futbolísticos del estadio (NFL, conciertos, F1 Drive, stadium tours) sin reconciliar
  exacto contra el total de la nota — no se promovió nada a `stadium_other`, el rótulo real es
  "Commercial"; (b) "Amortisation, impairments and other net football trading income and
  expenditure" se cargó como una sola línea a `player_amortisation` porque el desglose de la Nota 4
  no reconciliaba exacto contra el neto de la Nota 3 (diferencia de 2.526, sin explicación en el
  documento transcripto); (c) `gestionId:'levy'` (Daniel Levy, Executive Chairman hasta el 4/9/2025)
  en vez de Joe Lewis/ENIC (controlante último), que ningún documento nombra explícitamente.
- **Newell's Old Boys (`newells-ar`)**, Ejercicio 2018-19: (a) "Complejo Ricardone"
  ($2,65M, `youth_other_sports_expense`) — la Memoria solo confirma la escrituración del predio ese
  año, no qué actividad aloja; (b) "Concesiones" ($1,59M) y "Derechos de fútbol" ($2,62M), dentro de
  Fútbol Profesional, son demasiado genéricos para una categoría propia — cargados en `other_income`.
  Los 2 montos son chicos frente al total ($775M de ingresos). No se encontró cantidad de socios en
  ninguna de las 98 páginas.
- **Banfield (`banfield-ar`)**, Ejercicio 2019-20: (a) "Entradas Grales., Plateas, Palcos y Abonos"
  ($22,28M) mezcla entrada por partido con abono/season ticket en una sola línea, no separable con
  este documento — cargada entera a `matchday_competition`; (b) "Formación de Jugadores" ($50,31M) y
  "Fútbol Amateur - Derechos" ($4,55M) se cargaron a `player_sales` con confianza razonable pero no
  total — **vale preguntarle al club si son solidarity payments FIFA/derechos de formación puros o
  otra cosa**. No se encontró cantidad de socios en el documento. Pendiente además (ya anotado en
  `fuentes/Argentina/Banfield.md`): el 105° Ejercicio (2024-25) solo existe en video de YouTube, y la
  numeración de ejercicios entre el 116° y el 105° es inconsistente entre los 2 documentos del club.
- **Gimnasia y Esgrima LP (`gimnasiaesgrima-ar`)**, Ejercicios 2023-24 y 2024-25: "Incremento Valor
  Jugadores FP" ($2.900,94M en 2024; $2.051,11M en 2025), fila nueva desde 2024 sin sub-ítems ni nota
  que la explique, distinta de "Ventas Jugadores" (que existe aparte). Por el nombre podría ser una
  revaluación no-cash del valor de jugadores formados en el club (el balance 2023 menciona
  capitalizar el costo de formación al firmar el primer contrato profesional), pero no hay forma de
  confirmarlo con lo que dice el documento — cargada a `other_income` a falta de mejor categoría.
  **Vale preguntarle al club qué es exactamente esta línea.** Tampoco se encontró cantidad de socios
  en ninguno de los 9 documentos, y el Ejercicio 2022-23 (136°) quedó sin gestión asignada (la
  Comisión Directiva cambió a mediados de ese ejercicio, sin fecha exacta de asunción).

## América Mineiro (`americamineiro-br`), Brasil — onboarding 2023/2024/2025, sesión 2026-09-24

- **"Outras receitas operacionais"** (Consolidado: +R$55,2M en 2024, +R$31,7M en 2025, ~30-53% del
  revenue de esos 2 años): ítem grande que ningún balance desglosa en sub-ítems. Coincide en magnitud
  con la caída de "Receitas com transferência de atletas" fuera de "Receita operacional líquida" a
  partir de 2024 (el balance 2024 reexpresó su comparativo 2023 quitándole R$61,3M de esa línea), y el
  club tiene de fondo un contrato de inversión con la Liga Forte União (LFU) sobre "Direitos de
  Participação" (Direitos de Arena + Propriedades Comerciais) con instrumentos financieros derivados
  asociados (Nota 7 del balance 2024). **Vale preguntarle al club si esta línea es efectivamente
  ingreso relacionado a transferencias/derechos de jugadores** (en cuyo caso debería recategorizarse a
  `player_sales` en vez de `other_income`) **o si es otra cosa** (ganancia por la renegociación de
  derechos de participación con el inversor LFU, revaluación de instrumentos financieros, etc.). Se
  cargó conservador a `other_income` en los 3 años (2023 no tiene esta línea).
- **"Receitas de transmissão e de imagem e desempenho"** (línea combinada, presente en los 3 años,
  entre 22% y 32% del revenue): título mezcla TV/derechos de transmisión ("transmissão", confirmado
  por la Nota de receitas a realizar que detalla un contrato de TV con la Liga Forte Futebol) con
  "imagem e desempenho" (¿derechos de imagen? ¿premios por desempeño deportivo?), sin desglose en
  ningún balance. Se cargó entera a `broadcasting` por ser el término dominante del título. **Vale
  preguntarle al club qué proporción es TV pura vs. imagen/desempeño** — si "desempenho" resultara ser
  premios por rendimiento deportivo, una porción debería ir a `competition_bonus` en cambio.
- **"Receitas com atividades sociais da entidade"** (línea chica, 0,4%-2,9% del revenue según el año):
  no queda claro si es cuota de socios (`member_dues`) o ingreso de eventos/actividades sociales
  genéricas del club (que es multideportivo, no solo fútbol). Se cargó a `other_income` por default
  conservador. Impacto bajo en los totales, no urgente.
- **Depreciações e amortizações, 2024/2025**: en 2023 se pudo desagregar en `player_amortisation`
  (amortización de atletas) vs. `depreciation` (inmuebles) cruzando la Nota 20 con la Demonstração do
  Fluxo de Caixa (cierra exacto). En 2024 ese mismo cruce NO cierra (el flujo de caja trae R$9,26M en
  3 ítems de D&A, pero la Nota 21 solo imprime -R$5.431.895 para la línea combinada) — hay de por
  medio un ajuste "Ajuste intangível adequação NBC ITG 2003" (-R$9.720.361, contra patrimonio
  directo, no por resultado) que probablemente rompe la correspondencia. En 2025 el balance ni
  siquiera trae una línea de D&A separada (todo cae dentro de "Despesas administrativas", sin
  desglose). Se dejó la línea combinada de 2024 entera en `depreciation` sin forzar el split. **No es
  necesariamente una pregunta para el club** (es más bien releer los balances 2024/2025 con más
  detalle, o cruzar contra las notas de Imobilizado/Intangível de cada año), pero queda como pendiente
  técnico si se quiere mayor precisión en el bucket "Compra de jugadores" de Formato Simplificado.
- **Resultado operacional antes do resultado financeiro, balance 2025, pág. 10 del PDF**: imprime
  -R$58.842.916, que NO reconcilia ni con la Nota 23 ("Divulgação adicional do resultado", que suma
  por segmento a -R$53.842.916) ni con el Superávit/Déficit final (-R$60.354.558, que solo cierra si
  se parte de -R$53.842.916 + Resultado financeiro -R$6.511.643). Se usó -R$53.842.916 (el valor que
  reconcilia por dos caminos independientes) por considerarlo un typo de imprenta en esa celda
  puntual — no se cargó ninguna línea directamente de esta cifra, así que no afecta los datos
  cargados, solo se documenta por si alguien vuelve a este balance y se pregunta por la discrepancia.
- **Gestión/presidencia**: el balance 2023 nombra a Alencar Magalhães da Silveira Junior como
  "Presidente do Conselho de Administração", pero no se confirmó que sea el mismo cargo/persona en
  2024 y 2025 (o si el cargo relevante para la SAF es otro, ej. un CEO/Diretor distinto del Conselho
  de Administração de la associação) — `gestionesByClub['americamineiro-br']` quedó con una entrada
  genérica "sin confirmar" para los 3 años. No se encontró cantidad de socios en ninguno de los 3
  documentos (`memberCountByClub['americamineiro-br'] = null`).

## Unión Magdalena (`unionmagdalena-co`), Colombia — onboarding 2018, sesión 2026-09-24

- **"Amortización de Ingreso Dimayor"** (Nota 24, $239,521 M COP): el estado financiero 2018 nombra
  esta línea junto a "Participación Dimayor" pero nunca explica el concepto (probablemente
  reconocimiento diferido de un contrato plurianual con la Dimayor). Se cargó a `broadcasting`, mismo
  bucket que "Participación Dimayor", por ser lo más cercano disponible — pero con más incertidumbre
  que el resto de las líneas de este ejercicio (que reconciliaron exacto, sin ningún residuo). **Vale
  preguntarle al club (o a la Dimayor directamente) qué contrato es este** antes de confiar en la
  categorización si en el futuro se carga otro ejercicio del mismo club y aparece de nuevo.

## Atlético Mineiro (`atleticomineiro-br`), Brasil — onboarding 2023/2024/2025, sesión 2026-09-24

- **"Outras receitas atividades esportivas" (Timemania)**: la Nota de revenue dice "substancialmente"
  es receita de Timemania (lotería federal de clubes brasileños), sin confirmar si es el 100% o si
  incluye algo más. El monto creció mucho año a año (0,196 M en 2023 -stub period-, 11,223 M en 2024,
  77,064 M en 2025 — un salto de 7x en un solo año) sin que el documento explique el salto. Se cargó
  entero a `other_income` los 3 años. **Vale preguntarle al club qué explica el salto 2024→2025** (¿un
  cambio en el reparto de Timemania entre clubes? ¿otro ítem sumado a esa línea que el rótulo no
  refleja?) antes de asumir que es 100% comparable entre años.
  - Nota adicional: revisando cifras oficiales de Timemania (distribución entre ~80 clubes
    beneficiarios, reparto según performance/audiencia), un salto de 7x en un solo año para un único
    club es estadísticamente inusual para una lotería con reglas de reparto relativamente estables.
    Reforzaría la hipótesis de que la línea "Outras receitas atividades esportivas" 2025 incluye algo
    más que Timemania pura (quizás una porción de la cesión de derechos de transmisión de la Nota 26a,
    o un ajuste puntual) — no se pudo confirmar en el documento disponible. Mantener la pregunta.
- **CVM / debêntures**: resuelto en gran parte (ver comentario de cabecera de
  `data/atleticomineiro-br-data.js` y `fuentes/Brasil/Atletico Mineiro.md`) — la SAF emitió 60.000
  debêntures reales (R$60M nominal) el 25/09/2024, quirografárias, 3,50% a.a., vencimiento 25/09/2027.
  Lo que NO se confirmó en el documento es bajo qué instrução CVM exacta se hizo la oferta
  (probablemente Instrução CVM 476, oferta restrita a investidores profissionais, pero es una
  inferencia por patrón — no está escrito en el balance). Si se necesita el dato exacto, habría que
  buscarlo en el próprio instrumento de emissão de debêntures (escritura), no en las demonstrações
  financeiras.
- **"Custo com atletas negociados"** (Nota "Custo com atividades esportivas", crece de -1,567 M en
  2023 a -66,898 M en 2024 y baja a -30,979 M en 2025): el documento no explica qué compone esta línea
  más allá del nombre (¿comisiones de intermediarios? ¿pérdida contable en la venta -valor libro del
  pase vs. precio de venta-? ¿indemnizaciones a jugadores salientes?). Se cargó conservador a
  `other_expenses` (no a `player_amortisation`, que ya tiene su propia línea "Amortização dos direitos
  econômicos" separada). El salto 2024 (66,898 M, año con las ventas de Cristian Pavón, Jemerson y
  otros según la Nota 26 de "Outras receitas operacionais") sugiere que puede estar correlacionado con
  el volumen de ventas de ese año — vale la pena preguntarle al club el desglose exacto si se vuelve a
  tocar este club.
- **Cambio de presidencia sin nota de prensa**: se confirmó por firma en el propio balance (Bruno
  Muzzi firma 2023 y 2024, Pedro Daniel firma el Relatório Integrado 2025) pero no se buscó
  externamente la fecha exacta de la transición ni el motivo — si se necesita esa precisión (ej. para
  `gestionesByClub` con fecha de asunción), haría falta una búsqueda de prensa aparte.
- No se encontró una cifra total de sócios/sócio torcedor en ninguno de los 3 documentos
  (`memberCountByClub['atleticomineiro-br'] = null`).

## Athletico Paranaense (`athleticoparanaense-br`) y Vitória (`vitoria-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

- **Athletico Paranaense — "Custo das Operações de Eventos" (Nota 19, -3,085 M en 2024, -10,116 M en
  2025) y "Custo de Transmissão" (Nota 19, solo 2025, -0,404 M)**: se cargaron a `admin_general_expense`
  por descarte (no hay categoría más específica para "costo de operar eventos no futbolísticos en la
  Arena" ni para "costo de producir la transmisión propia"), pero no se confirmó con el club qué
  actividades concretas componen "Operações de Eventos" (¿recitales? ¿alquiler de la Arena a
  terceros?) — el salto de 3,085 M a 10,116 M en un año (+228%) no tiene explicación en el documento.
- **Vitória — "Premiações e outras" (Nota 23, 32,404 M en 2025, ~18% del revenue del segmento
  futebol)**: la nota (d) dice que mezcla "premiações recebidas... pela participação e/ou pela
  qualificação em fases seguintes da Copa do Brasil e Copa Nordeste" CON "recebimentos ligados ao
  programa de sócio torcedor", sin desglosar cuánto es cada concepto. Se cargó la línea entera como
  `competition_bonus` (por ser el concepto "básico" según la redacción de la nota), pero
  conceptualmente una porción debería ir a `member_dues`. Vale la pena preguntarle al club el
  desglose exacto entre premios deportivos y cuotas de socio-hincha si se vuelve a tocar este club o
  se carga un ejercicio nuevo con la misma estructura.
- **Vitória — inconsistencia real entre la Nota 29 y la DRE impresa** (ver el comentario de cabecera
  completo en `data/vitoria-br-data.js`): la Nota 29 declara que desde 2025 las transações com
  atletas y su costo directo ("Custo das transações com atletas", -10,208 M) se reconocen juntos en
  "Outras receitas e despesas" del segmento clube social, pero el total que imprime esa nota
  (43,514 M) NO coincide con lo que imprime la DRE para esa misma línea (53,724 M) — la diferencia
  exacta (10,208 M) coincide con el "Custo das transações com atletas". Cruzando con la Nota 27
  (Despesas diretas, segmento futebol) se confirmó que esa diferencia está efectivamente sumada
  dentro de "Diretas" (-92,391 M impreso vs. -82,183 M que da la propia Nota 27 sin ese costo). Se
  cargó siguiendo la DRE real (que es la que reconcilia con el Déficit final auditado), no la
  redacción literal de la Nota 29(a) — pero esto es una inconsistencia interna real del documento
  auditado (no un error de transcripción de esta sesión), y valdría la pena preguntarle al club/al
  auditor (RSM Brasil) cuál de las 2 lecturas es la correcta para la próxima vez que se publique un
  balance con la misma estructura.
- **Vitória — "Premiações e outras" también incluye, según la nota (d), la aclaración de que "durante
  o ano de 2024 o Clube atingiu marca de 42 mil sócios"** — no se cargó como `memberCountByClub`
  (queda `null`) porque es un umbral alcanzado durante 2024, no un conteo puntual al cierre de 2025
  (el ejercicio cargado). Si se necesita esta cifra con precisión, valdría la pena pedirle al club el
  conteo de sócios activos al 31/12/2025 exacto.
- Ninguno de los 2 clubes confirma fecha de elección/mandato del presidente que firma el balance
  (Mario Celso Petraglia en Athletico Paranaense, Fabio Rios Mota en Vitória) — `gestionId:
  'sinconfirmar'` en los 2, mismo criterio que el resto de los clubes brasileños cargados hasta
  ahora. No se encontró cifra de socios de Athletico Paranaense en ningún documento
  (`memberCountByClub['athleticoparanaense-br'] = null`).

## RB Bragantino (`rbbragantino-br`), Brasil — onboarding 2019/2024, sesión 2026-09-24

- **"Custo do departamento de futebol"** (línea grande, ambos años) casi con certeza mezcla sueldos
  del plantel con amortización de derechos económicos de jugadores, pero el balance no trae las
  Notas explicativas que la desagreguen (solo el Balanço/DRE primarios se transcribieron) — se
  cargó entera a una sola categoría sin poder separar la porción salarial de la porción de
  amortización. **Vale pedirle al club (o buscar si existe una versión con notas completas) el
  desglose real de esta línea**, sobre todo para 2024 (año con plantel más caro, post-recompra por
  Red Bull).
- **2019: la tabla del Passivo (circulante/não circulante) se reconstruyó por orden de impresión
  cruzando contra los subtotales**, no confirmando cada rubro contra su propio rótulo — el PDF
  original era vectorial sin capa de texto real (ver comentario de cabecera de
  `data/rbbragantino-br-data.js` y el gotcha en `fuentes/Brasil/RB Bragantino.md`). El DRE (de donde
  sale el tie-out de Revenue/Expenses/PAT) sí cerró exacto, así que el riesgo queda acotado a
  `grossDebt`/`cash` de ESE año puntual, no a los ingresos/gastos. Si en el futuro aparece una copia
  más legible del PDF de 2019, vale la pena re-verificar esas 2 cifras.
- Se sabe que existen al menos 2 documentos más del club en Wayback Machine (balance 2022 y un año
  sin identificar todavía) que no se bajaron esta sesión — quedan para una sesión futura de
  sourcing/transcripción.

## Corinthians (`corinthians-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

- **"Premiações, Fiel Torcedor, Loterias e Outras"** (2024 solamente, el documento 2025 SÍ separa
  estos 4 conceptos): mezcla premios deportivos, programa de socios-hinchas, lotería (Timemania) y
  otros ingresos sin desglose. Se cargó entera a `other_income`. **Vale pedirle al club el desglose
  retroactivo 2024**, ya que 2025 muestra que el dato existe internamente.
- **"Custo com vendas e aquisição de atletas"** (2024) y **"Despesa na cessão de atletas"** (2025):
  sin nota propia de detalle en ninguno de los 2 balances — se asumieron como comisiones/costos de
  transacción (`other_expenses`) sin confirmación documental de su composición exacta.

## Palmeiras (`palmeiras-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

- **"Acordos e despesas legais e judiciais"** (2024, R$73,910 mil, ~47% de la columna "Despesas
  gerais e administrativas" de fútbol profesional): un monto grande y puntual dentro de un rubro
  administrativo genérico. Se dejó en `admin_general_expense` por no haber un ítem `exceptional_items`
  ya establecido para Palmeiras (a diferencia de Corinthians/Botafogo/Atlético Mineiro). Podría
  ameritar reclasificación a `exceptional_items` en una sesión futura si se confirma que es un litigio
  puntual no recurrente.
- **`grossDebt`** (línea "Empréstimos e financiamentos") es chica frente a "Antecipação de contratos"
  (factoring de recibíveis futuros, R$452-633 M según el año), que el propio balance categoriza
  aparte del préstamo bancario — documentado en el comentario de cabecera para que no se asuma que
  `grossDebt` captura toda la deuda financiera real del club.

## São Paulo (`saopaulo-br`), Brasil — onboarding 2023/2024, sesión 2026-09-24

- **"Direitos de transmissão de TV/Premiações"** (línea combinada, sin desglose en ningún balance —
  a diferencia de Flamengo/Botafogo, que sí separan TV de premios): material, ~35-40% del bloque
  "Futebol profissional" (R$259,4 M en 2023 / R$239,4 M en 2024). Cargada entera a `broadcasting`.
  Un desglose real necesitaría venir del club.

## Santos (`santos-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

- **Deuda financiera sin línea 100% pura**: la Nota 11 "Empréstimos e Antecipação de recebíveis"
  mezcla préstamos bancarios reales con factoring contra cuotas futuras de la Federação Paulista
  (2024: R$129,591 M; 2025: R$94,338 M). Es la línea más angosta disponible, pero no es deuda
  bancaria pura — documentado en el comentario de cabecera.
- **Caja extremadamente baja** (R$170 mil en 2024, R$295 mil en 2025): no es error de transcripción
  — el propio Relatório da Administração dedica varios párrafos a la crisis de liquidez del club
  (déficit financiero de R$62 M a fines de 2023). Vale la pena que se lea en el sitio como hallazgo
  real, no como un número sospechoso.
- **"Receitas com manutenção e frequência"** se categorizó como `member_dues` por ser lo más cercano
  a cuota social (ligada al Programa "Sócio Rei", Nota 7.1), pero el documento no lo llama
  explícitamente "cuota social" — inferencia razonable, no 100% certera.

## Internacional (`internacional-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

- **"Realização da cessão por direito de exploração"** (~R$19,5 M/año, cargada a `other_income`):
  ligada a un contrato de 2012 de construcción/operación del Complexo Beira-Rio, pero no queda claro
  por qué amortizar ese pasivo genera un INGRESO en el resultado en vez de reducir un activo — el
  documento no lo explica.
- **"Estacionamento"** (línea chica, cargada conservadoramente a `other_income`): probablemente
  estacionamiento del Beira-Rio en día de partido, pero el rótulo no nombra el estadio explícitamente,
  así que por el criterio conservador de `stadium_other` no se categorizó ahí.
- Las Notas 22 y 23 del balance 2025 no suman exacto contra su propio subtotal impreso (diferencias
  de R$20 mil y R$1 mil) — no se pudo identificar qué línea puntual tiene el error de redondeo del
  propio documento.

## Fluminense (`fluminense-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

- **Opinión de auditoría CON SALVEDAD en 2025** (BDO, firmada 30/4/2026): la Administración decidió
  NO reconocer un ajuste contable por la recompra parcial de derechos vendidos a la Liga Forte União,
  que según el auditor subestima resultado/patrimonio en R$110,427 M. Es la explicación más probable
  de una "regularización" que menciona la prensa (otempo.com.br, junio 2026, citando un aviso de la
  Anresf) — pero el documento cargado nunca menciona a la Anresf y su fecha es POSTERIOR a la nota de
  prensa. **Pregunta abierta: ¿existe una versión posterior/corregida en transparenciafluminense.com.br?**
  Vale la pena rechequear en una sesión futura.

## Fortaleza (`fortaleza-br`), Brasil — onboarding 2025, sesión 2026-09-24

- **"Luvas"** (línea de ingreso, R$1,133 M, Nota 17): sin categoría clara — cargada a `other_income`.
  Podría ser un ingreso tipo bono de fichaje, valdría confirmarlo con el club.
- **"Multas rescisórias de atletas"**: aparece simétrica en ingresos (2,227 M) y gastos (12,682 M) —
  cargada a `other_income`/`other_expenses` en vez de forzarla a `player_sales`/`player_amortisation`,
  por tratarse de penalidades contractuales, no ventas/amortización. Confirmar si se repite en
  ejercicios futuros del club.

## Bahia (`bahia-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

- **"Sócios e bilheteria" nunca se separan** en ninguna nota de ningún año, pese a que la Nota
  17(b) del balance 2025 confirma que son 2 flujos de ingreso reales y distintos. Se cargó la línea
  combinada a `matchday_competition`, lo que deja "Cuotas Sociales" en $0 para Bahia en Formato
  Simplificado. Vale la pena pedirle al club el desglose.
- **Amortización de pases 2024 no viene desglosada** en el balance tal cual se presentó ese año (la
  Nota 16 "Custo das Atividades" solo tiene 4 líneas sin una de "Amortização" separada), aunque el
  flujo de caja confirma que existe (R$98,430 mil de amortización no-efectivo). Se usó como proxy la
  línea "Custos com negociação" (R$97,272 mil, muy cercana), inferida cruzando contra la propia
  reexpresión que el balance 2025 hace de 2024 (Nota 2.20) — documentado como inferencia, no lectura
  literal del documento 2024 tal cual se presentó.

## Chapecoense (`chapecoense-br`), Brasil — onboarding 2021, sesión 2026-09-24

- **Inconsistencia real del propio documento entre 3 lecturas del resultado del ejercicio**: la
  Demonstração do Superávit/Déficit impresa (pág. 7, imagen dentro de un PDF de texto nativo) dice
  -R$59,564 M; el Estado de Flujo de Efectivo dice -R$59,184 M; y la suma de las Notas explicativas
  detalladas (cada una reconciliando exacta contra su propio subtotal) da -R$59,872 M. Las 3 caen
  dentro de ~1% entre sí — ver el comentario extenso de cabecera de `data/chapecoense-br-data.js`
  ("INCONSISTENCIA DE FUENTE") para el detalle completo. Se usó -59,872 como `officialPAT` (el valor
  que reconcilia con los datos efectivamente cargados) en vez del titular de la pág. 7, para que
  `verifyTieOuts()`/`tools/audit.js` no fallen por un defecto real del documento. **Candidato fuerte a
  mail al club** (o a la Federação Catarinense) pidiendo una versión corregida o una aclaración.
- La tabla de "Empréstimos" del Passivo (pág. 6, también imagen) muestra 10,837 M circulante para
  2021, pero la Nota 18 (texto nativo, con desglose verificable por institución financiera) muestra
  8,310 M — se usó la cifra de la Nota 18 para `grossDebt`, mismo criterio que el resto del archivo
  (preferir texto nativo con desglose sobre una imagen sin desglose).

## Vasco da Gama (`vascodagama-br`), Brasil — onboarding 2023, sesión 2026-09-24

- **HALLAZGO IMPORTANTE, afecta el alcance de esta carga**: el documento que se esperaba usar para
  2024 (`dre-balanco-patrimonial-2024.md`, "Vasco da Gama SAF DRE e Balanço Patrimonial 2024") resultó
  ser, al leerlo completo, el balance de la **associação CRVG** (Club de Regatas Vasco da Gama,
  entidad SOCIAL separada de la SAF, dueña de solo el 30% de las acciones de la SAF por equivalencia
  patrimonial) — NO el balance de la SAF. Por eso esta sesión cargó un solo ejercicio (2023, auditado,
  de `demonstracoes-contabeis-2023.md`) en vez de los 2 planeados. **Falta re-sourcear el balance
  2024 real de la SAF** (la URL oficial sigue bloqueada por Cloudflare, ver `fuentes/Brasil/Vasco da
  Gama.md`) o esperar a que se publique un 2025 auditado.
- La línea "PECLD" de Gastos generales y administrativas del ejercicio 2023 salió con OCR degradado
  ("PECLD 20 (3.229)") — se reconstruyó por reconciliación como un crédito de +0,020 M (no el -3,229
  que sugería el OCR), impacto inmaterial (0,03% de G&A) pero vale una relectura manual del PDF en
  algún momento.

## Ferro Carril Oeste (`ferrocarriloeste-ar`), Argentina — onboarding Ejercicios 118/119 (2021-22, 2022-23), sesión 2026-09-24

- **"Recupero Decreto 1212/03"** (línea grande en los 2 ejercicios, $82,6 M y $184,0 M): el Decreto
  1212/03 es el régimen de retención de la AFA sobre ingresos de fútbol para aportes de seguridad
  social, pero ninguno de los 2 balances explica qué es exactamente este mecanismo de "recupero". Se
  cargó conservadoramente a `other_income`. Vale la pena preguntarle al club o a la AFA de qué se
  trata exactamente antes de recategorizarlo.

## RCD Mallorca (`rcdmallorca-es`), Real Oviedo (`realoviedo-es`) y Rayo Vallecano (`rayovallecano-es`), España — onboarding Ejercicio 2024/25, sesión 2026-09-25

- **RCD Mallorca — "Cesiones" (233.000€, dentro de "Otros ingresos")**: es ingreso por préstamo de
  jugadores a otros clubes (cesión con o sin cargo), conceptualmente más cerca de `player_sales` que
  del catch-all `other_income` donde quedó cargado. Getafe (mismo formato INFUT) SÍ la promovió a
  `player_sales` propia en su sesión de carga; acá se dejó en el catch-all por no reabrir ese criterio
  sin confirmar con Guido si conviene unificarlo retroactivamente entre los clubes españoles ya
  cargados. Vale la pena decidir un criterio único y aplicarlo parejo.
- **Real Oviedo — "Deterioro y resultado por enajenaciones" (2.771.029€) sin la palabra "jugadores"
  en su rótulo**: a diferencia de Mallorca/Rayo Vallecano (que sí dicen explícito "traspaso de
  jugadores"/"transferencia de jugadores"), este documento solo dice "Beneficios procedentes del
  inmovilizado e ingresos excepcionales"/"Pérdidas procedentes del inmovilizado y gastos
  excepcionales". Se cargó igual a `profitOnPlayerSales` por ocupar la misma posición del P&L INFUT
  estándar (y porque el inmovilizado intangible deportivo — derechos de jugadores — es la partida de
  baja más plausible para un club de este tamaño), pero no está 100% confirmado que sea
  exclusivamente venta de jugadores y no incluya, por ejemplo, una venta de inmovilizado material.
  Confirmar con la Nota de "Inmovilizado" completa del documento (no transcripta en detalle esta
  sesión) o con el club.
- **Rayo Vallecano — salvedad de auditoría (AUDRIA, S.L.)**: opinión CON SALVEDADES por la falta de
  tasación independiente del derecho de uso sobre el Campo de Fútbol de Vallecas (Convenio con la
  Comunidad de Madrid, 5/7/2019). Pregunta abierta: ¿figura ese derecho de uso en el Activo No
  Corriente del Balance (bajo qué línea) o está directamente sin reconocer? Ninguna línea
  transcripta del Balance se llama explícitamente "derecho de concesión"/"derecho de uso del
  estadio" — sería necesario revisar la Memoria completa (Nota 6, citada en la salvedad) para
  confirmarlo. No afecta los datos de Finanzas cargados (ingresos/gastos/PAT del ejercicio), solo la
  composición del activo no corriente, que este sitio no carga en detalle.
- **Rayo Vallecano — `netInterest` reconstruido por residuo, no por lectura directa**: la sección de
  Resultado Financiero de la Cuenta de Pérdidas y Ganancias perdió sus números en la extracción del
  PDF (quedaron solo las etiquetas "13. Ingresos financieros"/"14. Gastos financieros"/etc., sin
  cifra). El valor cargado (-43.409,90€) sale de restar 2 anclas confirmadas por partida doble
  (Resultado del ejercicio impreso 2 veces, menos Resultado de Explotación reconciliado exacto, menos
  el neto de la Nota de Impuesto sobre beneficios) — matemáticamente sólido, pero valdría la pena
  releer manualmente la página 10 del PDF original (no el `.md`) para confirmar el desglose
  Ingresos/Gastos financieros/Diferencias de cambio línea por línea, en vez de depender del residuo.

## Millonarios (`millonarios-co`), Colombia — onboarding 2025, sesión 2026-09-25

- **Nota 23 "Costo Deportivo y de Ventas"** agrupa en una sola línea ($45.741 M) el costo del
  personal del plantel profesional JUNTO con el personal de tienda/academias, sin desglose
  disponible en el documento. Se cargó entera a `wages_squad`, lo que probablemente sobreestima
  levemente el salario real del plantel. Vale pedirle al club el desglose por sector.

## Deportivo Pereira (`deportivopereira-co`), Colombia — onboarding 2025, sesión 2026-09-25

- **"Ingreso por actualización derecho DIMAYOR"** ($4.428,43 M, 17% del revenue): es una
  revalorización estatutaria NO efectiva del derecho de afiliación a la DIMAYOR (atada a 10.000
  SMLV), no ingreso operativo real de venta de entradas/TV/sponsors. Se cargó a `other_income`
  porque omitirla rompe la reconciliación contra el resultado impreso, pero mostrarla mezclada con
  ingresos operativos reales en la misma fila del sitio es discutible — vale la pena revisarlo si
  se repite en otro club colombiano.
- **"Trayectoria deportiva"** ($2.854,79 M, ~11% de los gastos): bonos de fichaje pagados
  nominalmente a jugadores/técnicos según su trayectoria. Categorizada `wages_squad`; podría
  argumentarse `player_amortisation` en cambio.
- **"Regalías"** ($573,46 M, ingreso): no está claro de qué es esta regalía — categorizada
  `sponsorship_commercial` por descarte. Vale confirmar con el club.
- **Gotcha de tooling nuevo**: el PDF de este club tiene texto nativo, pero TODAS las tablas
  numéricas están embebidas como imagen (captura de Excel) dentro del PDF — la transcripción
  `.md` salió en blanco para esas tablas. Se resolvió re-renderizando las páginas puntuales a
  300dpi y leyendo las tablas directo de la imagen. Si aparece otro documento de Supersociedades
  con el mismo patrón (texto nativo + tablas como imagen), aplicar el mismo método antes de asumir
  que el documento no tiene datos.

## Ponte Preta (`pontepreta-br`), Brasil — onboarding 2022/2023/2024, sesión 2026-09-25

- **2024 — línea "Depreciação/Contingência/Pept/CNRD" reconstruida, no leída limpia**: el documento
  imprime "(2.168.194)" para esta línea, que NO reconcilia contra el Superávit final. Sumando
  "22.168.194" (mismos dígitos con un "2" al principio que el OCR parece haber perdido) SÍ
  reconcilia exacto, y coincide de forma independiente con un pasivo NUEVO del balance ese año
  ("Acordos trabalhistas-Pept e CNRD", R$20,9 M, R$0 en 2023). Se cargó -22.168.194 como
  `exceptional_items`, documentado en detalle en el comentario de cabecera de
  `data/pontepreta-br-data.js`. Es una reconstrucción con buena evidencia cruzada, no un número
  leído limpio — vale la pena confirmarlo releyendo el PDF original a mayor resolución, o
  preguntándole al club la naturaleza exacta de este cargo de R$22,2 M.

## Colo-Colo (Blanco y Negro) — onboarding de Chile, sesión 2026-09-25, no bloqueó la carga

- **¿Qué cambió en el balance 2024 entre el rechazo de la junta de abril 2025 y la versión que
  finalmente circuló?**: según `fuentes/Chile/Colo-Colo (Blanco y Negro).md`, los accionistas
  rechazaron inicialmente el balance por el tratamiento contable del contrato con DG Medios, y la
  CMF debió intervenir antes de que se aprobara una versión. Se cargó el PDF que finalmente circuló
  (el único disponible), pero no se confirmó contra prensa de la época si el rechazo implicó un
  restatement de las cifras de Ingresos/TV/Publicidad o solo una nota/salvedad adicional. Vale la
  pena, si Guido quiere citar este ejercicio con más confianza, revisar cooperativa.cl/latercera.com
  de esa fecha (abril-mayo 2025) antes de tratarlo como un balance sin objeciones.

## Universidad Católica (Cruzados) — onboarding Finanzas 2022-2024 (Chile)

- **"Ingresos por Derechos de TV" separado de "Ingresos por A.N.F.P."**: la Nota 19 de los 3
  balances (2022/2023/2024) reporta 2 líneas de TV distintas. El documento aclara con nota al pie
  que "Ingresos por A.N.F.P." es la porción de derechos de televisación que la ANFP rinde
  mensualmente por el contrato colectivo ("mandato a nombre propio"), pero NO explica de dónde sale
  la segunda línea ("Ingresos por Derechos de TV") ni por qué es tan volátil entre ejercicios
  ($3.030.675 M$ en 2022, $217.415 M$ en 2024, sin relación aparente con la posición en la tabla o la
  participación en copas internacionales de cada año). Se cargaron las dos como `broadcasting`
  (mismo bucket, ambas son TV), pero valdría la pena confirmar con el club/CMF si esa segunda línea
  es reventa internacional, un contrato aparte, o algo distinto — a quién preguntarle:
  cruzados.cl/inversionistas/ o la propia área de finanzas del club.
- **"Gastos de Operación" (Nota 20, Composición de Costo de Ventas) sin ningún desglose disponible**:
  es la 2da línea más grande de Costo de Ventas después de Remuneraciones (M$4.554.467 en 2024, 25%
  del Costo de Ventas total), y ninguna otra nota del balance la abre más — se cargó completa como
  `other_expenses` (catch-all) por no tener con qué separarla en sub-categorías más útiles para
  "Formato Simplificado". Vale la pena preguntarle al club (o revisar si la Memoria Anual, que sí
  tiene texto narrativo, la detalla en algún párrafo) qué compone este rubro.

## Alianza Lima (Perú, onboarding financiero, sesión 2026-09-25)

- **Nota "Gastos deportivos: Servicios" (S/ 9-15M/año, el 2do rubro más grande de esa Nota después
  de Personal, en los EEFF 2019-2021): ¿qué compone este bloque?** La Nota no lo abre más — podría
  ser viajes/concentración/seguridad para partidos (lo que llevó a categorizarlo como
  `match_organisation_expense` en `data/alianzalima-pe-data.js`), pero también podría incluir
  servicios médicos tercerizados, comisiones de intermediación por fichajes, u otros conceptos que
  en otro club de este sitio caen en categorías distintas. Vale la pena preguntarle al club/auditor
  qué compone específicamente esta línea antes de confiar en la categorización actual para
  comparaciones entre clubes.
- **Pendiente de transcripción, no es una pregunta al club**: los EEFF 2022, 2023 y 2024 de este
  club (`Clubes/Perú/Alianza Lima/estado-financiero-2022.md`, `-2023.md`, `-2024.md`) solo tienen
  transcriptos los 4 estados financieros principales, no las Notas de desglose (que si existen,
  deberían ser equivalentes a las Notas 14-16 que sí están transcriptas en 2019-2021). Por eso
  "Otros ingresos"/"Costos deportivos" de esos 3 años quedan como una sola línea sin categorizar
  (`lump_football_operations`/`lump_football_operations_expense`). Re-OCRear esas páginas de Notas
  en una sesión futura para completar la categorización fina de esos 3 ejercicios.

## LDU Quito, Ecuador — evaluación de onboarding (NO CARGADO), sesión 2026-09-25

- **¿Existe un Estado de Resultados/Situación Financiera de la actividad de fútbol profesional en
  sí, separado del club social?** El único documento público encontrado
  (`Clubes/Ecuador/LDU Quito/`, descargado de ldu.org.ec/transparencia/) es el "Consolidado Unidad
  Educativa-Country Club y Sede Social" — 2 segmentos (colegio; country club/sede social), sin
  ninguna línea de fútbol (sin TV, sin recaudación de entradas/abonos, sin venta de jugadores, sin
  sponsors). La "Comisión Especial de Fútbol" aparece en el balance solo como saldo a cobrar
  (~$2,56 M entre activo corriente y no corriente), nunca consolidada. Pregunta para el club (o para
  ldu.org.ec/estados-financieros/, el visor tipo flipbook mensual que la sesión de sourcing de
  2026-09-13 no llegó a inspeccionar a fondo): ¿quién audita/publica el resultado del primer equipo
  de fútbol, y dónde?
- **¿Por qué el club social consolida educación + country club pero NO fútbol, si legalmente LDU
  Quito sigue siendo una asociación civil (ninguna S.A.D.P. ecuatoriana está operativa todavía, ver
  `fuentes/Ecuador/_notas-generales.md`)?** Si el club social y el "dueño" del fútbol profesional son
  la misma persona jurídica hoy (no puede haber una S.A.D.P. separada si la figura no existe aún en
  Ecuador), ¿por qué el fútbol se reporta aparte con solo un saldo intercompany? ¿Hay una fundación o
  comisión con estados contables propios que sí se puedan conseguir?

## Club Deportivo Cuenca, Ecuador — evaluación de onboarding (NO CARGADO), sesión 2026-09-25

- **¿Existe un balance/estado de resultados devengado auditado del ejercicio 2025 completo (o de
  algún ejercicio anterior), más allá del informe de caja de enero-junio 2026?** Los 2 documentos
  encontrados (`Clubes/Ecuador/Deportivo Cuenca/`, vía nota de prensa del propio club) son: una
  serie histórica de pagos SRI/IESS (2021-2026, sin ingresos/gastos operativos) y un informe de caja
  de 4 cuentas bancarias de solo el primer semestre de 2026 (no el ejercicio completo, y mezcla
  financiamiento con operación). Ninguno alcanza para tie-out contra un Resultado del ejercicio.
- **"Remuneraciones y obligaciones de plantilla" (USD 1.091.286) vs. "Sueldos y remuneraciones" (USD
  92.981)**: el informe de movimientos bancarios (pág. 3) lista ambas como líneas de salida
  SEPARADAS, sin aclarar la diferencia entre las dos categorías salariales. ¿La primera es plantel
  profesional y la segunda personal administrativo/no futbolístico? ¿O es una está en base devengado
  y la otra en pagos de caja del semestre? (pregunta ya anotada por la sesión de sourcing del
  2026-09-13, se repite acá porque sigue sin resolver y sería relevante si en el futuro aparece un
  documento cargable de este club).

## Wolverhampton Wanderers (Inglaterra) — onboarding 2023-24/2024-25, sesión 2026-09-25

- **El ejercicio "2025" cubre 13 meses, no 12** (1/6/2024 a 30/6/2025): la compañía cambió su fecha de
  cierre de ejercicio de 31 de mayo a 30 de junio, y el documento disponible es el período de
  transición completo, no un año calendario normal. Se cargó igual (la alternativa era dejar a Wolves
  con un solo ejercicio real), documentado en detalle en el comentario de cabecera de
  `data/wolves-gb-data.js`. Pregunta para Guido: ¿preferís una nota visible de "13 meses" en el sitio
  para este ejercicio, o alcanza con la documentación interna? Cualquier comparación año a año entre
  2024 (12 meses) y 2025 (13 meses) va a sobreestimar el crecimiento real de este club.

## Aston Villa (Inglaterra) — onboarding 2024-25, sesión 2026-09-25

- **Limitación estructural genuina, no un error de carga**: a diferencia de TODOS los demás clubes
  ingleses cargados, esta entidad (`Aston Villa Football Club Limited`, cuentas individuales, no
  consolidadas) no tiene NINGÚN activo intangible en su balance ni reporta ninguna línea de
  amortización/deterioro/venta de pases — cero mención de compraventa de jugadores en todo el
  documento. El costo del plantel profesional casi con certeza vive en otra entidad del grupo NSWE
  (NSWE UK Limited / NSWE Sports Limited), que no deposita cuentas separadas en Companies House. El
  93,2% de "Operating expenses" (£404M de £433M) no tiene ningún desglose y se cargó como
  `lump_football_operations_expense`. Consecuencia visible: el sitio va a mostrar para Aston Villa
  "Salarios y primas"/"Compra de jugadores" con muy poca representación real, aunque el Revenue y el
  Resultado neto SÍ sean correctos. No hay nada que preguntarle al club — es la estructura societaria
  real, documentada así en el propio balance auditado — pero vale la pena que quien lea este club en
  el sitio sepa que el desglose de gastos es menos confiable que el de otros clubes ingleses.

## Brentford (Inglaterra) — onboarding 2023-24/2024-25, sesión 2026-09-25

- **Ejercicio 2023-24, Nota de intereses pagados con un total que no reconcilia**: el documento
  imprime un total de intereses pagados (£6,020M) que no coincide con la suma de sus propios 2
  componentes desglosados. Se usó £5,020M (la suma exacta de los 2 componentes, y el único valor que
  hace cerrar "Loss before taxation" contra el total impreso) — mismo patrón de error de imprenta/OCR
  ya visto en otros documentos de este tipo. Vale la pena confirmar contra el PDF original si se
  quiere citar este ejercicio con más certeza.

## Newcastle United (Inglaterra) — onboarding 2024-25, sesión 2026-09-25

- **% exacto de propiedad PIF/Reuben Brothers tras la salida de Amanda Staveley**: el balance no lo
  declara (solo dice que PIF es la "ultimate controlling party"), solo prensa secundaria confirma
  ~85%/~15%. Si Guido quiere precisión legal, habría que chequear el registro de PSC (persons with
  significant control) de Companies House para Newcastle United Limited.
- **"Profit on disposal of tangible fixed assets" (£128,975m, sale-and-leaseback de St James' Park a
  PZ Holdings Ltd) está sujeto a revisión de la Premier League**: la Nota 3 del documento dice
  explícito que si la valuación de mercado de la Premier League difiere de los £172,1m usados, "the
  directors may need to adjust the sales price which would result in a profit or loss on disposals
  reported in the 2026 accounts" — este número podría cambiar retroactivamente en el balance 2025-26.

## Crystal Palace (Inglaterra) — onboarding 2023-24/2024-25, sesión 2026-09-25

- **`brandColor` sin resolver**: camiseta a franjas verticales rojo y azul desde 1973 ("Red and
  Blues"), sin que ninguna fuente consultada (footylogos, Wikipedia) declare cuál de los dos
  predomina — mismo caso que Levante. Quedó `brandColor:null`. Candidatos si Guido quiere elegir:
  azul `#1B458F`/`#0055A5` o rojo `#C4122E`/`#EE2E24` (distintas fuentes dan valores levemente
  distintos, siempre en la misma familia).
- **`firstYear` de la gestión Parish/Blitzer-Harris/Textor**: no verificado con certeza (Blitzer/
  Harris entraron ~2015, Textor como mayoritario ~2021) — se usó un solo `gestionId` sin firstYear
  preciso por prudencia.

## Fulham (Inglaterra) — onboarding 2023-24/2024-25, sesión 2026-09-25

- **"Gate Receipts" 2025 con valor forzado por el total**: la transcripción OCR trae un número que no
  reconcilia contra Turnover total menos las otras 4 líneas — se usó el valor matemáticamente forzado
  (15,010), consistente con un patrón de error OCR 1↔4 ya visto en el documento 2023-24 del mismo
  club. Confirmar contra el PDF original, pág. 24, columna 2025, antes de citar esta cifra con más
  confianza.
- **`grossDebt`**: la única partida "deuda-like" es un préstamo del dueño sin interés y "repayable
  on demand" (Amounts due to immediate parent company: £44,398m en 2024, £0 en 2025, convertido a
  equity). Se usó tal cual, pero es discutible tratarlo como deuda financiera real dado que no
  devenga interés — decisión pendiente de Guido si se quiere un criterio distinto para este tipo de
  préstamo intra-grupo.
- **"Compensation" (£0,873m 2024 / £4,013m 2025, creciendo)**: "sums from collaboration agreements
  with other Clubs and remediation of lost income" — categorizado como `other_income` a falta de
  mejor opción. Vale la pena confirmar si está relacionado a la obra del Riverside Stand.

## Leeds United (Inglaterra) — onboarding 2023-24/2024-25, sesión 2026-09-25

- **Amortización de intangibles no-jugador con reversión de "negative goodwill" en 2025**: en 2024 la
  amortización no-jugador (goodwill/trademarks/software) suma +£0,231457m (normal), pero en 2025 la
  reversión de negative goodwill (-£0,921580m) supera esa suma y da un CRÉDITO neto de -£0,651431m.
  Se absorbió en el catch-all `other_expenses` en vez de crear una línea con signo positivo
  (antinatural en un array de gastos) — ¿está bien este criterio para casos futuros con negative
  goodwill?
- **Atribución de gestión en FY2024 (cambio de dueño a mitad de año)**: Aser/Radrizzani controlaron
  ~3 meses, 49ers Enterprises los ~9 restantes y al cierre — se usó un solo `gestionId` (49ers) en
  vez de partir el ejercicio en dos gestiones. ¿Confirma este criterio?

## Chelsea (Inglaterra) — onboarding 2024-25, sesión 2026-09-25

- **"Cost of sales" (£428,673m) sin desglose de wages vs. resto**: a diferencia de Everton/Arsenal,
  Chelsea no tiene una línea "Staff costs" propia en ninguna nota. Se cargó el total a `wages_squad`
  por ser la aproximación más fiel al texto narrativo ("principally... increased cost of sales
  including player wages"), pero es discutible — la Nota 8 "Employees" da un costo total de personal
  del grupo (£359,265m) que mezcla plantel (133 personas) con administración/comercial (929
  personas), sin costo por área, así que tampoco resuelve el problema con precisión.
- **Gap no explicado (£1,646m, 0,7%) entre el P&L y las notas de amortización/deterioro de pases**:
  el P&L imprime -224,344 para esa columna combinada; la Nota 6 desglosa amortización (213,893) +
  deterioro (12,097) = 225,990. Se usó el número del P&L porque es el único que hace cerrar el
  resultado exacto — el origen de la diferencia no está explicado en el documento.
- **`grossDebt`**: Chelsea no tiene ninguna línea de deuda bancaria — se usó `grossDebt:0`, excluyendo
  los £396,135m de "transfer fee payables" (trade creditors por pases) siguiendo el criterio estricto
  de la sección 14 del skill. Muchos análisis de finanzas de fútbol tratan esos payables como deuda
  económica real — decisión pendiente si Guido prefiere ese criterio alternativo.

## Levante UD (España) — onboarding 2024-25, sesión 2026-09-25

- **`brandColor` sin resolver**: el kit es a mitades verticales azul y granate ("azulgrana", mismo
  patrón de nombre que Barcelona pero con las mitades invertidas), sin que ninguna fuente consultada
  (footylogos, Wikipedia) declare cuál de los dos predomina — mismo caso que Crystal Palace
  (rojo/azul en franjas, sin desempate posible con las 4 reglas del skill). Quedó `brandColor:null`
  en `data/clubs.js`. Candidatos de hex si Guido quiere elegir uno: azul `#005CA5` / granate `#B4053F`
  (footylogos.com).

## Brighton & Hove Albion (Inglaterra) — onboarding 2023-24/2024-25, sesión 2026-09-25

- **Restatement del ejercicio 2024 (impuesto diferido), ¿usar la cifra original o la restated?** El
  documento del ejercicio 2024/25 (Nota 27, "Prior period adjustment") reconoce retroactivamente un
  activo por impuesto diferido de £22.897k que el balance de 2023/24 no había reconocido, lo que sube
  el resultado neto de ESE ejercicio de £56.065m (como se depositó originalmente en Companies House,
  19/12/2024) a £73.369m (columna "2024 (As restated)" del documento de 2025). Se cargó la cifra
  ORIGINAL (56.065), tal cual el propio documento del ejercicio 2023/24 la declaró — mismo criterio
  de "cada ejercicio usa su propio documento primario" que ya rige para las reexpresiones por
  inflación de los balances argentinos, aunque este caso es distinto (una corrección de error
  contable real, no una reexpresión por poder adquisitivo). La corrección NO afecta Turnover/
  Operating expenses/Player trading/Interest, solo Tax y el resultado neto. ¿Preferís reflejar la
  cifra restated (73.369) en su lugar, ya que es la que BDO LLP considera la correcta con
  retrospectiva completa? Ver el comentario extenso en `data/brighton-gb-data.js`.

## Países Bajos (Ajax, PSV, Feyenoord, AZ) — onboarding 2023/24-2024/25, país nuevo, sesión 2026-09-25

- **Feyenoord — línea "Partnerships, business seats, units en boarding" (Netto-omzet, nota 3.1)**:
  45,238M€ en 2024/25 (39,593M€ en 2023/24), ~20-28% del ingreso operativo, mezcla en una sola línea
  sponsors/valla publicitaria (`sponsorship_commercial`) con paquetes de temporada premium tipo
  business-seats/units (que en Ajax y PSV son `season_tickets`) — el documento no la desglosa en
  ningún lado (a diferencia de Ajax, que sí separa "Seizoenkaarten" de "Business-seats en
  skybox-plaatsen" como líneas propias). Se cargó entera como `sponsorship_commercial` (el rótulo
  "Partnerships" lidera y "boarding" es publicidad, pero la porción de "business seats/units" bien
  podría ser mayoritariamente `season_tickets`). ¿Feyenoord puede aclarar qué proporción de esa línea
  corresponde a cada concepto? Ver comentario de cabecera de `data/feyenoord-nl-data.js`.
- **AZ — línea "Verhuur spelers en detachering personeel"** (0,698M€/0,687M€, chica): mezcla ingreso
  por cesión/préstamo de jugadores con secondment de personal, sin desglose — se cargó a
  `other_income` por ser mixta y chica, en vez de forzarla a `player_sales`. No amerita mail (monto
  irrelevante), queda anotado por si alguna sesión futura encuentra el desglose en otro documento.
- **Los 4 clubes son sociedades cotizantes/holdings sin negocio no-futbolístico** (a diferencia de
  los clubes argentinos, que son asociaciones civiles multideportivas): "Cuotas Sociales",
  "Educación" y "Otras secciones deportivas" dan $0 en Formato Simplificado para los 4 — confirmado
  que es correcto (no un hueco de categorización) al no encontrar en ningún jaarverslag/jaarrekening
  una línea de colegio, polideportivo o cuota de socio — son sociedades anónimas/holdings (N.V./B.V.),
  no clubes-asociación con membresía que paga cuota.

## TSG Hoffenheim (Alemania) — onboarding 2023/24-2024/25, sesión 2026-09-25

- **`officialPAT` con la "atypisch stille Beteiligung" de Dietmar Hopp**: el Konzern-GuV tiene 3
  líneas de resultado final, no 1 (14. Konzernjahresüberschuss, resultado consolidado total; 15. auf
  andere Gesellschafter entfallender Gewinn/Verlust, la porción asignada al partner silencioso vía la
  Zweckgesellschaft; 16. Konzernverlust, el que se traslada a la Bilanz). Se cargó `officialPAT` =
  línea 16 (Konzernverlust, el cierre real de la Bilanz), con `tax` absorbiendo TODO lo "por debajo
  de la línea" (Steuern vom Einkommen + sonstige Steuern + la asignación al partner silencioso + la
  asignación a otros socios) — mismo criterio que ya usa Stuttgart para su NCI real. El precedente de
  Augsburg/Eintracht Frankfurt (usar el resultado ANTES de nicht beherrschende Anteile) no calzaba
  acá porque la asignación al partner silencioso no es un simple % de propiedad de una subsidiaria,
  es una cláusula contractual de absorción de pérdidas que por sí sola transforma un resultado
  operativo+financiero de -23,4M en un consolidado de +1,3M (2023/24). ¿Preferís en cambio usar la
  línea 14 (Konzernjahresüberschuss, antes de toda asignación a terceros, criterio Augsburg/
  Frankfurt)? Ver el comentario extenso en `data/hoffenheim-de-data.js`.

## Hamburger SV (Alemania) — onboarding 2023/24-2024/25, sesión 2026-09-25

- **Tabla de GuV/Bilanz garbled en los 2 ejercicios**: la conversión PDF→Markdown de
  `fussball-ag-jahresabschluss-2023-24.md`/`-2024-25.md` mezcló dígitos y separadores de miles en
  varias filas clave (ej. "10.ErgebnisnachSteuem 0080[.......247327649"). Se reconstruyó cruzando el
  Lagebericht ("iii) Ertragslage", que narra cada componente en TEUR) contra los pocos números
  limpios que sobrevivieron (Umsatzerlöse, Materialaufwand, Personalaufwand, Jahresüberschuss). El
  campo `tax` de cada año es un PLUG (Steuern vom Einkommen + sonstige Steuern combinados, sin poder
  separarlos — la fila de impuesto a las ganancias quedó ilegible en los 2 ejercicios) calculado por
  diferencia contra el Jahresüberschuss real impreso. `grossDebt`/`cash` NO se cargaron para ningún
  año porque el Bilanz-Passiva/Aktiva llegó igual de garbled y no se pudo reconstruir con confianza.
  Si en algún momento se consigue releer el PDF original (páginas 4-6 de cada ejercicio), valdría la
  pena confirmar el desglose exacto de Steuern vom Einkommen/sonstige Steuern y cargar grossDebt/cash.
  Ver el comentario extenso en `data/hamburgersv-de-data.js`.

## Borussia Mönchengladbach (Alemania) — onboarding 2023-2024, sesión 2026-09-25

- **Separación entre "Sonstige betriebliche Erträge" y el resultado financiero neto (Finanzergebnis)
  sin poder confirmarse**: la tabla de GuV de `jahresabschluss-2023.md`/`jahresabschluss-2024-
  completo.md` no incluye estas 2 filas (ni ninguna cifra de Zinsen/Finanzergebnis), y el
  Lagebericht de ninguno de los 2 años las menciona en prosa (a diferencia de Werder/Köln/Hoffenheim/
  Hamburgo, que sí narran ambas). Por diferencia contra "11. Ergebnis nach Steuern" (el único ancla
  exacta que sobrevivió), el COMBINADO de las 2 partidas da TEUR ~615 (2023) y TEUR ~104 (2024) —
  montos chicos (0,3%/0,06% del revenue), pero la separación entre las 2 es una incógnita real. Se
  cargó el combinado ENTERO como revenue "Sonstige betriebliche Erträge" (other_income) y
  `netInterest:0` para los 2 años, documentado como simplificación reconocida (Borussia carga ~62-63M€
  de deuda bancaria, así que es probable que el Finanzergebnis real sea negativo, compensado por una
  "Sonstige betriebliche Erträge" positiva de magnitud similar). Si se consigue releer el PDF original
  (la página de la GuV, entre Personalaufwand y "11. Ergebnis nach Steuern"), valdría la pena separar
  los 2 componentes con precisión. Ver el comentario extenso en `data/monchengladbach-de-data.js`.
