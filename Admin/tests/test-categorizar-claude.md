# Test de categorización con Claude (escalón 2, lo que Jev deja < 0,90)

Generado el 2026-09-30 con `tools/categorizar-claude.mjs --backtest`. Gasto total del test: **US$ 5,62** (314 llamadas, 0 errores, todo
registrado en `Admin/claude-api/resultados.jsonl` con `tarea: "categorizar"`). Resultados por rubro: `Admin/categorizar-claude/backtest_*.jsonl`.

## Qué se midió

- **Rubros**: los 1.217 de 3.975 que Jev dejó con confianza < 0,90 en `Admin/jev/backtest_lado_ej_otrosclubes.jsonl` (lado conocido, ejemplos
  solo de otros clubes). "Verdad" = la categoría de producción.
- **Agrupación**: cada rubro se asignó al ejercicio más reciente del club que lo tiene; 224 club-años, una llamada por club-año con todos
  sus pendientes juntos.
- **Contexto que recibe Claude**: las 26 categorías de `data/category-map.js` con su lado y el comentario completo; un resumen de los
  criterios del skill `club-data-mapping`; las filas del mismo documento en orden (las que Jev resolvió con >= 0,90 van con la categoría
  **de Jev**, las demás sin categoría); 6 ejemplos parecidos de otros clubes por rubro; y (variante principal) las líneas ya cargadas del
  club en otros años.
- **Sin fuga**: del contexto del club se sacan todas las líneas del mismo club-año y cualquier línea de otro año con el mismo texto
  que un rubro pendiente (ese caso lo resuelve gratis el escalón 0, "precedente exacto", así que a Claude le llega justo lo que no tiene
  precedente exacto). Sí quedan textos parecidos del club (p. ej. "Receitas Federações (Copa do Brasil/Sul-Americana)" en otro año
  para "Receita Federações (Copa do Brasil)"): es la situación real de un año nuevo y es lo que se quería medir.
- **Modelo**: Claude Opus 5.5, esfuerzo `low` (no generó thinking), salida JSON estricta (structured outputs). Calibración con 85 rubros:
  US$ 0,0036/rubro, proyección ~US$ 4,4 para los 1.217. Alcanzó para correr todo con Opus y comparar, en una muestra de 259 rubros
  (45 club-años, semilla 11), la variante **sin** las líneas del club y **Sonnet 5.5**.

## Resultados, Opus 5.5 con contexto del club (1.217 rubros)

**Acierto: 932/1.217 (76,6%).** Jev en esos mismos rubros: 695 (57,1%).

| Confianza de Claude | Rubros | Acierto |
|---|---|---|
| >= 0,95 | 10 | 100% |
| 0,90 - 0,95 | 122 | 98,4% |
| 0,80 - 0,90 | 296 | 94,3% |
| 0,60 - 0,80 | 488 | 75,2% |
| < 0,60 | 301 | 51,8% |

La confianza de Claude separa bien: >= 0,80 rinde como Jev >= 0,90 (94-98%).

| Confianza que había dado Jev | Rubros | Claude | Jev |
|---|---|---|---|
| 0,70 - 0,90 | 590 | 79,3% | 66,1% |
| 0,50 - 0,70 | 400 | 74,8% | 53,0% |
| < 0,50 | 227 | 72,7% | 41,0% |

Por país (código del club; "ar/br?" son los clubes argentinos/brasileños viejos sin sufijo): BR 80,9% (341), AR 77,2% (206), ar/br? 72,4% (392),
CO 70,7% (58), DE 82,6% (46), GB 76,9% (39), BE 74,2% (31), DK 89,7% (29), ES 59,1% (22), NL 80,0% (20).

## Sistema combinado (Jev >= 0,90 + Claude en el resto), sobre los 3.975 rubros

