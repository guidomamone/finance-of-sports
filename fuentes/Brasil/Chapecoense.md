# Chapecoense (Associação Chapecoense de Futebol — no es SAF)

**Ángulos**: sitio oficial: HIT (chapecoense.com/transparencia, estático, curl 200) · federación/regulador: FCF solo 2020-2021 (ya conocido) · Wayback CDX: no necesario · búsqueda web: no necesaria · barrido: 1 (Sonnet) — 2026-10-03

- Club nuevo esta sesión. **No es SAF**, associação tradicional, con un archivo de demonstrações
  financeiras que se remonta a varios años (relevante dado el contexto histórico del club post-2016).
  3 PDFs descargados a `Clubes/Brasil/Chapecoense/`: `demonstracoes-financeiras-2016.pdf` y
  `demonstracoes-financeiras-2017.pdf` (bajados de chapecoense.com/wp-content/uploads/2022/08/,
  cada uno standalone de un solo año) y `demonstracoes-financeiras-2020-2021.pdf` (comparativo,
  bajado de fcf.com.br — la Federação Catarinense de Futebol, no el sitio del club).
- Pendiente: 2018, 2019, 2022, 2023, 2024, 2025 — la página
  chapecoense.com/document-category/demostracoes-financeiras/ existe y lista más documentos, pero
  es una página armada con JS/API (no se pudieron extraer los links de PDF directo con un fetch
  simple; hace falta un browser interactivo para paginar esa sección en una sesión futura).
- Contacto: chapecoense.com/document-category/demostracoes-financeiras/ (requiere browser
  interactivo); fcf.com.br (federación, al menos tiene el ejercicio 2020-2021).
- Último chequeo: 2026-09-12.
- **Cargado (sesión 2026-09-24):** ejercicio 2021 (año calendario, columna "año corriente" del PDF
  comparativo `demonstracoes-financeiras-2020-2021.pdf`, Controladora), en `data/chapecoense-br-data.js`.
  El documento tiene una inconsistencia interna real entre su DRE (pág. 7, imagen dentro del PDF) y
  sus Notas explicativas de detalle (texto nativo) — ver el comentario de cabecera del archivo de
  datos para el detalle completo y cómo se resolvió (se usaron las Notas para categorizar, y el
  "Lucro Líquido do Exercício" impreso del DRE como officialPAT, con un residuo de ~0,5% documentado
  sin forzar a cerrar). 2020, 2016 y 2017 (los otros 2 PDF standalone ya descargados) quedan
  pendientes de carga. TC usado: PTAX BCB de cierre (venda) al 31/12/2021, R$5,5805 — investigado en
  esta sesión, todavía no está en `data/currency-map.js` (FX_CLOSE) compartido, queda como literal en
  el archivo del club.
- **Color de marca: #1B552A (Forest Green/verde bosque) + blanco — fuente: teamcolorcodes.com
  (Pantone PMS 350 C), consistente con el apodo "Verdão do Oeste" de la infobox de Wikipedia en
  portugués. Verificado 2026-09-24.**

## Barrido 2026-10-03 (sourcing Brasil grupo B) — de 3 a 9 ejercicios en disco

- La nota vieja decía que hacía falta un browser interactivo: **no**. `https://chapecoense.com/transparencia/` (y `/portal-da-transparencia/`) traen todos los
  `<a href=...pdf>` en el HTML crudo (curl 200, ~230-300 KB; grep de `href=".*\.pdf"`). Las URLs `?dlp_document=...` de `document-category/demostracoes-financeiras/` redirigen al home (callejón sin salida; esa categoría solo llega a 2016-2020).
- Bajados a `Clubes/Brasil/Chapecoense/` desde `chapecoense.com/wp-content/uploads/...`: `demonstracoes-financeiras-2019.pdf` (61 pp, `DFS_ACF_2019_Completas-compactado.pdf`, 31/12/2019 y 2018),
  `-2020.pdf` (63 pp, `Dfs_Final_Chape_2020.pdf`, controladora/consolidado), `demonstracoes-contabeis-2021.pdf` (60 pp, `2023/01/Demonstracoes-Contabeis-2021.pdf`; incluye dictamen 2021 y al final un balancete 1H2022),
  `demonstracoes-contabeis-2022.pdf` (57 pp, `2024/10/Demonstracoes-Contabeis-Chapecoense-31.12.2022.pdf`), `-2023.pdf` (56 pp, `2024/04/RB-20240328-05-...-31.12.2023.pdf`),
  `-2024.pdf` (61 pp, `2025/05/2024-Publicacao-Site.pdf`), `-2025.pdf` (54 pp, `2026/04/Balanco-2025-Parecer-Conselho-Fiscal.pdf` — a pesar del nombre es el documento completo de DFs 2025/2024 en recuperación judicial).
- No se pudo bajar `Publicação_2018_ACF` (nombre con tilde en descomposición Unicode, 404 con NFC y con percent-encoding NFC); sí están 2016 y 2017 de antes. El ejercicio 2018 viene como comparativo dentro del PDF 2019.
- md5 distintos entre todos. Textos con capa nativa; el de 2019 y 2021 tienen datos en imagen parcial (verificar al transcribir).
- Ejercicios en disco ahora: 2016, 2017, 2019 (+2018 comparativo), 2020, 2021, 2022, 2023, 2024, 2025.
