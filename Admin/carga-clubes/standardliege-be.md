# standardliege-be — evidencia de carga

Lo que había como comentario en `data/be/standardliege-be-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/be/standardliege-be-data.js — Standard de Liège SA (Bélgica). Club nuevo,
cargado en la 2da tanda de onboarding de la sesión 2026-09-25 (junto con
Union Saint-Gilloise y Westerlo).

FUENTE: `Clubes/Bélgica/Standard Liège/jaarrekening-2025-06-30-individual.md`
(única versión disponible, no hay consolidado). Cierre 30/6/2025 (ejercicio
1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto nativa. Depositado en
la Banque Nationale de Belgique (BNB/NBB), esquema estatutario abreviado
C-cap (Code des sociétés et des associations), en FRANCÉS (Standard es de
Valonia, mismo esquema/idioma que Charleroi).

FORMATO DEL DOCUMENTO: compte de résultats compacto, muy parecido a
Charleroi. La Nota C-cap 6.10 ("Ventilation par catégorie d'activité" del
Chiffre d'affaires) está presente pero SIN NINGÚN VALOR CARGADO — mismo caso
que Charleroi/Anderlecht/Antwerp/Mechelen: "Chiffre d'affaires" se categoriza
como lump_football_operations.

INGRESOS (Compte de résultats, pág. 9, códigos NBB, EUR):
  Chiffre d'affaires (código 70) — sin desglose numérico (Nota 6.10 vacía)
                                                               20.453554 → lump_football_operations
  En-cours de fabrication... (código 72) — línea atípica de contabilidad de
    manufactura, sin explicación disponible en el documento              0.475908 → other_income
  Autres produits d'exploitation (código 74) — la Nota 6.10 SÍ completa el
    sub-detalle de subsidios estatales (código 740, 7.501605 de los
    23.052000 totales), el resto (15.550395) sin desglose disponible; se
    mantiene como una sola línea porque ambos componentes van a la misma
    categoría de todos modos                                            23.052000 → other_income
  Produits d'exploitation non récurrents (código 76A) — sin desglose
    numérico disponible en el documento sobre a qué corresponde          0.587342 → other_income
Total: 20.453554+0.475908+23.052000+0.587342 = 44.568804 ≈ 44.568.803 impreso (70/76A), diferencia
de EUR 1 por redondeo.

GASTOS (Compte de résultats pág. 9-10 + Nota C-cap 6.1 pág. 12 + Nota 6.2.3
pág. 13 + Notas 6.3.1-6.3.6 pág. 14-19 + Nota C-cap 6.10 pág. 27-28):
  Approvisionnements et marchandises (código 60, compras + variación de
    stock, sin más desglose)                                           -0.881477 → other_expenses
  Services et biens divers (código 61, sin más desglose)              -15.997812 → other_expenses
  Rémunérations, charges sociales et pensions (código 62, todo el
    personal, sin separar plantel/resto — Nota 6.10: 195 empleados/
    178,9 FTE)                                                        -32.062651 → wages_squad
    items: Rémunérations et avantages sociaux directs 25.703064 + Cotisations
    patronales d'assurances sociales 3.870421 + Autres frais de personnel 2.489166
  Amortissements (código 630, -5.220980 total) SE PROMOVIÓ a 3 líneas según
  el Estado de movimiento de activos fijos (mismo criterio de
  club-data-mapping sección 1): Nota 6.2.3 "Concessions, brevets... et
  droits similaires" (droits sur joueurs, confirmado por el mismo criterio
  que Charleroi/Mechelen/Antwerp) "Actés" (código 8072) = amortización de
  pases; Notas 6.3.1/6.3.2/6.3.3/6.3.5 "Actés" sumadas = depreciación de
  activos tangibles (terrenos+instalaciones+mobiliario+otras
  inmovilizaciones, 0.177894+0.157199+0.210262+0.093207); Nota 6.1 "Etat
  des frais de constitution" "Amortissements" (código 8003) = amortización
  de gastos de constitución (residual chico, no relacionado a jugadores):
    Amortización droits sur joueurs (intangibles, código 8072)          -4.192331 → player_amortisation
    Depreciación activos tangibles (código 8271+8272+8273+8275)         -1.013961 → depreciation
    Amortización frais de constitution (código 8003, residual chico)    -0.014688 → other_amortisation
    (suma 5.220980, exacto contra el código 630 impreso)
  Réductions de valeur sur stocks/créances commerciales (código 631/4)   -0.470536 → other_expenses
  Provisions pour risques et charges: dotations (utilisations et
    reprises) (código 635/8) — CRÉDITO NETO (reversión de previsión mayor
    que la nueva dotación, Nota 6.8: previsión "Droits TV suite aux
    années covid" bajó de 1.408018 a 0.435746)                          +0.972273 → exceptional_items
  Autres charges d'exploitation (código 640/8, -1.268862 total) SE
  PROMOVIÓ a 2 líneas según la Nota C-cap 6.10 (pág. 28), que desglosa
  Impôts et taxes (640) vs. Autres (641/8) — Impuestos SIEMPRE a
  admin_general_expense (club-data-mapping/referencia/casos-por-pais-y-formato.md):
    Impôts et taxes relatifs à l'exploitation                          -0.962229 → admin_general_expense
    Autres                                                             -0.306633 → other_expenses
    (suma 1.268862, exacto contra el código 640/8 impreso)
  Charges d'exploitation non récurrentes (código 66A, chico)            -0.000203 → other_expenses
Total expenseLines (incl. el crédito de exceptional_items): -54.930248, exacto contra 60/66A
impreso (54.930.249, diferencia de EUR 1 por redondeo).

RESULTADO FINANCIERO (netInterest): Produits financiers (75/76B, 0.015077) -
Charges financières (65/66B, 2.849768) = -2.834691.

TAX: Impôts sur le résultat (código 67/77) -0.146296.

TIE-OUT (verificado, pág. 9-10 del documento, con los subtotales IMPRESOS):
  Ventes/prestations 44.568803 - Coût des ventes 54.930249 = "Bénéfice
  (Perte) d'exploitation" (código 9901) -10.361446, EXACTO. + Financiers
  netos (-2.834691) = "Bénéfice avant impôts" (código 9903) -13.196137,
  EXACTO. - Impôts (0.146296) = "Bénéfice de l'exercice"/"à affecter"
  (códigos 9904/9905) -13.342433, EXACTO. officialPAT = -13.342433.

officialTotalExpenses (55.902521) EXCLUYE la línea exceptional_items
(+0.972273 crédito) del total de gastos, mismo criterio "Chelsea" que
Charleroi/Antwerp: 54.930248 + 0.972273 = 55.902521. Este es el total que
compara verifyTieOuts() (Math.abs(expenses+nonCash), que no suma
exceptional_items).

MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE, 0,8532).

grossDebt: "DETTES" (total código 17/48, pág. 8) = 28.741980, EXCLUYENDO
"Comptes de régularisation" (código 4928, 5.280279, ingresos diferidos —
"Produits à Reporter" 5.012755 según el detalle de Nota 6.9, pág. 26) sumado
adentro del total impreso, mismo criterio que Charleroi/Anderlecht/
Mechelen/Antwerp: grossDebt = 28.741980 - 5.280279 = 23.461701. cash:
"Valeurs disponibles" (código 54/58, 0.311835) — no se sumó ningún
"Placements de trésorerie" (código 50/53, en blanco/0 este balance). Total
activa = Total pasiva = 30.104030 (balance cuadra).

GESTIÓN: el listado de administradores (pág. 2-3) muestra varios cambios de
mandato dentro del propio ejercicio (Anson Andrew, Shaw David, Wander
Joshua, Steele Keith, Pasko Steven — nombres angloamericanos, ligados al ex
accionista 777 Partners — con mandatos que terminan/empiezan en
2024-09/2025-06, y Marc Wilmots/Nicolas Bloemen/Pierre François entrando
recién el 2025-06/10, YA FUERA del ejercicio 01-07-2024/30-06-2025 en su
mayoría) sin que el documento identifique con confianza un
"actionnaire principal"/accionista de referencia único y estable para TODO
el ejercicio → gestionId: null.
============================================================================
```

