# Ceará (Ceará Sporting Club, Fortaleza-CE)

- **Dead-end viejo completamente destrabado — resultó ser el mejor hallazgo de todo el barrido de
  clubes "difíciles" de esta sesión.** La nota anterior decía que el artículo de prensa linkeado
  devolvía 404 y no se encontraba la URL directa. El portal real es
  `transparencia.cearasc.com` (subdominio propio, con SPA en React) → menú "Prestação de contas" →
  sub-sección "Demonstrações Contábeis" (`transparencia.cearasc.com/relatorios-documentos/
  demonstracoes-contabeis/`), con **7 archivos cubriendo 8 ejercicios (2018 a 2025)**.
- **8 ejercicios descargados en `Clubes/Brasil/Ceara/`** (todos vía `curl` directo, sin Cloudflare
  ni bloqueo — dominio distinto del sitio principal `cearasc.com`):
  - `demonstracoes-contabeis-2019-e-2018.pdf`, `-2020.pdf`, `-2021.pdf`, `-2022.pdf`, `-2023.pdf`,
    `-2024.pdf`, `-2025.pdf`.
  - Confirmado por texto/imagen: "CEARÁ SPORTING CLUB. — CNPJ: 07.369.226/0001-03 —
    Demonstrações contábeis... e o Relatório dos Auditores Independentes" — paquete completo con
    balanços, DRE, DRA, mutações do patrimônio, fluxo de caixa y notas explicativas en todos los
    años revisados.
  - **Gotcha de tooling**: 2021-2024 no tienen capa de texto extraíble con `pdftotext`/`pdffonts`
    (mismo patrón que el PDF de RB Bragantino 2019 — probablemente generados con un driver que
    vectoriza el texto en vez de embeber fuentes). 2019-2020 y 2025 sí tienen texto real. Confirmar
    la atribución al club se hizo renderizando la página 2 a imagen con `pdftoppm` en vez de
    `pdftotext` para esos 4 años.
- Prensa (Diário do Nordeste, O Povo) confirma el déficit de R$85,8 millones en 2025, el mayor de
  la historia del club — coherente con lo que debería figurar en el PDF de 2025 al momento de
  cargar los datos.
- Contacto: transparencia.cearasc.com/relatorios-documentos/demonstracoes-contabeis/ (portal
  separado del sitio principal cearasc.com, sin necesidad de login).
- Último chequeo: 2026-09-16.
