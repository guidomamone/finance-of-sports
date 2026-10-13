# Independiente Rivadavia (Mendoza)

**Ángulos**: sitio oficial: agotado (dominio nuevo identificado, `csir.com.ar` — sección
Institucional/Prensa completa revisada vía WebFetch: Historia, Fundación, Comunidad, Sedes,
Reserva, Inferiores, Prensa/Noticias, footer legal — sin balance/memoria/estados
contables/transparencia en ningún lado) · Wayback CDX: agotado (0 PDFs archivados en `csir.com.ar`
Y en `independienterivadavia.com.ar`) · búsqueda web: agotado (0 resultados, sin mención de prensa
de ninguna asamblea o balance de este club) · regulador/país: no aplica — 2026-09-26

- Sin PDFs oficiales encontrados. **Dominio actualizado 2026-09-26: el sitio oficial vigente es
  `csir.com.ar`** (Institucional/Prensa, sin balance). `independienterivadavia.com.ar` (el dominio
  con el que se venía trabajando, hecho en Framer, casi puramente promocional/deportivo) sigue
  resolviendo con 200 también — no quedó claro si es un mirror del mismo club o un sitio de
  terceros; en cualquier caso ninguno de los dos tiene sección institucional con balance.
- Pendiente: todos los ejercicios.
- Contacto: formulario en independienterivadavia.com.ar/contacto (sin email público), tel. 0261
  429-4794, Av. Boulogne Sur Mer 688, Mendoza.

## Chequeo 2026-09-22 — barrido automatizado, sin hallazgo

Se corrió el barrido de 4 pasos descrito en `_notas-generales.md` ("Metodología — barrido
automatizado 2026-09-22") sobre el dominio oficial de este club: (1) home + rutas institucionales
típicas + `?s=balance`/`?s=memoria+y+balance`/`?s=estados+contables`, (2) `wp-json/wp/v2/search`
con `balance`, `memoria y balance`, `contable` y `asamblea`, (3) `sitemap_index.xml`/`sitemap.xml`/
`wp-sitemap.xml`, (4) segundo nivel: abrir cada página cuyo slug contenga
balance/memoria/contable/ejercicio/asamblea/transparencia/gestión y buscar en su HTML `href`, `src`
y `data-src` a `.pdf`, Drive, `docs.google.com/viewer|gview`, Issuu, Scribd, Calaméo o Dropbox. Se
sumó el índice COMPLETO de PDFs del dominio en la CDX API de Wayback Machine
(`matchType=domain&filter=original:.*\.pdf`), que detecta archivos que nunca estuvieron linkeados
desde una página viva.

- **Resultado: 0 documentos.** `independienterivadavia.com.ar` devuelve **HTTP 404 en la raíz** (el dominio resuelve pero la home no existe: sitio en migración o movido). Wayback: 0 PDFs archivados. Buscar el dominio nuevo antes de volver a intentar.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — sesión de sourcing puro, dominio nuevo encontrado, dead-end confirmado

El 404 en la raíz de `independienterivadavia.com.ar` reportado el 2026-09-22 resultó transitorio:
hoy responde 200 de nuevo. Pero WebSearch encontró el dominio que el club usa como oficial ahora:
**`csir.com.ar`** (aparece en resultados de búsqueda con el mismo texto de contacto — Boulogne Sur
Mer 688, Mendoza — que ya teníamos anotado, y `independienterivadavia.com.ar` aparece marcado como
"no oficial" en algunos resultados).

Revisado `csir.com.ar` a fondo con WebFetch: menú Club (Historia, Fundación, Comunidad, Sedes,
Reserva, Inferiores) + Prensa (Noticias, Acreditaciones) + footer legal (privacidad, cookies,
protección de datos, defensa del consumidor) — **sin ningún link a balance, memoria, estados
contables ni transparencia**. CDX de Wayback sobre `csir.com.ar` (dominio completo): 0 PDFs
archivados nunca.

Búsqueda web dirigida (`"Independiente Rivadavia" "estados contables"`, `asamblea "memoria y
balance"`) no trajo NINGÚN resultado sobre este club — ni un PDF, ni una nota de prensa de una
asamblea, ni una mención de balance. A diferencia de San Martín (Tucumán) o Atlético Tucumán, acá
no hay ni siquiera confirmación de que el documento exista.

**Resultado: dead-end real, 0 señal — próximo club, sin mail** (criterio 0.3). Actualizar el
dominio de referencia a `csir.com.ar` de acá en más. Revisar de nuevo sin fecha fija, como
cualquier dead-end de esta lista.
- Último chequeo: 2026-09-26.
