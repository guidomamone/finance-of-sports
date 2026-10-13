# Volta Redonda (Volta Redonda Futebol Clube, RJ — associação, no SAF)

**Ángulos**: sitio oficial: HIT parcial (API /api/documents solo 2025) · federación/regulador: FERJ solo 2024 · Wayback CDX: HIT (sitio WordPress viejo voltaco.com.br/wp-content, 2017-2023) · búsqueda web: no necesaria · barrido: 1 (Sonnet) — 2026-10-03

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

## Barrido 2026-10-03 (grupo C Brasil): de 2 a 7 ejercicios en disco (2018-2022, 2024, 2025)

- El sitio viejo (WordPress, `voltaco.com.br/wp-content/uploads/2019..2023/`) está completo en Wayback aunque el Next.js nuevo solo exponga 2025. Bajados vía `web.archive.org/web/<ts>id_/<url>` a `Clubes/Brasil/Volta Redonda/`: `demonstracoes-financeiras-2022.pdf` (25 pp), `-2021.pdf` (25), `-2020.pdf` (28), `-2019.pdf` (29), `-2018.pdf` (35 pp, escaneo; carátula verificada a mano: "Volta Redonda Futebol Clube, 31 de dezembro de 2018 e 2017").
- **No conseguidos por truncado de Wayback (1.048.576 bytes)**: 2023 (`.../2023/04/Demonstra%C3%A7%C3%B5es%20Financeiras%20-%202023%20DEFINITIVAS.pdf`, captura 20240724113130; también existen `Balanço Patrimonial 2023` y `DRE 2023`) y 2017 (`Demonstracoes-Financeiras-31-de-dezembro-2017.pdf`, captura 20231209145255). El link live ya da 404. Ángulo que falta: pedirlas al club o la FERJ.
- Existen además (no bajados): pareceres de auditoría 2019/2021/2022/2023, pareceres del Conselho Fiscal 2019-2022, DRE/Balanço sueltos 2019-2022, Orçamento 2021/2022.
- Ficha FERJ (`servicos.fferj.com.br/ClubesLigas/ViewTeam?alias=134`) sigue con un solo balance (2024).

## Ejercicio 2023 (2026-10-08)

- **Bajado**: `balanco-patrimonial-2023.pdf` (Balanço Patrimonial 2023), 2ª captura de Wayback (20240902040016, 1,5 MB, PDF válido, sin capa de texto: hay que transcribirlo). La 1ª captura (20240724) venía truncada a 1 MiB.
- **No conseguido todavía**: `Demonstração do Resultado do Exercício 2023.pdf` y `Demonstrações Financeiras - 2023 DEFINITIVAS.pdf` (mismo directorio `uploads/2023/04/`): las capturas probadas vuelven truncadas a 1.048.576 bytes. Sin DRE el ejercicio no se puede cargar (el balance solo no alcanza). Archive.org estuvo "Temporarily Offline" durante parte de la sesión, así que no se pudo listar si existen más capturas: reintentar con la CDX (`fl=timestamp,length`) cuando vuelva.
