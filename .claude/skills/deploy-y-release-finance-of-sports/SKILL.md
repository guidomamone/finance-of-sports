---
name: deploy-y-release-finance-of-sports
description: Qué chequear antes de que Guido haga push a `main` (que despliega financeofsports.com en Netlify) y cómo verificar producción después. Usar cuando Guido diga que va a publicar, cuando pregunte si algo está listo para subir, o cuando haya que confirmar que algo ya salió. Las sesiones no hacen push ni lo mencionan; esto es para cuando él lo decide.
---

# Antes del push (lo corre la sesión que le diga a Guido «listo para subir»)

1. `git status` limpio, sin archivos sin trackear que no sean a propósito (un `git add -A` levanta lo de la carpeta principal).
2. `node tools/audit.js --quiet`: 0 P0 y 0 P1. Incluye que los generadores estén al día y que ningún documento interno haya quedado en la raíz (`doc-interno-no-excluido`).
3. `?audit=1` en el preview: ningún «no cierra» nuevo.
4. `ASSET_V` subido una vez respecto de `origin/main` si cambió algo de `js/`, `css/` o `data/` (`node tools/publicar.mjs --ensayo` lo dice).
5. Si cambió `netlify.toml`, mirar sus reglas `[[redirects]]` (los 301 de `fuentes/`, `/club/` y `/liga/`) y que lo interno siga borrándose del artefacto (`Admin/`, `CLAUDE.md`, `auditorias/`, `Prototyping/`, `tools/`, `Generados/`).
6. **Un push junta todos los commits que haya.** El plan gratis limita los deploys: no se hace un push por commit; se acumulan y se pushea cuando Guido decide.

# Después del push (cuando Guido avise que subió)

Con `curl -I` contra la URL exacta (no `fetch` del navegador, que cachea):

- `https://financeofsports.com/` y `/club/boca-ar` devuelven 200.
- `https://financeofsports.com/CLAUDE.md`, `/Admin/` y `/tools/` devuelven 404. Si alguno da 200, es lo más urgente del proyecto: Netlify publica algo interno.
- Una URL vieja de `fuentes/<id-viejo>` redirige con 301 al id nuevo.
- Cargar el sitio con `?cb=<nuevo>` y mirar la consola: sin errores. En el hostname de producción corren Cloudflare Analytics, Mixpanel y el Worker de búsquedas; en local no.
- El estado del deploy: el conector de Netlify, si está disponible; si no, el panel de Netlify (lo mira Guido).

# Qué no se hace

Push, abrir un PR a `main`, ni recordar que hay commits sin publicar: «commiteado» y nada más.

## Cómo mantener esta skill

Si aparece un paso de antes o después del deploy que no está acá, proponele a Guido el texto exacto y esperá su ok.
