# Argentinos Juniors

**Ángulos**: sitio oficial: parcial — falta seguir el hilo de "Sede Virtual"/portal de socios (ver
abajo) · Wayback CDX: agotado (dominio completo, sin nada posterior a 2018-19 salvo el resumen 2022
ya conocido) · búsqueda web: parcial — encontradas 2 noticias oficiales con evidencia de ejercicios
más nuevos, imágenes de la de 2019-20 recuperadas y transcriptas completas 2026-09-27 (ver abajo,
totales sin desglose de rubros) · regulador/país: no aplica — 2026-09-27.

- **Ejercicio 2019-20 (y en realidad 2014-2020 completo): imágenes RECUPERADAS 2026-09-27 con
  Browser pane real — la sesión anterior las daba por bloqueadas por un problema de RED, y en
  realidad era falta de headers.** La noticia oficial
  `argentinosjuniors.com.ar/noticias/institucional/informe-contable/` (29/10/2020) tiene 2 imágenes
  (`i.ibb.co/gJSBgrV/1a.jpg`, `i.ibb.co/NyhkqSZ/1b.jpg`, subidas por el propio club) que un `curl`
  simple devolvía HTTP 200 con cuerpo vacío — **no era un bloqueo de red, faltaba `-A
  "Mozilla/5.0..." -e "https://i.ibb.co/"` (User-Agent + Referer)**, con eso `curl` las baja
  perfecto (116.331 y 113.079 bytes, JPEG válido, EXIF `datetime=2020:10:29`, confirma que son del
  mismo día de la noticia). Descargadas a
  `Clubes/Argentina/Argentinos Juniors/informe-contable-2019-20-{resultados,patrimonial}.jpg`.
  **Gotcha genérico para el futuro**: si otro caso de `i.ibb.co` (o un host de hosting de imágenes
  similar) da 200 con cuerpo vacío, probar headers de navegador antes de asumir bloqueo de red.

  **Contenido completo transcripto** (son 2 tablas comparativas de gestión, "cifras ajustadas por
  inflación" — RT6/moneda homogénea, NO nominal, y sin desglose de rubros — más 2 gráficos):

  *Estados de Resultados Comparativos* (`1a.jpg`), por ejercicio cerrado 30/06:
  | | 2020 | 2019 | 2018 | 2017 | 2016 | 2015 | 2014 |
  |---|---|---|---|---|---|---|---|
  | Total de Recursos | 845.296.681 | 1.657.368.259 | 1.357.887.038 | 560.745.591 | 358.885.943 | 426.216.338 | 441.228.162 |
  | Total de Gastos | -713.172.803 | -1.564.341.102 | -605.713.766 | -451.145.946 | -412.596.334 | -701.688.798 | -589.402.652 |
  | Result. antes efecto financiero | 132.123.878 | 93.027.157 | 752.173.273 | 109.599.645 | -53.710.390 | -275.472.460 | -148.174.491 |
  | Result. financieros y por tenencia, netos | -1.281.152 | 77.247.303 | -44.352.705 | -20.899.445 | -30.718.246 | -50.813.776 | -34.238.719 |
  | **Superávit/(Déficit) del Ejercicio** | **130.842.726** | **170.274.460** | **707.820.568** | **88.700.200** | **-84.428.636** | **-326.286.236** | **-182.413.210** |

  *Estados de Situación Patrimonial Comparativos* (`1b.jpg`), al cierre 30/06:
  | | 2020 | 2019 | 2018 | 2017 | 2016 | 2015 | 2014 |
  |---|---|---|---|---|---|---|---|
  | Activo Corriente | 501.870.794 | 250.182.686 | 766.537.321 | 184.841.256 | 44.046.758 | 122.746.086 | 117.192.351 |
  | Activo No Corriente | 2.495.693.921 | 2.353.697.024 | 2.234.402.942 | 1.475.692.879 | 1.777.775.274 | 1.482.682.740 | 343.033.642 |
  | TOTAL DEL ACTIVO | 2.997.564.715 | 2.603.879.710 | 3.000.940.263 | 1.660.534.135 | 1.821.822.032 | 1.605.428.826 | 460.225.994 |
  | Pasivo Corriente | 436.039.154 | 320.644.839 | 522.903.441 | 541.593.211 | 408.645.713 | 898.033.923 | 584.007.531 |
  | Pasivo No Corriente | 200.013.799 | 32.777.868 | 30.886.021 | 184.293.705 | 408.982.001 | 70.660.961 | 82.067.745 |
  | TOTAL DEL PASIVO | 636.052.953 | 353.422.707 | 553.789.462 | 725.886.916 | 817.627.714 | 968.694.884 | 666.075.276 |
  | **PATRIMONIO NETO** | **2.361.511.762** | **2.250.457.003** | **2.447.150.801** | **934.647.219** | **1.004.194.318** | **636.733.942** | **-205.849.283** |

  Índices: Liquidez (2020→2014) 1,15 / 0,78 / 1,47 / 0,34 / 0,11 / 0,14 / 0,20. Solvencia: 3,71 /
  6,37 / 4,42 / 1,29 / 1,23 / 0,66 / -0,31. Endeudamiento: 0,27 / 0,16 / 0,23 / 0,78 / 0,81 / 1,52 /
  -3,24. Rentabilidad: 0,06 / 0,08 / 0,41 / 0,10 / -0,08 / -0,34 / -7,78. **Hallazgo real: patrimonio
  neto NEGATIVO en 2014** (-205.849.283, con solvencia -0,31 y rentabilidad -7,78) — el club estaba
  técnicamente en quiebra patrimonial ese ejercicio, dato que ningún otro documento del proyecto
  tenía todavía.

  **Por qué esto SIGUE sin cargarse al sitio, a pesar de tener ahora el contenido completo**: son 2
  tablas de totales de un informe de gestión interno (para la Asamblea de Representantes), en moneda
  HOMOGÉNEA (reexpresada, no nominal) y SIN desglose de rubros — no hay
  `revenueLines`/`expenseLines` posibles con esto, solo el total. Los ejercicios 2015-2018 YA están
  cargados con cifras NOMINALES reales (OCR de los balances completos, ver más abajo) — mezclar esos
  con estos totales RT6 sería inconsistente. Lo que SÍ es nuevo y no estaba disponible antes: un
  total real (aunque sin desglose) para el **Ejercicio 2019-20** (Superávit RT6 130.842.726,
  Patrimonio Neto 2.361.511.762) y confirmación de que el patrimonio neto de 2014 fue negativo.
  Sigue siendo candidato a mail (pedirle al club el balance auditado completo de 2019-20, con Anexos
  de rubros) — ahora con más detalle para justificar el pedido.
- **Ejercicio 2024-25: CONFIRMADO que existe, no publicado.** Noticia oficial
  `.../presentacion-de-los-estados-contables-del-ejercicio-2024-2025/` confirma Estados Contables al
  30/6/2025 aprobados por unanimidad en Comisión Directiva el 15/10/2025 (superávit >$5.600M ARS,
  liquidez 1.13, activo +30% por compra de jugadores), a tratarse en la Asamblea General Ordinaria del
  30/10/2025 — sin PDF ni imagen adjunta en la noticia (se revisó el HTML crudo completo). Mencionan
  un portal "Virtual Office"/"Sede Virtual" en `portal.ourclub.io/argentinosjrs` para socios — portal
  de socios gateado (login), mismo patrón que otros clubes del proyecto, no explorable sin credenciales
  de socio (decisión de Guido, no tarea de sourcing).
- **Página de Descargas (`el-club/descargas/`) confirmada sin cambios**: sigue topando en Balance
  2018-19/Memoria 2018-19 (ya descargados). El dominio de los links de esa página resolvió como
  `argentinosjuniors.mystagingwebsite.com` en un fetch — parece un artefacto de caché/staging del
  fetch, no algo para perseguir (los archivos en sí, vía `images/download/...`, siguen siendo del
  dominio real cuando se resuelven directo).
- Archivo oficial de descargas — https://argentinosjuniors.com.ar/el-club/descargas/ (sección
  "Club > Descargas > Balances"). Descargados 9 PDFs reales a `Clubes/Argentina/Argentinos Juniors/`:
  balances completos con estados contables + informe de auditoría + informe del Órgano de
  Fiscalización de los ejercicios cerrados 30/6/2016, 2017, 2018 y 2019 (`balance-2015-2016.pdf` a
  `balance-2018-2019.pdf`), una memoria narrativa separada del mismo último ejercicio
  (`memoria-2018-2019.pdf`), dos tablas comparativas de patrimonio del Órgano de Fiscalización
  (`resumen-organo-fiscalizacion-2018.pdf`, ejercicios 2014-2018; `resumen-organo-fiscalizacion-2022.pdf`,
  ejercicios 2019-2023), una presentación de asamblea con comparativo patrimonial 2015-2019
  (`presentacion-asamblea-2018-2019.pdf`) y un dictamen legal institucional
  (`dictamen-presidencia-comision-fiscalizadora.pdf`).
