# Azerbaiyán — notas generales (sourcing, sesión 2026-10-03)

## Qué canales se probaron

- **Registro tributario / `e-qanun` / `taxes.gov.az`**: no se encontró ningún servicio gratuito para descargar estados financieros
  de un LLC/OJSC. No se profundizó con navegación autenticada. Documentado como: sin canal accesible.
- **Clubes**: ni Qarabağ ni los demás publican estados auditados; Qarabağ publica solo un `Official Reports` con el
  informe de sostenibilidad (desde 2025, primera edición; el archivo anterior `qarabagh.com/brandbook/uploads/files/sustanability_report.pdf`
  ya no existe en vivo y su captura de Wayback está truncada).
- **AFFA (federación)**: SÍ publica el informe anual de licenciamiento de clubes con ingresos por club (ver `affa.az/index.php/lisenziya/rsmi-sndlr/211`:
  "AFFA Klubların Lisenziyalaşdırılması üzrə hesabatı - <año>", 2014-2025; las URLs `…/uploads/files/dirNNN/…/N_0.php` devuelven el PDF directo).
  La prensa azerí (idman.biz, report.az, qol.az) los cita cada diciembre (ingresos del año anterior).

## Gotchas

- `curl` a `qarabagh.com`, `report.az`, `cbcsport.az` devuelve 403 (hay que usar el navegador del pane); `media.qarabagh.com` (CDN de archivos) baja bien con curl.
- Los PDF de AFFA pesan 3-12 MB (informes con gráficos): texto parcial. Idioma: azerí (`aze` en Tesseract si hiciera falta).
- Moneda AZN (manat). Ejercicio = año calendario; el licenciamiento mira el ejercicio previo (informe "2025" = ejercicio 2024).

## Gestiones / mails

- Candidato a mail (no escrito): Qarabağ, pidiendo estados auditados (si los hay) además del informe de sostenibilidad.
- Gestión de Guido: bajar a mano el informe AFFA 2014.

## Pendientes (venían del TODO)

- (ex to-do 133, 2026-10-03) **Gestiones de Guido que desbloquean varios países de Europa del Este** (sesión 2026-10-03; ninguna es tarea de sourcing, cada una exige IP, cuenta, captcha o pago de una persona): (g) [...] Azerbaiyán AFFA 2014.
- (ex to-do 135) **Candidatos a mail (existencia confirmada o muy probable, no escritos; Guido decide y aprueba cada envío, proceso en `club-outreach`)**: Qarabağ.
