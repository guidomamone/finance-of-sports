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
