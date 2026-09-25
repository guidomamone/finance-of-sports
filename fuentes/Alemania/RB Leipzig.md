# RB Leipzig

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división)
- **Entidad legal**: RasenBallsport Leipzig GmbH (HRB 30621, Amtsgericht Leipzig) — dueño: Red Bull
  GmbH (Austria). Al ser el socio único una sociedad AUSTRÍACA (no alemana), no aplica el mecanismo
  de exención por garantía del §264 Abs. 3/264b HGB que sí usan Bayer Leverkusen y VfL Wolfsburg (ver
  `fuentes/Alemania/_notas-generales.md` sección 1) — por eso RB Leipzig SÍ deposita su propio
  Jahresabschluss completo todos los años, sin excepción.
- **Canal**: `unternehmensregister.de` — la serie más completa y confiable encontrada en toda esta
  sesión, mejor incluso que Dortmund/Bayern (que dependen del sitio propio del club).

## Qué se bajó (sesión 2026-09-16/17)

**12 ejercicios consecutivos, serie COMPLETA desde la fundación de la sociedad (2014) hasta el
último cierre disponible (2024/25)**, `Clubes/Alemania/RB Leipzig/`, todos con capa de texto real
(Bilanz + GuV + Anhang + Bestätigungsvermerk del auditor — EY GmbH & Co. KG en los años recientes):

- `jahresabschluss-2024-25.pdf` — cerrado 30/6/2025. Jahresüberschuss TEUR 1.601, Umsatzerlöse TEUR
  454.952 (Spielbetrieb 356.602, Handel 16.950, Transfer 74.108, otros 7.292).
- `jahresabschluss-2023-24.pdf` — cerrado 30/6/2024.
- `jahresabschluss-2022-23.pdf` — cerrado 30/6/2023.
- `jahresabschluss-2021-22.pdf` — cerrado 30/6/2022.
- `jahresabschluss-2020-21.pdf` — cerrado 30/6/2021.
- `jahresabschluss-2019-20.pdf` — cerrado 30/6/2020.
- `jahresabschluss-2018-19.pdf` — cerrado 30/6/2019.
- `jahresabschluss-2018-stub.pdf` — ejercicio de transición corto, 01/01/2018 a 30/06/2018 (la
  sociedad cambió el cierre de ejercicio de año calendario a 30 de junio en este punto — 6 meses,
  no 12; ver nota de "Precisión antes que velocidad" del `CLAUDE.md` antes de cargar este ejercicio).
- `jahresabschluss-2017.pdf` — año calendario 01/01/2017-31/12/2017.
- `jahresabschluss-2016.pdf` — año calendario 2016.
- `jahresabschluss-2015.pdf` — año calendario 2015.
- `jahresabschluss-2014.pdf` — ejercicio de constitución, 31/07/2014-31/12/2014 (5 meses).

## Verificación hecha en esta sesión

El texto completo del Jahresabschluss 2024/25 se leyó íntegro desde la propia página de
Unternehmensregister (antes de bajar el PDF): confirma "RasenBallsport Leipzig GmbH" con sede en
Leipzig, HRB 30621, Lagebericht firmado por Johann Plenge/Florian Hopp/Marcel Schäfer, Bilanz al 30
de junio de 2025, y dictamen sin salvedades de EY GmbH & Co. KG (Fleischer/Böhme, Wirtschaftsprüfer).
Confirma también que el financiamiento de fichajes se hace vía préstamos de Red Bull GmbH (Nota 7:
"Investitionen in das Spielervermögen werden mittels Darlehen von der Red Bull GmbH finanziert").

## Mecanismo de descarga (para repetir en sesiones futuras)

Ver el procedimiento completo, con los gotchas de `payload` de un solo uso y la necesidad de un click
"real" (no disparado por JS) para pasar la "Sicherheitsabfrage", en `fuentes/Alemania/
_notas-generales.md` sección 1. Búsqueda: razón social exacta "RasenBallsport Leipzig GmbH" en
`unternehmensregister.de`.

## Onboarding (sesión 2026-09-25)

**CARGADO al sitio**: Ejercicios 2024 (2023/24) y 2025 (2024/25), ambos desde
`jahresabschluss-2024-25.pdf` (que trae 2023/24 completo como columna comparativa — válido, cuentas
HGB nominales sin reexpresión). Ver `data/rbleipzig-de-data.js` para el mapeo completo.

**CORRECCIÓN a la nota de arriba** ("otros 7.292" en el resumen del Umsatzerlöse 2024/25): esa cifra
efectivamente ERA la correcta — una relectura de la transcripción durante el onboarding la había
leído mal como "71.292" (un "1" de más), lo que no reconciliaba contra el Umsatzerlöse total de la
GuV (454.952 miles €). Cruzar contra esta nota de sourcing (`fuentes/Alemania/RB Leipzig.md`, que ya
tenía el valor correcto desde el sourcing original) resolvió la discrepancia sin necesidad de volver
al PDF. Moraleja para sesiones futuras: si una tabla no reconcilia durante el onboarding, chequear
primero si `fuentes/<País>/<Club>.md` ya tiene el número anotado de una lectura anterior, antes de
asumir que la fuente está mal o de reabrir el PDF.

La serie 2014-2022/23 (10 ejercicios) queda sin cargar (prioridad de esta sesión: los 2 más
recientes); `jahresabschluss-2018-stub.md` es un ejercicio de transición corto (6 meses), no usar
sin evaluar cómo tratar un ejercicio parcial.

Color de marca: `#DD0741` (rojo tradicional de RB Leipzig sobre blanco, mismo criterio que
River/Vélez: se usa el acento no-blanco) — ampliamente documentado, verificado 2026-09-25.

- Último chequeo: 2026-09-25 (chequeo anterior: 2026-09-17).
