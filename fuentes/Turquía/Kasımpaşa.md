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
