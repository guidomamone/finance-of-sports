# Notas generales — Colombia

## Contexto regulatorio y metodología SIIS

Sorpresa positiva de esta investigación: varios clubes colombianos organizados como S.A. deben
presentar un "Informe Periódico de Fin de Ejercicio" a la asamblea de accionistas (circular 012 de
2022 de la Superintendencia Financiera de Colombia) que incluye estados financieros completos, no
solo narrativa — y varios lo cuelgan en su propio sitio.

**Actualización de esta sesión — la veta de SIIS (Supersociedades) confirmada y operada con éxito.**
Se logró navegar `siis.ia.supersociedades.gov.co` (portal público, gratuito, sin login) con el
browser interactivo: buscando cada club por NIT (la búsqueda por nombre completo NO funciona bien —
devuelve miles de resultados irrelevantes o ninguno; hace falta el NIT exacto, googleable como
"[club] S.A. NIT"), la ficha de resultados trae un resumen de Activos/Ingresos/Utilidad Neta del
ejercicio más reciente, y el botón "VISTA 360" de cada resultado → "VER OTROS DOCUMENTOS
ADICIONALES" revela una tabla de radicados con 3 PDFs reales por ejercicio: "NOTAS EF" (que a pesar
del nombre es el paquete COMPLETO — situación financiera + resultado integral + cambios en
patrimonio + flujo de efectivo + notas, 30-60 páginas), "CERTIFICACION EF" (certificación corta del
representante legal/contador) y "DICTAMEN DEL REVISOR FISCAL" (opinión de auditoría). Cada link
"Ver" de esa tabla abre un visor (`servicios.supersociedades.gov.co/bpmformularios/...`) cuya
petición de red real apunta a un PDF descargable directo en
`.../bpmformularios/tmp/<radicado>/<radicado>.PDF` — hay que inspeccionar las network requests del
browser para sacar esa URL exacta, no está en el HTML visible. Con este método se armaron carpetas
nuevas para 5 clubes más, todos con el ejercicio 2025 (comparativo con 2024) recién presentado en
enero de 2026:


## Nota técnica sobre SIIS para la próxima sesión

- El patrón para cualquier club colombiano nuevo: (1) googlear "[club] S.A. NIT" para conseguir el
  número de 9 dígitos; (2) entrar a siis.ia.supersociedades.gov.co, pegar el NIT en el buscador
  (NO el nombre — no filtra bien) y click en "BUSCAR"; (3) elegir el resultado con Punto de entrada
  "Individuales" (o el que corresponda al ejercicio más reciente si hay varios) y click "VER
  DETALLES" para ver el resumen Activos/Ingresos/Utilidad, o "VISTA 360" directo; (4) en Vista 360,
  click "Ver otros documentos adicionales" — si aparece una tabla con radicados, esos SON los PDFs
  reales; (5) abrir cada link "Ver" (usa un popup bloqueado por algunos entornos — mejor
  `navigate()` directo a la URL del link) y de las network requests de esa página sacar la URL real
  del PDF (patrón `.../bpmformularios/tmp/<radicado>/<radicado>.PDF`, descargable directo con curl).
  El sitio a veces entra en mantenimiento ("Estamos actualizando SIIS...") por minutos — reintentar
  más tarde si pasa. **La lista de "quedan sin explorar" que había acá (Barranquilla F.C.,
  Bucaramanga, Envigado, Once Caldas, Tolima…) quedó vieja el 2026-09-22**: Envigado, Once Caldas y
  Tolima ya están cargados, y Bucaramanga se sourceó en esa sesión. La lista actualizada de
  candidatos está al final de este archivo, en la sección de la API.
- Contacto: siis.ia.supersociedades.gov.co; informes agregados ya bajables en
  supersociedades.gov.co/documents/20122/532936/Informe-futbol-pdf.pdf (no es por club, pero sirve
  de cifra de control/contexto).
- Último chequeo: 2026-09-12.


## SIIS ya NO necesita browser: es una API JSON pública, scripteable con `curl` puro (2026-09-22)

**Hallazgo más importante de la sesión 2026-09-22, y reemplaza el procedimiento de clicks descripto
arriba.** El portal SIIS es una SPA (Vite/React) que por debajo habla con dos endpoints abiertos,
sin login, sin API key y sin captcha. Todo el flujo — encontrar el club, enumerar sus ejercicios,
listar sus documentos y bajar cada PDF — se hace con `curl` desde la línea de comandos. El browser
sirve solo para descubrir los endpoints, no para operarlos. Esto pone a Colombia en el mismo grupo
que Bélgica, Dinamarca, Grecia, Noruega y República Checa (ver `club-sourcing`), no en el de los
portales que exigen navegación real.

