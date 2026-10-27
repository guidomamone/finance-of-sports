<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->
# Relevancia de las filas del Formato simplificado (generado)

Lo escribe `node tools/relevancia-filas.mjs --escribir` (lo corre solo `publicarCambios()`); no se edita a mano. Base: 339 clubes y 1469 club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.

**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.

### Ingresos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Cuotas Sociales | 332 de 1469 (23 %) | 85 de 339 (25 %) | 7.0 % · 39 % | 692 (47 %) | 365 | 80 |
| Comercial / Sponsors | 1039 de 1469 (71 %) | 263 de 339 (78 %) | 16.1 % · 75 % | 25 (2 %) | 339 | 66 |
| Estadio | 981 de 1469 (67 %) | 256 de 339 (76 %) | 9.0 % · 46 % | 48 (3 %) | 361 | 79 |
| Televisión | 952 de 1469 (65 %) | 238 de 339 (70 %) | 27.0 % · 85 % | 65 (4 %) | 366 | 86 |
| Premios por competencias | 483 de 1469 (33 %) | 143 de 339 (42 %) | 6.8 % · 39 % | 545 (37 %) | 441 | 0 |
| Venta de Jugadores | 940 de 1469 (64 %) | 238 de 339 (70 %) | 17.0 % · 67 % | 131 (9 %) | 398 | 0 |
| Otras actividades (educación y otros deportes) | 242 de 1469 (16 %) | 80 de 339 (24 %) | 2.0 % · 14 % | 792 (54 %) | 435 | 0 |
| Subsidios y donaciones | 408 de 1469 (28 %) | 126 de 339 (37 %) | 2.6 % · 31 % | 663 (45 %) | 398 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 450 de 1469 (31 %) | 133 de 339 (39 %) | 89.1 % · 97 % | 1019 (69 %) | 0 | 0 |
| Otros ingresos (catch-all) | 1319 de 1469 (90 %) | 306 de 339 (90 %) | 6.9 % · 37 % | 150 (10 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Cuotas Sociales** — países: BR 32/42 · AR 19/19 · EE 8/9 · PT 7/33 · HR 5/8 · NO 4/6 · CO 3/23 · CH 2/3 · IT 1/22 · PE 1/1 · BE 1/23 · CL 1/3 · CY 1/1
- **Premios por competencias** — países: BR 25/42 · PT 22/33 · CO 18/23 · ES 15/19 · NL 14/31 · HR 8/8 · AR 7/19 · EE 7/9 · IT 6/22 · GR 6/14 · NO 3/6 · GB 3/31 · RU 3/16 · CH 2/3 · DK 1/11 · PE 1/1 · TR 1/1 · CL 1/3
- **Otras actividades (educación y otros deportes)** — países: AR 19/19 · BR 17/42 · CO 11/23 · IT 6/22 · GB 6/31 · EE 5/9 · PT 4/33 · CH 3/3 · NL 2/31 · NO 1/6 · GR 1/14 · RU 1/16 · PE 1/1 · ES 1/19 · DE 1/11 · CL 1/3
- **Subsidios y donaciones** — países: PT 30/33 · IT 19/22 · NL 10/31 · AR 10/19 · BR 10/42 · EE 9/9 · GB 7/31 · GR 5/14 · CO 5/23 · NO 4/6 · RU 4/16 · BE 4/23 · HR 4/8 · DK 2/11 · ES 2/19 · CH 1/3
- **Fútbol profesional (sin desglosar por la fuente)** — países: BE 22/23 · CO 15/23 · RU 15/16 · PT 13/33 · NL 12/31 · BR 12/42 · GR 10/14 · JP 10/10 · DK 7/11 · ES 3/19 · DE 3/11 · NO 2/6 · GB 2/31 · AR 2/19 · PE 1/1 · CH 1/3 · MX 1/1 · EE 1/9 · AT 1/1

### Gastos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Compra de jugadores | 827 de 1469 (56 %) | 228 de 339 (67 %) | 14.1 % · 64 % | 364 (25 %) | 278 | 0 |
| Salarios y primas (plantel y cuerpo técnico) | 1148 de 1469 (78 %) | 291 de 339 (86 %) | 48.7 % · 99 % | 16 (1 %) | 186 | 119 |
| Inversiones (amortizaciones y depreciación) | 1007 de 1469 (69 %) | 269 de 339 (79 %) | 2.0 % · 8 % | 201 (14 %) | 261 | 0 |
| Organización de partidos | 769 de 1469 (52 %) | 205 de 339 (60 %) | 7.0 % · 31 % | 415 (28 %) | 285 | 0 |
| Otras actividades (educación, juvenil, otros deportes, básquet) | 198 de 1469 (13 %) | 62 de 339 (18 %) | 5.6 % · 27 % | 995 (68 %) | 272 | 4 |
| Administración y gastos generales | 1219 de 1469 (83 %) | 287 de 339 (85 %) | 15.9 % · 72 % | 225 (15 %) | 25 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 305 de 1469 (21 %) | 72 de 339 (21 %) | 75.0 % · 90 % | 1164 (79 %) | 0 | 0 |
| Otros gastos (catch-all) | 1320 de 1469 (90 %) | 307 de 339 (91 %) | 10.3 % · 51 % | 149 (10 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Otras actividades (educación, juvenil, otros deportes, básquet)** — países: BR 20/42 · AR 18/19 · IT 5/22 · PT 4/33 · CO 3/23 · EE 3/9 · NL 2/31 · DE 2/11 · CH 2/3 · NO 1/6 · DK 1/11 · RU 1/16
- **Fútbol profesional (sin desglosar por la fuente)** — países: RU 16/16 · CO 15/23 · BR 14/42 · GR 10/14 · AR 4/19 · ES 2/19 · EE 2/9 · NO 1/6 · IT 1/22 · NL 1/31 · GB 1/31 · PE 1/1 · DE 1/11 · CH 1/3 · TR 1/1 · MX 1/1

### Candidata a fila (concepto que hoy no es fila)

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…) | 65 de 1469 (4 %) | 36 de 339 (11 %) | 1.6 % · 23 % | 1404 (96 %) | 0 | 0 |
| Subsidios, donaciones y aportes, amplia (cota superior) | 95 de 1469 (6 %) | 49 de 339 (14 %) | 2.6 % · 17 % | 1374 (94 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…)** — países: ES 15/19 · PT 8/33 · CO 4/23 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3
- **Subsidios, donaciones y aportes, amplia (cota superior)** — países: ES 15/19 · PT 8/33 · BR 8/42 · IT 5/22 · CO 4/23 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3

Otra candidata: `node tools/relevancia-filas.mjs --etiqueta "<regex>" [--lado gastos]`. Un club concreto de una fila: `--fila "Educación"`.

