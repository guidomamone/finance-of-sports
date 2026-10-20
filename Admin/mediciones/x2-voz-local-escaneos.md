# 298 x2: una voz local gratis (OCR) para respaldar las cifras de un escaneo (2026-10-20, Pipeline 6)

Pregunta (de la principal): `check-transcripcion-fidelidad.js` da "sin hallazgos" aunque falten las cifras. ¿Hay un chequeo de cifras para escaneos, gratis, sin falsos positivos?
Costo de API: US$ 0. El pipeline no cambió.

**Qué ya existe.** `tools/chequeos-gratis.mjs` (cascada por página: texto del PDF, sumas, producción, balance) ya es el chequeo de cifras. En un
PDF con capa de texto valida la mayoría; en un escaneo no hay texto del PDF y casi todo queda `dudosa` y va a la segunda voz paga (Gemini y Claude).
Base de su prueba (`--prueba`, config por defecto): 952 documentos, 49.663 páginas; 8.337 páginas dudosas están en documentos sin capa de texto; recall de errores
reales 2.027/2.027 en páginas con números, 0 escapes como "validada". El check de fidelidad es otra cosa (marcas de página y placeholders): no mira cifras y no se toca.

**Idea medida.** Una quinta fuente de respaldo para escaneos: una voz local por página (Tesseract `--psm 1`, que además gira las páginas dadas vuelta, ~2 a 3 s por página).
Una página queda respaldada si TODAS las cifras (4+ dígitos, sin años) de la transcripción están en el OCR local de esa página.

**Medición.** De los 952 documentos de la base, 400 son escaneos (menos de 150 caracteres de texto por página) y 189 de ellos tienen páginas con error real de lectura
(895 páginas, método de la prueba: una cifra de la entrada que el `.md` corregido no tiene, emparejada con una casi igual). Se tomó una muestra de 260 páginas (OCR local de
cada una, idioma del país): 82 con error real y 178 sin error (de 10 países: Portugal 71, Noruega 63, Italia 51, Brasil 25, Colombia 17, Grecia 15, otros).

| | Páginas | Respaldadas por la voz local |
|---|---|---|
| Sin error (las que se podrían ahorrar) | 178 | 39 (22%) |
| Con error real (escapes si se las diera por buenas) | 82 | 2 (2,4%) |

Los 2 escapes: Aston Martin F1 2024 pág. 18 (14 "cifras malas": revisadas a mano, son un artefacto del tokenizador de la medición, números pegados entre filas; no es un error real) y
Varaždin 2025 pág. 27 (la entrada dice 5650.301 y el corregido 550.301; la lectura local también trae esa cifra). El escape real mínimo es **1 de 82** (1,2%).

**Lectura.** La voz local respaldaría ~22% de las páginas de escaneo que hoy se pagan (sobre los 317 escaneos pendientes, ~US$ 48 de segunda voz, serían ~US$ 10) y dejaría pasar
por lo menos 1 de cada 82 páginas con error real. La cascada actual no deja pasar ninguna (0 escapes). Una compuerta que acepta un error de lectura como bueno para ahorrar centavos no
es la que usa este proyecto. Pasa lo mismo que en el 314: Tesseract y Stirling leen menos cifras que Mistral y, cuando coinciden en una mala, lo hacen por el mismo tipo de confusión.

**Conclusión.** No propongo el escalón: el ahorro posible es chico y la compuerta lo paga con escapes. Para endurecer algo habría que sumar una condición que el caso no necesita. Si en el futuro
el gasto de la segunda voz en escaneos pesa más (hoy ~US$ 48 sobre la cola), conviene repetir la prueba con una muestra mayor y con un OCR mejor, no cambiar la compuerta.
