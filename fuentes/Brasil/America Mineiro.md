# América Mineiro (América Futebol Clube, Belo Horizonte-MG — asociación civil, con SAF en formación)

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
