# paysandu-br — evidencia de carga

Lo que había como comentario en `data/br/paysandu-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/paysandu-br-data.js — Paysandu Sport Club (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/Paysandu/dre-2021.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "paysandu-br" — slug de "Paysandu" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Paysandu Sport Club" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
  displayName        ok        "Paysandu" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: los demás .md del club (4 de 4 documentos cierran en el mes 12); este documento no alcanza solo
  sport              ok        "futbol" — el .md nombra el fútbol 3 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (los demás .md del club (4 de 4 documentos cierran en el mes 12); este documento no alcanza solo)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2021-12-31 = 5.5805 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2021)
  sourceId           ok        "paysandu-br-dre-2021" — clubId + nombre del archivo en slug
  liga               ok        "br-serieC" — roster cacheado de "2021 Campeonato Brasileiro Série C" (tools/club-league-reference/br.json), coincidencia exacta "Paysandu"

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2021-12-31","sourceId":"paysandu-br-dre-2021"}
============================================================================
```

_de data/clubs.js:_

```text
Paysandu: alta por tools/alta-club.mjs (2026-10-10) desde Clubes/Brasil/Paysandu/dre-2021.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Brasil/Paysandu.md, club-or-year-onboarding/club-nuevo.md).
```

_de data/club-leagues/br.js:_

