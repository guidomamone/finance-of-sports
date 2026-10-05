# Bulgaria — Registro Mercantil público, gratis y scripteable: alcanza solo

Canal único y suficiente: el Registro Mercantil (Търговски регистър, `portal.registryagency.bg`).
Cada Годишен финансов отчет presentado es público y se baja con curl, sin cuenta ni captcha. No hace
falta pasar por el sitio del club.

1. **Buscar el ЕИК**: `GET https://portal.registryagency.bg/CR/api/Deeds/Summary?page=1&pageSize=25&count=0&name=<NOMBRE COMPLETO EN CIRÍLICO>&selectedSearchFilter=1&includeHistory=false`
   (`ident` = ЕИК; `pageSize` máximo 25). Solo matchea el nombre registrado completo
   (`ПРОФЕСИОНАЛЕН ФУТБОЛЕН КЛУБ <X>`): "ПФК ЦСКА" no devuelve nada. Rate limit (429): pausas de 5 s
   o más.
2. **Listar los actos**: `GET /CR/api/Deeds/<ЕИК>?entryDate=2030-01-01T00%3A00%3A00.000Z&loadFieldsFromAllLegalForms=false`;
   los campos con `nameCode == "CR_F_1001_L"` traen el año y un enlace `DocumentAccess/<guid>`.
3. **Descargar**: `GET https://portal.registryagency.bg/CR/api/Documents/<guid>` (con User-Agent de
   navegador). `/CR/DocumentAccess/<guid>`, el enlace que muestra la web, devuelve la SPA en HTML,
   no el PDF.

Scripts: `Admin/sourcing-europa-este-scripts/bgsearch.sh` (buscar) y
`bgdl.py <ЕИК> <carpeta> [--min-year=N] [--list]` (bajar).

- Un acto agrupa varios PDF: individual, consolidado, informe del auditor, informe de actividad.
- Hay clubes que publican solo los formularios (2-4 págs.), sin notas ni auditor (Lokomotiv Plovdiv,
  Botev).
- Las asociaciones (Сдружение) presentan en el mismo portal, con estados mínimos.
- OCR: `bul`.
