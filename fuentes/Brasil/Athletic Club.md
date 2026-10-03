# Athletic Club (São João del-Rei-MG — la SAF opera como **A.C. Esportes SAF**)

**Ángulos**: sitio oficial: HIT (SAF acfutebol.com.br/transparencia, solo 2023-2025; asociación athleticclub.com.br: piezas 2019, 2021, 2022, 2023, otro CNPJ) · federación/regulador: FMF no publica · Wayback CDX: sin hallazgos nuevos (acfutebol.com.br no capturó 2021-2022 financiero) · búsqueda web: HIT (página /relatorios-de-gestao-financeira/ de la asociación) · diario oficial/Junta: sin hallazgos (búsqueda web no indexa DOE-MG) · barrido: 3 (Sonnet) — 2026-10-03

- Club nuevo esta sesión. Fue uno de los primeros del país en adoptar el modelo SAF (2021), y la SAF tiene
  **sitio propio, distinto del sitio del club social**: `athleticclub.com.br` es la asociación (noticias,
  sócios, licitaciones — en su sección "Governança" solo hay cartas-convite de compras, ningún balance), y
  `acfutebol.com.br` es la SAF, con la sección `/transparencia` donde viven las demonstrações. El link entre
  los dos está en el footer del sitio del club, no en el menú — buscar solo dentro de `athleticclub.com.br`
  da un falso dead-end.
- El sitio de la SAF es un Wix: los PDFs cuelgan de `acfutebol.com.br/_files/ugd/<prefijo>_<hash>.pdf`, con
  nombres opacos. El HTML servido SÍ trae los `<a href>` con su texto visible al lado, así que se pueden
  mapear hash → título parseando los anchors (no hace falta browser). Ojo: los archivos viejos usan el
  prefijo `e87de7_` y el de 2025 cambió a `add44a_` — no se puede asumir un prefijo único por sitio.
- **3 ejercicios descargados en `Clubes/Brasil/Athletic Club/`** (`curl` directo, sin bloqueo):
  - `relatorio-auditoria-2023.pdf` (40 pág.), `relatorio-auditoria-2024.pdf` (35 pág.),
    `relatorio-auditoria-2025.pdf` (36 pág.) — los tres son "A.C. ESPORTES SAF — DEMONSTRAÇÕES FINANCEIRAS
    <año> E RELATÓRIO DOS AUDITORES INDEPENDENTES", paquete completo (balanço, DRE, DRA, DMPL, DFC, notas).
    Capa de texto real.
  - `balanco-2024-assinado.pdf` (5 pág.) y `dre-2024-assinado.pdf` (3 pág.) — las piezas sueltas firmadas de
    2024, redundantes con el relatório pero útiles para cotejar.
  - `publicacao-relatorios-contabeis.pdf` (8 pág.) — la publicación en diario oficial de los relatórios.
  - **Ojo con el nombre legal**: la SAF se llama **A.C. Esportes SAF** en la portada de sus propias
    demonstrações (el club social es Athletic Club). El PDF además escribe "ATLETIC CLUB" (sin la h) en su
    subtítulo interno — es errata del club, no un homónimo.
- Contexto societario: el Grupo Futbraz tomó el control del 90% de la SAF (reportado por Máquina do Esporte),
  o sea que el sujeto que publica puede seguir cambiando de manos — vale re-verificar el nombre legal en cada
  ejercicio nuevo antes de atribuir.
- Pendiente: ejercicios 2021-2022 (primeros años de la SAF), no listados en `/transparencia`.
- Contacto: acfutebol.com.br/transparencia (SAF); athleticclub.com.br/o-clube/governanca/ (club social, sin
  balances).
- Último chequeo: 2026-09-22.

## Barrido 2026-10-03 (grupo C Brasil): sigue en 3 ejercicios completos (SAF 2023-2025) + 3 piezas de la asociación — NO llega a 5

- Nuevo en disco: tres piezas de la **asociación Athletic Club** (CNPJ 24.735.169/0001-58, distinta de la SAF A.C. Esportes) halladas por Wayback CDX en `athleticclub.com.br/wp-content/uploads/`: `associacao-balanco-patrimonial-2019.pdf` (1 pp, Balanço al 31/12/2019, escaneo), `associacao-relatorio-financeiro-2019.pdf` (3 pp), `associacao-balanco-patrimonial-2023.pdf` (3 pp, Balanço al 31/12/2023). Son documentos livianos de una asociación chica (activo ~R$ 2,1 M), no paquetes auditados.
- La página `acfutebol.com.br/transparencia` (Wix) solo lista 2023-2025; no hay 2021-2022. Búsqueda web sin resultados.
- Ángulo que falta: Diario Oficial de MG (publicaciones de la SAF 2021-2022), pedido directo al club, o capturas Wayback del sitio WordPress viejo `acfutebol.com.br` de 2022 (el CDX solo mostró `escudos_do_athletic.pdf`).

## Barrido 3 (2026-10-03, Sonnet): suma 2 piezas de la asociación (2021, 2022); la SAF sigue en 2023-2025

- **Nuevo en disco** (asociación Athletic Club, NO la SAF): `associacao-relatorio-gestao-financeira-2021.pdf` (2 pp) y `associacao-relatorio-gestao-financeira-2022.pdf` (2 pp), "Athletic Futebol de Base — Relatório Financeiro", flujo de caja resumido firmado por presidente y contador (receta 2021 R$ 5,95 M; 2022 R$ 7,21 M). Fuente: `athleticclub.com.br/relatorios-de-gestao-financeira/` (links Drive `1XRXboArM_yQ77uWv-U5emnIBCfimHQn0` y `1wynm0WVZfKkr-gzvLdc7Y1A1L5c3hx-b`, bajables con `drive.google.com/uc?export=download&id=`). Con las de 2019 y 2023 la asociación queda en 2019, 2021, 2022, 2023 — son informes livianos, no estados auditados.
- La SAF A.C. Esportes (CNPJ 44.637.793/0001-20) no tiene 2021-2022 público en ningún canal hallado: Wix `/transparencia` y `/transparency-portal/financeiro` (dinámico, sin PDFs en el HTML), Wayback de acfutebol.com.br, WP REST media de athleticclub.com.br (búsquedas balan/relat/demonstra/2020/2024/2025/contab: solo `balanco.pdf` y `relatorio-financeiro.pdf` 2020/12 = 2019, y `Balanco-Athletic-2023.pdf`, ya en disco). `publicacao-relatorios-contabeis.pdf` es de la Tribuna Sanjoanense (jul 2025): el diario local de São João del-Rei publica los relatórios; ediciones 2022-2024 no encontradas por búsqueda web. Junta Comercial (JUCEMG) y DOE-MG: no consultados (cobran / no indexados). Candidato a mail: pedir al club las demonstrações 2022 (primer ejercicio completo de la SAF).
