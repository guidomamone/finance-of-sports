# academicoviseu-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/academicoviseu-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Academico Viseu: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Academico Viseu/wf-2024-2025-efe7ad0a.pdf. brandColor #000000
(procedencia en Admin/sourcing/Portugal/Academico Viseu.md; tools/cargar-lote.mjs).
```

```text
data/pt/academicoviseu-pt-data.js — Académico de Viseu Futebol Clube, Futebol SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Academico Viseu/wf-2024-2025-efe7ad0a.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "academicoviseu-pt" — slug de "Academico Viseu" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Académico de Viseu Futebol Clube, Futebol SAD" — respuesta de Guido en la cola (ccd8dc1)
  displayName        ok        "Academico Viseu" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (74 de 90 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 104 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (74 de 90 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "academicoviseu-pt-wf-2024-2025-efe7ad0a" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia única por palabras "Académico de Viseu" = "Academico 

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"academicoviseu-pt-wf-2024-2025-efe7ad0a"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Academico Viseu/wf-2024-2025-efe7ad0a.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Academico Viseu/wf-2024-2025-efe7ad0a.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas de bilheteira | pág. 21, Jev 0.99 |
| 2 | Merchandising | pág. 21, Jev 1 |
| 3 | Patrocínios, publicidade e corporate | pág. 21, Jev 1 |
| 4 | Receitas de televisão | pág. 21, Jev 1 |
| 5 | Competições da UEFA e nacionais | pág. 21, Jev 1 |
| 6 | Subsídios Associações/FPF/Liga/UEFA | pág. 21, precedente |
| 7 | Subsídios do Estado e outros entes públicos | pág. 21, Jev 0.99 |
| 8 | Rendimentos de apostas | pág. 21, Jev 0.99 |
| 9 | Fundo de infraestruturas Liga Portugal | pág. 21, precedente |
| 10 | Compensação de formação (FIFA Clearing House) | pág. 21, precedente |
| 11 | Ganhos em investimentos não financeiros | pág. 21, precedente |
| 12 | Indemnizações de seguros de acidentes de trabalho | pág. 21, Jev 1 |
| 13 | Outros não especificados | pág. 21, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 10, Jev 0.98 |
| 2 | Trabalhos especializados | pág. 29, Jev 0.99 |
| 3 | Publicidade e propaganda | pág. 29, Jev 1 |
| 4 | Vigilância e segurança | pág. 29, Jev 0.97 |
| 5 | Honorários | pág. 29, Jev 1 |
| 6 | Comissões | pág. 29, Jev 0.95 |
| 7 | Conservação e reparação | pág. 29, Jev 0.99 |
| 8 | Outros serviços especializados | pág. 29, Jev 0.96 |
| 9 | Materiais | pág. 29, precedente |
| 10 | Energia e fluidos | pág. 29, Jev 1 |
| 11 | Deslocações, estadas e transportes | pág. 29, Jev 1 |
| 12 | Rendas e alugueres | pág. 29, precedente |
| 13 | Comunicação | pág. 29, Jev 1 |
| 14 | Seguros | pág. 29, Jev 0.93 |
| 15 | Despesas de representação | pág. 29, Jev 0.99 |
| 16 | Limpeza, higiene e conforto | pág. 29, Jev 1 |
| 17 | Outros serviços | pág. 29, Jev 1 |
| 18 | Remunerações do pessoal | pág. 28, Claude 0.8 |
| 19 | Indemnizações | pág. 28, precedente |
| 20 | Encargos sobre remunerações | pág. 28, Jev 0.93 |
| 21 | Seguro de acidentes no trabalho doenças profissionais | pág. 28, Jev 1 |
| 22 | Outros gastos com o pessoal | pág. 28, precedente |
| 23 | Provisões (aumentos/reduções) | pág. 10, Jev 0.98 |
| 24 | Impostos | pág. 29, Jev 0.96 |
| 25 | Perdas em investimentos não financeiros | pág. 29, Jev 0.98 |
| 26 | Donativos e Quotizações | pág. 29, precedente |
| 27 | Multas e penalidades | pág. 29, Jev 0.97 |
| 28 | Despesas indevidamente documentadas | pág. 29, Jev 0.96 |
| 29 | Bolsas de formação desportiva | pág. 29, Jev 0.99 |
| 30 | Contratos de formação desportiva - Despesas médicas e equipamentos | pág. 29, precedente |
| 31 | Contratos de formação desportiva - Gastos com alimentação | pág. 29, precedente |
| 32 | Contratos de formação desportiva - Taxas de inscrição e transferências | pág. 29, precedente |
| 33 | Contratos de formação desportiva - Outros gastos | pág. 29, precedente |
| 34 | Outros não especificados | pág. 29, Jev 1 |
| 35 | Gastos/reversões de depreciação e de amortização | pág. 10, Jev 0.92 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia única por palabras "Académico de Viseu" = "Academico Viseu".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Academico Viseu/wf-2022-2023-b797bc64.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Academico Viseu/wf-2022-2023-b797bc64.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira e Corporate | pág. 16, Claude 0.85 |
| 2 | Merchandising | pág. 16, precedente |
| 3 | Patrocínios, publicidade e corporate | pág. 16, precedente |
| 4 | Receitas de televisão | pág. 16, precedente |
| 5 | Competições Nacionais | pág. 16, Claude 0.85 |
| 6 | Subsídios à Exploração | pág. 7, Jev 0.95 |
| 7 | Associações/Federações/Liga | pág. 16, Jev 0.96 |
| 8 | Jogos e apostas (distribuição lucros) | pág. 16, Jev 1 |
| 9 | Outros | pág. 16, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 7, precedente |
| 2 | Trabalhos Especializados | pág. 21, precedente |
| 3 | Publicidade e Propaganda | pág. 21, precedente |
| 4 | Vigilância e Segurança | pág. 21, precedente |
| 5 | Honorários | pág. 21, precedente |
| 6 | Conservação e Reparação | pág. 21, precedente |
| 7 | Serviços bancários e financeiro: | pág. 21, Jev 0.99 |
| 8 | Outros serviços especializados | pág. 21, precedente |
| 9 | Materiais | pág. 21, precedente |
| 10 | Energia e Fluidos | pág. 21, precedente |
| 11 | Deslocações e Estadas | pág. 21, Jev 1 |
| 12 | Rendas e alugueres | pág. 21, precedente |
| 13 | Comunicação | pág. 21, precedente |
| 14 | Seguros | pág. 21, precedente |
| 15 | Despesas de Representação | pág. 21, precedente |
| 16 | Outros | pág. 21, Jev 0.92 |
| 17 | Remunerações do pessoal | pág. 20, precedente |
| 18 | Encargos sobre as remunerações | pág. 20, Jev 1 |
| 19 | Seguros de acidentes no trabalho | pág. 20, Jev 0.99 |
| 20 | Outros | pág. 20, Jev 0.92 |
| 21 | Imparidade de dívidas a receber (perdas/reversões) | pág. 7, Jev 0.99 |
| 22 | Provisões | pág. 7, precedente |
| 23 | Outros gastos | pág. 7, Jev 1 |
| 24 | Gastos/ reversões de depreciação e de amortização | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2022–23 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia única por palabras "Académico de Viseu" = "Academico Viseu".
```

## Fuentes

### academicoviseu-pt-wf-2024-2025-efe7ad0a

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Academico Viseu/wf-2024-2025-efe7ad0a.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### academicoviseu-pt-wf-2022-2023-b797bc64

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Academico Viseu/wf-2022-2023-b797bc64.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
