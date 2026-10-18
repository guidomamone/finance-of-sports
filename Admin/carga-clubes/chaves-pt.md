# chaves-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/chaves-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Chaves: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Chaves/RC-2022-2023-com.pdf. brandColor #191970
(procedencia en Admin/sourcing/Portugal/Chaves.md; tools/cargar-lote.mjs).
```

```text
data/pt/chaves-pt-data.js — Grupo Desportivo de Chaves - Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Chaves/RC-2022-2023-com.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "chaves-pt" — slug de "Chaves" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Grupo Desportivo de Chaves - Futebol, SAD" — respuesta de Guido en la cola (9f44a00)
  displayName        ok        "Chaves" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (100 de 102 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 68 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2023-06-30" — año del ejercicio + mes de cierre (contenido del .md (100 de 102 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2023-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2023-06-30 = 0.9203 (Cierre BCE al 30/6/2023 (1 EUR = 1,0866 USD))
  sourceId           ok        "chaves-pt-rc-2022-2023-com" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Chaves"

FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2023: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2023-06-30","sourceId":"chaves-pt-rc-2022-2023-com"}
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Chaves/RC-2022-2023-com.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Chaves/RC-2022-2023-com.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de bens | pág. 29, precedente |
| 2 | Publicidade | pág. 29, Jev 1 |
| 3 | Bilhetes Jogos | pág. 29, Jev 1 |
| 4 | Cessao direitos televisivos | pág. 29, Jev 1 |
| 5 | Gold Pass/Cativos/Camarotes | pág. 29, precedente |
| 6 | UEFA | pág. 29, precedente |
| 7 | Inst. Apoio às PME | pág. 29, Jev 0.97 |
| 8 | Jogos Placard | pág. 39, Claude 0.8 |
| 9 | Distribuição de lucros dos jogos e apostas on-line | pág. 39, Jev 0.99 |
| 10 | Premios de Participação Taça Liga Allianz Cup | pág. 39, Jev 1 |
| 11 | Premios Taça de Portugal | pág. 39, Jev 1 |
| 12 | Subsídio de deslocação Taça de Portugal | pág. 39, Jev 0.96 |
| 13 | Quotas Grupo Desportivo de Chaves | pág. 39, Jev 1 |
| 14 | Mecanismo de Solidariedade Matheus Pereira | pág. 39, Jev 0.96 |
| 15 | Transferências | pág. 39, Jev 0.99 |
| 16 | Fundo de Apoio Desenvolvimento Infrastruras Tecnológicas | pág. 39, Jev 1 |
| 17 | Premio Liga Portugal | pág. 39, Jev 0.98 |
| 18 | Cedência Direitos Económicos | pág. 39, Jev 0.98 |
| 19 | Descontos de Pronto Pagamento Obtidos | pág. 39, Jev 1 |
| 20 | Diferenças de Câmbio Favoráveis | pág. 39, precedente |
| 21 | Indeminização de Seguros | pág. 39, Jev 1 |
| 22 | Indeminização de Vencimentos | pág. 39, Jev 0.92 |
| 23 | Outros | pág. 39, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 10, Jev 0.98 |
| 2 | Trabalhos Especializados | pág. 38, Jev 0.99 |
| 3 | Publicidade e Propaganda | pág. 38, Jev 1 |
| 4 | Vigilância e Segurança | pág. 38, Jev 0.98 |
| 5 | Honorários | pág. 38, Jev 1 |
| 6 | Conservação e Reparação | pág. 38, Jev 0.98 |
| 7 | Serviços Bancários | pág. 38, Jev 0.98 |
| 8 | Materiais | pág. 38, Jev 0.9 |
| 9 | Energia e Fluidos | pág. 38, Jev 1 |
| 10 | Deslocações e Estadas | pág. 38, Jev 1 |
| 11 | Serviços Diversos | pág. 38, Jev 0.92 |
| 12 | Gastos com o pessoal | pág. 10, Claude 0.8 |
| 13 | Impostos Indiretos | pág. 40, Jev 1 |
| 14 | Taxas | pág. 40, Claude 0.85 |
| 15 | Correcções relativas a ex. anterior | pág. 40, Jev 1 |
| 16 | Quotização | pág. 40, ? 0.6 |
| 17 | Insuficiencia estimativa imposto | pág. 40, Jev 0.9 |
| 18 | Multas e Penalidades | pág. 40, Jev 0.95 |
| 19 | Gastos/reversões de depreciação e de amortização | pág. 10, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Financiamentos obtidos" no corriente 957 302,22 + corriente 250 000,00; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Caixa e depósitos bancários" (la celda "13.4" es la nota)
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Chaves".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Chaves/RC-2021-2022_compressed-1.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Chaves/RC-2021-2022_compressed-1.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de bens | pág. 30, precedente |
| 2 | Publicidade | pág. 30, precedente |
| 3 | Bilhetes Jogos | pág. 30, precedente |
| 4 | Cessao direitos televisivos | pág. 30, precedente |
| 5 | Gold Pass/Cativos/Camarotes | pág. 30, precedente |
| 6 | UEFA | pág. 31, precedente |
| 7 | Inst. Apoio às PMI | pág. 31, precedente |
| 8 | Jogos Placard | pág. 43, precedente |
| 9 | Distribuição de lucros dos jogos e apostas on-line | pág. 43, precedente |
| 10 | Premios de Participação Taça Liga | pág. 43, Jev 1 |
| 11 | Premios Taça de Portugal | pág. 43, precedente |
| 12 | Subsídio de deslocação | pág. 43, Jev 0.98 |
| 13 | Mecanismo de apoio à descida | pág. 43, Jev 0.97 |
| 14 | Mecanismo Solidariedade | pág. 43, Jev 0.91 |
| 15 | Transferências | pág. 43, precedente |
| 16 | Fundo de Apoio Tesousararia | pág. 43, Jev 1 |
| 17 | Apoio à Contratação de ARDs | pág. 43, Jev 1 |
| 18 | Descontos de Pronto Pagamento | pág. 43, Jev 1 |
| 19 | Correções relativas a periodos anteriores | pág. 43, Jev 1 |
| 20 | Insc. P. Equipas | pág. 43, ? 0.6 |
| 21 | Quotas Grupo Desportivo de Chaves | pág. 43, precedente |
| 22 | Outros | pág. 43, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 12, precedente |
| 2 | Trabalhos Especializados | pág. 42, precedente |
| 3 | Publicidade e Propaganda | pág. 42, precedente |
| 4 | Vigilância e Segurança | pág. 42, precedente |
| 5 | Honorários | pág. 42, precedente |
| 6 | Conservação e Reparação | pág. 42, precedente |
| 7 | Serviços Bancários | pág. 42, precedente |
| 8 | Materiais | pág. 42, precedente |
| 9 | Energia e Fluidos | pág. 42, precedente |
| 10 | Deslocações e Estadas | pág. 42, precedente |
| 11 | Serviços Diversos | pág. 42, precedente |
| 12 | Gastos com o pessoal | pág. 12, precedente |
| 13 | Outras imparidades | pág. 12, precedente |
| 14 | Impostos Indiretos | pág. 44, precedente |
| 15 | Taxas | pág. 44, precedente |
| 16 | Abates de Ativos Intangíveis | pág. 44, Jev 0.95 |
| 17 | Correcções relativas a ex. anterior | pág. 44, precedente |
| 18 | Quotização | pág. 44, precedente |
| 19 | Insuficiencia estimativa imposto | pág. 44, precedente |
| 20 | Diferença de Câmbio Desfavorável | pág. 44, Jev 0.91 |
| 21 | Multas e Penalidades | pág. 44, precedente |
| 22 | Outros | pág. 44, precedente |
| 23 | Gastos/reversões de depreciação e de amortização | pág. 12, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Financiamentos obtidos" no corriente (no hay corriente); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Caixa e depósitos bancários" (la celda "13,4" es la nota); el documento 2022-23 lo repite
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2021–22 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Chaves".
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-17/resultado-15.json, tools/gestiones-tanda.mjs, 2026-10-17):_

