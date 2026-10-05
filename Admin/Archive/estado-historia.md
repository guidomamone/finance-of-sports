> **ARCHIVADO el 2026-10-04 (Versión 485).** Tres textos de `Admin/ESTADO.md` que eran historia: por qué el estado es un archivo y no
> un comentario de `index.html`, el retiro de los ejercicios placeholder (Versión 138) y una copia del párrafo de `netlify.toml` de `CLAUDE.md`.

**Por qué es un archivo y ya no el comentario de `index.html`** (sesión 2026-09-14,
Versión 138, pedido explícito de Guido: *"Index NO es el archivo para tener to do.
Eso era al inicio"*): hasta acá el estado y la to-do list vivían adentro de un
comentario HTML al principio de `index.html`, que llegó a pesar 80 KB de los 183 KB
del archivo. Eso tenía dos costos. Uno para el visitante, que se bajaba los 80 KB en
cada pageview sin verlos nunca. Y otro peor para el proyecto: un `index.html` de
6.000 líneas donde las primeras 830 no son el sitio hace que cualquier búsqueda de
código tenga que saltearlas, y hacía que la to-do list y el HTML se editaran en el
mismo archivo, con conflictos entre sesiones que no tenían nada que ver entre sí.


- YA NO HAY EJERCICIOS PLACEHOLDER (Versión 138, pedido de Guido: "quita los
  ejercicios que sean placeholder, antes tenían sentido, hoy no"). Se borraron los 9
  que quedaban, todos de Boca (7) y River (2): cinco eran placeholder puro con rubros
  inventados, de cuando el sitio era un MVP y necesitaba algo que dibujar, y cuatro
  eran ejercicios reales sin publicar todavía, cargados en cero. Los dos de River
  existían solo para que "Comparar Gestiones" tuviera dos períodos que comparar. TODO
  ejercicio que muestra el sitio tiene ahora un documento detrás. Consecuencia: 85
  ejercicios en vez de 94, Boca pasó de calidad "mixta" a "oficial" en el selector, y
  los gráficos de Inicio dejaron de tener columnas vacías. `reportType:'placeholder'`
  y `'pending_official'` siguen existiendo en el código, con su rama en
  `yearKindForClub()`/`anioDropdownSuffix()`: son estados válidos, simplemente hoy no
  los usa ningún club.

**YA NO ES CIERTO DESDE EL 2026-09-20: AHORA SÍ HAY `netlify.toml`.** Netlify sigue publicando la raíz, pero antes de publicar corre un comando que BORRA DEL ARTEFACTO DE DEPLOY lo interno: la carpeta `Admin/` entera, `CLAUDE.md`, las 1144 notas de `fuentes/**/*.md`, `auditorias/` y `Prototyping/`. O sea: todo se trackea —el respaldo en GitHub está completo— y lo interno no se publica. Las 169 páginas `fuentes/<clubId>.html` SÍ se publican, son parte del sitio. Ver `netlify.toml`, que explica por qué destrackear estaba mal y por qué hacer el repo privado no alcanzaba. **Si dejás un archivo nuevo en el repo, va adentro de `Admin/` si es interno (no hace falta tocar este archivo); si lo dejás suelto en la raíz, se publica.**
