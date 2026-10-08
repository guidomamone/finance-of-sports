# Gaziantep FK

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: club-asociación (dernek), no cotiza en bolsa.
- **Canal**: sitio propio, `gaziantepfk.org/kulubumuz/mali-tablolar` → PDFs en
  `gaziantepfk.org/pdf/<nombre-tabla>.pdf` (URLs sin año ni hash, genéricas — el sitio parece servir
  solo el ÚLTIMO ejercicio publicado en esas rutas fijas, sobrescribiéndolas cada vez).

## Qué se bajó (sesión 2026-09-18, arranque limpio — no había nada previo de este club)

**4 documentos**, en `Clubes/Turquía/Gaziantep FK/`: Gelir Tablosu (`gaziantepfk-gelir-tablosu.pdf`),
Finansal Durum Tablosu (`gaziantepfk-finansal-durum-tablosu.pdf`), Özsermaye Değişim Tablosu
(`gaziantepfk-ozsermaye-degisim-tablosu.pdf`), Nakit Akış Tablosu (`gaziantepfk-nakit-akis-
tablosu.pdf`). Ninguno tiene capa de texto extraíble con `pdftotext` (probablemente escaneados o
tablas como imagen) — no se pudo confirmar el ejercicio/año exacto que cubren en esta sesión de
sourcing.

## Dudas / pendientes

- **Determinar qué ejercicio cubren estos 4 PDFs** (OCR o inspección visual, tarea de mapeo, no de
  sourcing) antes de cargarlos.
- **Las URLs no tienen año**: si se vuelve a este club en el futuro, las mismas 4 rutas pueden ya
  estar sirviendo un ejercicio más nuevo — re-descargar y comparar hash/contenido antes de asumir
  que es el mismo documento.
- No se encontró ningún archivo histórico (años anteriores) en este canal — sin explorar a fondo
  si existe una sección de archivo separada.
- Último chequeo: 2026-09-18.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: sitio oficial: agotado (las rutas fijas `/pdf/*.pdf` siguen sirviendo el mismo archivo: el hash del Gelir Tablosu y del Finansal Durum coincide con el que ya teníamos) · Wayback CDX de dominio: agotado (solo 4 tablas, capturas de julio 2024, y logos) · barrido: 2 (Sonnet) — 2026-10-08

- No hay un ejercicio adicional: el sitio sobrescribe la misma ruta cada año y Wayback solo tiene la captura de julio 2024. Sigue sin saberse qué ejercicio cubren los 4 PDFs (pendiente de identificar a ojo).
