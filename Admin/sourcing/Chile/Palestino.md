# Palestino (Club Deportivo Palestino S.A.D.P.)

**Ángulos**: sitio oficial: HIT (memorias 2017-2024 con EEFF auditados) · regulador/país: CMF ya probado, RVEMI sin EEFF para el club (no reintentado, innecesario) · Wayback CDX: no hizo falta · búsqueda web: no hizo falta · barrido: 1 (Sonnet) — 2026-10-03

- Sigue en hit parcial: un solo ejercicio real, `Clubes/Chile/Palestino/estados-financieros-2018.pdf`
  (Estados Financieros Intermedios con comparativo del ejercicio completo cerrado 31/12/2018 +
  período de 6 meses a jun-2019, vía CMF). Esta sesión aclaró el misterio del `row=`: el listado
  global de la CMF confirma que Palestino tiene DOS registros con el mismo RUT (99569020) — uno como
  "Emisores de Valores de Oferta Pública" (RVEMI, el que interesa) y uno como "Organizaciones
  Deportivas Profesionales" (OTODP). Se entró al registro RVEMI correcto (ficha con pestaña
  "Información Financiera" real, con el mismo aviso que los otros tres clubes: "Esta sociedad
  presenta los primeros EE.FF bajo IFRS a partir de 30/06/2010") y se probó explícitamente
  Consolidado+IFRS para 2012, 2018 (dic) y 2019 (jun) y 2024 — los cuatro devolvieron "No existe
  información de la entidad para el periodo señalado". Palestino parece ser un emisor RVEMI que casi
  no cumplió con el envío de EEFF bajo este mecanismo (o los envió con `tipo_norma=NCH` en vez de
  IFRS, o como Individual en vez de Consolidado — no alcanzó a probarse en esta sesión); el único PDF
  real que existe puede haber llegado por una vía puntual (Hecho Esencial u otro tipo de documento)
  en vez del flujo estándar "Información Financiera" que sí funcionó de punta a punta para los otros
  tres clubes.
- Pendiente: 2010-2017 y 2019-2025 completos. Probar `tipo=I` (Individual, no Consolidado) y
  `tipo_norma=NCH` para los años ya intentados antes de descartarlos del todo; revisar también la
  pestaña "Publicación EEFF" (URLs externas) y "Hechos Esenciales" de la misma ficha, que pueden
  alojar el EEFF 2018 encontrado por otra vía.
- Contacto: ficha CMF (registro RVEMI)
  cmfchile.cl/institucional/mercados/entidad.php?mercado=V&rut=99569020&tipoentidad=RVEMI.
- Último chequeo: 2026-09-12.

## Barrido 2026-10-03: HIT en el sitio oficial (wp-json de media)

- El sitio oficial es WordPress (palestino.cl). La API `https://palestino.cl/wp-json/wp/v2/media?media_type=application&per_page=100`
  lista todos los PDF subidos al sitio. Hay 8 Memorias anuales de Club Deportivo Palestino S.A.D.P.
  (RUT 99.569.020-9 en cada carátula) subidas el 2025-06-06, cada una con los Estados Financieros auditados
  y notas adentro (Estados de Situación Financiera, Informe de los Auditores Independientes, Notas, Análisis Razonado):
  - Memoria 2017 (79 pp): https://palestino.cl/wp-content/uploads/2025/06/archivo-4.pdf
  - Memoria 2018 (85 pp): https://palestino.cl/wp-content/uploads/2025/06/archivo-3.pdf
  - Memoria 2019 (96 pp): https://palestino.cl/wp-content/uploads/2025/06/archivo-2.pdf
  - Memoria 2020 (98 pp): https://palestino.cl/wp-content/uploads/2025/06/archivo-1.pdf
  - Memoria 2021 (101 pp): https://palestino.cl/wp-content/uploads/2025/06/Memoria202021.pdf
  - Memoria 2022 (110 pp): https://palestino.cl/wp-content/uploads/2025/06/Memoria202022.pdf
  - Memoria 2023 (105 pp): https://palestino.cl/wp-content/uploads/2025/06/archivo.pdf
  - Memoria 2024 (101 pp): https://palestino.cl/wp-content/uploads/2025/06/Memoria-2024-CDPalestinoSADP.pdf
- Guardadas en `Clubes/Chile/Palestino/memoria-AAAA.pdf` (todas con capa de texto, no escaneos). Verificado con pdftotext:
  RUT y "al 31 de diciembre de AAAA" en cada una. NO transcriptas ni cargadas.
- Un PDF más del sitio (`2026/02/Futbol_EM_25-02-2026.pdf`) es una carta de El Mercurio, sin relación financiera.
- Con esto el club pasa de 1 a 8 ejercicios en disco (2017-2024; el 2018 ya estaba y ahora hay dos fuentes del mismo año).
- Faltan 2010-2016 y 2025 (la Junta Ordinaria 2026 se anunció en palestino.cl/comunicado-oficial-junta-ordinaria-de-accionistas-2/;
  la Memoria 2025 todavía no estaba subida al 2026-10-03). Revisar el wp-json de media cada año.
- Nota: la Memoria 2021 dice que "El Balance y Estados Financieros al 31 de diciembre de 2020, se publicaron en..." un diario:
  los EEFF de años anteriores a 2017 pueden estar en publicaciones de prensa (El Mercurio), no probado.
- Bolsa de Santiago `ifrs/newobtenerpdf.asp?nemo=PALESTINO|PALESTIN|CDPALEST`: "EL ARCHIVO ... NO ESTA DISPONIBLE" (el club no tiene nemo ahí).
- La URL de ficha CMF que figuraba en la nota (`cmfchile.cl/institucional/mercados/entidad.php?...`) hoy da 404 con curl
  (el sitio migró de ruta); no se retomó el flujo CMF porque el sitio oficial resolvió la tarea.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: sitio oficial: HIT (descubierto con búsqueda semántica Exa) · barrido: 1 (Sonnet) — 2026-10-08

10 documentos en carpeta (2017-2024).

- Documentos hallados y bajados del sitio del club; no se verificó que cada uno traiga cuenta de resultados. Revisar entidad y ejercicio antes de cargar.
- Memorias (carpeta con 11 archivos, algunos ya existentes).
