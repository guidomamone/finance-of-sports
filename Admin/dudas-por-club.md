<!-- md: preguntas que solo el club puede contestar | leer: al escribirle a un club o al agregar una duda -->
# Dudas por club

Este archivo es para anotar preguntas puntuales que quedaron SIN respuesta clara después de leer los
documentos oficiales de un club — cosas que valdría la pena preguntarle directo al club (prensa,
área de socios, o quien corresponda) en vez de asumir o inventar un criterio. Complementa a
`Admin/sourcing/README.md` (que es sobre DÓNDE está cada documento) y a los comentarios de cada
`data/<país>/<club>-data.js` (que son sobre CÓMO se categorizó cada línea puntual) — acá van específicamente
las preguntas abiertas, para no perderlas sueltas en el medio de un comentario de código.

Cómo se agrega algo acá: una sección por club, una línea por pregunta, con el formato:

- **[tema de la pregunta]**: [la pregunta concreta, con la cita/página/documento exacto de donde
  salió la duda] — a quién preguntarle: [contacto, si ya se investigó uno en `Admin/sourcing/README.md`].

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

## Estudiantes de La Plata

- **to-do 43 (unificar "derechos de formación/mecanismo de solidaridad" a `player_sales`), sesión
  2026-09-26: no se encontró una línea equivalente para recategorizar.** El to-do (originado en
  `auditorias/2026-09-22-catchall-no-futbol.md` sección 4-i) lista a Estudiantes entre los 7 clubes
  con este concepto "escondido" en `youth_football`/`other_income`, pero la única línea de
  `data/ar/estudianteslp-ar-data.js` en `youth_football` es "Recursos fútbol infantil/amateur" — se revisó
  el texto de los 4 balances (`Clubes/Argentina/Estudiantes LP/*.md`) y esa línea es ingreso
  operativo de la Escuela de Fútbol Infantil/divisiones amateur (aranceles, sponsors puntuales:
  "Mains Sponsors Futbol Infantil"), no cobros de FIFA training compensation/mecanismo de
  solidaridad por transferencias — un concepto distinto que en Boca/Racing/Vélez/etc. sí tiene su
  propia línea explícita ("Cobros de derechos de formación y mecanismo de solidaridad", "Derechos de
  formación"). No se recategorizó nada de Estudiantes en esta sesión para no mezclar ingreso de
  programa juvenil con venta/transferencia de jugadores. Pregunta para Guido: ¿el balance de
  Estudiantes simplemente no separa esa plata (queda mezclada dentro de "Transferencias y préstamos
  de jugadores", ya en `player_sales`), o el club de verdad no la recibe/no es significativa? Si hay
  un desglose que esta sesión no encontró, avisar para completar el to-do.

## Argentinos Juniors

- **Mes exacto de la primera asunción de Cristian Malaspina en 2015**: confirmado que es presidente
  "desde 2015" (reelecto dic-2019, dic-2023), pero no se encontró el mes exacto de esa primera
  asunción. Si fue DESPUÉS del cierre del Ejercicio 2015 (30/6/2015), ese ejercicio en particular no
  debería caer bajo su gestión (se cargó con `gestionId:null` por las dudas, ver
  `data/ar/argentinosjuniors-ar-data.js`). A quién preguntarle: prensa institucional del club o
  argentinosjuniors.com.ar/institucional.
- **El archivo "balance-2018-2019.pdf" del club es en realidad la Memoria narrativa completa**, sin
  una sola cifra de balance — el nombre del archivo no es fiable como indicador de contenido (mismo
  hallazgo que ya tenía river-ar-data.js). Por eso el Ejercicio 2019 sigue viniendo de la presentación
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

- **Presupuesto en caja, separado en Ordinario/Extraordinario, en vez de un presupuesto económico
  devengado**: a diferencia de los balances auditados del propio club (que sí devengan, Estado de
  Recursos y Gastos normal), el Presupuesto 2023-2024 (`Clubes/Argentina/San Lorenzo/
  presupuesto-2023-2024.md`) es un presupuesto de CAJA mensual, con una sección "Extraordinaria"
  separada para financiamiento (aportes bancarios/dirigenciales y su cancelación), obras de capital,
  compra/venta de jugadores en términos de desembolso de caja, y cancelación de deuda vieja — nada
  de eso se cargó al sitio (ver `.claude/skills/club-data-mapping/referencia/casos-por-pais-y-formato.md`), solo la
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
  clubaunion.com.ar cuando el sitio esté online, ver `Admin/sourcing/README.md`) una copia completa que
  incluya el Balance General de esos 3 años.
- **to-do 43 (unificar "derechos de formación/mecanismo de solidaridad" a `player_sales`), sesión
  2026-09-26: mismo caso que Estudiantes LP, no se encontró línea equivalente.** El to-do lista a
  Unión entre los 7 clubes con este concepto "escondido" en el catch-all, pero la única línea de
  `data/ar/union-ar-data.js` en `youth_football` es "Ingresos Fútbol Amateur" — revisando las memorias del
  club (`Clubes/Argentina/Union/*.md`), el Departamento de Fútbol Amateur es la estructura de
  divisiones inferiores/pensión, y su línea de ingresos no tiene ninguna mención a mecanismo de
  solidaridad o derechos de formación por jugadores transferidos. De hecho Unión YA tiene una línea
  separada para eso, "Otros recursos por derechos sobre jugadores" (`player_sales` en los 4
  ejercicios) — es la lectura más probable de dónde vive esta plata, así que es posible que el
  to-do ya esté resuelto de facto para este club y el catch-all que motivó el hallazgo original sea
  otra cosa. No se recategorizó nada de Unión en esta sesión (mover "Ingresos Fútbol Amateur" entero
  a `player_sales` mezclaría ingreso real de programa juvenil con venta de jugadores). Confirmar con
  Guido si esto cierra el caso de Unión o si hace falta volver a la fuente.

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
  no confirmada (ver la evidencia en `Admin/carga-clubes/independiente-ar.md`): esa recaudación podría estar
  embebida este año dentro de "Publicidad y concesiones" del Anexo D (Fútbol Profesional) en vez de
  quedar como línea de departamento aparte — no se pudo confirmar con lo que dice el documento.

## Rosario Central (Ejercicio 2024-25, sesión 2026-09-23)

- **"Ingresos fútbol profesional" (2.732,08M) y "Gastos de fútbol profesional" (5.308,77M)**: líneas
  residuales sin más desglose en el documento (a diferencia de TV/entradas/sponsors, que sí tienen
  fila propia) — vale preguntarle al club qué componen específicamente.
- **"Gastos bancarios y financieros" (889,62M)**: categorizado como `admin_general_expense`
  (comisiones/gastos operativos, distinto del resultado financiero ya separado en `netInterest`),
  sin certeza total de que no incluya algo de naturaleza financiera pura.
## Racing Club (hallazgo de esta sesión, no una pregunta para el club)

- **Categorización interna inconsistente, Ejercicios 2009/2010/2012/2014**: 5 líneas de revenue
  ("Desafectación de previsiones y provisiones", "Condonaciones") están etiquetadas
  `exceptional_items`, una categoría que solo existe en `EXPENSE_CATEGORIES`, no en
  `REVENUE_CATEGORIES` — no rompe ningún total (el revenue se suma sin filtrar por categoría), pero
  sí podría no aparecer bien agrupado en "Formato Simplificado". Encontrado con un script de
  auditoría en el navegador (`REVENUE_CATEGORIES`/`EXPENSE_CATEGORIES` vs. cada línea cargada) al
  verificar los clubes nuevos de esta sesión — no es de esta sesión, viene de una carga anterior de
  Racing. Queda como to-do de limpieza, no es urgente (no afecta ningún número mostrado).

## Deportes Tolima (hallazgo de esta sesión — NO se cargó al sitio por esto)

- **El resultado neto (utilidad) del Ejercicio 2025 tiene 3 cifras distintas, sin poder reconciliar
  ninguna con confianza**: (1) la vista SIIS resume "Resultado del ejercicio $359,205 M" (ver
  `Admin/sourcing/Colombia/Deportes Tolima.md`); (2) el propio documento (`estados-financieros-2025.pdf`,
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
  todos modos (ver `data/co/oncecaldas-co-data.js`, comentario de cabecera) usando el PAT confirmado como
  ancla y despejando `tax` como residuo (pretax línea por línea menos PAT confirmado), documentado
  explícito en el código como una aproximación, no un número impreso. **Pregunta para el club/SIIS**:
  ¿qué explica la diferencia entre la "Utilidad contable" de la Nota 15 ($9.846,710 M) y la suma de
  Ingresos/Gastos operativos + financieros de las Notas 20-27 (~$13.446,121 M pretax)? Se necesitaría
  el Estado de Resultado Integral primario (no solo las notas) para confirmar.
- **Mismo patrón otra vez en el Ejercicio 2024** (cargado 2026-09-28, validación real del to-do 98):
  la Nota 25 "Gastos No Operacionales" imprime un total de $3.435,595 M que NO reconcilia contra la
  suma de sus propias líneas (Financieros + Extraordinarios + Impuesto Diferido + Diversos +
  Impuesto de Renta da ~$3.729 M SIN sumar siquiera el impuesto de renta, ya por encima del total
  impreso) — y la fila "IMPUESTO DE RENTA Y COMPLEMENTARIO" del documento contradice a su propio
  detalle: la fila resumen (en negrita) muestra **0**, pero la fila de detalle inmediatamente debajo
  muestra **1.761.301**. Se cargó igual usando el mismo método de residuo que 2025 (PAT confirmado
  menos pretax línea por línea, ver `data/co/oncecaldas-co-data.js`). A diferencia de 2025, el PAT 2024
  ($4.112,260 M) NO está confirmado triple: sale de una sola fuente (Cuenta de Patrimonio, fila
  "Utilidad o pérdida del ejercicio") — el dictamen del revisor fiscal 2024 es una opinión limpia
  que no narra la cifra (a diferencia del de 2025). **Pregunta para el club/SIIS**: ¿por qué la Nota
  25 no reconcilia contra su propio total, y cuál es el valor correcto del "Impuesto de Renta y
  Complementario" (0 o 1.761.301)? Igual que Deportes Tolima arriba, se necesitaría el Estado de
  Resultado Integral primario para confirmar.

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
  Ver `data/br/mirassol-br-data.js`.
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
  `Admin/sourcing/Estados Unidos/New York Knicks.md`.
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

Contexto (verificado con 3 fuentes independientes, ver `Admin/sourcing/Japón/_notas-generales.md`): el
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

Lo que SIGUE abierto: si el club cambió a ejercicio CALENDARIO después de 2024 — la noticia de
`osasuna.es/en/noticia151` sobre un cierre a 31/12/2025 puede ser real para un ejercicio de
TRANSICIÓN posterior a los 2 ya cargados (no contradice lo confirmado acá). Si se carga un ejercicio
2025 o posterior de Osasuna, confirmar el período exacto antes de asumir jul-jun — a quién
preguntarle: prensa deportiva navarra, o directo al club vía su área de socios.


## FK Austria Wien (sourcing de Austria, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿El club publicó alguna vez un Geschäftsbericht completo descargable?**: solo se encontró un
  intento roto de 2019/20 (link muerto, sin snapshot en Wayback Machine). No se pudo confirmar si
  existe un archivo histórico en algún otro lado — a quién preguntarle: directo al club (prensa o
  área de socios/accionistas), ya que la Firmenbuch confirma que la FK Austria Wien AG sí deposita
  cuentas pero el documento está bloqueado por login+pago (ver `Admin/sourcing/Austria/Austria Wien.md`).

## Cercle Brugge (sourcing de Bélgica, sesión 2026-09-17, no bloqueó nada, solo sin cerrar)

- **¿Existía el club bajo otra razón social antes de 2015?**: no se encontró ningún depósito
  anterior a 2015 para "Cercle Brugge" ni para ninguna entidad con ese nombre. Club Brugge sí tenía
  este patrón (operaba como "De Klokke" hasta 2011) — no está confirmado si a Cercle Brugge le pasa
  lo mismo o si simplemente no hay registro más antiguo en la Centrale des bilans.

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
  `Admin/sourcing/Croacia/Lokomotiva.md`). Si Guido quiere pagar/crear la cuenta él mismo, ahí están los
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

## Grecia — huecos genuinos sin explicación encontrada (sourcing, sesión 2026-09-17, no son preguntas para el club, son pendientes técnicos)

- **Aris**: falta el ejercicio FY2019/20 pese a continuidad en el resto de los años — no se encontró
  ningún depósito en el ΓΕΜΗ para ese año.
- **Atromitos**: falta el ejercicio FY2017/18, mismo patrón.
- **Panetolikos**: faltan FY2018/19 y FY2020/21 — el único club griego con dos huecos.
- **PAOK**: falta el ejercicio FY2017/18.

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

## Zürich (sourcing de Suiza, sesión 2026-09-17, pregunta de criterio, no bloqueante)

- **El Geschäftsbericht 2011 existe en Yumpu (subido por la cuenta oficial del club) pero tiene la
  descarga deshabilitada** — se puede leer online pero no bajar. Decisión de Guido si vale la pena
  perseguirlo (buscar el PDF original en Wayback Machine) o dejarlo así.

## Kocaelispor (sourcing de Turquía, sesión 2026-09-18, pregunta real para el club)

- **¿La entidad del documento de 2019 (Kocaelispor Kulübü Derneği) es la misma que ascendió a la
  Süper Lig 2025/26?**: el club tuvo un historial reciente de refundaciones/dificultades
  institucionales — antes de comparar series o cargar cualquier dato, confirmar si es la misma
  entidad legal o si hubo una refundación en el medio.

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
- **Getafe CF (`getafe-es`)**: "Ingresos LNFP" (330K€ 2024, 361K€ 2025) — ¿es distribución de TV,
  solidaridad, u otro concepto de la liga? Se cargó como `other_income` por descarte.
- **1. FC Köln (`koln-de`)**: "Abschreibungen auf Finanzanlagen und auf Wertpapiere des
  Umlaufvermögens" (TEUR 3.000, 2024/25 — deterioro de la participación en SK Gaming Beteiligungs
  GmbH) se sumó a `netInterest` por su posición en el esquema §275 Abs. 2 HGB (dentro del bloque de
  Finanzergebnis), no a `expenseLines` — ¿Guido prefiere otro tratamiento?
