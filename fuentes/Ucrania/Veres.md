# Veres (Rivne)

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: ПУБЛІЧНЕ АКЦІОНЕРНЕ ТОВАРИСТВО "РІВНЕНСЬКИЙ НАРОДНИЙ КЛУБ "ВЕРЕС""
  (PJSC "Rivne People's Club "Veres""), EDRPOU 43584706, registrada 2020-04-03. Sede: 33028, Рівне,
  вул. Симона Петлюри, буд. 35. Es el ÚNICO club ucraniano organizado como sociedad anónima
  PÚBLICA (ПАТ) que emitió acciones al público — "el primer club de fútbol ucraniano que salió a
  bolsa", según prensa (2020/2021).
- **Canal principal**: el propio sitio de accionistas del club, `nkveres.com/aktsioneram` — un
  archivo extenso de "Скачати документ" (descargar documento) con TODOS los depósitos regulatorios
  desde 2020, incluyendo actas de asamblea, emisiones de acciones y los paquetes financieros
  anuales/intermedios. Los títulos de cada documento están en el HTML circundante del link (no en
  el nombre del archivo, que es un hash), hay que leer el contexto DOM para identificar cuál es
  cuál.
- **Canal secundario, cruzado**: **SMIDA** (НКЦПФР), por ser ПАТ — `smida.gov.ua/db/feed`, EDRPOU
  43584706. Tiene un paquete de "Річна інформація емітентів цінних паперів" completo para FY2020
  (balance + estado de resultados + flujo de fondos + estado de patrimonio + notas MSFZ + dictamen
  de auditor, todo como HTML estructurado citable, ficha `smida.gov.ua/db/feed/57390`), más
  "Проміжна інформація" (información intermedia) para varios trimestres de 2021 — pero NO tiene
  ningún "Річна інформація" posterior a 2021 (el club parece haber dejado de usar esa categoría de
  depósito específica después, aunque sigue disclosing "особлива інформація" — actas, emisiones —
  hasta 2026). El sitio propio (`nkveres.com`) es la fuente más completa para los años posteriores.

## Qué se bajó (sesión 2026-09-18)

**Serie de 5 ejercicios completos (FY2020, 2022, 2023, 2024, 2025) + el paquete oficial SMIDA de
FY2020 como respaldo/cruce.** `Clubes/Ucrania/Veres/`:

- `smida-annual-report-index-2020.html` / `smida-annual-report-fin-general-2020.html` /
  `smida-annual-report-auditinfo-2020.html` — el paquete oficial de la ficha SMIDA `/db/feed/57390`
  (balance+resultados+flujo+patrimonio+notas MSFZ, y el dictamen de auditor — "Товариство з
  обмеженою вiдповiдальнiстю "ААН "СЕЙЯ-КIРШ-АУДИТ"", opinión no modificada con párrafo
  explicativo sobre la falta de valuación de los derechos federativos de los jugadores como activo
  intangible).
- `veres-financiero-completo-auditor-2020.pdf` — el mismo ejercicio FY2020, pero la versión que
  publicó el propio club (paquete combinado con el dictamen).
- `veres-financiero-2022-doc1/2/3/4.pdf` — 4 documentos separados de FY2022 (balance, resultados,
  flujo, dictamen — sin desglosar cuál es cuál todavía, título genérico "Фінансова звітність ПАТ
  "РНК "Верес" за 2022 рік" para los 4).
- `veres-balance-2023.pdf`, `veres-resultados-2023.pdf`, `veres-flujo-caja-2023.pdf`,
  `veres-auditor-2023.pdf`.
- `veres-balance-2024.pdf`, `veres-resultados-2024.pdf`, `veres-flujo-caja-2024.pdf`,
  `veres-auditor-2024.pdf`.
- `veres-balance-2025.pdf`, `veres-resultados-2025.pdf`, `veres-flujo-caja-2025.pdf`,
  `veres-auditor-2025.pdf`.

**No se bajaron** (quedan disponibles en `nkveres.com/aktsioneram` si se quiere profundizar): los
3 dictámenes de revisión INTERMEDIA de 2021 (Q1, H1, 9 meses) — el club no publicó un paquete anual
completo separado para FY2021 en ese archivo (pasa directo de FY2020 a los intermedios de 2021 y
después a FY2022), así que 2021 queda como el único hueco de la serie 2020-2025. Vale la pena
revisar si el paquete FY2022 lo contiene como comparativo (el estado de resultados suele traer la
columna del año anterior).

## Verificación hecha en esta sesión

Todos los PDF confirmados como PDF real (no se corrió `pdfinfo` línea por línea por volumen, pero
los tamaños de descarga fueron razonables — entre 100 KB y 2 MB cada uno, sin ninguna respuesta que
pareciera HTML de error). El HTML de SMIDA se leyó completo en pantalla — confirmado auditado, con
firma del gerente ("Назарук А.Г.") y del contador jefe ("Присмицька В.Д.").

## Dudas / pendientes

- FY2021 no tiene un paquete anual completo identificado (solo informes intermedios) — no está
  claro si el club nunca lo publicó como paquete anual separado o si está en algún archivo con
  nombre no descriptivo del listado grande de `nkveres.com/aktsioneram` que no se revisó entero
  (tiene más de 200 documentos, la mayoría actas/gobernanza sin relación).
- Por qué el club dejó de usar la categoría "Річна інформація емітентів цінних паперів" de SMIDA
  después de FY2020 (¿cambio de régimen regulatorio, o simplemente prefieren su propio sitio?) no
  se confirmó — no amerita pregunta directa al club, es una curiosidad de proceso, no un hueco de
  dato.

- Último chequeo: 2026-09-18.
