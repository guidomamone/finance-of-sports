# Noruega — canal excelente, con un gotcha real de URL no documentada

El **Regnskapsregisteret** del Brønnøysundregistrene (el registro central noruego). Último chequeo:
2026-09-17.

- **`data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/<organisasjonsnummer>/<año>`
  descarga por `curl` directo, sin login, sin captcha, sin pago**, con series de hasta 18 ejercicios
  consecutivos (2008-2025) — más profundo que Bélgica/Dinamarca/Grecia en la mayoría de los clubes.
- **Gotcha importante: esta URL NO está documentada públicamente.** La API JSON "abierta" de cifras
  clave (`driftsinntekter`, etc.) SÍ está limitada al último ejercicio, como advierte la
  documentación oficial — pero esa limitación NO se extiende a la descarga del PDF completo por la
  URL de "kopi". Se encontró interceptando el `fetch()` real que dispara la interfaz humana
  (`virksomhet.brreg.no`) con un parche de `window.fetch` inyectado por JS — si un registro similar
  en otro país nórdico/europeo parece limitado por su documentación oficial, vale la pena repetir
  este truco antes de darlo por bloqueado.
- **Formato: 100% escaneos sin capa de texto** (igual que Companies House UK) — van a necesitar el
  flujo de OCR ya conocido del proyecto antes de mapear cualquier cifra.
- **El mismo gotcha de "dos entidades por club" que Alemania/Bélgica, pero más extendido**: la
  mitad de los clubes de la Eliteserien deposita bajo su "idrettslag" (asociación deportiva
  tradicional, FLI) y la otra mitad bajo una AS (aksjeselskap) dedicada al fútbol profesional — y
  no hay un patrón fijo de cuál es la real, hay que comparar el campo `driftsinntekter` (ingresos
  operativos) de cada candidato en la API de cifras clave antes de elegir, mismo criterio que se
  usó para OH Leuven en Bélgica (`paises/Belgica.md`) y Mönchengladbach en Alemania (`paises/Alemania.md`). Varios
  clubes (Vålerenga con 3 entidades activas) quedaron con el perímetro sin resolver del todo.
- Con esto, los 16 clubes de la Eliteserien 2025/26 tienen al menos algo de disclosure, aunque 2
  (KFUM, Lillestrøm) muestran huecos recientes sin explicar y 1 (Bodø/Glimt) tiene un hueco extraño
  justo en sus años de título — ver `Admin/dudas-por-club.md`.
