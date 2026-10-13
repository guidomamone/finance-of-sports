# Independiente

- Memoria y Balance, Ejercicio N°120 (2023-24) — noticia oficial con Drive embebido en
  clubaindependiente.com.ar/institucion/noticias/1730835660_memoria-y-balance-2023-24 — 51 páginas,
  estados contables completos. Descargado en
  `Clubes/Argentina/Independiente/memoria-y-balance-2023-2024.pdf`. **YA CARGADO en el sitio
  (Versión 95)**: 7mo club del motor genérico. Anexo D (Fútbol Profesional) desglosa por naturaleza
  (entradas/TV/publicidad/plateas/jugadores/técnicos), Anexo V clasifica el resto por departamento.
  SUPERÁVIT FINAL real: $7.392.788.960 ARS. Convertido a USD con $890,50 (único valor declarado, sin
  ambigüedad). Ver `data/independiente-data.js`.
- **Ejercicio N°122 (2025-26, 1/7/2025 a 30/6/2026) — YA CARGADO en el sitio (2026-09-23, to-do
  58).** Ambos documentos vía Drive embebido en la noticia oficial
  `clubaindependiente.com.ar/institucion/noticias/1789415777_memoria-y-balance-25-26`:
  - `memoria-y-balance-2025-2026.pdf` (150 págs, 99 MB, texto nativo) — "122° Ejercicio
    Administrativo". A diferencia del 120° Ejercicio, este año es SOLO Memoria narrativa: no tiene
    un solo estado contable ni Anexo (confirmado con pdftotext + grep sobre las 150 páginas). Se
    usó para el conteo de socios ("175.796 SOCIOS Y SOCIAS EN REGISTRO", pág. 22) y para confirmar
    presidencia (Grindetti).
  - `estados-contables-2025-2026.pdf` (54 págs) — Informe de Tesorería + Estado de Situación
    Patrimonial + Estado de Recursos y Gastos + Anexo V (por departamento) + Anexo D (Fútbol
    Profesional por naturaleza, dentro de Notas y Anexos) al 30/6/2026 comparativo con 30/6/2025.
    **NO es escaneo**: es capa de texto nativa con fuente subseteada sin ToUnicode en casi todas las
    tablas numéricas (mismo síntoma que Gimnasia y Esgrima LP) — se leyó renderizando cada página a
    imagen y verificando visualmente, no con OCR crudo. Superávit final $1.778.079.629 (reconcilia
    exacto contra el ancla de esta nota: superávit final $1.778 M, recursos ordinarios $80.727 M,
    gastos ordinarios antes de D&A $79.605 M, superávit operativo $1.122 M, Activo $192.453 M — los
    5 confirmados). Ver `data/independiente-data.js` para el detalle completo de mapeo/FX/
    verificación.
  - Este documento trae el ejercicio 121 (2024-25) como columna comparativa, así que aunque no
    tengamos el PDF del 121 (ver abajo) sus cifras de balance ya están disponibles ahí — NO se
    cargaron al sitio esta sesión (decisión de Guido, fuera de alcance del to-do 58).
- Pendiente: Ejercicio N°121 (2024-25) como documento propio, aprobado en asamblea el 26/11/2025.
  Prensa (El Cronista) reporta sus cifras — superávit operativo 12,2 M / final 5,72 M, activo total
  145,16 M, patrimonio 104,15 M vs. 70,88 M en 2023/24 y 17,17 M en 2022/23, plantel profesional
  24,48 M — pero **el PDF no está publicado**: se revisó el índice de noticias del club (solo lista
  las recientes), se buscó en la CDX API de Wayback todas las URLs del dominio con
  balance/memoria/contable (aparecen solo el 2022-23, el 2023-24 y la página de asamblea), y se
  abrieron los 3 snapshots archivados de la página de asamblea de nov-2025 (ninguno tiene Drive ni
  PDF: era solo el anuncio). Pedírselo al club. También faltan los ejercicios anteriores a 2022-23.
- Último chequeo: 2026-09-22.
- Contacto: asambleas@clubaindependiente.com.ar (acreditación para asambleas),
  socios@clubaindependiente.com.ar.
- Color de marca: `#EC1C24` — `theme-color` del sitio oficial (`clubaindependiente.com`),
  verificado 2026-09-21. Coincide exacto con la tabla por liga de footylogos.
