# Junior de Barranquilla (Club Deportivo Popular Junior F.C. S.A.)

- **Hit fuerte, club nuevo.** 3 PDFs descargados a `Clubes/Colombia/Junior de Barranquilla/`:
  `estados-financieros-2025.pdf` (38 páginas, paquete completo 2025/2024),
  `dictamen-revisor-fiscal-2025.pdf`, `certificacion-ef-2025.pdf` — vía SIIS, NIT 900456729. Cifras
  (vista SIIS): Activos $75.419.341 M, Ingresos $50.430.085 M, Utilidad Neta $1.216.193 M
  (ganancia).
- Pendiente: años anteriores (10 registros SIIS bajo el mismo NIT, no explorados).
- Contacto: siis.ia.supersociedades.gov.co (NIT 900456729).
- **CARGADO al sitio (sesión 2026-09-22, Ejercicio 2025 únicamente)**: ver
  `data/junior-co-data.js`. Notas limpias, con subtotales que reconcilian exacto en cada una — la
  Nota de Impuesto de Renta confirma la "Utilidad antes de provisión para impuesto sobre la renta"
  como cifra propia, lo que permitió verificar la reconstrucción completa sin ningún residuo. fx
  usado: TRM oficial al 31/12/2025 ($3.757,08 COP/USD) — el documento no declara su propio tipo de
  cambio de cierre para todo el balance (mantiene una cuenta en Panamá para operaciones en el
  exterior, pero sin Anexo de cierre en moneda extranjera). Tie-out: Revenue y Expenses+nonCash
  cierran exactos. Nota metodológica: la Nota 21 (Otros ingresos/gastos no operacionales) trae una
  línea "Diferencia en cambio, neto" separada de la Nota 20 (Ingresos/Gastos Financieros) — se movió
  esa línea a `netInterest` junto con la de la Nota 20, siguiendo la regla de que las diferencias de
  cambio nunca van como línea de ingreso/gasto (club-data-mapping SKILL.md sección 2), aunque el
  documento las muestre en una nota distinta.
- Último chequeo: 2026-09-22.
- Color de marca: `#B21117` — rojo, primer color de la lista "Rojo, Blanco y Azul" del infobox de
  es.wikipedia.org/wiki/Junior_de_Barranquilla + footylogos.com/es/color-codes/atletico-junior,
  verificado 2026-09-22. OJO: footylogos lista el azul marino primero en su paleta (ordenada por el
  escudo, no la camiseta) — se usó el rojo porque Wikipedia lo lista primero y es el color
  predominante del uniforme titular histórico (camiseta a rayas rojo y blanco).

