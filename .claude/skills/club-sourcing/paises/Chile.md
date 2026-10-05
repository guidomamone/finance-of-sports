# Chile — CMF

Los clubes chilenos organizados como Sociedad Anónima Deportiva Profesional (SADP) que ADEMÁS son
"emisores de valores" (RVEMI) ante la CMF (Comisión para el Mercado Financiero, cmfchile.cl) publican
Estados Financieros Consolidados trimestrales/anuales bajo IFRS, descargables en PDF. Canal prolijo y
completo: series de 16-17 años consecutivos para Universidad Católica/Universidad de Chile/Colo-Colo.
Último chequeo: 2026-09.

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
  - **Antes de la CMF, y para un club con sitio WordPress**: listar sus PDF con
    `<dominio>/wp-json/wp/v2/media?media_type=application&per_page=100`. Palestino publica ahí 8 Memorias anuales
    (2017-2024) con EEFF auditados adentro, verificables por RUT (99.569.020-9) y cierre al 31-dic. La ficha CMF de
    Palestino que figuraba en la nota daba 404 con curl.
  - **Aceleración**: el sitio propio del club a veces aloja copias directas de sus mismos envíos a
    la CMF (ej. Universidad Católica en `cruzados.cl/inversionistas/`, con URLs estáticas predecibles
    por trimestre, sin necesitar el mecanismo `auth`/`send`) — chequear la sección de
    inversionistas/transparencia del sitio del club ANTES de pelearse con la CMF directamente.
  - La Bolsa de Santiago tiene un endpoint sin autenticación que sirve el ÚLTIMO estado financiero de
    un emisor directo: `apiws.bolsadesantiago.com/ifrs/newobtenerpdf.asp?nemo=<NEMOTECNICO>` — útil
    como atajo rápido para el año más reciente, no para el histórico completo.

## Redes sociales y sitios de fans

**Reddit: MISS para los clubes chilenos probados, pero por tamaño de subreddit, no por ser Chile**
— piloto del 2026-09-27, to-do 81 de `Admin/TODO.md`. `WebSearch`/Exa no sirven para este ángulo en
ningún país (ver `Reino-Unido.md` para el detalle). Con las herramientas que sí llegan a Reddit de
verdad (Arctic Shift, PullPush — gratis, sin cuenta), `r/colocolo` (706 miembros) y `r/udechile` (5
miembros, subreddit casi muerto) dieron 0 HIT en varios términos financieros (`balance`, `estados
financieros`, `financial statements`). El patrón encontrado en Inglaterra y Brasil (ver
`Brasil.md`) es que el corte real está en el TAMAÑO del subreddit (~20-25k miembros para arriba
rinde, por debajo no) — ningún club chileno del proyecto tiene un subreddit ni remotamente cerca de
ese piso, así que el MISS acá es consistente con esa regla, no una excepción por idioma/país. Si en
el futuro aparece un club chileno con un subreddit grande, vale la pena reintentar.
