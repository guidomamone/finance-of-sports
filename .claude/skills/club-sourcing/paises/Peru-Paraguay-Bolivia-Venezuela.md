# Perú, Paraguay, Bolivia, Venezuela — sin metodología país-nivel todavía

Estos 4 países no tuvieron (todavía) un hallazgo de nivel "regulador que aplica a todos los clubes"
como Chile/Colombia/Brasil — lo encontrado hasta ahora fue caso por caso, ver la ficha de cada club
en `fuentes/<País>/<Club>.md`:
- **Perú**: 15 clubes chequeados en total. Patrón consistente: la enorme mayoría de los clubes de Liga 1 son **asociaciones
  civiles sin fines de lucro** (Melgar, Cienciano, Sport Boys, Cusco FC, ADT, Alianza Atlético,
  Deportivo Municipal, Comerciantes Unidos, Sport Huancayo, Binacional — todos confirmados vía SUNAT/
  datosperu.org con tipo societario "Asociación"), sin obligación legal de publicar nada. Los pocos
  que SÍ son sociedades son S.A. o S.A.C. CERRADAS (Sporting Cristal, UCV, Los Chankas), que tampoco
  tienen obligación de registro ante la SMV (solo aplica a S.A.A. — Sociedad Anónima ABIERTA). Ningún
  club de los 12 tiene sección de transparencia/estados financieros en su sitio oficial propio (a
  diferencia de Alianza Lima, que sí publica voluntariamente pese a ser también una entidad sin fines
  de lucro — es la excepción, no la regla). Conclusión: en Perú, salvo que un club sea S.A.A. y
  registre valores ante la SMV, **no hay ningún regulador que obligue a publicar** — el único canal
  viable es la publicación VOLUNTARIA en el sitio propio del club (como Alianza Lima) o un proceso
  concursal INDECOPI (ver debajo, con matiz importante).
  - **SMV (Superintendencia del Mercado de Valores, smv.gob.pe/SIMV) — confirmado que SÍ es
    consultable pero Melgar NO está ahí**: el buscador de "razón social de la empresa" en la portada
    de smv.gob.pe es de texto libre (no autocomplete, pese al mensaje de validación "Ingrese/
    Seleccione"). Se buscó "MELGAR" y "FOOT BALL CLUB MELGAR" (el club estuvo cerca de convertirse en
    S.A.A. hace más de una década según prensa, pero revirtió a asociación en 2019): **0 resultados
    en ambos casos**, confirmando que nunca se registró como emisor. También existe
    `Frm_InformacionFinancieraporperiodo` (listado completo de TODOS los emisores que presentaron
    EEFF en un período dado, con filtros Individual/Consolidada/Todos + Anual/Intermedio) — se
    recorrió el listado completo de 2023 Anual (276 filas) buscando "MELGAR"/"DEPORTIVO"/"CIENCIANO":
    ningún club de fútbol apareció. Útil como método de descarte rápido para futuros candidatos
    peruanos con sospecha de ser S.A.A.
  - **INDECOPI / IFCO (servicio.indecopi.gob.pe/e-value/pgw_infoXDeudor.seam) — ahora SÍ explorado a
    fondo para Universitario de Deportes, confirmado DEAD-END para documentos financieros, con
    gotcha de navegación importante**: la URL carga por defecto en el tab equivocado
    ("PROCEDIMIENTO ACELERADO DE REFINANCIACIÓN CONCURSAL - PARC", identificable porque su combo de
    "oficina concursal" solo lista 4 opciones tipo "-PARC"); hay que clickear explícitamente el link
    "INFORMACIÓN POR DEUDOR" del menú superior (`frmMenu:cmdlnkRecursoSel22`) para que el combo
    muestre la lista larga real (CCO-INDECOPI, CRP-INDECOPI, etc.). Ahí sí, con el radio "Razón
    Social" + captcha (imagen de 6 caracteres, capturable con `canvas.drawImage()` +
    `toDataURL()` vía JS ya que es demasiado chica para leerse en un screenshot normal), la búsqueda
    funciona y devuelve el expediente. PERO los 3 sub-modales del resultado (seguimientos del
    expediente, juntas programadas, listado de acreedores) exponen únicamente **historial procesal**
    (resoluciones con fecha/número/texto de "SE RESUELVE", fechas de convocatoria de asambleas,
    nombres/montos de acreedores) — nunca un PDF adjunto ni un informe del administrador con balance.
    A diferencia de Colombia (Supersociedades en reorganización SÍ expone estados financieros
    completos), el sistema concursal peruano NO es un canal de estados financieros, solo de
    trazabilidad legal del proceso. FBC Melgar tiene un proceso concursal similar desde 2012 (deuda
    con SUNAT) pero no se ubicó su expediente exacto todavía — de encontrarse, esperar el mismo
    resultado (dead-end) salvo evidencia en contrario.
- **Paraguay**: Olimpia/Cerro Porteño/Libertad — sin regulador tipo CMF/Supersociedades identificado,
  sin sección de transparencia financiera en ninguno de los 3 sitios oficiales, dead-end sin lead
  nuevo por ahora.
- **Bolivia/Venezuela**: solo un primer chequeo superficial hecho, sin metodología desarrollada
  todavía — próxima sesión que toque estos países, empezar por buscar si existe un regulador
  societario nacional con portal público (mismo patrón que Colombia/Ecuador) antes de ir club por
  club.

## Lo que dio el sitio de cada club y Wayback

- Perú: Universitario publica los resultados de la auditoría BDO como imágenes de comunicado en
  `universitario.pe/media/uploads/<año>/…/*.jpg`, no como PDF. Sporting Cristal, Cienciano, Melgar y
  otros 9: CDX completo sin ningún financiero. Alianza Lima: Wayback no tiene nada fuera de 2019,
  2020, 2022 y 2023.
- Paraguay: asociaciones civiles; la licencia APF/CONMEBOL pide EEFF auditados pero los guarda la APF.
  CDX y wp-json de los 9 clubes sin resultado. Único canal: pedido directo (Sportivo Luqueño ofrece los
  EEFF en `clubsportivoluqueno.com.py/socios/asamblea.php`, por WhatsApp).
- Bolivia y Venezuela: asociaciones civiles sin obligación pública; la FBF solo publica documentos
  propios. Dead-end documentado.
