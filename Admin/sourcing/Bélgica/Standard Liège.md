# Standard Liège (Standard de Liège)

- **Deporte**: Fútbol
- **Liga / competencia**: Pro League (Bélgica, 1ª división)
- **Entidad legal**: STANDARD DE LIEGE SA (BE 0433.255.448) — sede Rue de la Centrale 2, 4000
  Sclessin (Liège). **Ojo**: una búsqueda inicial encontró también el número BE 0560.736.610
  asociado al club en una fuente de baja calidad — se confirmó vía la propia API de la Centrale des
  bilans que ese número corresponde a "ZENOBE ENERGY", una empresa completamente distinta sin
  relación con el club. Descartado.
- **Canal**: `consult.cbso.nbb.be` (Centrale des bilans / BNB).

## Qué se bajó (sesión 2026-09-17)

**31 depósitos, 27 ejercicios distintos, serie completa 1999-2025** — la serie más larga de Bélgica
junto con Union Saint-Gilloise, `Clubes/Bélgica/Standard Liège/`:

- `jaarrekening-2025-06-30-individual.pdf` a `jaarrekening-1999-06-30-individual.pdf`, sin huecos.
- Depósitos de corrección adicionales para 2020, 2017, 2016 y 2015 (`-correction.pdf`).
- Se pidió también 1998 y años anteriores (hasta 1989, según el listado de la API) — **todos
  devolvieron 404**: confirma que la Centrale des bilans solo sirve PDF desde 1999 en adelante,
  mismo límite que Club Brugge/Westerlo/Union SG.
- Varios ejercicios (2023, 2022, 2018, 2016, y la corrección de 2020 y 2017) dieron `429 Too Many
  Requests` en la primera pasada — todos se resolvieron reintentando con un par de segundos de
  espera.

## Verificación hecha en esta sesión

Nombre confirmado en la API (`enterpriseName: "STANDARD DE LIEGE"`) en los 31 depósitos.

- Último chequeo: 2026-09-17.
