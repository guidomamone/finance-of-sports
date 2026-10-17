# tondela-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/tondela-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Tondela: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Tondela/relatorio-contas-2020-21.pdf. brandColor #008000
(procedencia en Admin/sourcing/Portugal/Tondela.md; tools/cargar-lote.mjs).
```

```text
data/pt/tondela-pt-data.js — CD Tondela - Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Tondela/relatorio-contas-2020-21.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "tondela-pt" — slug de "Tondela" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "CD Tondela - Futebol, SAD" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el alta no detecta nombre; el .md de
  displayName        ok        "Tondela" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro no
  sport              ok        "futbol" — el .md nombra el fútbol 44 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2021 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el docum
  cierre             ok        "2021-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): e
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): Guido 2026-10-15: el club es la SAD (relatorio-contas-2020-21, cuentas indi
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2021-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2021-06-30 = 0.8415 (Cierre BCE al 30/6/2021 (1 EUR = 1,1884 USD))
  sourceId           ok        "tondela-pt-relatorio-contas-2020-21" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2020–21 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Tondela"

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2021-06-30","sourceId":"tondela-pt-relatorio-contas-2020-21"}
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Tondela/relatorio-contas-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Tondela/relatorio-contas-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Merchandising | pág. 30, Jev 1 |
| 2 | Direitos Televisivos | pág. 30, Jev 1 |
| 3 | Patrocinio e Publicidade | pág. 30, Jev 1 |
| 4 | Participação em competiçoes nacionais | pág. 30, Jev 1 |
| 5 | Atividades Comerciais | pág. 30, Jev 0.99 |
| 6 | Descontos Obtidos | pág. 31, Jev 1 |
| 7 | Diferenças de câmbio favoráveis | pág. 31, precedente |
| 8 | Correções relativas a períodos anteriores | pág. 31, precedente |
| 9 | Juros Obtidos | pág. 31, precedente |
| 10 | Mecanismo de solidariedade | pág. 31, precedente |
| 11 | Outros | pág. 31, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e matérias consumidas | pág. 15, Jev 0.95 |
| 2 | Subcontratos | pág. 30, Jev 0.98 |
| 3 | Serviços especializados | pág. 30, Jev 0.96 |
| 4 | Publicidade | pág. 30, Jev 1 |
| 5 | Vigilância e segurança | pág. 30, Jev 0.97 |
| 6 | Honorários | pág. 30, Jev 1 |
| 7 | Comissões | pág. 30, precedente |
| 8 | Conservação e Reparação | pág. 30, Jev 0.99 |
| 9 | Serviços bancários | pág. 30, Jev 0.98 |
| 10 | Ferramentas e Utensílios | pág. 30, Jev 1 |
| 11 | Material de escritório | pág. 30, Jev 1 |
| 12 | Artigos para oferta | pág. 30, Jev 0.99 |
| 13 | Electricidade | pág. 30, Jev 1 |
| 14 | Combustível | pág. 30, Jev 0.99 |
| 15 | Água | pág. 30, Jev 0.97 |
| 16 | Gás | pág. 30, Jev 0.99 |
| 17 | Deslocações e Estadas | pág. 30, Jev 1 |
| 18 | Rendas e Alugueres | pág. 30, precedente |
| 19 | Comunicação | pág. 30, Jev 1 |
| 20 | Seguros | pág. 30, Jev 0.96 |
| 21 | Contencioso e Notariado | pág. 30, Jev 1 |
| 22 | Despesas de Representação | pág. 30, Jev 1 |
| 23 | Limpeza e Conforto | pág. 30, Jev 1 |
| 24 | Outros Serviços | pág. 30, Jev 1 |
| 25 | Remunerações do pessoal | pág. 31, precedente |
| 26 | Indemnizações | pág. 31, precedente |
| 27 | Encargos sobre remunerações | pág. 31, Jev 0.95 |
| 28 | Seguros de acidentes de trabalho e doenças profissionais | pág. 31, Jev 1 |
| 29 | Outros gastos com pessoal | pág. 31, precedente |
| 30 | Impostos | pág. 32, Jev 0.95 |
| 31 | Correções relativas a períodos anteriores | pág. 32, Jev 0.99 |
| 32 | Multas e Colmas | pág. 32, Jev 0.98 |
| 33 | Donativos | pág. 32, Jev 1 |
| 34 | Quotizações | pág. 32, precedente |
| 35 | Descontos Concedidos | pág. 32, Jev 0.99 |
| 36 | Encargos não devidamente documentados | pág. 32, Jev 1 |
| 37 | Diferenças de câmbio desfavoráveis | pág. 32, Jev 0.98 |
| 38 | Juros de mora e compensatórios | pág. 32, Jev 1 |
| 39 | Outros | pág. 32, Jev 0.99 |
| 40 | Gastos/reversões de depreciação e de amortização | pág. 15, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2021-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2021-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Financiamentos obtidos" no corriente 400 000,00 + corriente 480 361,43 (la nota L957 da el mismo total); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Caixa e depósitos bancários"
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2020–21 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Tondela".
```

## Fuentes

### tondela-pt-relatorio-contas-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Tondela/relatorio-contas-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
