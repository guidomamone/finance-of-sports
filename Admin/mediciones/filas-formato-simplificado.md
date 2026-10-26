<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->
# Relevancia de las filas del Formato simplificado (generado)

Lo escribe `node tools/relevancia-filas.mjs --escribir` (lo corre solo `publicarCambios()`); no se edita a mano. Base: 335 clubes y 1396 club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.

**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.

### Ingresos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Cuotas Sociales | 332 de 1396 (24 %) | 85 de 335 (25 %) | 7.0 % · 39 % | 690 (49 %) | 294 | 80 |
| Comercial / Sponsors | 1037 de 1396 (74 %) | 263 de 335 (79 %) | 16.1 % · 75 % | 25 (2 %) | 268 | 66 |
| Estadio | 980 de 1396 (70 %) | 256 de 335 (76 %) | 8.9 % · 46 % | 47 (3 %) | 290 | 79 |
| Televisión | 950 de 1396 (68 %) | 238 de 335 (71 %) | 27.0 % · 85 % | 65 (5 %) | 295 | 86 |
| Premios por competencias | 481 de 1396 (34 %) | 143 de 335 (43 %) | 6.8 % · 38 % | 545 (39 %) | 370 | 0 |
| Venta de Jugadores | 938 de 1396 (67 %) | 237 de 335 (71 %) | 17.0 % · 67 % | 131 (9 %) | 327 | 0 |
| Otras actividades (educación y otros deportes) | 241 de 1396 (17 %) | 79 de 335 (24 %) | 2.0 % · 14 % | 791 (57 %) | 364 | 0 |
| Subsidios y donaciones | 405 de 1396 (29 %) | 125 de 335 (37 %) | 2.6 % · 31 % | 662 (47 %) | 329 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 379 de 1396 (27 %) | 124 de 335 (37 %) | 81.5 % · 96 % | 1017 (73 %) | 0 | 0 |
| Otros ingresos (catch-all) | 1246 de 1396 (89 %) | 302 de 335 (90 %) | 7.1 % · 38 % | 150 (11 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Cuotas Sociales** — países: BR 32/42 · AR 19/19 · EE 8/9 · PT 7/33 · HR 5/8 · NO 4/6 · CO 3/19 · CH 2/3 · IT 1/22 · PE 1/1 · BE 1/23 · CL 1/3 · CY 1/1
- **Premios por competencias** — países: BR 25/42 · PT 22/33 · CO 18/19 · ES 15/19 · NL 14/31 · HR 8/8 · AR 7/19 · EE 7/9 · IT 6/22 · GR 6/14 · NO 3/6 · GB 3/31 · RU 3/16 · CH 2/3 · DK 1/11 · PE 1/1 · TR 1/1 · CL 1/3
- **Otras actividades (educación y otros deportes)** — países: AR 19/19 · BR 17/42 · CO 10/19 · IT 6/22 · GB 6/31 · EE 5/9 · PT 4/33 · CH 3/3 · NL 2/31 · NO 1/6 · GR 1/14 · RU 1/16 · PE 1/1 · ES 1/19 · DE 1/11 · CL 1/3
- **Subsidios y donaciones** — países: PT 30/33 · IT 19/22 · NL 10/31 · AR 10/19 · BR 10/42 · EE 9/9 · GB 7/31 · GR 5/14 · NO 4/6 · CO 4/19 · RU 4/16 · BE 4/23 · HR 4/8 · DK 2/11 · ES 2/19 · CH 1/3
- **Fútbol profesional (sin desglosar por la fuente)** — países: BE 22/23 · RU 15/16 · PT 13/33 · NL 12/31 · BR 12/42 · GR 10/14 · JP 10/10 · DK 7/11 · CO 6/19 · ES 3/19 · DE 3/11 · NO 2/6 · GB 2/31 · AR 2/19 · PE 1/1 · CH 1/3 · MX 1/1 · EE 1/9 · AT 1/1

### Gastos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Compra de jugadores | 826 de 1396 (59 %) | 228 de 335 (68 %) | 14.1 % · 64 % | 359 (26 %) | 211 | 0 |
| Salarios y primas (plantel y cuerpo técnico) | 1144 de 1396 (82 %) | 291 de 335 (87 %) | 48.8 % · 99 % | 11 (1 %) | 122 | 119 |
| Inversiones (amortizaciones y depreciación) | 1004 de 1396 (72 %) | 269 de 335 (80 %) | 2.0 % · 8 % | 196 (14 %) | 196 | 0 |
| Organización de partidos | 769 de 1396 (55 %) | 205 de 335 (61 %) | 7.0 % · 31 % | 409 (29 %) | 218 | 0 |
| Otras actividades (educación, juvenil, otros deportes, básquet) | 198 de 1396 (14 %) | 62 de 335 (19 %) | 5.6 % · 27 % | 989 (71 %) | 205 | 4 |
| Administración y gastos generales | 1148 de 1396 (82 %) | 283 de 335 (84 %) | 15.7 % · 72 % | 225 (16 %) | 23 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 238 de 1396 (17 %) | 62 de 335 (19 %) | 72.8 % · 88 % | 1158 (83 %) | 0 | 0 |
| Otros gastos (catch-all) | 1269 de 1396 (91 %) | 303 de 335 (90 %) | 10.4 % · 51 % | 127 (9 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Otras actividades (educación, juvenil, otros deportes, básquet)** — países: BR 20/42 · AR 18/19 · IT 5/22 · PT 4/33 · CO 3/19 · EE 3/9 · NL 2/31 · DE 2/11 · CH 2/3 · NO 1/6 · DK 1/11 · RU 1/16
- **Fútbol profesional (sin desglosar por la fuente)** — países: RU 16/16 · BR 14/42 · GR 10/14 · CO 5/19 · AR 4/19 · ES 2/19 · EE 2/9 · NO 1/6 · IT 1/22 · NL 1/31 · GB 1/31 · PE 1/1 · DE 1/11 · CH 1/3 · TR 1/1 · MX 1/1

### Candidata a fila (concepto que hoy no es fila)

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…) | 65 de 1396 (5 %) | 36 de 335 (11 %) | 1.6 % · 23 % | 1331 (95 %) | 0 | 0 |
| Subsidios, donaciones y aportes, amplia (cota superior) | 95 de 1396 (7 %) | 49 de 335 (15 %) | 2.6 % · 17 % | 1301 (93 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…)** — países: ES 15/19 · PT 8/33 · CO 4/19 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3
- **Subsidios, donaciones y aportes, amplia (cota superior)** — países: ES 15/19 · PT 8/33 · BR 8/42 · IT 5/22 · CO 4/19 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3

Otra candidata: `node tools/relevancia-filas.mjs --etiqueta "<regex>" [--lado gastos]`. Un club concreto de una fila: `--fila "Educación"`.

