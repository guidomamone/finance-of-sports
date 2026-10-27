<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->
# Relevancia de las filas del Formato simplificado (generado)

Lo escribe `node tools/relevancia-filas.mjs --escribir` (lo corre solo `publicarCambios()`); no se edita a mano. Base: 343 clubes y 1507 club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.

**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.

### Ingresos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Cuotas Sociales | 332 de 1507 (22 %) | 85 de 343 (25 %) | 7.0 % · 39 % | 692 (46 %) | 403 | 80 |
| Comercial / Sponsors | 1039 de 1507 (69 %) | 263 de 343 (77 %) | 16.1 % · 75 % | 25 (2 %) | 377 | 66 |
| Estadio | 981 de 1507 (65 %) | 256 de 343 (75 %) | 9.0 % · 46 % | 48 (3 %) | 399 | 79 |
| Televisión | 952 de 1507 (63 %) | 238 de 343 (69 %) | 27.0 % · 85 % | 65 (4 %) | 404 | 86 |
| Premios por competencias | 483 de 1507 (32 %) | 143 de 343 (42 %) | 6.8 % · 39 % | 545 (36 %) | 479 | 0 |
| Venta de Jugadores | 940 de 1507 (62 %) | 238 de 343 (69 %) | 17.0 % · 67 % | 131 (9 %) | 436 | 0 |
| Otras actividades (educación y otros deportes) | 242 de 1507 (16 %) | 80 de 343 (23 %) | 2.0 % · 14 % | 792 (53 %) | 473 | 0 |
| Subsidios y donaciones | 408 de 1507 (27 %) | 126 de 343 (37 %) | 2.6 % · 31 % | 663 (44 %) | 436 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 488 de 1507 (32 %) | 137 de 343 (40 %) | 90.9 % · 97 % | 1019 (68 %) | 0 | 0 |
| Otros ingresos (catch-all) | 1357 de 1507 (90 %) | 310 de 343 (90 %) | 6.7 % · 37 % | 150 (10 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Cuotas Sociales** — países: BR 32/42 · AR 19/19 · EE 8/9 · PT 7/33 · HR 5/8 · NO 4/6 · CO 3/27 · CH 2/3 · IT 1/22 · PE 1/1 · BE 1/23 · CL 1/3 · CY 1/1
- **Premios por competencias** — países: BR 25/42 · PT 22/33 · CO 18/27 · ES 15/19 · NL 14/31 · HR 8/8 · AR 7/19 · EE 7/9 · IT 6/22 · GR 6/14 · NO 3/6 · GB 3/31 · RU 3/16 · CH 2/3 · DK 1/11 · PE 1/1 · TR 1/1 · CL 1/3
- **Otras actividades (educación y otros deportes)** — países: AR 19/19 · BR 17/42 · CO 11/27 · IT 6/22 · GB 6/31 · EE 5/9 · PT 4/33 · CH 3/3 · NL 2/31 · NO 1/6 · GR 1/14 · RU 1/16 · PE 1/1 · ES 1/19 · DE 1/11 · CL 1/3
- **Subsidios y donaciones** — países: PT 30/33 · IT 19/22 · NL 10/31 · AR 10/19 · BR 10/42 · EE 9/9 · GB 7/31 · GR 5/14 · CO 5/27 · NO 4/6 · RU 4/16 · BE 4/23 · HR 4/8 · DK 2/11 · ES 2/19 · CH 1/3
- **Fútbol profesional (sin desglosar por la fuente)** — países: BE 22/23 · CO 19/27 · RU 15/16 · PT 13/33 · NL 12/31 · BR 12/42 · GR 10/14 · JP 10/10 · DK 7/11 · ES 3/19 · DE 3/11 · NO 2/6 · GB 2/31 · AR 2/19 · PE 1/1 · CH 1/3 · MX 1/1 · EE 1/9 · AT 1/1

### Gastos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Compra de jugadores | 827 de 1507 (55 %) | 228 de 343 (66 %) | 14.1 % · 64 % | 364 (24 %) | 316 | 0 |
| Salarios y primas (plantel y cuerpo técnico) | 1148 de 1507 (76 %) | 291 de 343 (85 %) | 48.7 % · 99 % | 16 (1 %) | 224 | 119 |
| Inversiones (amortizaciones y depreciación) | 1007 de 1507 (67 %) | 269 de 343 (78 %) | 2.0 % · 8 % | 201 (13 %) | 299 | 0 |
| Organización de partidos | 769 de 1507 (51 %) | 205 de 343 (60 %) | 7.0 % · 31 % | 415 (28 %) | 323 | 0 |
| Otras actividades (educación, juvenil, otros deportes, básquet) | 198 de 1507 (13 %) | 62 de 343 (18 %) | 5.6 % · 27 % | 995 (66 %) | 310 | 4 |
| Administración y gastos generales | 1257 de 1507 (83 %) | 291 de 343 (85 %) | 15.7 % · 72 % | 225 (15 %) | 25 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 343 de 1507 (23 %) | 76 de 343 (22 %) | 76.7 % · 91 % | 1164 (77 %) | 0 | 0 |
| Otros gastos (catch-all) | 1355 de 1507 (90 %) | 311 de 343 (91 %) | 10.0 % · 50 % | 152 (10 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Organización de partidos** — países: BR 37/42 · PT 32/33 · IT 22/22 · NL 20/31 · CO 18/27 · AR 18/19 · ES 14/19 · EE 9/9 · HR 8/8 · NO 4/6 · GR 4/14 · DK 4/11 · DE 3/11 · CH 3/3 · CL 3/3 · RU 1/16 · PE 1/1 · BE 1/23 · TR 1/1 · CY 1/1 · AT 1/1
- **Otras actividades (educación, juvenil, otros deportes, básquet)** — países: BR 20/42 · AR 18/19 · IT 5/22 · PT 4/33 · CO 3/27 · EE 3/9 · NL 2/31 · DE 2/11 · CH 2/3 · NO 1/6 · DK 1/11 · RU 1/16
- **Fútbol profesional (sin desglosar por la fuente)** — países: CO 19/27 · RU 16/16 · BR 14/42 · GR 10/14 · AR 4/19 · ES 2/19 · EE 2/9 · NO 1/6 · IT 1/22 · NL 1/31 · GB 1/31 · PE 1/1 · DE 1/11 · CH 1/3 · TR 1/1 · MX 1/1

### Candidata a fila (concepto que hoy no es fila)

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…) | 65 de 1507 (4 %) | 36 de 343 (10 %) | 1.6 % · 23 % | 1442 (96 %) | 0 | 0 |
| Subsidios, donaciones y aportes, amplia (cota superior) | 95 de 1507 (6 %) | 49 de 343 (14 %) | 2.6 % · 17 % | 1412 (94 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…)** — países: ES 15/19 · PT 8/33 · CO 4/27 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3
- **Subsidios, donaciones y aportes, amplia (cota superior)** — países: ES 15/19 · PT 8/33 · BR 8/42 · IT 5/22 · CO 4/27 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3

Otra candidata: `node tools/relevancia-filas.mjs --etiqueta "<regex>" [--lado gastos]`. Un club concreto de una fila: `--fila "Educación"`.

