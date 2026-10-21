# Tramo corto de transición sin hueco, y temporadas COVID (votación de tres, 2026-10-21)

Pedido de Guido: que las consultas por los ejercicios 2019-20 y 2020-21 dejen de llegarle. Votaron tres Sonnet independientes (`votacion-de-criterios`); casos, mediciones y votos con citas: `Admin/registros/auditoria-proceso.jsonl` (líneas «votación: tramo corto…» y «votación: temporadas COVID»).

## Lo medido primero

- **COVID casi no genera preguntas.** De 6.843 casos de la cola, 1.331 (19,5 %) son de documentos 2019-20 a 2021, sobre 212 de 1.027 documentos (20,6 %): la proporción normal, no un exceso. Solo 6 casos nombran covid, pandemia o puertas cerradas, y son de categorización de una línea («Testes COVID», «UEFA COVID Deduction»). Las preguntas `anio-vecino` (42 en esos años) y `anio-anterior` (11) son de perímetro italiano, separato contra consolidato (Lazio, Roma, Inter): 0 de las 242 `anio-vecino` mencionan taquilla.
- **`audit.js` no salta por COVID.** Saltos de ingreso de más de 5 veces: 0 de 61 pares en 2020 y 0 de 70 en 2021; mediana de ingresos sobre el año anterior 0,92 y 1,16. `salto-interanual` y `outlier-liga` hoy no disparan por COVID. Lo único que lo marca es la taquilla en 0 de 2021 (10 de 51 clubes, contra 0 a 4 en los demás años), y el único aviso que hoy lo contempla es `cargar.mjs` línea ~878 («Estadio en 0 en 2021»).
- **No hay chequeo de «taquilla en 0» en `audit.js`:** solo el aviso de `cargar.mjs`. `dudas-por-club.md`: 1 mención de COVID. Notas de sesión: 0.
- **Lo que de verdad le llega a Guido en esos ejercicios son los tramos cortos de cambio de cierre y el perímetro italiano**, no el COVID. Tramos: Fiorentina 2020 (enero a junio), Genoa 2024, Atalanta 2022, Parma 2020. Atalanta 2022 ya está cargada en `data/it/atalanta-it.json` (cierre 2022-06-30 tras 2021-12-31) pese a figurar en `documentos-parciales.txt`: una inconsistencia que esta votación cierra.

## Caso 2 (temporadas COVID): decidido 3 a 0

**Se cargan tal cual, sin ajustar ni anualizar, con una `publicNote` estándar.** «La realidad fue parcial, no el documento» (criterios 5, 7 y 8). Votaron lo mismo en lo central; la ventana (2 de 3) y qué deja de saltar (3 de 3 en lo central).

- **Ventana:** todo ejercicio con `period_end` entre 2020-03-31 y 2021-12-31 inclusive (no hay fecha de inicio en el esquema; con ejercicios de 12 meses equivale a los que se solapan con marzo de 2020 a junio de 2021). Hoy son 190 club-años de fútbol en 118 clubes cargados.
- **`publicNote` estándar** (se agrega al final de la existente, no la reemplaza): «Ejercicio dentro del período de la pandemia de COVID-19 (partidos suspendidos, a puertas cerradas o con aforo limitado entre marzo de 2020 y junio de 2021, según el país). Los importes son los impresos en el balance, sin ajuste: la taquilla y los abonos pueden ser cero o muy inferiores a los de otros años.»
- **Deja de saltar, solo dentro de la ventana:** el aviso «Estadio en 0» de `cargar.mjs` (hoy solo `year === '2021'`) y la taquilla o entradas en 0.
- **Sigue saltando:** `salto-interanual` y `outlier-liga` (guardas de escala: eximirlos les quitaría la vista justo donde un error de unidad se esconde tras «fue COVID»; y hoy no disparan), la cola (`anio-vecino`, `anio-anterior`, `no-cierra`, `primer-anio`: son de perímetro y de tie-out, no de COVID), tie-out, perímetro, escala y signo. Un voto (el 3) eximía también la parte «la taquilla cambió mucho» de `anio-vecino` y `anio-anterior`; no hay ninguna pregunta así en la cola (0 de 242), así que no se codea.
- **Riesgo aceptado:** una taquilla en 0 que sea un error de extracción dentro de la ventana ya no avisa; el tie-out del total sigue atajando que falte plata.

