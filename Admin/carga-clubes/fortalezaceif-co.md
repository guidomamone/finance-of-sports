# fortalezaceif-co — evidencia de carga

Lo que había como comentario en `data/co/fortalezaceif-co-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/co/fortalezaceif-co-data.js — FORTALEZA FUTBOL CLUB S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-02), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Colombia/Fortaleza CEIF/estados-financieros-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fortalezaceif-co" — slug de "Fortaleza CEIF" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FORTALEZA FUTBOL CLUB S.A." — el .md, 31 veces (nombre del club + forma societaria)
  displayName        ok        "Fortaleza CEIF" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (87 de 87 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 51 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [colombia] fortaleza ceif: #16233D dark navy, #FFFFFF white, #BC183D crimson red
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (87 de 87 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fx                 pendiente null — el .md menciona tipo de cambio y dólar con números en 1 línea(s), pero ninguno es una cotización plausible (descartadas por traer en su frase otra fec
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "fortalezaceif-co-estados-financieros-2025" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraA" — roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia única por palabras "Fortaleza" = "Fortaleza CEIF"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"fortalezaceif-co-estados-financieros-2025"}
============================================================================
```

_de data/clubs.js:_

```text
Fortaleza CEIF: alta por tools/alta-club.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2025.pdf. brandColor de Guido
(2026-10-02: azul #003366 y rojo #CC0000; el campo admite un color y va el azul).
```

_de data/club-leagues/co.js:_