**Paso 1 — buscar el club (Elasticsearch abierto).**

```
POST https://siis.ia.supersociedades.gov.co/siis_backend/api/v1/qr/siis_empresas/_search?size=100
Content-Type: application/json
{"query":{"query_string":{"query":"\"ATLETICO BUCARAMANGA\"","default_field":"nombreEmpresa"}}}
```

Acepta query DSL completo de Elasticsearch, incluidas **agregaciones**. Esto resuelve de raíz el
problema viejo de "la búsqueda por nombre no filtra bien, hace falta el NIT": ahora se puede buscar
por nombre, y **además se puede enumerar la liga entera de una sola consulta**, agregando por razón
social sobre el CIIU deportivo:

```
{"query":{"match_phrase":{"actividadesEconomicas":"Actividades de clubes deportivos"}},
 "aggs":{"e":{"terms":{"field":"nombreEmpresa.keyword","size":300}}}}
```

Los CIIU que importan son tres, no uno — un club puede estar en cualquiera de ellos y hay que mirar
los tres antes de declarar un dead-end: **R9312** (Actividades de clubes deportivos, 373 docs),
**R9319** (Otras actividades deportivas, 43) y **R9311** (Gestión de instalaciones deportivas, 38).
Boyacá Chicó, La Equidad y Fortaleza CEIF están en R9319, no en R9312.

Cada documento del índice es un par (NIT, fechaCorte). Los campos útiles: `NIT`, `nombreEmpresa`,
`fechaCorte`, `puntoEntrada`, `ciudad`, `actividadesEconomicas`, un bloque `financieros` con
activos/ingresos/utilidades/ROE/ROA ya calculados (la misma "vista SIIS" que antes había que leer
en pantalla), y **`infoEmpresa.num_radicado`**, que es la llave del paso 2.

**Paso 2 — listar los documentos de ese ejercicio.**

```
GET https://siis.ia.supersociedades.gov.co/plantillas-api/documentos-adicionales?numero-radicado=<num_radicado>
```

