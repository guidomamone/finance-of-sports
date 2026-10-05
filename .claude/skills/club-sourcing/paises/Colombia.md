# Colombia — Supersociedades (SIIS)

Varios clubes colombianos organizados como S.A. deben presentar un "Informe Periódico de Fin de
Ejercicio" a la asamblea de accionistas (Circular 012 de 2022, Superintendencia Financiera de
Colombia) con estados financieros completos, consultable gratis y sin login en el portal SIIS de la
Superintendencia de Sociedades.

**SIIS es una API JSON pública: NO hace falta browser.** El portal es una SPA cuyo backend son dos
endpoints abiertos (sin login, sin API key, sin captcha), así que todo el flujo se scriptea con
`curl` — mucho más rápido que navegar la SPA a clicks (ese procedimiento por browser sigue
funcionando si los endpoints cambian, ver más abajo). El detalle completo, con los cuerpos de
request, está en `fuentes/Colombia/_notas-generales.md`; el resumen:

1. **Buscar / enumerar**: `POST siis.ia.supersociedades.gov.co/siis_backend/api/v1/qr/siis_empresas/_search`
   acepta query DSL de Elasticsearch completo, agregaciones incluidas. Ya no hace falta el NIT: se
   busca por nombre, y **se puede listar la liga entera de una sola consulta** agregando por
   `nombreEmpresa.keyword` sobre el CIIU deportivo. Son TRES los CIIU a mirar, no uno: **R9312**
   (clubes deportivos), **R9319** (otras actividades deportivas) y **R9311** (gestión de
   instalaciones deportivas) — Boyacá Chicó, La Equidad y Fortaleza CEIF están en R9319.
   De cada hit se saca `infoEmpresa.num_radicado`, que es la llave del paso 2, más un bloque
   `financieros` con activos/ingresos/utilidad/ROE/ROA ya calculados.
2. **Listar los documentos del ejercicio**:
   `GET .../plantillas-api/documentos-adicionales?numero-radicado=<num_radicado>` devuelve el JSON
   con "NOTAS EF" / "DICTAMEN DEL REVISOR FISCAL" / "CERTIFICACION EF" y el token de cada uno. Es lo
   mismo que antes había que clickear en "Ver otros documentos adicionales" de la Vista 360.
   **Trampa**: el campo `infoEmpresa.documentos_adicionales` que viene en la respuesta de
   Elasticsearch está desactualizado — viene VACÍO para 2021 en adelante aunque los documentos
   existan. Usar el endpoint, nunca el campo.
   El `url` que devuelve `documentos-adicionales` ya es `VisualizarDocumentos.aspx`; el subvisor del paso 3 se arma cambiando
   ese nombre por `subvisor.aspx`, con el mismo token. Un `404` en `documentos-adicionales` significa "sin documentos
   depositados" para ese radicado, no un fallo transitorio: no reintentar.
3. **Bajar**: `subvisor.aspx?Radicado=<token>` PRIMERO (es el que materializa el temporal y el que
   trae la ruta real), y recién después `GET .../bpmformularios/tmp/<ruta>` con `Referer` al
   subvisor. **El patrón `tmp/<radicado>/<radicado>.PDF` NO siempre se cumple**: el nombre de
   archivo a veces es interno y arbitrario (`tmp/2024-01-344261/1wr6f501!.PDF`) — hay que parsearlo
   del HTML del subvisor, no construirlo (adivinarlo da 404 silencioso).
4. **No paralelizar más de 1-2 procesos**: con 5 en paralelo el subvisor empieza a devolver HTML sin
   ninguna ruta de PDF adentro (throttling, no error) y hay que reparar después.

Si un club NO aparece en SIIS, casi siempre hay una causa societaria, no un problema de búsqueda:
o deposita bajo la razón social de otra sociedad (Águilas Doradas deposita como **TALENTO DORADO
S.A.**, NIT 900456885), o no es una sociedad comercial (Deportivo Pasto era asociación hasta su
conversión reciente a S.A.; la sociedad del DIM figura "en liquidación" mientras opera una
corporación). Ver el archivo de cada club.

**Procedimiento viejo, por browser (sigue funcionando, útil solo si los endpoints cambian):**
1. Googlear `"[club] S.A. NIT"` para conseguir el número de 9 dígitos — la búsqueda POR NOMBRE en
   SIIS no filtra bien (devuelve miles de resultados irrelevantes o ninguno), hace falta el NIT
   exacto.
