# FK Austria Wien

- **Deporte**: Fútbol
- **Liga / competencia**: ADMIRAL Bundesliga (Austria, 1ª división)
- **Entidad legal**: `FK Austria Wien AG` (FN 304742a, Landesgericht Wien), Horrplatz 1, 1100 Wien.
  Constituida 29/01/2008. Es la ÚNICA Aktiengesellschaft de las 12 de la Bundesliga austríaca — el
  resto son GmbH. Stichtag Jahresabschluss: 30.6.
- **Canal**: sin PDF propio descargable confirmado (ver abajo) — la fuente real son notas de prensa
  propias con las cifras en texto, más el agregado de la ÖFBL (`fuentes/Austria/
  _notas-generales.md` sección 2).

## Qué se bajó

**Nada todavía** — no se encontró ningún PDF real descargable de Austria Wien en esta sesión. Se
probaron:

1. `fk-austria.at/news/gesch%C3%A4ftsbericht-zahlen-download-viola-tv` (encontrada por búsqueda):
   la nota (de 2020) linkea a `http://www.fk-austria.at/fileadmin/redaktion/downloads/2020_21/
   Geschaeftsbericht2020_Austria-Wien.pdf` — la URL devuelve el HTML del sitio actual (404 silencioso,
   sin redirect explícito, ni `curl` ni el browser lo resuelven como PDF). Se chequeó Wayback Machine
   (`web.archive.org`) para esa misma URL: sin snapshot disponible. Dead-end para el ejercicio
   2019/20 en formato PDF propio.
2. No se encontró ninguna sección de tipo "Transparenz"/"Geschäftsbericht Archiv" con más años en
   `fk-austria.at` — a diferencia de Rapid, Austria Wien no mantiene un archivo histórico de
   Geschäftsberichte como PDF.

**Lo que SÍ hay, con cifras reales pero como texto de noticia (no PDF)**: el club publica cada año
una nota de prensa "Unsere Finanzkennzahlen <ejercicio>" en `fk-austria.at/news/...` con Bilanzdaten
(Anlage-/Umlaufvermögen, Eigenkapital, Fremdkapital) y GuV (Erträge, Personalaufwand, Jahresergebnis
nach Steuern, pagos a agentes) — confirmado para:

- 2023/24 (stichtag 30.06.2024): `fk-austria.at/news/unsere-finanzkennzahlen-2023-24` — Jahresergebnis
  +€11,24M (efecto único de reestructuración de financiamiento), Eigenkapital mejoró de -€20,66M a
  -€9,42M, Fremdkapital bajó a €59,44M.
- 2022/23 (cifras dadas entre paréntesis en la misma nota, comparativo): Eigenkapital -€20,66M,
  Jahresergebnis -€6,85M.
- 2021/22: `fk-austria.at/news/stellungnahme-zu-den-finanzkennzahlen-2021-22` (no leída en detalle
  esta sesión, pendiente si se retoma el club).

Estas cifras coinciden en estructura con las columnas de la tabla agregada de la ÖFBL (que además ya
las tiene tabuladas para 2017/18-2024/25 sin necesitar visitar cada nota de prensa individual, ver
`_Bundesliga-Finanzkennzahnen` — ver nota abajo sobre el nombre real de la carpeta).

## Verificación hecha en esta sesión

Confirmado en Firmenbuch (vía `evi.gv.at/f/304742a`, gratis, sin login): razón social exacta
`FK Austria Wien AG`, Rechtsform Aktiengesellschaft, Stichtag 30.6., depósitos de Jahresabschluss
("JAb eingereicht") registrados en agosto 2026, mayo 2025 y octubre 2024 — confirma que la sociedad
deposita su Jahresabschluss todos los años sin excepción, pero el documento en sí está bloqueado por
el muro de pago+login de `justizonline.gv.at` (ver `_notas-generales.md` sección 1).

## Duda / pendiente

No se pudo confirmar si Austria Wien alguna vez publicó un Geschäftsbericht completo como PDF
descargable más allá del intento fallido de 2019/20 (link roto, sin snapshot). Si una sesión futura
quiere profundizar, valdría la pena escribirle al club directamente preguntando si existe un archivo
histórico de Geschäftsberichte descargables — candidato para `dudas-por-club.md`.

- Último chequeo: 2026-09-17.
