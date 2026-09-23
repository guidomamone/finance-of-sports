# Notas generales — Brasil

## Metodología general y resumen de la sesión 2026-09

Los clubes convertidos a SAF (Sociedade Anônima do Futebol, Lei 14.193/2021) publican
"Demonstrações Financeiras" auditadas anualmente, casi siempre colgadas directo en el propio sitio
del club (sección "Transparência"/"SAF") además de eventuales registros en la CVM. Sigue siendo,
como esperado, el país con mejor cobertura de todo este barrido. Sesión 2026-09-12: se profundizó
en los 4 clubes ya conocidos (más años cada uno), se recuperó Vasco da Gama pese al bloqueo
Cloudflare, y se sumaron 7 clubes nuevos con hits reales (Botafogo-SP, Atlético Goianiense,
Athletico Paranaense, Grêmio, Mirassol, Ituano, Chapecoense).

**Nota importante de esta sesión — corrección de un error de atribución:** el PDF
`Clubes/Brasil/Botafogo/demonstracoes-financeiras-2019-2020.pdf` que constaba en la versión previa
de esta sección **no era del Botafogo de Rio de Janeiro**. Al abrir el documento, la nota de
contexto operacional dice explícitamente "sede na cidade de Ribeirão Preto, estado de São Paulo...
fundada em 4 de junho de 2019" — es **Botafogo Futebol S.A. (Ribeirão Preto-SP)**, un club
homónimo y entidad totalmente distinta (ver su propia subsección más abajo). El archivo fue movido a
`Clubes/Brasil/Botafogo-SP/` con el resto de los años encontrados de ese club. Ojo si alguna carga de
datos ya había asumido que ese PDF era del Botafogo carioca.


## Clubes revisados sin PDF descargable (misses de la sesión 2026-09)

Búsqueda puntual por club, sin encontrar un PDF de demonstrações financeiras auditadas descargable
en esta sesión (a diferencia de los de arriba, acá no vale la pena rabbit-hole más sin un lead nuevo):

- **América Mineiro (América Futebol Clube, MG):** tiene página propia americafc.com.br/transparencia
  que menciona "Demonstrações Financeiras 2024" disponibles para consulta, pero no se encontró la URL
  directa del PDF (ojo: una búsqueda trajo un PDF de "Minas Arena — Gestão de Instalações Esportivas
  S.A.", que es la empresa que administra el estadio Mineirão, NO el balance del club — se descartó
  para no cargar el dato equivocado).
- **Náutico (Clube Náutico Capibaribe):** tiene página nautico-pe.com.br/documentos-oficiais, sin PDF
  de balance auditado encontrado en la búsqueda (sí hay cifras de prensa: 15° año consecutivo de
  pérdidas, deuda de R$283M en 2025).
- **Sport Recife (Sport Club do Recife):** tiene portal de transparencia propio
  (transparencia.sportrecife.com.br) con años múltiples según la búsqueda, pero el subdominio no
  resuelve DNS desde este entorno y el dominio principal sportrecife.com.br está detrás de Cloudflare
  (403 en el intento directo). Revisar con browser interactivo.
- **Vitória (Esporte Clube Vitória):** tiene ecvitoria.com.br/relatorios-de-transparencia/, pero esa
  URL específica devolvió 404 en esta sesión — la estructura de la página cambió o la ruta es otra.
- **Criciúma (Criciúma Esporte Clube):** solo se encontró un balance viejo (2013) en
  criciuma.com.br/upload/financeiro/; adivinar el nombre de archivo para 2022-2024 con el mismo
  patrón dio error 500 del servidor (no 404 — puede que el patrón de nombre haya cambiado).
- **Ceará (Ceará Sporting Club):** tiene portal transparencia.cearasc.com y prensa confirma que
  presentó demonstração contábil 2025 con auditor independiente el 30/04/2026, pero no se encontró la
  URL directa del PDF (el artículo de la nota oficial linkeado devolvió 404).
- **Fortaleza (Fortaleza EC SAF):** tiene portal propio transparencia.fortaleza1918.com.br/portal-saf/
  con secciones "Balancete Anual", "Inf. Contábeis Anuais", etc., pero el fetch no pudo extraer los
  links de PDF individuales (página con navegación por menú, no links planos en el HTML).