## Caso 1 (tramo corto de transición sin hueco): 2 a 1 por C, y VA A GUIDO

Votos: C, C y B. El 2 a 1 tiene en minoría un precedente de la misma liga y del mismo hecho que es decisión de Guido (Genoa 2024, Atalanta 2022 y Parma 2020 en `documentos-parciales.txt`, 2026-10-07 y 08, «parcial»), así que por la regla de la votación no se cierra sin él. Esos precedentes se decidieron con la premisa de que faltaba el otro tramo («falta: 2023-07-01 a 2023-12-31»), que ya está dentro del año calendario cargado: ese es el punto que se le pregunta.

- **C (recomendada):** el tramo se carga como un ejercicio propio, con `fiscal_year` = año del cierre, `period_end` y una `publicNote`, importes tal cual (sin anualizar: Fiorentina 2020 tiene 10 partidos de la temporada que se jugaron después del 30 de junio y diferidos), **fuera del ranking por año, de la mediana de la liga y de las variaciones interanuales**. Razón: no falta ningún mes, el documento está auditado y la serie queda sin hueco; sin ranking porque seis meses al lado de doce los lee el lector como una caída (criterios 7 y 9). Dos votos.
- **B (la regla de hoy):** se queda parcial; la tool lo registra sola en `documentos-parciales.txt` y no pregunta. El hueco de la serie queda. Un voto, que ve en C un campo nuevo en el esquema y lógica de exclusión que hoy no existen.
- **Criterio que lo distingue de un semestral con balance anual existente (Juve Stabia, Estrela da Amadora), verificable por una tool sin preguntar** (los tres votos lo coinciden en lo sustancial): se carga solo si (a) el ejercicio anterior, cargado o con documento, termina el día anterior al inicio del tramo, (b) el siguiente, cargado o con documento, empieza el día después de su cierre y (c) ningún balance anual cargado o conocido contiene esas fechas. Si alguna falla, es parcial y la tool lo registra sola en `documentos-parciales.txt` con «falta: …» (sin cola). Parma 2020 falla (a) hoy: sigue parcial hasta que aparezca el ejercicio anterior. Juve Stabia y Estrela fallan (c): el anual los contiene.
- **Qué pasa con cada uno:** Fiorentina 2020 y Genoa 2024 se cargan (años nuevos, no cambia ninguno de los cargados); Atalanta 2022 ya está cargada y recibe la nota y la marca, y sale de la lista de parciales; Parma 2020, Juve Stabia y Estrela siguen parciales; RWDM 2019 tiene su regla propia.

## Las dos preguntas para Guido (sí o no, y no vuelven)

1. **Tramo corto sin hueco: ¿C (se carga, fuera de rankings y de la mediana) o B (parcial, como hoy)?** Recomendación: C.
2. **¿Se agrega la `publicNote` de COVID a los 190 club-años ya cargados dentro de la ventana?** Solo agrega una nota, no cambia ningún importe; pasa de 10 años cargados, por eso va a Guido. Recomendación: sí, con un script de una pasada (sesión de datos) y `node tools/publicar.mjs`.

## Texto de la REGLA para `Admin/CONVENCIONES-DATOS.md` (el de la 1 va según lo que conteste Guido)

