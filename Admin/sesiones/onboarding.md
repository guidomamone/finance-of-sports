# Cierre de la rama `onboarding` (worktree `../fos-onboarding`)

Para que la principal lo pase a TODO, CHANGELOG y ESTADO al mergear (skill de arranque, `worktree.md`). Se va completando durante la sesión.

## Qué cambió (para CHANGELOG)

- Limpieza de las transcripciones por subagentes antes de validarlas (ORDEN punto 2):
  - A `documentos-descartados.txt`: lo que no es del club (NEC Stichting Maatschappelijk 2022-23 y 2023-24, RKC Stichting Samen
    2018-19, VVV Foundation 2021-22 a 2024-25, Titanes de Barranquilla y Toros de Córdoba, básquet y béisbol); lo que no trae estado de
    resultados (Grasshopper anuario 2022-23, Beşiktaş 2012, 2013 y 2024 informe de gestión, Corsarios 2025 solo notas); Basel Verein 2021
    (se carga la AG); y la segunda versión del mismo ejercicio en Países Bajos (Ajax 2022-23 y AZ 2024-25 depósito en la KvK; FC Twente
    2021-22; De Graafschap 2021-22; Go Ahead Eagles 2024-25; PEC Zwolle 2023-24 y 2024-25, PDFs dañados; Sparta 2021-22 a 2023-24;
    Telstar 2022-23).
  - Titanes y Toros, en `.gitignore` como Athens Kallithea (sus `.md` salen del repo; al mergear desaparecen de la carpeta principal).
  - Carpetas dobles del mismo club unificadas: los `.md` de `Suiza/FC Thun` y `Suiza/FC St. Gallen` pasan al lado de su PDF gemelo en
    `Thun` y `St. Gallen`; fuera el `.md` repetido de `NEC Nijmegen/wf-2024-2025` (PDF idéntico al de `NEC`).
  - Arreglos chicos: Ajax 2024-25 pág. 44 (sin las descripciones "Grafiek:"), portadas de Sparta 2024-25 y 2020-21, ADO Den Haag
    2023-24 págs. 5 y 8 (organigrama e infografía), Go Ahead Eagles 2020-21 (una palabra). Revisión contra el PDF de las filas
    reubicadas y páginas leídas del render: los demás casos, bien.

## Regla nueva (para `Admin/CONVENCIONES-DATOS.md`)

- Dos documentos distintos del mismo club y ejercicio (p. ej. el jaarverslag del club y el depósito en la KvK): entra el que trae el
  estado de resultados completo de la entidad del club; si los dos, el más completo (con notas); el otro a `documentos-descartados.txt`
  (Guido, 2026-10-17). Los idénticos byte a byte no hace falta: el inventario los marca `duplicado`.

## Qué deja de ser cierto en ESTADO

- (se completa al cerrar)

## Pendiente (para TODO)

- `tools/worktree.mjs preparar` frena con ENOENT cuando la carpeta principal tiene otros worktrees en `.claude/worktrees/` (git los lista
  como `.claude/worktrees/<x>/`, con barra final, y el symlink falla). Arreglo: saltear `.claude/worktrees/` y las entradas con barra
  final. En esta sesión se enlazó con una copia del mismo código desde el scratchpad.
- Que no vuelva a pasar lo de la limpieza (escalones, uno por vez): `audit.js` `carpeta-doble` (dos carpetas de un país con PDFs de la
  misma huella); `Admin/transcripcion-subagentes/reglas.md` paso 0 (leer la portada y no transcribir si no es la entidad del club o no hay
  estado de resultados); `club-sourcing` (mirar la entidad de la portada al guardar y no abrir una segunda carpeta del club). Un `.md` sin
  PDF NO es error: los de Ajax, PSV, Feyenoord y AZ 2023-25 son la fuente publicada de lo cargado.
- Sourcing: el estado financiero completo de Beşiktaş 2012, 2013 y 2024 (cotiza: KAP); PEC Zwolle jaarverslag 2023-24 y 2024-25 (los
  bajados están dañados; hoy se carga el depósito en la KvK); Deportes Tolima `dictamen-revisor-fiscal-2025.pdf` es idéntico al de 2024.
- `pipeline.mjs --lista` (ensayo) no anticipa el control "sin tablas": muestra un `.md` sin tablas como "texto (Claude solo en págs.
  dudosas)" y en `--ejecutar` lo rehace con Mistral. La primera corrida sobre los 6 países estimó US$ 27,83 y gastaba ~US$ 0,17 por
  documento (Guido la cortó en 40 de 566, ~US$ 6,75). Arreglo: que el ensayo cuente esos documentos como "rehacer con Mistral" con su
  costo. Mientras tanto, la lista se separó: `Admin/lotes/subagentes-validar.txt` (con tablas, ~US$ 3,47) y
  `Admin/lotes/sin-tablas-6paises.txt` (481 `.md` viejos sin tablas, sobre todo Bélgica y Colombia: decidir subagentes o Mistral).
- Para HALLAZGOS, "Conocido, sin daño hoy": `pdftotext` pierde las ligaduras en las fuentes Calibri CID ("Ne o-omzet", "ac va",
  "Toelich ng") en NEC Holding 2023-24, FC Den Bosch 2022-24 y Fortuna Sittard 2022-24; las cifras están bien y la categorización la
  hace una IA. Retomarlo si un rótulo roto frena localizar o la categorización (Sparta 2021-22 tenía "w inst-en-verliesrekening" en el
  título del estado: se unió a mano).
- Los casos de alta `name` de `Suiza/FC Thun/` y `Suiza/FC St. Gallen/` quedaron sin documentos: se cierran solos como `obsoleto` la
  próxima vez que corra la etapa de alta.
