# Países Bajos — KvK de pago, pero el mandato de licencia F.04 de la KNVB alcanza igual

La Kamer van Koophandel (KvK, el registro mercantil neerlandés) confirma el patrón de pago por
documento (€3,90/documento, tarifa 2026) — mismo grupo que Austria/Croacia/Italia, no el de
Bélgica/Dinamarca/Grecia/Noruega. Último chequeo: 2026-09-17.

- **El canal real fue el mandato de licencia F.04 de la KNVB** (la federación neerlandesa): obliga
  a cada club a publicar su jaarverslag en su propio sitio, y la KNVB mantiene un PDF-índice por
  temporada (2018/19-2024/25) con el link de cada club — mismo patrón que Croacia (mandato de la
  HNS, `paises/Croacia.md`) e Italia (licencia UEFA, `paises/Italia.md`). Con esto, ningún club de la Eredivisie
  2025/26 quedó en dead-end total, aunque varios tienen huecos de 1-3 años.
- **FC Groningen dio la serie más profunda (16 ejercicios, 2009/10-2024/25 sin huecos)**, seguido
  de NEC (12) — ninguno de los dos es el club más grande de la liga, otra confirmación de que la
  profundidad depende del canal encontrado, no del tamaño del club.
- **Varios sitios de club son SPA y no sirven nada a `curl` plano** (AZ, PSV, FC Twente, sc
  Heerenveen, NEC, Feyenoord) — hubo que usar el Browser pane con `javascript_tool` para
  renderizarlos primero.
- **Algunos clubes sirven el PDF real desde una URL sin extensión `.pdf`** (PSV, NEC) — no descartar
  un link solo porque no termina en `.pdf`, verificar el `Content-Type` de la respuesta.
- **Un club puede migrar de storage sin actualizar los links ya indexados** (Go Ahead Eagles pasó a
  un bucket de Google Cloud) — la URL vieja rompe, pero insertando el segmento de path correcto
  (`/sites/1/` en este caso) el documento sigue estando ahí. Antes de descartar un 404, probar
  variaciones simples del path.
- **No todos los clubes son BV/NV**: Heracles Almelo y FC Volendam son "Stichting" (fundación sin
  fines de lucro) — confirmar si el criterio de `club-data-mapping` aplica igual antes de mapear
  (duda abierta en `Admin/dudas-por-club.md`).