```
## REGLA: temporadas COVID, se cargan tal cual con una nota estándar (votación 3 a 0, 2026-10-21)

Los ejercicios con `period_end` entre 2020-03-31 y 2021-12-31 se cargan con los importes impresos, sin ajustar ni anualizar, y la fuente lleva la
`publicNote` estándar de COVID (se agrega al final de la existente). Dentro de esa ventana el aviso «Estadio en 0» y la taquilla en 0 de `cargar.mjs` no
piden reintento. `salto-interanual`, `outlier-liga`, el tie-out, el perímetro, la escala y el signo no se tocan: no disparan por COVID (0 de 131 pares con
salto de más de 5 veces en 2020 y 2021) y son los que atajan un error de unidad. Caso: AEK 2021 y Asteras 2021 (taquilla en 0 real), Fiorentina 2020-21
(vouchers y abonos devueltos, impresos en el documento).

## REGLA: tramo corto de transición sin hueco (votación 2 a 1, 2026-10-21; Guido: <C | B>)

[Si C] Un ejercicio de menos de 12 meses que encadena sin hueco con el anterior y el siguiente se carga como un ejercicio propio, con `fiscal_year` =
año del cierre, importes tal cual (sin anualizar) y `publicNote` «Ejercicio de transición de N meses por cambio de la fecha de cierre: del DD/MM/AAAA al
DD/MM/AAAA. No es comparable con un año de 12 meses.», y no entra al ranking por año, a la mediana de la liga ni a las variaciones interanuales. Se carga
solo si (a) el ejercicio anterior (cargado o con documento) termina el día anterior al inicio del tramo, (b) el siguiente empieza el día después de su
cierre, (c) ningún balance anual cargado o conocido contiene esas fechas. Si alguna falla, es parcial (`documentos-parciales.txt`, con «falta: …») y la
tool lo registra sola. Un semestral dentro de un ejercicio cuyo anual existe (Juve Stabia, Estrela da Amadora) falla (c). Casos: Fiorentina 2020, Genoa
2024, Atalanta 2022. [Si B] El tramo corto es siempre parcial; la tool lo registra sola en `documentos-parciales.txt` y no abre caso en la cola.
```

## Qué codea Pipeline (la lista exacta; las condiciones nuevas las aprobé por la sección 7 de la skill de auditoría)

Del caso 2, aprobado ahora:
1. `tools/cargar.mjs` (línea ~878): la exención de «Estadio en 0» pasa de `year === '2021'` a la ventana por `period_end` (2020-03-31 a 2021-12-31); la misma exención para la taquilla o entradas en 0. Mide: los dos casos de hoy (AEK 2021, Asteras 2021) siguen exentos; un ejercicio 2020 o 2021 con cierre en la ventana ya no abre reintento; un ejercicio de otra fecha, igual que hoy (Q2: frena una carga buena, no; Q3: un error de extracción lo atrapa el tie-out del total).
2. `tools/cargar.mjs`: al cargar un ejercicio de la ventana, agrega la `publicNote` estándar a la fuente, sin pisar una nota existente. Mide: un ejercicio fuera de la ventana sale igual.
3. Se apaga con un ajuste `covid: omitir` del documento.

Del caso 1, **después de la respuesta de Guido** (si es C):
4. `tools/cargar.mjs`: la verificación (a) a (c) del tramo corto con los ejercicios cargados y con los documentos de `Clubes/` por fecha; si pasa, lo carga con la nota; si no, lo escribe en `documentos-parciales.txt` con «falta: …» y no abre caso.
5. Esquema: `period_months` opcional en el año de `data/schema/club-v2.json` (aditivo, `contrato-de-datos`); `js/finanzas-calc.js` y `tools/generate-rankings.js` excluyen del ranking por año, de la mediana y de las variaciones interanuales un año con `period_months` menor que 12 (o la marca que se derive de `period_end` si no se agrega el campo); `audit.js` excluye ese año de `outlier-liga` y `salto-interanual`. Mide: ningún año cargado cambia de resultado en los rankings de hoy (todos tienen 12 meses o más, salvo Atalanta 2022, que sale), y `node tools/audit.js` sin P0 ni P1 nuevos.
6. Una sesión de datos: cargar Fiorentina 2020 y Genoa 2024, dejar a Atalanta 2022 con nota y marca y sacarla de `documentos-parciales.txt`. Si es B: solo el punto 4 en su rama parcial.
7. Si Guido dice sí a la pregunta 2: el script de una pasada que agrega la nota COVID a los 190 club-años y `node tools/publicar.mjs` (sesión de datos).
