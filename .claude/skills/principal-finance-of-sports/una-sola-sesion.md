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