- **Eintracht Frankfurt (`eintrachtfrankfurt-de`)**: (a) "Frauen und Jugendfußball" combinado en una
  sola línea (7,6 M EUR) sin poder separar `womens_football` de `youth_football` — cargado como
  `other_income`; (b) "Transfer" (comisiones de agentes + fees, mezcla costos de compra Y venta de
  jugadores, 26-39 M EUR) no tiene categoría propia distinta de `player_amortisation` (que es
  específicamente para amortizar el plantel propio) — cargado como `other_expenses`. **¿Vale la pena
  una categoría `player_transaction_costs` separada?**
- **Arsenal (`arsenal-gb`)**: (a) "Share of joint venture operating loss" (participación en el
  resultado de Arsenal Broadband Limited, −£1,9-1,7M) no encaja en ningún campo de `fiscalYearMeta` —
  se cargó como `revenueLine` `other_income` negativa a falta de un campo para "resultado de
  sociedades vinculadas por método de participación"; (b) staff costs sin desglose por área (todo a
  `wages_squad`), infla el ratio salarios/ingresos frente a clubes que sí separan.
- **Everton (`everton-gb`)**: "Profit on disposal of investments" 2025 (£49,2M, venta de Everton FC
  Women Ltd y Goodison Park Stadium Ltd A LA MATRIZ Roundhouse — deconsolidación intragrupo, no venta
  de jugadores ni de activos operativos) se cargó en `assetSales` a falta de una categoría para
  "ganancia por reestructuración corporativa/deconsolidación".
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
- **Dictamen del revisor fiscal 2021, para pedirle a la Supersociedades** (no al club): el archivo del SIIS («1%%7p601!.PDF») devuelve
  500 «URL blocked» con cualquier codificación, también desde el visor del portal. Lo que se bajó era una página HTML
  (`dictamen-revisor-fiscal-2021-pagina-html.html`); no hay PDF real. Va con los demás pedidos del 335.

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
- **CVM / debêntures**: resuelto en gran parte (ver la evidencia en `Admin/carga-clubes/atleticomineiro-br.md` y `Admin/sourcing/Brasil/Atletico Mineiro.md`) — la SAF emitió 60.000
  debêntures reales (R$60M nominal) el 25/09/2024, quirografárias, 3,50% a.a., vencimiento 25/09/2027.
  Lo que NO se confirmó en el documento es bajo qué instrução CVM exacta se hizo la oferta
  (probablemente Instrução CVM 476, oferta restrita a investidores profissionais, pero es una
  inferencia por patrón — no está escrito en el balance). Si se necesita el dato exacto, habría que
  buscarlo en el próprio instrumento de emissão de debêntures (escritura), no en las demonstrações
  financeiras.
