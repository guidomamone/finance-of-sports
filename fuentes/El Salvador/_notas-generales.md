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
  existe, 660 KB el de ENERO-FEBRERO-2021; sin verificar qué contiene exactamente — es un listado de
  quién depositó, no los balances). Sirve para confirmar que un club S.A. deposita año a año antes de
  pagar. No se pudo leer: el sitio responde con challenge de Cloudflare a `curl`/`WebFetch` (se pasa
  con un Browser pane real) y la descarga desde el Browser pane cae como archivo; el servidor local
  de recepción que se probó para sacarlo del navegador fue bloqueado por el navegador. Sin
  Firecrawl (`Admin/firecrawl/.env` vacío) no se pudo seguir.
- **Bolsa de Valores de El Salvador (bolsadevalores.com.sv)**: compila la información financiera de
  los emisores inscritos; no se revisó el listado de emisores buscando clubes (no hay señal de que
  ninguno emita). Pendiente barato.

**No hecho en esta sesión** (el primer barrido de país quedó corto, a propósito, para no gastar sin
señal): sitios oficiales de Alianza (alianzafc.com.sv), FAS (clubdeportivofas.com) y Águila; Wayback
CDX de esos dominios; Licencia de clubes de FESFUT y si exige estados auditados; Segunda División.

- Último chequeo: 2026-10-03.