- **5 ejercicios YA CARGADOS en el sitio: 2015 a 2019** (Versión 95, con un FIX importante en una
  sesión posterior). Carga original (Versión 95): los 5 desde `presentacion-asamblea-2018-2019.pdf`
  (2 páginas, comparativo de los 5 ejercicios a la vez, 4 categorías agregadas). BUG REAL
  ENCONTRADO Y CORREGIDO: esa presentación dice explícito en su título "cifras en pesos AJUSTADAS
  POR INFLACIÓN" — no son pesos nominales como el resto del sitio. Se OCRearon los 3 balances
  escaneados (`balance-2015-2016.pdf`, `balance-2016-2017.pdf`, `balance-2017-2018.pdf`, 39+45+31
  páginas, Tesseract) y se reemplazaron los ejercicios 2015-2018 con sus cifras REALES (nominales),
  con detalle completo de Anexo IV (Recursos por rubro) y Anexo V (Gastos por rubro x
  departamento). Resultados reales (nominales, corregidos): DÉFICIT 2015 $(67.509.882) / DÉFICIT
  2016 $(24.707.096) / SUPERÁVIT 2017 $30.812.797 / SUPERÁVIT 2018 $318.336.988 — TODOS muy
  distintos de las cifras restated que decía la carga original (ej. 2018 pasó de $495.815.894 a
  $318.336.988). El Ejercicio 2019 NO se tocó (sigue en $119.274.273, desde la presentación de
  asamblea) porque `balance-2018-2019.pdf` (a pesar del nombre) resultó ser la Memoria narrativa
  completa, sin una sola cifra de balance — no hay balance auditado real de ese ejercicio
  descargado para reemplazarlo. Ver comentario de cabecera completo en
  `data/argentinosjuniors-data.js` (incluye un error aritmético de $20.000 encontrado y documentado
  en el propio Anexo IV del balance 2015-2016, verificado visualmente, no es un error de
  transcripción).
- Pendiente: balance completo de los ejercicios 2019-20 en adelante — no están en la página de
  Descargas. El botón "Memoria 2017-2018" de esa misma página está mal linkeado (apunta al resumen
  2022 en vez de a la memoria real), así que esa memoria puntual sigue sin conseguirse pese a que el
  balance completo de ese ejercicio sí se bajó. También pendiente: un balance auditado real del
  Ejercicio 2018/2019 (2019), para confirmar/corregir la única cifra que sigue sin verificar contra
  un documento primario propio.
- Contacto: sección "Institucional" del sitio (anuncia cada aprobación de memoria y balance, buena
  fuente para monitorear ejercicios nuevos) — para pedido directo, DM a @AAAJoficial o sección Socios.
- Último chequeo: 2026-09-27.
- Color de marca: `#E32021` — tabla por liga de footylogos (Liga Profesional Argentina), 1er
  color, exacto, verificado 2026-09-21. Wikipedia dice explícitamente que el rojo predomina
  (desempate (b) de bicolores).
