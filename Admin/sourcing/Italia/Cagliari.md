# Cagliari (Cagliari Calcio)

**Ángulos**: sitio oficial: agotado (la sección `/casteddu/documenti-societari/` tiene 6 Drive: 5 no financieros + 1 roto) · Wayback CDX: agotado (167 PDFs, ninguno financiero) · búsqueda web: agotado (Exa: solo prensa) · regulador/país: no aplica · barrido: 3 (Sonnet+Exa) — 2026-10-07

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: Cagliari Calcio S.p.A., propiedad de Tommaso Giulini. No cotiza.
- **Sin PDF descargado (link oficial roto, ver abajo).**

## Intentos (sesión 2026-09-17)

1. **Sitio oficial (`cagliaricalcio.com/casteddu/documenti-societari/`)**: SÍ tiene una sección
   "Documenti Societari" con un ítem "Informazioni finanziarie" — pero ese ítem no es un PDF propio,
   es un link a Google Drive (`drive.google.com/file/d/1PEHfI-HS1o7imrTcv_koJkEFsBWNtEC9/view`) que
   al navegarlo devuelve **"Page Not Found"** de Google Drive: el archivo fue borrado o el link nunca
   se actualizó tras rotar el documento. Confirmado con `curl` y con navegación real, mismo
   resultado. **Gotcha nuevo**: a diferencia de otros clubes que hostean el PDF en su propio dominio
   o CDN, Cagliari linkea directo a un Drive personal — un canal mucho más frágil (cualquiera con
   acceso a esa cuenta de Drive puede romper el link sin que nadie en el sitio se entere).
2. **Prensa** (calcioefinanza.it): confirma cifras del bilancio 2024/25 (pérdida de 7,6M, quinto año
   consecutivo en rojo) sin adjuntar el documento.

## Dudas / pendientes

Candidato directo para escribirle al club (vía el formulario de contacto o prensa): el link de
"Informazioni finanziarie" de su propia página de Documenti Societari está roto. Si Guido quiere,
vale la pena anotarlo en `dudas-por-club.md` como algo concreto y accionable (no una pregunta de
criterio, sino un link roto que el propio club puede arreglar en un minuto).

- Último chequeo: 2026-09-17.

## Sesión de sourcing Italia (2026-10-03): sin PDF, pero hay dos documentos oficiales identificados

La página `cagliaricalcio.com/club/documenti-societari/informazioni-finanziarie` tuvo, según Wayback:
2019-07-21 "Bilancio d'esercizio al 30 giugno 2018" como embed de Issuu
(`e.issuu.com/embed.html#35323209/69252326`); 2022-04 y 2022-10 "Bilancio d'esercizio al 30 giugno
2021" como Drive `1TEFS0Qz5hxEjzKZaOdzp9QZ2y4xL8rZI` — que hoy responde "el propietario no dio
permiso para descargar" (archivo existente, solo visible). Las capturas de 2023 de la sección no traen
ningún enlace.

**Candidato a mail**: el club tiene al menos 2018 y 2021 publicados como visor; basta pedirle el PDF o
que active la descarga. No es un dead-end.

## Sesión de sourcing Italia sección 1 (2026-10-07): ángulos nuevos, sin PDF

- Los 6 IDs de Drive de la página vigente son Codice Etico, Bilancio di Sostenibilità, Safeguarding, Codice di condotta 2024, Modulo segnalazioni y el roto `1PEHfI-...` ("Page Not Found"). El Drive del bilancio 2021 (`1TEFS0Qz5hxEjzKZaOdzp9QZ2y4xL8rZI`, "Bilancio d'esercizio al 30 giugno 2021.pdf") existe pero `drive.usercontent.google.com/download` devuelve "Can't download file": el dueño bloqueó la descarga, no se elude. Las notas de prensa del club (`/news/approvazione-del-bilancio-al-30-06-2024/`, `/news/approvato-il-bilancio-al-30-06-2023/`) no adjuntan el documento. **Candidato a mail** (pedir el PDF o activar la descarga; 2018 Issuu, 2021 Drive, y ejercicios 2022-2025 que la prensa cita).
