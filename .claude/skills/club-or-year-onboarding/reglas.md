# Reglas de Guido para el pipeline (sección 4)

*Se abre antes de correr un lote o de tocar un script. El núcleo y la tabla de qué abrir están en `SKILL.md`.*

## 4. Reglas de Guido

- **Un lote es de un solo tipo: un país o un formato de documento.** Una lista mezclada (los «documentos en mano» de varios países) se separa primero en grupos. Se carga enseguida lo que pasa con las reglas y tools de hoy; cada documento que pide una regla, una tool o una liga que no existe sale como un punto propio del TODO, y el lote se cierra sin esperarlo.

- **Un criterio de datos no se le pregunta a Guido.** Si una carga trae una pregunta que no resuelven el documento, `Admin/CONVENCIONES-DATOS.md` ni `club-data-mapping` (un período raro, una temporada de la pandemia, un perímetro), va a la Auditora, que la resuelve con un precedente o con `votacion-de-criterios`. Mientras tanto el año queda donde lo manda la regla vigente (`documentos-parciales.txt`, la cola), sin pedirle ok a nadie. A Guido llega solo lo que la votación no resuelve.

- **Un cambio por vez.** No mezclar varios arreglos en una tanda.
- **Siempre escalera, nada de manta corta.** Cada arreglo es un escalón con UNA compuerta, la misma para todos; los escalones solo
  proponen. Nada de condiciones especiales por caso apiladas una arriba de otra. Un arreglo que rompe un caso que antes salía bien no
  entra. "Idéntico" es lo que se CARGA: en un escalón que decide vale que decida MENOS veces si nunca se equivoca más; lo que deja de
  decidir baja de escalón y pide una segunda mirada (Jev/Claude o la cola). Caso: el precedente con la nota deja sin decidir "Otros
  gastos" de UC 2014 y 2016 (no se equivocan, piden otra mirada); errores de precedente: 0 → 0.
- **Dos caminos, no más reglas:**
  - camino limpio: reglas pocas y estrictas; si todo cierra sin interpretar nada, se carga solo;
  - camino de dudas: lo que no pasa no se "arregla" con otra regla; se le pregunta a la IA algo puntual con cita del documento, y si tampoco
    alcanza, va a la cola.
- **No perseguir casos sin daño.** `Admin/HALLAZGOS-pipeline.md`, sección "Conocido, sin daño hoy", es SOLO para un defecto que no
  afecta ningún dato cargado ni frena nada: se mide su impacto y se anota con la condición para retomarlo, y no se diseña un arreglo.
  Un defecto que frena una carga no va ahí: va a `Admin/registros/frenados-por-script.jsonl` (sección 3a, punto 7) y sigue el circuito de
  `Admin/CONVENCIONES.md` (Pipeline arregla, la Auditora aprueba). Si la condición de un caso de HALLAZGOS se cumple, pasa a ese
  circuito. Una regla que "siempre incluye/excluye" algo es manta corta: va como
  escalón (probar lo que dijo la IA y, solo si la compuerta no cierra, probar lo otro).
- **Arreglar en los scripts, nunca a mano.** Lo que se repite va a un script de `tools/` con un ensayo que estime el costo. Gastar
  dólares de API está bien, dentro del presupuesto de la sesión (`Admin/CONVENCIONES.md`); tokens de sesión, no. Archivos grandes se leen con filtros, no enteros.
- **Para bajar el gasto de API:** la Batch API (mismo modelo, mitad de precio) y pasar una tarea de Opus a Sonnet, de a una y medida contra lo cargado. Nunca Haiku. Antes de una medición paga, además del costo del ensayo, una frase que diga qué decisión cambia el resultado; sin esa frase no se corre. Cada archivo de `Admin/mediciones/` abre con `Conclusión:` y `Destino:`.
- **Antes de pagar, el camino sin IA.** Si el ensayo da costo de localizar, extraer o transcribir en un documento que trae las cifras etiquetadas o en un formato que se lee sin interpretar (iXBRL o XBRL, el XML o CSV del depósito, los códigos NBB), no se corre: se le pide a Pipeline el escalón que lee esa estructura, y la IA queda solo para lo que ese escalón no cierra.
- **Ejemplos concretos:** club, año, fila, importe, antes y después. Explicar las siglas.
- **Páginas:** decir siempre las dos, "página N del visor (impreso M al pie)".
- **La cola (Guido no la revisa).** Preguntas concretas de sí o no, con la página del visor y las líneas del .md. Las contesta un subagente
  Sonnet, un club por vez: lee el criterio de `club-data-mapping` y los precedentes del país, abre cada caso en el .md y devuelve decisión +
  cita + seguridad, o "no sé" con la pregunta concreta. Claude revisa contra el documento las correcciones grandes (cambio de bloque, una
  fila que sale con `no_es_rubro`, una fila mixta) antes de aplicarlas con `cola.mjs --responder`, firmadas "Claude <fecha> (subagente
  Sonnet)". Un "no sé" que frena el alta de un club o la carga de un año se le pregunta a Guido, de sí o no y diciéndole exactamente qué
  abrir ("abrí el PDF en la página N del visor; en el .md, líneas X-Y; fijate si..."); si es algo que solo el club sabe, va a
  `Admin/dudas-por-club.md`.
  Un caso de perfil (socios que pagan cuota, otros deportes) nunca frena una carga: se googlea el club (programa de socios, modalidades), se contesta con esa fuente y, si no hay nada, la respuesta es "no" con la nota y la duda va a `Admin/dudas-por-club.md`.
- Ajuste `categoria` = MUDAR una fila de lado (salta la compuerta del lado). Para aceptar/corregir dentro del mismo lado: la cola
  (`cola.mjs --corregir-categoria`), que respeta la compuerta. Caso: Novorizontino 2024, "Premiações" es ingreso y gasto.
