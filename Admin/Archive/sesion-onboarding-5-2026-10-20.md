## Onboarding 5 (2026-10-20): Suiza, Bélgica, Beşiktaş y Turquía, Colombia

Presupuesto US$ 10; gastado ~US$ 8,5 (Beşiktaş ~5,5, Colombia ~1,2, Westerlo y reintentos ~0,8, resto centavos). Lotes 109 (Suiza), 110 y 110b (Bélgica, Westerlo), 113 y 113b (Beşiktaş), 114, 114b y 114c (Colombia).

### Qué cambió (para CHANGELOG)

- Cargados: Luzern 2023; St. Gallen 2021 y 2024; Lierse SK 2019; Patro Eisden 2014; Lokeren-Temse 2021-2022; Westerlo 2015 (18 meses, modelo abreviado); Llaneros 2025 (alta, perímetro individual, color null).
- Alta de Turquía con Beşiktaş (`tr-superlig` en `data/leagues.js`, listas de la Süper Lig 2006-2022 en la caché) y 13 años: 2009-2011, 2014-2023 (2023 el alta). Quedan afuera 2006-2008 (fx), 2012, 2013 y 2024 (descartados, solo informe de gestión).
- Gestiones: Matthias Hüppi para St. Gallen en `data/gestiones/ch.js` (desde 2018-01-01: nau.ch dice fines de 2017, SRF 2018). 34 casos de gestión de cola contestados (Brasil, OFI, Luzern, Patro) con la regla del 2026-10-20: `descartar`, queda null.
- Respuestas de cola de Beşiktaş por tres subagentes Sonnet (sin Bash), revisadas por mí. Ajustes: amortización junta de 2023 partida por la nota 12 (`fila` + `categoria`), perímetro individual de Llaneros.

### Qué queda (para TODO)

- **Frenados por script** (`Admin/registros/frenados-por-script.jsonl`): (1) compensación intragrupo de St. Gallen ("Entschädigung" de/a Event AG) no se elimina en 2018-19 ni 2019-20: 2019 y 2022 ya cargados la traen sumada en ingresos y gastos (6,405 y 9,8; 2019 = 34,815 contra 28,41); St. Gallen 2020 frena con razón (caso 3531cbd) hasta que se arregle y se reemplacen 2019 y 2022. (2) Beşiktaş 2006, 2007 y 2008: el documento declara varios tipos de cambio a USD y la tool no elige.
- **Patro Eisden 2013 y 2015**: sin sponsor con fuente (2015 es Second Division); 2013 con liga null. Pregunta de criterio a la principal.
- **Beşiktaş 2018**: la extracción no trae el desglose de la nota 18; se cargó el total del costo de ventas (620,3 M) como `lump_football_operations_expense` (corrijo mi `no_es_rubro`). Defecto de extracción, sin daño en los totales.
- **Colombia**: Deportes Tolima 2023 (el `.md` no trae el estado de resultados: empieza en las notas, pág. 20; igual los 2024-2025 de Tolima, La Equidad, Alianza, Bucaramanga y Águilas Doradas: sin estado de resultados) y Alianza FC 2023 (alta sin hacer: color, liga y su cola de 6 casos; reintento por Salarios, Televisión y Estadio en 0). Águilas Doradas 2025: 13 páginas en imagen, `--reintentar`. Once Caldas y Envigado ya estaban.
- Gestiones sin fuente que quedaron en null: CRB 2020, Cuiabá 2022-2025, Ferroviária 2010-2013 y 2023, Goiás 2011-2013 y 2017, OFI 2018, Luzern, Patro 2013-2016 y 2021. Búsqueda general y wiki-extracto sin fuente con fecha.
- Criterios a mirar (mías, sin precedente): "Futbolcu Satış Zararı" en el costo de ventas (2009-2011) como `player_amortisation`; intereses por pagos diferidos de Beşiktaş ("Tecil faiz", "Reeskont") como `other_expenses` (la sociedad los pone en operativos); Llaneros con sponsor "Maxi Cola" (la página lista tres); 2008 de Beşiktaş trae ingresos financieros (31,85 M) dentro de ingresos operativos en el documento 2008 (el 2009 los separa): mirar cómo quedó 2009-2011 y qué hacer con 2008 cuando se destrabe el fx.
- Sin línea del auditor: los años cargados hoy (`node tools/auditoria.mjs --pendientes`).

### Qué deja de ser cierto en ESTADO

- Turquía existe en el sitio (Beşiktaş, 13 años); Colombia suma Llaneros; St. Gallen tiene 2019, 2021-2025 menos 2020; Bélgica suma Westerlo 2015.
### Onboarding 5, segunda tanda (2026-10-20)

- St. Gallen 2019 y 2022 recargados con `--reemplazar` (sin la compensación intragrupo, 298 ai) y St. Gallen 2020 cargado (sponsor St.Galler Kantonalbank con fuente, L27 del informe). Patro Eisden 2013 y 2015 cargados con sponsor `sin-fuente` (2013 con liga null, 2015 con el caso anio-anterior aceptado: cambio de modelo abreviado a completo).
- Gasto total de la sesión ~US$ 9. Sin hacer por presupuesto: Lierse Kempenzonen 2018-2021 (alta nueva, 7 casos en cola), La Louvière 2018-2024, Alianza y Tolima de Colombia.
- Lotes 115 y 115b (St. Gallen), 116 y 116b (Patro, Lierse Kempenzonen).
### Onboarding 5, tercera tanda (2026-10-20, lotes 117-119)

- Beşiktaş 2006, 2007, 2008 y 2018 cargados (fx 2006 por ajuste; ingresos financieros 2008 a netInterest; 2018 con ajuste `desglose` -98157). Beşiktaş queda con 2006-2011 y 2014-2023.
- Lierse Kempenzonen vzw (alta, BCE 0412.539.416, club actual de Lier, stamnummer 3970) 2018-2021: ajustes `fila` de impuestos en 2019 y 2020 y de Brutomarge en 2019 (el `.md` los omite); liga 2018 null (sin fuente que la ubique); colores amarillo y negro, brandColor #FFD500 estimado.
- Alianza FC S.A. 2023 (alta; la sociedad se llamaba Alianza Petrolera FC hasta 2023): nota 14 abierta por ajustes `fila` y `categoria` (las devoluciones en ventas, 513 M, quedan como gasto; ingresos brutos de devoluciones); nómina deportiva a `wages_squad`; sponsor `sin-fuente`; brandColor null.
- API gastada: ~US$ 0,04 (rubros sin caché de Claude). No se hizo: La Louvière 2018-2024 (necesita localizar/extraer pagos) y Tolima, La Equidad, Bucaramanga y Águilas Doradas (idem); pregunta a la principal sobre los ~US$ 0,74 de La Louvière.

- La Louvière (lote 118b, API ~US$ 0,65 autorizada por Guido): cargados 2018, 2019, 2021-2024 (modelo abreviado, Brutomarge a `lump_football_operations`). 2020 sin estado en la transcripción (2 páginas en imagen: `--reintentar`). Ligas: 2021-2022 `be-div2amateur`, 2023-2024 `be-div1amateur`, 2018-2019 null (la caché mezcla RAAL con La Louvière Centre). Estadio Stade du Tivoli.
- Colombia (Tolima, La Equidad, Bucaramanga, Águilas Doradas): todos necesitan localizar/extraer pagos; no se hizo nada con US$ 0. Los `estados-financieros-2025` de Tolima, La Equidad y Bucaramanga no traen estado de resultados (candidatos a `documentos-descartados.txt` con ok).
