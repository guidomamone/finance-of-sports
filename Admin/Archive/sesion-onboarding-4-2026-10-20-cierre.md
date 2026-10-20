## Onboarding 4 (2026-10-20)

### Qué cambió
- Reino Unido, lote 98: contesté los 25 casos de la cola (Leeds, Liverpool, Sunderland, Wolves) con los criterios ya decididos: "Staff costs" total va a `wages_squad` (convención ya cargada de cada club: Leeds, Liverpool, Sunderland y Wolves ya lo llevan así); las listas "stated after charging" no se cargan como desglose y los cuadros que la pregunta llama "dejar afuera" quedan afuera (Sunderland 2018-19, nota 6, duplica amortización y venta de jugadores).
- Ajuste `estado` (los escaneos sin estado de resultados): Man City 2021-22 = b2 (pág. 13 del visor) y Tottenham 2022-23 = b3 (pág. 19). Leeds 2020-21 y Liverpool 2022-23 ya se localizan en el ensayo. Falta correr con `--reintentar` (como Fulham: el lote no relocaliza solo).
- St. Gallen 2020, 2021 y 2024: "¿la TV está dentro de Diverse Erträge?": aceptar, con el precedente de 2025 (ajuste `incluye` = broadcasting, `other_income`, `--posible`), y los tres ajustes cargados. Los casos de gestión de St. Gallen no frenan (la tanda de gestiones los toma).

### Qué queda
- Corridas pedidas a la principal (comando y número de lote): lote-105 (Unión Magdalena 2025), lote-99 (alta de Celtic), Man City 2021-22 + Tottenham 2022-23 + Fulham 2021-22 con `--reintentar`, el resto del lote 98 (~US$ 4,20), y St. Gallen (2020, 2021, 2024 y los demás años) cuando haya número.
- Newcastle 2019-20 está transcripto y sin localizar: va al lote para que la cadena de cierres reconozca los 11 meses de 2020-21.

