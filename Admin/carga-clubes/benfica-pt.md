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

## 2026

### Ingresos

```text
2026: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2025-26.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2025-26.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prémios da UEFA | pág. 97, precedente |
| 2 | Receitas de televisão | pág. 97, precedente |
| 3 | Outras receitas | pág. 97, precedente |
| 4 | Patrocinadores | pág. 97, precedente |
| 5 | Rendas de espaço | pág. 97, precedente |
| 6 | Royalties | pág. 97, precedente |
| 7 | Outras receitas | pág. 97, precedente |
| 8 | Corporate | pág. 97, precedente |
| 9 | Bilhetes de época | pág. 97, precedente |
| 10 | Competições nacionais | pág. 97, precedente |
| 11 | Competições europeias | pág. 97, precedente |
| 12 | Outras receitas | pág. 97, precedente |
| 13 | Ganhos com alienações de direitos de atletas (mais-valias) | pág. 99, precedente |
| 14 | Outros rendimentos com transações de direitos de atletas | pág. 99, Claude 0.85 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gestão operacional do estádio | pág. 97, precedente |
| 2 | Gestão operacional do canal BTV | pág. 97, precedente |
| 3 | Trabalhos especializados | pág. 97, precedente |
| 4 | Deslocações e estadas | pág. 97, precedente |
| 5 | Vigilância e segurança | pág. 97, precedente |
| 6 | Honorários | pág. 97, precedente |
| 7 | Rendas e alugueres | pág. 97, Jev 0.96 |
| 8 | Limpeza, higiene e conforto | pág. 97, Jev 1 |
| 9 | Associações, Federações e Liga | pág. 97, Jev 0.97 |
| 10 | Conservação e reparação | pág. 97, precedente |
| 11 | Publicidade e propaganda | pág. 97, Jev 1 |
| 12 | Equipamento desportivo | pág. 97, precedente |
| 13 | Eletricidade | pág. 97, Jev 1 |
| 14 | Despesas médicas | pág. 97, precedente |
| 15 | Outros fornecimentos e serviços | pág. 97, precedente |
| 16 | Royalties marca Benfica | pág. 78, Claude 0.85 |
| 17 | Remunerações fixas | pág. 98, precedente |
| 18 | Remunerações variáveis | pág. 98, precedente |
| 19 | Remunerações fixas | pág. 98, precedente |
| 20 | Remunerações variáveis | pág. 98, precedente |
| 21 | Indemnizações | pág. 98, precedente |
| 22 | Benefícios pós-emprego | pág. 98, precedente |
| 23 | Encargos sobre remunerações | pág. 98, precedente |
| 24 | Seguros de acidentes de trabalho | pág. 98, precedente |
| 25 | Redébitos de/a partes relacionadas | pág. 98, precedente |
| 26 | Outros gastos com pessoal | pág. 98, precedente |
| 27 | Edifícios e outras construções | pág. 99, precedente |
| 28 | Equipamento básico | pág. 99, precedente |
| 29 | Equipamento administrativo | pág. 99, precedente |
| 30 | Direitos de uso | pág. 99, precedente |
| 31 | Direito de utilização da marca | pág. 99, precedente |
| 32 | Programas de computador | pág. 99, precedente |
| 33 | Direito de exploração futebol feminino | pág. 99, precedente |
| 34 | Provisões/Imparidades | pág. 78, precedente |
| 35 | Outros gastos e perdas operacionais | pág. 78, Jev 0.99 |
| 36 | Perdas com alienações de direitos de atletas (menos-valias) | pág. 99, precedente |
| 37 | Gastos associados a alienações de direitos de atletas (comissões) | pág. 99, precedente |
| 38 | Abates de direitos de atletas | pág. 99, precedente |
| 39 | Outros gastos com transações de direitos de atletas | pág. 99, precedente |
| 40 | Amortizações de direitos de atletas | pág. 101, precedente |
| 41 | Perdas de imparidade de direitos de atletas | pág. 101, Jev 1 |

### Meta

```text
2026: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): perimetro = individual. regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y Boavista, 2026-10-15), punto 1: el ejercicio se publicó con un solo perímetro (individual; desde 2019-20 la SAD ya no controla Benfica Estádio ni Benfica TV, vendidas a la SGPS)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2025–26 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2024-25-pos-AG.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2024-25-pos-AG.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prémios da UEFA | pág. 157, precedente |
| 2 | Receitas de televisão | pág. 157, precedente |
| 3 | Outras receitas | pág. 157, precedente |
| 4 | Patrocinadores | pág. 157, precedente |
| 5 | Rendas de espaço | pág. 157, precedente |
| 6 | Royalties | pág. 157, precedente |
| 7 | Outras receitas^{1)} | pág. 157, Jev 0.92 |
| 8 | Corporate | pág. 157, precedente |
| 9 | Bilhetes de época | pág. 157, precedente |
| 10 | Competições nacionais | pág. 157, precedente |
| 11 | Competições europeias | pág. 157, precedente |
| 12 | Outras receitas | pág. 157, precedente |
| 13 | Ganhos com alienações de direitos de atletas (mais-valias) | pág. 161, precedente |
| 14 | Outros rendimentos com transações de direitos de atletas | pág. 161, Claude 0.85 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gestão operacional do estádio | pág. 158, precedente |
| 2 | Gestão operacional do canal BTV | pág. 158, precedente |
| 3 | Trabalhos especializados^{1)} | pág. 158, Jev 0.99 |
| 4 | Deslocações e estadas | pág. 158, precedente |
| 5 | Vigilância e segurança | pág. 158, precedente |
| 6 | Comissões | pág. 158, precedente |
| 7 | Honorários | pág. 158, precedente |
| 8 | Rendas e alugueres | pág. 158, Jev 0.96 |
| 9 | Limpeza, higiene e conforto | pág. 158, Jev 1 |
| 10 | Conservação e reparação | pág. 158, precedente |
| 11 | Associações, Federações e Liga | pág. 158, Jev 0.97 |
| 12 | Outros fornecimentos e serviços | pág. 158, precedente |
| 13 | Royalties marca Benfica | pág. 118, Claude 0.85 |
| 14 | Remunerações fixas | pág. 159, precedente |
| 15 | Remunerações variáveis | pág. 159, precedente |
| 16 | Remunerações fixas | pág. 159, precedente |
| 17 | Remunerações variáveis | pág. 159, precedente |
| 18 | Indemnizações | pág. 159, precedente |
| 19 | Benefícios pós-emprego | pág. 159, precedente |
| 20 | Encargos sobre remunerações | pág. 159, precedente |
| 21 | Seguros de acidentes de trabalho | pág. 159, precedente |
| 22 | Redébitos de/a partes relacionadas ^{1)} | pág. 159, precedente |
| 23 | Outros gastos com pessoal | pág. 159, precedente |
| 24 | Edifícios e outras construções | pág. 160, precedente |
| 25 | Equipamento básico | pág. 160, precedente |
| 26 | Equipamento de transporte | pág. 160, precedente |
| 27 | Equipamento administrativo | pág. 160, precedente |
| 28 | Direitos de uso | pág. 160, precedente |
| 29 | Direito de utilização da marca | pág. 160, precedente |
| 30 | Direito de exploração futebol feminino | pág. 160, precedente |
| 31 | Programas de computador | pág. 160, precedente |
| 32 | Provisões/Imparidades | pág. 118, Claude 0.9 |
| 33 | Outros gastos e perdas operacionais | pág. 118, Jev 1 |
| 34 | Perdas com alienações de direitos de atletas (menos-valias) | pág. 161, precedente |
| 35 | Gastos associados a alienações de direitos de atletas (comissões) | pág. 161, precedente |
| 36 | Abates de direitos de atletas | pág. 161, precedente |
| 37 | Outros gastos com transações de direitos de atletas | pág. 161, precedente |
| 38 | Amortizações de direitos de atletas | pág. 165, precedente |
| 39 | Perdas de imparidade de direitos de atletas | pág. 165, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): perimetro = individual. regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y Boavista, 2026-10-15), punto 1: el ejercicio se publicó con un solo perímetro (individual; desde 2019-20 la SAD ya no controla Benfica Estádio ni Benfica TV, vendidas a la SGPS)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas de televisão | pág. 150, precedente |
| 2 | Prémios da UEFA | pág. 150, precedente |
| 3 | Outras receitas | pág. 150, precedente |
| 4 | Patrocinadores | pág. 150, precedente |
| 5 | Rendas de espaço | pág. 150, precedente |
| 6 | Royalties | pág. 150, precedente |
| 7 | Outras receitas | pág. 150, precedente |
| 8 | Corporate | pág. 150, precedente |
| 9 | Bilhetes de época | pág. 150, precedente |
| 10 | Competições nacionais | pág. 150, precedente |
| 11 | Competições europeias | pág. 150, precedente |
| 12 | Outras receitas | pág. 150, precedente |
| 13 | Ganhos com alienações de direitos de atletas (mais-valias) | pág. 154, precedente |
| 14 | Outros rendimentos com transações de direitos de atletas | pág. 154, Claude 0.85 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gestão operacional do estádio | pág. 151, precedente |
| 2 | Trabalhos especializados | pág. 151, precedente |
| 3 | Gestão operacional do canal BTV | pág. 151, precedente |
| 4 | Licença da marca Benfica | pág. 151, Jev 0.97 |
| 5 | Deslocações e estadas | pág. 151, precedente |
| 6 | Vigilância e segurança | pág. 151, precedente |
| 7 | Comissões | pág. 151, precedente |
| 8 | Equipamento desportivo | pág. 151, precedente |
| 9 | Honorários | pág. 151, precedente |
| 10 | Limpeza, higiene e conforto | pág. 151, Jev 1 |
| 11 | Publicidade e propaganda | pág. 151, Jev 1 |
| 12 | Rendas e alugueres | pág. 151, Jev 0.96 |
| 13 | Conservação e reparação | pág. 151, precedente |
| 14 | Associações, Federações e Liga | pág. 151, Jev 0.97 |
| 15 | Outros fornecimentos e serviços | pág. 151, precedente |
| 16 | Remunerações fixas | pág. 152, precedente |
| 17 | Remunerações variáveis | pág. 152, precedente |
| 18 | Remunerações fixas | pág. 152, precedente |
| 19 | Remunerações variáveis | pág. 152, precedente |
| 20 | Indemnizações | pág. 152, precedente |
| 21 | Benefícios pós-emprego | pág. 152, precedente |
| 22 | Encargos sobre remunerações | pág. 152, precedente |
| 23 | Seguros de acidentes de trabalho | pág. 152, precedente |
| 24 | Outros gastos com pessoal | pág. 152, precedente |
| 25 | Edifícios e outras construções | pág. 153, precedente |
| 26 | Equipamento básico | pág. 153, precedente |
| 27 | Equipamento de transporte | pág. 153, precedente |
| 28 | Equipamento administrativo | pág. 153, precedente |
| 29 | Direitos de uso | pág. 153, precedente |
| 30 | Direito de utilização da marca | pág. 153, precedente |
| 31 | Programas de computador | pág. 153, precedente |
| 32 | Provisões/Imparidades | pág. 112, Jev 0.98 |
| 33 | Outros gastos e perdas operacionais | pág. 112, Jev 0.99 |
| 34 | Perdas com alienações de direitos de atletas (menos-valias) | pág. 154, precedente |
| 35 | Gastos associados a alienações de direitos de atletas (comissões) | pág. 154, precedente |
| 36 | Abates de direitos de atletas | pág. 154, precedente |
| 37 | Outros gastos com transações de direitos de atletas | pág. 154, precedente |
| 38 | Amortizações de direitos de atletas | pág. 158, precedente |
| 39 | Perdas de imparidade de direitos de atletas | pág. 158, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): perimetro = individual. regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y Boavista, 2026-10-15), punto 1: el ejercicio se publicó con un solo perímetro (individual; desde 2019-20 la SAD ya no controla Benfica Estádio ni Benfica TV, vendidas a la SGPS)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fx = 0.9341. el documento da 1 EUR = 1,0705 USD al 30/06/2024 (primera columna, cierre BCE del 28/06/2024; el encabezado de la tabla dice 30.06.25 por error en la segunda columna, que es 30/06/2023 = 1,0866); EUR por 1 USD = 1/1,0705 = 0,9341
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2022-23-pos-AG.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2022-23-pos-AG.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prémios da UEFA | pág. 144, precedente |
| 2 | Receitas de televisão | pág. 144, precedente |
| 3 | Outras receitas | pág. 144, precedente |
| 4 | Patrocinadores | pág. 144, precedente |
| 5 | Rendas de espaço | pág. 144, precedente |
| 6 | Royalties | pág. 144, precedente |
| 7 | Outras receitas | pág. 144, precedente |
| 8 | Corporate | pág. 144, precedente |
| 9 | Bilhetes de época | pág. 144, precedente |
| 10 | Competições europeias | pág. 144, precedente |
| 11 | Competições nacionais | pág. 144, precedente |
| 12 | Outras receitas | pág. 144, precedente |
| 13 | Ganhos com alienações de direitos de atletas (mais-valias) | pág. 148, precedente |
| 14 | Outros rendimentos | pág. 148, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gestão operacional do estádio | pág. 145, precedente |
| 2 | Trabalhos especializados | pág. 145, precedente |
| 3 | Licença da marca Benfica | pág. 145, Jev 0.97 |
| 4 | Gestão operacional do canal BTV | pág. 145, precedente |
| 5 | Deslocações e estadas | pág. 145, precedente |
| 6 | Vigilância e segurança | pág. 145, precedente |
| 7 | Equipamento desportivo | pág. 145, precedente |
| 8 | Comissões | pág. 145, precedente |
| 9 | Honorários | pág. 145, precedente |
| 10 | Publicidade e propaganda | pág. 145, Jev 1 |
| 11 | Outros fornecimentos e serviços | pág. 145, precedente |
| 12 | Remunerações fixas | pág. 146, precedente |
| 13 | Remunerações variáveis | pág. 146, precedente |
| 14 | Remunerações fixas | pág. 146, precedente |
| 15 | Remunerações variáveis | pág. 146, precedente |
| 16 | Indemnizações | pág. 146, precedente |
| 17 | Benefícios pós-emprego | pág. 146, precedente |
| 18 | Encargos sobre remunerações | pág. 146, precedente |
| 19 | Seguros de acidentes de trabalho | pág. 146, precedente |
| 20 | Outros gastos com pessoal | pág. 146, precedente |
| 21 | Edifícios e outras construções | pág. 147, precedente |
| 22 | Equipamento básico | pág. 147, precedente |
| 23 | Equipamento de transporte | pág. 147, precedente |
| 24 | Equipamento administrativo | pág. 147, precedente |
| 25 | Direitos de uso | pág. 147, precedente |
| 26 | Direito de utilização da marca | pág. 147, precedente |
| 27 | Programas de computador | pág. 147, precedente |
| 28 | Provisões/Imparidades | pág. 110, Jev 0.98 |
| 29 | Outros gastos e perdas operacionais | pág. 110, Jev 0.99 |
| 30 | Perdas com alienações de direitos de atletas (menos-valias) | pág. 148, precedente |
| 31 | Gastos associados a alienações de direitos de atletas (comissões) | pág. 148, precedente |
| 32 | Abates de direitos de atletas | pág. 148, precedente |
| 33 | Outros gastos | pág. 148, precedente |
| 34 | Amortizações de direitos de atletas | pág. 152, precedente |
| 35 | Perdas de imparidade de direitos de atletas | pág. 152, Jev 1 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): perimetro = individual. regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y Boavista, 2026-10-15), punto 1: el ejercicio se publicó con un solo perímetro (individual; desde 2019-20 la SAD ya no controla Benfica Estádio ni Benfica TV, vendidas a la SGPS)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fx = 0.9203. el documento da 1 EUR = 1,0866 USD al 30/06/2023 (primera columna; 1,0387 es el año anterior); EUR por 1 USD = 0,9203, igual que AC Milan 2022-23
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prémios da UEFA | pág. 150, precedente |
| 2 | Receitas de televisão | pág. 150, precedente |
| 3 | Outras receitas | pág. 150, precedente |
| 4 | Patrocinadores | pág. 150, precedente |
| 5 | Rendas de espaço | pág. 150, precedente |
| 6 | Royalties | pág. 150, precedente |
| 7 | Outras receitas | pág. 150, precedente |
| 8 | Corporate | pág. 150, precedente |
| 9 | Bilhetes de época | pág. 150, precedente |
| 10 | Competições europeias | pág. 150, precedente |
| 11 | Competições nacionais | pág. 150, precedente |
| 12 | Outras receitas | pág. 150, precedente |
| 13 | Ganhos com alienações de direitos de atletas (mais-valias) | pág. 154, precedente |
| 14 | Outros rendimentos | pág. 154, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gestão operacional do estádio | pág. 151, precedente |
| 2 | Trabalhos especializados | pág. 151, precedente |
| 3 | Gestão operacional do canal BTV | pág. 151, precedente |
| 4 | Licença marca Benfica | pág. 151, precedente |
| 5 | Deslocações e estadas | pág. 151, precedente |
| 6 | Vigilância e segurança | pág. 151, precedente |
| 7 | Equipamento desportivo | pág. 151, precedente |
| 8 | Honorários | pág. 151, precedente |
| 9 | Comissões | pág. 151, precedente |
| 10 | Eletricidade | pág. 151, Jev 1 |
| 11 | Publicidade e propaganda | pág. 151, Jev 1 |
| 12 | Outros fornecimentos e serviços | pág. 151, precedente |
| 13 | Remunerações fixas | pág. 152, precedente |
| 14 | Remunerações variáveis | pág. 152, precedente |
| 15 | Remunerações fixas | pág. 152, precedente |
| 16 | Remunerações variáveis | pág. 152, precedente |
| 17 | Indemnizações | pág. 152, precedente |
| 18 | Benefícios pós-emprego | pág. 152, precedente |
| 19 | Encargos sobre remunerações | pág. 152, precedente |
| 20 | Seguros de acidentes de trabalho | pág. 152, precedente |
| 21 | Outros gastos com pessoal | pág. 152, precedente |
| 22 | Edifícios e outras construções | pág. 153, precedente |
| 23 | Equipamento básico | pág. 153, precedente |
| 24 | Equipamento de transporte | pág. 153, precedente |
| 25 | Equipamento administrativo | pág. 153, precedente |
| 26 | Direitos de uso | pág. 153, precedente |
| 27 | Direito de utilização da marca | pág. 153, precedente |
| 28 | Programas de computador | pág. 153, precedente |
| 29 | Provisões/Imparidades ^{(2)} | pág. 114, Claude 0.93 |
| 30 | Outros gastos e perdas operacionais ^{(3)} | pág. 114, Jev 1 |
| 31 | Perdas com alienações de direitos de atletas (menos-valias) | pág. 154, precedente |
| 32 | Gastos associados a alienações de direitos de atletas (comissões) | pág. 154, precedente |
| 33 | Abates de direitos de atletas | pág. 154, precedente |
| 34 | Outros gastos | pág. 154, precedente |
| 35 | Amortizações de direitos de atletas | pág. 157, precedente |
| 36 | Reforços de imparidade | pág. 157, Jev 0.91 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): perimetro = individual. regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y Boavista, 2026-10-15), punto 1: el ejercicio se publicó con un solo perímetro (individual; desde 2019-20 la SAD ya no controla Benfica Estádio ni Benfica TV, vendidas a la SGPS)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fx = 0.9627. el documento da 1 EUR = 1,0387 USD al 30/06/2022 (cierre BCE); el sitio guarda EUR por 1 USD = 1/1,0387 = 0,9627, igual que AC Milan 2021-22
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas de televisão | pág. 132, precedente |
| 2 | Prémios da UEFA | pág. 132, precedente |
| 3 | Outras receitas | pág. 132, precedente |
| 4 | Patrocinadores | pág. 132, precedente |
| 5 | Rendas de espaço | pág. 132, precedente |
| 6 | Royalties | pág. 132, precedente |
| 7 | Outras receitas | pág. 132, precedente |
| 8 | Corporate | pág. 132, precedente |
| 9 | Competições nacionais | pág. 132, precedente |
| 10 | Competições europeias | pág. 132, precedente |
| 11 | Outras receitas | pág. 132, precedente |
| 12 | Ganhos com alienações de direitos de atletas (mais-valias) | pág. 136, precedente |
| 13 | Outros rendimentos | pág. 136, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gestão operacional do estádio | pág. 133, precedente |
| 2 | Trabalhos especializados | pág. 133, precedente |
| 3 | Licença marca Benfica | pág. 133, precedente |
| 4 | Gestão operacional do canal BTV | pág. 133, precedente |
| 5 | Deslocações e estadas | pág. 133, precedente |
| 6 | Equipamento desportivo | pág. 133, precedente |
| 7 | Honorários | pág. 133, precedente |
| 8 | Vigilância e segurança | pág. 133, precedente |
| 9 | Outros fornecimentos e serviços | pág. 133, precedente |
| 10 | Remunerações fixas | pág. 134, precedente |
| 11 | Remunerações variáveis | pág. 134, precedente |
| 12 | Remunerações fixas | pág. 134, precedente |
| 13 | Remunerações variáveis | pág. 134, precedente |
| 14 | Indemnizações | pág. 134, precedente |
| 15 | Benefícios pós-emprego | pág. 134, precedente |
| 16 | Encargos sobre remunerações | pág. 134, precedente |
| 17 | Seguros de acidentes de trabalho | pág. 134, precedente |
| 18 | Outros gastos com pessoal | pág. 134, precedente |
| 19 | Edifícios e outras construções | pág. 135, precedente |
| 20 | Equipamento básico | pág. 135, precedente |
| 21 | Equipamento de transporte | pág. 135, precedente |
| 22 | Equipamento administrativo | pág. 135, precedente |
| 23 | Outros ativos tangíveis | pág. 135, precedente |
| 24 | Direitos de uso | pág. 135, precedente |
| 25 | Direito de utilização da marca | pág. 135, precedente |
| 26 | Programas de computador | pág. 135, precedente |
| 27 | Provisões/Imparidades ^{(2)} | pág. 96, Claude 0.93 |
| 28 | Outros gastos e perdas operacionais ^{(3)} | pág. 96, Jev 1 |
| 29 | Perdas com alienações de direitos de atletas (menos-valias) | pág. 136, precedente |
| 30 | Gastos associados a alienações de direitos de atletas (comissões) | pág. 136, precedente |
| 31 | Abates de direitos de atletas | pág. 136, precedente |
| 32 | Outros gastos | pág. 136, precedente |
| 33 | Amortizações de direitos de atletas | pág. 139, precedente |
| 34 | Reforços de imparidade | pág. 139, Jev 0.91 |
| 35 | Reversões de imparidade | pág. 139, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): perimetro = individual. regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y Boavista, 2026-10-15), punto 1: el ejercicio se publicó con un solo perímetro (individual; desde 2019-20 la SAD ya no controla Benfica Estádio ni Benfica TV, vendidas a la SGPS)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2020–21 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2019-20-pos-AG.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2019-20-pos-AG.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prémios da UEFA | pág. 130, precedente |
| 2 | Receitas de televisão | pág. 130, precedente |
| 3 | Outras receitas | pág. 130, precedente |
| 4 | Patrocinadores | pág. 130, precedente |
| 5 | Rendas de espaço | pág. 130, precedente |
| 6 | Royalties | pág. 130, precedente |
| 7 | Outras receitas | pág. 130, precedente |
| 8 | Corporate | pág. 130, precedente |
| 9 | Bilhetes de época | pág. 130, precedente |
| 10 | Competições nacionais | pág. 130, precedente |
| 11 | Competições europeias | pág. 130, precedente |
| 12 | Outras receitas | pág. 130, precedente |
| 13 | Ganhos com alienações de direitos de atletas (mais-valias) | pág. 134, precedente |
| 14 | Outros rendimentos | pág. 134, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gestão operacional do estádio | pág. 131, precedente |
| 2 | Trabalhos especializados | pág. 131, precedente |
| 3 | Licença marca Benfica | pág. 131, precedente |
| 4 | Gestão operacional do canal BTV | pág. 131, precedente |
| 5 | Deslocações e estadas | pág. 131, precedente |
| 6 | Equipamento desportivo | pág. 131, precedente |
| 7 | Vigilância e segurança | pág. 131, precedente |
| 8 | Honorários | pág. 131, precedente |
| 9 | Publicidade e propaganda | pág. 131, precedente |
| 10 | Rendas e alugueres | pág. 131, precedente |
| 11 | Eletricidade | pág. 131, precedente |
| 12 | Outros fornecimentos e serviços | pág. 131, precedente |
| 13 | Remunerações fixas | pág. 132, precedente |
| 14 | Remunerações variáveis | pág. 132, precedente |
| 15 | Remunerações fixas | pág. 132, precedente |
| 16 | Remunerações variáveis | pág. 132, precedente |
| 17 | Indemnizações | pág. 132, precedente |
| 18 | Benefícios pós-emprego | pág. 132, precedente |
| 19 | Encargos sobre remunerações | pág. 132, precedente |
| 20 | Seguros de acidentes de trabalho | pág. 132, precedente |
| 21 | Outros gastos com pessoal | pág. 132, precedente |
| 22 | Edifícios e outras construções | pág. 133, precedente |
| 23 | Equipamento básico | pág. 133, precedente |
| 24 | Equipamento de transporte | pág. 133, precedente |
| 25 | Equipamento administrativo | pág. 133, precedente |
| 26 | Outros ativos tangíveis | pág. 133, precedente |
| 27 | Direitos de uso | pág. 133, precedente |
| 28 | Direito de utilização da marca | pág. 133, precedente |
| 29 | Programas de computador | pág. 133, precedente |
| 30 | Provisões/Imparidades^{15} | pág. 90, precedente |
| 31 | Outros gastos e perdas operacionais^{16} | pág. 90, precedente |
| 32 | Perdas com alienações de direitos de atletas (menos-valias) | pág. 134, precedente |
| 33 | Gastos associados a alienações de direitos de atletas (comissões) | pág. 134, precedente |
| 34 | Atletas de direitos de atletas | pág. 134, Jev 0.9 |
| 35 | Outros gastos | pág. 134, precedente |
| 36 | Amortizações de direitos de atletas | pág. 137, precedente |
| 37 | Reforços de imparidade | pág. 137, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): perimetro = individual. regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y Boavista, 2026-10-15), punto 1: el ejercicio se publicó con un solo perímetro (individual; desde 2019-20 la SAD ya no controla Benfica Estádio ni Benfica TV, vendidas a la SGPS)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2019–20 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
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

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2017-18.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas de televisão | pág. 132, precedente |
| 2 | Prémios da UEFA | pág. 132, precedente |
| 3 | Outras receitas | pág. 132, precedente |
| 4 | Parrocinadores | pág. 132, precedente |
| 5 | Rendas de espaço | pág. 132, precedente |
| 6 | Royalties | pág. 132, precedente |
| 7 | Outras receitas | pág. 132, precedente |
| 8 | Corporate | pág. 132, precedente |
| 9 | Bilhetes de época | pág. 132, precedente |
| 10 | Competições nacionais | pág. 132, precedente |
| 11 | Liga dos Campeões | pág. 132, Claude 0.8 |
| 12 | Ganhos com alienações de direitos de atletas | pág. 136, precedente |
| 13 | Outros rendimentos | pág. 136, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 133, precedente |
| 2 | Deslocações e estadas | pág. 133, precedente |
| 3 | Honorários | pág. 133, precedente |
| 4 | Subcontratos | pág. 133, precedente |
| 5 | Conservação e reparação | pág. 133, precedente |
| 6 | Serviços de *catering/softdrink | pág. 133, precedente |
| 7 | Rendas e alugueres | pág. 133, precedente |
| 8 | Equipamento desportivo | pág. 133, precedente |
| 9 | Eletricidade | pág. 133, precedente |
| 10 | Vigilância e segurança | pág. 133, precedente |
| 11 | Publicidade e propaganda | pág. 133, precedente |
| 12 | Outros fornecimentos e serviços | pág. 133, precedente |
| 13 | Remunerações fixas | pág. 134, precedente |
| 14 | Remunerações variáveis | pág. 134, precedente |
| 15 | Remunerações fixas | pág. 134, precedente |
| 16 | Remunerações variáveis | pág. 134, precedente |
| 17 | Indemnizações | pág. 134, precedente |
| 18 | Benefícios pós-emprego | pág. 134, precedente |
| 19 | Encargos sobre remunerações | pág. 134, precedente |
| 20 | Seguros de acidentes de trabalho | pág. 134, precedente |
| 21 | Outros gastos com pessoal | pág. 134, precedente |
| 22 | Edifícios e outras construções | pág. 135, precedente |
| 23 | Equipamento básico | pág. 135, precedente |
| 24 | Equipamento de transporte | pág. 135, precedente |
| 25 | Equipamento administrativo | pág. 135, precedente |
| 26 | Outros ativos tangíveis | pág. 135, precedente |
| 27 | Direito de utilização da marca | pág. 135, precedente |
| 28 | Direitos de televisão | pág. 135, precedente |
| 29 | Programas de computador | pág. 135, precedente |
| 30 | Galeria comercial | pág. 135, precedente |
| 31 | Provisões/Imparidades ^{(2)} | pág. 82, precedente |
| 32 | Outros gastos e perdas operacionais ^{(3)} | pág. 82, precedente |
| 33 | Perdas com alienações de direitos de atletas | pág. 136, precedente |
| 34 | Gastos associados a alienações de direitos de atletas | pág. 136, precedente |
| 35 | Abates de direitos de atletas | pág. 136, precedente |
| 36 | Outros gastos | pág. 136, precedente |
| 37 | Amortizações de direitos de atletas | pág. 140, precedente |
| 38 | Perdas de imparidade de direitos de atletas | pág. 140, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2017–18 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2016-17-pos-AG.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2016-17-pos-AG.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas de televisão | pág. 142, precedente |
| 2 | Prémios da UEFA | pág. 142, precedente |
| 3 | Prémios outras competições | pág. 142, Jev 0.95 |
| 4 | Patrocínadores | pág. 142, precedente |
| 5 | Rendas de espaço | pág. 142, precedente |
| 6 | Royalties | pág. 142, precedente |
| 7 | Outra receitas | pág. 142, precedente |
| 8 | Corporate | pág. 142, precedente |
| 9 | Bilhetes de época | pág. 142, precedente |
| 10 | Liga Nacional | pág. 142, Claude 0.88 |
| 11 | Liga dos Campeões | pág. 142, Claude 0.8 |
| 12 | Outra receitas | pág. 142, precedente |
| 13 | Ganhos com alienações de direitos de atletas | pág. 145, precedente |
| 14 | Outros rendimentos e ganhos | pág. 145, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 143, precedente |
| 2 | Deslocações e estadas | pág. 143, precedente |
| 3 | Honorários | pág. 143, precedente |
| 4 | Subcontratos | pág. 143, precedente |
| 5 | Serviços de catering/softdrink | pág. 143, precedente |
| 6 | Conservação e reparação | pág. 143, precedente |
| 7 | Equipamento desportivo | pág. 143, precedente |
| 8 | Eletricidade | pág. 143, Jev 1 |
| 9 | Rendas e alugueres | pág. 143, Jev 0.96 |
| 10 | Vigilância e segurança | pág. 143, precedente |
| 11 | Publicidade e propaganda | pág. 143, Jev 1 |
| 12 | Outros fornecimentos e serviços | pág. 143, precedente |
| 13 | Remunerações fixas | pág. 144, precedente |
| 14 | Remunerações variáveis | pág. 144, precedente |
| 15 | Remunerações fixas | pág. 144, precedente |
| 16 | Remunerações variáveis | pág. 144, precedente |
| 17 | Indemnizações | pág. 144, precedente |
| 18 | Benefícios pós-emprego | pág. 144, precedente |
| 19 | Encargos sobre remunerações | pág. 144, precedente |
| 20 | Seguros de acidentes de trabalho | pág. 144, precedente |
| 21 | Outros gastos com pessoal | pág. 144, precedente |
| 22 | Edifícios e outras construções | pág. 145, precedente |
| 23 | Equipamento básico | pág. 145, precedente |
| 24 | Equipamento de transporte | pág. 145, precedente |
| 25 | Equipamento administrativo | pág. 145, precedente |
| 26 | Outros ativos tangíveis | pág. 145, precedente |
| 27 | Direito de utilização da marca | pág. 145, precedente |
| 28 | Programas de computador | pág. 145, precedente |
| 29 | Direitos de televisão | pág. 145, precedente |
| 30 | Galeria comercial | pág. 145, Claude 0.9 |
| 31 | Provisões/Imparidades ^{(2)} | pág. 88, precedente |
| 32 | Outros gastos e perdas operacionais ^{(3)} | pág. 88, Jev 1 |
| 33 | Perdas com alienações de direitos de atletas | pág. 145, precedente |
| 34 | Gastos associados a alienações de direitos de atletas | pág. 145, precedente |
| 35 | Abates de direitos de atletas | pág. 145, precedente |
| 36 | Outros gastos e perdas | pág. 145, Jev 0.99 |
| 37 | Amortizações de direitos de atletas | pág. 147, precedente |
| 38 | Reforços de imparidade | pág. 147, Jev 0.91 |
| 39 | Reversões de imparidade | pág. 147, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2016–17 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2015-16.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RECEITAS DE TELEVISÃO | pág. 113, Jev 1 |
| 2 | PATROCÍNIOS E PUBLICIDADE | pág. 113, Jev 1 |
| 3 | CORPORATE | pág. 113, precedente |
| 4 | RECEITAS DE BILHETEIRA | pág. 113, Jev 1 |
| 5 | BILHETES DE ÉPOCA | pág. 113, precedente |
| 6 | CACHETS | pág. 113, precedente |
| 7 | RENDAS DE ESPAÇO | pág. 113, precedente |
| 8 | QUOTIZAÇÕES | pág. 113, precedente |
| 9 | OUTROS | pág. 113, Claude 0.85 |
| 10 | PRÉMIOS DA UEFA | pág. 114, Jev 0.95 |
| 11 | ROVALTIES | pág. 114, Jev 0.92 |
| 12 | INDEMNIZAÇÕES DE SEGUROS | pág. 114, Jev 1 |
| 13 | ASSISTÊNCIA TÉCNICA | pág. 114, Jev 0.95 |
| 14 | OUTROS RENDIMENTOS OPERACIONAIS | pág. 114, Claude 0.8 |
| 15 | Alienações de direitos de atletas | pág. 120, Claude 0.93 |
| 16 | Outros rendimentos e ganhos | pág. 120, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | TRABALHOS ESPECIALIZADOS | pág. 115, precedente |
| 2 | DESLOCAÇÕES E ESTADAS | pág. 115, precedente |
| 3 | HONORÁRIOS | pág. 115, precedente |
| 4 | SUBCONTRATOS | pág. 115, precedente |
| 5 | PUBLICIDADE E PROPAGANDA | pág. 115, Jev 1 |
| 6 | EQUIPAMENTO DESPORTIVO | pág. 115, precedente |
| 7 | SERVIÇOS DE CATERING/SOFTDRINK | pág. 115, precedente |
| 8 | CONSERVAÇÃO E REPARAÇÃO | pág. 115, precedente |
| 9 | ELETRICIDADE | pág. 115, Jev 1 |
| 10 | LICENÇA MARCA BENFICA | pág. 115, precedente |
| 11 | VIGILÂNCIA E SEGURANÇA | pág. 115, precedente |
| 12 | RENDAS E ALUGUERES | pág. 115, Jev 0.96 |
| 13 | OUTROS FORNECIMENTOS E SERVIÇOS | pág. 115, precedente |
| 14 | REMINERAÇÕES FIXAS | pág. 116, precedente |
| 15 | REMINERAÇÕES VARIÁVEIS | pág. 116, precedente |
| 16 | REMINERAÇÕES FIXAS | pág. 116, precedente |
| 17 | REMINERAÇÕES VARIÁVEIS | pág. 116, precedente |
| 18 | INDEMNIZAÇÕES | pág. 116, precedente |
| 19 | BENEFÍCIOS PÓS-EMPREGO | pág. 116, precedente |
| 20 | ENCARGOS SOBRE REMUNERAÇÕES | pág. 116, precedente |
| 21 | SEGUROS DE ACIDENTES DE TRABALHO | pág. 116, precedente |
| 22 | OUTROS GASTOS COM PESSOAL | pág. 116, precedente |
| 23 | EDIFÍCIOS E OUTRAS CONSTRUÇÕES | pág. 118, precedente |
| 24 | EQUIPAMENTO BÁSICO | pág. 118, precedente |
| 25 | EQUIPAMENTO DE TRANSPORTE | pág. 118, precedente |
| 26 | FERRAMENTAS E UTENSÍLIOS | pág. 118, Claude 0.85 |
| 27 | EQUIPAMENTO ADMINISTRATIVO | pág. 118, precedente |
| 28 | OUTROS ATIVOS TANGÍVEIS | pág. 118, precedente |
| 29 | DIREITOS DE TV | pág. 118, Jev 1 |
| 30 | DIREITO DE UTILIZAÇÃO DA MARCA | pág. 118, precedente |
| 31 | PROGRAMAS DE COMPUTADOR | pág. 118, precedente |
| 32 | GALERIA COMERCIAL | pág. 118, Claude 0.88 |
| 33 | REDUÇÃO DE PROVISÕES PARA OUTROS RISCOS | pág. 119, Claude 0.85 |
| 34 | REFORÇO DE IMPARIDADES DE CLIENTES/DEVEDORES | pág. 119, Jev 0.92 |
| 35 | REDUÇÃO DE IMPARIDADES DE CLIENTES/DEVEDORES | pág. 119, Claude 0.8 |
| 36 | IMPOSTOS | pág. 119, Jev 0.96 |
| 37 | OUTROS GASTOS E PERDAS OPERACIONAIS | pág. 119, Jev 1 |
| 38 | Amortizações de direitos de atletas | pág. 120, precedente |
| 39 | Reforço de imparidades | pág. 120, Claude 0.93 |
| 40 | Gastos associados a alienações de direitos de atletas | pág. 120, precedente |
| 41 | Abates de direitos de atletas | pág. 120, precedente |
| 42 | Alienações de direitos de atletas | pág. 120, precedente |
| 43 | Outros gastos e perdas | pág. 120, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2015–16 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2013-14-pos-AG.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2013-14-pos-AG.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RECEITAS DE TELEVISÃO | pág. 121, Jev 1 |
| 2 | PUBLICIDADE E PATROCÍNIOS | pág. 121, Jev 1 |
| 3 | CORPORATE | pág. 121, precedente |
| 4 | RECEITAS DE BILHETEIRA | pág. 121, Jev 1 |
| 5 | QUOTIZAÇÕES | pág. 121, precedente |
| 6 | RENDAS DE ESPAÇO | pág. 121, precedente |
| 7 | CATIVOS | pág. 121, Jev 0.92 |
| 8 | BILHETES DE ÉPOCA | pág. 121, precedente |
| 9 | TÍTULOS FUNDADOR E CENTENARIUM | pág. 121, precedente |
| 10 | RECEITAS OUTRAS COMPETIÇÕES | pág. 121, Jev 0.94 |
| 11 | OUTROS | pág. 121, Claude 0.85 |
| 12 | PRÉMIOS UEFA | pág. 123, Jev 1 |
| 13 | INDEMNIZAÇÕES DE SEGUROS | pág. 123, Jev 1 |
| 14 | ROYALTIES | pág. 123, precedente |
| 15 | ASSISTÊNCIA TÉCNICA | pág. 123, Jev 0.95 |
| 16 | COMISSÕES | pág. 123, Jev 1 |
| 17 | OUTROS RENDIMENTOS OPERACIONAIS | pág. 123, Claude 0.8 |
| 18 | ALIENAÇÕES DE DIREITOS DE ATLETAS | pág. 130, Claude 0.93 |
| 19 | CEDÊNCIA DE DIREITOS BENFICA STARS FUND | pág. 130, precedente |
| 20 | CEDÊNCIAS TEMPORÁRIAS DE ATLETAS | pág. 130, precedente |
| 21 | FUNDO DE SOLIDARIEDADE | pág. 130, precedente |
| 22 | OUTROS RENDIMENTOS E GANHOS | pág. 130, precedente |
| 23 | RESULTADOS RELATIVOS A INVESTIMENTOS EM ASSOCIADAS | pág. 94, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | TRABALHOS ESPECIALIZADOS | pág. 124, precedente |
| 2 | DESLOCAÇÕES E ESTADAS | pág. 124, precedente |
| 3 | HONORÁRIOS | pág. 124, precedente |
| 4 | CONSERVAÇÃO E REPARAÇÃO | pág. 124, precedente |
| 5 | SERVIÇOS DE CATERING/SOFTDRINK | pág. 124, precedente |
| 6 | EQUIPAMENTO DESPORTIVO | pág. 124, precedente |
| 7 | SUBCONTRATOS | pág. 124, precedente |
| 8 | ELECTRICIDADE | pág. 124, Jev 1 |
| 9 | RENDAS E ALUSUÍERES | pág. 124, Jev 0.96 |
| 10 | VIDILÂNCIA E SEGURANÇA | pág. 124, precedente |
| 11 | LICENÇA MARCA BENFICA | pág. 124, precedente |
| 12 | PUBLICIDADE E PROPAGANDA | pág. 124, Jev 1 |
| 13 | CEDÊNCIA DIREITOS DE IMAGEM | pág. 124, precedente |
| 14 | DESPESAS MÉDICAS | pág. 124, precedente |
| 15 | LIMPEZA, HIGIENE E CONFORTO | pág. 124, Jev 1 |
| 16 | ÁGUA E OUTROS FLUÍDOS | pág. 124, Jev 0.99 |
| 17 | COMUNICAÇÃO | pág. 124, Jev 1 |
| 18 | OUTROS FORNECIMENTOS E SERVIÇOS | pág. 124, precedente |
| 19 | REMUNERAÇÕES FIXAS | pág. 125, precedente |
| 20 | REMUNERAÇÕES VARIÁVEIS/PRÉMIOS | pág. 125, Jev 1 |
| 21 | REMUNERAÇÕES FIXAS | pág. 125, precedente |
| 22 | REMUNERAÇÕES VARIÁVEIS/PRÉMIOS | pág. 125, Jev 1 |
| 23 | INDEMNIZAÇÕES | pág. 125, precedente |
| 24 | BENEFÍCIOS PÓS-EMPREGO | pág. 125, precedente |
| 25 | ENCARGOS SOBRE REMUNERAÇÕES | pág. 125, precedente |
| 26 | SEGUROS DE ACIDENTES DE TRABALHO | pág. 125, precedente |
| 27 | OUTROS GASTOS COM PESSOAL | pág. 125, precedente |
| 28 | EDIFÍCIOS E OUTRAS CONSTRUÇÕES | pág. 127, precedente |
| 29 | EQUIPAMENTO BÁSICO | pág. 127, precedente |
| 30 | EQUIPAMENTO DE TRANSPORTE | pág. 127, precedente |
| 31 | FERRAMENTAS E UTENSÍLIOS | pág. 127, Claude 0.85 |
| 32 | EQUIPAMENTO ADMINISTRATIVO | pág. 127, precedente |
| 33 | OUTROS ACTIVOS TANGÍVEIS | pág. 127, precedente |
| 34 | PROGRAMAS TV | pág. 127, Claude 0.85 |
| 35 | DIREITO UTILIZAÇÃO DA MARCA BENFICA | pág. 127, Jev 0.92 |
| 36 | GALERIA COMERCIAL | pág. 127, Claude 0.88 |
| 37 | REFORÇO DE PROVISÕES PARA OUTROS RISCOS | pág. 128, Claude 0.9 |
| 38 | REDUÇÃO DE PROVISÕES PARA OUTROS RISCOS | pág. 128, Claude 0.85 |
| 39 | REDUÇÃO DE IMPARIDADES DE CLIENTES/DEVEDORES | pág. 128, Claude 0.8 |
| 40 | IMPOSTOS | pág. 129, Jev 0.96 |
| 41 | OUTROS GASTOS E PERDAS OPERACIONAIS | pág. 129, Jev 1 |
| 42 | AMORTIZAÇÕES DE DIREITOS DE ATLETAS | pág. 129, precedente |
| 43 | REFORÇO DE IMPARIDADE | pág. 129, Jev 0.95 |
| 44 | REVERSÕES DE IMPARIDADE | pág. 129, precedente |
| 45 | GASTOS COM TRANSFERÊNCIA DE ATLETAS | pág. 130, Jev 0.99 |
| 46 | CEDÊNCIAS TEMPORÁRIAS DE ATLETAS | pág. 130, Jev 0.93 |
| 47 | FUNDO DE SOLIDARIEDADE | pág. 130, Jev 0.97 |
| 48 | ABATES DE DIREITOS DE ATLETAS | pág. 130, precedente |
| 49 | ALIENAÇÕES DE DIREITOS DE ATLETAS | pág. 130, precedente |
| 50 | OUTROS GASTOS E PERDAS | pág. 130, Jev 0.99 |

