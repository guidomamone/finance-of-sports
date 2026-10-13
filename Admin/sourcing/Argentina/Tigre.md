# Tigre

**Ángulos**: sitio oficial: agotado (menú completo + wp-json, sin PDF) · Wayback CDX: agotado (0
PDFs de balance en todo el dominio) · búsqueda web: agotado (prensa confirma existencia, sin PDF) ·
regulador/país: no aplica — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: catigre.com.ar. Las convocatorias a Asamblea General
  Ordinaria (2022 a 2025, todas revisadas) mencionan textualmente la consideración de "Memoria y
  Balance General e Informe de Comisión Fiscalizadora", pero ninguna adjunta el PDF. "Socios" solo
  lleva a un Portal de Socios con login — es posible que el documento se distribuya solo ahí.
- Pendiente: todos los ejercicios.
- Contacto: info@catigre.com.ar, tel. (54-11) 4744-3949 / 4549-0555, Guido Spano 1053, Victoria, San
  Fernando.

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

- **Resultado: 0 documentos.** Hay convocatorias a Asamblea General Ordinaria de 2024 y 2025 en `catigre.com.ar/noticias/`, sin adjuntos. Wayback: 0 PDFs archivados en todo el dominio.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — familia 4 (búsqueda web dirigida), confirmación de existencia por prensa

Sourcing puro, sesión dedicada a 5 clubes tradicionales. Se relevó de nuevo `wp-json/wp/v2/search`
(`balance`, `memoria y balance`) sobre `catigre.com.ar` — mismos 4 posts de convocatoria ya conocidos,
ninguno con adjunto, más un CDX completo del dominio (`matchType=domain`, sin filtro de fecha): 15
PDFs históricos en total, todos formularios/reglamentos/protocolo, **cero balances o memorias
alguna vez archivados**. La novedad de esta vuelta es la familia 4 a fondo:

- **Doble Amarilla (prensa) confirma la existencia del balance del Ejercicio N°124 (1/7/2024 a
  30/6/2025)**, aprobado en la Asamblea General Ordinaria en Victoria: "el patrimonio actualizado
  del club alcanza los $35.267.450.000 y el total del pasivo a junio tiene la suma de
  $2.637.000.000", más una cifra de retenciones de AFA de $19.000.000.000 a nivel país. Es la misma
  señal que ya usa este skill para Independiente (0.3): prensa citando cifras concretas de una
  asamblea reciente. Fuente:
  https://www.dobleamarilla.com.ar/rosca/tigre-aprobo-el-balance-y-presupuesto-en-su-asamblea-general-ordinaria-en-victoria_a69531d15e2ddbc5aef01ebc7
  — sin link a PDF, solo cobertura verbal del acto.
- **Resultado: sin PDF nuevo. Escalera completa (1, 3, 4) agotada; familia 2 no aplica.**
- **Candidato a mail, no dead-end puro**: el documento del Ejercicio 124 (2024-25) está confirmado
  por prensa con cifras concretas, pero no está descargable en ningún canal digital del club (el
  "Portal de Socios" con login sigue siendo la única vía que no se pudo descartar). Guido decide si
  amerita el mail del to-do 51.
- Último chequeo: 2026-09-26.
