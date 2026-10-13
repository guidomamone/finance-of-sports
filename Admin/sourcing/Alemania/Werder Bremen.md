# Werder Bremen (SV Werder Bremen)

- **Deporte**: Fútbol
- **Liga / competencia**: Bundesliga (Alemania, 1ª división)
- **Entidad legal**: SV Werder Bremen GmbH & Co. KGaA (HRB 21775 HB, Amtsgericht Bremen), fundada
  05/12/2003. Confirmado real filer (no exento) — tiene varias subsidiarias pequeñas (Werder Bremen
  Payment GmbH, Werder Bremen Merchandising GmbH) que SÍ están exentas bajo la garantía de la propia
  SV Werder Bremen GmbH & Co. KGaA (mismo mecanismo del §264 Abs.3/264b HGB que en Leverkusen/
  Wolfsburg, pero aplicado a subsidiarias menores, no a la entidad principal del club).
- **Canal**: `unternehmensregister.de`.

## Qué se bajó (sesión 2026-09-16/17)

**3 ejercicios**, `Clubes/Alemania/Werder Bremen/`, todos Konzernabschluss (consolidado):

- `konzernabschluss-2024-25.pdf` — cerrado 30/6/2025, 20 páginas.
- `konzernabschluss-2023-24.pdf` — cerrado 30/6/2024, 21 páginas.
- `konzernabschluss-2022-23.pdf` — cerrado 30/6/2023, 21 páginas.

## Serie disponible sin bajar

Unternehmensregister muestra 34 páginas de resultados para esta entidad — hay ejercicios anteriores
a 2022/23 sin confirmar en detalle ni descargar, por priorización de tiempo. Mismo procedimiento que
los 3 ya bajados: buscar "SV Werder Bremen GmbH & Co KGaA" en `unternehmensregister.de`.

## CARGADO al sitio (sesión 2026-09-22)

**Estado: CARGADO (Ejercicios 2023, 2024, 2025).** `clubId`: `werderbremen-de`. Datos en
`data/werderbremen-de-data.js`. Los 3 ejercicios son Konzernabschluss (consolidado del grupo) —
ese consolidado ES el total oficial de cada documento.

- **Tipo de cambio**: los 3 documentos declaran EUR y ninguno declara su propio tipo de cambio a
  USD (no es práctica habitual en cuentas alemanas). Se usa `fxRef` contra `FX_CLOSE`
  (`data/currency-map.js`): `EUR@2024-06-30` y `EUR@2025-06-30` ya existían; `EUR@2023-06-30`
  (fecha exacta 30/6/2023, confirmada en el propio documento) queda PENDIENTE — el orquestador de
  la carga de Alemania la agrega a `FX_CLOSE`.
- **Tie-out por ejercicio** (revenue+expenses+netInterest+tax vs. Konzernjahresüberschuss/
  -fehlbetrag impreso, en millones de EUR): 2023: -3,836673 calculado vs. -3,838160 impreso
  (diferencia ~1,49 mil EUR, por precisión TEUR del desglose de Umsatzerlöse tomado del
  Lagebericht narrativo). 2024: 2,186374 vs. 2,187061 impreso (diferencia ~0,69 mil EUR, mismo
  motivo). 2025: -7,420364 vs. -7,420336 impreso (diferencia ~28 EUR, además de una aproximación
  documentada en el desglose interno de resultado financiero/impuestos — ver comentario de
  cabecera de `data/werderbremen-de-data.js`, la tabla de GuV de este ejercicio llegó con columnas
  desalineadas en la transcripción PDF→Markdown).
- **Categorización**: "Umsatzerlöse" se desglosó Spielbetrieb/Werbung/mediale Verwertungsrechte/
  Transfer(-erlöse/-und Ausbildungsentschädigungen)/Handel usando el Konzernlagebericht narrativo
  de cada ejercicio (el Anhang 5.11 formal solo da un bolsón sin ese desglose). Handel →
  `sponsorship_commercial` (merchandising del club). Materialaufwand → `other_expenses` (no calza
  en ninguna categoría específica). Personalaufwand completo → `wages_squad` (el documento no
  separa plantel de administrativo). Abschreibungen se separó exacto en `player_amortisation`
  (derechos federativos) vs. `depreciation` (Sachanlagen) cruzando el Konzernanlagenspiegel.
- **Color de marca**: `#1D9053` (verde) — identidad verificada en Wikipedia
  (de.wikipedia.org/en.wikipedia.org: "Grün-Weiß" / "Die Grün-Weißen", verde es el color
  identificador, no ambiguo con blanco), el código hex exacto viene de bases de datos de marca
  (footylogos.com, brandpalettes.com, schemecolor.com) porque Wikipedia no publica un hex
  explícito en el texto. Verificado 2026-09-22.
- **Bundesliga confirmado los 3 ejercicios**: 2022/23 (13° puesto), 2023/24 (9° puesto), 2024/25
  (8° puesto) — Wikipedia (artículos "2022–23/2023–24/2024–25 SV Werder Bremen season").

- Último chequeo: 2026-09-22.
