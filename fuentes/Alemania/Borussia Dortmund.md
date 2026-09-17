# Borussia Dortmund

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división)
- **Entidad legal**: Borussia Dortmund GmbH & Co. KGaA — cotiza en la Bolsa de Fráncfort (Deutsche
  Börse, ISIN DE0005493092). Único club de la Bundesliga que cotiza en bolsa; por eso publica un
  Geschäftsbericht anual completo en su propia sección de relación con inversores, sin necesidad de
  pasar por Unternehmensregister.
- **Canal**: sitio propio del club, microsite anual de Geschäftsbericht (`report.bvb.de/annual-report/
  <temporada>/` en inglés, `bericht.bvb.de/geschaeftsbericht/<temporada>/` en alemán — mismo
  mecanismo, dominio distinto según el año). Ver `fuentes/Alemania/_notas-generales.md` sección 4
  para el contexto de por qué Dortmund fue el primer club investigado (caso más fácil/completo,
  usado para calibrar el formato esperado del resto de la liga).

## Qué se bajó (sesión 2026-09-16/17)

**7 ejercicios consecutivos**, `Clubes/Alemania/Borussia Dortmund/`, todos el Geschäftsbericht/annual
report COMPLETO (Shareholders + Group management report + Consolidated and separate financial
statements), con capa de texto real (sin necesidad de OCR):

- `geschaeftsbericht-2024-25.pdf` — 244 páginas, cerrado 30/6/2025.
- `geschaeftsbericht-2023-24.pdf` — 232 páginas, cerrado 30/6/2024.
- `geschaeftsbericht-2022-23.pdf` — 236 páginas, cerrado 30/6/2023.
- `geschaeftsbericht-2021-22.pdf` — cerrado 30/6/2022, vía `report.bvb.de/annual-report/2021-2022/`.
- `geschaeftsbericht-2020-21.pdf` — cerrado 30/6/2021, vía `report.bvb.de/annual-report/2020-2021/`.
- `geschaeftsbericht-2019-20.pdf` — cerrado 30/6/2020, vía `bericht.bvb.de/geschaeftsbericht/2019-2020/`
  (dominio en alemán — el mismo ejercicio en `report.bvb.de` en inglés no se comprobó, puede que
  también exista).
- `geschaeftsbericht-2018-19.pdf` — 226 páginas, cerrado 30/6/2019, vía `bericht.bvb.de/
  geschaeftsbericht/2018-2019/`.

Todos incluyen tanto la sociedad individual (Borussia Dortmund KGaA, HGB) como el grupo consolidado
(IFRS) — el sitio publica ambos juegos de cifras lado a lado en el resumen "Key figures at a glance".

## Verificación hecha en esta sesión

`pdftotext` sobre las primeras páginas de cada PDF confirma título, entidad y período — ej. 2024/25:
"KEY FIGURES AT A GLANCE / Borussia Dortmund KGaA (HGB)" y "Borussia Dortmund Group (IFRS)", con
cifras de Sales/EBITDA/EBIT/Net income de ambos perímetros. Entidad y período confirmados, no asumidos.

## Mecanismo de descarga (para repetir en sesiones futuras)

Cada temporada tiene su propia microsite: `https://report.bvb.de/annual-report/<AAAA-AAAA>/services/
downloads.html` (o `bericht.bvb.de/geschaeftsbericht/<AAAA-AAAA>/services/downloads.html` para años
donde solo existe la versión alemana). Ahí, el link "ANNUAL REPORT"/"Geschäftsbericht <año>" apunta a
un PDF completo en `.../\_assets/downloads/gesamt-bvb-gb<AA><AA>.pdf` (o variantes de nombre según el
año: `gesamt_bvb_gb1819.pdf`, `kapitel_konzernabschluss_bvb_gb1819.pdf`, etc. — el nombre exacto
cambia, hay que leerlo del HTML de la página de downloads, no adivinarlo). **`curl` normal alcanza**,
sin bloqueo WAF — a diferencia de `fcbayern.com`/`hsv.de` (ver `_notas-generales.md` sección 3).

## Pendiente para una sesión futura

Años anteriores a 2018/19: el path viejo `aktie.bvb.de/Publikationen/Geschaeftsberichte/
Geschaeftsbericht-<año>-KGaA-Konzern` (usado hasta ~2017) está deprecado, devuelve página vacía al
navegar. La Wayback Machine estuvo con "Temporarily Offline" durante toda esta sesión — no se pudo
confirmar snapshots antiguos. Retomar en el futuro: la serie completa probablemente llega hasta el
IPO (2000) o al menos a mediados de los 2000, a juzgar por el precedente de Arsenal en Companies
House (18 ejercicios, ver `fuentes/Inglaterra/Arsenal.md`).

- Último chequeo: 2026-09-17.
