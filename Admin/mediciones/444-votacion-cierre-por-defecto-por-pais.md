<!-- md: el caso de la votación del 444 (cierre por defecto por país para los documentos anuales sin fecha) con los números medidos | leer: al votar o al revisar esa decisión -->
# Votación 444: cierre por defecto por país para los documentos anuales sin fecha

Conclusión: (se completa al contar los votos: la opción, el resultado en `Admin/registros/auditoria-proceso.jsonl` y la regla que salga en `Admin/CONVENCIONES-DATOS.md`)
Destino: (la regla o la carga que cambia)

## El caso

Qué se decide: 554 documentos anuales con transcripción (`.md`) no traen fecha de cierre en el registro (`periodo.cierre` vacío); 191 de ellos son de clubes que ya tienen algo cargado y FRENAN la carga o piden un ajuste manual `cierre`, porque la carga necesita la fecha para saber qué ejercicio es (el año) y para el tipo de cambio de cierre. Hoy la carga ya deduce la fecha de los documentos vecinos del club (`tools/cierre-vecinos.mjs`: si el año anterior y el siguiente cierran el mismo día y mes, este cierra igual; 98,2 % de aciertos medido dejando afuera cada anual con cierre conocido, 1555 de 1584) y lo deja anotado como aviso («fecha de cierre deducida»). No alcanza para los clubes que no tienen vecinos con fecha.

La pregunta: ¿se asume un cierre POR DEFECTO por país cuando el documento no trae fecha y los vecinos no la deducen? El año sale del nombre del archivo (si el nombre dice otro año que el cierre asumido, el sistema ya marca `nombreNoCoincide` y frena para confirmar).

Medición (anuales con cierre ya leído por `tools/periodo.mjs`, por país, sobre los 3662 `.md` de Clubes/):

| País | Anuales con cierre conocido | Mismo día y mes | Sin cierre hoy |
|---|---|---|---|
| Brasil | 296 | 31-12: 289 (98 %) | 57 |
| Rusia | 46 | 31-12: 45 (98 %) | 36 |
| Noruega | 272 | 31-12: 271 (100 %) | 23 |
| Ucrania | 17 | 31-12: 17 (100 %) | 15 |
| España | 75 | 30-06: 75 (100 %) | 36 |
| Países Bajos | 190 | 30-06: 190 (100 %) | 13 |
| Francia | 9 | 30-06: 9 (100 %) | 43 |
| Portugal | 183 | 30-06: 170 (93 %) | 17 |
| Colombia | 160 | 31-12: 146 (91 %) | 122 |
| Argentina | 131 | 31-12: 6 (5 %); 30-06: 93 (71 %) | 46 |
| República Checa | 120 | 31-12: 42 (35 %); 30-06: 78 (65 %) | 27 |

Los siete primeros pasan el 98 %; resolverían unos 220 de los 554. Los demás no tienen un día dominante y quedan como están. Ya se midió y descartó: un escalón por el año del nombre del archivo (81,5 % de aciertos) y «todos los demás documentos del club cierran igual» (78,8 %).

Qué cambia en los datos publicados: nada ya cargado (son documentos sin cargar o con el ejercicio ya cargado por un ajuste manual `cierre`). Lo que cambia es qué documentos frenan: con la opción A, un documento de uno de esos siete países sin fecha pasaría con un aviso «cierre asumido por país» y confianza baja; un error de cierre asignaría mal el año del ejercicio (la verificación de años vecinos y el nombre del archivo lo cazan en la mayoría de los casos). La opción C no asume: abre una pregunta de cola con el cierre propuesto.

## Las opciones

- **A.** Asumir el cierre por defecto de los 7 países que pasan el 98 % (Brasil, Rusia, Noruega, Ucrania el 31-12; España, Países Bajos, Francia el 30-06), con aviso y confianza baja, solo si el documento no trae fecha y los vecinos no la deducen (monto: 220)
- **B.** No asumir nada: los documentos sin fecha siguen frenando y se resuelven uno por uno con un ajuste manual cierre (monto: 0)
- **C.** Abrir una pregunta de cola con el cierre del país como propuesta (un revisor la confirma con el documento) en vez de asumirlo (monto: 0)