Devuelve JSON con `aditionals[]`: `numeroRadicado`, `nombreTramite` ("NOTAS EF", "DICTAMEN DEL
REVISOR FISCAL", "CERTIFICACION EF", "INFORME DE GESTION") y `url` con el token cifrado. Esto es
exactamente lo que antes había que sacar clickeando "Ver otros documentos adicionales" en la Vista
360.

- **Ojo con una trampa del índice**: el campo `infoEmpresa.documentos_adicionales` que viene en la
  respuesta de Elasticsearch está **desactualizado — viene vacío para todos los ejercicios de 2021
  en adelante**, aunque los documentos existan. Si se confía en ese campo, un club con serie
  completa parece tener datos solo hasta 2020. El endpoint `documentos-adicionales` del paso 2 sí
  los devuelve bien para todos los años. **Usar siempre el endpoint, nunca el campo del índice.**

**Paso 3 — bajar el PDF. Son tres requests, y el orden importa.**

1. `GET .../bpmformularios/VisualizarDocumentos.aspx?Radicado=<token>` — devuelve solo un shell HTML
   con un `$.ajax` al subvisor. No sirve por sí solo.
2. `GET .../bpmformularios/subvisor.aspx?Radicado=<token>` — **este es el que materializa el archivo
   temporal en el servidor**, y además devuelve el HTML donde está la ruta real. Saltear este paso
   es la causa del 404 que la nota vieja atribuía a `VisualizarDocumentos.aspx`.
3. `GET .../bpmformularios/tmp/<ruta sacada del paso 2>` con `Referer` apuntando al subvisor.

- **Corrección importante al patrón viejo `.../tmp/<radicado>/<radicado>.PDF`: NO siempre es así.**
  El nombre del archivo adentro de la carpeta del radicado a veces es el radicado
  (`tmp/2025-01-266651/2025-01-266651.PDF`) y a veces es un nombre interno arbitrario
  (`tmp/2024-01-344261/1wr6f501!.PDF`). **Hay que parsearlo del HTML del subvisor**
  (`.//tmp/<...>.PDF` o `cache-baranda/<...>.PDF`), no construirlo. Adivinarlo da 404 silencioso, y
  fue lo que hizo fallar los primeros 9 ejercicios de Envigado antes de encontrar la causa. Ojo
  también con los `!` y demás caracteres del nombre: hay que URL-encodearlos.
- Mandar `User-Agent` de navegador real en todo el flujo, y usar un cookie-jar (`curl -c/-b`)
  compartido entre los 3 requests.

**Límite de concurrencia real (gotcha de esta sesión)**: con 5 procesos bajando en paralelo, el
subvisor empezó a devolver HTML sin ninguna ruta de PDF adentro — no un error, simplemente la página
sin el archivo. No es un bloqueo permanente ni un problema del documento: es throttling. **Bajar de
a 1 o 2 procesos como máximo, con reintentos espaciados**, es más rápido de punta a punta que
paralelizar y tener que reparar.

**Un club que no aparece en SIIS no es "no se buscó bien": suele tener una causa societaria.** De
los 10 clubes de la Primera A que faltaban al empezar esta sesión, 7 estaban en SIIS y 3 no
(Independiente Medellín, Deportivo Pasto, y Águilas Doradas — este último sí estaba, pero bajo otro
nombre). Ver el archivo de cada uno. La regla que salió de ahí:
- **Buscar por la razón social de la SOCIEDAD, no por el nombre del club.** Águilas Doradas
  (Rionegro) deposita como **TALENTO DORADO S.A.** (NIT 900456885), que es la sociedad dueña del
  club — buscando "Águilas Doradas" no aparece nada. Mismo gotcha que Alemania (razón social vs.
  nombre de fantasía) y Corea del Sur (la entidad del chaebol). El atajo para encontrarlo sin
  adivinar es la agregación por CIIU deportivo de arriba, filtrando por ciudad/departamento.
- Si después de eso sigue sin aparecer, chequear la forma jurídica: Pasto era **asociación** (recién
  ahora se convirtió a S.A.), y la sociedad del DIM figura "en liquidación" mientras opera una
  **corporación**. Ninguna de las dos figuras está en el perímetro de Supersociedades.

**SIIS SÍ da el estado de resultados primario por rubro (2026-10-26).** El portal tiene una pantalla «Informe Integral»
(`/resultadointegral`) que sale de otro índice abierto, `siis_resultadointegral`, con el mismo formato de consulta que `siis_empresas`:

```
POST https://siis.ia.supersociedades.gov.co/siis_backend/api/v1/qr/siis_resultadointegral/_search?size=50
{"query":{"match":{"resultado.NIT":"890700863"}},"sort":[{"resultado.fechaCorte":"asc"}]}
```

Cada hit trae `resultado.registros`, en miles de pesos con el año anterior al lado (`corte` y `corteAnterior`): `ingresosActividadesOrdinarias`,
`costoVentas`, `gananciaBruta`, `gastosVentas`, `gastosAdministracion`, `otrosIngresos`, `otrosGastos`, `otrasGananciasPerdidas`, `ingresosFinancieros`,
`costosFinancieros`, `gananciaPerdidaAntesImpuestos`, `ingresoGastoXImpuestos` y `gananciaPerdida`. Es el estado que el club cargó en el formulario, y los
PDF de «NOTAS EF» no lo traen. Probado con Deportes Tolima, La Equidad, Talento Dorado (Águilas Doradas) y Atlético Bucaramanga: los cuatro tienen 2016 a 2025.
Tolima 2025: ingresos 49.330.876, costo de ventas 2.774.438 (la nota de costos que faltaba en las notas), resultado 359.205 (igual que `utilidades` de
`siis_empresas`); 2024, suma interna exacta: 45.544.864 − 2.632.780 − 5.166.142 − 37.305.416 + 1.973.190 − 1.006.202 + 227.675 − 720.859 = 914.330.
Ojo: desde 2024 (formulario de NIIF plenas) los rubros «gastos de ventas» y «gastos de administración» cambian de lugar en algunos clubes (Tolima 2024: ventas
5,2 mil millones y administración 37,3; en 2023 era al revés), así que la comparación entre años se hace con el total de gastos, no con esos dos rubros.
El campo `margen` de `siis_empresas` es la ganancia bruta sobre ingresos (da exacto el costo de ventas de este índice). Pero el costo de ventas NO explica solo la
diferencia entre las notas de Tolima y el resultado de SIIS (diferencia contra costo de ventas, en millones: 2023 945 contra 1.660; 2024 2.406 contra 2.633; 2025 2.826
contra 2.774): para cargar con las notas hay que conciliar las demás partidas (otros ingresos y gastos, impuestos) contra este estado, rubro por rubro.

**Los otros índices del portal (2026-10-26):** además de `siis_empresas` y `siis_resultadointegral`, la misma consulta (`/siis_backend/api/v1/qr/<índice>/_search`, con `infoEmpresa.NIT` en vez de `resultado.NIT` en el balance) sirve para `siis_sitfinan` (balance: `resultado.activos.corrientes.registros.efectivoEquivalentes`, activos, pasivos, patrimonio, cada uno con `corte` y `corteAnterior`), `siis_flujoefectivo` y `siis_otroreporte` (otro resultado integral). `siis_situacionfinanciera` NO existe (devuelve una página HTML). El balance da la caja de los clubes de solo notas.

**Inventario de SIIS contra lo que tenemos (2026-10-26):** los tres CIIU deportivos dan 454 presentaciones de 66 NIT (2015 a 2025). Con estado de resultados en SIIS y SIN PDF nuestro de ese año (comparación por carpeta de `Clubes/Colombia/`): Junior 2017, 2018, 2020, 2021 y 2022; Unión Magdalena 2016, 2017, 2019, 2020 y 2021; Deportes Quindío 2022 a 2025; Caimanes de Barranquilla 2017, 2021, 2022 y 2024; Jaguares 2016, 2018 y 2021; Alianza 2017 y 2018; América de Cali 2016 y 2017; Atlético FC 2016 y 2021; Boyacá Chicó 2017 y 2018; Millonarios 2015 y 2023; y un año cada uno Atlético Bucaramanga (2021), Bogotá FC (2017), Cortuluá (2020), La Equidad (2018), Llaneros (2021), Patriotas (2021), Tigres (2016) y Fortaleza (2016): unos 39 club-años. Clubes de fútbol de SIIS sin carpeta nuestra: Valledupar FC (NIT 824006447, 2016 a 2025) y Cóndores de Cundinamarca (900695572, 2021 y 2022, ingresos muy chicos). De otros deportes con estado: Gigantes de Barranquilla, Titanes (ya está), Frastbreak Basketball Club y Bogotá Piratas (baloncesto). El resto de los 66 NIT son empresas de instalaciones o gimnasios (no entran). Lo que SIIS dijo «sin documentos» (404 en `documentos-adicionales`) puede tener igual el estado en `siis_resultadointegral`; hay que verificarlo por club y año al correr la tool.

## Estado de la Primera A y candidatos que quedan (2026-09-22)

Con la sesión 2026-09-22 quedan cubiertos **17 de los 20 clubes de la Categoría Primera A 2025**.
Los 3 que faltan no son "no se buscó": los tres tienen una causa societaria documentada en su propio
archivo (Independiente Medellín, Deportivo Pasto, y un tercero que en realidad SÍ está pero bajo otra
razón social, Águilas Doradas → Talento Dorado S.A., ya resuelto).

**Candidatos que siguen sin explorar**, todos con ficha muy probable en SIIS bajo el mismo patrón —
salieron de la agregación por CIIU deportivo que ahora se puede hacer de una sola consulta
(ver la sección de la API): Barranquilla F.C., Patriotas Boyacá, Real Cartagena, Cúcuta Deportivo,
Atlético Huila, Deportes Quindío, Jaguares F.C., Leones F.C., Orsomarso, Cortuluá, Bogotá F.C.,
Tigres F.C., Valledupar F.C., Real Santander, Universitario Popayán. Son clubes de la Primera B o
ya desaparecidos de la categoría, así que solo valen la pena si el proyecto decide bajar de
división. El mismo listado incluye también clubes de **básquet** (Titanes, Fastbreak, Gigantes de
Barranquilla, Cóndores de Cundinamarca) y de **béisbol** (Club de Béisbol Profesional Los Toros) —
o sea que el canal colombiano, igual que Companies House en Reino Unido, no depende del deporte.

## Pendientes (venían del TODO)

- (ex to-do 131) SUDAMÉRICA: LO QUE QUEDÓ EN DISCO SIN TRANSCRIBIR. 17 clubes nuevos de Colombia (Primera B). Corsarios (4) y Leones FC (SIIS no tiene 2021/2023+) no llegan a 5 ejercicios. Verificar entidad y ejercicio de cada PDF de Colombia al transcribir: solo se contó el índice de SIIS.
- (ex to-do 50, 2026-09-29) LEADS DE SOURCING DE COLOMBIA Y MÉXICO. Resumen 2026-09-29: SIIS Colombia y León/Pachuca ya resueltos, Pumas/Tigres descartado por decisión de Guido, quedan 2 hilos de puro monitoreo, sin acción pendiente de nadie hasta que algo externo cambie:
  - ✅ **SIIS Colombia**: Boyacá Chicó suma 2021-2025 (8 ejercicios en total), Once Caldas suma 2021-2024 (serie completa 2016-2025). Bucaramanga 2021 confirmado como hueco REAL de la fuente (la sociedad no depositó ese año), no throttling. Detalle en `Admin/sourcing/Colombia/<Club>.md`.

## Duplicados con años distintos (encontrados el 2026-10-05, to-do 140(c))

El inventario (`tools/inventario-transcripciones.mjs`) marca como `duplicado` el PDF idéntico a otro de la misma carpeta. Cuando las copias tienen años distintos en el nombre, un año que figuraba como conseguido en realidad falta.

- Deportes Tolima: `dictamen-revisor-fiscal-2024.pdf` y `dictamen-revisor-fiscal-2025.pdf` son el MISMO archivo (misma huella). Uno de los dos años falta: abrir el PDF para ver de qué año es y volver a buscar el otro.
- Independiente Santa Fe: `dictamen-revisor-fiscal-2024.pdf` y `dictamen-revisor-fiscal-2023.pdf` son el MISMO archivo. Uno de los dos años falta.

## Barrido 2026-10-08 (año de sourcing 2023): enumeración completa de la liga por CIIU y bajada masiva

- **Cómo se hizo**: se listaron TODOS los registros de SIIS con CIIU R9311/R9312/R9319 (454 documentos), se cruzaron por NIT con lo que ya había en `Clubes/Colombia/<club>/` y se bajó todo lo que faltaba con un script de 3 pasos (documentos-adicionales → subvisor → tmp/…PDF), secuencial, con 2 s de pausa. Resultado: de 100 estados financieros en disco a **316**, con series 2016-2025 para casi todos los clubes de Primera A/B.
- **Gotcha de nombres**: desde ~2024 el campo `nombreTramite` ya no es "NOTAS EF"/"DICTAMEN..."/"CERTIFICACION EF" a secas sino `NOTAS  EF - GRUPO 2 INDIVIDUAL` (doble espacio) y `CERTIFICACIÓN EF - GRUPO 1 INDIVIDUAL` (con tilde). Hay que normalizar acentos y mayúsculas antes de mapear al nombre de archivo.
- **Bloqueo parcial, ejercicio 2021 "GRUPO 2"**: Bogotá Piratas (basquet, borrado), Jaguares y Unión Magdalena: el subvisor devuelve rutas con `%%` en el nombre (`tmp/2022-01-450991/1%%kp301!.PDF`) y el servidor responde 500 con cualquier codificación probada (`%25%25`, `%%` crudo). ~~Pendiente: probar el visor en el Browser pane~~ **Verificado 2026-10-08: no es recuperable.** Es un bug del servidor, no del cliente: el HTML del subvisor trae el nombre con `%%` literal (`1%%r%v01!.PDF`) y su propio JS del visor solo escapa el PRIMER `%` (`String.replace` sin `g`), así que ni el navegador real puede abrirlo; el servidor (IIS) responde 500 a `%%`, `%25%25`, `%25%`, `%u0025`, mayúsculas/minúsculas y también por `cache-baranda/` (`%2525` da 404). Jaguares 2021 = radicado 2022-01-451500 (NOTAS bajo 2022-01-451556). Único camino: pedirle el ejercicio 2021 al club o a Supersociedades.
- **"Sin documentos" (404 en documentos-adicionales)** = registro en SIIS sin PDF depositado: Alianza 2017-18, América de Cali 2016-17, Atlético Bucaramanga 2021, Atlético FC 2016 y 2021, Bogotá FC 2017, Boyacá Chicó 2017-18, Cortuluá 2020, Deportes Quindío 2022-25, Fortaleza 2016, Jaguares 2016, Junior 2018 y 2020-22, La Equidad 2018, Llaneros 2021, Millonarios 2015 y 2023, Patriotas 2021, Tigres 2016, Unión Magdalena 2016-17 y 2019-20, Toros 2023. No reintentar.
- **Independiente Medellín NO era un dead-end**: su sociedad es **EL EQUIPO DEL PUEBLO S.A.** (NIT 900577148); 10 ejercicios 2016-2025 bajados. Lección: cuando un club "no aparece en SIIS", probar los apodos y marcas del club como razón social, no solo su nombre.
- **Deportivo Cali**: SIIS solo tiene 2025 (la Asociación Deportivo Cali anterior no depositaba en SIIS); **Deportivo Pereira**: 2024 y 2025 (el club se constituyó en 2022).

## Pendiente de sourcing (cierre de la rama onboarding)

- Deportes Tolima: `dictamen-revisor-fiscal-2025.pdf` es idéntico al de 2024; falta el de 2025 (2026-10-17).
