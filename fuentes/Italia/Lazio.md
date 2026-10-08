# Lazio (S.S. Lazio)

**Ángulos**: sitio oficial: agotado (API `sslazio.it/api/widget/attachment?id_category=37/38`) · Wayback CDX: agotado (`finance.sslazio.it/documents/`, `media.sslazio.it/200507/`) · búsqueda web: Exa (Borsa Italiana 2004) · regulador/país: Borsa Italiana (parcial) · barrido: 3 (Sonnet+Exa) — 2026-10-07


- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: S.S. Lazio S.p.A., propiedad de Claudio Lotito. **Cotiza en Borsa Italiana /
  Euronext Milan desde 1998** (ISIN `IT0003621783`) — segunda entidad cotizante del país después de
  Juventus, y con una historia bursátil incluso más larga (Juventus recién en 2001).
- **Canal**: sección propia `sslazio.it/en/investor-relators/documenti`, gratis, sin login. También
  existe en Borsa Italiana (`borsaitaliana.it/.../elenco-completo-documenti-societari.html?isin=IT0003621783`),
  pero esa página no sirvió ningún documento en esta sesión (ver gotcha abajo).

## Qué se bajó (sesión 2026-09-17)

**1 ejercicio (FY2024/25) completo**, en `Clubes/Italia/Lazio/`: relazione finanziaria annuale al 30
giugno 2025 (individual + consolidado + los informes de auditoría/collegio sindacale del mismo
ejercicio).

- **La página oficial de "Documenti" NO es un archivo histórico navegable**: el filtro "View all
  Years" solo ofrece 2017-2026, pero el listado real (extraído del JSON `__NEXT_DATA__` embebido en
  la página) está capado a los ~30 documentos MÁS RECIENTES de cualquier tipo (actas de asamblea,
  informes de gobernanza, etc., no solo bilanci) — cambiar el filtro de año no dispara ningún fetch
  nuevo, solo filtra client-side sobre esa misma lista corta. Con esa lista solo llegó el ejercicio
  2024/25 completo (más las relazioni semestrales de dic-2024 y dic-2025, que no son el bilancio
  anual).
- **Borsa Italiana no sirvió nada en esta sesión**: la página de "Documenti Societari" cargó pero sin
  ningún link a PDF visible en el DOM (posible carga diferida vía iframe/widget que no llegó a
  completarse) — no confirmado si es un problema de portal o de tooling de esta sesión.
- Dato de color: la página mostró el ticker como "Status: Inaccessible" con "Last Trade: 26/09/2017"
  — no está claro si es un dato realmente desactualizado en caché de Borsa Italiana o una
  particularidad de cómo se sirve esa página para acciones de bajísima liquidez; no se investigó más
  por no ser relevante al objetivo de sourcing.

## Verificación hecha en esta sesión

PDF del bilancio anual 2024/25 confirmado real.

## Dudas / pendientes

Resuelto el 2026-10-03: ver las secciones de abajo. Pendiente solo el histórico bursátil ANTERIOR a 2006/07 (1998-2006), que el sitio no publica.

- Último chequeo: 2026-09-17.

## Sesión de sourcing Italia (2026-10-03): +8 ejercicios (2006/07 a 2013/14)

Wayback CDX sobre `sslazio.it` (dominio completo) mostró que el CMS viejo (Joomla, hasta ~2015)
servía los bilanci en `sslazio.it/images/stories/documenti/pdf/investor_relator/`. Las capturas del
2015-09-24 (HTTP 200, `application/pdf`) bajaron completas (todas con `%%EOF` y `pdfinfo` OK), 8
archivos: **bilancio S.S. Lazio S.p.A. separado + consolidado al 30 de junio de 2007, 2008, 2009,
2010, 2011, 2012, 2013 y 2014**. Entidad confirmada leyendo la carátula (S.S. Lazio S.p.A., Registro
Imprese 80109710584), no la URL: dos de ellos tenían nombres genéricos (`Bilancio separato e
consolidato S.S. Lazio S.p.A.pdf`) y eran 2009 y 2008. En `Clubes/Italia/Lazio/`:
`Lazio-bilancio-separato-consolidato-2006-07.pdf` … `2013-14.pdf`. 100% con capa de texto.

(2014/15 a 2023/24 resueltos en la 2ª tanda, abajo.)

## Sesión de sourcing Italia, 2ª tanda (2026-10-03): +10 ejercicios → serie COMPLETA 2006/07-2024/25 (19 ejercicios)

