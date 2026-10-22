# Mejorar un script del pipeline (secciones 3b y 5)

*Se abre al arreglar o sumar una tool del pipeline y medir el cambio. El núcleo y la tabla de qué abrir están en `SKILL.md`.*

### b) Mejorar un script

1. Mirar 2-3 casos reales antes de afirmar la causa.
2. Mostrar el diseño en pocas líneas, con la escalera completa y el escalón nuevo, y un ejemplo real que recorra cada escalón. No commitear antes del veredicto de la Auditora, que decide con la sección 8 de `auditoria-finance-of-sports` si es una mejora general o un parche, salvo lo que la sección 7 de esa skill deja entrar sin esperarla. Una condición nueva (un frenazo, aviso, filtro o pregunta en una tool, o un cambio en lo
   que asume) también va a la Auditora, que la decide con la sección 7 de `auditoria-finance-of-sports`; a Guido va solo lo que la
   Auditora manda a votación o lo que cambia ese criterio (`Admin/CONVENCIONES.md`).
3. Medir antes y después con los lotes de prueba (sección 5).
4. Un commit por cambio. La tool lleva cabecera y comentarios largos; `Admin/PIPELINE.md` queda al día.

## 5. Lotes de prueba (medir CUALQUIER cambio de script antes y después)

Lo cargado tiene que dar idéntico. Tres listas, sin repetidos: `Admin/lotes/prueba-rapida.txt` (a mano: los casos que ya rompieron
algo una vez, cada uno con su motivo en un comentario), `Admin/lotes/prueba-mediana.txt` (la rápida + 3 documentos por club: el más viejo,
el del medio y el más nuevo) y `Admin/lotes/prueba-completa.txt` (todos los documentos con verificación). La mediana y la completa las arma
`node tools/lotes-prueba.mjs --escribir`; correrlo cuando entran clubes o años nuevos. Un caso nuevo que rompió algo va a la rápida, con su motivo.

```bash
node tools/lote.mjs --lista Admin/lotes/prueba-completa.txt > <carpeta de scratchpad de la sesión>/medir-antes.txt 2>&1     # antes del cambio
node tools/lote.mjs --lista Admin/lotes/prueba-completa.txt > <carpeta de scratchpad de la sesión>/medir-despues.txt 2>&1   # después; diff entre los dos
# la ruta del scratchpad va escrita entera, sin /tmp ni variables
```

Además, según lo que toque: lo mismo con `--reintentar` (camino de error); `node tools/caja-deuda.mjs --medir` en TODOS los clubes (caja y deuda);
`node tools/antes-de-localizar.mjs --lista <lista>` (compuerta de la etapa 3). Lo que no se puede ejercitar con lo cargado se simula en el
scratchpad con copia de seguridad de `Admin/` y se restaura.
