# Coritiba (Coritiba Sociedade Anônima do Futebol / Coxa Participações S.A.)

**Ángulos**: sitio oficial: parcial (coritiba.com.br es SPA Fanbase sin sección de transparencia/DFS visible hoy; los archivos viven en Wayback) · federación/regulador: FPF solo tiene 2024 (Coritiba no está en el 2025) · Wayback CDX: HIT (dominio completo) · búsqueda web: sin resultado útil (2025) · barrido: 1 (Sonnet) — 2026-10-03

- Sigue `demonstracoes-financeiras-2024.pdf` (vía bucket Digital Ocean Spaces de la Federação
  Paranaense de Futebol).
- **Nuevo esta sesión:** `demonstracoes-contabeis-2022-2023.pdf` — publicidade legal de 3 páginas
  (balanço patrimonial 2023 y 2022 comparativo) publicada en el Diário Indústria&Comércio el 12-14 de
  abril de 2024, también alojada en el mismo bucket de la federación. Es más corta que los otros
  archivos del club (sin notas explicativas extensas) pero tiene balanço patrimonial real de ambos
  años — cubre el primer ejercicio de la SAF (jul-dic 2023, superávit de R$34,6M según prensa) y 2022.
- Pendiente: 2025 (déficit de R$113,9M según prensa, PDF no encontrado todavía pese a buscarlo
  puntualmente).
- Contacto: federacaopr.sfo3.digitaloceanspaces.com (bucket de la federación); coritiba.com.br,
  sección institucional/balanço anual.
- Último chequeo: 2026-09-12.
- Color de marca: `#005742` — tabla por liga de footylogos (Brasileirão A), 1er color, exacto,
  verificado 2026-09-21.

## Barrido 2026-10-03 (sourcing Brasil grupo B) — de 2 a 7 ejercicios en disco

- El sitio actual (`coritiba.com.br`, CMS Fanbase, SPA que devuelve 650 bytes por curl) no tiene ruta de transparencia (`/transparencia` da "Ops! Parece que você se perdeu";
  `/saf` es solo texto institucional sobre Treecorp). El **sitio viejo** sí tuvo los balances: Wayback CDX de dominio completo
  (`coritiba.com.br`, filtro `Balanco|DFS`) lista `/Content/Arquivos/Balancos/DFS ...pdf`, `/ged/Arquivos/Balancos/...` y `/Content/Arquivos/pdfs/balanco_AAAA.pdf` (2007-2018).
- Bajados con `web.archive.org/web/<ts>id_/<url>` a `Clubes/Brasil/Coritiba/` (todos **publicidade legal de 4-5 págs.**, balanço + DRE + notas breves, Coritiba Foot Ball Club asociación, verificado por texto):
  `demonstracoes-financeiras-2020-2021.pdf` (31/12/2021 y 2020), `-2019-2020.pdf` (2020 y 2019), `-2018-2019.pdf` (2019 y 2018),
  `-2018.pdf` (5 pp, 2018 y 2017), `-2017.pdf` (5 pp, 2017 y 2016).
- Hay más hacia atrás, **sin bajar** (meta cumplida): `balanco_2016.pdf` ... `balanco_2007.pdf` en `portal.coritiba.com.br/Content/Arquivos/pdfs/` (capturas 200 en Wayback).
- Wayback rechazó conexiones (connection refused) en ráfagas: espaciar y reintentar; `dl.sh` con reintentos funcionó.
- Ejercicios en disco ahora: 2016-2017 (comparativo), 2017-2018, 2018-2019, 2019-2020, 2020-2021, 2022-2023 (comparativo), 2024 → ejercicios 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024.
- **Falta**: 2025 (déficit R$113,9M según prensa, ver coritibafc.com/noticias/coritiba-deficit-113-milhoes/ como lead de prensa) — no apareció PDF; ángulo pendiente: pedirlo al club o esperar a que lo republique en la FPF/sitio.
