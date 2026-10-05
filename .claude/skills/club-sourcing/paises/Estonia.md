# Estonia — e-Äriregister: PDF gratis y sin login, con `curl` sin User-Agent

- **Canal**: `https://ariregister.rik.ee/eng/company/<registrikood>` → `Annual reports` → `PDF`
  (`/eng/company/<kood>/file/<id>`). Usar el informe `Valid`; los `Expired` son versiones
  reemplazadas.
- **`curl` SIN `-A`**: con un User-Agent de navegador, Cloudflare responde 520. En ráfagas a veces
  llega una página HTML de desafío con extensión .pdf: validar `%PDF-`, esperar 15-30 s y
  reintentar. Script: `Admin/sourcing-europa-este-scripts/ee.py <kood> <carpeta> [año-mín]`.
- **Encontrar la entidad es lo difícil**: los clubes son MTÜ y el nombre comercial no coincide con
  el jurídico (Flora = `Jalgpalliklubi FCF`). Se resuelve con el CSV de datos abiertos
  `ettevotja_rekvisiidid__lihtandmed` (`avaandmed.ariregister.rik.ee`).
- **Datos abiertos**: `1.aruannete_yldandmed` dice si cada informe está auditado;
  `4.<año>_aruannete_elemendid` trae los ítems numéricos 2019-2025, pero a veces le faltan años que
  la página de la empresa sí tiene: la página manda.
- Los informes son nativos con texto (`pdftotext` sirve); OCR `est` si hace falta.
