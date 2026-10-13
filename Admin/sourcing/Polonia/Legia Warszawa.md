# Legia Warszawa (Legia Warszawa S.A.)

**Ángulos**: sitio oficial: agotado (5 ejercicios en `legia.com/articles/raport-finansowy-<año>`; 2019 y 2020 enlazados pero 404) · canal regulador (RDF/KRS): bloqueado por IP desde EE.UU., no aplica · Wayback CDX: agotado (`pliki.legia.pl`, 2018-2020 recuperados) · búsqueda web: agotado · barrido: 1 (Sonnet) — 2026-10-03

- **Entidad**: LEGIA WARSZAWA SPÓŁKA AKCYJNA, KRS 0000097402, NIP 5261724308. Ejercicio julio-junio.
- **5 ejercicios en disco** (`Clubes/Polonia/Legia Warszawa/`): `raport-finansowy-2021.pdf` (FY 2020/21), `-2022`, `-2023`, `-2024`, `-2025` (FY 2024/25), cada uno con sprawozdanie finansowe + sprawozdanie zarządu + informe del biegły rewident en un solo PDF (37-47 págs.). Más `komentarz-2023/2024/2025.pdf` (comentario de la dirección, 16-17 págs.). Carátula verificada con `pdftotext` (todos con capa de texto, cero OCR).
- **Cómo se encontró**: `legia.com/en/raporty-finansowe` lista un artículo por ejercicio; cada artículo linkea el PDF en `files.legia.com/media/` (2023-2025) o `pliki.legia.pl/` (2021-2022). Los PDFs bajan con `curl` sin trucos.
- **Más años, de Wayback (CDX de `pliki.legia.pl`)**: `raport-finansowy-2020.pdf` (FY 2019/20, 50 págs., captura `20210725063725`), `sprawozdanie-finansowe-2019.pdf` (FY 2018/19, 36 págs., `20220214043225`), `biegly-rewident-2019.pdf` y `biegly-rewident-2018.pdf` (dictámenes, 4 págs.). Total **7 ejercicios (2019-2025)**; el FY 2017/18 solo tiene el dictamen. Los links vivos de 2019/2020 en `legia.com` dan 404.
- **Gotcha**: Wayback por `http://` dejó de conectar durante la sesión (curl exit 7, "Temporarily Offline"); por `https://web.archive.org/...` responde bien.
- Último chequeo: 2026-10-03.