- **Cambio de presidencia sin nota de prensa**: se confirmó por firma en el propio balance (Bruno
  Muzzi firma 2023 y 2024, Pedro Daniel firma el Relatório Integrado 2025) pero no se buscó
  externamente la fecha exacta de la transición ni el motivo — si se necesita esa precisión (ej. para
  `gestionesByClub` con fecha de asunción), haría falta una búsqueda de prensa aparte.
- No se encontró una cifra total de sócios/sócio torcedor en ninguno de los 3 documentos
  (`memberCountByClub['atleticomineiro-br'] = null`).

## Athletico Paranaense (`athleticoparanaense-br`) y Vitória (`vitoria-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

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

- Se sabe que existen al menos 2 documentos más del club en Wayback Machine (balance 2022 y un año
  sin identificar todavía) que no se bajaron esta sesión — quedan para una sesión futura de
  sourcing/transcripción.

## Palmeiras (`palmeiras-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

- **"Acordos e despesas legais e judiciais"** (2024, R$73,910 mil, ~47% de la columna "Despesas
  gerais e administrativas" de fútbol profesional): un monto grande y puntual dentro de un rubro
  administrativo genérico. Se dejó en `admin_general_expense` por no haber un ítem `exceptional_items`
  ya establecido para Palmeiras (a diferencia de Corinthians/Botafogo/Atlético Mineiro). Podría
  ameritar reclasificación a `exceptional_items` en una sesión futura si se confirma que es un litigio
  puntual no recurrente.
## Santos (`santos-br`), Brasil — onboarding 2024/2025, sesión 2026-09-24

- **Caja extremadamente baja** (R$170 mil en 2024, R$295 mil en 2025): no es error de transcripción
  — el propio Relatório da Administração dedica varios párrafos a la crisis de liquidez del club
  (déficit financiero de R$62 M a fines de 2023). Vale la pena que se lea en el sitio como hallazgo
  real, no como un número sospechoso.
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
## Vasco da Gama (`vascodagama-br`), Brasil — onboarding 2023, sesión 2026-09-24

- **HALLAZGO IMPORTANTE, afecta el alcance de esta carga**: el documento que se esperaba usar para
  2024 (`dre-balanco-patrimonial-2024.md`, "Vasco da Gama SAF DRE e Balanço Patrimonial 2024") resultó
  ser, al leerlo completo, el balance de la **associação CRVG** (Club de Regatas Vasco da Gama,
  entidad SOCIAL separada de la SAF, dueña de solo el 30% de las acciones de la SAF por equivalencia
  patrimonial) — NO el balance de la SAF. Por eso esta sesión cargó un solo ejercicio (2023, auditado,
  de `demonstracoes-contabeis-2023.md`) en vez de los 2 planeados. **Falta re-sourcear el balance
  2024 real de la SAF** (la URL oficial sigue bloqueada por Cloudflare, ver `Admin/sourcing/Brasil/Vasco da
  Gama.md`) o esperar a que se publique un 2025 auditado.
## Ferro Carril Oeste (`ferrocarriloeste-ar`), Argentina — onboarding Ejercicios 118/119 (2021-22, 2022-23), sesión 2026-09-24

- **"Recupero Decreto 1212/03"** (línea grande en los 2 ejercicios, $82,6 M y $184,0 M): el Decreto
  1212/03 es el régimen de retención de la AFA sobre ingresos de fútbol para aportes de seguridad
  social, pero ninguno de los 2 balances explica qué es exactamente este mecanismo de "recupero". Se
  cargó conservadoramente a `other_income`. Vale la pena preguntarle al club o a la AFA de qué se
  trata exactamente antes de recategorizarlo.

## RCD Mallorca (`rcdmallorca-es`), Real Oviedo (`realoviedo-es`) y Rayo Vallecano (`rayovallecano-es`), España — onboarding Ejercicio 2024/25, sesión 2026-09-25

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
  `exceptional_items`, documentado en detalle en la evidencia en `Admin/carga-clubes/pontepreta-br.md`. Es una reconstrucción con buena evidencia cruzada, no un número
  leído limpio — vale la pena confirmarlo releyendo el PDF original a mayor resolución, o
  preguntándole al club la naturaleza exacta de este cargo de R$22,2 M.

## Colo-Colo (Blanco y Negro) — onboarding de Chile, sesión 2026-09-25, no bloqueó la carga

- **¿Qué cambió en el balance 2024 entre el rechazo de la junta de abril 2025 y la versión que
  finalmente circuló?**: según `Admin/sourcing/Chile/Colo-Colo (Blanco y Negro).md`, los accionistas
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
- **Estados financieros 2025: la Nota 20 ("Composición de Cuentas de Costo de Ventas") trae la tabla equivocada** (2026-10-01,
  proceso nuevo del pipeline): bajo ese título el PDF imprime la tabla "Composición Gastos de Administración", la misma de la Nota 21
  (página 75 del visor, impreso "68", contra la página 76, impreso "69"; confirmado en el texto propio del PDF, no es la
  transcripción). Por eso el Costo de Ventas 2025 (M$20.985.893, el 77% del gasto) no tiene desglose: en 2024 esa nota lo abría en
  Remuneraciones, Gastos de Operación, amortización de pases, etc. Decisión de Guido (revisada el mismo día): 2025 se carga con el
  costo de ventas marcado como "No declarado" (sin desglose), y se le pide al club la Nota 20 correcta (o una versión corregida de los
  estados) para completarlo — a quién preguntarle: cruzados.cl/inversionistas/ o el área
  de finanzas del club.

## Alianza Lima (Perú, onboarding financiero, sesión 2026-09-25)

- **Nota "Gastos deportivos: Servicios" (S/ 9-15M/año, el 2do rubro más grande de esa Nota después
  de Personal, en los EEFF 2019-2021): ¿qué compone este bloque?** La Nota no lo abre más — podría
  ser viajes/concentración/seguridad para partidos (lo que llevó a categorizarlo como
  `match_organisation_expense` en `data/pe/alianzalima-pe-data.js`), pero también podría incluir
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
  `Admin/sourcing/Ecuador/_notas-generales.md`)?** Si el club social y el "dueño" del fútbol profesional son
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

- **`firstYear` de la gestión Parish/Blitzer-Harris/Textor**: no verificado con certeza (Blitzer/
  Harris entraron ~2015, Textor como mayoritario ~2021) — se usó un solo `gestionId` sin firstYear
  preciso por prudencia.

## Fulham (Inglaterra) — onboarding 2023-24/2024-25, sesión 2026-09-25

- **"Compensation" (£0,873m 2024 / £4,013m 2025, creciendo)**: "sums from collaboration agreements
  with other Clubs and remediation of lost income" — categorizado como `other_income` a falta de
  mejor opción. Vale la pena confirmar si está relacionado a la obra del Riverside Stand.

## Leeds United (Inglaterra) — onboarding 2023-24/2024-25, sesión 2026-09-25

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
## Países Bajos (Ajax, PSV, Feyenoord, AZ) — onboarding 2023/24-2024/25, país nuevo, sesión 2026-09-25

- **Feyenoord — línea "Partnerships, business seats, units en boarding" (Netto-omzet, nota 3.1)**:
  45,238M€ en 2024/25 (39,593M€ en 2023/24), ~20-28% del ingreso operativo, mezcla en una sola línea
  sponsors/valla publicitaria (`sponsorship_commercial`) con paquetes de temporada premium tipo
  business-seats/units (que en Ajax y PSV son `season_tickets`) — el documento no la desglosa en
  ningún lado (a diferencia de Ajax, que sí separa "Seizoenkaarten" de "Business-seats en
  skybox-plaatsen" como líneas propias). Se cargó entera como `sponsorship_commercial` (el rótulo
  "Partnerships" lidera y "boarding" es publicidad, pero la porción de "business seats/units" bien
  podría ser mayoritariamente `season_tickets`). ¿Feyenoord puede aclarar qué proporción de esa línea
  corresponde a cada concepto? Ver la evidencia en `Admin/carga-clubes/feyenoord-nl.md`.
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
  Frankfurt)? Ver la evidencia en `Admin/carga-clubes/hoffenheim-de.md`.

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
  Ver la evidencia en `Admin/carga-clubes/hamburgersv-de.md`.

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
  los 2 componentes con precisión. Ver la evidencia en `Admin/carga-clubes/monchengladbach-de.md`.

