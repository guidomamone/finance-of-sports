# Remo (Clube do Remo, Belém-PA — asociación civil, CNPJ 04.887.097/0001-57; NO es SAF)

- Club nuevo esta sesión, **7 ejercicios (2019 a 2025)**. El sitio se rehízo hace poco y eso dejó dos rastros
  que hay que conocer:
  - Las URLs viejas de noticias (`clubedoremo.com.br/ler-noticia.php?id=<n>`) y los PDFs viejos
    (`clubedoremo.com.br/files/<md5>.pdf`) **devuelven 404**: todos los resultados de búsqueda que apuntan ahí
    están muertos, aunque el título del resultado sea correcto. No es que el club haya bajado el documento.
  - El sitio nuevo sirve los documentos desde un bucket público de Cloudflare R2:
    `https://pub-6456b24912b548d4bfaf1426a7c2a97d.r2.dev/transparency/<nombre_slug>_<hash8>.pdf`. La página
    `clubedoremo.com.br/transparencia` trae los **646** archivos del bucket embebidos en el HTML servido
    (aunque la UI muestre solo la categoría "Página Inicial"), así que un `curl` + `grep` alcanza para tener
    el catálogo entero sin tocar el browser. Cada archivo aparece DUPLICADO con dos hashes distintos y el
    mismo contenido.
- **19 PDFs descargados en `Clubes/Brasil/Remo/`**:
  - 2019: `dre-2019.pdf`, `dfc-2019.pdf`, `dmpl-2019.pdf`, `parecer-auditoria-2019.pdf`.
  - 2020: `balanco-patrimonial-2020.pdf`, `dre-2020.pdf`, `dfc-2020.pdf`, `dmpl-2020.pdf`,
    `relatorio-auditoria-2020.pdf` (15 pág.).
  - 2021: `demonstracoes-contabeis-2021.pdf` (28 pág., paquete completo).
  - 2022: `demonstracoes-contabeis-2022.pdf` (24 pág.) + `relatorio-auditor-independente-2022.pdf` (30 pág.,
    el mismo ejercicio auditado por GRC Gestão, Consultoria e Auditoria) + `dre-2022.pdf`.
  - 2023: `balanco-2023.pdf`, `dre-2023.pdf`. 2024: `balanco-2024.pdf`, `dre-2024.pdf`.
  - 2025: `demonstracoes-financeiras-2025.pdf` (25 pág., paquete completo con relatório do auditor).
- **GOTCHA REAL DE ETIQUETADO, del propio club**: en el bucket hay un `balan_o_patrimonial_2019_*.pdf` y un
  `balan_o_patrimonial_2020_*.pdf` que son **el MISMO archivo** (md5 idéntico), y el contenido de los dos es
  el balanço al **31/12/2020**. O sea que el "2019" del nombre es falso. Se borró la copia descargada como
  2019 y quedó solo `balanco-patrimonial-2020.pdf`. **El ejercicio 2019 queda sin balanço patrimonial propio**
  (sí están su DRE, DFC, DMPL y el parecer del auditor). Moraleja para cualquier repositorio: comparar el md5
  entre archivos de años consecutivos antes de darlos por dos documentos distintos.
- **El ejercicio 2025 NO está en el bucket nuevo**, aunque el club lo publicó (prensa de 2026: receita bruta
  R$82,9 M vs R$35,3 M en 2024, ativo total R$318,4 M, PL +102,9%, y la regularización ante la ANRESF tras
  una notificación). El PDF vivía en la URL vieja `clubedoremo.com.br/files/5f5f534da4199307970fbccbedf244d3.pdf`,
  hoy 404. **Se recuperó de Wayback Machine** (snapshot 20260616155826), que es lo que recomienda la regla 0
  del skill: sigue siendo el documento del club, servido por archive.org. Si el club lo vuelve a colgar en el
  bucket nuevo, reemplazar por la copia en vivo. (Hay una segunda URL vieja que circula en resultados de
  búsqueda, `.../files/5e6b9567c91263ebdf7f671f435facb2.pdf`, que **no tiene ningún snapshot** en Wayback.)
- `balanco-2023.pdf` y `balanco-2024.pdf` son escaneos firmados digitalmente (Foxit + ICP-Brasil): `pdftotext`
  solo devuelve el bloque de la firma, hay que renderizar con `pdftoppm` para leer los números. Verificado así
  que el de 2023 dice "CLUBE DO REMO — Balanço Patrimonial — Em 31 de Dezembro de 2023" (ativo total
  R$177.217.127).
- Pendiente: balanço patrimonial 2019; ejercicios anteriores a 2019.
- Contacto: clubedoremo.com.br/transparencia → pub-6456b24912b548d4bfaf1426a7c2a97d.r2.dev/transparency/.
- Último chequeo: 2026-09-22.
