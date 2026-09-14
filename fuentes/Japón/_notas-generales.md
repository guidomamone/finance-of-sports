# Notas generales — Japón

## Metodología: J.League "クラブ経営情報開示" (Club Management/Financial Information Disclosure), sesión 2026-09-13

Japón es el primer país asiático sourceado para este proyecto. A diferencia de Sudamérica (donde
hay que buscar un regulador tipo CMF/Supersociedades o el sitio propio de cada club), acá el propio
operador de la liga (公益社団法人日本プロサッカーリーグ, J.League, entidad sin fines de lucro que
administra J1/J2/J3) publica UN documento consolidado por año que cubre TODOS los clubes de las tres
divisiones (58-60 clubes según el año), como parte de su "Club Licensing System" — la licencia de
club exige estándares financieros (contabilidad y auditoría legítimas) y la liga centraliza la
divulgación en vez de dejarla en manos de cada club.

**Hit fuerte, cubre las 10 clubes objetivo de un saque.** El documento se llama
"クラブ経営情報開示資料" (Club Management Information Disclosure Material) y vive en una URL estable
y predecible, sin login, en el dominio corporativo oficial de la liga:

```
https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-<AÑO>.pdf
```

Confirmado con `curl` (HTTP 200) para TODOS los años `<AÑO>` = 2012 a 2025 inclusive (14 documentos).
Los años 2005-2011 devuelven 404 en esta misma URL — la nota de prensa (note.com, fuente secundaria)
menciona que la divulgación individual de clubes existe "desde 2005", pero si esos años más viejos
están publicados en algún otro lado no se identificó en esta sesión; no vale la pena adivinar URLs
para 2005-2011 sin un lead nuevo (se probó el mismo patrón de nombre y no está).

Los 14 PDFs (2012-2025) se descargaron a una carpeta COMPARTIDA, no una por club:
`Clubes/Japón/_J.League (todos los clubes)/club_doc-2012.pdf` a `club_doc-2025.pdf`. Se decidió así
(en vez de duplicar los mismos 14 archivos ~33 MB en cada una de las 10 carpetas de club) porque es
literalmente el mismo documento para los 60 clubes — la convención de "un PDF por
`Clubes/<País>/<Club>/`" asume una fuente por club, que acá no aplica; cada archivo
`fuentes/Japón/<Club>.md` referencia esta carpeta compartida explícitamente. Si en el futuro se
prefiere la duplicación por conveniencia de alguna sesión de onboarding, es un simple `cp`, los
archivos ya están identificados y confirmados.

### Qué tiene cada PDF (estructura confirmada, estable 2012-2025)

- **CORRECCIÓN IMPORTANTE (sesión de mapeo de datos, 2026-09-13, posterior a esta nota de
  sourcing)**: el bullet original de abajo decía que el PDF desglosa "por club" las 7-8 categorías
  de ingreso completas. Verificado con grep de texto extraído (`pdftotext -layout`) sobre las
  ediciones 2025 Y 2018 (como muestra de un año más viejo) que esto NO es así: **el documento SOLO
  da 3 cifras reales POR CLUB** (cada una para 3 ejercicios consecutivos): 売上高 (ingreso TOTAL),
  スポンサー収入 (sponsors) e 入場料収入 (entradas/gate) — en 3 tablas separadas por división
  (J1/J2/J3), págs. 8-10 de la edición 2025. El resto de categorías de ingreso (物販収入/
  merchandising, Ｊリーグ配分金/distribución de liga, 移籍補償金等収入/transferencias,
  アカデミー関連収入/academia, 女子チーム関連収入/equipo femenino, その他収入/otros) SOLO aparecen
  agregadas a nivel de división (J1/J2/J3 completo, Apéndice 3-1/3-2), nunca desglosadas por club
  individual — confirmado que ninguna de esas categorías aparece en ninguna fila "por club" en
  ninguna de las 2 ediciones revisadas. Los 10 clubes objetivo se cargaron al sitio (Ejercicio 2025,
  ver `data/<club>-data.js` de cada uno) con revenueLines de 3 líneas: Sponsor, Gate, y un residual
  "Otros ingresos" (= Total − Sponsor − Gate, agrupa todo lo demás sin poder separarlo más). Sin
  desglose de costos por club en ninguna edición (ver bullet siguiente, que sigue vigente sin
  cambios) — `expenseLinesByYear` de los 10 clubes quedó vacío, no se usó el promedio/total
  divisional como proxy (sería atribuirle a un club un número que es en realidad un promedio de toda
  la división).
