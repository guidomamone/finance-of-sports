# Test de barridos — Haiku+Sonnet vs. Sonnet solo, y si Exa vale la pena

**Por qué existe este archivo (2026-09-26).** La sesión de sourcing de los 40 clubes tradicionales
de Argentina encontró, sobre la marcha, que reintentar Wayback CDX de dominio completo en clubes
"ya cubiertos" rinde (Boca, Unión, Gimnasia LP). De ahí salió una propuesta de escalera de ejecución
nueva (`.claude/skills/club-sourcing/SKILL.md` sección 0.1b, marcada EN PRUEBA): Haiku para el
descubrimiento mecánico de un club nuevo, Sonnet solo para el 2do barrido, y recién con una señal
real, Exa/Opus para barridos más caros. Este archivo mide si esa apuesta se sostiene con datos antes
de asumirla como regla del proyecto.

**Es un reporte de test, no un archivo vivo.** Se actualiza mientras corre el test, y cuando termine
queda como registro — no hace falta mantenerlo sincronizado con el estado del proyecto después.

---

## Test 1 — costo/tiempo: Haiku+Sonnet vs. Sonnet solo

**Población**: los 23 clubes argentinos que seguían en "barrido 1" shallow (mismo chequeo
automatizado del 2026-09-22, ninguno tocado en la sesión de hoy) — el universo más homogéneo
disponible para comparar sin mezclar país ni profundidad de partida.

**Split aleatorio, seed fija (42, reproducible con Python `random.seed(42)` sobre la lista
alfabética de los 23 clubes)**:

- **Grupo A — Sonnet solo (control), n=11**: Almirante Brown, Central Norte (Salta), Ciudad de
  Bolívar, Deportivo Madryn, Estudiantes (BA/Caseros), Estudiantes de Río Cuarto, Ferrocarril
  Midland, Gimnasia y Esgrima (Jujuy), Gimnasia y Esgrima (Mendoza), Güemes (Santiago del Estero),
  Tristán Suárez.
- **Grupo B — Haiku (descubrimiento) → Sonnet (verifica), n=12**: Acassuso, Agropecuario (Carlos
  Casares), Atlético de Rafaela, Barracas Central, Colegiales (Munro), Defensa y Justicia,
  Deportivo Maipú (Mendoza), Deportivo Riestra, Mitre (Santiago del Estero), Racing Club (Córdoba,
  Nueva Italia), San Miguel, San Telmo.

**Métrica**: tokens totales y duración por club (agregado por lote de agente, ver limitación abajo),
más si el club cerró como dead-end / candidato a mail / hallazgo real.

**Limitación reconocida de entrada**: para no lanzar 23 agentes sueltos, cada arm corrió en lotes de
~4 clubes por llamada de agente — el tokens/tiempo que se reporta es un promedio del lote, no una
medición aislada por club. Suficiente para ver un efecto GRANDE (que es lo que se espera si Haiku
cuesta 10-20x menos por token en el paso mecánico), no para detectar un efecto chico.

### Resultados (parcial, se completa a medida que cierran los agentes)

**GRUPO A — Sonnet solo (control)**

| Lote | Clubes | Tokens | Tool calls | Duración | Hallazgos |
|---|---|---|---|---|---|
| 2 | Estudiantes BA/Caseros, Estudiantes Río Cuarto, Ferrocarril Midland, Gimnasia Jujuy | 195.295 | 41 | 343s | 3/4 pasaron a "candidato a mail" con ejercicio exacto (antes "sin PDFs" genérico); Ferrocarril Midland cerrado dead-end real. 0 PDFs nuevos. Detectó y descartó un cruce de homonimia (Gimnasia Jujuy vs. Gimnasia La Plata) antes de cargar mal un balance ajeno. |
| 3 | Gimnasia Mendoza, Güemes SdE, Tristán Suárez | 187.302 | 48 | 408s | Los 3 dead-end real confirmado, escalera completa agotada. 0 PDFs. Tristán Suárez reveló un bloqueo estructural nuevo (gestión de socios en portal externo DigitalClub con login). |
| 1 | Almirante Brown, Central Norte Salta, Ciudad de Bolívar, Deportivo Madryn | 175.128 | 77 | 565s | 3/4 pasaron a "candidato a mail" (Central Norte Salta con 4 ejercicios completos auditados y aprobados, el hallazgo más fuerte del grupo); Ciudad de Bolívar dead-end real (dominio ni siquiera resuelve DNS). |

