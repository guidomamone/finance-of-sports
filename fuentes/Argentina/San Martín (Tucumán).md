# San Martín (Tucumán)

**Ángulos**: sitio oficial: agotado (menú completo revisado vía WebFetch — El Club, Fútbol, Museo,
Disciplinas, Socios y Socias, Prensa, Comisión Directiva; footer con HCD/Junta Fiscalizadora; sin
balance/memoria linkeado; `curl` da 403 en el dominio, confirmado con WebFetch en su lugar) ·
Wayback CDX: agotado (10 PDFs archivados en el dominio, ninguno financiero — chequeo 2026-09-22) ·
búsqueda web: agotado (0 PDF descargable; prensa CONFIRMA que el balance existe y se aprueba en
asamblea todos los años, ver Chequeo 2026-09-26) · regulador/país: no aplica (IGJ bloqueado, clave
fiscal AFIP paga) — 2026-09-26

- Sin PDFs oficiales encontrados. Dos dominios propios verificados: clubatleticosanmartin.com.ar
  (con sección "Contacto" pero sin balance/institucional) y clubatleticosanmartin.com (portal
  separado con "Información del C.A.S.M."). Índice completo de Wayback Machine de
  clubatleticosanmartin.com.ar: 14 PDFs, ninguno financiero (reglamentos, formularios de prensa,
  convenio de consentimiento).
- Pendiente: todos los ejercicios.
- Contacto: tel. 0381-4247817 / 4205861, Bolívar 1960, San Miguel de Tucumán.
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

- **Resultado: 0 documentos.** `clubatleticosanmartin.com.ar` devuelve **HTTP 403** a `curl` (habría que ir por Browser pane en una sesión futura). Wayback: 10 PDFs archivados en el dominio, ninguno financiero.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — sesión de sourcing puro, prensa CONFIRMA que el balance existe

Re-chequeado el 403 de `curl` con WebFetch (que sí pudo leer el sitio): menú completo confirmado
(El Club, Fútbol, Museo, Disciplinas, Socios y Socias, Prensa, Comisión Directiva), sin balance,
memoria ni estados contables linkeados en ninguna sección ni en el footer.

Búsqueda web (familia 4) trajo señal fuerte de que el documento SÍ existe, vía prensa:

- **La Gaceta (Tucumán)**, ["La asamblea ordinaria de San Martín de Tucumán aprobó el
  balance"](https://www.lagaceta.com.ar/nota/1037279/deportes/asamblea-ordinaria-san-martin-tucuman-aprobo-balance-hoy-tenemos-17-jugadores-nuestros.html):
  asamblea del 31/5/2024, aprobó el balance del ejercicio jul-2022 a jun-2023, superávit de
  $4.609.371, +1.000 socios presentes, 25 abstenciones, 0 votos en contra. Sin PDF adjunto ni
  linkeado.
- El Tucumano, ["Histórica": las imágenes de la Asamblea de
  Socios](https://www.eltucumano.com/noticia/deportes/310892/historica-las-imagenes-de-la-asamblea-de-socios-y-que-votaron-los-hinchas-de-san-martin-de-tucuman):
  agenda de una asamblea posterior (jul-2025) que incluía Memoria, Balance e Inventario del
  ejercicio jul-2023 a jun-2024 — o sea, hay un balance más (el que sigue al de arriba) también
  aprobado y tampoco publicado en PDF.
- Cambio de gestión: la nueva conducción (Oscar Mirkin) asumió el 4/12/2025 y en marzo/2026
  presentó un "informe de gestión de los primeros 120 días" (no es un balance auditado, es un
  documento de diagnóstico político) que denuncia "pasivos ocultos" en la documentación que le dejó
  la gestión saliente (Moisello) — ART $86M y Policía $49,5M no registrados. Ver La Gaceta,
  ["San Martín: la comisión directiva presentó un balance de gestión y denunció pasivos
  ocultos"](https://www.lagaceta.com.ar/nota/1137140/deportes/san-martin-comision-directiva-presento-balance-gestion-denuncio-pasivos-ocultos.html)
  y Tendencia de Noticias, ["120 días, 10.000 socios y una crisis
  heredada"](https://tendenciadenoticias.com.ar/deportes/120-dias-10000-socios-y-una-crisis-heredada-el-balance-completo-de-la-gestion-mirkin).
  Ese informe tampoco aparece linkeado como PDF descargable en ningún lado (se buscó
  específicamente en el sitio del club y no está).

**Candidato a mail (to-do 51, `club-outreach`)**: hay al menos 2 ejercicios (jul-2022/jun-2023 y
jul-2023/jun-2024) con balance CONFIRMADO por prensa como aprobado en asamblea, ninguno publicado
en ningún canal digital — encaja en el criterio de 0.3 ("documento confirmado que existe pero no
está descargable"). La nueva gestión (asumió dic-2025, activamente denunciando falta de
transparencia de la anterior) puede ser receptiva a un pedido de publicación.
- Último chequeo: 2026-09-26.
