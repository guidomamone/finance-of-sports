# Fiorentina (ACF Fiorentina)

**Ángulos**: sitio oficial: agotado (los 2 últimos como PDF; el resto en la cuenta oficial `issuu.com/acffiorentina`) · Wayback CDX: agotado (el único bilancio es el 2023/24 ya guardado) · búsqueda web: Exa (sin el 2022/23) · regulador/país: no aplica · barrido: 3 (Sonnet+Exa) — 2026-10-07


- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: ACF Fiorentina S.r.l. (hasta hace pocos años, S.p.A.), propiedad de Rocco
  Commisso (Mediacom). No cotiza.
- **Canal**: `acffiorentina.com/en/bilanci-e-relazioni`, gratis, sin login.

## Qué se bajó (sesión 2026-09-17)

**2 ejercicios**, en `Clubes/Italia/Fiorentina/`: `Fiorentina-bilancio-2023-24.pdf` y
`Fiorentina-bilancio-2024-25.pdf`.

- **La página oficial solo lista los 2 ejercicios más recientes** — no es un archivo histórico
  completo como el de Genoa o Parma. Ejercicios 2020/21 y 2021/22 existen (confirmados por prensa y
  por copias en la cuenta oficial de Issuu del club, `issuu.com/acffiorentina`) pero Issuu es un
  visor, no ofrece descarga directa del PDF sin cuenta — no se bajaron en esta sesión, quedan
  documentados acá como candidato de fuente secundaria oficial (es la cuenta del propio club, no un
  mirror de terceros) si se quiere completar el histórico más adelante.

## Verificación hecha en esta sesión

2 PDF confirmados `PDF document` real, 6,9 MB y 5,9 MB.

## Dudas / pendientes

Si vale la pena bajar 2020/21 y 2021/22 desde Issuu (requiere lidiar con el visor, no un link directo
a PDF) — candidato menor, no crítico dado que ya hay 2 ejercicios recientes cargables.

- Último chequeo: 2026-09-17.

## Sesión de sourcing Italia (2026-10-03): sin ejercicios nuevos, total 2 — hay 5 más pero solo como visor Issuu

El snapshot del 2020-10-20 de `acffiorentina.com/it/club/documenti-societari/bilanci-e-relazioni`
trae un JSON con los iframes de Issuu de la cuenta oficial `issuu.com/acffiorentina`: "Bilancio e
Consolidato 2018" (`e.issuu.com/embed.html#37847377/69232617`) y "Bilancio e Consolidato 2019"
(`acf_-_bilancio_consolidato_31.12.2019__ita_`); y el de 2024-11 el 30/06/2024
(`acf_fascicolo_bilancio_30.06.24_definitivo_-_co`). La nota previa suma 2020/21 y 2021/22.
Issuu no ofrece descarga sin cuenta (la página de lectura no expone ningún link; solo
`publicationId`). **No se tocó**: reconstruir el PDF a partir de las imágenes del visor excede el
alcance de este sourcing y se deja como decisión de Guido (o mail al club, que tiene los fascicoli).

## 2ª tanda (2026-10-03): +3 ejercicios desde Issuu, total 5 (decidido por Guido)

El lector público de Issuu publica las páginas como JPG (`reader3.isu.pub/<usuario>/<slug>/reader3_4.json` → `image.isu.pub/.../page_N.jpg`, ~1059×1497 px). Se armó un PDF por documento con las imágenes (script en el scratchpad, `Pillow`), **sin capa de texto: hay que OCR**. Documentos de la cuenta oficial `acffiorentina`:
- `acf_-_bilancio_consolidato_31.12.2019__ita_` (98 págs, publicado 2020-05-27) → `Fiorentina-bilancio-consolidato-2019-issuu.pdf` (consolidado al 31/12/2019, ejercicio calendario).
- `acf_fascicolo_bilancio_30.06.2021_-con_foto_e_rel` (92 págs, publicado 2022-04-19) → `Fiorentina-bilancio-2020-21-issuu.pdf` (al 30/06/2021: el club pasó de dic a jun; **revisar la duración del ejercicio al transcribir**).
- `acf_fascicolo_bilancio_30.06.2022-_con_relazioni` (90 págs, publicado 2022-12-06) → `Fiorentina-bilancio-2021-22-issuu.pdf`.
OCR de las primeras páginas confirma las fechas de cierre. El de 2024 de Issuu (`..30.06.24_definitivo_-_co`) es el mismo ejercicio que ya teníamos como PDF. **Falta 2018** (embed viejo `#37847377/69232617`, sin slug localizable) y 2020 (no aparece en la cuenta). Calidad: es una reconstrucción desde imágenes web de ~130 dpi, no el PDF original: marcar así en la transcripción.

- **Color de marca**: `#61358B` (violeta) — "viola" (it.wikipedia, ACF_Fiorentina); hex de footylogos. Elegido por Claude (Guido delega el color, 2026-10-06), verificado 2026-10-06.

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2025 desde `Clubes/Italia/Fiorentina/Fiorentina-bilancio-2024-25.pdf` (sourceId `fiorentina-it-bilancio-2024-25`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2024 desde `Clubes/Italia/Fiorentina/Fiorentina-bilancio-2023-24.pdf` (sourceId `fiorentina-it-bilancio-2023-24`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2022 desde `Clubes/Italia/Fiorentina/Fiorentina-bilancio-2021-22-issuu.pdf` (sourceId `fiorentina-it-bilancio-2021-22-issuu`).

## Sesión de sourcing Italia sección 1 (2026-10-07): sin ejercicios nuevos

Huecos: 2022/23 (30/06/2023) y 2018: no aparecen ni en Issuu (`issuu.com/acffiorentina/docs/` lista 2021, 2022 y 2024) ni en Wayback ni por Exa (solo prensa).
