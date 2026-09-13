# Universitario de Deportes (Club Universitario de Deportes)

- Sin PDF descargado. El club estuvo (y sigue, aunque "SUSPENDIDO") en un proceso concursal ante
  INDECOPI desde 2011 (expediente 00172-2011/CCO-INDECOPI, 408 acreedores, declarado vía el sistema
  público IFCO — servicio.indecopi.gob.pe/e-value/pgw_infoXDeudor.seam, buscable por razón social sin
  necesidad de cuenta, solo un captcha simple de texto). Prensa (ovacion.pe, universitario.pe)
  confirma auditorías reales de BDO/KPMG para 2018, 2021 y 2023 con cifras concretas (ingresos 2023:
  S/111 millones; deuda auditada 2021: S/68,6 millones) pero ningún artículo linkea el PDF del
  informe.
- **Ángulo IFCO ahora SÍ explorado a fondo (sesión 2026-09-13) — confirmado dead-end, no reintentar
  con el mismo método.** Se navegó el expediente completo con el mecanismo correcto:
  1. Entrar a `servicio.indecopi.gob.pe/e-value/pgw_infoXDeudor.seam` y clickear el link superior
     "INFORMACIÓN POR DEUDOR" (`frmMenu:cmdlnkRecursoSel22`) — **ojo, la URL por default carga en el
     tab equivocado (PARC, Procedimiento Acelerado de Refinanciación) que tiene su propio combo de
     oficinas reducido (solo AQP-PARC/CCO-PARC/CUS-PARC/LOR-PARC); si el combo de "oficina concursal"
     no muestra la lista larga (CCO-INDECOPI, CRP-INDECOPI, etc.) es señal de estar en el tab
     equivocado.**
  2. Elegir el radio "Razón Social/Nombres y Apellidos", escribir el nombre (ej. "UNIVERSITARIO"),
     leer el captcha (imagen `imagenCaptcha`, 6 caracteres alfanuméricos) y click "BUSCAR"
     (`frmInfoDeudor:btnBuscarDeudores`) — devuelve la fila con expediente, "Nro Acreedores" y
     "Últ. Junta", cada uno con su propio link.
  3. El link de "Estado" (columna con el estado del expediente, ej. "SUSPENDIDO") abre un modal
     "SEGUIMIENTOS DEL EXPEDIENTE" con TODAS las resoluciones/acciones del caso (150+ filas,
     paginadas). Cada fila tiene un ícono "Detalle" — se abrió varias filas al azar y **el contenido
     de "Detalle" es SIEMPRE texto procesal** (fecha, número de resolución, "SE RESUELVE:" + un
     párrafo de anotaciones) — **nunca un PDF adjunto ni una cifra financiera**. Confirmado con la
     primera fila (resolución 8466-2011/CCO-INDECOPI, "Suspender el trámite...").
  4. El link de "Últ. Junta" abre un modal "LISTA DE JUNTAS PROGRAMADAS" — solo fechas de
     convocatoria/realización de asambleas de acreedores (1ra/2da convocatoria, límite de
     publicación), sin ningún documento ni acta adjunta descargable.
  5. El link de "Nro Acreedores" abre un listado de acreedores (nombres/montos de deuda, no
     verificado en detalle esta sesión, pero es lista de pasivo por acreedor, no un estado financiero
     del club).
  - **Conclusión: el sistema IFCO de INDECOPI expone el historial PROCESAL del concurso (qué
    resolvió el ente concursal y cuándo), no informes del administrador con estados financieros ni
    balances del deudor.** Es un dead-end confirmado para este objetivo — no vale la pena que una
    sesión futura vuelva a "explorar los ~150 items uno por uno" esperando encontrar un PDF
    financiero ahí; el formato del modal "Detalle" es uniformemente texto de resolución, no adjuntos.
  - Nota metodológica reusable: la captura del captcha se resolvió con
    `canvas.drawImage(document.getElementById('imagenCaptcha'), 0, 0)` + `toDataURL()` vía
    `javascript_tool` (la imagen es demasiado chica para leerse a simple vista en un screenshot de
    la extensión de browser de este entorno) — guardar el data URL como PNG y leerlo con el Read
    tool funciona de forma confiable.
- Pendiente: contacto directo al club pidiendo el informe BDO/KPMG más reciente (la prensa confirma
  que existe, pero no hay canal público que lo sirva) — anotado como candidato para
  `dudas-por-club.md` / outreach directo.
- Contacto: universitario.pe (sin sección de transparencia en el nav ni el footer);
  servicio.indecopi.gob.pe/e-value/pgw_infoXDeudor.seam (expediente 00172-2011/CCO-INDECOPI, ahora
  confirmado como dead-end para documentos financieros).
- Último chequeo: 2026-09-13.

