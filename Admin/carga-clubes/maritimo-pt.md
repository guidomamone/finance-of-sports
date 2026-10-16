# maritimo-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/maritimo-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Maritimo: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Portugal/Maritimo.md; tools/cargar-lote.mjs).
```

```text
data/pt/maritimo-pt-data.js — MARÍTIMO DA MADEIRA - Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "maritimo-pt" — slug de "Maritimo" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "MARÍTIMO DA MADEIRA - Futebol, SAD" — la portada y lo más frecuente del .md coinciden (54 veces)
  displayName        ok        "Maritimo" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2025-06-30) y contenido del .md (71 de 71 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 107 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (71 de 71 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "maritimo-pt-futebol-sad-rc-30-06-2025" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Marítimo"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"maritimo-pt-futebol-sad-rc-30-06-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade e patrocínios | pág. 38, Jev 1 |
| 2 | Proveitos de bilheteira | pág. 38, Jev 1 |
| 3 | Subsídios à exploração | pág. 26, Jev 0.99 |
| 4 | Cedências de atletas | pág. 38, Jev 0.97 |
| 5 | Transferências de atletas | pág. 38, Jev 0.99 |
| 6 | Outros | pág. 38, precedente |
| 7 | Verbas LPFP e FPF (Taça da Liga / Taça de Portugal) | pág. 38, Jev 0.92 |
| 8 | Mecanismo de Solidariedade FIFA | pág. 38, Jev 0.94 |
| 9 | Lugares anuais | pág. 38, Jev 1 |
| 10 | Juros | pág. 38, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 49, Jev 0.98 |
| 2 | Deslocações e estadas | pág. 49, Jev 1 |
| 3 | Trabalhos especializados | pág. 49, Jev 0.99 |
| 4 | Vigilância e segurança | pág. 49, Jev 0.95 |
| 5 | Comissões | pág. 49, precedente |
| 6 | Honorários | pág. 49, Jev 1 |
| 7 | Outros serviços | pág. 49, Jev 1 |
| 8 | Conservação e reparação | pág. 49, Jev 0.99 |
| 9 | Energia e fluidos | pág. 49, Jev 1 |
| 10 | Rendas e alugueres | pág. 49, precedente |
| 11 | Comunicação | pág. 49, Jev 1 |
| 12 | Limpeza, higiene e conforto | pág. 49, Jev 1 |
| 13 | Material de escritório | pág. 49, Jev 1 |
| 14 | Contencioso e notariado | pág. 49, Jev 1 |
| 15 | Ferramentas e utensílios de desgaste rápido | pág. 49, Jev 1 |
| 16 | Serviços bancários e financeiros | pág. 49, Jev 0.97 |
| 17 | Seguros | pág. 49, Claude 0.8 |
| 18 | Artigos de oferta | pág. 49, Jev 0.93 |
| 19 | Atletas | pág. 50, Jev 1 |
| 20 | Treinadores | pág. 50, Jev 0.93 |
| 21 | Outro Pessoal | pág. 50, precedente |
| 22 | Órgãos sociais | pág. 50, Jev 0.96 |
| 23 | Seguros | pág. 50, Claude 0.8 |
| 24 | Outros custos | pág. 50, Jev 0.99 |
| 25 | Imparidade de dívidas a receber (perdas/reversões) | pág. 26, Jev 0.98 |
| 26 | Provisões (aumentos/reduções) | pág. 26, Jev 0.99 |
| 27 | Impostos | pág. 50, Jev 0.97 |
| 28 | Gastos e perdas em investimentos não financeiros | pág. 50, Jev 1 |
| 29 | Correções relativas a exercícios anteriores | pág. 50, Jev 1 |
| 30 | Outros | pág. 50, Jev 0.99 |
| 31 | Gastos/reversões de depreciação e de amortização | pág. 26, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 12 719. 'Outros' 176.636 de la nota de réditos se detalla en el texto: verbas LPFP/FPF, solidaridad FIFA y lugares anuais (8.654 + 4.065 + 60.925 + 102.992 = 176.636).
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 60 925. Parte de 'Outros' (L1468) según el texto de la nota.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 102 992. Parte de 'Outros' (L1468): venta de lugares anuais para los partidos del equipo A.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 112 880. Fila de la nota de Outros rendimentos (suma 4.444.586) que la extracción puso como gasto (−112.880); es ingreso (to-do 237 w).
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cero-real = Televisión. El documento no tiene ingresos de TV (subagente Sonnet, revisado por Claude).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Marítimo".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Maritimo/Maritimo-Futebol-SAD_Relatorio-e-Contas-30jun24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Maritimo/Maritimo-Futebol-SAD_Relatorio-e-Contas-30jun24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade e patrocínios | pág. 41, precedente |
| 2 | Proveitos de bilheteira | pág. 41, precedente |
| 3 | Outros | pág. 41, precedente |
| 4 | Subsídios à exploração | pág. 28, precedente |
| 5 | Transferências de atletas | pág. 41, precedente |
| 6 | Cedências de atletas | pág. 41, precedente |
| 7 | Outros | pág. 41, precedente |
| 8 | Juros | pág. 41, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 51, precedente |
| 2 | Deslocações e estadas | pág. 51, precedente |
| 3 | Trabalhos especializados | pág. 51, precedente |
| 4 | Honorários | pág. 51, precedente |
| 5 | Comissões | pág. 51, precedente |
| 6 | Vigilância e segurança | pág. 51, precedente |
| 7 | Outros serviços | pág. 51, precedente |
| 8 | Conservação e reparação | pág. 51, precedente |
| 9 | Rendas e alugueres | pág. 51, precedente |
| 10 | Energia e fluidos | pág. 51, precedente |
| 11 | Comunicação | pág. 51, precedente |
| 12 | Contencioso e notariado | pág. 51, precedente |
| 13 | Limpeza, higiene e conforto | pág. 51, precedente |
| 14 | Material de escritório | pág. 51, precedente |
| 15 | Seguros | pág. 51, precedente |
| 16 | Serviços bancários e financeiros | pág. 51, precedente |
| 17 | Ferramentas e utensílios de desgaste rápido | pág. 51, precedente |
| 18 | Publicidade e propaganda | pág. 51, Jev 1 |
| 19 | Órgãos sociais | pág. 51, precedente |
| 20 | Técnicos e administrativos | pág. 51, precedente |
| 21 | Atletas | pág. 51, precedente |
| 22 | Seguros | pág. 51, precedente |
| 23 | Outros custos | pág. 51, precedente |
| 24 | Imparidade de dívidas a receber (perdas/reversões) | pág. 28, precedente |
| 25 | Provisões (aumentos/reduções) | pág. 28, precedente |
| 26 | Impostos | pág. 52, precedente |
| 27 | Gastos e perdas em investimentos não financeiros | pág. 52, precedente |
| 28 | Correções relativas a exercícios anteriores | pág. 52, precedente |
| 29 | Outros | pág. 52, Jev 0.99 |
| 30 | Gastos/reversões de depreciação e de amortização | pág. 28, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 9.060. Claude 2026-10-16 (lote 82): la fila está dentro de la nota 'Outros rendimentos' (9.060 + 2.113.905 + 44.990 + 1.972.199 = 4.140.154; total impreso 4.140.153), pero la extracción la puso como gasto; es ingreso. Con el ajuste la carga cierra con el resultado impreso (-4.496.269). Como Marítimo 2023 (to-do 237 w)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = broadcasting. Claude 2026-10-16 (lote 82): la nota de Vendas e prestação de serviços no tiene renglón de TV; el documento dice que la variación de Publicidade e Patrocínios se explica por la baja de los derechos de transmisión televisiva: la TV está dentro de ese renglón
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Marítimo".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Maritimo/MaritimoSAD_RC_30.06.2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Maritimo/MaritimoSAD_RC_30.06.2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade e patrocínios | pág. 44, precedente |
| 2 | Cedências de atletas | pág. 44, Jev 0.99 |
| 3 | Proveitos de bilheteira | pág. 44, precedente |
| 4 | Outros | pág. 44, precedente |
| 5 | Subsídios à exploração | pág. 33, precedente |
| 6 | Cedências de atletas | pág. 44, Jev 0.99 |
| 7 | Outros | pág. 44, precedente |
| 8 | Juros | pág. 44, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Imparidade de dívidas a receber (perdas/reversões) | pág. 33, precedente |
| 2 | Provisões (aumentos/reduções) | pág. 33, precedente |
| 3 | Subcontratos | pág. 56, precedente |
| 4 | Deslocações e estadas | pág. 56, precedente |
| 5 | Comissões | pág. 56, precedente |
| 6 | Trabalhos especializados | pág. 56, precedente |
| 7 | Outros serviços | pág. 56, precedente |
| 8 | Honorários | pág. 56, precedente |
| 9 | Vigilância e segurança | pág. 56, precedente |
| 10 | Contencioso e notariado | pág. 56, precedente |
| 11 | Rendas e alugueres | pág. 56, precedente |
| 12 | Energia e fluídos | pág. 56, precedente |
| 13 | Comunicação | pág. 56, precedente |
| 14 | Conservação e reparação | pág. 56, precedente |
| 15 | Limpeza, higiene e conforto | pág. 56, precedente |
| 16 | Material de escritório | pág. 56, precedente |
| 17 | Serviços bancários e financeiros | pág. 56, precedente |
| 18 | Seguros | pág. 56, precedente |
| 19 | Ferramentas e utensílios de desgaste rápido | pág. 56, precedente |
| 20 | Órgãos sociais | pág. 56, precedente |
| 21 | Técnicos e administrativos | pág. 56, precedente |
| 22 | Atletas | pág. 56, precedente |
| 23 | Seguros | pág. 56, precedente |
| 24 | Outros custos | pág. 56, precedente |
| 25 | Impostos | pág. 57, precedente |
| 26 | Gastos e perdas em investimentos não financeiros | pág. 57, precedente |
| 27 | Correções relativas a exercícios anteriores | pág. 57, precedente |
| 28 | Outros | pág. 57, Jev 0.99 |
| 29 | Gastos/reversões de depreciação e de amortização | pág. 33, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = other_expenses. Reversión (+703.162) de imparidad que quedó como ingreso; va del lado del gasto (neta), sin cambiar el resultado, como Marítimo 2025.
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = other_amortisation. Reversión (+510.000) de provisiones que quedó como ingreso; provisiones netas van a other_amortisation del lado del gasto.
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 598.818. Claude 2026-10-16 (lote 82): la fila está dentro de la nota 'Outros rendimentos' (Juros 598.818 + Cedências 1.743.281 + Outros 997.073 = 3.339.172, igual al renglón del estado), pero la extracción la puso como gasto. Es ingreso: con ella al revés el resultado da -1.536.255 en vez de -338.616 (diferencia 2 x 598.818). Mismo caso que Santa Clara 2024-25 (to-do 237 w)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = broadcasting. Claude 2026-10-16 (lote 82): la nota de Vendas e prestação de serviços (Publicidade e patrocínios, Cedências, Bilheteira, Outros) no tiene renglón de TV, y el documento atribuye la variación de Vendas e Prestações de Serviços a los derechos de transmisión televisiva; Marítimo 2024 dice que están en Publicidade e Patrocínios. Posible porque este año no nombra el renglón
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Marítimo".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Maritimo/MaritimoSAD_RC_30.06.2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Maritimo/MaritimoSAD_RC_30.06.2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade e patrocínios | pág. 40, Jev 1 |
| 2 | Cedências de atletas | pág. 40, Jev 0.97 |
| 3 | Proveitos de bilheteira | pág. 40, Jev 1 |
| 4 | Outros | pág. 40, precedente |
| 5 | Subsídios à exploração | pág. 29, Jev 0.99 |
| 6 | Outros rendimentos | pág. 29, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subconfratos | pág. 52, Jev 0.97 |
| 2 | Trabalhos especializados | pág. 52, Jev 0.99 |
| 3 | Deslocações e estadas | pág. 52, Jev 1 |
| 4 | Outros serviços | pág. 52, Jev 1 |
| 5 | Honorários | pág. 52, Jev 1 |
| 6 | Vigilância e segurança | pág. 52, Jev 0.95 |
| 7 | Contencioso e notariado | pág. 52, Jev 1 |
| 8 | Comunicação | pág. 52, Jev 1 |
| 9 | Conservação e reparação | pág. 52, Jev 0.99 |
| 10 | Energia e fluidos | pág. 52, Jev 1 |
| 11 | Material de escritório | pág. 52, Jev 1 |
| 12 | Comissões | pág. 52, precedente |
| 13 | Limpeza, higiene e conforto | pág. 52, Jev 1 |
| 14 | Rendas e alugueres | pág. 52, precedente |
| 15 | Seguros | pág. 52, Claude 0.8 |
| 16 | Serviços bancários e financeiros | pág. 53, Jev 0.97 |
| 17 | Ferramentas e utensílios de desgaste rápido | pág. 53, Jev 1 |
| 18 | Órgãos sociais | pág. 53, Jev 0.96 |
| 19 | Técnicos e administrativos | pág. 53, precedente |
| 20 | Atletas | pág. 53, Jev 1 |
| 21 | Seguros | pág. 53, Claude 0.8 |
| 22 | Outros custos | pág. 53, Jev 0.99 |
| 23 | Imparidade de dívidas a receber (perdas/reversões) | pág. 29, Jev 0.98 |
| 24 | Provisões (aumentos/reduções) | pág. 29, Jev 0.99 |
| 25 | Impostos | pág. 53, Jev 0.97 |
| 26 | Gastos e perdas em investimentos não financeiros | pág. 53, Jev 1 |
| 27 | Correções relativas a exercícios anteriores | pág. 53, Jev 1 |
| 28 | Donativo | pág. 53, Jev 0.98 |
| 29 | Outros | pág. 53, Jev 0.99 |
| 30 | Gastos/reversões de depreciação e de amortização | pág. 29, precedente |
| 31 | Imparidade de investimentos depreciáveis/amortizáveis (perdas/reversões) | pág. 29, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = broadcasting. Claude 2026-10-16 (lote 82): la nota de Vendas e prestação de serviços (Publicidade e patrocínios, Cedências, Bilheteira, Outros) no tiene renglón de TV, y el documento atribuye la variación de Vendas e Prestações de Serviços a los derechos de transmisión televisiva; Marítimo 2024 dice que están en Publicidade e Patrocínios. Posible porque este año no nombra el renglón
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Marítimo".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Maritimo/MaritimoSAD_RC_30.06.2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Maritimo/MaritimoSAD_RC_30.06.2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade e patrocínios | pág. 39, Jev 1 |
| 2 | Cedências de atletas | pág. 39, Jev 0.97 |
| 3 | Proveitos de bilheteira | pág. 39, Jev 1 |
| 4 | Outros | pág. 39, precedente |
| 5 | Subsídios à exploração | pág. 28, Jev 0.99 |
| 6 | Cedências de atletas | pág. 39, Jev 0.97 |
| 7 | Outros | pág. 39, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 50, Jev 0.98 |
| 2 | Deslocações e estadas | pág. 50, Jev 1 |
| 3 | Trabalhos especializados | pág. 50, Jev 0.99 |
| 4 | Honorários | pág. 50, Jev 1 |
| 5 | Outros serviços | pág. 50, Jev 1 |
| 6 | Comunicação | pág. 50, Jev 1 |
| 7 | Vigilância e segurança | pág. 50, Jev 0.95 |
| 8 | Energia e fluídos | pág. 50, Jev 1 |
| 9 | Comissões | pág. 50, precedente |
| 10 | Material de escritório | pág. 50, Jev 1 |
| 11 | Rendas e alugueres | pág. 50, precedente |
| 12 | Limpeza, higiene e conforto | pág. 50, Jev 1 |
| 13 | Contencioso e notariado | pág. 50, Jev 1 |
| 14 | Conservação e reparação | pág. 50, Jev 0.99 |
| 15 | Seguros | pág. 50, Claude 0.8 |
| 16 | Serviços bancários e financeiros | pág. 50, Jev 0.97 |
| 17 | Ferramentas e utensílios de desgaste rápido | pág. 50, Jev 1 |
| 18 | Técnicos e administrativos | pág. 51, precedente |
| 19 | Atletas | pág. 51, Jev 1 |
| 20 | Seguros | pág. 51, Claude 0.8 |
| 21 | Outros custos | pág. 51, Jev 0.99 |
| 22 | Imparidade de dívidas a receber (perdas/reversões) | pág. 28, Jev 0.98 |
| 23 | Provisões (aumentos/reduções) | pág. 28, Jev 0.99 |
| 24 | Impostos | pág. 51, Jev 0.97 |
| 25 | Gastos e perdas em investimentos não financeiros | pág. 51, Jev 1 |
| 26 | Correcções relativas a exercícios anteriores | pág. 51, Jev 1 |
| 27 | Donativo | pág. 51, Jev 0.98 |
| 28 | Outros | pág. 51, Jev 0.99 |
| 29 | Gastos/reversões de depreciação e de amortização | pág. 28, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): incluye = broadcasting. Claude 2026-10-16 (lote 82): la nota de Vendas e prestação de serviços (Publicidade e patrocínios, Cedências, Bilheteira, Outros) no tiene renglón de TV, y el documento atribuye la variación de Vendas e Prestações de Serviços a los derechos de transmisión televisiva; Marítimo 2024 dice que están en Publicidade e Patrocínios. Posible porque este año no nombra el renglón
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2020–21 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Marítimo".
```

## Fuentes

### maritimo-pt-futebol-sad-rc-30-06-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### maritimo-pt-maritimosad-rc-30-06-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Maritimo/MaritimoSAD_RC_30.06.2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### maritimo-pt-maritimosad-rc-30-06-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Maritimo/MaritimoSAD_RC_30.06.2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### maritimo-pt-maritimosad-rc-30-06-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Maritimo/MaritimoSAD_RC_30.06.2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### maritimo-pt-futebol-sad-relatorio-e-contas-30jun24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Maritimo/Maritimo-Futebol-SAD_Relatorio-e-Contas-30jun24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
