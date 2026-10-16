# academica-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/academica-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Académica: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Académica/RC-SDUQ-2023-2024.pdf. brandColor #000000
(procedencia en Admin/sourcing/Portugal/Académica.md; tools/cargar-lote.mjs).
```

```text
data/pt/academica-pt-data.js — Académica (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Académica/RC-SDUQ-2023-2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "academica-pt" — slug de "Académica" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Académica" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Académica" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (41 de 41 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 24 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (41 de 41 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "academica-pt-rc-sduq-2023-2024" — clubId + nombre del archivo en slug
  liga               ok        "pt-liga3" — roster cacheado de "2023–24 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Académica"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"academica-pt-rc-sduq-2023-2024"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Académica/RC-SDUQ-2023-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Académica/RC-SDUQ-2023-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilhetes de Jogo | pág. 20, Jev 1 |
| 2 | Prestações de Serviços | pág. 20, ? 0.6 |
| 3 | Subsidios à exploração | pág. 4, Jev 0.98 |
| 4 | Publicidade | pág. 21, Jev 1 |
| 5 | Alienações e Direitos desportivos | pág. 21, Jev 0.98 |
| 6 | Outros | pág. 21, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 20, Jev 0.99 |
| 2 | Publicidade e propaganda | pág. 20, Jev 1 |
| 3 | Vigilância e segurança | pág. 20, Jev 0.96 |
| 4 | Honorários | pág. 20, Jev 1 |
| 5 | Comissões | pág. 20, precedente |
| 6 | Conservação e reparação | pág. 20, Jev 0.99 |
| 7 | Outros | pág. 20, Jev 0.95 |
| 8 | Ferramentas e utensílios de desgaste rápido | pág. 20, Jev 1 |
| 9 | Material de escritório | pág. 20, Jev 1 |
| 10 | Deslocações e estadas | pág. 20, Jev 1 |
| 11 | Rendas e alugueres | pág. 20, precedente |
| 12 | Comunicação | pág. 20, Jev 1 |
| 13 | Seguros | pág. 20, Claude 0.8 |
| 14 | Limpeza, higiene e conforto | pág. 20, Jev 1 |
| 15 | Outros | pág. 20, Jev 0.95 |
| 16 | Salários | pág. 19, precedente |
| 17 | Contribuições | pág. 19, precedente |
| 18 | Outros | pág. 19, Jev 0.95 |
| 19 | Imparidades (Perdas/Reversões) | pág. 4, precedente |
| 20 | Provisões (Aumentos/Reversões) | pág. 4, Jev 0.96 |
| 21 | Impostos e taxas | pág. 21, Jev 1 |
| 22 | Outros Gastos e Perdas | pág. 21, Jev 0.98 |
| 23 | Gastos/reversões de depreciação e de amortização | pág. 4, Jev 0.92 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cero-real = Televisión. El documento no tiene ingresos de TV (subagente Sonnet, revisado por Claude).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-liga3, verificado contra roster cacheado de "2023–24 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Académica".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Académica/9-RC-SDUQ-2021-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Académica/9-RC-SDUQ-2021-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilhetes de Jogo | pág. 20, precedente |
| 2 | Prestações de Serviços | pág. 20, precedente |
| 3 | Subsidios à exploração | pág. 7, precedente |
| 4 | Publicidade | pág. 21, precedente |
| 5 | Direitos Televisivos | pág. 21, Jev 1 |
| 6 | Alienações e Direitos desportivos | pág. 21, precedente |
| 7 | Outros | pág. 21, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 21, precedente |
| 2 | Publicidade e propaganda | pág. 21, precedente |
| 3 | Vigilância e segurança | pág. 21, precedente |
| 4 | Honorários | pág. 21, precedente |
| 5 | Comissões | pág. 21, precedente |
| 6 | Conservação e reparação | pág. 21, precedente |
| 7 | Outros | pág. 21, precedente |
| 8 | Ferramentas e utensílios de desgaste rápido | pág. 21, precedente |
| 9 | Material de escritório | pág. 21, precedente |
| 10 | Combustíveis | pág. 21, Jev 1 |
| 11 | Deslocações e estadas | pág. 21, precedente |
| 12 | Rendas e alugueres | pág. 21, precedente |
| 13 | Comunicação | pág. 21, precedente |
| 14 | Seguros | pág. 21, precedente |
| 15 | Contencioso e notariado | pág. 21, Jev 1 |
| 16 | Limpeza, higiene e conforto | pág. 21, precedente |
| 17 | Outros | pág. 21, precedente |
| 18 | Salários | pág. 20, precedente |
| 19 | Contribuições | pág. 20, precedente |
| 20 | Outros | pág. 20, precedente |
| 21 | Imparidades (Perdas/Reversões) | pág. 7, precedente |
| 22 | Provisões (Aumentos/Reversões) | pág. 7, precedente |
| 23 | Outros gastos | pág. 7, Jev 1 |
| 24 | Gastos/reversões de depreciação e de amortização | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2021–22 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Académica".
```

## Fuentes

### academica-pt-rc-sduq-2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Académica/RC-SDUQ-2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### academica-pt-9-rc-sduq-2021-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Académica/9-RC-SDUQ-2021-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