- **Juventude (Esporte Clube Juventude):** sin balance auditado encontrado en la búsqueda.
- **Marília (Marília Atlético Clube):** sin balance auditado encontrado en la búsqueda (a diferencia
  de Ituano/Mirassol, no apareció en el repositorio institucional de la Federação Paulista con el
  nombre de archivo probado).


## Nota general: repositorio de la Federação Paulista de Futebol

`futebolpaulista.com.br/Repositorio/Institucional/<año>/<Club>.pdf` (y variantes de nombre de
archivo) aloja laudos de auditoria/demonstrações financeiras de TODOS los clubes que compiten en el
Campeonato Paulista, no solo los SAF — confirmado en esta sesión para Ituano, Mirassol, y también
aparecieron en resultados de búsqueda São Paulo FC, Corinthians, Guarani, Ponte Preta, Desportivo
Brasil y hasta Botafogo-SP (con el nombre `RELATÓRIO AUDITORIA.pdf`). Vale la pena, en una sesión
futura con foco en clubes paulistas específicamente, recorrer esta carpeta año por año en vez de
buscar club por club — probablemente ahí están Marília, Botafogo-SP (años intermedios) y otros
clubes paulistas de la lista de pendientes de este documento. La misma lógica aplica a
`federacaopr.sfo3.digitaloceanspaces.com` para clubes de Paraná (ya explotado parcialmente para
Coritiba).


## Nota sobre CVM

Se buscó en rad.cvm.gov.br / vía Google si algún SAF de clubes brasileños está registrado como
"companhia aberta" (capital abierto) ante la CVM. No se encontró ningún club en esa situación — todos
los hits de esta sesión fueron "sociedades de capital fechado" que publican sus demonstrações
financeiras directo en su propio sitio o en el de la federación estadual correspondiente, cumpliendo
la Lei 14.193/2021 sin necesidad de registro CVM (que solo aplica si hacen oferta pública de
acciones). No parece haber, hasta ahora, ningún club brasileño que amerite buscarse específicamente
en el sistema RAD de la CVM.



## Repositorios de federación estadual: Goiás (FGF-GO) y Mato Grosso (FMF-MT) — sesión 2026-09-22

Dos federaciones más con repositorio público de estados contables de sus clubes filiados, al mismo
nivel de utilidad que el de la Federação Paulista. Las dos corren **el mismo CMS** (misma estructura
de URL, mismo esquema de nombres de archivo), así que lo que se aprende en una sirve para la otra —
y probablemente para más federaciones estaduales que todavía no se chequearon.

- **Federação Goiana de Futebol: `fgf.esp.br`.** **OJO: NO es `fgf.com.br`** — ese es el de la
  Federação **Gaúcha** (Rio Grande do Sul), el que ya estaba documentado para Juventude. Dos
  federaciones distintas con la misma sigla.
  - Menú "Institucional → Publicações": `fgf.esp.br/pt/conteudo/?q=11&sc=11`, paginado con
    `&p=2` … `&p=7`.
  - Contiene los "Demonstrativos Financeiros" de **todos** los clubes filiados, ejercicios
    **2021 a 2025**: Goiás EC, Vila Nova FC, Atlético Goianiense SAF, Anápolis FC, Aparecidense,
    Goiânia EC, Jaraguá EC, Trindade AC, Inhumas EC, Grêmio Esportivo Anápolis, Centro Oeste SAF,
    Itumbiara EC, Itaberaí EC, Tupy de Jussara, ABECAT, ASEEV-Evangélica, ABD FC, Bom Jesus EC,
    Anapolina SAF, CRAC, Atlético CG, más el balance de la propia FGF.
  - PDFs en `fgf.esp.br/assets/uploads/<id>.pdf` (el `?v=...` del href es cache-busting, se puede
    omitir). El `<id>` es un timestamp Unix con decimales pegados: `1746045932` ≈ 30/04/2025.
- **Federação Mato-Grossense de Futebol: `fmfmt.com.br`.** Menú "Institucional → Balanço dos
  Clubes": `fmfmt.com.br/pt/conteudo/?q=14&sc=11`. Cuiabá EC SAF (2022, 2023 ×2, 2024, 2025), Mixto
  EC (2022, 2024), Luverdense (2022 + relatório de auditoria), Uirapuru. PDFs en
  `fmfmt.com.br/assets/uploads/<id>.pdf`.