### Meta

```text
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2014-06-30. periodo.mjs tomó 2017-06-30 (fin de mandato de los órganos sociales, L1417-1421); el informe es del ejercicio cerrado el 30/06/2014.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2013–14 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2012-13-pos-AG.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2012-13-pos-AG.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | PUBLICIDADE E PATROCÍNIOS | pág. 131, precedente |
| 2 | RECEITAS DE BILHETEIRA | pág. 131, precedente |
| 3 | TRANSMISSÕES TELEVISIVAS | pág. 131, precedente |
| 4 | CORPORATE | pág. 131, precedente |
| 5 | QUOTIZAÇÕES | pág. 131, precedente |
| 6 | RENDAS DE ESPAÇO | pág. 131, precedente |
| 7 | CEDÊNCIA DE ATLETAS | pág. 131, precedente |
| 8 | CATIVOS | pág. 131, precedente |
| 9 | BILHETES DE ÉPOCA | pág. 131, Jev 1 |
| 10 | TÍTULOS FUNDADOR E CENTENARIUM | pág. 131, precedente |
| 11 | RECEITAS OUTRAS COMPETIÇÕES | pág. 131, Jev 0.94 |
| 12 | CACHETS | pág. 131, precedente |
| 13 | OUTROS | pág. 131, precedente |
| 14 | PRÉMIOS UEFA | pág. 133, Jev 1 |
| 15 | COMISSÕES | pág. 133, Claude 0.8 |
| 16 | ASSISTÊNCIA TÉCNICA | pág. 133, Jev 0.95 |
| 17 | ROYALTIES | pág. 133, Jev 0.96 |
| 18 | INDEMNIZAÇÕES DE SEGUROS | pág. 133, precedente |
| 19 | OUTROS RENDIMENTOS OPERACIONAIS | pág. 133, Claude 0.8 |
| 20 | GANHOS NA ALIENAÇÃO DE DIREITOS DE ATLETAS | pág. 139, Jev 1 |
| 21 | CEDÊNCIA DE DIREITOS BENFICA STARS FUND | pág. 139, precedente |
| 22 | FUNDO DE SOLIDARIEDADE | pág. 139, Jev 0.96 |
| 23 | OUTROS RENDIMENTOS E GANHOS | pág. 139, precedente |
| 24 | GASTOS COM TRANSFERÊNCIA DE ATLETAS | pág. 139, precedente |
| 25 | PERDAS NA ALIENAÇÃO DE DIREITOS DE ATLETAS | pág. 139, Jev 0.96 |
| 26 | FUNDO DE SOLIDARIEDADE | pág. 139, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | TRABALHOS ESPECIALIZADOS | pág. 134, precedente |
| 2 | DESLOCAÇÕES E ESTADAS | pág. 134, precedente |
| 3 | HONORÁRIOS | pág. 134, precedente |
| 4 | SERVIÇOS DE CATERING/SOFTDRINK | pág. 134, precedente |
| 5 | CEDÊNCIA DIREITOS DE IMAGEM | pág. 134, precedente |
| 6 | EQUIPAMENTO DESPORTIVO | pág. 134, precedente |
| 7 | VIGILÂNCIA E SEGURANÇA | pág. 134, precedente |
| 8 | CONSERVAÇÃO E REPARAÇÃO | pág. 134, precedente |
| 9 | SUBCONTRATOS | pág. 134, precedente |
| 10 | ELECTRICIDADE | pág. 134, precedente |
| 11 | PUBLICIDADE E PROPAGANDA | pág. 134, precedente |
| 12 | RENDAS E ALUGUERES | pág. 134, precedente |
| 13 | LICENÇA MARCA BENFICA | pág. 134, precedente |
| 14 | LIMPEZA, HIGIENE E COMPORTO | pág. 134, precedente |
| 15 | COMISSÕES | pág. 134, precedente |
| 16 | DESPESAS MÉDICAS | pág. 134, precedente |
| 17 | ÁGUA E OUTROS FLUÍDOS | pág. 134, precedente |
| 18 | DESPESAS DE REPRESENTAÇÃO | pág. 134, precedente |
| 19 | SEGUROS | pág. 134, precedente |
| 20 | COMUNICAÇÃO | pág. 134, precedente |
| 21 | CACHETS | pág. 134, precedente |
| 22 | OUTROS FORNECIMENTOS E SERVIÇOS | pág. 134, precedente |
| 23 | REMUNERAÇÕES FIXAS | pág. 135, precedente |
| 24 | REMUNERAÇÕES VARIÁVEIS/PRÊMIOS | pág. 135, precedente |
| 25 | REMUNERAÇÕES FIXAS | pág. 135, precedente |
| 26 | REMUNERAÇÕES VARIÁVEIS/PRÊMIOS | pág. 135, precedente |
| 27 | INDEMNIZAÇÕES | pág. 135, precedente |
| 28 | BENEFÍCIOS PÓS-EMPREGO | pág. 135, precedente |
| 29 | ENCARGOS SOBRE REMUNERAÇÕES | pág. 135, precedente |
| 30 | SEGUROS DE ACIDENTES DE TRABALHO | pág. 135, precedente |
| 31 | OUTROS GASTOS COM PESSOAL | pág. 135, precedente |
| 32 | EDIFÍCIOS E OUTRAS CONSTRUÇÕES | pág. 137, precedente |
| 33 | EQUIPAMENTO BÁSICO | pág. 137, precedente |
| 34 | EQUIPAMENTO DE TRANSPORTE | pág. 137, precedente |
| 35 | FERRAMENTAS E UTENSÍLIOS | pág. 137, precedente |
| 36 | EQUIPAMENTO ADMINISTRATIVO | pág. 137, precedente |
| 37 | OUTROS ACTIVOS TANGÍVEIS | pág. 137, precedente |
| 38 | DIREITO UTILIZAÇÃO DA MARCA BENFICA | pág. 137, precedente |
| 39 | GALERIA COMERCIAL | pág. 137, precedente |
| 40 | REFORÇO DE PROVISÕES PARA OUTROS RISCOS | pág. 138, precedente |
| 41 | REDUÇÃO DE PROVISÕES PARA OUTROS RISCOS | pág. 138, Claude 0.85 |
| 42 | REFORÇO DE IMPARIDADES DE CLIENTES/DEVEDORES | pág. 138, Jev 0.92 |
| 43 | REDUÇÃO DE IMPARIDADES DE CLIENTES/DEVEDORES | pág. 138, Claude 0.8 |
| 44 | IMPOSTOS | pág. 138, Jev 0.96 |
| 45 | OUTROS GASTOS E PERDAS OPERACIONAIS | pág. 138, Jev 1 |
| 46 | AMORTIZAÇÕES DO EXERCÍCIO | pág. 139, precedente |
| 47 | DIREITOS ECONÓMICOS DE ATLETAS | pág. 139, Jev 0.92 |
| 48 | PERDAS DE IMPARIDADE | pág. 139, precedente |
| 49 | ABATES DE ATLETAS - REVOGAÇÕES | pág. 139, precedente |
| 50 | RESULTADOS RELATIVOS A INVESTIMENTOS EM ASSOCIADAS | pág. 100, Jev 0.99 |

### Meta

```text
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cierre = 2013-06-30. periodo.mjs tomó un cierre equivocado (localizar buscó el ejercicio 2019-06-30); el informe es del ejercicio 2012/13.
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): estado = b43. Demonstração consolidada e individual dos resultados al 30/06/2013 (se carga la columna consolidada, ajuste de perímetro del club).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2012–13 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2011-12.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2011-12.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade e patrocínios | pág. 96, Jev 1 |
| 2 | Receitas de bilheteira | pág. 96, Jev 1 |
| 3 | Transmissões televisivas | pág. 96, Jev 1 |
| 4 | Quotizações | pág. 96, precedente |
| 5 | Corporate | pág. 96, precedente |
| 6 | Calivos | pág. 96, Jev 0.98 |
| 7 | Rendas de espaço | pág. 96, precedente |
| 8 | Bilhetes de época | pág. 96, precedente |
| 9 | Títulos Centenarium e Fundador | pág. 96, precedente |
| 10 | Cedência de atletas | pág. 96, precedente |
| 11 | Receitas outras competições | pág. 96, Jev 0.94 |
| 12 | Cachets | pág. 96, precedente |
| 13 | Outros | pág. 96, Claude 0.85 |
| 14 | Prémios UEFA | pág. 98, Jev 1 |
| 15 | Comissões | pág. 98, precedente |
| 16 | Assistência técnica | pág. 98, Jev 0.95 |
| 17 | Royalties | pág. 98, precedente |
| 18 | Indemnizações de seguros | pág. 98, Jev 1 |
| 19 | Outros proveitos | pág. 98, Claude 0.85 |
| 20 | Alienações de direitos de atletas | pág. 104, Jev 1 |
| 21 | Cedência de direitos Benfica Stars Fund | pág. 104, precedente |
| 22 | Fundo de solidariedade | pág. 104, Jev 0.96 |
| 23 | Outros proveitos | pág. 104, Claude 0.85 |
| 24 | Custos com transferência de atletas | pág. 104, precedente |
| 25 | Fundo de solidariedade | pág. 104, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 99, precedente |
| 2 | Deslocações e estadas | pág. 99, precedente |
| 3 | Honorários | pág. 99, precedente |
| 4 | Equipamento desportivo | pág. 99, precedente |
| 5 | Serviços de catering/softdrink | pág. 99, precedente |
| 6 | Cedência direitos de imagem | pág. 99, precedente |
| 7 | Vigilância e segurança | pág. 99, precedente |
| 8 | Conservação e reparação | pág. 99, precedente |
| 9 | Comissões | pág. 99, precedente |
| 10 | Electricidade | pág. 99, Jev 1 |
| 11 | Subcontratos | pág. 99, precedente |
| 12 | Licença marca Benfica | pág. 99, precedente |
| 13 | Rendas e alugueres | pág. 99, Jev 0.96 |
| 14 | Limpeza, higiene e conforto | pág. 99, Jev 1 |
| 15 | Publicidade e propaganda | pág. 99, Jev 1 |
| 16 | Despesas médicas | pág. 99, precedente |
| 17 | Cachets | pág. 99, precedente |
| 18 | Seguros | pág. 99, Jev 0.97 |
| 19 | Água e outros fluidos | pág. 99, Jev 0.99 |
| 20 | Comunicação | pág. 99, Jev 1 |
| 21 | Despesas de representação | pág. 99, Jev 0.99 |
| 22 | Acordos e protocolos | pág. 99, precedente |
| 23 | Outros fornecimentos e serviços | pág. 99, precedente |
| 24 | Remunerações fixas | pág. 100, precedente |
| 25 | Remunerações variáveis / prémios | pág. 100, Jev 1 |
| 26 | Remunerações fixas | pág. 100, precedente |
| 27 | Remunerações variáveis / prémios | pág. 100, Jev 1 |
| 28 | Indemnizações | pág. 100, precedente |
| 29 | Benefícios pós-emprego | pág. 100, precedente |
| 30 | Encargos sobre remunerações | pág. 100, precedente |
| 31 | Seguros de acidentes de trabalho | pág. 100, precedente |
| 32 | Outros custos | pág. 100, Jev 0.96 |
| 33 | Edifícios e outras construções | pág. 102, precedente |
| 34 | Equipamento básico | pág. 102, precedente |
| 35 | Equipamento de transporte | pág. 102, precedente |
| 36 | Ferramentas e utensílios | pág. 102, Claude 0.85 |
| 37 | Equipamento administrativo e utensílios | pág. 102, Jev 0.95 |
| 38 | Outras imobilizações corpóreas | pág. 102, precedente |
| 39 | Direito utilização da marca 'Benfica' | pág. 102, Claude 0.92 |
| 40 | Galeria comercial | pág. 102, Claude 0.88 |
| 41 | Reforço de provisões para outros riscos | pág. 103, Claude 0.9 |
| 42 | Redução de provisões para outros riscos | pág. 103, Claude 0.85 |
| 43 | Reforço de imparidade de clientes/devedores | pág. 103, Jev 0.99 |
| 44 | Redução de imparidade de clientes/devedores | pág. 103, Jev 0.96 |
| 45 | Impostos | pág. 103, Jev 0.96 |
| 46 | Outros custos e perdas operacionais | pág. 103, Jev 1 |
| 47 | Amortizações do exercício | pág. 104, Jev 0.97 |
| 48 | Direitos económicos de atletas | pág. 104, Jev 0.92 |
| 49 | Perdas de imparidade | pág. 104, precedente |
| 50 | Abates de atletas - revogações | pág. 104, Claude 0.85 |
| 51 | Resultados relativos a investimentos em associadas | pág. 71, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2011–12 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/prestacao-contas-2010-11-11.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/prestacao-contas-2010-11-11.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | PUBLICIDADE E PATROCÍNIOS | pág. 134, Jev 1 |
| 2 | RECEITAS DE BILHETEIRA | pág. 134, Jev 1 |
| 3 | QUOTIZAÇÕES | pág. 134, Claude 0.9 |
| 4 | TRANSMISSÕES TELEVISIVAS | pág. 134, Jev 1 |
| 5 | CATIVOS | pág. 134, Jev 0.92 |
| 6 | CACHETS | pág. 134, precedente |
| 7 | CEDÊNCIA DE ATLETAS | pág. 134, precedente |
| 8 | DIREITOS | pág. 134, precedente |
| 9 | RENDAS DE ESPAÇO | pág. 134, precedente |
| 10 | OUTROS | pág. 134, Claude 0.85 |
| 11 | PRÉMIOS UEFA | pág. 137, Jev 1 |
| 12 | COMISSÕES | pág. 137, Claude 0.8 |
| 13 | PRÉMIOS TAÇA DA LIGA | pág. 137, Jev 1 |
| 14 | ROYALTIES | pág. 137, Jev 0.96 |
| 15 | ASSISTÊNCIA TÉCNICA | pág. 137, Jev 0.95 |
| 16 | OUTROS PROVEITOS SUPLEMENTARES | pág. 137, Jev 1 |
| 17 | INDEMINIZAÇÕES DE SEGUROS | pág. 137, Jev 1 |
| 18 | BENEFÍCIOS DE PENALIDADES CONTRATUAIS | pág. 137, Jev 1 |
| 19 | SUBSÍDIOS À EXPLORAÇÃO | pág. 137, Jev 0.97 |
| 20 | REDUÇÃO DE IMPARIDADE DE CRÉDITOS | pág. 137, Jev 1 |
| 21 | OUTROS PROVEITOS OPERACIONAIS | pág. 137, Jev 0.99 |
| 22 | VENDA DE DIREITOS | pág. 146, Jev 1 |
| 23 | CEDÊNCIA DE DIREITOS BENFICA STARS FUND | pág. 146, precedente |
| 24 | PROVEITOS COM FUNDO SOLIDARIEDADE | pág. 146, precedente |
| 25 | CEDÊNCIA DE DIREITOS BENFICA STARS FUND | pág. 146, precedente |
| 26 | VENDA DE DIREITOS | pág. 146, Jev 1 |
| 27 | GANHOS EM EMPRESAS ASSOCIADAS | pág. 149, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | CUSTOS COM TRANSFERÊNCIA DE ATLETAS | pág. 146, precedente |
| 2 | CUSTOS COM FUNDO DE SOLIDARIEDADE | pág. 146, precedente |
| 3 | TRABALHOS ESPECIALIZADOS | pág. 139, precedente |
| 4 | DESLOCAÇÕES E ESTADAS | pág. 139, precedente |
| 5 | RENDAS E ALUGUERES | pág. 139, Jev 0.96 |
| 6 | CEDÊNCIA DIREITOS DE IMAGEM | pág. 139, Claude 0.8 |
| 7 | EQUIPAMENTO DESPORTIVO | pág. 139, precedente |
| 8 | HONORÁRIOS | pág. 139, precedente |
| 9 | EMPRÉSTIMOS DE JOGADORES | pág. 139, precedente |
| 10 | SUBCONTRATOS | pág. 139, precedente |
| 11 | VIGILÂNCIA E SEGURANÇA | pág. 139, precedente |
| 12 | SEGUROS | pág. 139, Jev 0.97 |
| 13 | COMISSÕES | pág. 139, precedente |
| 14 | ELECTRICIDADE | pág. 139, Jev 1 |
| 15 | SERVIÇOS DE CATERING/SOFTDRINK | pág. 139, precedente |
| 16 | LIMPEZA, HIGIENE E CONFORTO | pág. 139, Jev 1 |
| 17 | DESPESAS MÉDICAS | pág. 139, precedente |
| 18 | PUBLICIDADE E PROPAGANDA | pág. 139, Jev 1 |
| 19 | CONSERVAÇÃO E REPARAÇÃO | pág. 139, precedente |
| 20 | CACHETS | pág. 139, precedente |
| 21 | COMUNICAÇÃO | pág. 139, Jev 1 |
| 22 | DESPESAS DE REPRESENTAÇÃO | pág. 139, Jev 0.99 |
| 23 | ÁGUA E OUTROS FLUÍDOS | pág. 139, Jev 0.99 |
| 24 | ARTIGOS PARA OFERTA | pág. 139, Jev 0.98 |
| 25 | ASSOCIAÇÕES, FEDERAÇÕES E LIGA | pág. 139, Jev 0.97 |
| 26 | SUBSÍDIOS FUTEBOL FORMAÇÃO | pág. 139, Jev 0.91 |
| 27 | CONTENCIOSO E NOTARIADO | pág. 139, Jev 1 |
| 28 | ACORDOS E PROTOCOLOS | pág. 139, precedente |
| 29 | OUTROS FORNECIMENTOS E SERVIÇOS | pág. 139, precedente |
| 30 | REMUNERAÇÕES FIXAS | pág. 141, precedente |
| 31 | REMUNERAÇÕES VARIÁVEIS/PRÉMIOS | pág. 141, Jev 1 |
| 32 | REMUNERAÇÕES FIXAS | pág. 141, precedente |
| 33 | REMUNERAÇÕES VARIÁVEIS/PRÉMIOS | pág. 141, Jev 1 |
| 34 | INDEMNIZAÇÕES | pág. 141, precedente |
| 35 | COMPLEMENTO DE REFORMA | pág. 141, Claude 0.8 |
| 36 | ENCARGOS SOBRE REMUNERAÇÕES | pág. 141, precedente |
| 37 | SEGUROS DE ACIDENTES DE TRABALHO | pág. 141, precedente |
| 38 | OUTROS CUSTOS | pág. 141, Jev 0.96 |
| 39 | EDIFÍCIOS E OUTRAS CONSTRUÇÕES | pág. 144, precedente |
| 40 | EQUIPAMENTO BÁSICO | pág. 144, precedente |
| 41 | EQUIPAMENTO DE TRANSPORTE | pág. 144, precedente |
| 42 | FERRAMENTAS E UTENSÍLIOS | pág. 144, Claude 0.85 |
| 43 | EQUIPAMENTO ADMINISTRATIVO E UTENSÍLIOS | pág. 144, Jev 0.95 |
| 44 | OUTRAS IMOBILIZAÇÕES CORPÓREAS | pág. 144, Claude 0.9 |
| 45 | DIREITO UTILIZAÇÃO DA MARCA | pág. 144, Jev 0.95 |
| 46 | GALERIA COMERCIAL | pág. 144, Claude 0.85 |
| 47 | PROVISÕES PARA OUTROS RISCOS E ENCARGOS | pág. 144, Claude 0.85 |
| 48 | REDUÇÕES DE PROVISÕES | pág. 144, precedente |
| 49 | IMPARIDADE PARA CRÉDITOS DE COBRANÇA DUVIDOSA | pág. 145, Jev 1 |
| 50 | IMPOSTOS INDIRECTOS | pág. 145, Claude 0.85 |
| 51 | IMPOSTOS DIRECTOS | pág. 145, precedente |
| 52 | CORRECÇÕES RELATIVAS A EXERCÍCIOS ANTERIORES | pág. 145, Jev 1 |
| 53 | QUOTIZAÇÕES | pág. 145, precedente |
| 54 | OUTROS CUSTOS E PERDAS OPERACIONAIS | pág. 145, Jev 1 |
| 55 | AMORTIZAÇÕES DO EXERCÍCIO | pág. 145, Jev 0.97 |
| 56 | PERDAS DE IMPARIDADE | pág. 145, precedente |
| 57 | ABATES DE ATLETAS - REVOGAÇÕES | pág. 145, Claude 0.85 |
| 58 | PERDAS EM EMPRESAS ASSOCIADAS | pág. 149, Jev 0.97 |

