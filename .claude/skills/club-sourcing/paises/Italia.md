# Italia — no es un registro mercantil, es la obligación de licencia UEFA

El Registro delle Imprese italiano es **pago** para terceros (tarjeta de crédito, tarifas del
decreto MISE 2007) — mismo patrón que Austria/Croacia, no el de Bélgica/Dinamarca/Grecia. Pero acá
el registro mercantil no hace falta: el motor real es la obligación de disclosure del **Manuale
delle Licenze UEFA**, que lleva a la mayoría de los clubes a publicar voluntariamente su bilancio en
la sección "trasparenza"/"licenze-uefa" de su propio sitio, cotización aparte. Último chequeo:
2026-10-07.

- **Hallazgo transversal, aplicable a cualquier país nuevo con clubes que jueguen competiciones
  UEFA**: antes de asumir que hace falta un registro mercantil o una bolsa, chequear si el club
  publica directo por obligación de licencia — es más simple y más común de lo esperado.
- **Juventus, cotizante desde 2001, dio la serie más profunda de todo el proyecto**: 23 ejercicios
  sin huecos (2002/03-2024/25), superando a Club Brugge/Standard Liège (Bélgica, `paises/Belgica.md`) y
  Companies House (Reino Unido, `paises/Reino-Unido.md`). Lazio también cotiza desde 1998 pero solo se bajó 1
  ejercicio — el histórico completo queda como pista pendiente para profundizar.
- **Report Calcio (FIGC/PwC/AREL)**: existe pero es un agregado SECTORIAL (como el Deloitte belga o
  la DFL alemana) — sirve de cifra de contexto, no da bilanci por club individual.
- **Resultado: 16 de 20 clubes de Serie A 2025/26 con al menos un ejercicio real, 100% PDF con capa
  de texto nativa** (cero escaneos en todo el país, el mejor resultado de formato del proyecto). Los
  4 sin nada (Torino, Pisa, Lecce, Cagliari) no tienen un bloqueo estructural confirmado — Cagliari
  incluso tiene la sección pero con el link a Google Drive roto (accionable: pedirle al club que lo
  arregle).
- **Gotcha de tooling nuevo**: un snapshot de Wayback Machine puede devolver HTTP 200 pero venir
  TRUNCADO (header `warning: 299 wayback content truncated by "length"`, típico de capturas vía
  Common Crawl) — verificar con `pdfinfo`/chequear el `%%EOF` del archivo, no confiar en el 200 solo.
- **Varios clubes tienen links propios rotos por migración de CDN sin actualizar** (Inter, Napoli,
  Udinese) — vale la pena probar Wayback Machine antes de descartar, no asumir dead-end por un 404
  directo.

## Quién publica y por qué

Publica quien tiene una obligación o un incentivo concreto, y se mira en este orden:

1. **Licencia UEFA** (Serie A): el club sube el fascicolo a su propio sitio. Es el canal principal.
2. **Cotización** (Juventus, Lazio, Roma): serie larga en investor relations y en Borsa Italiana.
3. **Dueño que reporta a la SEC** (Brera Holdings → Juve Stabia, Brera FC y UYBA Volley; RoyaLand →
   Savoia): los estados del club salen como anexo del 6-K/20-F del dueño. Son IFRS de primera adopción,
   no el bilancio OIC; hay que aclararlo al cargar. Antes de descartar un club con dueño extranjero,
   buscar al dueño en EDGAR.
4. **Federación**: la federación y los entes que controla publican sus cuentas en "amministrazione
   trasparente" o en su página de bilanci (FIR + Zebre, FITP + entes, Sport e Salute). Los clubes de esos
   deportes, no.
5. Todo lo demás (Serie B, C y D, clubes de rugby y de tenis) solo deposita en el Registro Imprese, que
   es de pago. Serie C y D no se barren sin una señal de esta lista.

- **Forma jurídica.** S.r.l., S.S.D. a r.l. y ASD no tienen obligación de publicar. Un circolo ASD solo
  informa subsidios públicos de 10.000 € o más (L. 124/2017, cita sin verificar contra la norma).
- **Clubes extintos o refundados valen** si sus balances siguen publicados: se recuperan de Wayback del
  sitio viejo y de los adjuntos del CMS anterior (Chievo, Salernitana).

## Gotchas

- **CDX de dominio completo en paralelo**: devuelve cuerpo vacío con HTTP 200, lo que da un falso "0 PDF".
  Lanzar las consultas en serie, con 8 a 10 segundos de pausa.
- **CDN propio del club** (`*.b-cdn.net`, `hqcdn.it`): puede seguir sirviendo los PDFs aunque la página
  oficial se haya borrado. Buscar la URL del archivo en Wayback de la página vieja.
- **Páginas con lista por JS** (FITP: botón "Carica altri"): Firecrawl map no ve los PDFs. Se obtienen
  ejecutando JS en el Browser pane.
- **Rutas de CDN que mudaron**: Inter funciona cambiando `static.inter.it` por `www.inter.it`; Sport e
  Salute exige el nombre largo `..._Sport_e_salute_SpA.pdf` (las URLs cortas devuelven HTML con 200).
- **Extractos del Registro Imprese** que la prensa local sube a su CDN
  (`citynews-<medio>.stgy.ovh/~media/`): sirven para clubes extintos, se guardan como `secondary_press`.
- **PDFs escaneados sin capa de texto** son la norma en los años viejos (Napoli 2018-20, Inter 2017/18,
  Bologna 2023-25, rugby, FITP 2013-14): pasan por OCR en la etapa 2.
- **Series de cierre distinto**: Parma tiene un período corto de 4 meses (31/12/2020), Bologna pasó de
  consolidado a individual desde 2023/24, y Roma 2011 y 2013 son "progetto di bilancio". Aclararlo al
  cargar.

## Mails posibles (no enviados; decisión de Guido)

Ninguno se envía por ahora. Cada envío lo aprueba Guido y se hace con `club-outreach`.

- **FIR (Federazione Italiana Rugby):** bilancio de Zebre 2025 (sin publicar), consuntivo 2025 (aprobado
  pero con la página en 404) y la serie 2011-2019. No hay casilla guardada.
- **Benetton Rugby (Rugby Treviso S.r.l. SSD):** de 3 a 5 ejercicios depositados. PEC:
  benettonrugby@offipec.it. Alternativa: comprar el bilancio en el Registro Imprese.
- **Udinese:** 2022/23 y 2023/24 (existen truncados en Wayback).
- **Sampdoria:** 2022-2025 (el club dejó de publicarlos).
- **Salernitana:** 30/06/2024 y 2021.
- **Cagliari:** el bilancio 2018 está en Issuu y el 2021 en un Drive de solo lectura.
- **Fiorentina:** 2018.
- **Catania FC (Pelligra):** bilanci recientes; ya comunica cifras a la prensa.
- **FITP:** consuntivo 2019 (nunca se publicó) y fecha del 2025.
- **Circolo Canottieri Aniene:** bilanci sociali 2014-2019.
- **Benevento, Vicenza, Perugia, Ascoli, Arezzo, Brescia:** solo si Guido ve señal.
- **Rugby, clubes chicos:** prioridad baja, ninguno publica.

## Federaciones

La FIR y la FITP entran al sitio (decisión de Guido). Los entes que controlan (Zebre, FITP Business &
Media, Sportcast, Mario Belardinelli) y Sport e Salute quedan como PDFs de contexto hasta que Guido
decida.