## Bayern Munich (Alemania) — onboarding 2023-24/2024-25, sesión 2026-09-25

- **`verifyTieOuts()` marca 3 checks de este club como "NO CIERRA" (diferencia de 0,1 M€)**: Revenue
  2024, Revenue 2025 y Resultado neto (PAT) 2025 — verificado en el navegador el 2026-09-25. No es un
  error de carga: la fuente redondea cada cifra a 1 decimal (100.000 €), así que 6 líneas de revenue
  independientemente redondeadas pueden sumar hasta ±0,1 M€ distinto de un total también redondeado.
  Los otros 3 checks (Expenses de los 2 años, PAT 2024) sí cierran exacto. Documentado en
  la evidencia en `Admin/carga-clubes/bayernmunich-de.md` para que ninguna sesión futura lo confunda
  con un bug — la pregunta de si conseguir un documento con más precisión sigue abierta arriba.

## Dinamarca (FC København, Brøndby, FC Midtjylland) — onboarding, país nuevo, sesión 2026-09-25

- **FC København y Brøndby — "Ejendomsudlejning"/"Udlejning erhvervsejendom" (alquiler de
  inmuebles/propiedad comercial) categorizado como `other_income`, no `stadium_other`**: a diferencia
  de las líneas de F&B/eventos (que sí se cargaron como `stadium_other` por estar en la sede propia),
  estos rótulos no nombran el estadio ni una parte de él — se aplicó el criterio conservador de
  `club-data-mapping` sección 1. Si en el futuro se confirma que el inmueble alquilado es parte del
  propio estadio (Parken/Brøndby Stadion), recategorizar a `stadium_other`.
## Tanda de 20 transcripts al azar (sesión 2026-09-25) — 17 clubes/ejercicios nuevos + 3 ediciones

Pedido de Guido: elegir 20 transcripciones ya hechas y sin cargar, sin orden particular, y
onboardearlas. De los 20 elegidos al azar, 3 resultaron dead-ends sin estados contables reales
(Temperley: solo Memoria narrativa institucional, sin un solo monto de Recursos/Gastos, confirmado
también en `Admin/sourcing/Argentina/Temperley.md` de una sesión de sourcing anterior; Belgrano: mismo
caso, solo Memoria, el PAT agregado se menciona en prosa pero sin ningún desglose por rubro;
Palestino: el documento es un estado financiero INTERMEDIO de 6 meses con comparativo, sin el
Estado de Resultados del ejercicio anual 2018 completo) y se reemplazaron por otros 3 (Botafogo-SP,
Juventude, Amazonas).

**Osijek (Croacia)**: "Troškovi za nenogometne djelatnosti" (1.769.335 EUR) mapeado a
`admin_general_expense` por descarte — no confirmado qué actividad exacta es (posiblemente ligada a
FM 20 d.o.o., la sociedad del estadio).

**Slaven Belupo (Croacia)**: (1) "Prihodi od ulaznica" (303.770 EUR) combina entradas de liga y
abonos anuales en una sola cifra, sin poder aislar la porción de abonos. (2) "Komercijalni prihodi
od članstva" (41.777 EUR) mapeado a `member_dues`, pero el rótulo literal dice "ingreso COMERCIAL de
la membresía" — genuina incertidumbre sobre si es cuota social o un ingreso comercial distinto.

**AGF (Dinamarca)**: (1) "Entré- og tv-indtægter" (34.673 DKK, entradas+TV combinadas) categorizado
como `broadcasting` por descarte, sin desglose real en la fuente. (2) `grossDebt` se cargó como
4.627 (solo "Leasingforpligtelser", pasivo de leasing IFRS16) porque no hay ninguna línea de
préstamo bancario explícita — podría no ser lo que se considera "deuda" para este club.

**Silkeborg IF (Dinamarca)**: `grossDebt:0` — no hay línea de deuda financiera/bancaria en el
balance; existe "Payables to shareholders and management" (14.048 DKK) que podría discutirse como
deuda relacionada, pero el documento no la etiqueta como préstamo.

**Viborg FF (Dinamarca)**: (1) "Vareforbrug" (-32,37M DKK) mezcla costo de mercadería y costos de
cesión/préstamo de jugadores sin separar montos. (2) "Andre driftsomkostninger" (-1,26M DKK) sin
monto propio identificable para separar de `other_expenses`, pese a que la nota de política contable
la asocia conceptualmente a transferencias/venta de activos. (3) "Nettoomsætning" (75,99M DKK) no
tiene ningún desglose numérico matchday/TV/comercial en ningún Note del documento (a diferencia de
FC København, que sí lo tiene) — si aparece un documento con más detalle, se podría separar de
`lump_football_operations`.

**Charleroi (Bélgica)**: (1) "Autres produits d'exploitation" (5.018.673 EUR, ~17% del revenue) sin
desglose en ningún lado del documento (ni la Nota C-cap 6.10 ni el rapport de gestion la explican) —
candidato a preguntarle al club qué compone esta línea. (2) Gestión/presidencia sin confirmar para
el ejercicio 2024/25 — el listado de administradores no marca un cargo de "Président" para ninguno,
`gestionId` quedó `null`.

**Mechelen (Bélgica)**: (1) el residuo de "Andere bedrijfsopbrengsten" (8,54M de 12,6M EUR)
categorizado `player_sales` por inferencia del Jaarverslag ("gerealiseerde netto transferresultaten"
mencionado como causa principal de la mejora del resultado), no confirmado como cifra explícita. (2)
la interpretación del intangible "Concessies, octrooien..." como derechos de inscripción de
jugadores capitalizados es la interpretación estándar para clubes belgas VOL-kap, pero no está
confirmada explícitamente por el documento — si es incorrecta, `player_amortisation`/`depreciation`
deberían reconsiderarse.

**Antwerp (Bélgica)**: (1) ¿qué compone "Andere bedrijfsopbrengsten" (46,46M EUR) más allá de los
11,68M de subsidios operativos declarados? ¿incluye plusvalía por venta de jugadores del ejercicio
(hubo bajas de pases por 31,6M EUR a costo)? (2) el desglose de "Omzet" (Nota 6.10, ticketing/
sponsors/TV) no fue completado por el club en este filing.

**Ceará (Brasil)**: (1) "Venda de direitos de participação" (2024, R$60,1M — venta de 5% de los
direitos de transmissão da LFF a un fondo, recomprado en marzo/2025) categorizado `other_income` por
ser una operación patrimonial one-off, pero conceptualmente es monetización de derechos de TV —
podría discutirse `broadcasting` en su lugar. (2) "Receitas com Eventos" categorizado `other_income`
(criterio conservador), podría ser `stadium_other` si son eventos en el estadio propio. (3) "Sócio
Torcedor/Tributos/Outros" 2024 quedó agregado en una sola línea combinada porque el `pdftotext` de la
Nota 24 vino con esas 3 filas desalineadas y no se pudieron desagregar con certeza — el total sí es
exacto, solo se perdió granularidad para esas 3 líneas menores de 2024.

**Sport Recife (Brasil)**: (1) Nota 21 "Outras (Despesas)/Receitas Operacionais" 2025: los 3
sub-ítems impresos (Liga Forte União -24.993, Despesas com provisão para contingências -97.459,
Outras receitas 75.756, en R$ mil) suman -46.696, pero el propio DRE imprime -35.739 para esa misma
línea — diferencia de R$10.957 mil (~6,3%) no explicada por redondeo. Se usó el -35.739 del DRE (la
cifra que reconcilia exacto contra el déficit auditado). ¿Cuál de las 3 cifras está mal, o falta un
4to componente no impreso? (2) el footnote "(i)" junto a "Outras receitas/(despesas)" no tiene texto
en la transcripción, sin explicar.