### Meta

```text
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2010-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = other_expenses. Costo de la nota 'Custos com transacções de atletas' (1.445.250 entre paréntesis) que la extracción dejó en ingresos con signo negativo; pasa a gasto sin cambiar el resultado.
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = other_expenses. Costo de 'Custos com transacções de atletas' (245.324) en ingresos con signo negativo; pasa a gasto sin cambiar el resultado.
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = other_income. Ganancia (6.066) de 'Resultados relativos a investimentos' que quedó en gastos con signo positivo; pasa a ingreso, como Benfica 2019 'Resultado relativo a investimentos em participadas'.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2009–10 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/prestacao-contas-2009-11-03.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/prestacao-contas-2009-11-03.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade e patrocínios | pág. 55, Jev 1 |
| 2 | Transmissões televisivas | pág. 55, Jev 1 |
| 3 | Quotizações | pág. 55, precedente |
| 4 | Receitas de bilheteira | pág. 55, Jev 1 |
| 5 | Cativos | pág. 55, Jev 0.92 |
| 6 | Cedência de atletas | pág. 55, precedente |
| 7 | Cachets | pág. 55, precedente |
| 8 | Outros | pág. 55, Claude 0.85 |
| 9 | Royalties | pág. 56, precedente |
| 10 | Comissões | pág. 56, precedente |
| 11 | Prémios UEFA | pág. 56, Jev 1 |
| 12 | Prémios Carlsberg Cup | pág. 56, Jev 1 |
| 13 | Benefícios de penalidades contratuais | pág. 56, Jev 1 |
| 14 | Indemnizações de seguros | pág. 56, Jev 1 |
| 15 | Outros proveitos operacionais | pág. 56, Jev 0.99 |
| 16 | Venda de direitos | pág. 61, Jev 1 |
| 17 | Proveitos com fundo solidariedade | pág. 61, precedente |
| 18 | Custos com transferência de atletas | pág. 61, precedente |
| 19 | Custos com fundo de solidariedade | pág. 61, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Electricidade | pág. 57, Jev 1 |
| 2 | Água e outros fluidos | pág. 57, Jev 0.99 |
| 3 | Artigos para oferta | pág. 57, Jev 0.98 |
| 4 | Rendas e alugueres | pág. 57, Jev 0.96 |
| 5 | Medicamentos | pág. 57, Jev 0.96 |
| 6 | Despesas de representação | pág. 57, Jev 0.99 |
| 7 | Comunicação | pág. 57, Jev 1 |
| 8 | Seguros | pág. 57, Jev 0.97 |
| 9 | Deslocações e estadas | pág. 57, precedente |
| 10 | Comissões | pág. 57, precedente |
| 11 | Honorários | pág. 57, precedente |
| 12 | Contencioso e notariado | pág. 57, Jev 1 |
| 13 | Conservação e reparação | pág. 57, precedente |
| 14 | Publicidade e propaganda | pág. 57, Jev 1 |
| 15 | Limpeza, higiene e conforto | pág. 57, Jev 1 |
| 16 | Vigilância e segurança | pág. 57, precedente |
| 17 | Trabalhos especializados | pág. 57, precedente |
| 18 | Equipamento desportivo | pág. 57, precedente |
| 19 | Subsídios futebol formação | pág. 57, Jev 0.91 |
| 20 | Acordos e protocolos | pág. 57, precedente |
| 21 | Associações, Federações e Liga | pág. 57, Jev 0.97 |
| 22 | Empréstimos de jogadores | pág. 57, precedente |
| 23 | Cedência de jogadores | pág. 57, Jev 0.99 |
| 24 | Cedência direitos de imagem | pág. 57, precedente |
| 25 | Cachets | pág. 57, precedente |
| 26 | Outros fornecimentos e serviços | pág. 57, precedente |
| 27 | Remunerações fixas | pág. 58, precedente |
| 28 | Remunerações variáveis / prémios | pág. 58, Jev 1 |
| 29 | Remunerações fixas | pág. 58, precedente |
| 30 | Remunerações variáveis / prémios | pág. 58, Jev 1 |
| 31 | Indemnizações | pág. 58, precedente |
| 32 | Complemento de reforma | pág. 58, Claude 0.8 |
| 33 | Encargos sobre remunerações | pág. 58, precedente |
| 34 | Seguros de acidentes de trabalho | pág. 58, precedente |
| 35 | Outros custos | pág. 58, Jev 0.96 |
| 36 | Edifícios e outras construções | pág. 59, precedente |
| 37 | Equipamento básico | pág. 59, precedente |
| 38 | Equipamento de transporte | pág. 59, precedente |
| 39 | Equipamento administrativo e utensílios | pág. 59, Jev 0.95 |
| 40 | Outras imobilizações corpóreas | pág. 59, precedente |
| 41 | Direito utilização da marca | pág. 59, Jev 0.95 |
| 42 | Provisões do exercício | pág. 39, Claude 0.85 |
| 43 | Impostos indirectos | pág. 60, Claude 0.85 |
| 44 | Impostos directos | pág. 60, precedente |
| 45 | Quotizações | pág. 60, precedente |
| 46 | Correcções relativas a exercícios anteriores | pág. 60, Jev 1 |
| 47 | Outros custos e perdas operacionais | pág. 60, Jev 1 |
| 48 | Amortizações do exercício | pág. 60, Jev 0.97 |
| 49 | Abates de atletas - revogações | pág. 60, Claude 0.85 |
| 50 | Perdas de imparidade | pág. 60, precedente |
| 51 | Resultados relativos a investimentos | pág. 39, Jev 0.99 |

### Meta

```text
2009: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): reportType = official_balance_sheet. Relatório e contas anual del ejercicio 1/7/2008-30/6/2009 (el nombre del archivo lleva la fecha de publicación).
2009: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cierre = 2009-06-30. El nombre del archivo (2009-11-03) es la fecha de publicación; el ejercicio cierra el 30/06/2009.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2008–09 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2008

