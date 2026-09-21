# Arouca (FC Arouca)

- **Deporte**: Fútbol
- **Liga / competencia**: Primeira Liga (Portugal, 1ª división)
- **Entidad legal**: Futebol Clube de Arouca – Futebol, SDUQ, Lda — **la tercera de las 3 SDUQ de
  la liga** (junto a Gil Vicente y Casa Pia), constituida en abril de 2013. Tuvo una insolvencia
  declarada el 11-nov-2020 (Proceso Especial de Revitalização rechazado) — anterior a su ascenso
  actual a Primeira Liga, no afecta al club de hoy pero es contexto relevante si se busca su
  histórico societario.
- **Sin PDF descargado** (a diferencia de los otros 17 clubes de la liga).

## Intentos (sesión 2026-09-17)

1. **Sitio oficial (`fcarouca.eu`)**: rediseñado recientemente (plataforma "SCAPE", la misma que
   usan varios clubes chicos portugueses) — el menú completo no tiene ninguna sección de
   "institucional"/"transparência"/"SAD"/"relatório e contas". La página "Corporate" solo lista
   patrocinadores. Un `?s=relatorio+e+contas` en el buscador interno del sitio no devolvió
   resultados.
2. **Búsqueda externa**: encontró, indirectamente, que el sitio SÍ tuvo relatórios en algún
   momento — 4 URLs directas (`fcarouca.eu/relatorio-contas-2021-22.pdf`,
   `relatorio-contas-2022-23.pdf`, `relatorio-contas-2023-24.pdf`, `FCA-2024-25.pdf`), confirmadas
   por el CDX de Wayback Machine (`web.archive.org/cdx/search/cdx?url=fcarouca.eu*`). **Las 4 URLs
   ya NO existen en el sitio en vivo** (404/SPA catch-all tras el rediseño).
3. **Wayback Machine para las 4 URLs**: cada una tiene EXACTAMENTE UN snapshot archivado, y **los 4
   vienen truncados a exactamente 5.242.880 bytes (5 MB) con el header
   `warning: 299 wayback content truncated by "length"`** — el mismo gotcha ya documentado para
   Udinese en Italia (`fuentes/Italia/Udinese.md`), típico de capturas vía Common Crawl. Los 4
   archivos descargados fallan la validación con `pdfinfo` (`Invalid XRef entry`, `Couldn't find
   trailer dictionary`) — son PDF cortados a la mitad, no usables. Se borraron de
   `Clubes/Portugal/Arouca/` (que quedó vacía) para no dejar archivos corruptos en el proyecto.
4. **arquivo.pt (el archivo web nacional portugués)**: consultado como alternativa a Wayback vía su
   API CDX (`arquivo.pt/wayback/cdx?url=fcarouca.eu/<nombre-de-archivo>`) — **cero resultados para
   los 4 nombres de archivo exactos**, arquivo.pt nunca los capturó.

## Sugerencia concreta para la próxima sesión

Los 4 ejercicios EXISTIERON (se confirmó el nombre exacto y el tamaño real del archivo sin truncar,
vía el CDX de Wayback: 4,57 MB / 4,95 MB / 5,01 MB / 4,76 MB respectivamente), pero no hay ninguna
copia completa en ningún archivo web consultado. Opciones para retomar:
- Contactar al club directo pidiendo que resuban los 4 PDF (o pedirle a Guido que lo haga, es un
  pedido razonable de prensa/hincha).
- Revisar si otro archivo web (archive.today, Common Crawl directo vía su índice CDX propio en
  `index.commoncrawl.org`) tiene una copia sin el límite de 5 MB de Wayback.
- Reintentar el sitio en vivo periódicamente por si el rediseño de SCAPE eventualmente vuelve a
  publicar la sección de transparencia (pasó con 4 de 5 dead-ends de Brasil en la sesión
  2026-09-16, ver `club-sourcing/SKILL.md` sección 3).

## Dudas / pendientes

Agregar a `dudas-por-club.md`: preguntarle directo al club por los 4 PDF (2021/22-2024/25), ya
confirmados como existentes mediante Wayback pero irrecuperables en esta sesión.

- Último chequeo: 2026-09-17.
