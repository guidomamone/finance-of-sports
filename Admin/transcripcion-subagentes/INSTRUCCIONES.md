# Transcribir PDFs de cuentas de clubes del Reino Unido a Markdown

Proyecto: /Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports (sitio público de finanzas de clubes;
los números tienen que ser EXACTOS). Tu trabajo: por cada PDF de tu lista, dejar al lado un `.md` con la
transcripción COMPLETA y fiel, página por página. Nada más.

Son cuentas de Companies House (Inglaterra/Escocia/Gales/Irlanda del Norte), casi siempre escaneadas (sin capa de texto).

## Pasos, por cada PDF

1. `/Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports/Admin/transcripcion-subagentes/ocr.sh "<ruta del pdf>"`
   (corré desde la raíz del proyecto). Escribe `<base>.ocr-borrador.md` (Tesseract, una marca `--- pág. N ---` por página)
   y deja la imagen de cada página en la carpeta que imprime (fuera del repo) (`p-N.png`). Tarda unos segundos por página.
2. Leé el borrador y ubicá las páginas clave: profit and loss account / income statement / statement of comprehensive
   income, balance sheet / statement of financial position, cash flow statement, statement of changes in equity, y las
   notas de turnover/revenue, operating expenses, staff costs / employees, directors' remuneration, intangible assets
   (player registrations), tangible assets, debtors, creditors, loans/borrowings, net debt, events after the balance
   sheet date. En cuentas abreviadas o de micro-empresa puede no haber P&L: entonces el balance y sus notas.
3. Mirá CADA página clave con la herramienta Read sobre su `p-N.png` y corregí en el borrador cada cifra, cada
   etiqueta de fila y cada encabezado de columna (año, £, £000) para que coincida EXACTO con la imagen. Paréntesis =
   negativo, se transcriben como están. Las tablas van como tablas Markdown, con las columnas del original (nota,
   año actual, año anterior, grupo/compañía). Si algo no se lee, `[ilegible]`: nunca inventes ni completes un número.
4. Resto de las páginas: dejá el texto de Tesseract pero limpiá basura evidente (líneas de puntos del índice, sellos
   de Companies House rotos, caracteres sueltos). Si una página sale como basura (rotada, tabla ancha, manuscrita),
   mirala con Read y transcribila desde la imagen (podés rotar con `sips -r 90 <png> --out <otro.png>`). No resumas
   NUNCA ni reemplaces una tabla por una descripción: transcripción fiel, en el idioma original.
5. Controles con la imagen a la vista: el P&L suma (turnover − costos = resultado operativo, etc.), el balance
   balancea (net assets = total equity), y los totales de notas coinciden con la línea del estado. Si algo no cierra,
   volvé a mirar la imagen: casi siempre es un dígito mal leído.
6. Guardá el resultado final como `<base>.md` (MISMO nombre que el PDF, con `.md`), en la misma carpeta. Primera
   línea del archivo:
   `> Transcripción: Tesseract OCR + revisión de un subagente de Claude contra la imagen de las páginas clave (estados y notas financieras).`
   (si usaste la capa de texto del PDF en vez de Tesseract, poné "capa de texto nativa del PDF" en lugar de "Tesseract OCR")
   y después, desde la línea 3, las marcas `--- pág. 1 ---`, `--- pág. 2 ---`... una por página del PDF, todas, en orden,
   exactamente con ese formato (sin texto extra en la marca).
7. `node tools/check-transcripcion-fidelidad.js "<base>.md"` y arreglá lo que marque.
8. Borrá SOLO tu `<base>.ocr-borrador.md`.

## Prohibido

- Borrar, mover o renombrar ningún PDF ni ningún otro archivo que no sea tu borrador.
- Tocar git, `data/`, `Admin/`, `tools/`, `index.html`, o cualquier `.md` que ya existía.
- Usar el navegador o internet. Hacerle preguntas a nadie: decidí vos y anotalo en el reporte.
- Si un PDF no es de cuentas (otra cosa, vacío, dañado), no lo transcribas: decilo en el reporte.

## Reporte final (MÁXIMO 6 líneas en total: una por PDF, más una sola línea con lo que importe para cargar datos)

`<archivo>.md | N págs | págs. verificadas contra imagen: ... | P&L cierra: sí/no/no hay | balance cierra: sí/no | fidelidad: OK/qué marcó | notas`

## Trucos que encontraron otros agentes

- Prosa en dos columnas que sale intercalada: re-pasá esa página con `tesseract <p-N.png> - -l eng --psm 3`.
- Si el PDF tiene capa de texto real (`pdftotext -f N -l N -layout <pdf> -`), usala para cruzar cifras contra Tesseract.
- Páginas escaneadas de costado o al revés: `sips -r 90|180|270` y volvé a pasar Tesseract.
- Tesseract confunde mucho 1↔4 y 3↔8 en la primera cifra: mirá con más cuidado los números que empiezan con 4 u 8.
- Tus scripts o archivos auxiliares, solo en una carpeta propia: `${TMPDIR:-/tmp}/fos-<club>-<año>/`. Hay otros agentes en paralelo y un nombre común (assemble.py) se pisa.
