# Sesión datos (Sourcing 4) — to-do 346: sourcing con vía concreta

**Qué cambió:** 5 PDFs nuevos (el `.gitignore` ya ignora `*.pdf`, así que NO viajan con el merge; ver «Ojo» abajo) y notas de sourcing al día en 8 clubes. Nada se cargó ni se transcribió.

**Conseguido (todo en `Clubes/<País>/<Club>/`, de este worktree):**
- **Goiás 2018, 2019 y 2020** (no estaban en el pedido: salieron al reintentar el 2019): `Brasil/Goias/demonstracoes-contabeis-2018.pdf`, `-2019.pdf`, `-2020.pdf` (28, 27 y 31 págs, con capa de texto; portada verificada). Estaban en Wayback bajo la ruta vieja del sitio (`www.goiasec.com.br/wp-content/uploads/...`); la ruta nueva (`static.goiasec.com.br`) da 404.
- **Fiorentina 2020**: el `Fiorentina-bilancio-2020-21-issuu.pdf` es 2020/21 (12 meses), no 2020. El 2020 es un período de SEIS meses (01/01-30/06/2020) y es un documento aparte: `Italia/Fiorentina/Fiorentina-bilancio-2020-giu-issuu.pdf` (114 págs, reconstruido de las imágenes de Issuu, sin capa de texto: hay que transcribir con OCR). Cuidado en onboarding: seis meses no es comparable con doce.
- **Novorizontino 2012**: `Brasil/Novorizontino/balanco-2012.pdf` (3 JPG de la FPF armados en un PDF, escaneo sin capa de texto). Es un solo año, sin comparativo 2011.

**No apareció (anotado en la nota de cada club):**
- **Ferroviária 2011 y Novorizontino 2011**: no están en el repositorio de la FPF. El listado de 2011 viene desfasado, así que se miró por nombre de archivo y no hay ningún `4564*` ni `9541*`; las rutas a mano dan 404.
- **Mönchengladbach 2025 y VfB Stuttgart 2025**: el Unternehmensregister responde pero su búsqueda es un formulario con sesión que no abrí; North Data (que replica el registro) no trae ningún cierre al 31/12/2025. Se espera hacia enero de 2027. Reintentar entonces.
- **Monza 2025**: el sitio del club (en vivo y la captura de Wayback de agosto de 2026) sigue en 2022-2024. Queda la visura de pago del Registro Imprese (gestión de Guido) o pedirlo al club.
- **Lierse Kempenzonen 2023-25**: la API de la BNB lista 6 depósitos y el último es el ejercicio 2022. Ojo: la SA `Lierse SK` es otra entidad y ya tiene hasta 2025. La API exige los `sort` en el pedido (sin ellos da 500).
- **Basel**: la nota original estaba bien. El fcb.ch no tiene nada posterior a 2021. `geschaeftsbericht_2022-23.pdf` es del Theater Basel y `Jahresbericht-2023.pdf` de Basel Tourismus; ya estaban en `Admin/registros/documentos-descartados.txt`. No hay rótulo que corregir; sí conviene sacar esos dos de la carpeta del club (no los toqué).

**Ojo, para la principal:** los PDFs de las carpetas `Clubes/` de un worktree son archivos propios de este worktree (en main muchos son enlaces). Los 5 nuevos hay que copiarlos a la carpeta `Clubes/` de main antes de que onboarding los use:
- `Clubes/Brasil/Goias/demonstracoes-contabeis-2018.pdf`
- `Clubes/Brasil/Goias/demonstracoes-contabeis-2019.pdf`
- `Clubes/Brasil/Goias/demonstracoes-contabeis-2020.pdf`
- `Clubes/Brasil/Novorizontino/balanco-2012.pdf`
- `Clubes/Italia/Fiorentina/Fiorentina-bilancio-2020-giu-issuu.pdf`

**Qué queda / pendientes:** Mönchengladbach y Stuttgart 2025 (enero de 2027); Monza 2025 (visura o mail); Lierse Kempenzonen 2023-25 (reconsultar la BNB en unos meses); Ferroviária 2011 y Novorizontino 2011 (solo el club). Fiorentina 2018 sigue sin slug de Issuu.

**Qué deja de ser cierto:** en `Admin/sesiones/pipeline.md`, «Para sourcing»: Goiás 2019 está resuelto (y 2018 y 2020), Basel 2022 y Fiorentina 2020 aclarados, Ferroviária/Novorizontino 2011 y Lierse, Gladbach, Stuttgart y Monza descartados por ahora. El TODO 346 solo conserva lo que sigue abierto. Los carga onboarding.

**Trampa nueva de tooling (para la skill de sourcing, con el ok de Guido):** las imágenes de `image.isu.pub` (Issuu) dan 403 sin `Referer: https://issuu.com/`; el `reader3_4.json` no lo pide. Y una URL que da 404 en el sitio nuevo de un club puede estar viva en Wayback bajo la ruta del CMS anterior (aquí `wp-content/uploads`): buscarla con la CDX del dominio filtrando por nombre de archivo.
