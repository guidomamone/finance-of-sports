# Notas generales — Suecia

**País nuevo del sourcing del 2026-10-08 (año 2023).** Sin skill ni archivo de país en `club-sourcing`: esto es lo que se aprendió.

## Canal: sitio oficial del club + Wayback (NO hay registro abierto)

- Los clubes de la Allsvenskan/Superettan son *aktiebolag* (AB) o asociaciones; el registro mercantil (Bolagsverket) es de pago y no se usó. **Casi todos los clubes publican su «Årsredovisning» (informe anual con resultaträkning, balansräkning y notas) en su propio sitio**, con series de 5-15 años.
- Método que funcionó: CDX de Wayback sobre el dominio completo (`matchType=domain`, `filter=mimetype:application/pdf`) y filtrar por `rsredovisning|arsredovisning|bokslut`; después bajar con `web.archive.org/web/<ts>id_/<url>`. **Ojo: el CDX devuelve URLs con espacios literales**: separar con `rsplit(" ", 2)`. En Wayback, las URLs con `%20` a veces solo responden con `%2520` (doble codificado).
- Descubrimiento de clubes sin dominio conocido: búsqueda semántica Exa (`tools/exa-search.mjs`) con «<club> årsredovisning pdf».
- **Distinguir entidades**: Malmö FF, Djurgården, AIK y otros tienen una asociación (*förening*) y una AB; el koncern puede ser de cualquiera. Hammarby: la AB (556617-0337) y la IF son entidades distintas.
- **Clubes con documentos**: AIK (2009-2025), Malmö FF (2004-2025), Djurgården (2001-2013+), IFK Göteborg (verksamhetsberättelse 2005-2019), IFK Norrköping, Kalmar FF (2017-2025), IK Sirius (2018-2024), IF Elfsborg, Helsingborg, Brommapojkarna, GAIS, Hammarby (2022), Halmstad, Varberg, Örebro, Västerås, Landskrona, Sundsvall.
- Sin documentos hallados: Mjällby, BK Häcken (8 PDF sin cuentas), Degerfors, Östers, Trelleborg, Värnamo, Utsikten.

## Documentos de liga (Svensk Elitfotboll vía WorldFootball)

En `Clubes/Suecia/_WorldFootball-documentos-de-liga/`: 11 PDF: análisis de la economía de la Allsvenskan 2022 y 2025, de la Superettan 2022-2025 y de los clubes de Ettan 2022-2024 (Svensk Elitfotboll / Fotbollförbundet), más dos espejos de WorldFootball (2022/23 y 2023/24). Son agregados de liga, no cuentas por club.
