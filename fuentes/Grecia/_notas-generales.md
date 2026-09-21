# Grecia — notas generales de sourcing

Noveno país nuevo de la lista de "30 mejores ligas del mundo" recorrida en orden alfabético (sesión
2026-09-17), después de Alemania, Austria, Bélgica, China, Corea del Sur, Croacia, Dinamarca y
Francia. Confirmados los 14 clubes de la Super League Greece 2025/26 vía Wikipedia: AEK Athens,
A.E. Kifisia, AEL Larissa, Aris Thessaloniki, Asteras Tripolis, Atromitos, Levadiakos, OFI Crete,
Olympiacos, Panathinaikos, Panetolikos, Panserraikos, PAOK y Volos NFC.

## El canal: ΓΕΜΗ (Γενικό Εμπορικό Μητρώο), el mejor registro del proyecto junto con Bélgica/Dinamarca

**`publicity.businessportal.gr` resultó gratis, sin login, sin captcha y descargable directo con
`curl`** — al mismo nivel que la Centrale des bilans belga (skill sección 14) y la
Erhvervsstyrelsen danesa (sección 18), y mejor que Companies House UK en un aspecto: sirve el PDF
completo (balance + cuenta de resultados + anexo + informe de auditor, todo en un solo depósito o en
varios documentos del mismo ejercicio) sin ningún paso intermedio.

- **Búsqueda**: el buscador de la home (`publicity.businessportal.gr`) acepta razón social,
  denominación comercial, ΑΦΜ (CUIT griego) o número de ΓΕΜΗ, con autocompletado. Cada resultado
  trae directo el número de ΓΕΜΗ, el ΑΦΜ y el estado (Ενεργή = activa / Λύση-Εκκαθάριση = en
  liquidación / Διαγραφή = borrada del registro).
  - **Gotcha de UI, no del dato**: el campo de búsqueda es un componente con estado que a veces NO
    se re-dispara solo al escribir después de un `navigate()` de vuelta a la home — hay que limpiar
    el campo con el botón "x" y volver a hacer click en la lupa para forzar el re-fetch. Sin este
    paso el dropdown puede mostrar resultados de la búsqueda ANTERIOR aunque el texto tipeado ya sea
    otro.
  - **Navegar directo por URL funciona**: `publicity.businessportal.gr/company/<número de ΓΕΜΗ>`
    abre la ficha de la sociedad sin pasar por el buscador — más rápido que repetir el flujo de
    búsqueda cuando ya se conoce el número.
  - **Buscar por la razón social LEGAL, no por el nombre de fantasía del club** (mismo gotcha que
    Alemania/Corea del Sur, secciones 12 y 16 del skill): "ΠΑΕ ΟΛΥΜΠΙΑΚΟΣ" es el título comercial,
    la razón social real es "ΟΛΥΜΠΙΑΚΟΣ ΣΥΝΔΕΣΜΟΣ ΦΙΛΑΘΛΩΝ ΠΕΙΡΑΙΩΣ ΠΟΔΟΣΦΑΙΡΙΚΗ ΑΝΩΝΥΜΗ ΕΤΑΙΡΙΑ". El
    buscador SÍ indexa el "Διακριτικός Τίτλος" (nombre comercial) además de la razón social, así que
    buscar "ΠΑΕ <CLUB>" funciona la mayoría de las veces — pero no siempre (ver Panathinaikos,
    Panetolikos y Panserraikos abajo, donde hubo que iterar el término).
  - **Varios clubes tienen más de una entidad con nombre parecido**: una vigente (Ενεργή) y una o
    más en liquidación (Λύση-Εκκαθάριση) de una versión anterior de la ΠΑΕ, tras una quiebra y
    re-fundación societaria — mismo patrón que Aarhus Elite→AGF en Dinamarca, pero acá el cambio es
    de PERSONA JURÍDICA completa, no solo de nombre. Elegir siempre la entidad "Ενεργή" para las
    cuentas más recientes; la(s) entidad(es) en liquidación pueden tener sus propias cuentas
    históricas depositadas (no se investigó en esta sesión, ver "Pendiente" abajo). Confirmado en
    AEK (la ΠΑΕ vieja con ΓΕΜΗ 330501000 está "Λύση-Εκκαθάριση", la activa es ΓΕΜΗ 131260660000,
    fundada 2013 tras el descenso administrativo del club), AEL Larissa (dos entidades viejas en
    liquidación además de la activa NOVIBET) y Panserraikos (la ΠΑΕ "1964" en liquidación, la activa
    es la ΠΑΕ "1946" fundada 2020).
