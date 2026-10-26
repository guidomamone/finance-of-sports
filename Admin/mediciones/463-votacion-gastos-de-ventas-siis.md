<!-- md: el caso de la votación del 463 (Dónde va «Gastos de ventas» cuando el estado de SIIS lo trae como una cifra sin abrir) con los números medidos | leer: al votar o al revisar esa decisión -->
# Votación 463: Dónde va «Gastos de ventas» cuando el estado de SIIS lo trae como una cifra sin abrir

Conclusión: (se completa al contar los votos: la opción, el resultado en `Admin/registros/auditoria-proceso.jsonl` y la regla que salga en `Admin/CONVENCIONES-DATOS.md`)
Destino: (la regla o la carga que cambia)

## El caso

## Hechos medidos (2026-10-26)

- El estado de resultados de SIIS (Supersociedades, Colombia) de Deportes Tolima 2016–2025 trae TRES rubros de gasto de operación, cada uno como UNA cifra que el club no abre: «Costo de ventas», «Gastos de ventas» y «Gastos de administración». Fuente: `Clubes/Colombia/Deportes Tolima/siis-estado-2025.md` (L11–L23) y los otros nueve años.
- Tolima 2025 (miles de pesos): ingresos 49.330.876; costo de ventas 2.774.438; gastos de ventas 39.666.000; gastos de administración 5.110.640. «Gastos de ventas» es el 80 % de los gastos de operación; en 2016 es el 91 % (`siis-estado-2016.md`).
- El mismo hecho económico en otros clubes colombianos YA CARGADOS, donde el documento sí abre esa nota: la nota de «gastos de ventas» es la actividad deportiva del club, no una fuerza de ventas. Once Caldas 2018: «GASTOS DE PERSONAL (gastos de ventas)» 6.866.963 miles = nómina de la actividad deportiva, categoría `wages_squad` (`data/co/oncecaldas-co.json`, ajuste de 2026-10-25 en `Admin/registros/ajustes-manuales.jsonl`, cita «la respuesta de la cola dice que los salarios del plantel están en esa línea»). Fortaleza 2023: «Sueldos» de la nota de gastos de ventas = 648.297 miles. Los documentos de Tolima (solo notas, descartados) abrían esa nota con nómina, derechos deportivos y partido (`Admin/sourcing/Colombia/Deportes Tolima.md`).
- Precedente de ESTA fila sin abrir: una sola, Boyacá Chicó (`data/co/boyacachico-co.json` L301): «Gastos de ventas» → `admin_general_expense` con importe 0 (no pesa nada).
- «Costo de ventas»: 10 filas en clubes colombianos cargados van a `other_operating_expenses / other_expenses` (precedente del mismo país, mismo hecho: el costo de lo que vende la tienda).
- El sitio tiene la categoría `lump_football_operations_expense` («Fútbol profesional, sin desglosar por la fuente») para el gasto de operación deportiva que el documento no abre, y `admin_general_expense` («Administración y gastos generales»).
- La categorización automática le dio a «Gastos de ventas» 0,65 de confianza hacia `admin_general_expense` (mínimo 0,8) y a «Costo de ventas» 0,5 hacia `lump_football_operations_expense`: por eso quedaron en la cola humana (`node tools/cola.mjs`, casos 5f776ac y 6442ecb para 2016).
- Cuánto mueve: 80–91 % de los gastos de Tolima cambia de rubro según la opción; el total y el resultado no cambian. Años ya cargados que cambian: 0 (Tolima es el primer club con este formato; La Equidad, Águilas Doradas y Bucaramanga tienen el mismo formato y se cargarán después con la regla que salga).

## Las opciones

- **A.** lump_football_operations_expense (Fútbol profesional, sin desglosar por la fuente)|39666 M COP en Tolima 2025 (80 % de los gastos)
- **B.** admin_general_expense (Administración y gastos generales)|39666 M COP en Tolima 2025 (80 % de los gastos)

## Cuánto mueve (skill votacion-de-criterios, sección 4)

(sin montos en las opciones: se mide a mano y se anota acá)

Votan: tres votantes, para que siempre haya desempate.

## Qué abrir y dónde (lista fija: el votante no decide qué mirar, mira esto)

1. Las reglas que salen de las palabras del caso:
- (sin --palabras: grep de las palabras del caso en Admin/CONVENCIONES-DATOS.md)
2. Precedentes (escala de la skill, criterios 1 a 4):
- Mismo club (criterio 1): data/co/deportestolima-co.json y Admin/carga-clubes/deportestolima-co.md
- Misma liga (criterio 2), co-primeraA: 15 clubes (envigado-co, oncecaldas-co, americadecali-co, atlnacional-co, depcali-co, santafe-co, junior-co, unionmagdalena-co); sus JSON están en data/co/
- Mismo país (criterio 3): 15 clubes en data/co/ (los votantes buscan los que tuvieron el mismo hecho; ejemplos: alianzafc-co.json, americadecali-co.json, atleticobucaramanga-co.json, atlnacional-co.json, boyacachico-co.json, depcali-co.json)
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
