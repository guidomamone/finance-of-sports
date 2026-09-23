# Novorizontino (Grêmio Novorizontino — SAF desde 06/12/2023, antes associação)

- Club nuevo esta sesión (Série B 2025, Novo Horizonte-SP). CNPJ 04.728.712/0001-82 (confirmado
  dentro del balance 2010). Se convirtió en **Grêmio Novorizontino Sociedade Anônima do Futebol**
  el 06/12/2023; los ejercicios anteriores son de la associação con el mismo nombre y el mismo id
  de club en la Federação Paulista (9541), así que la serie es continua.
- **16 PDFs descargados a `Clubes/Brasil/Novorizontino/`, cubriendo 15 ejercicios (2010, 2013-2025
  sin huecos; faltan solo 2011 y 2012, ver "Pendiente")** — todos del repositorio institucional de la Federação Paulista de
  Futebol, que es la ÚNICA fuente: el sitio oficial `gremionovorizontino.com.br` NO tiene sección
  de transparencia / demonstrações (se revisó el menú completo: Home, O clube, Estrutura, Elenco,
  Comissão, Tabela, Notícias, TV, Contato, Torcedor mirim — nada financiero).
  - `demonstracoes-financeiras-2018.pdf` … `-2025.pdf` (8 ejercicios seguidos, paquete completo:
    relatório dos auditores independentes + balanços patrimoniais + demonstração do resultado +
    mutações do patrimônio + fluxos de caixa + notas explicativas).
  - `balanco-patrimonial-2017.pdf` + `dre-e-fluxo-de-caixa-2017.pdf` (2017 viene partido en dos
    anexos).
  - `balanco-2010.pdf`, `balanco-2013.pdf`, `balanco-2014-a.pdf` + `-b.pdf`, `balanco-2015.pdf`,
    `balanco-2016.pdf` — publicaciones cortas (2-6 páginas), varias son escaneos sin capa de texto.
  - Verificado dentro del documento: 2018/2019/2020/2021 ("GRÊMIO NOVORIZONTINO — 31 DE DEZEMBRO
    20XX E 20XX"), 2023/2024/2025 ("Grêmio Novorizontino — Demonstrações contábeis em 31 de
    dezembro de 20XX"), 2010 (CNPJ + "Novo Horizonte (SP)"). El 2022 es escaneo sin texto: se
    confirmó por OCR de la página 1 ("Carta de Responsabilidade da Administração do Grêmio
    Novorizontino referente às demonstrações contábeis do exercício findo em 31 de dezembro de
    2022", auditor Unity Auditores Independentes).
  - Auditores que aparecen en la serie: Verdus Auditores Independentes (São José do Rio Preto) en
    2020-2021, Unity Auditores Independentes en 2022, y firma con assinatura digital Certisign/
    portaldeassinaturas en 2023-2025.
- **Cómo se descubrieron los nombres de archivo exactos (importante, ver también
  `_notas-generales.md`)**: NO se adivinaron. La Federação Paulista expone un handler JSON sin
  autenticación, `https://www.futebolpaulista.com.br/Handlers/Institucional/ListaFinanca.ashx?periodoSelecionado=<año>`,
  que devuelve para cada club su `idClube`, `nomeClube` y la lista de `anexos` con la ruta exacta
  dentro de `/Repositorio/Institucional/<año>/`. Los años disponibles salen de
  `ListaPeriodoFinanca.ashx` (hoy: los 16 años contiguos 2010-2025). Ese handler devuelve 403 a `curl`/WebFetch
  igual que la página `A-Federacao/Financas.aspx` que lo consume, pero desde el Browser pane, con
  la página ya cargada, un `fetch()` relativo funciona perfecto. Una vez que se tiene la ruta
  exacta, el PDF individual SÍ baja con `curl` (200) sin ningún problema.
- Pendiente: ejercicios 2011 y 2012. **Ojo: el repositorio de la FPF SÍ tiene año 2011** (otros
  clubes paulistas presentaron: confirmado con Ituano, `Institucional/2011/271A.pdf` y siguientes)
  — lo que falta es la presentación de ESTE club, que no aparece bajo el `idClube` 9541 en el
  índice de 2011. El 2012 sí está en el índice pero como 3 JPGs, no PDF
  (`9541A.jpg`/`9541B.jpg`/`9541C.jpg`, no descargados).
- Contacto: https://www.futebolpaulista.com.br/A-Federacao/Financas.aspx (índice por año);
  https://futebolpaulista.com.br/Repositorio/Institucional/<año>/<archivo>.pdf;
  https://www.gremionovorizontino.com.br/ (sin sección financiera).
- Último chequeo: 2026-09-22.
