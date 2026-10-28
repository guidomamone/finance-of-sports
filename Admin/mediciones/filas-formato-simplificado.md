<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->
# Relevancia de las filas del Formato simplificado (generado)

Lo escribe `node tools/relevancia-filas.mjs --escribir` (lo corre solo `publicarCambios()`); no se edita a mano. Base: 345 clubes y 1546 club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.

**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.

### Ingresos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Cuotas Sociales | 338 de 1546 (22 %) | 85 de 345 (25 %) | 6.9 % · 39 % | 692 (45 %) | 436 | 80 |
| Comercial / Sponsors | 1045 de 1546 (68 %) | 263 de 345 (76 %) | 16.0 % · 74 % | 25 (2 %) | 410 | 66 |
| Estadio | 987 de 1546 (64 %) | 256 de 345 (74 %) | 8.9 % · 45 % | 48 (3 %) | 432 | 79 |
| Televisión | 958 de 1546 (62 %) | 238 de 345 (69 %) | 26.9 % · 85 % | 65 (4 %) | 437 | 86 |
| Premios por competencias | 489 de 1546 (32 %) | 143 de 345 (41 %) | 6.5 % · 38 % | 545 (35 %) | 512 | 0 |
| Venta de Jugadores | 946 de 1546 (61 %) | 238 de 345 (69 %) | 17.3 % · 67 % | 131 (8 %) | 469 | 0 |
| Otras actividades (educación y otros deportes) | 248 de 1546 (16 %) | 80 de 345 (23 %) | 2.0 % · 13 % | 792 (51 %) | 506 | 0 |
| Subsidios y donaciones | 410 de 1546 (27 %) | 127 de 345 (37 %) | 2.5 % · 30 % | 667 (43 %) | 469 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 521 de 1546 (34 %) | 141 de 345 (41 %) | 92.7 % · 97 % | 1025 (66 %) | 0 | 0 |
| Otros ingresos (catch-all) | 1389 de 1546 (90 %) | 312 de 345 (90 %) | 6.7 % · 37 % | 157 (10 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Cuotas Sociales** — países: BR 32/42 · AR 19/19 · EE 8/9 · PT 7/33 · HR 5/8 · NO 4/6 · CO 3/29 · CH 2/3 · IT 1/22 · PE 1/1 · BE 1/23 · CL 1/3 · CY 1/1
- **Premios por competencias** — países: BR 25/42 · PT 22/33 · CO 18/29 · ES 15/19 · NL 14/31 · HR 8/8 · AR 7/19 · EE 7/9 · IT 6/22 · GR 6/14 · NO 3/6 · GB 3/31 · RU 3/16 · CH 2/3 · DK 1/11 · PE 1/1 · TR 1/1 · CL 1/3
- **Otras actividades (educación y otros deportes)** — países: AR 19/19 · BR 17/42 · CO 11/29 · IT 6/22 · GB 6/31 · EE 5/9 · PT 4/33 · CH 3/3 · NL 2/31 · NO 1/6 · GR 1/14 · RU 1/16 · PE 1/1 · ES 1/19 · DE 1/11 · CL 1/3
- **Subsidios y donaciones** — países: PT 30/33 · IT 19/22 · NL 10/31 · AR 10/19 · BR 10/42 · EE 9/9 · GB 7/31 · CO 6/29 · GR 5/14 · NO 4/6 · RU 4/16 · BE 4/23 · HR 4/8 · DK 2/11 · ES 2/19 · CH 1/3
- **Fútbol profesional (sin desglosar por la fuente)** — países: CO 23/29 · BE 22/23 · RU 15/16 · PT 13/33 · NL 12/31 · BR 12/42 · GR 10/14 · JP 10/10 · DK 7/11 · ES 3/19 · DE 3/11 · NO 2/6 · GB 2/31 · AR 2/19 · PE 1/1 · CH 1/3 · MX 1/1 · EE 1/9 · AT 1/1

### Gastos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Compra de jugadores | 827 de 1546 (53 %) | 228 de 345 (66 %) | 14.1 % · 64 % | 364 (24 %) | 355 | 0 |
| Salarios y primas (plantel y cuerpo técnico) | 1148 de 1546 (74 %) | 291 de 345 (84 %) | 48.7 % · 99 % | 16 (1 %) | 263 | 119 |
| Inversiones (amortizaciones y depreciación) | 1008 de 1546 (65 %) | 269 de 345 (78 %) | 1.9 % · 8 % | 201 (13 %) | 337 | 0 |
| Organización de partidos | 770 de 1546 (50 %) | 205 de 345 (59 %) | 7.0 % · 31 % | 415 (27 %) | 361 | 0 |
| Otras actividades (educación, juvenil, otros deportes, básquet) | 198 de 1546 (13 %) | 62 de 345 (18 %) | 5.6 % · 27 % | 995 (64 %) | 349 | 4 |
| Administración y gastos generales | 1296 de 1546 (84 %) | 293 de 345 (85 %) | 15.6 % · 72 % | 225 (15 %) | 25 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 382 de 1546 (25 %) | 80 de 345 (23 %) | 78.5 % · 92 % | 1164 (75 %) | 0 | 0 |
| Otros gastos (catch-all) | 1378 de 1546 (89 %) | 313 de 345 (91 %) | 9.9 % · 50 % | 168 (11 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Organización de partidos** — países: BR 37/42 · PT 32/33 · IT 22/22 · NL 20/31 · CO 18/29 · AR 18/19 · ES 14/19 · EE 9/9 · HR 8/8 · NO 4/6 · GR 4/14 · DK 4/11 · DE 3/11 · CH 3/3 · CL 3/3 · RU 1/16 · PE 1/1 · BE 1/23 · TR 1/1 · CY 1/1 · AT 1/1
- **Otras actividades (educación, juvenil, otros deportes, básquet)** — países: BR 20/42 · AR 18/19 · IT 5/22 · PT 4/33 · CO 3/29 · EE 3/9 · NL 2/31 · DE 2/11 · CH 2/3 · NO 1/6 · DK 1/11 · RU 1/16
- **Fútbol profesional (sin desglosar por la fuente)** — países: CO 23/29 · RU 16/16 · BR 14/42 · GR 10/14 · AR 4/19 · ES 2/19 · EE 2/9 · NO 1/6 · IT 1/22 · NL 1/31 · GB 1/31 · PE 1/1 · DE 1/11 · CH 1/3 · TR 1/1 · MX 1/1

### Candidata a fila (concepto que hoy no es fila)

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…) | 65 de 1546 (4 %) | 36 de 345 (10 %) | 1.6 % · 23 % | 1481 (96 %) | 0 | 0 |
| Subsidios, donaciones y aportes, amplia (cota superior) | 95 de 1546 (6 %) | 49 de 345 (14 %) | 2.6 % · 17 % | 1451 (94 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…)** — países: ES 15/19 · PT 8/33 · CO 4/29 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3
- **Subsidios, donaciones y aportes, amplia (cota superior)** — países: ES 15/19 · PT 8/33 · BR 8/42 · IT 5/22 · CO 4/29 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3

Otra candidata: `node tools/relevancia-filas.mjs --etiqueta "<regex>" [--lado gastos]`. Un club concreto de una fila: `--fila "Educación"`.

