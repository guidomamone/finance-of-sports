# Huracán

**Ángulos**: sitio oficial: agotado (44 PDFs archivados entre cahuracan.com + admin/admin2/admin3,
ninguno financiero) · Wayback CDX: agotado (mismo resultado, dominio completo con subdominios) ·
búsqueda web: agotado (sin resultados) · regulador/país: no aplica — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: cahuracan.com (y subdominio admin.cahuracan.com).
  Solo publica comunicados narrativos de asamblea sin adjuntos — confirma que se aprobó Memoria y
  Balance 2022/23 y el presupuesto anual, pero sin link a documento.
- Pendiente: todos los ejercicios.
- Contacto: socios@cahuracan.com (Departamento de Socios), WhatsApp +54 9 11 5060-1908.

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

- **Resultado: 0 documentos.** El post "Comunicado Oficial: Asamblea General" (`cahuracan.com/noticias/comunicado-oficial-asamblea-general`) informa que se aprobó la memoria y balance por 40 votos sobre 53 asambleístas, sin adjuntar nada. Wayback: 0 PDFs archivados en todo el dominio. Ojo al buscar en prensa: hay varios "Club Huracán" homónimos en Argentina (San Antonio de Areco, Ingeniero White, Corrientes, Blanca Grande) cuyas asambleas ensucian cualquier búsqueda web — filtrar siempre por Parque Patricios/CABA.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — escalera completa, dead-end confirmado

**Gotcha de arquitectura que invalida parte del chequeo anterior**: `cahuracan.com` (el dominio raíz)
ya NO es el sitio WordPress que asumía el barrido del 2026-09-22 — es un frontend Next.js (SPA) que
devuelve HTTP 200 con el mismo shell genérico para CUALQUIER ruta, incluida una inventada al azar
(`cahuracan.com/esto-no-existe-asdkjhaskdjh` → 200, mismo `<title>` y casi el mismo tamaño de
respuesta que `institucional/balance`). O sea: un chequeo de rutas por código HTTP en este dominio no
sirve para nada, cualquier ruta "existe". El WordPress real que alimenta el sitio vive en
`admin.cahuracan.com` (con más instancias legacy en `admin2.cahuracan.com/new/` y
`admin3.cahuracan.com`, encontradas vía CDX) y SÍ tiene `wp-json/wp/v2/search` funcional.
- Con esa REST API real: búsqueda de `balance`, `memoria y balance`, `estados contables`, `asamblea`
  y `ejercicio` sobre `admin.cahuracan.com` — ningún post con PDF/Drive adjunto de un balance real,
  solo comunicados narrativos (2013, 2015, 2017, 2019, 2020, 2021, 2023, 2024) confirmando que se
  votó/aprobó el balance en asamblea, nunca con cifras ni documento. Revisado el HTML completo de los
  4 comunicados de asamblea más recientes (2019, 2021, 2023, 2024): 0 links a `.pdf` o
  `drive.google.com` en el cuerpo de ninguno.
- Búsqueda en `wp-json/wp/v2/media` (que encuentra adjuntos aunque no estén linkeados en ningún post)
  con los mismos términos: solo imágenes/JPG de campañas de comunicación ("BALANCE INFERIORES",
  "MEMORIA EN MARCHA") y un `Balance.zip` de 2012 sin relación con estados contables.
- Wayback CDX sobre el DOMINIO COMPLETO `cahuracan.com` (`matchType=domain`, que en la práctica cubre
  `admin.`/`admin2.`/`admin3.` como subdominios) con filtro `.pdf`: 44 PDFs archivados en total,
  ninguno de balance/memoria/estados contables — son estatutos, protocolos de género, padrones de
  socios, actas de comisión fiscalizadora y avales de listas electorales.
- Búsqueda web dirigida (`filetype:pdf` + nombre + balance/estados contables + año): sin resultados
  relevantes, solo noticias deportivas.
- **Conclusión: dead-end real, sin mail.** No hay ninguna confirmación de prensa/asamblea con cifras
  concretas (a diferencia de Atlanta) — solo "se aprobó por N votos", que no alcanza como señal fuerte
  de que valga la pena escribirle al club todavía. Revisar de nuevo sin fecha fija.
- Último chequeo: 2026-09-26.