### Ingresos

```text
2008: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2007-08.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2007-08.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade e patrocínios | pág. 57, Jev 1 |
| 2 | Transmissões televisivas | pág. 57, Jev 1 |
| 3 | Quotizações | pág. 57, precedente |
| 4 | Receitas de bilheteira | pág. 57, Jev 1 |
| 5 | Cativos | pág. 57, Jev 0.92 |
| 6 | Cachets | pág. 57, precedente |
| 7 | Cedência de atletas | pág. 57, precedente |
| 8 | Outros | pág. 57, Claude 0.85 |
| 9 | Royalties | pág. 58, precedente |
| 10 | Comissões | pág. 58, precedente |
| 11 | Prémios Liga Campeões | pág. 58, Jev 1 |
| 12 | Prémios Carlsberg cup | pág. 58, Jev 1 |
| 13 | Redução de imparidade de créditos | pág. 58, Jev 1 |
| 14 | Benefícios penalidades contratuais | pág. 58, Jev 1 |
| 15 | Indemnizações de seguros | pág. 58, Jev 1 |
| 16 | Outros proveitos operacionais | pág. 58, Jev 0.99 |
| 17 | Venda de direitos | pág. 62, Jev 1 |
| 18 | Proveitos com fundo solidariedade | pág. 62, precedente |
| 19 | Venda de direitos | pág. 62, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas com transferência de atletas | pág. 62, precedente |
| 2 | Despesas com fundo de solidariedade | pág. 62, precedente |
| 3 | Comissões | pág. 59, precedente |
| 4 | Rendas e alugueres | pág. 59, Jev 0.96 |
| 5 | Trabalhos especializados | pág. 59, precedente |
| 6 | Honorários | pág. 59, precedente |
| 7 | Deslocações e estadas | pág. 59, precedente |
| 8 | Vigilância e segurança | pág. 59, precedente |
| 9 | Seguros | pág. 59, Jev 0.97 |
| 10 | Equipamento desportivo | pág. 59, precedente |
| 11 | Limpeza, higiene e conforto | pág. 59, Jev 1 |
| 12 | Electricidade | pág. 59, Jev 1 |
| 13 | Publicidade e propaganda | pág. 59, Jev 1 |
| 14 | Água e outros fluidos | pág. 59, Jev 0.99 |
| 15 | Medicamentos | pág. 59, Jev 0.96 |
| 16 | Despesas de representação | pág. 59, Jev 0.99 |
| 17 | Comunicação | pág. 59, Jev 1 |
| 18 | Contencioso e notariado | pág. 59, Jev 1 |
| 19 | Artigos para oferta | pág. 59, Jev 0.98 |
| 20 | Associações, Federações e Liga | pág. 59, Jev 0.97 |
| 21 | Subsídios futebol formação | pág. 59, Jev 0.91 |
| 22 | Conservação e reparação | pág. 59, precedente |
| 23 | Cedência de jogadores | pág. 59, Jev 0.99 |
| 24 | Acordos e protocolos | pág. 59, precedente |
| 25 | Outros fornecimentos e serviços | pág. 59, precedente |
| 26 | - Remunerações fixas | pág. 60, precedente |
| 27 | - Remunerações fixas | pág. 60, precedente |
| 28 | - Remunerações variáveis / prémios | pág. 60, Jev 1 |
| 29 | - Indeminizações | pág. 60, precedente |
| 30 | Complementos de reforma | pág. 60, Claude 0.85 |
| 31 | Encargos sobre remunerações | pág. 60, precedente |
| 32 | Seguros de acidentes de trabalho | pág. 60, precedente |
| 33 | Outros custos | pág. 60, Jev 0.96 |
| 34 | Edifícios e outras construções | pág. 61, precedente |
| 35 | Equipamento básico | pág. 61, precedente |
| 36 | Equipamento de transporte | pág. 61, precedente |
| 37 | Equipamento administrativo e utensílios | pág. 61, Jev 0.95 |
| 38 | Outras imobilizações corpóreas | pág. 61, precedente |
| 39 | Direito de utilização da marca | pág. 61, precedente |
| 40 | Provisões | pág. 39, Claude 0.85 |
| 41 | Impostos indirectos | pág. 61, Claude 0.85 |
| 42 | Impostos directos | pág. 61, precedente |
| 43 | Imparidade para créditos de cobrança duvidosa | pág. 61, Jev 1 |
| 44 | Outros custos e perdas operacionais | pág. 61, Jev 1 |
| 45 | Amortizações do exercício - Passes de atletas | pág. 62, Jev 1 |
| 46 | Abates de atletas - Revogações contratuais | pág. 62, Jev 0.96 |
| 47 | Perdas de imparidade | pág. 62, precedente |

### Meta

```text
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): perimetro = individual. regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y Boavista, 2026-10-15), punto 1: el ejercicio se publicó con un solo perímetro (individual; desde 2019-20 la SAD ya no controla Benfica Estádio ni Benfica TV, vendidas a la SGPS)
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = other_expenses. Costo de transacciones de atletas que la extracción dejó en ingresos con signo negativo; pasa a gasto sin cambiar el resultado (como Benfica 2010).
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = other_expenses. Costo de transacciones de atletas que la extracción dejó en ingresos con signo negativo; pasa a gasto sin cambiar el resultado (como Benfica 2010).
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): reportType = official_balance_sheet. Claude 2026-10-16 (to-do 237 ab): es el relatório e contas anual del ejercicio de transición de 11 meses (1/8/2007-30/6/2008, cambio de cierre de julio a junio), no un intermedio
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2007–08 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2007

