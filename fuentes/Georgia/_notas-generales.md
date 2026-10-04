# Georgia — notas generales (sourcing, sesión 2026-10-03)

## Canal oficial: reportal.ge (SARAS) — buscador público, documentos con login

- `https://reportal.ge/en/Reports` ("Annual Statements Register"): buscador gratuito de entidades. Se consulta
  sin cuenta con peticiones POST JSON al propio sitio (desde el navegador, mismo origen):
  `POST /en/Reports/Search` `{"q":"<texto en georgiano>"}` → lista `{ID, Name}` (mín. 3 caracteres; búsqueda por
  prefijo/palabra, el nombre debe escribirse en georgiano: `დინამო`, `ტორპედო`, `საფეხბურთო კლუბი`…);
  `POST /en/Reports/List` `{"orgName":"<nombre completo>","page":1}` → tabla con el ID (código de contribuyente);
  `GET /en/Reports/OrgReports?q=<ID>` → los años con informe depositado; `POST /en/Reports/OrgReportsByYear?q=<ID>&year=<año>`
  → ficha del año (pestaña "Audit": nombre del auditor y de la firma, SÍ público; pestaña "Reports": mensaje
  "ანგარიშგებების სანახავად გაიარეთ ავტორიზაცია", i.e., hay que autorizarse). **No se crean cuentas ni se
  evade el login**: los documentos son gestión de Guido (registro gratuito de usuario en reportal.ge; hay que probar si
  los LLC no obligados a publicar quedan visibles).
- El `PIE` (entidades de interés público) obligadas a publicar son sobre todo las de categoría I-II; los clubes
  aparecen con categoría `II ჯგუფი` (Dinamo Tbilisi) o `IV` (más chicos).
- `napr.gov.ge` / `enreg.reestri.gov.ge` (Registro Nacional): extractos corporativos pagos, sin balances; no sirve.

## Canal que sí funcionó (un club): el sitio del club

Dinamo Tbilisi publicó, en la sección "ფინანსური ინფორმაცია" (licencias), el paquete financiero anual. Los
archivos siguen en `fcdinamo.ge/m/u/ck/files/` aunque ya no estén enlazados: se encontraron con el CDX del dominio
completo (14 PDFs). Los otros clubes no se resolvieron/exploraron (los dominios probados `fctorpedo.ge`,
`fcdinamobatumi.ge`, `fcdilagori.ge` no resuelven; `fcsaburtalo.ge` redirige a un sitio ajeno).

## Gotchas

- Todo en georgiano: Tesseract `kat` (+ `eng`). El OCR de cifras es ruidoso (mezcla dígitos con letras). Las carátulas se leen.
- Wayback trunca a 1.048.576 bytes: 5 PDFs de Dinamo Tbilisi quedaron así (borrados).
- El nombre jurídico de los clubes es largo (`შპს საფეხბურთო კლუბი …`): buscar por la palabra del club.

## Texto propuesto para `paises/Georgia.md`

> **Georgia**: reportal.ge (SARAS) es el registro de informes anuales; el buscador es público pero los documentos
> requieren cuenta (gestión de Guido). Los clubes son შპს; buscar por nombre en georgiano. Dinamo Tbilisi
> publica el paquete de licencia en `fcdinamo.ge/m/u/ck/files/` (recuperable por CDX). Tesseract `kat`.

## Gestiones de Guido / mails

- Crear cuenta en reportal.ge y bajar los informes de Dinamo Tbilisi (2017-2025; 2020 falta), Torpedo Kutaisi (2018-2025), Dinamo Batumi (2018-2022), Gagra, Lokomotivi, Sioni, Zestafoni, Samgurali (2020-2025).
- Mail candidato (no escrito): Dinamo Tbilisi, pedir 2018 y 2020.
