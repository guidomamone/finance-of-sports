# Operário Ferroviário (Operário Ferroviário Esporte Clube, Ponta Grossa-PR — associação, no SAF)

- Club nuevo esta sesión (Série B 2025). Sigue siendo **associação** (no se convirtió a SAF), y
  publica igual: la Lei Pelé + el licenciamento de la Federação Paranaense lo obligan.
- **2 PDFs descargados a `Clubes/Brasil/Operario Ferroviario/`, de dos canales oficiales
  distintos:**
  - `demonstracoes-financeiras-2025.pdf` (19 págs.) — del **sitio propio**: menú `TRANSPARÊNCIA`
    → sub-sección `DFS` → botón "Download". El archivo real vive en un CDN aparte:
    `https://cdn.fanbase.com.br/fanhub/operario/docs/transparencia/dfs-operario-assinado.pdf`.
    Verificado dentro: "OPERÁRIO FERROVIÁRIO ESPORTE CLUBE — Demonstrações financeiras em 31 de
    dezembro de 2025", firmado digitalmente el 24/04/2026 por el presidente Juarez Costa Pinto y el
    contador Marcos Antonio Martins (CRC PR 056385/O-5). Trae relatório dos auditores + balanços +
    DRE + resultado abrangente + mutações do patrimônio + fluxo de caixa + notas.
  - `demonstracoes-financeiras-2024.pdf` (20 págs.) — del **repositorio de la Federação Paranaense**:
    `https://federacaopr.sfo3.digitaloceanspaces.com/wp-content/uploads/2025/04/30175550/Operario-2024.pdf`.
    Verificado dentro: "OPERÁRIO FERROVIÁRIO ESPORTE CLUBE — Demonstrações financeiras em 31 de
    dezembro de 2024".
- **Gotcha grande del sitio propio, ya destrabado**: el sitio se rehízo con el CMS "Fanbase"
  (`fanhub`) y **la URL vieja que aparece en todos los resultados de búsqueda,
  `operarioferroviario.com.br/gestao-tecnica-e-financeira/`, ahora es un 404** ("Ops! Parece que
  você se perdeu"). Peor: como es una SPA de Vite, el servidor devuelve **HTTP 200 con el
  index.html de 650 bytes para CUALQUIER ruta**, incluidas las de `wp-content/` del sitio viejo —
  así que un `curl` a una URL inexistente parece exitoso y no hay ningún link en el HTML. La ruta
  viva es `/transparencia`, pero tampoco sirve de nada pedirla con `curl`. Lo que funcionó:
  cargarla en el Browser pane, clickear el ítem de lista "DFS" (no es un `<a>`, es un `<li>` con
  handler de click; se resolvió con un `document.querySelectorAll('*')` filtrando por
  `textContent === 'DFS'` y llamando `.click()`), y recién ahí leer el `href` del botón "Download",
  que apunta al CDN externo. **El bundle JS tampoco ayuda**: solo expone endpoints de `fanbase.com.br`
  de membresía/SSO, ninguna API de documentos.
- Prensa (aRede, Ponta Grossa) confirma las cifras de 2025 como control: receita total de R$ 30,3
  millones en 2024 a R$ 39,5 millones en 2025, y superávit de R$ 52 mil en 2025 revirtiendo el
  déficit de 2024.
- Pendiente: ejercicios 2023 y anteriores. La página `federacaopr.com.br/documentos/` solo muestra
  los balances del año corriente (2025: 11 clubes, y Operário NO está entre ellos porque lo publicó
  en su propio sitio), así que la ruta de 2024 (`/wp-content/uploads/2025/04/30175550/`) se consiguió
  por `WebSearch`, no listando nada. El segmento numérico del medio de esas URLs es un timestamp de
  subida, imposible de adivinar: para años viejos hay que buscarlos con
  `WebSearch "federacaopr.sfo3.digitaloceanspaces.com" Operario <año>` o pedirlos al club.
- Contacto: https://operarioferroviario.com.br/transparencia (sección "DFS");
  https://cdn.fanbase.com.br/fanhub/operario/docs/transparencia/;
  https://federacaopr.com.br/documentos/;
  https://federacaopr.sfo3.digitaloceanspaces.com/wp-content/uploads/<año>/<mes>/<id>/Operario-<año>.pdf.
- Último chequeo: 2026-09-22.
