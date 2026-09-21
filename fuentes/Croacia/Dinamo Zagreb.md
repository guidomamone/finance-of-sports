# Dinamo Zagreb

- **Entidad legal**: GNK Dinamo Zagreb sigue siendo una **udruga** (asociación, sin forma
  societaria) — no se convirtió a sportsko dioničko društvo, a diferencia de la mayoría de los
  otros 9 clubes de la HNL. Pese a eso publica sus estados financieros auditados igual, por
  mandato de licenciamiento de la HNS (ver `_notas-generales.md`).
- **5 ejercicios descargados** a `Clubes/Croacia/Dinamo Zagreb/` (2019-2022, 2024 — falta 2023,
  ver "Pendiente" abajo):
  - `financijsko-izvjesce-2019.pdf` (25 pág., Creator NAPS2)
  - `financijsko-izvjesce-2020.pdf` (24 pág.)
  - `financijsko-izvjesce-2021.pdf` (24 pág., Creator RICOH MP C2003)
  - `financijsko-izvjesce-2022.pdf` (25 pág.)
  - `financijsko-izvjesce-2024.pdf` (33 pág.)
  - Todos bajados vía Wayback Machine (ver "Cómo se encontró"), no directo del sitio — los links
    que aparecen en gnkdinamo.hr HOY están rotos (404, el sitio pasó por un rediseño).
- **Cifra de prensa confirmada para 2025** (no cargado, sin PDF): ingresos consolidados brutos
  81,6 millones EUR, superávit consolidado antes de impuestos 4,3 millones EUR (fuente: nota de
  prensa de la Skupština de abril 2026, gnkdinamo.hr/hr/vijesti/odrzana-redovita-godisnja-skupstina-gnk-dinamo-2).
  El PDF del ejercicio 2025 no está linkeado todavía en el sitio del club al momento de esta
  sesión.
- **Cómo se encontró**: búsqueda directa `site:gnkdinamo.hr financijski izvještaj revizija pdf`
  dio los nombres de archivo exactos (`F.01_Godisnji_financijski_izvjestaji_poslije_revizije_za_<año>.pdf`,
  etc.). Al intentar bajarlos del dominio vivo, TODOS devolvieron 404 (confirmado con
  `fetch()` desde el propio origin del sitio, no es bloqueo de bot) — el sitio tuvo un rediseño
  que dejó rotos los links de PDFs antiguos en artículos que siguen online. Se recuperaron
  bajando el snapshot más reciente de cada URL desde la Wayback Machine (CDX API,
  `web.archive.org/web/<timestamp>if_/<url>`).
  - **Gotcha nuevo**: el primer snapshot probado para 2019 y para 2024 devolvió un PDF
    TRUNCADO a un tamaño redondo en potencia de 2 (1 MB y 5 MB exactos respectivamente) sin
    ningún error HTTP — `pdfinfo` fallaba con "Invalid XRef"/"Couldn't read xref table". Se
    resolvió probando otro timestamp del mismo CDX hasta encontrar uno íntegro.
- **Pendiente — ejercicio 2023**: el link vivo (`gnkdinamo.hr/content/izvjestaj-konsolidirani.pdf`)
  da 404 igual que los demás, y el snapshot de Wayback no se pudo recuperar porque **Archive.org
  tuvo una interrupción de servicio real y prolongada** ("Internet Archive: Temporarily Offline")
  durante toda esta sesión — no es que no exista el snapshot, es que el servicio estaba caído.
  Reintentar en sesión futura: `web.archive.org/cdx/search/cdx?url=https://gnkdinamo.hr/content/izvjestaj-konsolidirani.pdf&output=json`
  debería listar snapshots (se vio brevemente un resultado con "Temporarily Offline" en el medio,
  no se llegó a completar la descarga).
  - Sugerencia adicional si Wayback no ayuda: buscar el mismo PDF mirrorado en una nota de
    prensa/portal deportivo que suela adjuntar el documento completo (patrón que funcionó en
    Brasil, sección 3 del skill).
- **Duda para Guido / criterio del sitio**: ninguna, esta ficha no generó preguntas de criterio.
- Último chequeo: 2026-09-17.
