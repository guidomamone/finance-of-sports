# 257, parte 3: textos exactos de cada edición

Cada bloque es el texto que reemplaza a su ancla (el principio del bloque, o su parte final, ya existe en el archivo de destino). Lo agregado es lo que Guido aprobó en `Admin/propuestas/257-skills.md`, parte 3; el resto del bloque es el texto que ya está. Un bloque por edición, en el orden en que se aplican.

## 3.1 `club-sourcing/SKILL.md`, sección 0

```
- **Un club extinto o refundado vale** si sus balances siguen publicados: se bajan y se documentan como los de cualquier otro.
- **Fuente oficial primero, siempre.** El dominio propio del club
```

## 3.2 `start-session-finance-of-sports-project/SKILL.md`, sección 2

```
directo a los clubes.

**Cómo se trabaja con Guido:** un paso por vez, con un ejemplo real antes de hacerlo; tareas chicas, cerradas y commiteadas antes de abrir la siguiente; un mensaje por paso con las decisiones numeradas y la recomendación al lado. Las skills, `Admin/ESTADO.md` y los documentos de criterio dicen cómo es hoy: sin versiones, fechas de decisión, contadores fijos ni «to-do N» (`node tools/audit.js` avisa: `historia-en-doc-de-criterio`).

---

## 3. Levantar el sitio local
```

## 3.2 `start-session-finance-of-sports-project/SKILL.md`, tabla de la sección 1

```
| 8 | `worktree.md` (en esta carpeta) | si la sesión corre en un worktree (`git rev-parse --git-dir` no es `.git`) o Guido pide trabajar en paralelo |
| 9 | `.claude/skills/principal-finance-of-sports` | si la sesión corre en la carpeta principal (no en un worktree) |
| 10 | `.claude/skills/producto-y-pantalla-finance-of-sports` | si Guido pide una pantalla, un card, un cambio de diseño o un texto visible |
| 11 | `.claude/skills/contenido-y-difusion-finance-of-sports` | si Guido pide una publicación, un hilo, una tarjeta o un informe para difundir el sitio |
| 12 | `.claude/skills/contrato-de-datos-finance-of-sports` | antes de renombrar, quitar o cambiar el significado de un campo, una categoría genérica, un id o una unidad |
| 13 | `.claude/skills/deploy-y-release-finance-of-sports` | cuando Guido diga que va a publicar, pregunte si algo está listo para subir o haya que confirmar que salió |
```

## 3.2 `start-session-finance-of-sports-project/SKILL.md`, «Cómo mantener este skill»

```
Si aparece un paso de arranque, de verificación o de cierre que no está acá, proponele a Guido el texto exacto y esperá su ok. El texto exacto va a `Admin/propuestas/<tema>.md`, commiteado, antes del cambio.
```

## 3.3 `club-outreach/SKILL.md`, sección 1

```
aprobación mensaje-por-mensaje en el chat una vez que Guido corre el script.

Nadie redacta ni asigna un mail a un club sin que Guido lo haya pedido con sus palabras. Una sesión que lo propone, o una nota que dice «candidato a mail», queda anotada en el to-do de origen sin sesión propia hasta que Guido pida el outreach.
```

## 3.4 `start-session…/worktree.md`, «Al cerrar»

```
deja de ser cierto en ESTADO. Commit. La nota es de esta tanda: una sesión que sigue después del merge empieza una nota nueva.
```

## 3.4 `start-session…/worktree.md`, «En la principal, para mergear»

```
TODO, CHANGELOG y ESTADO, y archivalo en `Admin/Archive/`. Para anticipar conflictos, `git merge-tree` (no toca nada). Cada punto de «Qué queda» de la nota termina con una flecha (`→ TODO n`, `→ regla`, `→ HALLAZGOS`, `→ descartado: motivo`) antes de archivarla.
```

## 3.5 `club-or-year-onboarding/SKILL.md`, «La cola»

```
  `Admin/dudas-por-club.md`.
  Un caso de perfil (socios que pagan cuota, otros deportes) nunca frena una carga: se googlea el club (programa de socios, modalidades), se contesta con esa fuente y, si no hay nada, la respuesta es "no" con la nota y la duda va a `Admin/dudas-por-club.md`.
- Ajuste `categoria` = MUDAR una fila
```

## 3.5 `club-or-year-onboarding/SKILL.md`, costos

```
tokens de sesión, no. Archivos grandes se leen con filtros, no enteros.
- **Para bajar el gasto de API:** la Batch API (mismo modelo, mitad de precio) y pasar una tarea de Opus a Sonnet, de a una y medida contra lo cargado. Nunca Haiku. Antes de una medición paga, además del costo del ensayo, una frase que diga qué decisión cambia el resultado; sin esa frase no se corre. Cada archivo de `Admin/mediciones/` abre con `Conclusión:` y `Destino:`.
```

## 3.6 `Admin/CONVENCIONES-DATOS.md`

```
**No recategorizar sin volver a preguntarle.**
- **No se recategorizan líneas ya cargadas** para unificar criterios entre clubes; solo un error claro (un rubro del lado o la categoría evidentemente equivocados). Una inconsistencia entre clubes no abre un to-do.
```

## 3.7 `Admin/CONVENCIONES.md`, regla nueva (antes del «Índice de las reglas que viven en otro archivo»)

```
- **LO QUE SE DECIDE O SE DESCUBRE SE ESCRIBE EN EL LUGAR DONDE SE VA A LEER, EN EL MISMO TURNO;** lo que una máquina puede vigilar lo vigila una máquina. Dónde queda cada tipo:

| Tipo | Hoy | Tiene que quedar en | Lo vigila |
|---|---|---|---|
| Decisión de Guido en el chat | memoria | `CONVENCIONES*.md` / skill (propuesta en `Admin/propuestas/`) | hook `memoria-no-es-regla` |
| Pregunta resuelta | dentro de la pregunta | `Admin/carga-clubes/<id>.md`; se borra de dudas | `audit.js` `duda-resuelta-en-dudas` |
| Pregunta abierta que frena una carga | solo `dudas-por-club.md` | también en `Admin/TODO.md` | convención de formato |
| Descarte medido | CHANGELOG (se archiva en 7 días) | una línea en `HALLAZGOS-pipeline.md` | `audit.js` `medicion-sin-destino` |
| «Retomar si…» | prosa | un número que una tool imprime (`gasto.mjs`, `estado.mjs`) | la tool |
| Medición paga | archivo crudo | HALLAZGOS + `Conclusión:`/`Destino:` arriba; el crudo a Archive | `audit.js` `medicion-sin-destino` |
| Pendiente de una nota de sesión | `Admin/sesiones/` y después `Archive/` | `TODO n` / regla / HALLAZGOS / descartado, con flecha | aviso en `worktree.mjs mergear` |
| Registro | `Admin/registros/` | con lector declarado en un README | `audit.js` `registro-sin-lector` |
| Historia en un doc de criterio | texto | `Admin/CHANGELOG.md` | `audit.js` `historia-en-doc-de-criterio` |

## Índice de las reglas que viven en otro archivo
```
