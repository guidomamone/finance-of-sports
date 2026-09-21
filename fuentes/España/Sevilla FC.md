# Sevilla Fútbol Club, S.A.D.

- **Hit moderado (2026-09-13).** 4 ejercicios anuales reales, del 2021-22 al 2024-25, descargados a
  `Clubes/España/Sevilla FC/`: `cuentas-anuales-2021-2022.pdf`, `cuentas-anuales-2022-2023.pdf`,
  `cuentas-anuales-2023-2024.pdf`, `cuentas-anuales-2024-2025.pdf` — todos bajados de la página de
  la Junta General de Accionistas (`sevillafc.es/el-club/la-entidad/accionista/jga`), que resultó
  tener un batch de cuentas correspondientes a VARIOS ejercicios cargado en la JGA de 2025 (nov/dic
  2025), no solo el ejercicio más reciente.
- **Dato de color importante para el onboarding**: también se descargó
  `cuentas-anuales-2022-2023-borrador-rechazado.pdf`, un documento con contenido similar al de
  2022-23 pero de una URL/fecha distinta (`.../681b06c7/2. CCAA ANUALES...JGA2023.pdf`, vs. el
  definitivo `.../692b44e6/CUENTAS-ANUALES-2022-2023.-JGA-2025.pdf`) — probablemente corresponde al
  borrador de cuentas 2022-23 que la prensa reportó como **rechazado por los accionistas** en la
  Junta de ese año ("RECHAZADAS LAS CUENTAS ANUALES Y LA GESTIÓN DEL CONSEJO DE LA TEMPORADA 22/23",
  nota oficial del club). No está 100% confirmado cuál de los dos PDFs es el borrador rechazado y
  cuál el que finalmente se aprobó en la JGA 2025 sin comparar el contenido línea por línea (ninguno
  de los dos tiene capa de texto extraíble con `pdftotext`, habría que hacer OCR) — antes de cargar
  cualquiera de los dos al sitio, comparar ambos documentos y anotar cuál es cuál en
  `dudas-por-club.md` si sigue sin quedar claro.
- **Intentos fallidos de ir más atrás de 2021-22**: se encontraron URLs de años 2018-19, 2019-20 y
  2020-21 en resultados de búsqueda (`sevillafc.es/sites/default/files/documents/CUENTAS ANUALES_JGA
  2019.pdf`, `CUENTAS ANUALES_2020.pdf`, `2. CCAA ANUALES_JGA2021 _3.pdf`) pero las tres URLs
  devuelven **HTTP 400** con `curl` (con y sin prefijo `www.`) — a diferencia de los PDFs de
  `mediaverse.sevillafc.hiway.media` (CDN nuevo del club) que sí descargan bien, el hosting viejo
  `sevillafc.es/sites/default/files/documents/` (Drupal) parece rechazar requests sin sesión de
  navegador real. Wayback Machine no se intentó para estas 3 URLs específicas (quedó pendiente,
  archive.org estaba temporalmente caído en el momento de la búsqueda — ver nota de Villarreal CF).
- Pendiente: años 2018-19 a 2020-21 (URLs conocidas, ver arriba, reintentar con Wayback Machine
  cuando archive.org esté disponible) y años anteriores a 2018-19 (no buscados).
- Contacto: `sevillafc.es/el-club/la-entidad/accionista/jga` (página JGA, la más productiva) y
  `sevillafc.es/el-club/la-entidad/ley-de-transparencia` (existe pero renderiza vacío para fetch
  automatizado, es JS-driven — mejor ir directo a la página JGA).
- Último chequeo: 2026-09-13.
