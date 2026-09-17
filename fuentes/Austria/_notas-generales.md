# Notas generales de Austria (Österreichische Bundesliga)

Primer barrido de Austria (sesión 2026-09-17), segundo país nuevo de la lista de las 30 mejores
ligas del mundo (orden alfabético) tras Alemania — Arabia Saudita quedó saltada a pedido de Guido.
Los 12 clubes de la Bundesliga 2025/26 (confirmados por Wikipedia antes de arrancar): SK Puntigamer
Sturm Graz, FC Red Bull Salzburg, LASK, FK Austria Wien, SK Rapid Wien, TSV Hartberg, WSG Tirol, SCR
Altach, SV Ried, Wolfsberger AC (RZ Pellets WAC), Grazer AK (GAK), FC Blau-Weiß Linz.

## 1. Firmenbuch austríaco — SÍ existe un canal tipo Companies House, pero PAGO + LOGIN, no gratis

A diferencia de Alemania (`unternehmensregister.de`, 100% gratis y sin login), el Firmenbuch
austríaco vive en `justizonline.gv.at` y tiene una barrera de DOS pisos:

1. **La búsqueda de la empresa y sus datos básicos SÍ son gratis y sin login** (razón social,
   dirección, capital, representantes, fecha de constitución, Stichtag del ejercicio).
2. **Pero ver siquiera la LISTA de documentos depositados (Jahresabschlüsse) ya requiere login**
   ("Please log in to receive a list of available documents" — con ID Austria), y descargar el
   documento en sí es un servicio pago aparte (un extracto simple cuesta desde €4,89; el documento
   completo del Jahresabschluss no se pudo tasar porque ni la lista se pudo ver sin loguearse). Esto
   es la MISMA clase de barrera que el OMPIC marroquí (sección 8 del skill de sourcing) — un agente
   no puede crear una cuenta ID Austria ni pagar, así que este canal queda BLOQUEADO para el
   documento completo. Confirmado con `FC Red Bull Salzburg GmbH` (FN 452749h) el 2026-09-17.

**El hallazgo que sí sirve, y es 100% gratis sin login**: `evi.gv.at` ("Elektronische
Verlautbarungs- und Informationsplattform des Bundes", el Amtsblatt digital de Austria desde
1/7/2023) republica el ÍNDICE de eventos del Firmenbuch de cada sociedad — incluye una entrada
"JAb eingereicht" (Jahresabschluss eingereicht) con la fecha exacta de cada depósito anual, para
CUALQUIER sociedad (GmbH o AG), sin login. Es el equivalente austríaco a mirar el historial de
`filing-history` de Companies House SIN poder abrir el PDF: confirma QUE existe un ejercicio
depositado y CUÁNDO, pero no da acceso al contenido. URL: `evi.gv.at/f/<Firmenbuchnummer>`. Se probó
además clickear cada evento "JAb eingereicht" por si expandía el documento — no lo hace, es puramente
un índice de fechas. Confirmado dead-end de acceso al documento en sí, incluso para la única
Aktiengesellschaft de la liga (FK Austria Wien AG) pese a que la home de evi.gv.at promete
"Jahresabschlüsse von Aktiengesellschaften" entre sus contenidos — en la práctica es el mismo evento
de índice, no el documento.

Se probaron además 3 portales comerciales de terceros (no oficiales) buscando un atajo:
`firmenabc.at` (es un directorio tipo páginas amarillas, sin Bilanzen), `firmenbuch.ai` (SÍ muestra
un resumen de 2 cifras gratis — ej. Bilanzsumme/Bilanzgewinn de FC Red Bull Salzburg 2025 — pero el
resto de la página, incluyendo "Unternehmensdokumente" y "Finanzberichte", está detrás de un muro
"Premium erforderlich" con datos de ejemplo falsos de relleno). Ninguno de los tres sirve como
atajo real al documento completo.

## 2. El canal que SÍ funciona a nivel de LIGA COMPLETA: Finanzkennzahlen de la Österreichische
## Fußball-Bundesliga — el equivalente austríaco del DFL Finanzkennzahlen alemán

Igual que la DFL en Alemania (ver `fuentes/Alemania/_notas-generales.md` sección 2), el reglamento
de licencias de la Österreichische Fußball-Bundesliga (ÖFBL) OBLIGA a todos los clubes de las DOS
divisiones profesionales (ADMIRAL Bundesliga + ADMIRAL 2. Liga, 24 clubes en total) a reportar los
datos clave de su Jahresabschluss auditado al 30.06 para publicación agregada — sin importar forma
jurídica (aplica igual a la única AG, Austria Wien, que a las GmbH y a los e.V. que no escindieron
nada, si los hubiera). La ÖFBL publica un PDF anual de 1 página, **"Veröffentlichung der
Konzern-/Jahresabschlussdaten"**, con una FILA POR CLUB (de ambas divisiones) y columnas: Anlage- y
Umlaufvermögen, Eigenkapital, Fremdkapital, Erträge, Personalaufwand, Jahresergebnis nach Steuern,
Zahlungen an Agenten/Spielervermittler — en TEUR.