- **Gotcha que cuesta una hora si no se sabe: el prefijo `/pt/` es obligatorio.** Los `href` del
  menú en la home son relativos (`../conteudo/?q=14&sc=11`) y la página vive en `.../pt/home/`, así
  que la URL absoluta correcta lleva `/pt/`. Sin él —`fmfmt.com.br/conteudo/?q=14&sc=11`, o con
  `/index.php`, o con `/site/`— el servidor devuelve **404**, no un redirect. Lo mismo en
  `fgf.esp.br`.
- Las dos federaciones sirven bien por `curl` con User-Agent de navegador: **no hay Cloudflare**.
  `fgf.esp.br` sí es LENTO (decenas de segundos por página), así que conviene timeout alto y no
  barrer decenas de páginas en paralelo.
- **Federação Amazonense de Futebol (`fafamazonas.com.br`): NO tiene el equivalente.** Su
  `/site/pagina/transparencia/` publica solo los balanços de la propia FAF (2020-2025), nada de los
  clubes filiados — se recorrió el menú completo. Es el contraejemplo útil: el patrón
  "federación estadual = repositorio de balances de clubes" vale para SP, PR, RS, GO y MT, pero no
  es universal.

### Publicación voluntaria de clubes-asociación, con series largas

Tres de los cinco clubes de este barrido **no son SAF** (Goiás, Vila Nova, Avaí son asociaciones
civiles) y publican igual, algunos desde mucho antes de la Lei 14.193/2021. El supuesto "SAF =
publica, asociación = no publica" **no se sostiene en Brasil**: Goiás EC tiene demonstrações
contábeis en su propio portal desde el ejercicio **2007**, la serie más larga de Sudamérica en el
proyecto después de los condados de cricket ingleses. Antes de descartar un club brasileño por no
ser SAF, revisar igual su sección de transparencia.

### Gotcha nuevo: un 404 de archivo puede ser real, y el encoding no siempre es la causa

En `static.goiasec.com.br` los 4 PDFs cuyo nombre lleva acentos (`GEC-Demonstrações-Contábeis-2018-
Sites.pdf` y equivalentes de 2019, 2020, 2021) devuelven **404 del Apache**, aunque siguen linkeados
en la página. Se probaron las cuatro variantes posibles antes de concluir que el archivo no está:
la URL tal cual sale del HTML (`%C3%A7`), la NFD (`c%CC%A7`, que es lo que usa el CMS de la FAF-AM
y por lo tanto no era una hipótesis descabellada), el doble-encodeo (`%25C3%25A7`), y con `Referer`
de la página de transparencia. Wayback tiene las URLs indexadas en CDX pero sin ningún snapshot
200. Moraleja: **el encoding vale probarlo, pero después de 3 variantes asumir que el archivo se
borró del servidor** y buscar el ejercicio por otro canal (en este caso el repositorio de la FGF-GO
recuperó 2021, y 2018-2020 quedaron como hueco documentado).

### Gotcha de tooling: WebFetch inventa URLs cuando la página es larga

Al pedirle a WebFetch la lista de PDFs de `goiasec.com.br/transparencia`, devolvió una tabla
prolija "por año" con URLs que parecían plausibles pero **cuatro de ellas eran reconstrucciones, no
links reales**, y otras tantas omitidas. El chequeo confiable fue `curl` de la página + `grep -o` de
los `href` + parseo de los `<a>` con su texto. Usar WebFetch para descubrir QUE existe una sección,
nunca como fuente de las URLs exactas que después se van a `curl`ear.


## La Federação Paulista tiene un índice JSON de TODOS sus clubes, 2010-2025 (sesión 2026-09-22)

