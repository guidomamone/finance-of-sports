# Belgrano (Córdoba)

**Ángulos**: sitio oficial: agotado (menú sin sección de transparencia; posts de asamblea 2024/2025
localizados por búsqueda web, ninguno adjunta PDF; portal de socios con login confirmado como el
único canal) · Wayback CDX: agotado (`belgrano.com.ar`: 6 PDFs históricos, ninguno financiero;
`belgranosocios.com`: 0 capturas de `/upload/`, ruta no crawleable por Wayback) · búsqueda web:
agotado (2 PDFs sueltos de `/upload/` encontrados y descartados — "Mercado de pases", no balance) ·
regulador/país: no aplica — 2026-09-26

- Memoria Anual 2019 (ejercicio calendario 2019) — https://www.belgranosocios.com/upload/11294686561451.pdf
  — narrativa (socios, filiales, deportivo, infraestructura) + sección "Económicos" con cifras
  resumidas (superávit, patrimonio neto, índice de liquidez), SIN estados contables línea por línea.
  Descargado en `Clubes/Argentina/Belgrano/memoria-anual-2019.pdf`.
- Memoria Anual 2020 — https://www.belgranosocios.com/upload/14733772026375.pdf — mismo formato.
  Descargado en `Clubes/Argentina/Belgrano/memoria-anual-2020.pdf`.
- **Revisados a fondo en la Versión 95: NINGUNO de los 2 tiene datos financieros cargables.** Son
  10 páginas cada uno, puramente narrativos (socios, filiales, deportivo) — ni una fila de Estado de
  Recursos y Gastos ni de Situación Patrimonial en ninguno de los dos (confirmado con OCR, no solo
  con el texto nativo). No se cargó nada al sitio para este club.
- Pendiente: 2021 a 2025 (todos existen y se aprueban en asamblea cada año — la de 2025 fue aprobada
  29/4/2026, superávit $1.222M según prensa del propio club) pero están detrás de login de socio en
  socios.belgrano.com.ar, sección "Transparencia" — no hay copia pública indexada de esos años a
  diferencia de 2019/2020, que quedaron sueltos en /upload/ de una época anterior a que el club
  migrara todo detrás de login.
- Contacto: Departamento de Socios On-Line, o directo por el panel socios.belgrano.com.ar (si Guido
  consigue acceso de socio, ahí están los años que faltan); contacto general vía belgrano.com.ar.

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

- **Resultado: 0 documentos nuevos, con 2 gotchas de tooling que conviene anotar.** (1) `belgrano.com.ar` devuelve **HTTP 403 a cualquier `curl`**, con o sin User-Agent de navegador y headers `Accept`/`Accept-Language` completos — hay que usar el Browser pane. (2) Su buscador interno (`/?s=balance`) devuelve **"Ha habido un error crítico en esta web"** (WordPress caído en esa ruta), así que la vía del `?s=` no sirve acá. Vía browser se leyó el post "Los socios/as aprobaron la Memoria y Balance 2025" (29/4/2026, Asamblea Ordinaria 2026, >1.000 socios, "crecimiento patrimonial histórico" en el año del 120° aniversario, presidente Luis Fabián Artime): **confirma que el ejercicio 2025 existe y está aprobado, pero no adjunta PDF ni cifra**. Wayback: 6 PDFs archivados en el dominio, ninguno financiero.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — confirmado: TODOS los balances recientes están detrás de login, candidato a mail

Sesión de sourcing puro (5 clubes del interior). Instrucción puntual: "encontré la Memoria y es
narrativa" no cierra el caso — revisar si el balance real cuelga de OTRO documento del mismo sitio o

del mismo post de convocatoria, con foco en 2021-2025 (esta sesión no pudo usar el Browser pane,
compartido con otros 6 agentes en paralelo — todo lo de abajo es vía `curl`/`WebFetch`/`WebSearch`).

- **`curl` directo a `belgrano.com.ar` sigue devolviendo HTTP 403** (confirmado de nuevo, con
  User-Agent de navegador completo) — mismo bloqueo ya documentado. `WebFetch` sí pudo leer el
  sitio (no bloqueado igual que `curl`) y confirma el menú completo: El Club / Instalaciones /
  Fútbol / Socios (Experiencias Belgrano, Filiales y peñas) / Polideportivo — **sin ninguna sección
  de Transparencia, Institucional-documentos ni Balance** en la navegación principal.
- `belgranosocios.com` (donde viven los 2 PDFs de 2019/2020 ya cargados, en `/upload/<hash>.pdf`,
  sí accesible por `curl` sin login) — la home ahora redirige 302 a `socios.belgrano.com.ar`
  (portal nuevo). El índice CDX completo de Wayback Machine sobre el dominio (`matchType=domain`,
  colapsado) devuelve **0 capturas de la ruta `/upload/`** — ni de los 2 PDFs ya conocidos ni de
  ningún otro: son nombres de archivo tipo hash, nunca crawleados por no estar linkeados desde
  ninguna página indexable. Esto confirma que la única forma de encontrar un PDF nuevo en
  `/upload/` es que aparezca linkeado en vivo desde algún lado (prensa, redes, el propio sitio) —
  no hay atajo por Wayback.
- **Búsqueda web dirigida encontró 2 posts NUEVOS, específicos de "Memoria y Balance" (no la
  cobertura de prensa genérica ya vista en la sesión anterior)**:
  `belgrano.com.ar/2026/04/14/memoriaybalance2025/` (ejercicio 2025, dice explícito: "Members can
  view the documents through the club's members panel in the 'Transparencia' (Transparency)
  section at socios.belgrano.com.ar" — **confirma el nombre de la sección que el menú público no
  muestra: existe, pero es privada**) y `belgrano.com.ar/2025/04/25/asamblea2025/` (convocatoria a
  la asamblea que aprobó el ejercicio 2024, "Approval of 2024 financial statements, balance sheets,
  and board reports", mismo patrón: solo referencia al padrón de socios para habilitarse a votar,
  cero adjunto público).
  - También aparecieron 2 PDFs sueltos en `belgranosocios.com/upload/` vía búsqueda web
    (`86745035601779.pdf` y `85572578233783.pdf`, ambos accesibles por `curl` sin login):
    descargados y verificados — son reportes de "Mercado de pases" (transferencias de jugadores),
    NO memoria/balance. Descartados, no copiados al proyecto.
- **Conclusión: los 5 ejercicios pedidos (2021-2025) existen y se aprueban en asamblea todos los
  años (2024 y 2025 confirmados por nombre de documento, no solo por prensa), pero los 5 están
  100% detrás de login de socio en `socios.belgrano.com.ar` → sección "Transparencia".** No es un
  problema de búsqueda: el club decidió no publicar nada afuera del panel de socios. Esto es
  distinto de un bloqueo tipo IGJ (no hace falta clave fiscal AFIP ni pago a un tercero) pero
  tampoco es sourceable por un agente: haría falta ser socio con cuota al día.
- **Candidato a mail (ver `club-sourcing` 0.3): fuerte.** El club público y activamente promociona
  que el documento existe ("podés encontrar ambos documentos disponibles en la sección
  Transparencia", tuiteado por la cuenta oficial) — pedirle que comparta el PDF que YA subió a su
  propio portal (aunque sea de los últimos 1-2 ejercicios, no hace falta los 5) es exactamente el
  tipo de pedido de bajo costo / alto valor esperado que describe el criterio. Decisión de Guido.
- Último chequeo: 2026-09-26.
