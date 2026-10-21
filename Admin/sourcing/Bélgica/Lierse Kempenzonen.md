# Lierse Kempenzonen

**Ángulos**: regulador/país (Centrale des bilans, BNB): HIT — API pública sin login (ver `paises/Belgica.md`) · barrido: 1 (Sonnet) — 2026-10-08

- **Deporte**: Fútbol
- **Liga / competencia**: Challenger Pro League (Bélgica)
- **Entidad legal**: Lierse Kempenzonen ASBL, BCE 0412.539.416 (fundada en 1972, club que resultó de una fusión).
- **Canal**: Centrale des bilans: `consult.cbso.nbb.be/api/rs-consult/published-deposits?enterpriseNumber=<BCE>` y `.../deposits/pdf/<id>` (OJO: el PDF exige `Accept: */*`, con `application/json` devuelve 406).

## Qué se bajó (sesión 2026-10-08, año de sourcing 2023)

**6 documentos** en `Clubes/Bélgica/Lierse Kempenzonen/`; años que cubren los nombres de archivo: 2018-2022. Sin transcribir ni cargar al sitio.

- Número de empresa tomado de companyweb.be (búsqueda web); confirmado contra el nombre del depositante en la BNB. Los ejercicios en modelo abreviado (`Verkort`) pueden no traer cuenta de resultados completa: revisar al transcribir.
- 6 depósitos; ver también Lierse SK.
- Último chequeo: 2026-10-08.

- Cargado en el sitio por tools/cargar.mjs (2026-10-20): ejercicio 2018 desde `Clubes/Bélgica/Lierse Kempenzonen/jaarrekening-2018-06-30-individual.pdf` (sourceId `liersekempenzonen-be-jaarrekening-2018-06-30-individual`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-20): ejercicio 2019 desde `Clubes/Bélgica/Lierse Kempenzonen/jaarrekening-2019-06-30-individual.pdf` (sourceId `liersekempenzonen-be-jaarrekening-2019-06-30-individual`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-20): ejercicio 2020 desde `Clubes/Bélgica/Lierse Kempenzonen/jaarrekening-2020-06-30-individual.pdf` (sourceId `liersekempenzonen-be-jaarrekening-2020-06-30-individual`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-20): ejercicio 2021 desde `Clubes/Bélgica/Lierse Kempenzonen/jaarrekening-2021-06-30-individual.pdf` (sourceId `liersekempenzonen-be-jaarrekening-2021-06-30-individual`).

## Chequeo 2026-10-21: la API de la BNB no tiene nada después del ejercicio 2022

- `published-deposits?enterpriseNumber=0412539416` (con `page=0&size=50&sort=periodEndDate,desc&sort=depositDate,desc`; sin los `sort` devuelve 500) lista **6 depósitos y ninguno posterior al ejercicio cerrado el 30/06/2022** (depositado el 2023-01-30). No hay 2023, 2024 ni 2025 publicados.
- La entidad es la vzw `Lierse Kempenzonen` (BCE 0412.539.416, fundada en 1972, cierre 30 de junio, activa en la KBO; no cambió de número). **No confundir con `Lierse SK`**, la SA de 2018 (BCE 0699.764.829), que es otra entidad y tiene sus depósitos hasta 2025 en `Clubes/Bélgica/Lierse SK/`. La prensa dice que Lierse Kempenzonen pasó a llamarse «K. Lierse S.K.» en 2024 (no confirmado en la KBO); si el club migró su actividad a la SA, los ejercicios 2023-25 de la vzw no existen como documento de fútbol.
- Puede ser que la vzw no haya depositado (o deposite tarde). Reconsultar en unos meses; si sigue vacío, pedirle al club o a la Comisión de Licencias.
- Último chequeo: 2026-10-21.
