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
- Qué informe del auditor va en la línea de auditoría cuando el documento trae dos (individual y consolidado): el del perímetro que publica
  el sitio (Guido, 2026-10-18, "coherencia de perímetro").

### Qué cambió (para CHANGELOG)

- To-do 282 a, Lazio (perímetro consolidado): los informes del auditor del consolidado de 2014-2016 y 2018-2025, de la API de documentos
  del club (`sslazio.it/api/widget/attachment?id_category=37|38`; 2019-20 de Wayback), transcriptos con Mistral y cada cita cotejada con una
  segunda lectura (Tesseract, y la imagen de la firma de 2021). PwC hasta 2018, Deloitte desde 2019; todos sin salvedades y sin
  incertidumbre material (2022: ÉNFASIS CONTINUIDAD, la continuidad es un aspecto clave de la revisión). Lazio 2025 pasa a citar el informe
  del consolidado (`Lazio-relazione-revisione-consolidata-2024-25.md`, que ya estaba). También se transcribieron los del individual (no se
  citan; sus PDF, a `documentos-descartados.txt`).
- To-do 282 a, Juventus (perímetro individual): 2022 y 2024, del selector de Investor Relations del club ("Report on the audit of the
  financial statements", con texto); los dos con salvedades (Deloitte). Juventus 2025 pasa a citar el informe individual (antes, el del
  consolidado).
- To-do 282 a, Roma (perímetro consolidado): 2023-2025 del sitio del club (Deloitte; BDO Italia desde 2025; ÉNFASIS CONTINUIDAD, sin
  incertidumbre material) y 2013 de Wayback (BDO S.p.A.).
- To-do 282 a, Napoli 2022 (Ria Grant Thornton; el CDN actual devuelve 17 bytes, salió de Wayback), Torino 2020-2025 (Ria Grant
  Thornton, BDO Italia, BDO Audit Services; `torinofc.it/relazioni_e_bilanci` publica el informe de cada año), Hellas Verona 2025
  (Audirevi; ÉNFASIS CONTINUIDAD) y Cremonese 2022-2025 (EY, después BDO Italia; 2022 ÉNFASIS CONTINUIDAD; de la mediateca de WordPress,
  `wp-json/wp/v2/media?search=revisione`). Todos sin salvedades, con texto, transcriptos con pdftotext.
- Skills (con el ok de Guido): `club-sourcing/paises/Italia.md` suma dónde publica cada club el informe del auditor; `club-sourcing/SKILL.md`,
  que el informe suele ser un documento aparte; `worktree.md`, el rsync con `--no-links`.
- To-do 282 a, escaneos transcriptos con Mistral (firma y opinión cotejadas con Tesseract): Napoli 2019 (Baker Tilly Revisa), 2021
  (Ria Grant Thornton) y 2023-2025 (RSM), Torino 2018-2019 (FV & C. S.A.S.), y Lazio 2026, que pasa del informe individual al del
  consolidado. Todos sin salvedades.
- To-do 282 a, Fortaleza CEIF 2025: dictamen del revisor fiscal de SIIS (radicado 2026-01-381454), sin salvedades.
- To-do 282 a, OFI 2018: el informe del auditor (ΣΟΛ/Crowe, firma Παναγιώτης Γ. Θεοδωρόπουλος) depositado en el ΓΕΜΗ el 27-03-2019
  ('Εκθεσή Ορκωτών'); sin salvedades, con un énfasis de liquidez (ÉNFASIS CONTINUIDAD).
- To-do 282 a, Hamburgo 2025: el Bestätigungsvermerk de BDO AG (uneingeschränkt, 17-10-2025), copiado de la publicación HTML del
  Jahresabschluss en el Unternehmensregister (HRB 191603; Guido resolvió el captcha) a `fussball-ag-bestaetigungsvermerk-2024-25.md`.
- FALTA EN EL PDF: 88 a 50.
- To-do 294, Bahia: el eslabón de la holding pasa a ser City Football Group (Midco) Limited > City Football Group Brazil (`controla`,
  sin %, desde 2024), con cita externa al QSA del CNPJ 49.242.727/0001-74 (City Football Brazil Ltda; único socio CFG Midco) vía
  BrasilAPI; antes era City Football Group > CFG Brazil citado con el contrato de la S.A.F. BrasilAPI, sumada a `Admin/fuentes-externas.md`
  (decisión de Guido, 2026-10-18: esa fuente, sin porcentaje). Ningún club del borrador `altas-2026-10-17.md` está publicado todavía.
