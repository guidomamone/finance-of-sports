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