**Godoy Cruz (Argentina)**: (1) "Ingresos Varios AFA" cargado a `other_income`, no está claro si es
TV/premios/otro concepto (ya hay línea separada de TV). (2) "Ingreso Fútbol Amateur"/gasto espejo
cargado a `youth_football`/`youth_other_sports_expense`, asumido como categorías inferiores. (3)
"Ingreso por Rescisión de Contrato" e "Ingreso por Derechos de Tanteo" cargados a `player_sales`,
"derecho de tanteo" es una figura sin precedente claro en otros clubes cargados. (4) "Cargas
Sociales" (línea standalone de Gastos, sin desglose por sector) cargada a `wages_squad`, asumido que
es del plantel.

**Los Andes (Argentina)**: (1) "futbol" (línea de ingreso, sin más contexto) cargada a
`matchday_competition`, asumido como recaudación (hay una línea separada "Ingresos Afa"). (2)
"Ingresos Afa" cargada a `broadcasting`, asumido como distribución de TV/AFA, no confirmado. Además,
hay una serie completa 1993-2020/21 transcripta y SIN CARGAR en `Clubes/Argentina/Los Andes/` — solo
se cargó el Ejercicio 105 (2020-21) de esta tanda, el resto queda para una sesión futura.

**Coritiba (Brasil, ejercicio 2023 agregado)**: `node tools/audit.js` marca que el catch-all "Otros
ingresos" se lleva 68% del total 2023 — es la línea de la cesión del 20% de los derechos comerciales
del Brasileirão a Liga Forte União (R$152M de R$216,65M), sin categoría propia mejor disponible. No
es un error, pero vale la pena revisar si en el futuro se agrega una categoría tipo "ingreso
extraordinario/venta de derechos" al esquema compartido.

