# Notas generales — Canadá

Primer barrido de Canadá, 2026-10-03 (sesión de sourcing Norteamérica). País que no tenía carpeta.

## La pregunta útil: qué figura jurídica obliga a publicar

- **Clubes de propiedad comunitaria de la CFL → SÍ publican, completo y gratis (hallazgo).** Tres de los nueve clubes de la CFL
  (Saskatchewan Roughriders, Winnipeg Blue Bombers, Edmonton Elks) son de propiedad comunitaria y
  rinden cuentas a sus accionistas con un informe anual que incluye informe del auditor independiente. Es el análogo canadiense de
  Green Bay Packers en EE.UU. (ver `fuentes/Estados Unidos/Green Bay Packers.md`), y **la CFL aloja los PDFs de sus clubes en
  `static.cfl.ca/wp-content/uploads/sites/<n>/`** (sitio 3 = Edmonton, 5 = Saskatchewan, 6 = Winnipeg; el número de sitio es de WordPress multisitio de la
  liga). Gotcha de tooling: `WebFetch` da 403 en `riderville.com`, `goelks.com` y `bluebombers.com`, pero `curl` con `User-Agent` de navegador baja tanto las páginas como los PDFs;
  y algunas páginas arman los enlaces con JavaScript (Edmonton), con lo que hay que buscarlos por la web o con un browser real. Los otros seis clubes de la CFL (Calgary, BC, Toronto, Hamilton, Montréal, Ottawa)
  son de dueños privados: **no se probaron en esta sesión**, probablemente sin disclosure.
- **MLS (Toronto FC, CF Montréal, Vancouver Whitecaps)**: la regla de `fuentes/Estados Unidos/_notas-generales.md` (liga *single-entity*, sin balance por club)
  vale también para los tres clubes canadienses de MLS; **no se probó club por club**, es extensión de la regla ya documentada. Toronto FC
  además pertenece a MLSE (ver abajo).
- **Maple Leaf Sports & Entertainment (Toronto Raptors, Maple Leafs, Toronto FC) → Rogers Communications**: Rogers lo consolida desde jul-2025 (según la ficha
  de los Raptors) y, según la prensa, prevé comprar el 25% restante en el 2.º semestre de 2026; revenue solo a nivel del conjunto: ver `fuentes/Estados Unidos/Toronto Raptors.md`
  y `Toronto Maple Leafs.md`. Los Blue Jays (Rogers 100%) tampoco se desglosan: `Toronto Blue Jays.md`.
- **Canadian Premier League (CPL)**: liga privada de clubes; **Atlético Ottawa** (filial del Atlético de Madrid) tiene cifras por la vía de las cuentas de su matriz (ver su ficha). Forge FC
  (Hamilton, mismo dueño que los Tiger-Cats), Cavalry FC, Pacific FC, Valour, York United, HFX Wanderers: **no se probaron**.
- **Registro mercantil**: no se probó el registro federal (Corporations Canada) ni los provinciales; las sociedades privadas canadienses no depositan estados anuales públicos,
  salvo emisores de valores (SEDAR+, `sedarplus.ca`), y los clubes de acá no son emisores. No verificado en esta sesión (sin intento documentado de SEDAR+).
- **NHL/NBA/MLB con sede en Canadá** (Canadiens, Oilers, Flames, Jets, Senators, Canucks): privados; no se probó ninguno. Un ángulo no explorado: los clubes con arena pública (Calgary: Event Centre financiado por la
  ciudad; Edmonton: Rogers Place) publican documentos municipales con números del contrato, no del club.

## Lo que queda pendiente (resumido en `Admin/TODO.md`)
1. Roughriders FY2022 y anteriores; Elks: verificar qué estados traen los informes de 2020-21 y 2023, bajar 2019; Blue Bombers: informes 2020 y anteriores.
2. Los otros seis clubes de la CFL y los clubes de CPL: probar sitio oficial + `static.cfl.ca` (cada club tiene su `sites/<n>`).
3. SEDAR+ para cualquier emisor canadiense relacionado (no se intentó).

- Último chequeo: 2026-10-03.
