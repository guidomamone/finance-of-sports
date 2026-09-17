# Fredrikstad Fotballklubb (FFK)

- **Deporte**: Fútbol
- **Liga / competencia**: Eliteserien (Noruega, 1ª división) — ascendido para la temporada 2026.
- **Entidad legal — DOS entidades relevantes, mismo patrón que Manchester City/holding separada**:
  - **FREDRIKSTAD FOTBALLINVEST AS**, org.nr. 979 111 576 (nombre histórico: "Fredrikstad
    Fotballklubb Sport ASA"), forma jurídica AS, næringskode "Sportsaktiviteter ikke nevnt annet
    sted". Fundada 1997-06-12. Es la entidad que sigue depositando cuentas hoy (`sisteInnsendteAarsregnskap`:
    2025) y la que tiene la serie completa — parece ser el vehículo real de la operación del fútbol
    profesional, no solo un vehículo de inversión de accionistas como sugiere su nombre.
  - **FREDRIKSTAD FOTBALLKLUBB**, org.nr. 837 623 502, forma jurídica FLI (el club-asociación
    matriz, fundado 1903-04-07). Dejó de depositar cuentas después de 2018
    (`sisteInnsendteAarsregnskap`: 2018) — coincide con los años del club en categorías inferiores
    tras problemas financieros históricos.
- **Canal**: Regnskapsregisteret (Brønnøysundregistrene), descarga directa
  `https://data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/<orgnr>/<año>`. Ver
  `fuentes/Noruega/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-17)

`Clubes/Noruega/Fredrikstad/`:

- **Fredrikstad Fotballinvest AS (979111576)**: serie COMPLETA 18 ejercicios, 2008-2025, sin
  huecos — `aarsregnskap-fotballinvest-as-2008.pdf` a `...-2025.pdf`.
- **Fredrikstad Fotballklubb FLI (837623502)**: 7 ejercicios, 2012-2018 —
  `aarsregnskap-fotballklubb-fli-2012.pdf` a `...-2018.pdf`. Se superponen en años con la serie de
  Fotballinvest AS (ambas entidades depositaron en paralelo 2012-2018).

Todos ejercicio calendario. Escaneos sin capa de texto.

## Dudas / pendientes

- **¿Cuál es el perímetro correcto para cargar al sitio?**: no se confirmó en esta sesión si
  Fotballinvest AS consolida TODA la actividad del fútbol profesional (jugadores, estadio, etc.) o
  si es un vehículo financiero paralelo a la FLI que también tiene alguna actividad propia — antes
  de cargar datos, conviene abrir (post-OCR) un ejercicio donde ambas entidades coexisten
  (2012-2018) y comparar cifras para entender la relación entre las dos.

- Último chequeo: 2026-09-17.
