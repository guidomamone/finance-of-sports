# Gestiones por país: tr

Lo que había como comentario en `data/gestiones/tr.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen
balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en
su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/gestiones/tr.js: quién condujo cada club de Turquía y desde/hasta cuándo (to-do 195).
El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
cabecera de data/gestiones/ar.js. En los clubes asociativos grandes (Galatasaray, Fenerbahçe, Beşiktaş,
Trabzonspor) la conducción real es el presidente del club (dernek başkanı), elegido por los socios, que
además preside la A.Ş.: esa es la gestión. En Başakşehir se carga a Göksel Gümüşdağ, que figura como
presidente. Cuando la fuente da solo el año o el mes, el día es 01 por convención (se avisa en el comentario).
Cierres: Alanyaspor 31/12 hasta 2021 y 31/5 desde 2022; Beşiktaş, Fenerbahçe y Trabzonspor 31/5;
Galatasaray 31/5 o 31/8 de 2019 (el documento se contradice); Gaziantep FK 31/5 y 31/12 de 2023;
Başakşehir 31/12; Kocaelispor 31/7/2020 (no confirmado). Fatih Karagümrük, Kasımpaşa y Konyaspor
no tienen documentos todavía: sin gestiones.
============================================================================
```

_alanyaspor-tr, antes de Hasan Çavuşoğlu:_

```text
Çavuşoğlu: presidente desde 2011 (tr.wikipedia da solo el año: dia 01); reelegido en 2018 y en junio de 2024. Sigue.
```

_galatasaray-tr, antes de Mustafa Cengiz:_

```text
Cengiz presidía al 31/5/2019 y al 31/8/2019 (el documento 2019 se contradice en la fecha de cierre; da igual para la gestión).
```

_gaziantepfk-tr, antes de Cevdet Akınal:_

```text
Akınal: Büyükekşi le traspasó la presidencia en la asamblea del 25/5/2021 (Cumhuriyet, nota del 24/5/2021 que la anuncia para "mañana"); renunció el 10/1/2023 (Posta).
```

_gaziantepfk-tr, antes de Memik Yılmaz:_

```text
Yılmaz: dice que asumió "unos días antes del terremoto del 6/2/2023"; la asamblea que lo eligió formalmente fue el 9/6/2023. Desde aproximado (dia 01 de febrero).
```

_istanbulbasaksehir-tr, antes de Göksel Gümüşdağ:_

```text
Gümüşdağ: presidente del İstanbul Başakşehir FK desde 2014 (tr.wikipedia da solo el año: dia 01). Sigue.
```

_trabzonspor-tr, antes de Ertuğrul Doğan:_

```text
Doğan: la lista da el 26/3/2023 (entre el 3 y el 26/3 no figura nadie).
```
