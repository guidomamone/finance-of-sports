<!-- md: el caso de la votación del 414 (una ganancia en inmovilizado de un club de fútbol: ¿es venta de jugadores?) con los números medidos | leer: al votar o al revisar esa decisión -->
# Votación 414: una ganancia en inmovilizado de un club de fútbol: ¿es venta de jugadores?

Conclusión: (se completa al contar los votos: la opción, el resultado en `Admin/registros/auditoria-proceso.jsonl` y la regla que salga en `Admin/CONVENCIONES-DATOS.md`)
Destino: (la regla o la carga que cambia)

## El caso

## Los hechos

Pregunta: ¿adónde va una línea de «ganancia en inmovilizado» (Ganhos em imobilizações, Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων, Profit on disposal of fixed assets) cuando el club es de fútbol? Hoy todas están en `other_revenue / other_income` porque nadie las reconoció (Jev solo contestó «¿es un subsidio?»: no, `Admin/registros/etiquetas-jev.jsonl`). La regla escrita solo cubre «Profit on disposal of investments» (`Admin/CONVENCIONES-DATOS.md` L456).

Barrido de `data/**/*.json` (2026-10-25): 119 líneas de `other_income` con etiqueta de venta o ganancia de activos, 47 etiquetas, 82 clubes. Pesan más del 5 % de los ingresos solo cinco clubes.

| Club y año | Línea | Monto | % de los ingresos | Qué dice el documento |
|---|---|---|---|---|
| Sporting 2000-2005 | «Ganhos em Imobiliz.» / «G. Imobilizações» | 2005: 64,981 M; 2002: 13,413 M | 2005: 65 %; 2002: 36,6 % | `Clubes/Portugal/Sporting CP/relatorio-contas-2001.md` L152: «Mais-valias em Transferências 13 468 / 13 413»; L180: las mais-valias salen de «alienação dos direitos desportivos do jogador Hugo Viana». Sporting no tiene ninguna línea `player_sales` en esos años |
| Benfica 2006/07 | «Ganhos em imobilizações» | 24,114 M | 29 % | `Clubes/Portugal/Benfica/relatorio-contas-2006-07.md` L1377: 24.114.308; L361: «Alienação de direitos desportivos 24.114»; L420: el aumento es «a mais-valia obtida com a venda do atleta Simão Sabrosa» |
| PAOK 2016/17-2024/25 (8 ejercicios) | «Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων» | 2025: 31,773 M | hasta 43 % | `Clubes/Grecia/PAOK/PAOK_FS_2025-06-30.md` L447 (31.772.700,69) y L896: «De la venta de futbolistas y entrenadores surgió una ganancia neta que figura en “Κέρδη & ζημίες από διάθεση μη κυκλοφορούντων στοιχείων” y asciende a 31.772.700,69 €» (la misma nota en los otros ejercicios) |
| Chelsea 2022/23 | «Profit on disposal of fixed assets» | £76,524 M | 11,2 % | `Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2022-23.md` L98: venta de la sociedad Blueco 22 Limited; Chelsea ya tiene su línea aparte «Profit on disposal of player registrations» |
| Santa Clara | «Alienação de Ativos Intangíveis» | 0,582 M | 6,7 % | sin mirar la nota |
| Rapid Wien, Fortaleza, Chapecoense, Ferroviária, Aris, Larissa y otros | «Abgang von Anlagevermögen», «Venda de Imobilizado», «Alienação de imobilizado»… | menos del 1 % | menos del 1 % | sin mirar |

Las ventas de jugadores ya están en `player_sales` con el neto: Chelsea carga «Profit on disposal of player registrations» (plusvalía neta) allí; no hay doble conteo porque el total cierra con el oficial en todos.

## Opciones

- A: una ganancia en inmovilizado va a `player_sales` solo si el propio documento la liga con jugadores (una nota, el informe de gestión o la misma cifra con otro rótulo de traspasos); si no lo dice, queda en `other_income`.
- B: toda etiqueta de ganancia en inmovilizado de un club de fútbol va a `player_sales` por defecto.
- C: todas quedan en `other_income`; se separa el traspaso solo cuando el documento imprime una línea propia de ventas de jugadores.

