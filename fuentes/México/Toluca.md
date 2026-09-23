# Toluca (Deportivo Toluca F.C., S.A. de C.V.)

- Sin PDF. Propiedad de **Valentín Díez Morodo** y socios, sociedad anónima cerrada. Es uno de los
  pocos clubes de Liga MX dueño de su propio estadio (Nemesio Díez), lo que hace la sociedad más
  "gorda" patrimonialmente pero no más transparente.
- **Qué se probó y falló (sesión 2026-09-22)**:
  1. `tolucafc.com` (HTTP 200) — barrido de la home por "transparencia", "estados financieros",
     "informe anual", "inversionistas", "memoria anual", "reporte anual": **cero hits**.
  2. **Se chequeó específicamente la sospecha de que Toluca cotizara en la BMV** (el nombre completo
     "Deportivo Toluca F.C., S.A. de C.V." y la antigüedad del club lo hacían candidato): **no está en
     el listado completo de emisoras del mercado de capitales al 22/09/2026** (109 claves, obtenido del
     buscador de `bmv.com.mx/es/mercados/capitales` con "Ver Todas"). Cuidado con un falso positivo
     tentador: la clave **`DIABLOI`** que aparece en ese listado NO es Toluca (cuyo apodo es "Diablos
     Rojos") sino un **ETF de Actinver** sobre el índice S&P/BMV DIBol.
  3. **SEC EDGAR full-text**: `"Deportivo Toluca"` → 15 resultados, **todos de terceros** — sobre todo
     **Grupo Aeroméxico, S.A.B. de C.V.** (20-F y prospectos F-1/DRS) y Under Armour, es decir
     contratos de patrocinio e indumentaria mencionando al club, nunca cifras suyas.
- **Ángulo pendiente**: ninguno fuerte. Si el club bursatilizara flujos del estadio (certificados
  bursátiles fiduciarios ante la CNBV), el fideicomiso emisor tendría obligación de reportar. Hoy no
  hay indicio de que exista.
- **Contexto estructural que aplica a todo México (no repetirlo club por club)**: los 18 clubes de la
  LIGA MX SÍ producen estados financieros dictaminados por un tercero independiente — el **Reglamento
  de Control Económico de la FMF/LIGA MX** los exige por escrito, en año calendario y con fecha límite
  el 30 de abril — pero su **artículo 12 los declara expresamente confidenciales**. Ver
  `_notas-generales.md` para el detalle y la cita. Es decir: el documento existe y está auditado, pero
  el regulador deportivo lo exige y lo blinda.
- Último chequeo: 2026-09-22.