### Ingresos

```text
2007: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2006-07.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2006-07.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade e patrocínios | pág. 38, precedente |
| 2 | Receitas de bilheteira | pág. 38, precedente |
| 3 | Transmissões televisivas | pág. 38, precedente |
| 4 | Quotizações | pág. 38, precedente |
| 5 | Cativos | pág. 38, precedente |
| 6 | Cachet's | pág. 38, Claude 0.93 |
| 7 | Cedência de atletas | pág. 38, precedente |
| 8 | Receitas competições FPF | pág. 38, Jev 1 |
| 9 | Outras | pág. 38, Jev 1 |
| 10 | Proveitos suplementares | pág. 30, Jev 1 |
| 11 | Subsídios à exploração | pág. 30, Jev 0.97 |
| 12 | Outros proveitos e ganhos operacionais | pág. 30, Jev 1 |
| 13 | Ganhos em imobilizações | pág. 39, Jev 0.99 |
| 14 | Benefícios de penalidades contratuais | pág. 39, precedente |
| 15 | Outros proveitos e ganhos extraordinários | pág. 39, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Correcções relativas a exercícios anteriores | pág. 39, precedente |
| 2 | Fornecimentos e serviços externos | pág. 30, Jev 0.98 |
| 3 | Remunerações | pág. 30, precedente |
| 4 | Outros | pág. 30, Jev 0.98 |
| 5 | Amortizações do imobilizado corpóreo e incorpóreo | pág. 30, Jev 0.98 |
| 6 | Ajustamentos | pág. 30, precedente |
| 7 | Provisões | pág. 30, Claude 0.85 |
| 8 | Impostos | pág. 30, Jev 0.96 |
| 9 | Outros custos e perdas operacionais | pág. 30, Jev 1 |
| 10 | Perdas em imobilizações | pág. 39, precedente |
| 11 | Multas e penalidades | pág. 39, Claude 0.8 |
| 12 | Correcções relativas a exercícios anteriores | pág. 39, precedente |
| 13 | Outros custos e perdas extraordinários | pág. 39, Claude 0.8 |

### Meta

```text
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2007-07-31. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): perimetro = individual. regla de perímetro de CONVENCIONES-DATOS (ok de Guido para fijar Benfica y Boavista, 2026-10-15), punto 1: el ejercicio se publicó con un solo perímetro (individual; desde 2019-20 la SAD ya no controla Benfica Estádio ni Benfica TV, vendidas a la SGPS)
2007: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = exceptional_items. Claude 2026-10-16 (lote 84): corrección de ejercicios anteriores del lado ingreso, ingreso extraordinario: exceptional_items (CONVENCIONES-DATOS), como Nacional 2024-25. Ajuste categoria para mudarla sin cambiarle el signo (to-do 237 f)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2007–08 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## 2006

