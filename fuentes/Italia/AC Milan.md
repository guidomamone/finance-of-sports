# AC Milan

**Ángulos**: sitio oficial: agotado (`/it/club/informazioni-finanziarie`, 2017/18-2024/25) · Wayback CDX: agotado (dominio completo; 2008-2013 en `/uploads/bilancio*`) · búsqueda web: Exa · regulador/país: no aplica · barrido: 3 (Sonnet+Exa) — 2026-10-07

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: Associazione Calcio Milan S.p.A., propiedad de RedBird Capital Partners desde
  2022. No cotiza, pero publica voluntariamente una serie completa en su propio sitio.
- **Canal**: `acmilan.com/it/club/informazioni-finanziarie` ("Bilanci e Relazioni"), gratis, sin
  login. Los PDF están hospedados en un CDN de contenido (`assets-eu-01.kc-usercontent.com`), no en
  el dominio propio, pero el link sale del sitio oficial del club.

## Qué se bajó (sesión 2026-09-17)

**8 ejercicios, serie COMPLETA 2017/18-2024/25 sin huecos**, en `Clubes/Italia/AC Milan/`:
`AC-Milan-bilanci-relazioni-<ejercicio>.pdf` para cada temporada.

- **Gotcha de la página**: el acordeón "BILANCI E RELAZIONI" lista 8 años pero el HTML solo trae 2
  `<a href>` visibles a simple vista — los otros 6 están en el DOM pero no se ven hasta expandir el
  acordeón (o inspeccionarlo directo con JS: `document.querySelectorAll('a[href*=".pdf"]')` los trae
  a todos igual, sin necesidad de clickear cada año).

## Verificación hecha en esta sesión

8 PDF confirmados `PDF document` real, entre 2,5 MB y 16,8 MB.

## Dudas / pendientes

Ninguna. Serie completa desde que el club existe como S.p.A. bajo RedBird (y antes, con Elliott
Management) — no hay ejercicios anteriores a 2017/18 publicados en este canal.

- Último chequeo: 2026-09-17.

- **Color de marca**: `#E4002B` (rojo) — rossonero en rayas iguales (it.wikipedia, Associazione_Calcio_Milan: "rosso e nero"); sin desempate de la regla, elegido el rojo (el "Diavolo"); hex de footylogos (Serie A). Elegido por Claude (Guido delega el color, 2026-10-06), verificado 2026-10-06.

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2024 desde `Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.pdf` (sourceId `acmilan-it-bilanci-relazioni-2023-24`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2023 desde `Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2022-23.pdf` (sourceId `acmilan-it-bilanci-relazioni-2022-23`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2018 desde `Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2017-18.pdf` (sourceId `acmilan-it-bilanci-relazioni-2017-18`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2022 desde `Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2021-22.pdf` (sourceId `acmilan-it-bilanci-relazioni-2021-22`).

## Sesión de sourcing Italia sección 1 (2026-10-07): +6 ejercicios (dic 2008-dic 2013), total 14

Series viejas del sitio anterior, recuperadas de Wayback (CDX de dominio completo, mimetype PDF), todas con `pdfinfo` OK y título interno verificado. Cierre al **31 de diciembre** (antes del cambio a junio):

- 2008: `http://www.acmilan.com/uploads/bilancio/BilancioGruppoMilan_ACM_12-08.pdf` (snapshot 20111213083327, 202 págs) -> `AC-Milan-bilancio-gruppo-dic-2008.pdf`
- 2009: `http://www.acmilan.com/uploads/bilancio/BilancioGruppoMilan_ACM_12-09.pdf` (20141110103916, 202 págs) -> `...-dic-2009.pdf`
- 2010: `http://www.acmilan.com/uploads/club/bilancio2010/pdf/Bilancio_Gruppo_Milan_10.pdf` (20120515220657, 202 págs) -> `...-dic-2010.pdf`
- 2011: `http://www.acmilan.com/uploads/club/bilancio2011/pdf/Bilancio_gruppo_Milan_2011.pdf` (20130928180808, 156 págs; **`pdftotext` devuelve mojibake con desplazamiento de letras** ("5HOD]LRQH"), hay que transcribir con otro motor) -> `...-dic-2011.pdf`
- 2012: `.../bilancio2012/pdf/Bilancio_Gruppo_Milan_12.pdf` (20131203090521, 155 págs) -> `...-dic-2012.pdf`
- 2013: `.../bilancio2013/pdf/Bilancio_Gruppo_Milan_13.pdf` (20150402143952, 156 págs) -> `...-dic-2013.pdf`

**Huecos**: dic 2014, dic 2015, dic 2016 y el período de transición hasta el 30/06/2017 (el 2017/18 ya cargado cubre desde ahí); no hay captura de esos PDFs. La prensa (calcioefinanza) comenta el 2016 civilistico pero sin documento. **2025/26**: el club anunció cifras el 2026-09-28; la página oficial todavía lista hasta 2024-25.

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2020 desde `Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2019-20.pdf` (sourceId `acmilan-it-bilanci-relazioni-2019-20`).
