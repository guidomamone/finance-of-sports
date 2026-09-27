# Francia — sin registro mercantil abierto, pero la DNCG publica bilanes individuales por club

A diferencia de Bélgica/Dinamarca, el registro mercantil francés NO es abierto de punta a punta.
Último chequeo: 2026-09-17.

- **`data.inpi.fr`** tiene la ficha de identidad de cada sociedad (SIREN, forma jurídica, capital,
  auditor) 100% pública y gratis, pero la lista de "Comptes annuels" depositados exige resolver un
  captcha (FriendlyCaptcha) y descargar cualquiera exige además crear cuenta — bloqueo distinto al
  de Austria/Marruecos (que es por PAGO): acá es captcha+cuenta, ninguna de las dos cosas resoluble
  por un agente. Confirmado con OGC Nice: 28 comptes annuels depositados, inaccesibles.
- **El hallazgo real es la DNCG** (Direction Nationale du Contrôle de Gestion, el organismo que
  audita a los clubes para la licencia), que publica cada temporada un PDF único en
  `sta.lfp.fr/reports-dncg` con el **bilan + cuenta de resultados INDIVIDUAL de cada club de Ligue 1
  Y Ligue 2** (perímetro societario incluido, ej. "SASP + asociación + desarrollo + medios" para
  Marsella) — gratis, sin login, sin bloqueo. Mejor que los agregados de DFL alemán/ÖFBL austríaco/
  Deloitte belga porque trae el balance completo por club, no solo KPIs. Se bajaron 21 temporadas
  (2002/03-2022/23 + 2024/25 vía mirror de prensa; falta 2023/24, no localizada todavía).
- **Un tercer caso confirmado de "holding cotizante desglosa el club"** (después de Manchester
  United/Companies House en UK y Club América/Ollamani en México, `paises/CONCACAF.md`): Olympique Lyonnais
  tiene su holding, Eagle Football Group SA (ex "OL Groupe"), cotizando en Euronext Paris — su
  Document d'Enregistrement Universel (IFRS completo) es descargable directo. Ojo: consolida el
  fútbol de Lyon con otros clubes del mismo grupo (Botafogo, RWD Molenbeek, Crystal Palace hasta
  2025) — confirmar si desglosa el segmento antes de cargar (duda abierta en `Admin/dudas-por-club.md`).
- **`recherche-entreprises.api.gouv.fr`**: API pública del gobierno francés, gratis y sin login,
  mejor que el buscador roto de INPI para resolver el SIREN de cualquier entidad — útil como primer
  paso en cualquier sourcing francés futuro (no solo fútbol).
- **AS Monaco es la única entidad de Ligue 1 de derecho NO francés** ("SA à loi monégasque" según
  la propia DNCG) — igual aparece en el agregado DNCG, pero su relación exacta con la SIREN francesa
  parecida (515109692) no está confirmada (duda abierta).
- Con esto, los 18 clubes de Ligue 1 2025/26 quedaron cubiertos, la mayoría solo vía el agregado
  DNCG (no un balance propio descargado aparte) — suficiente para cargar, pero sin la profundidad
  individual de Bélgica/Dinamarca.
