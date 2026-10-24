# sonderjyske-dk — evidencia de carga

Lo que había como comentario en `data/dk/sonderjyske-dk-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/dk/sonderjyske-dk-data.js — Sønderjyske Fodbold A/S (Haderslev, Dinamarca),
clubId 'sonderjyske-dk'. Cierre 30/6/2022 (ejercicio 1/7/2021-30/6/2022, temporada
deportiva 2021/22) → clave 2022.

FUENTE: `Clubes/Dinamarca/SønderjyskE/aarsrapport-2022-06-30.md` (única fuente
asignada para este club en esta sesión; el archivo tiene años 2013-2025
disponibles, pero solo se cargó el pedido). PDF con capa de texto nativa, informe
aflagt efter årsregnskabslovens bestemmelser for klasse B-virksomheder (con
tilvalg de algunas normas de clase C) — un escalón MENOS detallado que Silkeborg/
Viborg/FCK (clase C), sin nota de "Revenue" que desglose por categoría. Auditor: EY
(Michael Anker), sin salvedades.

OJO — FORMATO "BRUTTOFORTJENESTE" (§32 ÅRL), MÁS AGREGADO QUE EL DE
midtjylland-dk: la Resultatopgørelse arranca directo en "Bruttofortjeneste"
(Ganancia Bruta), que por nota de política contable (pág. 11) es "nettoomsætning,
vareforbrug, andre driftsindtægter og eksterne omkostninger... sammendraget til én
regnskabspost" — es decir, Revenue NETO no solo del costo de ventas (como en el
caso de Bruttofortjeneste que motivó a evitar el ejercicio 2022/23-2023/24 de
midtjylland-dk) sino TAMBIÉN de "eksterne omkostninger" (gastos operativos
externos: administración, organización de partidos, etc., que en cualquier otro
club cargado es una línea de GASTO separada). Se decidió cargar igual este
ejercicio (es el único asignado para este club en esta sesión), dejando
explícitamente documentado que "Revenue"/"Expenses" acá NO son comparables 1:1
contra un club con Nettoomsætning propia (ej. silkeborg-dk/viborg-dk): el PAT
cierra exacto, pero el desglose Revenue/Expenses es más agregado de lo habitual.
PREGUNTA ABIERTA (Admin/dudas-por-club.md): si conviene, en una sesión futura,
cargar en su lugar un ejercicio más antiguo de este mismo club (2013-2021 SÍ están
disponibles como .md) que sí desglose Nettoomsætning, mismo criterio que se usó
para elegir el ejercicio 2018/19 de FC Midtjylland en vez de uno más reciente.

INGRESOS (Resultatopgørelse pág. 8 + Nota "Særlige poster" pág. 16, DKK):
  Bruttofortjeneste total: 21.464.987.
  De esa cifra, la Nota "Særlige poster" identifica EXACTO cuánto es compensación
    COVID-19 ("Kompensation for aflyste arrangementer og lønomkostninger"),
    16.311.422, indicando explícito que "Særlige poster indgår på følgende linjer:
    Bruttofortjeneste" → se promovió a línea propia, other_income (no es negocio de
    fútbol recurrente, es una compensación estatal extraordinaria por COVID).
  Residuo (21.464.987-16.311.422 = 5.153.565): el margen "de fútbol" propiamente
    dicho, ya neto de vareforbrug/eksterne omkostninger por el formato §32 (ver
    nota de arriba) → lump_football_operations, con su label dejando explícito que
    NO es Revenue bruto.
  officialTotalRevenue = 16.311.422+5.153.565 = 21.464.987 (= Bruttofortjeneste
    impreso, exacto).

GASTOS (Resultatopgørelse + Nota 1 "Personaleomkostninger" + Nota "Immaterielle
  anlægsaktiver"/"Materielle anlægsaktiver" pág. 16-17):
  wages_squad = Personaleomkostninger (-50.298.641: Lønninger 45.442.396 + Pensioner
    1.453.435 + Andre omkostninger til social sikring 607.087 + Andre
    personaleomkostninger 2.795.723) — sin separar plantel/resto del personal, se
    carga completo (mismo criterio que dender-be/charleroi-be sin ese desglose).
  player_amortisation = Årets afskrivninger de "Kontraktrettigheder" (-2.229.341,
    Nota "Immaterielle anlægsaktiver"). CONFIRMADO por la política contable (pág.
    12, "Immaterielle anlægsaktiver": "Andre immaterielle anlægsaktiver omfatter
    kontrakt- og navnerettigheder. Kontraktrettigheder indregnes i balancen til
    anskaffelsessummer (transfersummer)...") que esto ES depreciación de
    registraciones de jugadores, a diferencia de dender-be donde esa confirmación
    no existe.
  depreciation = Årets afskrivninger de "Materielle anlægsaktiver" (-0.397022:
    Andre anlæg/driftsmateriel/inventar -0.297495 + Indretning af lejede lokaler
    -0.099527).
  La suma (2.229.341+397.022=2.626.363) reconcilia contra "Af- og nedskrivninger af
    immaterielle og materielle anlægsaktiver" impreso en la Resultatopgørelse
    (-2.626.364) con diferencia de DKK 1, redondeo del propio documento.
  officialTotalExpenses = 50.298.641+2.229.341+0.397022... = 52.925.004 (positivo).

RESULTADO FINANCIERO: solo "Finansielle omkostninger" (-522.751) impreso, sin línea
  de "Finansielle indtægter" separada (Resultat før finansielle poster -31.460.018
  menos 522.751 = Resultat før skat -31.982.769, exacto, confirma que no hay ingreso
  financiero adicional este ejercicio) → netInterest -0.522751.
TAX: Skat af årets resultat = 0 este ejercicio (sí hubo -5.163.685 el ejercicio
  anterior 2020/21, no aplica acá).

TIE-OUT FINAL (verificado contra "Årets resultat" impreso, pág. 8):
  revenue 21.464.987 - expenses 52.925.004 + netInterest (522.751) + tax 0 =
  -31.982.768, contra -31.982.769 impreso — diferencia de DKK 1, redondeo del
  propio documento (mismo orden de magnitud que la diferencia ya documentada en
  la nota de depreciación de arriba).

CONTEXTO DEL EJERCICIO (Ledelsesberetning, pág. 7): "et meget dårligt år"
  (económicamente muy malo), con pérdida de más de la mitad del capital social
  ("tabt mere end halvdelen af sin selskabskapital", régimen de "kapitaltab" de la
  ley societaria danesa). Después del cierre, la controlante aportó DKK 25M de
  "koncerntilskud" (aporte de grupo) y los dueños emitieron una carta de apoyo de
  liquidez — informe preparado bajo el principio de empresa en marcha
  ("going-concern") en base a esos 2 hechos posteriores. Después del cierre
  (Begivenheder efter balancedagen) el club fue adquirido por Euro Steel-koncernen
  y Davidsen-koncernen.

MONEDA: DKK. El documento NO declara un tipo de cambio propio (no hay Anexo de
  moneda extranjera). 'DKK@2022-06-30' NO existe en FX_CLOSE (data/currency-map.js)
  — se calculó acá mismo como LITERAL (no se puede tocar currency-map.js): cruce
  EUR/DKK × EUR/USD, ambos del 30/6/2022 (fuente: Pound Sterling Live, tasas de
  referencia estilo BCE/Danmarks Nationalbank — EUR/DKK mid 7,4362; EUR/USD close
  1,0477). fx (DKK por 1 USD) = 7,4362 / 1,0477 = 7,0980. fxSource:'market_close'
  (no 'document_close', el documento no declara ninguno). CANDIDATO A PROMOVER a
  FX_CLOSE en una sesión futura si se carga otro club/ejercicio con el mismo cierre
  30/6/2022.

grossDebt: Kortfristet del af langfristede gældsforpligtelser (2.000.000) + Gæld
  til banker (7.892.593) + Langfristede gældsforpligtelser - Anden gæld
  (4.187.740) = 14.080.333 — CRITERIO CONSERVADOR: se excluyó "Gæld til
  tilknyttede virksomheder" (11.761.099, deuda con partes relacionadas/grupo, no
  deuda financiera bancaria) y "Anden gæld" de corto plazo (11.231.909, rótulo
  ambiguo, podría incluir deuda o no) — ver Admin/dudas-por-club.md si conviene
  revisar este criterio. cash: Likvide beholdninger = 14.547 (muy bajo, consistente
  con el "kapitaltab" narrado en la Ledelsesberetning).

GESTIÓN: Bestyrelse (Søren Peder Dalager Davidsen, formand) vigente al cierre y a
  la firma — pero la sociedad cambió de dueño DESPUÉS del cierre (Euro Steel +
  Davidsen-koncernen), y no hay un criterio de "gestión" tipo club argentino acá
  (sociedad anónima) → gestionId: null, sin entrada en gestionesByClub.
============================================================================
```

