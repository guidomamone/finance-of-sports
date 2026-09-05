# Fuentes por club

Este archivo es tuyo, Guido: un lugar para pegar links a documentos, notas de
prensa o páginas oficiales cuando encuentres algo útil para un club, aunque
todavía no tengas tiempo de cargarlo al sitio. No hace falta ningún formato
especial ni saber programar — un link y una línea de contexto alcanza. Cuando
tengas varios, decime "che, revisá fuentes-por-club.md" y yo los proceso: los
leo, saco los números/categorías reales, y los cargo al sitio con la fuente
correctamente citada.

Cómo agregar algo: copiá una línea nueva bajo el club que corresponda, con
este formato:

- [qué es] — [link] — [para qué sirve o qué tiene adentro, si se nota a simple vista]

Ejemplo:

- Presupuesto 2026/27 — (ya subido como PDF) — presupuesto oficial completo, es lo que ya está cargado en Finanzas.

---

## Boca Juniors

- Presupuesto Económico, Financiero y de Inversiones, Ejercicio N° 123 (jul-2026 a jun-2027) — PDF subido directamente, ya cargado en el sitio (Ejercicio 2027). Transcripción completa (37 páginas, palabra por palabra) en Clubes/Argentina/Boca/presupuesto-26-27.md (Versión 30).
- Memoria y Balance auditado, Ejercicio N° 121 (jul-2024 a jun-2025) — https://www.bocajuniors.com.ar/club/presupuesto (linkea a un Drive) — ya cargado en el sitio (Ejercicio 2025), balance real, no presupuesto. Copia local en numeros-de-boca/Clubes/Argentina/Boca/Memoria y Balance 2024-25.pdf.
- Presupuestos y balances oficiales — https://www.bocajuniors.com.ar/club/presupuesto — la página solo linkea el presupuesto vigente y el balance más reciente (los dos ya cargados arriba), no un archivo histórico. Los balances de 2018, 2019, 2021, 2022, 2023 y 2024 siguen pendientes de encontrar y cargar.
- Presupuesto Ejercicio 2025/26 (jul-2025 a jun-2026, el año que falta entre los dos ya cargados) — investigado en la Versión 32, sin PDF oficial encontrado todavía. Nota oficial del club (sin PDF adjunto): https://www.bocajuniors.com.ar/noticias/aprobado ("Más obras y superávit", 5/6/2025). Cobertura de prensa con cifras (no verificada fuente por fuente): fenix951.com.ar, soyboca.com.ar/2025/06/05/presupuesto_aprobado_mas_obras_y_superavit.html, cholilaonline.ar, mundogremial.com, lanumero12.com.ar — coinciden en ingresos ≈$171.000 M ARS, egresos ≈$168.000 M ARS, superávit proyectado ≈USD 2 M. El balance auditado REAL de este ejercicio probablemente no esté disponible hasta la asamblea de aprobación (Boca aprueba el balance del ejercicio anterior en octubre siguiente al cierre — este ejercicio cerró jun-2026). Volver a buscar en oct/nov-2026.

## River Plate

- Memoria (narrativa, SIN estados contables) — https://www.riverplate.com/docs/socios/memoria-YYYY-YYYY.pdf — el dominio oficial de River solo publica el reporte de gestión narrativo (fútbol, infraestructura, marca, redes sociales, etc.), nunca el balance auditado. Se probaron y confirmaron 7 años directos (2018-19 a 2025) en numeros-de-boca/Clubes/Argentina/River/, pero NINGUNO tiene estados contables — ver river-data.js para el detalle de este hallazgo. No cargar más años de esta fuente esperando encontrar el balance ahí, no está.
- Estados Contables (balance auditado real), Ejercicio N° 123 (1°/9/2023 al 31/8/2024) — https://turiver.s3.us-west-000.backblazeb2.com/original/4X/1/7/a/17ac4c09709f687d2249c3e21b8e7c5262b78116.pdf — encontrado en una réplica de la comunidad tuRiver (turiver.com), no en el dominio oficial. Ya cargado en el sitio (Ejercicio 2024), marcado como fuente no-primaria (secondary_mirror) pero con banner explicando que el documento en sí es el balance auditado real, no placeholder ni prensa. Desde la Versión 32, cargado en ARS nativo con el tipo de cambio que declara el propio balance ($950,50, Anexo V) — antes se usaba $953,50, investigado externamente.
- Pendiente: encontrar el balance auditado oficial (o una réplica confiable) de los ejercicios que faltan — 2018-19 a 2022-23 y 2024-25. Probar buscando "estados contables river plate [año] site:turiver.com" o en foros de hinchas — el patrón que funcionó una vez (Backblaze/S3 vía turiver.com) puede repetirse para otros años.

