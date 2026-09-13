# Real Madrid C.F.

- **Hit fuerte, serie casi completa (2026-09-13).** 22 ejercicios anuales consecutivos, del
  2003-04 al 2024-25, descargados a `Clubes/España/Real Madrid/`: `informe-economico-2003-2004.pdf`
  a `informe-economico-2024-2025.pdf` ("Informe Económico", el documento anual que el club publica
  en su página de transparencia — incluye cuentas anuales individuales/consolidadas, informe de
  gestión e informe de auditoría, según el año). Sin ningún año faltante en el rango.
- Además, para el ejercicio 2024-25 se consiguieron dos documentos oficiales adicionales, más
  cortos y específicos: `registro-cuentas-anuales-club-y-ee-ff-2024-2025.pdf` (el certificado de
  depósito de las cuentas anuales del Club y sus Efectos Financieros en el Registro Mercantil, 2
  páginas) e `informe-gestion-consolidado-2024-2025.pdf` (informe de gestión consolidado por
  separado).
- **Cómo se encontró**: la página `realmadrid.com/es-ES/el-club/transparencia/informes-economicos`
  y `realmadrid.com/es-ES/el-club/transparencia/cuentas-anuales` son SPAs (React/Next) que no sirven
  el listado de PDFs en el HTML plano visible para WebFetch (devuelve una página de error "El
  sistema está en fuera de juego" — falso negativo, no es que el sitio esté caído). Sí funcionan con
  `curl` + user-agent de navegador: el HTML crudo trae los links de descarga embebidos como JSON
  (`"/content/dam/portals/realmadrid-com/.../el-club/transparencia/01-documentos-transparencia/..."`),
  visibles con `grep -o '"[^"]*\.pdf"'`. El host base para esas rutas relativas NO es
  `www.realmadrid.com` (devuelve 404) sino **`publish.realmadrid.com`** — mismo dominio que aparece
  en los resultados de búsqueda como `publish-p47754-e237306.adobeaemcloud.com` (alias del mismo
  backend AEM).
- Un año (`2015-2014_INFORME ECONÓMICO.pdf`, tal cual aparece listado, con los años invertidos) da
  404 — es un typo del propio sitio; el año real 2015-16 sí existe con nombre correcto
  (`2015-2016_INFORME%20ECON%C3%93MICO.pdf`).
- Pendiente: nada del rango 2003-2025, la serie está completa. Si se quiere ir más atrás de 2003
  (el club existe desde 1902, pero no se buscó esa profundidad en esta sesión) o profundizar el
  ejercicio 2024-25 con más anexos de la página de "cuentas-anuales" (había también un "Informe IS
  24-25" de impuesto sobre sociedades, no descargado), es la próxima extensión natural.
- Contacto: `realmadrid.com/es-ES/el-club/transparencia/informes-economicos` (serie histórica) y
  `realmadrid.com/es-ES/el-club/transparencia/cuentas-anuales` (ejercicio más reciente + registro
  mercantil).
- Último chequeo: 2026-09-13.
