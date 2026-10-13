# Almirante Brown

**Ángulos**: sitio oficial: agotado (menú completo — club.php/comision.php/historia.php/socios.php/
prensa.php/noticias.php —, sitio PHP a medida, no WordPress, `wp-json` da 404; convocatoria a
Asamblea N°181 confirma Memoria+Balance+Inventario+Ganancias y Pérdidas del ejercicio 1/7/24-30/6/25
CON informe de auditor contable, sin PDF adjunto) · Wayback CDX: agotado (8 PDFs en todo el dominio,
ninguno financiero: estatuto e instructivos de pago) · búsqueda web: agotado (`filetype:pdf` sin
resultados del club) · regulador/país: no aplica (Argentina, sin canal gratuito documentado) ·
prensa: confirma existencia y aprobación (El Nacional de Matanza, asamblea 4/9/2026 aprobó Memoria y
Balance del ejercicio 2024-25, sin cifras publicadas) · barrido: 2 (Sonnet) — 2026-09-26

- Sin PDFs de balance encontrados. Sitio oficial: almirantebrown.org.ar. Índice completo de Wayback
  Machine del dominio: 8 PDFs, ninguno financiero (estatuto, instructivos de pago/débito automático,
  un folleto de beneficios). Prensa local (El Nacional de Matanza) confirma asamblea del 4/9/2026
  que aprobó Memoria y Balance del ejercicio 1/7/2024-30/6/2025, pero sin PDF adjunto en ningún
  canal oficial.
- Pendiente: todos los ejercicios.
- Contacto: administracion@almirantebrown.org.ar, sede Entre Ríos 3255, San Justo (L-V 10-17:30h).
- Último chequeo: 2026-09-12.

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

- **Resultado: 0 documentos.** Ni el sitio vivo ni el índice de Wayback Machine del dominio tienen un PDF, Drive o visor embebido con balance/memoria/estados contables.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — escalera completa (barrido 2, Sonnet)

Se corrió la escalera completa de `club-sourcing` 0.1 a fondo, no solo el barrido mecánico del
2026-09-22:

- **Familia 1 (sitio oficial)**: `almirantebrown.org.ar` es un sitio PHP a medida (no WordPress —
  `wp-json/wp/v2/search` devuelve 404 de hosting, no JSON vacío), con menú completo: Institucional,
  Comisión Directiva, Historia, Socios, Educación, Pagos, Prensa, y las secciones de noticias por
  disciplina. Se abrieron `club.php`, `socios.php`, `prensa.php` y el detalle de la última
  convocatoria a asamblea (`detail.php?not=1143`, publicado 2026-08-24): **Convocatoria a Asamblea
  General Ordinaria N°181** para el viernes 4/9/2026, con orden del día que incluye "Lectura de
  Memoria, Balance, Inventario y cuentas de Ganancias y Pérdidas del Ejercicio cerrado el 30 de Junio
  de 2025" e "Informe de Auditor Contable" — o sea, el balance existe y está auditado, pero ningún
  PDF cuelga de esa página ni de `socios.php`/`club.php`/`prensa.php` (los únicos PDFs ahí son
  estatuto e instructivos de pago, ya conocidos).
- **Familia 3 (Wayback CDX, dominio completo)**: reconfirmado, 8 PDFs en todo `almirantebrown.org.ar`
  desde siempre, ninguno financiero (estatuto, 2 instructivos de pago, 2 rutas 404 con nombre de PDF
  que nunca resolvieron). Sin cambios respecto al 2026-09-22.
- **Familia 4 (búsqueda web dirigida)**: `filetype:pdf` con "Almirante Brown" + balance/memoria +
  2025 no trae ningún documento del club (solo resultados de otras instituciones que comparten
  palabras).
- **Familia 5 (prensa, confirmación)**: El Nacional de Matanza cubrió la asamblea en dos notas
  (7/9/2026 y 12/9/2026): "Almirante Brown aprobó la Memoria y el Balance del último ejercicio"
  (Memoria y Balance del ejercicio 1/7/2024-30/6/2025, aprobados por mayoría el 4/9/2026, con
  consagración de nuevos socios vitalicios). Ninguna de las dos notas cita cifras concretas del
  balance.
- **Conclusión — candidato a mail (0.3)**: documento CONFIRMADO que existe (auditado, aprobado en
  asamblea), pero no está descargable en ningún canal digital del club. Pedirle a la Comisión
  Directiva (administracion@almirantebrown.org.ar) que suba/comparta el PDF de la Memoria y Balance
  del Ejercicio 2024-25 ya aprobado es de bajo costo para el club y alto valor esperado. No se
  encontró ningún PDF nuevo para descargar en esta sesión.
- Último chequeo: 2026-09-26.