## Racing Club

- Archivo oficial completo de informes y balances — https://www.racingclub.com.ar/informes/ — a diferencia de Boca y River, Racing tiene un archivo público con presupuestos y balances desde 2009 hasta el presupuesto 2026-27. Se descargaron los ~24 documentos a numeros-de-boca/Clubes/Argentina/Racing/. OJO: no todos tienen texto extraíble — verificado con pdftotext (chars/página): 2009, 2010, 2011, 2019-20, 2021 y presupuesto2017-18 sí tienen texto nativo (cargados los balances 2009/2010/2011 en la Versión 20); balance2012 a balance2018 y los presupuestos 2013-14/2015-16/2018-19/2019-20 son escaneos puros, necesitan OCR con el Read tool sobre imágenes (pendiente, más caro en tokens).
- Balance auditado real, Ejercicio N°122 (1°/7/2023 al 30/6/2024, última temporada de Blanco) — ya cargado en el sitio (Ejercicio 2024). Reemplaza el placeholder anterior. Resultado real: déficit de $(6.127.619.872) ARS. Desde la Versión 32, cargado en ARS nativo con el tipo de cambio que declara el propio balance ($909, Anexo VI) — antes se usaba $912, investigado externamente.
- Balance auditado real, Ejercicio N°123 (1°/7/2024 al 30/6/2025, primer ejercicio completo de Milito) — ya cargado en el sitio (Ejercicio 2025), nuevo, no existía antes en el sitio. Déficit real de $(178.451.821) ARS. Desde la Versión 32, cargado en ARS nativo con el tipo de cambio que declara el propio balance ($1.196, Anexo VI) — antes se usaba $1.203, investigado externamente.
- Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2025-2026 — ya cargado en el sitio (Ejercicio 2026), reemplaza al hilo de X de abajo. Documento oficial, mucho más detallado que la cobertura de prensa.
- Presupuesto Financiero de Ingresos y Egresos, Ejercicio 2026-2027 — ya cargado en el sitio (Ejercicio 2027, Versión 32). PDF oficial (8 páginas, texto nativo), mismo formato que el de 2025-26. Transcripción completa en Clubes/Argentina/Racing/presupuesto2026-27.md.
- Pendiente: los ~19 años históricos restantes del archivo (2009 a 2023) quedaron descargados pero sin extraer/cargar — mismo proceso que los 3 de arriba, solo falta tiempo.
- ~~Hilo de X con el resumen del presupuesto 2025/26~~ — https://x.com/Sacostaracing/status/1944855768127431049 — ya no se usa (reemplazado por el documento oficial de arriba), queda como referencia histórica en sources{} de data/clubs.js.

## Otros clubes (si se agregan más adelante)

*(agregar una sección nueva por club acá)*

---

### Nota técnica para cuando yo (Claude) proceso esto

Cada fuente que cargo al sitio queda registrada en `data/clubs.js` con estos
datos: de qué club es, qué tipo de documento es (presupuesto oficial, balance
oficial, cobertura de prensa, o placeholder), y qué tan confiable es. Esto es
lo que le permite al sitio mostrar avisos tipo "dato real" vs. "dato de
prensa, no oficial" vs. "placeholder, no es real todavía" en cada sección,
en vez de que quede solo en un comentario que nadie lee.
