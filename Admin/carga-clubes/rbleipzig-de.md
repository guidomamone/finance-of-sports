# rbleipzig-de — evidencia de carga

Lo que había como comentario en `data/rbleipzig-de-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/rbleipzig-de-data.js — RasenBallsport Leipzig GmbH (Alemania, Bundesliga).

4 ejercicios REALES (2021/22, 2022/23, 2023/24, 2024/25), Jahresabschluss (HGB) bajado de
unternehmensregister.de (registro mercantil oficial alemán), auditado por EY GmbH & Co. KG.
Transcripciones completas en Clubes/Alemania/RB Leipzig/jahresabschluss-<ejercicio>.md. Hay una
serie más larga 2014-2021/22 también transcripta — con 2021/22 ya cargado, el resto (2014-2020/21)
queda sin cargar todavía — y un jahresabschluss-2018-stub.md que es un stub incompleto,
correctamente excluido, NO USAR.

EJERCICIO 2021/22 (jahresabschluss-2021-22.md): mismo tipo de documento y mismo nivel de detalle
que los otros 3 (Jahresabschluss HGB completo, Lagebericht + Bilanz + GuV + Anhang, auditado por
EY), CON LA MISMA DIFERENCIA ESTRUCTURAL que 2022/23 en el Anhang 4.1 (Umsatzerlöse): SOLO 3
categorías (Spielbetrieb 255.395 + Handel 2.259 + Sonstigem 86.413 = 344.067 TEUR, reconcilia
contra el Umsatzerlöse de la GuV, 344.067.408,00 EUR, con la tolerancia de redondeo a TEUR habitual
de este Anhang), sin "Transfer- u. Leihgeschäft" separado.

EJERCICIO 2022/23 (jahresabschluss-2022-23.md): mismo tipo de documento y mismo nivel de detalle
que 2023/24 y 2024/25 (Jahresabschluss HGB completo, Lagebericht + Bilanz + GuV + Anhang,
auditado por EY), CON UNA DIFERENCIA ESTRUCTURAL real en el Anhang 4.1 (Umsatzerlöse): este
ejercicio desglosa por Tätigkeitsbereich en SOLO 3 categorías (Spielbetrieb, Handel, Sonstigem —
313.227+8.403+54.861=376.491 TEUR, reconcilia exacto contra el Umsatzerlöse total de la GuV,
376.490.670,75 EUR), NO 4 como 2023/24 y 2024/25 (que además separan "Transfer- u. Leihgeschäft").
El propio documento explica por qué probablemente no hace falta la categoría separada ese año:
"Transfererträge im abgelaufenen Geschäftsjahr waren geringer als im Vorjahr" (Lagebericht,
Ertragslage) — sin una línea de transferencias grande, quedó dentro de "Sonstigem" sin separar.
Se categorizó iguel que en 2023/24-2024/25 para las categorías que SÍ existen (Spielbetrieb ->
lump_football_operations, Handel -> sponsorship_commercial), y 'Sonstigem' -> other_income
(incluye lo que en otros ejercicios sería Transfer- u. Leihgeschäft, sin poder separarlo — el
documento no lo desglosa este año, no se fuerza una separación que el dato no tiene). Mismo
criterio aplicado a 2021/22 (su propio Lagebericht dice lo mismo: "die Transfererträge höher als
in der Vorsaison ausgefallen", sin una línea propia en el Anhang de todas formas).

GmbH (no KGaA/AG): entidad única, sin distinción Einzel-/Konzernabschluss como Bayern/Dortmund —
mismo nivel de cuentas para ambos ejercicios, sin ambigüedad de qué nivel usar.

Ingresos: la nota "Umsatzerlöse" (Anhang 4.1) desglosa por "Tätigkeitsbereich" (área de negocio) en
4 categorías: Spielbetrieb, Handel, Transfer- u. Leihgeschäft, Sonstigem. Esto reconcilia exacto
para los 2 ejercicios: 2023/24 (249.693+10.597+193.146+9.971=463.407) y 2024/25
(356.602+16.950+74.108+7.292=454.952, ver nota abajo sobre el valor de "Sonstigem").

TRAMPA DE TRANSCRIPCIÓN ENCONTRADA Y CORREGIDA (relevante para cualquier sesión futura que
retranscriba este documento): una primera lectura de jahresabschluss-2024-25.md pág. 8 leyó
"Sonstigem" 2024/25 como 71.292 (con un "1" de más), lo que hacía sumar 518.952 en vez de 454.952
— no reconciliaba contra el Umsatzerlöse total de la GuV (línea 1, pág. 5, SIEMPRE confiable). El
valor correcto es 7.292 (SIN el "1"), confirmado cruzando contra `fuentes/Alemania/RB Leipzig.md`
(que ya lo tenía anotado correcto desde el sourcing original) — con 7.292 la suma cierra EXACTO.
Moraleja de club-data-mapping/referencia/leer-pdf.md aplicada al revés: acá SÍ había una fila que
"no explicaba la diferencia" de otra fila, sino un dígito de más en la propia transcripción —
conviene cruzar contra fuentes/<País>/<Club>.md antes de asumir que el documento fuente está mal.

Categorización (ambos ejercicios, mismo criterio): Spielbetrieb es un bolsón amplio que el propio
Anhang 4.1 dice que incluye "Erträge aus Sponsoringverträgen, Erträge aus Einnahmen des laufenden
Spielbetriebs und der Fernsehwerbung" (sponsoring + matchday + TV combinados sin desglosar más) →
lump_football_operations (no matchday_competition solo, sería subrepresentar lo que realmente
contiene el número); Handel (merchandising) → sponsorship_commercial (mismo criterio que "Handel"
de Werder Bremen); Transfer- u. Leihgeschäft → player_sales; Sonstigem → other_income.

Gastos (ambos ejercicios reconcilian exacto): Materialaufwand → other_expenses (costo de bienes
comprados, sin más desglose). Personalaufwand (Löhne+Gehälter + Soziale Abgaben, combinados en una
sola línea porque el documento no separa plantel profesional de administrativo, a diferencia de
Borussia Dortmund) → wages_squad. Abschreibungen: auf Spielerwerte (pases capitalizados) →
player_amortisation; auf sonstige immaterielle Vermögensgegenstände (software, no pases) →
other_amortisation; auf Sachanlagen (activo fijo tangible) → depreciation. Sonstige betriebliche
Aufwendungen → other_expenses (sin desglose adicional impreso).

netInterest/tax: "Finanzergebnis" (Sonstige Zinsen und ähnliche Erträge - Zinsen und ähnliche
Aufwendungen) va completo a netInterest. tax = Steuern vom Einkommen und vom Ertrag + Sonstige
Steuern (2 líneas separadas del GuV, sumadas). El total (revenue+expenses+netInterest+tax) cierra
EXACTO contra el Jahresüberschuss impreso en los 2 ejercicios (2024: 4,690; 2025: 1,600939) — ver
club-data-mapping SKILL.md sección 6.2.

Moneda: EUR. Ningún ejercicio declara TC propio a USD → fxRef contra FX_CLOSE
(data/currency-map.js): 'EUR@2022-06-30', 'EUR@2023-06-30', 'EUR@2024-06-30' y 'EUR@2025-06-30'
YA EXISTEN, no hizo falta agregar nada para 2021/22 ni para 2022/23.

2022/23 también reconcilia EXACTO: netInterest = Finanzergebnis (Sonstige Zinsen 1,696404 -
Zinsen und ähnliche Aufwendungen 4,727726 = -3,031322). tax = Steuern vom Einkommen und vom
Ertrag (0,662665) + Sonstige Steuern (0,358534) = 1,021199 (guardado como tax:-1.021199, mismo
signo que los otros 2 ejercicios). revenue(394,761484) - expenses(385,366929) + netInterest
(-3,031322) + tax(-1,021199) = 5,342034, EXACTO contra el Jahresüberschuss impreso
(5.342.033,84 EUR).

2021/22 reconcilia EXACTO: Materialaufwand (1,457145) + Personalaufwand (163,933354 =
158,546117 Löhne und Gehälter + 5,387237 Soziale Abgaben) + Abschreibungen (84,244145 auf
Spielerwerte + 0,893053 auf sonstige immaterielle + 4,816530 auf Sachanlagen) + Sonstige
betriebliche Aufwendungen (82,922600) = 338,266827, EXACTO contra el Betriebsaufwand total
impreso (338.266.826,61 EUR). netInterest = Finanzergebnis (Sonstige Zinsen 0,208342 - Zinsen
und ähnliche Aufwendungen 1,659164 = -1,450822). tax = Steuern vom Einkommen und vom Ertrag
(1,832483) + Sonstige Steuern (0,188518) = 2,021001 (tax:-2.021001). revenue(346,510706) -
expenses(338,266827) + netInterest(-1,450822) + tax(-2,021001) = 4,772056, EXACTO contra el
Jahresüberschuss impreso (4.772.056,80 EUR).

gestionId: 'actual' en los 4 ejercicios — Florian Hopp (CFO) y Johann Plenge (CSO) constantes en
los 4; Oliver Mintzlaff fue Geschäftsführer (CEO) hasta el 14/11/2022 (cubre todo 2021/22, firma
el Lagebericht de ese ejercicio junto con Hopp y Plenge) y el Geschäftsführer Sport cambió (Max
Eberl hasta 5/10/2023, vacante, Marcel Schäfer desde 1/8/2024), sin afectar la gestión
financiera/societaria (Red Bull GmbH, accionista único) en ninguno de los 4 ejercicios.
============================================================================
```

## 2025

### Ingresos

```text
Ejercicio 2025 (01.07.2024-30.06.2025). Fuente: jahresabschluss-2024-25.md, pág. 5 (GuV) y pág. 8
(Anhang 4.1, con la corrección de "Sonstigem" documentada en el comentario de cabecera).
```

## 2024

### Ingresos

```text
Ejercicio 2024 (01.07.2023-30.06.2024). Fuente: jahresabschluss-2024-25.md, columna comparativa
"1. Juli 2023 bis 30. Juni 2024" (pág. 5, GuV; pág. 8, Anhang 4.1 Umsatzerlöse — reconcilia exacto).
```

## 2023

### Ingresos

```text
Ejercicio 2023 (01.07.2022-30.06.2023). Fuente: jahresabschluss-2022-23.md, pág. 5 (GuV) y pág.
8 (Anhang 4.1, SOLO 3 categorías este ejercicio, ver comentario de cabecera).
```

## 2022

### Ingresos

```text
Ejercicio 2022 (01.07.2021-30.06.2022). Fuente: jahresabschluss-2021-22.md, pág. 5 (GuV) y pág.
8 (Anhang 4.1, SOLO 3 categorías este ejercicio, mismo caso que 2022/23, ver comentario de cabecera).
```
