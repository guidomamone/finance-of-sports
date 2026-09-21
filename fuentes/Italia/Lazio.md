# Lazio (S.S. Lazio)

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: S.S. Lazio S.p.A., propiedad de Claudio Lotito. **Cotiza en Borsa Italiana /
  Euronext Milan desde 1998** (ISIN `IT0003621783`) — segunda entidad cotizante del país después de
  Juventus, y con una historia bursátil incluso más larga (Juventus recién en 2001).
- **Canal**: sección propia `sslazio.it/en/investor-relators/documenti`, gratis, sin login. También
  existe en Borsa Italiana (`borsaitaliana.it/.../elenco-completo-documenti-societari.html?isin=IT0003621783`),
  pero esa página no sirvió ningún documento en esta sesión (ver gotcha abajo).

## Qué se bajó (sesión 2026-09-17)

**1 ejercicio (FY2024/25) completo**, en `Clubes/Italia/Lazio/`: relazione finanziaria annuale al 30
giugno 2025 (individual + consolidado + los informes de auditoría/collegio sindacale del mismo
ejercicio).

- **La página oficial de "Documenti" NO es un archivo histórico navegable**: el filtro "View all
  Years" solo ofrece 2017-2026, pero el listado real (extraído del JSON `__NEXT_DATA__` embebido en
  la página) está capado a los ~30 documentos MÁS RECIENTES de cualquier tipo (actas de asamblea,
  informes de gobernanza, etc., no solo bilanci) — cambiar el filtro de año no dispara ningún fetch
  nuevo, solo filtra client-side sobre esa misma lista corta. Con esa lista solo llegó el ejercicio
  2024/25 completo (más las relazioni semestrales de dic-2024 y dic-2025, que no son el bilancio
  anual).
- **Borsa Italiana no sirvió nada en esta sesión**: la página de "Documenti Societari" cargó pero sin
  ningún link a PDF visible en el DOM (posible carga diferida vía iframe/widget que no llegó a
  completarse) — no confirmado si es un problema de portal o de tooling de esta sesión.
- Dato de color: la página mostró el ticker como "Status: Inaccessible" con "Last Trade: 26/09/2017"
  — no está claro si es un dato realmente desactualizado en caché de Borsa Italiana o una
  particularidad de cómo se sirve esa página para acciones de bajísima liquidez; no se investigó más
  por no ser relevante al objetivo de sourcing.

## Verificación hecha en esta sesión

PDF del bilancio anual 2024/25 confirmado real.

## Dudas / pendientes

**Falta prácticamente todo el histórico 1998-2024** (26 años de disclosure bursátil real, comparable
a la serie de Juventus) — el canal existe (Borsa Italiana / 1info.it, el mismo sistema que usa Roma
para su archivo `investor-relations`) pero no se consiguió navegarlo a fondo en esta sesión por
tiempo. Es la mejor pista individual pendiente para una sesión de profundización de Italia.

- Último chequeo: 2026-09-17.
