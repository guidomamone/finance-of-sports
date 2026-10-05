# Bielorrusia — notas generales (sourcing, sesión 2026-10-03)

## Qué se intentó

- **ЕГР** (`egr.gov.by`, Registro Estatal Unificado de Personas Jurídicas): `curl` no conecta desde esta IP (000/timeout);
  según las fuentes oficiales citadas por buscadores, la información se entrega por solicitud con tasa pagada vía ERIP,
  no como descarga abierta. No se intentó pagar. **Gestión de Guido** si algún día interesa.
- **`epfr.gov.by`** (portal único del mercado financiero, información de emisores de valores): responde (HTTP 200, página mínima), no se exploró
  más porque los clubes revisados son ООО/estatales sin emisión.
- **Sitios de clubes**: `fcbate.by`, `fcneman.by`, `dynamo-brest.by` responden y no tienen sección de documentos;
  `fcshakhter.by` da 403; `dinamo.by` no resolvió.
- **Directorio de terceros** `kartoteka.by` dio la forma jurídica de BATE (ООО, УНП 690022164); no se guardó nada de ahí (fuente no oficial).

## Qué no se hizo (por si otra sesión quiere insistir)

- Wayback CDX de los dominios de clubes (esperable 0 PDFs de balances).
- La licencia de la federación (ABFF) no obliga a publicar; el contexto sancionatorio (UEFA suspendió a clubes y selecciones
  bielorrusos de competiciones europeas desde 2022) quita el incentivo de publicar.
- Tesseract `bel` y `rus` están instalados si apareciera algún PDF.
