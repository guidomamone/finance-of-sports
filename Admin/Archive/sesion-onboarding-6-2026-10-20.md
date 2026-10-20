### Onboarding 6: (a) que quedaban del triage (2026-10-20)
- Cola: 3 casos de AEK 2024 "Diferencia de redondeo" (0,000001 M) contestados `aceptar` (other_expenses). La cola queda en 0.
- Dudas sacadas de `dudas-por-club.md`: OH Leuven (las otras entidades NV/VZW no tienen turnover; la BV cargada es la del fútbol), Thun (el informe 2018 dice que el ejercicio pasó a año calendario en 2017: 2017 es un tramo corto 01.07-31.12 que solo existe como comparativo, no se carga) y Polissya (el EDRPOU del documento es 40372249).
- NO apliqué los demás (a?): Rosario Central (residuales a other_income/other_expenses, no a lump) y similares piden recategorizar datos cargados por consistencia (criterio cerrado); Independiente (estadio) y República Checa (pares duplicados) no se pueden confirmar sin abrir PDFs/hipótesis no confirmada. Siguen en sus secciones.
- Esperando la tanda 2 de la Auditora.

### Onboarding 6: tanda 2 de la Auditora (2026-10-20)
- Hoffenheim 2024 y 2025: `officialPAT` a la línea 14 (Konzernjahresüberschuss): +1,268 M y +1,100 M (antes -0,368 y -0,189); `tax` recalculado por diferencia (24,431 y 27,385) para que ingresos, gastos y PAT sigan cerrando. Ajustes `resultado-final` en los dos documentos (sin recarga: mismas filas).
- Gimnasia LP 2024 y 2025: `publicNote` en las dos fuentes diciendo que el documento no explica "Incremento Valor Jugadores FP" (sin decir no-cash); sigue en other_income (A GUIDO, 2 a 1). La duda queda en `dudas-por-club.md`.
- Sin cambios por voto o regla: Everton (assetSales), Pereira "Trayectoria deportiva" (wages_squad), Palmeiras, América de Cali, Botafogo nota 19, Eintracht "Transfer", Panserraikos, Groningen, Stichting (ya están como la regla dice). Rosario Central tienda: ya estaba en sponsorship_commercial.
- ASSET_V 1507. Falta la tanda 3 (Getafe y Godoy Cruz: cesión, rescisión y tanteo).
- Gasto: US$ 1,20 de 6.

### Onboarding 6: Stuttgart (2026-10-20)
- VfB Stuttgart 2023 y 2024: `officialPAT` a la línea 21 "Jahresüberschuss" (antes de los minoritarios), como Hoffenheim, Augsburg y Eintracht: 0,777 M (antes 0,679; konzernabschluss-2023.md L917) y 15,533 M (antes 15,443; 2024 L1149). `tax` recalculado por diferencia (-0,480 y -2,491). Ajustes `resultado-final` con la cita. ASSET_V 1510.
- Gimnasia LP: la `publicNote` de 2024 y 2025 ya había entrado (instrucción de la Auditora, tanda 2); la principal pide no tocarlo. Si Guido lo prefiere, se revierte quitando las dos líneas `publicNote` de `data/ar/gimnasiaesgrima-ar-data.js`.
- Gimnasia LP: `publicNote` de 2024 y 2025 sacada (pedido de la principal: el caso espera a Guido); datos como estaban. ASSET_V 1511.

### Onboarding 6: Estudiantes LP (2026-10-20)
- "Resultado por revaluación de jugadores" 2023 (291 M, Nota 16) y 2024 (4.053 M, Nota 13 = hechos posteriores: ventas pactadas tras el cierre, saldo en Jugadores destinados a la venta) pasó de `player_sales` a `other_income` (voto de la Auditora); ajustes `categoria` en los dos documentos; 2024-25 no repite la fila. `Admin/carga-clubes/estudianteslp.md` corregido. ASSET_V 1513.
- Gimnasia LP: `publicNote` repuesta en 2024 y 2025 (3 a 0, other_income como está; el documento no explica la fila). ASSET_V 1514. La "Nota 16" que cita la fila de Estudiantes 2023 no aparece como nota en el documento (solo la cita la propia fila).

### Onboarding 6: Godoy Cruz y cierre del 238 gratis (2026-10-20)
- Godoy Cruz 2020 "Ingreso por Derechos de Tanteo" (38,59 M) de `player_sales` a `other_income` (tanda 3 de la Auditora), ajuste `categoria` con cita (L164); el comparativo 2019 no está cargado. Las cesiones de Getafe no cambian nada. ASSET_V 1515.
- Cerrado el 238 en lo gratis: cola en 0 (AEK), dudas OH Leuven/Thun/Polissya fuera, tandas 2 y 3 aplicadas (Hoffenheim, Stuttgart, Estudiantes LP, Gimnasia LP, Godoy Cruz). Queda lo pagado/no aplicado: Rosario Central residuales y Independiente estadio (ver arriba), pares duplicados de Rep. Checa, Aalesund y Vålerenga 2008-21.
- Gasto: US$ 1,20 de 6, sin lote.
