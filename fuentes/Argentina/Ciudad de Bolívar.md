# Ciudad de Bolívar

**Ángulos**: sitio oficial: agotado (`ciudaddebolivar.com.ar` no resuelve DNS — probado con/sin
`www`, http y https — y tampoco resuelven las variantes `clubciudaddebolivar.com.ar`/`.org.ar`/
`ciudaddebolivar.org.ar`; sin sitio vivo no hay menú que revisar) · Wayback CDX: agotado (0 capturas
de CUALQUIER tipo en todo el dominio, no solo ausencia de PDFs — nunca fue archivado) · búsqueda web:
agotado (ninguna mención de balance/memoria/asamblea/estados contables en prensa, Facebook, X,
Instagram o YouTube del club) · regulador/país: no aplica · prensa: sin señal (0 menciones) ·
barrido: 2 (Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Dominio oficial ciudaddebolivar.com.ar inalcanzable al momento de
  esta investigación (sin respuesta ni por HTTP ni HTTPS) y sin ningún PDF indexado en Wayback
  Machine para ese dominio tampoco. Club fundado en 2002 por iniciativa de Marcelo Tinelli.
- Pendiente: todo — no se pudo ni confirmar si el sitio publica algo, dado que no cargó.
- Contacto: sin mail institucional encontrado. X @ClubBolivarArg / @ClubCdBolivarOF, Facebook Club
  Ciudad de Bolivar, sede en San Carlos de Bolívar, Buenos Aires.
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

## Chequeo 2026-09-26 — escalera completa (barrido 2, Sonnet), DEAD-END confirmado

Se corrió la escalera completa de `club-sourcing` 0.1, reconfirmando y profundizando el chequeo del
2026-09-22:

- **Familia 1 (sitio oficial)**: `ciudaddebolivar.com.ar` sigue sin resolver DNS (`curl`:
  "Could not resolve host", tanto con `www` como sin, http y https). Se probaron además 3 variantes
  de dominio razonables (`clubciudaddebolivar.com.ar`, `clubciudaddebolivar.org.ar`,
  `ciudaddebolivar.org.ar`): ninguna resuelve. No hay sitio oficial vivo que revisar.
- **Familia 3 (Wayback CDX, dominio completo, sin filtro de extensión)**: la CDX API devuelve `[]`
  para `ciudaddebolivar.com.ar` con `matchType=domain` — **0 capturas de cualquier tipo, nunca**, no
  solo ausencia de PDFs. Esto es consistente con un dominio que nunca tuvo un sitio real (o que dejó
  de resolver antes de que Wayback lo indexara). De paso, la página municipal de Bolívar que un
  resultado de búsqueda listaba como referencia al club
  (`bolivar.gob.ar/disfruta-bolivar/786-club-ciudad-de-bolivar.html`) también devuelve 404 hoy.
- **Familia 4/5 (búsqueda web + prensa)**: sin ningún resultado sobre balance, memoria, asamblea o
  estados contables del club en ninguna búsqueda (se probaron variantes con "San Carlos de Bolívar",
  con y sin "Club", y cruzando con medios locales). El club tiene presencia real en Facebook
  (facebook.com/clubciudadbolivar), X (@ClubCdBolivarOF) e Instagram (@clubciudaddebolivar), pero
  ninguna de esas páginas es accesible sin login para confirmar contenido institucional, y no hay
  ninguna nota de prensa (La Gaceta, ESPN, etc.) que mencione siquiera la existencia de una asamblea
  o balance — solo cobertura deportiva (ascenso 2024, plantel, resultados). El club nació en 2019
  como proyecto de fútbol de un grupo inversor sobre un club históricamente de vóley (fundado 2002
  por iniciativa de Marcelo Tinelli), lo que no cambia su forma jurídica esperada (asociación civil)
  pero sí es coherente con que la actividad institucional pese menos que la deportiva en su
  comunicación pública.
- **Conclusión — dead-end real, sin mail (0.3)**: 0 señal de que el documento exista en ningún
  canal, ni siquiera el sitio oficial funciona. No amerita mail (no hay nada confirmado que pedir).
  Revisar de nuevo sin fecha fija, priorizando confirmar si el dominio oficial volvió a resolver.
- Último chequeo: 2026-09-26.