| Umbral para aceptar a Claude | Automático | Acierto en lo automático | Queda para revisar |
|---|---|---|---|
| (solo Jev >= 0,90, hoy) | 69,4% | 94,4% | 30,6% |
| 0,90 | 72,7% | 94,6% | 27,3% |
| **0,80** | **80,2%** | **94,5%** | **19,8%** |
| 0,70 | 85,7% | 93,5% | 14,3% |
| 0,60 | 92,4% | 92,0% | 7,6% |
| sin umbral | 100% | 88,9% | 0% |

No se contó el escalón 0 (precedente exacto): el backtest de Jev ya trabaja sobre rubros únicos por club, así que en un año nuevo real
una parte grande de las filas se resuelve gratis antes de Jev y el porcentaje automático sería mayor.

## ¿Cuánto aportan las líneas ya cargadas del club? ¿Y Sonnet?

Misma muestra de 259 rubros (45 club-años):

| Variante | Acierto | Rubros >= 0,80 | Acierto >= 0,80 | Rubros >= 0,90 | Acierto >= 0,90 | Costo | Por rubro |
|---|---|---|---|---|---|---|---|
| Opus 5.5 + líneas del club | **81,1%** | 93 | 94,6% | 31 | 100% | US$ 0,91 | 0,0035 |
| Opus 5.5 sin líneas del club | 72,6% | 59 | 89,8% | 12 | 91,7% | US$ 0,76 | 0,0029 |
| Sonnet 5.5 + líneas del club | 74,9% | 112 | 89,3% | 37 | 97,3% | US$ 0,51 | 0,0020 |
| Jev (referencia) | 59,8% | | | | | | |

- Las líneas del club valen **~8,5 puntos** de acierto y casi duplican lo que queda >= 0,80, por ~US$ 0,0006 más por rubro. En 23 rubros
  acertó solo la versión con contexto; en 1, solo la versión sin contexto.
- Sonnet cuesta 44% menos pero acierta 6 puntos menos y su confianza está peor calibrada (a >= 0,80 acepta más rubros con 89% de acierto,
  contra 94,6% de Opus). A estos volúmenes la diferencia es de centavos por documento: no conviene.

## Costo

- Opus 5.5, esfuerzo low: **US$ 0,0036 por rubro; por club-año mediana US$ 0,015, p90 0,039, máximo 0,108** (São Paulo 2024, 49 rubros).
  Total de los 1.217: US$ 4,35.
- El prompt de sistema (categorías + criterios, ~3.300 tokens) se cachea: después de la primera llamada se paga al 10%.
- Comparado con lo que ya cuesta un documento en el pipeline (US$ 0,25-0,35 de transcripción y validación), este escalón agrega ~5%.

## Errores (285 con Opus + club)

- **136 (48%) son entre categorías vecinas / catch-alls**, donde la curaduría de producción no es uniforme entre clubes:
  `admin_general_expense` <-> `other_expenses` (56), `other_expenses` -> `exceptional_items`, `stadium_other` -> `other_income`,
  `other_income` <-> `sponsorship_commercial` (merchandising), `broadcasting` <-> `competition_bonus` (auxilios de DIMAYOR),
  `admin_general_expense` <-> `match_organisation_expense` / `youth_other_sports_expense`.
- **El error más frecuente fuera de esos pares: `other_expenses` -> `player_amortisation` (23)**: gastos de transferencias o préstamos de
  jugadores, comisiones, intermediarios. En producción este tipo de rubro está **dividido** (40 líneas en `other_expenses`, 31 en
  `player_amortisation`), y el criterio que se le pasó a Claude empujaba a `player_amortisation`. **Se corrigió el criterio en el script
  después del test** (compra/adquisición -> `player_amortisation`; gastos accesorios -> `other_expenses`, salvo convención del club):
  **no está medido**.
