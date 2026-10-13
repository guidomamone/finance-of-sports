# Investigar gestiones (quién condujo cada club) — instrucciones para el agente

Proyecto: /Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports (sitio público de finanzas de clubes de fútbol; lo leen
hinchas y periodistas: la precisión importa más que la velocidad).

## Qué hacer
Para cada club de tu lote (archivo `lote-N.json` en esta carpeta: clubId, nombre, y `cierres` = las fechas de cierre de los ejercicios
cargados), encontrá QUIÉN CONDUCÍA EL CLUB en cada una de esas fechas de cierre, con fecha de asunción y de salida, y una fuente por gestión.

## Reglas (son las del proyecto; no las cambies)
- `cargo`: 'Presidente'. En una sociedad (SAF en Brasil, AG/GmbH en Alemania, Ltd/plc en Inglaterra, SA, sociedades rusas o japonesas)
  se carga al DUEÑO solo si es una persona con nombre; si el dueño es un fondo, una empresa o el Estado, se carga al PRESIDENTE DEL
  CONSEJO / CHAIRMAN / 代表取締役社長 (quien firma el balance). Si en un país la figura relevante es otra, decilo en `criterioPais`.
- `desde`: fecha en que ASUMIÓ (no la de la elección), AAAA-MM-DD. `hasta`: fecha en que dejó el cargo, o null si sigue hoy (octubre 2026).
- Si la fuente da solo año o año y mes, usá día 01 (y mes 01 si solo hay año) Y decilo en la nota de esa gestión.
- `fuente`: UNA URL de donde salen las fechas (preferí: sitio oficial del club o de la liga, Wikipedia en el idioma del país, prensa
  seria). `confirmada: true` SOLO si la fuente realmente dice esas fechas; si no la confirmaste, `confirmada: false` y explicá por qué.
- `corto`: lo que va en un botón: el apellido (o como lo conoce la prensa del país).
- Cubrí TODAS las fechas de `cierres` de cada club. Si dos gestiones cambian entre el cierre y la aprobación del balance, mencionalo
  (el proyecto usa un campo `firmo`; no lo inventes, solo avisá).
- Nada de inventar: si no encontrás algo, dejalo en `dudas`. Una gestión dudosa no se publica.

## Herramientas
Usá WebSearch y WebFetch. NO uses el navegador integrado (Browser pane / mcp__Claude_Browser__*): lo comparten otros agentes.
NO edites ningún archivo del repo. Podés leer, si te sirve, `Admin/gestiones-por-pais/<iso2>.md` (criterio ya decidido para ese país,
si existe) y `data/gestiones/<iso2>.js` (ejemplos del formato).

## Entrega
Escribí UN archivo JSON en esta misma carpeta: `resultado-N.json` (N = tu número de lote), con esta forma:
{
  "criterioPais": { "BR": "una o dos frases: qué figura se cargó en este país y por qué" },
  "clubes": {
    "<clubId>": {
      "gestiones": [ { "nombre": "...", "corto": "...", "cargo": "Presidente", "desde": "AAAA-MM-DD", "hasta": "AAAA-MM-DD" | null,
                       "fuente": "https://...", "confirmada": true } ],
      "notas": { "<nombre de la gestión>": "por qué esa fecha / esa fuente; convenciones de día 01; qué dice la fuente" },
      "cubre": { "<fecha de cierre>": "<nombre de quien estaba>" },
      "dudas": [ "..." ]
    }
  }
}
Después contestá con un resumen corto: cuántos clubes quedaron cubiertos del todo, cuáles no y por qué.

## Tanda 2 (lotes 7, 8 y 9)
Cada club de tu lote trae un campo `pedido`: es lo que hay que conseguir para ese club, y manda sobre las reglas generales de arriba
(son decisiones de Guido). Antes de buscar, leé la sección "## Gestiones" de `Admin/carga-clubes/<clubId>.md`: ahí está lo que encontró
la tanda anterior (lo confirmado, lo que no y las dudas); no repitas búsquedas, completá. Entregá TODAS las gestiones del club que cubren
sus cierres (las ya confirmadas también), en el mismo formato de `resultado-N.json`.
