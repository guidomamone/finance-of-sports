# Suiza — Zefix es dead-end de país, pero la mitad de la liga publica voluntariamente

**Zefix** (el índice central de sociedades suizas) es un dead-end estructural CONFIRMADO, no por
falta de búsqueda: solo da identidad básica gratis, y el Código de Obligaciones suizo no exige
depósito público de cuentas anuales salvo para sociedades cotizantes o de "interés público" (ningún
club de la Super League cotiza). La API pública de Zefix devuelve 401 sin credenciales pedidas por
email — no vale la pena insistir sin ese paso previo. Último chequeo: 2026-09-17.

- **6 de 12 clubes publican voluntariamente en su propio sitio** (Basel, St. Gallen, Luzern, Thun,
  Young Boys) — mismo patrón de "publicación voluntaria" ya visto en Ecuador (Deportivo Cuenca,
  `paises/Ecuador.md`) pero mucho más consistente y con series largas: FC Thun dio 13 documentos
  (2011/12-2024, un solo hueco). FC Basel publicó una serie completa 2005-2021 pero dejó de hacerlo
  después (dead-end propio reciente, sin explicación encontrada).
- **Plataforma común reutilizable: "aico.swiss"**. Varios sitios de club (Basel, St. Gallen, y
  probablemente otros) corren sobre la misma plataforma de agencia web, que aloja los PDF en
  `storage.aico.swiss/<ID_cliente>/files/<nombre>.pdf`. El listado de años en la página
  "Geschäftsberichte" se arma con JavaScript — no aparece con un `curl` plano, hace falta renderizar
  con el Browser pane y extraer los `href` con
  `document.querySelectorAll('a[href*=".pdf"]')`. Si aparece un club suizo nuevo con esta misma
  plantilla de sitio, este selector es el atajo directo a la lista completa sin navegar página por
  página.
- **La SFL (Swiss Football League) publica un agregado ("SFL Finanzzahlen") de los clubes con
  licencia UEFA cada año** (5 ejercicios, 2021-2025) — mismo patrón que DFL/ÖFBL/Deloitte
  (secciones 12-14). Cubre parcialmente a los 6 clubes sin disclosure propio (Zürich, Sion,
  Servette, Lausanne-Sport, Lugano, Grasshopper), aunque Winterthur solo aparece 1 de los 5 años
  (no pidió licencia europea el resto de las temporadas).
- Con esto, ningún club de la Super League 2025/26 quedó totalmente sin datos, aunque la mitad
  depende solo del agregado de liga (menos profundo que un balance propio).
