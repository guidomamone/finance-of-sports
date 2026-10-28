<!-- md: Inicio: card «Últimas cargas» con los últimos club-años cargados y «Ver más» a una página | leer: al trabajar el punto 480 del TODO -->
# 480 · Inicio: card «Últimas cargas» con los últimos club-años cargados y «Ver más» a una página

Conclusión: hecho con la variante B del mockup (una fila por club y tanda, no una por club-año: las diez últimas cargas eran todas de Real Santander) y puesto al fondo de Inicio, pedido de Guido. La página es estática como `correcciones.html` y lee el mismo `data/ultimas-cargas.js`; `cargar-lote.mjs` regenera la lista al cerrar el lote y la commitea aparte (no deja `data/` sucio).
Destino: `Admin/PANTALLA.md`, «Cómo funciona cada pantalla» (Inicio), y `tools/generar-ultimas-cargas.mjs`.

## Qué se pidió (Guido, 28-10-2026)

En Inicio, un card nuevo «Últimas cargas»: los últimos club-años cargados, 10, y un «Ver más» que lleva a una página con lo mismo (la lista completa). Prioridad alta: es chico.

## Diseño propuesto (a mostrar como mockup antes de construir)

- **Fuente.** Los datos públicos no dicen cuándo se cargó un año; sí lo dicen los commits de carga (`<Club> <año> por el pipeline`, uno por año, de `cargar-lote.mjs`) y `Admin/registros/cargar-ultimo.jsonl` (interno, no se publica). Un generador `tools/generar-ultimas-cargas.mjs` lee el historial de git como `tools/generar-correcciones.mjs` y escribe `data/ultimas-cargas.js` (club, ejercicio, fecha) con su `--check` en la auditoría.
- **Card en Inicio.** Diez filas: club (escudo o iniciales con el color del club), ejercicio y cuánto hace que se cargó; cada fila abre el club en ese ejercicio. Abajo, «Ver más».
- **Página.** `ultimas-cargas.html` (generada): la misma lista más larga, con más cargas por página; enlace desde el card, `sitemap.xml` y `/ultimas-cargas` en Netlify.
- **Reglas.** Solo ejercicios cargados de verdad (no estimados ni años de margen bruto contados como faltantes); textos por `t()` en español e inglés; 375 px sin scroll; sin comentarios internos en lo que viaja al visitante; `ASSET_V` y manifiesto al cambiar `js/`.
- **Duda de diseño sin resolver (la decide el mockup):** si una carga de varios años de un mismo club (Jaguares 2016 a 2025) ocupa diez filas o se agrupa en una sola («Jaguares, 2016 a 2025»).
