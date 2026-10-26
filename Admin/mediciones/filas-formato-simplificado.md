<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->
# Relevancia de las filas del Formato simplificado (generado)

Lo escribe `node tools/relevancia-filas.mjs --escribir` (lo corre solo `publicarCambios()`); no se edita a mano. Base: 334 clubes y 1386 club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.

**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.

### Ingresos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Cuotas Sociales | 330 de 1386 (24 %) | 84 de 334 (25 %) | 7.0 % · 39 % | 673 (49 %) | 303 | 80 |
| Comercial / Sponsors | 1018 de 1386 (73 %) | 260 de 334 (78 %) | 16.1 % · 75 % | 25 (2 %) | 277 | 66 |
| Estadio | 961 de 1386 (69 %) | 253 de 334 (76 %) | 8.9 % · 45 % | 47 (3 %) | 299 | 79 |
| Televisión | 931 de 1386 (67 %) | 235 de 334 (70 %) | 27.1 % · 84 % | 65 (5 %) | 304 | 86 |
| Premios por competencias | 463 de 1386 (33 %) | 140 de 334 (42 %) | 6.9 % · 39 % | 544 (39 %) | 379 | 0 |
| Venta de Jugadores | 920 de 1386 (66 %) | 234 de 334 (70 %) | 16.7 % · 66 % | 130 (9 %) | 336 | 0 |
| Otras actividades (educación y otros deportes) | 237 de 1386 (17 %) | 78 de 334 (23 %) | 1.9 % · 14 % | 776 (56 %) | 373 | 0 |
| Subsidios y donaciones | 402 de 1386 (29 %) | 123 de 334 (37 %) | 2.7 % · 31 % | 646 (47 %) | 338 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 388 de 1386 (28 %) | 124 de 334 (37 %) | 81.6 % · 96 % | 998 (72 %) | 0 | 0 |
| Otros ingresos (catch-all) | 1234 de 1386 (89 %) | 301 de 334 (90 %) | 7.2 % · 38 % | 152 (11 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Cuotas Sociales** — países: BR 32/42 · AR 19/19 · EE 8/9 · PT 7/33 · HR 5/8 · NO 4/6 · CO 2/18 · CH 2/3 · IT 1/22 · PE 1/1 · BE 1/23 · CL 1/3 · CY 1/1
- **Premios por competencias** — países: BR 25/42 · PT 22/33 · CO 15/18 · ES 15/19 · NL 14/31 · HR 8/8 · AR 7/19 · EE 7/9 · IT 6/22 · GR 6/14 · NO 3/6 · GB 3/31 · RU 3/16 · CH 2/3 · DK 1/11 · PE 1/1 · TR 1/1 · CL 1/3
- **Otras actividades (educación y otros deportes)** — países: AR 19/19 · BR 17/42 · CO 9/18 · IT 6/22 · GB 6/31 · EE 5/9 · PT 4/33 · CH 3/3 · NL 2/31 · NO 1/6 · GR 1/14 · RU 1/16 · PE 1/1 · ES 1/19 · DE 1/11 · CL 1/3
- **Subsidios y donaciones** — países: PT 30/33 · IT 19/22 · NL 10/31 · AR 10/19 · BR 10/42 · EE 9/9 · GB 7/31 · GR 5/14 · NO 4/6 · RU 4/16 · BE 4/23 · HR 4/8 · DK 2/11 · CO 2/18 · ES 2/19 · CH 1/3
- **Fútbol profesional (sin desglosar por la fuente)** — países: BE 22/23 · RU 15/16 · PT 13/33 · NL 12/31 · BR 12/42 · GR 10/14 · JP 10/10 · DK 7/11 · CO 6/18 · ES 3/19 · DE 3/11 · NO 2/6 · GB 2/31 · AR 2/19 · PE 1/1 · CH 1/3 · MX 1/1 · EE 1/9 · AT 1/1

### Gastos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Compra de jugadores | 821 de 1386 (59 %) | 225 de 334 (67 %) | 14.1 % · 64 % | 350 (25 %) | 215 | 0 |
| Salarios y primas (plantel y cuerpo técnico) | 1130 de 1386 (82 %) | 288 de 334 (86 %) | 48.9 % · 99 % | 11 (1 %) | 126 | 119 |
| Inversiones (amortizaciones y depreciación) | 988 de 1386 (71 %) | 266 de 334 (80 %) | 1.9 % · 8 % | 196 (14 %) | 202 | 0 |
| Organización de partidos | 755 de 1386 (54 %) | 202 de 334 (60 %) | 7.1 % · 31 % | 409 (30 %) | 222 | 0 |
| Otras actividades (educación, juvenil, otros deportes, básquet) | 198 de 1386 (14 %) | 62 de 334 (19 %) | 5.6 % · 27 % | 975 (70 %) | 209 | 4 |
| Administración y gastos generales | 1138 de 1386 (82 %) | 282 de 334 (84 %) | 15.6 % · 72 % | 225 (16 %) | 23 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 242 de 1386 (17 %) | 61 de 334 (18 %) | 73.2 % · 88 % | 1144 (83 %) | 0 | 0 |
| Otros gastos (catch-all) | 1259 de 1386 (91 %) | 302 de 334 (90 %) | 10.4 % · 51 % | 127 (9 %) | 0 | 0 |

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

