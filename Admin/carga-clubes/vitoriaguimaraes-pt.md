# vitoriaguimaraes-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/vitoriaguimaraes-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Vitória Guimarães: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Vitória Guimarães/relatorio-contas-2023-24.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Portugal/Vitória Guimarães.md; tools/cargar-lote.mjs).
```

```text
data/pt/vitoriaguimaraes-pt-data.js — Vitória Sport Clube – Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Vitória Guimarães/relatorio-contas-2023-24.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "vitoriaguimaraes-pt" — slug de "Vitória Guimarães" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Vitória Sport Clube – Futebol, SAD" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el alta abrevia 'Vitória SC'; la raz
  displayName        ok        "Vitória Guimarães" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro no
  sport              ok        "futbol" — el .md nombra el fútbol 46 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el docum
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): e
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): criterio del proyecto: entidad indiv
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "vitoriaguimaraes-pt-relatorio-contas-2023-24" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Vitória de Guimarães" = "Vitória Gu

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"vitoriaguimaraes-pt-relatorio-contas-2023-24"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Vitória Guimarães/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Vitória Guimarães/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de mercadorias | pág. 50, Jev 0.98 |
| 2 | Bilheteira/Quotização/Pack Socio | pág. 50, precedente |
| 3 | Premios competições nacionais e UEFA | pág. 50, Jev 1 |
| 4 | Publicidade/Patrocinios | pág. 50, Jev 1 |
| 5 | Direitos Televisivos | pág. 50, Jev 1 |
| 6 | Mecanismo Solidariedade | pág. 50, Jev 0.92 |
| 7 | Outros | pág. 50, precedente |
| 8 | Federação Portuguesa de Futebol | pág. 50, precedente |
| 9 | Outras Entidades (IEFP) | pág. 50, Claude 0.8 |
| 10 | Seguros - indemnizações | pág. 53, Jev 1 |
| 11 | Outros rendimentos Suplementares | pág. 53, Jev 0.99 |
| 12 | Compensação Financeira | pág. 53, precedente |
| 13 | Cedencia Jogadores | pág. 53, Jev 1 |
| 14 | Descontos pronto pagamento obtidos | pág. 53, Jev 1 |
| 15 | Ganhos em inventarios | pág. 53, Jev 0.98 |
| 16 | Rendimentos e ganhos em investimentos | pág. 53, precedente |
| 17 | Outros | pág. 53, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 25, Claude 0.8 |
| 2 | Trabalhos especializados | pág. 51, Jev 0.95 |
| 3 | Publicidade e propaganda | pág. 51, Jev 1 |
| 4 | Vigilância e segurança | pág. 51, Jev 0.92 |
| 5 | Honorários | pág. 51, Jev 1 |
| 6 | Comissões | pág. 51, precedente |
| 7 | Conservação e reparação | pág. 51, Jev 0.93 |
| 8 | Despesas com Provas | pág. 51, Jev 1 |
| 9 | Prospecção; Empréstimos; | pág. 51, precedente |
| 10 | Ferramentas, utensílios desgaste rápido | pág. 51, Jev 0.92 |
| 11 | Material de escritório | pág. 51, Jev 1 |
| 12 | Artigos para oferta | pág. 51, precedente |
| 13 | Material Desportivo | pág. 51, precedente |
| 14 | Eletricidade | pág. 51, Jev 0.99 |
| 15 | Combustíveis | pág. 51, Jev 1 |
| 16 | Água | pág. 51, Jev 0.97 |
| 17 | Outros Fluidos | pág. 51, precedente |
| 18 | Deslocações e estadas | pág. 51, Jev 0.95 |
| 19 | Transportes de mercadorias | pág. 51, precedente |
| 20 | Rendas e alugueres | pág. 51, precedente |
| 21 | Comunicação | pág. 51, Jev 1 |
| 22 | Seguros | pág. 51, Jev 0.91 |
| 23 | Contencioso e notariado | pág. 51, Jev 0.99 |
| 24 | Despesas de Representação | pág. 51, Jev 0.99 |
| 25 | Limpeza, higiene e conforto | pág. 51, Jev 0.99 |
| 26 | Outros serviços | pág. 51, precedente |
| 27 | Pessoal VSC ao serviço SAD | pág. 51, precedente |
| 28 | Remuneração Administração | pág. 52, Jev 1 |
| 29 | Remuneração pessoal administrativo | pág. 52, Jev 0.99 |
| 30 | Remuneração treinadores | pág. 52, Claude 0.85 |
| 31 | Remuneração jogadores | pág. 52, Jev 1 |
| 32 | Encargos com remunerações | pág. 52, precedente |
| 33 | Seguro acidentes trabalho | pág. 52, precedente |
| 34 | Outros gastos pessoal | pág. 52, precedente |
| 35 | Imparidade de dívidas a receber | pág. 25, Jev 1 |
| 36 | Imparidade de inventarios | pág. 25, Jev 1 |
| 37 | Provisões (aumentos/reduções) | pág. 25, Jev 0.9 |
| 38 | Impostos | pág. 53, Jev 0.99 |
| 39 | Descontos pronto pagamento concedidos | pág. 53, Jev 0.99 |
| 40 | Gastos, perdas em investimento não financeiros | pág. 53, Jev 0.96 |
| 41 | Correções relativas a exercicios anteriores | pág. 53, Claude 0.8 |
| 42 | Donativos | pág. 53, Jev 1 |
| 43 | Quotizações (liga) | pág. 53, precedente |
| 44 | Multas | pág. 53, precedente |
| 45 | Outros | pág. 53, Jev 1 |
| 46 | Equipamento básico | pág. 54, Jev 0.91 |
| 47 | Equipamento de transporte | pág. 54, Claude 0.9 |
| 48 | Equipamento administrativo | pág. 54, Claude 0.9 |
| 49 | Outros ativos fixos tangíveis | pág. 54, Claude 0.9 |
| 50 | Passes jogadores | pág. 54, Jev 0.98 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = player_sales. Claude 2026-10-15 (lote 76): la nota 19 dice que 'inclui rendimentos relativos a alienação de direitos económicos e desportivos de jogadores' (L1976; mais-valias 26.074.589 €); el informe de gestión, mais-valias de 27,5 M por Jota Silva, Alberto Costa, Kaio César y Manu Silva (L128). Formato SNC (to-do 237 h), mismo criterio que la SAD 2021-22
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Financiamentos obtidos" pág. 24 + "Financiamentos obtidos" pág. 24
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 2 (compuerta: documento anterior): "Caixa e depósitos bancários" pág. 24
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Vitória de Guimarães" = "Vitória Guimarães".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Vitória Guimarães/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Vitória Guimarães/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de mercadorias | pág. 53, Jev 0.98 |
| 2 | Bilheteira/Quotização/Pack Sócio | pág. 53, precedente |
| 3 | Premios competições nacionais e UEFA | pág. 53, Jev 1 |
| 4 | Publicidade/Patrocínios | pág. 53, Jev 1 |
| 5 | Direitos Televisivos | pág. 53, Jev 1 |
| 6 | Mecanismo Solidariedade | pág. 53, Jev 0.92 |
| 7 | Outros | pág. 53, precedente |
| 8 | Federação Portuguesa de Futebol | pág. 53, precedente |
| 9 | Liga Portuguesa Futebol | pág. 53, precedente |
| 10 | Outras Entidades | pág. 53, Jev 0.96 |
| 11 | Seguros – indemnizações | pág. 56, Jev 1 |
| 12 | Outros rendimentos Suplementares | pág. 56, Jev 0.99 |
| 13 | Compensação Financeira | pág. 56, precedente |
| 14 | Cedencia Jogadores | pág. 56, Jev 1 |
| 15 | Descontos pronto pagamento obtidos | pág. 56, Jev 1 |
| 16 | Ganhos em inventarios | pág. 56, Jev 0.98 |
| 17 | Rendimentos e ganhos em investimentos | pág. 56, precedente |
| 18 | Outros | pág. 56, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 29, Claude 0.8 |
| 2 | Trabalhos especializados | pág. 54, Jev 0.95 |
| 3 | Publicidade e propaganda | pág. 54, Jev 1 |
| 4 | Vigilância e segurança | pág. 54, Jev 0.92 |
| 5 | Honorários | pág. 54, Jev 1 |
| 6 | Comissões | pág. 54, precedente |
| 7 | Conservação e reparação | pág. 54, Jev 0.93 |
| 8 | Despesas com Provas | pág. 54, Jev 1 |
| 9 | Prospecção; Empréstimos; | pág. 54, precedente |
| 10 | Ferramentas, utensílios desgaste rápido | pág. 54, Jev 0.92 |
| 11 | Livros documentação técnica | pág. 54, Jev 1 |
| 12 | Material de escritório | pág. 54, Jev 1 |
| 13 | Artigos para oferta | pág. 54, precedente |
| 14 | Material Desportivo | pág. 54, precedente |
| 15 | Eletricidade | pág. 54, Jev 0.99 |
| 16 | Combustíveis | pág. 54, Jev 1 |
| 17 | Água | pág. 54, Jev 0.97 |
| 18 | Outros Fluidos | pág. 54, precedente |
| 19 | Deslocações e estadas | pág. 54, Jev 0.95 |
| 20 | Transportes de mercadorias | pág. 54, precedente |
| 21 | Rendas e alugueres | pág. 54, precedente |
| 22 | Comunicação | pág. 54, Jev 1 |
| 23 | Seguros | pág. 54, Jev 0.91 |
| 24 | Contencioso e notariado | pág. 54, Jev 0.99 |
| 25 | Despesas de Representação | pág. 54, Jev 0.99 |
| 26 | Limpeza, higiene e conforto | pág. 54, Jev 0.99 |
| 27 | Outros serviços | pág. 54, precedente |
| 28 | Pessoal VSC ao serviço SAD | pág. 54, precedente |
| 29 | Remuneração Administração | pág. 55, Jev 1 |
| 30 | Remuneração pessoal administrativo | pág. 55, Jev 0.99 |
| 31 | Remuneração treinadores | pág. 55, Claude 0.85 |
| 32 | Remuneração jogadores | pág. 55, Jev 1 |
| 33 | Encargos com remunerações | pág. 55, precedente |
| 34 | Seguro acidentes trabalho | pág. 55, precedente |
| 35 | Outros gastos pessoal | pág. 55, precedente |
| 36 | Imparidade de dividas a receber | pág. 29, Jev 1 |
| 37 | Imparidade de inventarios | pág. 29, Jev 1 |
| 38 | Provisões (aumentos/reduções) | pág. 29, Jev 0.9 |
| 39 | Impostos | pág. 56, Jev 0.99 |
| 40 | Descontos pronto pagamento concedidos | pág. 56, Jev 0.99 |
| 41 | Gastos, perdas em investimento não financeiros | pág. 56, Jev 0.96 |
| 42 | Correções relativas a exercícios anteriores | pág. 56, Claude 0.8 |
| 43 | Donativos | pág. 56, Jev 1 |
| 44 | Quotizações | pág. 56, precedente |
| 45 | Multas | pág. 56, precedente |
| 46 | Outros | pág. 56, Jev 1 |
| 47 | Equipamento básico | pág. 57, Jev 0.91 |
| 48 | Equipamento de transporte | pág. 57, precedente |
| 49 | Equipamento administrativo | pág. 57, precedente |
| 50 | Outros ativos fixos tangíveis | pág. 57, precedente |
| 51 | Passes jogadores | pág. 57, Jev 0.98 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2024-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 28 + "Financiamentos obtidos" pág. 28
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 28
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Vitória de Guimarães" = "Vitória Guimarães".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Vitória Guimarães/wf-src-Relatorio-e-Contas-2021-22-SAD.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Vitória Guimarães/wf-src-Relatorio-e-Contas-2021-22-SAD.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Federação Portuguesa de Futebol | pág. 78, precedente |
| 2 | Liga Portuguesa Futebol | pág. 78, precedente |
| 3 | Outras Entidades | pág. 78, Jev 0.96 |
| 4 | Rendimentos suplementares | pág. 82, Jev 0.99 |
| 5 | Descontos pronto pagamento obtidos | pág. 82, Jev 1 |
| 6 | Ganhos em inventários | pág. 82, Jev 0.98 |
| 7 | Rendimentos e ganhos em investimentos | pág. 82, precedente |
| 8 | Outros | pág. 82, precedente |
| 9 | Bilheteira/ Quotização/ Pack sócio | pág. 77, precedente |
| 10 | Prémios competições nacionais e UEFA | pág. 77, precedente |
| 11 | Publicidade/ patrocínios | pág. 77, precedente |
| 12 | Direitos televisivos | pág. 77, precedente |
| 13 | Outros | pág. 77, precedente |
| 14 | Venda de mercadorias | pág. 77, Jev 0.98 |
| 15 | Outros | pág. 83, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo de mercadorias vendidas e das matérias consumidas | pág. 25, Jev 0.95 |
| 2 | Trabalhos especializados | pág. 79, Jev 0.95 |
| 3 | Publicidade e propaganda | pág. 79, Jev 1 |
| 4 | Vigilância e segurança | pág. 79, Jev 0.92 |
| 5 | Honorários | pág. 79, Jev 1 |
| 6 | Comissões | pág. 79, precedente |
| 7 | Conservação e reparação | pág. 79, Jev 0.93 |
| 8 | Despesas com Provas | pág. 79, Jev 1 |
| 9 | Prospeção; Empréstimos; | pág. 79, precedente |
| 10 | Ferramentas, utensílios desgaste rápido | pág. 79, Jev 0.92 |
| 11 | Material de escritório | pág. 79, Jev 1 |
| 12 | Artigos para oferta | pág. 79, precedente |
| 13 | Material Desportivo | pág. 79, precedente |
| 14 | Eletricidade | pág. 79, Jev 0.99 |
| 15 | Combustíveis | pág. 79, Jev 1 |
| 16 | Água | pág. 79, Jev 0.97 |
| 17 | Outros Fluidos | pág. 79, precedente |
| 18 | Deslocações e estadas | pág. 79, Jev 0.95 |
| 19 | Transportes de mercadorias | pág. 79, precedente |
| 20 | Rendas e alugueres | pág. 79, precedente |
| 21 | Comunicação | pág. 79, Jev 1 |
| 22 | Seguros | pág. 79, Jev 0.91 |
| 23 | Contencioso e notariado | pág. 79, Jev 0.99 |
| 24 | Despesas de representação | pág. 79, Jev 0.99 |
| 25 | Limpeza, higiene e conforto | pág. 79, Jev 0.99 |
| 26 | Outros serviços | pág. 79, precedente |
| 27 | Pessoal VSC ao serviço SAD | pág. 79, precedente |
| 28 | Remuneração administração | pág. 81, Jev 1 |
| 29 | Remuneração pessoal administrativo | pág. 81, Jev 0.99 |
| 30 | Remuneração treinadores | pág. 81, Claude 0.85 |
| 31 | Remuneração jogadores | pág. 81, Jev 1 |
| 32 | Remuneração pessoal apoio ao futebol profissional | pág. 81, precedente |
| 33 | Encargos com remunerações | pág. 81, precedente |
| 34 | Seguro acidentes trabalho | pág. 81, precedente |
| 35 | Outros gastos pessoal | pág. 81, precedente |
| 36 | Clientes | pág. 85, precedente |
| 37 | Outras contas a receber | pág. 85, precedente |
| 38 | Provisões (aumentos/reduções) | pág. 25, Jev 0.9 |
| 39 | Impostos | pág. 83, Jev 0.99 |
| 40 | Gastos, perdas em investimento não financeiros | pág. 83, Jev 0.96 |
| 41 | Correções relativas a exercícios anteriores | pág. 83, Claude 0.8 |
| 42 | Donativos | pág. 83, Jev 1 |
| 43 | Quotizações | pág. 83, precedente |
| 44 | Multas | pág. 83, precedente |
| 45 | Gastos/reversões de depreciação e amortização | pág. 25, Jev 0.91 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2022-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2022-06-30 (espejo del informe de la SAD 2021-22)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 1 275 427,61. Claude 2026-10-15 (lote 76): la nota 16 abre 'Prestação de serviços' (10 531 656,06, L1896) en cinco sub-rubricas (L1905-1909) que la extracción no abrió; sin el desglose, la TV (6,92 M) quedaba como otros ingresos
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 743 007,66. Claude 2026-10-15 (lote 76): la nota 16 abre 'Prestação de serviços' (10 531 656,06, L1896) en cinco sub-rubricas (L1905-1909) que la extracción no abrió; sin el desglose, la TV (6,92 M) quedaba como otros ingresos
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 1 529 770,28. Claude 2026-10-15 (lote 76): la nota 16 abre 'Prestação de serviços' (10 531 656,06, L1896) en cinco sub-rubricas (L1905-1909) que la extracción no abrió; sin el desglose, la TV (6,92 M) quedaba como otros ingresos
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 6 922 619,12. Claude 2026-10-15 (lote 76): 'Vendas e serviços prestados' del estado (11 285 014,14, L590) se reemplaza por sus seis partes de la nota 16: Venda de mercadorias (L1895) y las cinco sub-rubricas de Prestação de serviços (L1905-1909). Reemplazar 'Prestação de serviços' no alcanzaba: en la lectura 5 entra después, al abrir el renglón con su nota
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 60 831,39. Claude 2026-10-15 (lote 76): la nota 16 abre 'Prestação de serviços' (10 531 656,06, L1896) en cinco sub-rubricas (L1905-1909) que la extracción no abrió; sin el desglose, la TV (6,92 M) quedaba como otros ingresos
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = matchday_competition. Claude 2026-10-15 (lote 76): taquilla, cuotas y pack de socio que paga el club (como 2025)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = competition_bonus. Claude 2026-10-15 (lote 76): premios de competiciones
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = sponsorship_commercial. Claude 2026-10-15 (lote 76): publicidad y patrocinios
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = broadcasting. Claude 2026-10-15 (lote 76): derechos de TV
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = other_income. Claude 2026-10-15 (lote 76): residual de prestación de servicios y de otros rendimientos
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = player_sales. Claude 2026-10-15 (lote 76): la nota dice que 'inclui rendimentos relativos a alienação de direitos económicos e desportivos de jogadores' (L2090); el informe de gestión: 'Alienação de jogadores ... com uma mais-valia superior a 16M' (L459). Formato SNC (to-do 237 h)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = other_expenses. Claude 2026-10-15 (lote 76): imparidad de deudores, como Moreirense y Rio Ave
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = other_expenses. Claude 2026-10-15 (lote 76): reversión de imparidad de deudores (+102 150,01), como Moreirense y Rio Ave
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 753 358,08. Claude 2026-10-15 (lote 76): 'Vendas e serviços prestados' del estado (11 285 014,14, L590) se reemplaza por sus seis partes de la nota 16: Venda de mercadorias (L1895) y las cinco sub-rubricas de Prestação de serviços (L1905-1909). Reemplazar 'Prestação de serviços' no alcanzaba: en la lectura 5 entra después, al abrir el renglón con su nota
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: documento anterior): "Financiamentos obtidos" pág. 24 + "Financiamentos obtidos" pág. 24; cash escalón 1 (compuerta: documento anterior): "Caixa e depósitos bancários" pág. 24
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Vitória de Guimarães" = "Vitória Guimarães".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Vitória Guimarães/relatorio-contas-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Vitória Guimarães/relatorio-contas-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos Televisivos | pág. 18, precedente |
| 2 | Merchandising | pág. 18, Jev 1 |
| 3 | Quotização e Camarotes | pág. 18, precedente |
| 4 | Patrocínios | pág. 18, Jev 1 |
| 5 | Prémios | pág. 18, Jev 0.99 |
| 6 | Outros Proveitos | pág. 18, Jev 0.95 |
| 7 | Federação Portuguesa de Futebol | pág. 62, precedente |
| 8 | Outras Entidades | pág. 62, precedente |
| 9 | Rendimentos suplementares | pág. 73, precedente |
| 10 | Descontos pronto pagamento obtidos | pág. 73, precedente |
| 11 | Ganhos em inventarios | pág. 73, precedente |
| 12 | Rendimentos e ganhos em investimentos | pág. 73, precedente |
| 13 | Outros | pág. 73, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo de mercadorias vendidas e das matérias consumidas | pág. 27, precedente |
| 2 | Trabalhos especializados | pág. 72, precedente |
| 3 | Publicidade e propaganda | pág. 72, precedente |
| 4 | Vigilância e segurança | pág. 72, precedente |
| 5 | Honorários | pág. 72, precedente |
| 6 | Comissões | pág. 72, precedente |
| 7 | Conservação e reparação | pág. 72, precedente |
| 8 | Despesas com Provas | pág. 72, precedente |
| 9 | Prospecção; Empréstimos; | pág. 72, precedente |
| 10 | Ferramentas, utensílios desgaste rápido | pág. 72, precedente |
| 11 | Livros documentação técnica | pág. 72, precedente |
| 12 | Material de escritório | pág. 72, precedente |
| 13 | Artigos para oferta | pág. 72, precedente |
| 14 | Material Desportivo | pág. 72, precedente |
| 15 | Eletricidade | pág. 72, precedente |
| 16 | Combustíveis | pág. 72, precedente |
| 17 | Água | pág. 72, precedente |
| 18 | Outros Fluidos | pág. 72, precedente |
| 19 | Deslocações e estadas | pág. 72, precedente |
| 20 | Transportes de mercadorias | pág. 72, precedente |
| 21 | Rendas e alugueres | pág. 72, precedente |
| 22 | Comunicação | pág. 72, precedente |
| 23 | Seguros | pág. 72, precedente |
| 24 | Contencioso e notariado | pág. 72, precedente |
| 25 | Limpeza, higiene e conforto | pág. 72, precedente |
| 26 | Outros serviços | pág. 72, precedente |
| 27 | Pessoal VSC ao serviço SAD | pág. 72, precedente |
| 28 | Remuneração Administração | pág. 70, precedente |
| 29 | Remuneração pessoal administrativo | pág. 70, precedente |
| 30 | Remuneração treinadores | pág. 70, precedente |
| 31 | Remuneração jogadores | pág. 70, precedente |
| 32 | Encargos com remunerações | pág. 70, precedente |
| 33 | Seguro acidentes trabalho | pág. 70, precedente |
| 34 | Outros gastos pessoal | pág. 70, precedente |
| 35 | Imparidade de dívidas a receber | pág. 27, precedente |
| 36 | Imparidade de invantários | pág. 27, precedente |
| 37 | Provisões (aumentos/reduções) | pág. 27, precedente |
| 38 | Impostos | pág. 73, precedente |
| 39 | Descontos pronto pagamento concedidos | pág. 73, precedente |
| 40 | Gastos, perdas em investimento não financeiros | pág. 73, precedente |
| 41 | Correções relativas a exercicios anteriores | pág. 73, precedente |
| 42 | Donativos | pág. 73, precedente |
| 43 | Quotizações | pág. 73, precedente |
| 44 | Multas | pág. 73, precedente |
| 45 | Outros | pág. 73, precedente |
| 46 | Gastos/reversões de depreciação e amortização | pág. 27, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2021-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2021-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 26 + "Financiamentos obtidos" pág. 26; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 26
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2020–21 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Vitória de Guimarães" = "Vitória Guimarães".
```

## Fuentes

### vitoriaguimaraes-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Vitória Guimarães/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vitoriaguimaraes-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Vitória Guimarães/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vitoriaguimaraes-pt-wf-src-relatorio-e-contas-2021-22-sad

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Vitória Guimarães/wf-src-Relatorio-e-Contas-2021-22-SAD.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vitoriaguimaraes-pt-relatorio-contas-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Vitória Guimarães/relatorio-contas-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