**GRUPO A — TOTALES FINALES (11 clubes, 3 lotes)**: 557.725 tokens, 166 tool calls, 1.316s de
duración total de agente. **Promedio: 50.702 tokens/club, 15,1 tool calls/club, ~120s/club.**
8/11 terminaron como "candidato a mail" con ejercicio(s) confirmado(s) por prensa, 3/11 dead-end
real. 0 PDFs descargados en los 11 — coherente con que son los clubes "barrido 1" con menos rastro
digital del universo de 40 tradicionales.

**GRUPO B — Haiku descubre → Sonnet verifica**

Etapa Haiku (los 3 lotes ya cerraron):

| Lote | Clubes | Tokens | Tool calls | Duración | Hallazgos de Haiku |
|---|---|---|---|---|---|
| 1 | Acassuso, Agropecuario, Atlético de Rafaela, Barracas Central | 98.357 | 54 | 233s | 0 PDFs, pero Atlético de Rafaela con señal fuerte (2 cifras concretas de asamblea vía prensa) |
| 2 | Colegiales Munro, Defensa y Justicia, Deportivo Maipú, Deportivo Riestra | 97.037 | 44 | 351s | **Calidad floja**: bajó 4 PDFs, NINGUNO es un balance real — 1 de un Colegio de Abogados por coincidencia de nombre ("Colegiales"), 1 resolución municipal, 1 libro histórico, 1 archivo corrupto de 167 bytes. Defensa y Justicia sí trajo señal real (ejercicio n°91, superávit USD 3.456M, vía texto del sitio). |
| 3 | Mitre SdE, Racing Cba Nueva Italia, San Miguel, San Telmo | 116.792 | 65 | 224s | 0 PDFs, sin señal fuerte de prensa en ninguno de los 4. |

**Lote 3 verificado — tercer perfil de error, distinto de los otros dos**: acá el problema no fue un
falso positivo (lote 2) ni profundidad insuficiente con la misma herramienta (lote 1), fue
CARACTERIZACIÓN IMPRECISA de algo que Haiku ya había encontrado. En Racing Club (Córdoba, Nueva
Italia), Haiku había resumido un post del sitio del club como "prensa confirma lectura de balance en
asamblea" — Sonnet abrió el post completo y encontró que es el CLUB MISMO confirmando, con fechas
exactas de 2 ejercicios (cierres 30/04/2022 y 30/04/2023). Prensa-vs-fuente-primaria cambia la
clasificación de la sección 0.3 del skill (de "revisar sin fecha fija" a "candidato a mail activo").
En San Miguel, Haiku no corrigió un dato obsoleto de una sesión previa ("sitio prácticamente vacío",
que ya no era cierto) y dejó sin explorar el portal de socios real (estaba mal anotado con un dominio
que no era). En Mitre SdE, Haiku otra vez dejó sin correr el Wayback CDX completo en 2 de 3 dominios
candidatos — el paso más barato y el que más rindió en el resto de la sesión de hoy. San Telmo fue el
único de los 12 clubes del Grupo B donde Sonnet confirmó que el trabajo de Haiku ya estaba completo
y no encontró nada para agregar.

Etapa Sonnet (verificación), resultados a medida que cierran:

- **Lote 2 verificado — CERO de los 4 hallazgos de Haiku sobrevivió intacto**: Colegiales confirmado
  falso positivo (y peor: el "PDF" ni siquiera era un PDF, era la página anti-bot de Cloudflare
  guardada con extensión `.pdf` — Haiku no lo abrió para chequear). Deportivo Maipú confirmado falso
  positivo (documento real del club pero no financiero, una resolución municipal). Defensa y
  Justicia: acertó el club, se equivocó en el tipo de documento (libro histórico, no balance) — Y
  el dato financiero que había llegado en el reporte de Haiku a esta sesión estaba mal (moneda
  incorrecta, USD en vez de ARS, y cifra/ejercicio cruzados; corregido por Sonnet cruzando con el
  archivo del club ya existente). **Deportivo Riestra es el caso GRAVE**: Sonnet reintentó la
  descarga que a Haiku le había quedado corrupta, y esta vez bajó un PDF real y bien formateado de
  "Memoria y Ejercicio Balance N°61" — que resultó ser de una COOPERATIVA ELÉCTRICA de un pueblo de
  Buenos Aires con apellido "Riestra", sin ninguna relación con el club de fútbol. Si ese documento
  se hubiera cargado sin la verificación de Sonnet, el sitio habría publicado datos financieros de
  la entidad equivocada como si fueran del club — el riesgo real de integridad de datos que este
  diseño de 2 etapas existe para prevenir.

