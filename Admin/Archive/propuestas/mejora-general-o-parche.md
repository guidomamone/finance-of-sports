# Mejora de script: ¿general o parche? (propuesta, para el ok de Guido)

Guido: «auditoría se fija que la mejora no sea un parche situacional, sino una mejora general? No está mal hacer un parche de vez en cuando, pero en general debería proponerse una mejora y medir que no rompa nada. Necesitamos un criterio, porque inclusive yo ahora respondo con gut feeling».

Hoy la Auditora mira las condiciones nuevas (sección 7 de su skill) y la skill de onboarding dice «nada de manta corta», pero ninguna dice cómo se distingue una mejora general de un parche ni cuándo un parche está permitido.

## Texto exacto 1: skill `auditoria-finance-of-sports`, sección nueva antes de «Cómo mantener este skill»

## 8. Mejoras de script: ¿general o parche?

Toda mejora a una tool del pipeline pasa por la Auditora antes del commit, además de las cinco preguntas de la sección 7 si agrega una condición. La pregunta es si arregla un patrón o un caso.

**Es general** si cumple las tres:
1. **Se describe sin nombres.** La regla se escribe con lo que el documento imprime (un rótulo, un signo, una estructura, el régimen contable: Codice Civile, NRS, códigos NBB), nunca con un club, un id, un año o una ruta. El código tampoco los nombra.
2. **El patrón se repite.** Se buscan en los `.md` ya transcriptos los documentos con el mismo patrón, con el comando que lo da, y se escribe el número: 3 documentos o más, de 2 clubes o más.
3. **No rompe nada.** Antes y después, sobre todo lo cargado y los lotes de prueba (sección 5 de `club-or-year-onboarding`): 0 años que cambian lo que se carga, o cada uno que cambia es un error que se corrige, con la cita del documento. El caso que la motivó queda destrabado.

**Es un parche** si el patrón está en 1 o 2 documentos, o en un solo club. Un parche no va al código: va como ajuste en `Admin/registros/ajustes-manuales.jsonl`, con motivo y cita, y con el patrón escrito en una frase. **Al tercer documento con el mismo patrón** (dos clubes o más), los ajustes se reemplazan por una mejora general, que tiene que dar el mismo resultado sin ellos.

**Rechazada**: no se describe sin nombres; o rompe un caso que antes salía bien; o el patrón tiene menos de 3 documentos y se quiso meter igual en el código.

**Dónde queda.** El veredicto en `Admin/registros/auditoria-proceso.jsonl`, con el patrón, el comando de búsqueda, el número de documentos y el antes y después.

## Cómo mantener este skill

(Ancla: la sección 8 va justo antes. Aprobado por Guido el 2026-10-21: «ok al skill para parches vs reglas generales».)

## Texto exacto 2: skill `club-or-year-onboarding`, sección 3b, punto 2 (reemplaza la segunda oración)

No commitear antes del veredicto de la Auditora, que decide con la sección 8 de `auditoria-finance-of-sports` si es una mejora general o un parche.
