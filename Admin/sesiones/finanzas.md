## Finanzas 5

### Qué cambió
- Nada commiteado todavía. Arranque hecho (skill, `worktree.mjs preparar`, lectura del 295 y el 261).

### Qué queda (para TODO)
- 295, FNL rusa (en curso, sin commitear): entidad Ассоциация Профессиональных Футбольных Клубов «Футбольная Национальная Лига», ИНН 7705124551, GIR BO id 1703426; solo 2025 trae dictamen (reportId 56784458, `bo.nalog.gov.ru/download/audit/56784458`). El PDF (35 págs.) es un escaneo y quedó bajado en `Ligas/Rusia/FNL/` (sin trackear); su `.md` es un stub inservible de pdftotext. Falta: OCR con Tesseract `rus+eng` (script en el scratchpad de la sesión, o `Admin/transcripcion-subagentes/ocr.sh` cambiando `-l eng` por `-l rus+eng`), revisar las págs. del dictamen contra la imagen, línea `ligaId: ru-pervayaliga` en `Admin/registros/auditoria.jsonl` con citas verificadas (`tools/auditoria.mjs`), nota `Admin/sourcing/Ligas/fnl-rusia.md`, y quitar de la nota de la RPL la frase "no se buscó".
- 295, otras segundas sin buscar: Lega Pro (Serie C), Liga 3 portuguesa (FPF), federaciones paulistas. No tocar CBF, DFL, Serie A, Liga Portugal ni AFA.
- 261 a, b, c y d: sin empezar. Antes del 261 d, preguntarle a Guido si sigue con subagentes o pasa a Mistral.

### Qué deja de ser cierto en ESTADO
- Nada todavía.
