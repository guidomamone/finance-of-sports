# 321: Higgsfield MCP (revisado, no se conecta)

Revisado el 2026-10-21 por Pruebas 1. Nada conectado ni pagado. Fuente: el propio sitio `higgsfield.ai` (centro de ayuda y su blog). La página `/pricing` se arma con JavaScript y no se pudo leer entera; los precios salen de una comparación publicada en su blog, que dice «precios verificados octubre 2026», y Guido tiene que confirmarlos en la página viva antes de pagar.

## Condiciones

- **Requiere suscripción paga.** «An active paid subscription is required.» No hay clave de API: se agrega como conector personalizado en Claude (`https://mcp.higgsfield.ai/mcp`) y se autoriza con la cuenta de Higgsfield.
- **Planes (web, mensual):** Starter 15 US$ con 200 créditos; Plus 49 US$ con 1.000 créditos (39 US$ por mes facturado anual); Ultra 129 US$ con 3.000 créditos (99 US$ anual). Una página de terceros daba otro precio (19 US$ por 270 créditos): no se usa.
- **Por el conector todo gasta créditos.** Los modelos «ilimitados» y las generaciones gratis valen solo en higgsfield.ai, no vía MCP.
- **Sin tope de gasto.** El propio centro de ayuda dice que no hay límite nativo de créditos y sugiere pedirle al agente, en la conversación, que avise el costo y espere confirmación; es una instrucción, no un freno.
- **Qué expone:** generación de imagen y video (todos los modelos), mejora, quitar fondo, ampliar, audio (voz, clonación, doblaje), recortes de YouTube, saldo y listado de generaciones. Los resultados quedan en Assets de la cuenta; no vuelven como archivo al chat.
- **Uso comercial y datos:** no aparecen en lo leído. Una nota de comparación dice que los términos lo permiten, con la advertencia de leerlos antes de usarlo con clientes; la ayuda no tiene sección de privacidad ni retención.

## Para qué serviría y por qué no

El 313 (c) pide visuales para difundir datos. Una tarjeta de un dato verificado sale mejor de los propios datos (el repo ya genera imágenes con `@resvg/resvg-js`): un número inventado o mal escrito por un modelo de imagen es justo el riesgo de un sitio de precisión. El video generativo no aporta a un hilo de cifras.

## Conclusión

No conectar ahora. Si el 313 pide un visual que no sea una cifra (portada, ilustración), el costo de entrada es Starter, 15 US$ por mes, con la regla de pedir confirmación del costo antes de cada generación. La plata es decisión de Guido.
