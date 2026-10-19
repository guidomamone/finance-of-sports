# Sociedad de cada documento del Reino Unido transcripto (to-do 261 b y c; Finanzas 5, 2026-10-19)

La sociedad sale de la portada de cada `.md` (los 108 de `Admin/lotes/reino-unido-validar.txt`). Todos los `*-full-accounts-*`,
`*-group-accounts-*` y `*-annual-return-*` son de la sociedad del nombre de su carpeta (club, holding del club o club de cricket);
los `wf-*` y los de la lista de abajo son los que hay que mirar. Regla: `Admin/CONVENCIONES-DATOS.md` (perímetro y entidad); no cargar
las dos sociedades para el mismo ejercicio.

## Clubes con dos sociedades en el mismo ejercicio (un documento del club y un `wf-*` de la sociedad de arriba o de al lado)

| Club | Ejercicio | Documento del club | `wf-*` (otra sociedad) |
|---|---|---|---|
| Aston Villa | 2022-23 (31-05-2023) | `astonvilla-full-accounts-2022-23`: Aston Villa Football Club Ltd | `wf-2022-2023-0e1f2936`: NSWE Sports Ltd (consolidado) |
| Aston Villa | 2023-24 | `astonvilla-full-accounts-2023-24`: Aston Villa Football Club Ltd | `wf-2023-2024-0334397b`: NSWE Sports Ltd (13 meses a 30-06-2024) |
| Brighton | 2022-23 (30-06-2023) | `brighton-full-accounts-2022-23`: The Brighton and Hove Albion Football Club Ltd | `wf-2022-2023-aece1c47`: Brighton & Hove Albion Holdings Ltd |
| Fulham | 2022-23 (30-06-2023) | `fulham-full-accounts-2022-23`: Fulham Football Club Ltd | `wf-2022-2023-a65333c9`: Fulham Football Leisure Ltd |
| Sunderland | 2022-23 (31-07-2023) | `sunderland-full-accounts-2022-23`: el club (nº 00049116, "… CLUB, LIMITED (THE)") | `wf-2022-2023-55a1a6cd`: Sunderland Ltd |

DECIDIDO (Guido, 2026-10-19, coherencia de perímetro con la serie publicada): en cada par entra el documento de la sociedad del club y el `wf-*` de la
otra sociedad va a `documentos-descartados.txt`. Aston Villa es el caso discutible (la sociedad del club no tiene fichajes capitalizados, NSWE Sports sí) y se
dejó igual por consistencia. Wolves y West Ham 2023-24 son pares como los demás (el documento del club existe).

## Nombre engañoso: el año del nombre no es el del ejercicio

- `West Ham United/wf-2022-2023-659d1396`: WH Holding Ltd (consolidado), ejercicio al 31-05-**2024**. El club 2023-24 también está (`westham-full-accounts-2023-24`).
- `Wolverhampton Wanderers/wf-2022-2023-d10fbea7`: W.W. (1990) Ltd (consolidado), ejercicio al 31-05-**2024**. El del club (1986) 2023-24 existe (`wolves-full-accounts-2023-24`) y ya está publicado: par resuelto como los demás.

## Duplicados exactos (a `documentos-descartados.txt` en esta sesión)

- Celtic `wf-2022-2023-3e4a518a` (= `celtic-group-accounts-2022-23`), Celtic `wf-2023-2024-2cb3da35` (= `celtic-group-accounts-2023-24`) y Man City
  `wf-2022-2023-2d906303` (= `mancity-full-accounts-2022-23`). Queda el más completo.

## Quedan por mirar los `wf-*` sin `.md`

Los demás `wf-*` de las carpetas del Reino Unido (al final de la cola) no están transcriptos: antes de transcribirlos, mirar la portada (paso 0 de `reglas.md`).
