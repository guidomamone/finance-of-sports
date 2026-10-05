# Bulgaria — notas generales (sourcing de la Parva liga, sesión 2026-10-03)

## Canal: Registro Mercantil (Търговски регистър, `portal.registryagency.bg`) — gratis, sin captcha, scripteable
Es el mejor canal de todo el barrido de Europa del Este: **cada Годишен финансов отчет presentado es público y se baja con curl, sin cuenta**.
- **Buscar el ЕИК** (UIC): `GET https://portal.registryagency.bg/CR/api/Deeds/Summary?page=1&pageSize=25&count=0&name=<NOMBRE COMPLETO EN CIRÍLICO>&selectedSearchFilter=1&includeHistory=false` (pageSize máx. 25; devuelve JSON con `ident` = ЕИК). La búsqueda solo matchea el nombre registrado completo (`ПРОФЕСИОНАЛЕН ФУТБОЛЕН КЛУБ <X>`), no el nombre corto ("ПФК ЦСКА" no devuelve nada). Hay rate limit (HTTP 429): esperar y reintentar con pausas de 5+ s.
- **Listar los actos**: `GET /CR/api/Deeds/<ЕИК>?entryDate=2030-01-01T00%3A00%3A00.000Z&loadFieldsFromAllLegalForms=false` → JSON; en `sections[].subDeeds[].groups[].fields[]` los campos con `nameCode == "CR_F_1001_L"` traen en `htmlData` pares "Година: AAAAг. · Дата на обявяване · enlace `DocumentAccess/<guid>`".
- **Descargar**: `GET https://portal.registryagency.bg/CR/api/Documents/<guid>` (con `User-Agent` de navegador). OJO: `/CR/DocumentAccess/<guid>` (el enlace que muestra la web) devuelve la SPA en HTML; el PDF está en `/CR/api/Documents/<guid>`. El nombre original viene en `content-disposition`.
- Un acto "Годишен финансов отчет" suele agrupar varios PDFs (individual, consolidado, informe del auditor, informe de actividad, a veces solo formularios sueltos). Script usado en esta sesión: `bgdl.py <ЕИК> <carpeta> [--min-year=N] [--list]` (scratchpad de la sesión; si Guido quiere promoverlo a `tools/`, es ~80 líneas de Python sin dependencias).
- Lo publicado puede ser **solo formularios** (2-4 pág.) sin notas ni auditor (Lokomotiv Plovdiv 2019-2022, Botev, CSKA 1948). Las notas completas están donde la empresa presentó el PDF auditado (Ludogorets, Levski, CSKA Sofia, Cherno More, Slavia).
- Asociaciones (Сдружение, ej. CSKA 1948) presentan en el mismo portal, pero sus estados suelen ser mínimos.

## Clubes
Ver `fuentes/_indice/Bulgaria.md`. ЕИК usados: Ludogorets 201280347, Levski 121660936, CSKA Sofia 110501548, Lokomotiv Plovdiv 109080575, Botev Plovdiv 201468114, Cherno More 103253223, Slavia 130068410, CSKA 1948 (asociación) 177080120, Arda 205176207.
