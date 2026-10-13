# América Mineiro (América Futebol Clube, Belo Horizonte-MG — asociación civil, con SAF en formación)

**Ángulos**: sitio oficial: HIT (2023-2025) · federación/regulador: FMF no publica · Wayback CDX: HIT (2020 y 2021 en el dominio viejo americamineiro.com.br y en irp.cdn-website.com) · búsqueda web: sin 2022 · barrido: 1 (Sonnet) — 2026-10-03

- **Dead-end viejo destrabado.** La nota anterior (barrido 2026-09) decía que `americafc.com.br/transparencia`
  mencionaba "Demonstrações Financeiras 2024" pero no se encontraba la URL directa del PDF. El problema no era
  el club: era el ángulo. La página **sí** trae los links planos en el HTML servido, pero apuntan a un CDN de
  terceros (`irp.cdn-website.com`, el CDN de Duda/Sitebuilder), no a `americafc.com.br/...`, así que una
  búsqueda `site:americafc.com.br ... .pdf` nunca los iba a encontrar. Lo que funcionó: `curl` a la página de
  transparencia y `grep` de todo lo que termine en `.pdf` en el HTML crudo — aparecen ~50 PDFs (certidões,
  estatuto, actas electorales) y entre ellos los 3 relatórios anuales.
- **3 ejercicios descargados en `Clubes/Brasil/America Mineiro/`** (todos `curl` directo, sin Cloudflare):
  - `demonstracoes-financeiras-2023.pdf` (27 pág.) ← `irp.cdn-website.com/05448cb5/files/uploaded/relatorio_demonstrações_2023_afc.pdf`
  - `demonstracoes-financeiras-2024.pdf` (32 pág.) ← `.../relatorio_demonstraçoes_financeiras_2024.pdf`
  - `demonstracoes-financeiras-2025.pdf` (33 pág.) ← `.../Relatorio_Anual_de_Demonstracoes_2025_assinado.pdf`
  - Los 3 son el paquete completo: "Relatório dos Auditores Independentes sobre as Demonstrações Contábeis",
    balanço patrimonial, DRE, DRA, mutações do patrimônio líquido, fluxo de caixa, notas explicativas y
    contexto operacional. Tienen capa de texto real (`pdftotext` funciona), no son escaneos.
  - **Ojo con la portada del PDF de 2025**: la primera página dice "RELATÓRIO ANUAL DE DEMONSTRAÇÕES | 2025"
    pero el encabezado del sumario, dos líneas más abajo, quedó con "| 2024" (copy-paste del año anterior en
    la maqueta). El ejercicio real ES 2025 — verificado con las fechas del cuerpo: "31 de dezembro de 2025"
    aparece 6 veces, con 2024/2023/2022 solo como comparativos.
  - Ojo con los nombres de archivo del CDN: dos de los tres llevan cedilla/tilde sin encodear (`demonstraçoes`,
    `demonstrações`), hay que pasarlos percent-encoded a `curl`.
- **El PDF de "Minas Arena — Gestão de Instalações Esportivas S.A." NO es de este club** (es la concesionaria
  del Mineirão). La nota vieja ya advertía esto y sigue valiendo: no se cargó ni se descargó.
- Pendiente: ejercicios anteriores a 2023 (la página de transparencia no los lista; puede que estén en
  snapshots viejos de Wayback de esa misma página, no se probó).
- Contacto: americafc.com.br/transparencia (links reales bajo `irp.cdn-website.com/05448cb5/files/uploaded/`).
- Último chequeo: 2026-09-22.
- **Cargado (sesión 2026-09-24)**: los 3 ejercicios (2023, 2024, 2025) en `data/americamineiro-data.js`,
  columna Consolidado (AFC + SAF). Ver comentario de cabecera de ese archivo para el detalle completo
  de categorización, tipo de cambio y verificación de tie-out, y `Admin/dudas-por-club.md` (sección
  América Mineiro) para las dudas genuinas que quedaron abiertas (la línea grande "Outras receitas
  operacionais" de 2024/2025, entre otras).
- **Color de marca: #007242 — declarado en el CSS del sitio oficial (americafc.com.br, `theme`
  aparece 2 veces en el HTML servido), verificado 2026-09-24.** Identidad confirmada primero en
  pt.wikipedia.org/wiki/América_Futebol_Clube_(Belo_Horizonte): verde y blanco desde la fundación
  (1912), negro incorporado en 1913 — un paréntesis de una década (1933-1942) con uniforme rojo de
  protesta, sin vigencia hoy. footylogos.com declara un verde algo distinto (#016738) para el mismo
  club, misma familia de color (verde oscuro) — se prefirió el hex propio del sitio oficial del club
  por ser más preciso para SU identidad puntual, no un agregador genérico.

## Barrido 2026-10-03 (grupo C Brasil): de 3 a 5 ejercicios en disco (2020, 2021, 2023, 2024, 2025)

- `demonstracoes-financeiras-2021.pdf` (34 pp, "Em 31 de dezembro de 2021") ← Wayback id_ de `irp.cdn-website.com/05448cb5/files/uploaded/Relatorio_Anual_Demonstracoes_2021_Site.pdf`.
- `demonstracoes-financeiras-2020.pdf` (34 pp, "Em 31 de dezembro de 2020") ← Wayback id_ de `americamineiro.com.br/wp-content/uploads/2021/04/Relatorio_Anual_Demonstracoes_2020_-_America_Futebol_Clube_-_Versao_Final_Site.pdf` (el club usaba otro dominio hasta ~2022).
- **Hueco: 2022.** La prensa del club ("Pelo segundo ano seguido América apresenta superávit", receita recorde R$ 121,47 M) confirma que se publicó, pero el PDF no está en la página de transparencia live, ni en los listados Wayback de `americafc.com.br`, `americamineiro.com.br` ni del CDN (`Relatorio_Anual_Demonstracoes_2022*` da 403 por S3-style). Cubierto como comparativo dentro del PDF de 2023. Ángulo pendiente: capturas Wayback de `americafc.com.br/transparencia` de 2023 (la de 20230912 devolvió 403).

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 3 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas 2022-2023, 2024-2025; `wf-src-*`: 1 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
