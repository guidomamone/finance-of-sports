# Gestiones por país: no

Lo que había como comentario en `data/gestiones/no.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/no.js: quién condujo cada club de Noruega y desde/hasta cuándo (to-do 195).
El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
cabecera de data/gestiones/ar.js. Los clubes noruegos son foreninger (asociaciones, sin dueño) o AS
(Sandefjord, Sarpsborg Fotball Invest): la gestión es el styreleder (presidente del directorio) de la
entidad que firma el documento del alta, como lo pide el `name` de cada club (Molde Fotballklubb,
Viking Fotballklubb, Aalesund y Fredrikstad: la forening, no la AS filial).
FUENTE: salvo donde se cita otra, es el propio årsregnskap/årsberetning (ruta del .md en
Clubes/Noruega/<club>/), donde el styreleder firma el informe y figura en "Styrets sammensetning".
CONVENCION DE FECHAS: los informes dicen quién presidía al firmar, no el día del cambio. Cuando el
cambio cae entre dos informes consecutivos, el nuevo presidente asume el 01/01 del año de su primer
ejercicio firmado (aproximado, el cambio real suele ser en el årsmøte de febrero-marzo del año siguiente
al ejercicio) y el anterior termina esa misma fecha. El primer presidente de cada club arranca el 01/01
de su primer ejercicio con documento (la fuente no da el inicio real), y el último de una serie que
termina antes de 2025 cierra el 01/01 posterior a su último ejercicio documentado. Las fechas exactas
(årsmøte o aviso del propio informe) están marcadas en el comentario de cada gestión.
Donde falta el documento de uno o más ejercicios entre dos presidentes distintos, el hueco queda sin cubrir.
============================================================================
```

_aalesund-no, antes de Torill Hole Standal:_

```text
Forening (Aalesunds FK, aarsregnskap-fotballklubb-fli-*). Fechas por convencion. Standal firma 2008 a 2010.
```

_bodoglimt-no, antes de Benn Eidissen:_

```text
Eidissen: presidente hasta el 15/1/2009 (informe 2008: "Leder Benn Eidissen (til 15. januar 2009)"); desde 01/01/2008 por convencion.
```

_bodoglimt-no, antes de Frode Thomassen:_

```text
Thomassen: presidente interino desde el 15/1/2009 (informe 2008); firma 2009 y 2010 como styreleder.
```

_bodoglimt-no, antes de Hege Leirfall Ingebrigtsen:_

```text
Ingebrigtsen: firma 2017; la ficha de la temporada 2021 en en.wikipedia la da de presidenta (2019 y 2020 igual). Sin informes 2018 a 2022: continuidad por esas fichas.
```

_bodoglimt-no, antes de Inge Henning Andersen:_

```text
Andersen: ficha de la temporada 2022 en en.wikipedia (sin fecha de asuncion: 01/01/2022 por convencion); firma 2023 a 2025.
```

_fredrikstad-no, antes de Gunnar Umbach Hansen:_

```text
Forening (Fredrikstad FK, aarsregnskap-fotballklubb-fli-*). Umbach Hansen: tras el årsmøte extraordinario de marzo de 2012 (informe 2012, sin dia: 01).
```

_fredrikstad-no, antes de Arne Erik Olsen:_

```text
Olsen: elegido en el årsmøte del 14/8/2013 (informe 2013: al traspasar FFK Sport AS a la forening).
```

_hamkam-no, antes de Morten Andreas Meyer:_

```text
Meyer firma 2009; no hay informe 2010, queda sin cubrir.
```

_hamkam-no, antes de Morten Kristiansen:_

```text
Kristiansen: "På årsmøtet i februar 2013 ... Morten Kristiansen tok over" (informe 2013, sin dia: 01).
```

_kfum-no, antes de Gaute Hartberg:_

```text
Oslo KFUM: presidente del hovedstyre (leder) en los informes 2018 y 2019.
```

_kristiansund-no, antes de Terje Wiik:_

```text
Wiik firma 2011 y 2013 (no hay documento 2012).
```

_molde-no, antes de Oddne Hansen:_

```text
Forening (Molde Fotballklubb). El nombre "Oddne Hansen" es como lo imprime el informe 2008 (posible error de OCR de otro nombre).
```

_molde-no, antes de Erik Berg:_

```text
Berg: el hovedstyre elegido en el årsmøte del 25/2/2009 lo tiene de leder (informe 2009); sigue tras los årsmøtes de 2010 y 2011.
```

_molde-no, antes de Øystein Neerland:_

```text
Neerland: leder tras el årsmøte del 29/2/2012 (informe 2012); sigue tras el del 26/2/2014. En 2015 el informe lo firma Moen como "styrets leder (konst)" y nombra a Neerland "klubbens leder".
```

_molde-no, antes de Odd Ivar Moen:_

```text
Moen: firma 2015 como interino (firmo) y 2016 a 2025 como styrets leder.
```

_rosenborg-no, antes de Terje Svendsen:_

```text
Svendsen firma el informe 2008 (11/2/2009), 2009, 2010 y 2011.
```

_rosenborg-no, antes de Ivar Koteng:_

```text
Koteng: "På årsmøtet i februar 2012 ... Ivar Koteng tok over" (informe 2012, sin dia: 01).
```

_sandefjord-no, antes de Gunnar Bjønness:_

```text
Sandefjord Fotball AS: Bjønness firma desde el informe 2008 hasta el 2025 (el nombre sale impreso de formas distintas por OCR). Sin dueño con nombre.
```

_sarpsborg08-no, antes de Jon Andersen:_

```text
Sarpsborg Fotball Invest AS (el documento es del vehiculo inversor, no del club): Jon Andersen firma 2008 y Jon Roger Andersen 2023; el nombre coincide, pero los ejercicios 2009 a 2022 no tienen documento.
```

_start-no, antes de Audun Myhre:_

```text
IK Start (forening). Myhre: elegido en el årsmøte de marzo de 2009 (informe 2009, sin dia: 01). Dejó en agosto de 2009.
```

_start-no, antes de Tom Edvardsen:_

```text
Edvardsen: asumio el 15/9/2009 hasta el årsmøte (informe 2009; la fecha del årsmøte 2010 no figura: 01/01/2010 por convencion). Firma 2009.
```

_start-no, antes de Magne Kristiansen:_

```text
Kristiansen: leder del styre elegido en el årsmøte de marzo de 2014 (informe 2014, sin dia: 01). No hay documentos 2010 a 2013.
```

_valerenga-no, antes de Erling Lind:_

```text
Lind: styreleder de Vålerenga Fotball AS (informe 2020); Munkvold: styreleder en el informe 2023 de la forening matriz. Entidades distintas: ver criterio en el reporte.
```

_viking-no, antes de Charlie Granfelt:_

```text
Viking FK (forening). Granfelt (leder en 2015) y Bertelsen (leder en 2022); sin documentos entre medio.
```
