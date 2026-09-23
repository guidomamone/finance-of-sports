# Temperley

- Memorias narrativas (SIN estados contables) — temperley.org.ar/socios/memoria-vigente (página
  institucional dedicada, con links directos a PDF/Drive). Descargados 3 PDFs reales a
  `Clubes/Argentina/Temperley/`: `memoria-ejercicio-2022-23.pdf` (47 págs), `memoria-ejercicio-2023-
  24.pdf` (45 págs) y `memoria-ejercicio-2025-26.pdf` (86 págs, el más reciente, presentado para la
  Asamblea General Ordinaria del 14/6/2026). Los 3 son Memoria narrativa pura — revisados con grep
  de palabras clave (SUPERAVIT/DEFICIT/SITUACION PATRIMONIAL/ACTIVO/PASIVO), sin una sola cifra de
  Estado de Recursos y Gastos ni de Situación Patrimonial en ninguno de los 3. No se cargó nada al
  sitio (ni podría, no hay datos financieros).
- Pendiente: el Balance/Estados Contables real de cualquier ejercicio (no encontrado en ningún
  canal); también hay 2 PDFs más viejos linkeados directo en el sitio
  (`wp-content/uploads/2020/12/Memoria-2020.pdf` y `.../2021/10/Memoria-2019-2020.pdf`) que
  devuelven 403 Forbidden al intentar descargarlos (bloqueo de bot, no da error para navegación
  normal) — reintentar con un browser real en vez de descarga directa. Por el nombre, son también
  memorias narrativas (no balances), así que no es prioritario.
- Contacto: administracion@temperley.org.ar, socios@temperley.org.ar, tel. (011) 4231-5076, Av. 9 de
  Julio 360, Temperley.
- Último chequeo: 2026-09-12.

## Chequeo 2026-09-22

- **Confirmado el patrón: Temperley publica Memoria pero NO Balance.** La Memoria del ejercicio
  1/4/2025–31/3/2026 (86 págs) ya estaba descargada como `memoria-ejercicio-2025-26.pdf`; se
  reverificó su contenido a fondo esta sesión (texto completo + OCR de muestra de páginas del medio
  y del final): **no tiene ni un Estado de Situación Patrimonial ni un Estado de Recursos y Gastos**.
  Las 86 páginas son narrativa por área (fútbol, deportes amateurs, obras, Fundación Sueños
  Celestes, Programa FINES, jardín). Mismo resultado que las 2 memorias anteriores.
- El post que la publica se llama "Presentación de Memoria **y Balance** para la Asamblea General
  Ordinaria del 14 de junio de 2026" (`temperley.org.ar/noticias/institucionales/...`), pero linkea
  **un solo** documento de Drive, que es la Memoria. El Balance no está publicado en ningún lado del
  sitio.
- **Documento nuevo descargado**: `informe-gestion-primer-ano-lecchi-2025.pdf` (26 págs, 35 MB) —
  "Primer año de gestión, presidencia Lecchi, diciembre 2025", vía Drive desde el post
  `/noticias/institucionales/primer-ano-de-gestion-presidencia-lecchi-diciembre-2025`. Es un
  **reporte infográfico** (obras, sponsors, fútbol, vida social, una sección "Orden"), no un estado
  contable — mismo tipo de documento que la presentación de asamblea de All Boys o el infográfico de
  Talleres. Guardado por si aporta cifras sueltas.
- Gotcha de tooling: `temperley.org.ar` responde bien a `curl` plano pero **rechaza la conexión**
  desde el Browser pane y desde WebFetch (ECONNREFUSED al IP 161.129.65.166). Si una sesión futura
  necesita renderizar JS de ese sitio, va a chocar con esto; por ahora `curl` alcanza.
- Pendiente: el Balance/Estados Contables de cualquier ejercicio. Pedírselo al club
  (administracion@temperley.org.ar figura en la portada de la propia Memoria).
- Último chequeo: 2026-09-22.
