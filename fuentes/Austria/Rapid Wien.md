# SK Rapid Wien

- **Deporte**: Fútbol
- **Liga / competencia**: ADMIRAL Bundesliga (Austria, 1ª división)
- **Entidad legal**: dos entidades conviven en el mismo Geschäftsbericht — `SK Rapid` (el Verein,
  la asociación madre) y `SK Rapid GmbH` (Gerhard-Hanappi-Platz 1, 1140 Wien, editora/Herausgeber del
  reporte), que opera el plantel profesional. El propio informe trae un balance CONSOLIDADO de
  ambas entidades además de los balances individuales de cada una — no hizo falta elegir una sola
  entidad como en Hamburger SV (Alemania), el club mismo ya presenta las tres vistas juntas.
- **Canal**: sitio propio (`skrapid.at/geschaeftsbericht-2/`) — la mejor fuente de todo el barrido de
  Austria, comparable a RB Leipzig en Alemania. Rapid fue el PRIMER club de la Bundesliga austríaca
  en publicar un Geschäftsbericht escrito (desde 2013), y lo publica tradicionalmente diez días antes
  de la Asamblea General Ordinaria.

## Qué se bajó (sesión 2026-09-17)

**13 PDF, serie ININTERRUMPIDA de 15 ejercicios: 2010/11 hasta 2024/25** (el ejercicio 30/6 de cada
año), `Clubes/Austria/Rapid Wien/`, todos con capa de texto real (no escaneos) — incluyen Bilanz
consolidada, Erläuterungen, GuV consolidada, y además Bilanz + GuV separadas para "SK Rapid (Verein)"
y para "SK Rapid GmbH":

- `geschaeftsbericht-2024-25.pdf` — 01/07/2024-30/06/2025. Erlöse (ingresos) USD/EUR 61.420.918,
  primera vez que el club supera los €60M; Jahresergebnis nach Steuern €23.404 (positivo).
- `geschaeftsbericht-2023-24.pdf`
- `geschaeftsbericht-2022-23.pdf` — Umsatz ~€49,63M-€… (ver detalle en el PDF), Eigenkapital
  récord €21,36M según prensa citada en la sesión.
- `geschaeftsbericht-2021-22.pdf`
- `geschaeftsbericht-2020-21.pdf`
- `geschaeftsbericht-2019-20.pdf`
- `geschaeftsbericht-2018-19.pdf`
- `geschaeftsbericht-2017-18.pdf`
- `geschaeftsbericht-2016-17.pdf`
- `geschaeftsbericht-2015-16.pdf`
- `geschaeftsbericht-2014-15.pdf`
- `geschaeftsbericht-2013-14.pdf`
- `geschaeftsbericht-2010-11-2012-13.pdf` — un solo PDF que cubre los 3 ejercicios 2010/11, 2011/12 y
  2012/13 juntos (el primer Geschäftsbericht que publicó el club, antes de pasar a edición anual).

## Verificación hecha en esta sesión

Se abrió el índice (`Inhaltsverzeichnis`) del reporte 2024/25 con `pdftotext -layout`: confirma
capítulo "3. ZAHLEN, DATEN & FAKTEN" con subsecciones 3.1 Konsolidierte Bilanz, 3.2 Erläuterungen zur
Bilanz, 3.3 Konsolidierte Gewinn-und-Verlust-Rechnung, 3.4 Erläuterungen zur GuV, 3.5 Bilanz SK Rapid
(Verein), 3.6 GuV SK Rapid (Verein), 3.7 Bilanz SK Rapid GmbH, 3.8 GuV SK Rapid GmbH — el desglose
más completo encontrado en todo el barrido de Austria. Herausgeber (editor) confirmado: "SK Rapid
GmbH, Gerhard-Hanappi-Platz 1, 1140 Wien". Se verificó además con `pdftotext` que el PDF más viejo
(2010-2013) y el de 2013/14 también tienen capa de texto real, no son escaneos.

## Mecanismo de descarga (para repetir en sesiones futuras)

`skrapid.at/geschaeftsbericht-2/` (aceptar/rechazar el banner de cookies de Usercentrics primero —
se usó "Deny"/rechazar no esenciales) lista los últimos 3 ejercicios como pestañas visibles, pero el
DOM completo de la página (`document.querySelectorAll('a')` filtrando por `.pdf`) trae los 13 links
completos, incluyendo los años que no se ven sin scrollear/clickear. Los archivos viven en 2 CDN
distintos: `assets.skrapid.at/media/...` (la mayoría) y `res.cloudinary.com/sk-rapid/...` (el más
reciente, 2024/25) — ambos sirven el PDF directo con `curl`, sin necesitar user-agent especial.

- Último chequeo: 2026-09-17.
