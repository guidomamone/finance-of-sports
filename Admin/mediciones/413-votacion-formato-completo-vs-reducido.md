<!-- md: el caso de la votación del 413 (SønderjyskE 2025: formato completo contra reducido) con los números medidos | leer: al votar o al revisar esa decisión -->
# Votación 413: un club danés pasa del formato reducido (§ 32) al completo

Conclusión: ver el resultado en `Admin/registros/auditoria-proceso.jsonl` (línea «votación: SønderjyskE 2025 formato completo contra reducido») y la regla que salga en `Admin/CONVENCIONES-DATOS.md`.
Destino: `Admin/CONVENCIONES-DATOS.md` (regla de formato) y la carga de SønderjyskE 2025 (`Admin/lotes/lote-144.txt`).

## El caso

SønderjyskE (`sonderjyske-dk`, Dinamarca). Años cargados 2022, 2023 y 2024 con el balance **reducido** (Årsregnskabsloven § 32): el estado de resultados muestra solo «Bruttofortjeneste» (margen bruto = ventas netas + otros ingresos − costo de mercadería − otros gastos externos), un único renglón de ingreso sin desglose, y debajo solo personal y amortizaciones. Regla vigente para ese formato: `.claude/skills/club-data-mapping/referencia/casos-por-pais-y-formato.md`, sección «Balance danés con la exención § 32» (todo el ingreso va como UNA línea `lump_football_operations` por el valor de «Bruttofortjeneste»; «es el caso más extremo… la regla se aplica cuando no hay vía para separar el revenue»). Así están cargados `data/dk/sonderjyske-dk.json` 2022, 2023 y 2024.

El informe del ejercicio 2024/25 (cierre 30/09/2025, `Clubes/Dinamarca/SønderjyskE/aarsrapport-2025-09-30.md`, estado de resultados en las líneas 446-459) **ya no es reducido**: muestra el formato completo.

| DKK | 2024/25 (informe 2025) | 2023/24 (columna comparativa del informe 2025) | 2023/24 como se cargó (informe 2024, reducido) |
|---|---|---|---|
| Nettoomsætning (ventas netas) | 66.288.538 | 55.909.616 | no se desglosa |
| Andre driftsindtægter | 116.122 | 2.642.800 | no se desglosa |
| Vareforbrug | 2.032.057 | 1.722.417 | no se desglosa |
| Andre eksterne omkostninger | 28.683.802 | 21.527.721 | no se desglosa |
| **Bruttofortjeneste** | **35.688.801** | **35.302.278** | **37.431.315** |
| Personaleomkostninger | 46.382.375 | 38.888.188 | 41.017.225 |
| Af- og nedskrivninger | 3.806.681 | 2.067.896 | 2.067.896 |
| Resultado antes de financieros | −14.815.007 | −5.653.806 | −5.653.806 |
| Resultado del año | −11.467.171 | −4.754.113 | −4.754.113 |

Dos cosas que se ven en la tabla:
1. El informe 2025 **reexpresó** la columna 2023/24: pasó 2.129.090 de «personal» a «margen bruto» (37.431.315 → 35.302.278 y 41.017.225 → 38.888.188). El resultado no cambia.
2. Con el formato completo el ingreso mide casi el doble que con el reducido (66,40 M contra 35,69 M en 2025): el reducido ya viene neto de 30,7 M de costos de mercadería y externos.

## Qué se pierde y qué se gana con cada formato (medido)

| Indicador de 2025 | Cargado completo | Cargado reducido (como 2022-24) |
|---|---|---|
| Ingresos | 66,40 M (ventas 66,29 + otros 0,12) | 35,69 M (un solo renglón) |
| Gastos | 81,22 M (con costo de mercadería 2,03 y externos 28,68) | 50,50 M |
| Personal sobre ingresos | 70 % | 130 % |
| Resultado | −14,82 M | −14,82 M (igual) |

El resultado no cambia con ninguna opción; cambian el tamaño de ingresos y gastos, la relación sueldos/ingresos y la comparación con los clubes cuyo balance es completo (FC København, Silkeborg, AGF, que sí desglosan).

## Las opciones

- **A. Cargar 2025 como se imprime** (formato completo: ventas, otros ingresos, mercadería, externos, personal, amortizaciones). 2022-2024 quedan como están (reducidos). Años ya cargados que cambian: 0. Queda un salto de serie: 2024 (35,3-37,4 M como margen bruto) contra 2025 (66,4 M como ventas), que se explica con una `publicNote`.
- **B. Cargar 2025 reducido** (un solo renglón «Bruttofortjeneste» 35,69 M), igual que 2022-24: la serie es homogénea, pero se tira el desglose que el documento sí da. Años que cambian: 0.
- **C. Cargar 2025 completo y rehacer 2024 con la columna comparativa completa y reexpresada del informe 2025** (ventas 55,91 M, etc.). Años que cambian: 1 (2024, valores ya publicados). 2022 y 2023 quedan reducidos (no existe versión completa).

## Dónde mirar (los votantes buscan lo suyo)

- Reglas: `Admin/CONVENCIONES-DATOS.md` (buscar «Bruttofortjeneste», «reexpres», «Formato simplificado», «misma fuente», «comparab»), `.claude/skills/club-data-mapping/SKILL.md` y `referencia/casos-por-pais-y-formato.md` y `referencia/formato-simplificado.md`.
- Precedentes de balance completo en Dinamarca: `data/dk/fckobenhavn-dk.json`, `silkeborg-dk.json`, `agf-dk.json`; de reducido: `nordsjaelland-dk.json`, `randers-dk.json`, `vejle-dk.json`, `fredericia-dk.json`. Buscar un club (de cualquier país) que cambió de formato en su serie y cómo se cargó.
- Los datos de SønderjyskE: `data/dk/sonderjyske-dk.json`; la evidencia: `Admin/carga-clubes/sonderjyske-dk.md`.
- La escala de criterios y cómo se vota: `.claude/skills/votacion-de-criterios/SKILL.md` (secciones 2 y 3).
