# Cierre de la rama `ligas` (to-do 295: balances de las entidades que organizan las ligas)

## Qué cambió (para CHANGELOG)

- Carpeta nueva `Ligas/<País>/<Entidad>/` para los balances propios de las entidades organizadoras (fuera de `Clubes/`, que recorren las
  tools del pipeline); notas de sourcing en `Admin/sourcing/Ligas/<entidad>.md`. Decisión de Guido, 2026-10-18.
- Premier League: cuentas del grupo 2024-25 (Companies House 02719699) bajadas y transcriptas; auditor Deloitte LLP, sin salvedades.
  Su línea en `Admin/registros/auditoria.jsonl` espera el cambio de `tools/auditoria.mjs` (ver abajo).

## Qué queda (para TODO)

- `tools/auditoria.mjs` solo reconoce citas de `.md` trackeados bajo `Clubes/`: hay que sumar `Ligas/*.md` al `trackedSet` (coordinado
  con fos-finanzas, dueña de la tool).
- Seguir con las entidades en el orden del plan: DFL, LaLiga, Lega Serie A, J.League, Liga Portugal, AFA, CBF, EFL y el resto.
- AUF (Uruguay): en espera, sin liga uruguaya en `data/leagues.js` (Guido: no resolverlo todavía).

## Qué deja de ser cierto en ESTADO

- "No hay ningún balance de entidad organizadora en el proyecto": ya está el de la Premier League.

## PDF copiados a la carpeta principal (rsync)

- `Ligas/Inglaterra/Premier League/premier-league-group-accounts-2024-25.pdf`

## Línea lista para `Admin/registros/auditoria.jsonl` (se agrega cuando la tool lea `Ligas/`)

```
{"ligaId":"gb-premierleague","anio":2025,"entidad":{"nombre":"Premier League","legal":"The Football Association Premier League Limited"},"auditor":{"nombre":"Deloitte LLP","tipo":"firma"},"dictamen":"sin_salvedades","continuidad":false,"citas":{"auditor":{"md":"Ligas/Inglaterra/Premier League/premier-league-group-accounts-2024-25.md","linea":750,"texto":"For and on behalf of Deloitte LLP"},"dictamen":{"md":"Ligas/Inglaterra/Premier League/premier-league-group-accounts-2024-25.md","linea":527,"texto":"In our opinion the financial statements of The Football Association Premier League Limited"}},"nota":"Cuentas del grupo al 31-07-2025 (temporada 2024-25), Companies House 02719699. Opinión sobre el grupo y la sociedad; going concern sin incertidumbre material."}
```
