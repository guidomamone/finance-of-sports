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
