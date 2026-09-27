# Banfield

**Ángulos**: sitio oficial: agotado (wp-json `balance`/`memoria`/`ejercicio` sin novedad) · Wayback
CDX: agotado (0 PDFs de balance nuevos en 2026, solo los 2 informes de mercado de pases ya
conocidos) · búsqueda web: agotado (video del 105° sigue sin confirmarse, ver abajo) · regulador/
país: no aplica — 2026-09-26

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
  del 18/12/2025 — la nota original de esta sesión decía que el club había subido una PRESENTACIÓN
  EN VIDEO a YouTube ("Memoria y Balance - 105° Ejercicio - Año 2025", enero 2026) en vez de un PDF.
  **EXISTENCIA DEL VIDEO SIN CONFIRMAR (2026-09-26)**: ni un `WebSearch` (que devolvió un falso
  positivo, un video de agricultura sin relación) ni una búsqueda manual de Guido en YouTube
  encontraron el video real. Puede que exista y no sea indexable con esos términos (canal privado,
  nombre distinto, subido como "no listado"), o puede que la nota original haya sido un error y el
  club en realidad no publicó nada del 105°. Antes de escribirle al club dando el video por hecho,
  conviene una vuelta más de sourcing: revisar el canal oficial de YouTube de Banfield directo
  (no por buscador), y la nota de prensa del club sobre la Asamblea del 18/12/2025 por si cita un
  link. Si no aparece, el mail a `socios@clubabanfield.com.ar` tiene que preguntar en general por el
  105° Ejercicio (memoria y balance, en cualquier formato), no asumir que existe un video puntual
  que después no se puede señalar. También faltan todos los
  ejercicios entre el 116° (2019-20) y el 105°... ojo con la numeración, que el club usa
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

## Chequeo 2026-09-26 — foco en 106°/105° Ejercicio, escalera completa

Tarea acotada: no re-sourcear Banfield desde cero, solo confirmar si el 106° Ejercicio (2025-26) ya
se publicó en PDF, o si el 105° finalmente subió como PDF.

- **CDX de Wayback restringido a 2026** (`matchType=domain&filter=original:.*\.pdf&from=20260101`):
  solo 2 PDFs archivados este año, los 2 informes de mercado de pases ya conocidos (2024-09 y 2026-03,
  este último es `informe-mercado-de-pases-2026.pdf`, el mismo que ya está en `Clubes/Argentina/
  Banfield/` sin revisar y que el brief de esta sesión ya advertía que NO es un balance). **Cero
  balances nuevos.**
- **`clubabanfield.org/inicio/balance/CAB-MemoriaBalance2025.pdf` (adivinando el mismo patrón de
  nombre del 116°) → 404.** No hay carpeta `/inicio/balance/` viva (confirmado ya en la sesión
  anterior, la URL migró).
- **`wp-json/wp/v2/search` con `balance`, `ejercicio` y `memoria`**: mismos posts de siempre
  (asamblea de socios, reforma de estatuto, camisetas 2026) — **ningún post nuevo sobre el 105° ni el
  106° Ejercicio**, y ninguno de los ya conocidos tiene adjunto.
- **Video de YouTube: CONFIRMADO que es un falso positivo, no el video real de Banfield.** El video
  que aparece al buscar `"Memoria y Balance - 105° Ejercicio - Año 2025"` (id `0CW5sF2NSGg`) es de
  **"Cooperativa Agrícola La Vencedora Ltda"** (confirmado vía YouTube oEmbed, `author_name`), sin
  ninguna relación con Banfield — coincidencia de título nada más. Es el mismo falso positivo que ya
  había anotado la sesión del 2026-09-26 anterior (agricultura), ahora identificado con nombre y
  canal exacto para que una sesión futura no lo vuelva a abrir. **La existencia del video real de
  Banfield sigue sin confirmarse.**
- **Resultado: escalera completa (1, 3, 4) agotada de nuevo, sin novedad.** Ni el 106° Ejercicio
  (2025-26) ni el 105° (2024-25) están publicados en PDF ni en video confirmado. Sigue siendo
  candidato a mail (to-do 51/59): el mail a `socios@clubabanfield.org` (u `.com.ar`, confirmar cuál
  responde) debe preguntar en general por el 105° y el 106° Ejercicio en cualquier formato, sin
  asumir que existe un video puntual — exactamente como ya decía la nota anterior.
- Último chequeo: 2026-09-26.
