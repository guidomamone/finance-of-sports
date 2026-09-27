# All Boys

**Ángulos**: sitio oficial: agotado (todos los posts de asamblea 2015-2025 revisados individualmente
vía wp-json, ninguno adicional con PDF/Drive) · Wayback CDX: agotado (0 PDFs archivados en el dominio,
reconfirmado) · búsqueda web: agotado (sin resultados nuevos) · regulador/país: no aplica — 2026-09-26

- **Presentación de la Asamblea General Ordinaria de octubre 2024 — ENCONTRADA 2026-09-22, pero NO
  es un balance.** `caallboys.com.ar/asamblea_181024.pdf` (16 págs, 17 MB), descargada en
  `Clubes/Argentina/All Boys/asamblea-general-ordinaria-2024-presentacion.pdf`. Es un **reporte
  infográfico** al estilo del "Asamblea Social 2024" de Talleres: casi todo son imágenes, el texto
  extraíble son títulos y cifras sueltas de inversión (infraestructura $125 M jul-2023 a jul-2024,
  estadio $52 M, jardín maternal $45 M, Alboshop $6,3 M, sistema de socios $14,3 M) más una tabla de
  gestión legal (juicios en trámite/finalizados, montos con sentencia 2020 vs. 2024). Tiene una
  lámina "EVOLUCIÓN BALANCES 2020-2024" pero es un gráfico como imagen, sin filas de Estado de
  Recursos y Gastos. **No es cargable como ejercicio**; guardado igual porque es el primer documento
  financiero propio del club que aparece.
  - Cómo se llegó: el PDF NO está linkeado como `<a href>`; está embebido en el post
    `caallboys.com.ar/2024/10/18/aprobacion-por-unanimidad-se-realizo-la-asamblea-general-ordinaria/`
    dentro de un `<iframe src="https://docs.google.com/gview?url=https://caallboys.com.ar/
    asamblea_181024.pdf&embedded=true">`. **Un grep de `href.*\.pdf` sobre el HTML no lo encuentra**:
    hay que buscar también `src=` y desenvolver el parámetro `url=` del visor de Google. Mismo
    patrón que ya se documentó para Brasil (iframe con `data-src` a `docs.google.com/viewer`).
- Sitio oficial: caallboys.com.ar (confirmado real, no fan site). No tiene sección
  "transparencia"/"balance"; los documentos cuelgan de posts de asamblea, uno por año.
- Pendiente: los balances reales de todos los ejercicios. Lo probado y fallido esta sesión:
  (1) probar nombres análogos en la raíz del dominio (`asamblea_2023.pdf`, `asamblea_281023.pdf`,
  `asamblea2023.pdf`, `balance.pdf`, `balance2024.pdf`, `memoria.pdf`, `memoriaybalance.pdf`,
  `asamblea_2025.pdf`): los 8 dan 404 — el patrón `asamblea_<ddmmyy>.pdf` depende de la fecha exacta
  de cada asamblea, así que hay que sacarlo del post, no adivinarlo; (2) el índice de Wayback
  Machine del dominio no tiene NINGÚN PDF archivado; (3) el post de 2022
  ("Ya se encuentra a disposición de los socios y socias el Balance") confirma que el balance existe
  pero dice explícitamente que está *a disposición de los socios* (en la sede), sin adjuntarlo.
- Contacto: formulario en caallboys.com.ar/contacto/, articulacionbarrial@caallboys.com.ar, tel.
  15-5464-6110, sede Estadio Islas Malvinas, Floresta, CABA.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — barrido completo de posts de asamblea 2015-2025, nada nuevo

- `wp-json/wp/v2/search` sobre `caallboys.com.ar` con 4 términos (`balance`, `memoria y balance`,
  `estados contables`, `asamblea`) trajo el listado completo de posts de convocatoria/asamblea desde
  2015 hasta la más reciente, **agosto de 2025** ("Convocatoria de socias y socios: Asamblea ordinaria
  y elecciones de Autoridades", 18/08/2025) — o sea que sí hay un ejercicio más reciente que el ya
  cargado (oct. 2024).
- Se revisó el HTML de los 6 posts de asamblea/convocatoria más relevantes (2025, 2024×2, 2023×2,
  2022, 2021) buscando `href`/`src` a `.pdf`, `drive.google.com` y `gview?url=` (el patrón con el que
  se había encontrado el PDF de oct-2024, que NO aparece con un simple grep de `href.*\.pdf`). **Los 6
  solo tienen el link al `protocoloprevencion.pdf` del footer del sitio** (protocolo de violencia de
  género, no financiero) — ninguno repite el patrón de iframe embebido con el balance/presentación.
- No se encontró una versión mejor ni un documento separado del balance real para ningún ejercicio: el
  PDF de oct-2024 sigue siendo el único documento financiero propio del club en el sitio, y sigue
  siendo un reporte infográfico sin Estado de Recursos y Gastos tabulado (ver la entrada de
  septiembre).
- Wayback CDX del dominio completo: reconfirma 0 PDFs archivados nunca (ni siquiera el de oct-2024,
  que solo vive embebido vía Google Docs viewer, nunca como URL propia indexada).
- Búsqueda web dirigida: sin resultados nuevos.
- **Conclusión: no hay nada más que sourcear en el sitio oficial para este club por ahora.** Hubo
  además elecciones de autoridades el 18/10/2025 (ganó Christian Giménez, agrupación Pasión Blanca y
  Negra, 59,2% de los votos — crónica revisada letra por letra, sin PDF/Drive adjunto tampoco):
  cambio de comisión directiva reciente a tener en cuenta para un futuro mail (nuevo interlocutor).
  La convocatoria de esa asamblea (18/08/2025) no menciona explícitamente "Memoria y Balance" en el
  fragmento recuperado — no queda claro si el ejercicio 2024-25 se trató ahí o si sigue pendiente.
  Vale la pena revisar de nuevo si el club publica una crónica del punto contable de esa asamblea.
- Último chequeo: 2026-09-26.
