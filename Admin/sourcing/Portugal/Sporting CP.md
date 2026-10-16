# Sporting CP (Sporting Clube de Portugal)

- **Deporte**: Fútbol
- **Liga / competencia**: Primeira Liga (Portugal, 1ª división)
- **Entidad legal**: Sporting Clube de Portugal – Futebol, SAD, "sociedade aberta" que **cotiza**
  en Euronext Lisbon.
- **Canal**: sección de Investor Relations propia (`sporting.pt`, hoy la URL estable es
  `sporting.pt/pt/node/31266` — "Prestação de Contas Anuais"), gratis, sin login, sin captcha.
  Mezcla dos generaciones de sitio: los PDF viejos siguen en `sporting.pt/incscp/pdf/investor_relations/`
  (dominio histórico "incscp"), los nuevos en `scpconteudos.pt/sites/default/files/`.

## Qué se bajó (sesión 2026-09-17)

**26 ejercicios, serie COMPLETA e ININTERRUMPIDA 1999 a 2024/25**, en `Clubes/Portugal/Sporting CP/`:

`relatorio-contas-1999.pdf`, `relatorio-contas-2000.pdf`, `relatorio-contas-2001.pdf`, y desde ahí
uno por ejercicio (`relatorio-contas-2002-03.pdf` ... `relatorio-contas-2024-25.pdf`) hasta el más
reciente.

Es, hasta ahora, **la serie histórica más profunda de cualquier club de fútbol de todo el proyecto**
— más larga que Juventus (23 ejercicios, Italia) y que Club Brugge/Standard Liège (Bélgica). Los
primeros ejercicios (1999-2003) son reportes cortos (5-8 páginas) pero con balance y cuenta de
resultados reales, verificado con `pdftotext` en el de 2002/03 (31-jul-2003, balance + demonstração
dos resultados completos).

Cuando el sitio tenía dos versiones del mismo ejercicio (la comunicada y la "aprovada em Assembleia
Geral"), se priorizó la versión final/aprobada.

## Verificación hecha en esta sesión

Los 26 PDF confirmados reales con `file` (todos "PDF document", de 121 KB el más chico —2004/05—
a 14,9 MB el más grande —2024/25—, ninguno truncado ni HTML de error). Descarga directa con `curl -L`
sin necesitar Referer ni User-Agent especial (ambos dominios, `sporting.pt` e `scpconteudos.pt`,
sirven sin fricción).

## Dudas / pendientes

Ninguna sobre el canal. Queda pendiente, si se retoma, extraer los informes de auditoría del ROC por
separado (algunos ejercicios recientes los exponen sueltos) y las versiones ESEF/XHTML de los
ejercicios más nuevos (no bajadas, se priorizó el PDF legible).

- Último chequeo: 2026-09-17.

- Cargado en el sitio por tools/cargar.mjs (2026-10-15): ejercicio 2025 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.pdf` (sourceId `sportingcp-pt-relatorio-contas-2024-25`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2012 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2011-12.pdf` (sourceId `sportingcp-pt-relatorio-contas-2011-12`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2013 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2012-13.pdf` (sourceId `sportingcp-pt-relatorio-contas-2012-13`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2014 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2013-14.pdf` (sourceId `sportingcp-pt-relatorio-contas-2013-14`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2015 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2014-15.pdf` (sourceId `sportingcp-pt-relatorio-contas-2014-15`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2016 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2015-16.pdf` (sourceId `sportingcp-pt-relatorio-contas-2015-16`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2019 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2018-19.pdf` (sourceId `sportingcp-pt-relatorio-contas-2018-19`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2022 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2021-22.pdf` (sourceId `sportingcp-pt-relatorio-contas-2021-22`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2023 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2022-23.pdf` (sourceId `sportingcp-pt-relatorio-contas-2022-23`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2024 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2023-24.pdf` (sourceId `sportingcp-pt-relatorio-contas-2023-24`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2011 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2010-11.pdf` (sourceId `sportingcp-pt-relatorio-contas-2010-11`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2017 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2016-17.pdf` (sourceId `sportingcp-pt-relatorio-contas-2016-17`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2020 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2019-20.pdf` (sourceId `sportingcp-pt-relatorio-contas-2019-20`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-16): ejercicio 2002 desde `Clubes/Portugal/Sporting CP/relatorio-contas-2001.pdf` (sourceId `sportingcp-pt-relatorio-contas-2001`).
