# boavista-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/boavista-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Boavista: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Boavista/RCSAD-23-24_1-3.pdf. brandColor #000000
(procedencia en Admin/sourcing/Portugal/Boavista.md; tools/cargar-lote.mjs).
```

```text
data/pt/boavista-pt-data.js — Boavista Futebol Clube, Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Boavista/RCSAD-23-24_1-3.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "boavista-pt" — slug de "Boavista" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Boavista Futebol Clube, Futebol, SAD" — respuesta de Guido en la cola (4ea2e8f)
  displayName        ok        "Boavista" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (5 de 7 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 79 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — contenido del .md (año más nuevo con fecha de cierre)
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (5 de 7 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y 
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "boavista-pt-rcsad-23-24-1-3" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Boavista"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"boavista-pt-rcsad-23-24-1-3"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Boavista/RCSAD-23-24_1-3.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Boavista/RCSAD-23-24_1-3.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subsídios à exploração | pág. 14, Jev 0.98 |
| 2 | Outros rendimentos | pág. 14, Jev 0.98 |
| 3 | Bilhetes e Camarotes | pág. 14, Jev 0.99 |
| 4 | Direitos Televisivos | pág. 14, Jev 1 |
| 5 | Publicidade | pág. 14, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e serviços externos | pág. 14, Jev 1 |
| 2 | Gastos com o pessoal | pág. 14, Jev 0.91 |
| 3 | Outros gastos | pág. 14, Jev 1 |
| 4 | Gastos/reversões de depreciação e de amortização | pág. 14, Jev 0.93 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 507 074,99. El estado trae las ventas en un renglón; la nota 22 (en la parte 2 del PDF, que el lote no lee) lo desglosa.
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 3 463 888,92. Desglose de Vendas e serviços prestados, nota 22.
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 453 304,23. Desglose de Vendas e serviços prestados, nota 22.
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: sin financiamientos en el balance; nota 29.2.5 "Financiamentos Obtidos: Não aplicável" (parte 3-3, L288-290). Las "Outras dívidas a pagar" (61,3 M) no son deuda financiera; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Caixa e depósitos bancários" (la nota 29.2.4 da el mismo total); el script leía 529
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Boavista".
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-17/resultado-12.json, tools/gestiones-tanda.mjs, 2026-10-17):_

```text
Fary Faye (2024-05-07 a hoy): Presidente del conselho de administração de la SAD desde la asamblea general del 7/5/2024 (comunicado oficial del club, mismo día: 'eleição e tomada de posse', mandato 2024/26; prensa lo llama 'Fary' y 'Fary Faye'). Corto 'Fary' como lo escribe la prensa. Reemplazó a Vítor Murta, que renunció. El balance 2023/24 (cierre 30/6/2024) lo firma él como Presidente del CA el 31/10/2024 (Clubes/Portugal/Boavista/RCSAD-23-24_1-3.md:387 y :470; RCSAD-23-24_3-3.md:999-1003) y dice que el nuevo CA asumió el 7/5/2024 (RCSAD-23-24_1-3.md:306; RCSAD-23-24_2-3.md:1270; RCSAD-23-24_3-3.md:1265 aprox., nota 26.1). hasta=null: no se halló salida; el mandato 2024/26 vence en 2026 y no se hallaron noticias de sucesor ni de renuncia. Accionista mayoritario: Jogo Bonito Group 67,62% (RCSAD-23-24_2-3.md:503); el club fundador tiene 10%. Gérard López aparece en prensa como accionista principal, pero los documentos citan la sociedad, no a la persona.
Duda: Cierre 2024-06-30: la gestión cambió antes del cierre (7/5/2024) pero el ejercicio 2023/24 casi entero lo condujo Vítor Murta; el balance dice que el nuevo CA 'não teve grande influência nas decisões de gestão desta época' (RCSAD-23-24_2-3.md:1270). Se carga Fary Faye por la regla (desde <= cierre) y porque firma el balance; Murta no se carga porque no hay ejercicio cuyo cierre caiga en su gestión.
Duda: No se verificó con fuente de 2026 que Fary Faye siga en el cargo (mandato 2024/26 vence este año); hasta=null queda como 'sin salida conocida'.
```

## Fuentes

### boavista-pt-rcsad-23-24-1-3

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Boavista/RCSAD-23-24_1-3.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
