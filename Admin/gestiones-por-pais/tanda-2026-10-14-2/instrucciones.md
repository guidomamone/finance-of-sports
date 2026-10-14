# Investigar gestiones (quién condujo cada club) — instrucciones para el agente

Armado por tools/gestiones-tanda.mjs --armar (2026-10-14). Proyecto: /Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports (sitio
público de finanzas de clubes de fútbol; lo leen hinchas y periodistas: la precisión importa más que la velocidad).

## Qué hacer
Tu lote es UN club (`lote-N.json` en esta carpeta: clubId, nombre, `carpeta` con sus documentos y `cierres` = las fechas de cierre de
los ejercicios cargados). Encontrá QUIÉN CONDUCÍA EL CLUB en cada una de esas fechas, con fecha de asunción y de salida, y una fuente por
gestión.

## Criterio del país (ya decidido; no lo cambies)
Leé primero `Admin/gestiones-por-pais/<iso>.md` (iso = la clave del país en tu lote, en minúscula) y `data/gestiones/<iso>.js`: los
otros clubes del país ya cargados son el ejemplo. El formato y la regla de qué ejercicio es de qué gestión están en la cabecera de
`data/gestiones/ar.js` y en `Admin/ARQUITECTURA.md`.

## Reglas
- `desde`: fecha en que ASUMIÓ (no la de la elección o el anuncio), AAAA-MM-DD. `hasta`: fecha en que dejó el cargo, o null si sigue.
- Si la fuente da solo año o año y mes, usá día 01 (y mes 01 si solo hay año) Y decilo en la nota de esa gestión.
- `fuente`: UNA URL de donde salen las fechas (sitio oficial, Wikipedia, prensa seria). `confirmada: true` SOLO si la fuente dice esas
  fechas; si no, `confirmada: false` y explicá por qué.
- Los documentos del club (`.md` de la `carpeta`) dicen quién firma cada balance: usalos para CORROBORAR y citá archivo y línea en la nota.
  La `fuente` igual tiene que ser una URL web con las fechas.
- `corto`: el apellido como lo escribe la prensa en alfabeto latino. `nombre`: nombre completo (transliterado si hace falta).
- Cubrí TODAS las fechas de `cierres`: exactamente una gestión confirmada por cierre (desde <= cierre <= hasta).
- Si la gestión cambió entre el cierre y la aprobación del balance, avisalo en `notas` (no inventes el campo `firmo`).
- Nada de inventar: lo que no encuentres va a `dudas`. Una gestión dudosa no se publica.

## Herramientas
WebSearch y WebFetch. NO uses el navegador integrado (lo comparten otros agentes). NO edites ningún archivo salvo tu `resultado-N.json`.

## Entrega
`resultado-N.json` en esta carpeta:
{
  "criterioPais": { "<ISO>": "una o dos frases: qué figura se cargó en este club y por qué" },
  "clubes": { "<clubId>": {
    "gestiones": [ { "nombre": "...", "corto": "...", "cargo": "Presidente", "desde": "AAAA-MM-DD", "hasta": "AAAA-MM-DD" | null,
                     "fuente": "https://...", "confirmada": true } ],
    "notas": { "<nombre de la gestión>": "por qué esa persona, esa fecha y esa fuente; qué dice el balance (archivo:línea)" },
    "cubre": { "<fecha de cierre>": "<nombre>" },
    "dudas": [ "..." ] } }
}
Validá con `node tools/gestiones-tanda.mjs --validar Admin/gestiones-por-pais/tanda-2026-10-14-2` (desde la raíz del repo). Después contestá con un resumen corto: qué
cierres quedaron cubiertos y cuáles no, y por qué.
