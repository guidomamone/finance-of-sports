# PSV

- **Deporte**: Fútbol
- **Liga / competencia**: Eredivisie (Países Bajos, 1ª división)
- **Entidad legal**: PSV N.V.
- **Canal**: sitio propio, página de archivo dedicada `psv.nl/club/organisatie/
  archief-psv-jaarverslag` (además de la página del ejercicio más reciente,
  `psv.nl/club/organisatie/jaarverslag`). Ver `fuentes/Países Bajos/_notas-generales.md`
  (gotcha de tooling: SPA, y las URLs de descarga no terminan en `.pdf`).

## Qué se bajó (sesión 2026-09-17)

**9 ejercicios, serie completa 2016/17-2024/25 sin huecos**, `Clubes/Países Bajos/PSV/`:
2016/17, 2017/18, 2018/19, 2019/20, 2020/21, 2021/22, 2022/23, 2023/24, 2024/25. Todos PDF reales
bajados desde `psv.nl/media/artikel/<slug>` (Content-Type `application/pdf`, sin extensión visible
en la URL).

La propia página de archivo dice explícitamente que cubre "tot en met het seizoen 2022-2023" en
el sitio oficial — series más viejas (pre-2016/17) no están enlistadas ahí, no se buscaron fuera
de esa página en esta sesión.

## Qué se cargó al sitio (sesión de onboarding de Países Bajos)

**2 ejercicios cargados** (los más recientes de los 9 bajados): 2023/24 y 2024/25, en
`data/psv-nl-data.js` (`clubId: 'psv-nl'`). Transcripciones completas vía `pdftotext -layout` en
`Clubes/Países Bajos/PSV/jaarverslag-2023-24.md` y `jaarverslag-2024-25.md`. Tie-out verificado
exacto contra los 2 documentos y contra el motor real del sitio (`node tools/audit.js`, sin
hallazgos de descuadre). A diferencia de Ajax, PSV desglosa el resultado de transferencias en sus 3
componentes brutos (Vergoedingssommen/Afschrijving/Bijzondere waardeverminderingen), así que se
cargó como líneas propias (`player_sales`/`player_amortisation`/`player_impairment`) en vez de un
neto en meta. Color de marca: `#ED1C24` (rojo) — footylogos.com (color-codes/psv-eindhoven),
verificado 2026-09-25.

Quedan 7 ejercicios sin cargar del archivo ya bajado (2016/17-2022/23) — candidato a profundizar en
una sesión futura de histórico.

## Dudas / pendientes

- Ninguna abierta de sourcing. Buen resultado, sin gaps en el rango cubierto.
- Cargar los 7 ejercicios 2016/17-2022/23 ya bajados pero sin transcribir/cargar.
- Último chequeo: 2026-09-17. Carga al sitio: 2026-09-25.
