# Prueba to-do 315: lista de documentos de un regulador (Noruega, Regnskapsregisteret)

Prueba chica, sesión SOURCING 1, 2026-10-20. Guido eligió no instalar Crawl4AI (pide Playwright + Chromium, ~300 MB):
se midió el comando simple contra el Browser pane.

## Cómo se listó

`node tools/listar-brreg.mjs`: un `HEAD` por `<orgnr>/<año>` a
`data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/` (200 = hay PDF, 404 = no hay). No baja nada. La API JSON
abierta de brreg solo devuelve el último ejercicio, así que no sirve para listar; el HEAD sí. Rango probado: 2008 a 2025
(2026 no se probó). Una entidad por club: la de más ingreso operativo, según `Admin/sourcing/Noruega/<club>.md`.

## Tabla: en el portal y no cargado

"Cargado" = lo que dice `Admin/ESTADO-clubes.md` (por club, no dice de qué entidad).

| Club | Entidad | Ejercicios en el portal | Cargados | Faltan cargar |
|---|---|---|---|---|
| Molde | Molde Fotballklubb FLI (942562241) | 2008 a 2025 (18) | 2025 | 2008 a 2024 (17) |
| Fredrikstad | Fredrikstad Fotballinvest AS (979111576) | 2008 a 2025 (18) | 2012 a 2018, 2024 | 2008 a 2011, 2019 a 2023, 2025 (10) |
| Aalesund | Ålesund Fotball AS (970976787) | 2008 a 2025 (18) | 2025 | 2008 a 2024 (17) |
| Sarpsborg 08 | Sarpsborg 08 Fotballforening FLI (986400362) | 2008, 2012, 2014 a 2025 (14) | 2012, 2014 a 2025 | 2008 (1) |
| Vålerenga | Vålerenga Fotball Elite FLI (914175232) | 2015 a 2025 (11) | 2025 | 2015 a 2024 (10) |
| Viking | Viking Fotball AS (918087834) | 2017 a 2025 (9) | 2025 | 2017 a 2024 (8) |

Total: 63 ejercicios en el portal que no están cargados. No se bajó ninguno de ellos.

**Lo que la tabla no dice y importa:** el portal no tiene ninguno que no esté ya bajado. Los PDFs de estas entidades ya están en
`Clubes/Noruega/<club>/` desde la sesión del 2026-09-17 (más las demás entidades de cada club). El hueco es de CARGA, no de
sourcing: para Noruega, esta lista dice qué onboardear, no qué buscar.

## Documento de prueba

Uno solo: Viking Fotball AS 2024 (`.../kopi/918087834/2024`). HTTP 200, `application/pdf`, 971.758 bytes, 4,5 s. Mismo tamaño que
el que ya estaba en `Clubes/Noruega/Viking/` (difiere en bytes cerca del final, el link sirve). Se guardó en el scratchpad, no en
`Clubes/`.

## Medición: comando simple vs Browser pane

| | Script (HEAD) | Browser pane |
|---|---|---|
| Tokens de sesión | ~0 (el script corre en terminal; la tabla son ~600 tokens al leerla) | Medido en 1 de 6 entidades: la ficha (`virksomhet.brreg.no`) son ~1.100 tokens de texto y NO lista los años; hay que abrir "Årsregnskap" y leer otra vez. Estimado: 4 a 5 llamadas por entidad, ~20 a 30 mil tokens para las 6 |
| Tiempo | 225 s para 108 pedidos (~2 s cada uno; brreg es lento, en serie) | Estimado 5 a 8 minutos de sesión |
| Exactitud | Exacta por año (200/404); detecta huecos como Sarpsborg 2009 a 2011 y 2013 | Depende de leer la lista a ojo |
| Costo de repetirlo | Un comando | Las mismas llamadas otra vez |

**Conclusión:** para Noruega, el script reemplaza al Browser pane sin discusión. Crawl4AI no aporta acá: brreg se responde con
HTTP plano. Bélgica (API JSON de la Centrale des bilans) está en el mismo caso. Crawl4AI queda para cuando aparezca un portal que
necesite navegador (JavaScript, formularios) y no tenga API ni URL directa.

## Notas

- Mejora posible del script (no aplicada): pedidos en paralelo (unos 5 a la vez) bajaría los 225 s a menos de un minuto.
- El script tiene los 6 clubes y orgnr fijos adentro; para otro país o club habría que parametrizarlo.
- Fuera de alcance, visto de pasada: los clubes de Noruega con más de una entidad cargada no dicen en `ESTADO-clubes.md` cuál
  entidad es la cargada; para comparar por entidad hay que mirar `data/`.
