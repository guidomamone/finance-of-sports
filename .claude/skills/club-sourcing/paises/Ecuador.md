# Ecuador — ningún club es todavía S.A.D.P./SAD; Supercias no aplica hasta que eso cambie

**Supercias estructuralmente no regula a estos clubes todavía — no es un problema de portal.** Los
clubes profesionales ecuatorianos obtienen personería jurídica vía el Ministerio del Deporte (Acuerdo
Ministerial), como "sociedades civiles sin fines de lucro" — no como "compañías" bajo la Ley de
Compañías que sí regula Supercias. La figura de S.A.D.P./SAD (Sociedad Anónima Deportiva) es LEGAL
desde hace tiempo en teoría, pero recién se volvió operativa en la práctica: reforma a la Ley
Orgánica del Deporte publicada 11-feb-2026, reglamento de la Superintendencia de Compañías emitido
23/24-jun-2026, y a agosto de 2026 solo UN club de todo el país (9 de Octubre, categoría inferior)
había presentado documentación para INICIAR (no completar) el trámite — ningún club grande de Serie
A lo completó todavía (Barcelona SC lo está "analizando", proceso estimado 12-18 meses). Ver
`fuentes/Ecuador/_notas-generales.md` para la cronología completa con fuentes de prensa. Último
chequeo: 2026-09-13.

**Implicación práctica para sourcing**: mientras un club no complete su conversión a SAD, buscarlo en
el portal "Consulta de Compañías" de Supercias es un callejón sin salida estructural, no un problema
de autocomplete — la entidad no está ahí porque no es una "compañía". El autocomplete (PrimeFaces)
del portal también es poco predecible por su cuenta (no devolvió sugerencias ni con nombre completo
ni con RUC candidato, y con búsquedas parciales devuelve coincidencias que ni contienen el término
buscado), pero eso es secundario frente al problema de fondo. Cuando algún club efectivamente
complete la conversión a SAD (chequear con `"[club] se convierte en sociedad anónima deportiva"` en
prensa antes de ir directo a Supercias), a partir de ese momento sí pasaría a estar regulado por
Supercias y este portal volvería a ser relevante.

**Qué SÍ funciona, sin depender de Supercias ni de la figura SAD**: varios clubes
publican voluntariamente, como sociedad civil, reportes de rendición de cuentas a sus socios en su
propio sitio oficial — Deportivo Cuenca colgó en agosto de 2026 un "informe presidencial" (dos PDFs
vía links de Google Drive en una nota de prensa propia) con movimientos bancarios e impuestos
pagados; LDU Quito tiene una sección `/transparencia/` fija con estados financieros de su club social
consolidado (aunque mezclado con colegio/country club, ver `fuentes/Ecuador/LDU Quito.md`). Ojo: esto
es voluntario y poco común — la mayoría de los clubes chequeados (Barcelona SC, Emelec,
Independiente del Valle, Aucas, Delfín SC, Universidad Católica, El Nacional, Macará, Mushuc Runa,
Técnico Universitario, Orense SC) NO tienen ninguna sección equivalente — pero vale la pena revisar
el sitio oficial de cada club (menú completo, no solo rutas típicas `/transparencia/`) antes de
asumir que no existe. Cuidado además con reportes de este tipo: suelen ser de CAJA (ingresos/egresos
bancarios, pagos de impuestos), no estados contables de DEVENGADO con balance/estado de resultados
completo — releer `club-data-mapping/SKILL.md` antes de decidir si encajan en el esquema del sitio.

## Informes a socios colgados en el sitio

Los clubes civiles grandes presentan informe económico y estados (a veces auditados) a socios en la asamblea anual y lo cuelgan un
tiempo en el sitio: Emelec 2023 (`content/uploads/2024/08/`), Barcelona SC 2018 (`/descargas/pdf/INFORME_FINANCIERO_2018.pdf`). Los
sitios nuevos ya no los publican. Técnica: CDX del dominio completo con filtro `application/pdf` y buscar nombres tipo
`informe_financiero` o `estados`. Las convocatorias de asamblea (`/asamblea…`) confirman si hay auditoría externa anual.
