# estorilpraia-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/estorilpraia-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Estoril Praia: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.pdf. brandColor #FFE000
(procedencia en Admin/sourcing/Portugal/Estoril Praia.md; tools/cargar-lote.mjs).
```

```text
data/pt/estorilpraia-pt-data.js — Estoril Praia – Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "estorilpraia-pt" — slug de "Estoril Praia" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Estoril Praia – Futebol, SAD" — respuesta de Guido en la cola (49bfb4f)
  displayName        ok        "Estoril Praia" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (160 de 161 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 72 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), presente en el .md (el año más citado con fecha de cierre es 2028)
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (160 de 161 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "estorilpraia-pt-relatorio-contas-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Estoril" = "Estoril Praia"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"estorilpraia-pt-relatorio-contas-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Estoril Praia/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 27, precedente |
| 2 | Competições nacionais | pág. 60, Claude 0.8 |
| 3 | Bilhetes época | pág. 60, Jev 1 |
| 4 | Patrocínio e publicidade | pág. 27, Jev 1 |
| 5 | Direitos de transmissão | pág. 27, Jev 1 |
| 6 | Atividades comerciais | pág. 27, Jev 0.99 |
| 7 | Contribuições da UEFA e prémios monetários | pág. 27, Jev 1 |
| 8 | Subsídio do Estado e Outros entes públicos | pág. 61, Jev 0.99 |
| 9 | Subsídio da UEFA | pág. 61, precedente |
| 10 | Outros subsídios | pág. 61, Jev 0.99 |
| 11 | Rendimentos suplementares | pág. 65, Jev 0.99 |
| 12 | Correções relativas a períodos anteriores | pág. 65, precedente |
| 13 | Outros rendimentos | pág. 65, Jev 0.99 |
| 14 | (Gastos)/rendimentos com transações de direitos de atletas | pág. 27, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 27, Jev 0.97 |
| 2 | Trabalhos especializados | pág. 62, Jev 0.99 |
| 3 | Vigilância e Segurança | pág. 62, Jev 0.96 |
| 4 | Honorários | pág. 62, Jev 1 |
| 5 | Comissões | pág. 62, precedente |
| 6 | Conservação e Reparação | pág. 62, Jev 0.99 |
| 7 | Serviços bancários | pág. 62, Jev 0.98 |
| 8 | Materiais | pág. 62, precedente |
| 9 | Energia e fluídos | pág. 62, Jev 1 |
| 10 | Deslocações, estadas e transportes | pág. 62, Jev 1 |
| 11 | Serviços diversos | pág. 62, Jev 0.95 |
| 12 | Remunerações do pessoal | pág. 64, precedente |
| 13 | Indemnizações | pág. 64, precedente |
| 14 | Encargos sobre remunerações | pág. 64, Jev 0.92 |
| 15 | Seguros | pág. 64, precedente |
| 16 | Gastos de ação social | pág. 64, precedente |
| 17 | Outros gastos com pessoal | pág. 64, precedente |
| 18 | Impostos | pág. 65, Jev 0.93 |
| 19 | Correções relativas a períodos anteriores | pág. 65, Jev 0.99 |
| 20 | Quotizações | pág. 65, precedente |
| 21 | Multas desportivas | pág. 65, Jev 0.92 |
| 22 | Inscrições desportivas | pág. 65, precedente |
| 23 | Donativos | pág. 65, Jev 1 |
| 24 | Outros gastos | pág. 65, Jev 1 |
| 25 | Gastos/reversões de depreciação e de amortização (excluindo direitos de atletas) | pág. 27, Jev 0.99 |
| 26 | Gastos/reversões de depreciação e de amortização de direitos de atletas | pág. 27, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Estoril" = "Estoril Praia".
```

## Fuentes

### estorilpraia-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
