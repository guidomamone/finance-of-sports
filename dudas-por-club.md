# Dudas por club

Este archivo es para anotar preguntas puntuales que quedaron SIN respuesta clara después de leer los
documentos oficiales de un club — cosas que valdría la pena preguntarle directo al club (prensa,
área de socios, o quien corresponda) en vez de asumir o inventar un criterio. Complementa a
`fuentes-por-club.md` (que es sobre DÓNDE está cada documento) y a los comentarios de cada
`data/<club>-data.js` (que son sobre CÓMO se categorizó cada línea puntual) — acá van específicamente
las preguntas abiertas, para no perderlas sueltas en el medio de un comentario de código.

Cómo se agrega algo acá: una sección por club, una línea por pregunta, con el formato:

- **[tema de la pregunta]**: [la pregunta concreta, con la cita/página/documento exacto de donde
  salió la duda] — a quién preguntarle: [contacto, si ya se investigó uno en `fuentes-por-club.md`].

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
  clubaunion.com.ar cuando el sitio esté online, ver `fuentes-por-club.md`) una copia completa que
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

## Otros clubes (si se agregan más adelante)

*(agregar una sección nueva por club acá)*
