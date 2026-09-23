# River Plate

- Memoria (narrativa, SIN estados contables) — https://www.riverplate.com/docs/socios/memoria-YYYY-YYYY.pdf — el dominio oficial de River solo publica el reporte de gestión narrativo (fútbol, infraestructura, marca, redes sociales, etc.), nunca el balance auditado. Se probaron y confirmaron 7 años directos (2018-19 a 2025) en finance-of-sports/Clubes/Argentina/River/, pero NINGUNO tiene estados contables — ver river-data.js para el detalle de este hallazgo. No cargar más años de esta fuente esperando encontrar el balance ahí, no está.
- Estados Contables (balance auditado real), Ejercicio N° 123 (1°/9/2023 al 31/8/2024) — https://turiver.s3.us-west-000.backblazeb2.com/original/4X/1/7/a/17ac4c09709f687d2249c3e21b8e7c5262b78116.pdf — encontrado en una réplica de la comunidad tuRiver (turiver.com), no en el dominio oficial. Ya cargado en el sitio (Ejercicio 2024), marcado como fuente no-primaria (secondary_mirror) pero con banner explicando que el documento en sí es el balance auditado real, no placeholder ni prensa. Desde la Versión 32, cargado en ARS nativo con el tipo de cambio que declara el propio balance ($950,50, Anexo V) — antes se usaba $953,50, investigado externamente.
- Pendiente: encontrar el balance auditado oficial (o una réplica confiable) de los ejercicios que faltan — 2018-19 a 2022-23 y 2024-25. Probar buscando "estados contables river plate [año] site:turiver.com" o en foros de hinchas — el patrón que funcionó una vez (Backblaze/S3 vía turiver.com) puede repetirse para otros años.
- Canal OFICIAL nuevo, investigado 2026-09-23 (to-do 53), NO explotado todavía: River es una
  asociación civil inscripta en la IGJ (CUIT `30-52674844-8`, sede Figueroa Alcorta 7597, CABA —
  confirmado en el Boletín Oficial y en el propio estatuto social,
  https://www.riverplate.com/docs/socios/estatuto-social.pdf). La IGJ tiene un trámite público
  "Solicitar un informe de balances presentados en la IGJ"
  (https://www.argentina.gob.ar/servicio/solicitar-un-informe-de-balances-presentados-en-la-inspeccion-general-de-justicia)
  que devuelve los estados contables que la entidad ya presentó — sería la primera fuente
  VERDADERAMENTE oficial del proyecto para River, mejor que el mirror de tuRiver. PERO: el trámite
  se hace por TAD (Trámites a Distancia), exige clave fiscal AFIP nivel 2+ o usuario Mi Argentina —
  o sea la identidad de una PERSONA, no algo que un agente pueda iniciar — y tiene costo ("5
  módulos"). **Es una gestión para Guido, no una búsqueda para sourcear solo.** No se probaron
  búsquedas de balances "sueltos" en Boletín Oficial (las convocatorias a asamblea que ahí aparecen
  publicadas normalmente no adjuntan el estado contable completo, solo anuncian la fecha de la
  asamblea) — descartado por bajo valor esperado, no confirmado con certeza.
- Color de marca: `#E30520` — CSS del sitio oficial (`riverplate.com/assets/index-NnUNf_7i.css`,
  82 ocurrencias), verificado 2026-09-21. No coincide con la tabla por liga de footylogos, que da
  #ED192D.
