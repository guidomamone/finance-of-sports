# Notas generales — Ecuador

## Hallazgo estructural clave (sesión 2026-09-13): a la fecha, NINGÚN club ecuatoriano es S.A.D.P./SAD

**Esto reencuadra todo el sourcing de Ecuador — leer antes de asumir que el problema es "no se buscó
lo suficiente".** La premisa de que los clubes ecuatorianos ya están organizados como S.A.D.P.
("Sociedad Anónima Deportivo-Profesional") desde una reforma de la década de 2010 es **incorrecta**
a septiembre de 2026. La cronología real, reconstruida con prensa ecuatoriana esta sesión:

- **2021**: hubo un acuerdo ministerial que en teoría habilitaba la transformación a Sociedad
  Anónima Deportiva (SAD), pero la Ley del Deporte de base nunca se reformó para hacerlo operativo —
  confirmado por primicias.ec ("La Ley del Deporte aún no ha sido reformada" / "todos los clubes
  profesionales se definen como sociedades civiles sin fines de lucro").
- **10-dic-2024**: la "Ley Antipillos" crea el concepto legal de SAD para el deporte, con un plazo de
  90 días para que la Superintendencia de Compañías, Valores y Seguros (SCVS) emita el reglamento —
  plazo que NO se cumplió en la práctica.
- **19-dic-2025**: la Asamblea Nacional aprueba la reforma a la Ley Orgánica del Deporte que
  finalmente habilita a los clubes a convertirse en SAD (84 votos a favor, 60 en contra).
- **11-feb-2026**: publicación oficial de esa reforma.
- **23/24-jun-2026**: la SCVS emite el reglamento operativo (Reglamento de Transformación de Clubes
  Deportivos) que por fin permite iniciar trámites reales de conversión.
- **26-ago-2026**: 9 de Octubre (club de categoría inferior, Guayaquil) se convierte en el PRIMER
  club de todo el país en presentar documentación formal ante el Viceministerio del Deporte para
  iniciar (no completar) su transformación a SAD — hito de prensa citado como "precedente".
- A la misma fecha, Barcelona SC solo está "analizando" la conversión (declaraciones de su
  vicepresidente Galo Roggiero, 20-ago-2026), con un proceso estimado de 12-18 meses y sujeto a voto
  de dos tercios de la asamblea de socios. No se encontró declaración equivalente de ningún otro
  club grande (Emelec, LDU Quito, Independiente del Valle, etc.).

**Conclusión operativa para sourcing**: a la fecha de esta sesión, los 10-13 clubes candidato de la
lista de este proyecto siguen siendo TODOS sociedades civiles sin fines de lucro. No existe, para
ninguno, una "S.A.D.P. moderna dueña del fútbol" separada del club social — la nota original de
`LDU Quito.md` (sesión 2026-09-12) asumía que sí existía y que solo faltaba encontrarla; esta sesión
corrige esa asunción. Esto no es una falla de búsqueda, es un hecho estructural del país en este
momento: la figura legal recién es operativa desde junio de 2026 y ningún club de la lista la
completó todavía. Retomar este ángulo cuando la prensa reporte que alguno de los clubes de la lista
efectivamente terminó su conversión (vale la pena, en una sesión futura, googlear
`"[club] se convierte en sociedad anónima deportiva"` antes de rebuscar en Supercias directamente).

## Por qué Supercias no es el regulador correcto para estos clubes (todavía)

Un hallazgo relacionado: los clubes deportivos profesionales ecuatorianos obtienen personería
jurídica vía el **Ministerio del Deporte** (Acuerdo Ministerial de otorgamiento de personería
jurídica y aprobación de estatutos), no vía la Superintendencia de Compañías — porque son
"sociedades civiles sin fines de lucro" (personas jurídicas de derecho privado sin ánimo de lucro),
no "compañías" en el sentido de la Ley de Compañías que regula Supercias. Esto explica por qué el
intento de la sesión anterior de buscar a LDU Quito en el portal "Consulta de Compañías" de Supercias
no encontraba nada aunque el nombre fuera exacto: el problema no era el autocomplete poco confiable
(aunque eso también es cierto, ver abajo), sino que esa entidad estructuralmente no está en ese
registro. Supercias solo pasará a ser relevante para un club específico el día que ese club complete
su conversión a SAD (ahí sí pasaría a ser una "compañía" regulada por Supercias, con la obligación de
reporte que eso implica).

## Intento de acceso a Supercias (Ecuador, 2026-09)

**Actualización de esta sesión — se exploró a fondo la Superintendencia de Compañías, Valores y
Seguros (supercias.gob.ec), el ángulo que había quedado flageado.** Tiene un portal público real de
"Consulta de Compañías" (appscvsgen.supercias.gob.ec/consultaCompanias/societario/busquedaCompanias.jsf)
que en teoría permite buscar por Expediente/RUC/Nombre y llegar a "Información Estados Financieros"
(documentado en su propio manual de usuario, público en el sitio) — pero en la práctica el campo de
búsqueda es un autocomplete (PrimeFaces) que no devolvió sugerencias ni con el nombre completo del
club ("LIGA DEPORTIVA UNIVERSITARIA DE QUITO") ni con un RUC candidate (1790463265001, de fuente de
baja confianza) — quedó con el botón "Consultar" deshabilitado en ambos intentos, y una prueba con
solo "LIGA" mostró que el autocomplete devuelve coincidencias de OTRAS empresas cuyo nombre ni
siquiera contiene esa palabra completa (ej. "ALIGA CORP S.A.S."), sugiriendo un motor de búsqueda
fuzzy poco predecible. No se logró operar este portal para ningún club esta sesión — pendiente de
retomar con el RUC exacto y verificado (no se encontró un lookup público de RUC por nombre de
empresa que confirmara 1790463265001).

