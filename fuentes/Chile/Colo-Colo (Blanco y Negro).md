# Colo-Colo (Blanco y Negro S.A.)

- **Hit fuerte, ampliado a la serie completa (2026-09-12).** 17 ejercicios anuales (2009 a 2025, sin
  ningún año faltante) descargados a `Clubes/Chile/Colo-Colo (Blanco y Negro)/`:
  `estados-financieros-2009.pdf` a `estados-financieros-2025.pdf` (Estados Financieros Consolidados
  al 31/12, bajados del portal CMF vía la pestaña "Información Financiera" de la ficha, mismo método
  que Universidad de Chile). La ficha CMF no tiene datos IFRS para 2008 ("No existe información de
  la entidad para el periodo señalado"), consistente con el mandato IFRS chileno arrancando en 2009.
  El ejercicio 2025 se consiguió además por una vía alternativa más simple: la API pública de la
  Bolsa de Santiago (`apiws.bolsadesantiago.com/ifrs/newobtenerpdf.asp?nemo=COLO+COLO`, sin
  autenticación) devuelve directamente el PDF más reciente de cualquier nemotécnico bursátil chileno
  — útil como atajo rápido para el ejercicio más nuevo de un emisor, pero no sirve para años
  históricos (no acepta parámetro de período).
  OJO/dato de color para el onboarding: el balance 2024 fue inicialmente RECHAZADO por los
  accionistas en la junta de abril 2025 (por el tratamiento contable del contrato con DG Medios) y la
  CMF debió intervenir — el PDF bajado es el que finalmente circuló, conviene revisar prensa de la
  época (cooperativa.cl/latercera.com, buscados en sesión anterior) antes de darlo por definitivo al
  cargarlo.
- Pendiente: nada del rango 2009-2025, la serie está completa. Falta solo el cierre 2026 (aún no
  ocurre).
- Contacto: ficha CMF
  cmfchile.cl/institucional/mercados/entidad.php?mercado=V&rut=99589230&tipoentidad=RVEMI (pestaña
  "Información Financiera", mismo gotcha que Universidad de Chile: hay que llegar por clic real
  desde la ficha, no por URL directa); atajo Bolsa de Santiago para el año más reciente:
  apiws.bolsadesantiago.com/ifrs/newobtenerpdf.asp?nemo=COLO+COLO.
- Último chequeo: 2026-09-12.
- **CARGADO al sitio (2026-09-25)**: ejercicios 2024, 2023 y 2022 en `data/colocolo-cl-data.js`
  (clubId `colocolo-cl`), verificados tie-out exacto (revenue/expenses/PAT) contra los totales
  impresos de cada documento. Fuente: `sourceId` `colocolo-cl-estados-financieros-2024/2023/2022`
  (ver `data/clubs.js` → `sources`). Tipo de cambio: dólar observado de cierre (`fx` literal,
  `fxSource:'market_approx'` en el propio archivo del club, ninguno de los 3 documentos declara TC
  propio). Quedan 2009-2021 y 2025 sin cargar (fuera de alcance de esta sesión). Ver duda anotada en
  `Admin/dudas-por-club.md` sobre el rechazo inicial del balance 2024 en la junta de accionistas.

