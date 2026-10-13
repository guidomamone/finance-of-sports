# Gestiones por país: be

Lo que había como comentario en `data/gestiones/be.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/be.js: quién condujo cada club de Bélgica y desde/hasta cuándo (to-do 149 y 195).
El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
Criterio del país: si hay un dueño persona (Antwerp, Anderlecht, Gent, Charleroi, Westerlo, Dender, Mechelen,
Standard con Duchâtelet y Venanzi) se carga el dueño con cargo 'Dueño' durante todo su período, y los presidentes
formales que firman van en comentarios. Sin dueño persona (clubes asociación/vzw, Genk, Zulte, Cercle) se carga el
presidente del consejo ('Voorzitter'; 'Président' en los clubes francófonos). Un grupo o fondo no es persona
(Standard 2022-2025 con 777 Partners y A-Cap, Cercle con AS Monaco, STVV con DMM): ahí no hay entrada.
Cuando la fuente da solo el año o el mes, el día es 01 por convención. Fuente: donde dice Clubes/..., es el propio
informe anual (ruta del .md). Los cierres belgas son el 30/6, salvo Westerlo (31/12 hasta 2013) y OH Leuven (31/12 hasta 2018).
Una gestión con confirmada:false no se muestra en el sitio: está cargada para revisión.
============================================================================
```

_ohleuven-be, antes de Chris Vandebroeck:_

```text
Vandebroeck: voorzitter van de Raad van Bestuur desde el 14/1/2017 (informe del ejercicio 2017); Wikipedia lo ubica 2016-2018. King Power entró al consejo el 8/6/2017.
```

_ohleuven-be, antes de Vichai Srivaddhanaprabha:_

```text
Vichai: entró al consejo el 19/7/2018 y murió el 27/10/2018. King Power es el grupo de la familia Srivaddhanaprabha; Aiyawatt, su hijo, sigue.
```

_raallalouviere-be, antes de Salvatore Curaba:_

```text
Curaba: fundador del club relanzado en 2017, président du conseil d'administration desde el 12/5/2017 y accionista mayoritario (70%, lavenir 2025).
```
