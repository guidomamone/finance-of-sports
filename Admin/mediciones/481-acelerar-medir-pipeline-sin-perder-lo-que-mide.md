<!-- md: Acelerar medir-pipeline sin perder lo que mide | leer: al trabajar el punto 481 del TODO -->
# 481 · Acelerar medir-pipeline sin perder lo que mide

Conclusión: (se completa al cerrar el punto)
Destino: `Admin/PIPELINE.md` (la sección de la medición) y `tools/medir-pipeline.mjs`.

## De dónde sale el tiempo (última medición, 28-10-2026)

- `cerrar-tool` tardó 24 min 16 s: ensayo y pruebas (13 pruebas, la más larga `prueba-escribir.mjs` con 176 s), después tres niveles de lote (chico 127 documentos; mediano 513 nuevos; completo 608 nuevos) y, en cada uno, los seis medidores (alta, cargar, audit, cargar-cola-vacia, escribir, contexto) «antes» y «después».
- El cambio era de textos y salidas de tools; el plan igual dijo «25 familias afectadas de 25» y pagó el lote completo (regla: «mínimo por tabla: completo» para `alta-club-lectura.mjs` y `cargar-ceros.mjs`).
- Las diferencias que salieron fueron tres, todas explicadas: una cabecera larga nueva y dos líneas nuevas del ensayo de contexto.

## Qué mirar primero

`node tools/duraciones-mediciones.mjs` (por medidor y nivel), `node tools/medir-pipeline.mjs --ensayo` (la estimación del plan) y `node tools/fos.mjs progreso` mientras corre.
