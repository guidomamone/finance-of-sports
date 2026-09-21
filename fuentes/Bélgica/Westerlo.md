# Westerlo (KVC Westerlo)

- **Deporte**: Fútbol
- **Liga / competencia**: Pro League (Bélgica, 1ª división)
- **Entidad legal**: KVC WESTERLO BV (BE 0436.473.670) — sede De Merodedreef 189, 2260 Westerlo.
  Existe una VZW separada ("KVC Westerlo", BE 0407.891.235, listada como "VC Westerlo" en algunos
  depósitos) con turnover en blanco en su ejercicio más reciente — no se usó, es una entidad menor
  (probablemente cantera/amateur), confirmado comparando ambas antes de elegir.
- **Canal**: `consult.cbso.nbb.be` (Centrale des bilans / BNB).

## Qué se bajó (sesión 2026-09-17)

**27 ejercicios consecutivos, serie completa 1998-2025** — el ejercicio más antiguo descargado de
TODO el barrido de Bélgica (un año antes que el límite de 1999 confirmado en otros 5 clubes),
`Clubes/Bélgica/Westerlo/`:

- `jaarrekening-2025-06-30-individual.pdf` a `jaarrekening-2015-06-30-individual.pdf` — cierre de
  ejercicio 30 de junio.
- `jaarrekening-2013-12-31-individual.pdf` a `jaarrekening-1998-12-31-individual.pdf` — cierre de
  ejercicio 31 de diciembre (serie vieja). **Hueco confirmado en 2014**: no hay depósito en el
  listado de la API para el ejercicio que cerraría en torno a esa fecha — es el año de la transición
  de cierre de diciembre a junio, probablemente un ejercicio irregular de 18 meses que no generó
  depósito propio o que quedó fusionado con el de 2015.
- Se pidieron también los ejercicios 1989-1997 (existen en el listado de la API) — **todos
  devolvieron 404**, mismo límite de disponibilidad de PDF desde 1998/1999 que el resto del país.

## Verificación hecha en esta sesión

Nombre confirmado en la API (`enterpriseName: "KVC WESTERLO"`) en los 27 depósitos, y comparación de
turnover contra la VZW homónima para descartarla.

- Último chequeo: 2026-09-17.
