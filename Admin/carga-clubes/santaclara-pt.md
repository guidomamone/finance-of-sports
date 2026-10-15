# santaclara-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/santaclara-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Santa Clara: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Santa Clara/relatorio-contas-sad-2024-25.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Portugal/Santa Clara.md; tools/cargar-lote.mjs).
```

```text
data/pt/santaclara-pt-data.js — Santa Clara Açores - Futebol, S.A.D. (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Santa Clara/relatorio-contas-sad-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "santaclara-pt" — slug de "Santa Clara" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Santa Clara Açores - Futebol, S.A.D." — respuesta de Guido en la cola (d956c04): aceptó la propuesta
  displayName        ok        "Santa Clara" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (42 de 43 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 89 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (42 de 43 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "santaclara-pt-relatorio-contas-sad-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Santa Clara"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"santaclara-pt-relatorio-contas-sad-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Santa Clara/relatorio-contas-sad-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Santa Clara/relatorio-contas-sad-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Merchandising | pág. 35, Jev 1 |
| 2 | Ingressos para Jogos | pág. 35, Jev 1 |
| 3 | Apostas Desportivas e Placard | pág. 35, Jev 0.98 |
| 4 | Publicidade | pág. 35, Jev 1 |
| 5 | Prémio Participação | pág. 35, Jev 1 |
| 6 | Direitos Televisivos | pág. 35, Jev 1 |
| 7 | Cedência por empréstimo de Direitos Desportivos | pág. 35, Jev 1 |
| 8 | Diversos | pág. 35, Jev 1 |
| 9 | Subsídios à exploração | pág. 18, Jev 0.99 |
| 10 | Descontos de Pronto Pagamentos Obridos | pág. 35, Jev 1 |
| 11 | Alienação de Ativos Intangíveis | pág. 35, Jev 0.92 |
| 12 | Alienação de Ativos Tangíveis | pág. 35, Jev 0.99 |
| 13 | Correções Relativas a Períodos Anteriores | pág. 35, precedente |
| 14 | Outros | pág. 35, precedente |
| 15 | Juros e Outros Rendimentos Similares | pág. 35, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 18, Jev 0.97 |
| 2 | Subcontratos | pág. 45, Jev 0.98 |
| 3 | Trabalhos especializados | pág. 45, Jev 0.99 |
| 4 | Publicidade e propaganda | pág. 45, Jev 1 |
| 5 | Vigilância e segurança | pág. 45, Jev 0.97 |
| 6 | Honorários | pág. 45, Jev 1 |
| 7 | Comissões | pág. 45, precedente |
| 8 | Conservação e reparação | pág. 45, Jev 0.98 |
| 9 | Outros | pág. 45, Jev 0.97 |
| 10 | Ferramentas e utensílios de desgaste rápido | pág. 45, Jev 1 |
| 11 | Livros e documentação técnica | pág. 45, Jev 1 |
| 12 | Material de escritório | pág. 45, Jev 1 |
| 13 | Artigos para oferta | pág. 45, Jev 0.97 |
| 14 | Outros | pág. 45, Jev 0.97 |
| 15 | Eletricidade | pág. 45, Jev 1 |
| 16 | Combustíveis | pág. 45, Jev 0.99 |
| 17 | Água | pág. 45, Jev 1 |
| 18 | Outros | pág. 45, Jev 0.97 |
| 19 | Deslocações e estadas | pág. 45, Jev 1 |
| 20 | Transportes de pessoal | pág. 45, Jev 1 |
| 21 | Transportes de mercadorias | pág. 45, precedente |
| 22 | Rendas e alugueres | pág. 45, precedente |
| 23 | Comunicação | pág. 45, Jev 1 |
| 24 | Seguros | pág. 45, Jev 0.9 |
| 25 | Contencioso e notariado | pág. 45, Jev 1 |
| 26 | Despesas de representação | pág. 45, Jev 0.99 |
| 27 | Limpeza, higiene e conforto | pág. 45, Jev 1 |
| 28 | Remunerações dos órgãos sociais | pág. 43, Jev 0.99 |
| 29 | Remunerações do pessoal | pág. 43, Claude 0.8 |
| 30 | Indemnizações | pág. 43, precedente |
| 31 | Encargos sobre as remunerações | pág. 43, Jev 0.92 |
| 32 | Seguros de acidentes no trabalho e doenças profissionais | pág. 43, Jev 0.99 |
| 33 | Outros gastos com o pessoal, dos quais: | pág. 43, precedente |
| 34 | Imparidade de dívidas a receber (perdas/reversões) | pág. 18, Jev 0.99 |
| 35 | Provisões (aumentos/ Reduções) | pág. 18, Jev 0.97 |
| 36 | IMI | pág. 47, Jev 0.98 |
| 37 | IUC | pág. 47, Claude 0.85 |
| 38 | Imposto de Selo | pág. 47, Jev 0.92 |
| 39 | Taxas | pág. 47, precedente |
| 40 | Desconto Pronto Pagamento | pág. 47, Jev 1 |
| 41 | Jogadores | pág. 47, Jev 0.93 |
| 42 | Correções Relativas a períodos anteriores | pág. 47, Jev 1 |
| 43 | Donativos | pág. 47, Jev 1 |
| 44 | Quotizações | pág. 47, Jev 0.91 |
| 45 | Diferença de câmbio desfavoráveis | pág. 47, Jev 0.99 |
| 46 | Multas e penalidades | pág. 47, Jev 0.97 |
| 47 | Gastos não devidamente documentados | pág. 47, Jev 1 |
| 48 | Juros de Mora e compensatórios | pág. 47, Jev 1 |
| 49 | Outros | pág. 47, Jev 0.97 |
| 50 | Gastos/reversões de depreciação e de amortização | pág. 18, precedente |
| 51 | Imparidade de ativos depreciáveis/amortizáveis (perdas/reversões) | pág. 18, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 6 658 978,90. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 900 000,00. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 107 466,20. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 4 082 748,19. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 16 165 189,26. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 12 132 898,09. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 236 995,04. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 202 269,85. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 471 404,17. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 838 396,78. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 618 741,86. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 13 195 708,65. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 10 400 123,16. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 11 194,68. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 14 604 142,08. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 11 598 311,45. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 289 445,53. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 14 893 587,61. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 11 746 614,42. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 1 848 329,06. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 13 241 139,22. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 9 898 285,36. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 339 215. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 1 831 508. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 14 820. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 40 646. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 181 499. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 157 836. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 517 775. Escaneo: la segunda lectura no confirmó el número; revisado contra la imagen (300 dpi), la aritmética del estado y las notas (subagente Sonnet, revisado por Claude). Las cifras mal leídas se corrigieron en el .md.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 33.375,18. La fila está dentro de la nota 10.2 'Outros Rendimentos' (suma 838.396,78, igual al renglón del estado), pero la extracción la puso como gasto (-33.375). Es ingreso: sin ella los ingresos suman 8.623.474 y el resultado da -13.307.895 en vez de -13.241.139 (diferencia 2 x 33.375).
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Santa Clara".
```

## Fuentes

### santaclara-pt-relatorio-contas-sad-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Santa Clara/relatorio-contas-sad-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