```text
Fortaleza CEIF (alta-club.mjs, 2026-10-02): verificado contra roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia única por palabras "Fortaleza" = "Fortaleza CEIF".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/estados-financieros-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Derechos de televisión nacional | pág. 24, Jev 1 |
| 2 | Federación Colombiana de Futbol | pág. 24, Jev 0.97 |
| 3 | Auxilio hotelero (*) | pág. 24, Claude 0.8 |
| 4 | Convenio entre clubes | pág. 24, Jev 0.96 |
| 5 | Auxilio de arbitraje (*) | pág. 24, Jev 0.91 |
| 6 | Auxilio de transporte (*) | pág. 24, Claude 0.8 |
| 7 | Otros auxilios (*) | pág. 24, precedente |
| 8 | Propaganda y publicidad | pág. 24, Jev 0.99 |
| 9 | Propaganda y publicidad | pág. 25, Jev 0.99 |
| 10 | Derechos deportivos | pág. 24, Jev 0.99 |
| 11 | Boletería | pág. 24, Jev 1 |
| 12 | Venta de indumentaria deportiva | pág. 24, Jev 0.98 |
| 13 | Alquiler deportivo | pág. 30, precedente |
| 14 | Reintegro de costos y gastos | pág. 30, Jev 1 |
| 15 | Comisiones | pág. 30, Jev 1 |
| 16 | Uso de marca | pág. 30, Jev 0.99 |
| 17 | Otros | pág. 30, Jev 1 |
| 18 | Ajuste al peso | pág. 30, Claude 0.8 |
| 19 | Diversos | pág. 30, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | COSTO DE VENTAS | pág. 25, precedente |
| 2 | De personal | pág. 25, precedente |
| 3 | Honorarios | pág. 25, Jev 1 |
| 4 | Alquiler construcciones y edificaciones | pág. 26, ajuste manual (auditoría 2026-10-04) |
| 5 | Alquiler maquinaria y equipo | pág. 26, ajuste manual (auditoría 2026-10-04) |
| 6 | Alquiler Terrenos | pág. 26, ajuste manual (auditoría 2026-10-04) |
| 7 | Afiliaciones y sostenimientos | pág. 26, precedente |
| 8 | INDUSTRIA Y COMERCIO | pág. 27, Claude 0.9 |
| 9 | DE ESPECTACULOS PUBLICOS (I.D.R.D) | pág. 27, precedente |
| 10 | BOMBEROS | pág. 27, precedente |
| 11 | MOVILIDAD | pág. 27, precedente |
| 12 | IVA DESCONTABLE | pág. 27, Jev 0.99 |
| 13 | Seguros | pág. 26, precedente |
| 14 | Servicios | pág. 26, Jev 0.98 |
| 15 | Tramites y licencias | pág. 26, ajuste manual (auditoría 2026-10-04) |
| 16 | Derechos Deportivos (7) | pág. 26, ajuste manual (auditoría 2026-10-04) |
| 17 | Mantenimiento y adecuaciones | pág. 26, precedente |
| 18 | De viaje | pág. 26, Jev 0.97 |
| 19 | Diversos | pág. 26, Jev 0.99 |
| 20 | Depreciaciones | pág. 26, Jev 1 |
| 21 | Amortizaciones | pág. 26, Jev 0.9 |
| 22 | Deterioro de inventario | pág. 26, Jev 0.97 |
| 23 | De personal | pág. 27, precedente |
| 24 | Honorarios | pág. 28, Jev 1 |
| 25 | Arrendamientos | pág. 28, Jev 0.97 |
| 26 | Impuestos | pág. 28, Jev 1 |
| 27 | Servicios | pág. 28, Jev 0.98 |
| 28 | De viaje | pág. 28, Jev 0.97 |
| 29 | Diversos | pág. 28, Jev 0.99 |
| 30 | Gastos Laborales (administración) | pág. 28, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 31 | Honorarios | pág. 28, Jev 1 |
| 32 | Alquileres | pág. 29, precedente |
| 33 | Contribuciones y afiliaciones | pág. 29, Jev 0.99 |
| 34 | Seguros | pág. 29, precedente |
| 35 | Servicios | pág. 29, Jev 0.98 |
| 36 | Legales | pág. 29, Jev 1 |
| 37 | Mantenimientos y reparaciones | pág. 29, Jev 0.99 |
| 38 | De viaje | pág. 29, Jev 0.97 |
| 39 | Gastos Diversos | pág. 29, precedente |
| 40 | Depreciaciones | pág. 29, Jev 1 |
| 41 | Deterioro de cartera | pág. 29, Jev 0.97 |
| 42 | Amortizaciones | pág. 29, Jev 0.9 |
| 43 | Gastos no deducibles | pág. 30, Jev 0.99 |
| 44 | Multas y sanciones | pág. 30, precedente |
| 45 | Impuestos asumidos | pág. 30, precedente |
| 46 | Ajuste al peso | pág. 30, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 0 (compuerta: año anterior): "Préstamos y sobregiros bancarios" pág. 13; cash escalón 0 (compuerta: año anterior): "Efectivo" pág. 13
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/estados-financieros-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Derechos de televisión nacional | pág. 24, Jev 1 |
| 2 | Federación Colombiana de Futbol | pág. 24, Jev 0.97 |
| 3 | Auxilio hotelero | pág. 24, precedente |
| 4 | Convenio entre clubes | pág. 24, Jev 0.96 |
| 5 | Auxilio de arbitraje | pág. 24, ajuste manual (auditoría 2026-10-04, hallazgo 12: auxilio de la Dimayor, como 2020) |
| 6 | Auxilio de transporte | pág. 24, ajuste manual (auditoría 2026-10-04, hallazgo 12: auxilio de la Dimayor, como 2020) |
| 7 | Otros auxilios (*) | pág. 24, precedente |
| 8 | Propaganda y publicidad | pág. 24, Jev 0.99 |
| 9 | Derechos deportivos | pág. 23, Jev 0.99 |
| 10 | Boletería | pág. 23, Jev 1 |
| 11 | Enseñanza | pág. 23, Jev 1 |
| 12 | Transportes | pág. 23, precedente |
| 13 | Venta de indumentaria deportiva | pág. 23, Jev 0.99 |
| 14 | Alquiler deportivo | pág. 28, precedente |
| 15 | Reintegro de costos y gastos | pág. 28, Jev 1 |
| 16 | Utilidad en propiedad, planta y equipo | pág. 28, Jev 1 |
| 17 | Aprovechamientos | pág. 28, Jev 0.99 |
| 18 | Ajuste al peso | pág. 28, Claude 0.8 |
| 19 | Diversos | pág. 28, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 24, precedente |
| 2 | Gastos Laborales | pág. 24, precedente |
| 3 | Honorarios | pág. 25, Jev 1 |
| 4 | Alquiler construcciones y edificaciones | pág. 25, precedente |
| 5 | Alquiler maquinaria y equipo | pág. 25, precedente |
| 6 | Alquiler Terrenos | pág. 25, precedente |
| 7 | Afiliaciones y sostenimientos | pág. 25, precedente |
| 8 | Industria y comercio pagados a la Secretaría de Hacienda de Bogotá por $ 35.065 | pág. 26, Jev 0.96 |
| 9 | De espectáculos públicos pagados IDRD por $ 388.776 | pág. 26, precedente |
| 10 | IVA descontable por $ 119.791 | pág. 26, Jev 0.98 |
| 11 | Seguros | pág. 25, precedente |
| 12 | Servicios | pág. 25, Jev 0.98 |
| 13 | Tramites y licencias | pág. 25, ajuste manual (auditoría 2026-10-04) |
| 14 | Derechos Deportivos (7) | pág. 25, ajuste manual (auditoría 2026-10-04) |
| 15 | Terrenos | pág. 25, precedente |
| 16 | Construcciones y edificaciones | pág. 25, precedente |
| 17 | Maquinaria y equipo | pág. 25, precedente |
| 18 | Muebles y enseres | pág. 25, Claude 0.8 |
| 19 | Flota y equipo de transporte | pág. 25, precedente |
| 20 | De viaje | pág. 25, Jev 0.97 |
| 21 | Comisiones | pág. 25, precedente |
| 22 | Combustible | pág. 25, precedente |
| 23 | Taxis y buses | pág. 25, Jev 0.92 |
| 24 | Casinos y restaurantes | pág. 25, precedente |
| 25 | Gastos de representación | pág. 25, Jev 0.98 |
| 26 | Papelería | pág. 26, Jev 0.98 |
| 27 | Parqueadero | pág. 26, precedente |
| 28 | Elementos de aseo y cafetería (Hidratación) | pág. 26, precedente |
| 29 | Implementos Deportivos | pág. 26, precedente |
| 30 | Diversos | pág. 26, Jev 0.99 |
| 31 | Depreciaciones | pág. 26, Jev 1 |
| 32 | Amortizaciones | pág. 26, Jev 0.9 |
| 33 | Deterioro de inventario | pág. 26, Jev 0.99 |
| 34 | Gastos Laborales (administración) | pág. 26, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 35 | Honorarios | pág. 26, Jev 1 |
| 36 | Contribuciones y afiliaciones | pág. 27, Jev 0.99 |
| 37 | Seguros | pág. 27, precedente |
| 38 | Servicios | pág. 27, Jev 0.98 |
| 39 | Legales | pág. 27, Jev 1 |
| 40 | Maquinaria y equipo | pág. 27, precedente |
| 41 | Equipo de oficina | pág. 27, Jev 0.97 |
| 42 | De viaje | pág. 27, Jev 0.97 |
| 43 | Combustibles y lubricantes | pág. 27, Jev 1 |
| 44 | Útiles, papelería y Fotocopias | pág. 27, Jev 1 |
| 45 | Parqueaderos | pág. 27, Jev 1 |
| 46 | Casino y restaurante | pág. 27, precedente |
| 47 | Diversos | pág. 27, Jev 0.99 |
| 48 | Taxis y buses | pág. 27, Jev 0.92 |
| 49 | Depreciaciones | pág. 27, Jev 1 |
| 50 | Deterioro de cartera | pág. 27, Jev 0.97 |
| 51 | Amortizaciones | pág. 27, Jev 0.9 |
| 52 | Gastos no deducibles | pág. 27, Jev 0.99 |
| 53 | Multas sanciones y litigios | pág. 27, Jev 0.96 |
| 54 | Impuestos asumidos | pág. 27, precedente |
| 55 | Ajuste al peso | pág. 27, precedente |
| 56 | Intereses de mora | pág. 27, Jev 0.95 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: documento siguiente): "Préstamos y sobregiros bancarios" pág. 13; cash escalón 1 (compuerta: documento siguiente): "Bancos" pág. 13 + "Caja" pág. 13
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2024 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/estados-financieros-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Derechos de televisión nacional | pág. 24, Jev 1 |
| 2 | Federación Colombiana de Futbol | pág. 24, Jev 0.97 |
| 3 | Auxilio hotelero | pág. 24, precedente |
| 4 | Convenio entre clubes | pág. 24, Jev 0.96 |
| 5 | Auxilio de arbitraje | pág. 24, ajuste manual (auditoría 2026-10-04, hallazgo 12: auxilio de la Dimayor, como 2020) |
| 6 | Auxilio de transporte (Dimayor) | pág. 24, ajuste manual (auditoría 2026-10-04, hallazgo 12: auxilio de la Dimayor, como 2020) |
| 7 | Otros auxilios(*) | pág. 24, precedente |
| 8 | Propaganda y publicidad | pág. 24, Jev 0.99 |
| 9 | Derechos deportivos | pág. 24, Jev 0.99 |
| 10 | Enseñanza Deportiva | pág. 24, Jev 1 |
| 11 | Transportes | pág. 24, precedente |
| 12 | Venta de Indumentaria | pág. 25, Claude 0.85 |
| 13 | Venta de boletería en taquilla | pág. 25, Jev 1 |
| 14 | Alquiler Deportivo | pág. 28, precedente |
| 15 | Reintegro de costos y gastos | pág. 28, Jev 1 |
| 16 | Marca Fortaleza | pág. 28, Jev 0.98 |
| 17 | Aprovechamientos | pág. 28, Jev 0.99 |
| 18 | Ajuste al peso | pág. 28, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | El costo detallado a continuación corresponde a la comercialización de artículos deportivos, al 31 de diciembre de: | pág. 25, Jev 0.99 |
| 2 | Sueldos | pág. 25, precedente |
| 3 | Auxilio de Transporte | pág. 25, precedente |
| 4 | Incapacidades | pág. 25, precedente |
| 5 | Bonificaciones | pág. 25, precedente |
| 6 | Cesantías | pág. 25, precedente |
| 7 | Prima de Servicios | pág. 25, precedente |
| 8 | Intereses Sobre Cesantías | pág. 25, precedente |
| 9 | Vacaciones | pág. 25, precedente |
| 10 | Bonificaciones (2ª fila) | pág. 25, precedente |
| 11 | Prima extralegal | pág. 25, Claude 0.85 |
| 12 | Fondos Pensión | pág. 25, precedente |
| 13 | Fondos EPS | pág. 25, Claude 0.8 |
| 14 | Aportes Cajas De Compensación Familiar - Sena - ICBF | pág. 25, precedente |
| 15 | Aportes Administradoras de Riesgos Profesionales | pág. 25, precedente |
| 16 | Indemnizaciones Laborales | pág. 25, precedente |
| 17 | Médicos y drogas | pág. 25, precedente |
| 18 | Arbitraje | pág. 25, Jev 0.99 |
| 19 | Asesoría Jurídica | pág. 25, Jev 1 |
| 20 | Asesoría Técnica | pág. 26, precedente |
| 21 | Derechos Deportivos | pág. 26, precedente |
| 22 | Otros | pág. 26, Jev 1 |
| 23 | Alquiler construcciones y edificaciones | pág. 26, precedente |
| 24 | Alquiler maquinaria y equipo | pág. 26, precedente |
| 25 | Alquiler Terrenos | pág. 26, precedente |
| 26 | Afiliaciones y sostenimientos | pág. 26, precedente |
| 27 | Impuestos | pág. 26, Jev 1 |
| 28 | Seguros | pág. 26, precedente |
| 29 | Seguridad | pág. 26, precedente |
| 30 | Servicios públicos | pág. 26, Jev 0.97 |
| 31 | Transporte de Pasajeros | pág. 26, precedente |
| 32 | Transportes fletes y acarreos | pág. 26, Jev 0.94 |
| 33 | Publicidad y propaganda | pág. 26, Jev 0.99 |
| 34 | Médico y ambulancias | pág. 26, precedente |
| 35 | Logística de partidos | pág. 26, Jev 1 |
| 36 | Legales | pág. 26, Jev 1 |
| 37 | Construcciones y edificaciones | pág. 26, precedente |
| 38 | Maquinaria y equipo | pág. 26, precedente |
| 39 | Muebles y enseres | pág. 26, Claude 0.8 |
| 40 | Flota y equipo de transporte | pág. 26, precedente |
| 41 | Reparaciones locativas | pág. 26, Jev 0.97 |
| 42 | Alojamiento y manutención | pág. 26, Jev 0.97 |
| 43 | Pasajes aéreos y terrestres | pág. 26, precedente |
| 44 | Peajes | pág. 26, precedente |
| 45 | Combustible | pág. 26, precedente |
| 46 | Taxis y buses | pág. 26, Jev 0.92 |
| 47 | Casinos y restaurantes | pág. 26, precedente |
| 48 | Papelería | pág. 26, Jev 0.98 |
| 49 | Parqueadero | pág. 26, precedente |
| 50 | Elementos de aseo y cafetería (Hidratación) | pág. 26, precedente |
| 51 | Implementos Deportivos | pág. 26, precedente |
| 52 | Diversos | pág. 26, Jev 0.99 |
| 53 | Depreciaciones | pág. 26, Jev 1 |
| 54 | Deterioro de inventario | pág. 26, Jev 0.99 |
| 55 | Sueldos (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 56 | Horas extras y recargos | pág. 27, Claude 0.8 |
| 57 | Incapacidades (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 58 | Auxilio de transporte (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 59 | Cesantías (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 60 | Intereses sobre cesantías (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 61 | Prima de servicios (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 62 | Vacaciones (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 63 | Prima extralegal (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 64 | Bonificaciones (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 65 | Aportes fondo de pensiones (administración) | pág. 27, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 66 | Aportes caja de compensación familiar | pág. 27, precedente |
| 67 | Aportes de riesgos laborales | pág. 27, precedente |
| 68 | Aportes a entidades promotora de salud | pág. 27, precedente |
| 69 | Dotación y suministros a trabajadores | pág. 27, Claude 0.8 |
| 70 | Aporte I.C.B.F. | pág. 27, Claude 0.8 |
| 71 | Aporte SENA | pág. 27, Claude 0.85 |
| 72 | Asesoría Jurídica | pág. 27, Jev 1 |
| 73 | Revisoría Fiscal | pág. 27, Jev 0.99 |
| 74 | Afiliaciones y sostenimientos | pág. 27, precedente |
| 75 | Aseo y vigilancia | pág. 27, Claude 0.8 |
| 76 | Energía Eléctrica | pág. 27, Jev 0.99 |
| 77 | Teléfono | pág. 27, Jev 1 |
| 78 | Registro Mercantil | pág. 27, Jev 1 |
| 79 | Tramites y licencias | pág. 27, Claude 0.8 |
| 80 | Construcciones y edificaciones | pág. 27, precedente |
| 81 | Equipo de oficina | pág. 27, Jev 0.97 |
| 82 | Casino Y Restaurante | pág. 28, precedente |
| 83 | Taxis y buses | pág. 28, Jev 0.92 |
| 84 | Depreciaciones | pág. 28, Jev 1 |
| 85 | Deterioro de cartera | pág. 28, Jev 0.97 |
| 86 | Amortizaciones | pág. 28, Jev 0.9 |
| 87 | Gastos no deducibles | pág. 28, Jev 0.99 |
| 88 | Multas sanciones y litigios | pág. 28, Jev 0.96 |
| 89 | Impuestos Asumidos | pág. 28, precedente |
| 90 | Ajuste al Peso | pág. 28, precedente |
| 91 | Intereses de mora | pág. 28, Jev 0.95 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = 1.021.768. Cerrado por la fuerza por decisión de Guido: el resultado antes de impuestos (1.609.817) cierra con las notas, pero ni restando ni sumando el 'Total impuesto a cargo' (589.589) da el resultado impreso; el impuesto contable es 588.049.
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: 'que nunca más vuelva como problema o duda'. Las dudas de localizar y extraer de 2023 las contesta la aritmética (cierra con las notas) y el ajuste de resultado final.
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): cash escalón 1 (compuerta: documento siguiente): "Bancos" pág. 13 + "Caja" pág. 13
tools/caja-deuda.mjs (2026-10-05): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Préstamos y sobregiros bancarios del cuadro de instrumentos financieros, criterio del club; su columna 2022 (238.144) coincide con el documento 2022
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2023 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidenc
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/estados-financieros-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Derechos de televisión nacional | pág. 25, precedente |
| 2 | Federación Colombiana de Futbol | pág. 25, precedente |
| 3 | Auxilio protocolos bioseguridad (*) | pág. 25, precedente |
| 4 | Auxilio hotelero (*) | pág. 25, precedente |
| 5 | Convenio entre clubes | pág. 25, precedente |
| 6 | Auxilio de arbitraje (*) | pág. 25, precedente |
| 7 | Auxilio de transporte (*) | pág. 25, precedente |
| 8 | Otros auxilios | pág. 25, precedente |
| 9 | Infraestructura | pág. 25, precedente |
| 10 | Propaganda y publicidad | pág. 25, precedente |
| 11 | Diferencia en el documento | pág. 25, precedente |
| 12 | Derechos deportivos | pág. 25, precedente |
| 13 | Transportes | pág. 25, precedente |
| 14 | Venta de Indumentaria | pág. 25, precedente |
| 15 | Venta de boletería en taquilla | pág. 25, precedente |
| 16 | Alquiler Deportivo | pág. 30, precedente |
| 17 | Reintegro De Otros Costos Y Gastos | pág. 30, precedente |
| 18 | Aprovechamientos | pág. 30, precedente |
| 19 | Indemnizaciones | pág. 30, Jev 1 |
| 20 | Ajuste Al Peso | pág. 30, precedente |
| 21 | Diversos | pág. 30, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | El costo detallado a continuación corresponde a la comercialización de artículos | pág. 26, precedente |
| 2 | Gastos Laborales | pág. 26, precedente |
| 3 | Honorarios | pág. 26, precedente |
| 4 | Arrendamientos | pág. 26, precedente |
| 5 | Afiliaciones y sostenimientos | pág. 27, precedente |
| 6 | Impuestos | pág. 27, precedente |
| 7 | Seguros | pág. 27, precedente |
| 8 | Servicios | pág. 27, precedente |
| 9 | Legales | pág. 27, precedente |
| 10 | Terrenos | pág. 27, precedente |
| 11 | Construcciones y edificaciones | pág. 27, precedente |
| 12 | Maquinaria y equipo | pág. 27, precedente |
| 13 | Equipo de computación y comunicación | pág. 27, precedente |
| 14 | Muebles y enseres | pág. 27, precedente |
| 15 | Flota y equipo de transporte | pág. 27, precedente |
| 16 | De viaje | pág. 27, precedente |
| 17 | Combustible | pág. 27, precedente |
| 18 | Taxis y buses | pág. 27, precedente |
| 19 | Casinos y restaurantes | pág. 27, precedente |
| 20 | Estampillas | pág. 27, Claude 0.8 |
| 21 | Papelería | pág. 27, precedente |
| 22 | Parqueadero | pág. 27, precedente |
| 23 | Elementos de aseo y cafetería (Hidratación) | pág. 27, precedente |
| 24 | Diversos | pág. 27, precedente |
| 25 | Depreciaciones | pág. 27, precedente |
| 26 | Amortizaciones | pág. 27, precedente |
| 27 | Gastos Laborales (administración) | pág. 28, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 28 | Honorarios | pág. 28, precedente |
| 29 | Impuestos | pág. 28, precedente |
| 30 | Arrendamientos | pág. 28, precedente |
| 31 | Contribuciones y afiliaciones | pág. 28, precedente |
| 32 | Servicios | pág. 28, precedente |
| 33 | Registro Mercantil | pág. 28, precedente |
| 34 | Tramites y licencias | pág. 29, precedente |
| 35 | Maquinaria y Equipo | pág. 29, precedente |
| 36 | Equipo de Computación Y Comunicación | pág. 29, precedente |
| 37 | Equipo De Oficina | pág. 29, precedente |
| 38 | De viaje | pág. 29, precedente |
| 39 | Elementos de Aseo y Cafetería | pág. 29, precedente |
| 40 | Combustibles y Lubricantes | pág. 29, precedente |
| 41 | Útiles Papelería y Fotocopias | pág. 29, precedente |
| 42 | Parqueaderos | pág. 29, precedente |
| 43 | Casino Y Restaurante | pág. 29, precedente |
| 44 | Diversos | pág. 29, precedente |
| 45 | Taxis y buses | pág. 29, precedente |
| 46 | Depreciaciones | pág. 29, precedente |
| 47 | Deterioro de cartera | pág. 29, precedente |
| 48 | Amortizaciones | pág. 29, precedente |
| 49 | Gastos no Deducibles | pág. 29, precedente |
| 50 | Multas sanciones y litigios | pág. 29, precedente |
| 51 | Impuestos Asumidos | pág. 29, precedente |
| 52 | Ajuste Al Peso | pág. 29, precedente |
| 53 | Intereses de mora | pág. 29, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = (175.117). Localizar no eligió el bloque del resultado impreso (el documento trae solo notas). Nota de patrimonio 'Resultados del ejercicio (175.117)'; lo repite el documento 2023 en su columna 2022 (L1099). Antes de impuestos: (199.789), L789.
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra por ajuste manual; las dudas de localizar y extraer no vuelven a la cola.
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): desglose = 54.000. Guido 2026-10-02 (opción a): el renglón dice 2.334.630 y su detalle suma 2.280.630 (error del documento); se abre igual con la diferencia como 'Diferencia en el documento', patrocinio.
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-05): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Préstamos y sobregiros bancarios del cuadro de instrumentos financieros (nota 5), criterio del club; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Efectivo del cuadro de instrumentos financieros (nota 5); el documento 2023 lo abre en Bancos 239.614 + Caja 2.152
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2022 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidenc
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/estados-financieros-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Derechos de televisión nacional(*) | pág. 26, Jev 0.99 |
| 2 | Federación Colombiana de Futbol | pág. 26, Jev 0.97 |
| 3 | Auxilio protocolos bioseguridad(*) | pág. 26, precedente |
| 4 | Auxilio hotelero(*) | pág. 26, ajuste manual (auditoría 2026-10-04, hallazgo 12: auxilio de la Dimayor, como 2020) |
| 5 | Convenio entre clubes | pág. 26, Jev 0.96 |
| 6 | Auxilio de arbitraje(*) | pág. 26, ajuste manual (auditoría 2026-10-04, hallazgo 12: auxilio de la Dimayor, como 2020) |
| 7 | Auxilio de transporte(*) | pág. 26, ajuste manual (auditoría 2026-10-04, hallazgo 12: auxilio de la Dimayor, como 2020) |
| 8 | Infraestructura(*) | pág. 26, precedente |
| 9 | Derechos de televisión internacional(*) | pág. 26, Jev 1 |
| 10 | Propaganda y publicidad | pág. 26, Jev 0.99 |
| 11 | Derechos deportivos | pág. 25, Jev 0.99 |
| 12 | Transportes | pág. 25, precedente |
| 13 | Comercio al por mayor y menor | pág. 25, Jev 0.97 |
| 14 | Alquiler deportivo | pág. 31, precedente |
| 15 | Subsidio nomina gobierno nacional | pág. 31, Jev 0.99 |
| 16 | Reintegro de otros costos y gastos | pág. 31, Jev 1 |
| 17 | Aprovechamientos | pág. 31, Jev 0.99 |
| 18 | Ajuste al peso | pág. 31, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | COSTO DE VENTAS | pág. 26, precedente |
| 2 | Gastos Laborales | pág. 27, precedente |
| 3 | Honorarios | pág. 27, Jev 1 |
| 4 | Arrendamientos | pág. 27, Jev 0.97 |
| 5 | Afiliaciones y sostenimientos | pág. 27, precedente |
| 6 | Seguros | pág. 27, precedente |
| 7 | Servicios | pág. 27, Jev 0.98 |
| 8 | Legales | pág. 27, Jev 1 |
| 9 | Mantenimiento y adecuaciones | pág. 27, precedente |
| 10 | De viaje | pág. 28, Jev 0.97 |
| 11 | Diversos | pág. 28, Jev 0.99 |
| 12 | Depreciaciones | pág. 28, Jev 1 |
| 13 | Amortizaciones | pág. 28, Jev 0.9 |
| 14 | Gastos Laborales (administración) | pág. 28, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 15 | Honorarios | pág. 29, Jev 1 |
| 16 | Impuestos | pág. 29, Jev 1 |
| 17 | Arrendamientos | pág. 29, Jev 0.97 |
| 18 | Contribuciones y afiliaciones | pág. 29, Jev 0.99 |
| 19 | Servicios | pág. 29, Jev 0.98 |
| 20 | Legales | pág. 29, Jev 1 |
| 21 | Mantenimientos | pág. 29, Jev 0.99 |
| 22 | Gastos Diversos | pág. 30, precedente |
| 23 | Depreciaciones | pág. 30, Jev 1 |
| 24 | Amortizaciones | pág. 30, Jev 0.9 |
| 25 | Gastos no deducibles | pág. 30, Jev 0.99 |
| 26 | Multas sanciones y litigios | pág. 30, Jev 0.96 |
| 27 | Impuestos asumidos | pág. 30, precedente |
| 28 | Ajuste al peso | pág. 30, precedente |
| 29 | Intereses de mora | pág. 30, Jev 0.95 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
ajuste manual (Admin/registros/ajustes-manuales.jsonl, 2026-10-05): grossDebt = "Préstamos y sobregiros bancarios" del cuadro de instrumentos financieros (nota 5.A, .md L506); antes 102.513, solo el corto plazo
tools/caja-deuda.mjs (2026-10-05): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Efectivo del cuadro de instrumentos financieros (nota 5.A) = Bancos 14.963 + Caja 5.073
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2021 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidenc
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/estados-financieros-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Derechos De Televisión Nacional | pág. 22, Jev 1 |
| 2 | Venta De Derechos Deportivos | pág. 22, Jev 0.99 |
| 3 | Federación Colombiana De Futbol | pág. 22, Jev 0.97 |
| 4 | Venta De Boletería | pág. 22, Jev 1 |
| 5 | Subsidio Dimayor-Conmebol | pág. 22, precedente |
| 6 | Aux Protocolos Bioseguridad | pág. 22, Jev 0.91 |
| 7 | Auxilio Hotelero | pág. 22, precedente |
| 8 | Auxilio Arbitraje | pág. 22, Jev 0.91 |
| 9 | Convenio Entre Clubes | pág. 22, Jev 0.96 |
| 10 | Auxilio Transporte | pág. 22, precedente |
| 11 | Comercio Al Por Mayor Y Al Por Menor | pág. 21, Jev 0.98 |
| 12 | Alquiler Deportivo | pág. 28, precedente |
| 13 | Subsidio Nomina Gobierno Nal | pág. 28, Jev 0.99 |
| 14 | Reintegro De Otros Costos Y Gastos | pág. 28, Jev 1 |
| 15 | Aprovechamientos | pág. 28, Jev 0.99 |
| 16 | Ajuste Al Peso | pág. 28, Claude 0.8 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Total Costo de Ventas | pág. 23, precedente |
| 2 | Aportes A Administradoras De Riesgos Profesionales | pág. 23, precedente |
| 3 | Indemnizaciones Laborales | pág. 23, precedente |
| 4 | Dotación De Personal | pág. 23, precedente |
| 5 | Medico Y Ambulancias | pág. 24, precedente |
| 6 | Logística De Partidos | pág. 24, Jev 0.99 |
| 7 | Alojamiento Y Manutención | pág. 24, Jev 0.98 |
| 8 | Arbitraje Art 383 | pág. 24, Jev 0.93 |
| 9 | Transporte De Pasajeros | pág. 24, precedente |
| 10 | Elementos De Aseo Y Cafetería | pág. 24, Jev 0.99 |
| 11 | Multas Partidos Dimayor | pág. 24, precedente |
| 12 | Derechos Deportivos | pág. 24, precedente |
| 13 | Pasajes Aéreos | pág. 24, precedente |
| 14 | Combustible | pág. 24, precedente |
| 15 | Elementos Papelería | pág. 24, Jev 0.99 |
| 16 | Peajes | pág. 24, precedente |
| 17 | Parqueadero | pág. 24, precedente |
| 18 | Transportes Fletes Y Acarreos | pág. 24, Jev 0.94 |
| 19 | Sena | pág. 25, precedente |
| 20 | Aportes Administradoras De Riesgos Profe | pág. 25, Claude 0.8 |
| 21 | Horas Extras Y Recargos | pág. 25, Claude 0.8 |
| 22 | Dotación Y Suministro A Trabajadores | pág. 25, Claude 0.8 |
| 23 | Aporte I.C.B.F. | pág. 25, Claude 0.8 |
| 24 | Asesoría Financiera | pág. 25, Jev 0.91 |
| 25 | Asesoría Jurídica | pág. 25, Jev 1 |
| 26 | Asesoría Técnica | pág. 25, precedente |
| 27 | Gravamen Al Movimiento Financiero | pág. 25, Jev 0.96 |
| 28 | Impuesto Al Consumo | pág. 25, Jev 0.99 |
| 29 | Industria Y Comercio | pág. 25, Claude 0.9 |
| 30 | De Vehículos | pág. 25, Jev 0.93 |
| 31 | Construcciones Y Edificaciones | pág. 25, precedente |
| 32 | Terrenos | pág. 25, precedente |
| 33 | Maquinaria Y Equipo | pág. 25, precedente |
| 34 | Flota Y Equipo De Transporte | pág. 25, precedente |
| 35 | Cumplimiento | pág. 25, Claude 0.8 |
| 36 | Responsabilidad Civil Y Extracontractual | pág. 25, Claude 0.85 |
| 37 | Aseo Y Vigilancia | pág. 25, precedente |
| 38 | Propaganda Y Publicidad | pág. 26, Jev 1 |
| 39 | Energía Eléctrica | pág. 26, Jev 0.99 |
| 40 | Servicios Digitación | pág. 26, Claude 0.8 |
| 41 | Transporte fletes Y Acarreos | pág. 26, Jev 0.92 |
| 42 | Teléfono | pág. 26, Jev 1 |
| 43 | Tv Cable | pág. 26, Jev 1 |
| 44 | Acueducto Y Alcantarillado | pág. 26, Jev 1 |
| 45 | Asistencia Técnica | pág. 26, precedente |
| 46 | Gas | pág. 26, Jev 1 |
| 47 | Procesamiento Electrónico De Datos | pág. 26, Jev 0.95 |
| 48 | Correo portes Y Telegramas | pág. 26, Jev 1 |
| 49 | Registro Mercantil | pág. 26, Jev 1 |
| 50 | Tramites Y Licencias | pág. 26, Claude 0.8 |
| 51 | Notariales | pág. 26, Jev 1 |
| 52 | Reparaciones Locativas | pág. 26, Jev 1 |
| 53 | Construcciones Y Edificaciones | pág. 26, precedente |
| 54 | Maquinaria Y Equipo | pág. 26, precedente |
| 55 | Flota Y Equipo De Transporte | pág. 26, precedente |
| 56 | Equipo De Computación Y Comunicación | pág. 26, Jev 0.99 |
| 57 | Equipo Medico-Científico | pág. 26, precedente |
| 58 | Terrenos | pág. 26, precedente |
| 59 | Pasajes Aéreos | pág. 26, precedente |
| 60 | Pasajes Terrestres | pág. 26, precedente |
| 61 | Mejoras A Propiedades Ajenas | pág. 26, precedente |
| 62 | Flota Y Equipo De Transporte | pág. 26, precedente |
| 63 | Equipo De Computación Y Comunicación | pág. 26, Jev 0.99 |
| 64 | Maquinaria Y Equipo | pág. 26, precedente |
| 65 | Intangibles | pág. 26, precedente |
| 66 | Licencias | pág. 26, precedente |
| 67 | Comisiones | pág. 26, precedente |
| 68 | Elementos De Aseo Y Cafetería | pág. 26, Jev 0.99 |
| 69 | Combustibles Y Lubricantes | pág. 26, Jev 1 |
| 70 | Libros Suscripciones Periódicos Y Revistas | pág. 26, Jev 1 |
| 71 | Taxis Y Buses | pág. 26, Jev 0.92 |
| 72 | Útiles Papelería Y Fotocopias | pág. 27, Jev 1 |
| 73 | Parqueaderos | pág. 27, Jev 1 |
| 74 | Gastos No Deducibles | pág. 27, Jev 0.99 |
| 75 | Multas sanciones Y Litigios | pág. 27, Jev 0.96 |
| 76 | Impuestos Asumidos | pág. 27, precedente |
| 77 | Ajuste Al Peso | pág. 27, precedente |
| 78 | Sueldos | pág. ?, precedente |
| 79 | Sueldos (administración) | pág. ?, precedente |
| 80 | Bonificaciones | pág. ?, precedente |
| 81 | Bonificaciones (administración) | pág. ?, precedente |
| 82 | Fondos Pensión | pág. ?, precedente |
| 83 | Fondos Pensión (administración) | pág. ?, precedente |
| 84 | Prima De Servicios | pág. ?, precedente |
| 85 | Prima De Servicios (administración) | pág. ?, precedente |
| 86 | Cesantías | pág. ?, precedente |
| 87 | Cesantías (administración) | pág. ?, precedente |
| 88 | Vacaciones | pág. ?, precedente |
| 89 | Vacaciones (administración) | pág. ?, precedente |
| 90 | Aportes Cajas De Compensación Familiar | pág. ?, precedente |
| 91 | Aportes Cajas De Compensación Familiar (administración) | pág. ?, precedente |
| 92 | Auxilio De Transporte | pág. ?, precedente |
| 93 | Auxilio De Transporte (administración) | pág. ?, precedente |
| 94 | Intereses Sobre Cesantías | pág. ?, precedente |
| 95 | Intereses Sobre Cesantías (administración) | pág. ?, precedente |
| 96 | Aportes A Entidades Promotoras De Salud | pág. ?, precedente |
| 97 | Aportes A Entidades Promotoras De Salud (administración) | pág. ?, precedente |

### Meta

```text
tools/caja-deuda.mjs (2026-10-05): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Bancos 148.882 + Caja 2.483 (nota de efectivo; el cuadro de instrumentos financieros del documento 2021 imprime 151.365 para 2020)
```

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): categoria = competition_bonus. Guido 2026-10-03: coherencia entre años; 'Auxilio hotelero' de los ingresos de actividades ordinarias va como premios de competencia (2019, 2023, 2024 y 2025 ya lo eran).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 727.972. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 257.425. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 101.481. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 29.900. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 89.424. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 29.598. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 71.693. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 24.177. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 67.456. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 23.265. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 31.713. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 11.833. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 30.797. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 10.930. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 29.944. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 4.501. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 6.876. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 2.788. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 404. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad) (la etiqueta se repite en las dos notas: el reemplazo saca las dos y se repone la del equipo)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): fila = 1.630. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = admin_general_expense. Auditoría 2026-10-04 (to-do 138), hallazgo 6 (decisión de Guido 2026-10-05): la nómina de la nota de gastos de administración va a admin_general_expense cuando el documento la separa de la del equipo; reemplaza la respuesta anterior de la cola (todo a wages_squad)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): caja = 151,365. Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Bancos 148.882 + Caja 2.483 (nota de efectivo; el cuadro de instrumentos financieros del documento 2021 imprime 151.365 para 2020)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-05): categoria = competition_bonus. Auditoría 2026-10-04 (to-do 138), hallazgo 12: los auxilios de la Dimayor (arbitraje, transporte, hotelero) van a competition_bonus en todos los años, como el ajuste de Guido de 2020
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2020 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidenc
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/estados-financieros-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venta De Derechos Deportivos | pág. 21, Jev 0.99 |
| 2 | Derechos De Televisión Nacional | pág. 21, Jev 1 |
| 3 | Venta De Boletería | pág. 21, Jev 1 |
| 4 | Auxilio Hotelero | pág. 21, Claude 0.93 |
| 5 | Infraestructura | pág. 21, Jev 0.95 |
| 6 | Auxilio Arbitraje | pág. 21, Jev 0.91 |
| 7 | Aux Mejoramiento De Gestión Organizacional Clubes | pág. 21, Jev 0.96 |
| 8 | Auxilio Análisis Deportivo | pág. 21, precedente |
| 9 | Auxilio Transporte | pág. 21, ajuste manual (auditoría 2026-10-04, hallazgo 12: auxilio de la Dimayor, como 2020) |
| 10 | Federación Colombiana De Futbol | pág. 21, Jev 0.97 |
| 11 | Convenio Entre Clubes | pág. 21, Jev 0.96 |
| 12 | Propaganda Y Publicidad | pág. 21, Jev 0.99 |
| 13 | Venta De Indumentaria | pág. 22, Jev 0.99 |
| 14 | Devoluciones De Productos Comercializados | pág. 22, precedente |
| 15 | Por Incumplimiento De Contratos | pág. 27, precedente |
| 16 | Arrendamientos De Inmuebles | pág. 27, Claude 0.88 |
| 17 | Intereses Por Mora | pág. 27, Jev 1 |
| 18 | Diferencia En Cambio | pág. 27, Jev 1 |
| 19 | Aprovechamientos | pág. 27, Jev 0.99 |
| 20 | Reintegro De Otros Costos Y Gastos | pág. 27, Jev 1 |
| 21 | Otros Ingresos | pág. 27, Jev 0.95 |
| 22 | Ajuste Al Peso | pág. 27, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Total Costo de Ventas | pág. 22, precedente |
| 2 | Gastos Laborales | pág. 22, precedente |
| 3 | Gastos de Viaje | pág. 23, Jev 0.99 |
| 4 | Gastos Legales | pág. 23, Jev 0.99 |
| 5 | Prestación de Servicios Deportivos | pág. 23, precedente |
| 6 | Gastos Laborales (administración) | pág. 24, ajuste manual (auditoría 2026-10-04, hallazgo 6: nómina de la nota de gastos de administración; el documento la separa de la del equipo) |
| 7 | Gastos por Honorarios | pág. 24, Jev 1 |
| 8 | Gastos por Impuestos | pág. 24, Jev 0.99 |
| 9 | Gastos por Arrendamientos | pág. 24, precedente |
| 10 | Gastos por Seguros | pág. 25, Claude 0.9 |
| 11 | Gastos por Servicios | pág. 25, Claude 0.8 |
| 12 | Gastos por Legales | pág. 25, Jev 1 |
| 13 | Gastos por Mantenimiento | pág. 25, Claude 0.8 |
| 14 | Gastos de Viajes | pág. 25, Jev 0.96 |
| 15 | Gastos por Depreciación | pág. 25, Jev 0.98 |
| 16 | Gastos por Amortización | pág. 25, precedente |
| 17 | Gastos Diversos | pág. 25, precedente |
| 18 | Gastos No Deducibles | pág. 26, Jev 0.99 |
| 19 | Donaciones | pág. 26, Jev 1 |
| 20 | Multas Sanciones Y Litigios | pág. 26, Jev 0.94 |
| 21 | Indemnizaciones | pág. 26, Jev 0.99 |
| 22 | Impuestos Asumidos | pág. 26, precedente |
| 23 | Ajuste Al Peso | pág. 26, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = (52,122). Localizar (notas como estado) no vio el resultado impreso y el año quedó como fuente. 'Utilidad Contable' de la liquidación del impuesto 2019; el documento 2020 lo imprime como 'Resultado Año 2019 (52,122)'.
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): fila = (48,426). El total de costos financieros está impreso en positivo y entraba sumando como ingreso; el impuesto calculado daba 114.320 en vez de 17.462.
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra por ajuste manual; las dudas de localizar y extraer no vuelven a la cola.
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: año anterior): "Total Prestamos y Sobregiros Bancarios" pág. 16
tools/caja-deuda.mjs (2026-10-05): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-05): Auditoría 2026-10-04 (to-do 138), caja y deuda: el dato no está en las páginas del balance que lee caja-deuda.mjs: Total Efectivo y Equivalente de Efectivo (nota 8; su columna 2018, 919.687, es lo cargado)
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2019 Categoría Primera B season" (tools/club-league-reference/co.json)
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/estados-financieros-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Actividades Deportivas | pág. 15, precedente |
| 2 | Otros Ingresos | pág. 15, Jev 0.95 |
| 3 | Venta de Productos | pág. 15, precedente |
| 4 | Servicio de Evaluación | pág. 15, Jev 0.96 |
| 5 | Venta Boletería | pág. 15, Jev 1 |
| 6 | Devoluciones en Ventas | pág. 15, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costos de Ventas | pág. 15, precedente |
| 2 | Otros Costos | pág. 15, Jev 0.98 |
| 3 | Nomina | pág. 16, Jev 0.99 |
| 4 | Honorarios | pág. 16, Jev 1 |
| 5 | Impuestos | pág. 16, Jev 1 |
| 6 | Arrendamientos | pág. 17, Jev 0.97 |
| 7 | Afiliaciones y Sostenimiento | pág. 17, precedente |
| 8 | Seguros | pág. 17, precedente |
| 9 | Servicios | pág. 17, Jev 0.98 |
| 10 | Legales | pág. 17, Jev 1 |
| 11 | Mantenimiento | pág. 17, Claude 0.8 |
| 12 | Viajes | pág. 18, precedente |
| 13 | Depreciaciones y Amortizaciones | pág. 18, Jev 0.99 |
| 14 | Otros | pág. 18, Jev 1 |
| 15 | Impuestos Asumidos | pág. 18, precedente |
| 16 | Gastos Ejercicios Anteriores | pág. 18, Jev 0.96 |
| 17 | Multas, Sanciones y L | pág. 18, precedente |
| 18 | Otros | pág. 18, Jev 1 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = (639,077). Localizar (notas como estado) no vio el resultado impreso y el año quedó como fuente. El resultado de 2018 está en la nota de resultados acumulados; lo repiten 2019 (L767) y 2020.
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): fila = (103,918). Nota de gastos financieros (bancarios 31.728 + comisiones 12.692 + intereses 266 + diferencial cambiario 59.233) con el total rotulado 'Total Otros Ingresos' en el PDF, como en 2017: es un costo. Con el signo bien, el impuesto calculado da 40.604 y el documento imprime 'Impuesto de Renta y Complementarios 40,612' (L448).
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra por ajuste manual; las dudas de localizar y extraer no vuelven a la cola.
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-02): cash escalón 0 (compuerta: año anterior): "Bancos" pág. 8 + "Cajas" pág. 8
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: documento siguiente): "Total Prestamos y Sobregiros Bancarios" pág. 11
```

