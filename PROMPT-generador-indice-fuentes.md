# PROMPT para una sesión futura — generador del índice de países de `fuentes-por-club.md`

Pegale esto a Claude en una sesión nueva abierta en `finance-of-sports/`. Es autocontenido:
no hace falta haber estado en la sesión del 2026-09-20 que partió el índice.

---

## El prompt

En finance-of-sports, `fuentes-por-club.md` es hoy un índice de PAÍSES: una línea por país con
cuántos clubes trackea, cuántos tienen documento encontrado, y la fecha del chequeo más viejo de ese
país. El detalle línea-por-club vive en `fuentes/_indice/<País>.md`, y el detalle completo de cada
club en `fuentes/<País>/<Club>.md`. Ese split se hizo el 2026-09-20 (ver `CHANGELOG.md`).

Los tres números de cada línea de país se escribieron UNA vez, con un script de un solo uso, y desde
entonces se mantienen a mano. Tu tarea es reemplazar ese mantenimiento manual por
`tools/generate-fuentes-index.js`, siguiendo el patrón de `tools/generate-club-index.js` (que
regenera una sección de `ESTADO.md` desde los `data/<club>-data.js`) y de
`tools/generate-fuentes-page.js`.

Lo que el script tiene que hacer:

1. Leer todos los `fuentes/_indice/<País>.md`.
2. Por cada país, calcular:
   - **cantidad de clubes trackeados**: líneas que matchean `^- \[([^\]]+)\]\((<[^>]+>|[^)]+)\)`,
     EXCLUYENDO las que empiezan con "Notas generales" (esas apuntan al
     `_notas-generales.md` del país, no son un club).
   - **fecha del chequeo más viejo**: el mínimo de todos los `— Último chequeo: AAAA-MM-DD` del
     archivo. Ojo: no todos los clubes tienen fecha (en Argentina faltaba en ~25 de 66).
   - **cuántos con documento encontrado**: ver el criterio abajo, que es la parte difícil.
3. Reescribir la lista de países de `fuentes-por-club.md` (la sección `## Índice de países`),
   ordenada alfabéticamente con `localeCompare('es')`, respetando el formato exacto de línea de hoy:
   `- [País](fuentes/_indice/País.md) — N clubes, M con documento — Chequeo más antiguo: AAAA-MM-DD`
   Los países cuyo nombre tiene espacios o paréntesis llevan el link entre `<>`:
   `[Corea del Sur](<fuentes/_indice/Corea del Sur.md>)`. Un país con 0 clubes trackeados (hoy
   Arabia Saudita y Nigeria) lleva `— sin clubes trackeados individualmente, ver el detalle`.
   Actualizar también los totales del párrafo de arriba de la lista (países, clubes, con documento).
4. Bandera `--check` que NO escribe y sale con código 1 si el índice quedó desactualizado respecto
   de los archivos de país, igual que `generate-club-index.js --check`.

### El criterio de "con documento encontrado", que es la parte que no es mecánica

**Definición** (ya escrita en `fuentes-por-club.md`, no la cambies sin avisarle a Guido): existe al
menos un documento financiero identificado y accesible con cifras de ese club — propio, o un
agregado de liga con desglose club por club, como la DNCG francesa — aunque todavía no esté cargado
al sitio. NO cuenta un documento confirmado pero inaccesible (pago, captcha, 403), ni un agregado
que solo publica el total de la liga (como la DFL alemana).

