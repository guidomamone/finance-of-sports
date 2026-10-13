**Ángulos**: sitio oficial: agotado (menú completo + tags/balance revisados, narrativa sin PDF) ·
Wayback CDX: agotado (131 PDFs del dominio completo revisados hasta 2026, ninguno financiero) ·
búsqueda web: agotado (sin resultados nuevos) · regulador/país: bloqueo (IGJ exige clave fiscal AFIP
paga, gestión de Guido, no intentar) — 2026-09-26

# Platense

- Sin PDFs oficiales encontrados. Sitio oficial: cap.org.ar. Solo publica el Estatuto y el Reglamento
  de Comicios como PDFs públicos. Notas propias del club confirman superávit de ~$1.001M ARS en el
  balance del Ejercicio N°119 (jul-2023 a jun-2024), aprobado 30/10/2024, pero sin el PDF del balance
  en sí (el Estatuto exige que esté disponible para consulta de socios, probablemente solo en sede).
- Pendiente: todos los ejercicios — convocatoria a Asamblea 2025 (Ejercicio N°120) ya anunciada para
  oct-2025, reintentar ahí.
- Contacto: Oficina de Socios, (54-11) 4791-4748 / WhatsApp +54 9 11 3691-7156, Juan Zufriategui 2021,
  Vicente López — cap.org.ar/oficina-de-socios/.

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

- **Resultado: 0 documentos.** El sitio (cap.org.ar) documenta con precisión el número de cada ejercicio aprobado — "Aprobado en forma unánime el Ejercicio N° 115" (2020), "Aprobado con superávit el Ejercicio Contable N° 117" (2022), "El balance del Ejercicio N° 118 fue aprobado con un nuevo superávit para el club" (2023) — pero **ninguno de los posts adjunta el PDF**; se abrieron los 3. Wayback: 56 PDFs archivados en el dominio, ninguno con nombre de balance/memoria/ejercicio. La numeración (115 = 2019-20, 117 = 2021-22, 118 = 2022-23) es un dato útil para pedirle al club ejercicios concretos.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — reconfirmado, candidato a mail

- **Wayback CDX del dominio completo (`cap.org.ar`, `matchType=domain`), repetido hoy hasta 2026**:
  131 PDFs en total (75 más que en el chequeo del 22, el dominio siguió subiendo cosas), revisados
  todos por nombre — protocolos, gacetillas, fichas médicas, manual de marca, ninguno financiero.
  Confirma el "0 documentos" anterior con un índice más completo, no lo contradice.
- **Búsqueda web** (`filetype:pdf` + nombre + "balance"/"estados contables") no trajo nada nuevo —
  los resultados son genéricos (documentos de otras entidades con "estados contables" en el nombre).
- `cap.org.ar/tags/balance/` (no visitado en el chequeo anterior): solo un post de 2015, sin PDF
  adjunto. No agrega nada.
- **Candidato a mail (to-do 51)**: el club confirma PÚBLICAMENTE, en sus propios posts oficiales, el
  número exacto y el resultado (superávit) de 4 ejercicios consecutivos (115, 117, 118, próximamente
  119/120) sin adjuntar nunca el PDF — mismo patrón que Independiente/Banfield/Atlanta en
  `club-sourcing` 0.3 ("documento confirmado que existe pero no está descargable en ningún canal
  digital"). Vale la pena pedirle al club el PDF de cualquiera de esos ejercicios ya aprobados
  (115, 117, 118, 119) directamente — el numeral exacto ya está confirmado, así que el pedido puede
  ser específico en vez de genérico.
- Último chequeo: 2026-09-26.
