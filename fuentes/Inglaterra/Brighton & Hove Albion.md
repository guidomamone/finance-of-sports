# Brighton & Hove Albion

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: The Brighton and Hove Albion Football Club, Limited — Companies House n° **00081077**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-16)

Cuentas completas de la sociedad (`Full accounts`), ejercicio cerrado el 30 de junio.

- `Clubes/Inglaterra/Brighton & Hove Albion/brighton-full-accounts-2024-25.pdf` — 37 páginas, cerrado 30/6/2025.
- `Clubes/Inglaterra/Brighton & Hove Albion/brighton-full-accounts-2023-24.pdf` — 35 páginas, cerrado 30/6/2024.

## Serie disponible sin bajar

**18 ejercicios**, de 30/6/2008 a 30/6/2025 (algunos años con doble presentación por cambio de fecha
de cierre — ver filas "30 November"/"29 December" intermedias en el historial completo).

## Verificación hecha en esta sesión (2026-09-16)

OCR de la página 2 del PDF 2024/25: `The Brighton and Hove Albion Football Club Limited` en el
índice de contenidos. Entidad confirmada, no asumida.

## CARGADO al sitio (sesión 2026-09-25)

Los 2 ejercicios transcriptos (`brighton-full-accounts-2023-24.md`/`-2024-25.md`, ya con texto
nativo, no hizo falta OCR) se cargaron a `data/brighton-gb-data.js`, `clubId` **`brighton-gb`**.
Cuentas individuales de la compañía (no consolidadas), Premier League los 2 ejercicios (11° puesto
en 2023/24, 8° en 2024/25, confirmado por el propio Strategic Report de cada documento). Ver el
comentario de cabecera de `data/brighton-gb-data.js` para el detalle completo de categorización,
`fx` (sin tipo de cambio propio declarado, `fxRef` a `GBP@2024-06-30`/`GBP@2025-06-30` ya existentes
en `data/currency-map.js`) y `grossDebt` (préstamo intragrupo del accionista Tony Bloom, el club no
tiene deuda bancaria).

**Color de marca**: `#005DAA` (azul) — footylogos.com (paleta de 3 colores: `#005DAA`/`#FFFFFF`/
`#FDB913`) + Wikipedia ("blue-and-white striped shirts"), verificado 2026-09-25. Se usó el azul
siguiendo la regla de bicolor "si el otro color es blanco, gana el que no es blanco".

**Duda genuina anotada en `Admin/dudas-por-club.md`**: el documento del ejercicio 2024/25 restablece
(restates) el resultado neto del ejercicio 2023/24 por un error de impuesto diferido no reconocido
anteriormente (de £56,065m a £73,369m) — se cargó la cifra tal cual depositada en el documento
propio de ESE ejercicio (2023/24), no la restated, ver el comentario extenso en
`data/brighton-gb-data.js`.

- Último chequeo: 2026-09-25.