El problema: el estado de cada club es PROSA LIBRE que escribe el agente de sourcing
("sin PDFs, pendiente todo", "8 ejercicios reales (2018-2025), sin cargar aún", "2 memorias
descargadas, sin datos financieros cargables"), no un campo estructurado. No existe un booleano en
ningún lado. La clasificación de la sesión del 2026-09-20 se hizo con dos listas de regex, y quedó
verificada así: **de 530 clubes, 518 matchearon señales de un solo lado, 0 no matchearon ninguna, y
12 matchearon señales de los dos lados** — esos 12 se resolvieron a mano leyendo el estado completo.

Las dos listas de regex y los 12 overrides están en el script de migración de esa sesión, que quedó
en el scratchpad y probablemente ya no exista. Están reproducidos abajo para que no los rederives.
Lo importante del diseño: **el script tiene que ABORTAR (o marcar para revisión con `--check`)
cuando una línea matchea señales de los dos lados o de ninguno**, en vez de adivinar. Ese es el
mecanismo que hizo confiable la corrida original: un heurístico silencioso clasifica mal sin que
nadie se entere (ej.: "dead-end propio, solo agregado SFL (5 años)" matchea un "N años" que parece
señal de documento, y no lo es).

Señales de que SÍ hay documento:
```js
[/\bcargado\b/i, /\d+\s+(ejercicios?|documentos?|memorias?|informes?|balances?|reportes?|temporadas?|pdfs?|archivos?|entidades|tablas|comptes)\b/i,
 /\bdescargad[oa]s?\b/i, /\bserie\s+(completa\s+)?\d{4}/i, /estados financieros .*reales/i, /\bPDF real\b/i,
 /cubierto vía agregado/i, /\bauditoría\b/i, /\bnotas \d{4}/i, /\bsolo \d{4}\b/i, /\b(10-K|20-F)\b/i,
 /memoria y presupuesto/i, /\bcompleto\b/i, /\bparcial\b/i]
```

Señales de que NO:
```js
[/\bsin pdfs?\b/i, /\bsin eeff\b/i, /\bsin hits\b/i, /\bnada encontrado\b/i, /\bpendiente todo\b/i, /\bdead-end\b/i,
 /\bsin fuente p[uú]blica\b/i, /\bdominio inalcanzable\b/i, /\bsin obligaci[oó]n\b/i, /\bno se encontr[oó]\b/i,
 /\bsin estructura\b/i, /\bbloquead[oa]s?\b/i, /\bsolo agregado\b/i, /\bsolo el agregado\b/i, /\bsolo para socios\b/i,
 /\bsin secci[oó]n financiera\b/i, /sin balance descargable/i, /nada bajado/i, /no verificado individualmente/i,
 /\bexceptuado\b/i, /sin cifras propias/i, /sin regulador/i, /ni transparencia/i, /\bsin cerrar\b/i,
 /bloqueo de tooling/i, /sin balance adjunto/i, /\binmaterial\b/i, /no consolida/i, /sin datos financieros cargables/i,
 /\bsin datos\b/i, /\bsin adjuntar\b/i]
```

Los 12 conflictos resueltos a mano (si el texto de esas líneas no cambió, tienen que seguir dando
lo mismo — es un buen test de que tu script reproduce la corrida original):

| País | Club | Decisión | Por qué |
|---|---|---|---|
| Argentina | Belgrano | NO | memorias descargadas, pero sin datos financieros |
| Argentina | Gimnasia y Esgrima (La Plata) | NO | idem |
| Argentina | Temperley | NO | memorias narrativas |
| Brasil | Ceará | SÍ | "dead-end viejo destrabado", 8 ejercicios reales |
| Brasil | Fortaleza | SÍ | idem, 11 ejercicios |
| Brasil | Vitória | SÍ | idem, 1 ejercicio |
| Corea del Sur | Ulsan HD | NO | entidad en DART pero sin informes en 10 años |
| Francia | OGC Nice | SÍ | cubierto por el agregado DNCG (lo de INPI bloqueado es aparte) |
| Portugal | Tondela | SÍ | 1 ejercicio parcial real vía arquivo.pt |
| Portugal | Arouca | NO | 4 ejercicios existen pero truncados en Wayback, no usables |
| Suiza | Basel | SÍ | 18 documentos 2005-2021 |
| España | Real Sociedad | NO | el depósito existe, el PDF queda detrás de un informe pago |

**Verificación obligatoria antes de dar la tarea por buena**: correr el generador sobre el estado
actual del repo y confirmar que NO cambia ni una línea de `fuentes-por-club.md` (`git diff` vacío),
salvo que haya habido sesiones de sourcing en el medio que justifiquen la diferencia — en ese caso,
justificá cada línea que cambia. Si el script produce números distintos de los que están escritos
hoy sin una razón identificable, el que está mal es el script, no el índice.

Al terminar, seguí el cierre de sesión de siempre (`ESTADO.md`, `TODO.md`, `CHANGELOG.md`, y la
sección de herramientas del skill `start-session-finance-of-sports-project`, que lista los scripts
de `tools/` y hay que sumarle este). Esto resuelve el to-do 35.
