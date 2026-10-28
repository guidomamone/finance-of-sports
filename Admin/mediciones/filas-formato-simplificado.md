<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->
# Relevancia de las filas del Formato simplificado (generado)

Lo escribe `node tools/relevancia-filas.mjs --escribir` (lo corre solo `publicarCambios()`); no se edita a mano. Base: 347 clubes y 1566 club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.

**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.

### Ingresos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Cuotas Sociales | 338 de 1566 (22 %) | 85 de 347 (24 %) | 6.9 % · 39 % | 692 (44 %) | 456 | 80 |
| Comercial / Sponsors | 1045 de 1566 (67 %) | 263 de 347 (76 %) | 16.0 % · 74 % | 25 (2 %) | 430 | 66 |
| Estadio | 987 de 1566 (63 %) | 256 de 347 (74 %) | 8.9 % · 45 % | 48 (3 %) | 452 | 79 |
| Televisión | 958 de 1566 (61 %) | 238 de 347 (69 %) | 26.9 % · 85 % | 65 (4 %) | 457 | 86 |
| Premios por competencias | 489 de 1566 (31 %) | 143 de 347 (41 %) | 6.5 % · 38 % | 545 (35 %) | 532 | 0 |
| Venta de Jugadores | 946 de 1566 (60 %) | 238 de 347 (69 %) | 17.3 % · 67 % | 131 (8 %) | 489 | 0 |
| Otras actividades (educación y otros deportes) | 248 de 1566 (16 %) | 80 de 347 (23 %) | 2.0 % · 13 % | 792 (51 %) | 526 | 0 |
| Subsidios y donaciones | 410 de 1566 (26 %) | 127 de 347 (37 %) | 2.5 % · 30 % | 667 (43 %) | 489 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 541 de 1566 (35 %) | 143 de 347 (41 %) | 93.3 % · 97 % | 1025 (65 %) | 0 | 0 |
| Otros ingresos (catch-all) | 1406 de 1566 (90 %) | 314 de 347 (90 %) | 6.6 % · 36 % | 160 (10 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Cuotas Sociales** — países: BR 32/42 · AR 19/19 · EE 8/9 · PT 7/33 · HR 5/8 · NO 4/6 · CO 3/31 · CH 2/3 · IT 1/22 · PE 1/1 · BE 1/23 · CL 1/3 · CY 1/1
- **Premios por competencias** — países: BR 25/42 · PT 22/33 · CO 18/31 · ES 15/19 · NL 14/31 · HR 8/8 · AR 7/19 · EE 7/9 · IT 6/22 · GR 6/14 · NO 3/6 · GB 3/31 · RU 3/16 · CH 2/3 · DK 1/11 · PE 1/1 · TR 1/1 · CL 1/3
- **Otras actividades (educación y otros deportes)** — países: AR 19/19 · BR 17/42 · CO 11/31 · IT 6/22 · GB 6/31 · EE 5/9 · PT 4/33 · CH 3/3 · NL 2/31 · NO 1/6 · GR 1/14 · RU 1/16 · PE 1/1 · ES 1/19 · DE 1/11 · CL 1/3
- **Subsidios y donaciones** — países: PT 30/33 · IT 19/22 · NL 10/31 · AR 10/19 · BR 10/42 · EE 9/9 · GB 7/31 · CO 6/31 · GR 5/14 · NO 4/6 · RU 4/16 · BE 4/23 · HR 4/8 · DK 2/11 · ES 2/19 · CH 1/3
- **Fútbol profesional (sin desglosar por la fuente)** — países: CO 25/31 · BE 22/23 · RU 15/16 · PT 13/33 · NL 12/31 · BR 12/42 · GR 10/14 · JP 10/10 · DK 7/11 · ES 3/19 · DE 3/11 · NO 2/6 · GB 2/31 · AR 2/19 · PE 1/1 · CH 1/3 · MX 1/1 · EE 1/9 · AT 1/1

### Gastos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Compra de jugadores | 827 de 1566 (53 %) | 228 de 347 (66 %) | 14.1 % · 64 % | 382 (24 %) | 357 | 0 |
| Salarios y primas (plantel y cuerpo técnico) | 1148 de 1566 (73 %) | 291 de 347 (84 %) | 48.7 % · 99 % | 34 (2 %) | 265 | 119 |
| Inversiones (amortizaciones y depreciación) | 1008 de 1566 (64 %) | 269 de 347 (78 %) | 1.9 % · 8 % | 219 (14 %) | 339 | 0 |
| Organización de partidos | 770 de 1566 (49 %) | 205 de 347 (59 %) | 7.0 % · 31 % | 433 (28 %) | 363 | 0 |
| Otras actividades (educación, juvenil, otros deportes, básquet) | 198 de 1566 (13 %) | 62 de 347 (18 %) | 5.6 % · 27 % | 1013 (65 %) | 351 | 4 |
| Administración y gastos generales | 1316 de 1566 (84 %) | 295 de 347 (85 %) | 15.9 % · 72 % | 225 (14 %) | 25 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 384 de 1566 (25 %) | 81 de 347 (23 %) | 78.4 % · 91 % | 1182 (75 %) | 0 | 0 |
| Otros gastos (catch-all) | 1398 de 1566 (89 %) | 315 de 347 (91 %) | 9.7 % · 49 % | 168 (11 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Organización de partidos** — países: BR 37/42 · PT 32/33 · IT 22/22 · NL 20/31 · CO 18/31 · AR 18/19 · ES 14/19 · EE 9/9 · HR 8/8 · NO 4/6 · GR 4/14 · DK 4/11 · DE 3/11 · CH 3/3 · CL 3/3 · RU 1/16 · PE 1/1 · BE 1/23 · TR 1/1 · CY 1/1 · AT 1/1
- **Otras actividades (educación, juvenil, otros deportes, básquet)** — países: BR 20/42 · AR 18/19 · IT 5/22 · PT 4/33 · CO 3/31 · EE 3/9 · NL 2/31 · DE 2/11 · CH 2/3 · NO 1/6 · DK 1/11 · RU 1/16
- **Fútbol profesional (sin desglosar por la fuente)** — países: CO 24/31 · RU 16/16 · BR 14/42 · GR 10/14 · AR 4/19 · ES 2/19 · EE 2/9 · NO 1/6 · IT 1/22 · NL 1/31 · GB 1/31 · PE 1/1 · DE 1/11 · CH 1/3 · TR 1/1 · MX 1/1

### Candidata a fila (concepto que hoy no es fila)

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…) | 65 de 1566 (4 %) | 36 de 347 (10 %) | 1.6 % · 23 % | 1501 (96 %) | 0 | 0 |
| Subsidios, donaciones y aportes, amplia (cota superior) | 95 de 1566 (6 %) | 49 de 347 (14 %) | 2.6 % · 17 % | 1471 (94 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…)** — países: ES 15/19 · PT 8/33 · CO 4/31 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3
- **Subsidios, donaciones y aportes, amplia (cota superior)** — países: ES 15/19 · PT 8/33 · BR 8/42 · IT 5/22 · CO 4/31 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3

Otra candidata: `node tools/relevancia-filas.mjs --etiqueta "<regex>" [--lado gastos]`. Un club concreto de una fila: `--fila "Educación"`.

