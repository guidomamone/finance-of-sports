# Letonia — notas generales (sourcing, sesión 2026-10-03)

## Dos canales y qué da cada uno

1. **Sitio del club (Dokumenti)**: la licencia de la LFF obliga a presentar el `gada pārskats`; RFS
   (`fkrfs.lv/dokumenti/`), Riga FC (`rigafc.lv/dokumenti/`) y FK Auda (`fkauda.lv/dokumenti`, enlaces a Google
   Drive públicos) lo publican con 4-6 años seguidos. Es el único camino gratis a los PDF.
2. **Datos abiertos del Registro de Empresas** (`https://data.gov.lv/dati/dataset/gada-parskatu-finansu-dati`;
   mismos archivos en `dati.ur.gov.lv`): `financial_statements.csv` (un registro por informe: reg. nº, año, tipo
   `UGP`=sociedad / `BNAGP`=biedrība, empleados), `balance_sheets.csv`, `income_statements.csv`,
   `cash_flow_statements.csv`. Descarga directa gratis, ~700 MB en total. Unión por `file_id`.
   **Limitación importante**: para las asociaciones (biedrības) solo hay balance (activos, patrimonio neto,
   pasivos); `income_statements` solo tiene filas de SIA. Para clubes organizados como biedrība (RFS, Riga FC,
   Liepāja, Jelgava, Tukums, Metta) NO hay ingresos/gastos en el dataset abierto. Sirve de cross-check de
   activos/patrimonio/empleados, no para cargar P&L. Listado de entidades: `dati.ur.gov.lv/register/register.csv`.
   Consultas de ejemplo ya hechas: ver cifras en cada nota de club.
3. **PDF oficiales del registro**: pagos (Lursoft `company.lursoft.lv`, `firmas.lv`: ~11 EUR por informe anual
   según el listado público) — gestión de Guido si se quisiera completar Liepāja, Jelgava, Tukums, Valmiera
   2021/2023-2025 y años anteriores a 2020 de RFS/Riga FC.

## Gotchas

- **Homonimia a granel**: Riga FC tiene una SIA homónima no relacionada; Valmiera tiene tres entidades;
  Auda tiene SIA nueva (2020) y biedrība histórica; Tukums tiene biedrība + SIA vieja + SIA nueva. Confirmar
  siempre la entidad por la carátula del PDF (reg. nº).
- Enlaces a Google Drive públicos: `https://drive.google.com/uc?export=download&id=<id>` baja con curl.
- Wayback trunca a 1.048.576 bytes (ver brief): Valmiera 2020 quedó así.
- `data.gov.lv` y `dati.ur.gov.lv` responden desde IP de EE.UU. (no bloquean, a diferencia de Lituania).
- Tesseract `lav` instalado: leyó bien las carátulas de RFS 2020/2021.

## Texto propuesto para `paises/Letonia.md`

> **Letonia**: (1) sitio del club, sección Dokumenti (RFS, Riga FC, FK Auda tienen 4-6 años; Google Drive
> público en Auda). (2) datos abiertos del Registro de Empresas en `data.gov.lv` (`gada-parskatu-finansu-dati`):
> CSV masivo de balance/PyG/flujo por informe anual, incluye biedrības pero solo con balance. (3) Lursoft
> / ur.gov.lv: PDF pagos (~11 EUR). Los clubes grandes son biedrības (RFS, Riga FC, Liepāja, Jelgava) o SIA
> (Auda, Valmiera FC, Spartaks); confirmar reg. nº por la carátula. Idioma `lav` en Tesseract.

## Dudas para `Admin/dudas-por-club.md` (para la sesión principal)

- Riga FC: ¿el patrimonio neto pasa de -5,16 M EUR (2021) a +0,79 M (2025) por condonación de deuda del dueño o por
  aporte de capital? (los balances abiertos muestran el salto en 2022-2024; la nota del PDF 2022-2023 lo explicaría).
- Valmiera FC: ¿por qué SIA Valmiera FC pasa de 0 EUR de facturación (2022) a 1,69 M EUR (2023) y a 73 mil EUR de activos (de 1,6 M)? Posible
  traspaso de actividad/estadio.

## No hecho

- No se transcribió ni cargó nada. No se buscó Wayback para 2015-2019 de RFS/Riga FC (objetivo de 5 cumplido).
- No se revisaron Jelgava/Tukums/Metta con búsqueda web por nombre de documento.