## Cuánto mueve (skill votacion-de-criterios, sección 4)

- A contra B: diferencia 220, 39,71 % del total 554: más de 1 %, votan tres
- A contra C: diferencia 220, 39,71 % del total 554: más de 1 %, votan tres
- B contra C: diferencia 0, 0 % del total 554: 1 % o menos, no se vota si no le cambia el signo al resultado (se elige la más fiel al documento, criterio 5, y se anota la medida)

Votan: tres votantes, para que siempre haya desempate.

## Qué abrir y dónde (lista fija: el votante no decide qué mirar, mira esto)

1. Las reglas que salen de las palabras del caso:
- «cierre»: 
  - Admin/CONVENCIONES-DATOS.md:131 — - LA LIGA DE UN EJERCICIO ES LA DEL CIERRE (decidido por Guido). Cuando un ejercicio
  - Admin/CONVENCIONES-DATOS.md:174 — 31/12/1998), su cotización de cierre en FX_CLOSE (`XXX@AAAA-MM-DD`, en data/currency-map.js) y un ajuste manua
  - Admin/CONVENCIONES-DATOS.md:189 — equivocado, no un cierre ya ocurrido. Detalle completo y tabla de los 7 valores en
  - Admin/CONVENCIONES-DATOS.md:196 — gestión de un ejercicio queda dividida entre dos presidentes, se atribuye la que está a cargo al cierre y la d
  - Admin/CONVENCIONES-DATOS.md:266 — fecha de cierre, un semestral): no se carga solo. Va a `Admin/registros/documentos-parciales.txt` (no a `docum
  - Admin/CONVENCIONES-DATOS.md:271 — el cierre del SEGUNDO tramo (su `cierre`/`fxRef`, su caja y su deuda, que son saldos a esa fecha); (4) `public
- «vecinos»: ningún renglón de CONVENCIONES-DATOS.md (buscar en la skill club-data-mapping y su referencia/)
- «deducid»: 
  - Admin/CONVENCIONES-DATOS.md:34 — la J.League), nunca deducido de otro club; si la fuente da solo el nombre del color, el hex sale de la paleta 
2. Precedentes (escala de la skill, criterios 1 a 4):
- Mismo club (criterio 1): data/dk/sonderjyske-dk.json y Admin/carga-clubes/sonderjyske-dk.md
- Misma liga (criterio 2), dk-superliga: 10 clubes (fckobenhavn-dk, brondby-dk, midtjylland-dk, agf-dk, silkeborg-dk, viborg-dk, nordsjaelland-dk, randers-dk); sus JSON están en data/dk/
- Mismo país (criterio 3): 10 clubes en data/dk/ (los votantes buscan los que tuvieron el mismo hecho; ejemplos: agf-dk.json, brondby-dk.json, fckobenhavn-dk.json, fredericia-dk.json, midtjylland-dk.json, nordsjaelland-dk.json)
3. La escala y cómo se vota: .claude/skills/votacion-de-criterios/SKILL.md (secciones 2 y 3).
4. Una votación anterior sobre el mismo hecho: grep del hecho en Admin/registros/auditoria-proceso.jsonl.

## Cómo devolver el voto (JSON, no prosa)

```json
{ "opcion": "A",
  "criterios": {
    "1": { "valor": "a favor | en contra | no aplica", "cita": { "ref": "ruta/archivo.md:123 (o :123-130) | club-id@2023", "texto": "fragmento LITERAL de esa línea o de ese ejercicio", "mismo_hecho": true } },
    "2": {}, "…": {}, "9": {} },
  "anios_que_cambian": ["club-año"],
  "no_abri": ["rutas de la lista de arriba que no abriste"] }
```

Se guarda un archivo por votante. Antes de contar: `node tools/votacion-citas.mjs <voto.json …>` verifica cada cita (la línea existe y contiene el texto) y `node tools/votacion-contar.mjs <voto1.json> <voto2.json> <voto3.json> --caso "…" --escribir` cuenta, verifica y anota. Un precedente (criterios 1 a 3) suma solo con la cita verificada y `mismo_hecho: true`; un voto cuya cita no se verifica no suma. Lo que no abriste va en `no_abri`: no se lo apoya en el texto del caso.
