---
name: contenido-y-difusion-finance-of-sports
description: Cómo armar una publicación (hilo, post, tarjeta, informe) con un dato de finance-of-sports para difundir el sitio. Usar cuando Guido pida contenido para X, Instagram, LinkedIn, un deck o un informe por liga. Es lo que se escribe afuera del sitio; el dato sale de lo cargado y verificado.
---

# Un dato cargado, una publicación

- **El dato sale del sitio, no de la memoria.** Solo años que pasan `verifyTieOuts()` (`?audit=1`, 0 «no cierran»). Para un ranking o una comparación, `node tools/generate-rankings.js --print`. Cada cifra lleva moneda, ejercicio y si es balance o presupuesto; un estimado (`(estimado)*`) no se publica como dato.
- **Cada publicación lleva la fuente.** Link a `https://financeofsports.com/club/<id>` (o `/liga/<id>`) y a la página de fuentes del club (`fuentes/<id>`). Sin link a la fuente no sale.
- **Licencia.** El Formato simplificado es CC BY-NC 4.0: citar es libre, con la atribución. Los documentos de los clubes no llevan esa licencia; no se republica un PDF. Lo de Wikipedia, CC BY-SA 4.0.
- **Un club solo se compara con lo que el sitio compara** (mismo formato, ejercicio y moneda). Si dos clubes tienen perímetros distintos, el borrador lo dice.
- **El texto lo escribe la skill `anti-ai-writing-and-guido`** (voz de Guido). Una afirmación sobre una persona (presidente, gestión) se verifica en `data/gestiones/`; sin cita, no sale.
- **Nada se publica solo.** Un borrador va a `Admin/difusion/<fecha>-<tema>.md` con las cifras, el link y qué ejercicio las respalda. Guido lo aprueba y lo publica él. Una publicación, un mail a un club o un comentario público es una acción hacia afuera: confirmar siempre.
- **Qué publicar primero** (sin cambiar el alcance del sitio): un año cargado nuevo, un ranking de una liga ya completa, un cambio fuerte de deuda o ingresos entre dos ejercicios con balance. Una vez por club hasta agotar la lista (calendario en `Admin/difusion/calendario.md`).
- Tarjetas de imagen con el estilo del sitio: primero un diseño (artifact de Design) aprobado por Guido; después se generan.

## Cómo mantener esta skill

Si aparece un criterio de qué se publica o cómo, proponele a Guido el texto exacto y esperá su ok.