_de data/clubs.js:_

```text
2da tanda de 15 clubes nuevos (misma sesión 2026-09-25, "20 más"): países ya cargados otra vez
a propósito (Bélgica/Dinamarca/Croacia), descubiertos porque estos 3 países tenían series
históricas completas ya transcriptas y sin cargar, sentadas en `Clubes/`. Ningún dead-end esta
vez (los 20 candidatos, entre clubes nuevos y ejercicios de clubes ya cargados, cerraron los
20). Detalle completo, club por club, en `Admin/CHANGELOG.md`.
```

_de data/club-leagues/be.js:_

```text
2da tanda de Bélgica (misma sesión, "20 más"): los 6 jugaron Pro League completa 2024/25,
Union SG salió CAMPEÓN (primer título desde 1934/35).
```

## 2025

### Meta

```text
Produits financiers (0.015077) - Charges financières (2.849768).
grossDebt = Dettes (17/48) EXCLUYENDO Comptes de régularisation (5.280279, ingresos
diferidos). cash = Valeurs disponibles.
```

_al lado del campo `officialTotalRevenue`:_

```text
excluye exceptional_items (+0.972273 crédito), ver criterio Chelsea
```

## Gestiones

_antes de André Duchêne (data/gestiones/be.js):_

```text
Duchêne: président 1998-2000 (administrateur délégué en los informes de 1999 y 2000); Stiffler lo reemplazó en octubre de 2000.
```

_antes de Reto Stiffler (data/gestiones/be.js):_

```text
Stiffler: presidente puesto por el dueño Robert Louis-Dreyfus (murió el 4/7/2009; su viuda vendió). Hasta que Duchâtelet compró el club el 23/6/2011.
```

_antes de Bruno Venanzi (data/gestiones/be.js):_

```text
Venanzi: compró el 24/6/2015 (99,7%); acordó la venta a 777 Partners el 13/3/2022, que se cerró el 19/4/2022. Desde ahí no hay dueño persona.
```

## Fuentes

### standardliege-be-jaarrekening-2025

_note (data/):_

```text
Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Banque Nationale de Belgique (BNB/NBB), esquema estatutario abreviado C-cap (Code des sociétés et des associations). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Standard Liège/jaarrekening-2025-06-30-individual.md. La Nota C-cap 6.10 (desglose de Chiffre d'affaires por categoría/mercado) no fue completada por el club en este filing; "Autres produits d'exploitation" solo desglosa el componente de subsidios estatales, el resto (67% de esa línea) queda sin especificar.
```
