# Porto (FC Porto)

- **Deporte**: Fútbol
- **Liga / competencia**: Primeira Liga (Portugal, 1ª división)
- **Entidad legal**: Futebol Clube do Porto – Futebol, SAD. A diferencia de Benfica y Sporting, no
  se confirmó que cotice ACCIONES en bolsa (sí coloca "Empréstimos Obrigacionistas"/bonos, con
  cupones que reporta a la CMVM) — igual publica Relatório e Contas completo por obligación de
  disclosure/licencia.
- **Canal**: sección propia `fcporto.pt/pt/clube/institucional` (pestaña "Relatório e contas"),
  gratis, sin login. Los PDF viven en un CDN propio (`files.app.fcporto.pt/docs/<hash>.pdf`) con
  nombres hasheados sin relación al contenido — hay que extraer el `href` correcto emparejando cada
  `<p>` de título con su contenedor `.club-institutional-file` (el emparejamiento ingenuo por orden
  de aparición en el DOM trae el link equivocado, ver gotcha abajo).

## Qué se bajó (sesión 2026-09-17)

**10 ejercicios, 2015/16 a 2024/25, sin huecos**, en `Clubes/Portugal/Porto/`:

- `relatorio-contas-consolidadas-2015-16.pdf` a `relatorio-contas-consolidadas-2022-23.pdf`
  (versión CONSOLIDADA cuando el sitio ofrecía las dos, individual y consolidada).
- `relatorio-contas-2019-20.pdf` (solo había versión individual ese año).
- `relatorio-contas-2023-24.pdf` y `relatorio-contas-2024-25.pdf` (solo versión individual/única
  publicada).

Páginas confirmadas con `pdfinfo`: entre 74 (2019/20) y 204 (2024/25) — todos documentos completos,
no cascarones.

**No se exploró más atrás de 2015/16** (ni CMVM ni Wayback a fondo) por tiempo — el sitio propio no
tiene navegación a ejercicios anteriores en la sección de Relatório e Contas. Pista para una sesión
futura: la CMVM aloja el "ESEF report" auditado de FC Porto (mencionado en prensa,
`fcporto.pt/pt/clube/institucional`), no se confirmó si tiene histórico más profundo que el propio
sitio.

## Gotcha de tooling (sesión 2026-09-17)

El primer intento de extraer los links con `querySelector('.club-institutional-file p')` +
"el primer `<a>` dentro del contenedor padre" trajo el MISMO link (el del primer ítem de la lista,
"Parecer Conselho Superior...") para los 17 títulos — porque el contenedor usado era demasiado
amplio (`.tab-container`, que envuelve TODA la lista, no cada fila). El fix: usar
`.club-institutional-file` mismo como la fila (cada `<div>` de esa clase tiene su propio `<p>` de
título + `<a>` de descarga adentro) y filtrar por texto de título para descartar los "Parecer
Conselho Superior" (son el dictamen, no el reporte).

## Dudas / pendientes

Confirmar si CMVM tiene ejercicios anteriores a 2015/16 para completar la serie.

- Último chequeo: 2026-09-17.
