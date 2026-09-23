# Girona Futbol Club, S.A.D.

- **Hit bueno (2026-09-16).** 2 ejercicios reales descargados a `Clubes/España/Girona FC/`, ambos vía
  el mismo host de documentos `statics-maker.llt-services.com/gir/` (backend de CMS de transparencia
  compartido por varios clubes de LaLiga — ver `_notas-generales.md`), sin necesitar navegar la página
  de transparencia del club (que devolvió 404 al pedirla directo, ver más abajo):
  - `informe-auditoria-cuentas-anuales-2024-2025.pdf` (177 págs.) — confirmado por texto interno
    "Informe de Auditoría y Cuentas Anuales 2024-2025, GIRONA FUTBOL CLUB, SAD". Firmado
    electrónicamente (Signaturit) 03-04/11/2025.
  - `cuentas-anuales-2019-2020.pdf` (30 págs., depósito estándar modelo Registro Mercantil) —
    confirmado por texto interno "30/06/2019" y "30/06/2020" (ejercicio cerrado 30/06/2020,
    comparativo 2018-19). Nombrado originalmente `documento-2023-09.pdf` en la URL de origen (fecha de
    subida, no de ejercicio) — renombrado al confirmar el ejercicio real.
- **Cómo se encontraron**: búsqueda puntual (WebSearch), no navegación del sitio — la URL
  `gironafc.cat/es/transparencia` que aparece en resultados de búsqueda devuelve 404 en vivo (el sitio
  parece haber reestructurado sus rutas; el menú de `gironafc.cat` no tiene un link visible a
  "transparencia" en catalán tampoco). Pendiente para una sesión futura: encontrar la URL viva de la
  sección de transparencia navegando el menú completo del sitio (en catalán), para localizar más
  ejercicios sin depender de que Google ya haya indexado el PDF puntual.
- Pendiente: ejercicios 2020-21, 2021-22, 2022-23, 2023-24 (huecos entre los dos años encontrados).
- Contacto: `finances@gironafc.cat` (email de contacto de la empresa, visto en el propio PDF de
  depósito 2019-20).
- **CARGADO al sitio (2026-09-22, clubId `girona-es`).** Ejercicio 2019/2020 (cierre 30/6/2020,
  Segunda División, Girona recién descendido de LaLiga) y Ejercicio 2024/2025 (cierre 30/6/2025,
  LaLiga, clasificado a Champions por su 3° puesto en 2023/24) — el salto de EUR 27 M a EUR 144 M de
  revenue es real, no un error de carga. Los dos documentos son escaneos con ruido de OCR real en la
  cuenta de pérdidas y ganancias: 2019/20 tenía un sub-ítem de "Otros gastos de explotación" que no
  reconciliaba contra su subtotal impreso por EUR 10.000 exactos (probable transposición de dígitos);
  2024/25 tenía "Amortización del inmovilizado" desviada EUR 3.000.000 exactos contra RESULTADO DE
  EXPLOTACIÓN impreso. Los dos se corrigieron por residuo contra el subtotal/total impreso (ver
  comentario de cabecera de `data/girona-es-data.js`) y reconciliaron EXACTOS después del ajuste.
  FX: `EUR@2025-06-30` para el ejercicio 2025 (ya en `data/currency-map.js`); el ejercicio 2020
  necesita `EUR@2020-06-30`, que NO EXISTE TODAVÍA en `FX_CLOSE` — pendiente que Guido la agregue
  (cotización de cierre BCE al 30/6/2020), mientras tanto el archivo tira un `console.warn`.
  Liga: 2019/20 (Segunda División) queda FUERA de `data/club-leagues/es.js` a propósito (no hay
  entrada de Segunda en el catálogo de ligas todavía); 2024/25 sí lleva `es-laliga`, verificado contra
  Wikipedia. Color de marca: `#CF0C29` — Wikipedia en español (bicolor rojo/blanco a rayas
  verticales, "Blanc-i-Vermells"; con el otro color blanco, gana el rojo por el criterio de
  desempate de `club-or-year-onboarding/SKILL.md` §3) + footylogos.com, verificado 2026-09-22.
- Último chequeo: 2026-09-22.
