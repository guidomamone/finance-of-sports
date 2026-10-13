# VfB Stuttgart

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división)
- **Entidad legal**: VfB Stuttgart 1893 AG (HRB 750582, Amtsgericht Stuttgart), fundada noviembre
  2014, responsable del equipo profesional desde el 01/01/2017. Accionistas minoritarios: Mercedes-
  Benz Group (desde 2017), Jako AG (2022), Porsche AG (2024). Confirmado real filer (no exento) —
  varias subsidiarias pequeñas (VfB Reha-Welt Fellbach GmbH, VfB Stuttgart Arena Betriebs GmbH, VfB
  Stuttgart Beteiligungs-GmbH, VfB Reha-Welt GmbH, VfB Stuttgart Marketing GmbH, VfB Stuttgart Service
  GmbH) exentas bajo la garantía de la propia AG, mismo patrón que Werder Bremen/Eintracht Frankfurt.
- **Canal**: `unternehmensregister.de`.

## Qué se bajó (sesión 2026-09-16/17)

**2 ejercicios**, `Clubes/Alemania/VfB Stuttgart/`, ambos Konzernabschluss (consolidado, ejercicio
calendario):

- `konzernabschluss-2024.pdf` — ejercicio calendario 2024 (01.01-31.12.2024), 36 páginas.
- `konzernabschluss-2023.pdf` — ejercicio calendario 2023, 31 páginas.

## Serie disponible sin bajar

Unternehmensregister muestra 11 páginas de resultados para esta entidad — hay ejercicios anteriores a
2023 sin confirmar en detalle ni descargar, por priorización de tiempo. Mismo procedimiento que los 2
ya bajados: buscar "VfB Stuttgart 1893 AG" en `unternehmensregister.de`.

## CARGADO al sitio (sesión 2026-09-22)

**Estado: CARGADO (Ejercicios 2023, 2024).** `clubId`: `stuttgart-de`. Los dos Konzernabschluss ya
transcriptos se cargaron a `data/stuttgart-de-data.js`.

- **Período confirmado de cada ejercicio: CALENDARIO, no temporada jul-jun** (a diferencia de los
  otros 4 clubes alemanes cargados en la misma ronda). Confirmado leyendo el propio título de cada
  documento: "Konzernabschluss zum Geschäftsjahr vom 01.01.2023 bis zum 31.12.2023" y "...vom
  01.01.2024 bis zum 31.12.2024" — no es una inferencia del nombre del archivo. `fiscalYearStart`
  real: `'01-01'`.
- **FX**: EUR, sin tipo de cambio propio declarado por el documento (se revisó el Anhang completo,
  solo hay política genérica de conversión de moneda extranjera, sin un valor numérico EUR/USD
  puntual). `fxRef:'EUR@2023-12-31'` y `fxRef:'EUR@2024-12-31'` — ninguna de las dos fechas existe
  todavía en `FX_CLOSE` (`data/currency-map.js`); las agrega el orquestador de esta ronda.
- **Tie-out**: EXACTO en los dos ejercicios (diferencia de ~0,0003M EUR = ~0,0001% del total,
  100% explicada por el redondeo a miles de la propia tabla de Umsatzerlöse del Anhang — ver
  comentario de cabecera de `data/stuttgart-de-data.js` para el detalle completo con los números).
  2023: revenue 217,62M / expenses 210,07M / PAT calculado 0,679M vs. Konzernjahresüberschuss
  impreso 679.300,04 EUR. 2024: revenue 299,82M / expenses 277,88M / PAT calculado 15,44M vs.
  Konzernjahresüberschuss impreso 15.443.275,78 EUR.
- **Categorización, nota importante**: "Handel und Sonstiges" (el rubro de revenue que más creció,
  57,5M→81,1M→109,5M) mezcla merchandising con venta NETA de jugadores sin desglose exacto en el
  documento (el propio Anhang dice que el ingreso de transferencias, neto de valor contable
  residual, está "unter den Umsatzerlöse ausgewiesen" sin decir en qué renglón) — se cargó como una
  sola línea `lump_football_operations` en vez de forzar una separación aproximada. Consecuencia:
  "Venta de Jugadores" en Formato Simplificado muestra $0 para Stuttgart aunque el club vendió
  jugadores reales (Endo, Mavropanos, Sosa en 2023). Duda para `Admin/dudas-por-club.md`: pedirle a
  VfB el desglose exacto de "Handel und Sonstiges".
- **Personalaufwand**: separado en `wages_squad` (plantel profesional, cifra tomada del Lagebericht:
  71,1M en 2023, 88,7M en 2024 — narrativa redondeada a 100.000 EUR, no un renglón auditado exacto)
  y el resto (Amateur-/Jugendbereich + Verwaltung + Aushilfen mezclados sin desglose propio) a
  `other_expenses`.
- **Color de marca**: `brandColor: null` — de.wikipedia.org (infobox, verificado 2026-09-22) dice
  "Vereinsfarben: Weiß-Rot" (blanco primero, rojo como acento). Camiseta titular blanca con
  detalles rojos, mismo patrón de "camiseta blanca con acento fuerte" que River/Vélez/Sevilla/Real
  Madrid/Valencia/Once Caldas — se deja en `null` en vez de elegir rojo unilateralmente.
- **Bundesliga**: confirmado en Bundesliga en los dos cierres. 31/12/2023: el propio Lagebericht del
  balance dice "nach dem 16. Spieltag... dritter Platz in der Bundesliga" (temporada 2023/24 en
  curso). 31/12/2024: la temporada 2023/24 completa terminó con VfB Stuttgart 2° (Wikipedia,
  confirmado por WebSearch 2026-09-22), y sin descenso a mitad de temporada en el fútbol alemán,
  eso garantiza Bundesliga durante toda la temporada 2024/25 (en curso al 31/12/2024).
- **gestionId**: `wehrle` (Alexander Wehrle, Vorstandsvorsitzender confirmado por nombre en los dos
  ejercicios) — no hay "presidente" en el sentido argentino, VfB Stuttgart 1893 AG es sociedad
  anónima con Vorstand + Aufsichtsrat.

- Último chequeo: 2026-09-22.
