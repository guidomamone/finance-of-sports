# Informes agregados del fútbol inglés (to-do 332)

Chequeo 2026-10-20. Solo sourcing: nada transcrito ni cargado. Dos PDFs bajados para evaluarlos, en esta carpeta y sin trackear:
`deloitte-arff-2026.pdf` (56 págs.) y `uefa-ecfil-2025.pdf` (112 págs.).

| Informe | Editor | Público | Años | Clubes | Para qué sirve |
|---|---|---|---|---|---|
| **Annual Review of Football Finance 2026** (35ª ed., «Defending from the front»; jul-2026) | Deloitte | PDF gratis (`deloitte.com/content/dam/assets-shared/docs/industries/financial-services/2026/deloitte-annual-review-of-football-finance-2026.pdf`). Bajó con `curl` sin login | 2024/25 y 2023/24 (cada edición trae 2 años) | **Por club**, en los apéndices: T1 Premier (20), T2 Championship, T3 WSL, T4 League One y T5 League Two (estas dos, solo totales y promedio por división). Ingresos, sueldos, resultado operativo, amortización; pre-tax y deuda neta en gráficos. Fuente declarada: cuentas de cada club + EFL | **Contrastar** ingresos y sueldos por club contra lo cargado (Premier y Championship, 2024/25 y 2023/24) y los totales por liga. Contexto para Ligas (deuda neta PL £3,6bn, pre-tax PL −£948m). No completa años |
| **European Club Finance and Investment Landscape 2025** (ECFIL) | UEFA | PDF gratis desde `ecfil.uefa.com/2025`. Se bajó de `cdn.vev.design/…` | FY2024 con estimaciones 2025; series 2021-2025 | 725 clubes de primera, 55 federaciones. Detalle por club solo en rankings top 25; Inglaterra por liga | Contexto en Ligas (comparar Inglaterra con otras ligas). Poco útil para contrastar un club |
| **Deloitte ARFF, ediciones anteriores** (2025 y atrás) | Deloitte | Gratis en la misma página; hay que verificar cada URL | 2022/23, 2023/24, etc. | Mismas tablas por club | Contrastar los años 2021/22 a 2023/24 de los 20 clubes. Mismo formato |
| **State of the Game** (borrador, 13-oct-2026) | Independent Football Regulator (IFR) | Sitio `sotg.footballregulator.org.uk` con PDF para bajar; es borrador en consulta hasta dic-2026, final antes del 24-may-2027. No se bajó el PDF | Tendencia desde 1992/93; foco 2021/22 a 2025/26 | Agregado por división (PL, Championship, L1, L2, National League) y grupos («big six», paracaídas). **No hay cifras por club** | Solo contexto en Ligas: 94% de clubes con pérdida, ~£9bn de ingresos, 63% de EFL/NL técnicamente insolventes. Citar como borrador |
| Informes de la Premier League, la EFL y la FA | PL / EFL / FA | No se halló un informe financiero agregado propio de ninguno | — | — | Nada que usar. La PL publica reglas (PSR), no un consolidado; los números de la EFL llegan vía Deloitte (fuente declarada en T4 y T5) |
| Swiss Ramble (Substack) y Kieran Maguire (Price of Football) | Autores independientes | Parte de pago; no se verificó qué queda gratis | Por club y año, p. ej. «Liverpool finances 2024/25» | Club por club | Análisis de un club para contrastar a mano (sale de las cuentas que ya cargamos). No es fuente primaria; no se probó |

## Recomendación

1. **Usar primero el ARFF 2026 de Deloitte.** Es gratis, trae ingresos y sueldos de los 20 clubes de la Premier y de la Championship en dos años, y su fuente son las mismas cuentas de Companies House que ya cargamos: sirve de control cruzado barato (ingresos y sueldos por club; puede haber diferencias de perímetro grupo/club y de año de cierre, que la propia tabla marca en notas).
   Los gráficos de deuda neta también dan un control de `grossDebt`/caja. Para completar años, bajar las ediciones 2025 y 2024.
2. **Segundo, el borrador del IFR** (State of the Game) como contexto de Ligas, con la advertencia de que es un borrador; esperar la versión final de 2027 antes de citar cifras.
3. UEFA ECFIL, solo si Ligas quiere comparar Inglaterra con el resto de Europa.
4. **No completa nada**: ningún informe trae balances de clubes que falten. League One y League Two vienen solo como totales, así que los clubes que falten se siguen buscando en Companies House (`paises/Reino-Unido.md`).

Pendiente de decisión de Guido: transcribir (regla vigente) las tablas 1 y 2 del ARFF para armar el chequeo cruzado, y si se quiere, las ediciones anteriores.
