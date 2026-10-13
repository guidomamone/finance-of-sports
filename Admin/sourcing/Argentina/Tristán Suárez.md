# Tristán Suárez

**Ángulos**: sitio oficial: agotado (menú completo + wp-json; sin sección Comisión Directiva ni
institucional, solo un portal de gestión de socios con login — DigitalClub) · Wayback CDX: agotado
(2 PDFs en todo el dominio, ninguno financiero) · búsqueda web: agotado (sin resultados) ·
regulador/país: no aplica (Argentina sin regulador documentado salvo IGJ pago) · prensa: agotado
(sin cifras ni cobertura de asamblea reciente) · barrido: 1 (Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: clubtsuarez.com.ar. Índice completo de Wayback
  Machine del dominio: solo 2 PDFs, ambos de identidad visual (manual de marca, vector del escudo) —
  ninguno financiero.
- Pendiente: todos los ejercicios.
- Contacto: tel./fax +54 11 4518-4555, cel. 11-4400-5734, Remedios de Escalada 170, Tristán Suárez.
  Email de socios: sociosclubtristansuarez@gmail.com. Presidente (2026): Gastón Granados.
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

- **Familia 1, sitio oficial**: menú completo revisado (Inicio, El Club → Historia/Estadio/
  Actividades, Fútbol → Profesional/Amateur/Senior, Prensa → Medios Partidarios/Acreditaciones/
  Media Kit, Membresía, E-shop) + `wp-json/wp/v2/search` con `balance`, `memoria`, `asamblea`,
  `contable`, `ejercicio` — **0 resultados en las 5 búsquedas**. A diferencia de los otros dos
  clubes de este barrido, este sitio **no tiene siquiera una sección "Comisión Directiva"** — el
  único canal de gestión institucional visible es un botón "GESTIÓN ONLINE" que linkea a un portal
  externo de terceros (`app.digitalclub.com.ar`, sistema DigitalClub de gestión de socios) detrás de
  login, no explorable sin credenciales de socio. Se revisaron los 11 posts del sitio (vía
  `wp-json/wp/v2/posts`): todos son noticias deportivas (fichajes, amistosos, contratos), ninguno
  institucional/financiero.
- **Familia 3, Wayback CDX de dominio completo** (`matchType=domain&filter=original:.*\.pdf`):
  confirmado de nuevo, solo **2 PDFs en todo el dominio histórico** — manual de marca y vector del
  escudo, ambos de identidad visual, ninguno financiero.
- **Familia 4, búsqueda web dirigida**: `filetype:pdf` + balance/estados contables/asamblea — cero
  resultados propios del club. Segunda búsqueda de convocatoria/socios encontró el email de socios
  (`sociosclubtristansuarez@gmail.com`) y confirmó al presidente actual (Gastón Granados) vía una
  nota de Ezeiza Hoy sobre membresía — sin ninguna mención de balance o asamblea con cifras. Un
  tercer resultado ("primera asamblea de la historia en el Tala Ezeiza") se verificó y es de una
  institución distinta (Sociedad de Fomento Tala Ezeiza, sin relación con el club).
- **Familia 5, prensa**: sin cobertura de asamblea ni cifras del club en ningún medio (ni siquiera
  local de Ezeiza).
- **Conclusión: dead-end real, 0 señal de que el documento exista en ningún canal digital.** El
  club gestiona socios vía un portal externo con login (DigitalClub) en vez de publicar nada
  abierto — no es un bloqueo que un agente pueda destrabar (mismo criterio que un canal que exige
  identidad/pago de una persona real, sección 0.3). No amerita mail todavía por falta de
  confirmación de que exista un documento. Sin próximo paso concreto con la información actual.
- Último chequeo: 2026-09-26.
