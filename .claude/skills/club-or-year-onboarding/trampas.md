# Trampas y lo que el pipeline no cubre (secciones 6 y 7)

*Se abre cuando algo frena, se comporta raro o la tarea es un club, una liga o un deporte nuevo. El núcleo y la tabla de qué abrir están en `SKILL.md`.*

## 6. Trampas

- `git status` se ensucia solo mientras corre un lote (logs en `Admin/`, `.md` en `Clubes/`, y los `.json` de `Generados/`):
  revisar antes de commitear; los de `Generados/` van con los logs.
- `estado.mjs` mientras corre un lote muestra una foto a mitad de camino.
- Los ensayos no llaman a ninguna API, pero reescriben el registro (`Admin/registros/transcripciones-estado.jsonl`) y la lista temporal de la
  corrida: que aparezcan en `git status` después de un ensayo no quiere decir que algo cambió de verdad.
- **Compuerta de estadio y sponsor** (`estadio-sponsor.mjs`, la corre `cargar.mjs` antes de escribir un año): frena el alta si al ejercicio le
  falta estadio o sponsor. Se completa a mano en `tools/contexto-manual.json`, con fuente. Alcanza el estadio, sin sponsor, en una liga amateur
  (la del catálogo nombra "amateur") y en las segundas que figuran en `SOLO_ESTADIO` (hoy `nl-eerstedivisie`, `no-1divisjon`, `no-2divisjon`),
  porque ahí no hay fuente del sponsor por temporada. La lista vigente está en `estadio-sponsor.mjs`, no la copies acá. Un sponsor sin fuente pasa solo con el registro de búsqueda de `club-sourcing`, sección 0.5 (la compuerta lo valida).
- **Cuando la compuerta frena por estadio o capacidad, no se googlea de entrada: se sigue la escalera de `Admin/PIPELINE.md`, «Datos públicos de un club».** Cuándo se activa: la compuerta ya imprime el candidato de Wikidata (`dato-publico.mjs`) debajo de cada «falta estadio». Qué hacer según lo que imprime: (1) «la ficha del club lo nombra»: el estadio es ese, pero Wikidata da el nombre ACTUAL; hay que verificar el nombre que tenía ese año (cambia por sponsor en ~3 de cada 10); (2) capacidad con la regla de 5 % cumplida (la línea «capacidad: N (Wikidata y el artículo… difieren menos de 5 %)»): se toma ese N; (3) «SOLO Wikidata», «AGENTE: …» o sin candidato: `node tools/dato-publico.mjs --club <clubId> --anio <año> --prompt estadio|capacidad` imprime el prompt fijo y se lo pasa tal cual a un Agent **Sonnet**, nunca Opus; (4) el agente devuelve JSON: «encontrado» con dos fuentes que coinciden se pega en `contexto-manual.json` con las citas; «fuentes en conflicto» o «no encontrado» vuelve a la sesión, que decide o lo deja en `sin-fuente` con el texto de dónde se buscó. Nunca se le pregunta al club un dato público.
- Los "Syntax Error" en la terminal son de poppler leyendo PDFs dañados: no son errores del pipeline.
- Para esperar un proceso en segundo plano, usar su PID, no `pgrep -f` (se encuentra a sí mismo y no termina nunca).
- Corridas largas: la Mac se duerme; usar `caffeinate -i`.

## 7. Lo que el pipeline no cubre

- **Club nuevo:** color de marca, chequeo contra el escudo y liga de cada temporada, a mano: `club-nuevo.md`, en esta misma carpeta.
- **Liga nueva** (su primer ranking en `data/rankings/`): buscar los informes que resumen sus finanzas, `club-sourcing`, sección 0.4.
- **Deporte nuevo** (el primer club de un deporte que no está en el sitio): antes del lote, una carga de prueba de ese club, sin API y de punta a punta; cada lugar donde frene va a `frenados-por-script.jsonl` como defecto de script. Lo que ya se aprendió: `Admin/PIPELINE.md`, «Un deporte nuevo».
- **Presupuestos:** `localizar.mjs` no los elige, así que el pipeline no los carga. A mano: `Admin/ARQUITECTURA.md` (ex §11, presupuesto y
  balance del mismo año) y `Admin/CONVENCIONES.md` (ex §15, presupuesto en año calendario).
- **Buscar el PDF:** skill `club-sourcing`.
- **Rusia:** no sale de PDFs. `tools/bfo-rusia.mjs` lee los JSON del fisco (`Clubes/Rusia/<Club>/bfo-AAAA-datos.json`); el detalle, en
  `Admin/PIPELINE.md`, sección Rusia.
- **Cómo se ve el club en el sitio:** `Admin/PANTALLA.md`.
