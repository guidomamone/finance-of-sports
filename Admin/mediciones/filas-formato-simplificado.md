<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->
# Relevancia de las filas del Formato simplificado (generado)

Lo escribe `node tools/relevancia-filas.mjs --escribir` (lo corre solo `publicarCambios()`); no se edita a mano. Base: 331 clubes y 1319 club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.

**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.

### Ingresos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Cuotas Sociales | 328 de 1319 (25 %) | 84 de 331 (25 %) | 7.0 % · 39 % | 667 (51 %) | 244 | 80 |
| Comercial / Sponsors | 1012 de 1319 (77 %) | 259 de 331 (78 %) | 16.1 % · 74 % | 23 (2 %) | 218 | 66 |
| Estadio | 955 de 1319 (72 %) | 252 de 331 (76 %) | 8.9 % · 45 % | 45 (3 %) | 240 | 79 |
| Televisión | 926 de 1319 (70 %) | 234 de 331 (71 %) | 27.2 % · 84 % | 62 (5 %) | 245 | 86 |
| Premios por competencias | 461 de 1319 (35 %) | 140 de 331 (42 %) | 6.9 % · 39 % | 538 (41 %) | 320 | 0 |
| Venta de Jugadores | 907 de 1319 (69 %) | 234 de 331 (71 %) | 16.4 % · 65 % | 129 (10 %) | 283 | 0 |
| Otras actividades (educación y otros deportes) | 236 de 1319 (18 %) | 78 de 331 (24 %) | 1.9 % · 14 % | 769 (58 %) | 314 | 0 |
| Subsidios y donaciones | 400 de 1319 (30 %) | 123 de 331 (37 %) | 2.7 % · 31 % | 640 (49 %) | 279 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 329 de 1319 (25 %) | 120 de 331 (36 %) | 77.3 % · 95 % | 990 (75 %) | 0 | 0 |
| Otros ingresos (catch-all) | 1187 de 1319 (90 %) | 297 de 331 (90 %) | 7.4 % · 40 % | 132 (10 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Cuotas Sociales** — países: BR 32/42 · AR 19/19 · EE 8/9 · PT 7/33 · HR 5/8 · NO 4/6 · CO 2/15 · CH 2/3 · IT 1/22 · PE 1/1 · BE 1/23 · CL 1/3 · CY 1/1
- **Premios por competencias** — países: BR 25/42 · PT 22/33 · CO 15/15 · ES 15/19 · NL 14/31 · HR 8/8 · AR 7/19 · EE 7/9 · IT 6/22 · GR 6/14 · NO 3/6 · GB 3/31 · RU 3/16 · CH 2/3 · DK 1/11 · PE 1/1 · TR 1/1 · CL 1/3
- **Otras actividades (educación y otros deportes)** — países: AR 19/19 · BR 17/42 · CO 9/15 · IT 6/22 · GB 6/31 · EE 5/9 · PT 4/33 · CH 3/3 · NL 2/31 · NO 1/6 · GR 1/14 · RU 1/16 · PE 1/1 · ES 1/19 · DE 1/11 · CL 1/3
- **Subsidios y donaciones** — países: PT 30/33 · IT 19/22 · NL 10/31 · AR 10/19 · BR 10/42 · EE 9/9 · GB 7/31 · GR 5/14 · NO 4/6 · RU 4/16 · BE 4/23 · HR 4/8 · DK 2/11 · CO 2/15 · ES 2/19 · CH 1/3
- **Fútbol profesional (sin desglosar por la fuente)** — países: BE 22/23 · RU 15/16 · PT 13/33 · NL 12/31 · BR 12/42 · GR 10/14 · JP 10/10 · DK 7/11 · GB 3/31 · ES 3/19 · DE 3/11 · NO 2/6 · AR 2/19 · CO 1/15 · PE 1/1 · CH 1/3 · MX 1/1 · EE 1/9 · AT 1/1

### Gastos

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Compra de jugadores | 805 de 1319 (61 %) | 225 de 331 (68 %) | 14.2 % · 65 % | 337 (26 %) | 177 | 0 |
| Salarios y primas (plantel y cuerpo técnico) | 1101 de 1319 (83 %) | 288 de 331 (87 %) | 48.8 % · 99 % | 15 (1 %) | 88 | 115 |
| Inversiones (amortizaciones y depreciación) | 963 de 1319 (73 %) | 266 de 331 (80 %) | 1.9 % · 7 % | 192 (15 %) | 164 | 0 |
| Organización de partidos | 749 de 1319 (57 %) | 201 de 331 (61 %) | 7.1 % · 31 % | 386 (29 %) | 184 | 0 |
| Otras actividades (educación, juvenil, otros deportes, básquet) | 197 de 1319 (15 %) | 61 de 331 (18 %) | 5.7 % · 27 % | 947 (72 %) | 171 | 4 |
| Administración y gastos generales | 1089 de 1319 (83 %) | 277 de 331 (84 %) | 15.9 % · 73 % | 207 (16 %) | 23 | 0 |
| Fútbol profesional (sin desglosar por la fuente) | 204 de 1319 (15 %) | 57 de 331 (17 %) | 70.3 % · 88 % | 1115 (85 %) | 0 | 0 |
| Otros gastos (catch-all) | 1196 de 1319 (91 %) | 297 de 331 (90 %) | 10.5 % · 52 % | 123 (9 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Otras actividades (educación, juvenil, otros deportes, básquet)** — países: BR 20/42 · AR 18/19 · IT 5/22 · PT 4/33 · CO 3/15 · EE 3/9 · NL 2/31 · DE 2/11 · CH 2/3 · NO 1/6 · RU 1/16
- **Fútbol profesional (sin desglosar por la fuente)** — países: RU 16/16 · BR 14/42 · GR 10/14 · AR 4/19 · ES 2/19 · EE 2/9 · NO 1/6 · IT 1/22 · NL 1/31 · GB 1/31 · PE 1/1 · DE 1/11 · CH 1/3 · TR 1/1 · MX 1/1

### Candidata a fila (concepto que hoy no es fila)

| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |
|---|---|---|---|---|---|---|
| Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…) | 65 de 1319 (5 %) | 36 de 331 (11 %) | 1.6 % · 23 % | 1254 (95 %) | 0 | 0 |
| Subsidios, donaciones y aportes, amplia (cota superior) | 95 de 1319 (7 %) | 49 de 331 (15 %) | 2.6 % · 17 % | 1224 (93 %) | 0 | 0 |

Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):

- **Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…)** — países: ES 15/19 · PT 8/33 · CO 4/15 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3
- **Subsidios, donaciones y aportes, amplia (cota superior)** — países: ES 15/19 · PT 8/33 · BR 8/42 · IT 5/22 · CO 4/15 · GB 2/31 · HR 2/8 · NO 1/6 · GR 1/14 · DK 1/11 · AR 1/19 · CL 1/3

Otra candidata: `node tools/relevancia-filas.mjs --etiqueta "<regex>" [--lado gastos]`. Un club concreto de una fila: `--fila "Educación"`.

