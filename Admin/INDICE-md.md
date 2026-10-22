# Índice de documentos (generado)

<!-- md: este índice (generado) | leer: para saber qué documento leer y cuáles no los cita nadie -->

Lo escribe `node tools/indice-md.mjs --escribir`; no se edita a mano. Cada fila: ruta · KB · qué es · cuándo se lee · cuántos documentos o tools lo citan (←) · a qué otros documentos vivos manda (→).
Huérfano = nadie lo cita; sin marca = no declara qué es ni cuándo se lee (primera línea `<!-- md: qué es | leer: cuándo -->`).

Carpetas que se cuentan sin listar: `Admin/mediciones` 76, `Admin/Archive` 353, `Admin/carga-clubes` 331, `Admin/sourcing` 1571, `Admin/gestiones-por-pais` 205, `Admin/ligas-por-pais` 18, `Admin/registros` 123, `Admin/lotes` 80.

## CLAUDE.md y Admin

- `CLAUDE.md` · 11.2 KB · instrucciones permanentes del proyecto (se carga sola) · **leer:** siempre · ←24 · →CONVENCIONES-DATOS.md, CONVENCIONES.md, ESTADO-clubes.md, ESTADO.md, PANTALLA.md, PIPELINE.md
- `Admin/ARQUITECTURA.md` · 72.0 KB · cómo funciona el motor de Finanzas y los scripts que escriben data/ · **leer:** al tocar el motor (js/finanzas-*) o los scripts que escriben data/; la sección que toca · ←9 · →CLAUDE.md, CONVENCIONES-DATOS.md, CONVENCIONES.md, ESTADO-clubes.md, ESTADO.md, PANTALLA.md
- `Admin/CHANGELOG.md` · 181.5 KB · qué cambió y cuándo (la última semana; lo anterior está en Archive) · **leer:** solo por grep de una palabra, nunca de corrido · ←26 · →CLAUDE.md, ARQUITECTURA.md, CONVENCIONES-DATOS.md, CONVENCIONES.md, ESTADO-clubes.md, ESTADO.md
- `Admin/CONVENCIONES-DATOS.md` · 62.4 KB · reglas de datos: categorías, perímetro, períodos, tipos de cambio · **leer:** al cargar o corregir datos de un club; la sección que toca · ←29 · →CLAUDE.md, CONVENCIONES.md, PANTALLA.md, dudas-por-club.md, propuestas/transicion-y-covid.md, club-data-mapping/SKILL.md
- `Admin/CONVENCIONES.md` · 17.3 KB · reglas de proceso vigentes · **leer:** cuando la skill de la tarea lo pide · ←21 · →CLAUDE.md, CONVENCIONES-DATOS.md, HALLAZGOS-pipeline.md, PANTALLA.md, TODO.md, dudas-por-club.md
- `Admin/ESTADO-clubes.md` · 26.7 KB · qué hay cargado de cada club (generado) · **leer:** si hace falta el detalle club por club · ←18 · →ESTADO.md
- `Admin/ESTADO.md` · 21.6 KB · qué hay armado hoy (snapshot del proyecto) · **leer:** siempre, al arrancar una sesión · ←16 · →CLAUDE.md, ARQUITECTURA.md, CONVENCIONES-DATOS.md, CONVENCIONES.md, ESTADO-clubes.md, HALLAZGOS-pipeline.md
- `Admin/HALLAZGOS-pipeline.md` · 47.3 KB · lo que se midió y no entró al pipeline, con el porqué · **leer:** antes de proponer una mejora al pipeline, por grep · ←14 · →PIPELINE.md, TODO.md, club-or-year-onboarding/club-nuevo.md
- `Admin/PANTALLA.md` · 87.0 KB · reglas de pantalla y código del sitio · **leer:** al tocar js/, index.html o css; la sección de la pantalla · ←15 · →CONVENCIONES.md, ESTADO.md, club-data-mapping/referencia/formato-simplificado.md, club-or-year-onboarding/club-nuevo.md, producto-y-pantalla-finance-of-sports/referencia/marca.md, producto-y-pantalla-finance-of-sports/referencia/navegador-de-preview.md
- `Admin/PIPELINE.md` · 130.1 KB · el pipeline etapa por etapa y las decisiones de Guido · **leer:** solo la etapa que se toca · ←39 · →CLAUDE.md, CONVENCIONES-DATOS.md, HALLAZGOS-pipeline.md, dudas-por-club.md, club-data-mapping/referencia/leer-pdf.md
- `Admin/TODO.md` · 23.3 KB · qué falta hacer, un punto por título y por prioridad · **leer:** con node tools/todo.mjs; nunca entero · ←26 · →ESTADO-clubes.md, HALLAZGOS-pipeline.md, PIPELINE.md, dudas-por-club.md, fuentes-externas.md, propuestas/257-skills.md
- `Admin/dudas-por-club.md` · 120.0 KB · preguntas que solo el club puede contestar · **leer:** al escribirle a un club o al agregar una duda · ←34 · →TODO.md, transcripcion-subagentes/README.md, club-data-mapping/SKILL.md, club-data-mapping/referencia/casos-por-pais-y-formato.md, club-data-mapping/referencia/formato-simplificado.md
- `Admin/finance-of-sports-project.md` · 507.6 KB · diario narrativo: el porqué de las decisiones viejas · **leer:** solo por grep de una palabra, nunca de corrido · ←9 · →CLAUDE.md, CONVENCIONES.md, ESTADO.md, dudas-por-club.md, transcripcion-subagentes/README.md, club-data-mapping/SKILL.md
- `Admin/fuentes-externas.md` · 6.8 KB · términos de las fuentes externas (Wikipedia, RSSSF, bancos centrales) · **leer:** antes de publicar datos de una fuente externa nueva · ←3
- `Admin/fx-cotizaciones.md` · 10.5 KB · registro de las cotizaciones usadas como tipo de cambio · **leer:** al cargar un tipo de cambio de mercado · ←2 · →ARQUITECTURA.md

