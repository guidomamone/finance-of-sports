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

