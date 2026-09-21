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
