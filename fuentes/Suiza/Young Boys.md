# BSC Young Boys

- **Deporte**: Fútbol
- **Liga / competencia**: Super League (Suiza, 1ª división)
- **Entidad legal**: BSC Young Boys AG (CHE-111.703.951, sede Berna) — incluye también toda la
  organización del estadio Wankdorf, no solo el fútbol (el propio club lo aclara en cada publicación:
  "Direktvergleiche mit anderen Schweizer Klubs nur bedingt möglich").
- **Canal**: sitio propio, posts de noticia individuales en `bscyb.ch/news?nid=<id>` bajo el rótulo
  "Finanzinformationen zum Geschäftsjahr <año>" (o títulos puntuales como "Höchst erfreuliche Zahlen"
  2018, "Jahresrechnung im Zeichen der Pandemie" 2020, "Jahresrechnung des BSC Young Boys" 2021),
  publicados por obligación de licencia SFL/UEFA. Cada post linkea el PDF con el texto "(PDF)" o "hier"
  a una URL bajo `/cgi-bin/dynamisch/` cuyo nombre de archivo NO sigue un patrón fijo — hay que abrir
  cada post y leer el `href` real, no adivinarlo.

## Qué se bajó (sesión 2026-09-17)

**6 documentos, `Clubes/Suiza/Young Boys/`**, cubriendo los ejercicios **2018, 2020, 2021, 2022, 2023,
2024** (falta 2019, ver abajo):

- `geschaeftsjahr-2018.pdf` — vía `bscyb.ch/news?nid=11334` ("Höchst erfreuliche Zahlen"): primer año
  con esta publicación, "Aufgrund einer Auflage der UEFA" (primera vez que la UEFA lo exigió). Ganancia
  de +17 millones CHF mencionada en el texto del post. **Escaneo sin capa de texto** (pdftotext vacío)
  — pendiente de OCR si se quiere usar para carga de datos.
- `geschaeftsjahr-2020.pdf` — vía `nid=12433` ("Jahresrechnung im Zeichen der Pandemie"). Pérdida de
  5,129 millones CHF por Covid. Texto nativo.
- `geschaeftsjahr-2021.pdf` — vía `nid=13013` ("Jahresrechnung des BSC Young Boys"). Ganancia de 14,8
  millones CHF. Texto nativo.
- `geschaeftsjahr-2022.pdf` — vía `nid=13533`. **Escaneo sin capa de texto** (pdftotext vacío).
- `geschaeftsjahr-2023.pdf` — vía `nid=14103`. Ganancia de 6,7 millones CHF. Texto nativo.
- `geschaeftsjahr-2024.pdf` — vía `nid=15686`. Texto nativo.

## Pendiente: ejercicio 2019

No se encontró el post de noticia correspondiente a "Geschäftsjahr 2019" (debería existir, publicado
en 2020, entre `nid=11334` de 2018 y `nid=12433` de 2020) — el otro post de 2020 (`nid=12433`) SÍ
menciona la cifra de referencia de 2019 (21,6 millones CHF de ingresos por entradas), lo que confirma
que el dato existe y se reportó, pero no se ubicó el post/PDF propio de ese ejercicio con varias
búsquedas dirigidas (WebSearch por `site:bscyb.ch`, por cifras conocidas, adivinando el nombre de
archivo del PDF por analogía con 2020 — los 4 intentos de nombre dieron 404). No vale la pena seguir
adivinando nid por rango numérico sin una pista más concreta; retomar si aparece un link directo.

## Verificación de formato

2018 y 2022 son escaneos (necesitan el flujo de OCR de Tesseract del proyecto antes de poder extraer
cifras); 2020, 2021, 2023 y 2024 tienen texto nativo, confirmado con `pdftotext -layout`.

- Último chequeo: 2026-09-17.
