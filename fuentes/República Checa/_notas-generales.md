# República Checa — notas generales de sourcing

Decimocuarto país nuevo de la lista de "30 mejores ligas del mundo" recorrida en orden alfabético
(sesión 2026-09-17), después de Alemania, Austria, Bélgica, China, Corea del Sur, Croacia,
Dinamarca, Francia, Grecia, Italia, Noruega, Países Bajos y Portugal. Confirmados los 16 clubes de
la Chance Liga 2025/26 vía Wikipedia (checa e inglesa, coinciden): Slavia Praha, Sparta Praha,
Viktoria Plzeň, Jablonec, Hradec Králové, Slovan Liberec, Sigma Olomouc, Pardubice, Karviná,
Bohemians Praha 1905, Mladá Boleslav, Zlín (ascendido esta temporada), Teplice, Dukla Praha,
Slovácko y Baník Ostrava.

## El canal: or.justice.cz (Sbírka listin del Veřejný rejstřík), el mejor registro del proyecto

**`or.justice.cz` resultó tan bueno como Bélgica/Dinamarca/Grecia — gratis, sin login, sin captcha —
con una salvedad real: la descarga del PDF necesita una cookie de sesión, no es 100% anónimo como el
ΓΕΜΗ griego.** Aun así, terminó siendo la cobertura de liga completa más profunda del proyecto: los
16 clubes de la Chance Liga 2025/26 quedaron con series reales, la mayoría de más de 15 ejercicios,
varias por encima de 25 (Slavia 28, Mladá Boleslav 33, Karviná 34).

- **Buscar por la razón social LEGAL, casi nunca el nombre público del club** (mismo gotcha que
  Alemania/Grecia/Corea del Sur): "FK Jablonec" da 0 resultados, la razón social real es
  "Fotbalový Klub Jablonec, a.s." (buscar por IČO cuando el nombre no aparece — Google/WebSearch
  "[club] a.s. IČO" resuelve rápido). Todos los clubes de la Chance Liga están organizados como
  **a.s. (akciová společnost)**, salvo Pardubice que sigue siendo un **z.s. (spolek)**, la
  asociación deportiva tradicional sin sociedad separada — y aun así SÍ deposita účetní závěrka
  igual, porque la obligación de depósito en la Sbírka listin alcanza a cualquier entidad del
  registro, no solo a sociedades mercantiles.
- **Flujo de navegación (3 pasos), todo dentro de `or.justice.cz/ias/ui/`**:
  1. Buscar: `rejstrik-$firma?nazev=<nombre>` (o `?ico=<IČO>` si ya se conoce) →
     cada resultado trae un link "Sbírka listin" con `subjektId`.
  2. Listar: `vypis-sl-firma?subjektId=<id>` — la tabla completa de listinas (documentos) de esa
     entidad, cada fila con un link a `vypis-sl-detail?dokument=<id>&subjektId=<id>&spis=<id>`.
     Filtrar por texto `účetní závěrka` en el tipo de listina (no hay filtro de UI, hay que
     recorrer el texto de cada fila).
  3. Bajar: la página de detalle (`vypis-sl-detail`) tiene un link
     `/ias/content/download?id=<hash opaco>` — ese `id` es efímero, atado a la sesión que acaba de
     generar la página de detalle.
- **Gotcha central, costó una hora de esta sesión resolverlo bien**: el `id` de descarga **expira
  en segundos y está atado a cookies de sesión**, no es una URL estable. Un `curl` directo con el
  `id` obtenido minutos antes (o incluso obtenido por el browser pero pasado a un `curl` sin sus
  cookies) devuelve HTTP 200 pero con una página HTML "Nenalezeno / Neplatný odkaz" en vez del PDF
  — hay que revisar el `Content-Type`/las primeras bytes, no confiar en el código 200 solo. La
  vuelta que funcionó, **100% confiable, cero llamadas al navegador**: un script de `curl` con
  **cookie-jar propio por documento**, haciendo la secuencia completa (GET a la página de detalle
  para sembrar la cookie de sesión Y extraer el `id` del HTML de esa misma respuesta, después GET
  inmediato a la URL de descarga con la MISMA cookie-jar) en un solo proceso, sin depender del
  browser en absoluto:
  ```bash
  CJ=$(mktemp)
  DETAIL="https://or.justice.cz/ias/ui/vypis-sl-detail?dokument=<id>&subjektId=<id>&spis=<id>"
  html=$(curl -sS -c "$CJ" -b "$CJ" -A "<UA de navegador>" "$DETAIL")
  id=$(echo "$html" | grep -o 'content/download?id=[a-f0-9]*' | head -1 | sed 's/.*id=//')
  curl -sS -c "$CJ" -b "$CJ" -A "<mismo UA>" -e "$DETAIL" -o archivo.pdf \
    "https://or.justice.cz/ias/content/download?id=$id"
  ```
  Con esto se bajaron los ~350 PDF de los 16 clubes sin un solo fallo persistente (una única
  desconexión de red transitoria en toda la sesión, resuelta reintentando ese documento).
