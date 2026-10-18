# Sesión `finanzas` (worktree fos-finanzas): cierre para la principal

## Qué cambió (para CHANGELOG)

- To-do 294 a: ajuste `anio` (`tools/ajustes.mjs`) en 8 PDF portugueses que `tools/quien.mjs` no fechaba por el nombre (Boavista
  `RCSAD-23-24_1-3`, `_2-3` y `_3-3` = 2024; Marítimo `…30jun24` = 2024; Portimonense `Relatorio-Contas-21-22_assinado` y hermanos =
  2022-2025), con la fecha de cierre citada del `.md`. Con eso entraron sus 6 líneas `carga` al registro de entidades: 46 clubes con
  estructura (antes 44: suman Boavista y Portimonense; Marítimo suma 2024).
- To-do 294 b, las dudas de los subagentes, con las decisiones de Guido del 2026-10-18:
  - Manchester City: la cadena sale del registro de PSC de Companies House (cita externa con url y fecha): Sheikh Mansour > City Football
    Group Limited > City Football Group (Midco) Limited > Manchester City Limited > el club, cada eslabón "75 % o más". Fuera las relaciones
    directas Sheikh Mansour > club y CFG > club. Newton Investment and Development LLC (la "ultimate parent" de las cuentas desde 2021) va en
    la nota de Sheikh Mansour > CFG. Fuera también CFG > Girona 47 % (Wikipedia): queda la de CFG Midco 47,85 % del documento.
  - Yokohama Marinos Ltd: `vinculada` a CFG en 2025 ("other investments of City Football Group Limited", sin %).
  - Bahia: S.A.F. con cargas 2024 y 2025, City Football Group Brazil 90 % y Esporte Clube Bahia (Associação) 10 %; entra al grupo CFG.
  - Friedkin: el grupo pasa a Dan Friedkin (mismo id `friedkin`, más alias); The Friedkin Group queda `vinculada` a Roma y Everton (los
    balances dicen que los controla Dan Friedkin, por Romulus and Remus y Roundhouse) y controlada por él (Wikipedia, "chairman and CEO").
  - PSG: QSI 100 % de 2012 a 2023 y mayoría desde 2024 (Arctos compró una participación menor en 2023).
  - 777 Partners: Red Star, Hertha y Melbourne Victory cerrados en 2024 con nota (A-CAP asumió las participaciones en julio de 2024; no hay
    una venta documentada club por club).
- Registro: 47 clubes con estructura, 9 grupos, 223 entidades, 332 relaciones. ASSET_V 1276 en la rama (el merge lo resuelve con main).

## Decisiones de Guido (2026-10-18), para CONVENCIONES-DATOS

- Alcance del informe (282 e): sin campo es una auditoría plena de las cuentas del club; una revisión limitada, unos procedimientos
  acordados, una auditoría de estados para la licencia o una de las cuentas del grupo dueño llevan `alcance` y se muestran distinto. El
  título del informe no manda: un "revisão especial" que audita con seguridad razonable y opina es auditoría plena. Los japoneses salen
  del resumen de la J.League sin informe: FALTA EN EL PDF, no "sin informe". Un documento parcial que es la fuente del año publicado vale
  para la línea de auditoría.

- Cuando el balance no dice quién es el dueño de una sociedad intermedia, la cita se busca en el registro público (Companies House, PSC)
  antes que deducirla.

## Qué queda (para TODO)

- 294: (c) los casos de `Admin/registros/cola-borradores/altas-2026-10-17.md` cuyos clubes ya estén publicados. Bahia: el eslabón CFG >
  City Football Group Brazil está citado con el contrato de la S.A.F. ("O contrato estabeleceu que o CFG,"), sin %; una cita del registro
  societario de Brasil (QSA del CNPJ) lo dejaría directo.
- 282: (b) Spartak 2022; (c) los 23 balances sin .md; (d) firmas del OCR ruidoso; (e) cómo se muestran los revisores sin auditoría plena;
  (a) los 72 informes "FALTA EN EL PDF".
- 281: los ~17 documentos de entidades portuguesas sin .md y su línea de ingresos.

## Qué deja de ser cierto en ESTADO

- "Finanzas multi-año": el registro de entidades tiene 47 clubes (no 44) y 9 grupos multiclub.

## Después del merge del 2026-10-18

### Qué cambió (para CHANGELOG)

- To-do 294 c: los clubes de `altas-2026-10-17.md` publicados en main (los tres belgas que cargó onboarding) entran al registro de
  entidades con su carga 2025. Lommel SK: la entidad que ya estaba como controlada de CFG suma `clubId` (entra a la página del grupo CFG
  como club con balance) y Voetbalclub Lommel United VZW `vinculada`, con 1 acción de 60.488 (jaarrekening 2025 L694-695). Patro Eisden
  Maasmechelen VZW y Koninklijke Sporting Club Lokeren - Temse VZW, una entidad cada uno, sin dueños. Registro: 50 clubes, 226 entidades,
  333 relaciones.