## Admin/propuestas

- `Admin/propuestas/257-skills.md` · 42.6 KB · (sin marca) · ←3 · →CLAUDE.md, CONVENCIONES-DATOS.md, CONVENCIONES.md, ESTADO-clubes.md, ESTADO.md, PANTALLA.md
- `Admin/propuestas/330-donde-se-pierde.md` · 13.8 KB · (sin marca) · ←2 · →ARQUITECTURA.md, CONVENCIONES-DATOS.md, CONVENCIONES.md, ESTADO.md, HALLAZGOS-pipeline.md, PIPELINE.md
- `Admin/propuestas/350-revision-categorias.md` · 10.2 KB · (sin marca) · ←1 · →CONVENCIONES-DATOS.md, PANTALLA.md
- `Admin/propuestas/archivo-no-es-lo-que-dice.md` · 2.4 KB · (sin marca) · ←1 · →PIPELINE.md
- `Admin/propuestas/estructurado-sin-ia.md` · 3.3 KB · (sin marca) · ←1 · →CONVENCIONES.md
- `Admin/propuestas/transicion-y-covid.md` · 11.0 KB · (sin marca) · ←1 · →CONVENCIONES-DATOS.md, dudas-por-club.md

## Admin: otras carpetas vivas

- `Admin/transcripcion-subagentes/INSTRUCCIONES.md` · 4.6 KB · Transcribir PDFs de cuentas de clubes del Reino Unido a Markdown · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←1
- `Admin/transcripcion-subagentes/README.md` · 1.3 KB · Transcripción de PDFs del Reino Unido con subagentes · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←17 · →transcripcion-subagentes/INSTRUCCIONES.md
- `Admin/transcripcion-subagentes/reglas.md` · 3.6 KB · Reglas para transcribir UN PDF digital a Markdown (finance-of-sports) · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←1
- `Admin/outreach/checkin-2026-10-24.md` · 2.0 KB · check-in del proceso de mails a clubes a los 30 días · **leer:** el 2026-10-24, cuando la tarea programada lo pregunta · ←3 · →club-outreach/SKILL.md
- `Admin/difusion/calendario.md` · 0.4 KB · calendario de publicaciones para difundir el sitio · **leer:** al armar una publicación (skill contenido-y-difusion) · ←2

## Skills

