# Notas generales — Colombia

## Contexto regulatorio y metodología SIIS

Sorpresa positiva de esta investigación: varios clubes colombianos organizados como S.A. deben
presentar un "Informe Periódico de Fin de Ejercicio" a la asamblea de accionistas (circular 012 de
2022 de la Superintendencia Financiera de Colombia) que incluye estados financieros completos, no
solo narrativa — y varios lo cuelgan en su propio sitio.

**Actualización de esta sesión — la veta de SIIS (Supersociedades) confirmada y operada con éxito.**
Se logró navegar `siis.ia.supersociedades.gov.co` (portal público, gratuito, sin login) con el
browser interactivo: buscando cada club por NIT (la búsqueda por nombre completo NO funciona bien —
devuelve miles de resultados irrelevantes o ninguno; hace falta el NIT exacto, googleable como
"[club] S.A. NIT"), la ficha de resultados trae un resumen de Activos/Ingresos/Utilidad Neta del
ejercicio más reciente, y el botón "VISTA 360" de cada resultado → "VER OTROS DOCUMENTOS
ADICIONALES" revela una tabla de radicados con 3 PDFs reales por ejercicio: "NOTAS EF" (que a pesar
del nombre es el paquete COMPLETO — situación financiera + resultado integral + cambios en
patrimonio + flujo de efectivo + notas, 30-60 páginas), "CERTIFICACION EF" (certificación corta del
representante legal/contador) y "DICTAMEN DEL REVISOR FISCAL" (opinión de auditoría). Cada link
"Ver" de esa tabla abre un visor (`servicios.supersociedades.gov.co/bpmformularios/...`) cuya
petición de red real apunta a un PDF descargable directo en
`.../bpmformularios/tmp/<radicado>/<radicado>.PDF` — hay que inspeccionar las network requests del
browser para sacar esa URL exacta, no está en el HTML visible. Con este método se armaron carpetas
nuevas para 5 clubes más, todos con el ejercicio 2025 (comparativo con 2024) recién presentado en
enero de 2026:


## Nota técnica sobre SIIS para la próxima sesión

- El patrón para cualquier club colombiano nuevo: (1) googlear "[club] S.A. NIT" para conseguir el
  número de 9 dígitos; (2) entrar a siis.ia.supersociedades.gov.co, pegar el NIT en el buscador
  (NO el nombre — no filtra bien) y click en "BUSCAR"; (3) elegir el resultado con Punto de entrada
  "Individuales" (o el que corresponda al ejercicio más reciente si hay varios) y click "VER
  DETALLES" para ver el resumen Activos/Ingresos/Utilidad, o "VISTA 360" directo; (4) en Vista 360,
  click "Ver otros documentos adicionales" — si aparece una tabla con radicados, esos SON los PDFs
  reales; (5) abrir cada link "Ver" (usa un popup bloqueado por algunos entornos — mejor
  `navigate()` directo a la URL del link) y de las network requests de esa página sacar la URL real
  del PDF (patrón `.../bpmformularios/tmp/<radicado>/<radicado>.PDF`, descargable directo con curl).
  El sitio a veces entra en mantenimiento ("Estamos actualizando SIIS...") por minutos — reintentar
  más tarde si pasa. Quedan sin explorar por esta vía: Barranquilla F.C., Bucaramanga, Envigado,
  Once Caldas, Tolima y el resto de los ~35 clubes-sociedad que Supersociedades menciona en su
  informe agregado — alta probabilidad de que TODOS tengan ficha en SIIS con el mismo patrón.
- Contacto: siis.ia.supersociedades.gov.co; informes agregados ya bajables en
  supersociedades.gov.co/documents/20122/532936/Informe-futbol-pdf.pdf (no es por club, pero sirve
  de cifra de control/contexto).
- Último chequeo: 2026-09-12.

