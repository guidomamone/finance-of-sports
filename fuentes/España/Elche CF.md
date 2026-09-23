# Elche Club de Fútbol, S.A.D.

- **Hit bueno (2026-09-16).** 2 ejercicios descargados a `Clubes/España/Elche CF/`, ambos vía el CMS
  compartido `statics-maker.llt-services.com/elc/...` (ver `_notas-generales.md`):
  - `cuentas-anuales-presupuesto-gestion-2024-2025.pdf` (75 págs.) — link "Cuentas Anuales" bajo el
    encabezado "Cuentas Anuales, Presupuesto e Informe de Gestión [Temporada 2024-2025]" en
    `elchecf.es/transparencia` (navegado con browser, carga con contenido real).
  - `informe-auditoria-cuentas-anuales-2023-2024.pdf` (73 págs., **con capa de texto real**,
    `pdftotext` funciona sin OCR) — encontrado por búsqueda puntual, confirmado por texto interno
    "ELCHE CLUB DE FÚTBOL, S.A.D., Informe de Auditoría, Cuentas Anuales e Informe de Gestión del
    ejercicio terminado el 30 de junio de 2024". **Ojo**: el nombre de archivo de origen decía
    "Inf. CCAA 6-2024 Elche.pdf" — el "6-2024" es el mes de cierre (junio 2024), no un número de
    versión.
  - El de 2024-25 no se confirmó por texto interno (no se chequeó si tiene capa de texto).
- Pendiente: ejercicios anteriores a 2023-24.
- Contacto: `elchecf.es/transparencia`.
- **CARGADO al sitio (sesión 2026-09-22, Ejercicios 2023/2024 y 2024/2025)**: ver `data/elche-es-data.js`.
  Los dos PDF tienen texto nativo y transcribieron bien, salvo la tabla "Balance de situación" del PDF
  2024/2025, que perdió sus columnas de números en la extracción — `grossDebt`/`cash` de ese año se
  reconstruyeron cruzando la Nota 8.2.1 (pasivos financieros) y la Nota 18.3 (ratio de deuda neta,
  en miles de euros). El resultado positivo de 2023/2024 está dominado por una "ayuda al descenso" de
  LaLiga de 11,8 M EUR (Elche descendió al cierre de 2022/23), no por la actividad futbolística
  ordinaria — señalado en el sitio vía el desglose de la fila. Ninguno de los 2 ejercicios lleva
  `es-laliga` (Segunda División los 2 años; el propio presupuesto 2025/26 del club confirma el ascenso
  recién para la temporada siguiente). Verificado con `node`: `verifyTieOuts()`-equivalente cierra
  exacto (2023/24) y con ruido de redondeo de ~3 EUR sobre decenas de millones (2024/25).
  Color de marca: `#05642C` (verde, identidad "Franjiverde") — flagcolorcodes.com, verificado 2026-09-22.
- Último chequeo: 2026-09-22.