- To-do 281, União de Leiria 2023-24: la línea `ingresos` de la asociación sale de la columna comparativa (jun 2024) de la Demonstração
  de Resultados del relatório 2024-25 (`RELATORIO-E-CONTAS-DE-JUL2024-A-JUN2025_UDL.md`, pág. 22): 449.215,23 € (vendas e serviços,
  subsídios, outros rendimentos y juros obtidos), igual al "Total dos rendimentos" del informe de gestión; fuera el renglón neto de
  justo valor. Cifras cotejadas con el texto del PDF. Con esto el 281 queda cerrado. Los PDF nuevos, copiados a la carpeta principal (rsync `--no-links`). ASSET_V 1300 en la rama.

### Qué queda (para TODO)

- 282 a: Lazio 2017 (las dos capturas de Wayback están truncadas en 1 MiB y cifradas; el sitio da 404 y 1Info pide cuenta: candidato a
  mail al club). Lazio 2006 y 2011-2013 figuran `sin_informe`, pero el informe del consolidado está en la API
  del club (2011-2013) y en Wayback (2006).
- 282 a: Roma 2022, el informe del consolidado (el sitio lista "consolidato" pero el link baja el del individual; Wayback no lo tiene).
- 282 a: Juventus figura con perímetro "individual" en su evidencia; si el sitio publicara el consolidado, las líneas de 2022-2025 cambian
  de informe (los dos están bajados, `Juventus-report-audit-consolidated-financial-statements-*`).
- 282 a, Italia sin documento: Napoli 2018 y 2020 (el host viejo `cdn.sscnapoli.iquii.info` no responde y Wayback no los tiene), Hellas
  Verona 2020-2024 (el sitio solo lista el último año; Wayback y las rutas probables del CDN, nada) y Bologna 2025 (Firecrawl `/map` del
  sitio no encuentra el informe). Candidatos a mail.
- 282 a, Portugal (25: Académico de Viseu 2022-2025, Alverca 2024-2025, Casa Pia 2022, Chaves 2022-2023, Felgueiras 2024, Mafra 2024,
  Marítimo 2021-2025, Nacional 2022-2025, Rio Ave 2016-2017, Vizela 2022, Portimonense 2022-2024): ningún canal público los tiene. Probé
  (2026-10-18) la página de relatório e contas de cada club, la mediateca de WordPress (`search=certificacao|parecer|auditoria`),
  Firecrawl `/map` de los once dominios, el CDX de Wayback de dominio completo y arquivo.pt. Las versiones publicadas son las mismas que
  tenemos (mismo md5 o mismas páginas): Marítimo y Portimonense listan la Certificação Legal das Contas en el índice pero el PDF publicado
  termina antes. Candidatos a mail al club (pedir la CLC de cada ejercicio).

### Gotcha (ya escrito en `worktree.md` con el ok de Guido)

- Copiar PDF del worktree a la carpeta principal con `rsync -a` copia también los symlinks que crea `worktree.mjs preparar`, que apuntan
  a la principal: el archivo real de la principal queda reemplazado por un link a sí mismo. Pasó con dos PDF de Lazio (los informes del
  individual de 2025 y 2026); se recuperaron bajándolos otra vez del sitio del club (mismas páginas que su .md). La forma segura: copiar
  solo archivos regulares, por ejemplo `rsync -a --no-links` o `find … -type f` como lista.

### Qué queda del 282 a

- Hamburgo 2024 (2023-24): no aparece en las 8 páginas de resultados de "HSV Fußball AG" en el Unternehmensregister (el 2024-25 sí);
  probar la lista "Hinterlegte Jahresabschlussunterlagen" de la ficha de la KGaA (HRB 191603) o la de la AG vieja (HRB 47576). Cada
  publicación pide un captcha que tiene que resolver una persona.
- Sin canal público (candidatos a mail): San Lorenzo 2011 y 2012 (el informe de Deloitte "se extiende en documento aparte", que el club
  nunca subió; el `balance_2012.pdf` de Wayback es el mismo archivo que tenemos), Argentinos 2015 (Wayback del dominio, sin PDF de
  balance) y los 10 japoneses 2025 (los clubes publican el 決算公告, solo el balance, sin auditor; Frontale 2025 confirmado).

## Después del merge de la sesión 3 (2026-10-18)

### Qué cambió (para CHANGELOG)

