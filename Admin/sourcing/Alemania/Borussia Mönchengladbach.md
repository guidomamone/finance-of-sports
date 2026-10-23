# Borussia Mönchengladbach

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división)
- **Entidad legal**: Borussia VfL 1900 Mönchengladbach GmbH (HRB 5742, Amtsgericht Mönchengladbach).
  **Confirmado esta sesión** (leyendo el Lagebericht 2024 completo, ver abajo): esta GmbH SÍ es la
  operadora del fútbol profesional — el propio Lagebericht dice explícitamente "Die
  Lizenzspielermannschaft der Borussia VfL 1900 Mönchengladbach GmbH ... nimmt am Spielbetrieb der
  DFL Deutsche Fußball Liga GmbH teil" y detalla plantilla, entrenador, sponsors, abonos, etc. La
  prensa alemana que describe a Mönchengladbach como uno de los clubes "sin escindir" (fútbol dentro
  del e.V.) estaba desactualizada o imprecisa para este club — la duda que había quedado abierta en
  una nota anterior de esta misma sesión queda resuelta: NO hace falta preguntarle nada al club sobre
  esto.

## Qué se bajó (sesión 2026-09-16/17)

**4 ejercicios**, `Clubes/Alemania/Borussia Mönchengladbach/`, todos Jahresabschluss individual (no
hay Konzernabschluss separado listado para este club — la GmbH no tiene subsidiarias consolidables
relevantes):

- `jahresabschluss-2024-completo.pdf` — ejercicio calendario 2024 (01.01-31.12.2024), 15 páginas.
  Incluye el Lagebericht completo del ejercicio. **Ojo con el nombre del archivo hermano**:
  `jahresabschluss-2024-aufsichtsratsbericht-nachtrag.pdf` es un depósito DISTINTO y posterior (una
  "Ergänzung"/complemento presentado el 08.03.2026), de solo 3 páginas, que trae únicamente el
  Bericht des Aufsichtsrates (informe del consejo de vigilancia) — NO el balance completo. Usar
  `jahresabschluss-2024-completo.pdf` para los datos financieros, el otro archivo es solo
  complementario/narrativo.
- `jahresabschluss-2023.pdf` — ejercicio calendario 2023, 15 páginas.
- `jahresabschluss-2022.pdf` — ejercicio calendario 2022, 16 páginas.
- `jahresabschluss-2021.pdf` — ejercicio calendario 2021, 16 páginas.

## Verificación hecha en esta sesión

`pdftotext` del Lagebericht 2024 confirma entidad, período, Geschäftsführung (Rolf Königs hasta
19/3/2024, Stephan A. C. Schippers hasta 31/7/2024, Roland Virkus, Markus Aretz; desde 1/1/2025 Dr.
Stefan Stegemann como CEO), auditor (KPMG AG Wirtschaftsprüfungsgesellschaft, Essen, dictamen sin
salvedades del 6/3/2025), y un Jahresfehlbetrag (pérdida) de 2,4 millones de euros para el ejercicio
2024. Sponsors: Reuter Europe GmbH (principal desde 1/7/2024), Puma SE (equipamiento desde 2018).

## Gotcha de esta sesión: cada ejercicio reciente tiene MÚLTIPLES depósitos, hay que elegir el correcto

Unternehmensregister lista, para el mismo Geschäftsjahr, varios documentos con el mismo texto de
enlace ("Jahresabschluss zum Geschäftsjahr vom ... bis zum ...") pero contenido y tamaño MUY
distintos: el depósito original completo (balance + GuV + Anhang + Lagebericht + dictamen, ~15-16
páginas) y uno o más "Ergänzung"/"Berichtigung" posteriores que solo agregan o corrigen una pieza
puntual (ej. el informe del consejo de vigilancia, 3 páginas). El de mayor tamaño de bytes en la
respuesta de la API de descarga es una señal confiable de cuál es el completo — verificar igual con
`pdftotext` antes de dar por buena la descarga.

## Serie disponible sin bajar

Unternehmensregister confirma Jahresabschluss desde **2006** (21 páginas de resultados) — quedan sin
bajar los ejercicios 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008,
2007 y 2006 (15 años más), no bajados por priorización de tiempo dentro de esta sesión. Mismo
procedimiento que los 4 ya bajados.

## Carga a `data/de/monchengladbach-de-data.js` (sesión 2026-09-25)