- **Descargado el histórico completo disponible en `oefbl.at/de/geschaeftsberichte`: 8 ejercicios
  consecutivos, 2017/18 a 2024/25**, en `Clubes/Austria/_Bundesliga-Finanzkennzahlen/`
  (`veroeffentlichung-klub-ja-<ejercicio>.pdf`). Todos con capa de texto real (no escaneos),
  1 página cada uno salvo el de 2019/20 (varias páginas, formato distinto).
- Esta es, para los clubes SIN disclosure propio más profundo (los 10 de los 12 que no son Rapid ni,
  parcialmente, Austria Wien — ver abajo), la ÚNICA fuente pública real con cifras auditadas
  desglosadas por club. Mismo rol que cumple el DFL Finanzkennzahlen para los 5 e.V. puros y los 2
  exentos alemanes.
- La ÖFBL también publica un "Geschäftsbericht" anual propio (70 páginas, narrativo — deporte, fans,
  infraestructura, organización, comunicación), con serie completa 2009/10-2024/25 en la misma
  página. NO se bajó esta serie: es un informe de LIGA (marketing/institucional), no cuentas anuales
  de los clubes — mencionado acá por si una sesión futura lo necesita, URLs disponibles en
  `oefbl.at/de/geschaeftsberichte`.

## 3. SK Rapid Wien — el mejor hallazgo del país, comparable a RB Leipzig en Alemania

Único club de los 12 con Geschäftsbericht propio, completo, descargable directo, con capa de texto
real y serie ininterrumpida 2010/11-2024/25 (15 ejercicios en 13 PDF, el más viejo agrupa 3 años).
Incluye BALANCE CONSOLIDADO + balance separado del Verein (SK Rapid) + balance separado de la GmbH
(SK Rapid GmbH) — el desglose más completo de todo el barrido de Austria. Ver
`fuentes/Austria/Rapid Wien.md`.

## 4. FK Austria Wien — la única Aktiengesellschaft de la liga, pero sin PDF propio descargable

A diferencia de Rapid, Austria Wien NO publica un Geschäftsbericht propio como PDF standalone
descargable (se probó `fk-austria.at/fileadmin/redaktion/downloads/2020_21/
Geschaeftsbericht2020_Austria-Wien.pdf`, encontrado en una noticia de 2020: da 404 y no tiene
snapshot en Wayback Machine). En cambio, publica sus "Finanzkennzahlen" como TEXTO dentro de notas
de prensa propias en `fk-austria.at/news/...` — con cifras reales (Bilanzdaten + GuV) para varios
ejercicios (2021/22, 2022/23, 2023/24 confirmados así). Estas cifras coinciden con las de la tabla
agregada de la ÖFBL. Ver `fuentes/Austria/Austria Wien.md`.

## 5. Los otros 10 clubes — Firmenbuch confirmado (vía evi.gv.at, gratis) pero sin PDF propio

Para RB Salzburg, Sturm Graz, LASK, Hartberg, WSG Tirol, Altach, Ried, WAC, GAK y Blau-Weiß Linz se
confirmó la entidad legal exacta (GmbH del fútbol profesional, todas con Stichtag 30.6) y su
historial de depósitos en `evi.gv.at` (fechas de "JAb eingereicht" reales, no adivinadas) — pero
NINGUNO tiene un Geschäftsbericht propio descargable como el de Rapid. Su única fuente de cifras
reales es el agregado de la ÖFBL (sección 2). Ver el archivo de cada club en `fuentes/Austria/` para
el detalle (FN, direcciones, fechas de depósito confirmadas).

- **SK Sturm Graz** tiene una historia societaria más enredada que el resto: la entidad operativa
  actual (`SK Sturm Wirtschaftsbetriebe GmbH`, FN 161421i) absorbió a `SK Sturm Sportbetriebe GmbH`
  (fusión de 2017) y más recientemente a `SK Sturm sales & communication GmbH` (fusión inscripta
  08.01.2025) — ver `fuentes/Austria/Sturm Graz.md` para el detalle. Además Sturm publica un
  "SturmEcho Report" anual (el más reciente, 24/25, es del club campeón esa temporada) pero SOLO como
  flipbook de Calameo sin opción de descarga habilitada por el editor — se puede leer online, no
  archivar como PDF.
- **RB Salzburg**: el socio único es `FC Red Bull Salzburg` (el Verein, ZVR 909741108) — NO es una
  filial 100% de Red Bull GmbH como sociedad controlante directa (a diferencia de RB Leipzig, donde
  el socio único SÍ es Red Bull GmbH) — no aplica ninguna exención por garantía de socio corporativo
  como pasa en Alemania con Leverkusen/Wolfsburg. Sin disclosure propio más allá del agregado ÖFBL.

## Cómo mantener esta nota

Si en el futuro se consigue destrabar el Firmenbuch (ej. Guido decide pagar y loguearse él mismo con
su propio ID Austria para bajar un Jahresabschluss puntual), actualizar la sección 1 en vez de
dejarla como "bloqueado". Si aparece un Geschäftsbericht propio nuevo de alguno de los 10 clubes sin
fuente propia, agregar su archivo en `fuentes/Austria/<Club>.md` y sacarlo de la lista de la
sección 5.

- Último chequeo: 2026-09-17.