**Lote 1 verificado — perfil de error distinto al lote 2, más leve pero real**: Haiku acertó los
números crudos (0 PDFs, CDX en 0) en los 4 clubes, pero se quedó CORTO en profundidad con la MISMA
herramienta ya en mano: en Atlético de Rafaela había 4 ejercicios consecutivos con cifras concretas
(2022 a 2025, incluido un déficit que Haiku no vio), y Haiku solo había citado 2 — usando la misma
API de WordPress, con el mismo esfuerzo. En Barracas Central, Haiku mencionó "prensa confirma
aprobación" sin citar la fuente ni el año, que Sonnet tuvo que rebuscar de cero — una señal sin cita
no es accionable para una sesión futura, casi tan costosa como no tener la señal. Y en Acassuso,
Haiku afirmó que el sitio "se recuperó" del 503 cuando en realidad seguía caído en 3 reintentos de
Sonnet — un error de observación, no de búsqueda.

**Costo por lote, Haiku + Sonnet:**

| Lote | Haiku | Sonnet (verifica) | Total | Tokens/club | vs. Grupo A (50.702) |
|---|---|---|---|---|---|
| 1 | 98.357 | 148.662 | 247.019 | 61.755 | +22% |
| 2 | 97.037 | 159.616 | 256.653 | 64.163 | +27% |
| 3 | 116.792 | 175.572 | 292.364 | 73.091 | +44% |
| **Total (12 clubes)** | **312.186** | **483.850** | **796.036** | **66.336** | **+30,8%** |

**LOS 3 LOTES, SIN EXCEPCIÓN, van CONTRA la hipótesis de ahorro** — Haiku+Sonnet costó 30,8% más caro
que Sonnet solo en tokens, y también más en tool calls (25,8/club vs. 15,1/club) y en duración de
agente (194s/club vs. 120s/club). No es un lote atípico: los 3 muestran el mismo signo, con
magnitudes crecientes (22% → 27% → 44%), y el motivo se repite en las 3 evaluaciones de Sonnet: la
etapa de verificación no fue un "sí/no" rápido sobre candidatos sólidos, fue REHACER una porción real
del barrido — re-descargar lo que Haiku dejó corrupto o truncado, profundizar donde se quedó corto
con la misma herramienta ya en mano, releer contenido que había resumido de forma imprecisa
(prensa-vs-fuente-primaria), y corregir cifras mal reportadas.

**Calidad, no solo costo — el resultado es matizado**: 8/11 clubes del Grupo A terminaron como
"candidato a mail" contra 4/12 del Grupo B — pero esto probablemente sea el azar de la asignación
aleatoria (algunos clubes tienen más cobertura de prensa que otros, y n=11/12 es chico) más que un
efecto del método. Lo que SÍ es atribuible al método: en los 12 clubes de Grupo B, Sonnet encontró
algo para corregir/completar en TODOS excepto San Telmo (11/12) — desde errores graves (Deportivo
Riestra: casi se carga el balance de una cooperativa eléctrica ajena) hasta omisiones menores (San
Miguel: un dato obsoleto sin actualizar). El diseño de 2 etapas SÍ cumplió su función de red de
seguridad — el problema es que la red de seguridad terminó costando más que hacer el trabajo directo.

Etapa Haiku, provisorio (12 clubes): ~26.016 tokens/club, ~13,75 tool calls/club, ~68s/club — bastante
menos que el Grupo A por club, pero falta sumar la etapa Sonnet (lanzada, corriendo) para comparar el
costo TOTAL del método de 2 pasos contra el de 1 paso.

