# Moreirense (Moreirense FC)

- **Deporte**: Fútbol
- **Liga / competencia**: Primeira Liga (Portugal, 1ª división)
- **Entidad legal**: Moreirense Futebol Clube – Futebol, SAD. No cotiza.
- **Canal**: sitio propio (`moreirensefc.pt`), sección "Institucional" — pero los PDF en sí NO
  viven en el propio dominio, están embebidos como flipbooks de **Heyzine** (servicio externo de
  "PDF to flipbook").

## Qué se bajó (sesión 2026-09-17)

**4 ejercicios consecutivos: 2021/22, 2022/23, 2023/24, 2024/25**, sin huecos, en
`Clubes/Portugal/Moreirense/`.

## Gotcha de tooling (sesión 2026-09-17)

**Nuevo patrón para el proyecto: un club puede alojar su Relatório e Contas como un "flipbook"
de Heyzine en vez de un link directo a PDF** — la página institucional del club (rescatada de
Wayback porque la actual está 404) linkea a `heyzine.com/flip-book/<hash>.html`, que es un visor
de imagen página-por-página, no el documento. El PDF real está escondido en el HTML del visor,
en dos rutas (`cdnm.heyzine.com/files/uploaded/<hash>.pdf` y `.../files/toc/<hash>.pdf`, esta
última solo el índice) — se extrae con
`document.documentElement.outerHTML.match(/https?:\/\/[^"'\s]+\.pdf/gi)` en la consola del visor.
Si en el futuro aparece otro club portugués (o de cualquier país) que use Heyzine u otro servicio de
flipbook para "publicar" su balance, este es el patrón a repetir.

## Dudas / pendientes

Ninguna sobre el canal. Serie completa desde el primer ejercicio publicado por el club.

- Último chequeo: 2026-09-17.

Color de marca: #008000 — infobox de en.wikipedia (kit local: mangas verdes, cuerpo blanco; camiseta verde y blanca axadrezada según pt.wikipedia; el otro color es blanco, gana el verde), verificado 2026-10-09.

- Cargado en el sitio por tools/cargar.mjs (2026-10-15): ejercicio 2022 desde `Clubes/Portugal/Moreirense/relatorio-contas-2021-22.pdf` (sourceId `moreirense-pt-relatorio-contas-2021-22`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-15): ejercicio 2025 desde `Clubes/Portugal/Moreirense/relatorio-contas-2024-25.pdf` (sourceId `moreirense-pt-relatorio-contas-2024-25`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-15): ejercicio 2022 desde `Clubes/Portugal/Moreirense/relatorio-contas-2021-22.pdf` (sourceId `moreirense-pt-relatorio-contas-2021-22`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-15): ejercicio 2025 desde `Clubes/Portugal/Moreirense/relatorio-contas-2024-25.pdf` (sourceId `moreirense-pt-relatorio-contas-2024-25`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-15): ejercicio 2025 desde `Clubes/Portugal/Moreirense/relatorio-contas-2024-25.pdf` (sourceId `moreirense-pt-relatorio-contas-2024-25`).