### Onboarding 4: avance (2026-10-20, tarde)
- Cargados: Unión Magdalena 2025; Celtic 2025 (alta, color #018749, liga `gb-scottishpremiership`); lote 108 del Reino Unido: Leeds 2019, 2020, 2022 y 2023, Liverpool 2022, Newcastle 2022 a 2024, Nottingham Forest 2022 y 2023, Sunderland 2019 a 2023, West Ham 2020 a 2024, Wolves 2020 a 2023 (22 años). Forest 2022 salió con el ajuste `fila` de "Other operating (expenses)/income" (-20, L423).
- Cola del lote 108 (66 casos en tres pasadas) contestada con los criterios ya decididos: Staff costs total a `wages_squad`, listas "stated after charging" afuera, cuadros de nota Turnover mal transcriptos (Leeds 2019-20) se cargan con el renglón del estado. Perfil de Leeds: sin socios y sin otros deportes.
- Frenados por script (`Admin/registros/frenados-por-script.jsonl`): Man City 2021-22, Tottenham 2022-23 y Fulham 2021-22 (298 v2, ya en main), y Newcastle 2019-20 (13 meses) y 2020-21 (11 meses) por 298 z2. Dejé ajustes `cierre` y `estado` para Man City, Tottenham, Leeds 2020-21 y Liverpool 2022-23: esperan el merge de v2.
- Gasto de la sesión: US$ 6,27 (934,18 − 927,91) de los US$ 15.
- Pendiente: St. Gallen (número de lote), otros años de Celtic, Silkeborg y Viborg 2025 (partir "Depreciation, amortisation and impairment"), Patro Eisden, Lokeren-Temse, Lierse 2019, Boyacá Chicó, Noruega (63 ejercicios) y el 238.

### Silkeborg 2025 y Viborg 2025: partición de amortización y depreciación (Onboarding 4, 2026-10-20)
- Pedido de la principal (votación 3 a 0): partir "Depreciation, amortisation and impairment" con los importes de las notas. Hecho con ajustes `fila` (una conserva el reemplazo del renglón total) y `--corregir-categoria` (player_amortisation y depreciation), `cargar.mjs --reemplazar --escribir`. Silkeborg: 12.670 = 6.502 (L602) + 6.168 (L616); Viborg: 18.375.737 = 15.751.691 (L1196) + 2.624.046 (L1225). Los totales no cambian. `cargar.mjs` pudo partir la fila: no hay frenado por script.
- Para recargar un año ya cargado con una categoría nueva, `lote.mjs` no sirve (no categoriza lo que ya está en el sitio); sirve la cola con `--corregir-categoria` y `cargar.mjs --desde-verificacion --reemplazar`.

### Onboarding 4: cierre (2026-10-20, noche)
- Cargado: Man City 2022, Tottenham 2023, Fulham 2022, Leeds 2021, Liverpool 2023 y Boyacá Chicó 2025 (lote 111); Celtic 2021 a 2024 (lote 112: estadio y sponsor en `contexto-manual.json`, liga `gb-scottishpremiership` verificada con las listas de 2020-21 a 2022-23, 2020-21 con ajustes `fila` y `resultado-final`); Newcastle 2019, 2020 (13 meses, z2) y 2021 (11 meses, con ajuste `cierre`; hizo falta transcribir 2018-19, US$ 0,23) (lote 114); Silkeborg y Viborg 2025 partidos; Viking AS 2017 a 2024 (lote 115, consolidado como el 2025); Sarpsborg 08 2008.
- Noruega, regla del club asociación y sociedad: descarté en `documentos-descartados.txt` los 8 documentos de Viking FLI 2017-2024 (la AS lleva el fútbol) y el de Sarpsborg Fotball Invest AS 2008 (la FLI lleva el fútbol: 14.930 mil NOK contra 71 mil). Los 10 `.md` de Viking que transcribió Pipeline 6 (FLI 2012, 2014, 2016, 2017, 2018, 2019, 2020, 2021, 2023 y 2024) quedaron sin usar: ninguno es de la AS. Viking FLI 2008-2016 (el club antes de la AS, un solo documento por ejercicio) no está en la lista de 63 y queda para decidir (regla punto 1: se cargaría).
- Gasto de sesión: unos US$ 12,8 de los US$ 15. No alcanza para Molde (17), Fredrikstad (10), Aalesund y Vålerenga; tampoco para el 238.
- Pendientes: Molde, Fredrikstad, Aalesund y Vålerenga (el 283); el 238 (antes, primer lote y costo a la principal); las gestiones de Viking 2017-2024, Celtic 2021 y 2022 y Sarpsborg siguen como casos de la cola (no frenan); línea del auditor de Celtic 2021-2025 y de Sarpsborg 2008 (`auditoria.mjs --pendientes`).
### Onboarding 4: Molde y Beşiktaş (2026-10-20, noche)
- Molde FLI (lote 116, la AS ya estaba descartada): cargados 2009, 2010, 2013 a 2015, 2017 a 2023. Frenados por script (anotados en `frenados-por-script.jsonl`): 2016 y 2024, "numero-no-confirmado" contestado con `corregir` (el PDF dice 7 565 164 en 2016 y 2 558 595 y 11 831 805 en 2024) pero la etapa 7 no arranca. Molde 2008 y 2011/2012 no entraron al sitio todavía: mirar `node tools/estado.mjs`. Medlemsinntekter/tilskudd (mixto, casi todo tilskudd) va a `other_income` cuando la nota no cierra; el perfil de Molde es con socios y sin otros deportes.
- Beşiktaş: la principal lo pasó a Onboarding 5; dejé solo el ajuste `fx` 1,5357 de 2006 y saqué mi `lote-117.txt` (el 117 es de ellos).
- Gasto de sesión: unos US$ 18 de los US$ 30.

### Onboarding 4: cierre final (2026-10-20)
- Molde FLI 2008 a 2023 y 2016, 2024 cargados (los 17 años con `.md`); Celtic 2021-2025: línea del auditor escrita (subagente Sonnet sin Bash, BDO LLP, sin salvedades, citas verificadas por `auditoria.mjs`). Reino Unido (261): todo lo que tenía `.md` está cargado o frenado por z2 (resuelto); Newcastle 2019-21 incluidos.
- Fredrikstad (120): no se arma lote. Después de 2018 la FLI dejó de depositar y los únicos documentos 2008-2011, 2019-2023 y 2025 son de Fredrikstad Fotballinvest AS, que "ingen ansatte" (no tiene empleados, `aarsregnskap-fotballinvest-as-2022.md` L329) y no es el club: ya estaba decidido en `Admin/carga-clubes/fredrikstad-no.md` y en `documentos-descartados.txt`.
- Viking FLI 2012, 2014, 2015, 2016 (121): no se cargan. El propio documento dice que el fútbol está en Viking Fotball ASA, que no consolida (2012 L224, 2014 L86, 2015 L85, 2016 L724): excepción 3 de la regla del club asociación y sociedad; a `documentos-descartados.txt` con cita. Viking 2008-2011 y 2013 no tienen `.md`: se dejan. Viking AS 2017-2024 ya está.
- Noruega que queda: Aalesund y Vålerenga (esperan el 283). Sarpsborg 2008 cargado.
- Gasto de sesión: unos US$ 19,5 de los US$ 30.