**Primer indicio de calidad**: en el lote 2 completo (4 de 12 clubes del Grupo B), Haiku descargó
archivos que parecían candidatos por el nombre pero NO eran del club correcto o estaban corruptos —
0 de esos 4 hubiera pasado una verificación mínima. Es exactamente el tipo de error que la etapa
Sonnet está diseñada para atajar, pero también la evidencia más clara hasta ahora de que Haiku SOLO,
sin handoff a Sonnet, no sería confiable.

**Test 2 (ver abajo) destapó un gotcha real de Haiku**: al pedirle la CDX de `bocajuniors.com.ar`
(dominio con 100k+ URLs archivadas), Haiku reportó "no aparece indexado en Wayback Machine CDX" —
FALSO. Verificado a mano: el dominio SÍ tiene datos (confirmado con `curl` directo, primeras 10 URLs
devueltas sin problema). Hipótesis: la query sin límite sobre un dominio gigante tarda o devuelve
algo que Haiku no supo interpretar, y en vez de reintentar concluyó "no hay nada" — exactamente el
tipo de falla que la verificación de Sonnet está para atajar. Anotado en lessons learned.

---

## Test 2 — ¿Haiku se pierde algo que Sonnet encontraría? (benchmark de recall, no es A/B)

Un Haiku de descubrimiento puro, SIN contexto de la sesión de hoy, corre sobre 4 clubes donde ya se
sabe la respuesta real (encontrada hoy mismo con Sonnet + Wayback CDX de dominio completo):

- **Almagro** → 6 balances reales (Ejercicios 80-85, 2018-2023).
- **Unión (Santa Fe)** → Balance-114 completo + EECC 2018 + 3 presupuestos 2022.
- **Gimnasia y Esgrima (La Plata)** → Balance del Ejercicio 134 (2020-21).
- **Boca Juniors** → balances Ejercicios 118/119 + presupuestos 119/120.

Si Haiku encuentra los mismos candidatos solo, confirma que el ahorro viene de sacarle a Sonnet el
paso mecánico, no de que Sonnet "piensa mejor" en el descubrimiento.

### Resultados

Haiku, 94.858 tokens, 21 tool calls, 214s, para los 4 clubes.

- **Almagro**: Haiku encontró 9 documentos financieros MÁS que no estaban en la carpeta (Balance
  2016-17, 2017-18, 2019-20, 2020, Memoria 2017/2018/2019, EECC-2017, Memoria-y-Balance-2017) —
  más de lo que Sonnet había bajado hoy temprano (6 ejercicios, 80-85). Fuerte a favor de que el
  paso mecánico funciona; pendiente que Sonnet abra y verifique estos 9 antes de confiar en ellos
  (pueden solaparse en contenido con los ya cargados, con otro nombre).
- **Unión**: Haiku reencontró los mismos 9 archivos que Sonnet ya había probado y descartado por
  truncamiento (EECC 2010-2017 + 2021, Presupuestos 2019-2020) — coincide exactamente con lo ya
  sabido, sin falsos negativos ahí. PERO sumó 1 candidato nuevo no probado antes:
  `MEMORIAS-CLUB-ATLETICO-UNION-DE-SANTA-FE-2021.pdf` (865.432 bytes, snapshot 20220131124821) —
  pendiente de bajar y confirmar si abre sano.
- **Gimnasia LP**: 0 nuevos — coincide con que ya está agotado. Buena señal (sin falsos positivos ni
  negativos).
- **Boca**: Haiku reportó "0 documentos, dominio no indexado en Wayback" — ES FALSO, verificado a
  mano (ver nota en Test 1 de arriba). **Este es el hallazgo más importante del benchmark**: Haiku
  no falla por "no buscar bien", falla por no reintentar/diagnosticar cuando una query grande no
  responde como espera, y reporta un falso negativo con la misma confianza que un resultado real.

---

## Test 3 — ¿Exa vale la pena o es una boludez?

**Diseño**: Exa no entra en los barridos 1/2 (ver skill, sección 0.1b) — es un paso de barrido 3,
reservado para clubes con señal real que ya agotaron sitio oficial + Wayback CDX + búsqueda web
genérica. El test más limpio no es correrlo contra clubes nuevos, es correrlo contra clubes que YA
se cerraron como dead-end real esta misma sesión (agotados a fondo con el método actual) y ver si
Exa encuentra algo que el resto no encontró.

