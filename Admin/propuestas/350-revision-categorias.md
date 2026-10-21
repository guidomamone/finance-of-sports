# 350: revisar la taxonomía con una medición, y la categoría de subsidios, donaciones y aportes

Para el ok de Guido. La Auditora no edita skills ni código: el texto va exacto, y lo aplica la principal (skills) y una sesión Pipeline (tools, taxonomía, pantalla).
Medición de partida: `Admin/mediciones/350-categorias-en-vano.md` (con `350-uso-categorias.mjs`, `350-subsidios-en-otros-ingresos.mjs`).

## 1. Qué se votó: subsidios, donaciones y aportes (3 a 0 por la opción A)

Votaron tres subagentes Sonnet independientes con `votacion-de-criterios` (casos y votos con citas: `Admin/registros/auditoria-proceso.jsonl`, línea «votación: subsidios, donaciones y aportes»).

**Decisión:** una categoría genérica nueva de ingresos, `grants_donations` («Subsidios, donaciones y aportes»), con una subcategoría `grants_donations`, y una fila nueva en el Formato simplificado con `hideIfZero:true` (como «Fútbol profesional, sin desglosar por la fuente», la otra fila sin equivalente en Boca). Las opciones descartadas: una subcategoría bajo «Otros ingresos» (el lector sigue viendo «Otros ingresos» en 49 % en Estonia y 60 % en Rusia) y dejar todo como está.

**Por qué ganó** (criterios de la escala, sin precedente 1 a 4 en contra): el 7, lo que entiende el lector (decisivo: «Otros ingresos» pasa a ser la mitad del club en Estonia y Rusia); el 5, fidelidad (los documentos imprimen el rubro aparte: «Annetused ja toetused», «Subsídios à exploração», «Bidrag fra aksjonærene»); el 9, comparabilidad (148 de 318 clubes, 17 países). Neutros: 6 y 8.

**Los bordes, los tres votantes coinciden:**
1. **Una sola categoría para los tres** (subsidio público, donación privada, aporte de socios o accionistas). Los documentos los agrupan en un renglón; separarlos sería inventar un desglose (criterio 5). La subcategoría es única; el `rawLabel` dice el origen.
2. **Aportes de accionistas:** son ingreso de la categoría solo si el documento los imprime dentro de los ingresos (Sarpsborg Fotball Invest 2010, «Bidrag fra aksjonærene» 100.000 dentro de «Sum inntekter» y la nota 4 los llama «inntektsført som en gave»). Si el documento los lleva al patrimonio neto (aumento de capital), no son ingreso.
3. **La subvención de capital imputada al resultado** («Imputación de subvenciones de inmovilizado», «Imputação de subsídios para o investimento») NO entra: es la liberación contable de un diferido, sin plata del año (criterio 6). Sigue en `other_income`.
4. **Los subsidios de la educación se quedan en `education`** (ya es regla en `club-data-mapping/SKILL.md`: «subsidios estatales a la educación»).
5. **Los premios y la solidaridad de la UEFA y de la liga siguen en `prize_money`** aunque el documento los junte con subsidios en una nota (Flora Tallinn, Tallinna Kalev): la categoría nueva no se los traga.
6. **Años ya cargados: ninguno cambia** (regla vigente de no reabrir). Las cargas nuevas la usan; `catchall-dominante` la lee.

### Texto de la REGLA para `Admin/CONVENCIONES-DATOS.md`

```
## REGLA: subsidios, donaciones y aportes van a `grants_donations` (votación 3 a 0, 2026-10-21)

Un ingreso sin contraprestación comercial (subsidio público de explotación, donación, aporte de socios o accionistas impreso como ingreso)
va a `grants_donations`, no a `other_income`. No entran: la subvención de capital imputada al resultado (`other_income`: no es plata del año),
los premios y la solidaridad UEFA o de la liga (`competition_bonus`), el subsidio de la educación (`education`) ni un aporte que el documento
lleva al patrimonio neto. Lo ya cargado no se recategoriza. Caso: Flora Tallinn (Lisa 12, «Annetused ja toetused»), Nacional («Subsídios à
exploração»), Sarpsborg Fotball Invest 2010 («Bidrag fra aksjonærene»).
CATEGORÍA (prompt): un subsidio público, una donación o un aporte de socios o accionistas impreso como ingreso va a grants_donations; la
subvención de capital imputada, los premios y la solidaridad UEFA o de la liga y el subsidio de la educación no.
EJEMPLO-CATEGORÍA: floratallinn-ee | revenue | Riigi ja/või KOV toetus | grants_donations
```

### Qué codea una sesión Pipeline (con `generar-schema-json`, `contrato-de-datos` y `audit.js` sin P0 ni P1)

1. `data/schema/taxonomy-football-1.json`: la genérica `grants_donations` (label_es «Subsidios, donaciones y aportes», label_en «Grants, donations and contributions», block `revenue`) y su subcategoría; el esquema nuevo es aditivo (campo nuevo, nada se quita).
2. `data/category-map.js`, el prompt del categorizador (`node tools/reglas-categoria.mjs --escribir` con la REGLA de arriba), colores e i18n.
3. `js/finanzas-calc.js`: una fila de ingresos «Subsidios, donaciones y aportes» con `hideIfZero:true`, en la posición que le correspondería en Boca (antes de «Otros ingresos»); `node tools/generate-rankings.js` (los rankings hornean el nombre de cada fila) y verificar en el navegador cada bucket, no solo el total (`Admin/PANTALLA.md`).
4. `audit.js`: `catchall-dominante` y `taxonomia-incompleta` leen la categoría nueva. Mide: con el JSON de hoy, 0 cambios (no se recategoriza); el primer club cargado con un subsidio grande baja su catch-all.
5. **La fila nueva cambia la lista de filas del Formato simplificado:** Guido la ve antes de publicarla (regla de la referencia de Boca).

