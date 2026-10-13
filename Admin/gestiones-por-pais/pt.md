# Gestiones por país: pt

Lo que había como comentario en `data/gestiones/pt.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/pt.js: quién condujo cada club de Portugal y desde/hasta cuándo (to-do 195).
El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
cabecera de data/gestiones/ar.js. En una SAD se carga el dueño solo si es una persona con nombre
(Alverca hasta febrero de 2025, Estrela da Amadora, Famalicão, Rio Ave desde 2024); donde el dueño es
el club (asociación) o un fondo/sociedad sin persona que conduzca, se carga el presidente que firma
el balance. Cuando la fuente da solo el año o el mes, el día es 01 por convención (se avisa en el
comentario). Los cierres son el 30/6 en todos los clubes (Tondela: ver su comentario).
Los "relatório e contas" de las SAD nombran al presidente del conselho de administração; donde la
fuente es el informe se cita la ruta de la transcripción en Clubes/Portugal/<club>/.
Presidentes formales que quedan fuera por el criterio del dueño:
 - Famalicão: Luís Miguel Pimenta Ribeiro (Miguel Ribeiro), presidente del conselho de administração
   que firma el balance 2021/22 (CEO desde 2018 y luego presidente del conselho, según A Bola).
 - Rio Ave desde 2024: Alexandrina Cruz sigue como presidente (club y administración de la SAD) y firma
   el balance 2024/25 junto a Souloukou y Rabuano; el dueño es RAH Sports Investments (Marinakis).
 - Moreirense: Vítor Magalhães sigue de presidente del club (reelecto en 2024, candidato 2026/28).
 - Estrela da Amadora: en agosto de 2026 se anunció la venta del 90% de la SAD (Mosmang sería el nuevo
   presidente): todavía no cerrada, la gestión de Lopo queda abierta.
Quedan SIN gestión los ejercicios de las demás carpetas de Clubes/Portugal/ (sin alta, sin documento).
============================================================================
```

_moreirense-pt, antes de Domingos Vítor de Abreu Magalhães:_

```text
Magalhães: presidente del club desde 2008 (abola 2026, solo el año: dia 01; antes ya presidió 1996 a 2004) y primer presidente de la SAD (creada en 2013) hasta 2025;
el club era el dueño de la SAD. Los balances 2022 a 2024 los firma él (relatório e contas, "Administrador - Presidente").
Hasta el 25/6/2025: el club anunció a Bezbatchenko de presidente de la SAD el miércoles 25/6/2025 (a bola, 25/6/2025).
```

_moreirense-pt, antes de Tim Bezbatchenko:_

```text
Bezbatchenko: ejecutivo del fondo Black Knight Football Club (BKFC), que compró la mayoría de la SAD (aprobado por los socios el 31/5/2025, 66,67% al 30/6/2025);
firma el balance 2025 como presidente del conselho de administração.
```

_rioave-pt, antes de António da Silva Campos:_

```text
Silva Campos: presidente de la dirección del club desde 2008 (soccerway, solo el año: dia 01) hasta el 1/7/2023 (eleccion anticipada). Firma los informes 2015 a 2022
(el club y Futebol SDUQ, Lda., la sociedad unipersonal del fútbol profesional, cuya gerencia integra).
```

_rioave-pt, antes de Maria Alexandrina da Silva Costa Cruz:_

```text
Cruz: elegida (lista única) el sábado 1/7/2023 (elecciones adelantadas al 1 de julio), primera mujer presidenta de un club profesional de Portugal.
Firmó el informe de Futebol SDUQ de 2022/23 (cierre 30/6/2023, anterior a su asunción) como presidenta: por eso `firmo`. Preside hasta la entrada de RAH (30 o 31/5/2024).
```

_rioave-pt, antes de Evangelos Marinakis:_

```text
Marinakis: dueño de la SAD desde su transformación (escritura del 31/5/2024 según el informe 2024/25; el informe 2023/24 dice 30/5): RAH Sports Investment Limited, 80% (en.wikipedia lo lista de dueño).
Cruz sigue de presidente formal y firma el balance 2025 (ver cabecera).
```

