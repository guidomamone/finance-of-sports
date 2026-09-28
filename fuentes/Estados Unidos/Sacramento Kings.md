# Sacramento Kings

**Ángulos**: sitio oficial: agotado (`nba.com/kings` sin transparencia financiera, `kings.com`
redirige ahí) · regulador/país: agotado — SEC vía Compass Diversified Holdings (CODI) descartada
(solo bio de un director, sin estados financieros del club); canal alternativo real explorado: bonos
municipales del Golden 1 Center (disclosure vía EMMA/DAC Bond, `cityofsacramento.gov`) — confirma la
estructura societaria y que el repago del bono depende del alquiler que paga la franquicia, pero sin
desglosar montos ni traer un estado contable del club · Wayback CDX: agotado (`nba.com/kings` solo
tiene guías de TV/horarios) · búsqueda web: agotado (solo estimaciones de terceros, Forbes/CNBC) ·
barrido: 1 (Sonnet) — 2026-09-27

- **Deporte**: Básquet
- **Liga / competencia**: NBA (Estados Unidos)
- **Entidad legal**: **Sacramento Kings Limited Partnership** ("TeamCo" en la documentación de bonos
  de la ciudad), controlada por **Sacramento Basketball Holdings, LLC** ("HoldCo" / SBH) — privada.
  Accionista mayoritario **Vivek Ranadivé** (ex-CEO y fundador de TIBCO Software, que cotizó como
  `TIBX` hasta ser comprada por Vista Equity Partners en 2014 y pasar a ser privada, sin ningún
  vínculo societario con el club mientras cotizaba). Entre los socios minoritarios figura **Alexander
  "Ryan" Bhathal**, que además es director de **Compass Diversified Holdings** (NYSE `CODI`).

## Por qué la SEC no es un canal directo

"Sacramento Basketball Holdings" no aparece como emisor propio en `company_tickers.json`. La
búsqueda de texto completo de EDGAR da 10 resultados, todos dentro de filings de **Compass
Diversified Holdings** (DEF 14A 2022 a 2025) — se abrió el más reciente (2025-04-14,
`sec.gov/Archives/edgar/data/1345126/000114036125013771/ny20042318x1_def14a.htm`, vía Firecrawl) y
la única mención es biográfica, del director Ryan Bhathal: *"Since 2013, Mr. Bhathal has served as
co-owner and executive director of Sacramento Basketball Holdings, which owns the Sacramento Kings
franchise of the National Basketball Association (NBA), the Stockton Kings of the NBA G-League,
Minor League Baseball's River Cats, Golden 1 Center, and Downtown Commons entertainment and sports
district."* Sin ninguna cifra del club ni de SBH — mismo patrón "bio de un director, la compañía que
cotiza no tiene participación societaria en el equipo" ya visto en Miami Heat, Dallas Mavericks y
Golden State Warriors. TIBCO Software (el otro vehículo público relacionado con el dueño mayoritario)
dejó de cotizar en 2014, y aun cuando cotizaba no tenía ningún vínculo societario con el club.

## El hallazgo real: disclosure de los bonos municipales del Golden 1 Center (confirma estructura, no trae balance)

El Golden 1 Center (costo total de desarrollo ~USD 477 millones según el prospecto original, con
cifras de prensa posteriores hasta ~USD 558 millones) se financió con ~USD 223-255 millones de
aporte de SBH/los Kings y bonos del **Sacramento Public Financing Authority** ("2015 Lease Revenue
Bonds (Golden 1 Center), Series 2015 (Federally Taxable)", USD 299.995.000). Por ser bonos
municipales, la Ciudad de Sacramento publica disclosure bajo la SEC Rule 15c2-12 vía DAC Bond/EMMA,
alojado directo en `cityofsacramento.gov` — se mapeó el dominio completo con Firecrawl `/v1/map`
(4.079 URLs devueltas en una sola llamada) y se encontró la carpeta
`content/dam/portal/treasurer/DebtManagement/`:

- **Official Statement (prospecto original, 2015)**:
  `.../officialstatements/lease-revenue-revenue/2015_Lease_Revenue_Bonds_Series_2015_(G1C)_Taxable.pdf`
  — confirma la estructura societaria: **HoldCo** (SBH) es *"a private entity that owns a
  controlling interest in the Sacramento Kings [...] and in affiliated entities, including ArenaCo
  and TeamCo."* **ArenaCo** construyó y arrienda la arena a la Ciudad; **TeamCo** (Sacramento Kings
  Limited Partnership) es la dueña del club y licenciataria del uso de la arena vía un "Team Use
  Agreement" de mayo de 2014.
