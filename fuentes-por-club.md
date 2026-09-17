# Fuentes por club

Este archivo es tuyo, Guido: un lugar para pegar links a documentos, notas de
prensa o páginas oficiales cuando encuentres algo útil para un club, aunque
todavía no tengas tiempo de cargarlo al sitio. No hace falta ningún formato
especial ni saber programar — un link y una línea de contexto alcanza. Cuando
tengas varios, decime "che, revisá fuentes-por-club.md" y yo los proceso: los
leo, saco los números/categorías reales, y los cargo al sitio con la fuente
correctamente citada.

Cómo agregar algo: copiá una línea nueva bajo el club que corresponda, con
este formato:

- [qué es] — [link] — [para qué sirve o qué tiene adentro, si se nota a simple vista]

Ejemplo:

- Presupuesto 2026/27 — (ya subido como PDF) — presupuesto oficial completo, es lo que ya está cargado en Finanzas.

**REGLA (agregada a pedido de Guido, sesión 2026-09-12)**: cada vez que Claude revisa o actualiza la
sección de un club en este archivo (haya encontrado algo nuevo o no), agregar/actualizar al final de
esa sección una línea `- Último chequeo: AAAA-MM-DD.` con la fecha del día. Esto es lo que le
permite a una sesión futura calcular de un vistazo qué tan viejo es cada chequeo (y por lo tanto
cuáles clubes vale la pena revisar de nuevo primero) sin tener que releer el historial de versiones
de `index.html`.

**REGLA 2 (agregada a pedido de Guido, sesión 2026-09-12)**: cuando se busca un balance/estado
financiero para un club y NO se encuentra nada, no alcanza con anotar "no se encontró" — hay que
anotar QUÉ se probó puntualmente y por qué falló cada intento (URL exacta, portal/regulador
consultado, y el motivo del bloqueo: login de socios, formulario interactivo sin URL fija,
Cloudflare, autocomplete que no devuelve resultados, sin obligación legal de publicar, etc.), más
una sugerencia concreta de qué ángulo distinto probar en el futuro si lo hay. Por qué: sin este
detalle, una sesión futura que busque "más profundo" el mismo club corre el riesgo de repetir
exactamente los mismos intentos fallidos (la misma URL obvia, el mismo portal) sin darse cuenta de
que ya se probaron y no funcionaron — el objetivo es que cada sesión nueva empiece un escalón más
allá de donde quedó la anterior, no desde cero. Ver `fuentes/Uruguay/_notas-generales.md` y
`fuentes/Uruguay/Peñarol.md` como ejemplo del nivel
de detalle esperado (lista numerada de los 3 ángulos probados en la sesión 2026-09-12, con la URL y
el motivo de bloqueo de cada uno, y una sugerencia distinta —pedido de acceso a información pública
a la AIN, o contacto directo con un socio— para la próxima vez).

---

**REGLA 3 (sesión 2026-09-13, decisión de Guido al sumar el primer deporte que no es fútbol)**:
las carpetas siguen ordenadas por PAÍS, no por deporte. El deporte va declarado adentro del archivo
de cada club (primera línea, `- **Deporte**:`) y, cuando no es fútbol, también en su línea del índice
de acá. Si algún día dos clubes del mismo país comparten nombre en deportes distintos, se desambigua
en el nombre del archivo. Se eligió así para no migrar los 41 clubes de fútbol ya cargados y no tocar
los paths que ya citan docs y skills.

---

## Índice de clubes

Cada club tiene su propio archivo en `fuentes/<País>/<Club>.md` con el detalle completo
(links, fecha de último chequeo, qué se probó y qué falta). Esta es solo la vista rápida.
Las líneas sin deporte declarado son de fútbol.

### Argentina

