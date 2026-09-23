# Goiás (Goiás Esporte Clube, Goiânia-GO — associação civil sem fins lucrativos, NO es SAF)

- **El mejor hallazgo de este barrido de la Série B: 16 ejercicios auditados descargados, serie
  2007/2008 → 2025 con un solo hueco (2018-2020).** El club no es SAF: sigue siendo asociación
  civil (CNPJ 01.665.256/0001-80), pero publica voluntariamente desde 2008 en su propio portal de
  transparencia — un caso más de "publicación voluntaria de club-asociación" como Alianza Lima en
  Perú, solo que con una serie muchísimo más larga.
- Portal propio: `goiasec.com.br/transparencia` (HTML plano, `curl` con User-Agent de navegador
  alcanza, sin Cloudflare). Los PDFs viven en el subdominio `static.goiasec.com.br/upload/
  transparencia/...`. La página trae además **demonstrativos contábeis MENSUALES** desde 2021 hasta
  hoy y pareceres del Conselho Fiscal — no se bajaron, solo los anuales; están ahí si en algún
  momento hace falta el detalle intra-anual.
- **16 PDFs descargados en `Clubes/Brasil/Goias/`**, todos verificados abriendo el texto de la
  primera página (nombre del club + ejercicio, nunca solo por el nombre de archivo):
  - `demonstracoes-contabeis-2008-2007.pdf` a `-2017-2016.pdf` (10 archivos, un ejercicio cada uno
    con su comparativo). Los de 2008-2012 y 2015-2016 son el balance publicado en diario (2-3
    páginas, formato reducido); 2013, 2014 y 2017 ya son el paquete completo con relatório do
    auditor independente (19, 21 y 27 páginas).
  - `demonstracoes-contabeis-2021.pdf` (39 pp), `-2022.pdf` (40 pp), `-2023.pdf` (33 pp),
    `-2024.pdf` (28 pp), `-2025.pdf` (31 pp) — paquete completo cada uno: relatório do auditor,
    balanços patrimoniais, DRE, DRA, mutações do patrimônio líquido, fluxo de caixa y notas.
    Auditor BDO RCS (códigos `1303/22`, `2078/23`, `2796/24`, `3105/25`, `3008/26`).
  - `demonstracoes-contabeis-2022-fgf-go.pdf` (35 pp) — el MISMO ejercicio 2022 en la versión
    "limpia" del repositorio de la federación; el de goiasec (40 pp) está maquetado y su capa de
    texto sale ilegible (`D E M O N S T R A Ç Õ E S` con espacios entre letras). Si se va a leer
    2022, usar el de la federación.
  - `balanco-publicado-2024-2023.pdf` (3 pp) — el resumen de 2 columnas publicado en diario; NO es
    el paquete completo (ese es `demonstracoes-contabeis-2024.pdf`). Se guardó porque trae la nota
    sobre la adopción de ITG 2003 (R2) desde el 1/1/2024, que hace desaparecer el activo de
    formación de atletas y cambia la comparabilidad contra los ejercicios anteriores — dato de
    mapeo importante, no un duplicado.
- **Ojo con los nombres de archivo del CHANGELOG de la página vs. el ejercicio real**: la etiqueta
  del portal dice "Demonstrações Contábeis 2025 - 2024" y el archivo se llama
  `a99e7679802e4d2297c3b5b212ec41b3.pdf` — adentro es el ejercicio **2025** (con 2024 de
  comparativo). Igual el rotulado "Relatório da Auditoria 2024" (`3105-25...`), que es el ejercicio
  **2024**. Verificado abriendo cada uno.
- **Hueco confirmado: 2018, 2019 y 2020.** Los tres siguen LISTADOS en la página de transparencia,
  pero sus URLs devuelven **404 real del Apache de `static.goiasec.com.br`** — los archivos ya no
  están en el servidor. No es un problema de encoding: se probó la URL tal cual sale del HTML
  (`%C3%A7`), la variante NFD (`c%CC%A7`), el doble-encodeo (`%25C3%25A7`), con y sin `Referer`, y
  los cuatro dan el mismo 404 de 284 bytes. Wayback Machine tiene las URLs en su índice CDX pero
  **ningún snapshot con status 200** del archivo en sí. El repositorio de la FGF-GO (ver abajo) solo
  arranca en 2021, así que tampoco cubre el hueco. Ángulo pendiente si alguna vez hace falta: pedir
  los 3 PDFs directo al club.
- **Segundo canal, nuevo para el proyecto: el repositorio de la Federação Goiana de Futebol**
  (`fgf.esp.br` — OJO, NO es `fgf.com.br`, que es la Federação **Gaúcha**). Menú "Institucional →
  Publicações": `fgf.esp.br/pt/conteudo/?q=11&sc=11` (+ `&p=2..7` de paginación), con los
  "Demonstrativos Financeiros" de TODOS los clubes filiados, 2021-2025, en
  `fgf.esp.br/assets/uploads/<id>.pdf`. Goiás está ahí en 2021, 2022, 2023, 2024 y 2025 (el de 2024
  es byte-idéntico al del sitio del club). Detalle completo del repositorio en
  `fuentes/Brasil/_notas-generales.md`.
- Prensa: Diário de Goiás / Mais Goiás reportan prejuízo de R$ 69.120.627 en 2024 y de
  R$ 98.110.093 en 2025 — números de control contra qué verificar al cargar.
- Pendiente: ejercicios 2018-2020 (404 en el servidor del club); demonstrativos mensuales
  2021-2026 si alguna vez se quiere detalle intra-anual.
- Contacto: goiasec.com.br/transparencia (PDFs en static.goiasec.com.br/upload/transparencia/);
  fgf.esp.br/pt/conteudo/?q=11&sc=11.
- Último chequeo: 2026-09-22.
