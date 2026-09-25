# Club Deportivo Cuenca

- **Hit real, pero OJO con el tipo de documento — no es un balance/estado financiero auditado
  tradicional.** Club Deportivo Cuenca es (como todos los clubes profesionales ecuatorianos a
  septiembre 2026 — ver `_notas-generales.md`) una sociedad civil sin fines de lucro, no una S.A.D.P.
  (esa figura todavía no existe operativa en Ecuador para ningún club, ver nota general). El club
  publicó voluntariamente, en su propio sitio oficial, una nota de prensa
  (`clubdeportivocuenca.com/2026/08/19/informe-economico-del-periodo-enero-junio-de-2026/`, 19 de
  agosto de 2026) con dos links de Google Drive a documentos reales, ambos descargados a
  `Clubes/Ecuador/Deportivo Cuenca/`:
  - `informe-presidencia-movimientos-bancarios-ene-jun-2026.pdf` (4 páginas) — "Informe Presidencial
    2026", información CONSOLIDADA DE CUATRO CUENTAS BANCARIAS (no un estado de resultados/balance
    contable): ingresos USD 2.845.423 y salidas USD 2.776.871 del período enero-junio 2026, saldo
    bancario conjunto al 30/06/2026 de USD 130.318 (aclara que ese saldo está retenido por un proceso
    coactivo del SRI, no es liquidez de libre disponibilidad). Desglosa ingresos por fuente (premios
    de competiciones USD 1.092.107 = 38,4%; abonos y socios USD 628.950; taquilla nacional USD
    473.898; auspicios y publicidad USD 224.500; préstamos recibidos USD 162.811; taquilla
    internacional USD 120.700; otros eventos USD 104.884; otros ingresos USD 37.573) y salidas por
    uso (remuneraciones y obligaciones de plantilla USD 1.091.286 = 39,3%; logística de partidos USD
    297.940; SRI/impuestos/multas/retenciones USD 266.164; premios y primas deportivas USD 239.494;
    pago o devolución de préstamos USD 193.950; sueldos y remuneraciones USD 92.981 — nota: esta
    última línea parece separada de "remuneraciones y obligaciones de plantilla", no aclara la
    diferencia entre ambas categorías salariales, posible pregunta para `dudas-por-club.md`).
  - `informe-sri-iess-ene-jun-2026.pdf` (3 páginas) — mismo "Informe Presidencial 2026", pero de
    pagos tributarios/patronales, con serie 2021-2026 completa: pagos al SRI USD 2.144.357,87, pagos
    al IESS USD 583.894,34, total USD 2.728.252,21 acumulado, con desglose año por año (2021: USD
    103.409,09; 2022: USD 348.463,66; 2023: USD 973.011,59 — el año de mayor pago; 2024: USD
    423.909,22; 2025: USD 353.870,55; 2026 a la fecha de corte: USD 525.588,10).
  - **Por qué esto NO es un balance/estado de resultados tradicional**: es contabilidad de CAJA
    (movimientos bancarios de 4 cuentas + pagos efectivamente hechos al SRI/IESS), no de DEVENGADO —
    no hay activo/pasivo/patrimonio, no hay estado de resultados con líneas contables completas
    (amortización de pases de jugadores, provisiones, etc.), y el propio documento aclara que el
    saldo bancario no es "cierre definitivo" para 2026. Es la primera y (hasta donde se buscó) única
    publicación de este tipo del club — no se encontró un archivo histórico de años anteriores en el
    sitio (revisado `clubdeportivocuenca.com/noticias/`, sin otra entrada de "informe presidencial"/
    "informe económico" además de esta). Antes de cargar esto al sitio, releer
    `club-data-mapping/SKILL.md` para decidir si un informe de caja de este tipo encaja en el
    esquema existente (pensado para estados contables devengados) o si necesita un tratamiento
    aparte — anotar la duda en `dudas-por-club.md` si no queda claro.
- Contacto/fuente: nota de prensa del propio club (arriba), Google Drive del club (links en la nota).
- **Actualización 2026-09-25 (sesión de onboarding/data-mapping) — CONFIRMADO, no se carga.** Se
  releyeron los 2 documentos completos con la lupa de `club-data-mapping/SKILL.md`. Confirma lo que
  ya anticipaba la nota de sourcing: ninguno de los 2 es un estado contable devengado del EJERCICIO
  COMPLETO. `informe-sri-iess-ene-jun-2026.md` es solo una serie histórica de PAGOS a organismos
  tributarios/previsionales (2021-2026), sin ningún ingreso ni gasto operativo — no aporta líneas para
  `revenueLines`/`expenseLines`. `informe-presidencia-movimientos-bancarios-ene-jun-2026.md` es un
  informe de CAJA (movimiento de 4 cuentas bancarias) de solo el primer semestre de 2026, no el
  ejercicio completo, y mezcla financiamiento (préstamos recibidos/pagados) con operación en la misma
  tabla — el propio documento aclara que el saldo final "no debe interpretarse como el cierre
  definitivo del año". No hay un total de Resultado del ejercicio (superávit/déficit) contra el cual
  hacer tie-out, ni Estado de Situación Financiera (activo/pasivo/patrimonio). Cargar esto como
  `revenueLines`/`expenseLines` de un "Ejercicio 2026" sería publicar un ejercicio parcial e
  incompleto disfrazado de balance — exactamente lo que CLAUDE.md ("Precisión antes que velocidad")
  pide evitar. **DECISIÓN: no se crea `data/deportivocuenca-ec-data.js` con estos documentos.**
  Preguntas genuinas (incluida la ya anotada por la sesión de sourcing sobre "Remuneraciones y
  obligaciones de plantilla" vs. "Sueldos y remuneraciones") anotadas en `Admin/dudas-por-club.md`.
- Último chequeo: 2026-09-25.
