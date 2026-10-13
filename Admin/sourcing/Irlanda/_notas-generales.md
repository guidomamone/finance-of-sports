# República de Irlanda — notas generales (sesión 2026-10-03)

League of Ireland (Premier y First Division). Registro: **CRO** (Companies Registration Office, `cro.ie`). **Veredicto del canal: no hay nada automático que bajar, y aunque se pagaran los documentos casi no habría P&L.**

**Qué es gratis (verificado):**
- **CRO Open Data Portal** (`https://opendata.cro.ie`, CKAN, licencia CC-BY-4.0, sin cuenta ni login). API `datastore_search` (`/api/3/action/datastore_search?resource_id=<id>&q=<texto>` o `filters={"company_num":"…"}`). Dos datasets:
  - `companies`: registro de todas las sociedades (nombre, número, estado, tipo, fecha del último accounts; CSV zip diario). Resource id `3fef41bc-b8f4-4b10-8434-ce51c29b1bba`.
  - `financial-statements`: **solo un índice** — una fila por presentación con `company_num`, `file_name` (tipo `131629514.pdf`, el id del documento en CORE), fechas y `submissions_accounts_to_date`. Tres recursos: FY2022 `508d4f8a-74a1-40c7-8b86-cdf0d54a4929`, FY2023 `dd413039-f628-4931-9788-dfc38eaf6b99`, FY2024 `4dc79788-845b-4373-aaf9-77be6feb049b`. **No incluye ni el PDF ni las cifras.** Sirve para saber qué entidad presentó qué y cuándo.

**Qué es de pago o está cerrado:**
- Los documentos en **CORE** (`core.cro.ie`): según fuentes de terceros, €3,50 por documento; la web devuelve 403 de Cloudflare a `curl`. Por la regla 0.3 (canal que exige cuenta/pago de una persona) **es gestión de Guido**: no se creó cuenta ni se insistió.

**Por qué igual rinde poco:** las cuentas que depositan los clubes son *abridged* (Companies Act 2014, s.352-353, exención de sociedad pequeña): **no traen turnover ni gasto de personal**. Verificado con el PDF que Shamrock Rovers publica en su propio sitio (FS 2024, `Clubes/Irlanda/Shamrock Rovers/`): `pdftotext` no encuentra "turnover" ni cuenta de resultados. Bohemians, según Boardroom Sports (lead de terceros), idem. Los estados completos se presentan en la asamblea pero no se depositan.

**Entidades:** de los 20 clubes (Derry City incluido, registrada en Companies House NI), 9 tienen sociedad con filings indexados 2022-2024 (Shamrock Rovers, Bohemians, Shelbourne FC 2018, Drogheda Utd FC, Bray Wanderers, Treaty United, Longford Town, Athlone Town, Kerry FC); Dundalk (Dundalk Town FC Ltd) y Cobh Ramblers (sociedad nueva de 2025) tienen sociedad sin filings verificados; y **8 quedan sin resolver** (St Patrick's, Sligo Rovers, Galway United, Waterford, Cork City, Finn Harps, UCD, Wexford). Varios son cooperativas o *Industrial & Provident Societies* (Sligo "Sligo Football and Sport Development Society Ltd", Galway United Friends Co-operative, FORAS/Cork City) y se registran en el Registry of Friendly Societies, no en el de sociedades: canal sin investigar.

**FAI:** `fai.ie/about/governance/annual-review/` publica solo los Financial Statements de la FAI como organización (2009-2024). No publica finanzas por club ni un agregado de la League of Ireland. El Club Licensing Manual obliga a los clubes a publicar información financiera en su web, pero no hay repositorio central. Terceros (leads sin verificar): el blog `leagueofirelandfinance.blogspot.com` y Boardroom Sports (Substack) analizan cuentas depositadas; una de esas fuentes cita €38,1 M de turnover combinado de los clubes en 2023.

**Camino real si se quiere esta liga:** (1) pedir a cada club su estado completo (algunos lo comunican en la asamblea: Sligo Rovers €2,72 M de turnover 2025); (2) comprar a mano en CORE los FS de los pocos que presenten completos; (3) usar prensa especializada. No es una tarea de sourcing automática.
