# Kasımpaşa

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: Kasımpaşa Sportif Faaliyetler A.Ş. (según TFF), no cotiza en bolsa.
- **Canal**: sitio propio `kasimpasa.com.tr`, con al menos un PDF individual indexado en
  `kasimpasa.com.tr/dosya/<id>/<slug>.pdf` — no se encontró una página índice tipo "Mali Tablolar"
  navegable (el sitio no expuso ese nav en el HTML crudo obtenido por `curl`, puede estar
  renderizado con JS — no confirmado por falta de browser tool esta sesión).

## Qué se bajó (sesión 2026-09-18, arranque limpio — no había nada previo de este club)

**1 documento**, en `Clubes/Turquía/Kasımpaşa/kasimpasa-bagimsiz-denetim-raporu.pdf` — "finansal
tablolar hakkında bağımsız denetçi raporu" (dictamen del auditor independiente sobre los estados
financieros), 64 páginas, sin capa de texto extraíble con `pdftotext` (probablemente escaneado) —
no se pudo confirmar el ejercicio/año exacto en esta sesión de sourcing.

## Dudas / pendientes

- **Determinar el ejercicio que cubre** (OCR o inspección visual, tarea de mapeo).
- Solo se encontró el dictamen del auditor, no el juego de estados financieros en sí (bilanço,
  gelir tablosu) — puede estar en el mismo documento (64 páginas es bastante para solo un dictamen)
  o en un archivo separado no encontrado.
- Pendiente re-explorar `kasimpasa.com.tr` con browser real (JS) para confirmar si hay una página
  "Mali Tablolar" con más ejercicios, ya que el patrón de otros clubes chicos (Alanyaspor,
  Antalyaspor, Konyaspor, Gaziantep FK) sugiere que debería existir.
- Último chequeo: 2026-09-18.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: sitio oficial: agotado (la sección es `/dosya/<id>/...`, sin índice navegable) · Wayback CDX de dominio: agotado (10 PDFs, 5 financieros) · barrido: 2 (Sonnet) — 2026-10-08

Todos escaneos (sin capa de texto), de Kasımpaşa Sportif Faaliyetler A.Ş., con informe del auditor, en `Clubes/Turquía/Kasımpaşa/`:
- `kasimpasa-31122021-imzali-rapor.pdf` — ejercicio **2021** (53 págs.).
- `kasimpasa-denetim-raporu-5378.pdf` — ejercicio **2022** (64 págs.; la 1ª captura de Wayback venía truncada a 1 MiB, la de 20240304131133 está completa).
- `kasimpasa-yillik-finansal-tablolar-ve-bagimsiz-denetci-raporu.pdf` — ejercicio **2023** (10 págs.).
- `kasimpasa-31122024-raporu-imzali.pdf` — ejercicio **2024** (10 págs., con capa de texto).
- `kasimpasa-uefa-lisans-2022.pdf` — paquete de licencia UEFA 2022 (72 págs.), a revisar si agrega algo al 2021.
- Serie 2021-2024 continua. Falta ver si el sitio vivo tiene 2025.

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 1 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas ninguna; `wf-src-*`: 1 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
