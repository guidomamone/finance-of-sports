<!-- md: los defectos, falsos errores, salidas que faltan y propuestas de proceso que dejó cargar Jaguares y Real Santander (20 club-años, 463) | leer: al mejorar club-siis, gestion-exa, sponsor-fka, estadio-sponsor, auditoria o el alta de un club | tools: club-siis, alta-club, gestion-exa, sponsor-fka, estadio-sponsor, auditoria, lookup-brand-color -->
# 463 · Qué hay que mejorar, visto cargando 20 club-años (Jaguares y Real Santander, 2016 a 2025)

Conclusión: la carga salió limpia (20 años verificados, 0 frenados, 0 preguntas de categoría, `audit` en P0 a P2 = 0) y lo que cuesta no es la carga: es lo que cada
paso no imprime y cada subagente reconstruye a mano (la investigación se repite en los seis subagentes de la tanda).
Destino: las propuestas P1 a P9 quedan en el punto 479 del TODO; ninguna toca un dato publicado ni una compuerta de verificación (son salida de las tools,
un nombre legal y textos de los briefs).

Los números de abajo son de esta tanda (28-10-2026). «Fricción» = lo que un subagente o la sesión tuvo que descubrir por su cuenta.

## 1. Falsos errores y avisos que no dicen nada nuevo

1. `estadio-sponsor.mjs --ensayo --club X --anio N` sale con código 1 cuando solo avisa que faltan datos: el Bash lo muestra como error.
2. El ensayo de `estadio-sponsor` con `--anios` marca «← falta completar» en cada sponsor aunque su `sin-fuente` sea válido; con `--anio N` el mismo caso no se lista. Dos respuestas para lo mismo.
3. El lote avisa «categorías en 0 en un documento con filas armadas a mano… Salarios del plantel» en todos los años de SIIS: es lo esperado (SIIS no trae sueldos).
4. `sponsor-fka.mjs --buscar --todos` dice «ningún año para buscar (ninguno débil)» en un club sin entrada en `contexto-manual.json`: `--todos` no hace lo que dice su ayuda en un club nuevo; hay que usar `--anios 2016-2025`.
5. `club-siis "<Club>"` marca «(sin dictamen)» en los 10 años antes de bajar los dictámenes y solo en los que SIIS no tiene después: un mismo rótulo para «por bajar» y «SIIS no lo tiene». `siis-adicionales` ya lo sabe.

## 2. Lo que las tools deberían imprimir (para no investigar)

6. El alta imprime la ruta `Clubes/Colombia/Real Santander/siis-estado-2025.pdf` y `--club Real Santander` sin comillas: pegados en la terminal fallan.
7. `--preparar` lista diez `siis-estado --anio N` sueltos cuando `--todos --escribir` hace lo mismo.
8. El paso «Liga de cada año» dice qué años faltan, no por qué. Real Santander jugó 2019 y 2020 como «Real San Andrés» (se mudó a la isla): la caché de `lookup-club-league` no lo trae y hubo que ir a Wikipedia en inglés. Debería imprimir los alias del club (Wikidata) o «el año falta en la lista: probar el nombre anterior».
9. `estadio-sponsor.mjs --ensayo` da «estadio 100 %» sin decir qué estadio detectó ni con qué fuente; y cuando Wikidata da el nombre actual pide «verificar el de 2016» sin decir cómo.
10. El brief del auditor pide 2020 y 2022 a 2025 y no dice por qué falta 2021 («SIIS no lo tiene»), no imprime un ejemplo del formato (hoy `grep -m 2 deportestolima-co` y otros dos greps para un caso con salvedades y uno con continuidad) y no dice cómo agregar a `auditoria.jsonl` (909 KB, no se puede `Read`; el `Edit` se ancla en la cola de la línea anterior).
11. El aviso final de `auditoria.mjs` («52 balances sin línea y 101 con el informe sin transcribir») no dice cuáles son del club recién cargado; hay que correr `--pendientes`. La validación de `linea` y `texto` contra el `.md` corre solo al final.
12. El brief de gestiones manda a leer `Admin/ARQUITECTURA.md`, «Gestiones»: esa sección no tiene título que se encuentre con grep. No hay regla impresa para «la nota dice el cargo pero no cuándo cambió la junta» ni para «fundador sin nota de inicio».
13. Los briefs de estadio y sponsor arman a mano el paso «informe-anual» (un grep de patroc|sponsor sobre las transcripciones): en zsh `grep -rin … --include=*.md` falla («no matches found»), y `grep -r -c` imprime una línea por archivo, también los `.json`. Falta un comando que haga el grep y devuelva la línea de intento lista para `sin-fuente`.
14. `web.archive.org` está bloqueado en el WebFetch de los subagentes: la clase `archivo-web` queda siempre `inaccesible` y no se puede probar. El brief no lo dice.
15. Nada valida `tools/contexto-manual.json` salvo el ensayo de estadio-sponsor.

