# Trabzonspor

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: Trabzonspor Sportif Yatırım ve Futbol İşletmeciliği Ticaret A.Ş., cotizante en
  Borsa İstanbul (ticker TSPOR) desde una oferta pública relativamente reciente (ver İzahname/
  prospecto de 2025 bajado, sección de aumento de capital). Mismo esquema que los otros 3 grandes:
  club-asociación dueño mayoritario de la sociedad cotizante. Ejercicio fiscal 01/06-31/05.
- **Canal principal**: **KAP** (`kap.org.tr`), código TSPOR — confirmado por la página resumen
  `kap.org.tr/tr/sirket-finansal-bilgileri/1400-trabzonspor-sportif-yatirim-ve-futbol-isletmeciligi-
  ticaret-a-s`, que muestra estado de situación financiera e ingresos consolidados para 2022-2025.
  **No se pudo navegar** en esta sesión: el browser tool estuvo caído (timeouts de 300s en
  `preview_start`/`navigate` en TODOS los intentos, ver nota general de Turquía) y KAP arma la
  lista de "Finansal Rapor" con JS (no hay `href` real en las filas de resultado, son botones con
  `onClick`) — ni `curl` ni WebFetch pueden extraer los links de descarga individuales sin
  ejecutar ese JS. El filtro de fecha por defecto además solo trae el último año.
- **Canal secundario, el que SÍ funcionó parcialmente**: `cdn.trabzonspor.org.tr/trabzonspor_
  <hash-hex-32>.pdf` — el propio sitio del club aloja ahí sus "Faaliyet Raporu" (informes de
  actividad trimestrales del directorio) y al menos un juego completo de "finansal tablolar ve
  bağımsız denetim raporu" (estados financieros + dictamen de auditoría). El hash es opaco (no se
  puede adivinar la URL de otro año), así que solo se pudieron rescatar los documentos que Google
  ya había indexado — no es un archivo navegable como el de Galatasaray
  (`galatasaray.blob.core.windows.net`, con URLs legibles por año).

## Qué se bajó (sesión 2026-09-18, arranque limpio — no había nada previo de este club)

En `Clubes/Turquía/Trabzonspor/`, 5 documentos, todos vía búsqueda indexada de
`cdn.trabzonspor.org.tr` (no vía navegación directa del sitio, bloqueado por WAF — ver abajo):

- `trabzonspor-sportif-finansal-tablolar-31-05-2016.pdf` — **el único juego COMPLETO encontrado**:
  estados financieros + dictamen de auditoría independiente al 31-05-2016 (ejercicio 2015/16).
- `trabzonspor-sportif-izahname-2025.pdf` — prospecto (İzahname) de aumento de capital 2025
  aprobado por el CMB/SPK, 183 páginas. Contiene datos financieros históricos incorporados (no
  extraído en esta sesión, es trabajo de mapeo, no de sourcing) — candidato a fuente de series
  históricas si se necesita completar años sin bajar de KAP.
- `trabzonspor-sportif-faaliyet-raporu-2014-06-01_2015-02-28.pdf`,
  `trabzonspor-sportif-faaliyet-raporu-2021-06-01_2022-02-28.pdf`,
  `trabzonspor-sportif-faaliyet-raporu-2022-06-01_2022-08-31.pdf` — informes de actividad
  trimestrales/interinos del directorio, con cifras financieras del período pero NO son el juego
  completo de estados anuales auditados. Guardados como referencia, no como sustituto del bilanço.

**Un sexto candidato encontrado por búsqueda** (`trabzonspor_54e76437e2c44493a04dc00d1a97dede.pdf`,
supuesto informe de actividad 01.06.2024-28.02.2025) **resultó corrupto** al chequeo de integridad
("Java serialization data" en vez de PDF, mismo patrón que el archivo corrupto de Fenerbahçe) — se
borró sin guardar.

`trabzonspor.org.tr/tr/yatirimci-iliskileri` (la sección de relación con inversores del sitio
propio) también está protegida por WAF: HTTP 403 tanto en `curl` como en WebFetch, con cualquier
User-Agent probado.

## Dudas / pendientes

- **Es el club con la serie MÁS incompleta de los 4 grandes** — falta prácticamente toda la serie
  2017-2025 en formato de bilanço completo (solo hay 2016 completo + informes de actividad
  parciales de otros años). Prioridad alta para la próxima sesión con browser tool funcionando:
  navegar KAP directamente (ajustando el filtro de fecha, que hoy solo trae ~1 año) es casi
  seguro el camino más rápido para completar la serie 2016-2025 de una vez, en vez de seguir
  adivinando hashes de `cdn.trabzonspor.org.tr`.
- Confirmar si el hueco severo 2017-2021 tiene alguna razón estructural (¿Trabzonspor cotiza en
  bolsa desde antes del 2016 o el emisor cambió de forma legal en el medio? El İzahname de 2025
  menciona un aumento de capital de 236.390.631 TL a 500.000.000 TL — sugiere que la empresa ya
  cotizaba antes, pero no se confirmó la fecha exacta de la IPO original en esta sesión) — anotar
  en `dudas-por-club.md` si hace falta preguntarle al club directamente.
- Último chequeo: 2026-09-18.