- To-do 282 b: Spartak 2022, el informe del auditor transcripto palabra por palabra de las 3 páginas escaneadas
  (`Clubes/Rusia/Spartak Moscow/2022-auditorskoe-zaklyuchenie.md`, nuevo) y su línea: ООО «Аудиторская компания «Мариллион», sin
  salvedades, sin incertidumbre sobre la continuidad (firmado el 23-03-2023). Quedan 72 informes sin transcribir, todos "FALTA EN EL PDF".
- To-do 282 c: los 40 balances sin línea de auditoría, cerrados (0 sin línea; 942 balances con línea).
  - Ajuste `anio` en 4 PDF sin año en el nombre (Boca `balance-01-07-22-al-30-06-23-firmado` = 2023, Unión `memoria-y-balance-117` = 2023 y
    `-119` = 2025, AEK `AEK_oikonomikes_katastaseis` = 2016), para que `auditoria.mjs` encuentre su .md.
  - `tools/auditoria.mjs`: un documento de `documentos-parciales.txt` cuenta si es la fuente (`sourceId`) del año publicado (Atalanta 2022,
    6 meses; decisión de Guido).
  - FALTA EN EL PDF (pasan al sourcing del 282 a): San Lorenzo 2011 y Argentinos 2015 (el año sale de la columna comparativa del balance
    siguiente), los 10 japoneses 2025 (el resumen de la J.League no trae informe; decisión de Guido), Marítimo 2024 y Portimonense
    2022-2024 (todas las páginas transcriptas, sin la Certificação).
  - 28 líneas por subagentes Sonnet (Bélgica, Estonia, Portugal y Boca, Unión, AEK, Atalanta), con las citas verificadas por la tool. Sin
    informe en el documento: Harju JK Laagri 2025 (ninguna mención de un auditor) y RAAL La Louvière 2025 (la lista de comisarios está
    vacía). Boavista 2024: abstención (escusa de opinião) con incertidumbre material; Portimonense 2025: con salvedades e incertidumbre
    material. Incertidumbre material también en Lierse, Lommel, Patro Eisden, RWDM, FCI Levadia, Kuressaare, Tallinna Kalev y Paide.
- To-do 282 d: las 6 firmas del OCR ruidoso, verificadas contra la imagen del PDF. Corregidas: Getafe 2024 y 2025 "Grupo P&L Auditores,
  S.L." (no "PEL"), Union SG 2025 "C² Réviseurs & Associés SRL", Elche 2025 "Fides Audit Assurance, S.L." (sin "Auditores", que es el
  sello del colegio), Goiás 2008 "Terco Grant Thornton Auditores Independentes" (el nombre está en un logo junto a la firma; Henrique
  Vinicius da Paz es el contador del club). Confirmada: Godoy Cruz 2020 "Carlos E. Bermejillo".
- To-do 282 e: campo opcional `alcance` en `auditoria.jsonl` (validado por `tools/auditoria.mjs`, con nota obligatoria, publicado en
  `CLUB_AUDITORIA[club][año].alcance`): `revision_limitada` (Como 2025), `procedimientos_acordados` (Osijek 2025: el informe dice que no es
  auditoría ni revisión), `proposito_especial` (Kifisia 2022-2024, estados para la licencia) y `grupo` (Club América 2025, cuentas de
  Ollamani). Criciúma 2015-2019 queda como auditoría plena, con nota (el título dice "revisão especial" pero audita y opina). La pantalla ya
  está en la rama pantallas (a8ad97ac3b, "del grupo dueño del club" para `grupo`): anda cuando se mergeen las dos ramas. ASSET_V 1283 en la rama.

### Qué queda (para TODO)

- 294 c: los otros clubes del borrador (Viking, Vålerenga, Luzern, St. Gallen, Molde, Go Ahead Eagles, Basel, Pardubice, Aalesund,
  Fredrikstad, Sarpsborg 08) cuando estén publicados; el borrador tiene la entidad de cada uno con cita.
- 282 a: los informes FALTA EN EL PDF son ahora 88 (`node tools/auditoria.mjs --pendientes`), con los 16 que sumó el 282 c.

### Qué deja de ser cierto en ESTADO

- El registro de entidades tiene 50 clubes con estructura (no 47).

## Después del segundo merge del 2026-10-18

### Qué cambió (para CHANGELOG)