- **Un intento previo de usar el Browser pane (fetch()+Blob+`<a download>`) para automatizar varias
  descargas seguidas SALIÓ MAL en esta sesión y no debe repetirse**: el Chrome real que controla el
  Browser pane en esta máquina tiene activado "preguntar dónde guardar cada archivo", así que cada
  descarga disparaba un diálogo nativo de "Guardar como"/"Reemplazar archivo" en la Mac de Guido —
  y como el script encadenaba varias descargas seguidas, los diálogos se apilaron e interrumpieron
  a Guido en medio de la sesión. Un diálogo nativo abierto además congela el hilo del renderer
  (mismo gotcha que `alert()`/`confirm()` ya documentado en `CLAUDE.md`), lo que producía timeouts
  en llamadas de JS posteriores. **Para cualquier sourcing futuro de un país con un registro
  similar (necesita sesión pero no login), preferir SIEMPRE el patrón curl+cookie-jar de arriba —
  nunca disparar una descarga real del navegador en un loop.**
- **Casi todos los PDF tienen capa de texto nativa** (cero OCR necesario, igual que Grecia/DNCG
  Francia/DART Corea) — son generados por software de oficina (Word/PDF24), no escaneos. Dos
  gotchas de formato reales, ambos documentados como PISTA para el próximo país con este patrón:
  - Un depósito puede ser un **`.docx` renombrado `.pdf` en el sistema** (Viktoria Plzeň, ejercicio
    2025, tipo de listina "předána prostřednictvím správce daně z příjmů" — un mecanismo nuevo de
    depósito vía el administrador tributario). Verificar SIEMPRE con `file` antes de asumir que es
    un PDF real.
  - Un depósito puede ser **XML/iXBRL puro** (Jablonec, mismo tipo de listina "předána
    prostřednictvím správce daně z příjmů", ejercicio 2023). Mismo mecanismo, formato distinto.
  - **Estos dos formatos NO están cubiertos por el `.gitignore` actual del proyecto** (que solo
    excluye `*.pdf`, `Clubes/**/*.htm(l)`, `*.tif(f)`, `*.xhtml`) — quedarían TRACKEADOS y
    publicados en financeofsports.com si se los deja como están. Señalado en el reporte de esta
    sesión para que Guido decida si sumar `Clubes/**/*.docx` y `Clubes/**/*.xml` al `.gitignore`
    (no se tocó el archivo, es compartido).
- **Muchos ejercicios están fragmentados en 2-4 documentos separados** (rozvaha=balance,
  VZZ/výkaz=cuenta de resultados, příloha=anexo, cada uno con su propio número de listina SL) en vez
  de un solo PDF combinado — sobre todo en años donde el club depositó varios ejercicios atrasados
  de una vez (Karviná subió TODO 2007-2015 de golpe en agosto de 2016). Al mapear estos ejercicios
  después, hay que juntar los 2-4 archivos del mismo año antes de extraer cifras.
- **El ejercicio fiscal no es uniforme entre clubes, y a veces cambia DENTRO de la serie de un mismo
  club** (mismo patrón ya visto en Reino Unido/Dinamarca): Slavia cerraba en diciembre hasta ~2010,
  pasó a jun-jun después, con un período de transición de 18 meses (1.1.2024-30.6.2025) en el
  ejercicio más reciente. Verificar siempre las fechas de cierre exactas antes de cargar.
- **Huecos genuinos, no de búsqueda**: varios clubes tienen años sin depósito encontrado pese a
  continuidad en el resto de la serie (Slovan Liberec: nada entre 2006 y 2021; Zlín: nada entre 2001
  y 2010; Slovácko: la serie más discontinua de las 16, con solo 14 documentos en 25 años) — no se
  investigó la causa (¿multa no cobrada por incumplimiento? ¿depósito bajo otra entidad?), candidato
  para `dudas-por-club.md` si se llega a cargar alguno de estos clubes.

## Formato de archivo usado en `Clubes/República Checa/<Club>/`

Cada PDF se nombró `SL<número de listina>_<año o etiqueta>.pdf` (ej. `SL139_2025-06-30.pdf`,
`SL42_2007-vzz.pdf` para un fragmento de "výkaz zisku a ztráty"/cuenta de resultados). El número de
listina (`SL` = "seznam listin", el ID correlativo de la Sbírka listin de esa entidad) queda como
referencia cruzada directa a la fila del registro — más corto y más estable que el nombre de archivo
original que trae cada depósito (a veces genérico tipo `image43758.pdf`, a veces con el nombre real
del informe).

Ningún club de esta sesión requirió pago, login, ni creación de cuenta.

- Última sesión: 2026-09-17.
