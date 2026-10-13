# osijek-hr — evidencia de carga

Lo que había como comentario en `data/hr/osijek-hr-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/hr/osijek-hr-data.js — Nogometni klub Osijek, sportsko dioničko društvo (Osijek,
Croacia). clubId 'osijek-hr' (sufijo de país, misma convención que dinamozagreb-hr/
hajduksplit-hr/rijeka-hr).

FUENTE: `Clubes/Croacia/Osijek/financijsko-izvjesce-2025.md` (transcripción OCR del
PDF — el PDF es un escaneo SIN capa de texto, `pdftotext`/`pdffonts` confirmaron 0
fuentes embebidas; la transcripción es OCR, no `pdftotext`). Es el informe COMBINADO
("Revidirani godišnji kombinirani financijski izvještaji za posebne namjene") que
integra NK Osijek s.d.d. (la sociedad) con FM 20 d.o.o. (20% del estadio Opus Arena) y
Škola nogometa NK Osijek (50% del estadio, la escuela de fútbol). Auditor: Werkmann
d.o.o., sin salvedades. Ejercicio fiscal = año CALENDARIO (1/1-31/12/2025).

OJO — LA TRANSCRIPCIÓN .md TIENE LAS TABLAS DE GASTOS Y BALANCE DESALINEADAS (el OCR
separó la columna de labels de la columna de números en bloques distintos, perdiendo
el orden fila-a-fila). Se re-verificó CADA número de este archivo contra imágenes
renderizadas directamente del PDF (`pdftoppm -r 300`, páginas 7 a 11) antes de cargar
nada — no se confió en el orden de líneas del .md para la tabla de Rashodi (pág. 8 del
documento) ni para la Bilanca (pág. 9-10). La tabla de Prihodi (pág. 7) y las notas 3-9
sí estaban bien alineadas en el .md y se usaron tal cual.

PRIHODI (ingresos) 2025, EUR exactos:
  Prihodi od ulaznica - Nacionalna natjecanja 1.134.206 (UEFA=0) → matchday_competition.
  Prihodi od ulaznica - Godišnje ulaznice 3.667 → season_tickets.
  Prihodi od ulaznica - Članarine 32.818 → member_dues.
  Prihod od sponzorstva i oglašavanja (Glavni sponzor na opremi 8.756.000 + Sponzor za
    stadion 348.688) → sponsorship_commercial, 9.104.688 combinado.
  Prihodi od prava emitiranja - Nacionalna natjecanja 855.600 → broadcasting.
  Komercijalni prihodi (Prodaja proizvoda 459.111 + Ostali nerazvrstani 743.893) →
    sponsorship_commercial, 1.203.004 combinado (mismo criterio que Dinamo Zagreb).
  Uefina klupska natjecanja - solidarne uplate 1.982.354 → competition_bonus (sin
    participación europea este ejercicio, solo pagos de solidaridad/no-participación).
  Ostali poslovni prihodi (Donacije nepovezanih strana 3.349.012 + Donacije/doprinosi
    povezanih strana 102.782 + Izvanredni prihodi 83.374 + Ostali nerazvrstani 958.516,
    este último desglosado en Nota 3: Bjelica nagodba 618.518 + Donacije 168.000 +
    Ostali 171.998) → other_income, 4.493.684 combinado.
  Ukupno - Prihodi (impreso, verificado exacto contra imagen del PDF pág. 7): 18.810.021.

RASHODI (gastos) 2025, verificados fila por fila contra la imagen renderizada de la
pág. 8 del PDF (el orden real es: Troškovi prodaje materijala=0 ambos años; Plaće
igrača 5.184.527 + Ostali 361.003 = Troškovi primanja igrača 5.545.530; Plaće
stručnog stožera 474.538; Plaće ostalih zaposlenika 3.032.037 + Porezi/doprinosi
1.678.020 + Ostali 158.601 = Trošak primanja ostalih zaposlenika 4.868.658;
Amortizacija dugotrajne materijalne imovine 1.145.578 (amortizacija nematerijalne
bez registracija = 0); Trošak imovine s pravom korištenja = 0 (2025); Troškovi
održavanja utakmica 1.085.017; Troškovi sponzorstva i oglašavanja 288.719; Troškovi
komercijalnih aktivnosti 1.190.487; Troškovi imovine i objekata 356.640; Troškovi za
nenogometne djelatnosti 1.769.335; Ostali nerazvrstani poslovni rashodi 2.264.797
(desglosado en Nota 4). Ukupno - poslovni rashodi (bez registracija) impreso:
18.989.299, suma de líneas de arriba verificada EXACTA.
  wages_squad = Troškovi primanja igrača + stručnog stožera = 6.020.068 (mismo criterio
    que dinamozagreb-hr: plantel + cuerpo técnico combinados).
  admin_general_expense = Trošak primanja ostalih zaposlenika (4.868.658, resto del
    personal no futbolístico) + Troškovi sponzorstva i oglašavanja (288.719) +
    Troškovi komercijalnih aktivnosti (1.190.487) + Troškovi imovine i objekata
    (356.640) + Troškovi za nenogometne djelatnosti (1.769.335) = 8.473.839 combinado.
    "Troškovi za nenogometne djelatnosti" (costos de actividades NO futbolísticas,
    probablemente ligadas a FM 20 d.o.o./el estadio) se mapeó acá por descarte —
    ninguna categoría específica encaja mejor y "costos NO deportivos" es exactamente
    la definición de admin_general_expense — ver duda en el reporte de carga.
  depreciation = Amortizacija dugotrajne materijalne imovine = 1.145.578 (la intangible
    sin registraciones fue 0 este año, no hay other_amortisation que cargar).
  match_organisation_expense = Troškovi održavanja utakmica = 1.085.017.
  other_expenses = Ostali nerazvrstani poslovni rashodi = 2.264.797 (Nota 4: Troškovi
    dugoročnog rezerviranja sudskih sporova 1.168.733 + Članarine udrugama 118.519 +
    Darovanja 94.283 + Ugostiteljski troškovi 276.373 + Prostojbe HNS 52.835 +
    Troškovi platnog prometa 52.742 + Ostalo 501.312).

SECCIÓN DE TRANSFERENCIAS DE JUGADORES (pág. 9 del PDF, "Ispunjava samo izvještajni
subjekt koji primjenjuje metodu kapitalizacije i amortizacije registracija igrača"):
Osijek NO amortiza pases este ejercicio (la fila de amortización queda en blanco, a
diferencia de Dinamo Zagreb que sí capitaliza/amortiza) — solo reporta resultado de
DISPOSICIÓN: Dobit od raspolaganja +1.517.889, Gubitak od raspolaganja -1.381.230,
Nekapitalizirani troškovi za naknade agentima/posrednicima -471.793. Netos en
`fiscalYearMeta.profitOnPlayerSales` = 1.517.889-1.381.230-0.471.793 = -0.335.134 (un
resultado NEGATIVO, mismo criterio que Dinamo Zagreb: el documento no da un ingreso
bruto de venta separado del costo, así que no hay línea limpia que promover).

RESULTADO FINANCIERO (netInterest): Financijski prihodi 357 - Financijski rashodi
  403.712 = -403.355 (impreso exacto: "Ukupno neto prihod/rashod od financiranja").
tax: Porezni prihod/(rashod) = 0 este ejercicio (2024 sí tuvo -40.754).

TIE-OUT FINAL (verificado exacto contra pág. 9 del PDF): revenue 18.810.021 - expenses
  18.989.299 + profitOnPlayerSales -335.134 + netInterest -403.355 + tax 0 = -917.767 =
  Dobit/(gubitak) poslije oporezivanja impreso EXACTO (mostrado como "(917.767)").

MONEDA: EUR. El documento no declara tipo de cambio propio (no hay Anexo de moneda
extranjera) — fxRef a FX_CLOSE 'EUR@2025-12-31' (fx=0.8511, cierre BCE 31/12/2025,
1 EUR = 1,1750 USD — ENTRADA NUEVA, todavía no existe en data/currency-map.js, ver
reporte de carga). La misma entrada la usa también slavenbelupo-hr (mismo ejercicio).

grossDebt: Bankovni i drugi zajmovi, corriente 0 (2025) + no corriente 11.470.126
  (Nota 9) = 11.470.126. cash: Novac i novčani ekvivalenti = 1.585.818. Ambos
  verificados contra la imagen del PDF (pág. 9-10), NO contra el orden del .md.

GESTIÓN: la Uprava vigente al firmar (Alexandra Vegh, desde 20.02.2026) asumió DESPUÉS
del cierre del ejercicio 2025 — no hay Uprava identificable con certeza para todo el
ejercicio 2025 en el documento (solo se lista el Nadzorni odbor, vigente desde
19.07.2024). gestionId: null, sin entrada en gestionesByClub (ya no es obligatorio,
ver club-or-year-onboarding SKILL.md sección 16).
============================================================================
```

