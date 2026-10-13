# Gestiones por país: gr

Lo que había como comentario en `data/gestiones/gr.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/gr.js: quién condujo cada club de Grecia y desde/hasta cuándo (to-do 195).
El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre
(AEK, Panathinaikos, AEL, OFI); donde hay dos dueños sin uno que conduzca (Asteras) o el dueño no
aparece y quien conduce es el presidente del directorio (Levadiakos, Volos, Panserraikos), se carga el
presidente que firma el balance. Cuando la fuente da solo el año o el mes, el día es 01 por convención
(se avisa en el comentario de la gestión). Los cierres son el 30/6.
Presidentes formales de Panathinaikos mientras Alafouzos seguía de dueño (Wikipedia, List of Panathinaikos
F.C. presidents): Mavrokoukoulakis 21/4/2017 al 29/9/2017, Konstantinou 29/9/2017 al 25/2/2019, Mavrokoukoulakis
25/2/2019 al 11/7/2022. Quedan fuera por el criterio del dueño; los balances 2017 a 2022 los firman ellos.
============================================================================
```

_aekathens-gr, antes de Dimitris Melissanidis:_

```text
Melissanidis: dueño de hecho desde que volvió al club como administrador (7/6/2013, tras el descenso administrativo) hasta julio de 2024, cuando
traspasó la conducción y las acciones a Iliopoulos (en.wikipedia da solo el mes: dia 01). Evangelos Aslanidis es el presidente del directorio que firma
los balances 2016 a 2025 (Presidente del Consejo desde julio de 2014), pero no es el dueño: no se carga (criterio de la cabecera de ar.js).
```

_aekathens-gr, antes de Marios Iliopoulos:_

```text
Iliopoulos: armador, nuevo dueño de la PAE AEK (presentado por Melissanidis en junio de 2024; traspaso en julio). Dia 01 aproximado.
```

_asterastripolis-gr, antes de Giorgos Borovilos:_

```text
Borovilos: presidente del directorio y director ejecutivo (firma los balances 2019 a 2025); los dueños son dos (Bakos y Kaimenakis), sin uno que conduzca.
No se encontró la fecha en que asumió: la primera en que la prensa lo nombra presidente es el 4/10/2013 (Neos Kosmos, comunicado por la salida de Tsiolis). Asumió antes.
```

_levadiakos-gr, antes de Dimitrios Pantiskos:_

```text
Pantiskos: presidente del directorio y director ejecutivo desde diciembre de 2016 (fuente secundaria, sin día: 01); firma los balances 2019 a 2025.
Los dueños son los Kolokythas (Andreas 59,93%, Konstantinos 10,60%), que no conducen. En 2026 el sitio del club ya muestra a Aikaterini Kompoti de presidente y a Pantiskos de director ejecutivo (sin fecha).
```

_oficrete-gr, antes de Michalis Bousis:_

```text
Bousis: aprobado como mayor accionista el 4/10/2018 y asumió la presidencia el 10/10/2018 (en.wikipedia). Dueño y presidente; los balances los firma en su nombre el vicepresidente primero.
Antes (ejercicio 2018) no se encontró quién presidía.
```

_panserraikos-gr, antes de Anastasios Kazias:_

```text
Kazias: dueño y presidente (firma los balances 2022 a 2025). La PAE se constituyó el 22/7/2020 (primer ejercicio 22/7/2020 a 30/6/2021); la primera fecha documentada con
él como presidente es el informe del directorio del 2/12/2021. Asumió antes: no se encontró la fecha exacta.
```

_volosnfc-gr, antes de Achilleas Beos:_

```text
Beos: alcalde de Volos; asumió la presidencia el 24/7/2020 al frente de la administración provisoria que designó el tribunal (Ethnos) y firma los balances 2021 a 2023.
La PAE anunció el 14/7/2021 que seguiría presidiendo hasta junio de 2024: hasta = 1/7/2024 (aproximado).
```

_volosnfc-gr, antes de Giorgos Spyridopoulos:_

```text
Spyridopoulos: ya era director ejecutivo en 2019 (firmaba los balances 2019 y 2020 como tal); desde 2024 firma como "Presidente y Director Ejecutivo". La fecha del cambio no se encontró:
desde = 1/7/2024 (aproximado, fin del mandato de Beos). `firmo:[2024]`: el balance al 30/6/2024 lo firma él como presidente (17/12/2024).
```
