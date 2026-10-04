# Winnipeg Blue Bombers (Winnipeg Football Club)

**Ángulos**: sitio oficial: agotado (informes anuales publicados en `static.cfl.ca/wp-content/uploads/sites/6/`, 4 bajados) · regulador/país: no aplica (club comunitario sin cotizar; ningún registro mercantil canadiense exigible) · Wayback CDX: no intentado (el CDX no respondió desde esta máquina) · búsqueda web: agotado para 2020 y antes (prensa cita cifras de 2017-2021 sin enlazar el PDF) · barrido: 1 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol canadiense
- **Liga / competencia**: CFL (Canadian Football League), División Oeste
- **Entidad legal**: **Winnipeg Football Club**, propiedad comunitaria (accionistas locales, sin dueño único), con
  estados **no consolidados** auditados; subsidiarias aparte (ej. la entidad de las operaciones del estadio) con sus notas.
  Cierre del ejercicio: **31 de diciembre**.
- **Canal**: el club publica cada año, en abril, un **Annual Report** completo con informe del auditor independiente, estados no consolidados
  de operaciones y situación financiera y notas. Está hospedado en el servidor de contenido de la liga (`static.cfl.ca`), que sirve el PDF
  con `curl` si se manda un `User-Agent` de navegador (las páginas de `bluebombers.com`, en cambio, dan 403 a `WebFetch`).

## Qué se bajó (2026-10-03), en `Clubes/Canadá/Winnipeg Blue Bombers/`

| Archivo | Ejercicio | Páginas | URL |
|---|---|---|---|
| `blue-bombers-annual-report-2022.pdf` | 2022 (comparativo 2021) | 41 | `.../sites/6/2023/04/2022WinnipegBlueBombersAnnualReport.pdf` |
| `blue-bombers-annual-report-2023.pdf` | 2023 (comparativo 2022) | 35 | `.../sites/6/2024/04/2023WinnipegBlueBombersAnnualReport.pdf` |
| `blue-bombers-annual-report-2024.pdf` | 2024 (comparativo 2023) | 38 | `.../sites/6/WinnipegBlueBombersAnnualReport_2024.pdf` |
| `blue-bombers-annual-report-2025.pdf` | 2025 (comparativo 2024) | 38 | `.../sites/6/2025_WinnipegBlueBombersAnnualReport-WEB.pdf` |

Todos con capa de texto. Cubren **2021-2025: 5 ejercicios** (2021 solo como comparativo del informe de 2022).
Cifras de control (leídas de los documentos): ingresos 2022 $45,4 M (+$12,5 M sobre 2021 por la temporada completa), gastos 2022 $40,5 M;
2023 ingresos $50,5 M, excedente de operaciones $5,7 M (2022: $4,9 M); 2024 ingresos $54,7 M, excedente total $8,6 M;
2025 excedente de ingresos sobre gastos $12.860.045 (antes de otros ítems $12.056.426; 2024: $6.998.395; año con la sede de la
Grey Cup). Los números de 2021 vienen de prensa del club ($2,1 M de utilidad operativa) hasta leer el comparativo.
Moneda: dólares canadienses (CAD). Hay un fondo de capital y una reserva operativa separados (asignaciones por estatuto): al mapear hay
que decidir si se toma el excedente antes o después de esas asignaciones.

**Faltan** (no es necesario para la meta, existen según prensa): 2020 y anteriores (`bluebombers.com/news/2016-annual-report/`,
`.../2017-annual-report/` existen pero las páginas dan 403 y no se resolvió el enlace al PDF).

- Último chequeo: 2026-10-03.