```text
tools/dentro-de-otro.mjs (2026-10-27): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021, 2022, 2023, 2024, 2025)
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2018 Categoría Primera B season" (tools/club-league-reference/co.json)
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/estados-financieros-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aprovechamientos | pág. 19, precedente |
| 2 | Ajuste al Peso | pág. 19, precedente |
| 3 | Actividades Deportivas | pág. 14, precedente |
| 4 | Otros Ingresos | pág. 14, Jev 0.96 |
| 5 | Venta de Productos | pág. 14, precedente |
| 6 | Casa Hogar | pág. 14, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costos de Ventas | pág. 15, precedente |
| 2 | Costos Extraordinarios | pág. 15, Jev 0.97 |
| 3 | Sueldos | pág. 15, precedente |
| 4 | Horas Extras y Recarg | pág. 15, precedente |
| 5 | Incapacidades | pág. 15, precedente |
| 6 | Auxilios de Transport | pág. 15, precedente |
| 7 | Cesantías | pág. 15, precedente |
| 8 | Intereses Sobre Las C | pág. 15, Claude 0.85 |
| 9 | Prima de Servicios | pág. 15, precedente |
| 10 | Vacaciones | pág. 15, precedente |
| 11 | Bonificaciones | pág. 15, precedente |
| 12 | Dotacion y Sum a Trab | pág. 15, Jev 1 |
| 13 | Indmenizaciones Labor | pág. 15, Claude 0.85 |
| 14 | Gastos Deportivos y D | pág. 15, precedente |
| 15 | Aportes Admin de Ries | pág. 15, precedente |
| 16 | Aporte a Salud | pág. 15, precedente |
| 17 | Aportes a Fondos de P | pág. 15, precedente |
| 18 | Aportes a Cajas de Co | pág. 15, precedente |
| 19 | Aportes a Icbf | pág. 15, precedente |
| 20 | Sena | pág. 15, precedente |
| 21 | Gastos Medicos y Drog | pág. 15, Claude 0.85 |
| 22 | Asesoria Juridica | pág. 15, precedente |
| 23 | Asesoria Tecnica | pág. 16, precedente |
| 24 | Comisiones | pág. 16, precedente |
| 25 | Arbitraje Partidos Pr | pág. 16, Jev 0.97 |
| 26 | Impuesto al Consumo | pág. 16, precedente |
| 27 | Impuesto a la Riqueza | pág. 16, Jev 0.98 |
| 28 | Otros | pág. 16, Jev 1 |
| 29 | Terrenos | pág. 16, precedente |
| 30 | Contrucciones y Edifi | pág. 16, Jev 0.92 |
| 31 | Maquinaria y Equipo | pág. 16, precedente |
| 32 | Equipo de Computacion | pág. 16, Jev 0.99 |
| 33 | Ligas de Futbol | pág. 16, precedente |
| 34 | Ditritales Y/O Depart | pág. 16, precedente |
| 35 | Cumplimiento | pág. 16, precedente |
| 36 | Vida Colectiva | pág. 16, Jev 0.93 |
| 37 | Responsabilidad Civil | pág. 16, Jev 1 |
| 38 | Soat | pág. 16, Claude 0.85 |
| 39 | Otros | pág. 16, Jev 1 |
| 40 | Aseo y Vigilancia | pág. 16, precedente |
| 41 | Asistencia Tecnica | pág. 16, precedente |
| 42 | Acueducto y Alcantari | pág. 16, Jev 0.99 |
| 43 | Energia Electrica | pág. 16, precedente |
| 44 | Telefono | pág. 16, precedente |
| 45 | Correo Portes y Teleg | pág. 16, Jev 1 |
| 46 | Transportes, Fletes Y | pág. 16, Jev 0.99 |
| 47 | Gas | pág. 16, precedente |
| 48 | Publicidad Propaganda | pág. 16, precedente |
| 49 | Tv Cable | pág. 16, precedente |
| 50 | Bomberos | pág. 16, precedente |
| 51 | Logistica y Manejo Pa | pág. 16, Claude 0.85 |
| 52 | Recoge Bolas | pág. 16, Claude 0.8 |
| 53 | Otros | pág. 16, Jev 1 |
| 54 | Notariales | pág. 16, precedente |
| 55 | Registro Mercantil | pág. 16, precedente |
| 56 | Tramites y Licencias | pág. 16, precedente |
| 57 | Contrucciones y Edifi | pág. 16, Jev 0.92 |
| 58 | Maquinaria y Equipo | pág. 16, precedente |
| 59 | Equipo de Comunicacio | pág. 16, Jev 0.99 |
| 60 | Flota y Equipo de Tra | pág. 17, Jev 0.97 |
| 61 | Reparaciones Locativa | pág. 17, precedente |
| 62 | Alojamiento y Manuten | pág. 17, Jev 0.99 |
| 63 | Pasajes Aereos | pág. 17, precedente |
| 64 | Pasajes Terrestres | pág. 17, precedente |
| 65 | Flota y Equipo de Trn | pág. 17, Jev 0.99 |
| 66 | Elementos de Aseo y C | pág. 17, Jev 0.98 |
| 67 | Utiles Papeleria y Fo | pág. 17, Jev 1 |
| 68 | Combustibles y Lubric | pág. 17, Jev 0.96 |
| 69 | Taxis y Buses | pág. 17, precedente |
| 70 | Casino y Restaurante | pág. 17, precedente |
| 71 | Parqueaderos | pág. 17, precedente |
| 72 | Polvora y Similares | pág. 17, precedente |
| 73 | Peajes | pág. 17, precedente |
| 74 | Otros | pág. 17, Jev 1 |
| 75 | Auxilio de Transporte | pág. 17, precedente |
| 76 | Bonificaciones | pág. 17, precedente |
| 77 | Dotacion y Suministro | pág. 17, Claude 0.8 |
| 78 | Gastos Medicos y Drog | pág. 17, Claude 0.85 |
| 79 | Asesoria Juridica | pág. 17, precedente |
| 80 | Asesoria Tecnica | pág. 17, precedente |
| 81 | Arbitraje | pág. 17, precedente |
| 82 | Impuesto Boleteria | pág. 17, precedente |
| 83 | Impuesto al Consumo A | pág. 17, Jev 0.99 |
| 84 | Retenciones Asumidas | pág. 17, precedente |
| 85 | Gravamenes | pág. 17, precedente |
| 86 | Otros | pág. 17, Jev 1 |
| 87 | Construcciones y Edif | pág. 17, Jev 0.93 |
| 88 | Equipo de Computacion | pág. 17, Jev 0.99 |
| 89 | Aseo y Vigilancia | pág. 17, precedente |
| 90 | Acueducto y Alcantari | pág. 17, Jev 0.99 |
| 91 | Energia Electrica | pág. 17, precedente |
| 92 | Telefono | pág. 17, precedente |
| 93 | Comunicaciones | pág. 18, Claude 0.8 |
| 94 | Correo | pág. 18, Jev 0.97 |
| 95 | Transporte | pág. 18, precedente |
| 96 | Publicidad | pág. 18, Jev 0.99 |
| 97 | Servicio de Ambulanci | pág. 18, Claude 0.8 |
| 98 | Gas | pág. 18, precedente |
| 99 | Notariales | pág. 18, precedente |
| 100 | Registro Mercantil | pág. 18, precedente |
| 101 | Construcciones y Edif | pág. 18, Jev 0.93 |
| 102 | Maquinaria y Equipo | pág. 18, precedente |
| 103 | Equipo de Oficina | pág. 18, Jev 0.99 |
| 104 | Flota y Equipo de Tra | pág. 18, Jev 0.97 |
| 105 | Instalaciones Electri | pág. 18, precedente |
| 106 | Alojamiento y Manuten | pág. 18, Jev 0.99 |
| 107 | Pasajes Aereos | pág. 18, precedente |
| 108 | Pasajes Terrestres | pág. 18, precedente |
| 109 | Otros | pág. 18, Jev 1 |
| 110 | Comisiones | pág. 18, precedente |
| 111 | Elementos de Aseo y C | pág. 18, Jev 0.98 |
| 112 | Utiles | pág. 18, Claude 0.8 |
| 113 | Combustibles y Lubric | pág. 18, Jev 0.96 |
| 114 | Taxis y Buses | pág. 18, precedente |
| 115 | Casino y Restaurante | pág. 18, precedente |
| 116 | Parqueaderos | pág. 18, precedente |
| 117 | Propiedades | pág. 18, precedente |
| 118 | Amortizacion Marcas y Derechos | pág. 18, precedente |
| 119 | Otros gastos | pág. 19, Jev 1 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): fila = 41,780. Nota 23 partida por un salto de página: las filas quedaron en la pág. 18 y el total solo en la 19; extraer la dejó afuera. (1.468) + 36.151 + 4.658 + 1 + 1.615 + 823 = 41.780.
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): fila = (3,581). El PDF rotula 'Total Otros Ingresos' el total de la nota 25 COSTOS FINANCIEROS (gastos bancarios 389 + comisiones 1.944 + intereses 1.249): es un costo.
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = 1,347,094. El documento no imprime el impuesto en ningún lado (sin estado de resultados, sin nota de impuesto, sin conciliación fiscal); el resultado final está en la nota de patrimonio y lo repiten 2018-2020. El impuesto se deduce.
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-04): fila = 4,220,658. Guido 2026-10-04 (ajuste gratis): con las notas como estado la extracción trajo solo el total de la nota de ingresos; sus partes (L538-541) son las que ya estaban cargadas (4.220,658 + 1.027,45 + 70,183 + 1,6 = 5.319,891)
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-04): fila = 1,027,450. Guido 2026-10-04 (ajuste gratis): con las notas como estado la extracción trajo solo el total de la nota de ingresos; sus partes (L538-541) son las que ya estaban cargadas (4.220,658 + 1.027,45 + 70,183 + 1,6 = 5.319,891)
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-04): fila = 70,183. Guido 2026-10-04 (ajuste gratis): con las notas como estado la extracción trajo solo el total de la nota de ingresos; sus partes (L538-541) son las que ya estaban cargadas (4.220,658 + 1.027,45 + 70,183 + 1,6 = 5.319,891)
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-04): fila = 1,600. Guido 2026-10-04 (ajuste gratis): con las notas como estado la extracción trajo solo el total de la nota de ingresos; sus partes (L538-541) son las que ya estaban cargadas (4.220,658 + 1.027,45 + 70,183 + 1,6 = 5.319,891)
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-27): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021, 2022, 2023, 2024, 2025)
```

