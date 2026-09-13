---
name: club-sourcing
description: Metodología para BUSCAR estados financieros/balances auditados de clubes de fútbol que todavía no tienen nada cargado en numeros-de-boca — qué regulador o canal público chequear según el país, gotchas concretos de cada portal (URLs que no sirven, formularios que hay que usar de una forma específica, categorías legales que determinan si un club puede o no tener balance público), y qué hacer cuando no se encuentra nada. Usar ANTES de salir a buscar PDFs de un club/país nuevo, para no repetir intentos que una sesión anterior ya probó y descartó. Es sourcing (encontrar y guardar el PDF), no mapeo de datos — para categorizar lo que ya se encontró, ver `club-data-mapping`.
---

# Cómo buscar estados financieros de clubes de fútbol, país por país

Este skill es la memoria de qué funcionó y qué no al buscar balances/estados contables auditados de
clubes que todavía no están en el sitio (fuera de Argentina, principalmente, donde el criterio ya es
distinto — ver sección 0). Salió de sesiones reales de sourcing (agentes en background que barrieron
decenas de clubes por país), no es teoría. Leelo ANTES de salir a buscar un club/país nuevo: te ahorra
repetir un intento que ya se probó y descartó, y te da el ángulo que SÍ funcionó para países similares.

**Esto es solo sourcing** (encontrar el documento y guardarlo en `Clubes/<País>/<Club>/`, documentar
en `fuentes/<País>/<Club>.md`). Categorizar lo que ya se encontró es otro skill (`club-data-mapping`).
Cómo estructurar la sesión de onboarding completa (una vez que ya hay un PDF elegido) es
`club-or-year-onboarding`.

## 0. Regla general, para cualquier país

- **Fuente oficial primero, siempre.** El dominio propio del club (o un link que el dominio oficial
  comparta directo, ej. un PDF de Google Drive/Dropbox embebido en una noticia oficial) es la única
  fuente aceptable como "primary". Prensa, foros, mirrors de comunidades de hinchas, etc. son un
  último recurso documentado como tal (`reliability:'secondary_press'`/`'secondary_mirror'`), nunca
  presentados como si fueran el documento oficial.
- **Si el dominio oficial está caído o bloquea la conexión** (pasa seguido con hosting chico), probar
  la copia archivada de esa MISMA URL en Wayback Machine (usar la CDX API de archive.org para
  encontrar snapshots) antes de descartar el club — sigue siendo el documento del club, solo que
  servido por archive.org en vez de en vivo.
- **Antes de anotar "no se encontró nada", seguí la REGLA 2 de `fuentes-por-club.md`** (ya
  documentada ahí, no se repite acá): registrar CADA intento con el detalle de qué se probó, la URL/
  portal exacto, y por qué falló — nunca alcanza con "no se encontró". Ver `fuentes/Uruguay/
  _notas-generales.md` como ejemplo del nivel de detalle esperado.
- **Guardar los hallazgos**: PDFs en `Clubes/<País>/<Club>/` (mismo nivel que `Clubes/Argentina/`),
  documentación en `fuentes/<País>/<Club>.md` (con su línea en el índice de `fuentes-por-club.md`) —
  ver `CLAUDE.md` para la convención completa de carpetas.
- **Antes de cargar cualquier PDF encontrado en un país nuevo al sitio**, releer `club-data-mapping`
  sección 5 (conversión a USD) y sección 14 (`grossDebt`) — ambas asumen implícitamente el criterio
  argentino de "moneda homogénea"/RT6, que puede no aplicar en otro país con otra normativa contable.

## 1. Chile — CMF, la fuente más confiable encontrada hasta ahora

Los clubes chilenos organizados como Sociedad Anónima Deportiva Profesional (SADP) que ADEMÁS son
"emisores de valores" (RVEMI) ante la CMF (Comisión para el Mercado Financiero, cmfchile.cl) publican
Estados Financieros Consolidados trimestrales/anuales bajo IFRS, descargables en PDF — este es,
hasta ahora, el canal más prolijo y completo de todo el barrido sudamericano (series de 16-17 años
consecutivos para Universidad Católica/Universidad de Chile/Colo-Colo).

