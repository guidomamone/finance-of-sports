# Gil Vicente (Gil Vicente FC)

- **Deporte**: Fútbol
- **Liga / competencia**: Primeira Liga (Portugal, 1ª división)
- **Entidad legal**: Gil Vicente Futebol Clube – Futebol, SDUQ, Lda (Sociedade Desportiva
  Unipessoal por Quotas) — **una de solo 3 clubes de la Primeira Liga 2025/26 que NO es SAD**
  (los otros dos: Arouca y Casa Pia). Una SDUQ tiene una única cuota, 100% del club fundador, sin
  accionistas externos — a diferencia de la SAD no reparte capital en acciones vendibles.
- **Canal**: sitio propio (`gilvicentefc.pt`), sección "SDUQ" y páginas
  `gilvicentefc.pt/relatorio-de-contas/<temporada>/...pdf`.

## Qué se bajó (sesión 2026-09-17)

**4 ejercicios: 2020/21, 2022/23, 2023/24 (consolidadas), 2024/25**, en
`Clubes/Portugal/Gil Vicente/`.

**Hueco: 2021/22 no se encontró** ni en el sitio propio ni en la búsqueda externa — no hay
evidencia de que se haya publicado.

## Gotcha de tooling (sesión 2026-09-17)

**Mismo problema que SC Braga (Portugal) y varios clubes italianos: `gilvicentefc.pt` migró de
estructura de sitio y varias URLs de PDF antiguas (incluida la página índice
`/clube/prestacao-de-contas/contas-anuais/`) devuelven ahora un 404 real del sitio nuevo, aunque el
archivo original seguía existiendo.** Se rescataron 3 de los 4 PDF vía Wayback Machine
(`web.archive.org/web/2026id_/<url>` con `curl --compressed`); el cuarto (2020/21) no estaba en el
snapshot más reciente pero SÍ en uno de 2025-03-26 (hay que probar varios timestamps del CDX de
Wayback, no asumir que el snapshot más nuevo tiene todo lo que tenía uno viejo — un sitio puede
"perder" un archivo de su propio servidor entre dos crawls).

## Dudas / pendientes

Buscar 2021/22 en Wayback (no se intentó a fondo, se agotó el tiempo de la sesión en confirmar los
otros 4). Confirmar si "Relatório e Contas Consolidadas" de 2023/24 desglosa el perímetro exacto
(SDUQ sola o consolidado con alguna otra entidad).

- Último chequeo: 2026-09-17.
