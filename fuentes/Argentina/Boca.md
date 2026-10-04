# Boca Juniors

**Ángulos**: sitio oficial: agotado — vistazo rápido 2026-09-26 (`club/presupuesto` sigue mostrando
los mismos 2 documentos ya cargados, Presupuesto 2026-27 y Balance Ejercicio 121 2024-25; nada de
Ejercicio 122 2025-26 todavía, esperable recién ~oct-2026) · Wayback CDX: **parcial — Ejercicios 118
y 119 encontrados el 2026-09-26 y CARGADOS al sitio el 2026-09-28 (to-do 73, ver abajo), pero
2018/2019/2021/2024 siguen sin aparecer en el dominio** · búsqueda web: agotado — vistazo rápido
2026-09-26 (prensa confirma que no hubo asamblea de balance nueva desde oct-2025) · regulador/país:
no aplica — 2026-09-26

## Chequeo 2026-09-26 (tarde) — Wayback CDX sobre el dominio completo, 4 documentos nuevos

Barrido de la CDX API de `bocajuniors.com.ar` con `matchType=domain` (>100.000 URLs archivadas,
nunca corrido antes para este club porque se lo daba por "ya muy sourceado" — ver nota vieja de
Ángulos arriba, que estaba mal). Encontró 4 PDFs reales colgando de `/rebrand/files/`, una ruta que
no tiene ningún nombre obvio en el sitio vivo de hoy y que ningún intento anterior había adivinado:

- Memoria y Estados Contables, **Ejercicio N° 118 (cerrado 30/06/2022)** —
  `https://www.bocajuniors.com.ar/rebrand/files/EECC_30525418835_2022.pdf`, snapshot del
  2023-01-01 (`web.archive.org/web/20230101024644/...`). Período confirmado abriendo la portada del
  PDF, no solo por el nombre de archivo. Escaneado (sin capa de texto, `pdffonts` solo muestra
  Helvetica no embebida), 101 páginas. Copia local en
  `Clubes/Argentina/Boca/eecc-30525418835-2022.pdf`. **CARGADO al sitio (to-do 73, 2026-09-28,
  Ejercicio 2022)**: transcripto con Mistral OCR, categorizado y verificado — las 12 líneas de
  Recursos y las 18 de Gastos suman EXACTO los totales impresos pág. 32 ($14.279.912.579 /
  $13.669.793.975 / $461.837.755 de superávit). Ver `sources['boca-balance-2021-22']` en
  `data/clubs.js` y el comentario de cabecera de `data/boca-data.js`.
- Memoria y Balance, **Ejercicio N° 119 (cerrado 30/06/2023), firmado** —
  `https://www.bocajuniors.com.ar/rebrand/files/balance_01_07_22_al_30_06_23_firmado.pdf`, snapshot
  del 2023-11-11. Período confirmado igual, abriendo la portada. Escaneado, sin capa de texto en
  absoluto (`pdffonts` no lista ninguna fuente), 128 páginas. Copia local en
  `Clubes/Argentina/Boca/balance-01-07-22-al-30-06-23-firmado.pdf`. **CARGADO al sitio (to-do 73,
  2026-09-28, Ejercicio 2023)**: mismo criterio que 2022, suma EXACTO contra los totales impresos
  pág. 61 ($26.178.273.845 / $27.795.138.995 / $1.022.382.735 de superávit, con resultado financiero
  positivo por RECPAM que revierte un resultado antes del efecto financiero deficitario). Ver
  `sources['boca-balance-2022-23']` en `data/clubs.js`.
- Presupuesto Económico Financiero y de Inversiones, **Ejercicio N° 119 (jul-2022 a jun-2023)** —
  `https://www.bocajuniors.com.ar/rebrand/files/presupuesto_22_23_completo.pdf`, snapshot del
  2023-01-01. Con capa de texto real (confirmado con `pdftotext`, no hace falta OCR), 39 páginas.
  Copia local en `Clubes/Argentina/Boca/presupuesto-22-23-completo.pdf`.
- Presupuesto Económico Financiero y de Inversiones, **Ejercicio N° 120 (jul-2023 a jun-2024)** —
  `https://www.bocajuniors.com.ar/rebrand/files/presupuesto_23_24_completo.pdf`, snapshot del
  2023-10-02. Con capa de texto real, 40 páginas. Copia local en
  `Clubes/Argentina/Boca/presupuesto-23-24-completo.pdf`.

Se probó también `presupuesto_final_24_25.pdf` (mismo directorio, patrón de nombre consistente): la
única captura archivada es un 404 (snapshot 2025-04-06) — nunca se llegó a archivar un 200 real de
ese archivo.