- **Cómo navegar la CMF**: el portal solo sirve el documento cuando se navega la ficha de la entidad
  con clics reales (`institucional/mercados/entidad.php?rut=...&pestania=3`, pestaña "Información
  Financiera", filtrando por mes 12 = cierre anual) — la URL de descarga final tiene parámetros
  `auth`/`send` que cambian por documento y NO se pueden construir a mano ni adivinar, hay que
  llegar navegando. Ojo con la pestaña "EEFF Filiales": es una trampa, muestra los estados de una
  SUBSIDIARIA del club (ej. "Inmobiliaria Azul Azul SpA"), no del club — la pestaña correcta es
  "Información Financiera".
- **Muchos clubes chilenos NO van a tener nunca EEFF público, y eso se puede confirmar rápido**: si
  la CMF clasifica al club como "OTODP" (en vez de "RVEMI"), esa entidad estructuralmente NUNCA tiene
  la pestaña de Información Financiera/EEFF — su "Memoria Anual" es pura narrativa (verificar: cero
  totales de balance en el texto) y a lo sumo tiene un "Presupuesto y Cauciones" con cifras
  PROYECTADAS, no auditadas. Confirmado dead-end estructural (no solo "no se encontró") para
  Cobreloa, Huachipato, Ñublense, Unión Española, O'Higgins, Everton, Audax Italiano, Deportes
  Iquique, Coquimbo Unido, Unión La Calera, Deportes La Serena, Curicó Unido. Antes de invertir
  tiempo en un club chileno nuevo, chequeá su clasificación (RVEMI vs. OTODP) en la CMF primero.
  Palestino es un caso mixto: tiene AMBOS registros (RVEMI y OTODP) — usar el RVEMI.
  - **Aceleración**: el sitio propio del club a veces aloja copias directas de sus mismos envíos a
    la CMF (ej. Universidad Católica en `cruzados.cl/inversionistas/`, con URLs estáticas predecibles
    por trimestre, sin necesitar el mecanismo `auth`/`send`) — chequear la sección de
    inversionistas/transparencia del sitio del club ANTES de pelearse con la CMF directamente.
  - La Bolsa de Santiago tiene un endpoint sin autenticación que sirve el ÚLTIMO estado financiero de
    un emisor directo: `apiws.bolsadesantiago.com/ifrs/newobtenerpdf.asp?nemo=<NEMOTECNICO>` — útil
    como atajo rápido para el año más reciente, no para el histórico completo.

## 2. Colombia — Supersociedades (SIIS), sorpresa positiva de la sesión 2026-09

Varios clubes colombianos organizados como S.A. deben presentar un "Informe Periódico de Fin de
Ejercicio" a la asamblea de accionistas (Circular 012 de 2022, Superintendencia Financiera de
Colombia) con estados financieros completos, consultable gratis y sin login en el portal SIIS de la
Superintendencia de Sociedades.

**Procedimiento exacto (confirmado funcionando, seguir estos pasos en orden):**
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
- Ya confirmado con este método: Millonarios, América de Cali, Atlético Nacional, Independiente
  Santa Fe, Junior de Barranquilla, Deportivo Cali, Deportivo Pereira. Quedan sin explorar (alta
  probabilidad de que tengan ficha con el mismo patrón): Barranquilla F.C., Bucaramanga, Envigado,
  Once Caldas, Tolima, y el resto de los ~35 clubes-sociedad que menciona el informe agregado de
  Supersociedades (`supersociedades.gov.co/documents/20122/532936/Informe-futbol-pdf.pdf`, útil
  como cifra de control/lista de candidatos, no da datos por club).

## 3. Brasil — el país con mejor cobertura, gracias a la Lei do SAF

Los clubes convertidos a SAF (Sociedade Anônima do Futebol, Lei 14.193/2021) publican "Demonstrações
Financeiras" auditadas anualmente, casi siempre colgadas directo en el propio sitio del club (buscar
sección "Transparência"/"SAF"/"Governança").

- **CVM**: se buscó explícitamente si algún SAF brasileño está registrado como "companhia aberta"
  (capital abierto) ante la CVM (rad.cvm.gov.br) — no se encontró ninguno. Todos publican como
  "sociedade de capital fechado" directo en su sitio o en el de la federación estadual, cumpliendo
  la ley sin necesidad de registro CVM (que solo aplica a oferta pública de acciones). No vale la
  pena buscar en CVM salvo que aparezca evidencia concreta de que un club específico sí cotiza.
  - **Excepción real, cuidado con la atribución**: el archivo `demonstracoes-financeiras-2019-2020.pdf`
    que en un momento se guardó como si fuera de Botafogo (Rio de Janeiro) resultó ser de **Botafogo
    Futebol S.A. (Ribeirão Preto-SP)**, un club homónimo completamente distinto — el propio documento
    lo aclaraba en su nota de contexto operacional ("sede na cidade de Ribeirão Preto"). Verificar
    SIEMPRE el contexto operacional de la primera página de un PDF brasileño antes de asumir a qué
    club pertenece, sobre todo con nombres de club que se repiten entre estados.
- **Repositorios de federación estadual**: buenísima fuente alternativa cuando el club no lo cuelga
  directo. `futebolpaulista.com.br/Repositorio/Institucional/<año>/<Club>.pdf` (y variantes de
  nombre) aloja laudos de auditoria de TODOS los clubes del Campeonato Paulista, no solo los SAF —
  confirmado para Ituano, Mirassol, y aparecen ahí también São Paulo FC, Corinthians, Guarani, Ponte
  Preta, Botafogo-SP. Mismo patrón en `federacaopr.sfo3.digitaloceanspaces.com` para clubes de Paraná
  (ya explotado parcialmente para Coritiba). Vale la pena recorrer estos repositorios año por año en
  vez de buscar club por club cuando el foco es un estado específico.
