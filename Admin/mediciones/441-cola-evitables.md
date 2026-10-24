<!-- md: qué subtipos de pregunta de la cola de revisión se podrían evitar sin perder respuestas, medido contra la cola histórica | leer: antes de poner una compuerta o una tabla que salte preguntas de la cola, o de cambiar cuándo se levantan -->
# 441: qué preguntas de la cola se pueden evitar sin perder respuestas

Conclusión: de las 7047 preguntas de `Admin/registros/cola-revision.jsonl` (6962 sin las altas), ninguna regla simple las evita sin perder respuestas. Las preguntas de duda de `verificar` NO admiten compuerta: «nota informativa / after charging» se aceptó 48 % y se corrigió 52 % (58 respuestas), «cost of sales y administrative» 77 %, «sin desglose» 87 %, «cuadro informativo» 82 %; ninguna llega al 98 % que haría falta, y el 27 % de error del punto se confirma. Las otras dos ideas no se implementan: (a) las 1512 preguntas que el pipeline cierra solo ya se cierran en minutos (354 en menos de 10 minutos, 1242 en menos de 6 horas, mediana 45 minutos), casi siempre antes de que un revisor las lea, así que preguntarlas al final no ahorra respuestas, solo ruido en la cola; (b) lo del perfil de socios y otros deportes ya está hecho: `perfil-clubes.mjs` hace valer un chequeo ±4 años (`VENTANA_PERFIL = 5`) y, si un chequeo nuevo contradice al más cercano, `cargar.mjs`/`cola.mjs` abren la revisión de los años del medio (`perfil-cambio`); las 501 preguntas de perfil son 3,1 por club en 161 clubes, lo que cuadra con esa ventana.
Destino: punto 441 de `Admin/TODO.md` (se cierra) y el punto 449 (lo que depende de gasto de API). No se implementó ni se cambió nada.

## Cómo se midió (2026-10-24)

Se leyó `Admin/registros/cola-revision.jsonl` (casos y respuestas por `id`) con un script de la sesión (no se guardó; son 60 líneas sobre `tipo`, `etapa`, `motivo`, `que`, `detalle`, `decision`, `valor`). «Respondida por una persona» = decisión aceptar, corregir, descartar o preguntar-club; «cerrada sola» = `obsoleto` (la etapa dejó de levantarla). Todo es dentro de la muestra: no se probó con clubes que no estén en la cola.

## Por etapa y motivo

| Etapa y motivo | Preguntas | Cerradas solas | Respondidas por una persona | Aceptar | Corregir |
|---|---|---|---|---|---|
| cargar, categoría | 3257 | 65 (2 %) | 3189 | 75 % | 24 % |
| verificar, duda-tema | 586 | 115 (20 %) | 467 | 84 % | 13 % |
| verificar, duda-de-extraer | 548 | 48 (9 %) | 488 | 70 % | 28 % |
| cargar, perfil | 528 | 26 (5 %) | 501 | 1 % | 99 % (es la respuesta: el sistema no propone nada) |
| verificar, no-cierra | 510 | 330 (65 %) | 178 | 87 % | 0 % |
| cargar, gestión | 493 | 61 (12 %) | 402 | 65 % | 0 % |
| verificar, primer-anio | 305 | 186 (61 %) | 117 | 93 % | 2 % |
| verificar, duda-de-localizar | 295 | 24 (8 %) | 258 | 72 % | 27 % |
| verificar, anio-vecino | 243 | 114 (47 %) | 129 | 84 % | 0 % |
| verificar, numero-no-confirmado | 90 | 70 (78 %) | 20 | 70 % | 30 % |
| cargar, perímetro | 59 | 14 (24 %) | 45 | 40 % | 58 % |
| verificar, anio-anterior | 47 | 11 (23 %) | 36 | 97 % | 0 % |

## Perfil: socios y otros deportes por país (la medición; el «no por país» se descartó, ver más abajo)

Las respondidas por una persona son 501 en 161 clubes (3,1 por club). Pares (tema, país) con 10 o más respuestas y 97 % o más de «no»: Grecia, Italia, Países Bajos y Colombia (socios y otros deportes), Gran Bretaña, Noruega, Estonia y Bélgica (solo otros deportes) y Portugal (solo socios, 34 «no» de 35). No entran Gran Bretaña en socios (86 %), Bélgica en socios (70 %), Noruega en socios (50 %) ni Brasil (socios: 27 «sí» de 33); Croacia no llega a 10 respuestas. Prediciendo «no» en los pares que entran: 307 preguntas evitadas, 1 «sí» perdido (un club portugués), en la misma muestra de donde sale la regla. Quedaría fuera lo que Guido puede querer saber: un club con socios que pagan cuota es un ingreso que falta, y el «no» de un país es un supuesto, no un dato del club.

## Subtipos de `verificar` que nombra el punto (solo respondidas por una persona)

| Subtipo | Respuestas | Aceptar | Corregir |
|---|---|---|---|
| after charging / stated after | 58 | 28 (48 %) | 30 (52 %) |
| cost of sales y administrative | 35 | 27 (77 %) | 8 (23 %) |
| sin desglose | 70 | 61 (87 %) | 7 (10 %) |
| «¿se deja afuera de la carga el cuadro…?» | 124 | 102 (82 %) | 20 (16 %) |

## Cuánto tardan en cerrarse solas (segunda pasada)

| | Cerradas solas | Menos de 10 min | Menos de 1 h | Menos de 6 h | Menos de 24 h | Mediana |
|---|---|---|---|---|---|---|
| todas | 1512 | 354 | 807 | 1242 | 1416 | 45 min |
| verificar, no-cierra | 346 | 44 | 161 | 277 | 344 | 77 min |
| verificar, primer-anio | 205 | 138 | 159 | 187 | 205 | 2 min |
| verificar, anio-vecino | 127 | 27 | 65 | 97 | 127 | 51 min |
| verificar, numero-no-confirmado | 73 | 4 | 4 | 73 | 73 | 216 min |

En 285 de las 1512 el mismo documento tuvo una respuesta de una persona entre que la pregunta se abrió y se cerró: son las únicas que alguien pudo haber mirado. Levantarlas al final de la corrida no ahorraría respuestas; el primer-anio, que la etapa `primer-anio-ia` resuelve a los 2 minutos, es el caso claro.

## Perfil: la ventana ya existe

La regla de «un chequeo del año 2018 vale hasta 2022, y si uno nuevo cambia la respuesta se revisan los años del medio» está en `tools/perfil-clubes.mjs` (`VENTANA_PERFIL = 5`, `perfilVigente`, `perfilCercano`) y en `cargar-ceros.mjs` y `cola.mjs` (caso `perfil-cambio`). El «no por país» de arriba se descartó: es un supuesto sobre un club que nadie miró, y la ventana ya evita preguntar cada año.

## Qué queda

Los revisores que miran varias preguntas juntas con un esquema fijo y el reintento único (US$ 1,59 para 13 documentos): necesitan una corrida con subagentes o con API (gasto) y quedan en el punto 449.
