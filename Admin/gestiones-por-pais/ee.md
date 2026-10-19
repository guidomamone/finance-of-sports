# Gestiones por país: ee

El criterio de Estonia para `data/gestiones/ee.js` (quién condujo cada club y desde/hasta cuándo; to-do 195). El formato de las
gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
Criterio del país (decisión de Guido, 2026-10-19: el mismo que Bélgica). Si hay un dueño persona (el club es una sociedad, OÜ o AS,
con un dueño con nombre) se carga el dueño con cargo 'Dueño' durante todo su período, y los presidentes formales que firman van en
comentarios. Sin dueño persona (clubes asociación, MTÜ) se carga el presidente del club: 'President', o el presidente de la comisión
directiva ('Juhatuse esimees'). Un grupo o una empresa no es persona: ahí no hay entrada.
Fuente útil: el informe anual del propio club (en Clubes/Estonia/<club>/, "Juhatus" / "Juhatuse liikmed" firma el informe), el
e-Äriregister (ariregister.rik.ee, ficha del registro con la historia de la junta) y la prensa (Õhtuleht, Postimees, ERR, soccernet.ee).
Cuando la fuente da solo el año o el mes, el día es 01 por convención. Si ninguna fuente da la fecha de asunción como presidente pero
las fuentes lo llaman presidente en el período, vale como `desde` la fecha de su alta en la junta del e-Äriregister (o la fundación
del club si la fundó él), y la gestión va confirmada con esa aclaración en la nota (Guido, 2026-10-19). Los cierres estonios son el 31/12.
Una gestión con confirmada:false no se muestra en el sitio: está cargada para revisión.
============================================================================
```
