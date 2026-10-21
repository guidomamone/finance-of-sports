# Auditoría: un eje `ux` que rota con los demás (para el ok de Guido)

Guido: «parte de las auditorías que deberíamos correr ahora debería incluir ver si se cumple UX; debería ser de las que rota». La guía es `producto-y-pantalla-finance-of-sports/referencia/ux.md`.

## Textos exactos, skill `auditoria-finance-of-sports`

1. Descripción (frontmatter), el final:

Acepta un eje: `datos`, `escala`, `codigo`, `docs`, `tokens`, `ux`.

2. Capa 3, primera frase:

Un solo eje por auditoría, no los seis.

3. Tabla de ejes, fila nueva después de `tokens` (con la fila de `tokens` como ancla):

| `tokens` | Dónde se van los tokens de una sesión típica, y qué de eso es automatizable. **Con el §4 de este skill al lado.** |
| `ux` | Con el sitio levantado, a escritorio y a 375 px: recorrer entera `producto-y-pantalla-finance-of-sports/referencia/ux.md` sobre las vistas principales (Inicio, un club, Comparar, Ligas, una liga, un sponsor), cada punto con su prueba. Lo que no cumple va a `Admin/TODO.md` como punto de Pantallas, con la prueba que falla y el caso. Una falla que un script puede detectar (un 404 después de navegar, un área de toque chica, scroll horizontal) se propone además como chequeo. |