_de data/club-leagues/dk.js:_

```text
2da tanda de Dinamarca (misma sesión, "20 más"), verificado por WebSearch/Wikipedia caso por
caso.
```

_de data/club-leagues/dk.js:_

```text
relegado recién para la temporada SIGUIENTE (2022/23)
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bruttofortjeneste/Bruttotab | pág. 14, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Løn og gager | pág. 18, Claude 0.88 |
| 2 | Pensionsbidrag | pág. 18, Claude 0.87 |
| 3 | Andre omkostninger til social sikring | pág. 18, Jev 0.96 |
| 4 | Andre personaleomkostninger | pág. 18, Claude 0.82 |
| 5 | Kontraktsrettigheder | pág. 18, Claude 0.93 |
| 6 | Indretning lejede lokaler | pág. 18, Claude 0.92 |
| 7 | Andre anlæg, driftsmateriel og inventar | pág. 18, Claude 0.93 |

### Meta

```text
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-21): dk-superliga, verificado contra roster cacheado de "2024–25 Danish Superliga" (tools/club-league-reference/dk.json), coincidencia exacta "Sønderjyske".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-24) desde Clubes/Dinamarca/SønderjyskE/aarsrapport-2022-2023-09-30-transicion.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Dinamarca/SønderjyskE/aarsrapport-2022-2023-09-30-transicion.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bruttofortjeneste/Bruttotab | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Løn og gager | pág. 18, precedente |
| 2 | Pensionsbidrag | pág. 18, precedente |
| 3 | Andre omkostninger til social sikring | pág. 18, precedente |
| 4 | Andre personaleomkostninger | pág. 18, precedente |
| 5 | Kontraktsrettigheder | pág. 18, precedente |
| 6 | Indretning lejede lokaler | pág. 18, precedente |
| 7 | Andre anlæg, driftsmateriel og inventar | pág. 18, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-24). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## 2022