2. Entrar a `siis.ia.supersociedades.gov.co`, pegar el NIT en el buscador (nunca el nombre) y click
   "BUSCAR".
3. Elegir el resultado con punto de entrada "Individuales" (o el del ejercicio más reciente si hay
   varios) y click "VER DETALLES" o directo "VISTA 360".
4. En Vista 360, click "Ver otros documentos adicionales" — si aparece una tabla con radicados, esos
   son los PDFs reales: "NOTAS EF" (a pesar del nombre, es el paquete COMPLETO: situación financiera
   + resultado integral + cambios en patrimonio + flujo de efectivo + notas, 30-60 páginas),
   "CERTIFICACION EF" y "DICTAMEN DEL REVISOR FISCAL".
5. Cada link "Ver" de esa tabla abre un visor (`servicios.supersociedades.gov.co/bpmformularios/...`)
   cuya petición de red real apunta a un PDF descargable directo en
   `.../bpmformularios/tmp/<radicado>/<radicado>.PDF` — hay que inspeccionar las network requests
   del browser para sacar esa URL exacta, no está en el HTML visible. El link puede abrir un popup
   bloqueado por el entorno — mejor `navigate()` directo a la URL del link en vez de clickearlo.
- El sitio a veces entra en mantenimiento ("Estamos actualizando SIIS...") por minutos — reintentar
  más tarde, no es un dead-end permanente.
- **18 de los 20 clubes de la Categoría Primera A cubiertos** (detalle club por club en
  `fuentes/_indice/Colombia.md`). **Ya NO hace falta googlear el NIT**: con la API se busca por
  nombre, o se lista la liga entera agregando por CIIU. Los 2 que faltan no son falta de búsqueda,
  tienen causa societaria documentada en su archivo — **Independiente Medellín** (la S.A. figura en
  liquidación y opera una corporación, fuera del perímetro de Supersociedades) y **Deportivo Pasto**
  (era asociación; se convirtió a S.A. hace poco, así que debería empezar a aparecer — vale
  reintentar en una sesión futura). Quedan sin explorar, todos con ficha muy probable bajo el mismo
  patrón, los clubes de Primera B. El mismo padrón incluye clubes de **básquet** y **béisbol** — o
  sea que el canal colombiano, como Companies House en Reino Unido, no depende del deporte. El
  informe agregado de Supersociedades
  (`supersociedades.gov.co/documents/20122/532936/Informe-futbol-pdf.pdf`) sigue sirviendo como
  cifra de control, no da datos por club.
  - **Envigado tiene el histórico más profundo encontrado en Colombia**: SIIS lista 10 ejercicios
    individuales consecutivos (2016-2025) bajo el mismo NIT — solo se bajó 2025, queda pendiente
    bajar la serie completa si se busca el histórico más largo del país.
  - **Gotcha confirmado: la URL final del PDF
    (`.../bpmformularios/tmp/<radicado>/<radicado>.PDF`) a veces devuelve 404 en un `curl` directo
    aunque el navegador la sirva 200 OK.** Dos causas identificadas, arreglar en este orden: (1) el
    servidor parece necesitar que el navegador visite primero
    `VisualizarDocumentos.aspx?Radicado=<mismo token>` para "materializar" el archivo temporal —
    navegar ahí con el browser (aunque sea en blanco, no hace falta ver el visor cargar del todo) y
    RECIÉN DESPUÉS lanzar el `curl` a la URL `.../tmp/...PDF`; (2) además, mandar un `User-Agent` de
    navegador real y un header `Referer` apuntando a
    `.../bpmformularios/subvisor.aspx?Radicado=<token>` (`curl -A "Mozilla/5.0 ..." -e "<subvisor
    url>"`) — sin esto también puede devolver 404 incluso con el paso (1) hecho.
  - **Gotcha de tooling, no del portal**: el sitio SIIS puede disparar pop-ups a sitios de terceros
    sin relación al clickear ciertos elementos (ej. "Ver otros documentos adicionales") — parecen
    anuncios/redirects inyectados en el entorno de testing, no arriesgan el hallazgo: cerrar la
    pestaña nueva, volver a seleccionar la pestaña original de SIIS (`tabs_select`), reintentar el
    click si hizo falta, y seguir. No confundir con un error real del portal.
