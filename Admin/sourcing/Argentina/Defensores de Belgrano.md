**Ángulos**: sitio oficial: agotado (categoría institucional completa revisada, existencia
confirmada sin PDF) · Wayback CDX: agotado (114 PDFs del dominio completo, ninguno financiero) ·
búsqueda web: agotado · regulador/país: bloqueo (IGJ exige clave fiscal AFIP paga, gestión de Guido,
no intentar) — 2026-09-26

# Defensores de Belgrano

- Sin PDFs oficiales encontrados. Sitio oficial: defeweb.com.ar, con sección "Socios" (cuotas,
  convocatorias a asamblea) y una sección "Institucional" — ninguna de las dos linkea el PDF del
  balance.
- Pendiente: todos los ejercicios.
- Contacto: info@defeweb.com.ar, tel./fax +54 11 4702-8967, Comodoro Rivadavia 1450, Núñez, CABA.
- Último chequeo: 2026-09-12.

## Chequeo 2026-09-22 — barrido automatizado, sin hallazgo

Se corrió el barrido de 4 pasos descrito en `_notas-generales.md` ("Metodología — barrido
automatizado 2026-09-22") sobre el dominio oficial de este club: (1) home + rutas institucionales
típicas + `?s=balance`/`?s=memoria+y+balance`/`?s=estados+contables`, (2) `wp-json/wp/v2/search`
con `balance`, `memoria y balance`, `contable` y `asamblea`, (3) `sitemap_index.xml`/`sitemap.xml`/
`wp-sitemap.xml`, (4) segundo nivel: abrir cada página cuyo slug contenga
balance/memoria/contable/ejercicio/asamblea/transparencia/gestión y buscar en su HTML `href`, `src`
y `data-src` a `.pdf`, Drive, `docs.google.com/viewer|gview`, Issuu, Scribd, Calaméo o Dropbox. Se
sumó el índice COMPLETO de PDFs del dominio en la CDX API de Wayback Machine
(`matchType=domain&filter=original:.*\.pdf`), que detecta archivos que nunca estuvieron linkeados
desde una página viva.

- **Resultado: 0 documentos.** El sitio tiene un post titulado "Memoria y Balance 2009-2010" (`defeweb.com.ar/meno0910/`) — se abrió: **no tiene ningún adjunto**, el contenido debe haberse perdido en alguna migración. Los posts de asamblea de 2024 y 2025 (`asamblea-general-ordinaria-2/`, `asamblea-general-ordinaria-2025/`) tampoco adjuntan nada. Wayback: 67 PDFs archivados en el dominio, revisados uno por uno — son gacetillas de partido, legajos de baby fútbol, historia y notas; **ninguno financiero**.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — existencia CONFIRMADA con detalle, candidato a mail

- **Wayback CDX del dominio completo, repetido hoy hasta 2026**: 114 PDFs (47 más que el 22),
  ninguno financiero — confirma el "0 documentos" anterior con más cobertura, no lo contradice.
- **`defeweb.com.ar/category/institucional/`** (no revisado como categoría completa en el chequeo
  anterior, solo posts sueltos): 9 posts institucionales listados. El post **"ASAMBLEA GENERAL
  ORDINARIA 2024"** (`se-realizo-la-asamblea-general-ordinaria-2024/`) confirma: *"Se dio lectura a
  la Memoria y al Balance del club, ambos fueron aprobados por unanimidad"* — sin PDF adjunto.
- **La convocatoria a la Asamblea 2025** (`asamblea-general-ordinaria-2025/`) da el detalle más
  preciso encontrado hasta ahora para este club: el balance a tratar es el del **"ejercicio anual
  Nro. 117 finalizado el 31/10/2024"**, y lista los componentes estándar completos — Estado de
  Situación Patrimonial, Estado de Recursos y Gastos, Estado de Evolución del Patrimonio Neto,
  Estado de Flujo de Efectivo, Anexos, Notas, Informe del Auditor Independiente e Informe de la
  Comisión Revisora de Cuentas — o sea que el balance existe como documento auditado COMPLETO y
  formal, solo que nunca se publicó en el sitio. Esto es una señal mucho más fuerte que "el club
  menciona un superávit": es la lista de contenidos de un balance real, citada por el propio club.
- **Candidato a mail (to-do 51)**: mismo criterio que Independiente/Banfield/Atlanta en
  `club-sourcing` 0.3. Pedido concreto posible: "el balance del Ejercicio N° 117 (cierre 31/10/2024),
  leído y aprobado en la Asamblea de 2025" — el club ya tiene el numeral exacto y sabemos que existe
  el documento completo con auditor externo.
- Último chequeo: 2026-09-26.
