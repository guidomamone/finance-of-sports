# ituano — evidencia de carga

Lo que había como comentario en `data/br/ituano-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/ituano-data.js — Ituano Futebol Clube (Itu, SP, Brasil).
NO es SAF: sigue siendo una associação/clube tradicional (el Patrimônio
Líquido se compone de "Patrimonio Social" + reservas, no de capital social).
Ejercicio social = ANO CALENDÁRIO (1/1/2024 a 31/12/2024), ver
`fiscalYearStart:'01-01'` en data/clubs.js. 1 ejercicio cargado: 2024.

FUENTE: `Clubes/Brasil/Ituano/relatorio-auditoria-2024.pdf` (17 páginas,
texto nativo, vía pdftotext -layout), transcripción completa en
`relatorio-auditoria-2024.md` en la misma carpeta. Trae Balanço Patrimonial,
DRE, Mutações do PL, Fluxos de Caixa y Notas Explicativas — a diferencia del
documento de Mirassol (ver data/br/mirassol-data.js), acá SÍ están las
demonstrações completas, con la DRE desglosada línea por línea.

EJERCICIO EN DÉFICIT: R$ (7.063.131,20). Los 4 subtotales de la DRE y el
resultado final cierran EXACTO contra la suma de sus propias líneas (ver la
tabla de verificación al final de la transcripción). Ninguna inconsistencia
encontrada en el documento.

ESCALA: el documento está en reales enteros con centavos ("Valores expressos
em reais"), NO en miles. Acá se guardan en MILLONES de BRL nativos, mismo
criterio que el resto del sitio: cada valor se dividió por 1.000.000.

Categorización (DRE, pág. 6 del PDF):
- 'Sócio Torcedor' (ingreso) -> member_dues. OJO: hay un 'Sócio Torcedor'
  NEGATIVO dentro de DESPESAS ADMINISTRATIVAS (el costo de atender al programa
  de socios), cargado aparte como admin_general_expense — mismo criterio que
  'Ingressos a Sócios' de Grêmio. No se netearon entre sí: el documento los
  presenta separados, en bloques distintos.
- 'Direito de Transmissão de TV (FPF/CBF)' -> broadcasting.
- 'Patrocínio e Publicidades' -> sponsorship_commercial.
- 'Arrecadação de Jogos' -> matchday_competition.
- 'Premiações em Campeonatos (FPF)' -> competition_bonus. Está en 0,00 en 2024
  pero se carga igual, como línea propia: el documento la imprime, y una línea
  impresa en cero es un dato (el club no cobró premios), no una ausencia.
- 'Receita com Repasses de Direitos Federativos' -> player_sales, también 0,00
  en 2024, mismo criterio que arriba.
- 'Cessão Temp. Direitos Federativos de Atletas (Empréstimo)' -> player_sales:
  son ingresos por CEDER jugadores a préstamo. No hay categoría propia de
  "loan fees" en category-map.js, y player_sales es lo más cercano
  conceptualmente (ingreso por transferir derechos de un jugador, aunque sea
  temporal). Documentado acá como criterio, no es un dato del documento.
- 'Receita de Incentivos, Doações e Loterias' y 'Outras Receitas' ->
  other_income.
- '(-) Impostos Incidentes s/ Vendas e Serviços' -> other_income NEGATIVO. Es
  una deducción DENTRO del bloque RECEITA del propio documento (impuestos
  sobre ventas/servicios), no un gasto operativo: dejarla acá en negativo es lo
  que hace que la suma de revenueLines dé exacto los 29.239.217,10 que imprime
  el subtotal RECEITA. Mismo criterio que los 'Impostos sobre vendas' que
  Grêmio tiene anidados en su línea de tienda.
- Bloque DESPESAS - FUTEBOL: 'Despesas com Pessoal (Salários e Encargos)' ->
  wages_squad; 'Serviços de Terceiros (Prêmios, Mídia, Serviços de PJ e PF)',
  'Gastos c/ Atletas (Viagens, Uniformes, Taxas CBF-FPF)' y 'Outras Despesas
  (Eventos e Partidas - Estádio e Alojamento)' -> match_organisation_expense
  (mismo criterio que 'Despesas Federações, Imagens, Prêmios, Material
  Esportivo' y 'Despesas de Viagens' de Grêmio); 'Gastos c/ Bens de terceiros
  (Acomodações, Estádio, Energia, Água e Telefone)' -> admin_general_expense
  (servicios e inmuebles, no organización de partidos).
- Bloque DESPESAS ADMINISTRATIVAS completo -> admin_general_expense.
- Bloque RECEITAS E DESPESAS NÃO OPERACIONAIS -> NO va como línea: son
  Receita Financeiras (17.573,58) y Despesas Financeiras (707.832,27), que van
  NETEADAS a `netInterest` (-690.258,69), como manda club-data-mapping
  SKILL.md sección 2.
- 'RECEITAS E DESPESAS OPERACIONAIS' imprime 0,00 y no tiene ninguna línea
  debajo: no se cargó nada por ese bloque.

grossDebt = las 2 únicas líneas de deuda FINANCIERA del passivo: 'Emprestimos'
circulante (1.151.840,48, Nota 18) + 'Emprestimos LP e Antecipação de Direitos'
não circulante (9.695.588,24, Nota 20) = 10.847.428,72. Quedan fuera a
propósito las obligaciones laborales, tributarias, con proveedores y el
Parcelamento de Impostos Federais: son pasivos operativos/fiscales, no deuda
financiera (mismo criterio que Grêmio, ver club-data-mapping/referencia/formato-simplificado.md, "grossDebt").
cash = 'Caixa e Bancos' (Nota 4) = 54.008,22. OJO, cayó desde 1.471.333,83 en
2023: el club cerró 2024 prácticamente sin caja.

FX: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 — misma cotización oficial
del Banco Central do Brasil que ya usan Grêmio y Botafogo para ESE MISMO
cierre. El documento de Ituano no declara ningún tipo de cambio propio.

Gestión: el documento no está firmado por ningún presidente (solo por el
contador y la auditoría). No se confirmó ninguna gestión, se cargó una entrada
genérica, mismo criterio que Once Caldas/Envigado (SKILL.md sección 7).
============================================================================
```