_de data/clubs.js:_

```text
Tanda de 15 clubes nuevos (sesión 2026-09-25, "onboardear 20 transcripts al azar"): 2 más de
Croacia, 3 más de Dinamarca, 3 más de Bélgica (los 3 países ya venían de la tanda de arriba),
5 de Brasil (país ya cargado) y 2 de Argentina (país ya cargado). De los 20 candidatos
elegidos al azar, 3 resultaron dead-ends sin estados contables reales (Temperley: solo
Memoria narrativa sin balance; Belgrano: ídem; Palestino: solo un estado financiero
intermedio de 6 meses, sin P&L anual) y se reemplazaron por otros 3 (Botafogo-SP, Juventude,
Amazonas). Las 3 preguntas quedaron en Admin/dudas-por-club.md. brandColor: Wikipedia del
idioma del país primero (identidad), hex después (footylogos/teamcolorcodes/wikitext de kit
template) — ver el detalle por club en `Admin/sourcing/<País>/<Club>.md`.
```

_de data/club-leagues/hr.js:_

```text
Osijek/Slaven Belupo (onboarding sesión 2026-09-25, tanda de 20 transcripts al azar):
ejercicio calendario 2025, jugaron HNL completa ese año (Wikipedia, sin descenso).
```

## 2025

### Meta

