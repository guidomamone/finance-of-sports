# Argentina — el sitio oficial del club; la IGJ bloqueada; la CNV para los clubes que emiten deuda

1. **El sitio oficial de cada club, primero.** Los barridos de Primera División (27 clubes) y Primera Nacional (36) buscaron
   solo en el dominio oficial, o en un link que el dominio oficial comparta directo (Google Drive o Dropbox embebido en una
   noticia). El hosting chico argentino suele estar caído o bloquear la conexión: antes de descartar, probar la MISMA URL en
   Wayback (CDX). Qué se encontró y qué falta de cada club: `fuentes/_indice/Argentina.md` y `fuentes/Argentina/<Club>.md`.
2. **La IGJ (Inspección General de Justicia) no la puede consultar un agente.** Exige clave fiscal AFIP nivel 2 o más, con
   costo: es una gestión de Guido (sección 0.3), no un dead-end de sourcing. Documentar el club como bloqueado por IGJ y
   seguir con el próximo.
3. **La CNV, para los clubes que emiten deuda.** Un club que emitió una Obligación Negociable es emisor regulado y publica sus
   estados contables en la AIF (Autopista de Información Financiera) de la CNV, un canal oficial. River lo es desde febrero
   de 2025 y al inscribirse subió varios ejercicios históricos. Ficha pública, sin login:
   `https://www.cnv.gov.ar/SitioWeb/Empresas/Empresa/<CUIT>` → "Información Financiera" → "Estados Contables". La descarga
   se hace con curl en 3 pasos, sirve para cualquier CUIT y está en `fuentes/Argentina/River.md`. Antes de dar por cerrado un
   club grande, fijarse si emitió una ON.
4. **Reddit no rinde en Argentina.** Rinde en países angloparlantes y no en Latinoamérica.
