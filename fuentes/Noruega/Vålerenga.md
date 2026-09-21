# Vålerenga Fotball

- **Deporte**: Fútbol
- **Liga / competencia**: Eliteserien (Noruega, 1ª división)
- **Entidad legal — TRES entidades activas, el caso más complejo de los 16 clubes de esta sesión**:
  - **VÅLERENGA FOTBALL ELITE**, org.nr. 914 175 232, forma jurídica FLI. Fundada 2014-09-01. Según
    prensa/fuentes públicas (respuesta de Vålerenga a la NFF), es "el club deportivo" en sí —
    conserva la autoridad de decisión sobre membresía y actividad deportiva. Ingreso operativo NOK
    ~171,4M en 2025 — el mayor de las tres.
  - **VÅLERENGA FOTBALL AS**, org.nr. 986 531 386, forma jurídica AS. Fundada 2004-01-27. Tiene el
    derecho de explotar toda o parte de la actividad COMERCIAL del club y cubre eventuales déficits
    — es la sociedad comercial/inversora, no "el club" en el sentido deportivo. Ingreso operativo
    NOK ~99,8M en 2025.
  - **VÅLERENGA FOTBALL**, org.nr. 968 218 743, forma jurídica FLI. Fundada 1913-07-29 — el paraguas
    histórico más amplio (incluye fútbol femenino, base, etc. además del primer equipo masculino).
    Ingreso operativo NOK ~79M en 2025.
  - (Descartadas por no ser fútbol profesional: `Vålerenga Fotball Kvinner AS` —fútbol femenino,
    perímetro distinto—, y `Stiftelsen Vålerenga Fotball Samfunn` —fundación social—.)
- **Canal**: Regnskapsregisteret, descarga directa
  `https://data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/<orgnr>/<año>`.

## Qué se bajó (sesión 2026-09-17)

`Clubes/Noruega/Vålerenga/`, las TRES entidades:

- **Vålerenga Fotball AS (986531386)**: serie COMPLETA, 18 ejercicios, 2008-2025, sin huecos —
  `aarsregnskap-valerenga-fotball-as-2008.pdf` a `...-2025.pdf`.
- **Vålerenga Fotball Elite (914175232)**: 11 ejercicios, 2015-2025, sin huecos — prácticamente
  toda su vida útil (fundada sept. 2014) — `aarsregnskap-valerenga-fotball-elite-2015.pdf` a
  `...-2025.pdf`.
- **Vålerenga Fotball, la FLI paraguas (968218743)**: 17 ejercicios, 2008-2025 con un único hueco
  en **2015** — `aarsregnskap-valerenga-fotball-parent-fli-2008.pdf` a `...-2025.pdf`.

Todos ejercicio calendario. Escaneos sin capa de texto.

## Dudas / pendientes — el caso más importante para resolver antes de cargar datos de Noruega

- **¿Cuál es el perímetro correcto a cargar al sitio?**: con tres entidades activas y de magnitud
  comparable, no alcanza con "elegir la de mayor ingreso" (criterio que funcionó para
  Viking/Sandefjord/Ålesund) — acá la prensa indica que la FLI "Elite" es el club deportivo
  propiamente dicho, pero la AS maneja lo comercial y podría concentrar ingresos por sponsors/TV
  que en otros clubes están en la misma entidad que el plantel. Candidato fuerte para
  `dudas-por-club.md`: preguntarle directo al club (o a la NFF, que ya tiene el reglamento de esta
  estructura de dos entidades) cuál es el perímetro que hay que sumar para tener "el club" completo,
  o si hace falta consolidar Elite + AS.

- Último chequeo: 2026-09-17.
