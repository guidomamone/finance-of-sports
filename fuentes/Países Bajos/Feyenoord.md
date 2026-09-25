# Feyenoord

- **Deporte**: Fútbol
- **Liga / competencia**: Eredivisie (Países Bajos, 1ª división)
- **Entidad legal**: Feyenoord Rotterdam N.V.
- **Canal**: sitio propio, página dedicada `feyenoord.com/nl/de-club/organisatie/jaarverslagen`
  con los 7 ejercicios más recientes listados juntos. Ver
  `fuentes/Países Bajos/_notas-generales.md` (gotcha de tooling: SPA, hubo que usar
  `javascript_tool` para extraer los `href` reales — la mayoría sirve desde `cdn.sanity.io`, el
  ejercicio 2023/24 desde `dam.feyenoord.nl`).

## Qué se bajó (sesión 2026-09-17)

**7 ejercicios, serie completa 2018/19-2024/25 sin huecos**, `Clubes/Países Bajos/Feyenoord/`:
2018/19, 2019/20, 2020/21, 2021/22, 2022/23, 2023/24, 2024/25. Todos PDF reales.

La página propia no lista nada anterior a 2018/19 — no se buscó fuera de esa página en esta
sesión.

## Qué se cargó al sitio (sesión de onboarding de Países Bajos)

**2 ejercicios cargados** (los más recientes de los 7 bajados): 2023/24 y 2024/25, en
`data/feyenoord-nl-data.js` (`clubId: 'feyenoord-nl'`). Transcripciones completas vía `pdftotext
-layout` en `Clubes/Países Bajos/Feyenoord/jaarverslag-2023-24.md` y `jaarverslag-2024-25.md`.
Tie-out verificado exacto contra los 2 documentos y contra el motor real del sitio (`node
tools/audit.js`, sin hallazgos de descuadre). Color de marca: `#FF0000` (rojo) — footylogos.com
(color-codes/feyenoord), verificado 2026-09-25.

Quedan 5 ejercicios sin cargar del archivo ya bajado (2018/19-2022/23) — candidato a profundizar en
una sesión futura de histórico.

## Dudas / pendientes

- La línea "Partnerships, business seats, units en boarding" de Netto-omzet (45,2M€ en 2024/25,
  ~20% del ingreso) mezcla sponsors/publicidad de valla (comercial) con paquetes de temporada
  premium (estadio) sin que el documento la desglose — se cargó entera como
  `sponsorship_commercial` (ver comentario de cabecera de `data/feyenoord-nl-data.js`). Anotado en
  `Admin/dudas-por-club.md`.
- Cargar los 5 ejercicios 2018/19-2022/23 ya bajados pero sin transcribir/cargar.
- Último chequeo: 2026-09-17. Carga al sitio: 2026-09-25.
