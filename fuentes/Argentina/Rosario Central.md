# Rosario Central

**Ángulos**: sitio oficial: agotado (media library + wp-json search + noticias de asamblea sin PDF
adjunto) · Wayback CDX: agotado (dominio completo, solo aparecen 2015/2022-23/2024-25) · búsqueda
web: agotado (filetype:pdf sin resultados propios) · regulador/país: no aplica — 2026-09-26.

- Memoria, Ejercicio 2022-23 — rosariocentral.com/wp-content/uploads/2023/10/Memeria-ClubAtleticoRosarioCentral.pdf
  (36 págs, reporte narrativo de gestión).
- Estados Contables + informe del auditor, mismo Ejercicio 2022-23 —
  .../uploads/2023/10/EECC-Club-Atletico-Rosario-Central-e-Informe-del-auditor-30.06.2023-Firma-FT-1-1-1.pdf
  (balance auditado real, con firma). Ambos descargados en `Clubes/Argentina/Rosario Central/`.
  **El Estados Contables YA CARGADO en el sitio (Versión 95)**: 6to club del motor genérico. Anexo
  V/VI con desglose muy granular (19 filas x 8 columnas de departamento en Recursos, 38 x 13 en
  Gastos). DÉFICIT real: $(3.107.221.597) ARS. Se encontró y corrigió un error de lectura de $201M
  (una fila desalineada por el layout de pdftotext) verificando la suma contra el total impreso —
  ver `data/rosariocentral-data.js`. La Memoria (36 págs) es narrativa, no se usó.
- **Estados Contables, Ejercicio 2024-25 (cierre 30/6/2025) — ENCONTRADO 2026-09-22, CARGADO al
  sitio en sesión posterior.** 41 págs. **CORRECCIÓN: la nota anterior decía "escaneo sin capa de
  texto" y estaba mal** — verificado con `pdftotext -layout`, el documento SÍ tiene texto nativo
  completo (172.616 caracteres en 41 páginas, muy por encima del umbral de ~1 char/página que
  distingue un escaneo real). No hizo falta OCR. Pág. 3: "Composición de la Comisión Directiva y
  Comisión Revisora de cuentas al 30 de junio de 2025", presidente Gonzalo Luis Belloso (sigue en el
  cargo, gestión extendida a `lastYear:2025`). Trae el ejercicio 2024 reexpresado en moneda de cierre
  30/6/2025 como comparativo (no usado para cargar datos, ver club-data-mapping sección 6 regla 5).
  URL oficial: `rosariocentral.com/wp-content/uploads/2025/10/Balance.pdf` — nombre genérico, sin año
  ni club, imposible de adivinar. Descargado en
  `Clubes/Argentina/Rosario Central/estados-contables-2024-2025.pdf`, transcripto completo a
  `estados-contables-2024-2025.md`. Anexo V/VI agrupa en 6 departamentos (menos granular que el
  ejercicio 2022-23, que tenía 12+). fx: USD 1.165 (Anexo IV, lado Activo/Créditos — consistente en
  sus 3 líneas, sin la ambigüedad que tuvo 2022-23). DÉFICIT real: $(13.410.007.536) ARS. Verificación
  numérica cierra exacto (revenue exacto, expense con $1 de redondeo del propio documento, resultado
  final exacto al peso) — ver comentario de cabecera de `data/rosariocentral-data.js`.
- **Ejercicio 2023-24: CONFIRMADO que existe y fue aprobado, pero NUNCA se publicó como PDF
  descargable — candidato a mail (2026-09-26).** Prensa (El Ciudadano, Doble Amarilla) confirma que
  Memoria y Balance del período 01.07.23-30.06.24 fueron aprobados por unanimidad en la Asamblea
  General Ordinaria de Representantes del 24/10/2024 (con cifras: reducción de USD 4M en pasivos
  respecto del ejercicio anterior). Se agotó la escalera completa buscando el PDF: (1) el post oficial
  de esa asamblea (`rosariocentral.com/noticia/fueron-aprobados-memoria-y-balance-en-la-asamblea-
  general-ordinaria-de-representantes/`, 24/10/2024) tiene solo fotos del evento, CERO archivos
  adjuntos — confirmado leyendo el HTML crudo del post vía la API `wp-json/wp/v2/noticia/8077`; (2) la
  media library completa del sitio (`wp-json/wp/v2/media?search=balance|eecc|estados`) no tiene NINGÚN
  archivo de ese ejercicio, solo el de 2022-23 y 2024-25; (3) el patrón de carpeta `uploads/2024/<mes>/`
  con 20 variantes de nombre (Balance/EECC/Memoria en mayúscula/minúscula) — todos 404; (4) Wayback CDX
  sobre el dominio completo (`matchType=domain`, sin restringir a una URL puntual) solo devuelve 4 PDFs
  en toda la historia del sitio: memoria 2015, el balance 2022-23, y Balance.pdf/Memoria.pdf de
  2025 (que son el ejercicio 2024-25 ya cargado) — cero rastro de 2023-24; (5) búsqueda web
  `filetype:pdf` no trajo nada propio del club (solo resultados de otras instituciones homónimas). Es
  el mismo patrón que Newell's/San Lorenzo: el club publica el PDF ALGUNOS años sí y otros no, sin
  relación aparente con si el ejercicio fue aprobado o no. Recomendación: pedirle al club que suba el
  PDF del ejercicio 2023-24 (ya aprobado, solo falta publicarlo).
- **Ejercicio 2025-26 (cierre 30/6/2026): todavía no existe, solo el Presupuesto.** La Asamblea aprobó
  el "Presupuesto de Recursos y Gastos" para el período junio 2025-junio 2026, pero el ejercicio recién
  cerró y su Memoria y Balance real se van a tratar en una asamblea futura (no antes de oct-nov 2026,
  seguido del patrón de años previos) — nada que buscar todavía.
- Pendiente: ejercicio 2023-24 (ver arriba, mail candidate) y todo lo anterior a 2022-23. La "Sede
  Virtual" (rosariocentral.miclub.info) sigue sin probarse a fondo (portal de socios, likely gateado
  con login — no se insistió, mismo patrón que otros portales de socios del proyecto).
- Último chequeo: 2026-09-26.
- Contacto: sección Socios (rosariocentral.com/socios/) o Prensa (rosariocentral.com/prensa/);
  WhatsApp institucional +54 9 341 202-1889.
- Color de marca: `#0A3D72` — tabla por liga de footylogos (Liga Profesional Argentina), 2° color,
  exacto, verificado 2026-09-21. Es el azul, NO el amarillo que la tabla lista primero: bicolor en
  partes iguales que resolvió Guido en la Versión 178, gana el azul del escudo.
