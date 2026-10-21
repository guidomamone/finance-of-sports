# Modo una sola sesión: todo en la carpeta principal, sin worktrees ni sesiones paralelas (propuesta de texto, sin aplicar)

Guido: «me gustaría tener también armado el proceso para cuando trabaje todo en una misma sesión sin subagente, pero teniendo todos los skills y convenciones que tenemos». El modo de varias sesiones sigue para los días con tokens de sobra; este es el otro.

## Texto exacto 1: `principal-finance-of-sports/SKILL.md`, al final de «# La principal» (con su párrafo como ancla)

La principal mergea, escribe `Admin/TODO.md`, `Admin/CHANGELOG.md` y `Admin/ESTADO.md` y es la única que habla con Guido de todo el proyecto. Las otras sesiones corren en su worktree y su rama.

**Modo una sola sesión.** Cuando Guido dice que trabaja todo en una sesión, no se abren worktrees ni sesiones: la principal hace cada rol ella misma, con `una-sola-sesion.md`.

## Texto exacto 2: archivo nuevo `principal-finance-of-sports/una-sola-sesion.md`

```markdown
# Una sola sesión

La principal hace el trabajo de todos los roles, en la carpeta principal y en `main`. Las reglas no cambian: cambia quién las corre.

## Un rol por vez, con su skill

- Antes de cada tarea, decir en una línea qué rol toma y cargar su skill: cargar clubes o años, `club-or-year-onboarding`; tools, la misma (su parte
  de pipeline); buscar documentos, `club-sourcing`; pantallas, `producto-y-pantalla-finance-of-sports`; auditar, `auditoria-finance-of-sports`.
  Una skill ya cargada en la sesión no se vuelve a cargar.
- Una tarea se termina y se commitea antes de cambiar de rol. Cambiar de rol a mitad de una tarea mezcla los criterios de las dos.
- Lo que en el otro modo va a la nota `Admin/sesiones/<rama>.md` se escribe directo en `Admin/TODO.md`, `CHANGELOG.md` y `ESTADO.md` al cerrar
  cada tarea. No hay merges ni notas de sesión.

## Lo que hacía la Auditora

- **Una condición nueva en una tool** (sección 7 de `auditoria-finance-of-sports`): la sesión recorre ella misma la lista de la sección 7 y la
  medición de la sección 8 antes de dejarla activa, y lo anota en `CHANGELOG.md` como «sin revisión independiente». La próxima auditoría la revisa.
- **Un criterio de datos sin precedente:** `votacion-de-criterios` con sus tres votantes como subagentes en Sonnet. Es el único subagente de este
  modo: un criterio no lo decide quien lo mira ese día.
- **Lo que no tiene precedente ni voto todavía** no frena el resto: el año queda en la cola y se sigue con otro.

## Contexto y tokens

- Una tarea por tramo de conversación. Al terminar una tarea grande, si el contexto pasa de la mitad, pedirle a Guido que compacte antes de la
  siguiente.
- Los lotes corren en segundo plano (`run_in_background`) y la sesión sigue con otra cosa del mismo rol mientras tanto. Un lote por vez.
- Leer lo justo: la sección de la skill que pide la tarea, no la skill entera de nuevo; un `.md` de club por la parte que se usa.

## Hablarle a Guido

El mismo cuadro: **Te toca a vos** numerado con la recomendación. En lugar de **Corriendo** va **En curso**: el rol, el to-do y el lote en segundo
plano, si lo hay.
```
