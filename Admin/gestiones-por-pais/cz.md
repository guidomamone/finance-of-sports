# Gestiones por país: cz

Lo que había como comentario en `data/gestiones/cz.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/cz.js: quién condujo cada club de República Checa y desde/hasta cuándo (to-do 195).
El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre
(Sparta, Slavia desde 2006); donde el dueño es una sociedad o no se encontró, se carga el presidente del
directorio (předseda představenstva) que firma el balance. Cuando la fuente da solo el año o el mes,
el día es 01 por convención (se avisa en el comentario). Los cierres son el 31/12 o el 30/6 según el club.
Fuentes que son un informe anual del propio club: se cita la ruta de la transcripción en
Clubes/República Checa/<club>/ (los estados checos nombran al "předseda představenstva" que firma y
publican la lista de cambios del registro mercantil).
Presidentes formales de Sparta mientras Křetínský seguía de dueño: Košťál (hasta julio de 2005, los
balances 2004 y anteriores los firma él), y desde 2017 firma el vicepresidente Čupr. Quedan fuera por
el criterio del dueño.
FK Pardubice (pardubice-cz) no tiene gestión: los estados son de FK Pardubice, z.s. (spolek, sin
nombres de dirigentes en el documento) y el perímetro del alta está en pregunta; el presidente del
directorio de la a.s. profesional es Vít Zavřel (en.wikipedia), sin fecha. No se inventa.
============================================================================
```

_spartapraha-cz, antes de Axel Diekmann:_

```text
Diekmann: Vltava-Labe-Press (Diekmann, 94,86%) compró el club en 1999 (cs.wikipedia, solo el año: dia 01). Controló hasta el 1/6/2004 (informe 2004, "zpráva o vztazích").
El presidente del directorio que firmaba era Vlastimil Košťál (desde el 24/6/1999), que quedó fuera por el criterio del dueño.
```

_spartapraha-cz, antes de Daniel Křetínský:_

```text
Křetínský: desde el 1/6/2004 el accionista mayoritario es J&T Credit Investments (99,86%); cs.wikipedia: "el grupo J&T liderado por Křetínský compró el 99,6%" (verano de 2004).
Formalmente fue vicepresidente del directorio desde el 1/7/2004 y presidente desde 2005/2006 (el balance 2006 ya lo firma de presidente). Sigue de dueño (único beneficiario final desde marzo de 2022).
```

_slaviapraha-cz, antes de Miroslav Ondříček:_

```text
Ondříček: presidente del directorio en los balances de 1996, 1998, 2001, 2002, 2003 y 2004 (informes anuales). No se encontró cuándo asumió ni cuándo dejó
(presidía el 24/2/2005 y el registro dice que en 2006 el presidente era Leška, que dejó el 25/8/2006): sin fecha confiable, queda sin confirmar. ENIC era el dueño (sociedad).
```

_slaviapraha-cz, antes de Tomáš Rosen:_

```text
Rosen: mayoritario desde mayo de 2006 (cs.wikipedia, comunicado del club de marzo de 2008, solo el mes: dia 01); presidente del directorio en los balances 2008 a 2010 (el de 2007 lo firman Doležal y Rosen sin cargo).
Renunció a la presidencia el 16/2/2011 (informe 30/6/2011): ese ejercicio queda sin gestión (el directorio no tiene presidente; el dueño del momento no está claro).
```

_slaviapraha-cz, antes de Aleš Řebíček:_

```text
Řebíček: Aleš Řebíček compró el club en agosto de 2011 y fue su presidente (cs.wikipedia, solo el mes: dia 01); el presidente formal del directorio fue su hijo Adam Řebíček
(balances 2012 a 2014) y David Trunda al 30/6/2015. CEFC adquirió el 59,97% el 4/9/2015.
```

_slaviapraha-cz, antes de Jiří Šimáně:_

```text
Šimáně: presidente del directorio con CEFC mayoritaria (59,97%) y su Fly Sport Investments (39,97%); renunció el 6/4/2016.
```

_slaviapraha-cz, antes de Jaroslav Tvrdík:_

```text
Tvrdík: presidente del directorio dos días después de la renuncia de Šimáně (cs.wikipedia: 8/4/2016; el informe anual dice que la asamblea del 16/6/2016 lo eligió formalmente).
Los dueños eran sociedades (CEFC, CITIC). Hasta diciembre de 2023, cuando Tykač compró el club; sigue de presidente del directorio y firma los balances 2023 y 2025.
```

_slaviapraha-cz, antes de Pavel Tykač:_

```text
Tykač: dueño desde diciembre de 2023 (en.wikipedia y cs.wikipedia, solo el mes: dia 01), 99,98% del club y el estadio.
```

_bohemianspraha1905-cz, antes de Emil Kristek:_

```text
Kristek: elegido presidente del directorio en 2006 (informe 2006, solo el año: dia 01); el 14/12/2007 el directorio eligió a Frelich.
```

_bohemianspraha1905-cz, antes de Arne Kejdana:_

```text
Kejdana: la asamblea de 2009 lo hizo presidente (informe 2009; no da el día: 01/01). Firma el balance 2009 el 18/7/2010 como presidente.
```

_bohemianspraha1905-cz, antes de Dariusz Jakubowicz:_

```text
Jakubowicz: la asamblea de 2010 lo eligió al directorio (el informe 2010 no da el día; fue posterior al 18/7/2010, cuando Kejdana todavía firmaba de presidente: 18/7/2010 es aproximado).
La familia Jakubowicz (Barvy a laky Hostivař) es la accionista mayoritaria; sigue de presidente del directorio.
```

_duklapraha-cz, antes de Marek Lukáš:_

```text
Lukáš: presidente del directorio desde la constitución de la sociedad (24/4/2007, informe 2007). Hasta el 10/9/2008, fecha de la inscripción del nuevo directorio en el registro (la asunción fue algo antes).
```

_mladaboleslav-cz, antes de Josef Dufek:_

```text
Dufek: presidente del directorio en todos los balances 2002 a 2023 y dueño por GEMA MB (mayoría). No se encontró cuándo asumió (ya presidía en la asamblea del 30/6/2003 que aprobó el balance 2002):
sin fecha confiable, queda sin confirmar. Dejó el 27/6/2024 (ceskenoviny.cz, publicado el 28/6/2024, "tras la reunión del jueves").
```

_mladaboleslav-cz, antes de Jiří Šimáně:_

```text
Dueño desde 2024 (criterio del dueño persona, como en el resto del archivo): Jiří Šimáně, según cs.wikipedia (FK Mladá Boleslav). Guido
dio por buena esa fuente el 2026-10-10. La prensa de junio de 2024 (ceskenoviny.cz) habla de David Trunda tomando el 51% y la presidencia
del directorio; Trunda (hasta el 23/8/2025) y luego Luboš Bartůněk (registro, podnikatel.cz) son los presidentes formales que firman.
```
