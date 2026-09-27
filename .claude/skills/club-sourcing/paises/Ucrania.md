# Ucrania — no es un registro mercantil, es la ley de contabilidad la que obliga a publicar

Sourcing puro de datos financieros públicos, sin ninguna interacción con los clubes. El registro
estatal ucraniano (`usr.minjust.gov.ua`) es solo de identidad, no sirve balances. **SMIDA** (НКЦПФР,
el regulador de valores) sí es un canal real, pero solo aplica a los 2 clubes que son sociedades
anónimas (Veres ПАТ, Shakhtar ПрАТ) — el resto son ТОВ (LLC), estructuralmente fuera de SMIDA.
Último chequeo: 2026-09-18.

- **El canal que de verdad abrió el país fue el art. 14 de la Ley ucraniana de Contabilidad**: toda
  empresa "mediana"/"grande" (sea cual sea su forma jurídica) debe publicar su estado financiero
  auditado en SU PROPIO SITIO WEB — no un mandato de licencia deportiva como Croacia/Italia/Países
  Bajos/Portugal, sino una obligación de derecho contable general que resulta aplicar igual a
  clubes de fútbol. Con esto, 11 de 16 clubes de la UPL 2025/26 quedaron con datos reales.
  - **Polissya dio la serie más larga (9 ejercicios, 2016-2024)** — via Google Drive/SharePoint, no
    el sitio del club directo.
- **3 dead-ends de disclosure sin explicación técnica** (Dynamo Kyiv, Zorya, Kryvbas): a diferencia
  de la mayoría de la liga, que sí publica por el art. 14, estos 3 no tienen ninguna sección
  financiera ni señal de bloqueo — candidatos directos para reach-out (ver `Admin/dudas-por-club.md`).
- **Un bloqueo de tooling real, no de disclosure**: Oleksandriya (`fco.com.ua`) da 403 incluso con
  browser real, pero Google confirma que el documento existe (indexado) — distinto de un dead-end
  genuino, vale la pena reintentar con otro método (mirror, caché de Google, Wayback) en una sesión
  futura.
- **Formato nuevo que obligó a tocar el `.gitignore`**: SK Poltava publica su balance como
  fotos/escaneos JPG en vez de PDF — mismo criterio que TIFF/XHTML/DOCX/XML de otros países,
  documento fuente crudo queda local sin importar el formato exacto.
- **Gotcha de identidad societaria, mismo patrón que Bélgica/Rusia**: Obolon comparte sitio y
  patrocinio con la cervecera homónima ПрАТ "ОБОЛОНЬ" — no confirmado si el PDF encontrado es del
  club de fútbol o de la empresa, verificar antes de cargar (duda abierta).

Con este país se completa el barrido de las 30 mejores ligas del mundo por consenso general (18
países nuevos sourceados en orden alfabético, Arabia Saudita salteada a pedido de Guido por
sospecha de dead-end estructural sin confirmar).
