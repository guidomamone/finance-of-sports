# Reial Club Deportiu Espanyol de Barcelona, S.A.D.

- **Hit bueno (2026-09-16).** 2 ejercicios descargados a `Clubes/España/RCD Espanyol/`, encontrados
  navegando la página de transparencia con el browser:
  - `cuentas-anuales-2024-2025.pdf` (199 págs.) — link "Anexo Cuentas Anuales"/"Cuentas Anuales
    2024-2025" en la propia página, host propio `rcdespanyol.com/assets/docs/transparencia/`.
  - `cuentas-anuales-gestion-auditoria-2023-2024.pdf` (192 págs., nombre de archivo de origen
    `CCAA_I_GESTION_I_ AUDITORIA.pdf`, con un espacio en el nombre que hay que url-encodear como `%20`
    al bajarlo con `curl`) — link "Cuentas Anuales 2023-2024" en la misma sección.
  - Ambos parecen escaneos (no se confirmó capa de texto en esta sesión, pendiente `pdffonts`/OCR
    antes de mapear).
- **Gotcha de URL, no de bloqueo anti-bot**: la URL corta `rcdespanyol.com/es/transparencia/` (la que
  aparece en resultados de búsqueda y en el propio índice de `_notas-generales.md` de una sesión
  anterior) está **rota** — un `curl` a esa URL entra en un loop infinito de redirects 302 a sí misma
  (confirmado, no es un bloqueo de bot: el navegador también la reporta como fallida). La URL viva
  actual es más larga: `rcdespanyol.com/es/transparencia-compliance-canaleticoycomunicaciones`. Ver
  `_notas-generales.md` para más detalle, puede repetirse con otro club si cambia su estructura de
  URLs.
- Pendiente: ejercicios anteriores a 2023-24 (la página tiene "Anexo 17" a "Anexo 21" y otros con
  contenido de temporadas previas mezclado con otros indicadores INFUT, no explorado a fondo).
- Contacto: `rcdespanyol.com/es/transparencia-compliance-canaleticoycomunicaciones`.
- Último chequeo: 2026-09-16.