### Ingresos

```text
2006: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Benfica/relatorio-contas-2005-06.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Benfica/relatorio-contas-2005-06.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Proveitos suplementares | pág. 20, Jev 1 |
| 2 | Subsídios à exploração | pág. 20, Jev 0.97 |
| 3 | Outros proveitos e ganhos operacionais | pág. 20, Jev 1 |
| 4 | Proveitos e ganhos extraordinários | pág. 20, Jev 1 |
| 5 | Receitas de jogos | pág. 30, Jev 1 |
| 6 | Transmissões televisivas | pág. 11, Jev 1 |
| 7 | Patrocínios | pág. 30, Jev 1 |
| 8 | Cessão de exploração do estádio – quotas sócios | pág. 30, precedente |
| 9 | Cativos | pág. 11, Jev 0.92 |
| 10 | Cedência de atletas | pág. 30, precedente |
| 11 | Receitas competições FPF | pág. 11, Jev 1 |
| 12 | Cachet's | pág. 30, Claude 0.92 |
| 13 | Outras | pág. 30, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e serviços externos | pág. 20, Jev 0.98 |
| 2 | Remunerações | pág. 20, precedente |
| 3 | Outros | pág. 20, Jev 0.98 |
| 4 | Amortizações do imobilizado corpóreo e incorpóreo | pág. 20, Jev 0.98 |
| 5 | Ajustamentos | pág. 20, precedente |
| 6 | Provisões | pág. 20, Claude 0.85 |
| 7 | Impostos | pág. 20, Jev 0.96 |
| 8 | Outros custos e perdas operacionais | pág. 20, Jev 1 |
| 9 | Custos e perdas extraordinários | pág. 20, Jev 0.95 |

### Meta

```text
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): estado = b9. localizar.mjs dudó de la fecha y no eligió estado, pero el informe es del ejercicio 2005/2006 (cierre 31/07/2006) y trae la Demonstração dos Resultados por naturezas en euros, individual (la SAD no consolidaba).
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): reportType = official_balance_sheet. Relatório e contas anual del ejercicio 1/8/2005-31/7/2006, no un intermedio.
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 11.687.937. Claude 2026-10-16 (lote 84): la nota 44 abre 'Prestações de serviços' (38.644.161) en 9 filas que suman exacto; la verificación no la abría (como Benfica 2006-07, que sí la abre con la misma nota)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 7.625.000. Claude 2026-10-16 (lote 84): la nota 44 abre 'Prestações de serviços' (38.644.161) en 9 filas que suman exacto; la verificación no la abría (como Benfica 2006-07, que sí la abre con la misma nota)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 8.132.840. Claude 2026-10-16 (lote 84): la nota 44 abre 'Prestações de serviços' (38.644.161) en 9 filas que suman exacto; la verificación no la abría (como Benfica 2006-07, que sí la abre con la misma nota)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 6.542.049. Claude 2026-10-16 (lote 84): la nota 44 abre 'Prestações de serviços' (38.644.161) en 9 filas que suman exacto; la verificación no la abría (como Benfica 2006-07, que sí la abre con la misma nota)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 2.482.822. Claude 2026-10-16 (lote 84): la nota 44 abre 'Prestações de serviços' (38.644.161) en 9 filas que suman exacto; la verificación no la abría (como Benfica 2006-07, que sí la abre con la misma nota)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 1.471.521. Claude 2026-10-16 (lote 84): la nota 44 abre 'Prestações de serviços' (38.644.161) en 9 filas que suman exacto; la verificación no la abría (como Benfica 2006-07, que sí la abre con la misma nota)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 349.321. Claude 2026-10-16 (lote 84): la nota 44 abre 'Prestações de serviços' (38.644.161) en 9 filas que suman exacto; la verificación no la abría (como Benfica 2006-07, que sí la abre con la misma nota)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 250.000. Claude 2026-10-16 (lote 84): la nota 44 abre 'Prestações de serviços' (38.644.161) en 9 filas que suman exacto; la verificación no la abría (como Benfica 2006-07, que sí la abre con la misma nota)
2006: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 102.671. Claude 2026-10-16 (lote 84): la nota 44 abre 'Prestações de serviços' (38.644.161) en 9 filas que suman exacto; la verificación no la abría (como Benfica 2006-07, que sí la abre con la misma nota)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2005–06 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Benfica".
```

## Fuentes

### benfica-pt-relatorio-contas-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-prestacao-contas-2010-11-11

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/prestacao-contas-2010-11-11.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-relatorio-contas-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### benfica-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### benfica-pt-relatorio-contas-2022-23-pos-ag

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2022-23-pos-AG.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### benfica-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### benfica-pt-relatorio-contas-2024-25-pos-ag

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2024-25-pos-AG.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### benfica-pt-relatorio-contas-2017-18

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-prestacao-contas-2009-11-03

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/prestacao-contas-2009-11-03.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-relatorio-contas-2011-12

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2011-12.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-relatorio-contas-2013-14-pos-ag

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2013-14-pos-AG.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-relatorio-contas-2015-16

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-relatorio-contas-2016-17-pos-ag

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2016-17-pos-AG.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-relatorio-contas-2025-26

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2025-26.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### benfica-pt-relatorio-contas-2012-13-pos-ag

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2012-13-pos-AG.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-relatorio-contas-2019-20-pos-ag

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2019-20-pos-AG.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### benfica-pt-relatorio-contas-2006-07

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2006-07.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### benfica-pt-relatorio-contas-2005-06

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2005-06.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### benfica-pt-relatorio-contas-2007-08

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Benfica/relatorio-contas-2007-08.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
