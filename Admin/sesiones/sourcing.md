# Sesión SOURCING 1 (prueba to-do 315 y 316)

## 2026-10-20: Noruega, lista del portal contra lo cargado

- **Portal:** Regnskapsregisteret de Noruega (brreg), 6 clubes ya cargados (Molde, Fredrikstad, Aalesund, Sarpsborg 08, Vålerenga, Viking).
- **Crawl4AI no se instaló** (pide Chromium; Guido eligió no instalar). Se midió el comando simple contra el Browser pane:
  `tools/listar-brreg.mjs` (HEAD por orgnr y año; no baja nada).
- **Resultado:** 63 ejercicios en el portal que no están cargados. Tabla en `Admin/mediciones/crawl4ai-noruega-lista.md`.
- **Medición:** el script es ~0 tokens y 225 s (brreg tarda ~2 s por pedido, en serie); el Browser pane serían ~20 a 30 mil tokens
  (estimado; medido en 1 de 6 entidades). Para Noruega el script reemplaza al navegador. Crawl4AI no aporta: brreg se responde con HTTP plano.
- **Descargas:** 1 documento de prueba (Viking AS 2024, mismo tamaño que el ya guardado), en el scratchpad. Nada en `Clubes/`.
- **Visto de pasada, fuera de alcance:** los PDFs de las 6 entidades ya estaban bajados en `Clubes/Noruega/`; el hueco es de carga,
  no de sourcing. `ESTADO-clubes.md` no dice qué entidad está cargada en los clubes con más de una.
- **Boceto 316:** `Admin/mediciones/boceto-vigilar-portal-316.md` (media página, sin programar).
- **¿Seguir?** Para portales con URL predecible (Noruega, Bélgica): sí, con script simple, sin Crawl4AI. Crawl4AI queda para cuando
  aparezca un portal que necesite navegador y no tenga API ni URL directa. Para el 315/316 en el TODO (lo escribe la principal): el 315
  queda resuelto con este resultado; el 316 depende de decidir si hace falta vigilar antes de ponerse al día cargando.
