# Perú — notas generales de sourcing

(Creado 2026-10-03, barrido 4 Sonnet.) Metodología probada y descartes a nivel país:

- **Pregunta guía**: ¿qué obligación de publicar tiene la figura jurídica? Perú: casi todos asociaciones civiles (sin obligación); Sporting Cristal/UCV/Los Chankas son S.A. cerradas (sin SMV); Universitario está bajo concurso INDECOPI; Alianza Lima es la excepción por publicación voluntaria.
- **Wayback CDX por dominio completo** (`web.archive.org/cdx/search/cdx?url=<dom>/*&matchType=domain&collapse=urlkey`, una consulta por vez): hecho para 14 dominios de clubes. Único positivo: `universitario.pe` (Memoria2018.pdf). El resto: 0 financieros. Dominios sin ninguna captura: cuscofc.pe, adtarma.com, adt.pe, clubdeportivomunicipal.com/.pe.
- **Universitario sí publica material financiero oficial como IMAGEN** (comunicados de auditoría BDO 2021 y 2023 en `universitario.pe/media/uploads/<año>/<mes>/<día>/*.jpg`): un `find` de PDFs no lo detecta; hay que leer las noticias institucionales/comunicados. Patrón replicable en otros clubes: buscar en la sección de noticias "comunicado" + "auditoría".
- **Canales de pago / no probados**: SUNARP (registro de personas jurídicas, de pago) y SUNAT (clave fiscal) → gestión de Guido. SMV/BVL: búsqueda web de Sporting Cristal sin rastro; no es emisor.
- Alianza Lima: pruebas de nombre de archivo 2018 y 2025 en `/static/media/uploads/transparencia/` = 404; el CDX solo archivó 2019/2020/2022/2023.
