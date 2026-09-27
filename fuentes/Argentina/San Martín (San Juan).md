# San Martín (San Juan)

**Ángulos**: sitio oficial: agotado (menú completo revisado vía WebFetch: Inicio, Institucional
[Nuestra Historia, El Estadio, Comisión Directiva], Plantel, Fixture, Multimedia, Tienda, Socios,
Noticias — sin balance/memoria/estados contables/transparencia en ningún lado; `wp-json` da 403,
no es indicio de WordPress) · Wayback CDX: agotado (0 PDFs archivados, chequeo 2026-09-22) ·
búsqueda web: agotado (0 resultados relevantes — casi todo lo que trae "San Martín...balance" es en
realidad San Martín de TUCUMÁN, club homónimo que sí tiene cobertura de prensa; nada sobre San
Juan) · regulador/país: no aplica — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: casanmartinsj.com, con secciones "Institucional" y
  "Socios" pero sin balance/memoria linkeado. 0 PDFs archivados en Wayback Machine para el dominio.
- Pendiente: todos los ejercicios.
- Contacto: tel. 2645215135 (Socios).
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

- **Resultado: 0 documentos.** Ni el sitio vivo ni el índice de Wayback Machine del dominio tienen un PDF, Drive o visor embebido con balance/memoria/estados contables.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — sesión de sourcing puro, dead-end confirmado (ojo con el homónimo)

Revisado el menú completo de `casanmartinsj.com` de nuevo vía WebFetch (curl sigue dando 403):
Institucional tiene solo "Nuestra Historia", "El Estadio" y "Comisión Directiva" — este último es
un ítem de menú sin contenido de balance visible.

Búsqueda web dirigida trajo una trampa real: casi todos los resultados de `"San Martín" ...
balance/asamblea/comisión directiva` son sobre **San Martín de TUCUMÁN** (que sí tiene prensa
activa — ver `fuentes/Argentina/San Martín (Tucumán).md`, Chequeo 2026-09-26), no sobre este club.
Ninguna búsqueda trajo una nota de prensa, tuit o mención específica de una asamblea o balance de
San Martín de SAN JUAN. A diferencia de los dos Tucumán, acá no hay ni siquiera confirmación de
existencia.

**Resultado: dead-end real, 0 señal de que el documento exista — próximo club, sin mail** (criterio
0.3). Revisar de nuevo sin fecha fija.
- Último chequeo: 2026-09-26.
