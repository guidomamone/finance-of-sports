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
| 17 | Rendimentos e ganhos em investimentos | pág. 56, Jev 1 |
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

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Vitória de Guimarães" = "Vitória Guimarães".
```

## Fuentes

### vitoriaguimaraes-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Vitória Guimarães/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
