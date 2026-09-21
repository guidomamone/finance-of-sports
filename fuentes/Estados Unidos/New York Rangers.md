# New York Rangers

- **Deporte**: Hockey sobre hielo
- **Liga / competencia**: NHL (Estados Unidos y Canadá)

- **Entidad legal**: **Madison Square Garden Sports Corp.** (NYSE `MSGS`) — CIK de la SEC
  **0001636519**. Presenta formulario **10-K** anual auditado, obligatorio por la SEC.
- **Canal**: SEC EDGAR. Procedimiento en `fuentes/Estados Unidos/_notas-generales.md`.

## El documento cubre DOS clubes de DOS deportes distintos

Este es el punto que hay que tener claro antes de cargar nada: MSG Sports Corp. es dueña de los
**New York Knicks** (NBA) **y** de los **New York Rangers** (NHL), y presenta **un solo** estado
financiero consolidado para ambos. Es el mismo problema de perímetro que ya apareció con Club América
dentro de Ollamani en México (ver `fuentes/México/Club América.md`): el documento existe y es
oficial, pero no es "el balance de un club".

Por eso el PDF está guardado una sola vez, en
`Clubes/Estados Unidos/Madison Square Garden Sports/`, y hay dos fichas de fuente (esta y la del otro
club) apuntando al mismo archivo.

**Qué falta chequear antes de cargar**: si el 10-K desglosa ingresos por equipo en la nota de
segmentos. MSG Sports reporta históricamente como un solo segmento operativo, lo que haría imposible
separar Knicks de Rangers — en ese caso la decisión es la misma que se tomó con Club América (cargar
el bundle aclarando la mezcla) o no cargarlo. No se abrió la nota de segmentos en esta sesión: está
anotado en `dudas-por-club.md`.

## Qué se bajó (sesión 2026-09-13)

- `Clubes/Estados Unidos/Madison Square Garden Sports/msg-sports-10k-fy2026.htm` — 10-K del ejercicio
  cerrado el **30/6/2026**, presentado el 13/8/2026. 2,0 MB de HTML, con capa de texto (sin OCR).
- `Clubes/Estados Unidos/Madison Square Garden Sports/msg-sports-10k-fy2025.htm` — ejercicio cerrado
  el 30/6/2025.

El ejercicio cierra el 30 de junio, o sea que abarca una temporada completa de NBA y de NHL
(octubre-junio). Encaja bien con el esquema del sitio.

## Cifra de control ya verificada (leída del propio documento)

`Revenues $ 1.153.822` (miles de USD) en FY2026, contra `$ 1.039.220` en FY2025 — o sea
**USD 1.154 M de ingresos combinados** de los dos clubes.

**Normativa contable**: US GAAP (el documento lo dice explícitamente). Distinto de los clubes
europeos y sudamericanos ya cargados, que van por IFRS o normativa local — ojo al comparar.

## Serie disponible sin bajar

**4 ejercicios de 10-K** verificados en EDGAR (FY2023 a FY2026), y la serie sigue hacia atrás hasta
la escisión de MSG en 2015.

- Último chequeo: 2026-09-13.
