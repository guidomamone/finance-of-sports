# mafra-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/mafra-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Mafra: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.pdf. brandColor #008000
(procedencia en Admin/sourcing/Portugal/Mafra.md; tools/cargar-lote.mjs).
```

```text
data/pt/mafra-pt-data.js — Clube Desportivo de Mafra – Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "mafra-pt" — slug de "Mafra" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Clube Desportivo de Mafra – Futebol, SAD" — respuesta de Guido en la cola (17e47fe)
  displayName        ok        "Mafra" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (13 de 13 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 45 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (13 de 13 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "mafra-pt-prestacao-contas-epoca-2023-2024-final" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Mafra"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"mafra-pt-prestacao-contas-epoca-2023-2024-final"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subsídios à exploração | pág. 16, Jev 0.97 |
| 2 | Variação nos inventários da produção | pág. 16, Jev 0.99 |
| 3 | Trabalhos para a própria entidade | pág. 16, Jev 1 |
| 4 | Rendimentos Suplementares | pág. 27, Jev 0.99 |
| 5 | Correção Exercícios Anteriores | pág. 27, Jev 1 |
| 6 | Rendimentos com transferências de direitos de atletas | pág. 27, Jev 1 |
| 7 | Outros (resto) | pág. 27, Jev 0.97 |
| 8 | Receitas de bilheteira | pág. 36, Jev 1 |
| 9 | Patrocínios, publicidade e corporate | pág. 36, Jev 1 |
| 10 | Receitas de televisão | pág. 36, Jev 1 |
| 11 | Merchandising | pág. 36, Jev 1 |
| 12 | Competições da UEFA e nacionais | pág. 36, Jev 1 |
| 13 | Outros rendimentos operacionais | pág. 36, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 16, Jev 0.98 |
| 2 | Trabalhos Especializados | pág. 32, Jev 0.99 |
| 3 | Publicidade e Propaganda | pág. 32, Jev 1 |
| 4 | Vigilância e Segurança | pág. 32, Jev 0.97 |
| 5 | Comissões | pág. 32, Jev 0.95 |
| 6 | Conservação e Reparação | pág. 32, Jev 0.99 |
| 7 | Ferramentas e Utens. Desg. Rápido | pág. 32, Jev 0.99 |
| 8 | Material de Escritório | pág. 32, Jev 1 |
| 9 | Artigos para Oferta | pág. 32, Jev 0.98 |
| 10 | Equipamentos Desportivos | pág. 32, Jev 0.99 |
| 11 | Eletricidade | pág. 32, Jev 1 |
| 12 | Combustíveis | pág. 32, Jev 0.99 |
| 13 | Água | pág. 32, Jev 1 |
| 14 | Outros | pág. 32, precedente |
| 15 | Deslocações e Estadas | pág. 32, Jev 1 |
| 16 | Transporte de Pessoal | pág. 32, precedente |
| 17 | Rendas e Alugueres | pág. 32, precedente |
| 18 | Comunicação | pág. 32, Jev 1 |
| 19 | Seguros | pág. 32, Claude 0.8 |
| 20 | Contencioso e Notariado | pág. 32, Jev 1 |
| 21 | Limpeza, Higiene e Conforto | pág. 32, Jev 1 |
| 22 | Outros Serviços | pág. 32, Jev 1 |
| 23 | Remunerações do pessoal | pág. 31, Claude 0.8 |
| 24 | Encargos sobre remunerações | pág. 31, Jev 0.97 |
| 25 | Seguros AT e doenças profissionais | pág. 31, Jev 0.9 |
| 26 | Outros gastos com pessoal: | pág. 31, precedente |
| 27 | Ajustamentos de inventários (perdas/reversões) | pág. 16, Jev 1 |
| 28 | Imparidade de dívidas a receber (perdas/reversões) | pág. 16, Jev 1 |
| 29 | Provisões (aumentos/reduções) | pág. 16, precedente |
| 30 | Outras imparidades (perdas/reversões) | pág. 16, Jev 0.91 |
| 31 | Impostos Indiretos | pág. 33, Jev 1 |
| 32 | Taxas | pág. 33, Jev 0.9 |
| 33 | Descontos de Pronto Pagamento Obtidos | pág. 33, Jev 0.9 |
| 34 | Correções Relativas Exercisio Anteriores | pág. 33, Jev 1 |
| 35 | Donativos | pág. 33, Jev 0.99 |
| 36 | Quotizações | pág. 33, precedente |
| 37 | Insuficiência de Estimativa para Impostos | pág. 33, Jev 0.99 |
| 38 | Outros não especificados | pág. 33, Jev 1 |
| 39 | Gastos/reversões de depreciação e de amortização | pág. 16, Jev 0.96 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 2.300.000,00. 'Outros' 2.304.155,62 de Outros rendimentos (L1001) es 2.300.000 de venta de jugadores (Anexo 3: transacciones de atletas 1.954.064,13 = 2.300.000 − 345.935,87 de amortización) más 4.155,62.
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 4.155,62. Resto de 'Outros' (L1001) después de separar la venta de jugadores: 2.304.155,62 − 2.300.000,00.
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 25.811,26. Vendas e serviços prestados se abre con el Anexo 3 (formato UEFA), que cierra exacto; evita el reintento pago por TV y estadio en 0.
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 146.869,92. Parte de Vendas e serviços prestados (Anexo 3).
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 450.000,00. Parte de Vendas e serviços prestados (Anexo 3).
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 682,17. Parte de Vendas e serviços prestados (Anexo 3).
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 15.353,07. Parte de Vendas e serviços prestados (Anexo 3).
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 636.427,41. Parte de Vendas e serviços prestados (Anexo 3).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Financiamentos obtidos" no corriente 900.000,00 + corriente 1.845.454,31 (la IA daba esto; Jev 8,28 M); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17: sin año vecino que confirme (to-do 260 c), leído a mano en el balance: "Caixa e depósitos bancários"
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Mafra".
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-17/resultado-20.json, tools/gestiones-tanda.mjs, 2026-10-17):_

```text
Antonino da Costa Florindo (1995-01-01 a hoy): Conocido como José Cristo. Record ('José Cristo avança para novo mandato', marzo 2025) dice que preside el Mafra 'há 30 anos, desde 1995'; solo da el año, por eso desde = 1995-01-01 (día y mes 01 por convención). Reelecto en la asamblea del 28/3/2025 para el triénio 2025/2027 (jornaldemafra.pt; órgãos sociais en cdmafra.com/pt/orgaos-sociais: Presidente da Direção). Sigue en el cargo (hasta null). Tras la venta del 80% de la SAD (agosto de 2023, Record 19/8/2023) se mantuvo como presidente del club y administrador de la SAD. El balance 2023/24 lo corrobora: 'Conselho de Administração, Presidente: Antonino da Costa Florindo' (Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md:46), mensaje del presidente firmado por él (:69-75) y firma 'Antonino Florindo (José Cristo), Presidente do Conselho de Administração' (:122-123). El mismo md (:161) da la estructura de la SAD: Football Collective A/S 80%, Footclub Investments SGPS 10%, club 10%. Cierre 30/6/2024 dentro de su gestión; no hubo cambio de gestión entre cierre y aprobación.
Duda: El año de inicio (1995) sale de un medio y de un comunicado del club reproducido por jornaldemafra.pt; otro Record (7/10/2022) dice 'más de 30 años' y el club lo ubica como dirigente desde 1986. No afecta al cierre 30/6/2024.
Duda: El dueño de la SAD es una sociedad danesa (The Football Collective A/S, citada también como Heartland por Record); no se cargó persona dueña porque no hay una que conduzca con nombre. Ove Pedersen y Kenneth Andersen figuran como vogais del conselho de administração / gestores ejecutivos, no como presidentes.
```

## Fuentes

### mafra-pt-prestacao-contas-epoca-2023-2024-final

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
