# Bayern Munich (FC Bayern München)

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división)
- **Entidad legal**: FC Bayern München AG (mayoría en manos del FC Bayern München e.V., con Adidas,
  Audi y Allianz como socios minoritarios). No cotiza en bolsa, pero publica sus cifras cada año en
  la Jahreshauptversammlung (JHV, asamblea anual) vía comunicado propio.
- **Canal**: sitio propio del club, sección de descargas de la JHV (`fcbayern.com/binaries/content/
  assets/downloads/homepage/jhv/<año>/...`). Bloqueado por Akamai Bot Manager para `curl` directo —
  ver `fuentes/Alemania/_notas-generales.md` sección 3 para el método que sí funcionó (`fetch()`
  desde la consola de la página vía `javascript_tool`).

## Qué se bajó (sesión 2026-09-16/17)

**4 ejercicios**, `Clubes/Alemania/Bayern Munich/`:

- `jahresabschluss-2024-25.pdf` — 14 páginas, comunicado de la JHV 2025. Confirmado en la primera
  página: "FC Bayern München AG", Geschäftsjahr 2024/25 (1 julio 2024-30 junio 2025). Incluye
  Konzernabschluss (grupo, incluye Allianz Arena München Stadion GmbH y otras subsidiarias) y
  componentes del Einzelabschluss (sociedad individual) de la AG.
- `jahresabschluss-2023-24.pdf` — comunicado de la JHV 2024, mismo formato.
- `jahresabschluss-2020-21.pdf` — 2 páginas, comunicado de la JHV 2021. Confirmado: "Jahresabschluss
  der FC Bayern München AG – Konzern", Geschäftsjahr 2020/21 (1 julio 2020-30 junio 2021), con Bilanz
  completa (Aktiva/Passiva) al 30/6/2021 y cifras clave (Umsatz 643,9 Mio. Euro, EBITDA 98,4 Mio.,
  Jahresüberschuss 1,9 Mio. — año fuertemente golpeado por la pandemia).
- `presseinformation-jhv-2022-23.pdf` — 4 páginas, comunicado de la JHV 2023. También trae Bilanz
  completa (Aktiva/Passiva) del Konzern al 30/6/2023 — a diferencia de los dos ejercicios más
  recientes (2023/24, 2024/25) que son más bien un resumen de cifras clave con desglose de ingresos
  por rubro pero sin balance línea por línea — revisar el formato de cada año antes de extraer datos,
  no asumir que todos traen lo mismo.

## Verificación hecha en esta sesión

`pdftotext` de la primera página de cada PDF confirma "FC Bayern München AG" y el Geschäftsjahr
exacto en los 3 casos. El de 2022/23 además trae la Bilanz completa (Aktiva/Passiva) al 30/6/2023 en
millones de EUR.

## Mecanismo de descarga (para repetir en sesiones futuras)

`fcbayern.com` bloquea `curl`/WebFetch con 403 (Akamai). Lo que funcionó: abrir la página en el
Browser pane, y desde la consola (`javascript_tool`) ejecutar `fetch(<url del PDF>)`, convertir la
respuesta a base64 (`btoa` sobre los bytes) y decodificar afuera con un script Python — ver
`_notas-generales.md` sección 3 para el detalle completo. Las URLs de los PDF de años recientes se
encuentran con WebSearch (`fcbayern.com jhv/<año> jahresabschluss pdf`), no hay un índice único
navegable fácilmente.

## Pendiente para una sesión futura

Confirmados por WebSearch pero no descargados (por priorización de tiempo, no por bloqueo técnico):
- `jahresabschluss_konzern_20_21.pdf` (JHV 2021, Geschäftsjahr 2020/21) — SÍ se descargó, ver arriba
  bajo un nombre; confirmar que no falte duplicar.
- Años 2015/16 a 2018/19: URLs candidatas encontradas por WebSearch
  (`jahresabschluss_konzern_16-17.pdf`, `jahresabschluss_ag_16-17.pdf`, `jahresabschluss_ag_18-19.pdf`
  en `fcbayern.com/binaries/content/assets/downloads/homepage/jhv/` sin subcarpeta de año) — no se
  llegaron a bajar esta sesión.
- Un mirror de un newsletter externo (`fcb-newsletter.yum.de`) que tenía el ejercicio 2019/20 dejó de
  resolver (dominio caído) durante esta sesión — no reintentar por ese lado, buscar la URL directa en
  `fcbayern.com` en su lugar.

- Último chequeo: 2026-09-17.