- [Acassuso](fuentes/Argentina/Acassuso.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Agropecuario (Carlos Casares)](<fuentes/Argentina/Agropecuario (Carlos Casares).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Aldosivi](fuentes/Argentina/Aldosivi.md) — sin PDFs, pendiente todo
- [All Boys](fuentes/Argentina/All Boys.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Almagro](fuentes/Argentina/Almagro.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Almirante Brown](fuentes/Argentina/Almirante Brown.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Argentinos Juniors](fuentes/Argentina/Argentinos Juniors.md) — cargado, 5 ejercicios reales (2015-2019) — Último chequeo: 2026-09-12
- [Atlanta](fuentes/Argentina/Atlanta.md) — sin PDF, superávit citado sin PDF adjunto — Último chequeo: 2026-09-12
- [Atlético Tucumán](fuentes/Argentina/Atletico Tucuman.md) — sin PDFs, pendiente todo
- [Atlético de Rafaela](fuentes/Argentina/Atlético de Rafaela.md) — sin PDF, cifras solo confirmadas por prensa — Último chequeo: 2026-09-12
- [Banfield](fuentes/Argentina/Banfield.md) — sin PDFs, pendiente todo
- [Barracas Central](fuentes/Argentina/Barracas Central.md) — sin PDFs, estructura institucional poco desarrollada
- [Belgrano](fuentes/Argentina/Belgrano.md) — 2 memorias descargadas, sin datos financieros cargables
- [Boca Juniors](fuentes/Argentina/Boca.md) — cargado, presupuesto 2027 y balance 2025 reales
- [Central Córdoba (Santiago del Estero)](fuentes/Argentina/Central Cordoba SdE.md) — sin PDFs, pendiente todo
- [Central Norte (Salta)](<fuentes/Argentina/Central Norte (Salta).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Chacarita Juniors](fuentes/Argentina/Chacarita Juniors.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Chaco For Ever](fuentes/Argentina/Chaco For Ever.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Ciudad de Bolívar](fuentes/Argentina/Ciudad de Bolívar.md) — dominio inalcanzable, pendiente todo — Último chequeo: 2026-09-12
- [Colegiales (Munro)](<fuentes/Argentina/Colegiales (Munro).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Colón (Santa Fe)](<fuentes/Argentina/Colón (Santa Fe).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Defensa y Justicia](fuentes/Argentina/Defensa y Justicia.md) — sin PDF del balance, solo cifras narrativas
- [Defensores de Belgrano](fuentes/Argentina/Defensores de Belgrano.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Deportivo Madryn](fuentes/Argentina/Deportivo Madryn.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Deportivo Maipú (Mendoza)](<fuentes/Argentina/Deportivo Maipú (Mendoza).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Deportivo Morón](fuentes/Argentina/Deportivo Morón.md) — sin PDFs de balance, pendiente todo — Último chequeo: 2026-09-12
- [Deportivo Riestra](fuentes/Argentina/Deportivo Riestra.md) — sin sitio oficial funcional, pendiente todo
- [Estudiantes (Buenos Aires / Caseros)](<fuentes/Argentina/Estudiantes (Buenos Aires - Caseros).md>) — sin PDFs, dominio comprometido con spam — Último chequeo: 2026-09-12
- [Estudiantes de La Plata](fuentes/Argentina/Estudiantes LP.md) — cargado, 4 ejercicios reales (2022-2025) — Último chequeo: 2026-09-12
- [Estudiantes de Río Cuarto](fuentes/Argentina/Estudiantes Rio Cuarto.md) — club recién ascendido, sin PDFs
- [Ferro Carril Oeste](fuentes/Argentina/Ferro Carril Oeste.md) — 2 balances reales descargados, sin cargar aún — Último chequeo: 2026-09-12
- [Ferrocarril Midland](fuentes/Argentina/Ferrocarril Midland.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Gimnasia y Esgrima (Jujuy)](<fuentes/Argentina/Gimnasia y Esgrima (Jujuy).md>) — publicación solo física, sin PDFs — Último chequeo: 2026-09-12
- [Gimnasia y Esgrima (La Plata)](fuentes/Argentina/Gimnasia y Esgrima LP.md) — 4 memorias descargadas, sin datos financieros cargables
- [Gimnasia y Esgrima (Mendoza)](fuentes/Argentina/Gimnasia y Esgrima Mendoza.md) — sin PDFs, pendiente todo
- [Gimnasia y Tiro (Salta)](<fuentes/Argentina/Gimnasia y Tiro (Salta).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Godoy Cruz](fuentes/Argentina/Godoy Cruz.md) — 1 balance escaneado descargado, sin OCR aún — Último chequeo: 2026-09-12
- [Güemes (Santiago del Estero)](<fuentes/Argentina/Güemes (Santiago del Estero).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Huracán](fuentes/Argentina/Huracan.md) — sin PDFs, pendiente todo
- [Independiente](fuentes/Argentina/Independiente.md) — cargado, Ejercicio 2023-24 real
- [Independiente Rivadavia (Mendoza)](fuentes/Argentina/Independiente Rivadavia.md) — sin PDFs, pendiente todo
- [Instituto](fuentes/Argentina/Instituto.md) — cargado, Ejercicio 2023-24 real — Último chequeo: 2026-09-12
- [Lanús](fuentes/Argentina/Lanus.md) — sin PDFs, pendiente todo
- [Los Andes](fuentes/Argentina/Los Andes.md) — 13 balances escaneados descargados, sin OCR aún — Último chequeo: 2026-09-12
- [Mitre (Santiago del Estero)](<fuentes/Argentina/Mitre (Santiago del Estero).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Newell's Old Boys](fuentes/Argentina/Newells Old Boys.md) — sin PDFs, portal de socios gateado
- [Nueva Chicago](fuentes/Argentina/Nueva Chicago.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Patronato (Paraná)](<fuentes/Argentina/Patronato (Paraná).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Platense](fuentes/Argentina/Platense.md) — sin PDF del balance, solo cifras narrativas
- [Quilmes Atlético Club](fuentes/Argentina/Quilmes Atlético Club.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Racing Club](fuentes/Argentina/Racing.md) — cargado, 14 balances + 7 presupuestos completos
- [Racing Club (Córdoba, Nueva Italia)](<fuentes/Argentina/Racing Club (Córdoba, Nueva Italia).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [River Plate](fuentes/Argentina/River.md) — cargado, Ejercicio 2024 real (fuente no-primaria)
- [Rosario Central](fuentes/Argentina/Rosario Central.md) — cargado, Ejercicio 2022-23 real
- [San Lorenzo de Almagro](fuentes/Argentina/San Lorenzo.md) — cargado, 7 ejercicios reales (2011-2017) + presupuesto — Último chequeo: 2026-09-12
- [San Martín (San Juan)](<fuentes/Argentina/San Martín (San Juan).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [San Martín (Tucumán)](<fuentes/Argentina/San Martín (Tucumán).md>) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [San Miguel](fuentes/Argentina/San Miguel.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [San Telmo](fuentes/Argentina/San Telmo.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Sarmiento](fuentes/Argentina/Sarmiento.md) — sin PDFs, pendiente todo
- [Talleres](fuentes/Argentina/Talleres.md) — 1 reporte infográfico, sin cifras cargables
- [Temperley](fuentes/Argentina/Temperley.md) — 3 memorias narrativas, sin datos financieros — Último chequeo: 2026-09-12
- [Tigre](fuentes/Argentina/Tigre.md) — sin PDFs, pendiente todo
- [Tristán Suárez](fuentes/Argentina/Tristán Suárez.md) — sin PDFs, pendiente todo — Último chequeo: 2026-09-12
- [Unión (Santa Fe)](fuentes/Argentina/Union.md) — cargado, 4 ejercicios reales (2022-2025) — Último chequeo: 2026-09-12
- [Vélez Sarsfield](fuentes/Argentina/Velez Sarsfield.md) — cargado, 11 ejercicios consecutivos (2015-2025)
- [Notas generales de Argentina](fuentes/Argentina/_notas-generales.md)

**Clubes de Sudamérica (fuera de Argentina):** Barrido de disponibilidad de estados contables/financieros AUDITADOS y descargables (no solo
memorias narrativas) para clubes de fútbol de otros países sudamericanos, priorizando países donde
existe obligación legal de publicar (Chile por CMF, Uruguay/Brasil por estructura societaria). Tarea
puramente de sourcing — PDFs bajados a `Clubes/<País>/<Club>/`, sin transcribir a `.md` ni cargar
nada a `data/*.js` todavía (eso queda para una sesión de onboarding futura, siguiendo
`.claude/skills/club-or-year-onboarding/SKILL.md` normalmente).

### Chile

- [Audax Italiano](fuentes/Chile/Audax Italiano.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Cobreloa](fuentes/Chile/Cobreloa.md) — OTODP, solo memoria y presupuesto proyectado — Último chequeo: 2026-09-12
- [Colo-Colo (Blanco y Negro)](<fuentes/Chile/Colo-Colo (Blanco y Negro).md>) — 17 ejercicios reales, serie completa 2009-2025 — Último chequeo: 2026-09-12
- [Coquimbo Unido](fuentes/Chile/Coquimbo Unido.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Curicó Unido](fuentes/Chile/Curicó Unido.md) — corporación, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Deportes Iquique](fuentes/Chile/Deportes Iquique.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Deportes La Serena](fuentes/Chile/Deportes La Serena.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Everton](fuentes/Chile/Everton.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Huachipato](fuentes/Chile/Huachipato.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [O'Higgins](fuentes/Chile/O'Higgins.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Palestino](fuentes/Chile/Palestino.md) — 1 ejercicio real (2018), resto sin ubicar — Último chequeo: 2026-09-12
- [Universidad Católica (Cruzados)](<fuentes/Chile/Universidad Catolica (Cruzados).md>) — 17 ejercicios reales, serie completa 2009-2025 — Último chequeo: 2026-09-12
- [Universidad de Chile (Azul Azul)](<fuentes/Chile/Universidad de Chile (Azul Azul).md>) — 16 ejercicios reales, serie 2010-2025 — Último chequeo: 2026-09-12
- [Unión Española](fuentes/Chile/Unión Española.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Unión La Calera](fuentes/Chile/Unión La Calera.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Ñublense](fuentes/Chile/Ñublense.md) — OTODP, sin EEFF auditado descargable — Último chequeo: 2026-09-12
- [Notas generales de Chile](fuentes/Chile/_notas-generales.md)

### Uruguay

- [Nacional](fuentes/Uruguay/Nacional.md) — sin PDF, solo cifras confirmadas por prensa — Último chequeo: 2026-09-12
- [Peñarol](fuentes/Uruguay/Peñarol.md) — sin PDF, documento solo para socios — Último chequeo: 2026-09-12
- [Notas generales de Uruguay](fuentes/Uruguay/_notas-generales.md)

### Paraguay

- [Cerro Porteño](fuentes/Paraguay/Cerro Porteño.md) — sin PDFs, sin regulador que obligue publicar — Último chequeo: 2026-09-12
- [Libertad](fuentes/Paraguay/Libertad.md) — sin PDFs, sin regulador que obligue publicar — Último chequeo: 2026-09-12
- [Olimpia](fuentes/Paraguay/Olimpia.md) — sin PDFs, sin regulador que obligue publicar — Último chequeo: 2026-09-12

### Brasil

- [Athletico Paranaense](fuentes/Brasil/Athletico Paranaense.md) — 2 ejercicios reales (2024-2025), no es SAF — Último chequeo: 2026-09-12
- [Atletico Goianiense](fuentes/Brasil/Atletico Goianiense.md) — 1 ejercicio real (2024-2025) — **CARGADO al sitio: Ejercicio 2025, columna Consolidado** — Último chequeo: 2026-09-13
- [Atlético Mineiro](fuentes/Brasil/Atletico Mineiro.md) — SAF, 3 ejercicios reales (2023-2025), sin cargar aún — Último chequeo: 2026-09-16
- [Bahia](fuentes/Brasil/Bahia.md) — SAF + associação, 4 ejercicios reales combinados — Último chequeo: 2026-09-12
- [Botafogo](fuentes/Brasil/Botafogo.md) — 4 ejercicios reales SAF (2022-2025) + associação — **CARGADO al sitio: Ejercicio 2024 (SAF, columna Controladora)** — Último chequeo: 2026-09-13
- [Botafogo-SP](fuentes/Brasil/Botafogo-SP.md) — 5 ejercicios reales (2019-2024), no confundir con RJ — Último chequeo: 2026-09-12
- [Ceará](fuentes/Brasil/Ceara.md) — 8 ejercicios reales (2018-2025), sin cargar aún; dead-end viejo destrabado, el portal cambió de subdominio — Último chequeo: 2026-09-16
- [Chapecoense](fuentes/Brasil/Chapecoense.md) — 3 ejercicios reales (2016-17, 2020-21), no es SAF — Último chequeo: 2026-09-12
- [Corinthians](fuentes/Brasil/Corinthians.md) — 8 ejercicios reales (2016-2025, salto en 2018), no es SAF, sin cargar aún — Último chequeo: 2026-09-16
- [Coritiba](fuentes/Brasil/Coritiba.md) — 2 ejercicios reales (2022-2024) — Último chequeo: 2026-09-12
- [Cruzeiro](fuentes/Brasil/Cruzeiro.md) — 4 ejercicios reales, serie completa 2022-2025 — **CARGADO al sitio: Ejercicio 2025 (SAF)** — Último chequeo: 2026-09-13
- [Flamengo](fuentes/Brasil/Flamengo.md) — 2 ejercicios reales (2024-2025), sin cargar aún; 2022-2023 pendientes (portal SPA bloquea la extracción automática) — Último chequeo: 2026-09-16
- [Fluminense](fuentes/Brasil/Fluminense.md) — 16 ejercicios reales, serie completa 2010-2025, sin cargar aún — Último chequeo: 2026-09-16
- [Fortaleza](fuentes/Brasil/Fortaleza.md) — SAF 2025 + associação 2018-2025 (11 ejercicios), sin cargar aún; dead-end viejo destrabado — Último chequeo: 2026-09-16
- [Gremio](fuentes/Brasil/Gremio.md) — 1 ejercicio real (2023-2024), no es SAF — **CARGADO al sitio: Ejercicio 2024** — Último chequeo: 2026-09-13
- [Guarani](fuentes/Brasil/Guarani.md) — 2 ejercicios reales (2023-2025), en recuperación judicial, no es SAF, sin cargar aún — Último chequeo: 2026-09-16
- [Internacional](fuentes/Brasil/Internacional.md) — 19 ejercicios reales, serie completa 2007-2025, no es SAF, sin cargar aún — Último chequeo: 2026-09-16
- [Ituano](fuentes/Brasil/Ituano.md) — 1 ejercicio real (2024), no es SAF — Último chequeo: 2026-09-12
- [Juventude](fuentes/Brasil/Juventude.md) — 1 ejercicio real (2020, escaneado), sin cargar aún; 2024 sin publicar según prensa (ver dudas-por-club.md) — Último chequeo: 2026-09-16
- [Mirassol](fuentes/Brasil/Mirassol.md) — 1 ejercicio real (2024), no es SAF todavía — Último chequeo: 2026-09-12
- [Palmeiras](fuentes/Brasil/Palmeiras.md) — 8 ejercicios reales, serie completa 2017-2025, no es SAF, sin cargar aún — Último chequeo: 2026-09-16
- [Ponte Preta](fuentes/Brasil/Ponte Preta.md) — 3 ejercicios reales (2021-2024), no es SAF, sin cargar aún — Último chequeo: 2026-09-16
- [RB Bragantino](fuentes/Brasil/RB Bragantino.md) — 2 ejercicios reales (2019, 2024) vía Wayback Machine, no es SAF, sin cargar aún — Último chequeo: 2026-09-16
- [Santos](fuentes/Brasil/Santos.md) — 3 ejercicios reales (2020-2021, 2023-2025), no es SAF, sin cargar aún — Último chequeo: 2026-09-16
- [São Paulo](<fuentes/Brasil/São Paulo.md>) — 5 ejercicios reales, serie 2018-2024, no es SAF, sin cargar aún — Último chequeo: 2026-09-16
- [Sport Recife](fuentes/Brasil/Sport Recife.md) — 6 ejercicios reales (2019-2025), sin cargar aún; Cloudflare destrabado con browser real — Último chequeo: 2026-09-16
- [Vasco da Gama](fuentes/Brasil/Vasco da Gama.md) — 3 ejercicios reales vía mirrors (2022-2024) — Último chequeo: 2026-09-12
- [Vitória](fuentes/Brasil/Vitoria.md) — 1 ejercicio real (2025), sin cargar aún; dead-end viejo destrabado, la URL se había movido — Último chequeo: 2026-09-16
- [Notas generales de Brasil](fuentes/Brasil/_notas-generales.md)

### Colombia

- [America de Cali](fuentes/Colombia/America de Cali.md) — estados financieros 2025 reales, en reorganización — Último chequeo: 2026-09-12
- [Atletico Nacional](fuentes/Colombia/Atletico Nacional.md) — estados financieros 2025 reales — Último chequeo: 2026-09-12
- [Deportes Tolima](fuentes/Colombia/Deportes Tolima.md) — estados financieros 2025 reales, SIN CARGAR (3 cifras de resultado neto en conflicto, ver dudas-por-club.md) — Último chequeo: 2026-09-13
- [Deportivo Cali](fuentes/Colombia/Deportivo Cali.md) — estados financieros 2025 reales, conversión societaria — Último chequeo: 2026-09-12
- [Deportivo Pereira](fuentes/Colombia/Deportivo Pereira.md) — estados financieros 2025 reales, en reorganización de oficio — Último chequeo: 2026-09-12
- [Envigado](fuentes/Colombia/Envigado.md) — CARGADO (Ejercicio 2025), 10 ejercicios disponibles en SIIS (2016-2025), solo se cargó 2025 a propósito — Último chequeo: 2026-09-13
- [Independiente Santa Fe](fuentes/Colombia/Independiente Santa Fe.md) — estados financieros 2025 reales, en reorganización — Último chequeo: 2026-09-12
- [Junior de Barranquilla](fuentes/Colombia/Junior de Barranquilla.md) — estados financieros 2025 reales — Último chequeo: 2026-09-12
- [Millonarios](fuentes/Colombia/Millonarios.md) — 3 ejercicios reales (2022-2025) — Último chequeo: 2026-09-12
- [Once Caldas](fuentes/Colombia/Once Caldas.md) — CARGADO (Ejercicio 2025), en reorganización desde 2012 pero rentable — Último chequeo: 2026-09-13
- [Notas generales de Colombia](fuentes/Colombia/_notas-generales.md)

### Perú

- [Alianza Lima](fuentes/Peru/Alianza Lima.md) — 6 ejercicios consecutivos reales (2019-2024) — Último chequeo: 2026-09-12
- [Sporting Cristal](fuentes/Peru/Sporting Cristal.md) — sin PDF, S.A. cerrada sin obligación de reporte — Último chequeo: 2026-09-12
- [Universitario de Deportes](fuentes/Peru/Universitario de Deportes.md) — sin PDF, proceso concursal INDECOPI confirmado dead-end (solo historial procesal) — Último chequeo: 2026-09-13
- [FBC Melgar](fuentes/Peru/FBC Melgar.md) — sin PDF, asociación civil + concursal INDECOPI sin expediente ubicado — Último chequeo: 2026-09-13
- [Cienciano](fuentes/Peru/Cienciano.md) — sin PDF, asociación civil sin obligación de reporte — Último chequeo: 2026-09-13
- [Sport Boys](fuentes/Peru/Sport Boys.md) — sin PDF, asociación civil sin obligación de reporte — Último chequeo: 2026-09-13
- [Universidad Cesar Vallejo](fuentes/Peru/Universidad Cesar Vallejo.md) — sin PDF, S.A.C. cerrada sin obligación de reporte — Último chequeo: 2026-09-13
- [Cusco FC](fuentes/Peru/Cusco FC.md) — sin PDF, asociación civil sin obligación de reporte — Último chequeo: 2026-09-13
- [ADT](fuentes/Peru/ADT.md) — sin PDF, asociación civil sin obligación de reporte — Último chequeo: 2026-09-13
- [Alianza Atletico](fuentes/Peru/Alianza Atletico.md) — sin PDF, asociación civil sin obligación de reporte — Último chequeo: 2026-09-13
- [Deportivo Municipal](fuentes/Peru/Deportivo Municipal.md) — sin PDF, asociación civil, dominio oficial caído/squatted — Último chequeo: 2026-09-13
- [Comerciantes Unidos](fuentes/Peru/Comerciantes Unidos.md) — sin PDF, asociación civil sin obligación de reporte — Último chequeo: 2026-09-13
- [Los Chankas](fuentes/Peru/Los Chankas.md) — sin PDF, única S.A. (cerrada) del barrido, sin obligación de reporte — Último chequeo: 2026-09-13
- [Sport Huancayo](fuentes/Peru/Sport Huancayo.md) — sin PDF, asociación civil sin obligación de reporte — Último chequeo: 2026-09-13
- [Binacional](fuentes/Peru/Binacional.md) — sin PDF, asociación civil sin obligación de reporte — Último chequeo: 2026-09-13

### Ecuador

Contexto clave (ver `_notas-generales.md`): a la fecha, NINGÚN club ecuatoriano es todavía una
S.A.D.P./SAD — el reglamento que habilita la conversión recién se emitió en junio de 2026 y ningún
club grande la completó. Todos los clubes de abajo siguen siendo sociedades civiles sin fines de
lucro.

- [Barcelona SC](fuentes/Ecuador/Barcelona SC.md) — sin PDFs ni fuente pública identificada; club "analiza" conversión a SAD, sin trámite iniciado — Último chequeo: 2026-09-13
- [Emelec](fuentes/Ecuador/Emelec.md) — sin PDFs ni fuente pública identificada — Último chequeo: 2026-09-13
- [LDU Quito](fuentes/Ecuador/LDU Quito.md) — PDF real, pero del club social consolidado (educación + country club), no del fútbol aislado — Último chequeo: 2026-09-13
- [Independiente del Valle](fuentes/Ecuador/Independiente del Valle.md) — sin PDFs ni fuente pública identificada; sitio devolvió HTTP 403 — Último chequeo: 2026-09-13
- [Aucas](fuentes/Ecuador/Aucas.md) — sin PDFs ni fuente pública identificada — Último chequeo: 2026-09-13
- [Delfín SC](fuentes/Ecuador/Delfin SC.md) — sin PDFs ni fuente pública identificada — Último chequeo: 2026-09-13
- [Universidad Católica](fuentes/Ecuador/Universidad Catolica.md) — sin PDFs ni fuente pública identificada — Último chequeo: 2026-09-13
- [El Nacional](fuentes/Ecuador/El Nacional.md) — sin PDFs ni fuente pública identificada; sitio no renderizó vía WebFetch — Último chequeo: 2026-09-13
- [Macará](fuentes/Ecuador/Macara.md) — sin PDFs ni fuente pública identificada; sitio con certificado SSL vencido — Último chequeo: 2026-09-13
- [Deportivo Cuenca](fuentes/Ecuador/Deportivo Cuenca.md) — PDF real (informe presidencial de caja, no estado contable devengado) — Último chequeo: 2026-09-13
- [Mushuc Runa](fuentes/Ecuador/Mushuc Runa.md) — sin PDFs ni fuente pública identificada; ojo con la cooperativa financiera homónima, entidad distinta — Último chequeo: 2026-09-13
- [Técnico Universitario](fuentes/Ecuador/Tecnico Universitario.md) — sin PDFs ni fuente pública identificada; sitio devolvió HTTP 500 — Último chequeo: 2026-09-13
- [Orense SC](fuentes/Ecuador/Orense SC.md) — sin PDFs ni fuente pública identificada; sitio devolvió HTTP 503 — Último chequeo: 2026-09-13
- [Notas generales de Ecuador](fuentes/Ecuador/_notas-generales.md)

### Bolivia

- [Bolívar](fuentes/Bolivia/Bolívar.md) — sin hits, sin estructura societaria equivalente — Último chequeo: 2026-09-12
- [The Strongest](fuentes/Bolivia/The Strongest.md) — sin hits, sin estructura societaria equivalente — Último chequeo: 2026-09-12
- [Wilstermann](fuentes/Bolivia/Wilstermann.md) — sin hits, sin estructura societaria equivalente — Último chequeo: 2026-09-12

### Venezuela

- [Caracas FC](fuentes/Venezuela/Caracas FC.md) — primer chequeo, sin hits — Último chequeo: 2026-09-12
- [Deportivo Táchira](fuentes/Venezuela/Deportivo Táchira.md) — primer chequeo, sin hits — Último chequeo: 2026-09-12

### Japón

- [Cerezo Osaka](<fuentes/Japón/Cerezo Osaka.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [FC Tokyo](<fuentes/Japón/FC Tokyo.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [Gamba Osaka](<fuentes/Japón/Gamba Osaka.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [Kashima Antlers](<fuentes/Japón/Kashima Antlers.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [Kawasaki Frontale](<fuentes/Japón/Kawasaki Frontale.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [Nagoya Grampus](<fuentes/Japón/Nagoya Grampus.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [Sanfrecce Hiroshima](<fuentes/Japón/Sanfrecce Hiroshima.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [Urawa Red Diamonds](<fuentes/Japón/Urawa Red Diamonds.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [Vissel Kobe](<fuentes/Japón/Vissel Kobe.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [Yokohama F. Marinos](<fuentes/Japón/Yokohama F. Marinos.md>) — CARGADO (Ejercicio 2025) — Último chequeo: 2026-09-13
- [Notas generales de Japón](<fuentes/Japón/_notas-generales.md>) — IMPORTANTE: corregido en esta sesión, el desglose por club es más limitado de lo que decía la nota original (ver el archivo)

**Clubes de CONCACAF (Norte/Centroamérica/Caribe):** mismo criterio de sourcing puro que Sudamérica —
región confirmada como la más difícil del proyecto hasta ahora (MLS single-entity, Liga MX
mayormente privada, sin tradición de CMF/Supersociedades en Centroamérica), pero con un hallazgo real
inesperado en México (Club América vía Ollamani, S.A.B., cotizante en BMV). Ver
`.claude/skills/club-sourcing/SKILL.md` sección 7 para la metodología completa.

### México

- [Club América](<fuentes/México/Club América.md>) — CARGADO al sitio (Ejercicio 2025) vía segmento "Fútbol" de Ollamani S.A.B. (BMV), ver `data/clubamerica-data.js`; Ejercicio 2024 (11 meses, período inicial) descargado pero sin cargar — Último chequeo: 2026-09-13
- [Cruz Azul](fuentes/México/Cruz Azul.md) — sin PDF, cooperativa auditada sin disclosure público — Último chequeo: 2026-09-13
- [Notas generales de México](fuentes/México/_notas-generales.md)

### Costa Rica

- [Alajuelense](fuentes/Costa Rica/Alajuelense.md) — sin PDF, informes a socios sin publicar — Último chequeo: 2026-09-13
- [Saprissa](fuentes/Costa Rica/Saprissa.md) — sin PDF, auditado por Grant Thornton pero no público — Último chequeo: 2026-09-13
- [Herediano](fuentes/Costa Rica/Herediano.md) — sin PDF ni evidencia de asamblea pública — Último chequeo: 2026-09-13
- [Notas generales de Costa Rica](fuentes/Costa Rica/_notas-generales.md)

### Honduras

- [Olimpia](fuentes/Honduras/Olimpia.md) — sin PDFs ni hits — Último chequeo: 2026-09-13
- [Motagua](fuentes/Honduras/Motagua.md) — sin PDFs ni hits — Último chequeo: 2026-09-13
- [Notas generales de Honduras](fuentes/Honduras/_notas-generales.md)

### Panamá

- [Tauro FC](<fuentes/Panamá/Tauro FC.md>) — sin PDFs, confirmado sin registro en SMV — Último chequeo: 2026-09-13
- [Notas generales de Panamá](fuentes/Panamá/_notas-generales.md)

### Guatemala

- [Comunicaciones](fuentes/Guatemala/Comunicaciones.md) — sin PDFs, S.A. de dueño único — Último chequeo: 2026-09-13
- [Municipal](fuentes/Guatemala/Municipal.md) — sin PDFs, estructura societaria sin confirmar — Último chequeo: 2026-09-13
- [Notas generales de Guatemala](fuentes/Guatemala/_notas-generales.md)

### Jamaica

- [Waterhouse FC](<fuentes/Jamaica/Waterhouse FC.md>) — sin PDF, lead sin cerrar (Companies Act) — Último chequeo: 2026-09-13
- [Notas generales de Jamaica](fuentes/Jamaica/_notas-generales.md)

### Estados Unidos

- [Atlanta Braves](<fuentes/Estados Unidos/Atlanta Braves.md>) — **béisbol (MLB)** — 10-K 2025 real descargado, 3 ejercicios disponibles — Último chequeo: 2026-09-13
- [New York Knicks](<fuentes/Estados Unidos/New York Knicks.md>) — **básquet (NBA)** — 10-K FY2026 real descargado, comparte documento con los Rangers — Último chequeo: 2026-09-13
- [New York Rangers](<fuentes/Estados Unidos/New York Rangers.md>) — **hockey sobre hielo (NHL)** — mismo 10-K de MSG Sports que los Knicks — Último chequeo: 2026-09-13
- [LA Galaxy](<fuentes/Estados Unidos/LA Galaxy.md>) — fútbol (MLS) — sin PDF, dead-end estructural (single-entity) — Último chequeo: 2026-09-13
- [Notas generales de Estados Unidos](<fuentes/Estados Unidos/_notas-generales.md>) — el dead-end de la MLS NO se extiende al resto de los deportes: la SEC sí es un canal

**Clubes de África:** Primer barrido de sourcing en el continente (sesión 2026-09-13), 0 clubes con
PDF real conseguido pero 4 países investigados a fondo con metodología propia por país — ver
`.claude/skills/club-sourcing/SKILL.md` sección 7 para el resumen metodológico y por qué Marruecos
es la pista más prometedora para retomar (mecanismo regulatorio real vía OMPIC, bloqueado solo por
un pago que un agente no puede completar).

### Sudáfrica

- [Kaizer Chiefs](fuentes/Sudáfrica/Kaizer Chiefs.md) — (Pty) Ltd, exceptuado de presentar AFS ante CIPC — Último chequeo: 2026-09-13
- [Orlando Pirates](fuentes/Sudáfrica/Orlando Pirates.md) — (Pty) Ltd, mismo dead-end; manual PAIA sin leer (403) — Último chequeo: 2026-09-13
- [Mamelodi Sundowns](fuentes/Sudáfrica/Mamelodi Sundowns.md) — (Pty) Ltd, mismo dead-end — Último chequeo: 2026-09-13
- [SuperSport United](fuentes/Sudáfrica/SuperSport United.md) — (Pty) Ltd, ex-MultiChoice, inmaterial en sus EEFF — Último chequeo: 2026-09-13
- [Royal AM](fuentes/Sudáfrica/Royal AM.md) — (Pty) Ltd, caso judicial SARS sin balance adjunto — Último chequeo: 2026-09-13
- [Stellenbosch FC](fuentes/Sudáfrica/Stellenbosch FC.md) — no verificado individualmente, mismo techo esperado — Último chequeo: 2026-09-13
- [Sekhukhune United](fuentes/Sudáfrica/Sekhukhune United.md) — no verificado individualmente, mismo techo esperado — Último chequeo: 2026-09-13
- [Cape Town City](fuentes/Sudáfrica/Cape Town City.md) — no verificado individualmente, mismo techo esperado — Último chequeo: 2026-09-13
- [TS Galaxy](fuentes/Sudáfrica/TS Galaxy.md) — no verificado individualmente, mismo techo esperado — Último chequeo: 2026-09-13
- [Golden Arrows](fuentes/Sudáfrica/Golden Arrows.md) — no verificado individualmente, mismo techo esperado — Último chequeo: 2026-09-13
- [Notas generales de Sudáfrica](fuentes/Sudáfrica/_notas-generales.md)

### Egipto

- [Al Ahly](fuentes/Egipto/Al Ahly.md) — asociación deportiva, sin regulador que exija publicar — Último chequeo: 2026-09-13
- [Zamalek](fuentes/Egipto/Zamalek.md) — asociación deportiva, ni transparencia interna confirmada — Último chequeo: 2026-09-13
- [Notas generales de Egipto](fuentes/Egipto/_notas-generales.md)

### Marruecos

- [Wydad AC](<fuentes/Marruecos/Wydad AC.md>) — SAS real, reporte financiero solo para socios; pista OMPIC sin cerrar — Último chequeo: 2026-09-13
- [Raja Casablanca](fuentes/Marruecos/Raja Casablanca.md) — SAS con Marsa Maroc al 60%, no consolida; pista OMPIC sin cerrar — Último chequeo: 2026-09-13
- [Notas generales de Marruecos](fuentes/Marruecos/_notas-generales.md)

### Alemania

**Primer país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-16/17), recorrida en
orden alfabético.** Los 18 clubes de la Bundesliga 2025/26 quedaron cubiertos entre dos canales:
Unternehmensregister (el "Companies House alemán") para los que tienen sociedad propia, y el
Finanzkennzahlen de la DFL (un solo PDF con los 18 clubes por ejercicio) para los que no. Ver
`fuentes/Alemania/_notas-generales.md` y la sección 12 del skill de sourcing para el detalle
completo.

- [Borussia Dortmund](<fuentes/Alemania/Borussia Dortmund.md>) — 7 ejercicios reales (2018/19-2024/25), Geschäftsbericht completo, sin cargar aún — Último chequeo: 2026-09-17
- [Bayern Munich](<fuentes/Alemania/Bayern Munich.md>) — 4 ejercicios reales vía comunicado de la Junta, sin cargar aún — Último chequeo: 2026-09-17
- [RB Leipzig](<fuentes/Alemania/RB Leipzig.md>) — 12 ejercicios reales, serie completa 2014-2025, sin cargar aún — Último chequeo: 2026-09-17
- [TSG Hoffenheim](<fuentes/Alemania/TSG Hoffenheim.md>) — 16 ejercicios reales, serie completa 2009-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Bayer Leverkusen](<fuentes/Alemania/Bayer Leverkusen.md>) — dead-end estructural (exención §264 HGB, socio único Bayer AG), solo el agregado de la DFL — Último chequeo: 2026-09-17
- [VfL Wolfsburg](<fuentes/Alemania/VfL Wolfsburg.md>) — dead-end estructural (exención §264 HGB, socio único Volkswagen AG), solo el agregado de la DFL — Último chequeo: 2026-09-17
- [Hamburger SV](<fuentes/Alemania/Hamburger SV.md>) — 4 ejercicios reales de 2 entidades (Fußball AG & Co. KGaA + e.V. matriz, no confundir) — Último chequeo: 2026-09-17
- [Borussia Mönchengladbach](<fuentes/Alemania/Borussia Mönchengladbach.md>) — 4 ejercicios reales (2021-2024), confirmado real filer con serie completa desde 2006, sin cargar aún — Último chequeo: 2026-09-17
- [Werder Bremen](<fuentes/Alemania/Werder Bremen.md>) — 3 ejercicios reales (2022/23-2024/25), sin cargar aún — Último chequeo: 2026-09-17
- [Eintracht Frankfurt](<fuentes/Alemania/Eintracht Frankfurt.md>) — 2 ejercicios reales (2023/24-2024/25), sin cargar aún — Último chequeo: 2026-09-17
- [VfB Stuttgart](<fuentes/Alemania/VfB Stuttgart.md>) — 2 ejercicios reales (2023-2024), sin cargar aún — Último chequeo: 2026-09-17
- [1. FC Köln](<fuentes/Alemania/1. FC Köln.md>) — 2 ejercicios reales (2023/24-2024/25), sin cargar aún — Último chequeo: 2026-09-17
- [FC Augsburg](<fuentes/Alemania/FC Augsburg.md>) — 2 ejercicios reales (2023/24-2024/25), sin cargar aún — Último chequeo: 2026-09-17
- [1. FC Union Berlin](<fuentes/Alemania/1. FC Union Berlin.md>) — 100% e.V., balance real solo para socios, solo el agregado de la DFL — Último chequeo: 2026-09-17
- [SC Freiburg](<fuentes/Alemania/SC Freiburg.md>) — 100% e.V., sin balance descargable, solo el agregado de la DFL — Último chequeo: 2026-09-17
- [1. FSV Mainz 05](<fuentes/Alemania/1. FSV Mainz 05.md>) — 100% e.V., sin balance descargable, solo el agregado de la DFL — Último chequeo: 2026-09-17
- [FC St. Pauli](<fuentes/Alemania/FC St. Pauli.md>) — 100% e.V., balance real solo para socios, solo el agregado de la DFL — Último chequeo: 2026-09-17
- [1. FC Heidenheim](<fuentes/Alemania/1. FC Heidenheim.md>) — 100% e.V., sin balance descargable, solo el agregado de la DFL — Último chequeo: 2026-09-17
- DFL Finanzkennzahlen — 7 ejercicios agregados (2018-2024) con Bilanz+GuV de los 18 clubes a la vez, en `Clubes/Alemania/_DFL-Finanzkennzahlen/` — Último chequeo: 2026-09-17
- [Notas generales de Alemania](<fuentes/Alemania/_notas-generales.md>)

### Austria

**Segundo país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17), tras Alemania
(Arabia Saudita quedó saltada a pedido de Guido).** El Firmenbuch austríaco existe pero está bloqueado
por login+pago (misma clase de barrera que el OMPIC marroquí) — el hallazgo real es el agregado de
Finanzkennzahlen de la Österreichische Fußball-Bundesliga, equivalente al DFL alemán. Ver
`fuentes/Austria/_notas-generales.md` y la sección 13 del skill de sourcing.

- [Rapid Wien](<fuentes/Austria/Rapid Wien.md>) — 15 ejercicios reales, serie completa 2010/11-2024/25, sin cargar aún — Último chequeo: 2026-09-17
- [Austria Wien](<fuentes/Austria/Austria Wien.md>) — sin PDF propio, cifras reales en notas de prensa (2021/22-2023/24) + agregado ÖFBL — Último chequeo: 2026-09-17
- [Red Bull Salzburg](<fuentes/Austria/Red Bull Salzburg.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- [Sturm Graz](<fuentes/Austria/Sturm Graz.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- [LASK](<fuentes/Austria/LASK.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- [TSV Hartberg](<fuentes/Austria/TSV Hartberg.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- [WSG Tirol](<fuentes/Austria/WSG Tirol.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- [SCR Altach](<fuentes/Austria/SCR Altach.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- [SV Ried](<fuentes/Austria/SV Ried.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- [Wolfsberger AC](<fuentes/Austria/Wolfsberger AC.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- [Grazer AK](<fuentes/Austria/Grazer AK.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- [Blau-Weiß Linz](<fuentes/Austria/Blau-Weiß Linz.md>) — Firmenbuch confirmado (bloqueado por pago), solo agregado ÖFBL — Último chequeo: 2026-09-17
- Bundesliga-Finanzkennzahlen — 8 ejercicios agregados (2017/18-2024/25) con Bilanz+GuV de los 24 clubes de ambas divisiones, en `Clubes/Austria/_Bundesliga-Finanzkennzahlen/` — Último chequeo: 2026-09-17
- [Notas generales de Austria](<fuentes/Austria/_notas-generales.md>)

### Bélgica

**Tercer país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17).** La Centrale
des bilans del Banco Nacional de Bélgica (`consult.cbso.nbb.be`) resultó ser el canal más abierto
encontrado hasta ahora en el proyecto: gratis, sin login, con una API JSON scriptable por `curl`
(sin necesitar browser) — permitió series de hasta 35 ejercicios por club. Ver
`fuentes/Bélgica/_notas-generales.md` y la sección 14 del skill de sourcing.

- [Anderlecht](<fuentes/Bélgica/Anderlecht.md>) — 15 ejercicios reales, serie 2011-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Antwerp](<fuentes/Bélgica/Antwerp.md>) — 14 ejercicios reales, serie 2012-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Cercle Brugge](<fuentes/Bélgica/Cercle Brugge.md>) — 11 ejercicios reales, serie completa 2015-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Charleroi](<fuentes/Bélgica/Charleroi.md>) — 25 ejercicios reales, serie 2001-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Club Brugge](<fuentes/Bélgica/Club Brugge.md>) — 35 ejercicios reales, serie 1999-2025 (entidad "De Klokke" hasta 2011), sin cargar aún — Último chequeo: 2026-09-17
- [Dender EH](<fuentes/Bélgica/Dender EH.md>) — 15 ejercicios reales con huecos, sin cargar aún — Último chequeo: 2026-09-17
- [Genk](<fuentes/Bélgica/Genk.md>) — 19 ejercicios reales, serie 2007-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Gent](<fuentes/Bélgica/Gent.md>) — 26 ejercicios reales, serie 2005-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Mechelen](<fuentes/Bélgica/Mechelen.md>) — 20 ejercicios reales, serie 2007-2025, sin cargar aún — Último chequeo: 2026-09-17
- [OH Leuven](<fuentes/Bélgica/OH Leuven.md>) — 9 ejercicios reales, serie completa 2017-2025 (entidad correcta confirmada por turnover, hay 2 entidades homónimas sin usar), sin cargar aún — Último chequeo: 2026-09-17
- [RAAL La Louvière](<fuentes/Bélgica/RAAL La Louvière.md>) — 8 ejercicios reales, serie 2018-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Sint-Truiden](<fuentes/Bélgica/Sint-Truiden.md>) — 13 ejercicios reales, serie 2013-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Standard Liège](<fuentes/Bélgica/Standard Liège.md>) — 31 ejercicios reales, serie 1999-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Union Saint-Gilloise](<fuentes/Bélgica/Union Saint-Gilloise.md>) — 28 ejercicios reales, serie 1999-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Westerlo](<fuentes/Bélgica/Westerlo.md>) — 27 ejercicios reales, serie 1998-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Zulte Waregem](<fuentes/Bélgica/Zulte Waregem.md>) — 14 ejercicios reales, serie 2012-2025 (entidad legal "Grensverleggend NV", no el nombre del club), sin cargar aún — Último chequeo: 2026-09-17
- Deloitte Pro League Report — 5 ediciones agregadas (2019-2023), estudio socioeconómico de toda la liga, en `Clubes/Bélgica/_Deloitte-ProLeague-Report/` — Último chequeo: 2026-09-17
- [Notas generales de Bélgica](<fuentes/Bélgica/_notas-generales.md>)

### China

**Cuarto país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17).** Mayormente
dead-end por diseño societario (accionista único, sin obligación de depósito), pero no es un
dead-end de liga completa como Nigeria — sí hay sociedades reales, y la CSL viene de una ola de
reestructuraciones 2023-2025 que puede volver cotizante a un accionista que hoy no lo es. Ver
`fuentes/China/_notas-generales.md` y la sección 15 del skill de sourcing.

- [Shanghai Port](<fuentes/China/Shanghai Port.md>) — único accionista que cotiza (SIPG, SSE:600018), sin cifras propias del club en su consolidado — Último chequeo: 2026-09-17
- [Shanghai Shenhua](<fuentes/China/Shanghai Shenhua.md>) — dead-end, dueño estatal no cotizante (Jiushi Group) — Último chequeo: 2026-09-17
- [Beijing Guoan](<fuentes/China/Beijing Guoan.md>) — dead-end, dueño privado no cotizante (Zhonghe Group) — Último chequeo: 2026-09-17
- [Shandong Taishan](<fuentes/China/Shandong Taishan.md>) — dead-end, consorcio estatal no cotizante — Último chequeo: 2026-09-17
- [Tianjin Jinmen Tiger](<fuentes/China/Tianjin Jinmen Tiger.md>) — dead-end, propiedad directa de organismo de gobierno — Último chequeo: 2026-09-17
- [Zhejiang](<fuentes/China/Zhejiang.md>) — dead-end no cerrado del todo, ángulo Zhejiang Energy Group sin agotar — Último chequeo: 2026-09-17
- [Henan](<fuentes/China/Henan.md>) — dead-end actual; ex-accionista Jianye (HKEX:0832) ya vendió su parte, ver duda en dudas-por-club.md — Último chequeo: 2026-09-17
- [Dalian Yingbo](<fuentes/China/Dalian Yingbo.md>) — dead-end, dueño privado no cotizante — Último chequeo: 2026-09-17
- [Shenzhen Peng City](<fuentes/China/Shenzhen Peng City.md>) — dead-end, City Football Group no publica EEFF — Último chequeo: 2026-09-17
- [Wuhan Three Towns](<fuentes/China/Wuhan Three Towns.md>) — dead-end, estructura societaria en transición desde 2023 — Último chequeo: 2026-09-17
- [Qingdao Hainiu](<fuentes/China/Qingdao Hainiu.md>) — dead-end, dueño privado en crisis (atrasos salariales) — Último chequeo: 2026-09-17
- [Qingdao West Coast](<fuentes/China/Qingdao West Coast.md>) — dead-end, dueño privado en crisis — Último chequeo: 2026-09-17
- [Yunnan Yukun](<fuentes/China/Yunnan Yukun.md>) — dead-end, dueño privado no cotizante — Último chequeo: 2026-09-17
- [Chongqing Tonglianglong](<fuentes/China/Chongqing Tonglianglong.md>) — dead-end, sponsor cotizante (Southwest Securities) no es accionista — Último chequeo: 2026-09-17
- [Chengdu Rongcheng](<fuentes/China/Chengdu Rongcheng.md>) — dead-end, holding estatal municipal no cotizante — Último chequeo: 2026-09-17
- [Liaoning Tieren](<fuentes/China/Liaoning Tieren.md>) — sin verificar a fondo, no es dead-end confirmado — Último chequeo: 2026-09-17
- [Guangzhou Evergrande](<fuentes/China/Guangzhou Evergrande.md>) — histórico, ya NO juega en la CSL — 5 ejercicios anuales reales 2015-2019 + semestral 2020, único club chino que cotizó (NEEQ:834338), ver duda sobre si cargarlo en dudas-por-club.md — Último chequeo: 2026-09-17
- [Notas generales de China](<fuentes/China/_notas-generales.md>)

### Corea del Sur

**Quinto país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17).** El **DART**
(`dart.fss.or.kr`, el regulador de mercado surcoreano) funcionó como un canal real tipo EDGAR/SEC
para los clubes propiedad de chaebols que cotizan — hay que buscar la razón social legal de la
entidad operadora (ej. "지에스스포츠"), nunca el nombre público del club. Ver
`fuentes/Corea del Sur/_notas-generales.md` y la sección 16 del skill de sourcing.

- [FC Seoul](<fuentes/Corea del Sur/FC Seoul.md>) — 10 ejercicios reales, serie completa FY2016-2025 (GS Sports/GS Group), sin cargar aún — Último chequeo: 2026-09-17
- [Jeju SK](<fuentes/Corea del Sur/Jeju SK.md>) — 10 ejercicios reales, serie completa FY2016-2025 (SK Group, ex Jeju United), sin cargar aún — Último chequeo: 2026-09-17
- [Daejeon Hana Citizen](<fuentes/Corea del Sur/Daejeon Hana Citizen.md>) — 4 ejercicios reales (FY2016-2019), se corta al reestructurarse con Hana Financial en 2020, ver duda en dudas-por-club.md — Último chequeo: 2026-09-17
- [Jeonbuk Hyundai Motors](<fuentes/Corea del Sur/Jeonbuk Hyundai Motors.md>) — 2 ejercicios reales (FY2024-2025, únicos disponibles), Hyundai Motor Company — Último chequeo: 2026-09-17
- [Ulsan HD](<fuentes/Corea del Sur/Ulsan HD.md>) — semi-dead-end, entidad existe en DART pero sin informes de auditoría en 10 años, ver duda en dudas-por-club.md — Último chequeo: 2026-09-17
- [Pohang Steelers](<fuentes/Corea del Sur/Pohang Steelers.md>) — dead-end, entidad no aparece en DART, POSCO no la desglosa — Último chequeo: 2026-09-17
- [Daegu FC](<fuentes/Corea del Sur/Daegu FC.md>) — dead-end estructural (시민구단, club ciudadano sin fines de lucro) — Último chequeo: 2026-09-17
- [Gwangju FC](<fuentes/Corea del Sur/Gwangju FC.md>) — dead-end estructural (시민구단) — Último chequeo: 2026-09-17
- [FC Anyang](<fuentes/Corea del Sur/FC Anyang.md>) — dead-end estructural (시민구단) — Último chequeo: 2026-09-17
- [Gangwon FC](<fuentes/Corea del Sur/Gangwon FC.md>) — dead-end estructural (도민구단, club provincial) — Último chequeo: 2026-09-17
- [Suwon FC](<fuentes/Corea del Sur/Suwon FC.md>) — dead-end estructural (시민구단) — Último chequeo: 2026-09-17
- [Gimcheon Sangmu](<fuentes/Corea del Sur/Gimcheon Sangmu.md>) — dead-end estructural (사단법인 sin fines de lucro, club del ejército) — Último chequeo: 2026-09-17
- [Notas generales de Corea del Sur](<fuentes/Corea del Sur/_notas-generales.md>)

### Croacia

**Sexto país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17).** El registro
central croata (RGFI-JAV/FINA) NO es gratis como Bélgica/Alemania — exige cuenta para cualquier
acceso. El canal real fue sourcing directo club por club, sostenido por el mandato de licenciamiento
de la HNS (que exige publicar los mismos formularios F.01/F.02 en los 10 sitios). Ver
`fuentes/Croacia/_notas-generales.md` y la sección 17 (propuesta) del skill de sourcing.

- [Dinamo Zagreb](<fuentes/Croacia/Dinamo Zagreb.md>) — 5 ejercicios reales (2019-2022, 2024), sin cargar aún — Último chequeo: 2026-09-17
- [Gorica](<fuentes/Croacia/Gorica.md>) — 7 ejercicios reales (2019-2025), sin cargar aún — Último chequeo: 2026-09-17
- [Hajduk Split](<fuentes/Croacia/Hajduk Split.md>) — 8 ejercicios reales (2018-2025, 2021 ilegible), sin cargar aún — Último chequeo: 2026-09-17
- [Istra 1961](<fuentes/Croacia/Istra 1961.md>) — 6 ejercicios reales (2020-2025), sin cargar aún — Último chequeo: 2026-09-17
- [Lokomotiva](<fuentes/Croacia/Lokomotiva.md>) — encontrado pero bloqueado por Scribd (login/pago), sin PDF, ver duda en dudas-por-club.md — Último chequeo: 2026-09-17
- [Osijek](<fuentes/Croacia/Osijek.md>) — 7 ejercicios reales (2018-2020, 2022-2025), sin cargar aún — Último chequeo: 2026-09-17
- [Rijeka](<fuentes/Croacia/Rijeka.md>) — 9 ejercicios reales, serie completa 2017-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Slaven Belupo](<fuentes/Croacia/Slaven Belupo.md>) — 2 ejercicios reales (2024-2025), sin cargar aún — Último chequeo: 2026-09-17
- [Varaždin](<fuentes/Croacia/Varaždin.md>) — 1 ejercicio real (2025, conversión societaria reciente), sin cargar aún — Último chequeo: 2026-09-17
- [Vukovar 1991](<fuentes/Croacia/Vukovar 1991.md>) — 1 ejercicio real (2025, recién ascendido), sin cargar aún — Último chequeo: 2026-09-17
- [Notas generales de Croacia](<fuentes/Croacia/_notas-generales.md>)

### Dinamarca

**Séptimo país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). El mejor canal
del proyecto junto con Bélgica**: la API pública de la Erhvervsstyrelsen (`distribution.virk.dk`) es
gratis, sin login, sin bloqueo de Cloudflare, y scripteable con curl — los 12 clubes de la Superliga
2025/26 quedaron cubiertos con series de 17 a 30 ejercicios cada uno (307 documentos reales). Ver
`fuentes/Dinamarca/_notas-generales.md` y la sección 18 del skill de sourcing.

- [AGF](<fuentes/Dinamarca/AGF.md>) — 30 ejercicios reales, serie completa 1995-2025/26, sin cargar aún — Último chequeo: 2026-09-17
- [Brøndby](<fuentes/Dinamarca/Brøndby.md>) — 30 ejercicios reales, serie completa 1995-2025, sin cargar aún — Último chequeo: 2026-09-17
- [FC København](<fuentes/Dinamarca/FC København.md>) — 30 ejercicios del consolidado PARKEN S&E + 3 de la entidad de fútbol standalone (desde 2023), ver duda en dudas-por-club.md — Último chequeo: 2026-09-17
- [FC Midtjylland](<fuentes/Dinamarca/FC Midtjylland.md>) — 17 ejercicios reales, serie completa 2008/09-2024/25, sin cargar aún — Último chequeo: 2026-09-17
- [FC Fredericia](<fuentes/Dinamarca/FC Fredericia.md>) — 22 ejercicios reales, serie completa 2004-2025, sin cargar aún — Último chequeo: 2026-09-17
- [FC Nordsjælland](<fuentes/Dinamarca/FC Nordsjælland.md>) — 26 ejercicios reales, serie completa 2000-2025, sin cargar aún — Último chequeo: 2026-09-17
- [OB](<fuentes/Dinamarca/OB.md>) — 30 ejercicios reales, perímetro mezclado con otras actividades del grupo, ver duda en dudas-por-club.md — Último chequeo: 2026-09-17
- [Randers FC](<fuentes/Dinamarca/Randers FC.md>) — 30 ejercicios reales, serie completa 1995-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Silkeborg IF](<fuentes/Dinamarca/Silkeborg IF.md>) — 24 ejercicios reales, serie completa 2002-2025, sin cargar aún — Último chequeo: 2026-09-17
- [SønderjyskE](<fuentes/Dinamarca/SønderjyskE.md>) — 17 ejercicios reales, serie completa 2008/09-2024/25, sin cargar aún — Último chequeo: 2026-09-17
- [Vejle](<fuentes/Dinamarca/Vejle.md>) — 18 ejercicios reales, serie completa 2008-2025, sin cargar aún — Último chequeo: 2026-09-17
- [Viborg FF](<fuentes/Dinamarca/Viborg FF.md>) — 30 ejercicios reales, serie completa 1995/96-2024/25, sin ninguna transición de ejercicio, sin cargar aún — Último chequeo: 2026-09-17
- [Notas generales de Dinamarca](<fuentes/Dinamarca/_notas-generales.md>)

### Francia

**Octavo país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17).** Sin registro
mercantil gratis tipo Bélgica/Dinamarca (`data.inpi.fr` existe pero está bloqueado por
captcha+cuenta, no por pago). El hallazgo real fue la **DNCG**, que publica un agregado de liga con
el bilan+resultado INDIVIDUAL de cada club (no solo KPIs agregados como DFL/ÖFBL) — 21 temporadas
descargadas, los 18 clubes actuales cubiertos. Olympique Lyonnais además tiene disclosure propio vía
su holding cotizante (Eagle Football Group, Euronext Paris). Ver `fuentes/Francia/_notas-generales.md`
y la sección 19 (propuesta) del skill de sourcing.