### Meta

```text
'DKK@2022-06-30' no existe en FX_CLOSE — calculado acá: EUR/DKK mid 7,4362 ÷
EUR/USD close 1,0477 (30/6/2022, Pound Sterling Live) = 7,0980 DKK por USD.
```

_al lado del campo `fxRef`:_

```text
promovido a FX_CLOSE en la integración (data/currency-map.js)
```

```text
Finansielle omkostninger (no hay Finansielle indtægter impresas este ejercicio).
grossDebt = Kortfristet del af langfristede(2.000000) + Gæld til banker(7.892593)
+ Langfristede gældsforpligtelser Anden gæld(4.187740). Excluye deuda con partes
relacionadas y "Anden gæld" de corto plazo ambigua (ver comentario de cabecera).
```

## Gestiones

_antes de Gynther Kohls (data/gestiones/dk.js):_

```text
Cierre 30/6. Kohls firma 2013 a 2021; Davidsen firma 2022 como formand.
```

## Fuentes

### sonderjyske-dk-aarsrapport-2022

_note (data/):_

```text
Informe clase B (con algunas normas de clase C), formato "Bruttofortjeneste" que combina Nettoomsætning, vareforbrug, andre driftsindtægter Y eksterne omkostninger en una sola línea (§32 ÅRL) — más agregado que otros clubes daneses cargados (silkeborg-dk/viborg-dk/fckobenhavn-dk), que sí desglosan Revenue. Auditor: EY (Michael Anker), sin salvedades. Ejercicio de pérdida severa con pérdida de más de la mitad del capital social ("kapitaltab"); aporte de grupo de DKK 25M y carta de apoyo de liquidez de los dueños después del cierre sostienen el principio de empresa en marcha. Cambio de control societario después del cierre (Euro Steel-koncernen + Davidsen-koncernen). Transcripción completa en Clubes/Dinamarca/SønderjyskE/aarsrapport-2022-06-30.md.
```

### sonderjyske-dk-aarsrapport-2024-09-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### sonderjyske-dk-aarsrapport-2022-2023-09-30-transicion

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-24) desde la transcripción Clubes/Dinamarca/SønderjyskE/aarsrapport-2022-2023-09-30-transicion.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