## 2024

### Meta

```text
grossDebt = Emprestimos circulante (1.151840, Nota 18) + Emprestimos LP e
Antecipação de Direitos (9.695588, Nota 20). cash = Caixa e Bancos (Nota 4).
netInterest = bloque "RECEITAS E DESPESAS NÃO OPERACIONAIS" de la DRE:
Receita Financeiras 0.017574 - Despesas Financeiras 0.707832.
officialTotalRevenue = subtotal "RECEITA - FUTEBOL PROFISSIONAL E DE BASE"
impreso (29.239.217,10). officialTotalExpenses = "DESPESAS - FUTEBOL"
(28.635.485,79) + "DESPESAS ADMINISTRATIVAS" (6.976.603,82) = 35.612.089,61.
officialPAT = "(DÉFICIT) OU SUPERÁVIT DO EXERCÍCIO" impreso.
```

## Fuentes

### ituano-relatorio-auditoria-2024

_note (data/):_

```text
PDF oficial (17 páginas, texto nativo) con Balanço Patrimonial al 31/12/2024, DRE, Mutações do Patrimônio Líquido, Fluxos de Caixa y Notas Explicativas. Ituano NO es SAF, sigue siendo associação. Ejercicio 2024 cerrado en DÉFICIT de R$ 7.063.131,20. Los 4 subtotales de la DRE y el resultado final cierran exacto contra la suma de sus propias líneas, sin ninguna inconsistencia. Cifras en reales enteros con centavos (no en miles). grossDebt = las 2 líneas de Emprestimos (Notas 18 y 20), excluidas las obligaciones laborales/tributarias/proveedores. Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Ituano/relatorio-auditoria-2024.md.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub.ituano

```text
El documento solo lo firman el contador y la auditoría, ningún presidente.
```

### memberCountByClub.ituano

```text
no se encontró una cifra confiable en esta sesión
```
