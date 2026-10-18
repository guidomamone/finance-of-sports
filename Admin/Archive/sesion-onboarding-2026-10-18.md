> ARCHIVADO (Versión 715, 2026-10-18): cierre de la rama onboarding, ya pasado a TODO, CHANGELOG, ESTADO, CONVENCIONES-DATOS y HALLAZGOS. Rutas y números de ese día.

# Cierre de la rama `onboarding` (worktree `../fos-onboarding`)

Para que la principal lo pase a TODO, CHANGELOG y ESTADO al mergear (skill de arranque, `worktree.md`). Se va completando durante la sesión.

## Qué cambió (para CHANGELOG)

- Limpieza de las transcripciones por subagentes antes de validarlas (ORDEN punto 2):
  - A `documentos-descartados.txt`: lo que no es del club (NEC Stichting Maatschappelijk 2022-23 y 2023-24, RKC Stichting Samen
    2018-19, VVV Foundation 2021-22 a 2024-25, Titanes de Barranquilla y Toros de Córdoba, básquet y béisbol); lo que no trae estado de
    resultados (Grasshopper anuario 2022-23, Beşiktaş 2012, 2013 y 2024 informe de gestión, Corsarios 2025 solo notas); Basel Verein 2021
    (se carga la AG); y la segunda versión del mismo ejercicio en Países Bajos (Ajax 2022-23 y AZ 2024-25 depósito en la KvK; FC Twente
    2021-22; De Graafschap 2021-22; Go Ahead Eagles 2024-25; PEC Zwolle 2023-24 y 2024-25, PDFs dañados; Sparta 2021-22 a 2023-24;
    Telstar 2022-23).
  - Titanes y Toros, en `.gitignore` como Athens Kallithea (sus `.md` salen del repo; al mergear desaparecen de la carpeta principal).
  - Carpetas dobles del mismo club unificadas: los `.md` de `Suiza/FC Thun` y `Suiza/FC St. Gallen` pasan al lado de su PDF gemelo en
    `Thun` y `St. Gallen`; fuera el `.md` repetido de `NEC Nijmegen/wf-2024-2025` (PDF idéntico al de `NEC`).
  - Arreglos chicos: Ajax 2024-25 pág. 44 (sin las descripciones "Grafiek:"), portadas de Sparta 2024-25 y 2020-21, ADO Den Haag
    2023-24 págs. 5 y 8 (organigrama e infografía), Go Ahead Eagles 2020-21 (una palabra). Revisión contra el PDF de las filas
    reubicadas y páginas leídas del render: los demás casos, bien.

- Transcripción por subagentes: NEC Holding 2023-24 (el del club; PDF copiado a `NEC/`, copiarlo también a la carpeta principal),
  Beşiktaş 2014-2017 y 2020 (2016 es un escaneo: 25 cifras corregidas contra el render), De Graafschap 2021-22, Sparta 2021-22 y VVV 2021-22
  y 2022-23. Young Boys ya estaba.
- Validación: la primera corrida (Guido la cortó en 40 de 566, ~US$ 6,75) rehízo con Mistral 36 `.md` belgas sin tablas; quedaron
  validados y commiteados. La lista `Admin/lotes/subagentes-validar.txt` (solo con tablas, ~US$ 3,47) espera el merge de pipeline.
- Descartados también: 523 certificaciones y dictámenes de Colombia con `estados-financieros` del mismo año y los 5 informes Deloitte de la
  Pro League.
- Gestiones (to-do 195): Portugal, 49 gestiones confirmadas de 25 clubes (tanda-2026-10-17); 129 casos de la cola contestados. Estoril
  2025 sin gestión (a `dudas-por-club.md`). Brasil (CRB, Cuiabá, Ferroviária, Goiás) sigue esperando a los clubes; OFI 2018 sin gestión.
  Clubes sin caso en la cola (tanda-2026-10-18, armada a mano con el formato de --armar): 9 gestiones confirmadas (Fortaleza 2025 con el
  presidente del consejo de la SAF, Novorizontino 2013-2025, Ituano 2024, Ceará 2024-25, Pari NN 2021-22, Once Caldas 2024-25,
  Mönchengladbach 2023). A `dudas-por-club.md`: Cruzeiro 2024-25 (fecha del cierre de la compra de la SAF), Amazonas 2024, Novorizontino
  2010. Con esto, del 195 solo queda lo que espera respuesta de los clubes.
  Criterio aplicado (de `pt.md`): club dueño de la SAD → presidente del club (Sporting 2001-2003 con Dias da Cunha aunque la SAD la
  presidía Ribeiro Telles; Marítimo 2021-22 con Rui Fontes aunque firma João Martins); dueño sociedad → presidente que firma.

