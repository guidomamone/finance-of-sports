# Chapecoense (Associação Chapecoense de Futebol — no es SAF)

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

