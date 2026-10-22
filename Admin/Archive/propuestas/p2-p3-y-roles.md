# Propuestas para el ok de Guido (2026-10-21)

## 1. Skill auditoria-finance-of-sports: sección nueva «Lo que queda en P2 y P3»

Va después de la tabla de prioridades:

> ### Lo que queda en P2 y P3
>
> Los P2 y P3 no se miran de a uno: se baja la lista de a un código por corrida.
>
> 1. **Elegir un código.** El de más hallazgos entre P2 y P3 (`node tools/audit.js --json`) que no se trató en las últimas tres corridas (`Admin/registros/auditoria-proceso.jsonl`, campo `codigo_tratado`).
> 2. **Mirar cinco hallazgos de muestra** contra el archivo o el documento, y decidir por el código entero:
>    - **falso positivo del chequeo:** se arregla el chequeo (es una condición nueva: sección 7);
>    - **real y lo arregla un script:** se arregla en la misma corrida, o va a `Admin/TODO.md` con el comando;
>    - **real y aceptado** (un club que no publica, un formato del país): se silencia en `tools/audit-ignore.json`, con el motivo;
>    - **el chequeo no sirve:** se propone sacarlo (sección 7).
> 3. **Anotar** en `Admin/registros/auditoria-proceso.jsonl` el código, la decisión y cuántos hallazgos había antes y después.
> 4. Un código que lleva tres corridas tratadas sin bajar va a `Admin/TODO.md`.

## 2. Skill principal-finance-of-sports: una línea en «Abrir sesiones»

> - **Cada tarea va a la sesión de su rol, aunque otra esté libre:** cargar clubes o años, Onboarding; arreglar o sumar tools, Pipeline; buscar documentos, Sourcing; pantallas y textos del sitio, Pantallas; aprobar condiciones y votar criterios, la Auditora.