- `Admin/transcripcion-subagentes/reglas.md`: paso 0 (leer portada e índice; no transcribir lo que no es del club o no trae estado de
  resultados). Aprobado por Guido el 2026-10-18.
- Para después del merge de pipeline, en este orden: (1) validar `Admin/lotes/subagentes-validar.txt` (~US$ 3,47); (2) transcribir con
  Mistral `Admin/lotes/mistral-despues-del-merge.txt` (36: el año más reciente de cada club sin tablas y Viking AS 2025; ~US$ 6, mirar el
  ensayo ya arreglado); (3) lotes de carga por país, alta con un solo año.

## Regla nueva (para `Admin/CONVENCIONES-DATOS.md`)

- Dos documentos distintos del mismo club y ejercicio (p. ej. el jaarverslag del club y el depósito en la KvK): entra el que trae el
  estado de resultados completo de la entidad del club; si los dos, el más completo (con notas); el otro a `documentos-descartados.txt`
  (Guido, 2026-10-17). Los idénticos byte a byte no hace falta: el inventario los marca `duplicado`.

## Qué deja de ser cierto en ESTADO

- (se completa al cerrar)

## Pendiente (para TODO)

To-dos nuevos pedidos por Guido el 2026-10-17. NO los hace esta rama: la sesión principal los asigna a un worktree al mergear. El
detalle con citas de cada club está en `Admin/registros/cola-borradores/altas-2026-10-17.md`.

- **Clubes partidos en dos entidades que hay que sumar: Vålerenga y Aalesund (Noruega).** El AS tiene todos los ingresos comerciales
  (Vålerenga AS 2020: sponsor 36,8 M, medios 23,1 M, entradas) y el FLI/Elite tiene los sueldos (Vålerenga Elite 2023: 85,4 M), que el AS
  le paga como una transferencia (87,5 M). Ninguno consolida. Aalesund es igual: el AS factura 64,2 M (2022) y el FLI paga sueldos por
  38,1 M, con 30,9 M de ingresos que son la transferencia del AS. Hay que mergear los documentos de las dos entidades en un solo año,
  sin contar dos veces la transferencia, y en Finanzas mostrar una nota que explique la suma (hoy no hay nada así en la pantalla).
- **Finanzas: listar todas las entidades del club.** Nombres legales, SAD/SDUQ/AS/FLI/holding, cuál es la que se carga y cuáles no, para
  que un periodista entienda de qué entidad salen los números (casos: Viking Fotball AS / Viking Fotballklubb; Molde Fotballklubb /
  Molde Fotball AS; St. Gallen AG / Event AG; Luzern FCL Holding AG / FC Luzern-Innerschweiz AG; Basel AG / Verein; NEC Holding /
  Stichting Maatschappelijk; VVV-Venlo B.V. / Foundation; Pardubice a.s. / FK Junior z.s.).
- **Finanzas: ingresos muy resumidos de las otras entidades del club.** Los documentos ya están (casi todos en
  `documentos-descartados.txt` porque no son "el club"): Molde Fotball AS, VVV Foundation, NEC Stichting Maatschappelijk, Basel Verein,
  St. Gallen Event AG, FK Junior Pardubice z.s., RKC Stichting Samen. Hay que definir qué se muestra y de dónde se lee.
- **Finanzas: mostrar quién audita el balance (por ejemplo Deloitte) y qué dice el informe en pocas palabras** (sin salvedades / con
  salvedades / incertidumbre sobre la continuidad). El dato está en los `.md` (informe del auditor) de casi todos los documentos.