```text
Paysandu (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2021 Campeonato Brasileiro Série C" (tools/club-league-reference/br.json), coincidencia exacta "Paysandu".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Paysandu/dre-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Paysandu/dre-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | FUTEBOL PROFISSIONAL | pág. 1, precedente |
| 2 | FUTEBOL DE BASE | pág. 1, precedente |
| 3 | ESPORTES OLIMPICOS | pág. 1, precedente |
| 4 | SOCIO TORCEDOR | pág. 1, precedente |
| 5 | SOCIO PROPRIETARIO | pág. 1, precedente |
| 6 | DOACOES | pág. 1, precedente |
| 7 | ROYALTIES E FRANQUIAS | pág. 1, precedente |
| 8 | PATROCINIO | pág. 1, precedente |
| 9 | REMISSAO DE DIVIDA | pág. 1, precedente |
| 10 | TIMEMANIA | pág. 1, Jev 1 |
| 11 | OUTRAS RECEITAS | pág. 1, precedente |
| 12 | ALUGUEL | pág. 1, precedente |
| 13 | RECEITA COM GRATUIDADES | pág. 1, precedente |
| 14 | (-) DEDUCOES DE RECEITAS | pág. 1, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | CUSTOS COM PESSOAL | pág. 1, precedente |
| 2 | CUSTOS GERAIS | pág. 1, precedente |
| 3 | DESPESAS COM PESSOAL | pág. 1, precedente |
| 4 | GERAIS E ADMINISTRATIVAS | pág. 1, precedente |
| 5 | DESPESAS COM GRATUIDADE I | pág. 1, precedente |
| 6 | DEPRECIACAO/AMORTIZACAO | pág. 1, precedente |
| 7 | PERDAS CONSTITUIDAS II | pág. 1, Jev 0.99 |
| 8 | PERDAS DE CAPITAL | pág. 1, precedente |
| 9 | PECLD | pág. 1, precedente |
| 10 | DESPESAS TRIBUTARIAS | pág. 1, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): resultado-final = -2.175.575,20. Onboarding to-do 165 (Claude, 2026-10-09): este DRE de 2025 imprime con signos de balancete (receitas negativas, custos positivos), así que el déficit sale como '2.175.575,20' positivo (L8 y L45). La cuenta: 69.580.477,67 - 30.443.507,96 - 39.852.911,20 - 1.459.633,71 = -2.175.575,20; dre-2024 (formato normal) imprime 2024 como déficit -3.885.733,14 y este documento lo trae como 3.885.733,14
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Paysandu/dre-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Paysandu/dre-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Futebol Profissional | pág. 1, Jev 0.98 |
| 2 | Futebol de Base | pág. 1, Jev 1 |
| 3 | Esportes Olímpicos | pág. 1, Jev 1 |
| 4 | Sócio Torcedor | pág. 1, Jev 1 |
| 5 | Sócio Proprietário | pág. 1, Jev 0.97 |
| 6 | Doações | pág. 1, Jev 1 |
| 7 | Royalties e Franquias | pág. 1, Claude 0.8 |
| 8 | Patrocínio | pág. 1, Jev 1 |
| 9 | Remissão de dívida | pág. 1, Jev 1 |
| 10 | Time Mania | pág. 1, Jev 1 |
| 11 | Outras receita | pág. 1, Jev 0.99 |
| 12 | Aluguel | pág. 1, precedente |
| 13 | Receita com Gratuidades | pág. 1, precedente |
| 14 | (-) Deduções da Receitas | pág. 1, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo com Pessoal | pág. 1, Jev 0.91 |
| 2 | Custos Gerais | pág. 1, Jev 0.96 |
| 3 | Despesa com Pessoal | pág. 1, precedente |
| 4 | Gerais e Administrativas | pág. 1, Jev 1 |
| 5 | Despesas com Gratuidades | pág. 1, precedente |
| 6 | Depreciação/Amortização | pág. 1, Jev 1 |
| 7 | Perdas Constituídas | pág. 1, precedente |
| 8 | PECLD | pág. 1, Jev 1 |
| 9 | Despesas Tributárias | pág. 1, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae 2023-12-31; el ejercicio del documento cierra el 2024-12-31
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Claude 2026-10-09: el renglon 'Despesas Operacionais da Atividade Desportiva' 33.680.062 (L33) es el subtotal de L34-L41 y la extraccion lo sumaba ademas de sus componentes (gastos 101.003.244 en vez de ~67,3M). Se saca el subtotal y quedan los componentes. Resultado impreso: 64.496.592 - 33.601.309,54 - 33.680.062 = -2.784.779,54 (L42); -2.784.779,54 - 1.100.953,60 = -3.885.733,14 (L46).
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): el documento imprime 'Perdas de Capital' (41.810, L39) pero no la suma: el subtotal L33 es 33.680.062 = sus renglones sin ella (33.721.872 - 41.810), y el resultado operacional (-2.784.779,54, L41) y el del ejercicio (-3.885.733,14, L45) cierran sin ella. Se carga lo que el documento suma
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Paysandu/dre-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Paysandu/dre-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Futebol Profissional | pág. 1, Jev 0.98 |
| 2 | Futebol de Base | pág. 1, Jev 1 |
| 3 | Esportes Olímpicos | pág. 1, Jev 1 |
| 4 | Sócio Torcedor | pág. 1, Jev 1 |
| 5 | Sócio Proprietário | pág. 1, Jev 0.97 |
| 6 | Doações | pág. 1, Jev 1 |
| 7 | Royalties e Franquias | pág. 1, Claude 0.8 |
| 8 | Patrocínio | pág. 1, Jev 1 |
| 9 | Remissão de dívida | pág. 1, Jev 1 |
| 10 | Time Mania | pág. 1, Jev 1 |
| 11 | Outras receita | pág. 1, Jev 0.99 |
| 12 | Aluguel | pág. 1, precedente |
| 13 | Receita com Gratuidades | pág. 1, precedente |
| 14 | (-) Deduções da Receitas | pág. 1, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo com Pessoal | pág. 1, Jev 0.91 |
| 2 | Despesa com Pessoal | pág. 1, precedente |
| 3 | Gerais e Administrativas | pág. 1, Jev 1 |
| 4 | Despesas com Gratuidades (i) | pág. 1, precedente |
| 5 | Depreciação/Amortização | pág. 1, Jev 1 |
| 6 | Perdas Constituídas (ii) | pág. 1, precedente |
| 7 | PECLD | pág. 1, Jev 1 |
| 8 | Despesas Tributárias | pág. 1, Jev 1 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2023-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae 2022-12-31 (el primer año del encabezado 'Exercícios findos em 31 de dezembro 2022 e 2023'); el ejercicio del documento cierra el 2023-12-31
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Paysandu/dre-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Paysandu/dre-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Futebol Profissional | pág. 1, Jev 0.98 |
| 2 | Futebol de Base | pág. 1, Jev 1 |
| 3 | Esportes Olímpicos | pág. 1, Jev 1 |
| 4 | Sócio Torcedor | pág. 1, Jev 1 |
| 5 | Sócio Proprietário | pág. 1, Jev 0.97 |
| 6 | Doações | pág. 1, Jev 1 |
| 7 | Royalties e Franquias | pág. 1, Claude 0.8 |
| 8 | Outras receita | pág. 1, Jev 0.99 |
| 9 | Aluguel | pág. 1, precedente |
| 10 | Receita com Gratuidades | pág. 1, precedente |
| 11 | Recuperação de Receitas | pág. 1, Jev 0.99 |
| 12 | (-) Deduções da Receita do Futebol | pág. 1, Jev 0.96 |
| 13 | Lojas Lobo | pág. 1, Jev 0.9 |
| 14 | (-) Deduções da Receita de Venda | pág. 1, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo com Pessoal | pág. 1, Jev 0.91 |
| 2 | CMV | pág. 1, precedente |
| 3 | Custo com Pessoal | pág. 1, Jev 0.91 |
| 4 | Despesa com Pessoal | pág. 1, precedente |
| 5 | Gerais e Administrativas | pág. 1, Jev 1 |
| 6 | Despesas com Gratuidades | pág. 1, precedente |
| 7 | Depreciação/Amortização | pág. 1, Jev 1 |
| 8 | Perdas Constituídas | pág. 1, precedente |
| 9 | PECLD | pág. 1, Jev 1 |
| 10 | Despesas Tributárias | pág. 1, Jev 1 |
| 11 | Gerais e Administrativas | pág. 1, Jev 1 |
| 12 | Depreciação/Amortização | pág. 1, Jev 1 |
| 13 | PECLD | pág. 1, Jev 1 |
| 14 | Outras Despesas com Vendas | pág. 1, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Márcio Tuma (2025-12-22 a hoy): Vice, asumió el lunes 22/12/2025 al renunciar Aguilera (Estado do Pará Online, 22/12/2025). Aclamación para 2027-28 prevista el 3 de noviembre (sin confirmar).
SIN CONFIRMAR, no cargada: Maurício Ettinger (2021-01-01 a 2025-01-01), https://www.oliberal.com/esportes/futebol/e-hora-de-sair-de-cena-mauricio-ettinger-avalia-gestao-e-se-despede-do-paysandu-1.903032: Elegido el 03/12/2020; el club preveía posse el 01/01/2021 pero Sindiclubes PA dice que la ceremonia fue el 26/01/2021: se usa 01/01 (inicio de mandato), no confirmado. Reelecto el 07/12/2022 (2023-2024). Dejó el cargo el 31/12/2024 al terminar el segundo mandato (O Liberal).
SIN CONFIRMAR, no cargada: Roger Aguilera (2025-01-01 a 2025-12-22), https://dol.com.br/esporte/esporte-para/881668/roger-aguilera-e-eleito-presidente-do-paysandu: Elegido el 05/11/2024 (689 a 244) para 2025-2026 (DOL/Belém.com.br); el 01/01/2025 deducido del inicio del mandato, ninguna nota leída da el día de posse. Renunció el 22/12/2025.
Duda: Cierre 2025: Aguilera presidió casi todo el año; Tuma asumió el 22/12/2025 (posible firmo).
```

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Roger Aguilera (2025-01-01 a 2025-12-22): Elegido el 05/11/2024 (DOL). O Liberal: asumió el 01/01/2025 (mandato 2025/26; otra nota previa anuncia ceremonia el 20/01). Renunció el 22/12/2025 (O Liberal, Diário do Pará).
SIN CONFIRMAR, no cargada: Maurício Ettinger (2021-01-01 a 2025-01-01), https://www.oliberal.com/esportes/futebol/e-hora-de-sair-de-cena-mauricio-ettinger-avalia-gestao-e-se-despede-do-paysandu-1.903032: O Liberal (despedida): presidió de 2020 a 2024 y terminó el 31/12/2024. Elegido en 2020 (venció a Luiz Omar Pinheiro; el 03/12/2020 según la tanda anterior), reelecto el 07/12/2022 para 2023-24 (DOL). Ninguna fuente da el día de posse (Sindiclubes PA: ceremonia 26/01/2021); 2021-01-01 = inicio del mandato bienal, convención. confirmada=false. Hasta 2025-01-01 = día en que asumió Aguilera.
SIN CONFIRMAR, no cargada: Márcio Tuma (2025-12-22 a hoy), https://diariodopara.com.br/bola/paysandu-saiba-quem-assume-a-presidencia-apos-saida-de-aguilera/: Vice-presidente, asumió en ejercicio ("de imediato") al renunciar Aguilera el lunes 22/12/2025 (Diário do Pará, 22/12/2025); la nota no dice la fecha explícita, es la de la renuncia. confirmada=false por eso (la tanda anterior la había cargado con Estado do Pará Online).
Duda: Cierre 2025: Aguilera presidió casi todo el año; Tuma asumió el 22/12/2025 (posible firmo).
Duda: Posse de Ettinger 2021: sin día en las fuentes; O Liberal dice "2020".
```

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-14-2/resultado-6.json, tools/gestiones-tanda.mjs, 2026-10-15):_

```text
Carlos Maurício Carpes Ettinger (2021-01-02 a 2025-01-01): Electo el 2020-12-03 para 2021-2022 y reelecto para 2023-2024. La fuente (sitio oficial del club, nota del 2021-01-18) dice que la posse formal fue el 2 de enero de 2021 (toma efectiva del mando el 17 y segunda posse estatutaria el 26 de enero); desde=2021-01-02. El hasta=2025-01-01 no está en esa misma página: viene de O Liberal (2025-01-05, https://www.oliberal.com/esportes/futebol/e-hora-de-sair-de-cena-mauricio-ettinger-avalia-gestao-e-se-despede-do-paysandu-1.903032), que dice que su segundo mandato terminó el 31 de diciembre de 2024 y que Roger Aguilera asumió el 1 de enero de 2025; es la convención de los otros clubes de Brasil (hasta = fecha de asunción del sucesor). Wikipedia pt solo da años (2021-2025), por eso no se usó. Documentos: balanco-2021.md:43-44 (y notas-explicativas-2021.md:850) firma Ettinger como Presidente; balanco-2023.md:41 y dre-2023.md:57-59 igual (la firma digital de dre-2023.md:55 tiene un sello de fecha 2022.11.28 que no cuadra con un balance 2023, probablemente un metadato heredado de otro documento); balanco-2024.md:38-40 y dre-2024.md:58-60 firma como 'Representante Legal'. relatorio-administrativo-2025.md:70-72 confirma que Aguilera fue electo en 2024 y que luego renunció (Tuma asumió), consistente con que Ettinger cerró 2024.
Duda: El balance 2024 (cierre 2024-12-31) lo firma Ettinger sin fecha legible; si se aprobó en 2025 ya estaba Aguilera en la presidencia, pero la firma es de Ettinger como representante legal. No hay campo 'firmo' pedido: se deja como aviso.
Duda: La fuente de desde (sitio del club) no menciona la fecha de salida; esa sale de O Liberal. Si Guido exige una sola URL que diga ambas fechas, no la encontré (Wikipedia solo da años).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### paysandu-br-dre-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Paysandu/dre-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paysandu-br-dre-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Paysandu/dre-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paysandu-br-dre-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Paysandu/dre-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paysandu-br-dre-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Paysandu/dre-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
