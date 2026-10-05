# Lituania — notas generales (sourcing, sesión 2026-10-03)

## El canal oficial NO es accesible para un agente

- **Registrų centras** (`www.registrucentras.lt`, Juridinių asmenų registras): desde esta sesión `curl` recibe `HTTP 403`
  y el navegador del pane se queda en "Performing security verification" (Cloudflare Turnstile): es una
  verificación anti-bot que no se completa ni se evade. **Gestión de Guido**: abrir `https://www.registrucentras.lt/jar/p/index.php`
  en su navegador. Según la búsqueda pública, los estados financieros de **asociaciones, VšĮ y fundaciones** (la
  figura de casi todos los clubes) se consultan gratis ("neatlygintina"); a las sociedades (UAB) se les cobra por
  documento. No se pudo confirmar el flujo exacto.
- **`data.gov.lt`** (portal de datos abiertos; datasets "Juridinių asmenų pateikti finansinės atskaitomybės dokumentai —
  balanso/pelno (nuostolių) ataskaitos" y sus APIs `get.data.gov.lt`): desde la IP de EE.UU. de esta sesión responde
  una página "Web Page Blocked! … Attack ID" (WAF, bloqueo por IP/geo). **Gestión de Guido**: desde una IP lituana/europea probar
  el dataset; no se conoce su cobertura (probablemente solo cifras, no PDF).

## El canal que sí funcionó: el sitio del club

La LFF (Futbolo federacija) licencia a los clubes de la A lyga y la 1 lyga y les exige publicar el paquete
`finansinių ataskaitų rinkinys` auditado; por eso 6 de los 8 clubes revisados tienen una sección con PDFs
(Žalgiris Vilnius `fkzalgiris.lt/finansine-informacija/`, Banga `fkbanga.lt/klubas`, Sūduva `fksuduva.lt/dokumentai/`,
Panevėžys `fk-panevezys.lt/dokumentai/`, Jonava `fkjonava.lt/straipsnis/finansine-informacija`, Kauno Žalgiris
`zalgiris.lt/finansines-ataskaitos`). **Gotcha**: la mayoría solo deja el ejercicio en curso y borra los viejos
al subir el siguiente: hay que usar el CDX de Wayback del dominio completo
(`web.archive.org/cdx/search/cdx?url=<dominio>&matchType=domain&output=txt&fl=timestamp,original,statuscode&filter=mimetype:application/pdf&collapse=urlkey`),
que recuperó 2019-2024 de Žalgiris Vilnius y FY2022/2023 de Panevėžys.

## Gotchas

- Casi todos los PDF son escaneos sin capa de texto (1 página por estado): OCR con `tesseract -l lit` (instalado).
- `zalgiris.lt` (Kauno Žalgiris) responde 403 a `curl` aun con UA de Chrome: la lista de enlaces se extrajo con el
  navegador del pane (`javascript_tool` sobre `a[href]`); los PDF del CDN `app-common-assets.cdn.zalgiris-app.zalgirisventures.com/FK/…` bajan con `curl` normal.
- Los archivos viejos de Sūduva y Panevėžys se identifican por el año de subida (`wp-content/uploads/<año>/`),
  que es el año SIGUIENTE al ejercicio; confirmar con el texto "(YYYY.01.01-YYYY.12.31)".
- Dos entidades "Žalgiris" no relacionadas: VšĮ Futbolo klubas "Žalgiris" (Vilnius, 302309678) y VšĮ Futbolo klubas "Kauno Žalgiris".

## Texto propuesto para `paises/Lituania.md`

> **Lituania**: Registrų centras (JAR) está tras Cloudflare Turnstile y `data.gov.lt` bloquea IP de EE.UU.: no
> accesibles para un agente. El canal real es el sitio del club (licencia LFF: paquete de estados auditados
> publicado), que suele conservar solo el año en curso → completar con Wayback CDX del dominio completo. Casi todo
> escaneado (OCR `lit`). Los clubes son VšĮ/asociación (no UAB), salvo Hegelmann.

## Dudas / mails / gestiones

- **Gestión de Guido**: Registrų centras (consulta gratuita de VšĮ/asociaciones) para completar Panevėžys (FY2021, FY2024), Kauno Žalgiris (2019-2024), Sūduva (2024-2025 y resultados 2019-2020), Transinvest, Riteriai, Džiugas.
- Candidatos a mail (no escritos): FK Panevėžys (paquete FY2021 y FY2024), Kauno Žalgiris (2019-2024).

## Pendientes (venían del TODO)

- (ex to-do 133, 2026-10-03) **Gestiones de Guido que desbloquean varios países de Europa del Este** (sesión 2026-10-03; ninguna es tarea de sourcing, cada una exige IP, cuenta, captcha o pago de una persona): (d) Lituania `registrucentras.lt` (Cloudflare Turnstile) y `data.gov.lt` desde IP europea.
- (ex to-do 135) **Candidatos a mail (existencia confirmada o muy probable, no escritos; Guido decide y aprueba cada envío, proceso en `club-outreach`)**: FK Panevėžys, Kauno Žalgiris.