## 3. Defectos

16. Alta, pregunta del nombre legal: dice «lo más frecuente del documento es nada» (texto sin sentido cuando no hay candidato) y propone «Jaguares Futbol Club Sa» (sin acento ni puntos) aunque la portada trae «SA»; todas las sociedades de Colombia llevan «S.A.». Se contesta siempre igual (2 de 2 clubes).
17. `lookup-brand-color.js "Real Santander"` ofrece el artículo del viejo club de Cantabria (España) como candidato principal; hay que buscar «Real Santander Colombia Floridablanca». Imprime «avisale a Guido para que lo prepopule» (la sesión no tiene a quién avisar) y, si el infobox no trae colores (Jaguares), no da hex: salió del wikitext pedido a mano (`action=raw`, plantilla de camiseta).
18. `gestion-exa`: marca ✓ cuando la página nombra a la persona aunque no diga el cargo ni cuándo asumió (jaguaresfc.com/historia, La Lengua Caribe 2017, El Extra 2018); la «frase» que muestra es el título de la página, no la frase que nombra el cargo; dice «URL sin fecha» para notas que sí traen fecha en la página, y esa fecha a veces es la de actualización (Wikipedia 2012-12-11, elmeridiano 2026-10-23); Gemini confunde gerente y presidente y cita notas que no lo dicen; no busca con el nombre anterior del club; los links de X dan HTTP 402 y no los marca como no abribles.
19. `sponsor-fka.mjs --buscar` trae fichas de otro club (CD Jaguares Jalisco, liga mexicana) y de otro equipo del club (femenino de Real Santander 2023) sin avisar.
20. Los subagentes eligen bien no cargar una marca cuando Wikipedia y FKA discrepan (Real Santander 2016 a 2018), pero cada uno reconstruye la comparación.

## 4. Propuestas de proceso (ninguna cambia un dato publicado)

- **P1. Nombre legal del alta:** normalizar «SA»/«S.A.S.» a «S.A.»/«S.A.S.» y proponer el acento de las palabras del club que ya figuran con acento en `data/clubs.js` (Fútbol); la pregunta se hace solo si el nombre difiere del normalizado. Solo toca el campo `name`.
- **P2. Una sola pregunta de gestión por club** en la cola (hoy 20 preguntas idénticas, 10 por club, que no frenan): «¿gestión sin confirmar de <club>? años: …». Menos ruido sin tocar ninguna respuesta.
- **P3. Un criterio escrito para las gestiones** (votación de tres, `votacion-de-criterios`): qué hacer con (a) un presidente nombrado por notas fechadas en años sueltos, sin nota de inicio ni de salida y sin otro presidente en el medio; (b) un fundador cuyo inicio es la fecha de fundación. Hoy los dos clubes quedaron `confirmada:false` (la regla de inicio solo de mes, 478.18, no alcanza) y cada agente relee la sección sin encontrarla. Es un criterio de datos: lo decide la votación, no la sesión.
- **P4. Un `--ejemplo` y un `--agregar` para el auditor:** el brief imprime una línea modelo (sin salvedades, con salvedades, con continuidad) y la tool agrega la línea validada (comprueba `linea` y `texto` contra el `.md` antes de escribir); `--pendientes` filtrado por el club.
- **P5. Salida honesta de los ensayos:** código 0 cuando solo hay faltantes; «sin-fuente válido» en vez de «falta completar»; «SIIS no lo tiene» en vez de «(sin dictamen)».
- **P6. Un arranque único por club:** `club-siis "<Club>" --preparar` imprime una vez los alias del club (Wikidata y `club-aliases.js`), la liga de cada año y el estadio detectado, y los briefs de los tres subagentes lo repiten en vez de redescubrirlo.
- **P7. Un solo comando para el paso «informe-anual»** del sponsor y su línea de intento ya armada; `fos validar-contexto`.
- **P8. Decir en los briefs lo que los subagentes no pueden** (Wayback, X): cómo se registra una clase `inaccesible` sin intentarla.
- **P9. `lookup-brand-color`:** que pida la plantilla de camiseta de la Wikipedia cuando el infobox no trae colores, y que no ofrezca un artículo de otro país cuando el club tiene `country`.

## 5. Dos dudas de criterio que dejaron los subagentes (sin regla escrita)

- Auditor de Real Santander: «firma» (Consultoría & Revisoría S.A.S., firmado por una persona en su representación) o «persona»; hoy «firma», como Atlético Nacional (Baker Tilly). Jaguares y Tolima son persona natural.
- `continuidad` de Real Santander 2020 y 2021: el dictamen recomienda por la causal de disolución por pérdidas (nota 12) sin párrafo de «incertidumbre material»: quedó en false.
