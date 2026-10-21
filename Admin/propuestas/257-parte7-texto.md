# 257, parte 7: textos exactos de cada edición

Cada bloque es el texto que reemplaza a su ancla (el principio o el final del bloque ya existe en el archivo de destino). Lo agregado es lo que Guido aprobó en `Admin/propuestas/257-skills.md`, parte 7. El archivo nuevo `navegador-de-preview.md` se escribe con el bloque de 7.1 de ese archivo, sin cambios.

## 7.1 `producto-y-pantalla-finance-of-sports/SKILL.md`, punto 4

```
   - `node tools/audit.js`: 0 P0 y 0 P1.
   - El detalle de qué se prueba y las trampas del navegador: `referencia/navegador-de-preview.md`.
```

## 7.2 `start-session-finance-of-sports-project/worktree.md`, el PDF bajado en la copia

```
`find <principal>/Clubes -type l` tiene que dar vacío. Un PDF bajado en la copia no viaja al mergear (`*.pdf` está en `.gitignore`): pasalo a la principal antes de borrar el worktree.
```

## 7.2 `start-session-finance-of-sports-project/worktree.md`, al final

```
antes de archivarla.

**Después de `preparar`:** si `audit.js` da `faltantes-desfasado` (P1; `data/faltantes/` depende de PDFs que git ignora y que la principal bajó después), se arregla volviendo a correr `node tools/worktree.mjs preparar <carpeta>`.

**Un archivo generado no se mergea a mano: se regenera.** Si hay conflicto en `Admin/sourcing/README.md`, `fuentes.html`, `sitemap.xml`, `data/club-index.js`, `data/rankings/*.js`, `data/sponsors.js` o `Admin/ESTADO-clubes.md` (el bloque CLUB-INDEX), tomá cualquiera de los dos lados, mergeá y corré el generador que corresponde. Resolverlos línea por línea es cómo se mete un dato que ningún documento respalda.

**El hook de los documentos de la principal lee el texto del comando:** un Bash que solo nombra `TODO.md`, `CHANGELOG.md` o `ESTADO.md` junto a una escritura también se frena. Escribir la nota de la sesión con Edit o Write.

**El número de Versión de `Admin/CHANGELOG.md` se decide al mergear, no al escribir:** dos ramas van a querer el mismo; el que mergea segundo renumera su entrada.

**Un país por sesión de sourcing:** `Admin/sourcing/_indice/<País>.md` y `Admin/sourcing/<País>/` son de un solo país, así dos sesiones en países distintos no comparten un archivo.
```

## 7.3 `principal-finance-of-sports/SKILL.md`, antes de «Cómo mantener esta skill»

```
## Cerrar un punto del TODO

Se borra lo resuelto. Si el motivo por el que estaba trabado resultó falso (la transcripción que «nunca se hizo» ya estaba en disco, la función que había que revisar ya no existe), además queda escrito en la entrada de `Admin/CHANGELOG.md` que la premisa estaba vencida y, si el punto sigue vivo en parte, en el propio `Admin/TODO.md`. Una premisa vencida hace parecer la tarea más cara de lo que es y la deja al fondo de la lista: escribirlo avisa que otros puntos pueden estar igual.

## Cómo mantener esta skill
```