Cargados los 2 ejercicios más recientes YA BAJADOS: 2023 (`jahresabschluss-2023.md`) y 2024
(`jahresabschluss-2024-completo.md`) — se usó el archivo `-completo`, NO el
`-aufsichtsratsbericht-nachtrag` (confirmado: es el informe narrativo del consejo de vigilancia, no
el balance, tal cual ya decía la nota de arriba). Color de marca: `#00963A` (verde, footylogos.com),
verificado 2026-09-25.

Ejercicio CALENDARIO (01/01-31/12), a diferencia del resto de los clubes alemanes ya cargados
(01/07-30/06) — usa `fxRef` contra `EUR@2023-12-31`/`EUR@2024-12-31` (ya existían en `FX_CLOSE`).

**La tabla de GuV de los 2 ejercicios llegó INCOMPLETA en la transcripción** (saltan varias filas
completas: Umsatzerlöse, Sonstige betriebliche Erträge, Abschreibungen, Sonstige betriebliche
Aufwendungen, resultado financiero y Steuern vom Einkommen no sobrevivieron como filas de tabla).
Se reconstruyó cruzando el Lagebericht (que narra el movimiento interanual de cada partida en TEUR)
y el Konzern-Anlagenspiegel (que sí sobrevivió completo, con la columna "Abschreibung des
Geschäftsjahres" separando Spielerwerte de Sachanlagen/Konzessionen). Quedó una duda real sin
resolver — la separación entre "Sonstige betriebliche Erträge" y el resultado financiero neto (ver
comentario de cabecera de `data/de/monchengladbach-de-data.js` y `Admin/dudas-por-club.md`).

Quedan 2 ejercicios ya bajados sin cargar (2021, 2022) y 15 años más sin bajar (2006-2020, ver
sección de arriba).

## Chequeo 2026-10-18 (revisión mensual): ejercicio 2025

- Unternehmensregister y Bundesanzeiger no respondieron (timeout desde la terminal y desde el navegador): reintentar.
- El ejercicio 2025 EXISTE: el CEO Stefan Stegemann presentó las cifras en la asamblea de socios de abril de 2026 (pérdida después
  de impuestos de 3,9 M EUR; Sky: ingresos 189,31 M EUR). Prensa, solo como confirmación, no se carga:
  https://sport.sky.de/fussball/artikel/rainer-bonhof-bricht-bei-jahreshauptversammlung-angesichts-der-lage-von-borussia-moenchengladbach-in-traenen-aus/13537304/34943
  y https://www.flashscore.de/news/fu-ball-bundesliga-bundesliga-gladbach-macht-erneut-minus-umsatz-gestiegen/MZtdQrPi/
- El Jahresabschluss 2025 se busca en el Unternehmensregister (razón social «Borussia VfL 1900 Mönchengladbach GmbH»); la ley
  alemana da hasta 12 meses después del cierre para depositarlo (31/12/2026), y el club usa el plazo entero: según North Data
  (https://www.northdata.de/Borussia+VfL+1900+M%C3%B6nchengladbach+GmbH,+M%C3%B6nchengladbach/HRB+5742) el 2024 se publicó el
  20/01/2026 y el 2023 el 27/12/2024. El 2025 se espera hacia enero de 2027.
- **Qué bajar cuando aparezca:** el Jahresabschluss del ejercicio 01/01/2025-31/12/2025 (Bilanz, GuV, Anhang y, si está, el
  Bestätigungsvermerk), el depósito completo de ~15 páginas y no el del Aufsichtsrat (~3). Se guarda como
  `Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2025.pdf` y pasa a onboarding.
- Último chequeo: 2026-10-18.

## Chequeo 2026-10-21: todavía no está publicado

- `unternehmensregister.de` ahora responde (200), pero su búsqueda es un formulario con sesión (ver `paises/Alemania.md`) y no se abrió. Se miró North Data, que replica las publicaciones del registro: la lista de Jahresabschlüsse de la GmbH va de 2019 a 2024 y **no trae ninguno con cierre 31/12/2025**. `bundesanzeiger.de` redirige (302), no sirve desde la terminal.
- Sigue lo de arriba: se espera hacia enero de 2027, cuando el club use el plazo legal. Reintentar entonces, directo en el Unternehmensregister.
- Último chequeo: 2026-10-21.

- Cargado en el sitio por tools/cargar.mjs (2026-10-23): ejercicio 2022 desde `Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2022.pdf` (sourceId `monchengladbach-de-jahresabschluss-2022`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-23): ejercicio 2021 desde `Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2021.pdf` (sourceId `monchengladbach-de-jahresabschluss-2021`).
