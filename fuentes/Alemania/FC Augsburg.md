# FC Augsburg

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división)
- **Entidad legal**: Fußball-Club Augsburg 1907 GmbH & Co. KGaA (HRB 21812, Amtsgericht Augsburg).
  Confirmado real filer (no exento).
- **Estado**: CARGADO (Ejercicios 2024, 2025). Último chequeo: 2026-09-22.

## CARGADO al sitio (sesión 2026-09-22)

`clubId`: `augsburg-de`. `displayName`: "FC Augsburg". `fiscalYearStart`: `'07-01'`
(confirmado: "Konzernabschluss zum Geschäftsjahr vom 01.07... bis zum 30.06...." en ambos
documentos).

- **2024** (ejercicio 01.07.2023-30.06.2024) y **2025** (ejercicio 01.07.2024-30.06.2025), ambos
  desde el Konzernabschluss (consolidado) transcripto en
  `Clubes/Alemania/FC Augsburg/konzernabschluss-2023-24.md` y `konzernabschluss-2024-25.md`.
  Ver el comentario de cabecera de `data/augsburg-de-data.js` para el detalle completo de
  categorización (Umsatzerlöse y Abschreibungen promovidos a líneas de primer nivel por tener
  sub-categorías reales distintas, siguiendo club-data-mapping SKILL.md sección 1).
- **Moneda/FX**: EUR, sin tipo de cambio propio declarado por ninguno de los 2 documentos (no hay
  anexo de moneda extranjera). Se referenció `FX_CLOSE['EUR@2024-06-30']` y
  `FX_CLOSE['EUR@2025-06-30']` (`data/currency-map.js`), que YA existían antes de esta carga.
- **Tie-out**: cierra dentro de ~0,0005% en los 2 años (diferencia de ~560 EUR en 2024 y ~292 EUR
  en 2025 entre la suma de líneas de Umsatzerlöse y el total impreso), causada por que la Nota VI
  de la Konzern-GuV solo da esa cifra en miles de EUR (TEUR) redondeados, mientras el total impreso
  de Umsatzerlöse es exacto al centavo. Expenses y PAT cierran EXACTOS en los 2 años (ver
  `fiscalYearMeta` en `data/augsburg-de-data.js`).
- **Color de marca**: `#BA3733` (rojo) — Wikipedia (de.wikipedia.org e en.wikipedia.org, infobox:
  "Rot, Grün, Weiß" / "red, green and white", rojo listado primero en los 2 idiomas) + hex de
  teamcolorcodes.com/fc-augsburg-color-codes, verificado 2026-09-22.
- **Bundesliga confirmado**: temporada 2023-24 (11º puesto, 39 pts) y temporada 2024-25 (12º
  puesto, 43 pts), ambas 1ª división — fuente: Wikipedia ("2023–24 FC Augsburg season",
  "2024–25 FC Augsburg season" / "2024–25 Bundesliga"). No se creó `data/club-leagues/de.js` (lo
  hace el orquestador de la sesión de los 5 clubes alemanes).

## Qué se bajó (sesión 2026-09-16/17)

**2 ejercicios**, `Clubes/Alemania/FC Augsburg/`, ambos Konzernabschluss (consolidado):

- `konzernabschluss-2024-25.pdf` — cerrado 30/6/2025, 24 páginas.
- `konzernabschluss-2023-24.pdf` — cerrado 30/6/2024, 24 páginas.

## Serie disponible sin bajar

Unternehmensregister muestra al menos 2 páginas de resultados (mínimo 3 ejercicios listados: 2024/25,
2023/24, 2022/23), con ejercicios más antiguos probablemente disponibles pero sin confirmar en
detalle. El ejercicio 2022/23 no se llegó a bajar esta sesión por priorización de tiempo. Mismo
procedimiento que los 2 ya bajados: buscar "Fußball-Club Augsburg 1907 GmbH & Co. KGaA" en
`unternehmensregister.de`.

- Último chequeo: 2026-09-17.
