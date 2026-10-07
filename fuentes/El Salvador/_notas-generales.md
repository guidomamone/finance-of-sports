# Notas generales — El Salvador

## Primer barrido, sesión 2026-10-03 (sourcing Centroamérica)

**Pregunta de la figura jurídica**: los clubes grandes de la Primera División (Alianza, FAS, Águila) no
tienen estructura societaria confirmada en lo encontrado (la búsqueda solo trajo Wikipedia: Alianza con
dueño Adolfo Salume; FAS pasó a manos de SSPort/SSports Inc. el 25-dic-2024 según Wikipedia; Águila
sin dato). Es la primera cosa a averiguar: si el club es una asociación sin fines de lucro o una S.A.
de C.V.

**Canal con señal real: Registro de Comercio del CNR (Centro Nacional de Registros)**. El Salvador es
uno de los pocos países de la región donde una sociedad mercantil DEPOSITA su balance cada año en un
registro público: el catálogo de servicios del Registro de Comercio (cnr.gob.sv, sección "Balance")
lista "Depósito de Estados Financieros (Inicial, General, Rectificación o Liquidación)", y un
resultado de búsqueda sobre sus requisitos (no leído en la fuente primaria) indica que para personas
jurídicas el balance siempre va firmado por auditor externo, con el dictamen y el acta de aprobación
adjuntos. La consulta es de pago bajo, por documento (verificado en
`cnr.gob.sv/servicios/detalle-de-servicios-del-registro-de-comercio/` el 2026-10-03):
- **Certificación de Balance Particular**: copia fiel del balance depositado; requiere solicitud con
  denominación y año + recibo de pago; **US$ 6,00 más US$ 0,25 por hoja** del depósito. (Formulario
  Único para Trámite de Constancias y Certificaciones.)
- Constancia de Balance Particular: solo constancia de que se depositó, US$ 5,00 por año.
- Certificación/Constancia de Balance Oficial: US$ 0,00, pero "solicitado por las instituciones"
  (organismos públicos), no aplica a un particular.
- **Esto es una gestión de Guido (0.3)**: requiere solicitud escrita y recibo de pago (presencial o
  por e-CNR con identidad de una persona), no la puede hacer un agente. Costo trivial por documento;
  lo difícil es la identidad. Antes de pedirlo hay que saber la denominación social exacta del club
  (se ve con una "Certificación Extractada"/consulta por nombre) y confirmar que es sociedad.
- **El CNR publica además listados mensuales "Balance General Depositado"**
  (`cnr.gob.sv/documentos/rc/balances/<año>/<período>/Balance-General-Depositado-<MES>-<AÑO>.pdf`,
  existe, 660 KB el de ENERO-FEBRERO-2021). VERIFICADO el 2026-10-07 (Guido lo bajó a mano): 339 páginas, una ficha
  por inscripción ("Persona Jurídica o Natural", número de presentación e inscripción, tipo de balance, fecha del balance; la
  primera es AZOR'S, S.A. de C.V., balance al 31/12/2007): es un listado de quién depositó, NO trae cifras. En el de
  enero-febrero 2021 no aparece ningún club de fútbol. Sirve para confirmar que un club S.A. deposita año a año antes de
  pagar. No se pudo leer: el sitio responde con challenge de Cloudflare a `curl`/`WebFetch` (se pasa
  con un Browser pane real) y la descarga desde el Browser pane cae como archivo; el servidor local
  de recepción que se probó para sacarlo del navegador fue bloqueado por el navegador. Sin
  Firecrawl no se había probado todavía en ese momento (ver el chequeo siguiente).
- **Bolsa de Valores de El Salvador (bolsadevalores.com.sv)**: compila la información financiera de
  los emisores inscritos; no se revisó el listado de emisores buscando clubes (no hay señal de que
  ninguno emita). Pendiente barato.

## Segundo chequeo, mismo día (2026-10-03): sitios oficiales y Wayback de los 3 clubes

- **Alianza** (`alianzafc.com.sv`): Firecrawl `/map` devolvió 882 URLs (12 son "portfolio" de plantilla);
  menú completo = noticias, directiva, institución (solo misión), historia, partners, descargas
  (fondos de pantalla), sin ninguna sección de transparencia/documentos. `/directiva` lista Presidente,
  Vicepresidente, Secretario, Pro Secretario y Tesorero (estructura de **asociación con junta
  directiva**, no de S.A.); la misión habla de "socios". Wayback CDX de dominio completo: 0 PDFs reales
  (solo el ícono `blue-document-pdf.png` del plugin). Sitio y CDX agotados.
- **FAS** (`clubdeportivofas.com`): 104 URLs, un sitio estático viejo (noticias 2004-2014, "Documentos
  Antiguos" = boletos y portadas de periódico). Wayback CDX: un único PDF, `Ficha_de_Inscripcion_CD_FAS.pdf`
  (2009, ficha de inscripción, no financiero). El dueño declarado (SSports Inc., dic-2024) no
  aparece en ese sitio; el sitio vigente podría ser otro dominio, no verificado.
- **Águila** (`cdaguila.com.sv`): el dominio hoy no resuelve (DNS). Wayback CDX: solo los tomos de
  "Historia del Águila" (2007), ningún documento financiero. Junta directiva con presidente, vicepresidente,
  secretario, tesorero y vocal (jun-2025): también asociación.
- Una búsqueda semántica con Exa ("estados financieros auditados / balance Alianza FC") solo devolvió
  Wikipedia, el sitio del club y LinkedIn.

**Consecuencia para el canal del CNR**: el depósito anual de balance del Registro de Comercio aplica
a SOCIEDADES mercantiles. Si Alianza y Águila son asociaciones sin fines de lucro (lo que la junta
directiva sugiere, pero no está confirmado: Wikipedia dice "owner Adolfo Salume" para Alianza), no
están en ese registro y el trámite de US$ 6 no tendría nada que certificar. Por eso el paso de
Guido (to-do 122) sigue condicionado a confirmar primero la forma jurídica; el siguiente
escalón con valor es la licencia de clubes de la FESFUT (¿exige estados auditados y los blinda como
Costa Rica?), todavía no investigada.

- Último chequeo: 2026-10-03.

## Pendientes (venían del TODO)

- (ex to-do 122, 2026-10-03) EL SALVADOR: CERTIFICACIÓN DE BALANCE PARTICULAR DEL CNR (gestión de Guido, sourcing Centroamérica, 2026-10-03). El Registro de Comercio del CNR (cnr.gob.sv) recibe el balance anual auditado de toda sociedad mercantil y entrega copia fiel por US$ 6 + US$ 0,25 por hoja (solicitud con denominación y año + recibo de pago; ver `fuentes/El Salvador/_notas-generales.md`). Los agentes no pueden pagar ni identificarse. ANTES de pagar: confirmar que el club sea una SOCIEDAD (Alianza y Águila parecen asociaciones con junta directiva, en cuyo caso el CNR no tiene nada que certificar; FAS pertenecería a SSports Inc., entidad foránea) y su denominación exacta. Sitio oficial y Wayback de los 3 ya agotados (ver notas). Siguiente escalón: licencia de clubes de la FESFUT.
