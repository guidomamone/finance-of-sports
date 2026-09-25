# Gent (KAA Gent)

- **Deporte**: Fútbol
- **Liga / competencia**: Pro League (Bélgica, 1ª división)
- **Entidad legal**: KONINKLIJKE ATHLETIEK ASSOCIATIE GENT - VOETBALAFDELING (BE 0407.885.394) —
  sede Ottergemsesteenweg-Zuid 808, 9000 Gent. **Cambió de forma jurídica en la propia serie**: era
  una vereniging/asociación (2005-2015) y pasó a ser NV/kapitaalvennootschap (2018 en adelante) —
  mismo número de empresa en todo el período, confirmado por los depósitos consecutivos.
- **Canal**: `consult.cbso.nbb.be` (Centrale des bilans / BNB).

## Qué se bajó (sesión 2026-09-17)

**26 depósitos, 21 ejercicios distintos 2005-2025 (con 1 hueco)**, más 6 ejercicios de **cuentas
consolidadas** (2017-2022), `Clubes/Bélgica/Gent/`:

- `jaarrekening-2025-06-30-individual.pdf` a `jaarrekening-2018-06-30-individual.pdf` — serie
  reciente, esquema NV.
- `jaarrekening-2017-05-31-individual.pdf` + `jaarrekening-2017-05-31-consolidado.pdf` — **el cierre
  de ejercicio fue el 31 de mayo este año en particular**, no el 30 de junio habitual (transición de
  ejercicio) — ojo si se carga este año al sitio, puede ser un ejercicio de 11 meses en vez de 12.
- `jaarrekening-2022-06-30-consolidado.pdf` a `jaarrekening-2018-06-30-consolidado.pdf` — cuentas
  consolidadas de 5 ejercicios; **no se encontró consolidado para 2023-2025** (puede que el club
  dejara de consolidar, o que la API no lo tenga listado con ese `modelId` — no se investigó más).
- `jaarrekening-2015-06-30-individual.pdf` a `jaarrekening-2005-06-30-individual.pdf` — serie vieja
  (vereniging), esquema completo, sin huecos.
- **Hueco confirmado**: no hay depósito para el ejercicio 2016 en el listado de la API (no es un
  fallo de descarga).
- El ejercicio 2023 (individual) y el 2021 (consolidado) dieron `429 Too Many Requests` en el primer
  intento y se resolvieron con reintento.

## Verificación hecha en esta sesión

Nombre confirmado en la API (`enterpriseName: "KONINKLIJKE ATHLETIEK ASSOCIATIE GENT -
Voetbalafdeling"`) en los 26 depósitos, mismo BCE en toda la serie pese al cambio de forma jurídica.

- Último chequeo: 2026-09-17.

## Cargado al sitio (2026-09-25, onboarding de Bélgica como país nuevo)

Se cargó el ejercicio 2025 (1/7/2024-30/6/2025), versión individual — no hay
consolidado depositado para 2023/2024/2025 (sí para 2017-2022, ver arriba), así que
no aplica la preferencia por consolidado de este onboarding para este club/año.
`clubId`: `gent-be`. A diferencia de Anderlecht/Genk, el Jaarverslag de este filing
sí trae comentario cuantitativo por línea del P&L (pág. 42), lo que permitió una
categorización algo más fundamentada — ver el comentario de cabecera de
`data/gent-be-data.js` para el detalle completo y el tie-out verificado. Color de
marca: `#004794` (azul, encycolorpedia.com/schemecolor.com, confirmado contra la
identidad azul/blanco de Wikipedia — se usó el acento no blanco), verificado
2026-09-25.

Pendiente para una sesión futura: el resto de la serie 2005-2024 (incluidos los años
con consolidado, 2017-2022) sigue transcripta en `Clubes/Bélgica/Gent/` y sin cargar.