- **La sección "Οικονομικές καταστάσεις" de la ficha de cada empresa** es un acordeón colapsado por
  default — hay que hacer click en el heading para expandirlo antes de que los links a PDF aparezcan
  en el DOM. Lista TODOS los depósitos de balance del historial completo de la sociedad, cada uno
  con la fecha de cierre de ejercicio.
  - **Descarga directa por API, sin sesión**: cada link es
    `/api/download/financial/<id>?companyId=<ΓΕΜΗ>` — sirve el PDF con `curl` sin cookies ni headers
    especiales. Confirmado con más de 240 PDFs bajados esta sesión, ningún 403/401.
  - **Rate limit real, hay que espaciar las descargas**: un `curl` sin pausa entre requests devolvió
    `429 Too Many Requests` (HTML, no PDF) después de ~10 descargas seguidas en Olympiacos. La vuelta
    que funcionó: `sleep 1.3-1.5` segundos entre cada descarga. Con esa pausa, cero 429 en el resto
    de la sesión (~230 PDFs más).
  - **Duplicados frecuentes con nombre de archivo casi idéntico**: muchos depósitos aparecen 2-3
    veces con el mismo nombre de archivo pero un prefijo de timestamp (`20250123-010855-...`) — son
    RE-SUBIDAS del mismo documento (probablemente una corrección de metadata del portal, no del
    contenido). Confirmado por tamaño en bytes idéntico en varios casos (AEK 2025, AEL 2023) — se
    bajó solo la primera copia de cada una para no duplicar en el repo.
  - **El criterio de cuántos archivos por ejercicio varía club por club**: algunos depositan un solo
    PDF combinado (balance+resultado+anexo+dictamen todo junto — ej. Panetolikos, PAOK), otros
    depositan 3-5 archivos separados por ejercicio (informe de auditor, acta de directorio, balance,
    estado de resultados, anexo ELP por separado — ej. AEL Larissa, Atromitos, OFI Crete, Volos). Se
    bajaron todos los archivos de cada ejercicio disponible en cualquiera de los dos casos.
- **Profundidad histórica real, no uniforme por club**: varía según cuándo se fundó la entidad legal
  ACTUAL de cada club (varias son refundaciones post-quiebra, no la sociedad original) y desde
  cuándo GEMI empezó a exigir el depósito digital (aprox. 2015-2016 para las sociedades más
  antiguas). Panathinaikos y Olympiacos tienen la serie más larga encontrada (10 ejercicios,
  2016-2025); Kifisia y Panserraikos la más corta (4-5 ejercicios) porque sus entidades actuales
  recién se fundaron en 2021 y 2020 respectivamente.

## Otros canales revisados

- **HFF (Hellenic Football Federation, `epo.gr`)**: tiene una sección "Οικονομικά Στοιχεία Π.Α.Ε."
  (`epo.gr/Default.aspx?a_id=48940`, encontrada por WebSearch) — no se llegó a abrir/evaluar en
  detalle esta sesión, con GEMI ya cubriendo los 14 clubes no hizo falta. Pendiente confirmar si
  agrega algo que GEMI no tenga (ej. un agregado de liga entera tipo DFL/ÖFBL/DNCG) — ver
  "Pendiente" abajo.
- **Super League Greece (la liga en sí)**: no se encontró ningún informe financiero agregado de la
  liga (tipo Deloitte/DFL/ÖFBL) en esta sesión — no se buscó exhaustivamente, foco puesto en GEMI
  que ya resolvía los 14 clubes uno por uno.
- **Sitio propio de cada club**: no se revisó sistemáticamente club por club esta sesión (GEMI ya
  daba series largas y confiables sin necesidad de cruzar con el sitio propio) — a diferencia de
  Austria (Rapid Wien) o Croacia, donde el sitio del club fue el canal principal. Pendiente para una
  sesión futura si se quiere buscar profundidad adicional o un resumen en inglés más legible para
  prensa.

## Pendiente / ideas para retomar

1. Confirmar si `epo.gr` (HFF) publica algo agregado que complemente los huecos de GEMI (ver huecos
   por club abajo).
2. Revisar las entidades "en liquidación" de AEK, AEL Larissa y Panserraikos por si tienen depósitos
   propios de ejercicios anteriores a la refundación — ampliaría la serie histórica de esos 3 clubes
   más atrás del arranque de la entidad actual.
3. Ningún club de esta lista quedó sin datos reales — a diferencia de China/Corea del Sur, Grecia dio
   cobertura completa de los 14 clubes con documentos oficiales reales.

- Último chequeo: 2026-09-17.