- `.claude/skills/auditoria-finance-of-sports/SKILL.md` · 20.3 KB · Auditoría de rutina del proyecto finance-of-sports. El chequeo transversal y periódico de que el sitio entero está sano y va a seguir estándolo, disti · **leer:** la skill se carga sola cuando la tarea es la suya · ←1 · →CLAUDE.md, CONVENCIONES-DATOS.md, CONVENCIONES.md, ESTADO-clubes.md, PANTALLA.md, PIPELINE.md
- `.claude/skills/club-data-mapping/SKILL.md` · 24.1 KB · Supuestos y patrones para mapear el balance/presupuesto NATIVO de un club de fútbol (categorías propias del documento, ej. "Generales/Específicos/Dive · **leer:** la skill se carga sola cuando la tarea es la suya · ←5 · →ARQUITECTURA.md, CONVENCIONES-DATOS.md, PIPELINE.md, TODO.md, dudas-por-club.md, club-data-mapping/referencia/casos-por-pais-y-formato.md
- `.claude/skills/club-data-mapping/referencia/casos-por-pais-y-formato.md` · 10.5 KB · Casos por país y formato de documento · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←3 · →CONVENCIONES-DATOS.md, dudas-por-club.md
- `.claude/skills/club-data-mapping/referencia/formato-simplificado.md` · 10.7 KB · Formato simplificado: buckets de la pantalla, grossDebt y sector · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←8 · →CONVENCIONES-DATOS.md, PIPELINE.md
- `.claude/skills/club-data-mapping/referencia/fx.md` · 9.5 KB · Tipos de cambio y monedas · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←8 · →ARQUITECTURA.md
- `.claude/skills/club-data-mapping/referencia/leer-pdf.md` · 9.8 KB · Leer un PDF fuente difícil: escaneos, tablas rotadas, filas acumuladas · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←4 · →PIPELINE.md, club-sourcing/paises/Argentina.md
- `.claude/skills/club-or-year-onboarding/SKILL.md` · 3.4 KB · Onboardear clubes en finance-of-sports con el pipeline (de un PDF a un año cargado en el sitio) — correr lotes en segundo plano, leer los resultados y · **leer:** la skill se carga sola cuando la tarea es la suya · ←5 · →CLAUDE.md, HALLAZGOS-pipeline.md, PIPELINE.md, TODO.md, club-or-year-onboarding/carga-con-tokens.md, club-or-year-onboarding/club-nuevo.md
- `.claude/skills/club-or-year-onboarding/carga-con-tokens.md` · 5.9 KB · Cargar con tokens de sesión · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←2
- `.claude/skills/club-or-year-onboarding/club-nuevo.md` · 8.6 KB · Club nuevo: lo que el pipeline no hace · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←13 · →PANTALLA.md
- `.claude/skills/club-or-year-onboarding/correr-clubes.md` · 5.2 KB · Correr clubes con el pipeline (sección 3a) · **leer:** al correr un lote, cargar un año o dar de alta un club · ←1 · →CONVENCIONES-DATOS.md, CONVENCIONES.md, dudas-por-club.md
- `.claude/skills/club-or-year-onboarding/mejorar-script.md` · 2.4 KB · Mejorar un script del pipeline (secciones 3b y 5) · **leer:** al arreglar o sumar una tool del pipeline y medir el cambio · ←1 · →CONVENCIONES.md, PIPELINE.md
- `.claude/skills/club-or-year-onboarding/reglas.md` · 5.2 KB · Reglas de Guido para el pipeline (sección 4) · **leer:** antes de correr un lote o de tocar un script · ←1 · →CONVENCIONES-DATOS.md, CONVENCIONES.md, HALLAZGOS-pipeline.md, dudas-por-club.md
- `.claude/skills/club-or-year-onboarding/trampas.md` · 2.8 KB · Trampas y lo que el pipeline no cubre (secciones 6 y 7) · **leer:** cuando algo frena, se comporta raro o la tarea es un club, una liga o un deporte nuevo · ←2 · →ARQUITECTURA.md, CONVENCIONES.md, PANTALLA.md, PIPELINE.md, club-or-year-onboarding/club-nuevo.md
- `.claude/skills/club-outreach/SKILL.md` · 13.2 KB · Proceso para escribirle un mail a un club de fútbol (pedirle un documento, o una aclaración de categorización) y mandarlo de verdad, sin que cada enví · **leer:** la skill se carga sola cuando la tarea es la suya · ←3 · →dudas-por-club.md, outreach/checkin-2026-10-24.md
- `.claude/skills/club-sourcing/SKILL.md` · 19.6 KB · Metodología para BUSCAR estados financieros/balances auditados de clubes de fútbol que todavía no tienen nada cargado en finance-of-sports — qué regul · **leer:** la skill se carga sola cuando la tarea es la suya · ←10 · →CONVENCIONES.md, PIPELINE.md, transcripcion-subagentes/README.md, club-data-mapping/referencia/formato-simplificado.md, club-data-mapping/referencia/fx.md, club-sourcing/paises/Africa.md
- `.claude/skills/club-sourcing/paises/Africa.md` · 4.4 KB · regulador y gotchas de Africa · **leer:** al buscar documentos de ese país (solo el tuyo) · ←3
- `.claude/skills/club-sourcing/paises/Alemania.md` · 4.5 KB · regulador y gotchas de Alemania · **leer:** al buscar documentos de ese país (solo el tuyo) · ←3
- `.claude/skills/club-sourcing/paises/Argentina.md` · 1.6 KB · regulador y gotchas de Argentina · **leer:** al buscar documentos de ese país (solo el tuyo) · ←4
- `.claude/skills/club-sourcing/paises/Armenia.md` · 0.7 KB · regulador y gotchas de Armenia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Austria.md` · 2.1 KB · regulador y gotchas de Austria · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →club-sourcing/paises/Africa.md
- `.claude/skills/club-sourcing/paises/Azerbaiyan.md` · 0.6 KB · regulador y gotchas de Azerbaiyan · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Belgica.md` · 2.0 KB · regulador y gotchas de Belgica · **leer:** al buscar documentos de ese país (solo el tuyo) · ←5
- `.claude/skills/club-sourcing/paises/Bielorrusia.md` · 0.3 KB · regulador y gotchas de Bielorrusia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Bosnia.md` · 0.6 KB · regulador y gotchas de Bosnia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Brasil.md` · 15.2 KB · regulador y gotchas de Brasil · **leer:** al buscar documentos de ese país (solo el tuyo) · ←5 · →TODO.md, club-sourcing/paises/Colombia.md, club-sourcing/paises/Reino-Unido.md
- `.claude/skills/club-sourcing/paises/Bulgaria.md` · 1.6 KB · regulador y gotchas de Bulgaria · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/CONCACAF.md` · 4.8 KB · regulador y gotchas de CONCACAF · **leer:** al buscar documentos de ese país (solo el tuyo) · ←6 · →club-sourcing/paises/Estados-Unidos.md
- `.claude/skills/club-sourcing/paises/Chile.md` · 3.9 KB · regulador y gotchas de Chile · **leer:** al buscar documentos de ese país (solo el tuyo) · ←2 · →TODO.md, club-sourcing/paises/Brasil.md, club-sourcing/paises/Reino-Unido.md
- `.claude/skills/club-sourcing/paises/China.md` · 2.4 KB · regulador y gotchas de China · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →dudas-por-club.md, club-sourcing/paises/Africa.md, club-sourcing/paises/CONCACAF.md, club-sourcing/paises/Estados-Unidos.md
- `.claude/skills/club-sourcing/paises/Colombia.md` · 7.6 KB · regulador y gotchas de Colombia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←2
- `.claude/skills/club-sourcing/paises/Corea-del-Sur.md` · 2.2 KB · regulador y gotchas de Corea del Sur · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →dudas-por-club.md, club-sourcing/paises/CONCACAF.md, club-sourcing/paises/Estados-Unidos.md
- `.claude/skills/club-sourcing/paises/Croacia.md` · 2.3 KB · regulador y gotchas de Croacia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←3 · →dudas-por-club.md, club-sourcing/paises/CONCACAF.md
- `.claude/skills/club-sourcing/paises/Dinamarca.md` · 2.0 KB · regulador y gotchas de Dinamarca · **leer:** al buscar documentos de ese país (solo el tuyo) · ←3 · →dudas-por-club.md, club-sourcing/paises/Belgica.md
- `.claude/skills/club-sourcing/paises/Ecuador.md` · 3.8 KB · regulador y gotchas de Ecuador · **leer:** al buscar documentos de ese país (solo el tuyo) · ←3
- `.claude/skills/club-sourcing/paises/Eslovaquia.md` · 1.3 KB · regulador y gotchas de Eslovaquia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Eslovenia.md` · 0.5 KB · regulador y gotchas de Eslovenia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/España.md` · 1.8 KB · regulador y gotchas de España · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Estados-Unidos.md` · 1.8 KB · regulador y gotchas de Estados Unidos · **leer:** al buscar documentos de ese país (solo el tuyo) · ←4 · →club-sourcing/paises/CONCACAF.md
- `.claude/skills/club-sourcing/paises/Estonia.md` · 1.1 KB · regulador y gotchas de Estonia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Francia.md` · 2.7 KB · regulador y gotchas de Francia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →dudas-por-club.md, club-sourcing/paises/CONCACAF.md
- `.claude/skills/club-sourcing/paises/Georgia.md` · 0.8 KB · regulador y gotchas de Georgia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Grecia.md` · 1.7 KB · regulador y gotchas de Grecia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →club-sourcing/paises/Reino-Unido.md
- `.claude/skills/club-sourcing/paises/Hungria.md` · 0.7 KB · regulador y gotchas de Hungria · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Italia.md` · 8.2 KB · regulador y gotchas de Italia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←3 · →club-sourcing/paises/Belgica.md, club-sourcing/paises/Reino-Unido.md
- `.claude/skills/club-sourcing/paises/Kazajistan.md` · 1.2 KB · regulador y gotchas de Kazajistan · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Letonia.md` · 1.0 KB · regulador y gotchas de Letonia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Lituania.md` · 0.7 KB · regulador y gotchas de Lituania · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Macedonia-del-Norte.md` · 0.4 KB · regulador y gotchas de Macedonia del Norte · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Noruega.md` · 2.5 KB · regulador y gotchas de Noruega · **leer:** al buscar documentos de ese país (solo el tuyo) · ←2 · →dudas-por-club.md, club-sourcing/paises/Alemania.md, club-sourcing/paises/Belgica.md
- `.claude/skills/club-sourcing/paises/Paises-Bajos.md` · 2.0 KB · regulador y gotchas de Paises Bajos · **leer:** al buscar documentos de ese país (solo el tuyo) · ←2 · →dudas-por-club.md, club-sourcing/paises/Croacia.md, club-sourcing/paises/Italia.md
- `.claude/skills/club-sourcing/paises/Peru-Paraguay-Bolivia-Venezuela.md` · 5.5 KB · regulador y gotchas de Peru Paraguay Bolivia Venezuela · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Polonia.md` · 1.3 KB · regulador y gotchas de Polonia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Portugal.md` · 2.9 KB · regulador y gotchas de Portugal · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →dudas-por-club.md, club-sourcing/paises/Croacia.md, club-sourcing/paises/Italia.md, club-sourcing/paises/Paises-Bajos.md
- `.claude/skills/club-sourcing/paises/Reino-Unido.md` · 10.2 KB · regulador y gotchas de Reino Unido · **leer:** al buscar documentos de ese país (solo el tuyo) · ←7 · →TODO.md, club-sourcing/paises/Brasil.md
- `.claude/skills/club-sourcing/paises/Republica-Checa.md` · 2.1 KB · regulador y gotchas de Republica Checa · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →dudas-por-club.md, club-sourcing/paises/Dinamarca.md, producto-y-pantalla-finance-of-sports/referencia/marca.md
- `.claude/skills/club-sourcing/paises/Rumania.md` · 1.0 KB · regulador y gotchas de Rumania · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Rusia.md` · 3.1 KB · regulador y gotchas de Rusia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →dudas-por-club.md, club-sourcing/paises/Belgica.md, club-sourcing/paises/Noruega.md
- `.claude/skills/club-sourcing/paises/Serbia.md` · 0.7 KB · regulador y gotchas de Serbia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Suiza.md` · 2.2 KB · regulador y gotchas de Suiza · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →club-sourcing/paises/Ecuador.md
- `.claude/skills/club-sourcing/paises/Turquia.md` · 4.1 KB · regulador y gotchas de Turquia · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/paises/Ucrania.md` · 2.7 KB · regulador y gotchas de Ucrania · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1 · →dudas-por-club.md
- `.claude/skills/club-sourcing/paises/Uruguay.md` · 1.4 KB · regulador y gotchas de Uruguay · **leer:** al buscar documentos de ese país (solo el tuyo) · ←1
- `.claude/skills/club-sourcing/referencia/cuando-escalar.md` · 3.9 KB · 0.3 Cuándo escalar · **leer:** cuando no aparece nada: sesión dedicada, mail al club o gestión de Guido · ←1 · →TODO.md, club-sourcing/paises/Brasil.md, club-sourcing/paises/Ecuador.md
- `.claude/skills/club-sourcing/referencia/escalera-de-angulos.md` · 12.3 KB · 0.1 La escalera de ángulos, y cuándo parar · **leer:** con un club sin nada cargado, para decidir por dónde buscar y cuándo parar · ←1 · →PIPELINE.md
- `.claude/skills/club-sourcing/referencia/liga-y-sponsor.md` · 6.0 KB · 0.4 y 0.5 Informes de la liga y sponsor de camiseta · **leer:** al abrir una liga nueva (0.4) o al buscar el sponsor de camiseta de un ejercicio (0.5) · ←1 · →transcripcion-subagentes/README.md
- `.claude/skills/club-sourcing/referencia/quien-ejecuta.md` · 3.8 KB · 0.1b Quién ejecuta cada barrido · **leer:** al repartir los barridos entre Sonnet, Exa y Opus · ←1
- `.claude/skills/club-sourcing/referencia/registro-rapido.md` · 2.8 KB · 0.2 Dejar registro rápido de qué ya se probó · **leer:** al terminar de buscar un club, para dejar escrito qué se probó · ←1 · →ESTADO.md
- `.claude/skills/contenido-y-difusion-finance-of-sports/SKILL.md` · 2.2 KB · Cómo armar una publicación (hilo, post, tarjeta, informe) con un dato de finance-of-sports para difundir el sitio. Usar cuando Guido pida contenido pa · **leer:** la skill se carga sola cuando la tarea es la suya · ←0 huérfano · →difusion/calendario.md
- `.claude/skills/contrato-de-datos-finance-of-sports/SKILL.md` · 3.9 KB · Qué es público de los datos de finance-of-sports (el JSON de cada club, su esquema, la taxonomía, los ids) y qué cambio lo rompe. Usar antes de renomb · **leer:** la skill se carga sola cuando la tarea es la suya · ←0 huérfano · →CONVENCIONES-DATOS.md, dudas-por-club.md
- `.claude/skills/deploy-y-release-finance-of-sports/SKILL.md` · 2.3 KB · Qué chequear antes de que Guido haga push a `main` (que despliega financeofsports.com en Netlify) y cómo verificar producción después. Usar cuando Gui · **leer:** la skill se carga sola cuando la tarea es la suya · ←0 huérfano · →CLAUDE.md
- `.claude/skills/escala-finance-of-sports/SKILL.md` · 22.4 KB · Mapa de puntos calientes de escala de finance-of-sports. Qué archivo, estructura de datos o proceso funciona hoy y se rompe cuando el proyecto crezca  · **leer:** la skill se carga sola cuando la tarea es la suya · ←2 · →CLAUDE.md, ESTADO-clubes.md, ESTADO.md, PIPELINE.md, TODO.md, dudas-por-club.md
- `.claude/skills/producto-y-pantalla-finance-of-sports/SKILL.md` · 2.8 KB · Cómo se diseña y se construye una pantalla o un cambio visible del sitio finance-of-sports, del pedido a la verificación en celular. Usar siempre que  · **leer:** la skill se carga sola cuando la tarea es la suya · ←0 huérfano · →ESTADO.md, PANTALLA.md, producto-y-pantalla-finance-of-sports/referencia/marca.md, producto-y-pantalla-finance-of-sports/referencia/navegador-de-preview.md, producto-y-pantalla-finance-of-sports/referencia/ux.md
- `.claude/skills/producto-y-pantalla-finance-of-sports/referencia/marca.md` · 5.1 KB · La marca del sitio: cómo se ve y qué no se hace · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←6
- `.claude/skills/producto-y-pantalla-finance-of-sports/referencia/navegador-de-preview.md` · 3.9 KB · Verificar una pantalla en el navegador · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←4 · →PANTALLA.md
- `.claude/skills/producto-y-pantalla-finance-of-sports/referencia/ux.md` · 7.9 KB · UX del sitio: lista de chequeo · **leer:** cuando lo manda su SKILL.md o el README de su carpeta · ←3 · →producto-y-pantalla-finance-of-sports/referencia/marca.md, producto-y-pantalla-finance-of-sports/referencia/navegador-de-preview.md
- `.claude/skills/start-session-finance-of-sports-project/SKILL.md` · 6.8 KB · Checklist de arranque y de cierre de CUALQUIER sesión de trabajo en finance-of-sports (el sitio financeofsports.com, "El deporte en Números"). Qué lee · **leer:** la skill se carga sola cuando la tarea es la suya · ←2 · →CLAUDE.md, ARQUITECTURA.md, CONVENCIONES-DATOS.md, CONVENCIONES.md, ESTADO-clubes.md, ESTADO.md
- `.claude/skills/votacion-de-criterios/SKILL.md` · 4.7 KB · Decidir un criterio de datos de finance-of-sports con una votación de tres votantes independientes, en vez de que lo decida quien lo mire ese día. Usa · **leer:** la skill se carga sola cuando la tarea es la suya · ←0 huérfano · →CONVENCIONES-DATOS.md
