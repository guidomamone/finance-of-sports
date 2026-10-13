# Universidad de Chile (Azul Azul S.A.)

- **Hit fuerte, ampliado casi a la serie completa (2026-09-12).** 16 ejercicios anuales consecutivos
  (2010 a 2025, sin ningún año faltante) + 1 memoria histórica descargados a
  `Clubes/Chile/Universidad de Chile (Azul Azul)/`: `estados-financieros-2010.pdf` a
  `estados-financieros-2025.pdf` (Estados Financieros Consolidados al 31/12, bajados del portal CMF
  vía la pestaña "Información Financiera" de la ficha — NO la pestaña "EEFF Filiales", que en
  realidad corresponde a estados financieros de una FILIAL, "Inmobiliaria Azul Azul SpA", no al
  consolidado del club — con `mm=12`, `aa=<año>` y `tipo_norma=IFRS`, cada consulta genera un link
  temporal `auth`/`send` distinto en `safec_ifrs_verarchivo.php` que hay que descargar en el momento)
  y `memoria-anual-2011.pdf` (memoria + estados financieros combinados de ese ejercicio, también de
  la CMF). La propia ficha CMF confirma el límite inferior: "Esta sociedad presenta los primeros
  EE.FF bajo IFRS a partir de 31/03/2010" — 2009 y anteriores están bajo norma chilena antigua (NCH),
  no se intentó bajarlos en esta sesión.
- Pendiente: nada del rango 2010-2025, la serie está prácticamente completa (falta solo el cierre
  2026, que aún no ocurre). Si se quisiera ir más atrás, el ejercicio 2009 existiría bajo NCH (norma
  chilena, no IFRS) — no probado.
- Contacto: ficha CMF
  cmfchile.cl/institucional/mercados/entidad.php?mercado=V&rut=76838140&tipoentidad=RVEMI
  (pestaña "Información Financiera" para los EEFF del propio club — el selector Año/Tipo de
  Norma requiere un clic real desde dentro de la ficha, navegar directo a la URL con esos parámetros
  devuelve "Sin información"; pestaña 49 "Memorias Anuales" para memorias); udechile.cl no tiene una
  sección de inversionistas propia equivalente a la de Cruzados (el único PDF propio encontrado ahí,
  de 2017, ya no resuelve).
- Último chequeo: 2026-09-12.
- **CARGADOS AL SITIO (2026-09-25):** 3 ejercicios reales, `data/udechile-cl-data.js`
  (clubId `udechile-cl`, sufijo de país por convención): 2024
  (`udechile-cl-estados-financieros-2024`), 2023 (`udechile-cl-estados-financieros-2023`) y 2022
  (`udechile-cl-estados-financieros-2022`). Los 3 verificados con tie-out exacto (revenue, gastos y
  Ganancia/Pérdida final reconstruyen el total impreso del documento, con una diferencia de redondeo
  de 0,001 M CLP en el revenue de 2022 atribuible al propio documento, no a la carga — ver comentario
  de cabecera de `data/udechile-cl-data.js`). Ninguno de los 3 balances declara tipo de cambio propio
  de cierre (solo análisis de sensibilidad +/-10%, sin publicar el valor puntual), así que se usó el
  dólar observado SII de mercado, `fx` literal con `fxSource:'market_approx'` en el propio archivo
  del club. Pendiente: 2010-2021 y 2025 de la serie ya descargada (ver arriba) todavía no se cargaron
  al sitio.

