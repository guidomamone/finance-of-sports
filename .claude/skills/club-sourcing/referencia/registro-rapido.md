# 0.2 Dejar registro rápido de qué ya se probó

*Se abre al terminar de buscar un club, para dejar escrito qué se probó. El núcleo y la tabla de qué abrir están en `SKILL.md`.*

#### 0.2 Dejar registro rápido de qué ya se probó, sin tener que leer la prosa completa

Saber si YA se probó tal ángulo en tal club exigiría leer entero `Admin/sourcing/<País>/<Club>.md`, que es
prosa libre, y la prosa libre se puede leer mal: los encabezados varían (`## Chequeo <fecha>`,
`## Lo nuevo (<fecha>)`, bullets sueltos con "ENCONTRADO <fecha>"), así que un chequeo automático que
busque un encabezado literal clasifica mal clubes ya tocados. El costo de leer mal no es solo
confusión: es tiempo y tokens re-buscando algo que ya estaba resuelto.

**La convención: una línea `**Ángulos**` al PRINCIPIO de cada `Admin/sourcing/<País>/<Club>.md`, justo
debajo del título**, con el estado de cada familia de la escalera de 0.1 que aplique a ese club. Es
una convención de escritura, no una herramienta ni una base de datos nueva (el proyecto es
deliberadamente estático de punta a punta). Formato, una familia por segmento separado con `·`:

    **Ángulos**: sitio oficial: agotado (sin sección institucional) · Wayback CDX: agotado (0 PDFs)
    · búsqueda web: agotado (sin resultados) · regulador/país: no aplica · barrido: 1 (Sonnet)
    — 2026-09-23

(La fecha del final es la del último chequeo de ese club.) Estados posibles: `agotado (<qué encontró
o no>)`, `parcial — <qué falta concretamente>` (como Gimnasia y Tiro Salta: "sitio oficial: parcial —
falta abrir Noticias Institucionales completa"), `no aplica` (el país no tiene canal regulador
documentado, o la familia no corresponde a este club), o `no intentado` (todavía no se llegó a esa
familia). **Es un SNAPSHOT, no un log: se REEMPLAZA en cada sesión que toca el club, no se apila una
línea vieja al lado de la nueva**, mismo criterio que sigue `Admin/ESTADO.md` con el resto del
proyecto. La prosa de abajo (las secciones `## Chequeo <fecha>` o el formato libre que ya use cada
archivo) sigue siendo el lugar del detalle completo; la línea de arriba es solo el TL;DR que una
sesión nueva lee primero, antes de decidir por dónde seguir.

**No hay barrida aparte para agregarla.** Todo club NUEVO la lleva desde el primer chequeo, y todo
club EXISTENTE sin ella la gana la próxima vez que una sesión lo toque (lo lee a fondo o le agrega
algo).

**Esta línea no toca el formato de `Admin/sourcing/_indice/<País>.md`.** Ese archivo SÍ lo parsea
`tools/generate-fuentes-index.js` con una regex sobre el texto libre de cada línea
(`SENAL_SI`/`SENAL_NO` adentro del script): cualquier cambio ahí hay que probarlo con `--debug`
antes de tocar nada. La línea `**Ángulos**` vive en el archivo de club, que ese script no abre, así
que no hay riesgo de romper el generador.
