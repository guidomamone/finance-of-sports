# Paysandu (Paysandu Sport Club, Belém-PA — asociación civil, CNPJ 04.982.484/0001-72; NO es SAF)

- Club nuevo esta sesión. El portal de transparencia es **viejo, plano y scrapeable con `curl` a secas**:
  `www2.paysandu.com.br/transparencia/balancos.php` (ojo el `www2`, el dominio principal no lo sirve), con
  todos los PDFs como `<a href>` directos bajo `www2.paysandu.com.br/download/balancete/<año>/<archivo>.pdf`.
  Sin Cloudflare, sin JS, sin file manager. Trae además los balancetes MENSUALES desde 2019 y los
  "receita-despesas" mensuales de 2025-2026.
- **15 PDFs descargados en `Clubes/Brasil/Paysandu/`**, cubriendo 4 ejercicios cerrados:
  - 2021 (el más completo, en piezas sueltas): `balanco-2021.pdf`, `dre-2021.pdf`, `dfc-2021.pdf`,
    `dmpl-2021.pdf`, `dra-2021.pdf`, `notas-explicativas-2021.pdf` (18 pág.),
    `relatorio-auditores-2021.pdf` (3 pág.).
  - 2023: `balanco-2023.pdf`, `dre-2023.pdf` — **el balanço de 2023 es comparativo 2022-2023**, así que el
    ejercicio 2022 está disponible como columna comparativa aunque no tenga documento propio.
  - 2024: `balanco-2024.pdf`, `dre-2024.pdf` (comparativos 2023-2024).
  - 2025: `balanco-2025.pdf`, `dre-2025.pdf` (comparativos 2024-2025), `relatorio-auditores-2025.pdf`,
    `relatorio-administrativo-2025.pdf` (15 pág.).
  - Todos con capa de texto real. Verificado en el cuerpo: "PAYSANDU SPORT CLUB — CNPJ 04.982.484/0001-72"
    y el relatório de auditoría dirigido a "Paysandu Sport Club, Belém - Pará".
- **El documento clave a leer con cuidado al cargar los datos es el relatório de auditoría de 2025: es una
  opinión CON RESSALVAS** ("exceto quanto aos fatos base para opinião"). Prensa local (DOL, Papão) reporta
  además que el club (a) no publicó el balance de 2024 dentro del plazo de la Lei Pelé, (b) lo publicó recién
  el 11/12, y (c) lo bajó del sitio poco después sin explicación, y (d) que hay divergencias entre el balanço
  y el balancete de diciembre en la clasificación de R$89,8 M entre inmovilizado e intangible. **No cargar
  cifras de 2024/2025 de este club sin cotejar el balanço contra la DRE y contra las ressalvas del auditor.**
- Ejercicio 2022 sin documento propio: se probaron `2022/balanco-2022.pdf`, `2022/dre-2022.pdf`,
  `2020/balanco-2020.pdf`, `2024/RAI-PAYSANDU-2024.pdf` y `2023/RELATORIO-DOS-AUDITORES.pdf` — todas devuelven
  302 al home (el servidor redirige en vez de 404, así que un 302 acá significa "no existe"). Para 2019 y 2020
  solo hay balancetes mensuales.
- Pendiente: relatório de auditoría de 2023 y 2024 (solo se publicaron balanço y DRE); ejercicio 2022
  completo.
- Contacto: www2.paysandu.com.br/transparencia/balancos.php; www2.paysandu.com.br/download/balancete/<año>/.
- Último chequeo: 2026-09-22.