- **Los errores con confianza >= 0,80 (19 de 428) son casi todos discrepancias de convención o incoherencias de producción**, no errores
  de lectura:
  - San Lorenzo tiene "Ciudad deportiva" en `admin_general_expense` y "Ciudad deportiva (gasto)" en `other_expenses`: Claude igualó uno con
    otro y "falló" los dos.
  - Producción contra el propio skill: "Seguros" (Unión) en `other_expenses` y "Seguros (Fútbol)" (Los Andes) en `wages_squad` (el skill dice
    impuestos/seguros -> `admin_general_expense`); "Fútbol juvenil — Remuneraciones y cargas sociales" (Boca) en `wages_squad` (el skill
    dice cargas sociales de juveniles -> `youth_other_sports_expense`); "Interese perdidos" (Almagro) cargado como línea (el skill dice que
    los intereses van a `netInterest`: Claude contestó `no_es_rubro`).
  - River "Educación" (gasto) en `youth_other_sports_expense` cuando existe `education_expense`.
  - Criterio discutible: "Direito de arena" (Fluminense) en `other_income`, "Alquiler de Antena" (Almagro) en `sponsorship_commercial`.
- **Errores genuinos típicos** (confianza baja, casi siempre < 0,65): rubros genéricos del plantel en clubes brasileños (servicios médicos,
  comidas, materiales médicos -> producción los pone en `wages_squad`, Claude en `admin_general_expense`); el reparto por sector de Boca
  (Casa Amarilla, Departamento médico); subsidios y auxilios de ligas (Panathinaikos, DIMAYOR, Liga Mendocina); "Receitas com atividades
  sociais" leído como cuotas.
- `no_es_rubro`: 6 (intereses, "Receita Líquida", movimientos de caja de Almagro que sí están cargados). Lado cambiado: 4 (revaluaciones de
  jugadores / valor justo cargadas como ingreso; Claude las mandó a `exceptional_items`, que es gasto).

## Recomendación

1. **Modelo**: Claude Opus 5.5, esfuerzo `low`, una llamada por documento. Es el default del script.
2. **Umbral**: aceptar a Claude con confianza **>= 0,80**. Sistema: 80% automático con 94,5% de acierto (mismo nivel que hoy con Jev >= 0,90,
   que cubre 69%). Lo que queda < 0,80 (~20%) se frena para revisión, no se carga. Si se prefiere más automático, 0,70 da 86% con 93,5%.
3. **Contexto**: mandar siempre las líneas ya cargadas del club (+8,5 puntos), las filas del documento en orden con lo ya resuelto, y los
   ejemplos de otros clubes. Tope de 150 líneas del club (las más parecidas a los pendientes).
4. **Antes de automatizar la escritura**, conviene que una sesión decida las incoherencias de producción que aparecen arriba (San Lorenzo
   "Ciudad deportiva", seguros, cargas sociales de juveniles, intereses cargados como línea, gastos de transferencias): mientras sigan
   así, una parte del "error" medido es la vara y no el modelo.
5. Pendiente de medir: (a) el criterio nuevo de gastos de transferencias; (b) si mandar a Claude también los rubros de Jev 0,90-0,95 de clubes
   con convención propia baja los errores de alta confianza de Jev (155 errores de Jev >= 0,90, casi todos convenciones del club);
   (c) el escalón completo en documentos nuevos del pipeline (`--listos`), donde las filas vienen sin curar.

## Cómo repetirlo

```bash
node tools/categorizar-claude.mjs --backtest --limit 0 --etiqueta _opus                      # ~US$ 4,4 (reanuda lo ya hecho)
node tools/categorizar-claude.mjs --backtest --limit 250 --semilla 11 --sin-club --etiqueta _opus_sinclub
node tools/categorizar-claude.mjs --backtest --limit 250 --semilla 11 --modelo claude-sonnet-5-5 --etiqueta _sonnet
node tools/categorizar-claude.mjs --informe --etiqueta _opus                                  # solo tablas, sin API
node tools/categorizar-claude.mjs --listos --limit 3 --dry-run                                # producción: precedente -> Jev -> Claude
```