_vitoriaguimaraes-pt, antes de Júlio Mendes:_

```text
Mendes: presidente del club desde 2012 (es.wikipedia / pt.wikipedia, solo el año: dia 01), creó la SAD; renunció el 27/5/2019 y siguió hasta la elección de su sucesor.
El club es el accionista mayoritario de la SAD: se carga el presidente del club, que también conduce la SAD.
```

_vitoriaguimaraes-pt, antes de Luís Miguel Vinagreiro Pinto Lisboa:_

```text
Pinto Lisboa: ganó la elección del 20/7/2019 (50,6%); no se halló la fecha de la toma de posesión: se usa la de la elección. "Presidente Executivo" de la SAD en el informe 2020/21.
```

_vitoriaguimaraes-pt, antes de António Miguel Cardoso:_

```text
Cardoso: elegido el 5/3/2022 (62,5%) y reelecto el 1/3/2025; el informe 2021/22 dice que la administración de la SAD cambió en marzo de 2022 (no da la fecha de asunción: se usa la de la elección).
Renunció (oficial el 14/4/2026); Rui Rodrigues fue elegido después (elecciones del 13/6/2026), sin ejercicio cargado todavía: no se carga.
```

_alverca-pt, antes de Ricardo Vicintin:_

```text
Vicintin: empresario brasileño, accionista mayoritario y presidente de la SAD; llegó al club en 2018 (flashscore, solo el año: dia 01; el informe 2023/24 habla de 5 años de inversión).
Vendió su participación el 17/2/2025 a inversores ligados a Vinícius Júnior (comunicado del club, record).
```

_alverca-pt, antes de José Miguel Roda de Albuquerque:_

```text
Albuquerque: aceptó presidir la SAD un mes después de la venta (fecha exacta no hallada: 01/03/2025 aproximado); entre medio el CEO Matheus Ornelas condujo la SAD.
Firma el balance 2025 como presidente del conselho de administração. Los nuevos dueños son un grupo de inversores, sin una persona que conduzca.
```

_estreladaamadora-pt, antes de Paulo Jorge Coelho Lopo:_

```text
Lopo: dueño y presidente de la SAD (constituida el 22/6/2020 según el informe 2021/22; compró la SAD por 72 mil euros, record); presidente del conselho de administração en los informes 2022 a 2024.
Asumió también la presidencia del club en 2024 (cuadrienio 2024 a 2028). Sigue abierta (ver cabecera).
```

_famalicao-pt, antes de Idan Ofer:_

```text
Ofer: Quantum Pacific Group (Idan Ofer) compró el 51% de la SAD (anunciado el 29/6/2018) y subió al 85% en 2019; wikipedia lo lista de dueño. El presidente del conselho que firma el balance 2022 es Miguel Ribeiro (ver cabecera).
```

_nacional-pt, antes de Rui Alves:_

```text
Rui Alves: presidente del club (dueño de la SAD, constituida el 31/8/2011); presidió desde 1994, dejó en 2014 para postularse a la Liga y volvió en junio de 2015 (solo el mes: dia 01). Reelecto en junio de 2024 (2024 a 2027).
Primer período (1994 a 2014) fuera del rango de los documentos.
```

_tondela-pt, antes de Gilberto Neves Coimbra:_

```text
Coimbra: presidente del club desde 2004 (a bola 2026, solo el año: dia 01; otras fuentes dicen 2001 o 2003) y presidente de la SAD tras recuperar el club el 80% en 2022 y desde la venta a Grupo Élite (feb. 2025).
El alta tiene perímetro en pregunta (CD Tondela asociación al 31/12/2021 vs CD Tondela Futebol SAD al 30/6/2021): el administrador de la SAD en 2021 era de Hope Football Europe (Eduardo Rebelo da Silva, David Belenguer, Miguel Mendez; el informe no dice quién presidía), por eso la gestión vale para el club.
```
