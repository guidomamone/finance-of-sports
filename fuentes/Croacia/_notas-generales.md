# Croacia — notas generales (sourcing de la HNL, sesión 2026-09-17)

## Los 10 clubes de la HNL 2025/26 (confirmado por Wikipedia, sesión 2026-09-17)

Dinamo Zagreb (campeón), Hajduk Split, Rijeka, Osijek, Gorica, Istra 1961, Lokomotiva Zagreb,
Slaven Belupo, Varaždin, Vukovar 1991 (descendido a fin de temporada — el 10° club de la
2026/27 pasó a ser Rudeš, visible en la tabla en vivo del sitio de Gorica al momento de esta
sesión, 2026-09-17).

## RGFI-JAV / FINA — NO es un registro gratis tipo Companies House/Centrale des bilans

Confirmado navegando `rgfi.fina.hr` (sesión 2026-09-17): el acceso a los documentos (incluso a
la "vista pública") requiere **crear una cuenta** (usuario + contraseña + reCAPTCHA) vía
`JavnaObjava-web/jsp/prijavaKorisnika.jsp` — no hay ninguna forma de buscar o descargar un
balance sin loguearse primero. La landing page dice "free access" (el USO de los datos es
gratis por ley, Art. 47 Ley de Contabilidad), pero el ACCESO en sí exige registro. Confirmado
también en el catálogo de datos abiertos `data.gov.hr` (dataset "Registar godišnjih
financijskih izvještaja — javna objava"): el mismo texto en croata dice "nakon registracije"
(después de registrarse). El dataset SÍ expone un CSV masivo descargable sin login, pero es
solo balance/PyG **abreviado** de empresas "micro y pequeñas" — ningún club de la HNL (todos
medianos/grandes, con auditoría obligatoria) entra en ese CSV.

**Conclusión para el skill**: a diferencia de Bélgica (Centrale des bilans) o Reino Unido
(Companies House), que sirven el PDF completo sin fricción, RGFI-JAV es un registro real y
gratuito EN TEORÍA, pero la barrera de registro de cuenta lo saca de alcance de un agente (no
se pueden crear cuentas — regla del proyecto). Si Guido quiere este canal en el futuro, tendría
que registrarse él mismo con sus propios datos — capaz valga la pena como respaldo/cross-check
de cifras ya cargadas, no como fuente primaria de descubrimiento (el sourcing directo en los
sitios de los clubes ya cubrió los 10 clubes, ver más abajo).

## El verdadero canal que funcionó: mandato de licenciamiento de la HNS, no un registro central

Ningún regulador mercantil centralizado hizo falta. Los 10 clubes de la HNL publican sus propios
`F.01`/`F.02_Godišnji financijski izvještaji (poslije/nakon) revizije` — el nombre de archivo es
IDÉNTICO letra por letra en los 10 sitios, lo que confirma que es un formulario estandarizado
que exige el **Pravilnik o licenciranju i financijskoj održivosti klubova** de la Hrvatski
nogometni savez (HNS) como condición para la licencia de la temporada — no pudimos confirmar
línea por línea en el reglamento (PDF de 137 páginas, comprimido, no se pudo extraer el artículo
exacto) que la HNS EXIJA publicación pública en el sitio propio del club (a diferencia de Costa
Rica, sección 7 del skill, donde el reglamento exige el documento pero GARANTIZA
confidencialidad) — pero la práctica uniforme en los 10 clubes, con el mismo nombre de
formulario, sugiere fuertemente que sí. Vale la pena confirmar el artículo exacto en una sesión
futura si hace falta citarlo con precisión.

La HNS/liga NO publica ningún agregado tipo "Finanzkennzahlen" (DFL alemana) o
"Finanzkennzahlen" (ÖFBL austríaca) con los 10 clubes juntos — se buscó explícitamente y no se
encontró.

## Patrón por club: casi todos publican voluntariamente en su propio sitio, más allá de la forma jurídica

- **7 de 10 clubes son "sportsko dioničko društvo" (s.d.d.)** — la figura de sociedad anónima
  deportiva croata: Hajduk Split (š.d.d.), Osijek, Gorica, Istra 1961, Rijeka, Varaždin (recién
  convertido en 2024/25) y Vukovar 1991.
- **Dinamo Zagreb y NK Lokomotiva Zagreb siguen siendo "udruga"** (asociación, sin forma
  societaria) — y sin embargo AMBOS publican sus estados financieros auditados igual, por mandato
  de licenciamiento de la HNS aplicado también a los clubes-asociación (mismo patrón que Union
  Berlin/St. Pauli en Alemania, sección 12 del skill, salvo que ahí el balance es solo para
  socios y acá es público).
- **Slaven Belupo** no se confirmó su forma jurídica exacta esta sesión (quedó pendiente, no
  bloqueó el sourcing).

## Gotcha de tooling repetido: sitios rediseñados con links rotos a PDFs viejos, Wayback Machine como respaldo

Varios sitios (gnkdinamo.hr, hnk-gorica.hr, nkistra.com) migraron de CMS/dominio en algún punto
reciente y dejaron links a PDFs antiguos ROTOS en páginas que siguen online (la página del
artículo carga bien, pero el link al PDF devuelve 404 o el shell HTML de la SPA en vez del
archivo) — no es un bloqueo intencional, es decay de sitio típico. La vuelta que funcionó:
buscar la MISMA URL exacta en la Wayback Machine (CDX API) y bajar el snapshot más reciente con
status 200. Gotcha nuevo encontrado esta sesión: **un snapshot de Wayback puede devolver un
archivo TRUNCADO a un tamaño redondo en potencia de 2** (1048576 = 1MB, 5242880 = 5MB exactos) —
pasó dos veces con `gnkdinamo.hr` — sin que el pedido falle ni dé error; la única forma de
detectarlo es que `pdfinfo`/`pdftotext` fallen con "Invalid XRef"/"Couldn't read xref table" a
pesar de un tamaño de archivo aparentemente razonable. La solución: probar OTRO timestamp/snapshot
de la misma URL en el CDX (normalmente uno de los otros sale íntegro).

**Archive.org tuvo una interrupción real y prolongada durante esta sesión** ("Internet Archive:
Temporarily Offline", varias horas) — no reintentar agresivamente cuando pase, esperar y
reintentar más tarde. Quedó pendiente por esta causa: el ejercicio 2023 de Dinamo Zagreb (el link
vivo en gnkdinamo.hr da 404, y no se pudo recuperar de Wayback por la interrupción del servicio).

## Otro gotcha nuevo: un subdominio "archivo" con 401 real (no de tooling)

`arhiva.nk-slaven-belupo.hr` (donde vivían los ejercicios 2019-2023 de Slaven Belupo, linkeados
desde la página `/dokumenti/` del sitio actual) devuelve **401 Unauthorized real**, confirmado
tanto por `curl` como navegando con el browser — no es un bloqueo de bot, es una restricción de
acceso genuina puesta por el club/hosting sobre su propio subdominio de archivo. Wayback Machine
era el único respaldo posible y coincidió con la interrupción del servicio (ver arriba) — quedó
pendiente, reintentar en sesión futura.

## Scribd como canal de disclosure — no descargable sin cuenta

NK Lokomotiva Zagreb (la única "udruga" pura sin sociedad, junto con Dinamo) aloja sus dos
ejercicios más recientes (2024, 2025) como documentos embebidos de **Scribd**
(`scribd.com/document/...`), no como PDF directo en su propio dominio — confirmado que Scribd
exige suscripción/login para descargar el archivo completo (el sitio del club antes tenía los
PDF directos en `/dokument/<slug>`, pero esas URLs viejas ya dan 404 — mismo patrón de sitio
rediseñado que gnkdinamo.hr/hnk-gorica.hr). No se pudo confirmar si hay ejercicios más viejos
(2018-2023) todavía accesibles en algún lado — el sitio actual solo linkea 2024 y 2025.

## Cómo mantener esta sección

Si en una sesión futura se confirma el artículo exacto del Pravilnik de la HNS que obliga a
publicación pública (o se descubre que NO es obligación y es voluntario), actualizar el párrafo
correspondiente. Si Archive.org ya no está caído, completar los pendientes de Dinamo Zagreb 2023
y Slaven Belupo 2019-2023 antes de intentar cualquier otro ángulo nuevo.
