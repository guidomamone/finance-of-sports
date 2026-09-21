# Hajduk Split

- **Entidad legal**: HNK Hajduk Split š.d.d. (sportsko dioničko društvo) — el club se convirtió
  en sociedad anónima deportiva con miles de pequeños accionistas-socios vía la iniciativa "Naš
  Hajduk" (ojo: "Naš Hajduk" es una asociación DISTINTA, la de los socios/accionistas
  organizados, no confundir sus documentos con los del club — ver `nashajduk.hr`).
- **8 ejercicios descargados** a `Clubes/Croacia/Hajduk Split/` (2018-2025, serie casi completa):
  - `financijsko-izvjesce-2018.pdf` hasta `financijsko-izvjesce-2025.pdf`, uno por año sin huecos.
  - **`financijsko-izvjesce-2021.pdf` está corrupto en el propio servidor de Hajduk**: el archivo
    descarga completo (2,7 MB, conexión HTTP limpia, sin error, `cf-cache-status: HIT`) pero
    `pdfinfo`/`pdftotext` fallan con "Invalid XRef entry"/"Couldn't read xref table" — probado 2
    veces con cache-busting, mismos bytes idénticos las 2 veces, así que no es un problema de
    descarga sino que el PDF que Hajduk tiene alojado (`hajduk.hr/sadrzaj/pdf/2022-04-13-10-42-2204.pdf`)
    está roto de origen. Se guardó igual (es el archivo real y oficial, solo que ilegible con
    las herramientas estándar) — si se necesita el contenido, probar reparación con una
    herramienta más tolerante (Acrobat, `mutool clean`, etc., no disponibles en este entorno) o
    pedirle al club el archivo de nuevo.
- **2017 NO se pudo conseguir**: existía un mirror en `es.split.hr` (portal del Ayuntamiento de
  Split, que recibe el documento porque la ciudad es accionista del club) según un resultado de
  búsqueda, pero la URL específica devuelve 404 hoy (documento removido del repositorio
  municipal) y el certificado SSL del dominio además está vencido. Prensa (gol.dnevnik.hr)
  confirma las cifras de 2017 (superávit ~30,7 millones de kunas antes de impuestos) pero sin
  adjuntar PDF. No se encontró el documento en `hajduk.hr` mismo para ese año.
- **Cómo se encontró**: los links de "Financijsko izvješće/izvještaj" en las notas de prensa del
  propio `hajduk.hr` (una por año) apuntan a un visor PDF.js interno
  (`hajduk.hr/pdf/<slug>/<id>`), NO al archivo real — hay que abrir ese HTML y extraer la
  constante `DEFAULT_URL` (formato `hajduk.hr/sadrzaj/pdf/<archivo real>.pdf`) para bajar el PDF
  de verdad con `curl`. Confirmado con los 8 ejercicios.
- **Pendiente**: nada más allá de lo anotado arriba (2017 sin PDF, 2021 corrupto de origen).
- Último chequeo: 2026-09-17.
