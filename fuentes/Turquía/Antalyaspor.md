# Antalyaspor

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: Antalyaspor Spor Faaliyetleri Ticaret Sanayi A.Ş. (dernek dueño de una A.Ş.
  operativa, no cotiza en bolsa).
- **Canal**: sitio propio, `antalyaspor.com.tr/tr/antalyaspor-a-s/mali-tablolar1.html` — página
  confirmada que EXISTE y lista 4 documentos (Finansal Denetim Raporu, Finansal Durum Raporu,
  Gelir Tablosu, Nakit Akım Tablosu). **CONFIRMADO EN SESIÓN 2026-09-18 CON BROWSER REAL: los links
  `href="#"` NO son un problema de JS/renderizado — son placeholders genuinamente rotos.** Se probó
  con el Browser pane funcionando (JS completo), interceptando el evento click en fase de captura:
  el propio navegador intenta abrir literalmente `mali-tablolar1.html#` (la misma página), no una
  URL de PDF oculta. No hay ningún atributo `data-href`/`onclick` con la URL real en el DOM
  (`document.documentElement.outerHTML` no contiene ni una sola instancia de `.pdf`). Corrección
  importante a la sospecha de la sesión anterior: esto NO se iba a resolver con un browser real.

## Qué se bajó (sesión 2026-09-18)

**Nada del sitio en vivo** (links rotos, confirmado arriba). Se rescató la URL real de un
snapshot de Wayback Machine de 2023 (antes de que se rompieran los links):
`web.archive.org/web/20231014.../antalyaspor.com.tr/tr/antalyaspor-a-s/mali-tablolar1.html` apunta
a rutas reales `antalyaspor.com.tr/Upload/File/2022/5/16/<nombre>.pdf` (4 archivos, subidos
16-may-2022 → casi seguro el ejercicio 2021). **Pero ni el sitio en vivo (HTTP 404 confirmado con
`curl` en los 4) ni Wayback Machine (CDX API sin ningún snapshot cacheado de esos 4 PDFs
puntuales, solo de la página HTML que los linkeaba) tienen el archivo real disponible hoy.** Los
links se rompieron en algún momento entre oct-2023 y abr-2024 (snapshots de Wayback de ambas
fechas comparados: oct-2023 todavía tenía los hrefs reales, abr-2024 ya mostraba `href="#"`).

Búsqueda en Bing (`site:antalyaspor.com.tr ... filetype:pdf`) encontró otros PDFs indexados del
mismo dominio (`Upload/Dosya/...`, formularios de poder para asamblea, actas de convocatoria) pero
ninguno es el juego de estados financieros.

## Dudas / pendientes

- **Dead-end confirmado para el documento 2021 específico** (perdido, ni en vivo ni en archivo).
  Vale la pena, en una sesión futura, buscar si el club volvió a subir un ejercicio MÁS RECIENTE a
  una ruta `Upload/File/<año>/<mes>/<día>/` distinta — no se exploraron rutas de años posteriores
  a 2022 por falta de un patrón conocido (el nombre de carpeta es la fecha de subida, no del
  ejercicio, así que no es adivinable sin un link real de referencia).
- Anotar en `dudas-por-club.md` (si Guido quiere) la posibilidad de pedirle directo al club que
  resuba el documento a la página de Mali Tablolar, ya rota hace más de un año.
- Último chequeo: 2026-09-18.
