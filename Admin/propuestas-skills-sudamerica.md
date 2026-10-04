# Propuestas de texto para skills — sourcing Sudamérica (2026-10-03)

Ninguna se aplicó: las skills no se editan sin el ok de Guido. Cada bloque dice a qué archivo va y
qué agrega. Una vez aprobadas y aplicadas, borrar este archivo.

## `paises/Brasil.md`

- **Otros deportes**: el canal sirve solo para clubes poliesportivos/sociales constituidos como
  associação con persona jurídica propia (Minas Tênis Clube y Náutico, Paulistano, Praia Clube,
  Pinheiros), que publican relatório anual con demonstrações auditadas por estatuto o por recibir
  recursos de Lei de Incentivo. Un balance consolida todos los deportes; no hay balance por deporte.
  Los equipos de NBB/Superliga suelen colgar de un poliesportivo o no publican nada; LNB y CBV
  publican su propio balance, no el de los clubes. Gotchas: la carpeta `/uploads/AAAA/MM/` es fecha
  de subida, no ejercicio; Praia Clube bloquea el HTML con Cloudflare pero los PDFs bajan con
  User-Agent; Paulistano hoy es una SPA Angular+Strapi y sus PDFs viejos solo están en Wayback.
- **Club que publica cada documento como noticia con link a Google Drive** (Vila Nova 2021): se baja
  vía Wayback de la noticia más `drive.google.com/uc?export=download&id=<id>`, sin login.
- **Portales con 403 a curl que cargan en un browser real** (Athletico Paranaense,
  `athletico.com.br/gestao/`): los PDFs están en un bucket S3 que baja con curl una vez sacada la
  URL desde el browser. Flamengo: portal de transparencia con pestaña FINANÇAS (Strapi, PDFs en
  `storage.googleapis.com`). Chapecoense: `href="...pdf"` en el HTML crudo de `/transparencia/`.
  Atlético Goianiense: el servidor da 406 con un User-Agent corto tipo `Mozilla/5.0`, y los hrefs de
  `atleticogoianiense.com.br/transparencia/financas.html` van con comillas simples.
- **Si un `.PDF` en mayúscula devuelve el challenge de Cloudflare con HTTP 200 en
  `futebolpaulista.com.br`, probar `.pdf` en minúscula** (Guarani 2023).
- Juventude: el dead-end viejo se destrabó; balances 2017-2025 en
  `juventude.com.br/publicacoes-e-editais` (PDFs en `r2.juventude.com.br`).

## `paises/Chile.md`

"Antes de la CMF, y para un club con sitio WordPress: listar sus PDF con
`<dominio>/wp-json/wp/v2/media?media_type=application&per_page=100`. Palestino publica ahí 8
Memorias anuales (2017-2024) con EEFF auditados adentro, verificables por RUT (99.569.020-9) y cierre
al 31-dic. La ficha CMF de Palestino que figuraba en la nota daba 404 con curl."

## `paises/Colombia.md`

"Primera B y otros deportes también están en SIIS bajo el mismo flujo: Real Santander, Jaguares,
Atlético FC, Barranquilla FC, Tigres FC, Boca Juniors de Cali, Atlético Huila, Real Cartagena, Bogotá
FC, Corsarios, Leones FC, Orsomarso, Cúcuta Deportivo, Cortuluá, y de otros deportes Caimanes de
Barranquilla y Los Toros (béisbol) y Titanes (baloncesto), todos con 4-6 ejercicios bajados.
Gotchas del flujo, confirmados 2026-10-03: el `url` que devuelve `documentos-adicionales` ya es
`VisualizarDocumentos.aspx`; el subvisor se arma cambiando ese nombre por `subvisor.aspx` con el mismo
token. Un `404` en `documentos-adicionales` significa 'sin documentos depositados' para ese radicado,
no un fallo transitorio. Con 1 descarga por vez y 2 s de pausa no hubo throttling en ~300 archivos."

## `paises/Uruguay.md`

"Peñarol publicó el balance al 30-nov-2018 en su sitio (`aucdocumento.aspx?7138,21539` y `?7139,21543`,
par página,documento). Se encuentra con el CDX del dominio punycode `xn--pearol-xwa.org`, antes que
el sitio vivo; desde la Memoria 2019 todo está detrás del login de socios. Nacional: sin balances en
ninguna fecha archivada de `nacional.uy`, `nacional.com.uy` ni `socionacional.uy`."

## `paises/Ecuador.md`

"Los clubes civiles grandes presentan informe económico y estados (a veces auditados) a socios en la
asamblea anual y lo cuelgan un tiempo en el sitio: Emelec 2023 (`content/uploads/2024/08/`), Barcelona
SC 2018 (`/descargas/pdf/INFORME_FINANCIERO_2018.pdf`). Los sitios nuevos ya no los publican. Técnica:
CDX del dominio completo con filtro `application/pdf` y buscar nombres tipo `informe_financiero` o
`estados`. Las convocatorias de asamblea (`/asamblea…`) confirman si hay auditoría externa anual."

## `paises/Peru-Paraguay-Bolivia-Venezuela.md`

- Perú: Universitario publica los resultados de la auditoría BDO como imágenes de comunicado en
  `universitario.pe/media/uploads/<año>/…/*.jpg`, no como PDF. Sporting Cristal, Cienciano, Melgar y
  otros 9: CDX completo sin ningún financiero. Alianza Lima: Wayback no tiene nada fuera de 2019,
  2020, 2022 y 2023.
- Paraguay: asociaciones civiles; la licencia APF/CONMEBOL pide EEFF auditados pero los guarda la APF.
  CDX y wp-json de los 9 clubes sin resultado. Único canal: pedido directo (Sportivo Luqueño ofrece los
  EEFF en `clubsportivoluqueno.com.py/socios/asamblea.php`, por WhatsApp).
- Bolivia y Venezuela: asociaciones civiles sin obligación pública; la FBF solo publica documentos
  propios. Dead-end documentado.

## `SKILL.md` de club-sourcing (sección 0.1, familia 3)

"Con capturas de Wayback del mismo PDF, listar siempre todas con `fl=original,timestamp,length` y
quedarse con la de mayor tamaño: la de exactamente 1.048.576 bytes está truncada (Operário, Volta
Redonda, Emelec, Pinheiros). Hay tres clubes cuyos PDFs viejos solo existen en Wayback y de un sitio
que ya cambió a SPA (Coritiba, Paulistano, Operário)."