- To-do 282, Lazio 2006-2010: de `sin_informe` a `falta_transcripcion` (sin auditor, con nota). Los cinco balances muestran que hubo
  informe (2007-2009 nombran a Deloitte como società di revisione y traen sus honorarios, 2010 dice que el balance está sujeto a la
  revisión de PwC, y de 2006 hay una captura de Wayback del informe, truncada a 1 MiB), pero el informe no está en ningún canal: la API
  de documentos del club empieza en 2011 y Wayback no los tiene. Así el sitio dice "Todavía no lo revisamos" en vez de "sin informe".
- To-do 282: los 52 balances nuevos de Estonia (2019-2024 de los 9 clubes que cargó onboarding) y de Bélgica (Lommel 2018, RWDM 2020) ya
  tienen línea (0 sin línea). Los de Estonia, por 9 subagentes Sonnet con un criterio común (`Generados/auditoria/_criterio-ee.md`, no se
  trackea) y las citas verificadas por `tools/auditoria.mjs`: 24 sin salvedades, 11 sin salvedades con incertidumbre material sobre la
  continuidad, 14 sin informe (Kuressaare 2019-2024, Harju JK Laagri 2023-2024, Tallinna Kalev 2019-2022, Nõmme Kalju 2020, Narva Trans
  2023; revisados con grep: ninguna mención de auditoría) y Nõmme Kalju 2021 `falta_transcripcion` (el informe 2022 dice que el
  vandeaudiitor anterior se abstuvo sobre los saldos iniciales al 31-12-2020). Firmas: EL Finants, Brokerman Audit, ANTIMAR, K-Kreedit,
  Assertum Audit, I.S. Audiitorteenuste OÜ. Criterio aplicado: un "Asjaolu rõhutamine" cuyo cuerpo dice "olulise ebakindluse" cuenta como
  incertidumbre material (true); uno que dice solo "ebakindlus", sin "oluline", es ÉNFASIS CONTINUIDAD (false). Los belgas, a mano:
  Van Havermaet y Vyvey & Co, sin salvedades.
- `tools/auditoria.mjs --extractos` no reconoce el informe en estonio ("SÕLTUMATU VANDEAUDIITORI ARUANNE", "Meie arvates"): los 50
  extractos salieron vacíos. Mejora de script para el TODO.

## Después del segundo merge de la sesión 3 (2026-10-18)

### Qué cambió (para CHANGELOG)

- To-do 282, Lazio 2011-2013: de `sin_informe` a su línea real. Los informes de PwC sobre el consolidado salieron de la API de
  documentos del club, se transcribieron con Mistral y se cotejaron con Tesseract. Los tres son sin salvedades, con un richiamo
  d'informativa fiscal (la transacción con el fisco de 2005 y el IRAP sobre plusvalías). FALTA EN EL PDF sigue en 56.
- La (g) del 282 (el extractor en estonio) se le pasó a pipeline 2, a pedido de Guido.

## Después del tercer merge de la sesión 3 (2026-10-18)

## Finanzas 4

### Qué cambió (para CHANGELOG)

