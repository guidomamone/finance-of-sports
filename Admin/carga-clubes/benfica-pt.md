# benfica-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/benfica-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Benfica: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Benfica/relatorio-contas-2018-19.pdf. brandColor #E83030
(procedencia en Admin/sourcing/Portugal/Benfica.md; tools/cargar-lote.mjs).
```

```text
data/pt/benfica-pt-data.js — Sport Lisboa e Benfica – Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Benfica/relatorio-contas-2018-19.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "benfica-pt" — slug de "Benfica" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Sport Lisboa e Benfica – Futebol, SAD" — respuesta de Guido en la cola (b56b255)
  displayName        ok        "Benfica" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — el documento más reciente del club (relatorio-contas-2025-26.md, cierre mes 6): el cierre CAMBIÓ en el tiempo (mes 6: 2010,2012,2013,2014,2015,2016,20
  sport              ok        "futbol" — el .md nombra el fútbol 141 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2019-06-30" — año del ejercicio + mes de cierre (contenido del .md (155 de 178 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y 
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fx                 pendiente null — el .md menciona tipo de cambio y dólar con números en 1 línea(s), pero ninguno es una cotización plausible
  fxRef              ok        "EUR@2019-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2019-06-30 = 0.878735 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
  sourceId           ok        "benfica-pt-relatorio-contas-2018-19" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2018–19 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica"

FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2019: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2019-06-30","sourceId":"benfica-pt-relatorio-contas-2018-19"}
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Benfica/relatorio-contas-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prémios da UEFA | pág. 140, Jev 0.98 |
| 2 | Receitas de televisão | pág. 140, Jev 1 |
| 3 | Outras receitas | pág. 140, Jev 0.96 |
| 4 | Patrocinadores | pág. 140, Jev 1 |
| 5 | Rendas de espaço | pág. 140, precedente |
| 6 | Royalties | pág. 140, Jev 0.99 |
| 7 | Outras receitas | pág. 140, Jev 0.96 |
| 8 | Corporate | pág. 140, precedente |
| 9 | Bilhetes de época | pág. 140, Jev 1 |
| 10 | Competições nacionais | pág. 140, precedente |
| 11 | Competições europeias | pág. 140, Jev 0.99 |
| 12 | Ganhos com alienações de direitos de atletas (mais-valias) | pág. 145, Jev 1 |
| 13 | Outros rendimentos | pág. 145, precedente |
| 14 | Resultado relativo a investimentos em participadas | pág. 90, Jev 0.95 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 141, Jev 1 |
| 2 | Deslocações e estadas | pág. 141, Jev 1 |
| 3 | Licença marca Benfica | pág. 141, Jev 0.98 |
| 4 | Conservação e reparação | pág. 141, Jev 0.99 |
| 5 | Serviços de catering/softdrink | pág. 141, Jev 0.96 |
| 6 | Rendas e aluguéis | pág. 141, Jev 0.93 |
| 7 | Equipamento desportivo | pág. 141, Jev 1 |
| 8 | Subcontratos | pág. 141, Jev 0.98 |
| 9 | Vigilância e segurança | pág. 141, Jev 0.96 |
| 10 | Honorários | pág. 141, Jev 0.99 |
| 11 | Outros fornecimentos e serviços | pág. 141, precedente |
| 12 | Remunerações fixas | pág. 142, Claude 0.8 |
| 13 | Remunerações variáveis | pág. 142, Jev 0.96 |
| 14 | Remunerações fixas | pág. 142, Claude 0.8 |
| 15 | Remunerações variáveis | pág. 142, Jev 0.96 |
| 16 | Indemnizações | pág. 142, precedente |
| 17 | Benefícios pós-emprego | pág. 142, precedente |
| 18 | Encargos sobre remunerações | pág. 142, precedente |
| 19 | Seguros de acidentes de trabalho | pág. 142, Jev 0.9 |
| 20 | Outros gastos com pessoal | pág. 142, precedente |
| 21 | Edifícios e outras construções | pág. 144, Jev 1 |
| 22 | Equipamento básico | pág. 144, Jev 0.99 |
| 23 | Equipamento de transporte | pág. 144, Jev 0.99 |
| 24 | Equipamento administrativo | pág. 144, Claude 0.9 |
| 25 | Outros ativos tangíveis | pág. 144, Jev 0.97 |
| 26 | Direito de utilização da marca | pág. 144, Claude 0.8 |
| 27 | Programas de computador | pág. 144, Claude 0.85 |
| 28 | Direitos de televisão | pág. 144, Claude 0.8 |
| 29 | Calena comercial | pág. 144, precedente |
| 30 | Provisões/Imparidades ^{2)} | pág. 90, precedente |
| 31 | Outros gastos e perdas operacionais ^{3)} | pág. 90, Jev 0.99 |
| 32 | Perdas com alienações de direitos de atletas (menos-valias) | pág. 145, precedente |
| 33 | Gastos associados a alienações de direitos de atletas (comissões) | pág. 145, Jev 0.97 |
| 34 | Abates de direitos de atletas | pág. 145, Jev 0.99 |
| 35 | Outros gastos | pág. 145, Jev 0.99 |
| 36 | Amortizações de direitos de atletas | pág. 148, Jev 0.99 |
| 37 | Perdas de imparidade | pág. 148, Jev 0.9 |
| 38 | Reversões de imparidade | pág. 148, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2018–19 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## Fuentes

### benfica-pt-relatorio-contas-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
