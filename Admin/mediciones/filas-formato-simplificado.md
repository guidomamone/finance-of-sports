<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->
# Relevancia de las filas del Formato simplificado (generado)

Lo escribe `node tools/relevancia-filas.mjs --escribir` (lo corre solo `publicarCambios()`); no se edita a mano. Base: 334 clubes y 1386 club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.

**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.

### Ingresos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Cuotas Sociales | 332 de 1386 (24 %) | 85 de 334 (25 %) | 7.0 % · 39 % | 690 (50 %) | 284 | 80 |
| Comercial / Sponsors | 1037 de 1386 (75 %) | 263 de 334 (79 %) | 16.1 % · 75 % | 25 (2 %) | 258 | 66 |
| Estadio | 980 de 1386 (71 %) | 256 de 334 (77 %) | 8.9 % · 46 % | 47 (3 %) | 280 | 79 |
| Televisión | 950 de 1386 (69 %) | 238 de 334 (71 %) | 27.0 % · 85 % | 65 (5 %) | 285 | 86 |
| Premios por competencias | 481 de 1386 (35 %) | 143 de 334 (43 %) | 6.8 % · 38 % | 545 (39 %) | 360 | 0 |
| Venta de Jugadores | 938 de 1386 (68 %) | 237 de 334 (71 %) | 17.0 % · 67 % | 131 (9 %) | 317 | 0 |
| Otras actividades (educación y otros deportes) | 241 de 1386 (17 %) | 79 de 334 (24 %) | 2.0 % · 14 % | 791 (57 %) | 354 | 0 |
| Subsidios y donaciones | 405 de 1386 (29 %) | 125 de 334 (37 %) | 2.6 % · 31 % | 662 (48 %) | 319 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 369 de 1386 (27 %) | 123 de 334 (37 %) | 79.7 % · 96 % | 1017 (73 %) | 0 | 0 |
| Otros ingresos (catch-all) | 1236 de 1386 (89 %) | 301 de 334 (90 %) | 7.1 % · 38 % | 150 (11 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Cuotas Sociales** — países: BR 32/42 · AR 19/19 · EE 8/9 · PT 7/33 · HR 5/8 · NO 4/6 · CO 3/18 · CH 2/3 · IT 1/22 · PE 1/1 · BE 1/23 · CL 1/3 · CY 1/1
- **Premios por competencias** — países: BR 25/42 · PT 22/33 · CO 18/18 · ES 15/19 · NL 14/31 · HR 8/8 · AR 7/19 · EE 7/9 · IT 6/22 · GR 6/14 · NO 3/6 · GB 3/31 · RU 3/16 · CH 2/3 · DK 1/11 · PE 1/1 · TR 1/1 · CL 1/3
- **Otras actividades (educación y otros deportes)** — países: AR 19/19 · BR 17/42 · CO 10/18 · IT 6/22 · GB 6/31 · EE 5/9 · PT 4/33 · CH 3/3 · NL 2/31 · NO 1/6 · GR 1/14 · RU 1/16 · PE 1/1 · ES 1/19 · DE 1/11 · CL 1/3
- **Subsidios y donaciones** — países: PT 30/33 · IT 19/22 · NL 10/31 · AR 10/19 · BR 10/42 · EE 9/9 · GB 7/31 · GR 5/14 · NO 4/6 · CO 4/18 · RU 4/16 · BE 4/23 · HR 4/8 · DK 2/11 · ES 2/19 · CH 1/3
- **Fútbol profesional (sin desglosar por la fuente)** — países: BE 22/23 · RU 15/16 · PT 13/33 · NL 12/31 · BR 12/42 · GR 10/14 · JP 10/10 · DK 7/11 · CO 5/18 · ES 3/19 · DE 3/11 · NO 2/6 · GB 2/31 · AR 2/19 · PE 1/1 · CH 1/3 · MX 1/1 · EE 1/9 · AT 1/1

### Gastos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Compra de jugadores | 826 de 1386 (60 %) | 228 de 334 (68 %) | 14.1 % · 64 % | 359 (26 %) | 201 | 0 |
| Salarios y primas (plantel y cuerpo técnico) | 1144 de 1386 (83 %) | 291 de 334 (87 %) | 48.8 % · 99 % | 11 (1 %) | 112 | 119 |
| Inversiones (amortizaciones y depreciación) | 1004 de 1386 (72 %) | 269 de 334 (81 %) | 2.0 % · 8 % | 196 (14 %) | 186 | 0 |
| Organización de partidos | 769 de 1386 (55 %) | 205 de 334 (61 %) | 7.0 % · 31 % | 409 (30 %) | 208 | 0 |
| Otras actividades (educación, juvenil, otros deportes, básquet) | 198 de 1386 (14 %) | 62 de 334 (19 %) | 5.6 % · 27 % | 989 (71 %) | 195 | 4 |
| Administración y gastos generales | 1138 de 1386 (82 %) | 282 de 334 (84 %) | 15.9 % · 73 % | 225 (16 %) | 23 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 228 de 1386 (16 %) | 61 de 334 (18 %) | 71.4 % · 88 % | 1158 (84 %) | 0 | 0 |
| Otros gastos (catch-all) | 1259 de 1386 (91 %) | 302 de 334 (90 %) | 10.5 % · 52 % | 127 (9 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Otras actividades (educación, juvenil, otros deportes, básquet)** — países: BR 20/42 · AR 18/19 · IT 5/22 · PT 4/33 · CO 3/18 · EE 3/9 · NL 2/31 · DE 2/11 · CH 2/3 · NO 1/6 · DK 1/11 · RU 1/16
- **Fútbol profesional (sin desglosar por la fuente)** — países: RU 16/16 · BR 14/42 · GR 10/14 · CO 4/18 · AR 4/19 · ES 2/19 · EE 2/9 · NO 1/6 · IT 1/22 · NL 1/31 · GB 1/31 · PE 1/1 · DE 1/11 · CH 1/3 · TR 1/1 · MX 1/1

### Candidata a fila (concepto que hoy no es fila)

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…) | 65 de 1386 (5 %) | 36 de 334 (11 %) | 1.6 % · 23 % | 1321 (95 %) | 0 | 0 |
| Subsidios, donaciones y aportes, amplia (cota superior) | 95 de 1386 (7 %) | 49 de 334 (15 %) | 2.6 % · 17 % | 1291 (93 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…)** — países: ES 15/19 · PT 8/33 · CO 4/18 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3
- **Subsidios, donaciones y aportes, amplia (cota superior)** — países: ES 15/19 · PT 8/33 · BR 8/42 · IT 5/22 · CO 4/18 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3

Otra candidata: `node tools/relevancia-filas.mjs --etiqueta "<regex>" [--lado gastos]`. Un club concreto de una fila: `--fila "Educación"`.

