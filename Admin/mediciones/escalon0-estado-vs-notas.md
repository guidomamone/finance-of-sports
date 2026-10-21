# Escalón 0 de etiquetas: ¿cuánto del costo de localizar y extraer es el estado de resultados?

Medición del 2026-10-21 (Pipeline 14), gratis (solo lectura de registros y archivos ya generados), pedida por la Auditora 5 a través de la principal.

## Conclusión

**El estado de resultados es el 25 % del costo; por la regla de la Auditora (menos del 40 % → no se codea), el escalón 0 no se codea.** Sobre
69 informes británicos y escoceses ya extraídos (el mismo formato de cuentas que el lote 133), lo pagado se reparte así: estado 25,1 % (26,1 % si
se le carga también la instrucción fija de extraer), notas 43,4 %, localizar 30,5 % (lee el documento entero y elige estado y notas: se paga
igual aunque el estado salga de las etiquetas), instrucción fija 0,9 %. Aplicado a los US$ 16,48 de localizar y extraer del lote 133: unos
US$ 4,1 serían del estado, US$ 7,2 de las notas y US$ 5,0 de localizar. Aun mirando solo extraer, el estado es el 37 % (mediana por documento
37 %, p10 29 %, p90 50 %). Además, el backtest de `tools/extraer-etiquetas.mjs` ya mostraba que de las líneas cargadas solo 16 de 67 tienen
etiqueta (las demás son desgloses de notas).

## Destino

Quedan como están: el freno por bandera de `lote.mjs` (`--pagar-ia-xhtml`), la segunda lectura del resultado (`tools/ixbrl-resultado.mjs`) y
las etiquetas como segunda lectura del estado. `tools/extraer-etiquetas.mjs` no se engancha. Qué hacer con los 68 documentos del lote 133
(pagar la IA con la bandera o no) lo decide la principal.

## Cómo se midió

- Costo real de cada llamada: `Admin/registros/api/claude-api.jsonl`, la última de cada documento de `Clubes/Inglaterra/` y `Clubes/Escocia/`,
  tareas `localizar` y `extraer` (Opus 5.5: US$ 4 por millón de tokens de entrada, US$ 20 de salida, lectura de caché a 0,1).
- Extraer se reparte en dos: la entrada (los bloques) por caracteres de los bloques del estado contra los de las notas (`.ubicacion.json` y
  el `.md`); la salida, por caracteres de las filas del `.filas.json` según su bloque. La salida es el 90 % de extraer y las notas dan más filas:
  865 filas del estado contra 1.457 de las notas.
- El script (no está en `tools/`: es de una vez) quedó en la carpeta de notas compartidas de la sesión principal, `p14-medir-estado-notas.mjs`.
- Límite: la muestra son documentos ya cargados (más clubes de Premier y Championship que el lote 133, que trae más cuentas «full» y «medium» de
  League One y Two, con menos notas). Con menos notas la parte del estado sube, pero para llegar al 40 % del total (con localizar, que se paga
  igual) las notas tendrían que costar un 15 % de lo medido: 25,1 / (25,1 + 6,3 + 31,4) = 40 %.
