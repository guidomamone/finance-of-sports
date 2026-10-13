# Colón (Santa Fe)

**Ángulos**: sitio oficial: agotado (menú completo revisado incl. página "INSTITUCIONAL" nueva,
`wp-json` search y media library, 0 documentos financieros) · Wayback CDX: agotado (24 PDFs en toda
la historia del dominio, ninguno financiero) · búsqueda web: agotado (0 PDFs, pero CONFIRMA
ejercicio jul.2024-jul.2025 vía prensa, con cifras concretas) · regulador/país: no aplica — el club
es asociación civil, sin regulador documentado para Argentina salvo IGJ (no aplica a Santa Fe) —
2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: clubcolon.com.ar (también existe un espejo en
  clubcolon.club con el mismo contenido). El menú no tiene sección de socios/institucional/
  transparencia con documentos — solo Historia/Identidad/Plantel/Títulos/Autoridades/Hacete Socio.
  0 PDFs archivados en Wayback Machine para el dominio. Prensa propia confirma asamblea con Memoria
  y Balance aprobado (nov-2025) pero sin PDF adjunto.
- Pendiente: todos los ejercicios.
- Contacto: tel. +54 342 459-8025, Av. Juan José Paso 3535, Santa Fe.
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

## Chequeo 2026-09-26 — escalera completa, 0 PDFs, pero CONFIRMADO un ejercicio reciente real (candidato a mail)

Sesión de sourcing puro (5 clubes del interior). Este club tenía el chequeo más superficial de los
5 (solo home, según la nota del 2026-09-12) — esta vuelta corrió la escalera completa de
`club-sourcing` 0.1 a fondo.

- **Familia 1 (sitio oficial), agotada de verdad esta vez.** El menú completo (Historia / Identidad
  / Títulos y logros / El Cementerio de los Elefantes / Autoridades-Comisión Directiva / Hacete
  Socio / Plantel / Noticias) no tiene ninguna sección de transparencia/documentos. Encontré una
  página nueva no listada antes, `clubcolon.com.ar/institucional/`, que agrupa las mismas
  secciones narrativas (Historia/Identidad/Títulos/Cementerio/Autoridades) — sin nada financiero.
  `wp-json/wp/v2/search` con balance/memoria/estados contables/asamblea/ejercicio: 0 resultados en
  todos salvo "memoria" (que solo matchea la página Institucional por la palabra "memoria" en un
  sentido narrativo). La media library del sitio (`wp-json/wp/v2/media`) está vacía (0 ítems) — el
  sitio actual es una versión reducida/nueva del dominio, casi sin archivos adjuntos de ningún
  tipo.
- **Familia 3 (Wayback CDX, dominio completo), agotada.** 24 PDFs en TODA la historia del dominio
  (desde 2007), ninguno financiero: 2 actas de torneo (2013), formularios de socios/débito/altas
  (2018-2019), el Estatuto del club (2011/2015), y desde 2024 una serie de boletines "En Pocas
  Palabras" (newsletter de pases de jugadores — descargado y verificado uno completo, 5 págs, solo
  fichajes, sin una cifra financiera). Es el chequeo "0 PDFs archivados nunca" documentado en
  `club-sourcing` 0.1 como la evidencia más fuerte de ausencia.
- **Familia 4 (búsqueda web dirigida), agotada — y es la que trajo la única señal real.** 3
  búsquedas (`filetype:pdf` + balance/estados contables, "memoria y balance" + asamblea 2025,
  "estados contables" + superávit/déficit): 0 PDFs, pero sí prensa sólida y reciente (Aire de Santa
  Fe, Santa Fe Deportivo): **la Asamblea General Ordinaria del 20/11/2025 aprobó la Memoria y
  Balance del ejercicio julio 2024-julio 2025, con superávit de $288 millones ARS, activo -11% y
  pasivo -28%** (esta asamblea fue la última acto formal de la gestión de Víctor Godano antes del
  recambio de autoridades del 1/12/2025 tras las elecciones del 30/11/2025). Verificado en 2
  artículos independientes (airedesantafe.com.ar, santafedeportivo.com) — ninguno linkea el PDF ni
  ningún portal de socios donde consultarlo.
- **Conclusión: 0 PDFs descargables, las 3 familias aplicables agotadas a fondo.** No es un
  dead-end de "no existe nada" (Chaco For Ever/Gimnasia y Tiro Salta) — es un documento CONFIRMADO
  que existe, con cifras concretas citadas en prensa de una asamblea de hace 4 meses, pero nunca
  publicado en ningún canal digital del club.
- **Candidato a mail (ver `club-sourcing` 0.3): fuerte**, mismo criterio que Independiente
  (Ejercicio N°121): prensa cita cifras concretas de una asamblea reciente real. Pedirle al club el
  PDF de Memoria y Balance del ejercicio jul.2024-jul.2025 (y de paso, cualquier ejercicio anterior
  que tengan a mano — no hay evidencia de que hayan publicado NINGUNO nunca, así que vale pedir la
  serie completa que puedan compartir). Decisión de Guido — con el recambio de autoridades reciente
  (dic-2025), también puede valer la pena esperar a que la nueva gestión tenga un canal de
  contacto estable antes de escribir.
- Último chequeo: 2026-09-26.
