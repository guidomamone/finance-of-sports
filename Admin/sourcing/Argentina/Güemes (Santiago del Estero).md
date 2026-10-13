# Güemes (Santiago del Estero)

**Ángulos**: sitio oficial: agotado (menú completo + wp-json, sin sección institucional/balance) ·
Wayback CDX: agotado (0 PDFs en todo el dominio) · búsqueda web: agotado (sin resultados) ·
regulador/país: no aplica (Argentina sin regulador documentado salvo IGJ pago) · prensa: agotado
(sin cifras ni cobertura de asamblea reciente) · barrido: 1 (Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: caguemes.com, con sección "Contactos" pero sin
  institucional/socios/balance. 0 PDFs archivados en Wayback Machine para el dominio.
- Pendiente: todos los ejercicios.
- Contacto: dptoprensacaguemes@gmail.com, tel. (03856) 42-1345, Av. Rivadavia, Santiago del Estero.
- Último chequeo: 2026-09-12.

## Chequeo 2026-09-22 — barrido automatizado, sin hallazgo

Se corrió el barrido de 4 pasos descrito en `_notas-generales.md` ("Metodología — barrido
automatizado 2026-09-22") sobre el dominio oficial de este club: (1) home + rutas institucionales
típicas + `?s=balance`/`?s=memoria+y+balance`/`?s=estados+contables`, (2) `wp-json/wp/v2/search`
con `balance`, `memoria y balance`, `contable` y `asamblea`, (3) `sitemap_index.xml`/`sitemap.xml`/
`wp-sitemap.xml`, (4) segundo nivel: abrir cada página cuyo slug contenga
balance/memoria/contable/ejercicio/asamblea/transparencia/gestión y buscar en su HTML `href`, `src`
y `data-src` a `.pdf`, Drive, `docs.google.com/viewer|gview`, Issuu, Scribd, Calaméo o Dropbox. Se
sumó el índice COMPLETO de PDFs del dominio en la CDX API de Wayback Machine
(`matchType=domain&filter=original:.*\.pdf`), que detecta archivos que nunca estuvieron linkeados
desde una página viva.

- **Resultado: 0 documentos.** Ni el sitio vivo ni el índice de Wayback Machine del dominio tienen un PDF, Drive o visor embebido con balance/memoria/estados contables.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — escalera completa (Sonnet, GRUPO A control), sin hallazgo

- **Familia 1, sitio oficial**: menú completo revisado (Noticias, El Club → Historia/Comisión
  Directiva/Palmarés/Estadio, Plantel → Jugadores/Cuerpo técnico, Inferiores, Clasificación,
  Calendario, Fotos, pie de página → Contactos/Patrocinadores) + `wp-json/wp/v2/search` con
  `balance`, `memoria`, `asamblea`, `contable`, `estados contables`, `ejercicio` — **0 resultados en
  las 6 búsquedas**. Se revisó además el listado completo de posts recientes (23 notas vía
  `wp-json/wp/v2/posts`): todas son crónicas deportivas (resultados de partidos, refuerzos,
  comunicados de DT), ninguna institucional/financiera. La sección "Comisión Directiva" del menú es
  solo nómina de dirigentes, sin documentos adjuntos.
- **Familia 3, Wayback CDX de dominio completo** (`matchType=domain&filter=original:.*\.pdf`):
  confirmado de nuevo, **0 PDFs archivados en todo el dominio**, nunca — no es un problema de
  captura truncada (se reintentó igual, mismo resultado vacío).
- **Familia 4, búsqueda web dirigida**: `filetype:pdf` + balance/estados contables/asamblea — cero
  resultados propios del club (los resultados devueltos son de otros clubes: Vélez, Talleres,
  Estudiantes LP, Unión). Segunda búsqueda con "memoria y balance" 2024/2025 tampoco trae nada del
  club.
- **Familia 5, prensa**: sin cobertura de asamblea ni cifras del club en ningún medio, provincial o
  nacional.
- **Conclusión: dead-end real, 0 señal de que el documento exista en ningún canal digital.** Sitio
  institucional muy básico (ni siquiera menciona socios/membresía en el menú). No amerita mail
  todavía (no hay ninguna confirmación de que un balance exista en algún lado para pedirle al club
  que lo resuba). Sin próximo paso concreto con la información actual.
- Último chequeo: 2026-09-26.
