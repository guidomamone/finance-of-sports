# Bahia (Esporte Clube Bahia S.A.F. + Esporte Clube Bahia — associação)

- SAF: sigue en 2 ejercicios en `Clubes/Brasil/Bahia/`: `demonstracoes-financeiras-2024.pdf` y
  `demonstracoes-financeiras-2025.pdf` (este último con comparativo 2024-2025). Se confirmó que el
  club re-subió el mismo archivo 2025 a una carpeta `/2026/04/` nueva (mismo contenido byte a byte) —
  no es un año nuevo, solo una re-publicación.
- **Nuevo esta sesión, associação (entidad distinta de la SAF, mismo club):** 3 PDFs comparativos
  con Relatório dos Auditores Independentes, bajados de ecbahiaassociacao.com.br/transparencia/ —
  `demonstracoes-financeiras-associacao-2020-2021.pdf`, `-2021-2022.pdf`, `-2022-2023.pdf`. Entre
  los tres cubren 2020, 2021, 2022 y 2023 del lado asociativo (no-SAF) del club, cada uno con el año
  anterior de comparativo. La página de transparencia de la associação lista años adicionales
  2017-2020 no bajados todavía.
- Pendiente: 2022 y 2023 del lado SAF específicamente (la SAF empezó a operar en 2023 — el "year
  zero" con inversión de City Football Group — puede que el primer ejercicio SAF-only sea el 2023 que
  falta, a diferenciar del 2022/2023 de la associação que ya se bajó).
- Contacto: esporteclubebahia.com.br/wp-content/uploads/ (SAF); ecbahiaassociacao.com.br/transparencia/
  (associação, con más años 2017-2020 sin bajar todavía).
- Último chequeo: 2026-09-12.

## Cargado (2026-09-24)

- SAF, ejercicios 2024 y 2025, en `data/bahia-br-data.js` (`clubId: 'bahia-br'`). La associação NO se
  cargó (entidades jurídicas separadas, ver arriba). 2024 se cargó desde la columna año corriente de
  `demonstracoes-financeiras-2024.md` (as-filed), NO desde la columna comparativa reexpresada que trae
  `demonstracoes-financeiras-2025.md` (esa columna difiere en Total do Ativo por R$348,365 mil por un
  cambio de criterio contable — ver comentario de cabecera de `data/bahia-br-data.js`, Nota 2.20 del
  balance 2025). Tie-out verificado exacto los 2 años (revenue, expenses, Prejuízo do exercício).
- Color de marca: NO resuelto — `brandColor: null`. Bahia es tricolor en partes iguales (azul, vermelho,
  branco — "Tricolor Baiano"), Wikipedia en portugués no declara predominancia de ninguno de los 3, y
  ninguno de los criterios de desempate de `club-or-year-onboarding` sección 3 resuelve un empate a
  TRES colores (hay 2 colores no-blancos empatados entre sí, no un solo color contra blanco). El
  `theme-color`/CSS del sitio oficial está contaminado por la paleta default de WordPress/Gutenberg.
  Verificado 2026-09-24.
- Duda genuina sin resolver (candidata a `Admin/dudas-por-club.md`): ningún documento separa "sócios"
  de "bilheteria" — la Nota de Receita (Nota 15 del balance 2024, Nota 17 del balance 2025) y la de
  Contas a Receber juntan ambos conceptos en una sola cifra ("Receitas de sócios e bilheteria"/"Sócios
  e bilheteria"), pese a que la Nota 17(b) del balance 2025 confirma que son 2 fuentes de ingreso
  reales y crecientes por separado. Se cargó la línea combinada como `matchday_competition`, lo que
  deja "Cuotas Sociales" en $0 para Bahia en Formato Simplificado — vale la pena preguntarle al club el
  desglose.
- Pendiente sin cambios: 2022 y 2023 del lado SAF específicamente (ver arriba, "the year zero" con
  inversión de City Football Group) — el balance 2024 solo trae como comparativo un período de 10
  meses (27/02-31/12/2023), no un ejercicio 2023 completo ni 2022.

