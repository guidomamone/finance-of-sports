# Athletic Club (São João del-Rei-MG — la SAF opera como **A.C. Esportes SAF**)

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
