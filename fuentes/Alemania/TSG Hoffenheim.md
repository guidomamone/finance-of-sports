# TSG Hoffenheim

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división)
- **Entidad legal**: TSG 1899 Hoffenheim Fußball-Spielbetriebs GmbH (HRB 341926, Amtsgericht
  Mannheim, sede en Sinsheim) — Dietmar Hopp tiene el 96% como socio atípico ("atypisch stiller
  Gesellschafter"), el 4% restante es de la asociación madre (e.V.). Al ser Hopp una persona física
  (no una corporación con capacidad de garantizar deudas bajo el HGB), NO aplica la exención por
  garantía del §264 Abs. 3/264b HGB — la GmbH deposita su propio Jahresabschluss/Konzernabschluss
  todos los años.
- **Canal**: `unternehmensregister.de`.

## Qué se bajó — SERIE COMPLETA (sesión 2026-09-16/17)

**16 de 16 ejercicios, desde la fundación de la sociedad (2009) hasta el último cierre disponible
(2024/25)** — la serie más profunda de toda Alemania junto con RB Leipzig, y una de las más largas de
todo el proyecto. `Clubes/Alemania/TSG Hoffenheim/`, Konzernabschluss (consolidado) donde existe,
Jahresabschluss individual para los 3 ejercicios más antiguos (sin Konzern todavía en esos años):

- `konzernabschluss-2024-25.pdf` — cerrado 30/6/2025, 18 páginas.
- `konzernabschluss-2023-24.pdf` — cerrado 30/6/2024, 17 páginas.
- `konzernabschluss-2022-23.pdf` — cerrado 30/6/2023, 17 páginas.
- `konzernabschluss-2021-22.pdf` — cerrado 30/6/2022, 17 páginas.
- `konzernabschluss-2020-21.pdf` — cerrado 30/6/2021, 18 páginas.
- `konzernabschluss-2019-20.pdf` — cerrado 30/6/2020, 18 páginas.
- `konzernabschluss-2018-19.pdf` — cerrado 30/6/2019, 17 páginas.
- `konzernabschluss-2017-18.pdf` — cerrado 30/6/2018, 15 páginas.
- `konzernabschluss-2016-17.pdf` — cerrado 30/6/2017, 15 páginas.
- `konzernabschluss-2015-16.pdf` — cerrado 30/6/2016, 15 páginas.
- `konzernabschluss-2014-15.pdf` — cerrado 30/6/2015, 15 páginas.
- `konzernabschluss-2013-14.pdf` — cerrado 30/6/2014, 14 páginas.
- `konzernabschluss-2012-13.pdf` — cerrado 30/6/2013, 15 páginas.
- `jahresabschluss-2011-12.pdf` — cerrado 30/6/2012, 12 páginas (individual, sin Konzern disponible
  ese año).
- `jahresabschluss-2010-11.pdf` — cerrado 30/6/2011, 11 páginas (individual).
- `jahresabschluss-2009-10.pdf` — cerrado 30/6/2010, 9 páginas (individual; había 2 depósitos para
  este mismo ejercicio en el registro, se bajó el primero).

## Verificación hecha en esta sesión

`pdftotext` de la primera página del ejercicio 2024/25 confirma "TSG 1899 Hoffenheim
Fußball-Spielbetriebs GmbH, Sinsheim — Konzernabschluss zum Geschäftsjahr vom 01.07.2024 bis zum
30.06.2025" con dictamen del auditor referido explícitamente al "Konzern" (grupo, sociedad + filiales).

## Nada pendiente en sourcing

Serie completa. El bloqueo de tooling mencionado en una nota anterior de esta misma sesión (el
Browser pane sin renderizar, que impedía el click "real" que exige la Sicherheitsabfrage de
Unternehmensregister) se resolvió al abrir una pestaña nueva del navegador — ver
`fuentes/Alemania/_notas-generales.md` sección 1 y 5.

## Carga a `data/hoffenheim-de-data.js` (sesión 2026-09-25)

Cargados los 2 ejercicios más recientes: 2023/24 (clave 2024) y 2024/25 (clave 2025), los 2
Konzernabschluss. Color de marca: `#1966A6` (azul, footylogos.com), verificado 2026-09-25.

La tabla de GuV de `konzernabschluss-2023-24.md` llegó con las columnas de la Bilanz-Passiva y de la
Konzern-GuV desalineadas/intercaladas por el proceso de conversión PDF→Markdown — se reconstruyó
cruzando el Konzernanhang y el Lagebericht (ver comentario de cabecera de
`data/hoffenheim-de-data.js` para el detalle línea por línea). `konzernabschluss-2024-25.md` llegó
con la tabla perfectamente alineada, y su columna comparativa (2023/24) coincidió EXACTA con la
reconstrucción hecha a mano — confirma que estaba bien.

Estructura de capital con una "atypisch stille Beteiligung" (participación societaria atípica) de
Dietmar Hopp que complica la definición de `officialPAT` (3 líneas de resultado distintas en el
Konzern-GuV) — ver duda abierta en `Admin/dudas-por-club.md`.

Quedan 14 ejercicios sin cargar (2009/10 a 2022/23) — la serie más profunda del proyecto, con mucho
margen para una sesión futura que quiera profundizar la historia de este club.

- Último chequeo: 2026-09-25.
