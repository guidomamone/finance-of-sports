# moreirense-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/moreirense-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Moreirense: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Moreirense/relatorio-contas-2021-22.pdf. brandColor #008000
(procedencia en Admin/sourcing/Portugal/Moreirense.md; tools/cargar-lote.mjs).
```

```text
data/pt/moreirense-pt-data.js — Moreirense Futebol Clube – Futebol SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Moreirense/relatorio-contas-2021-22.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "moreirense-pt" — slug de "Moreirense" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Moreirense Futebol Clube – Futebol SAD" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el alta trae una comilla suelta al i
  displayName        ok        "Moreirense" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro no
  sport              ok        "futbol" — el .md nombra el fútbol 144 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2022 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el docum
  cierre             ok        "2022-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): e
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2022-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-06-30 = 0.9627 (Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD))
  sourceId           ok        "moreirense-pt-relatorio-contas-2021-22" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Moreirense"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-06-30","sourceId":"moreirense-pt-relatorio-contas-2021-22"}
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Moreirense/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Moreirense/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 20, precedente |
| 2 | Direitos Televisivos | pág. 20, Jev 1 |
| 3 | Outros | pág. 20, precedente |
| 4 | Subsídios à exploração | pág. 14, Jev 0.99 |
| 5 | Rendimentos suplementares | pág. 25, Jev 0.99 |
| 6 | Rendimentos em investimentos não financeiros | pág. 25, Jev 1 |
| 7 | Outros | pág. 25, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 14, precedente |
| 2 | 6221 Trabalhos especializados | pág. 24, Jev 0.98 |
| 3 | 6223 Vigilância e segurança | pág. 24, Jev 0.91 |
| 4 | 6224 Honorários | pág. 24, Jev 0.99 |
| 5 | 6226 Conservação e reparação | pág. 24, Jev 0.99 |
| 6 | 6231 Ferramentas e utensílios de desgaste rápido | pág. 24, precedente |
| 7 | 6233 Material de escritório | pág. 24, Jev 1 |
| 8 | 6238 Outros | pág. 24, Jev 0.91 |
| 9 | 6241 Electricidade | pág. 24, Jev 0.99 |
| 10 | 6242 Combustíveis | pág. 24, Jev 0.99 |
| 11 | 6243 Água | pág. 24, Jev 0.99 |
| 12 | 6251 Deslocações e estadas | pág. 24, Jev 0.95 |
| 13 | 6253 Transportes de mercadorias | pág. 24, precedente |
| 14 | 6261 Rendas e alugueres | pág. 24, precedente |
| 15 | 6262 Comunicação | pág. 24, Jev 1 |
| 16 | 6263 Seguros | pág. 24, Claude 0.8 |
| 17 | 6265 Contencioso e notariado | pág. 24, Jev 0.99 |
| 18 | 6267 Limpeza, higiene e conforto | pág. 24, Jev 0.98 |
| 19 | 6268 Outros serviços | pág. 24, precedente |
| 20 | Remunerações do pessoal | pág. 24, precedente |
| 21 | Indemnizações | pág. 24, precedente |
| 22 | Encargos sobre remunerações | pág. 24, precedente |
| 23 | Seguros de acidentes de trabalho e doenças profissionais | pág. 24, precedente |
| 24 | Outros gastos com pessoal | pág. 24, Jev 0.9 |
| 25 | Imparidade de dívidas a receber (perdas/reversões) | pág. 14, Jev 0.98 |
| 26 | Provisões (aumentos/reduções) | pág. 14, Jev 0.92 |
| 27 | Impostos | pág. 25, Jev 1 |
| 28 | Descontos de pronto pagamento concedidos | pág. 25, Jev 0.97 |
| 29 | Outros | pág. 25, Jev 0.98 |
| 30 | Gastos/reversões de depreciação e amortização | pág. 14, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2022-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2022-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Moreirense".
```

## Fuentes

### moreirense-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Moreirense/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
