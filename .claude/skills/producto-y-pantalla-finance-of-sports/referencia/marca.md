# La marca del sitio: cómo se ve y qué no se hace

Se lee ANTES de dibujar cualquier mockup. Es lo que el sitio ya es, escrito para que no se reinvente cada vez.

## 1. El tono

Un sitio de datos para periodistas e hinchas. Serio y sobrio, como la sección de finanzas de un diario: el número manda, el documento está al lado, y nada
compite con ellos. Los datos hablan; el diseño no grita. Si un elemento quiere llamar la atención, es porque dice algo que el lector necesita para leer bien
un número (un presupuesto, un estimado, un ejercicio atípico), no porque quede lindo.

## 2. Paleta y tipografía permitidas

Todo color sale de los tokens de `css/styles.css` (`:root`). Ningún color nuevo fuera de esta lista.

| Token | Valor | Para qué |
|---|---|---|
| `--azul` | `#0a2b5c` | marca, encabezado, títulos, botones activos, marcas informativas |
| `--azul-dark` | `#071d3f` | texto sobre dorado |
| `--oro` | `#f2b705` | acento: pestaña activa, foco, el punto del logo. Poco, nunca como relleno grande |
| `--bg` / `--card` | `#f7f7f5` / `#ffffff` | fondo y tarjetas |
| `--text` / `--muted` / `--border` | `#1c1c1c` / `#6b6b6b` / `#e3e3e0` | texto, texto secundario, bordes |
| `--green` / `--red` | `#1b7a3d` / `#b5372b` | solo variaciones y resultados (sube, baja; ganancia, pérdida) |
| ámbar de advertencia | texto `#8a6d00`, fondo `#fdf8e7`, borde `#d9c27a` (punteado) | un dato que NO es un balance cerrado: presupuesto, estimado, borrador |
| rojo de error | texto `#8c2b21`, fondo `#fdecea`, borde `#e08d84` | solo un error que impide ver algo |

El color de un club (`brandColor`) pinta únicamente su círculo de iniciales y su barra en un ranking; nunca una advertencia ni un adorno de la página.

Tipografía: la del sistema (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`), sin descargar fuentes. Pesos 400, 600 y 700. Los
números llevan `font-variant-numeric: tabular-nums` cuando se alinean en columnas. Un rótulo chico va en mayúsculas con 0,04 a 0,08 em de espaciado y 11 a 12 px.
Nada de cursivas de adorno (la cursiva ya significa «presupuesto» en las tablas), ni fuentes decorativas, ni de historieta, ni títulos con contorno o sombra.

Bordes de 1 px, radios de 4 a 14 px, sombras casi nulas. Nada de degradados ni de relieve.

## 3. Cómo se marca un estado o una advertencia

El mismo sistema para todos (COVID, parcial, presupuesto, estimado, borrador, sin publicar): **una etiqueta chica de texto**, nunca un dibujo.

1. **Etiqueta.** Una palabra o dos, en mayúsculas de 9,5 a 11 px, con espaciado, en un recuadro de 4 px de radio. Es el patrón de `.stat-tag` («PRESUPUESTO»).
2. **Color.** Se elige por significado, no por gusto: ámbar punteado para «este dato no es un balance cerrado» (presupuesto, estimado, borrador); azul del sitio
   para una marca informativa de un período o una condición del ejercicio (COVID, transición, parcial); gris (`--muted`) para «no hay» (sin publicar, sin dato).
   Rojo solo para un error. Una marca nueva reutiliza uno de estos; no inventa un color.
3. **Ícono.** Solo si ayuda y es uno geométrico simple, de línea, del mismo trazo que los del sitio (la «i» del aviso, el «?» del globo). Sin emojis.
4. **Dónde.** Pegada al dato que califica (al lado del año, de la cifra o de la columna), nunca en una franja aparte ni flotando sobre otra cosa. No tapa ni mueve el dato que
   califica ni cambia el ancho de su contenedor (una línea más de alto en una fila de cards es aceptable).
5. **Qué dice.** La etiqueta nombra el hecho; el detalle va en un globo (`js/info-tip.js`, `data-info-tip`) con una línea. El globo se abre con el puntero, el toque o el
   teclado.
6. **Lectores de pantalla.** Toda marca tiene el mismo texto en un `aria-label` o `title` (en español y en inglés, por `t()`); nunca depende solo del color o de la forma.
7. **Una sola vez.** La marca va donde se lee el ejercicio (card, cabecera de columna, número de arriba), no repetida en cada cifra.

## 4. Lo que no se hace

- Onomatopeyas, estallidos, globos de historieta, signos de exclamación («¡BANG!»): caso real, la primera marca COVID, un recuadro de estallido amarillo con
  letras rojas, rechazado por infantil.
- Inclinar, rotar o torcer un elemento; letras con contorno, sombra o relieve; tipografías decorativas.
- Emojis como marca o como adorno (las banderas de país son la única excepción, porque son dato).
- Colores chillones o fuera de la paleta (amarillo fuerte, rojo vivo, violeta, naranja); degradados; fondos con textura (salvo el rayado de «sin publicar», que ya existe).
- Ilustraciones, mascotas, íconos de moda, animaciones que no sean el despliegue de un globo.
- Texto de marketing o de entusiasmo en un dato («¡Récord!»): se describe, no se aplaude.

## 5. La prueba antes de mostrar un mockup

Mirá el mockup y respondé: **¿lo publicaría así un diario como el Financial Times o The Athletic en una nota con datos?** Si la respuesta es no, o dudás, se rehace antes de
mostrárselo a Guido. Un mockup que pasa la prueba además cumple: usa solo tokens de la paleta, la tipografía del sistema, una etiqueta (no un dibujo) para cada estado,
y se ve bien a 375 px.