```text
Francisco José Gomes de Carvalho (2013-01-01 a 2025-09-14): Record (14/9/2025): lidera la SAD 'desde 2013' (solo el año: día 01) y el domingo 14/9/2025 cumple su último partido (494.º) como presidente, fecha usada como hasta; la venta de la SAD al grupo mexicano Orlegi se confirmó el martes 16/9/2025 (sapo.pt, 17/9/2025) y la fecha formal del relevo no figura. Los dos relatórios (cierres 2022 y 2023) lo listan como Presidente del Conselho de Administração: Clubes/Portugal/Chaves/RC-2021-2022_compressed-1.md:141 (firma la mensagem do presidente, línea ~104, informe fechado el 31/10/2022 en la línea ~409) y Clubes/Portugal/Chaves/RC-2022-2023-com.md:80 (informe fechado el 31/10/2023, línea ~1720). Sin cambio de gestión entre cierre y aprobación.
Duda: El mes y día exactos de asunción en 2013 no figuran en las fuentes halladas (solo 'desde 2013'). El hasta (14/9/2025) es la fecha de su último partido, no la del traspaso formal; no afecta a los cierres cargados.
```

## Fuentes

### chaves-pt-rc-2022-2023-com

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Chaves/RC-2022-2023-com.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### chaves-pt-rc-2021-2022-compressed-1

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Chaves/RC-2021-2022_compressed-1.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
