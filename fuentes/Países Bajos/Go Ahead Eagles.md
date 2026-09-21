# Go Ahead Eagles

- **Deporte**: Fútbol
- **Liga / competencia**: Eredivisie (Países Bajos, 1ª división)
- **Entidad legal**: Go Ahead Eagles Holding B.V.
- **Canal**: sitio propio, un artículo de prensa nuevo por temporada
  (`ga-eagles.nl/jaarcijfers-<ejercicio>-...`) con el PDF adjunto.

## Qué se bajó (sesión 2026-09-17)

**5 ejercicios**, `Clubes/Países Bajos/Go Ahead Eagles/`: 2020/21 (jaarrekening completa +
winst-en-verliesrekening resumida por separado), 2021/22, 2022/23, 2023/24, 2024/25. Todos PDF
reales.

**Huecos: 2018/19, 2019/20** — no encontrados con las búsquedas de esta sesión.

**Gotcha de tooling real**: el club migró su almacenamiento de medios a un bucket de Google Cloud
(`storage.googleapis.com/ga-eagles-media/wp-content/uploads/sites/1/...`) en algún momento
después de publicar los artículos de 2020-2024 — los links `ga-eagles.nl/wp-content/uploads/...`
que aparecían indexados en buscadores devuelven 404 hoy en el dominio propio, pero el mismo
archivo existe en el bucket insertando `/sites/1/` en el path. Ver
`fuentes/Países Bajos/_notas-generales.md`.

## Dudas / pendientes

- Reintentar 2018/19 y 2019/20 aplicando la misma transformación de URL (bucket de Google Cloud)
  antes de darlos por perdidos.
- Último chequeo: 2026-09-17.
