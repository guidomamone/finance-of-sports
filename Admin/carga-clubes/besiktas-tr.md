# besiktas-tr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/besiktas-tr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Beşiktaş: alta por tools/alta-club.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2023.pdf. brandColor #000000
(procedencia en Admin/sourcing/Turquía/Beşiktaş.md; tools/cargar-lote.mjs).
```

```text
data/tr/besiktas-tr-data.js — Beşiktaş Futbol Yatırımları Sanayi ve Ticaret A.Ş. (Turquía).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-20), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2023.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "besiktas-tr" — slug de "Beşiktaş" + '-tr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Beşiktaş Futbol Yatırımları Sanayi ve Ticaret A.Ş." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): Nombre legal del alta (Claude, Sonnet): besiktas-futbol-bilanco-31-05-2009.
  displayName        ok        "Beşiktaş" — nombre de la carpeta del club en Clubes/
  country            ok        "TR" — carpeta de país "Turquía" (tabla PAISES)
  reportingCurrency  ok        "TRY" — moneda de curso legal de Turquía
  fiscalYearStart    ok        "06-01" — cierre del ejercicio: nombre del archivo (2023-05-31) y contenido del .md (277 de 281 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 120 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2023-05-31" — año del ejercicio + mes de cierre (nombre del archivo (2023-05-31) y contenido del .md (277 de 281 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-20): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "TRY" — moneda de curso legal de Turquía (tabla PAISES de alta-club.mjs)
  fx                 pendiente null — el .md menciona tipo de cambio y dólar con números en 6 línea(s), pero ninguno es una cotización plausible
  fxRef              ok        "TRY@2023-05-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 20.6632. --escribir agrega 'TRY@2023-05-31' a FX_CLOSE
  sourceId           ok        "besiktas-tr-futbol-bilanco-31-05-2023" — clubId + nombre del archivo en slug
  liga               ok        "tr-superlig" — roster cacheado de "2022–23 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş"

FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2023: {"reportType":"official_balance_sheet","currency":"TRY","fxRef":"TRY@2023-05-31","sourceId":"besiktas-tr-futbol-bilanco-31-05-2023"}
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lisanslı ürün satış gelirleri | pág. 48, Jev 1 |
| 2 | Maç hasılatları ve kombine kart loca geliri | pág. 48, precedente |
| 3 | Sponsorluk ve reklam geliri | pág. 48, Jev 1 |
| 4 | İsim ve lisans hakkı gelirleri | pág. 48, Jev 0.96 |
| 5 | Yayın gelirleri | pág. 48, Jev 1 |
| 6 | UEFA gelirleri | pág. 48, precedente |
| 7 | Futbolcu kiralama ve yetiştirme gelirleri | pág. 48, precedente |
| 8 | Diğer | pág. 48, precedente |
| 9 | Satıştan iadeler (-) | pág. 48, Jev 0.99 |
| 10 | Satış iskontoları / indirimleri (-) | pág. 48, Jev 0.99 |
| 11 | Konusu kalmayan karşılıklar | pág. 50, Jev 1 |
| 12 | Esas faaliyetlerden kur farkı gelirleri | pág. 50, Jev 1 |
| 13 | Esas faaliyetlerden diğer gelirler (*) | pág. 50, Jev 0.99 |
| 14 | Yatırım faaliyetlerinden gelirler | pág. 10, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti | pág. 48, precedente |
| 2 | Ücret giderleri | pág. 48, Jev 0.99 |
| 3 | Maç giderleri | pág. 48, Jev 1 |
| 4 | Seyahat giderleri | pág. 48, Jev 1 |
| 5 | Futbolcu kiralama giderleri | pág. 48, precedente |
| 6 | Federasyon giderleri | pág. 48, precedente |
| 7 | Malzeme giderleri | pág. 48, precedente |
| 8 | Diğer giderler | pág. 48, Claude 0.85 |
| 9 | Personel ücret ve giderleri | pág. 48, Claude 0.8 |
| 10 | Lojistik hizmet gideri | pág. 48, precedente |
| 11 | Yemek giderleri | pág. 48, precedente |
| 12 | Kargo ve nakliye giderleri | pág. 48, precedente |
| 13 | Ambalaj malzemesi giderleri | pág. 48, precedente |
| 14 | Reklam ve ilan giderleri | pág. 48, Jev 1 |
| 15 | Tanıtım, fuar ve sergi giderleri | pág. 48, Jev 0.97 |
| 16 | Web yayın giderleri | pág. 48, Claude 0.8 |
| 17 | Haberleşme giderleri | pág. 48, Jev 1 |
| 18 | Diğer | pág. 48, Jev 0.96 |
| 19 | Müşavirlik, dava ve icra noter giderleri | pág. 49, Jev 0.98 |
| 20 | Personel ücret ve giderleri | pág. 49, Claude 0.8 |
| 21 | Şüpheli alacak karşılık giderleri | pág. 49, Jev 0.98 |
| 22 | Vergi resim ve harçlar | pág. 49, Jev 1 |
| 23 | Amortisman ve tükenme/itfa payları | pág. 49, Jev 0.9 |
| 24 | Danışmanlık giderleri | pág. 49, Jev 1 |
| 25 | Haberleşme giderleri | pág. 49, Jev 1 |
| 26 | Kargo ve nakliye giderleri | pág. 49, precedente |
| 27 | Diğer giderler | pág. 49, Claude 0.85 |
| 28 | Esas faaliyetlerden kur farkı giderleri | pág. 50, precedente |
| 29 | Dava karşılık giderleri | pág. 50, precedente |
| 30 | Esas faaliyetlerden diğer giderler | pág. 50, Claude 0.85 |
| 31 | Vade farkı gideri | pág. 50, Jev 0.92 |
| 32 | Amortisman ve tükenme payları (futbolcu lisansları, nota 12) | pág. 39, precedente |
| 33 | Amortisman ve tükenme payları (maddi duran varlıklar ve kullanım hakkı) | pág. 32, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 129587090. Regla de CONVENCIONES-DATOS (línea de depreciación y amortización junta, se parte con las notas, votación 3 a 0, 2026-10-20). Las tres filas 'Amortisman ve tükenme payları' del estado (143.340.662 + 9.331.442 + 687.806) suman 153.359.910 = total de la nota de segmentos; la nota 12 da la amortización de derechos de futbolistas y lo demás es de bienes de uso y derechos de uso
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 23085014. Corrección: las filas del estado con esa etiqueta son 143.340.662 (costo de servicios) y 9.331.442 (marketing) = 152.672.104; la tercera (687.806, gastos de administración, 'Amortisman ve tükenme/itfa payları') queda aparte. Resto = 152.672.104 - 129.587.090
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = player_amortisation. derechos de futbolistas (nota 12), parte de la amortización junta
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = depreciation. bienes de uso y derechos de uso, resto de la amortización junta
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2022–23 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın gelirleri | pág. 55, precedente |
| 2 | Lisanslı ürün satış gelirleri | pág. 55, precedente |
| 3 | Maç hasılatları ve kombine kart loca geliri | pág. 55, precedente |
| 4 | Futbolcu kiralama ve yetiştime gelirleri | pág. 55, precedente |
| 5 | Sponsorluk ve reklam geliri | pág. 55, precedente |
| 6 | İsim ve lisans hakkı gelirleri | pág. 55, precedente |
| 7 | UEFA gelirleri | pág. 55, precedente |
| 8 | Diğer | pág. 55, precedente |
| 9 | Satıştan iadeler(-) | pág. 55, precedente |
| 10 | Satış iskontoları / indirimleri (-) | pág. 55, precedente |
| 11 | Konusu kalmayan karşılıklar (*) | pág. 57, precedente |
| 12 | Esas faaliyetlerden kur farkı gelirleri | pág. 57, precedente |
| 13 | Esas faaliyetlerden diğer gelirler | pág. 57, precedente |
| 14 | Yatırım faaliyetlerinden gelirler | pág. 11, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti | pág. 55, precedente |
| 2 | Ücret giderleri | pág. 55, precedente |
| 3 | Amortisman ve tükenme payları | pág. 55, precedente |
| 4 | Maç giderleri | pág. 55, precedente |
| 5 | Futbolcu kiralama giderleri | pág. 55, precedente |
| 6 | Seyahat giderleri | pág. 55, precedente |
| 7 | Federasyon giderleri | pág. 55, precedente |
| 8 | Malzeme giderleri | pág. 55, precedente |
| 9 | Yatırım amaçlı gayrimenkul avansları için gider karşılığı | pág. 55, precedente |
| 10 | Diğer giderler | pág. 55, precedente |
| 11 | Personel ücret ve giderleri | pág. 55, precedente |
| 12 | Kira giderleri | pág. 55, precedente |
| 13 | Lojistik hizmet gideri | pág. 55, precedente |
| 14 | Amortisman ve tükenme payları | pág. 55, precedente |
| 15 | Yemek giderleri | pág. 55, precedente |
| 16 | Kargo ve nakliye giderleri | pág. 55, precedente |
| 17 | Ambalaj malzemesi giderleri | pág. 55, precedente |
| 18 | Web yayın giderleri | pág. 55, precedente |
| 19 | Tanıtım, fuar ve sergi giderleri | pág. 55, precedente |
| 20 | Reklam ve ilan giderleri | pág. 55, precedente |
| 21 | Haberleşme giderleri | pág. 55, precedente |
| 22 | Diğer | pág. 55, precedente |
| 23 | Müşavirlik, dava ve icra noter giderleri | pág. 56, precedente |
| 24 | Personel ücret ve giderleri | pág. 56, precedente |
| 25 | Amortisman ve tükenme/itfa payları | pág. 56, precedente |
| 26 | Vergi resim ve harçlar | pág. 56, precedente |
| 27 | Şüpheli alacak karşılık giderleri | pág. 56, precedente |
| 28 | Haberleşme giderleri | pág. 56, precedente |
| 29 | Danışmanlık giderleri | pág. 56, precedente |
| 30 | Kargo ve nakliye giderleri | pág. 56, precedente |
| 31 | Diğer giderler | pág. 56, precedente |
| 32 | Esas faaliyetlerden kur farkı giderleri | pág. 57, precedente |
| 33 | Vade farkı gideri | pág. 57, precedente |
| 34 | Dava karşılık giderleri | pág. 57, precedente |
| 35 | Esas faaliyetlerden diğer giderler | pág. 57, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2020–21 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın gelirleri | pág. 55, precedente |
| 2 | Lisanslı ürün satış gelirleri | pág. 55, precedente |
| 3 | Maç hasılatları ve kombine kart loca geliri | pág. 55, precedente |
| 4 | Futbolcu kiralama ve yetiştime gelirleri | pág. 55, precedente |
| 5 | Sponsorluk ve reklam geliri | pág. 55, precedente |
| 6 | İsim ve lisans hakkı gelirleri | pág. 55, precedente |
| 7 | UEFA gelirleri | pág. 55, precedente |
| 8 | Diğer | pág. 55, precedente |
| 9 | Satıştan iadeler(-) | pág. 55, precedente |
| 10 | Satış iskontoları / indirimleri (-) | pág. 55, precedente |
| 11 | Konusu kalmayan karşılıklar (*) | pág. 57, precedente |
| 12 | Esas faaliyetlerden kur farkı gelirleri | pág. 57, precedente |
| 13 | Esas faaliyetlerden diğer gelirler | pág. 57, precedente |
| 14 | Yatırım faaliyetlerinden gelirler | pág. 11, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti | pág. 55, precedente |
| 2 | Ücret giderleri | pág. 55, precedente |
| 3 | Amortisman ve tükenme payları | pág. 55, precedente |
| 4 | Futbolcu sözleşme fesih giderleri | pág. 55, precedente |
| 5 | Maç giderleri | pág. 55, precedente |
| 6 | Futbolcu kiralama giderleri | pág. 55, precedente |
| 7 | Seyahat giderleri | pág. 55, precedente |
| 8 | Federasyon giderleri | pág. 55, precedente |
| 9 | Malzeme giderleri | pág. 55, precedente |
| 10 | Yatırım amaçlı gayrimenkul avansları için gider karşılığı | pág. 55, precedente |
| 11 | Diğer giderler | pág. 55, precedente |
| 12 | Personel ücret ve giderleri | pág. 55, precedente |
| 13 | Kira giderleri | pág. 55, precedente |
| 14 | Lojistik hizmet gideri | pág. 55, precedente |
| 15 | Amortisman ve tükenme payları | pág. 55, precedente |
| 16 | Yemek giderleri | pág. 55, precedente |
| 17 | Kargo ve nakliye giderleri | pág. 55, precedente |
| 18 | Ambalaj malzemesi giderleri | pág. 55, precedente |
| 19 | Web yayın giderleri | pág. 55, precedente |
| 20 | Tanıtım, fuar ve sergi giderleri | pág. 55, precedente |
| 21 | Reklam ve ilan giderleri | pág. 55, precedente |
| 22 | Haberleşme giderleri | pág. 55, precedente |
| 23 | Diğer | pág. 55, precedente |
| 24 | Müşavirlik, dava ve icra noter giderleri | pág. 56, precedente |
| 25 | Personel ücret ve giderleri | pág. 56, precedente |
| 26 | Amortisman ve tükenme/itfa payları | pág. 56, precedente |
| 27 | Vergi resim ve harçlar | pág. 56, precedente |
| 28 | Şüpheli alacak karşılık giderleri | pág. 56, precedente |
| 29 | Haberleşme giderleri | pág. 56, precedente |
| 30 | Danışmanlık giderleri | pág. 56, precedente |
| 31 | Kargo ve nakliye giderleri | pág. 56, precedente |
| 32 | Diğer giderler | pág. 56, precedente |
| 33 | Esas faaliyetlerden kur farkı giderleri | pág. 57, precedente |
| 34 | Vade farkı gideri | pág. 57, precedente |
| 35 | Dava karşılık giderleri | pág. 57, precedente |
| 36 | Esas faaliyetlerden diğer giderler | pág. 57, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2019–20 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın gelirleri | pág. 48, precedente |
| 2 | Lisanslı ürün satış gelirleri | pág. 48, precedente |
| 3 | Maç hasılatları ve kombine kart loca geliri | pág. 48, precedente |
| 4 | Futbolcu satış ve kiralama gelirleri | pág. 48, Jev 1 |
| 5 | Sponsorluk ve reklam geliri | pág. 48, precedente |
| 6 | İsim ve lisans hakkı gelirleri | pág. 48, precedente |
| 7 | Şampiyonlar ligi ve UEFA gelirleri | pág. 48, Jev 0.99 |
| 8 | Diğer | pág. 48, precedente |
| 9 | Satıştan iadeler(-) | pág. 48, precedente |
| 10 | Satış iskontoları / indirimleri (-) | pág. 48, precedente |
| 11 | Konusu kalmayan karşılıklar (*) | pág. 50, precedente |
| 12 | Esas faaliyetlerden kur farkı gelirleri | pág. 50, precedente |
| 13 | Esas faaliyetlerden diğer gelirler | pág. 50, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti | pág. 48, precedente |
| 2 | Ücret giderleri | pág. 48, precedente |
| 3 | Amortisman ve tükenme payları | pág. 48, precedente |
| 4 | Futbolcu sözleşme fesih giderleri | pág. 48, precedente |
| 5 | Maç giderleri | pág. 48, precedente |
| 6 | Futbolcu kiralama giderleri | pág. 48, precedente |
| 7 | Seyahat giderleri | pág. 48, precedente |
| 8 | Federasyon giderleri | pág. 48, precedente |
| 9 | Malzeme giderleri | pág. 48, precedente |
| 10 | Diğer giderler | pág. 48, precedente |
| 11 | Personel ücret ve giderleri | pág. 48, precedente |
| 12 | Kira giderleri | pág. 48, precedente |
| 13 | Lojistik hizmet gideri | pág. 48, precedente |
| 14 | Amortisman ve tükenme payları | pág. 48, precedente |
| 15 | Yemek giderleri | pág. 48, precedente |
| 16 | Kargo ve nakliye giderleri | pág. 48, precedente |
| 17 | Ambalaj malzemesi giderleri | pág. 48, precedente |
| 18 | Web yayın giderleri | pág. 48, precedente |
| 19 | Tanıtım, fuar ve sergi giderleri | pág. 48, precedente |
| 20 | Reklam ve ilan giderleri | pág. 48, precedente |
| 21 | Haberleşme giderleri | pág. 48, precedente |
| 22 | Diğer | pág. 48, precedente |
| 23 | Müşavirlik, dava ve icra noter giderleri | pág. 49, precedente |
| 24 | Personel ücret ve giderleri | pág. 49, precedente |
| 25 | Amortisman ve tükenme/itfa payları | pág. 49, precedente |
| 26 | Vergi resim ve harçlar | pág. 49, precedente |
| 27 | Şüpheli alacak karşılık giderleri | pág. 49, precedente |
| 28 | Haberleşme giderleri | pág. 49, precedente |
| 29 | Danışmanlık giderleri | pág. 49, precedente |
| 30 | Kargo ve nakliye giderleri | pág. 49, precedente |
| 31 | Diğer giderler | pág. 49, precedente |
| 32 | Esas faaliyetlerden kur farkı giderleri | pág. 50, precedente |
| 33 | Vade farkı gideri | pág. 50, precedente |
| 34 | Esas faaliyetlerden diğer giderler | pág. 50, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2018–19 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2014.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın gelirleri | pág. 55, precedente |
| 2 | Lisanslı ürün satış gelirleri | pág. 55, precedente |
| 3 | Sponsorluk ve reklam geliri | pág. 55, precedente |
| 4 | İsim ve lisans hakkı gelirleri | pág. 55, precedente |
| 5 | Kombine kart ve loca geliri | pág. 55, precedente |
| 6 | Maç hasılatları | pág. 55, Jev 1 |
| 7 | Futbolcu satış ve kiralama gelirleri | pág. 55, Jev 1 |
| 8 | Diğer | pág. 55, precedente |
| 9 | Yurtdışı satışlar | pág. 55, precedente |
| 10 | Satıştan iadeler(-) | pág. 55, precedente |
| 11 | Satış iskontoları / indirimleri (-) | pág. 55, precedente |
| 12 | Esas faaliyetlerden kur farkı gelirleri | pág. 58, precedente |
| 13 | Konusu kalmayan karşılıklar | pág. 58, precedente |
| 14 | Reeskont gelirleri | pág. 58, Jev 0.92 |
| 15 | Diğer gelir ve karlar | pág. 58, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti | pág. 55, precedente |
| 2 | Ücret giderleri | pág. 55, precedente |
| 3 | Amortisman ve tükenme payları (*) | pág. 55, Jev 0.92 |
| 4 | Futbolcu değer düşüklüğü karşılığı | pág. 55, Jev 0.92 |
| 5 | Maç giderleri | pág. 55, precedente |
| 6 | Seyahat giderleri | pág. 55, precedente |
| 7 | Stad kira giderleri | pág. 55, precedente |
| 8 | Bonservis ve kiralama giderleri | pág. 55, precedente |
| 9 | Lisans giderleri | pág. 55, precedente |
| 10 | Federasyon giderleri | pág. 55, precedente |
| 11 | Malzeme giderleri | pág. 55, precedente |
| 12 | Futbolcu sözleşme fesih giderleri | pág. 55, precedente |
| 13 | Bakım ve onarım giderleri | pág. 55, precedente |
| 14 | Diğer giderler | pág. 55, precedente |
| 15 | Personel ücret ve giderleri | pág. 56, precedente |
| 16 | Reklam ve ilan giderleri | pág. 56, precedente |
| 17 | Kira giderleri | pág. 56, precedente |
| 18 | Çağrı merkezi giderleri | pág. 56, precedente |
| 19 | Kargo ve nakliye giderleri | pág. 56, precedente |
| 20 | Sponsorluk giderleri | pág. 56, precedente |
| 21 | Tanıtım, fuar ve sergi giderleri | pág. 56, precedente |
| 22 | Amortisman ve tükenme payları | pág. 56, precedente |
| 23 | Diğer | pág. 56, precedente |
| 24 | Personel ücret ve giderleri | pág. 56, precedente |
| 25 | Müşavirlik giderleri | pág. 56, Jev 0.99 |
| 26 | Dava ve icra noter giderleri | pág. 56, Jev 0.96 |
| 27 | Şüpheli alacak karşılık giderleri | pág. 56, precedente |
| 28 | Vergi resim ve harçlar | pág. 56, precedente |
| 29 | Haberleşme giderleri | pág. 56, precedente |
| 30 | Danışmanlık giderleri | pág. 56, precedente |
| 31 | Amortisman ve tükenme/itfa payları | pág. 56, precedente |
| 32 | Kargo ve nakliye giderleri | pág. 56, precedente |
| 33 | Temsil tanıtma ağırlama giderleri | pág. 56, precedente |
| 34 | Diğer giderler | pág. 56, precedente |
| 35 | Esas faaliyetlerden kur farkı giderleri | pág. 58, precedente |
| 36 | Tecil - faiz giderleri | pág. 58, precedente |
| 37 | Reeskont gideri | pág. 58, precedente |
| 38 | Dava karşılık giderleri | pág. 58, precedente |
| 39 | Diğer olağan gider ve zararlar | pág. 58, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2013–14 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
```

## Fuentes

### besiktas-tr-futbol-bilanco-31-05-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2014

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
