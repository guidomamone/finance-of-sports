# Sesión `pantallas` (worktree `fos-pantallas`, rama `pantallas`), 2026-10-17

Cierre para la sesión principal: pasar a `Admin/CHANGELOG.md`, `Admin/TODO.md` y `Admin/ESTADO.md`, y archivar este archivo en `Admin/Archive/`.
Mockups (aprobados por Guido): artifact de Design "Pantallas FoS — Inicio" (https://claude.ai/artifact/NrkUb1jbqNf83npG3Fbzgi), con
Inicio, el header del teléfono, Ligas, Finanzas y "Estás viendo", en escritorio y teléfono.

## Qué cambió (para el CHANGELOG)

- **Inicio rediseñado (to-do 267).** Arriba, qué es el sitio (conteo de clubes, países y ejercicios desde `data/club-index.js`) y el
  buscador como acción principal (abre el selector con lo tipeado), con "Probá con" (sale de los rankings) y "Comparar". Abajo, tarjetas
  de ranking con barras horizontales: "Los que más facturan" (el mundo y América, top 10) y las ligas de `data/destacados.js` (top 5). Sin
  Chart.js en Inicio. Al pie, tres reglas del dato.
- **Rankings por región, generados.** `tools/generate-rankings.js` escribe además `data/rankings/_regiones.js`: `RANKINGS_REGION` (mundo
  y América, un solo ejercicio por ranking, el de más clubes; sin presupuestos solos) y `RANKINGS_INDICE` (por liga: ejercicio por
  defecto, clubes y de cuántos). Lo corren `cargar.mjs` y `alta-club.mjs`; `--check` y `audit.js` lo controlan como al resto.
- **Header del teléfono en una fila (56 px, antes 164):** logo, lupa y un botón con la sección actual que abre el menú (secciones,
  idioma, contacto). El menú es el mismo `#mainNav`; sus reglas van con `#mainNav`, nunca con `nav` a secas.
- **Ligas rediseñada (to-do 264).** Estado frío sin título repetido: buscador (liga o país), regiones como filtro, una fila por país con
  sus ligas por división y "N de M · año"; las ligas sin datos, plegadas al final. Una liga: encabezado con ejercicios en pastillas,
  ranking con barras (sin el documento en cada fila), "De dónde sale la plata" (barra apilada por club, leyenda en grilla, "Sin
  desglosar"), simulador en tarjeta y salvedades en un párrafo. LaLiga pasó de 3.448 a 860 px. Banderas en vez de códigos de país
  (también en Inicio).
- **Finanzas más fácil de usar (to-do 265).** "Cambiar de club" junto al título; guía de una línea que se cierra; la tarjeta de
  ejercicios dice la vista en palabras y "Más opciones" abre moneda, inflación y formato (la moneda salió del header); aviso compacto;
  KPI "Intereses y otros" (antes "Int."); índice fijo de la página que marca la sección y salta sin tocar la URL.
- **"Estás viendo" (to-do 269).** Sin botón del club en el header (va "Buscar un club o una liga", ⌘K/Ctrl K); el club se nombra solo en
  el título de Finanzas. **Sale la pestaña Fuentes**: repetía la tarjeta Fuentes de Finanzas y la página pública `fuentes/<club>.html`.
- **El estado en la URL (to-do 240).** `?tab=finanzas&club=river&anios=2021,2024`, `?tab=liga&liga=es-laliga&anio=2025`. Se lee al abrir
  (le gana al club guardado) y con "atrás"; pestaña, club y liga suman al historial, años y ejercicio lo reemplazan.
- **Título de la página** sin el slogan viejo ("Datos para votar informado"): es lo que mostraba WhatsApp al compartir el link.
- **`tools/worktree.mjs preparar`:** no enlaza una carpeta que git lista entera (un worktree dentro de `.claude/worktrees/` se enlazaba a
  sí mismo y el comando fallaba).
- ASSET_V terminó en 1248 (main iba por 1231 al arrancar: lo resuelve `worktree.mjs mergear`).

## Qué queda (para el TODO)

- Borrar los to-dos 267, 264, 265, 269 y 240: están hechos.
- Lo que el 240 no cubre (sumar al 240 que queda o a uno nuevo): la moneda, la inflación, el formato y Comparar todavía no van en la URL.
- El 265 pedía mirar qué se usa de verdad (métricas, to-do 254) antes de esconder; sin métricas, qué fue al panel "Más opciones" es
  criterio, no dato. Revisarlo cuando el 254 dé números.
- El cartel de primera visita "Elegí tu club acá" colgaba del botón del club y ya no aparece; la puerta para un visitante nuevo es el
  buscador de Inicio. Su código (`showCoach`/`hideCoach` en `js/selector.js`) quedó sin uso visible: borrarlo o reubicarlo.
- La tarjeta de WhatsApp sigue sin descripción ni imagen (no hay etiquetas `og:`): es el to-do 241.

## Qué deja de ser cierto en ESTADO

- "Comparar con el diseño de Finanzas": dice "Sin USD / ARS en el header en esta pestaña". Ya no hay USD / ARS en el header en ninguna
  pestaña: la moneda vive en "Más opciones" de Finanzas.
- Sumar a "Sitio, publicación y analytics" (o donde corresponda) una línea por lo nuevo: Inicio con rankings del mundo y de América
  generados (`data/rankings/_regiones.js`), sin pestaña Fuentes, sin botón del club en el header, y el estado en la URL. El detalle ya
  está en `Admin/PANTALLA.md` de esta rama.