- To-do 294: siete clubes del borrador `altas-2026-10-17.md` entran al registro de entidades, cada uno con su carga (ejercicio y entidad
  que publica el sitio) y las relaciones que dice el documento de ese año, con cita por línea (verificadas con `tools/entidades.mjs --con`).
  Registro: 57 clubes con estructura, 9 grupos, 257 entidades, 359 relaciones. Commit 36b4918e7e (ASSET_V 1333).
  - Viking Fotball AS 2025 (consolidado): Viking Stadion AS 100 % (consolidada); Vikingklinikken y WeWent Live 49 %; accionistas con 5 % o
    más (Endury, Tveteraae, Stiftelsen Viking FK, T S Holding, Sparebank 1 Sør-Norge) y Viking Fotballklubb (FLI, 2,44 %).
  - Go Ahead Eagles Holding B.V. 2025 (consolidado): Go Ahead Eagles Voetbal B.V. 100 % (consolidada). El balance no dice quién es el
    dueño de la holding: sin dueños.
  - Vålerenga Fotball AS 2025 (individual): dueña Magni Sports AS 100 %; Vålerenga Fotball Elite (FLI) `vinculada` por el contrato de
    colaboración; Vålerenga Sport AS 22,86 % (45.265 de 198.000 acciones).
  - Ålesund Fotball AS 2025 (individual): Aalesunds Fotballklubb (FLI) la controla con 77,14 %.
  - Molde Fotballklubb 2025 (individual, el FLI): Akerhallen AS 50,5 % (`controla`, fuera de las cuentas, con nota); Molde Fotball AS
    `vinculada` (compra los derechos de marketing; dueña la Stiftelsen Molde Fotball, 100 %).
  - Sarpsborg 08 Fotballforening 2025 (individual): Prozo Norge AS 100 % (consolidada en el konsern del FLI, pero el sitio publica el
    individual); Sarpsborg Fotball Invest AS `vinculada` (20 % de los derechos económicos del plantel, sin empleados).
  - FC Basel 1893 AG 2021 (individual): FC Basel Holding AG 75 % y Verein FC Basel 1893 25 %; Stadiondienst AG 100 % (fuera de las cuentas);
    David Degen 100 % de la holding desde mayo de 2021.
  - Segunda tanda, cuando la principal publicó los otros tres (ASSET_V 1335): FCL Holding AG 2025 (consolidado; FC Luzern-Innerschweiz AG
    86,34 % en 2024 y 71,45 % en 2025, swissporarena events ag 100 % solo en 2024, Stadion Luzern AG 40 % fuera del consolidado); FC
    St.Gallen AG 2025 (consolidado con FC St.Gallen Event AG, que tiene 49,6 % de la AG: el informe no dice quién controla a quién);
    Fredrikstad Fotballklubb 2024 (individual, el FLI) con Fredrikstad Fotballinvest AS `vinculada`. Registro: 60 clubes, 265 entidades,
    365 relaciones.
  - Criterio que apliqué (para CONVENCIONES-DATOS si Guido lo confirma): de los accionistas se registran los de 5 % o más y el club asociación.
    `desde` es el primer ejercicio que cita el documento (los demás años de cada club no están cargados).
- To-do 282, Lazio 2006: el informe de Deloitte & Touche sobre el bilancio d'esercizio al 30-06-2006, recuperado de la captura de Wayback
  truncada (el PDF son imágenes JPEG sueltas: la página 1 se salva entera con un script de recorte, la 2 queda cortada). La página 1 trae la
  opinión: con salvedades (deuda bancaria subestimada en 8,3 M, sin efecto en el patrimonio ni el resultado) y un llamado sobre la
  continuidad (ÉNFASIS CONTINUIDAD: lo que sigue está en la página cortada). Falta la firma. Transcripción de la pág. 1 cotejada con la imagen
  en `Clubes/Italia/Lazio/Lazio-relazione-revisione-bilancio-esercizio-2005-06.md` (el PDF, a `documentos-descartados.txt`; copiado a la
  principal con `rsync --no-links`). La línea de 2006 pasa de `falta_transcripcion` a `con_salvedades`. Commit c0bd5d2662 (ASSET_V 1334).
  FALTA EN EL PDF baja en uno.

### Qué queda (para TODO)

