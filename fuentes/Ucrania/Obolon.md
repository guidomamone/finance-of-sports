# Obolon (Kyiv)

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: no confirmada con EDRPOU exacto en esta sesión — el club comparte
  nombre y patrocinio con la cervecera ПрАТ "ОБОЛОНЬ" (EDRPOU 05391057, que sí es una emisora
  regular con estados financieros propios en `obolon.ua`), pero el club de fútbol tiene su propio
  sitio (`fc.obolon.ua`) y su propio documento de estados financieros — **no dar por sentado que
  son la misma entidad legal** al cargar datos, confirmar antes de mapear (ver duda abajo).
- **Canal**: sitio oficial del club, `fc.obolon.ua` — un solo PDF combinado ("ФІНАНСОВА ЗВІТНІСТЬ
  2025") en la portada, sin sección de años anteriores identificada.

## Qué se bajó (sesión 2026-09-18)

**1 ejercicio (2025), documento combinado.** `Clubes/Ucrania/Obolon/`:

- `obolon-financiero-2025.pdf` — 13 páginas, confirmado con `pdfinfo`, probablemente balance +
  resultados + flujo + dictamen de auditor todo junto (no se abrió página por página para
  confirmar el desglose exacto, eso es tarea de `club-data-mapping`).

## Verificación hecha en esta sesión

Descarga HTTP 200, 8,4 MB, 13 páginas confirmadas con `pdfinfo`.

## Dudas / pendientes

- **Confirmar si la entidad legal del PDF descargado es el club de fútbol o la cervecera** (ver
  arriba) — candidata a `dudas-por-club.md` si no se puede inferir del propio documento al abrirlo.
- No se encontraron años anteriores a 2025 en el sitio del club — no confirmado si es porque el
  club no publicaba antes (posible, si recién alcanzó el umbral de empresa "mediana"/"grande" que
  activa la obligación del art. 14) o si están en otra sección del sitio no revisada.

- Último chequeo: 2026-09-18.
