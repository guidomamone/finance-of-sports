# Alemania — Unternehmensregister + DFL Finanzkennzahlen

Alemania tiene DOS canales oficiales que juntos cubren los 18 clubes de la Bundesliga sin excepción.
Último chequeo: 2026-09-17.

- **Unternehmensregister** (`unternehmensregister.de`, gratis, sin login) es el equivalente alemán
  de Companies House: toda sociedad (GmbH, AG, KGaA) debe depositar su Jahresabschluss
  (balance+cuenta de resultados+anexo+dictamen de auditor) por ley. Funciona muy bien para los
  clubes que separaron su rama profesional en una sociedad — confirmado con series largas y
  completas para RB Leipzig (12 ejercicios, 2014-2025 sin huecos) y TSG Hoffenheim (16 ejercicios
  confirmados desde 2009). Borussia Dortmund, al cotizar en la Bolsa de Fráncfort, además publica su
  propio Geschäftsbericht completo en su sección de inversores — el caso más fácil y prolijo de la
  liga.
  - **Buscar por la razón social LEGAL de la sociedad, no por el nombre del club**: hace falta la
    denominación exacta (ej. "RasenBallsport Leipzig GmbH", "Borussia Dortmund GmbH & Co. KGaA"), no
    "RB Leipzig" a secas.
  - **Exención legal real que bloquea PERMANENTEMENTE a algunos clubes**: el §264 Abs. 3 / §264b del
    HGB (código de comercio alemán) exime de depositar Jahresabschluss propio a una sociedad cuyo
    único socio es una gran corporación que garantiza su deuda. Esto bloquea a **Bayer Leverkusen**
    (socio único: Bayer AG) y **VfL Wolfsburg** (socio único: Volkswagen AG) de forma estructural,
    no por falta de búsqueda — no vale la pena reintentar sin evidencia de un cambio societario.
  - **Hamburger SV tiene DOS entidades que hay que distinguir**: la `HSV Fußball AG & Co. KGaA` (el
    perímetro correcto para las finanzas del fútbol) y el `Hamburger Sport-Verein e.V.` (la
    asociación madre multideporte) — verificar siempre cuál de las dos es cada PDF antes de cargar
    cualquier cifra.
- **5 de los 18 clubes de Bundesliga siguen siendo e.V. puro** (nunca escindieron el fútbol
  profesional a una sociedad): 1. FC Union Berlin, SC Freiburg, 1. FSV Mainz 05, FC St. Pauli, 1. FC
  Heidenheim. Para estos, Unternehmensregister no tiene nada que buscar — confirmado explícitamente
  que su balance real existe pero es de acceso solo para socios (Union Berlin y St. Pauli).
- **DFL Finanzkennzahlen — el hallazgo más importante de la sesión**: la propia Deutsche Fußball
  Liga publica anualmente un PDF único (`Clubes/Alemania/_DFL-Finanzkennzahlen/`) con Bilanz + GuV
  auditado de **los 18 clubes de Bundesliga a la vez**, sin importar su forma jurídica — cubre
  incluso a los e.V. puros y a los exentos por el §264 HGB. Se bajaron 7 ejercicios (2018-2024). Es
  el equivalente alemán a lo que sería un informe agregado de liga entera, y vale la pena chequear
  si otras ligas top (España/LaLiga, Francia/DNCG) tienen un equivalente antes de dar por perdido un
  club sin disclosure individual.
- **Gotcha de tooling, no del portal**: la búsqueda y descarga en Unternehmensregister necesitan un
  click real (`computer`, no JS/fetch) porque el flujo pasa por un formulario con sesión — si el
  Browser pane deja de estar visible en pantalla a mitad de una sesión larga, las descargas se
  bloquean sin error claro. **La vuelta que funcionó**: abrir una pestaña nueva con `tabs_create` —
  el bloqueo desapareció de entrada, sin ningún otro truco. No hace falta pelear con la pestaña
  vieja, es más rápido abrir una nueva.
- **Un mismo ejercicio puede tener DOS depósitos con el mismo texto de enlace en el listado**: para
  Borussia Mönchengladbach 2024 había dos entradas idénticas en apariencia — una era solo el informe
  del consejo de vigilancia (3 páginas), la otra el balance completo (15 páginas). El tamaño en
  bytes de la respuesta es la forma rápida de distinguir cuál es cuál sin abrir los dos.
- **Con los 18 clubes de Bundesliga 2025/26 con ejercicio(s) reales confirmados** (RB Leipzig,
  Dortmund, Bayern, TSG Hoffenheim con serie completa 2009-2025, Borussia Mönchengladbach con serie
  confirmada desde 2006, Werder Bremen, Eintracht Frankfurt, VfB Stuttgart, 1. FC Köln, FC Augsburg,
  Hamburger SV — más Leverkusen/Wolfsburg vía el agregado de la DFL, y los 5 e.V. puros también vía
  DFL), Alemania queda como la primera liga top del proyecto sin ningún club sin cubrir. Lo que
  queda es solo profundidad: varios clubes tienen más ejercicios históricos confirmados en el
  registro de los que se bajaron (ej. Mönchengladbach hasta 2006) — mismo procedimiento, sección de
  arriba, para quien quiera completarlo.