## 2. Educación

Medido (`350-categorias-en-vano.md`): 17 de 318 clubes la usan, 13 de ellos argentinos con un colegio real (13 de unos 20 clubes argentinos cargados, 2 % a 18 % del ingreso o del gasto). Los otros 4 (Novorizontino, Fortaleza, Tartu Tammeka, Leeds) son líneas de otro tipo. **Tiene sentido, como categoría del fútbol argentino con peso, no del fútbol en general.** Propuesta, sin votar porque no cambia datos:
1. La descripción de `education` y de `education_expense` en la taxonomía dice «colegio o instituto educativo del club: aranceles, matrícula y subsidios al colegio; no es un beneficio al empleado ni una escuela deportiva» (Pipeline, una línea de cada una).
2. Los 4 usos que no son un colegio no se recategorizan (regla vigente).
3. **Para Guido, de pantalla:** la fila «Educación» del Formato simplificado es de Boca y se ve en cero en 301 clubes. ¿Se pasa a `hideIfZero:true`? Hoy la regla reserva `hideIfZero` a las filas sin equivalente en Boca; habría que cambiarla. No lo decido acá.

## 3. Texto para la skill `club-data-mapping` (sección nueva, antes de «Cómo mantener este skill»)

```
## Revisión de la taxonomía (cuándo, con qué medición, qué umbral, cómo se vota)

Una categoría o subcategoría se abre, se cierra o se deja con una medición, no con una opinión. Lo hace la Auditora; el código, Pipeline.

**Cuándo.** (1) Cada 100 clubes cargados desde la última revisión, o cada 6 meses, lo que pase primero. (2) Cuando `catchall-dominante` repite una misma
etiqueta en 20 club-años o más, de 5 clubes o más, de 3 países o más. (3) Cuando una sesión de carga pide una categoría nueva: se le pide la medición,
no el argumento. Una sesión de carga nunca cambia la taxonomía.

**Medición.** `node tools/uso-categorias.mjs`: por lado, deporte, categoría y subcategoría, los club-años, clubes y países que la usan, el peso mediano
y máximo (la parte de esa línea sobre la suma de las líneas de su lado en el club-año, sin presupuestos) y los club-años con peso de 5 % o más; y, para
el catch-all, sus etiquetas más repetidas por país. Un deporte con menos de 5 clubes cargados no tiene muestra: nada de él se cierra.

**Umbral para abrir una subcategoría** (las cuatro): (a) 30 club-años y 10 clubes o más con el mismo hecho; (b) 3 países o más, o 2 países donde la
mediana pesa 25 % o más; (c) en 20 club-años o más pesa 5 % o más de su lado; (d) es UN hecho económico que el lector entiende con un nombre (criterio
7 de `votacion-de-criterios`, con la cita de tres documentos). **Una genérica nueva** (una fila del Formato simplificado) exige además estar en 15 %
de los clubes cargados o más, y la ve Guido antes de publicarse.

**Umbral para cerrar** (deja de ofrecerse a las cargas nuevas; lo cargado queda): en dos relevamientos seguidos, menos de 10 club-años o menos de 3
clubes, y peso mediano de 2 % o menos. No se cierra la única subcategoría de su genérica, ni la de un deporte sin muestra. **Una categoría regional se
queda** si la usan 5 clubes o más y 30 % o más de los clubes cargados de su país, y su descripción dice el alcance (la educación en Argentina).

**Cómo se vota.** Lo que el umbral decide no se vota: se anota la medición. Se vota con `votacion-de-criterios` cuando (1) la condición (d) no es evidente,
(2) hay dónde ubicarla (genérica nueva, subcategoría, o nada), o (3) la medición queda a 20 % o menos del umbral. Va a Guido, con la recomendación,
cuando cambia la lista de filas del Formato simplificado o cuando cierra una categoría que tiene datos cargados.

**Dónde queda.** Una línea en `Admin/registros/auditoria-proceso.jsonl` con la medición y el veredicto; una REGLA en `Admin/CONVENCIONES-DATOS.md` con
`CATEGORÍA (prompt)` y `EJEMPLO-CATEGORÍA`; el cambio de `taxonomy-*.json` por Pipeline, con la skill `contrato-de-datos`. Lo cargado no se recategoriza.
```

## 4. Texto para `votacion-de-criterios` (un párrafo al final de la sección 1)

```
Si el caso es abrir o cerrar una categoría de la taxonomía, antes de votar se corre la medición de `club-data-mapping`, «Revisión de la taxonomía»: lo que el umbral decide no se vota.
```

## 5. Qué codea Pipeline para el proceso

`tools/uso-categorias.mjs`: la tool que produce la medición de la sección 3 (el punto de partida es `Admin/mediciones/350-uso-categorias.mjs`; falta el
agrupado de etiquetas del catch-all por país, que hoy hace `350-subsidios-en-otros-ingresos.mjs` solo para subsidios). Salida: una tabla y `--json`.
Un chequeo `revision-taxonomia-vencida` en `audit.js` (P3): la última revisión de `auditoria-proceso.jsonl` con `cambio` que empiece con «taxonomía:» tiene
más de 6 meses o más de 100 clubes cargados atrás. Mide: hoy 1 P3 (nunca se revisó); después de esta revisión, 0.

## 6. Qué sale de la lista

La clase del `catchall-dominante` que tenía subsidios (unos 125) no baja hasta que se carguen clubes con la categoría: el chequeo ya está en P3 y no pide nada.
