# Criciúma (Criciúma Esporte Clube, SC — associação, no SAF)

- **Dead-end viejo completamente destrabado, y con la serie más larga de Brasil hasta ahora.** La
  nota anterior (`_notas-generales.md`, sesión 2026-09) decía que solo se había encontrado un
  balance de 2013 en `criciuma.com.br/upload/financeiro/` y que adivinar el nombre de archivo para
  2022-2024 con el mismo patrón daba error 500. El problema era adivinar: el club **sí** tiene un
  portal de transparencia propio con toda la serie linkeada, y además la Federação Catarinense
  publica el balance de cada club filiado año por año. CNPJ 83.663.781/0001-21.
- **16 PDFs descargados a `Clubes/Brasil/Criciuma/`, cubriendo 14 ejercicios consecutivos
  (2012-2025, sin huecos):**
  - De la **FCF** (`fcf.com.br`, páginas "BALANÇOS FINANCEIROS <año>"): `balanco-2015.pdf`,
    `balanco-2016.pdf` + `balanco-auditado-2016.pdf` (la FCF publicó dos archivos distintos ese
    año, 24/04 y 27/04/2017, ambos guardados), `balanco-2017.pdf`, `balanco-2018.pdf`,
    `balanco-2019.pdf` (con capa de texto: "CRICIUMA ESPORTE CLUBE — Criciúma – SC — CNPJ n°.
    83.663.781/0001-21 — DEMONSTRAÇÕES FINANCEIRAS — EXERCÍCIO DE 2019") y
    `balanco-2019-escaneado.pdf` (la otra versión que publicó la FCF ese año, escaneo de 20 págs.
    sin texto), `balanco-2020.pdf`, `demonstracoes-financeiras-2022.pdf`,
    `relatorio-de-balanco-2023.pdf`, `relatorio-de-balanco-2024.pdf`,
    `relatorio-auditoria-2025.pdf`.
  - Del **portal propio del club**: `demonstracoes-financeiras-2013.pdf` (auditor Moore Stephens
    Metri), `demonstrativo-financeiro-2012.pdf`, `demonstrativo-financeiro-2014.pdf` (los dos años
    cuyo link en la FCF está muerto, ver abajo) y `demonstrativo-financeiro-2021.pdf` — este último
    es el que cierra el hueco, porque **la FCF no tiene página de balances de 2021**
    (`/balancos-financeiros-2021/` es 404 y `/balanco-financeiro-2021/`, en singular, no lista a
    Criciúma). Verificado dentro: "RA. 191/2022 — Chapecó, 19 de abril de 2022 — CRICIUMA ESPORTE
    CLUBE — CNPJ 83.663.781/0001-21 — auditoria das demonstrações contábeis de 31/12/2021", por
    Linear Auditores Independentes.
  - Los de 2023, 2024 y 2025 son del mismo auditor (Linear, Chapecó), con el formato "RA. nnn/aaaa
    — carta al presidente + relatório".
- **Los dos canales, y sus gotchas:**
  - **FCF**: `https://fcf.com.br/categoria/financeiro/balancos/` es el índice de años (2013-2025,
    sin 2021), cada uno una página `/balancos-financeiros-<año>/` con un link por club. Baja con
    `curl` sin bloqueo. **Pero los links de 2013 y 2014 tienen la forma
    `https://fcf.com.br///wp-content/uploads/...` (triple barra) y devuelven el HTML de la home con
    HTTP 200** — o sea, un `curl` "exitoso" que en realidad no trae el PDF. Siempre validar con
    `pdfinfo | grep -a "^Pages:"` antes de darlos por buenos. Desde ~2023 los archivos pasaron a
    `fcf-com-br-media.s3.amazonaws.com` y esos sí bajan bien; el mismo path en S3 para los archivos
    viejos da 403.
  - **Portal propio**: `https://criciuma.com.br/portal-transparencia` (sección
    "#demonstrativos-financeiros"). Es HTML plano, `curl` alcanza. Los nombres siguen el patrón
    `upload/financeiro/<año-de-publicación>-<slug>-<timestamp>.pdf`, donde el primer número es el
    año en que se SUBIÓ, no el ejercicio (ej. el demonstrativo de 2021 está en un archivo que
    empieza con `2021-` pero se subió el 29/09/2022) — no intentar adivinarlos, leer la página.
    Además del demonstrativo anual, el portal tiene balancetes trimestrales, pareceres del conselho
    fiscal, orçamentos y relatórios de gestão financeira de 2012 a 2026: hay bastante más material
    del que se bajó acá si en algún momento hace falta granularidad trimestral.
- Prensa (blog Enio Biz / 4oito) da cifras de control para 2025: patrimônio de R$ 119,2 millones
  (2024) a R$ 93,9 millones (2025), gasto ~R$ 25 millones por encima de la capacidad de generación
  de receita, departamento de futebol profissional consumiendo R$ 64,1 millones, y caja de cierre
  de R$ 649 mil contra más de R$ 20 millones el año anterior.
- Pendiente: ejercicios anteriores a 2012 (la FCF tiene una página genérica
  `/balancos-financeiros/` con un `balanco-criciuma-esporte-clube.pdf` de 2011/2012 en un link con
  triple barra, probablemente muerto igual que los de 2013/2014 — no probado).
- Contacto: https://criciuma.com.br/portal-transparencia;
  https://criciuma.com.br/upload/financeiro/;
  https://fcf.com.br/categoria/financeiro/balancos/;
  https://fcf-com-br-media.s3.amazonaws.com/wp-content/uploads/.
- Último chequeo: 2026-09-22.
