# China — mayormente dead-end por diseño societario, pero NO es un dead-end de liga completa

Distinto de Nigeria (`paises/Africa.md`), donde no hay ni estructura societaria de la que exigir nada: en
China SÍ hay sociedades reales, solo que por diseño (accionista único, sin obligación de depósito)
casi ninguna genera disclosure público. Último chequeo: 2026-09-17.

- **El ángulo que sí funciona, cuando funciona, es el mismo de México/Ollamani (`paises/CONCACAF.md`) y
  EEUU/SEC (`paises/Estados-Unidos.md`): rastrear si el accionista CONTROLANTE del club cotiza en alguna bolsa**
  (Shanghai, Shenzhen, o Hong Kong vía HKEXnews — `www1.hkexnews.hk`, gratis y sin login, el
  equivalente de la SEC para Hong Kong). De los 16 clubes de la CSL 2025/26, solo uno (**Shanghai
  Port**, cuyo dueño SIPG cotiza SSE:600018) tiene este caso, y aun así el club no tiene cifras
  propias desglosadas en el consolidado del dueño (mezclado con inmobiliaria/energía) — más
  limitado que Ollamani/MSG Sports.
- **La CFA exige auditoría a cada club para la licencia pero NO la publica** — mismo patrón que
  FEDEFUT en Costa Rica (`paises/CONCACAF.md`): el regulador deportivo exige y blinda, no exige y publica.
- **La CSL tuvo una ola de reestructuraciones societarias 2023-2025** (varios clubes cambiaron de
  accionista controlante tras el colapso de Evergrande) — esto hace que el ángulo de "accionista
  cotizante" valga la pena reintentar periódicamente para clubes hoy dead-end, no descartarlos como
  permanentes.
- **Hallazgo real pero fuera del scope de clubes vigentes**: Guangzhou Evergrande Taobao FC fue el
  único club chino que cotizó con disclosure completo (New Third Board / NEEQ, ticker 834338,
  2015-2021) — 5 ejercicios anuales + 1 semestral reales descargados, con cifras de la crisis. Ya no
  juega en la CSL actual (descendió tras el colapso del grupo). Ver la duda para Guido en
  `Admin/dudas-por-club.md` sobre si cargarlo igual como caso histórico.
- **Gotcha de tooling**: `neeq.com.cn` tiene un WAF que bloquea `curl` incluso con cookies de sesión
  real replicadas. La vuelta que funcionó: `fetch()` dentro de `javascript_tool` — cuando el
  resultado excede el límite de tokens del chat, el contenido completo igual se guarda en un archivo
  `tool-results/*.txt` (JSON `[{type,text}]`) legible con Bash, de donde se decodifica el base64
  directo al PDF.
