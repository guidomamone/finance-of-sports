# Volta Redonda (Volta Redonda Futebol Clube, RJ — associação, no SAF)

- Club nuevo esta sesión (Série B 2025). Sigue siendo **associação** (CNPJ 29.444.957/0001-09,
  confirmado en la DRE), no se convirtió a SAF, y publica igual en su propio portal de
  transparencia.
- **4 PDFs descargados a `Clubes/Brasil/Volta Redonda/`, cubriendo 2 ejercicios (2024 y 2025):**
  - `demonstracoes-financeiras-2025.pdf` (23 págs.) — "Demonstrações Financeiras — VOLTA REDONDA
    FUTEBOL CLUBE — 31 de dezembro de 2025 e 2024", paquete completo (balanço patrimonial,
    demonstração do resultado, resultado abrangente, mutações do patrimônio líquido, fluxos de
    caixa, notas explicativas). Tiene capa de texto, no hace falta OCR.
  - `dre-2025.pdf` (1 pág.) — salida del sistema contable con la DRE 2025 abierta línea por línea
    (receita operacional bruta R$ 26.396.926,24, desglosada en receitas sociais, loteria, cota de
    TV, receitas com atletas, transmissão, direitos comerciais; despesas operacionais
    R$ 26.359.684,82). **Útil para el mapeo: es más granular que la DRE del paquete auditado.**
  - `parecer-auditoria-externa-2025.pdf` (3 págs.) — dictamen del auditor externo, escaneado.
  - `balanco-2024.pdf` (27 págs.) — del repositorio de la **FERJ** (Federação de Futebol do Estado
    do Rio de Janeiro), NO del portal del club. Es escaneo sin capa de texto; verificado por OCR:
    "A Administração do VOLTA REDONDA FUTEBOL CLUBE é responsável pela elaboração..." y
    "31 de dezembro de 2024 e 2023".
- **Cómo se llegó al portal propio (hay dos gotchas encadenados)**: la ruta en portugués
  `voltaco.com.br/transparencia/` da **404**; la viva es `/transparency` (el sitio es Next.js con
  rutas en inglés). Y esa página NO trae links: renderiza "Carregando documentos..." y busca todo
  por JS. Leyendo el chunk `/_next/static/chunks/app/transparency/page-*.js` aparecen dos endpoints
  abiertos, sin login: **`voltaco.com.br/api/documents`** y `/api/categories/active`. El primero
  devuelve un JSON con `title`, `type` (`financeiro` / `geral`), `fileName` y un `fileUrl` **ya
  pre-firmado (MinIO/S3, `X-Amz-Signature`, `X-Amz-Expires=86400`)** que `curl` baja directo con
  200. Ojo: **esas URLs firmadas caducan a las 24 h**, hay que volver a pedir el JSON cada vez, no
  guardarlas.
- **Cómo se llegó a la FERJ**: `www.fferj.com.br/ClubesLigas/ViewTeam?alias=134` devuelve una
  página vacía de 5 KB; el host bueno es **`servicos.fferj.com.br`** con la misma ruta (23 KB, ahí
  sí aparece el link "Balanço 2024 - Volta Redonda FC"). El `href` es un visor
  (`/Documentos/RenderDoc?caminho=<url encodeada>`): hay que extraer el parámetro `caminho` y
  pegarle directo a `http://fferj.azurewebsites.net/admin/AzureStorage/GetDocument?path=...pdf`,
  que baja el PDF sin más.
- Pendiente: ejercicios 2023 y anteriores. El portal propio hoy tiene SOLO 5 documentos (3
  financieros de 2025, 2 generales) — no hay archivo histórico; la ficha de la FERJ tiene un solo
  balance (2024). El ángulo que queda es pedirle la serie al club (sede administrativa, Rua Ronald
  Jarbas 200, lunes a viernes 9-16 h) o revisar la Central de Documentos de la FERJ año por año.
- Contacto: https://voltaco.com.br/transparency (y su API `https://voltaco.com.br/api/documents`);
  https://servicos.fferj.com.br/ClubesLigas/ViewTeam?alias=134;
  https://www.fferj.com.br/CentralDocumentos.
- **Cargado (2026-09-24): 2 ejercicios (2024 y 2025) en `data/voltaredonda-data.js`.** 2024 sale de
  `balanco-2024.md` (OCR, con un dígito mal leído en la Nota 13.1(iii) corregido cruzando contra la
  columna comparativa 2024 de `demonstracoes-financeiras-2025.md`, ver comentario de cabecera del
  archivo de datos). 2025 sale de `demonstracoes-financeiras-2025.md` (primaria), con
  `dre-2025.md`/`parecer-auditoria-externa-2025.md` como complementarios (mismo dato más granular /
  dictamen de auditoría sin salvedades sobre revenue-expense). Tie-out de los 2 años cierra exacto
  (revenue, expenses, netInterest, PAT) contra los totales impresos.
- **Color de marca: NO se cargó (`brandColor: null`).** Wikipedia (pt) y prensa deportiva confirman
  tricolor preto/amarelo/branco ("las mismas cores da cidade"), camisa titular a rayas
  predominantemente preto e amarelo — sin fuente que declare cuál de los 2 colores de la franja
  predomina (blanco es claramente terciario). Verificado 2026-09-24.
- Pendiente: ejercicios 2023 y anteriores (ver arriba, portal propio sin histórico y FERJ con un
  solo balance).
- Último chequeo: 2026-09-24.
