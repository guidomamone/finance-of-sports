# Oleksandriya

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: ФУТБОЛЬНИЙ КЛУБ ОЛЕКСАНДРІЯ (LLC/ТОВ), EDRPOU 36360756.

## Qué se probó (sesión 2026-09-18) — bloqueo de TOOLING confirmado, NO dead-end de disclosure

1. Google tiene indexado un documento real: **"Футбольний клуб «Олександрія» Фінансова звітність
   за..." → `fco.com.ua/wp-content/themes/fco/files/fin_zvit-2020.pdf`** — confirma que el club SÍ
   publica (al menos publicó en algún momento) su estado financiero, siguiendo el patrón general
   del país.
2. **`fco.com.ua` devuelve HTTP 403 Forbidden (nginx) para CUALQUIER acceso automatizado probado**:
   - `curl` con y sin User-Agent de navegador real → 403.
   - `WebFetch` → 403.
   - El Browser pane real (navegación real, no solo `curl`) → **también 403** — esto descarta que
     sea un bloqueo anti-bot típico (que un navegador real suele esquivar): parece un bloqueo a
     nivel de servidor por rango de IP o geolocalización de todo este entorno, no un desafío
     JS/CAPTCHA resoluble.
   - Intento de confirmar el archivo en Wayback Machine (`archive.org/wayback/available`) — la API
     devolvió **HTTP 429 (rate limited)** dos veces seguidas, no se pudo completar el chequeo por
     límite de tiempo de la sesión.

## Sugerencia para una sesión futura

**Esto NO es un dead-end de disclosure** — el documento existe y el patrón del país (art. 14, ver
`_notas-generales.md`) hace muy probable que haya años más recientes también publicados. Lo que
hace falta es:
1. Reintentar `fco.com.ua` desde una sesión/entorno distinto (el bloqueo puede ser específico de la
   IP de este entorno, no permanente).
2. Si sigue bloqueado, reintentar Wayback Machine con más paciencia (esperar el rate limit) sobre
   `fco.com.ua/wp-content/themes/fco/files/fin_zvit-2020.pdf` y variantes con otros años
   (`fin_zvit-2021.pdf`, `-2022.pdf`, etc. — no confirmado si existen, pero el patrón de nombre de
   archivo es predecible).
3. Si nada de eso funciona, pedirle el PDF a Guido directamente si tiene acceso desde otra red.

- Último chequeo: 2026-09-18.
