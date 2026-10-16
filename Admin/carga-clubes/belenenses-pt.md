# belenenses-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/belenenses-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Belenenses: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.pdf. brandColor #0033A0
(procedencia en Admin/sourcing/Portugal/Belenenses.md; tools/cargar-lote.mjs).
```

```text
data/pt/belenenses-pt-data.js — Belenenses (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "belenenses-pt" — slug de "Belenenses" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Belenenses" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Belenenses" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2025-06-30) y contenido del .md (109 de 111 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 27 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (109 de 111 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "belenenses-pt-sduq-demonstracoes-financeiras-30junho2025" — clubId + nombre del archivo en slug
  liga               ok        "pt-liga3" — roster cacheado de "2024–25 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Belenenses"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"belenenses-pt-sduq-demonstracoes-financeiras-30junho2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 4, Jev 0.9 |
| 2 | Subsídios à exploração | pág. 4, Jev 0.98 |
| 3 | Outros não especificados | pág. 20, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilhetes | pág. 17, Claude 0.8 |
| 2 | Serviços de Gestão | pág. 17, Jev 0.98 |
| 3 | Contabilidade | pág. 17, Jev 1 |
| 4 | Acompanhamento Nutricional | pág. 17, precedente |
| 5 | Catapult One Team | pág. 17, precedente |
| 6 | Outros Serviços | pág. 17, Jev 0.99 |
| 7 | Publicidade e propaganda | pág. 17, Jev 1 |
| 8 | Vigilância e segurança | pág. 17, Jev 0.97 |
| 9 | Conservação e reparação | pág. 17, Jev 0.98 |
| 10 | Honorários | pág. 17, Jev 1 |
| 11 | Serviços bancários | pág. 17, Jev 0.99 |
| 12 | Comissões | pág. 17, precedente |
| 13 | Outros serviços especializados | pág. 17, Jev 0.93 |
| 14 | Ferramentas e utensílios de desgaste rápido | pág. 17, Jev 1 |
| 15 | Material de escritório | pág. 17, Jev 1 |
| 16 | Combustíveis | pág. 17, Jev 0.99 |
| 17 | Deslocações e estadias | pág. 17, Jev 1 |
| 18 | Rendas e alugueres | pág. 17, precedente |
| 19 | Comunicação | pág. 17, Jev 1 |
| 20 | Contencioso e notariado | pág. 17, Jev 1 |
| 21 | Despesas de representação | pág. 17, Jev 0.99 |
| 22 | Limpeza, higiene e conforto | pág. 17, Jev 1 |
| 23 | Outros | pág. 17, Jev 0.92 |
| 24 | Orgãos sociais e outros colaboradores | pág. 18, Claude 0.8 |
| 25 | Remunerações Plantel e Equipa Técnica | pág. 18, Jev 1 |
| 26 | Encargos sobre remunerações | pág. 18, Jev 0.91 |
| 27 | Seguros | pág. 18, precedente |
| 28 | Outros | pág. 18, Jev 0.92 |
| 29 | Impostos | pág. 18, Jev 0.97 |
| 30 | Taxas | pág. 18, Claude 0.85 |
| 31 | Quotizações Assoc. Futebol Lisboa | pág. 18, precedente |
| 32 | Multas desportivas | pág. 18, Jev 0.91 |
| 33 | Outros gastos e perdas | pág. 18, Jev 0.99 |
| 34 | Gastos / reversões de depreciação e de amortização | pág. 4, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-liga3, verificado contra roster cacheado de "2024–25 Liga 3 (Portugal)" (tools/club-league-reference/pt.json), coincidencia exacta "Belenenses".
```

## Fuentes

### belenenses-pt-sduq-demonstracoes-financeiras-30junho2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
