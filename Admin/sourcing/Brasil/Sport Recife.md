# Sport Recife (Sport Club do Recife, Recife-PE)

- **Dead-end viejo (DNS roto + Cloudflare) completamente destrabado con un browser real — el mejor
  ejemplo de esta sesión de que "Cloudflare bloquea el dominio" a veces solo bloquea `curl`, no un
  navegador de verdad.** La nota anterior decía que el subdominio `transparencia.sportrecife.com.br`
  no resolvía DNS y que `sportrecife.com.br` daba 403 directo. Ambos siguen sin funcionar por
  `curl` — pero el portal se movió a `sportrecife.com.br/portal-transparencia/
  demonstracoes-financeiras/` (dominio principal, no el subdominio viejo), y con un navegador real
  (`mcp__Claude_Browser`) la página cargó normalmente, pasando el challenge de Cloudflare sin
  intervención.
- **7 ejercicios descargados en `Clubes/Brasil/Sport Recife/`, cubriendo 2019-2025**:
  `demonstracoes-financeiras-2025.pdf`, `-2024-e-2023.pdf`, `-2023-e-2022.pdf`,
  `-2022-e-2021.pdf`, `-2021-e-2020.pdf`, `-2020-e-2019.pdf`. Confirmado por texto: "SPORT CLUB DO
  RECIFE — Demonstrações Contábeis ... com Relatório do Auditor Independente" en cada uno.
- **Gotcha de tooling — DOS capas de bloqueo, no una sola**:
  1. Los links de descarga de la página NO son `<a href=".pdf">` planos: cada año abre un modal
     con un `<iframe>` que apunta a `docs.google.com/viewer?url=<pdf real>&embedded=true` — el PDF
     real está en el query param `url=`, visible solo inspeccionando el `outerHTML` completo del
     documento (`data-src` de los iframes, que quedan en `about:blank` hasta que se abre el modal).
  2. Una vez con la URL real (`sportrecife.com.br/wp-content/uploads/...pdf`), un `curl` directo
     sigue devolviendo 403 de Cloudflare (confirmado, header `cf-mitigated: challenge`) — el bypass
     que funcionó fue un `fetch()` ejecutado DESDE la página ya cargada en el browser (mismo
     origen, con la cookie de challenge ya resuelta), disparando una descarga real vía
     `URL.createObjectURL(blob)` + click en un `<a download>`, y después localizando el archivo
     descargado en `~/Downloads/` (nombre ofuscado por el sandbox del navegador, pero el tamaño en
     bytes coincide exacto con el `blob.size` que devolvió el `fetch`, lo que permite emparejar
     cada archivo con su año sin ambigüedad).
- Contacto: sportrecife.com.br/portal-transparencia/demonstracoes-financeiras/ (requiere browser
  real, no `curl`, por el challenge de Cloudflare).
- Último chequeo: 2026-09-16.
