<!-- md: qué subtipos de pregunta de la cola de revisión se podrían evitar sin perder respuestas, medido contra la cola histórica | leer: antes de poner una compuerta o una tabla que salte preguntas de la cola, o de cambiar cuándo se levantan -->
# 441: qué preguntas de la cola se pueden evitar sin perder respuestas

Conclusión: de las 7047 preguntas de `Admin/registros/cola-revision.jsonl` (6962 sin las altas), solo dos grupos se pueden evitar sin perder respuestas. (1) Las de `perfil` de clubes de un país donde casi siempre es «no»: 307 de las 501 respondidas por una persona (61 %) caen en un par (tema, país) con 10 o más respuestas y 97 % o más de «no», con 1 «sí» perdido. (2) Las que el pipeline cierra solo: 705 preguntas de `verificar` (no-cierra 330 de 510, primer-anio 186 de 305, anio-vecino 114 de 243, numero-no-confirmado 70 de 90) las retiró la corrida siguiente sin que nadie contestara; preguntarlas al final de la corrida las evitaría. Las preguntas de duda de `verificar` NO admiten compuerta: «nota informativa / after charging» se aceptó 48 % y se corrigió 52 % (58 respuestas), «cost of sales y administrative» 77 %, «sin desglose» 87 %, «cuadro informativo» 82 %; ninguna llega al 98 % que haría falta, y el 27 % de error del punto se confirma.
Destino: punto 441 de `Admin/TODO.md` (qué queda). No se implementó nada.

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

## Perfil: socios y otros deportes por país

Las respondidas por una persona son 501 en 161 clubes (3,1 por club). Pares (tema, país) con 10 o más respuestas y 97 % o más de «no»: Grecia, Italia, Países Bajos y Colombia (socios y otros deportes), Gran Bretaña, Noruega, Estonia y Bélgica (solo otros deportes) y Portugal (solo socios, 34 «no» de 35). No entran Gran Bretaña en socios (86 %), Bélgica en socios (70 %), Noruega en socios (50 %) ni Brasil (socios: 27 «sí» de 33); Croacia no llega a 10 respuestas. Prediciendo «no» en los pares que entran: 307 preguntas evitadas, 1 «sí» perdido (un club portugués), en la misma muestra de donde sale la regla. Quedaría fuera lo que Guido puede querer saber: un club con socios que pagan cuota es un ingreso que falta, y el «no» de un país es un supuesto, no un dato del club.

## Subtipos de `verificar` que nombra el punto (solo respondidas por una persona)

| Subtipo | Respuestas | Aceptar | Corregir |
|---|---|---|---|
| after charging / stated after | 58 | 28 (48 %) | 30 (52 %) |
| cost of sales y administrative | 35 | 27 (77 %) | 8 (23 %) |
| sin desglose | 70 | 61 (87 %) | 7 (10 %) |
| «¿se deja afuera de la carga el cuadro…?» | 124 | 102 (82 %) | 20 (16 %) |

## Qué queda para decidir o hacer

1. Las preguntas que se cierran solas (705): levantarlas al final de la corrida o después del reintento. Es un cambio al orden de las etapas (`lote.mjs`, `cola.mjs`): se mide con el lote completo. Evita preguntas, no cambia respuestas.
2. Perfil: una tabla (tema, país) con el «no» por defecto, escrita en `Admin/registros/perfil-clubes.jsonl` con la marca de que es supuesto del país. Es un criterio de datos (un club con socios que pagan cuota quedaría sin su ingreso): decide Guido, con `votacion-de-criterios` si hace falta.
3. Revisor por club o por tipo con esquema fijo: no se midió aquí (necesita una corrida de subagentes); 438 ya arma el caso con la lista fija y el voto en JSON.
