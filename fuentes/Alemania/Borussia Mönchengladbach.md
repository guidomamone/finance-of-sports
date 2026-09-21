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

- Último chequeo: 2026-09-17.
