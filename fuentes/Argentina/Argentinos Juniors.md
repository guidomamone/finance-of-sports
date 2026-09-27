# Argentinos Juniors

**Ángulos**: sitio oficial: parcial — falta seguir el hilo de "Sede Virtual"/portal de socios (ver
abajo) · Wayback CDX: agotado (dominio completo, sin nada posterior a 2018-19 salvo el resumen 2022
ya conocido) · búsqueda web: parcial — encontradas 2 noticias oficiales con evidencia de ejercicios
más nuevos, imágenes no descargables desde esta sesión · regulador/país: no aplica — 2026-09-26.

- **Ejercicio 2019-20: encontrado un lead real en el sitio oficial, no descargable desde esta
  sesión.** La noticia oficial `argentinosjuniors.com.ar/noticias/institucional/informe-contable/`
  (29/10/2020) confirma "el departamento de finanzas... realizó el informe anual" a votar en la
  Asamblea de Representantes, superávit $130M ARS, patrimonio neto $2.361M ARS (aumento de $111M),
  índice de liquidez 1.15, solvencia 3.71. La noticia tiene 2 imágenes con el detalle
  (`i.ibb.co/gJSBgrV/1a.jpg`, `i.ibb.co/NyhkqSZ/1b.jpg`, subidas por el propio club) que **no se
  pudieron descargar en esta sesión**: `curl` a `i.ibb.co` devuelve HTTP 200 pero cuerpo vacío
  (0 bytes) con varios User-Agent/protocolo probados — parece un bloqueo de red del entorno hacia ese
  host de hosting de imágenes, no un bloqueo del sitio. **Pendiente para una sesión con Browser pane
  disponible**: abrir esas 2 URLs directo y guardar las imágenes (probablemente 2 páginas fotografiadas
  del informe, no el balance completo).
- **Ejercicio 2024-25: CONFIRMADO que existe, no publicado.** Noticia oficial
  `.../presentacion-de-los-estados-contables-del-ejercicio-2024-2025/` confirma Estados Contables al
  30/6/2025 aprobados por unanimidad en Comisión Directiva el 15/10/2025 (superávit >$5.600M ARS,
  liquidez 1.13, activo +30% por compra de jugadores), a tratarse en la Asamblea General Ordinaria del
  30/10/2025 — sin PDF ni imagen adjunta en la noticia (se revisó el HTML crudo completo). Mencionan
  un portal "Virtual Office"/"Sede Virtual" en `portal.ourclub.io/argentinosjrs` para socios — portal
  de socios gateado (login), mismo patrón que otros clubes del proyecto, no explorable sin credenciales
  de socio (decisión de Guido, no tarea de sourcing).
- **Página de Descargas (`el-club/descargas/`) confirmada sin cambios**: sigue topando en Balance
  2018-19/Memoria 2018-19 (ya descargados). El dominio de los links de esa página resolvió como
  `argentinosjuniors.mystagingwebsite.com` en un fetch — parece un artefacto de caché/staging del
  fetch, no algo para perseguir (los archivos en sí, vía `images/download/...`, siguen siendo del
  dominio real cuando se resuelven directo).
- Archivo oficial de descargas — https://argentinosjuniors.com.ar/el-club/descargas/ (sección
  "Club > Descargas > Balances"). Descargados 9 PDFs reales a `Clubes/Argentina/Argentinos Juniors/`:
  balances completos con estados contables + informe de auditoría + informe del Órgano de
  Fiscalización de los ejercicios cerrados 30/6/2016, 2017, 2018 y 2019 (`balance-2015-2016.pdf` a
  `balance-2018-2019.pdf`), una memoria narrativa separada del mismo último ejercicio
  (`memoria-2018-2019.pdf`), dos tablas comparativas de patrimonio del Órgano de Fiscalización
  (`resumen-organo-fiscalizacion-2018.pdf`, ejercicios 2014-2018; `resumen-organo-fiscalizacion-2022.pdf`,
  ejercicios 2019-2023), una presentación de asamblea con comparativo patrimonial 2015-2019
  (`presentacion-asamblea-2018-2019.pdf`) y un dictamen legal institucional
  (`dictamen-presidencia-comision-fiscalizadora.pdf`).
- **5 ejercicios YA CARGADOS en el sitio: 2015 a 2019** (Versión 95, con un FIX importante en una
  sesión posterior). Carga original (Versión 95): los 5 desde `presentacion-asamblea-2018-2019.pdf`
  (2 páginas, comparativo de los 5 ejercicios a la vez, 4 categorías agregadas). BUG REAL
  ENCONTRADO Y CORREGIDO: esa presentación dice explícito en su título "cifras en pesos AJUSTADAS
  POR INFLACIÓN" — no son pesos nominales como el resto del sitio. Se OCRearon los 3 balances
  escaneados (`balance-2015-2016.pdf`, `balance-2016-2017.pdf`, `balance-2017-2018.pdf`, 39+45+31
  páginas, Tesseract) y se reemplazaron los ejercicios 2015-2018 con sus cifras REALES (nominales),
  con detalle completo de Anexo IV (Recursos por rubro) y Anexo V (Gastos por rubro x
  departamento). Resultados reales (nominales, corregidos): DÉFICIT 2015 $(67.509.882) / DÉFICIT
  2016 $(24.707.096) / SUPERÁVIT 2017 $30.812.797 / SUPERÁVIT 2018 $318.336.988 — TODOS muy
  distintos de las cifras restated que decía la carga original (ej. 2018 pasó de $495.815.894 a
  $318.336.988). El Ejercicio 2019 NO se tocó (sigue en $119.274.273, desde la presentación de
  asamblea) porque `balance-2018-2019.pdf` (a pesar del nombre) resultó ser la Memoria narrativa
  completa, sin una sola cifra de balance — no hay balance auditado real de ese ejercicio
  descargado para reemplazarlo. Ver comentario de cabecera completo en
  `data/argentinosjuniors-data.js` (incluye un error aritmético de $20.000 encontrado y documentado
  en el propio Anexo IV del balance 2015-2016, verificado visualmente, no es un error de
  transcripción).
- Pendiente: balance completo de los ejercicios 2019-20 en adelante — no están en la página de
  Descargas. El botón "Memoria 2017-2018" de esa misma página está mal linkeado (apunta al resumen
  2022 en vez de a la memoria real), así que esa memoria puntual sigue sin conseguirse pese a que el
  balance completo de ese ejercicio sí se bajó. También pendiente: un balance auditado real del
  Ejercicio 2018/2019 (2019), para confirmar/corregir la única cifra que sigue sin verificar contra
  un documento primario propio.
- Contacto: sección "Institucional" del sitio (anuncia cada aprobación de memoria y balance, buena
  fuente para monitorear ejercicios nuevos) — para pedido directo, DM a @AAAJoficial o sección Socios.
- Último chequeo: 2026-09-26.
- Color de marca: `#E32021` — tabla por liga de footylogos (Liga Profesional Argentina), 1er
  color, exacto, verificado 2026-09-21. Wikipedia dice explícitamente que el rojo predomina
  (desempate (b) de bicolores).
