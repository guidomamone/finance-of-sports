# pacosdeferreira-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/pacosdeferreira-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Paços de Ferreira: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Paços de Ferreira/contas_2425.pdf. brandColor #FFDD00
(procedencia en Admin/sourcing/Portugal/Paços de Ferreira.md; tools/cargar-lote.mjs).
```

```text
data/pt/pacosdeferreira-pt-data.js — Paços de Ferreira (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Paços de Ferreira/contas_2425.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "pacosdeferreira-pt" — slug de "Paços de Ferreira" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Paços de Ferreira" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Paços de Ferreira" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (25 de 25 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 30 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): El nombre del archivo (2425) se lee como año 2425; el ejercicio es 2024-25,
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (25 de 25 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "pacosdeferreira-pt-contas-2425" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Paços de Ferreira"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"pacosdeferreira-pt-contas-2425"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Paços de Ferreira/contas_2425.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Paços de Ferreira/contas_2425.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de Mercadorias (Merchandising) | pág. 12, Jev 1 |
| 2 | Publicidade | pág. 12, Jev 1 |
| 3 | Direitos televisivos | pág. 12, Jev 1 |
| 4 | Bilhetes, camarotes e cativos | pág. 12, Jev 0.92 |
| 5 | Competições | pág. 12, precedente |
| 6 | Mecanismo de solidariedade | pág. 12, precedente |
| 7 | Outros | pág. 12, precedente |
| 8 | Subsídios formação UEFA | pág. 13, Jev 0.99 |
| 9 | Outros | pág. 13, precedente |
| 10 | Cedências jogadores | pág. 14, Jev 0.96 |
| 11 | Lucros Placard | pág. 14, Jev 0.96 |
| 12 | Cedência de Espaço | pág. 14, Claude 0.8 |
| 13 | Outros | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 1, Jev 0.97 |
| 2 | Subcontratos | pág. 16, Jev 0.96 |
| 3 | Trabalhos Especializados | pág. 16, Jev 0.99 |
| 4 | Publicidade e Propaganda | pág. 16, Jev 1 |
| 5 | Vigilância e Segurança | pág. 16, Jev 0.96 |
| 6 | Honorários | pág. 16, Jev 1 |
| 7 | Comissões | pág. 16, precedente |
| 8 | Conservação e Reparação | pág. 16, Jev 0.99 |
| 9 | Liga | pág. 16, precedente |
| 10 | Outros Serviços Especializados | pág. 16, precedente |
| 11 | Ferramentas e utensílios desgaste rápido | pág. 16, Jev 1 |
| 12 | Material de Escritório | pág. 16, Jev 1 |
| 13 | Eletricidade | pág. 16, Jev 1 |
| 14 | Combustíveis | pág. 16, Jev 0.98 |
| 15 | Água | pág. 16, Jev 1 |
| 16 | Outros | pág. 16, Jev 0.99 |
| 17 | Deslocações e Estadas | pág. 16, Jev 1 |
| 18 | Rendas e alugueres | pág. 16, precedente |
| 19 | Comunicação | pág. 16, Jev 1 |
| 20 | Seguros | pág. 16, Claude 0.8 |
| 21 | Contencioso e notariado | pág. 16, Jev 1 |
| 22 | Limpeza, higiene e conforto | pág. 16, Jev 1 |
| 23 | Outros Serviços | pág. 16, Jev 1 |
| 24 | Jogadores | pág. 15, Jev 1 |
| 25 | Treinadores | pág. 15, Jev 0.96 |
| 26 | Pessoal Diverso | pág. 15, precedente |
| 27 | Encargos sobre remunerações | pág. 15, Jev 0.91 |
| 28 | Seguros de acidentes de trabalho e de doenças profissionais | pág. 15, Jev 1 |
| 29 | Impostos | pág. 17, Jev 0.95 |
| 30 | Multas/coimas | pág. 17, Jev 0.97 |
| 31 | Despesas não devidamente documentadas | pág. 17, Jev 1 |
| 32 | Correções relativas a períodos anteriores | pág. 17, Jev 1 |
| 33 | Outros | pág. 17, Jev 0.99 |
| 34 | Gastos/reversões de depreciação e de amortização | pág. 1, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2025. El nombre del archivo (2425) se lee como año 2425; el ejercicio es 2024-25, cierre 30/06/2025.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Paços de Ferreira".
```

## Fuentes

### pacosdeferreira-pt-contas-2425

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Paços de Ferreira/contas_2425.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