**Con esto, de los balances que faltaban (2018, 2019, 2021, 2022, 2023, 2024), quedan resueltos
2022 y 2023** (Ejercicios 118 y 119, pendientes solo de OCR — Guido lo va a correr por su cuenta).
**Siguen sin aparecer en el dominio**: 2018, 2019, 2021 y 2024 — no se encontraron ni con este
barrido completo, probablemente porque nunca vivieron en `bocajuniors.com.ar` (el balance 2025
actual, por ejemplo, cuelga de un Google Drive externo, no del dominio propio) o Wayback nunca los
crawleó. Wayback CDX para este club ya no está "agotado" en el sentido de la escalera de 0.1 — vale
la pena reintentarlo periódicamente por si se archiva algo nuevo, y probar el mismo patrón de
directorio (`/rebrand/files/<nombre>.pdf`) con nombres candidatos para los años que faltan.

## Chequeo 2026-09-26 — vistazo rápido, sin novedades (club ya extensamente sourceado)

Tarea liviana pedida explícitamente (Boca ya tiene presupuesto 2027 y balance 2025 reales
cargados). Reconfirmado `bocajuniors.com.ar/club/presupuesto`: sigue linkeando únicamente el
Presupuesto Ejercicio 123 (2026-27) y la Memoria y Balance del Ejercicio N° 121 (jul-2024 a
jun-2025) — los dos ya cargados en el sitio, sin nada nuevo. Búsqueda de prensa confirma el mismo
estado: la Asamblea de Representantes aprobó Ejercicio 121 el 29/10/2025 (superávit $35.581M,
patrimonio neto $316.270M) y el presupuesto 2025-26 en jun-2025; nada sobre un balance de Ejercicio
122 (jul-2025 a jun-2026) — coincide con lo ya anotado abajo: ese balance recién se aprueba en la
asamblea de octubre siguiente al cierre, o sea ~oct-2026. **Nada que cargar todavía, volver a mirar
en esa fecha.**

- Presupuesto Económico, Financiero y de Inversiones, Ejercicio N° 123 (jul-2026 a jun-2027) — PDF subido directamente, ya cargado en el sitio (Ejercicio 2027). Transcripción completa (37 páginas, palabra por palabra) en Clubes/Argentina/Boca/presupuesto-26-27.md (Versión 30).
- Memoria y Balance auditado, Ejercicio N° 121 (jul-2024 a jun-2025) — https://www.bocajuniors.com.ar/club/presupuesto (linkea a un Drive) — ya cargado en el sitio (Ejercicio 2025), balance real, no presupuesto. Copia local en finance-of-sports/Clubes/Argentina/Boca/Memoria y Balance 2024-25.pdf.
- Presupuestos y balances oficiales — https://www.bocajuniors.com.ar/club/presupuesto — la página solo linkea el presupuesto vigente y el balance más reciente (los dos ya cargados arriba), no un archivo histórico. Los balances de 2018, 2019, 2021, 2022, 2023 y 2024 siguen pendientes de encontrar y cargar.
- Presupuesto Ejercicio 2025/26 (jul-2025 a jun-2026, el año que falta entre los dos ya cargados) — investigado en la Versión 32, sin PDF oficial encontrado todavía. Nota oficial del club (sin PDF adjunto): https://www.bocajuniors.com.ar/noticias/aprobado ("Más obras y superávit", 5/6/2025). Cobertura de prensa con cifras (no verificada fuente por fuente): fenix951.com.ar, soyboca.com.ar/2025/06/05/presupuesto_aprobado_mas_obras_y_superavit.html, cholilaonline.ar, mundogremial.com, lanumero12.com.ar — coinciden en ingresos ≈$171.000 M ARS, egresos ≈$168.000 M ARS, superávit proyectado ≈USD 2 M. El balance auditado REAL de este ejercicio probablemente no esté disponible hasta la asamblea de aprobación (Boca aprueba el balance del ejercicio anterior en octubre siguiente al cierre — este ejercicio cerró jun-2026). Volver a buscar en oct/nov-2026.
- Color de marca: `#0A2B5C` — **es el único de los 39 hexes del sitio que NO salió literal de
  ninguna fuente externa, y no hay que citarlo como si viniera de una.** Sale del `--azul`
  histórico del propio finance-of-sports, el azul con el que se construyó el sitio alrededor de
  Boca, su primer club. Las dos fuentes consultadas en la Versión 178 daban navys de ESCUDO casi
  negros, que no se llevaban con el círculo de iniciales del selector: #182A4E (footylogos,
  re-verificado el 2026-09-21 en la tabla de la Liga Profesional Argentina, que lista #F9BB31 como
  segundo color) y #222E46. La capa 1 no está en discusión —Boca es azul y oro, con predominancia
  del azul—, así que lo que se descartó fue el HEX y no la identidad: es el caso que el skill
  describe como "si el hex de la fuente no cae en la familia de la capa 1, se descarta el hex, no
  la fuente". Tampoco se aceptó el del sitio oficial, que son grises de Webflow. Si algún día el
  club declara un azul de MARCA (no el del escudo), reemplaza a este sin discusión. Revisado
  2026-09-21.
