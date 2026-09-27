# República Checa — otro registro gratis de primer nivel, y dos formatos nuevos para el `.gitignore`

`or.justice.cz` (la Sbírka listin, parte del registro público checo) funciona para los 16 de 16
clubes de la Chance Liga 2025/26 — gratis, sin login, sin captcha, PDFs con texto nativo (cero OCR).
Mismo grupo de mejores canales del proyecto que Bélgica/Dinamarca/Grecia/Noruega. Último chequeo:
2026-09-17.

- **100% scripteable por `curl` puro, sin browser**: con un cookie-jar temporal por documento
  alcanza — no hizo falta ni un solo click de navegador real. Sesión con más ejercicios
  descargados por club de todo el país: Karviná con 34 documentos.
- **Casi todos los clubes son a.s. (akciová společnost), salvo Pardubice**, que sigue siendo z.s.
  (spolek, asociación sin fines de lucro) y aun así deposita cuentas — no asumir que la forma
  jurídica "asociación" bloquea el disclosure sin confirmar primero en el registro.
- **Dos formatos que el `.gitignore` no contemplaba**: algunos
  depósitos vienen como `.docx` (Viktoria Plzeň) o como XML/iXBRL puro (Jablonec) en vez de PDF —
  mismo criterio que TIFF/XHTML de Dinamarca (`paises/Dinamarca.md`): documento fuente crudo queda local,
  aunque sea chico (13-49 KB en este caso, el criterio no depende del tamaño). Antes de commitear
  cualquier sourcing nuevo, chequear `git status` por extensiones no vistas antes.
- **Gotcha de tooling, no del portal**: usar `fetch()+Blob+<a download>` en el Browser pane para
  automatizar varias descargas seguidas puede disparar diálogos nativos de "guardar archivo"
  apilados si el navegador real de la sesión tiene activado "preguntar dónde guardar cada archivo"
  — interrumpe al usuario en su propia máquina. Con un registro que soporta `curl` puro (como este),
  preferir siempre esa vía para descargas en serie, no el browser.
- **Huecos sospechosos de ser un problema del filtro de búsqueda, no dead-ends reales**: Slovan
  Liberec (17 años sin depósito) y Slovácko (serie muy discontinua) — ver dudas abiertas en
  `Admin/dudas-por-club.md` antes de asumir que esos años no existen.
