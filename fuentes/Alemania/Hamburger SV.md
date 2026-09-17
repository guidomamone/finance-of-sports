# Hamburger SV

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división) — ascendido para la temporada 2025/26
  tras varios años en 2. Bundesliga.
- **Entidades legales — DOS perímetros distintos, no confundir**:
  1. **HSV Fußball AG & Co. KGaA** (hasta 2025 "HSV Fußball AG", HRB 47576, Amtsgericht Hamburg) —
     la sociedad que corre el fútbol profesional. Cambió de forma jurídica de AG a AG & Co. KGaA en
     2025. Es el perímetro correcto para las finanzas del club de fútbol.
  2. **Hamburger Sport-Verein e.V.** (VR 380, Amtsgericht Hamburg) — la asociación madre,
     MULTIDEPORTE (incluye otras secciones además de fútbol). Sus propios ingresos (~13 millones de
     EUR en 2024/25) son ínfimos comparados con los de la AG/KGaA — mismo patrón de "perímetro mixto"
     ya visto en LDU Quito (Ecuador): NO usar las cifras del e.V. como si fueran las del club de
     fútbol.

## Qué se bajó (sesión 2026-09-16/17)

**4 ejercicios de CADA entidad**, `Clubes/Alemania/Hamburger SV/`, todos vía el propio sitio
`hsv.de` (bloqueado para `curl` por Akamai — se usó el método de `fetch()` desde la consola de la
página, ver `_notas-generales.md` sección 3):

**HSV Fußball AG & Co. KGaA** (perímetro correcto para el club de fútbol) — Jahresabschluss +
Lagebericht completos:
- `fussball-ag-jahresabschluss-2024-25.pdf` — confirmado en la primera página: "HSV FUSSBALL AG & CO.
  KGAA / JAHRESABSCHLUSS ZUM 30. JUNI 2025".
- `fussball-ag-jahresabschluss-2023-24.pdf`
- `fussball-ag-jahresabschluss-2022-23.pdf`
- `fussball-ag-jahresabschluss-2021-22.pdf` — 30 páginas, el más liviano de los 4 en tamaño de
  archivo pero con el mismo contenido completo (Bilanz + GuV + Anhang + Lagebericht).

**Hamburger Sport-Verein e.V.** (asociación madre, multideporte — NO usar para las finanzas del
fútbol, guardado solo como referencia/contexto):
- `ev-bilanz-2024-25.pdf` / `ev-guv-2024-25.pdf`
- `ev-bilanz-2023-24.pdf` / `ev-guv-2023-24.pdf`
- `ev-bilanz-2022-23.pdf` / `ev-guv-2022-23.pdf`
- `ev-bilanz-2021-22.pdf` / `ev-guv-2021-22.pdf`

`pdftotext` de `ev-guv-2024-25.pdf` confirma "Hamburger Sport-Verein e.V., Sitz Hamburg, Amtsgericht
Hamburg VR 380" con Umsatzerlöse de solo TEUR 12.804 — muy por debajo de lo que reporta la AG/KGaA
de fútbol, confirmando que son perímetros distintos.

## Gotcha de esta sesión: URLs de PDF encontradas por WebSearch pueden estar rotas

Las URLs originales encontradas por WebSearch (`hsv.de/fileadmin/user_upload/Bilder_HSV.de/
Unser_HSV/Verein/HSV_Fussball_AG/...`) devuelven un 200 con el shell de la SPA (Next.js) en vez del
PDF real — un "404 silencioso". La URL vigente hoy usa un CDN distinto
(`a.storyblok.com/f/291215624286909/x/<hash>/<nombre>.pdf`), encontrada navegando la página actual
`hsv.de/unser-hsv/hsv-fussball-ag-co-kgaa` y extrayendo los `href` reales de los links "Hier" con
`javascript_tool` (`document.querySelectorAll('a[href*=".pdf"]')`). El ejercicio 2020/21 del e.V.
(`hsv.de/fileadmin/user_upload/HSV_EV/Dokumente/...`) tiene el mismo problema y no se resolvió esta
sesión — pendiente.

- Último chequeo: 2026-09-17.