**Clubes**: Huracán, Quilmes Atlético Club, Independiente Rivadavia, San Martín (San Juan),
Deportivo Morón — los 5 dead-ends reales confirmados hoy (no candidatos a mail, sin ninguna señal de
prensa) del barrido de los 40 tradicionales.

**Herramienta**: `node tools/exa-search.mjs "<query>" --numResults 5` (armado por otra sesión en
paralelo mientras corría este test, `Admin/exa/.env` con la key de Guido). Una query de 1 línea por
club, tipo `"balance auditado memoria y balance <nombre del club> Argentina"`.

### Resultados

**VEREDICTO: Exa vale la pena, con matices.** En 2 de los 5 dead-ends "reales" de hoy, la primera
query encontró algo que la escalera completa (sitio oficial + Wayback CDX + búsqueda web + prensa)
había agotado sin encontrar:

- **Huracán — REABIERTO.** Exa encontró (1) un sitio de hinchas histórico,
  `aguantehuracan.com.ar`, que en 2010 y 2013 publicó desgloses de balance con cifras reales línea
  por línea (ej. tabla completa del Balance al 30/6/08, activo/pasivo/resultado con las 2 versiones
  y sus diferencias) — un canal que ninguna de las 4 familias de la escalera estándar mira (no es el
  sitio oficial, no está en el dominio de Wayback CDX que se corrió sobre `cahuracan.com`, y la
  búsqueda web genérica no lo había traído); y (2) una nota de prensa de mayo 2026
  (`boscoproducciones.com.ar`) sobre una asamblea CONVOCADA para ratificar los balances 2018, 2019,
  2020 y 2022, y aprobar los de 2023/2024/2025 — o sea, el club va a regularizar y publicar años
  completos de historia financiera pronto. Huracán pasa de "dead-end real" a "reabierto, candidato a
  mail fuerte + revisar aguantehuracan.com.ar a fondo".
- **San Martín (Tucumán) — la query de San Juan lo encontró por error, y fue un acierto.** La query
  apuntada a San Martín de San Juan devolvió (por ambigüedad semántica del nombre) el "informe de
  gestión de 120 días" de San Martín de TUCUMÁN, colgado en el sitio de un medio de prensa
  (`eltucumano.com`), no del club — **descargado y verificado, 52 páginas, sano**. Ese documento ya
  se sabía que existía (candidato a mail desde temprano hoy) pero no se había encontrado el link
  directo. Gotcha anotado abajo: Exa puede confundir clubes homónimos o de nombre parecido, igual
  que WebSearch — hay que revisar el dominio/contexto de cada resultado, no confiar en el título solo.
- **San Martín (San Juan)** (la query real): sin PDF, pero sí una confirmación nueva y útil —
  convocatoria a asamblea del 21/9/2026 que fija el EJERCICIO FISCAL del club en abril-marzo (no
  julio-junio como la mayoría) — dato que no estaba documentado. Sigue sin señal de documento
  descargable, dead-end se mantiene.
- **Deportivo Morón**: sin documento oficial, pero sí una nota de prensa de 2021 (El Cactus) con un
  desglose de deuda LÍNEA POR LÍNEA (18 ítems, total $46.637.836,75) — no es un balance auditado del
  club, es reporteo de prensa, pero es contenido financiero real y específico que la escalera
  estándar no había encontrado. No alcanza para reabrir como "documento real", pero sí sube el club
  de "dead-end suave" a "candidato a mail débil" (hay antecedente de que el club comparte cifras).
- **Quilmes Atlético Club**: sin novedad — resultados de Wikipedia, historia institucional, y una
  nota sobre el presupuesto 2026 sin cifras de balance. Confirma el dead-end, no lo cambia. Es el
  único de los 5 donde Exa no aportó nada nuevo.
