# Rosenborg Ballklub (RBK)

- **Deporte**: Fútbol
- **Liga / competencia**: Eliteserien (Noruega, 1ª división)
- **Entidad legal**: ROSENBORG BALLKLUB, org.nr. 935 883 571, forma jurídica **FLI**
  (Forening/lag/innretning — sin AS separada para el fútbol profesional). Fundado 1917-05-19,
  Trondheim. **"Rosenborg Ballklub Holding AS"** (org.nr. 925542253) existe pero es una sociedad de
  inversión/participaciones sin relación operativa directa con el fútbol — no se investigó a fondo,
  descartada como candidata principal.
- **Canal**: Regnskapsregisteret (Brønnøysundregistrene), descarga directa
  `https://data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/935883571/<año>` — gratis,
  sin login, `curl` directo, incluso sin necesidad de navegar la interfaz web humana
  (`virksomhet.brreg.no`), aunque esa interfaz también funciona y fue donde se descubrió el
  mecanismo por primera vez esta sesión. Ver `fuentes/Noruega/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-17)

**Serie COMPLETA, 18 ejercicios, 2008-2025, sin huecos** — el mejor resultado de profundidad
histórica de los 16 clubes de Eliteserien en esta sesión (empatado con Brann, Fredrikstad/Fotballinvest,
Molde y Sandefjord). `Clubes/Noruega/Rosenborg/`: `aarsregnskap-2008.pdf` a `aarsregnskap-2025.pdf`.

Todos ejercicio calendario. Escaneos sin capa de texto (mismo patrón que todo Companies
House/Regnskapsregisteret — pendiente de OCR).

## Verificación hecha en esta sesión

Confirmado en dos canales independientes: la interfaz humana (`virksomhet.brreg.no`, que lista un
acordeón "Årsregnskap" con un link "Innsendt årsregnskap" por año) y la descarga directa por `curl`
a la URL de "kopi" — ambos coinciden en la disponibilidad 2011-2025 vista en el acordeón de la UI,
más 2008-2010 que la UI no mostraba pero SÍ están disponibles vía descarga directa (confirmado, no
es un error: los años más viejos simplemente no aparecen en el acordeón por defecto de la interfaz
web, hay que pedirlos directo por URL).

## Dudas / pendientes

Ninguna. Serie completa, sin ambigüedad de entidad.

- Último chequeo: 2026-09-17.
