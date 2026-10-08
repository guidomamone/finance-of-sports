# Salernitana

**Ángulos**: sitio oficial: agotado (menú completo + Firecrawl map de 3.143 URLs; la sección `societa/bilancio-e-relazioni` hoy da 404, vive solo en Wayback) · Wayback CDX: agotado (11 capturas de la página, 2023-06 a 2024-12) · búsqueda web (Exa): confirmó la página y la prensa de los bilanci · regulador/país: no aplica (Registro Imprese pago) — 2026-10-07

- **Deporte**: Fútbol
- **Liga / competencia**: Serie B 2025/26 (Italia); ex Serie A 2021/22-2023/24
- **Entidad legal**: U.S. Salernitana 1919 S.r.l. (socio único Danilo Iervolino en 2022/23; IFRS, auditado)
- **Estado**: 2 ejercicios descargados (30 de junio de 2022 y 2023)

## Sourcing Italia (2026-10-07), ex Serie A

La página oficial `https://salernitana.it/societa/bilancio-e-relazioni/` (hoy 404, el club la sacó del sitio; Wayback la tiene desde 2023-06-20) listaba los PDF en el CDN `salernitana.b-cdn.net`, que SIGUE sirviendo los archivos en vivo con `curl`:

- Bilancio al 30/06/2022 (IFRS): `https://salernitana.b-cdn.net/wp-content/uploads/2023/06/U.S.-Salernitana-1919-Bilancio-30-giugno-2022.pdf` — 65 págs, **ESCANEADO sin capa de texto** (necesita OCR/Mistral). Archivo: `Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.pdf`.
- Revisione 2022: `.../2023/06/Societa-di-Revisione-Relazione-Bilancio-IFRS-30.06.2022.pdf` (4 págs, texto) y Collegio Sindacale 2022: `.../2023/06/Relazione-Collegio-Sindacale-al-Bilancio-30.06.2022.pdf` (8 págs, escaneo).
- Relazione finanziaria al 30/06/2023 (versión "def", enero 2024): `.../2024/01/Bilancio-30-06-23-def.pdf` — 66 págs, CON capa de texto. Archivo: `Salernitana-bilancio-30-giugno-2023-def.pdf`. La versión de diciembre 2023 (`.../2023/12/Bilancio-desercizio-al-30-giugno-2023.pdf`, 9,7 MB, escaneo del mismo documento) se descartó por redundante. Revisione 2023 (`.../2023/12/Relazione-della-Societa-di-Revisione-Bilancio-30.06.2023.pdf`, texto) y Collegio Sindacale 2023 (`.../2023/12/Relazione-del-Collegio-Sindacale-Bilancio-30.06.2023.pdf`, escaneo).
- Carátula validada: la revisione 2022 nombra a U.S. Salernitana 1919 S.r.l.; el 2023 es "Relazione finanziaria al 30 giugno 2023". Prensa de control (Calcio e Finanza, 2023-12-20): pérdida 2022/23 29,6 M€, 2021/22 16,8 M€ (ojo al cargar: el 2023 puede reexpresar 2022).
- No hay 2021 ni 2024 (junio 2024): la página nunca los listó (últimas capturas 2024-12-26 muestran solo 2022 y 2023). 2024 pendiente: ejercicio de la categoría B con nuevo dueño, candidato a mail.

- Último chequeo: 2026-10-07.

- Cargado en el sitio por tools/cargar.mjs (2026-10-08): ejercicio 2022 desde `Clubes/Italia/Salernitana/Salernitana-bilancio-30-giugno-2022.pdf` (sourceId `salernitana-it-bilancio-30-giugno-2022`).