- **Independiente Rivadavia**: sin novedad real para EL CLUB CORRECTO — la query trajo como
  resultado top el balance de Independiente (Avellaneda, otro club, dominio
  `clubaindependiente.com.ar`) por similitud semántica de nombre ("Independiente" vs "Independiente
  Rivadavia"). Confirma el dead-end para Rivadavia, y es el segundo caso de homonimia confundiendo a
  Exa en 5 queries — patrón real, no un accidente aislado.

**Resumen: 2 de 5 reaperturas reales (Huracán fuerte, Deportivo Morón débil), 1 hallazgo bueno por
error de homonimia (San Martín Tucumán), 2 sin cambios (Quilmes, Independiente Rivadavia) — y 2 de 5
queries confundieron el club por nombre parecido (San Martín SJ↔Tucumán, Independiente↔Rivadavia).**
Cada query costó ~5-10 segundos y ninguna reasoning de modelo (es una llamada HTTP directa, no un
agente) — el costo real de Exa es la API (Guido tiene $10 de crédito gratis) más el tiempo de UN
humano o agente leyendo los resultados para descartar homónimos, no tokens de LLM.

---

## Lessons learned

**1. La hipótesis central del barrido 1 (Haiku primero, Sonnet verifica después) NO se sostuvo con
datos — hay que reconsiderarla.** Costó 30,8% más caro que Sonnet solo en los 12 clubes probados, en
tokens, tool calls y duración, sin ventaja de calidad medible (Sonnet tuvo que corregir/completar
11 de los 12). La causa raíz: verificar bien exige releer y a veces rehacer el trabajo, no solo
confirmarlo — un handoff no ahorra si el que recibe no puede confiar ciegamente en lo que le pasan.

**2. Los tipos de error de Haiku fueron reales y de 3 clases distintas, no ruido aleatorio**:
   - **Falsos positivos por coincidencia de nombre/dominio, sin verificar contenido** (lote 2):
     Colegiales↔Colegio de Abogados, Deportivo Riestra↔Cooperativa Eléctrica Riestra. Este último es
     grave: un documento real, bien formateado, que se hubiera cargado como del club equivocado sin
     la verificación.
   - **Profundidad insuficiente con la MISMA herramienta ya en mano** (lote 1 y 3): encontrar la API
     correcta pero no agotarla (Atlético de Rafaela: 2 de 4 ejercicios con el mismo esfuerzo; Mitre
     SdE: Wayback CDX sin correr en 2 de 3 dominios).
   - **Caracterización imprecisa de un hallazgo real** (lote 3): resumir "prensa confirma" cuando en
     realidad es el club mismo diciéndolo con fechas exactas — cambia la clasificación de mail.

**3. Exa (barrido 3) sí demostró valor real, y es una conclusión DISTINTA e independiente de la de
Haiku** — no hay que mezclar los dos resultados. En 2 de 5 dead-ends "reales" confirmados hoy con la
escalera completa (sitio oficial + Wayback CDX + búsqueda web genérica), una sola query de Exa
encontró algo que ninguna de esas 3 familias puede ver estructuralmente: sitios de hinchas
(`aguantehuracan.com.ar`, con balances completos de 2010/2013) y agregadores de prensa chicos que no
rankean bien en búsqueda web genérica. El costo es mínimo (una llamada HTTP de segundos, sin
razonamiento de modelo) y el riesgo real es la homonimia (2 de 5 queries confundieron el club por
nombre parecido — San Martín SJ↔Tucumán, Independiente↔Rivadavia), mismo tipo de error que ya se
conocía de la búsqueda web genérica, no algo nuevo de Exa.

**4. Gotcha técnico nuevo, más allá del A/B test**: la Wayback Machine puede truncar una descarga a
exactamente 1.048.576 bytes (1 MiB) de forma PERMANENTE para una captura puntual, sin relación con
el tamaño real que la propia CDX API reporta como `length` (se vio un caso de un archivo de 892 KB
"reales" que igual se sirvió truncado a 1 MiB) — ni cambiar de modo (`id_`/`if_`), ni reintentar con
delay, ni pedir por Range HTTP lo destraba. Cuando hay un SEGUNDO timestamp disponible para la misma
URL, reintentar con ese casi siempre funciona (caso Almagro, ya en el skill); cuando NO hay un
segundo timestamp (caso Unión, varios archivos de 2019), no hay salida conocida todavía.

**5. Test 4 (Sonnet vs. Sonnet+Exa, 9 clubes peruanos): Exa NO abarata el trabajo de Sonnet, lo
COMPLEMENTA.** Grupo D (Exa primero) costó prácticamente lo mismo en tokens de Sonnet que el Grupo C
(39.181 vs. 41.427 tokens/club, +5,7%, dentro del ruido) — Sonnet no gastó menos tool calls por tener
a Exa. Lo que sí mejoró fue la tasa de hallazgo: 2 de 5 clubes con progreso real en el Grupo D (un
documento con cifras reales — una tesis de grado sobre Comerciantes Unidos — y un documento
identificado no público) contra 1 de 4 en el Grupo C. Conclusión: no hay evidencia de que "Exa
primero" sea más barato que "escalera estándar primero, Exa si hace falta" — el valor de Exa es
la CALIDAD adicional (encuentra cosas que el resto no ve), pagada con el costo extra de la API, no
un atajo que le ahorre trabajo a Sonnet. Esto confirma la sección 0.1b del skill tal como quedó: Exa
como escalón 3, no como reemplazo del escalón 1.

## Recomendación para el skill (sección 0.1b) — PROPUESTA, no aplicada todavía

Con estos datos, recomendaría:
- **Sacar el paso Haiku→Sonnet para "club nuevo"** (barrido 1) tal como está, o al menos no
  presentarlo como la regla por defecto — los datos dicen que Sonnet solo es más barato Y al menos
  igual de bueno para este tipo de club (poco rastro digital, la mayoría termina en dead-end o
  candidato a mail sin PDF real que verificar).
- **Mantener a Exa como barrido 3**, con el gate ya escrito (solo clubes con señal real) — esa parte
  del diseño sí se validó.
- Posible excepción a seguir explorando: quizás Haiku SÍ ahorre en clubes donde el volumen de
  candidatos a revisar es alto (un club con Wayback CDX de miles de PDFs, como Boca/Racing) y el
  trabajo es mayormente FILTRAR ruido antes de que Sonnet mire — no se probó ese escenario acá, los
  12 clubes de hoy tuvieron 0 PDFs reales en su mayoría.

**Actualizado 2026-09-26 (tarde): aplicado al skill.** `.claude/skills/club-sourcing/SKILL.md`
sección 0.1b reescrita — Haiku afuera de la escalera por defecto, Exa confirmado como barrido 3 con
los datos de este test citados ahí mismo.

---

## Test 4 — Sonnet solo vs. Sonnet + Exa como herramienta primaria (¿Exa reemplaza el toolkit, o solo lo complementa?)

**Por qué otro test**: el Test 3 midió Exa como ESCALÓN 3 (después de que Sonnet agotó todo lo
demás). Esta pregunta es distinta: si Exa hubiera sido la PRIMERA herramienta en vez de la última,
¿Sonnet gasta menos tokens (menos exploración manual, menos tool calls de WebFetch/curl) para llegar
al mismo resultado? Y del otro lado: ¿cuánto cuesta eso en $ reales de la API de Exa, no solo en
tokens de Claude?

**Población**: México se descartó (pedido explícito de Guido: "méxico es conocido por su oscuridad
en las cuentas de fútbol" — los clubes mexicanos son sociedades privadas/filiales de grupos que
cotizan, sin el patrón de asamblea+balance que hace útil a Exa). Se usó **Perú** en su lugar: 9
clubes marcados "asociación civil sin obligación de reporte" (mismo patrón institucional que
Argentina — asociación civil con asamblea de socios —, mismo nivel de chequeo shallow ya hecho el
2026-09-12/13, sin tocar desde entonces).

**Split aleatorio, seed 77**:
- **Grupo C — Sonnet solo (control), n=4**: ADT, Cienciano, Cusco FC, Deportivo Municipal. Escalera
  estándar completa (sitio oficial, Wayback CDX, búsqueda web, prensa) — Exa PROHIBIDO en este grupo,
  para que la comparación sea limpia.
- **Grupo D — Sonnet + Exa primero, n=5**: Alianza Atlético, Binacional, Comerciantes Unidos, Sport
  Boys, Sport Huancayo. Exa es la PRIMERA herramienta (2-4 queries), con la escalera estándar como
  respaldo solo si Exa no trae nada útil.

**Métrica**: tokens de Sonnet en cada grupo (comparación directa), MÁS la cantidad de queries a Exa
en el Grupo D (para que Guido convierta a costo real contra su propio dashboard de Exa — no adivino
el precio por query acá).

### Resultados

**Grupo D (Sonnet + Exa primero) — CERRADO**: 207.133 tokens, 40 tool calls, 328s para 5 clubes =
41.427 tokens/club. **16 queries de Exa en total (3,2/club)** — Guido, ese es el número para cruzar
contra tu dashboard de Exa y sacar el $ real. Exa fue SUFICIENTE en los 5 casos: nunca hizo falta el
método estándar de respaldo (WebFetch del sitio, Wayback CDX, WebSearch).

- **Alianza Atlético** (3 queries): dead-end confirmado. Descartó explícitamente un falso positivo
  (Transfermarkt "balance de fichajes" = pases, no contable).
- **Binacional** (3 queries): dead-end para balance público, pero mucha cobertura de su crisis
  financiera (deuda, pérdida de licencia FPF). Descartó un falso positivo de homonimia institucional
  (una página de INDECOPI, el regulador, no del club). Candidato débil a mail.
- **Comerciantes Unidos** (3 queries) — **ENCONTRADO**: una tesis de grado (USAT, 2019) con el
  Estado de Situación Financiera real del club 2013-2015, en soles, análisis horizontal/vertical
  completo. Fuente secundaria (académica, no el balance oficial del club) pero con cifras reales, 74
  páginas, verificado que abre y tiene capa de texto. Descargado a
  `Clubes/Perú/Comerciantes Unidos/`.
- **Sport Boys** (4 queries): sin PDF, pero encontró que existe un "Plan de Viabilidad" con
  proyecciones financieras auditables, presentado a SUNAT en 2023 dentro de un proceso concursal
  formal — un documento real y concreto, no público, candidato a pedido de Acceso a la Información
  Pública o mail directo.
- **Sport Huancayo** (3 queries): dead-end, confirmado explícitamente por una fuente terciaria
  ("Datos Perú": "no hay información financiera disponible"). Descartó 2 falsos positivos por
  coincidencia de nombre (una caja municipal de ahorro, una inmobiliaria).

**Grupo C (Sonnet solo, sin Exa) — CERRADO**: 156.724 tokens, 36 tool calls, 366s para 4 clubes =
**39.181 tokens/club**.

- **ADT, Cusco FC, Cienciano**: dead-end real, escalera completa agotada, 0 señal en ninguno (Cusco
  FC y ADT ni siquiera tienen una sola captura en Wayback en toda la historia del dominio).
- **Deportivo Municipal**: candidato a mail — sitio oficial caído/squatted, pero prensa 2024-2026
  extensa confirma una crisis financiera con cifra concreta (S/12M de deuda, desglosada por
  acreedor) dicha en entrevista por el tesorero del club, más un proceso en curso de conversión a
  Sociedad Anónima Deportiva que previsiblemente va a generar estados auditados para inversores.

### Veredicto del Test 4

**Costo por club — sorprendentemente parejo**: Grupo D (Sonnet+Exa) 41.427 tokens/club vs. Grupo C
(Sonnet solo) 39.181 tokens/club — una diferencia de apenas +5,7%, dentro del ruido esperable con
n=4/5. **Exa NO le ahorró tokens de Sonnet al trabajo** — Sonnet siguió gastando prácticamente lo
mismo en tool calls/razonamiento en ambos grupos. Lo que sí cambió fue la CALIDAD del resultado:
Grupo D encontró 2 hallazgos accionables de 5 (un documento real con cifras — la tesis de
Comerciantes Unidos — y un documento identificado no público — el Plan de Viabilidad de Sport
Boys), contra 1 de 4 en el Grupo C (Deportivo Municipal, sin documento, solo cifra de prensa).

**Conclusión honesta**: en este test, Exa no reemplazó el trabajo de Sonnet ni lo abarató — lo
COMPLEMENTÓ, mejorando la tasa de hallazgo a cambio de un costo extra (16 queries de Exa, ver tu
dashboard para el $ real, más un Sonnet levemente más caro). Es consistente con el Test 3: Exa vale
la pena como HERRAMIENTA ADICIONAL para casos difíciles, no como reemplazo del toolkit estándar de
Sonnet — no hay evidencia todavía de que "Exa primero" sea más barato que "escalera estándar primero,
Exa si hace falta" (que es como quedó el skill).