```text
Dobit od raspolaganja dugotrajnom nematerijalnom imovinom (1.517.889) - Gubitak od
raspolaganja (1.381.230) - Nekapitalizirani troškovi za naknade agentima (471.793).
Osijek no amortiza pases este ejercicio (no capitaliza), ver comentario de cabecera.
Financijski prihodi(357) - Financijski rashodi(403.712).
grossDebt = Bankovni i drugi zajmovi (corriente 0 + no corriente 11.470.126, Nota 9).
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Ferenc Sakalj (2020-06-23 a 2026-02-20): Nombre correcto: Ferenc Sakalj (Szakály en húngaro), no Ivan; Ivan Meštrović fue su antecesor. Novi list 23/06/2020: comunicado del club, Meštrović deja la presidencia a su pedido y Sakalj (hasta entonces vicepresidente) es el nuevo presidente; index.hr (29/07/2020) dice que asumió 'en junio'. Se usa el 23/06/2020 (fecha del comunicado). Salida: comunicado del club, reproducido por Novi list, renuncia de común acuerdo con efecto 20/02/2026 (tras la derrota 0-2 con Hajduk según Index).
Alexandra Végh (2026-02-20 a hoy): Asume la presidencia de la Uprava el 20/02/2026; la tabla de la Uprava del informe 2025 dice 'Predsjednica Uprave 20.02.2026.-19.07.2028'. Firmó el balance 2025 el 20/03/2026.
Duda: Aviso para el campo firmo: el balance 2025 lo firmó Alexandra Végh (20/03/2026), que asumió después del cierre; al 31/12/2025 conducía Sakalj.
```

## Fuentes

### osijek-hr-financijsko-izvjesce-2025

_note (data/):_

```text
Balance auditado COMBINADO (NK Osijek s.d.d. + FM 20 d.o.o. + Škola nogometa NK Osijek, coproprietarios del estadio Opus Arena), preparado según el Pravilnik o licenciranju klubova de la HNS (11/2025). Auditor: Werkmann d.o.o., sin salvedades. El PDF es un escaneo sin capa de texto (transcripción OCR); las tablas de Rashodi y Bilanca del .md quedaron desalineadas por el OCR y se re-verificaron número por número contra imágenes del PDF antes de cargar. Transcripción completa en Clubes/Croacia/Osijek/financijsko-izvjesce-2025.md.
```
