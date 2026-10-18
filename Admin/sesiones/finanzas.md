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
  ASSET_V 1281 en la rama.

### Qué queda (para TODO)

- 294 c: los otros clubes del borrador (Viking, Vålerenga, Luzern, St. Gallen, Molde, Go Ahead Eagles, Basel, Pardubice, Aalesund,
  Fredrikstad, Sarpsborg 08) cuando estén publicados; el borrador tiene la entidad de cada uno con cita.
- 282 a: los informes FALTA EN EL PDF son ahora 88 (`node tools/auditoria.mjs --pendientes`), con los 16 que sumó el 282 c.

### Qué deja de ser cierto en ESTADO

- El registro de entidades tiene 50 clubes con estructura (no 47).
