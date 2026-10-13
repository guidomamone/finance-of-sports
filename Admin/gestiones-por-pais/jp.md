# Gestiones por país: jp

El criterio de este país para `data/gestiones/jp.js` (el archivo no lleva comentarios: se publica). El formato de las gestiones está en
`Admin/ARQUITECTURA.md`; las notas de cada gestión de un club, en su `Admin/carga-clubes/<club>.md`, sección "Gestiones".

Investigado por un subagente (Sonnet) con fuente por gestión el 2026-10-13 (to-do 195). Solo se cargaron las gestiones confirmadas.

Los clubes de la J.League son sociedades anonimas (株式会社) con dueño empresarial (Mercari, Nissan, Fujitsu, Rakuten, Panasonic, MIXI, Toyota, etc.), por lo que se carga al 代表取締役社長 (presidente de la sociedad, quien firma). Se mantiene 'Presidente' como cargo. Un 会長 (chairman) es aparte y no se carga salvo que cumpla ese rol (caso Kobe/Mikitani: no cargado).
