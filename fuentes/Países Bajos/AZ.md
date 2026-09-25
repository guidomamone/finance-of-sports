# AZ (Alkmaar)

- **Deporte**: Fútbol
- **Liga / competencia**: Eredivisie (Países Bajos, 1ª división)
- **Entidad legal**: AZ Holding B.V.
- **Canal**: sitio propio, un artículo de prensa nuevo por temporada
  (`az.nl/inside-az/nieuws/<año>/<mes>/az-presenteert-jaarrekening-<ejercicio>`) con el PDF
  adjunto. Ver `fuentes/Países Bajos/_notas-generales.md` (gotcha: SPA, hubo que usar el Browser
  pane).

## Qué se bajó (sesión 2026-09-17)

**7 ejercicios, serie completa 2018/19-2024/25 sin huecos**, `Clubes/Países Bajos/AZ/`: 2018/19,
2019/20, 2020/21, 2021/22, 2022/23, 2023/24, 2024/25. Todos PDF reales.

En julio de 2025 el accionista Billy Beane vendió su 5% y Stichting AZ Alkmaar pasó a tener el
100% de las acciones — sin impacto en la entidad reportante (sigue siendo AZ Holding B.V.).

## Qué se cargó al sitio (sesión de onboarding de Países Bajos)

**2 ejercicios cargados** (los más recientes de los 7 bajados): 2023/24 y 2024/25, en
`data/az-nl-data.js` (`clubId: 'az-nl'`). Transcripciones completas vía `pdftotext -layout` en
`Clubes/Países Bajos/AZ/jaarrekening-2023-24.md` y `jaarrekening-2024-25.md`. Documento tipo
"Jaarrekening" (solo estados contables, sin memoria narrativa como Ajax/PSV/Feyenoord). Tie-out
verificado contra los 2 documentos (diferencia de EUR ~1-2 mil por redondeo de componentes,
irrelevante) y contra el motor real del sitio (`node tools/audit.js`, sin hallazgos de descuadre).
Color de marca: `#CA0008` (rojo) — footylogos.com (color-codes/az-alkmaar), verificado 2026-09-25.

Quedan 5 ejercicios sin cargar del archivo ya bajado (2018/19-2022/23) — candidato a profundizar en
una sesión futura de histórico.

## Dudas / pendientes

- Ninguna abierta de sourcing.
- Cargar los 5 ejercicios 2018/19-2022/23 ya bajados pero sin transcribir/cargar.
- Último chequeo: 2026-09-17. Carga al sitio: 2026-09-25.
