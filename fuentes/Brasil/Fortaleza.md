# Fortaleza (Fortaleza Esporte Clube / Fortaleza EC SAF, Fortaleza-CE)

- **Dead-end viejo destrabado.** La nota anterior decía "navegación por menú JS, no hay links
  planos de PDF en el HTML" para `transparencia.fortaleza1918.com.br/portal-saf/`. Eso seguía
  siendo cierto para la página raíz del portal (SPA/menú desplegable sin links planos), pero cada
  sub-sección SÍ tiene el PDF real embebido en el HTML — solo hacía falta navegar un nivel más
  adentro (`Demonstrações Contábeis` → `Inf. Contábeis Anuais`, o `Balancete Anual`, dentro de cada
  uno de los 2 portales separados del club: SAF y Associação).
- **Fortaleza tiene DOS entidades con transparencia separada** (se convirtió a SAF en 2024, la
  associação social sigue existiendo en paralelo):
  - **SAF** (`Clubes/Brasil/Fortaleza/`, sufijo `-saf-`): `demonstracoes-contabeis-saf-2025.pdf` —
    paquete completo auditado ("FORTALEZA EC SAF — Relatório do auditor independente —
    Demonstrações contábeis — Em 31 de dezembro de 2025", 38 páginas, con capa de texto real).
    También `balancete-anual-saf-2024.pdf` y `-2025.pdf` (balancetes contables sin el mismo nivel
    de detalle/auditoría que la demonstração completa — son export de "Fortes Contábil", software
    de contabilidad, sin parecer de auditor).
  - **Associação** (sufijo `-associacao-`): 8 ejercicios de balancetes anuales, 2018 a 2025
    (`balancete-anual-associacao-2018.pdf` ... `-2025.pdf`). Confirmado por texto: "Empresa:
    FORTALEZA ESPORTE CLUBE — CNPJ: 07.319.551/0001-61". **Ojo**: estos son "Balancete Contábil"
    (export directo del software contable, sin relatório de auditor ni notas explicativas) — no
    tienen el mismo nivel de robustez que una demonstração contábil auditada. Antes de cargar al
    sitio, evaluar si alcanzan el estándar mínimo del proyecto o si hace falta buscar además un
    parecer de auditoría separado (sección "Parecer do CF" del mismo portal, no descargada esta
    sesión).
- **Gotcha de navegación**: la CVM y el propio menú del portal usan rutas separadas para SAF vs.
  Associação que lucen simétricas pero llevan a slugs distintos, ej. `balancos-anuais-saf/` vs.
  `balancos-anuais-associacao/` — conviene extraer los links con JS (`document.documentElement.
  outerHTML.match(/\.pdf/)`) en cada sub-página en vez de asumir el patrón de URL a mano.
- Contacto: transparencia.fortaleza1918.com.br/portal-saf/ y /portal-associacao/.
- Último chequeo: 2026-09-16.
