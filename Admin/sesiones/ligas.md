# Cierre de la rama `ligas` (to-do 295: balances de las entidades que organizan las ligas)

## Qué cambió (para CHANGELOG)

- Carpeta nueva `Ligas/<País>/<Entidad>/` para los balances propios de las entidades organizadoras (fuera de `Clubes/`, que recorren las
  tools del pipeline); notas de sourcing en `Admin/sourcing/Ligas/<entidad>.md`. Decisión de Guido, 2026-10-18.
- `tools/auditoria.mjs` acepta citas de `.md` trackeados en `Ligas/` (solo en `trackedSet`; coordinado con fos-finanzas).
- Premier League: cuentas del grupo 2024-25 (Companies House 02719699) bajadas y transcriptas; auditor Deloitte LLP, sin salvedades.
  Primera línea de `window.LIGA_AUDITORIA` (`gb-premierleague`, 2025).
- DFL: nota de sourcing; el Konzernabschluss 2024-25 está en Unternehmensregister detrás de captcha y login.

## Qué queda (para TODO)

- DFL: el Konzernabschluss 2024-25 pide login en Unternehmensregister (gestión de Guido); probar antes Bundesanzeiger y el sitio de la DFL.
- Seguir con las entidades en el orden del plan: LaLiga, Lega Serie A, J.League, Liga Portugal, AFA, CBF, EFL y el resto.
- AUF (Uruguay): en espera, sin liga uruguaya en `data/leagues.js` (Guido: no resolverlo todavía).

## Qué deja de ser cierto en ESTADO

- "No hay ningún balance de entidad organizadora en el proyecto": ya está el de la Premier League.

## PDF copiados a la carpeta principal (rsync)

- `Ligas/Inglaterra/Premier League/premier-league-group-accounts-2024-25.pdf`
