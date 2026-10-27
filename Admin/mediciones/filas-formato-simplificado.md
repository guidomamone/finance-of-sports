<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->
# Relevancia de las filas del Formato simplificado (generado)

Lo escribe `node tools/relevancia-filas.mjs --escribir` (lo corre solo `publicarCambios()`); no se edita a mano. Base: 342 clubes y 1497 club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.

**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.

### Ingresos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Cuotas Sociales | 332 de 1497 (22 %) | 85 de 342 (25 %) | 7.0 % · 39 % | 692 (46 %) | 393 | 80 |
| Comercial / Sponsors | 1039 de 1497 (69 %) | 263 de 342 (77 %) | 16.1 % · 75 % | 25 (2 %) | 367 | 66 |
| Estadio | 981 de 1497 (66 %) | 256 de 342 (75 %) | 9.0 % · 46 % | 48 (3 %) | 389 | 79 |
| Televisión | 952 de 1497 (64 %) | 238 de 342 (70 %) | 27.0 % · 85 % | 65 (4 %) | 394 | 86 |
| Premios por competencias | 483 de 1497 (32 %) | 143 de 342 (42 %) | 6.8 % · 39 % | 545 (36 %) | 469 | 0 |
| Venta de Jugadores | 940 de 1497 (63 %) | 238 de 342 (70 %) | 17.0 % · 67 % | 131 (9 %) | 426 | 0 |
| Otras actividades (educación y otros deportes) | 242 de 1497 (16 %) | 80 de 342 (23 %) | 2.0 % · 14 % | 792 (53 %) | 463 | 0 |
| Subsidios y donaciones | 408 de 1497 (27 %) | 126 de 342 (37 %) | 2.6 % · 31 % | 663 (44 %) | 426 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 478 de 1497 (32 %) | 136 de 342 (40 %) | 89.9 % · 97 % | 1019 (68 %) | 0 | 0 |
| Otros ingresos (catch-all) | 1347 de 1497 (90 %) | 309 de 342 (90 %) | 6.8 % · 37 % | 150 (10 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Cuotas Sociales** — países: BR 32/42 · AR 19/19 · EE 8/9 · PT 7/33 · HR 5/8 · NO 4/6 · CO 3/26 · CH 2/3 · IT 1/22 · PE 1/1 · BE 1/23 · CL 1/3 · CY 1/1
- **Premios por competencias** — países: BR 25/42 · PT 22/33 · CO 18/26 · ES 15/19 · NL 14/31 · HR 8/8 · AR 7/19 · EE 7/9 · IT 6/22 · GR 6/14 · NO 3/6 · GB 3/31 · RU 3/16 · CH 2/3 · DK 1/11 · PE 1/1 · TR 1/1 · CL 1/3
- **Otras actividades (educación y otros deportes)** — países: AR 19/19 · BR 17/42 · CO 11/26 · IT 6/22 · GB 6/31 · EE 5/9 · PT 4/33 · CH 3/3 · NL 2/31 · NO 1/6 · GR 1/14 · RU 1/16 · PE 1/1 · ES 1/19 · DE 1/11 · CL 1/3
- **Subsidios y donaciones** — países: PT 30/33 · IT 19/22 · NL 10/31 · AR 10/19 · BR 10/42 · EE 9/9 · GB 7/31 · GR 5/14 · CO 5/26 · NO 4/6 · RU 4/16 · BE 4/23 · HR 4/8 · DK 2/11 · ES 2/19 · CH 1/3
- **Fútbol profesional (sin desglosar por la fuente)** — países: BE 22/23 · CO 18/26 · RU 15/16 · PT 13/33 · NL 12/31 · BR 12/42 · GR 10/14 · JP 10/10 · DK 7/11 · ES 3/19 · DE 3/11 · NO 2/6 · GB 2/31 · AR 2/19 · PE 1/1 · CH 1/3 · MX 1/1 · EE 1/9 · AT 1/1

### Gastos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Compra de jugadores | 827 de 1497 (55 %) | 228 de 342 (67 %) | 14.1 % · 64 % | 364 (24 %) | 306 | 0 |
| Salarios y primas (plantel y cuerpo técnico) | 1148 de 1497 (77 %) | 291 de 342 (85 %) | 48.7 % · 99 % | 16 (1 %) | 214 | 119 |
| Inversiones (amortizaciones y depreciación) | 1007 de 1497 (67 %) | 269 de 342 (79 %) | 2.0 % · 8 % | 201 (13 %) | 289 | 0 |
| Organización de partidos | 769 de 1497 (51 %) | 205 de 342 (60 %) | 7.0 % · 31 % | 415 (28 %) | 313 | 0 |
| Otras actividades (educación, juvenil, otros deportes, básquet) | 198 de 1497 (13 %) | 62 de 342 (18 %) | 5.6 % · 27 % | 995 (66 %) | 300 | 4 |
| Administración y gastos generales | 1247 de 1497 (83 %) | 290 de 342 (85 %) | 15.8 % · 72 % | 225 (15 %) | 25 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 333 de 1497 (22 %) | 75 de 342 (22 %) | 75.2 % · 90 % | 1164 (78 %) | 0 | 0 |
| Otros gastos (catch-all) | 1345 de 1497 (90 %) | 310 de 342 (91 %) | 10.1 % · 50 % | 152 (10 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Organización de partidos** — países: BR 37/42 · PT 32/33 · IT 22/22 · NL 20/31 · CO 18/26 · AR 18/19 · ES 14/19 · EE 9/9 · HR 8/8 · NO 4/6 · GR 4/14 · DK 4/11 · DE 3/11 · CH 3/3 · CL 3/3 · RU 1/16 · PE 1/1 · BE 1/23 · TR 1/1 · CY 1/1 · AT 1/1
- **Otras actividades (educación, juvenil, otros deportes, básquet)** — países: BR 20/42 · AR 18/19 · IT 5/22 · PT 4/33 · CO 3/26 · EE 3/9 · NL 2/31 · DE 2/11 · CH 2/3 · NO 1/6 · DK 1/11 · RU 1/16
- **Fútbol profesional (sin desglosar por la fuente)** — países: CO 18/26 · RU 16/16 · BR 14/42 · GR 10/14 · AR 4/19 · ES 2/19 · EE 2/9 · NO 1/6 · IT 1/22 · NL 1/31 · GB 1/31 · PE 1/1 · DE 1/11 · CH 1/3 · TR 1/1 · MX 1/1

### Candidata a fila (concepto que hoy no es fila)

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…) | 65 de 1497 (4 %) | 36 de 342 (11 %) | 1.6 % · 23 % | 1432 (96 %) | 0 | 0 |
| Subsidios, donaciones y aportes, amplia (cota superior) | 95 de 1497 (6 %) | 49 de 342 (14 %) | 2.6 % · 17 % | 1402 (94 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…)** — países: ES 15/19 · PT 8/33 · CO 4/26 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3
- **Subsidios, donaciones y aportes, amplia (cota superior)** — países: ES 15/19 · PT 8/33 · BR 8/42 · IT 5/22 · CO 4/26 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3

Otra candidata: `node tools/relevancia-filas.mjs --etiqueta "<regex>" [--lado gastos]`. Un club concreto de una fila: `--fila "Educación"`.