- **Fredrikstad y Sarpsborg 08 (Noruega), un to-do aparte por lo mismo de las entidades.** Fredrikstad: el club es el FLI
  (Fredrikstad Fotballklubb), que tiene los sueldos; Fotballinvest AS no tiene empleados. El FLI no deposita cuentas desde 2019, así que
  hoy solo hay 2012-2018; antes de cerrarlo, abrir `wf-src-FFK_-_Årsmøte_2025.pdf`, que puede traer las cuentas del club; para 2008-2011
  solo existe el AS. Sarpsborg 08: el alta se hizo sobre un AS inversor (20% de los derechos económicos de la plantilla, sin empleados);
  rehacerla sobre el FLI "Sarpsborg 08 Fotballforening", cuyos 14 PDFs no tienen `.md`.
- **Pardubice (Rep. Checa): no darle el alta con lo que hay.** Los documentos de `Clubes/República Checa/Pardubice/` son de
  FK JUNIOR PARDUBICE, z.s. (asociación del fútbol juvenil, ~23,7 M CZK de ingresos; sin participación en otras sociedades), no del club
  profesional FK Pardubice a.s. No se descartaron (sirven para "otras entidades del club"). El sourcing de la a.s. lo hace Guido aparte.
- **Viking: transcribir los PDFs de Viking Fotball AS** (el club desde el 2026-10-17; hoy solo los del FLI tienen `.md`).

- `tools/worktree.mjs preparar` frena con ENOENT cuando la carpeta principal tiene otros worktrees en `.claude/worktrees/` (git los lista
  como `.claude/worktrees/<x>/`, con barra final, y el symlink falla). Arreglo: saltear `.claude/worktrees/` y las entradas con barra
  final. En esta sesión se enlazó con una copia del mismo código desde el scratchpad.
- Que no vuelva a pasar lo de la limpieza (escalones, uno por vez): `audit.js` `carpeta-doble` (dos carpetas de un país con PDFs de la
  misma huella); `Admin/transcripcion-subagentes/reglas.md` paso 0 (leer la portada y no transcribir si no es la entidad del club o no hay
  estado de resultados); `club-sourcing` (mirar la entidad de la portada al guardar y no abrir una segunda carpeta del club). Un `.md` sin
  PDF NO es error: los de Ajax, PSV, Feyenoord y AZ 2023-25 son la fuente publicada de lo cargado.
- Sourcing: el estado financiero completo de Beşiktaş 2012, 2013 y 2024 (cotiza: KAP); PEC Zwolle jaarverslag 2023-24 y 2024-25 (los
  bajados están dañados; hoy se carga el depósito en la KvK); Deportes Tolima `dictamen-revisor-fiscal-2025.pdf` es idéntico al de 2024.
- `pipeline.mjs --lista` (ensayo) no anticipa el control "sin tablas": muestra un `.md` sin tablas como "texto (Claude solo en págs.
  dudosas)" y en `--ejecutar` lo rehace con Mistral. La primera corrida sobre los 6 países estimó US$ 27,83 y gastaba ~US$ 0,17 por
  documento (Guido la cortó en 40 de 566, ~US$ 6,75). Arreglo: que el ensayo cuente esos documentos como "rehacer con Mistral" con su
  costo. Mientras tanto, la lista se separó: `Admin/lotes/subagentes-validar.txt` (con tablas, ~US$ 3,47) y
  `Admin/lotes/sin-tablas-6paises.txt` (481 `.md` viejos sin tablas, sobre todo Bélgica y Colombia: decidir subagentes o Mistral).
- Para HALLAZGOS, "Conocido, sin daño hoy": `pdftotext` pierde las ligaduras en las fuentes Calibri CID ("Ne o-omzet", "ac va",
  "Toelich ng") en NEC Holding 2023-24, FC Den Bosch 2022-24 y Fortuna Sittard 2022-24; las cifras están bien y la categorización la
  hace una IA. Retomarlo si un rótulo roto frena localizar o la categorización (Sparta 2021-22 tenía "w inst-en-verliesrekening" en el
  título del estado: se unió a mano).
- Los casos de alta `name` de `Suiza/FC Thun/` y `Suiza/FC St. Gallen/` quedaron sin documentos: se cierran solos como `obsoleto` la
  próxima vez que corra la etapa de alta.
