# beerschot-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/beerschot-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Beerschot: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.pdf. brandColor #6104D2
(procedencia en Admin/sourcing/Bélgica/Beerschot.md; tools/cargar-lote.mjs).
```

```text
data/be/beerschot-be-data.js — Beerschot (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "beerschot-be" — slug de "Beerschot" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Beerschot" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Beerschot" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2025-06-30) y contenido del .md (18 de 19 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 8 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (18 de 19 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("jaarrekening-2025-06-30-individual.pdf"), y no hay un consolidado del mismo ejercicio en
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "beerschot-be-jaarrekening-2025-06-30-individual" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para be (tools/club-league-reference/be.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"beerschot-be-jaarrekening-2025-06-30-individual"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing en abonnementen | pág. 23, precedente |
| 2 | Sponsoring | pág. 23, Jev 1 |
| 3 | TV rechten | pág. 23, Jev 1 |
| 4 | Commercieel | pág. 23, Jev 0.92 |
| 5 | Andere bedrijfsopbrengsten | pág. 8, Jev 0.96 |
| 6 | Niet-recurrente bedrijfsopbrengsten | pág. 8, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 8, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 8, Jev 1 |
| 3 | Diensten en diverse goederen | pág. 8, Jev 0.97 |
| 4 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 23, Claude 0.8 |
| 5 | Werkgeversbijdragen voor sociale verzekeringen | pág. 23, Jev 0.97 |
| 6 | Andere personeelskosten | pág. 23, precedente |
| 7 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-) | pág. 8, Jev 1 |
| 8 | Bedrijfsbelastingen en -taksen | pág. 24, Jev 1 |
| 9 | Andere | pág. 24, Jev 0.99 |
| 10 | Niet-recurrente bedrijfskosten | pág. 8, Jev 0.9 |
| 11 | Afschrijvingen immateriële vaste activa (spelers) | pág. 8, precedente |
| 12 | Afschrijvingen goodwill | pág. 8, precedente |
| 13 | Afschrijvingen materiële vaste activa | pág. 8, precedente |
| 14 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 8, Jev 0.99 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -25.436. resta del impuesto: Belastingen 35.016 - 25.436 = 9.580 impreso (L325-327) (subagente Sonnet, revisado por Claude)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -6.684. costo financiero (65/66B, L316-318): resta
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -321.178. costo financiero (65/66B, L316-320): resta
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 223.703. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = player_amortisation. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 169.559. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = other_amortisation. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 498.321. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = depreciation. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -64.834. 631/4 es una reversión neta de -64.834 (L295): resta del gasto (Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Cuotas sociales. hay lidgelden diferidos pero ningún renglón de cuotas en el estado ni en las notas 6.10 (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: balance del documento (NBB)): código NBB 54/58 = 203650 (L193); el balance cuadra: 20/58 = 10/49 = 7721100 (año sin vecino)
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-19/resultado-1.json, tools/gestiones-tanda.mjs, 2026-10-19):_

```text
Eric Roef (2018-06-29 a 2019-07-30): Voorzitter de Beerschot-Wilrijk desde antes de la reestructuración en NV: voetbalkrant 2017-03-16 y 2018-07-27 ya lo llaman voorzitter ('Roef blijft voorzitter'). Voetbalkrant 2019-07-30 dice que dejó la presidencia y pasó a erevoorzitter. La fecha desde 2018-06-29 es la del inicio de su mandato de Bestuurder en la NV nueva (Clubes/Bélgica/Beerschot/jaarrekening-2019-06-30-individual.md:64-68, mandato desde 29-06-2018); ninguna fuente web da el día en que asumió la presidencia, por eso es una convención. La fecha hasta 2019-07-30 es la del anuncio ('zopas bekendgemaakt'); el artículo no da fecha efectiva.
Francis Vrancken (2019-07-30 a 2024-05-02): Voorzitter desde el anuncio del 2019-07-30 (voetbalkrant: 'Francis Vrancken, medeeigenaar, wordt voorzitter'). Hasta: el consejo aceptó su renuncia, noticia del 2024-05-02 (voetbalprimeur); sporza del 2024-04-22/23 ya lo daba como saliente tras el título. Es la fecha de la noticia, no necesariamente de la reunión. Figura como Bestuurder en los balances (p.ej. jaarrekening-2019-06-30-individual.md:52-56).
SIN CONFIRMAR, no cargada: Selahattin Baki (2025-01-07 a hoy), https://sporza.be/nl/2025/01/07/beerschot-gooit-structuur-om-na-financiele-perikelen-turk-selahattin-baki-nieuwe-voorzitter-steve-nuyts-ceo~1736258707131/: Sporza 2025-01-07 informa que fue nombrado voorzitter; no da fecha efectiva (otra mención habla de un consejo de 4 miembros desde el 2024-11-28). No encontré cuándo terminó su gestión ni quién presidió entre mayo 2024 y enero 2025. Por eso confirmada:false y el cierre 2025-06-30 queda sin cubrir.
Duda: Cierre 2025-06-30: Baki fue nombrado voorzitter el 2025-01-07, pero no hay fuente que diga hasta cuándo ni que siguiera en junio de 2025 (en agosto 2026 Yusuke Ohno es presidente; la Wikipedia en inglés lista a Kazuaki Nakamura sin fecha). Falta una fuente de la fecha de salida de Baki.
Duda: Hueco entre 2024-05-02 (renuncia de Vrancken) y 2025-01-07: no encontré quién presidió; no afecta ningún cierre cargado.
Duda: Roef: el día en que asumió la presidencia no figura en ninguna fuente; se usó 2018-06-29 (inicio del mandato de la NV).
Duda: Aviso: la gestión pasó de Roef a Vrancken el 2019-07-30, un mes después del cierre 2019-06-30; el balance 2019 se aprobó el 14-10-2019 (jaarrekening-2019-06-30-individual.md:29), ya con Vrancken. El cierre pertenece a Roef pero lo aprobó la gestión de Vrancken.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Beerschot/jaarrekening-2024-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Beerschot/jaarrekening-2024-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 9, Jev 1 |
| 2 | Andere bedrijfsopbrengsten | pág. 9, precedente |
| 3 | Niet-recurrente bedrijfsopbrengsten | pág. 9, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 9, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 9, precedente |
| 3 | Diensten en diverse goederen | pág. 9, precedente |
| 4 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 25, precedente |
| 5 | Werkgeversbijdragen voor sociale verzekeringen | pág. 25, precedente |
| 6 | Andere personeelskosten | pág. 25, precedente |
| 7 | Geboekt | pág. 26, ? 0.75 |
| 8 | Geboekt | pág. 26, ? 0.75 |
| 9 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-) | pág. 9, precedente |
| 10 | Bedrijfsbelastingen en -taksen | pág. 26, precedente |
| 11 | Andere | pág. 26, precedente |
| 12 | Niet-recurrente bedrijfskosten | pág. 9, precedente |
| 13 | Afschrijvingen immateriële vaste activa (spelers) | pág. 9, precedente |
| 14 | Afschrijvingen goodwill | pág. 9, precedente |
| 15 | Afschrijvingen materiële vaste activa | pág. 9, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-19): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2020, 2021, 2022, 2025): Comercial / Sponsors, Estadio, Televisión
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2023–24 Challenger Pro League" (tools/club-league-reference/be.json), coincidencia exacta "Beerschot".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Beerschot/jaarrekening-2022-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Beerschot/jaarrekening-2022-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing & abonnementen | pág. 25, precedente |
| 2 | Sponsoring | pág. 25, precedente |
| 3 | TV rechten | pág. 25, precedente |
| 4 | Commercieel | pág. 25, precedente |
| 5 | Andere bedrijfsopbrengsten | pág. 9, precedente |
| 6 | Terugneming van afschrijvingen en van waardeverminderingen op immateriële en materiële vaste activa | pág. 28, Jev 1 |
| 7 | Meerwaarden bij de realisatie van immateriële en materiële vaste activa | pág. 28, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 9, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 9, precedente |
| 3 | Diensten en diverse goederen | pág. 9, precedente |
| 4 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 25, precedente |
| 5 | Werkgeversbijdragen voor sociale verzekeringen | pág. 25, precedente |
| 6 | Werkgeverspremies voor bovenwettelijke verzekeringen | pág. 25, Claude 0.85 |
| 7 | Andere personeelskosten | pág. 25, precedente |
| 8 | Geboekt | pág. 26, ? 0.75 |
| 9 | Geboekt | pág. 26, ? 0.75 |
| 10 | Bedrijfsbelastingen en -taksen | pág. 26, precedente |
| 11 | Andere | pág. 26, precedente |
| 12 | Minderwaarden bij de realisatie van immateriële en materiële vaste activa | pág. 28, Jev 0.92 |
| 13 | Andere niet-recurrente bedrijfskosten | pág. 28, Jev 0.92 |
| 14 | Afschrijvingen immateriële vaste activa (spelers) | pág. 9, precedente |
| 15 | Afschrijvingen goodwill | pág. 9, precedente |
| 16 | Afschrijvingen materiële vaste activa | pág. 9, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-proleague, verificado contra roster cacheado de "2021–22 Belgian First Division A" (tools/club-league-reference/be.json), coincidencia exacta "Beerschot".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Beerschot/jaarrekening-2021-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Beerschot/jaarrekening-2021-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing & abonnementen | pág. 22, precedente |
| 2 | Sponsoring | pág. 22, precedente |
| 3 | TV rechten | pág. 22, precedente |
| 4 | Commercieel | pág. 22, precedente |
| 5 | Andere bedrijfsopbrengsten | pág. 8, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 8, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 8, precedente |
| 3 | Diensten en diverse goederen | pág. 8, precedente |
| 4 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 22, precedente |
| 5 | Werkgeversbijdragen voor sociale verzekeringen | pág. 22, precedente |
| 6 | Werkgeverspremies voor bovenwettelijke verzekeringen | pág. 22, Claude 0.85 |
| 7 | Andere personeelskosten | pág. 22, precedente |
| 8 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 8, precedente |
| 9 | Bedrijfsbelastingen en -taksen | pág. 22, precedente |
| 10 | Andere | pág. 22, precedente |
| 11 | Niet-recurrente bedrijfskosten | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-proleague, verificado contra roster cacheado de "2020–21 Belgian First Division A" (tools/club-league-reference/be.json), coincidencia exacta "Beerschot".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Beerschot/jaarrekening-2020-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Beerschot/jaarrekening-2020-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing & abonnementen | pág. 21, Claude 0.95 |
| 2 | Sponsoring | pág. 21, precedente |
| 3 | TV rechten | pág. 21, precedente |
| 4 | Commercieel | pág. 21, precedente |
| 5 | Andere bedrijfsopbrengsten | pág. 8, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 8, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 8, precedente |
| 3 | Diensten en diverse goederen | pág. 8, precedente |
| 4 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 21, precedente |
| 5 | Werkgeversbijdragen voor sociale verzekeringen | pág. 21, precedente |
| 6 | Andere personeelskosten | pág. 21, precedente |
| 7 | Bedrijfsbelastingen en -taksen | pág. 21, precedente |
| 8 | Andere | pág. 21, precedente |
| 9 | Niet-recurrente bedrijfskosten | pág. 8, precedente |
| 10 | Afschrijvingen immateriële vaste activa (spelers) | pág. 8, precedente |
| 11 | Afschrijvingen goodwill | pág. 8, precedente |
| 12 | Afschrijvingen materiële vaste activa | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2019–20 Belgian First Division B" (tools/club-league-reference/be.json), coincidencia exacta "Beerschot".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Beerschot/jaarrekening-2019-06-30-individual-correction.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Beerschot/jaarrekening-2019-06-30-individual-correction.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 6, Jev 1 |
| 2 | Andere bedrijfsopbrengsten | pág. 6, precedente |
| 3 | Niet-recurrente bedrijfsopbrengsten | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 6, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 6, precedente |
| 3 | Diensten en diverse goederen | pág. 6, precedente |
| 4 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 19, precedente |
| 5 | Werkgeversbijdragen voor sociale verzekeringen | pág. 19, precedente |
| 6 | Andere personeelskosten | pág. 19, precedente |
| 7 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 6, precedente |
| 8 | Bedrijfsbelastingen en -taksen | pág. 19, precedente |
| 9 | Andere | pág. 19, precedente |
| 10 | Afschrijvingen immateriële vaste activa (spelers) | pág. 6, precedente |
| 11 | Afschrijvingen goodwill | pág. 6, precedente |
| 12 | Afschrijvingen materiële vaste activa | pág. 6, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2019-06-30. boekjaar dat de periode dekt van 29-06-2018 tot 30-06-2019 (.md L28): el cierre es el 30-06-2019; localizar tomó la columna Vorig boekjaar (vacía) como si el ejercicio fuera 2018 (Claude 2026-10-18)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-19): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2020, 2021, 2022, 2025): Comercial / Sponsors, Estadio, Televisión
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2018–19 Belgian First Division B" (tools/club-league-reference/be.json), coincidencia exacta "Beerschot Wilrijk".
```

## Fuentes

### beerschot-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### beerschot-be-jaarrekening-2019-06-30-individual-correction

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Beerschot/jaarrekening-2019-06-30-individual-correction.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### beerschot-be-jaarrekening-2021-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Beerschot/jaarrekening-2021-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### beerschot-be-jaarrekening-2022-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Beerschot/jaarrekening-2022-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### beerschot-be-jaarrekening-2024-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Beerschot/jaarrekening-2024-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### beerschot-be-jaarrekening-2020-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Beerschot/jaarrekening-2020-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