**Esto reemplaza el "adivinar el nombre de archivo en `Repositorio/Institucional/<año>/`" que estaba
documentado más arriba**, y que solo funcionaba para el año más reciente vía `WebSearch`. Los nombres
de archivo del repositorio son irregulares a propósito (conviven `São Paulo.pdf`, `271A.pdf`,
`1099-2024-7 Sport Club Corinthians Paulista 31.12.23 (PDF ass).pdf` y
`BALANÇO ITUANO 2020 E PARECER DA AUDITORIA.pdf`), así que adivinarlos no escala. No hace falta:
la página `futebolpaulista.com.br/A-Federacao/Financas.aspx` se arma con Vue desde dos handlers
JSON públicos.

- **Años disponibles**: `GET /Handlers/Institucional/ListaPeriodoFinanca.ashx` → devuelve
  `DataPeriodo` de **2010 a 2025** (16 ejercicios).
- **Clubes y anexos de un año**: `GET /Handlers/Institucional/ListaFinanca.ashx?periodoSelecionado=<año>`
  → `{Codigo, Sucesso, Retorno:[{idClube, nomeClube, escudo, anexos:[{anexo, nomeAnexo}]}]}`, donde
  `anexo` es la ruta relativa al PDF. Un club puede tener 1 anexo o 12 (Mirassol 2012 tiene 12,
  partidos en BP / DRE / DMPL / DFC / notas explicativas por separado).
- Existe además `ListaFinancaFederacao.ashx?periodoSelecionado=<año>` para el balance de la FPF
  misma, que no interesa acá.

**Gotcha de tooling, importante: hay TRES comportamientos distintos en el mismo dominio, y
conviene no confundirlos.**
1. **Los HANDLERS sí están detrás de Cloudflare**: un `curl` a `ListaFinanca.ashx` devuelve el
   interstitial "Just a moment..." (y 403 en el segundo intento). Hay que llamarlos con `fetch()`
   DESDE el Browser pane, con `Financas.aspx` cargada en la pestaña y el header
   `X-Requested-With: XMLHttpRequest`.
2. **El 403 del LISTADO de directorio (`/Repositorio/Institucional/<año>/`) NO es Cloudflare** —
   corrige lo que decía la nota vieja. Es un 403 de IIS ("Forbidden: Access is denied. You do not
   have permission to view this directory"), o sea directory browsing deshabilitado: da exactamente
   el mismo 403 desde un browser real, así que no vale la pena intentar listarlo con el Browser
   pane.
3. **Los PDFs individuales bajan con `curl` 200 sin ningún truco**: alcanza un User-Agent de
   navegador, ni siquiera hace falta `Referer` (verificado sobre decenas de archivos de 2010 a
   2025). Hay que URL-encodear el path, eso sí, porque los nombres traen espacios, acentos y
   paréntesis.

**Gotcha de parseo del JSON**: las claves vienen con casing distinto según el handler —
`ListaPeriodoFinanca.ashx` devuelve `DataPeriodo` en mayúscula, y `ListaFinanca.ashx` devuelve
`idClube`/`nomeClube`/`anexos[].anexo` en minúscula (dentro del `Retorno`, que sí es mayúscula).
Filtrar por `NomeClube` devuelve vacío sin ningún error. Ojo además con que en 2012 varios clubes
subieron `.jpg` en vez de `.pdf`.

**Lo que esto destrabó en la misma sesión**: Ituano pasó de 1 ejercicio (2024) a **15** (2010-2024)
y Mirassol de 1 a **13** (2012-2025, sin 2019-2020). Ambos figuraban como "pendiente: años
anteriores a 2024" desde la sesión 2026-09-12, y el pendiente era en realidad un problema de
descubrimiento, no de disponibilidad. Ojo con la atribución: el índice lista a Ituano como
**"Ituano SAF"** en todos los años, incluidos los muy anteriores a la Lei 14.193/2021 — es el nombre
actual de la entidad en el padrón de la federación, no evidencia de que el club fuera SAF en 2010.

**Lo que queda por explotar, y es mucho**: el mismo índice tiene, año por año hasta 2010, a
Corinthians, Palmeiras, Santos, São Paulo, Ponte Preta, Guarani, RB Bragantino, Botafogo-SP,
Portuguesa, Primavera, São Bento, Velo Clube, AD Guarulhos, Ferroviária y Grêmio Novorizontino —
o sea, profundidad histórica para varios clubes que hoy están cargados con 2-8 ejercicios. Es
ejecutar el mismo procedimiento, no hay nada que investigar.