El monto de cada opción es lo que cambia en Sporting 2005 (la línea más pesada): A y B mueven 64,981 M a `player_sales`; C no mueve nada. En Chelsea 2022/23 B movería además £76,5 M de la venta de una sociedad, que no es un traspaso.

## Las opciones

- **A.** Solo si el documento la liga con jugadores (monto: 64.981)
- **B.** Toda ganancia en inmovilizado va a player_sales (monto: 64.981)
- **C.** Todas quedan en other_income salvo línea propia (monto: 0)

## Cuánto mueve (skill votacion-de-criterios, sección 4)

- A contra B: diferencia 0, 0 % del total 99.8: 1 % o menos, no se vota si no le cambia el signo al resultado (se elige la más fiel al documento, criterio 5, y se anota la medida)
- A contra C: diferencia 64,981, 65,11 % del total 99.8: más de 1 %, votan tres
- B contra C: diferencia 64,981, 65,11 % del total 99.8: más de 1 %, votan tres

Votan: tres votantes, para que siempre haya desempate.

## Qué abrir y dónde (lista fija: el votante no decide qué mirar, mira esto)

1. Las reglas que salen de las palabras del caso:
- «imobiliz»: ningún renglón de CONVENCIONES-DATOS.md (buscar en la skill club-data-mapping y su referencia/)
- «disposal»: 
  - Admin/CONVENCIONES-DATOS.md:456 — "Profit on disposal of investments" y parecidos (venta de una filial o de una participación, incluida la decon
  - Admin/CONVENCIONES-DATOS.md:600 — `assetSales` es para ventas realizadas ("Profit on disposal"). «Fair value movements» (+£6,66 M en 2021, la pa
- «alien»: ningún renglón de CONVENCIONES-DATOS.md (buscar en la skill club-data-mapping y su referencia/)
- «player_sales»: 
  - Admin/CONVENCIONES-DATOS.md:448 — `player_amortisation` y `player_sales`. El rótulo cargado no agrega palabras que el documento no imprime ("spe
  - Admin/CONVENCIONES-DATOS.md:452 — CATEGORÍA (prompt, futbol): en Bélgica, el intangible «Concessies, octrooien, licenties…» y su amortización va
  - Admin/CONVENCIONES-DATOS.md:474 — ## REGLA: una revaluación de jugadores o una fila de valor de jugadores sin explicar va a `other_income`, nunc
  - Admin/CONVENCIONES-DATOS.md:476 — `player_sales` es plata que entró por una venta. Una revaluación o un incremento de valor de jugadores (sin co
  - Admin/CONVENCIONES-DATOS.md:480 — de los ingresos; balance con "Jugadores destinados a la venta" y ventas pactadas después del cierre): estaba e
  - Admin/CONVENCIONES-DATOS.md:486 — y Gimnasia), va a `player_sales`. Si viene dentro de "Otros ingresos" sin desglose (Mallorca 2025, 0,233 M, 0,
- «mais-valia»: ningún renglón de CONVENCIONES-DATOS.md (buscar en la skill club-data-mapping y su referencia/)
2. Precedentes (escala de la skill, criterios 1 a 4):
- Mismo club (criterio 1): data/pt/sportingcp-pt.json y Admin/carga-clubes/sportingcp-pt.md
- Misma liga (criterio 2), pt-primeiraliga: 20 clubes (rioave-pt, nacional-pt, moreirense-pt, vitoriaguimaraes-pt, famalicao-pt, tondela-pt, porto-pt, braga-pt); sus JSON están en data/pt/
- Mismo país (criterio 3): 32 clubes en data/pt/ (los votantes buscan los que tuvieron el mismo hecho; ejemplos: academica-pt.json, academicoviseu-pt.json, alverca-pt.json, arouca-pt.json, avs-pt.json, belenenses-pt.json)
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