- **Cloudflare bloquea varios dominios oficiales** (ej. Vasco da Gama, Sport Recife) — antes de
  descartar, buscar el mismo PDF mirrorado en otro dominio (ej. un portal de noticias o un sitio de
  socios que republicó el mismo documento) en vez de pelear con el bloqueo directo.
- Dead-ends confirmados de esta sesión (sin lead nuevo, no rabbit-holear más sin uno): América
  Mineiro, Náutico, Sport Recife (DNS roto en el subdominio de transparencia), Vitória (URL de
  transparencia devolvió 404), Criciúma (solo balance de 2013 encontrado), Ceará, Fortaleza
  (navegación por menú JS, no hay links planos de PDF en el HTML), Juventude, Marília.

## 4. Uruguay — bloqueado, no reintentar con los mismos 3 ángulos

Peñarol y Nacional son ambos "Sociedad Anónima Deportiva" y sí producen balances auditados reales,
pero Uruguay NO tiene un regulador tipo CMF/Supersociedades que obligue a publicarlos abiertos.
Confirmado, 3 ángulos distintos, los 3 bloqueados — **no reintentar con estos mismos métodos**:
1. La sección "Transparencia" del sitio propio de Peñarol redirige al login de socios
   (`crm2.montevideo.com.uy/areasocio`).
2. La AIN (Auditoría Interna de la Nación, el regulador estatal de las SAD uruguayas) no tiene un
   portal de consulta pública de balances por sociedad — solo normativa general.
3. La prensa (montevideo.com.uy, elobservador.com.uy) confirma CIFRAS puntuales de resultado, pero
   nunca linkea ni adjunta el PDF real.
- Si se retoma en el futuro, el ángulo distinto a probar es un pedido formal de acceso a información
  pública a la AIN, o contactar a un socio real dispuesto a compartir el PDF que le llega por mail —
  no repetir los 3 de arriba.

## 5. Ecuador — Supercias tiene un autocomplete poco confiable

La Superintendencia de Compañías, Valores y Seguros (supercias.gob.ec) tiene un portal público real
de "Consulta de Compañías" que en teoría permite llegar a los Estados Financieros de cualquier
empresa ecuatoriana registrada (incluyendo un club S.A.D.P. como LDU Quito). En la práctica, el
campo de búsqueda es un autocomplete (PrimeFaces) poco predecible: no devolvió sugerencias ni con el
nombre completo del club ni con un RUC candidato de baja confianza, y con búsquedas parciales
devuelve coincidencias de empresas cuyo nombre ni siquiera contiene el término buscado. Antes de
reintentar, conseguir el RUC EXACTO y verificado del club (no un candidato de una fuente de baja
confianza) — no hay, hasta ahora, un lookup público de RUC-por-nombre que lo confirme de forma
confiable.

## 6. Perú, Paraguay, Bolivia, Venezuela — sin metodología país-nivel todavía

Estos 4 países no tuvieron (todavía) un hallazgo de nivel "regulador que aplica a todos los clubes"
como Chile/Colombia/Brasil — lo encontrado hasta ahora fue caso por caso, ver la ficha de cada club
en `fuentes/<País>/<Club>.md`:
- **Perú**: Alianza Lima publica en su propia página de transparencia (sin regulador de por medio);
  Universitario de Deportes solo tiene un expediente concursal público en INDECOPI (histórico legal,
  no estados financieros); Sporting Cristal es una S.A. de capital cerrado sin obligación de
  publicar. Vale explorar en el futuro si la SMV (Superintendencia del Mercado de Valores) tiene
  algún club registrado como emisor, no se confirmó todavía.
- **Paraguay**: Olimpia/Cerro Porteño/Libertad — sin regulador tipo CMF/Supersociedades identificado,
  sin sección de transparencia financiera en ninguno de los 3 sitios oficiales, dead-end sin lead
  nuevo por ahora.
- **Bolivia/Venezuela**: solo un primer chequeo superficial hecho, sin metodología desarrollada
  todavía — próxima sesión que toque estos países, empezar por buscar si existe un regulador
  societario nacional con portal público (mismo patrón que Colombia/Ecuador) antes de ir club por
  club.

## Cómo mantener este skill

Actualizar esta sección la primera vez que un país nuevo produzca un hallazgo real de metodología
(un regulador que aplica a todos los clubes de ese país, un gotcha de navegación que costó
descubrir) — no hace falta una entrada por cada club individual, eso vive en `fuentes/<País>/
<Club>.md`. Si un ángulo ya documentado acá como "bloqueado" se destraba en el futuro (ej. Uruguay
consigue un pedido de acceso a información pública), actualizar esa sección en vez de dejarla
desactualizada diciendo que sigue bloqueado.
