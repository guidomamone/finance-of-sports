# General Díaz

- **Sitio oficial (familia 1) — dominio hoy TOMADO por un sitio de apuestas, confirmado histórico
  vía Wayback.** `generaldiaz.com` resuelve (103.119.0.69) pero devuelve HTTP 444 (conexión
  cerrada sin respuesta) tanto a `curl` como a Firecrawl (2 intentos: básico y con
  `proxy:"stealth"`, `SCRAPE_ALL_ENGINES_FAILED` en ambos — los engines probados fueron
  `index`, `fire-engine;chrome-cdp` y su reintento con stealth). El dominio SÍ fue el sitio
  oficial real: la captura de Wayback de 2013
  (`web.archive.org/web/20130215093558/http://generaldiaz.com:80/`) dice "GENERAL DIAZ FBC ::
  Sitio Oficial", con menú Inicio/El Club/Plantel/Noticias/Galería/Socios/Marketing/Tienda/
  Contacto. Se revisaron a fondo las dos secciones con más chance de tener algo financiero:
  **"El Club"** (`club.php`, solo historia narrativa del club) y **"Socios"** (`socios.php`, solo
  campaña de captación de socios + resultados/tabla de posiciones) — ninguna de las dos tiene
  nada de transparencia ni balance. **El dominio fue tomado por cybersquatting**: capturas de
  2025 muestran contenido en vietnamita de apuestas/casino online (`ba-lan-vs-ha-lan`, `ban-ca`,
  `casino`, `blackjack-online`, etc.), nada que ver con el club.
- **Wayback CDX, dominio completo** (`matchType=domain`): grep del JSON completo de capturas por
  `balance|memoria|estatuto|transparenc|asamblea|contable|financ`: **0 resultados**.
- **Búsqueda web dirigida — SÍ hay señal de prensa, sin documento.** ABC Color cubre al club con
  regularidad (`abc.com.py/deportes/futbol/general-diaz/`, incluye una nota real de noviembre de
  2025 sobre su descenso a la última categoría: "General Díaz profundiza su crisis con el
  descenso a la última categoría"). Los resultados de búsqueda también citan una nota de ABC
  Color de alrededor de mayo de 2026 sobre una asamblea ordinaria del club en Luque, donde la
  fórmula "Unidad Institucional" no tuvo oposición — **confirma que el club SÍ hace asambleas**,
  pero no se pudo determinar la URL exacta del artículo: se probó el tag `abc.com.py/tag/Club%20
  General%20Díaz` (404), la sección `abc.com.py/deportes/futbol/general-diaz/` (mezcla artículos
  de varios clubes de ascenso, no aparece el de la asamblea en lo que Firecrawl devolvió), y el
  buscador interno del sitio (`abc.com.py/buscador/?q=...`, widget JS de Queryly que no devuelve
  resultados en el markdown estático que trae Firecrawl). Ninguna nota vista linkea un PDF de
  balance.
- **Dos leads descartados por HOMONIMIA — anotado para que no se persigan de nuevo:**
  - Un video de Facebook titulado "Asamblea general ordinaria de Memoria y Balance 2023-2024" que
    aparecía en resultados de búsqueda para "General Díaz" Luque NO es del club — verificado con
    WebFetch (Firecrawl no soporta Facebook, `error: we do not support this site`): es del
    **Colegio Médico Gremial La Rioja** (Argentina), sin relación alguna.
  - Un documento de Scribd ("3_Secc_040225", avisos legales del Boletín Oficial de Córdoba,
    Argentina) que mencionaba "12 de Octubre" en un resultado de búsqueda tampoco aplica — es la
    dirección "12 de Octubre 80" de una entidad distinta en Hernando, Córdoba (ver también el
    archivo de 12 de Octubre).
- La APF (Asociación Paraguaya de Fútbol) publica su propia Memoria y Balance institucional en
  `apf.org.py/memorias-y-balances` (vía issuu.com/apfoficial), pero es el balance de la
  ASOCIACIÓN, no de los clubes afiliados — no aporta nada de General Díaz específicamente.
- Sin regulador tipo Supersociedades/CMF que aplique a clubes paraguayos.
- **Conclusión: dead-end por ahora, con un hilo de prensa sin cerrar.** Hay evidencia de que el
  club SÍ presenta memoria y balance en asamblea (como todos los clubes paraguayos, según ya
  documentado para Cerro Porteño/Libertad/Olimpia), pero ningún documento descargable en ningún
  lado.
- Pendiente: todos los ejercicios. Próximo paso concreto si se retoma: encontrar el artículo
  exacto de ABC Color de la asamblea de ~mayo 2026 desde un browser real (no Firecrawl estático,
  por el buscador JS) para confirmar si cita cifras, o escribir directo al club.
- Contacto: sin sitio oficial activo (dominio cybersquatteado). Facebook
  facebook.com/ClubGeneralDiaz, X @clubgraldiaz — ninguno con sección de transparencia
  financiera identificada.
- Último chequeo: 2026-09-27.