**Chapecoense (Brasil, ejercicio 2017 agregado)**: (1) "Serviços Terceiros" (R$6.819.750, sin nota
propia en este documento puntual) cargado a `admin_general_expense` por default conservador — no hay
evidencia de que sea comisión de transferencias (a diferencia del ejercicio 2021 ya cargado, que sí
tenía nota explícita). (2) "Premiação do Ano p/pgto pôster" (R$1.355.000, dentro de "Outras
Despesas") cargado a `other_expenses` — concepto no aclarado por el documento.

**Bayern Munich (Alemania, ejercicio 2020/21 agregado)**: ¿existe un Jahresabschluss/Geschäftsbericht
más completo de 2020/21 (con el Einzelabschluss y su desglose de GuV por rubro, como sí tienen
2023/24 y 2024/25)? El documento transcripto es mucho más chico que los otros 2 ejercicios ya
cargados (2 páginas, solo 4 cifras agregadas: Umsatz/EBITDA/EBT/Jahresüberschuss), y D&A quedó
combinado con resultado financiero neto en una sola línea aproximada por no poder separarlos con los
datos disponibles.

**RB Leipzig (Alemania, ejercicio 2022/23 agregado)**: "Sonstigem" (54,861M EUR, catch-all de la Nota
4.1) probablemente incluye algo de ingreso por transferencias sin poder separarlo — el Anhang 4.1 de
este ejercicio solo desglosa 3 categorías (Spielbetrieb/Handel/Sonstigem) en vez de las 4 que sí
tienen 2023/24 y 2024/25 (que separan "Transfer- u. Leihgeschäft" aparte).

**Amazonas (Brasil)**: el documento fuente (`balanco-patrimonial-2024.md`) no tiene ninguna nota que
permita desglosar "Receita de Atividades Esportivas" ni "Custo das atividades Esportivas" — quedaron
como `lump_football_operations`/`lump_football_operations_expense` enteros. Preguntarle al club si
existe una versión con notas explicativas. Además, `Admin/sourcing/Brasil/Amazonas.md` decía hasta esta
sesión que estos documentos "no tienen estado de resultados" — eso es cierto para
`balancos-2022-2023.pdf` (mala calidad de OCR, ya excluido) pero FALSO para `balanco-patrimonial-
2024.pdf`, que sí trae una DRE completa que reconcilia exacto — corregido en esta sesión.

**Juventude (Brasil)**: (1) "Receitas Patrimoniais" (categorizada `other_income`, conservador) — ¿es
alquiler del Estádio Alfredo Jaconi? (2) la línea de gasto más grande ("Remuneração, Benefícios,
Encargos e amortização de direitos e de custos de formação", 22,55M BRL, 60% del costo de plantel)
mezcla sueldos con amortización de pases sin poder separarlos — pedirle al club el desglose. (3)
"Receita Loteria Esportiva" no tiene categoría propia, se usó `other_income` — evaluar si amerita
categoría nueva si aparece en más clubes brasileños.

**Botafogo-SP (Brasil)**: `grossDebt` es ambiguo — no hay línea "Empréstimos e Financiamentos". Se
usó "Partes Relacionadas" (préstamos del accionista controlante, R$53,59M) en vez de "Obrigações com
Arrendamento" (pasivo de leasing IFRS16, R$11,59M) — valdría confirmar con el club/auditor si "Partes
Relacionadas" lleva interés (deuda real) o es aporte de capital de trabajo sin costo. Además, el
archivo fuente completo tiene también los ejercicios 2019/2020 y 2022/2023 (5 en total) — solo se
cargó 2024 en esta tanda, los otros 2 quedan pendientes.

## 2da tanda de 20 transcripts más (misma sesión, 2026-09-25) — 22 ejercicios nuevos, sin dead-ends

Segunda ronda del mismo pedido de Guido ("20 más"). A diferencia de la primera tanda, los 20
candidatos esta vez salieron de países YA cargados con series históricas completas ya transcriptas y
sin cargar (Bélgica/Dinamarca/Croacia), así que ninguno resultó dead-end.

**Cruzeiro (Brasil)**: (1) ¿conviene migrar el ejercicio 2022 a la versión "Reapresentado" del propio
documento de 2023 (-R$55.071 mil en vez de los -R$24.642 mil originales cargados)? Es solo un cambio
de criterio contable en el reconocimiento de la combinación de negocios de la SAF (reconoció ~R$668-
698M de pasivo/intangibles adicionales no registrados originalmente), no un hecho económico distinto.

**Standard Liège (Bélgica)**: "Autres produits d'exploitation" (23,05M EUR, 52% del revenue) solo
desglosa el 33% (subsidios estatales, 7,5M) — el resto sin explicación textual en el documento.

**Union Saint-Gilloise (Bélgica)**: (1) "Subsides d'exploitation" (10,07M EUR) inusualmente grande
comparado con pares del mismo tamaño (Standard Liège 7,5M con revenue mayor, Antwerp 11,7M con
revenue mucho mayor) — ¿a qué corresponde exactamente? (2) Resto de "Autres produits d'exploitation"
(12,85M) y el split exacto de "Autres charges d'exploitation" (266.065 EUR) se perdieron en el
alineamiento OCR de la Nota 6.10 (pág. 25 del PDF) — candidato a re-verificar contra el PDF original.

**Westerlo (Bélgica)**: split exacto de "Andere bedrijfskosten" (307.928 EUR) entre impuestos y otros
sin explicar (mismo problema de alineamiento OCR que Union SG); residuo de redondeo de EUR 3.058 en
la conciliación de amortización de activos.

**Zulte Waregem (Bélgica)**: (1) residuo de "Andere bedrijfsopbrengsten" (1,38M EUR, ~7,5% del
revenue) sin explicar en ningún lado del documento. (2) Posible venta del "laatste commerciële
ruimte" (2,63M EUR) mencionada en el jaarverslag (pág. 45) sin que el documento ate el monto exacto a
esa operación — categorizado conservador como `other_income` (no `exceptional_items`, ver corrección
de categoría en el CHANGELOG de esta versión).

**Sint-Truiden/STVV (Bélgica)**: (1) "Andere bedrijfsopbrengsten" (16,0M EUR, 44% del revenue —
35% del revenue TOTAL sin desglosar) — dado que el club es propiedad del grupo japonés Spacenine/DMM
(conocido por desarrollar y vender jugadores hacia Europa/Japón), es PLAUSIBLE que sea total o
parcialmente resultado de transferencias, pero no hay confirmación textual — se cargó conservador
como `other_income`, no `player_sales`. (2) "Niet-recurrente bedrijfskosten" (2,3M EUR) sin explicar.

**Cercle Brugge (Bélgica)**: "Andere bedrijfsopbrengsten" (24,4M EUR, 56% del revenue) casi sin
desglose (solo 1.619 EUR de subsidios identificados) — el club es propiedad de AS Monaco (feeder),
mismo tipo de sospecha razonable de `player_sales` sin confirmación textual que Sint-Truiden, cargado
conservador. Nota 6.14 revela una condonación de deuda CONDICIONAL de 52,8M EUR de Monaco (fuera de
balance, no cargada) y plusvalías de transferencias de 6,6M EUR del mercado de verano 2025 (hecho
posterior al cierre de este ejercicio, no cargado).

**Dender EH (Bélgica)**: (1) "Overige bedrijfsopbrengsten" residual de 1,93M EUR (~21% del revenue)
es un valor IMPLÍCITO (despejado de la fórmula de "Brutomarge" del esquema VZW abreviado, que no lo
imprime como línea propia en ningún lado) — composición real sin confirmar. (2) No se pudo confirmar
si los EUR 1,67M de altas de "Immateriële vaste activa" son derechos federativos de jugadores (a
diferencia de otros clubes belgas donde el documento sí lo confirma explícito) — la amortización
quedó combinada en `depreciation` en vez de separar `player_amortisation`. (3) Nota de continuidad:
desde 2025-26 parte de la actividad pasa a "NV Dender Foot" (sociedad hermana), un ejercicio futuro
de esta VZW puede representar cada vez menos del negocio real del club.

**FC Fredericia (Dinamarca)**: ninguna duda crítica — el presidente 2019 (Morten Rahbek Hansen) está
confirmado con título explícito en el documento, a diferencia de varios clubes belgas de esta tanda.

**FC Nordsjælland (Dinamarca)**: (1) discrepancia de 1,49M DKK en D&A sin explicar (2 notas de
amortización no reconcilian exacto contra el total impreso del income statement, ~3,3% de diferencia
no explicada en ningún lado del documento). (2) ¿Existe una versión con desglose de Nettoomsætning
(el balance público usa la exención §32 danesa, sin desglosar revenue)?

**Randers FC y Vejle (Dinamarca)**: tratamiento de "kapitalandele i tilknyttede virksomheder"
(resultado de subsidiarias 100%/65%-controladas: Randers FC Jobakademi/Business Park Randers/Randers
Sports College; VB Plus ApS de Vejle) sumado a `netInterest` por ser línea financiera/no-operativa —
el modelo del sitio no tiene un campo meta dedicado para "resultado de participaciones", se usó el
más cercano disponible.

**SønderjyskE (Dinamarca)**: (1) formato muy agregado (exención §32, todo en `lump_football_operations`)
no es comparable 1:1 con Silkeborg/Viborg/AGF que sí tienen desglose — ¿conviene cargar además un
ejercicio 2013-2021 (con .md disponible) que sí desglose Nettoomsætning, mismo criterio que se usó
para elegir 2018/19 en FC Midtjylland? (2) `grossDebt` excluye conservadoramente "Gæld til
tilknyttede virksomheder" (11,76M DKK, deuda con partes relacionadas) y "Anden gæld" de corto plazo
(11,23M DKK, rótulo ambiguo) — podría revisarse. (3) El documento tiene una nota de cambio de clase
contable (§32→1.division desde jul-2021) que en una primera lectura parece contradecir que el club
jugó Superliga completa ESE ejercicio — la lectura aceptada es que la nota describe el régimen
vigente AL MOMENTO DE LA FIRMA (cuando el descenso ya estaba confirmado), no la liga jugada durante
el ejercicio; vale una segunda revisión si aparece duda real sobre la clasificación de liga.

**Istra 1961 (Croacia)**: (1) "Ostali neposlovni prihodi" neto (438.955 EUR, ~10% del revenue) sin
explicar en ninguna Bilješka de las páginas leídas — cargado en `assetSales` (campo meta reutilizado)
solo para que el PAT cierre. (2) El auditor tiene un párrafo de "Isticanje pitanja" remitiendo a la
Bilješka 22 (litigios judiciales en curso) sin cuantificar. (3) `grossDebt`/`cash` NO se cargaron
(quedan en 0 por default) — la Bilanca es un escaneo que no se llegó a OCRear esta sesión.

**Gorica (Croacia)**: (1) dentro de "Komercijalni prihodi" (79.158 EUR), 10.000 EUR (0,28% del
revenue) no se pudieron atribuir con confianza a un sub-ítem específico por gaps de OCR. (2)
`grossDebt` quedó como PISO (solo "Prekoračenja po bankovnim računima", 126.510 EUR) — la
reconciliación de pasivos no cerró exacta contra las líneas identificables en la transcripción (gap
de ~610.000 EUR sin explicar); valdría re-verificar contra el PDF renderizado como imagen.

**Botafogo (Río de Janeiro)**: (1) el balance de 2025 REEXPRESA el Prejuízo de 2024 en R$266.817 mil,
distinto de los R$299.983 mil ya cargados en `botafogoFiscalYearMeta[2024]` (diferencia exacta
R$33.167 mil, por reclasificación de venta de intangibles) — decidir en una sesión futura si conviene
actualizar el 2024 cargado al valor reexpresado, o dejar cada ejercicio con el número que su propio
documento de origen declaró en su momento. (2) Nota 19 "Outras despesas operacionais" de 2023
(R$64.117 mil: parcelamentos tributarios PERSE/Profut + Regime Centralizado de Execuções + dívida
BFR) es deuda LEGADO de la associação transferida a la SAF en el acuerdo de accionistas, categorizada
`other_expenses` — confirmar el criterio, puede repetirse en otros clubes brasileños con la misma
transición associação→SAF. (3) Gestión (presidente) de la SAF sigue sin confirmar para los 3
ejercicios cargados (2023/2024/2025).

**Bayern Munich 2022/23**: mismo pedido que ya existía para 2020/21 — ¿existe un Jahresabschluss/
Geschäftsbericht más completo (con desglose real de GuV por rubro) para este ejercicio también? El
documento cargado (`presseinformation-jhv-2022-23.md`) es tan agregado como el de 2020/21.

## Instituto (Córdoba) — sourcing, sesión 2026-09-26

**Ejercicio 2024-25 (cerrado 30/6/2025) nunca tuvo asamblea propia**: la "Convocatoria a Asamblea
General Ordinaria 2026" (institutoacc.com.ar, publicada 25/09/2026, asamblea 17/10/2026) salta
directo al Orden del Día del ejercicio cerrado el 30 de junio de **2026** — el 2024-25 no aparece
mencionado en ningún punto, ni en esta convocatoria ni en ninguna encontrada antes. ¿Qué pasó con
ese ejercicio: nunca se llevó a asamblea, se saltó a propósito, o se va a tratar retroactivamente
en algún momento no anunciado? Ver `Admin/sourcing/Argentina/Instituto.md`, Chequeo 2026-09-26. A quién
preguntarle: WhatsApp 3512 209813 (L-V 9-21hs) o asamblea@institutoacc.com.ar (mail habilitado
para consultas de la asamblea, según la propia convocatoria).

## Almagro — onboarding, sesión 2026-09-27

**"Asignacion Extraordinaria A.F.A" (Ejercicio 2021, Anexo III, $1.255.158,98)**: el rubro no aclara
su origen — a diferencia de "Ingreso A.F.A: dcho tv" (que el propio rótulo liga a derechos de TV),
este solo dice "extraordinaria". Se cargó como `other_income` en vez de `broadcasting` (judgment
call, no cubierto por el skill de categorización) por no poder confirmar si es un reparto de TV
excepcional o un aporte de otro tipo (ej. alivio post-pandemia). Ver la evidencia en `Admin/carga-clubes/almagro-ar.md`. A quién preguntarle: prensa@almagro.club.

**"Gastos de alimentos" (Ejercicio 2018, Anexo V, $3.911.226,61)**: costo de comida del plantel, sin
precedente explícito en `club-data-mapping/SKILL.md`. Se agrupó con `wages_squad` siguiendo el
precedente de Racing (club-data-mapping/referencia/formato-simplificado.md, "CASO CONSULTADO": costos no salariales del plantel bundle-ados con
salarios cuando no hay categoría más específica) — confirmar si es el criterio correcto o si
debería ir a `match_organisation_expense`/`other_expenses`.

## River Plate — sourcing vía CNV, sesión 2026-09-28

**¿River cambió su cierre de ejercicio de agosto a diciembre, o es un período de transición?**:
encontrado en la CNV (`aif2.cnv.gov.ar`, presentación #3525618, filed 15/05/2026) un estado
contable con Fecha de Cierre 31/12/2025 — los 123 ejercicios anteriores de River siempre cerraron
31/8. El PDF (`Clubes/Argentina/River/estados-contables-cierre-2025-12-31.pdf`, 15,3 MB) no tiene
capa de texto en las páginas numéricas, así que no se pudo leer el período exacto que cubre (¿un
ejercicio irregular set-2024/dic-2025 de ~16 meses, cubriendo lo que hubiera sido el Ejercicio 124
completo? ¿un ejercicio normal set-2025/dic-2025 que implicaría un Ejercicio 124 corto no
encontrado?). El acta de asamblea que lo aprueba está adjunta a la misma presentación
(`acta-asamblea-estados-contables-cierre-2025-12-31.pdf`) y debería aclararlo. Ver
`Admin/sourcing/Argentina/River.md` para el detalle completo del hallazgo. Responderla en la sesión que
transcriba estos documentos, antes de mapear el ejercicio a `river-ar-data.js` — no asumir el período
sin leerlo.

## Sourcing de Europa del Este (sesión 2026-10-03): preguntas de mapeo y de clubes

- **Hungría**: Kisvárda (¿base de la Kft. de fútbol o la `összevont` con la asociación?), DVSC (cifras consolidadas del grupo, no solo de la Zrt.), Újpest (cierres al 30-jun y al 31-dic: ¿cómo se mapea el ejercicio?), Ferencváros (¿solo FTC Labdarúgó Zrt. o también la asociación madre? los PDF de la asociación quedaron aparte).
- **Eslovaquia**: Slovan (¿individual o consolidado?), Podbrezová (¿FK o ŠK `a.s.`?).
- **Polonia**: Wisła Kraków (el ejercicio de transición se rotula "01.01.2021-30.06.2022" pero 2021 ya está publicado: probablemente 01.01-30.06.2022), Lechia (primer archivo dice "01.07.18_30.06.18": ¿2017/18 o 2018/19?), Arka (dos informes de gestión con año ilegible).
- **Rumanía**: CFR Cluj (¿qué entidades consolida el "consolidat" 2024-25?), Csíkszereda (¿existen estados 2022-2023, cuando jugó Liga 2?).
- **Bulgaria**: CSKA 1948 (el club profesional opera dentro de la asociación 177080120 o a través de otra sociedad; la 200269839 no presenta nada), Botev Plovdiv (sin presentaciones antes de 2022).
- **Serbia**: Crvena zvezda (confirmar figura jurídica y matični broj; el brief decía a.d.), Partizan (el archivo 2025 se llama "audit-opinion" pero trae estados y notas completos).
- **Letonia**: Riga FC (patrimonio neto de -5,16 M EUR en 2021 a +0,79 M en 2025: ¿condonación o aporte de capital?), Valmiera (facturación de 0 a 1,69 M EUR y activos de 1,6 M a 73 mil: ¿traspaso de actividad?).
- **Kazajistán**: Kaspiy FK (el DFO solo tiene 2021-2022). **Georgia**: Dinamo Batumi (reportal.ge hasta 2022).
- **Ucrania**: Dynamo Kyiv (la consolidada bajada de Wayback, ¿es 2020 u otro año?).

## Salernitana (onboarding de Italia, sesión 2026-10-08, el ejercicio 2022 se cargó con el comparativo del año siguiente)

- **¿Nos pueden mandar una copia legible del estado de resultados (conto economico) del bilancio al 30/6/2022?** El PDF que tenemos es un escaneo de 72 ppi, las
  págs. 15 y 16 no se leen y el OCR erró unas 25 cifras. El ejercicio 2022 se cargó con la columna "2022" del bilancio al 30/6/2023, que cierra con el resultado
  impreso (-16.787.729). Mismo total de costos operativos (58.952.860) pero ese comparativo está reclasificado: "Oneri per servizi esterni" 6.216.789 y "Altri oneri"
  4.960.945, mientras las notas del propio documento de 2022 dicen 6.489 y 4.689 (miles; la suma de los dos es la misma, 11,18 M).

## Volos NFC (auditoría de rutina, to-do 219, sesión 2026-10-13: no frena ninguna carga)

- **¿Cuánto fue el costo de personal del ejercicio 2019-20?** La nota 8 de los estados al 30/6/2021 (Volos_notes_2021-06-30.md L189) da,
  como año anterior, un costo total de personal de 206.287,62; los estados al 30/6/2020 imprimen 481.982,86 para ese mismo ejercicio
  ("Παροχές σε εργαζόμενους", cargado en wages_squad). 206.287,62 coincide con lo cargado para 2019. ¿Es un error del comparativo de 2021,
  o un cambio de período o de criterio? Lo cargado de 2020 sale de su propio documento (481.982,86) y no se tocó.

## PAOK (onboarding de Grecia, lote 71, sesión 2026-10-14: no frena la carga)

- **¿Qué incluye "Αμοιβές τρίτων" del cuadro de gastos del departamento de fútbol?** En 2024-25 son 41.978.663,94 € (PAOK_FS_2025-06-30.md
  L1109; 32.213.945,18 en 2023-24), contra 4.983.339,90 de "Αμοιβές προσωπικού" (L1108). La nota 17 (L1193-L1215) da 9.248.501,86 € de costo
  de personal para 265 personas, 80 de ellas futbolistas. ¿Los contratos de jugadores y cuerpo técnico se pagan como honorarios a terceros
  (y están en esa línea)? Se cargó como wages_squad (decisión de Guido, 2026-10-14) a la espera de esta respuesta; si no, va a other_expenses.

## Rio Ave (onboarding de Portugal, lote 76, sesión 2026-10-15: no frena la carga)

- **¿Cómo se repartieron los ingresos de 2016-17?** El estado de resultados (relatorio-contas-2016-17.md L252-255) da TV 2.230.000 y
  patrocínio 1.021.832,90 (bilheteira 456.302,97, comerciais 39.757,15); la nota 22 (L1253-1256) da TV 3.230.000 y patrocínio 68.767,72
  (bilheteira 404.422,90, comerciais 44.600). Los dos suman 3.747.893,02; la nota mueve 1.000.000 de patrocínio a TV también en la
  columna de 2015-16. Se cargó el reparto del estado (sigue la serie del club: 2017-18 TV 2.200.000, estado y nota iguales).

## Sarpsborg 08 (onboarding, lote 94, sesión 2026-10-19: no frena la carga)

- **¿Qué incluye "Salgskostnader" del estado de resultados 2025?** Son 65.871.707 NOK (aarsregnskap-fotballforening-fli-2025.md L1372;
  61.027.262 en 2024), contra 134.979.734 de "Salg/utleie spillere" (L1368). ¿Es el costo de las ventas de jugadores (valor en libros,
  comisiones, porcentajes a terceros) o costo de mercadería y otras ventas? Se cargó como other_expenses a la espera de esta respuesta; si es
  costo de ventas de jugadores, va con la venta de jugadores.

## FC St. Gallen (onboarding, lote 94, sesión 2026-10-19: no frena la carga)

- **¿Cómo se reparten los 9.512 mil CHF de "Diverse Erträge inklusive Swiss Football League"?** (geschaeftsbericht-2024-25.md L327). Mezcla
  los derechos de TV que reparte la Swiss Football League, premios de la UEFA y otros ingresos. Se cargó como other_income; con el reparto,
  la parte de TV iría a broadcasting y los premios a competition_bonus.
- **¿Qué parte de "Erträge von Gönnern und Mitgliedern" (1.246 mil CHF, L329) son cuotas de socios y qué parte donaciones?** Se cargó como
  member_dues.

## Gestiones sin fecha confirmada (tanda Admin/gestiones-por-pais/tanda-2026-10-14-2, sesión 2026-10-15: no frena ninguna carga)

Ni los balances ni una búsqueda web dan las fechas; el detalle de cada caso está en el `resultado-N.json` de la tanda (notas y dudas).
- **Beerschot, hasta cuándo presidió Selahattin Baki** (tanda-2026-10-19, lote 1): nombrado voorzitter el 7/1/2025; en agosto de 2026
  aparece Yusuke Ohno, sin fecha de relevo. Deja sin cubrir el cierre 30/6/2025. — a quién preguntarle: K Beerschot VA.
- **Lommel SK, desde y hasta cuándo presidió Paul Kerkhofs** (tanda-2026-10-19, lote 4): Sporza lo llama "huidig voorzitter" en mayo
  de 2020; Harm van Veldhoven lo sigue en febrero de 2021. Cierres 30/6/2018 y 30/6/2020. — a quién preguntarle: Lommel SK.
- **Patro Eisden, desde cuándo presidió Robert Stevens** (tanda-2026-10-19, lote 5): figura en el ejercicio 2015-16 sin fecha de
  asunción. Cierre 30/6/2016. — a quién preguntarle: K. Patro Eisden Maasmechelen.
- **RWDM, desde cuándo condujo Thierry Dailly** (tanda-2026-10-19, lote 6): gedelegeerd bestuurder en los balances 2019 y 2020, dueño
  hasta la venta a John Textor (24/12/2021); la fecha de inicio (2015) es aproximada. — a quién preguntarle: RWDM.
- **Estoril Praia, quién presidía al 30/6/2025** (tanda-2026-10-19, lote 21): Ignacio Beristain anunció su salida el 10/6/2025 sin fecha
  efectiva ni sucesor; el relatório 2024/25 lista solo vogais al cierre (L88-94). — a quién preguntarle: Estoril Praia SAD.
- **Tartu Tammeka, quién presidió 2019-2024** (tanda-2026-10-19, lote 19): ninguna fuente nombra presidente (o juhatuse esimees) en
  esos años; Kristjan Tiirik es miembro de la junta y gerente desde 2010; Kaarel Kiidron, presidente desde agosto/septiembre de 2025.
  — a quién preguntarle: Tartu JK Tammeka.
- **Harju JK Laagri, quién preside el club** (tanda-2026-10-19, lote 13): Kalmar Liiv figura como gerente (tegevjuht) y único firmante
  de los informes; Wikipedia lo llama "Chairman" sin fecha. Cierres 2023-2025. — a quién preguntarle: Harju JK Laagri.
- **Cruzeiro, en qué fecha se cerró la compra de la SAF por Pedro Lourenço** (tanda-2026-10-18, lote 6): el acuerdo se firmó el
  29/4/2024 sujeto al CADE y a la concordancia de la Cruzeiro Associação (informativo-financeiro-2023.md:2101); el CADE aprobó el 12/6/2024
  (O Tempo). Cualquier fecha deja los cierres 2024 y 2025 con Lourenço, pero ninguna fuente da el cierre formal. — a quién preguntarle:
  Cruzeiro SAF.
- **Novorizontino, quién presidió desde la fundación (marzo de 2010) hasta Genilson da Rocha Santos (2012)** (tanda-2026-10-18, lote 2):
  el balance 2010 lo firma Alex Sandro Domingues Pereira como presidente de la diretoria executiva (balanco-2010.md:36-41), sin fuente con
  fechas. — a quién preguntarle: Grêmio Novorizontino.
- **Estoril Praia, quién presidía el conselho de administração de la SAD al 30/6/2025** (tanda-2026-10-17, lote 16): Ignacio Beristain
  anunció su salida el 10/6/2025 "antes de la nueva temporada" (A Bola) sin fecha efectiva; el balance 2024/25 (aprobado el 28/10/2025) lo
  firma Begoña Santiago, que según Record (1/5/2026) asumió "hace unos siete meses". ¿Fecha efectiva del cambio? — a quién preguntarle:
  Estoril Praia SAD (o el registro comercial).
- **CRB, quién presidía al 31/12/2020**: Marcos Barbosa presidió "entre 2011 y este início de 2021" (Gazeta Web); Mário Marroquim asumió el
  1/4/2021 y ya firma el balance 2020 (balanco-patrimonial-2020.md:69). ¿Hasta cuándo siguió Barbosa, hubo prórroga o un interino entre
  el 1/1 y el 1/4/2021? — a quién preguntarle: Conselho Deliberativo del CRB.
- **Cuiabá, cuándo pasó la presidencia de Alessandro Dresch a Cristiano Dresch**: en junio de 2023 la prensa nombra presidente a Alessandro
  y en diciembre a Cristiano; el balance 2022 lo firma Alessandro y los de 2023-2025 Cristiano, como "Sócio-Administrador". ¿Fechas de las
  dos gestiones? (cierres 2022-2025).
- **Vila Nova, quién presidía al 31/12/2014**: Rodrigo Nogueira era interino desde el 18/3/2014 y Gutemberg Veronez asumió "a fines de
  2014"; las notas explicativas 2014 las firma como Presidente Joás Abrantes (notas-explicativas-2014.md:128-130), que habría renunciado
  en marzo.
- **Ferroviária 2023 (SAF), quién conducía**: Juliano Malara se presentaba como presidente pero era uno de tres directores ejecutivos;
  el presidente del Consejo de Administración era Filippo Bertolucci (desde dic-2022 según una fuente secundaria). Además es una
  pregunta de criterio: en una SAF, ¿se carga al presidente del consejo o al director-presidente? Ferroviária 2010-2013 (Welson Alves
  Ferreira Júnior, fechas "2010 a 2014" sin fuente abrible) queda igual sin confirmar.
- **OFI Crete 2018**: al 30/6/2018 el club estaba bajo una administración provisoria de 7 miembros (juzgado de Heraklion, 11/1/2018) sin
  presidente nombrado; queda sin gestión (decisión de Guido, 2026-10-15) salvo que el ΓΕΜΗ diga quién la presidía.

**Paide Linnameeskond (Estonia)**: en el informe 2025, Lisa 10 ("Jagatud annetused ja toetused"), ¿a quién se pagan los "Stipendiumid" (40.300 €) y los "Toetused" (391.099 €): a jugadores del primer equipo o a deportistas de la academia? Se cargaron como sueldos del plantel (wages_squad), igual que los pagos a deportistas de Nõmme Kalju y Flora (2026-10-18).

**FCI Levadia (Estonia)**: en los informes 2019 y 2020, ¿a quién se paga el gasto "Liikmemaks" (323.479 € en 2019 y 72.986 € en 2020)? Es una cuota que el club PAGA (no un ingreso de socios); se cargó como gastos de administración (admin_general_expense) (2026-10-18).

## Colo-Colo (Blanco y Negro) (onboarding, lote 103, sesión 2026-10-19: no frena la carga)

- Informe 2025, nota 21 "Gastos de administración": el subtotal de la nota suma 10.955.346 y el estado de resultados muestra 10.838.114, 117.232 de diferencia
  (en 2024 coinciden). Hay dos importes sueltos sin rótulo en la nota (un guion y 171.225). ¿Qué renglón de la nota sobra o está mal impreso? Se carga el valor del estado.

## FC Emmen (sourcing, sesión 2026-10-21: no frena la carga; pedírselo al club)

- **Informe del auditor (controleverklaring) del ejercicio 2020-21** (y el 2019-20): el F.04 que publica el club solo dice que las cifras salen de la jaarrekening de FC Emmen B.V., «waarbij een accountantsverklaring is verstrekt», pero no trae el informe. La jaarrekening completa solo existe en el Handelsregister de la KvK, de pago (€3,90 cada una; Guido decidió no comprarla). ¿Nos pueden mandar la jaarrekening 2020-21 (y la 2019-20) con la controleverklaring?

## Juventude y Ponte Preta (onboarding, lote 103, sesión 2026-10-19: no frena la carga)

- **Juventude 2021**: tiene planes de sócio-torcedor (Jaconero; búsqueda web), pero "Receitas Patrimoniais" y "Outras Receitas" no desglosan dónde registra las mensalidades. ¿En qué línea del balance están?
- **Ponte Preta 2025**: tiene el programa "Torcedor Camisa 10+" (19.130 sócios-torcedores según el Torcedômetro). ¿Las mensalidades están en "Social / Outras" (2.692.000 en 2025)?

## Alianza FC (auditoría, sesión 2026-10-27: no frena la carga; pedírselo al club)

- **Dictamen del revisor fiscal del ejercicio 2025** (`Clubes/Colombia/Alianza FC/dictamen-revisor-fiscal-2025.md`): está fechado «Marzo 29 de 2025» y dice «a 31 de diciembre de 2025», es decir, firmado nueve meses antes del cierre; parece el de 2024 con el año retocado (el de 2024 está fechado «Marzo 29 de 2025», con la firma del pie en «2024»). ¿Cuál es el dictamen firmado de los estados de 2025, con su fecha?