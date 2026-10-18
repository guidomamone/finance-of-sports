> ARCHIVADO (Versión 727, 2026-10-18): copia del cierre de finanzas (segunda sesión) en el merge de la 727; la rama siguió abierta.

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
