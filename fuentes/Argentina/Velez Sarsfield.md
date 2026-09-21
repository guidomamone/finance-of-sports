# Vélez Sarsfield

- Archivo oficial completo "Memorias y Estados Contables" —
  velez.com.ar/elclubesdelossocios/memorias-estados-contables (página institucional dedicada, la
  fuente más completa de todo este barrido). Descargados 21 PDFs reales a
  `Clubes/Argentina/Velez Sarsfield/`: Balance General de casi todos los ejercicios 2015 a 2025, y
  Memoria + Balance General combinados (narrativa + estados contables) de casi todos los mismos años,
  alojados nativamente en velez.com.ar/pdf/.
- **TODOS los ejercicios con archivo oficial disponible YA CARGADOS en el sitio** (Versiones
  82-93): N°115 (2024/2025), N°114 (2023/2024), N°113 (2022/2023, OCR), N°112 (2021/2022), N°111
  (2020/2021), N°110 (2019/2020), N°109 (2018/2019), N°108 (2017/2018), N°107 (2016/2017, OCR),
  N°106 (2015/2016, OCR) y N°105 (2014/2015, OCR) — **rango completo y sin ningún hueco, 11
  ejercicios consecutivos**. Cuarto club del sitio, primero agregado al motor genérico desde que
  existía (obligó a sumar una 3ra rama a varios ternarios de `js/finanzas-calc.js`/
  `js/finanzas-render.js` que estaban hardcodeados a river/racing, ver detalle en VERSIÓN 82 del
  historial de `index.html`). Transcripciones completas en
  `Clubes/Argentina/Velez Sarsfield/balance-general-{2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015}.md`.
  Convertidos con el tipo de cambio que cada balance declara en su propio Anexo VI: $1.196 (2025),
  $909 (2024), $256,30 (2023), $125,03 (2022), $95,52 (2021), $70,26 (2020), $42,263 (2019), $28,75
  (2018), $16,53 (2017), $14,94 (2016), $8,988 (2015). Resultados reales: SUPERÁVIT 2025
  $36.833.752 / DÉFICIT 2024 $(1.113.139.098) / SUPERÁVIT 2023 $522.234.138 / SUPERÁVIT 2022
  $1.216.670.585 / DÉFICIT 2021 $(753.625.872) / DÉFICIT 2020 $(145.019.616) / SUPERÁVIT 2019
  $370.018.627 / SUPERÁVIT 2018 $342.815.648 / DÉFICIT 2017 $(73.534.953) / SUPERÁVIT 2016
  $66.227.589 / DÉFICIT 2015 $(36.195.305) (todo en ARS). Ver `data/velez-data.js` para el detalle
  completo de categorización (incluye una separación por sector del Anexo III para que "Salarios y
  primas" sea solo plantel profesional, no todo el personal del club — mismo criterio en los 11
  ejercicios). Gestiones: Raúl H. Gámez (2014-2017, ejercicios 2015-2017), Sergio Rapisarda
  (2017-2023, ejercicios 2018-2023) y Fabián Berlanga (2023-actual, ejercicios 2024-2025) —
  entradas `gamez`/`rapisarda`/`berlanga` en `gestionesByClub.velez`. Los ejercicios 2020 y 2021
  incluyen un ingreso extraordinario COVID ("Subsidio A.T.P.", programa estatal), categorizado como
  other_income.
  **Los ejercicios 2023/2017/2016/2015 (N°113/107/106/105) se cargaron vía OCR** (Tesseract,
  instalado con Homebrew en esta sesión: `brew install tesseract tesseract-lang`) porque esos 4 PDF
  son escaneos sin capa de texto — mucho más barato en tokens que renderizar cada página como
  imagen con el Read tool. Números verificados fila por fila contra los totales impresos de cada
  Anexo antes de cargarlos, no solo con el OCR crudo (2016 cerró exacto, 2015/2017 con un ruido
  irrelevante de $40-50 mil sobre totales de cientos de millones). Ver comentario de cabecera de
  `data/velez-data.js` para el detalle completo del flujo (útil si en el futuro aparece un
  ejercicio anterior a 2015 en el archivo del club, o si hay que reprocesar alguno).
  **Bug real encontrado y corregido**: al cargar 2015, `verifyTieOuts()` marcó una diferencia real
  (no de OCR) en el check de "Expenses" — la fórmula del check (`Math.abs(a) + Math.abs(b)` en vez
  de `Math.abs(a+b)`) daba mal cuando el crédito de "reclasificación" de un ejercicio supera a su
  amortización real (nunca había pasado antes en ningún club/ejercicio). Corregido en TODOS los
  checks de `verifyTieOuts()`, no solo los de Vélez.
- Pendiente: Mercado de Pases/Resultados Deportivos/Títulos (esta sesión se enfocó solo en
  Finanzas, quedaron vacíos a propósito en `data/velez-data.js`, no con placeholder inventado).
  Confirmar si hay un ejercicio 2026 más reciente (se publica recién tras el cierre del próximo
  ejercicio) o alguno anterior a 2015 en el archivo del club. Algún año puntual puede faltar en una
  de las dos series (Balance General vs. Memoria+Balance) — revisar la carpeta local antes de dar
  por completo un ejercicio específico.
- Ver también `dudas-por-club.md` (1 pregunta abierta sobre este club: si "Uso del estadio" incluye
  algo de recaudación propia de entradas).
- Contacto: no se relevó sección de contacto específica; formulario general de velez.com.ar o
  WhatsApp institucional +54 9 11 2266-1000.