Se completó 2014/15 a 2023/24:
- **2014/15 a 2020/21** salieron de Wayback, carpeta `sslazio.it/images/documents/investors/` (el CMS de 2016-2021): bilancio al 30/06 de 2015, 2016, 2017, 2019, 2020 y la "Relazione finanziaria" del 30/06/2021 (capturas HTTP 200, íntegras). El de 2017 tiene dos marcas `%%EOF` (actualización incremental, está bien).
- **2017/18, 2021/22, 2022/23 y 2023/24** salieron del sitio vivo por la API del widget de documentos (`sslazio.it/api/widget/attachment?offset=N&id_category=37|38`, JSON paginado de 30 en 30 con `file_url` a `mediaverse.sslazio.hiway.media/VMFS1/FILES/public/upload/...`). La categoría 37 y 38 contienen el archivo histórico completo (514 documentos desde 2006): el listado que "solo mostraba ~30" de la nota anterior era el límite de la UI, no de la fuente. Para 2023/24 se usó la "copia di cortesia" de 185 págs del errata corrige del 23/10/2024 (hay también una versión del 04/10/2024).
- Las carátulas dicen S.S. Lazio S.p.A. en todos (individual + consolidado). Archivos: `Lazio-bilancio-separato-consolidato-AAAA-AA.pdf` (el de 2021/22 y siguientes son la Relazione Finanziaria Annuale, que los incluye).
- **Técnica reutilizable**: si el sitio de un club muestra una lista "cargar más" de documentos, buscar el JSON del widget en la pestaña de red; suele traer el histórico sin tope.

- **Color de marca**: `#74D1EA` (celeste) — biancoceleste (it.wikipedia, Società_Sportiva_Lazio); regla (d); hex de footylogos. Elegido por Claude (Guido delega el color, 2026-10-06), verificado 2026-10-06.

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2007 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2006-07.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2006-07`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2009 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2008-09.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2008-09`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2010 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2009-10.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2009-10`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2020 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2019-20.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2019-20`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2023 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2022-23`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2022 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2021-22.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2021-22`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-07): ejercicio 2015 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2014-15.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2014-15`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2025 desde `Clubes/Italia/Lazio/Lazio-relazione-finanziaria-annuale-2024-25.pdf` (sourceId `lazio-it-relazione-finanziaria-annuale-2024-25`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2018 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2017-18.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2017-18`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2019 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2018-19.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2018-19`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2024 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2023-24.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2023-24`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2013 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2012-13.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2012-13`).

## Sesión de sourcing Italia sección 1 (2026-10-07): +6 ejercicios históricos (1998/99-2004/05) y 2025/26

- **2025/26 ya publicado (2026-10-06)**: `https://mediaverse.sslazio.hiway.media/document/2026/10/06/6ac56583/Copia-di-cortesia-Relazione-finanziaria-annuale-S.S.-Lazio-30_06_2026.pdf` (199 págs) -> `Lazio-relazione-finanziaria-annuale-2025-26.pdf`, más las relaciones de revisión (`.../6ac567f0/Relazione-di-revisione-del-Bilancio-di-esercizio.pdf`, `.../6ac567b0/Relazione-di-revisione-consolidata.pdf`).
- **Histórico bursátil anterior a 2006/07 (la pista pendiente)**: 1998/99, 1999/00 y 2000/01 salen de Wayback de `finance.sslazio.it/documents/bilancio_990630.pdf`, `bilancio_000630.pdf`, `bilancio_010630.pdf` (snapshots 2003; 92/120/116 págs, texto nativo; el 1999/00 trae cuadros en lire y euro) -> `Lazio-bilancio-1998-99.pdf`, `-1999-00.pdf`, `-2000-01.pdf`. 2003/04 es el "Bilancio al 30 giugno 2004" de Borsa Italiana (`https://www.borsaitaliana.it/media/borsa/db/pdf/new/8385.pdf`, 91 págs) -> `Lazio-bilancio-2003-04.pdf`. 2004/05 es "Bilancio al 30 giugno 2005" (82 págs) de Wayback `http://media.sslazio.it:80/200511/1324.pdf?ver=1` (snapshot 20060217193904) -> `Lazio-bilancio-2004-05.pdf`.
- **2005/06**: solo el "Progetto di bilancio al 30 giugno 2006" (75 págs) espejado en un sitio de hinchas (`http://www.sslaziofans.it/FILE/PDF/web29484.pdf`), guardado como `Lazio-progetto-bilancio-2005-06-mirror-sslaziofans.pdf`: **fuente NO oficial y es un proyecto, no el bilancio final**; el informe de revisión oficial del 2006 existe en `sslazio.it/images/documents/investors/09.10.06 - relaz società di revisione bilancio al 30.06.06.pdf` pero no el fascicolo.
- **Sin encontrar**: 2001/02 y 2002/03 (solo prospecto 2002, semestral dic-2002 y comunicados en `finance.sslazio.it`), y el 2005/06 final. Dos exa-queries y el listado de Borsa Italiana (carga por JS, no accesible) no los dieron.

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2008 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2007-08.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2007-08`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2012 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2011-12.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2011-12`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2017 desde `Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2016-17.pdf` (sourceId `lazio-it-bilancio-separato-consolidato-2016-17`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2026 desde `Clubes/Italia/Lazio/Lazio-relazione-finanziaria-annuale-2025-26.pdf` (sourceId `lazio-it-relazione-finanziaria-annuale-2025-26`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 1999 desde `Clubes/Italia/Lazio/Lazio-bilancio-1998-99.pdf` (sourceId `lazio-it-bilancio-1998-99`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2000 desde `Clubes/Italia/Lazio/Lazio-bilancio-1999-00.pdf` (sourceId `lazio-it-bilancio-1999-00`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2001 desde `Clubes/Italia/Lazio/Lazio-bilancio-2000-01.pdf` (sourceId `lazio-it-bilancio-2000-01`).
