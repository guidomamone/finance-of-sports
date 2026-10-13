# FC Luzern

- **Deporte**: Fútbol
- **Liga / competencia**: Super League (Suiza, 1ª división)
- **Entidad legal**: FC Luzern-Innerschweiz AG (sede Lucerna).
- **Canal**: sitio propio, antes con posts individuales en `fcl.ch/publication/geschaeftsbericht-<año>/`
  (WordPress). El sitio se migró recientemente a una SPA nueva — **todas esas URLs viejas devuelven
  ahora un 404 o redirigen a `/news/`**, así que hubo que reconstruir los links reales desde snapshots
  de Wayback Machine de las páginas viejas. El path de archivos de WordPress
  (`fcl.ch/wp-content/uploads/<año>/<mes>/...`) **sigue respondiendo 200 en el dominio vivo**, pero la
  SPA nueva devuelve su propio `index.html` para cualquier ruta no reconocida — un chequeo de status
  code 200 con `curl` NO alcanza para confirmar que el PDF sigue ahí, hay que revisar que el
  `Content-Type`/contenido sea realmente un PDF. En este caso los 7 PDF ya no están accesibles en vivo
  por ese path (todos devolvieron el HTML de la SPA) — la descarga real vino de Wayback Machine.

## Qué se bajó (sesión 2026-09-17)

**7 documentos, `Clubes/Suiza/Luzern/`**, cubriendo **7 ejercicios consecutivos (2017/18-2024/25)**
— el primer Geschäftsbericht publicado por el club fue justamente el de 2017/18 (confirmado por la
numeración de prensa: "el 8º informe" en 2024/25, "el 7º" en 2023/24, etc., contando desde 2017/18
como el 1º):

- `geschaeftsbericht-2017-18.pdf`, `-2018-19.pdf`, `-2019-20.pdf`, `-2021-22.pdf`, `-2022-23.pdf`,
  `-2023-24.pdf`, `-2024-25.pdf` — todos vía Wayback Machine, snapshots de las URLs de
  `wp-content/uploads/` encontradas en snapshots antiguos de las páginas `/publication/`.

**Gotcha de Wayback confirmado en esta descarga**: el archivo de 2022/23 vino truncado en el primer
intento (1.048.576 bytes exactos, `pdfinfo` con "Invalid XRef entry"/"Couldn't read xref table") — la
CDX API (`web.archive.org/cdx/search/cdx?url=...`) mostró 4 snapshots de la misma URL con tamaños muy
distintos (~1 MB, ~21 MB, ~22 MB, ~3 MB); el snapshot de 2024-02-17 (21 MB reportados, 31,6 MB
descargados) resultó el completo, verificado con `pdfinfo` (31 páginas, sin errores). Si un PDF de
Wayback da error de xref/trailer, probar OTROS snapshots de la misma URL antes de descartarlo — no es
necesariamente el documento real el que está corrupto.

## Verificación

`pdfinfo` sin errores en los 7 archivos finales (56, 60, 60, 60, 31, 54 y 48 páginas respectivamente).

- Último chequeo: 2026-09-17.