- 282, Roma 2022: no hay informe del consolidado público. La página del club lista "consolidato" con el mismo link que el separato; el
  PDF del consolidado (116 págs.) es idéntico en Wayback (mismo digest, 2023-05-02 y 2024-01-09) y ningún espejo de `media.asroma.com`,
  Cloudinary ni S3 en Wayback tiene un informe del consolidado de 2022. Lo único que hay es el informe del separato (Deloitte, 5 págs.,
  richiamo d'informativa por la continuidad), ya bajado como `AS-Roma-relazione-revisione-separato-2022.pdf` y sin `.md`. Decisión de
  Guido: ¿se deja en pendiente (el sitio publica el consolidado) o se cita el del separato con una nota?
- 282, Hamburgo 2024 (2023-24): el Bundesanzeiger no lo tiene (lista Jahresabschlüsse hasta 2021-22, publicado el 27-07-2023, y después
  solo la Anleihe). Queda el Unternehmensregister: Guido tiene que resolver el captcha de cada publicación (la KGaA, HRB 191603, o la AG
  vieja, HRB 47576).
- 282 (f): 10 balances nuevos sin línea de auditoría (las 10 altas del lote 94: `node tools/auditoria.mjs --pendientes`).
- 294 queda cerrado: Pardubice no se da de alta (decisión de la principal).

### Qué deja de ser cierto en ESTADO

- El registro de entidades tiene 60 clubes con estructura (no 50) y 9 grupos.

### Gotcha

- `tools/entidades.mjs --con <borrador>` verifica el borrador contra los .md sin escribir y sale limpio aunque diga "data/entidades/ desactualizado":
  ese aviso es normal con `--con`.

## Después del merge de Finanzas 4 (2026-10-19)

### Qué cambió (para CHANGELOG)

- To-do 282 (f): las 10 altas del lote 94 ya tienen línea de auditoría (0 balances sin línea; 1004 con línea), con las citas verificadas por
  `tools/auditoria.mjs`. Commit 760e9b1837 (ASSET_V 1340).
  - Sin salvedades (9): Viking 2025 (PwC AS), Vålerenga 2025 (BDO AS), Aalesund 2025 (Contabile AS), Sarpsborg 08 2025 (Ernst & Young AS),
    Molde 2025 (Cedra Norge Rago AS), Basel 2021 (PwC AG), Luzern 2025 (Truvag Revisions AG, sobre la Konzernrechnung de FCL Holding),
    St. Gallen 2025 (PwC AG) y Fredrikstad 2024 (Re-visjon AS, informe dentro del acta de la asamblea 2025). Ninguno marca incertidumbre
    sobre la continuidad ni trae párrafos de énfasis.
  - Go Ahead Eagles 2025: `falta_transcripcion`. El documento lista un "Accountantsrapport" pero no trae ninguna verklaring del auditor; sí
    paga "Accountantskosten, onderzoek van de jaarrekening" (38.500), así que el informe existió. Se suma a los FALTA EN EL PDF (ahora 56).
  - St. Gallen: el informe citado es el de FC St. Gallen AG; el sitio publica la cuenta consolidada con FC St. Gallen Event AG, que tiene su
    propio informe (también bajado, sin citar). Queda anotado en la nota de la línea.

### Qué queda (para TODO)

- 282 a: Go Ahead Eagles 2025, buscar el informe del auditor de la Holding (el documento que tenemos no lo trae).

## Después del segundo merge de Finanzas 4 (2026-10-19)

### Qué cambió (para CHANGELOG)

- To-do 282 a, Go Ahead Eagles 2025: sin canal público para el informe del auditor de la Holding. El PDF de 17 págs. del club (Wayback
  2025-10-17) es idéntico al que teníamos y es solo un resumen; el de 45 págs. termina en la 4.1 sin la 4.2; el KvK vende las cuentas
  depositadas. La línea sigue `falta_transcripcion`, con la nota de lo buscado: candidato a mail al club (sin outreach). Commit 3281a2501d.
- To-do 195, segundo grupo (las gestiones de las tandas 1 y 2 sin caso en la cola): la lista del TODO estaba vieja. Cubiertos por gestiones
  confirmadas de las tandas del 18-10: Fortaleza 2025, Ituano 2024, Ceará 2024-2025, Pari NN 2021-2025, Once Caldas 2022-2025 y
  Mönchengladbach 2023-2024. Sin cubrir quedaban Novorizontino 2010, Amazonas 2024 y Cruzeiro 2024-2025: tanda armada a mano
  (`Admin/gestiones-por-pais/tanda-2026-10-19-2/`, un lote por club, tres subagentes Sonnet) y ninguno se confirmó:
  - Amazonas 2024: Francisco Wesley Couto dos Santos firma como Diretor Presidente. La primera búsqueda no encontró su fecha de asunción;
    una segunda (a pedido de Guido) halló que asumió en 2022 (Portal AM1, 17-11-2024: "assumiu a presidência do Amazonas FC em 2022",
    sucediendo a Lissandro Breval): gestión confirmada con desde 2022-01-01 (solo el año) y cargada en `data/gestiones/br.js`, que cubre el
    cierre 2024. Commit 16e16c9cbb (ASSET_V 1344); su pregunta salió de `Admin/dudas-por-club.md`.
  - Cruzeiro 2024-2025: Pedro Lourenço, firma de la compra el 29-04-2024, CADE aprobó el 12-06-2024 (O Tempo), la concordancia de la
    Associação sin fecha publicada. Cualquier fecha deja los dos cierres con él.
  - Novorizontino 2010: Alex Sandro Domingues Pereira presidía en abril de 2010 (Moção 29/2010 y Ofício 217/2010 de la Câmara de Novo
    Horizonte) y firma el balance; sin fechas de asunción ni salida.
  Lo no confirmado va a "## Gestiones" de cada `Admin/carga-clubes/<club>.md`; la pregunta de cada uno ya estaba en `Admin/dudas-por-club.md`.
  Commit 15f7a6589e.

### Qué queda (para TODO)

- 195: el segundo grupo se reduce a Novorizontino 2010 y Cruzeiro 2024-2025 (una segunda búsqueda web no sumó nada), esperando respuesta
  del club (están en `Admin/dudas-por-club.md`). Sacar del punto la lista de Fortaleza, Ituano, Ceará, Pari NN, Once Caldas y Mönchengladbach.
- Decisión de Guido (Fortaleza): el balance 2025 lo firma el CEO Pedro Martins, no el presidente del consejo que está cargado
  (Barreira, 2025-04-15 a 2026-01-15, cubre el cierre). Si prefiere al ejecutivo, el cierre queda sin fuente con la fecha de asunción.
- 282 a: Go Ahead Eagles 2025, candidato a mail al club (pedir la controleverklaring de la Holding); Roma 2022 y Hamburgo 2024 como
  antes.

## Después del tercer merge de Finanzas 4 (2026-10-19)

## Después del cuarto merge de Finanzas 4 (2026-10-19)

### Qué cambió (para CHANGELOG)

- To-do 270, medición del estimado de un club nunca cargado (sin tocar `data/`, el modelo ni el texto del 50 % en pantalla). Primero se
  confirmó leyendo el código que `node tools/estimar.mjs --medir` es gratis: solo lee `data/rankings/`, `data/deflactores.js`,
  `data/leagues.js`, `data/clubs.js` y las tablas de `faltantes-liga.mjs`; sin API ni red, y esa rama no escribe nada. Se corrió (1.011
  club-años con ingreso real, 292 clubes, 257 liga-años, 928 con posición; antes 891 club-años).
- Resultado, contra la medición del 2026-10-17:
  | | 17-10 | 19-10 |
  |---|---|---|
  | club nuevo, modelo | 50 % | 50 % (a ±25 %: 24 %; el real cae en el rango del 80 %: 80 %; n 987) |
  | club nuevo, mediana de la liga | 56 % | 56 % (a ±25 %: 20 %) |
  | club nuevo, sin posición | 61 % | 60 % |
  | falta un año, modelo | 22 % | 22 % (entre dos reales 19 %; antes o después 28 %) |
  | falta un año, interpolar a mano | 22 % | 22 % |
  Los 17 clubes nuevos (Noruega, Suiza, Países Bajos) y los 120 club-años que sumaron no movieron el total: el modelo sigue ganándole a la
  mediana de la liga por 6 puntos y sigue empatando con la interpolación a mano cuando falta un año.
- Por país, club nuevo (error mediano del modelo | mediana de la liga; solo países con 8 club-años o más, medido por club):
  Italia 33 % | 53 %, Bélgica 34 | 57, Chile 33 | 38, Japón 37 | 12, España 41 | 43, Rusia 45 | 66, Alemania 50 | 69, Brasil 50 | 45,
  Argentina 50 | 48, Colombia 53 | 49, Dinamarca 61 | 67, Grecia 64 | 60, Portugal 66 | 72, Reino Unido 45 | 35, Croacia 49 | 29,
  **Estonia 95 | 52**, **Países Bajos 97 | 89**. Por liga con 12 o más: Serie A 33 | 53, Primeira Liga 68 | 78, Superleague 64 | 77, Premier
  rusa 45 | 63, Eredivisie 97 | 89, Meistriliiga 95 | 52, Premier League 57 | 28, Brasil A 72 | 56 (Serie B 41 | 33). Por división: 1ª 49 %,
  2ª 55 %, 3ª 43 %.
- Los países nuevos pesan poco (Noruega y Suiza tienen un club-año por club, no llegan a 8): Países Bajos, 16 club-años de 12 clubes, es el
  único que se ve, y sale mal (97 %). Estonia (57 club-años, 9 clubes, cargada en la misma tanda) también sale mal.
- Causa: el sesgo con signo por país. El modelo es una sola regresión global y tira cada liga hacia la media global (b < 1 sobre la mediana
  de la liga): sobreestima las ligas chicas y subestima las grandes. Sesgo mediano: Estonia +95 %, Países Bajos +58, Croacia +37,
  Colombia +19, Brasil +7; Reino Unido −40, Alemania −26, Chile −17, Rusia −15, Bélgica −13, Portugal −10. Sin Estonia el total baja a
  49 % (la mediana de la liga, 56 %); sin Estonia ni Países Bajos, 49 %.
- Variable aparte, "partidos contra clubes con finanzas" (análisis aparte; el modelo no cambió). Como el repo no guarda fixtures, se midió
  el proxy que sí se puede: `k` = cuántos otros clubes de la misma liga-año tienen finanzas cargadas (en una liga a doble vuelta, los
  partidos contra ellos son 2·k), y su parte de la liga (k / (clubes de la tabla − 1)). El error mediano por tramo de k es 50 % (0-3),
  59 (4-7), 57 (8-11), 38 (12-15), 52 (16 o más): no es monótono, y el tramo bueno es sobre todo Italia (20 de 20 cargados). Por parte
  cargada: 48 % (0-25), 62 (25-50), 46 (50-75), 44 (75-100). Correlación del residuo con k: −0,12 (con el valor absoluto del residuo,
  −0,16; con la parte cargada, −0,07). Sumar k como corrección del residuo, ajustada sin el club que se predice, da 51 % contra 50 %: no
  agrega nada. Conclusión: esa variable no mejora el modelo; lo que explica el error es el país o la liga, no cuántos rivales conocemos.
  Si Guido quería otra cosa con "partidos contra clubes con finanzas" (por ejemplo, partidos de copa o de torneos internacionales
  contra clubes cargados), hace falta una fuente de fixtures que hoy no hay.
- Dispersión del log ingreso dentro de la liga-año (mediana por país), que explica por qué la mediana de la liga rinde distinto: Portugal
  1,24, Grecia 1,12, Países Bajos 1,10, Dinamarca 0,94, Estonia 0,84, Bélgica 0,82, Rusia 0,82, Italia 0,59, Argentina 0,58, Brasil 0,58,
  Reino Unido 0,45, Chile 0,29, España 0,29, Japón 0,19.

### Qué queda (para TODO)

- 270: lo que convendría cambiar del modelo, con números (lo decide Guido; no se tocó nada). Todos son un cambio de `tools/estimar.mjs` y
  de su medición, no de `data/`:
  1. Un efecto de país (o de liga) en la regresión del club nuevo, en lugar de una sola recta global: ataca el sesgo que concentra el
     error (Estonia +95 %, Países Bajos +58, Reino Unido −40, Alemania −26). Probar con país y con liga, y medirlo dejando afuera a cada
     país entero (la validación por club actual deja al club afuera pero no al país, así que un efecto de país sale optimista dentro de
     un país con varios clubes cargados: para países con un solo club el efecto no se puede estimar).
  2. Mientras tanto, la mediana de la liga le gana al modelo en Brasil, Argentina, Colombia, Estonia, Países Bajos, Reino Unido, Croacia y
     Japón. Usarla ahí bajaría el error total de 50 % a 46 % en esta muestra (el número es optimista: los países se eligieron mirando los
     mismos datos). Es el atajo si no se quiere tocar la regresión.
  3. Estonia y Países Bajos, que son los que hoy se publican con más error, podrían salir de los estimados de Ligas hasta que haya más
     clubes cargados o hasta tener el efecto de país (Estonia: 95 %; Países Bajos: 97 %; a ±25 %, 33 % y 6 %). Es decisión de pantalla, de Guido.
  4. El texto del 50 % en pantalla sigue siendo cierto en total (50 % mediano, 24 % de los clubes a ±25 %), pero oculta que por país va de
     33 % (Italia, Chile, Bélgica) a 97 % (Países Bajos). Una frase "entre un tercio y el doble, según la liga" diría la verdad; no se cambió.
  5. La variable "partidos contra clubes con finanzas" no vale el esfuerzo (corregir por k: 51 % contra 50 %).
  7. Mejora de script (no implementada): que `node tools/estimar.mjs --medir` tenga una opción `--detalle` con el error por liga, por país
     y por división, el sesgo con signo por país y la dispersión de cada liga-año. Hoy `--medir` imprime solo los totales y `validar()`
     guarda los errores pero no los devuelve por fila, así que esta medición se hizo con una copia de la tool. Haría falta que `validar()`
     conserve (id, liga, país, división, año, error, error de la base) por fila y que `--medir` los agrupe.
  6. Volver a medir cuando Estonia llegue a otras ligas o cuando entren más clubes de Noruega, Suiza y Países Bajos (hoy un club-año por
     club): con 8 club-años por país el cuadro de arriba se completa.
