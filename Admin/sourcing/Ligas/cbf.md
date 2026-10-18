# CBF — Confederação Brasileira de Futebol (`br-serieA`, `br-serieB`, `br-serieC`, `br-serieD`)

**Ángulos**: sitio oficial: parcial — los links están, el PDF no se pudo bajar (ver abajo) · Wayback CDX: agotado (la página
`balanco-anual-cbf` capturada hasta 2024-05, enlaza hasta 2022; los PDF de 2023 en adelante no están archivados) · barrido: 3 (Exa) — 2026-10-18

- Canal: `https://portaldegovernanca.cbf.com.br/balanco-anual-cbf` ("Demonstrações Financeiras — Veja o balanço auditado"), con un PDF
  por año en el CDN `conteudo.cbf.com.br`. El portal devuelve un bloqueo FortiGuard ("URL is banned") a Firecrawl, también con proxy
  stealth, y el CDN no responde a `curl`, a Firecrawl ni al navegador de la sesión (timeout). La lista de links salió de la copia que Exa
  tiene en caché (`api.exa.ai/contents`, `extras.links`):
  - 2025: `https://conteudo.cbf.com.br/cdn/202604/20260428124727_29.pdf` (aprobado en asamblea el 27-04-2026; prensa: déficit de
    R$ 182,5 millones)
  - 2024: `https://conteudo.cbf.com.br/cdn/202505/20250502112151_20.pdf`
  - 2023: `https://conteudo.cbf.com.br/cdn/202504/20250430161249_470.pdf`
  - 2021: `https://conteudo.cbf.com.br/cdn/202205/20220513152832_817.pdf`; 2020: `.../202104/20210427170241_717.pdf`;
    2019: `.../202004/20200430123925_68.pdf`; 2013-2018: `.../201904/…` (seis PDF)
- Paso siguiente: que Guido abra el link de 2025 en su navegador y lo guarde en `Ligas/Brasil/CBF/cbf-demonstracoes-financeiras-2025.pdf`.
  Si tampoco abre desde su red, el CDN filtra por IP (probable bloqueo fuera de Brasil) y queda un mail a la CBF.
- Además, `cbf.com.br/a-cbf/sobre-a-cbf/balancos` lista un "Balanço da Confederação Brasileira de Futebol" de hace más de 7 años y los
  de las federaciones estaduales (la Paulista entre ellas, útil para `br-paulista*`).
