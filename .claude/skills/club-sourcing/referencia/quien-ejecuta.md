# 0.1b Quién ejecuta cada barrido

*Se abre al repartir los barridos entre Sonnet, Exa y Opus. El núcleo y la tabla de qué abrir están en `SKILL.md`.*

#### 0.1b Quién ejecuta cada barrido (Sonnet → Exa → Opus)

Además de QUÉ familia probar (0.1), importa QUÉ herramienta la corre, escalando en costo a medida
que el club se resiste. **Haiku queda afuera de la escalera por defecto**: en un A/B test sobre 23
clubes argentinos, usar Haiku para el descubrimiento mecánico y Sonnet para verificar costó 30,8% MÁS
que Sonnet solo (verificar bien a Haiku exigía rehacer buena parte del trabajo: re-descargar lo que
dejaba corrupto, profundizar donde se quedaba corto, corregir cifras mal leídas), y en un lote casi
cargó el balance de una cooperativa eléctrica ajena como si fuera del club de fútbol homónimo, por
coincidencia de nombre sin verificar el contenido. Sigue siendo una opción a mano para un escenario
distinto (un club con miles de candidatos en Wayback CDX para FILTRAR antes de que Sonnet mire, tipo
Boca/Racing), pero no es la regla.

1. **Club nuevo o 2do barrido**: **Sonnet directo**, la escalera completa de 0.1 (sitio oficial +
   Wayback CDX de dominio completo + búsqueda web + prensa). Esto incluye reconciliar contra lo ya
   cargado/documentado en un club que "parece bien cubierto" (¿este PDF es nuevo o el mismo que ya
   tenemos con otro nombre? ¿el archivo de 838 KB realmente abre o tiene el xref roto?): así
   aparecieron documentos nuevos de Unión, de Gimnasia La Plata y de Boca (esta última vía Wayback
   CDX de dominio completo) en clubes que se creían agotados.
2. **GATE antes de escalar más**: no pasar a Exa/Opus en cualquier club, solo si HAY SEÑAL de que
   vale la pena (prensa confirma que el documento existe, es un club grande/tradicional, o el barrido
   de Sonnet dejó un hilo suelto concreto). Sin señal, cerrar como indica 0.3 (dead-end / candidato
   a mail / pendiente). Motivo: escalar a herramientas pagas en cada club "sin PDFs" no tiene el mismo
   repago que en un puñado de clubes grandes.
3. **3er barrido** (con señal, sigue sin nada): **Exa** (búsqueda semántica por contenido, no por
   nombre de archivo ni palabra clave): `node tools/exa-search.mjs "<query>"`, necesita
   `Admin/api-keys/exa.env`. En el A/B test, sobre 5 clubes argentinos ya cerrados como dead-end real
   (escalera de Sonnet agotada a fondo), una sola query de Exa por club reabrió 2 de los 5: un sitio
   de hinchas con balances completos que ninguna de las 3 familias estándar puede ver (no es sitio
   oficial, no está en Wayback del dominio del club, no rankea en búsqueda web genérica) y una nota de
   prensa con el detalle de una asamblea que va a regularizar 6 ejercicios. Costo mínimo (una llamada
   HTTP de segundos, sin tokens de modelo de por medio salvo para leer el resultado). **Gotcha, el
   mismo que tiene la búsqueda web genérica**: Exa puede confundir clubes de nombre parecido (2 de 5
   queries del test trajeron el club equivocado por homonimia): filtrar SIEMPRE por dominio/contexto
   antes de confiar en un resultado, nunca por el título solo.
4. **4to barrido** (sigue sin nada): **Opus**, SOLO para pensar ángulos nuevos que la escalera de 0.1
   no contempla; no ejecuta ninguna búsqueda él mismo.
5. **4.5** (si Opus propuso algo concreto): **Sonnet** ejecuta esa idea.
6. **5to barrido** (la idea tampoco resultó): documentar como dead-end, siguiendo 0.3.

Un club puede terminar en un número más alto que 5 si aparece trabajo ad hoc extra (un mail que trae
una pista, una gestión de Guido): el número no es una medalla, es solo "cuántas rondas de búsqueda
distintas ya recibió este club".

**Registro**: la línea `**Ángulos**` (0.2) suma un segmento `barrido: N (<quién>)`, ej. `barrido: 2
(Sonnet)` o `barrido: 3 (Exa)`. Actualizarlo cada vez que una sesión avanza al club un escalón, no
solo la primera vez.
