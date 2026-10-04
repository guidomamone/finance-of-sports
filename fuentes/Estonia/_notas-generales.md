# Estonia — notas generales (sourcing, sesión 2026-10-03)

## Canal: e-Äriregister (RIK) — gratis, sin login, PDF directo

- Página de cada empresa: `https://ariregister.rik.ee/eng/company/<registrikood>`. La tabla de informes
  anuales (`Annual reports`) lista cada ejercicio con estado `Valid` / `Expired` (los `Expired` son
  versiones reemplazadas: se descarta, queda la vigente) y enlaces `PDF` / `DDOC`. El PDF es
  `https://ariregister.rik.ee/eng/company/<kood>/file/<id>`.
- **GOTCHA CRÍTICO: `curl` funciona SOLO SIN User-Agent.** Con un UA de navegador (Chrome) el sitio
  devuelve `HTTP 520` / "Just a moment" (Cloudflare). Sin la opción `-A`, el UA por defecto de curl pasa y
  devuelve la página y los PDF. Además, cuando se hacen varias descargas seguidas Cloudflare a veces devuelve
  una página HTML de desafío (~340 KB) con extensión .pdf: validar siempre los primeros bytes (`%PDF-`),
  esperar 15-30 s y reintentar. Con ~7 clubes x 7 años se recuperó todo con 3-5 s entre descargas.
- Los clubes (todos MTÜ) están obligados a depositar el informe anual aunque sean chicos; los que superan
  umbrales (categoría "mediana" en 2024-2025) se auditan. `Auditado` figura en el dataset abierto
  (columna `kas auditeeritud?`).
- **Datos abiertos** (`avaandmed.ariregister.rik.ee/en/downloading-open-data`): descargas masivas gratis.
  Utiles: `ettevotja_rekvisiidid__lihtandmed.csv.zip` (nombre y código de todas las personas jurídicas:
  así se encuentran los códigos), `1.aruannete_yldandmed_kuni_<fecha>.csv.zip` (un registro por informe:
  `registrikood`, año, consolidado sí/no, auditado sí/no, categoría de tamaño, tipo de opinión de auditoría)
  y `4.<año>_aruannete_elemendid_kuni_<fecha>.zip` (los ítems numéricos de cada informe 2019-2025,
  estructurados). La API REST/SOAP de informes requiere API key (no se usó). Posible camino futuro: cargar
  cifras desde los `aruannete_elemendid` sin transcribir (a validar contra el PDF).
- El dataset de informes a veces NO tiene todos los clubes (FCI Levadia figuraba solo 2019-2020 en el CSV
  del 2026-09-03 pese a tener 2019-2025 en la página): la página de la empresa es la fuente de verdad.

## Qué persona jurídica es cada club (lo difícil de Estonia)

El nombre comercial no coincide con la entidad. Resolución hecha (todas confirmadas por el texto del PDF):
Flora = `Jalgpalliklubi FCF` (80052376); Levadia = `FCI Levadia MTÜ` (80053192); Paide = `Jalgpalliklubi Paide
Linnameeskond` (80339528); Kalju = `MTÜ Nõmme Kalju FC` (80048819); Kalev = `Jalgpalliklubi Tallinna Kalev`
(80176115); Narva Trans = `Jalgpalliklubi Narva Trans` (80069833); Tammeka = `MTÜ Jalgpallikool Tammeka`
(80315611); Vaprus = `Pärnu Jalgpalliklubi Vaprus` (80125566); Kuressaare = `Jalgpalliklubi FC Kuressaare`
(80052525); Harju JK Laagri = `MTÜ Harju Jalgpalliklubi Laagri` (80620596). Homonimia confirmada y evitada:
`Tartu Jalgpalliklubi` (80072433) NO es Tammeka (contacto `tjkmerkuur@hot.ee`, parece JK Merkuur).

## Texto propuesto para `paises/Estonia.md` (para la sesión principal; no se editó el skill)

> **Estonia**: e-Äriregister (`ariregister.rik.ee`), PDF gratis y sin login por empresa
> (`/eng/company/<kood>` → `Annual reports` → `PDF`). Usar `curl` SIN `-A`/User-Agent (con UA de
> navegador Cloudflare responde 520). Validar `%PDF-` y reintentar con pausa si llega HTML. Los clubes
> son MTÜ; resolver la entidad con el CSV de datos abiertos `ettevotja_rekvisiidid__lihtandmed`. Hay 7
> ejercicios 2019-2025 para los clubes de la Meistriliiga. Los informes son nativos con texto
> (`pdftotext` sirve), en estonio (`est` en Tesseract si hace falta). Datos estructurados 2019-2025 en
> `4.<año>_aruannete_elemendid`.

## No intentado / pendiente

- Clubes de menor nivel de la Esiliiga/II liiga (Maardu, Viimsi, Pärnu JK, etc.): no se buscaron.
- No se transcribió ni cargó nada (consigna de la sesión).
