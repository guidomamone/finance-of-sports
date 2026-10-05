# Ucrania — no es un registro mercantil, es la ley de contabilidad la que obliga a publicar

Sourcing puro de datos financieros públicos, sin ninguna interacción con los clubes. El registro
estatal ucraniano (`usr.minjust.gov.ua`) es solo de identidad, no sirve balances. **SMIDA** (НКЦПФР,
el regulador de valores) solo sirve para sociedades anónimas, y no para todas: Veres (ПАТ) sí;
Shakhtar (ПрАТ) solo tiene avisos de asamblea ahí y publica en su sitio. El resto son ТОВ (LLC),
estructuralmente fuera de SMIDA.
Último chequeo: 2026-09-18.

- **El canal que de verdad abrió el país fue el art. 14 de la Ley ucraniana de Contabilidad**: toda
  empresa "mediana"/"grande" (sea cual sea su forma jurídica) debe publicar su estado financiero
  auditado en SU PROPIO SITIO WEB — no un mandato de licencia deportiva como Croacia/Italia/Países
  Bajos/Portugal, sino una obligación de derecho contable general que resulta aplicar igual a
  clubes de fútbol. Con esto, 14 de 16 clubes de la UPL 2025/26 quedaron con datos reales.
  - **Polissya dio la serie más larga (9 ejercicios, 2016-2024)** — via Google Drive/SharePoint, no
    el sitio del club directo.
- **Antes de dar por cerrado un club, buscar en el menú "Клуб" una página "Документація"**, no solo
  "Фінансова звітність": Dynamo Kyiv la tiene en `fcdynamo.com/pages/40`, sin enlace desde la
  portada, y se lo había dado por dead-end. Esa página reemplaza el año anterior cada vez: los
  viejos, por Wayback. Shakhtar publica 2018-2025 en
  `shakhtar.com/club/official-information/financial-statements/` (`.ashx` que bajan con curl).
  Siguen sin nada Zorya y Kryvbas (candidatos a mail, ver `Admin/dudas-por-club.md`).
- **Oleksandriya (`fco.com.ua`) da 403 a todo acceso automatizado, Browser pane incluido (bloqueo
  de IP), pero el CDX de dominio completo recupera 2019-2025**
  (`wp-content/themes/fco/files/fin_zvit_<año>.pdf`): un sitio bloqueado no es dead-end mientras
  Wayback lo tenga.
- **Formato nuevo que obligó a tocar el `.gitignore`**: SK Poltava publica su balance como
  fotos/escaneos JPG en vez de PDF — mismo criterio que TIFF/XHTML/DOCX/XML de otros países,
  documento fuente crudo queda local sin importar el formato exacto.
- **Gotcha de identidad societaria, mismo patrón que Bélgica/Rusia**: Obolon comparte sitio y
  patrocinio con la cervecera homónima ПрАТ "ОБОЛОНЬ"; los PDF son de ТОВ ФК «ОБОЛОНЬ». La entidad
  se confirma por la carátula, no por el dominio.

Con este país se completa el barrido de las 30 mejores ligas del mundo por consenso general (18
países nuevos sourceados en orden alfabético, Arabia Saudita salteada a pedido de Guido por
sospecha de dead-end estructural sin confirmar).
