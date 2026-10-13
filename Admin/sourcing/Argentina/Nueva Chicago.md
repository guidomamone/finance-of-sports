# Nueva Chicago

**Ángulos**: sitio oficial: agotado (REST API y buscador internos deshabilitados, devuelven 404 en
todas las rutas dinámicas; nav de home solo expone contenido fosilizado de ~2013-2014) · Wayback CDX:
agotado (4 PDFs, ninguno financiero, reconfirmado) · búsqueda web: parcial — encontrado Boletín
Oficial (convocatoria sin cifras) y un video de Facebook sobre la asamblea de memoria y balance
2023-24, cuenta no confirmada como oficial · regulador/país: no aplica — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: canuevachicago.com.ar, con sección "Socios" (una
  nota menciona que Tesorería publica informes económicos de partidos e incluye actas de Asamblea de
  Representantes de Socios) pero sin balance/memoria en PDF linkeado en las páginas revisadas.
- Pendiente: todos los ejercicios.
- Contacto: prensachicago@gmail.com, tel. +54 9 11 3869-6880, sede Justo Suárez 6900, Mataderos.
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

- **Resultado: 0 documentos.** Wayback: 4 PDFs archivados en el dominio, ninguno financiero. Lo único cercano en el sitio vivo es un "resumen económico de los partidos vs. Chacarita, Fénix y Tristán Suárez" (recaudación por partido, no un ejercicio).
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — sitio con API/buscador deshabilitados, pero aparecieron 2 señales de prensa/video

- **El sitio bloquea toda ruta dinámica, no solo la búsqueda**: `wp-json/wp/v2/search`,
  `wp-json/wp/v2/posts?search=` y el buscador nativo `?s=<término>` devuelven **HTTP 404** para
  cualquier término (confirmado con 5 términos distintos) — solo `wp-json/` (la raíz) responde 200.
  El menú de la home solo expone URLs de contenido de ~2013-2014 ("Comisión Directiva Período
  2014-2017"), lo que sugiere que la home no se actualiza o que hay una capa de caché estática
  delante del WordPress real. La página `/socios/` (la que la sesión de septiembre ya había marcado
  como la que menciona informes de Tesorería) no tiene ningún link a PDF ni a "balance"/"memoria" en
  su HTML — la única coincidencia de "transparencia" es el atributo HTML `allowtransparency` de un
  iframe de Facebook, un falso positivo.
- **Boletín Oficial de la República Argentina** (`boletinoficial.gob.ar`, hallado por búsqueda web)
  tiene una publicación de "Club Atlético Nueva Chicago SOCIEDAD CIVIL": es una **convocatoria a
  Asamblea General Ordinaria**, con orden del día que incluye "estados contables"/"balance" del
  ejercicio, pero **sin ninguna cifra** (activo, pasivo, patrimonio neto o resultado) — confirma que
  la asamblea trató el tema, no aporta el documento en sí. No se investigó si Boletín Oficial es un
  canal recurrente para este club (podría valer la pena como familia 2 nueva para sociedades civiles
  argentinas en general — señalar para actualizar `club-sourcing` si se confirma en otro club).
- **Video de Facebook**: "Asamblea general ordinaria de Memoria y balance 2023-2024"
  (`https://www.facebook.com/100088400115942/videos/asamblea-general-ordinaria-de-memoria-y-balance-2023-2024/1522128185845899/`)
  — el título es exactamente el que buscamos, pero **no se confirmó que la cuenta (ID numérico
  `100088400115942`) sea la página oficial del club** (la oficial parece ser `facebook.com/nuevachicago`
  o `facebook.com/CANuevaChicago.Oficial`, no verificado cuál). Guardada la URL exacta para no tener
  que rebuscarla.
- Búsqueda web dirigida adicional (`filetype:pdf`): sin resultados.
- **Conclusión: no es un dead-end tan limpio como el de septiembre — hay 2 señales de que el
  ejercicio 2023-2024 se trató formalmente (Boletín Oficial + video)**, pero ninguna es un documento
  descargable ni 100% confirmada como canal oficial. No llega al nivel de confianza de Atlanta/Banfield
  para marcarlo directo como candidato a mail — dejarlo anotado acá y, si una sesión futura confirma
  que la cuenta de Facebook es oficial, recién ahí escalar a to-do 51.
- Último chequeo: 2026-09-26.