- To-do 281: documentos de las asociaciones de clubes portugueses transcriptos por subagentes Sonnet (texto de `pdftotext -layout` por
  página, o la imagen en los escaneos; chequeos `check-transcripcion-fidelidad.js` y `comparar-numeros.mjs` en los digitales) y su línea
  `ingresos` en el registro de entidades (verificada por `tools/entidades.mjs`; todos los renglones de ingresos de la DR, sin los "Ganhos
  imputados de subsidiárias"):
  - Vizela: Futebol Clube de Vizela, entidad nueva (20 % de la SAD, citado de las cuentas de la SAD 2022-23 a 2024-25); cuentas 2023 y 2024
    (año calendario, escaneos) con su línea.
  - Belenenses 2024-25 (3,55 M €), Chaves 2022-23 (0,84 M €; trae el informe del auditor RCVM de la asociación), Académica 2022-23
    (2,18 M €), Braga 2022-23 (5,67 M €) y Marítimo 2020-21 a 2024-25 (cierre 31 de julio; suma también los juros obtidos; 2025 = 5.586.395,
    igual al total de rendimentos del informe de gestión).
  - União de Leiria 2023-24: el PDF es solo el anexo (dos veces), sin DR: transcripto, sin línea de ingresos.
  - Porto (Futebol Clube do Porto): 2019-20 (11,40 M €), 2023-24 (17,88 M €) y 2024-25 (15,70 M €, la DR va en miles: `unidad` 1000),
    siempre de la DR individual de la asociación, no del consolidado del grupo que el mismo documento trae. Transcriptos en tramos de
    ~50 págs.; los [verificar] se resolvieron contra la imagen de la página; dos notas de transcripción marcadas como tales en 2019-20.
  - Criterio aplicado (para CONVENCIONES-DATOS, si Guido lo confirma): "todos los renglones de ingresos" incluye los "Juros e rendimentos
    similares obtidos" (Marítimo, Porto); no incluye los renglones netos de imparidad ni de provisiones.

### Qué queda (para TODO)

- 281: União de Leiria 2023-24, un documento con la DR de la asociación para su línea de ingresos. El resto del 281 está hecho.

### Qué deja de ser cierto en ESTADO

- La tarjeta Estructura muestra los ingresos de la asociación en Vizela, Belenenses, Chaves, Académica, Braga 2022-23 y Marítimo (además de
  Vitória, Tondela y Braga 2020-21).

## Después del tercer merge del 2026-10-18 (la sesión cierra por contexto)

### Qué cambió

- Nada nuevo después del merge del 281: este bloque deja escrito lo que queda para la sesión que sigue en fos-finanzas.

### Qué queda (para TODO)

- 282 a: sourcing de los 88 informes del auditor "FALTA EN EL PDF" (`node tools/auditoria.mjs --pendientes`), con la skill club-sourcing,
  de a un país (Italia es la mayoría: Lazio, Napoli, Torino, Hellas Verona, Cremonese, Roma, Juventus; después Portugal, los 10
  japoneses 2025, Hamburgo, San Lorenzo, Argentinos y otros).
- 294: los clubes de `Admin/registros/cola-borradores/altas-2026-10-17.md` cuando estén publicados (Viking, Vålerenga, Luzern, St. Gallen,
  Molde, Go Ahead Eagles, Basel, Pardubice, Aalesund, Fredrikstad, Sarpsborg 08). Bahia: el eslabón CFG > City Football Group Brazil
  está citado con el contrato de la S.A.F., sin %; una cita del registro societario de Brasil (QSA del CNPJ) lo dejaría directo.
- 281: União de Leiria 2023-24, conseguir un documento con la DR de la asociación (el PDF que tenemos es solo el anexo).
- Decisión pendiente de Guido: si los ingresos de la otra entidad incluyen los "Juros e rendimentos similares obtidos" (hoy sí, en
  Marítimo 2021-2025 y Porto 2020, 2024 y 2025; no se suman los renglones netos de imparidad ni de provisiones). Si es que no, sacar ese
  renglón de esas 8 líneas `ingresos` de `Admin/registros/entidades.jsonl` y correr `node tools/entidades.mjs`.

## Sesión 3 (2026-10-18)

### Decisiones (para CONVENCIONES-DATOS)

- Ingresos de la otra entidad (to-do 281; Guido delegó en la principal, 2026-10-18): se suman todos los renglones de ingresos de su estado
  de resultados, incluidos los "Juros e rendimentos similares obtidos"; solo queda afuera lo que se contaría dos veces (la ganancia por la
  parte de la SAD, "Ganhos imputados de subsidiárias"). Revisadas las 17 líneas `ingresos` de `Admin/registros/entidades.jsonl`: todas lo
  siguen, sin cambios. Marítimo 2021-2025 y Porto 2020, 2024 y 2025 suman sus juros; Belenenses 2025 y Vizela 2023-2024 tienen el renglón en
  "-" o 0,00; la línea de Tondela 2021 es el "Total" de su lista, que ya incluye "Juros obtidos"; Vitória 2022, Braga 2021 y 2023, Académica
  2023 y Chaves 2023 no traen ese renglón.
