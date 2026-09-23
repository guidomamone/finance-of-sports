# Banfield

- **CORRECCIÓN DE DOMINIO (2026-09-22): el sitio oficial es `clubabanfield.org`, NO
  `clubabanfield.com.ar`.** El `.com.ar` no resuelve (connect timeout, 0 bytes) y por eso los
  barridos automáticos anteriores daban "dominio inalcanzable" para este club. El `.org` responde
  200 normal. Vale la pena chequear esto en cualquier club argentino que aparezca como inalcanzable:
  el TLD anotado puede ser simplemente el equivocado.
- **Memoria y Balance General, 116° Ejercicio Económico (1/7/2019 a 30/6/2020) — ENCONTRADO
  2026-09-22, el club pasa de 0 documentos a 1 balance auditado real.** 58 págs, capa de texto
  nativa (cero OCR), con Estado de Situación Patrimonial al 30/6/2020 (Total del Activo
  $1.253.147.745,78 vs. $1.288.089.000,91 del ejercicio anterior) y Estado de Recursos y Gastos.
  URL oficial: `clubabanfield.org/inicio/balance/CAB-MemoriaBalance2020.pdf`. Descargado en
  `Clubes/Argentina/Banfield/memoria-y-balance-2019-2020.pdf`.
  **La URL viva devuelve 404** (el club migró de `/inicio/` a la raíz); se recuperó del snapshot de
  Wayback Machine de esa misma URL oficial.
- `Informe de Mercado de Pases 2026` — `clubabanfield.org/wp-content/uploads/2026/03/INFORME-DE-
  MERCADO-DE-PASES-2026.pdf`, descargado como `informe-mercado-de-pases-2026.pdf`. **No es un estado
  contable**: es el detalle de altas/bajas de la ventana de pases. Guardado porque puede servir de
  cruce para las líneas de transferencias de un ejercicio futuro. El club publica uno por ventana
  (hay también 2023, 2023-2, 2024-feb, 2024-sep en el índice de Wayback).
- **Cómo se llegó**: igual que Newell's — pedir el índice completo de PDFs del dominio a la CDX API
  de Wayback (`matchType=domain`, 49 URLs para `clubabanfield.org`) y leer los nombres a mano. El
  balance vivía en una carpeta `/inicio/balance/` que NO está linkeada desde ninguna página viva ni
  aparece en el `wp-json/wp/v2/search` del sitio.
- Qué NO funcionó: se probó adivinar más años en la misma carpeta
  (`CAB-MemoriaBalance<2015..2025>.pdf`, también en mayúsculas y sin el prefijo `CAB-`, contra
  `clubabanfield.org` y `www.clubabanfield.org`): TODOS 404, y `GET /inicio/balance/` devuelve la
  página 404 de WordPress (no hay listado de directorio). Los 3 posts de asamblea del sitio
  (`asamblea-de-socios-gran-concurrencia-y-aprobacion-del-balance`,
  `se-desarrollo-la-asamblea-ordinaria-y-extraordinaria`,
  `se-llevaran-a-cabo-las-asambleas-ordinaria-y-extraordinaria`) no tienen ni un PDF ni un Drive
  adjunto. `informe-gestion-2015.pdf` aparece en el índice de Wayback pero su snapshot devuelve HTML,
  no el PDF.
- Pendiente: 105° Ejercicio (2024-25, 1/7/2024 a 30/6/2025), aprobado en Asamblea General Ordinaria
  del 18/12/2025 — el club subió una PRESENTACIÓN EN VIDEO a YouTube ("Memoria y Balance - 105°
  Ejercicio - Año 2025", enero 2026) en vez de un PDF. No sirve como fuente descargable bajo el
  criterio del proyecto, pero confirma que el documento existe: pedírselo al club. También faltan
  todos los ejercicios entre el 116° (2019-20) y el 105°... ojo con la numeración, que el club usa
  de forma inconsistente entre esos dos documentos (ver duda en `Admin/dudas-por-club.md`).
- Contacto: Secretaría/Sede Social — socios@clubabanfield.com.ar, WhatsApp +54 11 5643-7777.
- **CARGADO AL SITIO (2026-09-23): `banfield-ar-memoria-y-balance-2019-2020`**, el balance 116°
  Ejercicio (2019-20) descripto arriba, primer ejercicio de Banfield en el sitio (`clubId`
  `banfield-ar`). Transcripción completa en `Clubes/Argentina/Banfield/memoria-y-balance-2019-2020.md`
  (58 páginas, texto nativo). Ver `data/banfield-ar-data.js` para el detalle de categorización
  (reporta por sector/departamento, no por naturaleza de gasto transversal como Racing/River/Unión).
  RESULTADO FINAL real: $80.173.576,08 ARS (superávit). El documento NO declara tipo de cambio de
  cierre propio (sin Anexo de moneda extranjera) — pendiente que se agregue `ARS@2020-06-30` a
  `FX_CLOSE` (`data/currency-map.js`) centralizado.
- Color de marca: `#03953F` — footylogos.com/es/color-codes/liga-profesional-argentina, verificado
  2026-09-23. Identidad confirmada primero en es.wikipedia.org (verde y blanco, "el Taladro",
  colores adoptados en 1904); el hex cae en esa familia de verde.
- Último chequeo: 2026-09-23.
