# atleticobucaramanga-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/atleticobucaramanga-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Atletico Bucaramanga: alta por tools/alta-club.mjs (2026-10-20) desde Clubes/Colombia/Atletico Bucaramanga/estados-financieros-2019.pdf. brandColor #F3E638
(procedencia en Admin/sourcing/Colombia/Atletico Bucaramanga.md; tools/cargar-lote.mjs).
```

```text
data/co/atleticobucaramanga-co-data.js — Club Atlético Bucaramanga S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-20), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Atletico Bucaramanga/estados-financieros-2019.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "atleticobucaramanga-co" — slug de "Atletico Bucaramanga" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Club Atlético Bucaramanga S.A." — respuesta de Guido en la cola (34ce743): aceptó la propuesta
  displayName        ok        "Atletico Bucaramanga" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (78 de 78 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 7 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2019-12-31" — año del ejercicio + mes de cierre (contenido del .md (78 de 78 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2019-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2019-12-31 = 3277.14 (TRM oficial (Banco de la República / Superfinanciera de Colombia) 
  sourceId           ok        "atleticobucaramanga-co-estados-financieros-2019" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraA" — roster cacheado de "2019 Categoría Primera A season" (tools/club-league-reference/co.json), coincidencia exacta "Atlético Bucaramanga"

FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2019: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2019-12-31","sourceId":"atleticobucaramanga-co-estados-financieros-2019"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Atletico Bucaramanga/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Bucaramanga/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.85 |
| 2 | Gastos de ventas | pág. 1, Claude 0.8 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.9 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020)
```

### Liga

```text
tools/cargar.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2024 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Atlético Bucaramanga".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Atletico Bucaramanga/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Bucaramanga/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.85 |
| 2 | Gastos de ventas | pág. 1, Claude 0.8 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.9 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020)
```

### Liga

```text
tools/cargar.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2023 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Atlético Bucaramanga".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Colombia/Atletico Bucaramanga/estados-financieros-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Bucaramanga/estados-financieros-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquilla venta de boletería | pág. 32, Jev 1 |
| 2 | Publicidad y propaganda | pág. 32, Jev 1 |
| 3 | Derechos de televisión | pág. 32, Jev 1 |
| 4 | Patrocinios | pág. 32, Jev 1 |
| 5 | Auxilio hotelero Dimayor | pág. 32, Jev 0.95 |
| 6 | Auxilio arbitraje Dimayor | pág. 32, Jev 0.9 |
| 7 | Auxilio Logístico Dimayor | pág. 32, Jev 0.99 |
| 8 | Auxilio Federacion Colombiana de Futbol | pág. 32, Claude 0.8 |
| 9 | Auxilio patrocinador bet play Liga femenina 2020 | pág. 32, precedente |
| 10 | Auxilio Pruebas Covid-19 Dimayor | pág. 32, precedente |
| 11 | Auxilio Conmebol evolución | pág. 32, precedente |
| 12 | Otros ingresos | pág. 9, Claude 0.85 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costos de ventas mercancías | pág. 9, Jev 0.97 |
| 2 | Sueldos de administracion | pág. 33, Jev 1 |
| 3 | Auxilio de transporte | pág. 33, Jev 0.97 |
| 4 | Otros Auxilios | pág. 33, Jev 0.94 |
| 5 | Cesantias | pág. 33, Jev 0.97 |
| 6 | Intereses de cesantias | pág. 33, Jev 0.93 |
| 7 | Prima de servicios | pág. 33, Jev 0.97 |
| 8 | Vacaciones | pág. 33, Jev 1 |
| 9 | Bonificaciones | pág. 33, precedente |
| 10 | Indemnizaciones laborales | pág. 33, Jev 0.92 |
| 11 | Aportes a administradores de riesgos profesionales | pág. 33, precedente |
| 12 | Aportes a entidades promotoras de salud e.p.s | pág. 33, precedente |
| 13 | Aportes a fondos de pensiones y o cesantias | pág. 33, precedente |
| 14 | Aportes cajas de compensación familiar | pág. 33, precedente |
| 15 | Gastos medicos | pág. 33, precedente |
| 16 | Honorarios | pág. 33, Jev 1 |
| 17 | Industria y comercio | pág. 34, Claude 0.95 |
| 18 | De timbres | pág. 34, Jev 1 |
| 19 | A la propiedad raíz | pág. 34, Jev 0.99 |
| 20 | Derechos sobre instrumentos publicos | pág. 34, Claude 0.85 |
| 21 | De vehículos | pág. 34, Jev 0.95 |
| 22 | Contribuciones y afiliaciones | pág. 33, Jev 1 |
| 23 | Procesamiento electronico por servicios | pág. 34, Jev 1 |
| 24 | Acueducto y alcantarillado. | pág. 34, Jev 1 |
| 25 | Energía electrica | pág. 34, Jev 1 |
| 26 | Telefono Fijo e Internet | pág. 34, Jev 1 |
| 27 | Transporte, Fletes y Acarreos | pág. 34, Jev 0.98 |
| 28 | Servicio Mensajeria/ domicilios | pág. 34, Claude 0.85 |
| 29 | Logistica | pág. 34, Jev 0.99 |
| 30 | Servicio de administracion edificio | pág. 34, Jev 0.99 |
| 31 | Gastos legales | pág. 33, Jev 1 |
| 32 | Mantenimiento y reparaciones | pág. 33, Jev 0.99 |
| 33 | Construcciones y edificaciones | pág. 34, Jev 0.95 |
| 34 | Equipo de oficina | pág. 34, Claude 0.85 |
| 35 | Equipo de computación y comunicación | pág. 34, Claude 0.85 |
| 36 | Gastos de viaje | pág. 33, Jev 1 |
| 37 | Diversos | pág. 33, precedente |
| 38 | Salario integral | pág. 36, Jev 1 |
| 39 | Sueldos Ordinarios | pág. 36, Claude 0.8 |
| 40 | Auxilio de transporte | pág. 36, Jev 0.97 |
| 41 | Auxilios de vivienda y sostenimiento | pág. 36, precedente |
| 42 | Viaticos | pág. 36, precedente |
| 43 | Incapacidades | pág. 36, Jev 0.98 |
| 44 | Cesantias | pág. 36, Jev 0.97 |
| 45 | Intereses de cesantias | pág. 36, Jev 0.93 |
| 46 | Prima de servicios | pág. 36, Jev 0.97 |
| 47 | Vacaciones | pág. 36, Jev 1 |
| 48 | Otros auxilios | pág. 36, Jev 0.94 |
| 49 | Dotacion y suministro a trabajadores | pág. 36, Jev 0.92 |
| 50 | Indemnizaciones laborales | pág. 36, Jev 0.92 |
| 51 | Aportes a administradoras de riesgos profesionales | pág. 36, Claude 0.8 |
| 52 | Aportes a entidades promotoras de salud eps | pág. 36, Claude 0.8 |
| 53 | Aportes a fondo de pensiones y cesantias | pág. 36, Jev 0.98 |
| 54 | Aportes cajas de compensacion | pág. 36, Claude 0.8 |
| 55 | Aportes icbf | pág. 36, Jev 1 |
| 56 | Aportes sena | pág. 36, Jev 0.98 |
| 57 | Medicamentos y botiquin | pág. 36, precedente |
| 58 | Serv. laboratorio/ examenes | pág. 36, precedente |
| 59 | Servicios medicos | pág. 36, precedente |
| 60 | Premios | pág. 36, Jev 0.92 |
| 61 | Honorarios | pág. 35, Jev 1 |
| 62 | De espectaculos publicos | pág. 36, Jev 0.97 |
| 63 | Impoconsumo 8% | pág. 36, Claude 0.8 |
| 64 | Arrendamientos | pág. 35, precedente |
| 65 | Contribuciones y afiliaciones | pág. 35, Jev 1 |
| 66 | Seguros | pág. 35, Claude 0.85 |
| 67 | Aseo y vigilancia | pág. 37, Jev 0.96 |
| 68 | Servicios Temporales | pág. 37, precedente |
| 69 | Transporte Fletes y Acarreos | pág. 37, Jev 0.97 |
| 70 | Arbitraje | pág. 37, Jev 1 |
| 71 | Logistica | pág. 37, Jev 0.99 |
| 72 | Boleteria | pág. 37, Claude 0.8 |
| 73 | Bomberos | pág. 37, precedente |
| 74 | Cruz roja | pág. 37, precedente |
| 75 | Gastos legales | pág. 35, Jev 1 |
| 76 | Mantenimiento y reparación | pág. 35, precedente |
| 77 | Alojamiento y manuntencion | pág. 37, Jev 0.99 |
| 78 | Pasajes Aereos | pág. 37, Jev 0.95 |
| 79 | Pasajes terrestres | pág. 37, Jev 0.95 |
| 80 | Peajes | pág. 37, precedente |
| 81 | Otros gastos de viaje | pág. 37, Jev 0.91 |
| 82 | Depreciaciones | pág. 35, Jev 1 |
| 83 | Comisiones | pág. 37, precedente |
| 84 | Utiles de Papeleria | pág. 37, Jev 0.93 |
| 85 | Elementos de aseo y cafeteria | pág. 37, Jev 0.99 |
| 86 | Combustibles y lubricantes | pág. 37, Jev 0.98 |
| 87 | Casino y Restaurantes | pág. 37, precedente |
| 88 | Gastos de representación | pág. 37, Jev 0.98 |
| 89 | Prestamo de jugadores | pág. 37, precedente |
| 90 | Otros | pág. 37, Jev 1 |
| 91 | Impuestos asumidos | pág. 38, precedente |
| 92 | Multas sanciones y litigios | pág. 38, Jev 0.93 |
| 93 | Otros gastos | pág. 38, Jev 1 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2020-12-31. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el ejercicio del documento termina el 31 de diciembre de 2020 (todas las sociedades colombianas del club cierran en diciembre)
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): co-primeraA, verificado contra roster cacheado de "2020 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Atlético Bucaramanga".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Colombia/Atletico Bucaramanga/estados-financieros-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Bucaramanga/estados-financieros-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquilla venta de boleteria | pág. 30, Jev 1 |
| 2 | Venta y préstamo de derechos deportivos | pág. 30, Jev 1 |
| 3 | Publicidad y propaganda | pág. 30, Jev 1 |
| 4 | Derechos de televisión | pág. 30, Jev 1 |
| 5 | Patrocinios | pág. 30, Jev 1 |
| 6 | Reclamaciones mecanismo de solidaridad | pág. 30, Jev 0.96 |
| 7 | Auxilio hotelero Dimayor | pág. 30, Jev 0.95 |
| 8 | Auxilio Federacion Colombiana de Futbol | pág. 30, Claude 0.8 |
| 9 | Auxilio patrocinador bet play Liga 2020 | pág. 30, precedente |
| 10 | Otros Auxilios Dimayor | pág. 30, Jev 0.95 |
| 11 | Otros ingresos | pág. 9, Claude 0.85 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costos de ventas mercancias | pág. 9, Jev 0.97 |
| 2 | Sueldos de administracion | pág. 31, Jev 1 |
| 3 | Auxilio de transporte | pág. 31, Jev 0.97 |
| 4 | Otros Auxilios | pág. 31, Jev 0.94 |
| 5 | Cesantias | pág. 31, Jev 0.97 |
| 6 | Intereses de cesantias | pág. 31, Jev 0.93 |
| 7 | Prima de servicios | pág. 31, Jev 0.97 |
| 8 | Vacaciones | pág. 31, Jev 1 |
| 9 | Indemnizaciones laborales | pág. 31, Jev 0.92 |
| 10 | Aportes a administradores de riesgos profesionales | pág. 31, precedente |
| 11 | Aportes a entidades promotoras de salud e.p.s | pág. 31, precedente |
| 12 | Aportes a fondos de pensiones y o cesantias | pág. 31, precedente |
| 13 | Aportes cajas de compensación familiar | pág. 31, precedente |
| 14 | Aportes i.c.b.f. | pág. 31, Jev 0.96 |
| 15 | Aportes sena | pág. 31, Jev 0.98 |
| 16 | Honorarios | pág. 31, Jev 1 |
| 17 | Arrendamientos | pág. 31, Claude 0.8 |
| 18 | Servicios | pág. 31, Jev 1 |
| 19 | Gastos legales | pág. 31, Jev 1 |
| 20 | Mantenimiento y reparaciones | pág. 31, Jev 0.99 |
| 21 | Depreciaciones | pág. 31, Jev 1 |
| 22 | Gastos varios | pág. 31, precedente |
| 23 | Provisiones demandas laborales | pág. 31, precedente |
| 24 | Salario integral | pág. 33, Jev 1 |
| 25 | Sueldos Ordinarios | pág. 33, Claude 0.8 |
| 26 | Auxilio de transporte | pág. 33, Jev 0.97 |
| 27 | Auxilios de vivienda y sostenimiento | pág. 33, precedente |
| 28 | Viaticos | pág. 33, precedente |
| 29 | Cesantias | pág. 33, Jev 0.97 |
| 30 | Intereses de cesantias | pág. 33, Jev 0.93 |
| 31 | Prima de servicios | pág. 33, Jev 0.97 |
| 32 | Vacaciones | pág. 33, Jev 1 |
| 33 | Otros auxilios | pág. 33, Jev 0.94 |
| 34 | Dotacion y suministro a trabajadores | pág. 33, Jev 0.92 |
| 35 | Indemnizaciones laborales | pág. 33, Jev 0.92 |
| 36 | Aportes a administradoras de riesgos profesionales | pág. 33, Claude 0.8 |
| 37 | Aportes a entidades promotoras de salud eps | pág. 33, Claude 0.8 |
| 38 | Aportes a fondo de pensiones y cesantias | pág. 33, Jev 0.98 |
| 39 | Aportes cajas de compensacion | pág. 33, Claude 0.8 |
| 40 | Aportes icbf | pág. 33, Jev 1 |
| 41 | Aportes sena | pág. 33, Jev 0.98 |
| 42 | Medicamentos y botiquin | pág. 33, precedente |
| 43 | Serv. laboratorio/ examenes | pág. 33, precedente |
| 44 | Servicios medicos | pág. 33, precedente |
| 45 | Premios | pág. 33, Jev 0.92 |
| 46 | De vehiculos | pág. 33, Jev 0.95 |
| 47 | De espectaculos publicos | pág. 33, Jev 0.97 |
| 48 | Impoconsumo 8% | pág. 33, Claude 0.8 |
| 49 | Arrendamientos | pág. 32, Claude 0.8 |
| 50 | Contribuciones y afiliaciones | pág. 32, Jev 1 |
| 51 | Seguros | pág. 32, Claude 0.85 |
| 52 | Aseo y vigilancia | pág. 34, Jev 0.96 |
| 53 | Servicios Temporales | pág. 34, precedente |
| 54 | Servicios publicos | pág. 34, Jev 0.99 |
| 55 | Transporte Fletes y Acarreos | pág. 34, Jev 0.97 |
| 56 | Sub 20 | pág. 34, Jev 0.95 |
| 57 | Arbitraje | pág. 34, Jev 1 |
| 58 | Logistica | pág. 34, Jev 0.99 |
| 59 | Refrigerios | pág. 34, precedente |
| 60 | Alquiler cancha | pág. 34, Jev 0.93 |
| 61 | Boleteria | pág. 34, Claude 0.8 |
| 62 | Mantenimiento gramilla | pág. 34, precedente |
| 63 | Servicio administracion | pág. 34, Jev 1 |
| 64 | Utilidad | pág. 34, precedente |
| 65 | Convenio publicidad | pág. 34, Jev 0.98 |
| 66 | Inscripciones torneos | pág. 34, Jev 0.99 |
| 67 | Bomberos | pág. 34, precedente |
| 68 | Cruz roja | pág. 34, precedente |
| 69 | Ambulancia | pág. 34, Jev 0.99 |
| 70 | Convenios | pág. 34, precedente |
| 71 | No deducibles | pág. 34, Jev 0.97 |
| 72 | Vallas | pág. 34, precedente |
| 73 | Imprevistos | pág. 34, precedente |
| 74 | Servicios no gravados | pág. 34, precedente |
| 75 | Asesorias deportivas | pág. 34, precedente |
| 76 | Asesoria medica | pág. 34, precedente |
| 77 | Gastos legales | pág. 32, Jev 1 |
| 78 | Mantenimiento y reparación | pág. 32, precedente |
| 79 | Alojamiento y manuntencion | pág. 35, Jev 0.99 |
| 80 | Pasajes Aereos | pág. 35, Jev 0.95 |
| 81 | Pasajes terrestres | pág. 35, Jev 0.95 |
| 82 | Peajes | pág. 35, precedente |
| 83 | Depreciaciones | pág. 32, Jev 1 |
| 84 | Utiles de Papeleria | pág. 35, Jev 0.93 |
| 85 | Combustibles y lubricantes | pág. 35, Jev 0.98 |
| 86 | Taxis y buses | pág. 35, Jev 0.97 |
| 87 | Casino y Restaurantes | pág. 35, precedente |
| 88 | Prestamo de jugadores | pág. 35, precedente |
| 89 | Diversos | pág. 35, precedente |
| 90 | Impuestos asumidos | pág. 36, precedente |
| 91 | Demandas laborales (a) | pág. 36, precedente |
| 92 | Indemnizaciones | pág. 36, Jev 0.99 |
| 93 | Multas sanciones y litigios (b) | pág. 36, Jev 0.92 |
| 94 | Otros gastos | pág. 36, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-20): co-primeraA, verificado contra roster cacheado de "2019 Categoría Primera A season" (tools/club-league-reference/co.json), coincidencia exacta "Atlético Bucaramanga".
```

## Fuentes

### atleticobucaramanga-co-estados-financieros-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Colombia/Atletico Bucaramanga/estados-financieros-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticobucaramanga-co-estados-financieros-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Colombia/Atletico Bucaramanga/estados-financieros-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticobucaramanga-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Atletico Bucaramanga/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticobucaramanga-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Atletico Bucaramanga/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