- **RE-VERIFICADO Y CERRADO (sesión 2026-09-14, a pedido de Guido: "busquemos información de nuevo
  a ver si en otros lares de internet algo nos da más contexto").** Se salió a buscar si el desglose
  por club existe en algún lado. NO existe, y ahora hay 3 evidencias independientes:
  1. **La propia tabla por club del disclosure**, leída directo en `club_doc-2025.md`: son
     exactamente 3 filas por club, líneas 242 (売上高 / total), 300 (スポンサー収入) y 341
     (入場料収入). Para Ｇ大阪: 6.574 / 7.223 / 8.817 el total, 2.188 / 2.263 / 2.292 sponsors, y
     970 / 1.185 / 1.451 entradas (2023 / 2024 / 2025). Ninguna otra categoría aparece por club.
  2. **La "Ｊリーグ クラブ経営ガイド 2025"** (`https://aboutj.jleague.jp/corporate/assets/pdf/club_guide/jclub_guide-2025.pdf`,
     181 páginas, documento OFICIAL distinto del disclosure): SÍ tiene las 8 categorías
     (スポンサー収入, 入場料収入, Ｊリーグ配分金, 移籍補償金等収入, アカデミー関連収入,
     女子チーム関連収入, 物販収入, その他収入), pero SOLO como PROMEDIO de J1, J2 y J3 ("Ｊ1平均"
     / "Ｊ2平均" / "Ｊ3平均"), nunca por club. Su propia nota de fuente dice que está armada a
     partir del mismo disclosure.
  3. **El "Jクラブ経営情報ポータル"** (cieloazul310.github.io, terceros): documenta las 8 categorías
     como vocabulario de la liga, pero su ficha por club muestra solo el 営業収入 total.
  OJO CON LAS NOTAS DE ANÁLISIS JAPONESAS: circulan desgloses por club de 4 líneas (ej. una nota de
  note.com da para Gamba 2024: 72,2億 total, 22,6 sponsors, 11,9 entradas, **7,6 物販**, 22,5 otros).
  Los 3 primeros números salen de este disclosure; el de 物販 NO está en ninguna edición del
  documento oficial, así que es o una estimación del analista o viene de otra fuente que la nota no
  cita. No usarlo sin identificar su origen.
  QUÉ SE HIZO CON ESTO (Versión 141): el residual de los 10 clubes japoneses pasó de `other_income`
  a `lump_football_operations`, o sea de la fila "Otras secciones deportivas y otros ingresos" a
  "Fútbol profesional (sin desglosar por la fuente)". El número no cambió; lo que cambió es que la
  fila ahora dice la verdad en vez de sugerir que sabemos que son otras secciones deportivas.
- **Por club, 3 ejercicios consecutivos** (el año del documento + los 2 anteriores), desglosado por
  categoría de INGRESO: スポンサー収入 (sponsors), 入場料収入 (taquilla/gate), 物販収入
  (merchandising), Ｊリーグ配分金 (distribución de la liga), 移籍補償金等収入 (indemnizaciones de
  transferencias), アカデミー関連収入 (academia/divisiones inferiores), 女子チーム関連収入 (equipo
  femenino, si aplica), その他収入 (otros). ~~Están agrupados en 3 tablas separadas (clubes de J1,
  clubes de J2, clubes de J3) dentro del mismo PDF.~~ **VER LA CORRECCIÓN DE ARRIBA: esto describe
  las categorías que el documento cubre EN TOTAL (agregadas por división), no lo que cada club
  individual muestra — dejado tal cual (no borrado) para que quede el rastro de qué decía la nota
  original y por qué se corrigió, ver también el bullet de gotchas más abajo sobre esto mismo.**
- **Los COSTOS/gastos SOLO se desglosan a nivel de división (J1/J2/J3), no por club individual**:
  トップチーム人件費 (sueldos plantel primer equipo), トップチーム運営経費 (operativo del plantel),
  試合関連経費 (gastos de partido/estadio), 物販関連費, 移籍関連費用, アカデミー関連経費, その他,
  más SG&A (販売費および一般管理費), resultado operativo/ordinario/neto — todo esto viene como
  TOTAL y PROMEDIO de J1, de J2 y de J3, nunca fila por fila por club. Ojo para una futura sesión de
  mapeo de datos: de este documento sale ingreso real POR CLUB, pero el costo hay que o bien dejarlo
  sin cargar, o cargar el promedio/total de la división aclarando explícitamente que no es el costo
  real del club (no inventar un desglose de costo por club a partir del promedio divisional).
- Confirmado (grep de texto extraído con `pdftotext -layout`) que los 10 clubes objetivo de esta
  sesión aparecen en las tablas de J1 de 2025, y aparecen con matches en años intermedios (2012,
  2015, 2018, 2020, 2023) — con la salvedad de que el ANCHO de caracteres del nombre abreviado
  cambia entre años (ver gotcha de abajo), así que un grep con el nombre "equivocado" de ancho puede
  dar 0 falsos negativos.

### Gotchas para una sesión futura de mapeo de datos

1. **Ancho de caracteres inconsistente entre años**: algunos años abrevian con alfanuméricos
   MEDIO ancho ("FC東京", "横浜FM") y otros con ANCHO COMPLETO ("ＦＣ東京", "横浜ＦＭ") para el mismo
   club. Un grep con un solo tipo de ancho puede fallar en silencio en años donde se usó el otro —
   confirmar el ancho usado en CADA año antes de concluir "no aparece".
2. **Publicación escalonada ("段階的発表")**: el documento de mayo de cada año excluye clubes con
   cierre de ejercicio en marzo o junio (7 clubes en la edición 2025: 柏, 湘南, 札幌, 鳥取, 讃岐,
   高知, 北九州) — esos clubes se agregan en una actualización de julio/octubre AL MISMO ARCHIVO
   (el título del PDF 2025 descargado hoy dice literalmente "2026年5月26日（7月24日更新）" — es un
   documento vivo que la liga sobreescribe en la misma URL a medida que llegan más balances). Ninguno
   de los 10 clubes objetivo de esta sesión está en esa lista de 7 rezagados, así que no afecta a
   este barrido, pero una sesión futura que agregue un club nuevo (ej. Sapporo, Kashiwa) debería
   volver a descargar la versión más reciente en vez de asumir que el PDF ya guardado es definitivo.
3. **Marca "取扱注意" (manejar con cuidado / confidencial) en los PDFs más viejos**: los documentos
   de años tempranos (confirmado en 2012) llevan esta marca de agua en cada página. El propio
   cambio de política documentado DENTRO del PDF de 2018 dice explícitamente que recién "a partir de
   esta edición" (anunciada en 2019) el documento se empezó a publicar también en Jリーグ.jp, la web
   pública de la liga — sugiriendo que años anteriores pudieron haber circulado originalmente solo
   entre clubes/prensa acreditada bajo confidencialidad, no como publicación pública. Hoy, sin
   embargo, los 14 años están alojados sin login en el mismo dominio corporativo oficial
   (`aboutj.jleague.jp`) y se descargan con un `curl` plano — se los trata como fuente primaria
   oficial pública igual que el resto, pero vale la pena que quien cargue datos de un año viejo
   marcado "取扱注意" tenga este matiz presente (no es un documento filtrado ni de un tercero, es la
   liga misma sirviéndolo hoy en su propio dominio, pero el marcado interno sugiere que no siempre
   fue pensado para difusión pública).
4. **Documentos relacionados que NO son la fuente de datos** (para no confundir en el futuro):
   - `J.LEAGUE CLUB MANAGEMENT GUIDE` (aboutj.jleague.jp/corporate/assets/pdf/en/
     MANAGEMENT_GUIDE_2024_WEBSITE_ENG.pdf) es el reglamento/estándares de licencia, en inglés, sin
     cifras de clubes.
   - `J.LEAGUE SEASON REVIEW` (aboutj.jleague.jp/seasonreview<año>/en/management/m_5/) es un resumen
     público en inglés con tendencias agregadas de ingresos/gastos de la liga — útil como
     cross-check en inglés, pero no reemplaza al `club_doc-<año>.pdf` para el detalle por club.
   - Existe también una "Jリーグ クラブ経営ガイド" (`jclub_guide-2025.pdf`) — guía de gestión para
     clubes, tampoco tiene cifras reales.

### Pendiente para una sesión futura

- **HECHO (sesión 2026-09-13, mapeo de datos)**: los 10 clubes objetivo se cargaron al sitio con el
  Ejercicio 2025 (revenue de 3 líneas: Sponsor/Gate/Otros residual, sin costos por club — ver
  corrección arriba). Pendiente real para una sesión futura: **NO se cargaron años anteriores a
  2025** (a propósito, pedido explícito de "ancho antes que profundidad" — hay 14 años de PDFs ya
  descargados, 2012-2025, que permitirían una serie histórica completa de Sponsor/Gate/Total por
  club si alguna vez se prioriza profundidad sobre amplitud).
- fx:150 (JPY/USD) usado para los 10 clubes es un PLACEHOLDER de referencia, no declarado por
  ningún documento de esta fuente (un reporte de gestión deportiva, no un balance con anexo de
  moneda extranjera) — si se encuentra una fuente mejor (ej. tipo de cambio de cierre de año
  calendario 2025 de un sitio de cotización), reemplazar en los 10 `data/<club>-data.js`
  (`fiscalYearMeta[2025].fx`).
- Buscar 2005-2011 con otro ángulo si aparece un lead (ej. Wayback Machine de jleague.jp, no
  intentado todavía en esta sesión).
- Considerar si conviene además buscar el balance/EEFF de la SOCIEDAD operadora de cada club
  individual (muchos clubes J1 son subsidiarias 100% de una corporación matriz — ej. Urawa Reds es
  de Mitsubishi Motors/Corp, Kashima Antlers de Mercari, etc. — un balance societario individual
  podría existir en el Kanpo/EDINET si la matriz cotiza, pero el club en sí normalmente no es una
  entidad cotizante separada). No explorado en esta sesión: el foco fue directo al documento
  consolidado de la liga porque respondía exactamente al objetivo (desglose de ingresos por
  categoría, por club, auditado como condición de licencia).
- Último chequeo: 2026-09-13.
