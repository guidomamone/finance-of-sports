# Oleksandriya

**Ángulos**: sitio oficial: parcial — `fco.com.ua` da 403 a todo acceso automatizado (curl, WebFetch, Browser pane), bloqueo de IP, no se pudo leer el menú · canal regulador: no aplica (ТОВ, fuera de SMIDA) · Wayback CDX: agotado (2019-2025 recuperados; 2018 truncado) · búsqueda web: no hizo falta · barrido: 2 (Sonnet) — 2026-10-03

- **Entidad legal**: ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «ФУТБОЛЬНИЙ КЛУБ «ОЛЕКСАНДРІЯ», EDRPOU 36360756. Carátula verificada por OCR: "Фінансова звітність за рік, який закінчився 31 грудня 20XX року із Звітом незалежного аудитора".
- **7 ejercicios en disco** (`Clubes/Ucrania/Oleksandriya/`): `oleksandriya-fin-zvit-2019.pdf` (64 págs.), `-2020` (61), `-2021` (61), `-2022` (63), `-2023` (66), `-2024` (63), `-2025` (9 págs., 15 MB). Todos son documentos del propio sitio del club, servidos por la copia de Wayback Machine (la nota anterior los daba por bloqueados).
- **Cómo se recuperaron**: el CDX de dominio completo sobre `fco.com.ua` (filtro `application/pdf`) lista `wp-content/themes/fco/files/fin_zvit_<año>.pdf` para 2019-2025 (más `zayava_<año>.pdf`, declaraciones de la Premier League, no bajadas) y `sites/default/files/fk_oleksandriya_audyt...2018...pdf` (dictamen 2018). Capturas completas: 2019 `20220615060058`, 2020 `20220123150456` (sobre la URL `fin_zvit-2020.pdf`), 2021 `20220616075649`, 2022 `20230531051458`, 2023 `20240501105122`, 2024 `20250401062127`, 2025 `20260503161900`.
- **Gotcha**: las primeras capturas de 2018-2021 que lista el CDX venían truncadas a 1.048.576 bytes exactos (sin `%%EOF`, `pdfinfo` sin "Pages:"); cada una tenía una segunda captura posterior de 2,4-7 MB completa. Ver `.claude/skills/club-sourcing/SKILL.md` 0.1.
- **Pendiente**: 2018 (`fk_oleksandriya_audyt.vysnovok_iz_fin._zvitnistyu_2018_pershyy_povnyy_komplekt.pdf`): única captura `20190919160354` truncada → descartada. Reintentar con otra captura si aparece.
- Último chequeo: 2026-10-03.