### Liga

```text
2017: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2017 Categoría Primera B season" (tools/club-league-reference/co.json)
```

## Gestiones

_antes de Carlos Alberto Barato Méndez (data/gestiones/co.js):_

```text
Barato: fundador de CEIF, presidente y representante legal (firma las certificaciones 2017 y 2019 y el informe 2021 en Clubes/Colombia/Fortaleza CEIF/). Win Sports ubica el cambio de administración en 2015 (solo el año: dia 01).
Hasta: el club anunció su salida el 25/11/2025 (Wikipedia en inglés). Quién lo sucedió no se pudo confirmar: el ejercicio 2025 queda sin cubrir.
```

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-14-2/resultado-8.json, tools/gestiones-tanda.mjs, 2026-10-15):_

```text
Carlos Francisco Serrano Mogollón (2025-01-01 a hoy): Wikipedia (sección Presidentes) lo lista desde el 1 de enero de 2025 (presente), sucediendo a Carlos Barato (1/8/2017 al 31/12/2024); El Espectador (25/11/2025) dice que Barato presidió 'hasta enero de este año'. Ex gerente deportivo del club. El balance 2025 lo firma como Representante Legal, C.C. 79.979.660, en Clubes/Colombia/Fortaleza CEIF/certificacion-ef-2025.md:24-26 (certificación del 12/3/2026) y estados-financieros-2025.md:1467-1469; ya firmaba la certificación 2024 (certificacion-ef-2024.md:24-26). Sin cambio de gestión entre el cierre y la aprobación.
Duda: data/gestiones/co.js (fuera de mi alcance, no editado) tiene a Carlos Alberto Barato Méndez como presidente 2015-01-01 a 2025-11-25 (Win Sports solo dice 2015 como cambio de administración; el 25/11/2025 es la fecha del anuncio de su desvinculación total). Contradice a Wikipedia y a la firma de Serrano como representante legal desde el balance 2024: conviene revisar esa gestión y que termine el 2024-12-31. Nombre de Serrano: la prensa lo llama Francisco Serrano; el nombre completo sale del balance.
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Fortaleza CEIF/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Fortaleza CEIF/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, ? 0.75 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-27): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021, 2022, 2023, 2024, 2025)
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (agregado por la Versión 379: el esqueleto del alta no lo traía).
```

### fortalezaceif-co-estados-financieros-2017

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fortalezaceif-co-estados-financieros-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fortalezaceif-co-estados-financieros-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fortalezaceif-co-estados-financieros-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fortalezaceif-co-estados-financieros-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fortalezaceif-co-estados-financieros-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fortalezaceif-co-estados-financieros-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fortalezaceif-co-estados-financieros-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fortalezaceif-co-estados-financieros-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fortalezaceif-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Fortaleza CEIF/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
