# Pro League (Bélgica) — PRO LEAGUE, BCE 0508.600.494 (`be-proleague`)

**Ángulos**: regulador/país: agotado (CBSO del Banco Nacional de Bélgica, API pública) · sitio oficial: sin informe anual con cuentas en
proleague.be (solo notas de prensa sobre las cuentas de los clubes) · barrido: 1 (Sonnet, sesión Finanzas 4) — 2026-10-19

- Hay dos entidades "PRO LEAGUE", mismo domicilio (Culliganlaan 3b/2, Diegem): la **naamloze vennootschap 0508.600.494** (esquema completo,
  fundada en 2012; es la operativa y comercial) y la **VZW 0417.473.251** (la asociación de 1977, esquema abreviado). Se bajó la primera.
- Canal: CBSO, gratis y sin login. Listado: `https://consult.cbso.nbb.be/api/rs-consult/published-deposits?page=0&size=100&enterpriseNumber=<BCE>&sort=periodEndDate,desc`.
  PDF: `curl -H "User-Agent: Mozilla/5.0" -o <destino>.pdf https://consult.cbso.nbb.be/api/external/broker/public/deposits/pdf/<id>`.
  La 0508.600.494 tiene 13 depósitos (2013-2025); los ids de los últimos: 2025 `00e6a9f3-f1fa-11f0-8055-5704b19958b7`, 2024
  `d8b8ccf3-d3f6-11ef-8e00-453f4ccba0c6`, 2023 `21693a0f-b6c9-11ee-a14a-874b1da2d58b`, 2022 `69a59f9c-97da-11ed-a838-2b121f61084e`. La 0417.473.251:
  19 depósitos (2007-2025), último 30-06-2025 `b55116bf-f1ff-11f0-8055-d31184e54537`.
- Bajado: ejercicio 2024-25 (cierre 30-06-2025, 44 páginas, digital) → `Ligas/Bélgica/Pro League/pro-league-cuentas-2024-25.pdf`, con su `.md`
  (pdftotext). El depósito es el formulario XBRL de la jaarrekening: **no trae el informe del comisario**. Los depósitos de 2022 a 2024
  tampoco (el texto "getrouw beeld" que aparece es una nota de los administradores, no una opinión).
- Comisario: KPMG Bedrijfsrevisoren BV (B00001), mandato 2022-10-20 a 2025-12-17 (línea 121 del `.md`). Sin su informe no hay opinión que citar: la
  línea de auditoría queda `falta_transcripcion`: no se publica en `_ligas.js` (la tarjeta "Las cuentas de la liga" mostraba el código crudo y decía que
  no trae informe de un auditor; ya no se publica, como con los clubes) y figura como pendiente en `node tools/auditoria.mjs --pendientes`. Candidato a
  mail a la Pro League (sin armar).
- Último chequeo: 2026-10-19.