- [Paris Saint-Germain](<fuentes/Francia/Paris Saint-Germain.md>) — cubierto vía agregado DNCG (21 temporadas), sin cargar aún — Último chequeo: 2026-09-17
- [Olympique Lyonnais](<fuentes/Francia/Olympique Lyonnais.md>) — 9 ejercicios de DEU público (Eagle Football Group cotiza) + agregado DNCG, ver duda de perímetro en dudas-por-club.md — Último chequeo: 2026-09-17
- [Angers SCO](<fuentes/Francia/Angers SCO.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [AJ Auxerre](<fuentes/Francia/AJ Auxerre.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [Stade Brestois 29](<fuentes/Francia/Stade Brestois 29.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [Le Havre AC](<fuentes/Francia/Le Havre AC.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [RC Lens](<fuentes/Francia/RC Lens.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [LOSC Lille](<fuentes/Francia/LOSC Lille.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [FC Lorient](<fuentes/Francia/FC Lorient.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [Olympique de Marseille](<fuentes/Francia/Olympique de Marseille.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [FC Metz](<fuentes/Francia/FC Metz.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [AS Monaco](<fuentes/Francia/AS Monaco.md>) — cubierto vía agregado DNCG, ver duda sobre entidad monegasca en dudas-por-club.md — Último chequeo: 2026-09-17
- [FC Nantes](<fuentes/Francia/FC Nantes.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [OGC Nice](<fuentes/Francia/OGC Nice.md>) — cubierto vía agregado DNCG; 28 comptes annuels confirmados en INPI, bloqueados por captcha+cuenta — Último chequeo: 2026-09-17
- [Paris FC](<fuentes/Francia/Paris FC.md>) — cubierto vía agregado DNCG (incl. años en Ligue 2), sin cargar aún — Último chequeo: 2026-09-17
- [Stade Rennais FC](<fuentes/Francia/Stade Rennais FC.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [RC Strasbourg Alsace](<fuentes/Francia/RC Strasbourg Alsace.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [Toulouse FC](<fuentes/Francia/Toulouse FC.md>) — cubierto vía agregado DNCG, sin cargar aún — Último chequeo: 2026-09-17
- [Notas generales de Francia](<fuentes/Francia/_notas-generales.md>)

### Grecia

**Noveno país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17).** El ΓΕΜΗ
(`publicity.businessportal.gr`) resultó gratis, sin login y descargable directo con `curl` — mejor
canal del proyecto junto con Bélgica/Dinamarca. Los 14 clubes de la Super League Greece 2025/26
cubiertos con documentos oficiales reales, sin ningún dead-end — el primer país del proyecto con
100% de la liga top cubierta con un solo canal. Ver `fuentes/Grecia/_notas-generales.md` y la
sección 20 del skill de sourcing.

- [Olympiacos](<fuentes/Grecia/Olympiacos.md>) — 10 ejercicios 2015/16-2024/25, sin cargar aún — Último chequeo: 2026-09-17
- [Panathinaikos](<fuentes/Grecia/Panathinaikos.md>) — 10 ejercicios 2015/16-2024/25, sin cargar aún — Último chequeo: 2026-09-17
- [AEK Athens](<fuentes/Grecia/AEK Athens.md>) — 9 ejercicios 2016/17-2024/25, ver dudas de archivos duplicados en dudas-por-club.md — Último chequeo: 2026-09-17
- [AEL Larissa](<fuentes/Grecia/AEL Larissa.md>) — 10 ejercicios 2015/16-2024/25, sin cargar aún — Último chequeo: 2026-09-17
- [PAOK](<fuentes/Grecia/PAOK.md>) — 8 ejercicios 2016/17-2024/25 (falta 2017/18), sin cargar aún — Último chequeo: 2026-09-17
- [Atromitos](<fuentes/Grecia/Atromitos.md>) — 9 ejercicios 2015/16-2024/25 (falta 2017/18), sin cargar aún — Último chequeo: 2026-09-17
- [OFI Crete](<fuentes/Grecia/OFI Crete.md>) — 8 ejercicios 2017/18-2024/25, sin cargar aún — Último chequeo: 2026-09-17
- [Levadiakos](<fuentes/Grecia/Levadiakos.md>) — 8 ejercicios 2017/18-2024/25, sin cargar aún — Último chequeo: 2026-09-17
- [Panetolikos](<fuentes/Grecia/Panetolikos.md>) — 8 ejercicios 2015/16-2024/25 (faltan 2018/19 y 2020/21), sin cargar aún — Último chequeo: 2026-09-17
- [Aris](<fuentes/Grecia/Aris.md>) — 7 ejercicios 2018/19-2024/25 (falta 2019/20), sin cargar aún — Último chequeo: 2026-09-17
- [Asteras Tripolis](<fuentes/Grecia/Asteras Tripolis.md>) — 7 ejercicios 2018/19-2024/25, sin cargar aún — Último chequeo: 2026-09-17
- [Volos NFC](<fuentes/Grecia/Volos NFC.md>) — 7 ejercicios 2018/19-2024/25 (toda su vida), sin cargar aún — Último chequeo: 2026-09-17
- [Panserraikos](<fuentes/Grecia/Panserraikos.md>) — 5 ejercicios 2020/21-2024/25 (refundación tras liquidación, ver duda de perímetro en dudas-por-club.md), sin cargar aún — Último chequeo: 2026-09-17
- [Kifisia](<fuentes/Grecia/Kifisia.md>) — 4 ejercicios 2021/22-2024/25 (toda su vida), sin cargar aún — Último chequeo: 2026-09-17
- [Notas generales de Grecia](<fuentes/Grecia/_notas-generales.md>)

### Arabia Saudita

**Saltado a pedido de Guido (sesión 2026-09-16), sin investigar en profundidad.** Sospecha fundada
de dead-end estructural: varios clubes de la Saudi Pro League son sociedades anónimas CERRADAS
controladas por el PIF (fondo soberano) desde la reforma de 2023 — mismo patrón que Chile OTODP o
Sudáfrica (Pty) Ltd, donde la forma jurídica bloquea la publicación sin depender de cuánto se
busque. NO es una conclusión verificada con la metodología del proyecto (REGLA 2 de este archivo) —
si en el futuro se retoma, confirmar primero si algún club (o su controlante) cotiza en la Tadawul
(bolsa saudí) antes de asumir que es dead-end total.

### Nigeria

- [Notas generales de Nigeria](fuentes/Nigeria/_notas-generales.md) — dead-end a nivel liga completa (NPFL), clubes mayormente estatales sin registro CAC

### Inglaterra

Primer país con más de un deporte. El canal es **Companies House** (gratis, sin API key, toda
sociedad limitada obligada a depositar cuentas auditadas) y, para los clubes de cricket, el
**registro de mutuales de la FCA** — ver [Notas generales de Inglaterra](fuentes/Inglaterra/_notas-generales.md),
que es el archivo a leer antes de tocar cualquier club británico.

- [AFC Bournemouth](fuentes/Inglaterra/AFC Bournemouth.md) — 2 ejercicios reales (2023/24-2024/25), 14 disponibles — Último chequeo: 2026-09-16
- [Arsenal](fuentes/Inglaterra/Arsenal.md) — 2 ejercicios reales descargados (2023/24-2024/25), 18 disponibles — Último chequeo: 2026-09-13
- [Aston Villa](fuentes/Inglaterra/Aston Villa.md) — 1 ejercicio real (2024/25), 8 disponibles — Último chequeo: 2026-09-13
- [Brentford](fuentes/Inglaterra/Brentford.md) — 2 ejercicios reales (2023/24-2024/25), 12 disponibles — Último chequeo: 2026-09-16
- [Brighton & Hove Albion](fuentes/Inglaterra/Brighton & Hove Albion.md) — 2 ejercicios reales (2023/24-2024/25), 18 disponibles — Último chequeo: 2026-09-16
- [Burnley](fuentes/Inglaterra/Burnley.md) — 2 ejercicios reales (2023/24-2024/25), 13 disponibles; cuentas de la holding (Burnley FC Holdings Limited), no de la sociedad operativa — Último chequeo: 2026-09-16
- [Chelsea](fuentes/Inglaterra/Chelsea.md) — 1 ejercicio real (2024/25), 12 disponibles — Último chequeo: 2026-09-13
- [Crystal Palace](fuentes/Inglaterra/Crystal Palace.md) — 2 ejercicios reales (2023/24-2024/25), 15 disponibles; cuentas de la holding (CPFC 2010 Limited) — Último chequeo: 2026-09-16
- [Everton](fuentes/Inglaterra/Everton.md) — 2 ejercicios reales (2023/24-2024/25), 6 disponibles — Último chequeo: 2026-09-13
- [Fulham](fuentes/Inglaterra/Fulham.md) — 2 ejercicios reales (2023/24-2024/25), 20 disponibles — Último chequeo: 2026-09-16
- [Leeds United](fuentes/Inglaterra/Leeds United.md) — 2 ejercicios reales (2023/24-2024/25), 13 disponibles — Último chequeo: 2026-09-16
- [Liverpool](fuentes/Inglaterra/Liverpool.md) — 2 ejercicios reales (2023/24-2024/25), 16 disponibles — Último chequeo: 2026-09-13
- [Manchester City](fuentes/Inglaterra/Manchester City.md) — 2 ejercicios reales (2023/24-2024/25), 15 disponibles; cuentas individuales, no del grupo — Último chequeo: 2026-09-13
- [Manchester United](fuentes/Inglaterra/Manchester United.md) — 20-F 2024/25 real, **sin escanear (HTML)**, ingresos £666,5 M ya verificados — Último chequeo: 2026-09-13
- [Newcastle United](fuentes/Inglaterra/Newcastle United.md) — 1 ejercicio real (2024/25), 14 disponibles — Último chequeo: 2026-09-13
- [Nottingham Forest](fuentes/Inglaterra/Nottingham Forest.md) — 2 ejercicios reales (2023/24-2024/25), 13 disponibles — Último chequeo: 2026-09-16
- [Sunderland](fuentes/Inglaterra/Sunderland.md) — 2 ejercicios reales (2023/24-2024/25), 15 disponibles — Último chequeo: 2026-09-16
- [Tottenham Hotspur](fuentes/Inglaterra/Tottenham Hotspur.md) — 2 ejercicios reales (2023/24-2024/25), 12 disponibles — Último chequeo: 2026-09-13
- [West Ham United](fuentes/Inglaterra/West Ham United.md) — 1 ejercicio real (2024/25), 9 disponibles — Último chequeo: 2026-09-13
- [Wolverhampton Wanderers](fuentes/Inglaterra/Wolverhampton Wanderers.md) — 2 ejercicios reales (2023/24-2024/25), 24 disponibles — Último chequeo: 2026-09-16
- [Bath Rugby](fuentes/Inglaterra/Bath Rugby.md) — **rugby union (Premiership)** — 2 ejercicios reales, ingresos £23,3 M verificados, 16 disponibles — Último chequeo: 2026-09-13
- [Harlequins](fuentes/Inglaterra/Harlequins.md) — **rugby union (Premiership)** — 1 ejercicio real (2022/23), 13 disponibles; los 2 últimos son cuentas abreviadas, verificar — Último chequeo: 2026-09-13
- [Leicester Tigers](fuentes/Inglaterra/Leicester Tigers.md) — **rugby union (Premiership)** — 2 ejercicios reales, 12 disponibles — Último chequeo: 2026-09-13
- [Northampton Saints](fuentes/Inglaterra/Northampton Saints.md) — **rugby union (Premiership)** — 2 ejercicios reales, 14 disponibles — Último chequeo: 2026-09-13
- [Lancashire CCC](fuentes/Inglaterra/Lancashire CCC.md) — **cricket (County Championship)** — 1 ejercicio real (2025), ingresos £64,0 M verificados, **33 memorias desde 1996** — Último chequeo: 2026-09-13
- [Surrey CCC](fuentes/Inglaterra/Surrey CCC.md) — **cricket (County Championship)** — 2 ejercicios reales, ingresos £60,3 M verificados, **35 memorias desde 1994** (la serie más larga del proyecto) — Último chequeo: 2026-09-13
- [Warwickshire CCC](fuentes/Inglaterra/Warwickshire CCC.md) — **cricket (County Championship)** — 1 ejercicio real (2025), ingresos £40,4 M verificados, **37 memorias desde 1993** — Último chequeo: 2026-09-13
- [Yorkshire CCC](fuentes/Inglaterra/Yorkshire CCC.md) — **cricket (County Championship)** — 1 ejercicio real (2025), ingresos £18,9 M verificados, 33 memorias desde 1999 — Último chequeo: 2026-09-13
- [Aston Martin F1](fuentes/Inglaterra/Aston Martin F1.md) — **Fórmula 1** — 1 ejercicio real (2024), 7 disponibles — Último chequeo: 2026-09-13
- [McLaren Racing](fuentes/Inglaterra/McLaren Racing.md) — **Fórmula 1** — 1 ejercicio real (2024), 6 disponibles; el consolidado incluye IndyCar y Fórmula E — Último chequeo: 2026-09-13
- [Mercedes F1](fuentes/Inglaterra/Mercedes F1.md) — **Fórmula 1** — 2 ejercicios reales (2024-2025), 11 disponibles; licencia alemana, fábrica inglesa — Último chequeo: 2026-09-13
- [Red Bull Racing](fuentes/Inglaterra/Red Bull Racing.md) — **Fórmula 1** — 1 ejercicio real (2024), **21 disponibles desde 2004**; licencia austríaca, fábrica inglesa — Último chequeo: 2026-09-13
- [Williams Racing](fuentes/Inglaterra/Williams Racing.md) — **Fórmula 1** — 1 ejercicio real (2024), 11 disponibles — Último chequeo: 2026-09-13
- [Notas generales de Inglaterra](fuentes/Inglaterra/_notas-generales.md)

### Escocia

- [Celtic](fuentes/Escocia/Celtic.md) — 1 ejercicio real (2024/25), 6 disponibles — Último chequeo: 2026-09-13
- [Notas generales de Escocia](fuentes/Escocia/_notas-generales.md) — mismo Companies House que Inglaterra, números `SC`

### España

**Primer barrido de España (sesión 2026-09-13).** A diferencia de Sudamérica, España no tiene un
regulador único que centralice balances — cada club S.A.D. publica (o no) por su cuenta. Ver
`fuentes/España/_notas-generales.md` para los patrones de bloqueo anti-bot encontrados y cómo
destrabarlos.

- [Real Madrid](<fuentes/España/Real Madrid.md>) — CARGADO (Ejercicio 2024/25), 22 ejercicios reales disponibles en el archivo (2003-2025) — Último chequeo: 2026-09-13
- [FC Barcelona](<fuentes/España/FC Barcelona.md>) — CARGADO (Ejercicio 2024/25), 22 ejercicios reales disponibles (2003-2025, serie 1978-2003 identificada, sin bajar) — Último chequeo: 2026-09-13
- [Atlético de Madrid](<fuentes/España/Atlético de Madrid.md>) — CARGADO (Ejercicio 2024/25), 12 ejercicios reales disponibles (2013-2025) — Último chequeo: 2026-09-13
- [Athletic Club](<fuentes/España/Athletic Club.md>) — CARGADO (Ejercicio 2024/25), 4 ejercicios reales disponibles (2021-2025) — Último chequeo: 2026-09-13
- [Real Sociedad](<fuentes/España/Real Sociedad.md>) — sin PDFs, cuentas gateadas a accionistas; Registro Mercantil confirma que el depósito 2024/25 existe, pero el PDF completo queda detrás de un informe pago — Último chequeo: 2026-09-16
- [Sevilla FC](<fuentes/España/Sevilla FC.md>) — CARGADO (Ejercicio 2024/25), 4 ejercicios reales disponibles (2021-2025) + 1 borrador rechazado sin usar — Último chequeo: 2026-09-13
- [Valencia CF](<fuentes/España/Valencia CF.md>) — CARGADO (Ejercicio 2024/25), 2 ejercicios reales disponibles (2023-2025) — Último chequeo: 2026-09-13
- [Villarreal CF](<fuentes/España/Villarreal CF.md>) — CARGADO (Ejercicio 2023/24, único ejercicio real disponible en el archivo) — Último chequeo: 2026-09-13
- [Real Betis](<fuentes/España/Real Betis.md>) — CARGADO (Ejercicio 2024/25), 5 ejercicios reales disponibles (2019-2025, con huecos) — Último chequeo: 2026-09-13
- [Celta de Vigo](<fuentes/España/Celta de Vigo.md>) — CARGADO (Ejercicio 2024/25 individual), 4 ejercicios reales disponibles (2018-2025, con huecos) — Último chequeo: 2026-09-13
- [Deportivo Alavés](<fuentes/España/Deportivo Alavés.md>) — CARGADO (Ejercicio 2024/25), 9 ejercicios reales disponibles, serie completa 2016-2025 — Último chequeo: 2026-09-13
- [Girona FC](<fuentes/España/Girona FC.md>) — 2 ejercicios reales descargados (2019-20, 2024-25, con huecos), sin cargar aún — Último chequeo: 2026-09-16
- [CA Osasuna](<fuentes/España/CA Osasuna.md>) — 3 PDFs descargados, sin cargar (período fiscal sin confirmar, ver dudas-por-club.md) — Último chequeo: 2026-09-16
- [RCD Mallorca](<fuentes/España/RCD Mallorca.md>) — 1 ejercicio real descargado (2024/25), sin cargar aún — Último chequeo: 2026-09-16
- [Rayo Vallecano](<fuentes/España/Rayo Vallecano.md>) — 1 ejercicio real descargado (2024/25, auditoría con salvedades), sin cargar aún — Último chequeo: 2026-09-16
- [Getafe CF](<fuentes/España/Getafe CF.md>) — 2 ejercicios reales descargados (2023-2025), sin cargar aún — Último chequeo: 2026-09-16
- [RCD Espanyol](<fuentes/España/RCD Espanyol.md>) — 2 ejercicios reales descargados (2023-2025), sin cargar aún — Último chequeo: 2026-09-16
- [Elche CF](<fuentes/España/Elche CF.md>) — 2 ejercicios reales descargados (2023-2025), sin cargar aún — Último chequeo: 2026-09-16
- [Levante UD](<fuentes/España/Levante UD.md>) — 1 ejercicio real descargado (2024/25 consolidado), sin cargar aún — Último chequeo: 2026-09-16
- [Real Oviedo](<fuentes/España/Real Oviedo.md>) — 1 ejercicio real descargado (2024/25), sin cargar aún — Último chequeo: 2026-09-16
- [Notas generales de España](fuentes/España/_notas-generales.md)

---

### Nota técnica para cuando yo (Claude) proceso esto

Cada fuente que cargo al sitio queda registrada en `data/clubs.js` con estos
datos: de qué club es, qué tipo de documento es (presupuesto oficial, balance
oficial, cobertura de prensa, o placeholder), y qué tan confiable es. Esto es
lo que le permite al sitio mostrar avisos tipo "dato real" vs. "dato de
prensa, no oficial" vs. "placeholder, no es real todavía" en cada sección,
en vez de que quede solo en un comentario que nadie lee.
