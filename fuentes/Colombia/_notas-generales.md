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
