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

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın gelirleri | pág. 48, precedente |
| 2 | Lisanslı ürün satış gelirleri | pág. 48, precedente |
| 3 | Maç hasılatları ve kombine kart loca geliri | pág. 48, precedente |
| 4 | Futbolcu kiralama ve yetiştirme gelirleri | pág. 48, precedente |
| 5 | Sponsorluk ve reklam geliri | pág. 48, precedente |
| 6 | İsim ve lisans hakkı gelirleri | pág. 48, precedente |
| 7 | UEFA gelirleri | pág. 48, precedente |
| 8 | Diğer | pág. 48, precedente |
| 9 | Satıştan iadeler (-) | pág. 48, precedente |
| 10 | Satış iskontoları / indirimleri (-) | pág. 48, precedente |
| 11 | Konusu kalmayan karşılıklar | pág. 50, precedente |
| 12 | Esas faaliyetlerden kur farkı gelirleri | pág. 50, precedente |
| 13 | Esas faaliyetlerden diğer gelirler (*) | pág. 50, precedente |
| 14 | Yatırım faaliyetlerinden gelirler | pág. 10, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti | pág. 48, precedente |
| 2 | Ücret giderleri | pág. 48, precedente |
| 3 | Amortisman ve tükenme payları | pág. 48, precedente |
| 4 | Maç giderleri | pág. 48, precedente |
| 5 | Futbolcu kiralama giderleri | pág. 48, precedente |
| 6 | Seyahat giderleri | pág. 48, precedente |
| 7 | Federasyon giderleri | pág. 48, precedente |
| 8 | Malzeme giderleri | pág. 48, precedente |
| 9 | Diğer giderler | pág. 48, precedente |
| 10 | Personel ücret ve giderleri | pág. 48, precedente |
| 11 | Lojistik hizmet gideri | pág. 48, precedente |
| 12 | Amortisman ve tükenme payları | pág. 48, precedente |
| 13 | Yemek giderleri | pág. 48, precedente |
| 14 | Kargo ve nakliye giderleri | pág. 48, precedente |
| 15 | Ambalaj malzemesi giderleri | pág. 48, precedente |
| 16 | Web yayın giderleri | pág. 48, precedente |
| 17 | Tanıtım, fuar ve sergi giderleri | pág. 48, precedente |
| 18 | Reklam ve ilan giderleri | pág. 48, precedente |
| 19 | Haberleşme giderleri | pág. 48, precedente |
| 20 | Diğer | pág. 48, precedente |
| 21 | Müşavirlik, dava ve icra noter giderleri | pág. 49, precedente |
| 22 | Personel ücret ve giderleri | pág. 49, precedente |
| 23 | Amortisman ve tükenme/itfa payları | pág. 49, precedente |
| 24 | Vergi resim ve harçlar | pág. 49, precedente |
| 25 | Şüpheli alacak karşılık giderleri | pág. 49, precedente |
| 26 | Haberleşme giderleri | pág. 49, precedente |
| 27 | Danışmanlık giderleri | pág. 49, precedente |
| 28 | Kargo ve nakliye giderleri | pág. 49, precedente |
| 29 | Diğer giderler | pág. 49, precedente |
| 30 | Esas faaliyetlerden kur farkı giderleri | pág. 50, precedente |
| 31 | Vade farkı gideri | pág. 50, precedente |
| 32 | Dava karşılık giderleri | pág. 50, precedente |
| 33 | Esas faaliyetlerden diğer giderler | pág. 50, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2021–22 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
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

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Şampiyonlar ligi ve UEFA gelirleri | pág. 55, Jev 0.99 |
| 2 | Yayın gelirleri | pág. 55, precedente |
| 3 | Lisanslı ürün satış gelirleri | pág. 55, precedente |
| 4 | İsim ve lisans hakkı gelirleri | pág. 55, precedente |
| 5 | Maç hasılatları ve kombine kart loca geliri | pág. 55, precedente |
| 6 | Sponsorluk ve reklam geliri | pág. 55, precedente |
| 7 | Futbolcu satış ve kiralama gelirleri | pág. 55, Jev 1 |
| 8 | Diğer | pág. 55, precedente |
| 9 | Satıştan iadeler(-) | pág. 55, precedente |
| 10 | Satış iskontoları / indirimleri (-) | pág. 55, precedente |
| 11 | Konusu kalmayan karşılıklar (*) | pág. 58, precedente |
| 12 | Esas faaliyetlerden kur farkı gelirleri | pág. 58, precedente |
| 13 | Esas faaliyetlerden diğer gelirler | pág. 58, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti | pág. 55, precedente |
| 2 | Ücret giderleri | pág. 55, precedente |
| 3 | Amortisman ve tükenme payları | pág. 55, precedente |
| 4 | Futbolcu kiralama giderleri | pág. 55, precedente |
| 5 | Maç giderleri | pág. 55, precedente |
| 6 | Futbolcu sözleşme fesih giderleri | pág. 55, precedente |
| 7 | Seyahat giderleri | pág. 55, precedente |
| 8 | Menajerlik giderleri | pág. 55, Jev 0.99 |
| 9 | Federasyon giderleri | pág. 55, precedente |
| 10 | Malzeme giderleri | pág. 55, precedente |
| 11 | Ceza giderleri | pág. 55, Jev 0.96 |
| 12 | Diğer giderler | pág. 55, precedente |
| 13 | Personel ücret ve giderleri | pág. 56, precedente |
| 14 | Kira giderleri | pág. 56, precedente |
| 15 | Lojistik hizmet gideri | pág. 56, precedente |
| 16 | Kargo ve nakliye giderleri | pág. 56, precedente |
| 17 | Amortisman ve tükenme payları | pág. 56, precedente |
| 18 | Yemek giderleri | pág. 56, precedente |
| 19 | Ambalaj malzemesi giderleri | pág. 56, precedente |
| 20 | Web yayın giderleri | pág. 56, precedente |
| 21 | Tanıtım, fuar ve sergi giderleri | pág. 56, precedente |
| 22 | Reklam ve ilan giderleri | pág. 56, precedente |
| 23 | Haberleşme giderleri | pág. 56, precedente |
| 24 | Diğer | pág. 56, precedente |
| 25 | Müşavirlik, dava ve icra noter giderleri | pág. 56, precedente |
| 26 | Personel ücret ve giderleri | pág. 56, precedente |
| 27 | Şüpheli alacak karşılık giderleri | pág. 56, precedente |
| 28 | Vergi resim ve harçlar | pág. 56, precedente |
| 29 | Amortisman ve tükenme/itfa payları | pág. 56, precedente |
| 30 | Haberleşme giderleri | pág. 56, precedente |
| 31 | Kargo ve nakliye giderleri | pág. 56, precedente |
| 32 | Temsil tanıtma ağırlama giderleri | pág. 56, precedente |
| 33 | Diğer giderler | pág. 56, precedente |
| 34 | Esas faaliyetlerden kur farkı giderleri | pág. 58, precedente |
| 35 | Dava karşılık giderleri | pág. 58, precedente |
| 36 | Esas faaliyetlerden diğer giderler | pág. 58, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2016–17 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın gelirleri | pág. 53, precedente |
| 2 | Futbolcu satış ve kiralama gelirleri | pág. 53, Jev 1 |
| 3 | Lisanslı ürün satış gelirleri | pág. 53, precedente |
| 4 | Sponsorluk ve reklam geliri | pág. 53, precedente |
| 5 | Maç hasılatları ve kombine kart loca geliri | pág. 53, precedente |
| 6 | Şampiyonlar ligi ve UEFA gelirleri | pág. 53, Jev 0.99 |
| 7 | İsim ve lisans hakkı gelirleri | pág. 53, precedente |
| 8 | Diğer | pág. 53, precedente |
| 9 | Satıştan iadeler (-) | pág. 53, precedente |
| 10 | Satış iskontoları / indirimleri (-) | pág. 53, precedente |
| 11 | Esas faaliyetlerden kur farkı gelirleri | pág. 56, precedente |
| 12 | Konusu kalmayan karşılıklar (*) | pág. 56, precedente |
| 13 | Diğer gelir ve karlar | pág. 56, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti | pág. 53, precedente |
| 2 | Ücret giderleri | pág. 53, precedente |
| 3 | Amortisman ve tükenme payları | pág. 53, precedente |
| 4 | Futbolcu sözleşme fesih giderleri | pág. 53, precedente |
| 5 | Maç giderleri | pág. 53, precedente |
| 6 | Seyahat giderleri | pág. 53, precedente |
| 7 | Ceza giderleri | pág. 53, Jev 0.96 |
| 8 | Menajerlik giderleri | pág. 53, Jev 0.99 |
| 9 | Stat kira giderleri | pág. 53, precedente |
| 10 | Bonservis ve kiralama giderleri | pág. 53, precedente |
| 11 | Federasyon giderleri | pág. 53, precedente |
| 12 | Malzeme giderleri | pág. 53, precedente |
| 13 | Diğer giderler | pág. 53, precedente |
| 14 | Personel ücret ve giderleri | pág. 54, precedente |
| 15 | Kira giderleri | pág. 54, precedente |
| 16 | Lojistik hizmet gideri | pág. 54, precedente |
| 17 | Sponsorluk giderleri | pág. 54, precedente |
| 18 | Kargo ve nakliye giderleri | pág. 54, precedente |
| 19 | Amortisman ve tükenme payları | pág. 54, precedente |
| 20 | Yemek giderleri | pág. 54, precedente |
| 21 | Ambalaj Malzemesi Giderleri | pág. 54, precedente |
| 22 | Tanıtım, fuar ve sergi giderleri | pág. 54, precedente |
| 23 | Haberleşme giderleri | pág. 54, precedente |
| 24 | Reklam ve ilan giderleri | pág. 54, precedente |
| 25 | Çağrı merkezi giderleri | pág. 54, precedente |
| 26 | Diğer | pág. 54, precedente |
| 27 | Personel ücret ve giderleri | pág. 54, precedente |
| 28 | Müşavirlik, dava ve icra noter giderleri | pág. 54, precedente |
| 29 | Şüpheli alacak karşılık giderleri | pág. 54, precedente |
| 30 | Vergi resim ve harçlar | pág. 54, precedente |
| 31 | Danışmanlık giderleri | pág. 54, precedente |
| 32 | Amortisman ve tükenme/itfa payları | pág. 54, precedente |
| 33 | Haberleşme giderleri | pág. 54, precedente |
| 34 | Kargo ve nakliye giderleri | pág. 54, precedente |
| 35 | Temsil tanıtma ağırlama giderleri | pág. 54, precedente |
| 36 | Diğer giderler | pág. 54, precedente |
| 37 | Esas faaliyetlerden kur farkı giderleri | pág. 56, precedente |
| 38 | Vergi cezası (*) | pág. 56, precedente |
| 39 | Vade farkı gideri | pág. 56, precedente |
| 40 | Dava karşılık giderleri | pág. 56, precedente |
| 41 | Diğer olağan gider ve zararlar | pág. 56, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2015–16 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2015.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın gelirleri | pág. 53, precedente |
| 2 | Lisanslı ürün satış gelirleri | pág. 53, precedente |
| 3 | Sponsorluk ve reklam geliri | pág. 53, precedente |
| 4 | İsim ve lisans hakkı gelirleri | pág. 53, precedente |
| 5 | Şampiyonlar ligi ve UEFA gelirleri | pág. 53, Jev 0.99 |
| 6 | Maç hasılatları ve kombine kart loca geliri | pág. 53, precedente |
| 7 | Futbolcu satış ve kiralama gelirleri | pág. 53, Jev 1 |
| 8 | Diğer | pág. 53, precedente |
| 9 | Satıştan iadeler(-) | pág. 53, precedente |
| 10 | Satış iskontoları / indirimleri (-) | pág. 53, precedente |
| 11 | Esas faaliyetlerden kur farkı gelirleri | pág. 56, precedente |
| 12 | Konusu kalmayan karşılıklar | pág. 56, precedente |
| 13 | Diğer gelir ve karlar | pág. 56, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti | pág. 53, precedente |
| 2 | Ücret giderleri | pág. 53, precedente |
| 3 | Amortisman ve tükenme payları | pág. 53, precedente |
| 4 | Maç giderleri | pág. 53, precedente |
| 5 | Seyahat giderleri | pág. 53, precedente |
| 6 | Stat kira giderleri | pág. 53, precedente |
| 7 | Bonservis ve kiralama giderleri | pág. 53, precedente |
| 8 | Lisans giderleri | pág. 53, precedente |
| 9 | Federasyon giderleri | pág. 53, precedente |
| 10 | Malzeme giderleri | pág. 53, precedente |
| 11 | Bakım ve onarım giderleri | pág. 53, precedente |
| 12 | Diğer giderler | pág. 53, precedente |
| 13 | Personel ücret ve giderleri | pág. 54, precedente |
| 14 | Reklam ve ilan giderleri | pág. 54, precedente |
| 15 | Kira giderleri | pág. 54, precedente |
| 16 | Çağrı merkezi giderleri | pág. 54, precedente |
| 17 | Kargo ve nakliye giderleri | pág. 54, precedente |
| 18 | Sponsorluk giderleri | pág. 54, precedente |
| 19 | Tanıtım, fuar ve sergi giderleri | pág. 54, precedente |
| 20 | Amortisman ve tükenme payları | pág. 54, precedente |
| 21 | Diğer | pág. 54, precedente |
| 22 | Personel ücret ve giderleri | pág. 54, precedente |
| 23 | Müşavirlik, dava ve icra noter giderleri | pág. 54, precedente |
| 24 | Şüpheli alacak karşılık giderleri | pág. 54, precedente |
| 25 | Vergi resim ve harçlar | pág. 54, precedente |
| 26 | Haberleşme giderleri | pág. 54, precedente |
| 27 | Danışmanlık giderleri | pág. 54, precedente |
| 28 | Amortisman ve tükenme/itfa payları | pág. 54, precedente |
| 29 | Kargo ve nakliye giderleri | pág. 54, precedente |
| 30 | Temsil tanıtma ağırlama giderleri | pág. 54, precedente |
| 31 | Diğer giderler | pág. 54, precedente |
| 32 | Esas faaliyetlerden kur farkı giderleri | pág. 56, precedente |
| 33 | Tecil - faiz giderleri | pág. 56, precedente |
| 34 | Vergi cezası (*) | pág. 56, precedente |
| 35 | Dava karşılık giderleri | pág. 56, precedente |
| 36 | Diğer olağan gider ve zararlar | pág. 56, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2014–15 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
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

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2011.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2011.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın gelirleri | pág. 48, Jev 1 |
| 2 | Kombine kart ve loca geliri | pág. 48, precedente |
| 3 | Sponsorluk ve reklam geliri | pág. 48, Jev 1 |
| 4 | Futbolcu satış ve kiralama gelirleri | pág. 48, Jev 1 |
| 5 | Lisanslı ürün satış gelirleri | pág. 48, Jev 1 |
| 6 | Đsim ve Lisans hakkı gelirleri | pág. 48, precedente |
| 7 | UEFA ve süper kupa katılım gelirleri/Şampiyonlar ligi | pág. 48, Jev 1 |
| 8 | Maç hasılatları | pág. 48, Jev 1 |
| 9 | Sigorta Satışı | pág. 48, Jev 0.99 |
| 10 | Seyahat Satışı | pág. 48, Jev 0.97 |
| 11 | Đletişim Faaliyet Geliri | pág. 48, precedente |
| 12 | Diğer | pág. 48, precedente |
| 13 | Satıştan iadeler(-) | pág. 48, precedente |
| 14 | Satış iskontoları / indirimleri (-) | pág. 48, Jev 0.99 |
| 15 | Konusu Kalmayan Karşılıklar | pág. 50, precedente |
| 16 | Önceki dönem gelir ve karlar | pág. 50, Jev 1 |
| 17 | Diğer olağan gelir ve karlar | pág. 50, Jev 0.99 |
| 18 | Diğer olağandışı gelir ve karlar | pág. 50, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti(-) | pág. 48, precedente |
| 2 | Ücret Giderleri | pág. 48, precedente |
| 3 | Maç Giderleri | pág. 48, precedente |
| 4 | Seyahat Giderleri | pág. 48, precedente |
| 5 | Federasyon Giderleri | pág. 48, precedente |
| 6 | Amortisman ve Tükenme Payları | pág. 48, precedente |
| 7 | Bonservis ve Kiralama Giderleri | pág. 48, precedente |
| 8 | Sporcu Menajerlik Giderleri | pág. 48, precedente |
| 9 | Malzeme Giderleri | pág. 48, precedente |
| 10 | Lisans Giderleri | pág. 48, precedente |
| 11 | Stad Giderleri | pág. 48, precedente |
| 12 | Tesis Giderleri | pág. 48, precedente |
| 13 | Diğer Giderler | pág. 48, precedente |
| 14 | Futbolcu Satış Zararı (-) | pág. 48, precedente |
| 15 | Personel Ücret ve Giderleri | pág. 49, precedente |
| 16 | Kira giderleri | pág. 49, precedente |
| 17 | Tan. Org. Fuar ve sergi giderleri | pág. 49, Jev 0.9 |
| 18 | Amortisman giderleri | pág. 49, precedente |
| 19 | Reklam ve Đlan Giderleri | pág. 49, precedente |
| 20 | Diğer | pág. 49, Jev 1 |
| 21 | Personel Ücret ve Giderleri | pág. 49, precedente |
| 22 | Periyodik Kiralama Giderleri | pág. 49, Jev 0.96 |
| 23 | Danışmanlık Denetim Menajerlik Giderleri | pág. 49, Jev 1 |
| 24 | Kargo Nakliye Hammaliye Giderleri | pág. 49, Jev 0.96 |
| 25 | Haberleşme Giderleri | pág. 49, precedente |
| 26 | Müşavirlik Giderleri | pág. 49, Jev 0.99 |
| 27 | Tanıtım Organizasyon Giderleri | pág. 49, Jev 0.97 |
| 28 | Aidat Giderleri | pág. 49, precedente |
| 29 | Şehir içi Yol Giderleri | pág. 49, precedente |
| 30 | Temsil Tanıtma Ağırlama Giderleri | pág. 49, precedente |
| 31 | Dava Ve Đcra Noter Giderleri | pág. 49, Jev 0.96 |
| 32 | Matbaa Yayın Kırtasiye Giderleri | pág. 49, Jev 1 |
| 33 | Yurtiçi Seyahat Giderleri | pág. 49, Jev 1 |
| 34 | Reklam ve Đlan Giderleri | pág. 49, precedente |
| 35 | Vergi Resim ve Harçlar | pág. 49, precedente |
| 36 | Amortisman ve Tükenme/itfa payları | pág. 49, precedente |
| 37 | Diğer Giderler | pág. 49, precedente |
| 38 | Çalışılmayan kısım gider ve zararlar (*) | pág. 50, precedente |
| 39 | Önceki Dönem Gider ve Zararları | pág. 50, Jev 0.9 |
| 40 | Diğer olağandışı gider ve zararlar | pág. 50, Jev 0.9 |
| 41 | Karşılık gideri (**) | pág. 50, precedente |
| 42 | Haklar Değer Düşüklüğü Karşılığı | pág. 50, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2010–11 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2010.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın Gelirleri | pág. 43, Jev 1 |
| 2 | Kombine Kart Ve Loca Geliri | pág. 43, precedente |
| 3 | Sponsorluk Ve Reklam Geliri | pág. 43, Jev 1 |
| 4 | ġampiyonlar Ligi Gelirleri | pág. 43, Jev 0.94 |
| 5 | Futbolcu SatıĢ Ve Kiralama Gelirleri | pág. 43, Jev 1 |
| 6 | Lisanslı Ürün SatıĢ Gelirleri | pág. 43, precedente |
| 7 | Ġsim Ve Lisans Hakkı Gelirleri | pág. 43, precedente |
| 8 | Uefa Ve Süper Kupa Katılım Gelirleri | pág. 43, Jev 1 |
| 9 | Maç Hasılatları | pág. 43, Jev 1 |
| 10 | Sigorta SatıĢı | pág. 43, precedente |
| 11 | Seyahat SatıĢı | pág. 43, precedente |
| 12 | Diğer | pág. 43, Jev 0.99 |
| 13 | YurtdıĢı satıĢlar | pág. 43, precedente |
| 14 | SatıĢtan iadeler(-) | pág. 43, Jev 1 |
| 15 | SatıĢ iskontoları / indirimleri (-) | pág. 43, precedente |
| 16 | Konusu Kalmayan KarĢılıklar | pág. 45, precedente |
| 17 | Önceki Dönem Gelir Ve Karlar | pág. 45, Jev 1 |
| 18 | Diğer OlağandıĢı Gelir Ve Karlar | pág. 45, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan Ticari Mallar Maliyeti(-) | pág. 43, precedente |
| 2 | Ücret Giderleri | pág. 43, precedente |
| 3 | Maç Giderleri | pág. 43, precedente |
| 4 | Seyahat Giderleri | pág. 43, precedente |
| 5 | Federasyon Giderleri | pág. 43, precedente |
| 6 | Amortisman Ve Tükenme/Ġtfa Payları | pág. 43, precedente |
| 7 | Bonservis Ve Kiralama Giderleri | pág. 43, precedente |
| 8 | Sporcu Menejerlik Giderleri | pág. 44, Claude 0.8 |
| 9 | Malzeme Giderleri | pág. 44, precedente |
| 10 | Lisans Giderleri | pág. 44, precedente |
| 11 | Stad Giderleri | pág. 44, precedente |
| 12 | Tesis Giderleri | pág. 44, precedente |
| 13 | Diğer Giderler | pág. 44, precedente |
| 14 | Futbolcu SatıĢ Zararı (-) | pág. 44, precedente |
| 15 | Personel Ücret ve Giderleri | pág. 44, precedente |
| 16 | Kira giderleri | pág. 44, precedente |
| 17 | Yemek Giderleri | pág. 44, precedente |
| 18 | Tanıtım, Organizasyon Giderleri | pág. 44, precedente |
| 19 | Reklam ve Ġlan Giderleri | pág. 44, precedente |
| 20 | Amortisman ve Tükenme/Ġtfa Payları | pág. 44, precedente |
| 21 | Diğer Giderler | pág. 44, precedente |
| 22 | Personel Ücret ve Giderleri | pág. 44, precedente |
| 23 | Peryodik Kiralama Giderleri | pág. 44, Jev 0.96 |
| 24 | DanıĢmanlık, Denetim, Menejerlik Giderleri | pág. 44, Jev 1 |
| 25 | Kargo, Nakliye, Hamaliye Giderleri | pág. 44, Jev 0.99 |
| 26 | HaberleĢme Giderleri | pág. 44, precedente |
| 27 | MüĢavirlik Giderleri | pág. 44, Claude 0.85 |
| 28 | Tanıtım, Organizasyon Giderleri | pág. 44, precedente |
| 29 | Aidat Giderleri | pág. 44, precedente |
| 30 | Amortisman ve Tükenme/Ġtfa Payları | pág. 44, precedente |
| 31 | Temsil, Tanıtma, Ağırlama Giderleri | pág. 44, Jev 0.9 |
| 32 | Dava ve Ġcra, Noter Giderleri | pág. 44, Jev 0.93 |
| 33 | Matbaa, Yayın, Kırtasiye Giderleri | pág. 44, Jev 1 |
| 34 | Yurtiçi Seyahat Giderleri | pág. 44, Jev 1 |
| 35 | Ya zılı Basın Ġlan ve Reklam Giderleri | pág. 44, Jev 1 |
| 36 | Vergi, Resim ve Harçlar | pág. 44, precedente |
| 37 | ġehiriçi Yol Giderleri | pág. 44, precedente |
| 38 | Diğer Giderler | pág. 44, precedente |
| 39 | ÇalıĢılmayan Kısım Gider Ve Zararlar(*) | pág. 46, precedente |
| 40 | Önceki Dönem Gider Ve Zararları | pág. 46, Jev 0.9 |
| 41 | Diğer OlağandıĢı Gider Ve Zararlar | pág. 46, precedente |
| 42 | KarĢılık Gideri | pág. 46, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2009–10 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2009.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Yayın gelirleri | pág. 39, Jev 1 |
| 2 | Kombine kart ve loca geliri | pág. 39, precedente |
| 3 | Sponsorluk ve reklam geliri | pág. 39, Jev 1 |
| 4 | Futbolcu satış ve kiralama gelirleri | pág. 39, Jev 1 |
| 5 | Lisanslı ürün satış gelirleri | pág. 39, Jev 1 |
| 6 | İsim hakkı gelirleri, lisans gelirleri | pág. 39, Jev 1 |
| 7 | UEFA ve süper kupa katılım gelirleri | pág. 39, Jev 1 |
| 8 | Maç hasılatları | pág. 39, Jev 1 |
| 9 | Seyahat satış gelirleri | pág. 39, precedente |
| 10 | Sigorta satış gelirleri | pág. 39, Jev 0.91 |
| 11 | Diğer | pág. 39, Jev 0.99 |
| 12 | Yurtdışı satışlar | pág. 39, precedente |
| 13 | Satıştan iadeler(-) | pág. 39, precedente |
| 14 | Satış iskontoları(-) | pág. 39, Jev 0.99 |
| 15 | Konusu Kalmayan Karşılıklar | pág. 40, precedente |
| 16 | Diğer olağan gelir ve karlar | pág. 40, Jev 0.99 |
| 17 | Önceki dönem gelir ve karlar | pág. 40, Jev 1 |
| 18 | Diğer Olağandışı Gelir ve Karlar | pág. 40, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Satılan ticari mallar maliyeti(-) | pág. 39, precedente |
| 2 | Satılan hizmet maliyeti(-) | pág. 39, precedente |
| 3 | Futbolcu Satış Zararı (-) | pág. 39, precedente |
| 4 | Personel Ücret ve Giderleri | pág. 39, precedente |
| 5 | Kira giderleri | pág. 39, precedente |
| 6 | Amortisman giderleri | pág. 39, precedente |
| 7 | Tan. Org. Fuar ve sergi giderleri | pág. 39, Jev 0.9 |
| 8 | Diğer giderler | pág. 39, precedente |
| 9 | Personel Ücret ve Giderleri | pág. 40, precedente |
| 10 | Amortisman giderleri | pág. 40, precedente |
| 11 | Bina + Kira+Yönetim giderleri | pág. 40, Jev 0.99 |
| 12 | Komisyon ve diğer hizmet giderleri | pág. 40, Jev 0.97 |
| 13 | Tan. Org. Fuar ve sergi giderleri | pág. 40, Jev 0.9 |
| 14 | Çalışılmayan kısım gider ve zararlar | pág. 40, precedente |
| 15 | Önceki Dönem Gider ve Zararları | pág. 40, Jev 0.9 |
| 16 | Diğer olağandışı gider ve zararlar | pág. 40, Jev 0.9 |
| 17 | Karşılık gideri | pág. 40, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-20): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2010, 2011, 2014, 2015, 2016, 2017, 2019, 2020, 2021, 2022, 2023): Salarios y primas (plantel y cuerpo técnico), Organización de partidos
```

### Liga

```text
tools/cargar.mjs (2026-10-20): tr-superlig, verificado contra roster cacheado de "2008–09 Süper Lig" (tools/club-league-reference/tr.json), coincidencia exacta "Beşiktaş".
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

### besiktas-tr-futbol-bilanco-31-05-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2009

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2009.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2010

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2011

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2011.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2015

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### besiktas-tr-futbol-bilanco-31-05-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Turquía/Beşiktaş/besiktas-futbol-bilanco-31-05-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
