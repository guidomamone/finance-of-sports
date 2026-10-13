# Instituto (Córdoba)

**Ángulos**: sitio oficial: agotado para 2024-25 (reconfirmado, sin adjunto — ver Chequeo
2026-09-22) · parcial para 2025-26: convocatoria a asamblea ya publicada (17/10/2026) pero el
ejercicio todavía no cerró/aprobó, nada para descargar todavía · Wayback CDX: no aplica esta ronda
· búsqueda web: no intentado esta ronda · regulador/país: no aplica — 2026-09-26

- Balance General / Estados Contables, Ejercicio N°70 (2023-24) — Drive linkeado desde noticia
  oficial institutoacc.com.ar/index.php/fue-aprobada-la-asamblea-general-ordinaria-y-extraordinaria-superavit-historico/
  (17 págs, estados contables completos, texto nativo). **YA CARGADO en el sitio** (Versión 94,
  primer club nuevo agregado después de Vélez — 5to del motor genérico). Superávit final real:
  $1.830.503.804 ARS. Convertido a USD con $909 (dólar mayorista de cierre al 30/6/2024 — el
  documento no declara su propio tipo de cambio, a diferencia de Boca/Racing/Vélez). Ver
  `data/instituto-data.js` para el detalle completo de categorización (el Anexo V separa gasto por
  sector — Fútbol/Básquet/La Agustina/Sede/Colegio/Tienda —, mismo mecanismo que el Anexo III de
  Vélez). Presidente: Juan Manuel Cavagliatto ("Juntos por Instituto"), gestión 2022-2025.
- Memoria Anual, mismo Ejercicio N°70 — misma noticia, otro Drive (6 págs, narrativa, sin usar).
- Presupuesto Económico de Recursos y Gastos, Ejercicio 2025 — misma noticia, otro Drive (3 págs).
  Premisas del Presupuesto 2025 — misma noticia, otro Drive (4 págs). Transcriptos a Markdown
  (texto nativo, con desglose MENSUAL: 12 columnas ene-25 a dic-25 — ver
  `presupuesto-2025.md`). **DECISIÓN TOMADA (regla nueva, ver `.claude/skills/
  club-or-year-onboarding/SKILL.md` sección 15): NO se carga al sitio.** Instituto modela todo en
  TEMPORADA (jul-jun), no año calendario — un presupuesto calendario se reconstruye combinando la
  mitad útil de este documento con la mitad complementaria de OTRO presupuesto calendario (el del
  año anterior o siguiente). Con desglose mensual, este documento SÍ permite partirlo en 2 mitades
  (ene-jun 2025 = 2da mitad del Ejercicio 2024/2025; jul-dic 2025 = 1ra mitad del Ejercicio
  2025/2026), pero no tenemos el Presupuesto 2024 ni el 2026 para completar ninguna de las 2
  temporadas — así que, por regla explícita de Guido, se mantiene la info transcripta pero NO se
  sube una temporada incompleta. Si en el futuro aparece el Presupuesto 2024 o el 2026 de este
  club, ahí sí se puede completar una temporada y cargarla.
  Los 4 son PDFs oficiales reales, descargados en `Clubes/Argentina/Instituto/`.
- Pendiente: Ejercicio 2024/25 (cerrado 30/6/2025) — **reconfirmado dead-end el 2026-09-22, con 4
  ángulos nuevos, ninguno dio resultado.** El post de la asamblea SÍ existe
  (`institutoacc.com.ar/index.php/fue-aprobada-la-asamblea-general-ordinaria-2/`, "Consideración de
  la Memoria, Balance General e Informe de la Comisión Revisora de Cuentas correspondientes al
  ejercicio anual cerrado el 30 de junio de 2025") pero **no adjunta ningún PDF ni Drive** — a
  diferencia del post equivalente del ejercicio 2023-24, que sí los tenía. Lo probado y fallido:
  (1) adivinar la URL del post por analogía (`informe-de-gestion-24-25`, `-2024-2025`, `-25-26`):
  los 3 dan 404; (2) recorrer el `wp-json/wp/v2/search` del sitio con `balance`, `memoria`,
  `gestion`, `contable` y `asamblea` — devuelve el histórico completo de posts y no hay ninguno de
  este ejercicio con documento; (3) el endpoint de biblioteca de medios
  (`wp-json/wp/v2/media?media_type=application`, que habría listado todos los PDFs del sitio) está
  **bloqueado: HTTP 401 `itsec_rest_api_access_restricted`, por el plugin Kadence Security**;
  (4) el sitio no publica `sitemap_index.xml`. Es una decisión del club de no publicar el documento,
  no un problema de búsqueda: pedírselo directo.
  También faltan ejercicios anteriores a 2023-24, y (ver arriba) el Presupuesto 2024 o 2026 para
  poder completar alguna temporada del Presupuesto 2025 ya transcripto.
- Contacto: WhatsApp 3512 209813 (L-V 9-21hs), sede Jujuy 2702, Alta Córdoba.
- Último chequeo: 2026-09-22.
- Color de marca: `#DF040B` — tabla por liga de footylogos (Liga Profesional Argentina, "Instituto
  Cordoba"), 1er color, exacto, verificado 2026-09-21.

## Chequeo 2026-09-26 — 2024-25 sigue sin aparecer, y 2025-26 recién se convocó (nada para bajar todavía)

Sesión de sourcing puro (5 clubes del interior). Tarea puntual: buscar el ejercicio 2024-25 (por si
se destrabó desde el 2026-09-22) y ver si ya existe algo del 2025-26.

- `wp-json/wp/v2/search` sobre `institutoacc.com.ar` con balance/asamblea/estados
  contables/ejercicio: mismo resultado que la sesión anterior, sin ningún post nuevo con PDF/Drive
  adjunto para el ejercicio cerrado 30/6/2025. Sigue confirmado dead-end (biblioteca de medios
  bloqueada por el plugin de seguridad, sin sitemap).
- **Hallazgo nuevo: "Convocatoria a Asamblea General Ordinaria 2026"**
  (`institutoacc.com.ar/index.php/convocatoria-a-asamblea-general-ordinaria-2026/`), publicada
  ayer (25/09/2026). Fecha de asamblea: sábado 17 de octubre de 2026. **El Orden del Día salta
  directo al "ejercicio anual cerrado el 30 de junio de 2026"** (el 2025-26) — no menciona en
  ningún punto el ejercicio 2024-25 que quedó sin presentar. El único adjunto de la convocatoria es
  un Drive con el Estatuto Social (no financiero).
  - **Pregunta genuina sin respuesta**: ¿qué pasó con el ejercicio 2024-25? ¿nunca tuvo asamblea
    propia, se lo saltearon, o se va a tratar retroactivamente en algún momento no anunciado?
    Anotado en `Admin/dudas-por-club.md`.
- **Conclusión: nada nuevo para descargar hoy.** El ejercicio 2025-26 recién se va a APROBAR el
  17/10/2026 — antes de esa fecha no puede existir un PDF público (mismo patrón que siguió el
  ejercicio 2023-24: el documento apareció recién después de su propia asamblea). Vale la pena que
  una sesión futura vuelva a mirar este club después del 17/10/2026.
- Último chequeo: 2026-09-26.
