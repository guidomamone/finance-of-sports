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

## Después del merge del 2026-10-18

### Qué cambió

- LaLiga: cuentas consolidadas 2024-25 de la LNFP (cartera PDF de laliga.com/transparencia: cuentas firmadas + informe, digitales) en
  `Ligas/España/LaLiga/`, con sus `.md`. Auditor Netadia Europa, S.L.P. (por encargo del CSD), sin salvedades. Líneas de
  `LIGA_AUDITORIA` para `es-laliga` y `es-segunda`, 2025.
- Lega Serie A: nota de sourcing; el bilancio existe y lo audita una società di revisione (estatuto), pero no se publica: candidato a mail.
- Liga Portugal: nota de sourcing; el Relatório e Contas solo se manda a los asociados (estatuto, art. 42.º): candidato a mail.
- J.League: balance, resultados e informe del auditor 2025 desde el registro japonés de entidades de interés público (koeki-info.go.jp),
  en `Ligas/Japón/J.League/`. Auditor 太陽有限責任監査法人 (Grant Thornton Taiyo), opinión limpia. Línea `jp-j1` 2025.

### Qué queda

- Seguir con AFA, CBF, EFL y el resto.
- Lega Serie A y Liga Portugal: decidir si se les escribe (Guido).

### PDF copiados a la carpeta principal (rsync)

- `Ligas/España/LaLiga/laliga-cartera-cuentas-consolidadas-2024-25.pdf`, `laliga-cuentas-anuales-consolidadas-2024-25.pdf`,
  `laliga-informe-auditoria-consolidado-2024-25.pdf`
- `Ligas/Japón/J.League/jleague-kashitaishohyo-2025.pdf`, `jleague-sonekikeisansho-2025.pdf`, `jleague-kansahokoku-2025.pdf`
