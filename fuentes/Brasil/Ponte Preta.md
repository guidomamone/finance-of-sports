# Ponte Preta (Associação Atlética Ponte Preta — CNPJ MF 46.125.175/0001-26, entidade de direito privado, no es SAF)

**Ángulos**: sitio oficial: no se encontró sección (sin re-chequeo) · federación/regulador: FPF índice JSON 2010-2025 (2010-2015 y 2016-2025 presentes todos los años) · Wayback CDX: no hizo falta · búsqueda web: no hizo falta · barrido: 9 ejercicios en disco (2017-2025) (Sonnet) — 2026-10-03

- No se encontró sitio propio con sección de transparencia/demonstrações financeiras — toda la
  fuente de esta sesión vino del repositorio institucional de la Federação Paulista de Futebol
  (mismo mecanismo que Ituano/Mirassol/Guarani-2024: obligación de auditoría contable ante la
  federación para competir en el Campeonato Paulista, no por Lei do SAF).
- **3 ejercicios descargados a `Clubes/Brasil/Ponte Preta/`, serie continua 2021-2024:**
  - `balanco-2021-2022.pdf` — Balanços Patrimoniais en 31/12/2022 e 31/12/2021
    (`Institucional/2022/DF para jornal 2022.pdf`).
  - `balanco-2022-2023.pdf` — Balanços Patrimoniais en 31/12/2023 e 31/12/2022
    (`Institucional/2023/Balanco Associacao Atletica Ponte Preta..pdf` — nota: el nombre de archivo
    original tiene doble punto antes de `.pdf`, es así en el servidor, no un error de transcripción).
  - `balanco-2023-2024.pdf` — Balanços Patrimoniais en 31/12/2024 e 31/12/2023
    (`Institucional/2024/Balanco Publicacao FPF.pdf`).
- Los 3 documentos confirman explícitamente "ASSOCIAÇÃO ATLÉTICA PONTE PRETA — Entidade de Direito
  Privado — CNPJ (MF): 46.125.175/0001-26" en cabecera — mismo CNPJ en los 3, sin riesgo de
  homónimo. Valores expresados en reais (no en miles), a diferencia de la mayoría de los otros
  clubes paulistas de esta sesión — **ojo al mapear/convertir, confirmar la unidad antes de cargar**.
  El balance muestra pasivo circulante y no circulante muy superior al activo en los 3 años (ej.
  2024: activo circulante R$17,4M vs. pasivo circulante R$47,8M, más R$235,4M de pasivo no
  circulante) — situación patrimonial negativa marcada, consistente con un club sin ingresos de
  SAF/inversores.
- Pendiente: años anteriores a 2021 (no se buscaron esta sesión); confirmar si existe algún sitio
  propio de la Ponte Preta con sección de transparencia (no se encontró en la búsqueda, pero no se
  agotó exhaustivamente el dominio propio del club).
- Contacto: `futebolpaulista.com.br/Repositorio/Institucional/<año>/`.
- Último chequeo: 2026-09-16.
- **Cargado en el sitio (2026-09-25):** 3 ejercicios, `data/pontepreta-br-data.js` (`clubId`:
  `pontepreta-br`). 2022 desde `balanco-2021-2022.pdf` (Déficit R$4,53 M), 2023 desde
  `balanco-2022-2023.pdf` (Déficit R$15,17 M, el mayor de los 3), 2024 desde
  `balanco-2023-2024.pdf` (Superávit R$7,00 M, incl. un ajuste extraordinario de R$22,17 M
  ligado a un pasivo nuevo de acuerdos laborales — "Pept/CNRD"). `BRL@2022-12-31` (R$5,2177,
  PTAX BCB del 30/12/2022) todavía no está centralizado en `data/currency-map.js`, se cargó como
  `fx` literal en el archivo del club — pendiente agregarlo a `FX_CLOSE`. Ver el comentario de
  cabecera del archivo de datos para el detalle completo de categorización, tie-out y grossDebt.
- **Color de marca: `#000000` (negro) — Team Color Codes, confirmando Wikipedia en portugués
  ("suas cores são o preto e o branco"). Bicolor negro/blanco sin desempate explícito del club:
  se usó el criterio de `club-or-year-onboarding` SKILL.md sección 3 ("si el otro color es
  blanco, gana el que no es blanco"), verificado 2026-09-25.**

## Barrido 2026-10-03 (objetivo ≥5 ejercicios: CUMPLIDO, 3 → 9)

Fuente: índice JSON FPF. Todos "ASSOCIAÇÃO ATLÉTICA PONTE PRETA", balanço "em 31/12/<año> e <año-1>" (valores en reales), con capa de texto, md5 distinto entre años.
- `balanco-2016-2017.pdf` (ej. 2017, `balanco aapp 2017.pdf`, 3 pp.), `balanco-2017-2018.pdf` (ej. 2018, `Demonstração Para Publicação 2018.pdf`), `balanco-2018-2019.pdf` (ej. 2019, `Substituto PONTE PRETA - Publicação Formato Extendido modelo 2019.pdf`), `balanco-2019-2020.pdf` (ej. 2020, `...modelo 2020 (11).pdf`), `balanco-2020-2021.pdf` (ej. 2021, `Balanco 2021 AAPP.pdf`), `balanco-2024-2025.pdf` (ej. 2025, `Demonstracao financeira AAPP 2025.pdf`, 9 pp.).
- Nota de nombres: los existentes `balanco-2021-2022` / `2022-2023` / `2023-2024` son ej. 2022 / 2023 / 2024; los nuevos usan "<año anterior>-<ejercicio>".
Serie en disco: 2017-2025 completa y continua. Son publicaciones de 3-9 págs. (sin notas completas en 2017-2021: formato "para publicação"). Sin probar: 2010-2016 (en el índice).
