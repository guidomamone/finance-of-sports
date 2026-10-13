# Gestiones por país: nl

Lo que había como comentario en `data/gestiones/nl.js` (data/ se publica: to-do 209), movido tal cual por
`tools/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/nl.js: quién condujo cada club de Países Bajos y desde/hasta cuándo (to-do 195).
El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
cabecera de data/gestiones/ar.js. Los cierres son el 30/6.
Criterio del país: el dueño solo si es una persona con nombre (Go Ahead Eagles); en las demás
sociedades y fundaciones no hay dueño persona, y se carga quien conduce y firma el informe: el
"algemeen directeur" (Ajax: "directievoorzitter"). El voorzitter de la raad van commissarissen y el
del club-asociación (Excelsior, Groningen) no se cargan. Excepción: Volendam, una fundación cuyo
voorzitter del bestuur firmaba el informe hasta 2023 (Kemper, Smit, Veerman); desde 2024 firma la directie.
El `cargo` va con el título neerlandés. Cuando la fuente da solo el mes o el año, el día es 01 por convención.
Fuente: donde dice Clubes/..., es el propio informe anual (ruta del .md o del PDF).
============================================================================
```

_excelsior-nl, antes de Ferry de Haan:_

```text
De Haan: algemeen directeur desde 2012 (en.wikipedia da solo el año: 01/01); se fue a Heerenveen en junio de 2021.
```

_excelsior-nl, antes de Daan Bovenberg:_

```text
Bovenberg: algemeen directeur desde 2021 (nl.wikipedia da solo el año; De Haan ya trabajaba en Heerenveen desde junio de 2021).
```

_fcgroningen-nl, antes de Hans Nijland:_

```text
Nijland: entró al directorio en septiembre de 1996 (nl.wikipedia, mes sin día: 01); último día 14/6/2019.
```

_fcgroningen-nl, antes de Wouter Gudde:_

```text
Gudde: tomó el cargo el 15/6/2019; dejó al final de la temporada 2023/24.
```

_fcgroningen-nl, antes de Frank van Mosselveld:_

```text
Van Mosselveld: presentado en abril de 2024; empezó en julio de 2024 (Omroep Brabant, sin día: 01).
```

_fcvolendam-nl, antes de Piet Kemper:_

```text
Stichting RKFC Volendam: hasta 2023 el informe lo firma el voorzitter del bestuur. Kemper: mandato de 3 años que terminó el 1/7/2022
(inicio 1/7/2019 deducido: 2019/20 fue "el primer año del nuevo bestuur"); firma los informes 2019/20 y 2020/21.
```

_fcvolendam-nl, antes de Jan Smit:_

```text
Smit: voorzitter desde el 1/7/2022; el 30/11/2023 la RvC lo destituyó junto con el bestuur.
```

_fcvolendam-nl, antes de Jaap Veerman:_

```text
Veerman: nombrado voorzitter el 14/12/2023 (Hart van Nederland, 18/12/2023). El fin es aproximado: el informe 2023/24 dice que la directie es hoy también el bestuur.
```

_fcvolendam-nl, antes de Cees Driebergen:_

```text
Driebergen: algemeen directeur desde el 1/7/2024 (sucedió a Frans ten Berge); firma el informe 2023/24 (24/10/2024), por eso `firmo`. Se fue el 1/7/2025.
```

_fcvolendam-nl, antes de Piet van der Pol:_

```text
Van der Pol: desde agosto de 2025 (sin día: 01); se fue el 31/8/2026 tras 13 meses (nhnieuws), todavía sin sucesor en las fuentes.
```

_goaheadeagles-nl, antes de Kees Vierhouten:_

```text
Vierhouten: dueño (89,9% de Go Ahead Eagles Holding BV vía KOWET BV) desde que la KNVB aprobó la compra a Alex Kroes el 22/8/2022. Quien tiene la eindverantwoording
operativa es el statutair directeur Jan Willem van Dop (desde 2018/19, a tiempo completo desde el 1/7/2022); no se carga por el criterio del dueño.
```

_nec-nl, antes de Bart van Ingen:_

```text
Van Ingen: en el club desde abril de 2012; "officieel algemeen directeur" (único statutair directeur) desde el 17/12/2014.
```

_telstar-nl, antes de Pieter de Waard:_

```text
De Waard: 17 años como algemeen directeur (2006 a 2023; solo el año de inicio: 01/01).
```

_telstar-nl, antes de Leon Annokkée:_

```text
Annokkée: algemeen directeur desde el 1/7/2023; firma el informe 2022/23 (30/10/2023), por eso `firmo` (el cierre fue el último día de De Waard).
```