- **Annual Continuing Disclosure Report, FY2024** (presentado 2025-03-21):
  `.../AnnualReports/fy20231/2015 Lease Revenue Bonds (Golden 1 Center) Annual Report FY2024.pdf` —
  confirma que el **66,8%** del servicio de esta deuda depende de "Lease Rental Payments from the
  Sacramento Kings or its affiliates" (el 33,2% restante, del Parking Fund municipal), y lista a
  **Sacramento Kings** como el mayor contribuyente de impuesto a la propiedad de la ciudad (USD
  352,6 millones de valuación fiscal 2024, 0,49% del total).

**Por qué esto NO reemplaza a un balance**: ninguno de los dos documentos desglosa el MONTO en
dólares del alquiler que paga TeamCo/los Kings, ni trae un estado de resultados o balance de SBH ni
de TeamCo — es disclosure de la Ciudad como emisora del bono, centrado en la capacidad de repago de
la deuda municipal, no en la salud financiera del club. Mismo tipo de hallazgo que el audit del
Inspector General de Miami-Dade sobre el Heat (`fuentes/Estados Unidos/Miami Heat.md`): confirma que
existe una relación financiera real y pública, pero no es un estado contable del club en el formato
que usa el resto del proyecto.

## Otros ángulos agotados

- **Sitio oficial**: `kings.com` redirige (HTTP 301) a `nba.com/kings`, sin ninguna sección de
  transparencia financiera (confirmado con un scrape de la home vía Firecrawl).
- **Wayback CDX**: `nba.com/kings` (con `matchType=prefix`, no `domain` — `nba.com` es un dominio
  compartido por toda la liga, así que filtrar por dominio completo trae ruido de otras franquicias)
  solo trae guías de TV, horarios y formularios de pruebas; nada financiero.
- **Búsqueda web dirigida**: solo estimaciones de terceros (CNBC/Forbes: revenue estimado USD 425
  millones y EBITDA USD 90 millones, temporada 2024-25) y notas de impacto económico regional (USD
  665 millones/año) — mismo criterio de descarte que ya aplica a estimaciones de mercado y a reportes
  de consultoría sobre impacto económico.

## Conclusión

Dead-end para un balance del club: propiedad privada (Ranadivé + socios), sin ninguna compañía que
cotiza con participación societaria (solo un director de Compass Diversified es también socio de
SBH, mención puramente biográfica). El único canal público real con algo de sustancia es el
disclosure de los bonos municipales del Golden 1 Center, que confirma la estructura societaria y la
dependencia del alquiler de los Kings para el repago de la deuda, pero no trae cifras del club en sí.

## Pendiente / próximo paso si se retoma

- Revisar los reportes de disclosure de años anteriores (FY2016 a FY2023, mismo directorio
  `ContinuingDisclosureFilings/AnnualReports/` en `cityofsacramento.gov`) por si alguno desglosa el
  monto exacto del alquiler pagado por SBH/TeamCo — en esta sesión solo se abrió el más reciente
  (FY2024).
- Un pedido de registros públicos (California Public Records Act) a la Ciudad de Sacramento por el
  monto real de "Lease Rental Payments" históricos sería una gestión de Guido, no una tarea de
  sourcing (mismo criterio que Miami Heat/Miami-Dade).

- Último chequeo: 2026-09-27.
