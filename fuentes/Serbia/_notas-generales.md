# Serbia — notas generales (sourcing de la SuperLiga, sesión 2026-10-03)

## Canal regulador: APR (`apr.gov.rs`, Registar finansijskih izveštaja)
- Es público y gratis para los **últimos 3 ejercicios** (búsqueda por matični broj, PIB o nombre); los anteriores APR los entrega "na komercijalnoj osnovi" (pago). Lo que se publica ahí son los formularios (bilans stanja, bilans uspeha) + el informe del revisor cuando se presentó; las notas completas no siempre.
- **No verificable desde EE.UU.**: `www.apr.gov.rs` devuelve 500 a curl y WebFetch, el Browser pane lo bloquea ("URL has been blocked") y `fin.apr.gov.rs`, `pretraga2/3.apr.gov.rs` no conectan. No se pudo comprobar si hay captcha. **Gestión de Guido**: probar desde IP serbia/VPN; es el único canal para Crvena zvezda, Novi Pazar y Radnik.

## Qué sí funciona: el club publica por la licencia (FSS/UEFA)
- 7 de 10 clubes de la SuperLiga publican algo en su propio sitio. La mediateca WordPress (`<sitio>/wp-json/wp/v2/media?per_page=100&search=revizor&mime_type=application/pdf`) lista los PDFs aunque la página no tenga índice (resolvió Vojvodina, Napredak, Čukarički, Železničar). Sitios Webflow/Nuxt (Crvena zvezda, Partizan) no tienen esa API: leer `sitemap.xml` y el HTML de `/vesti/dokumenta`.
- Mejor onboarding candidato: **TSC Bačka Topola** (7 ejercicios seguidos 2019-2025 con revisor) y **Partizan** (2023-2025, 90+ páginas cada uno con notas completas).
- Alfabeto: Vojvodina y Čukarički publican en **cirílico** con capa de texto buena (no hubo mojibake: `pdftotext` devuelve cirílico real). Un escaneo (TSC 2022) hay que pasarlo por `tesseract -l srp_latn`.
- Patrón `Završni račun` (16 pág.): es el formulario crudo de APR sin notas ni revisor; útil para totales, no para categorizar.

## Wayback
Las capturas de PDFs grandes salen truncadas a 1.048.576 bytes (Partizan 2019-2021, Napredak 2018). Validar siempre con `pdfinfo`.

## Estado por club
Ver `fuentes/_indice/Serbia.md`. Sin nada: Crvena zvezda, Novi Pazar, Radnik Surdulica.

## Propuesta de texto para `paises/Serbia.md`
SuperLiga: canal 1 = sitio del club (licencia FSS/UEFA, mediateca WordPress por `wp-json`); canal 2 = APR Registar finansijskih izveštaja (gratis 3 años, pago el resto; inaccesible desde EE.UU., probar con IP serbia). Cirílico: verificar `pdffonts`; los PDFs de Vojvodina/Čukarički traen texto correcto. OCR: `-l srp` (cirílico) o `srp_latn`.
