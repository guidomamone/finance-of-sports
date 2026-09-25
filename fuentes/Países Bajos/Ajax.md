# AFC Ajax

- **Deporte**: Fútbol
- **Liga / competencia**: Eredivisie (Países Bajos, 1ª división)
- **Entidad legal**: AFC Ajax N.V., cotizante en Euronext Amsterdam desde 1998 (ticker AJAX) —
  la mejor entidad individual encontrada en el país por transparencia (IFRS, informe semestral
  incluido).
- **Canal**: sitio propio (`ajax.nl/club/jaarverslag`, URLs con hash impredecible en
  `ajax.nl/media/...`), confirmado también en el índice F.04 de la KNVB. Ver
  `fuentes/Países Bajos/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-17)

**11 ejercicios**, `Clubes/Países Bajos/Ajax/`: 2013/14, 2014/15, 2015/16, 2016/17, 2018/19,
2019/20, 2020/21, 2021/22, 2022/23, 2023/24, 2024/25. Todos PDF con capa de texto nativa
descargados directo de `ajax.nl/media/`.

**Hueco real: 2017/18.** Ese ejercicio existió solo como microsite HTML interactivo en
`jaarverslag.ajax.nl` (Umbraco, confirmado vía Wayback CDX — sin ningún PDF descargable en ese
dominio) — el dominio está muerto hoy (no resuelve DNS). Hay un mirror en Scribd
(`scribd.com/document/427778978/Ajax-Jaarverslag-2017-2018`) no usado por no ser fuente oficial.

**Series más viejas (pre-2013, hasta el IPO de 1998) no encontradas** en `ajax.nl/media/` con las
búsquedas de esta sesión. Pistas sin agotar para una sesión futura:
`financialfilings.com/companies/afc-ajax-nv/` (agregador de filings regulatorios, devolvió 403 en
esta sesión) y `archief.ajax.nl` ("AJAX ARCHIEF", archivo digital propio del club que lista
"Jaarverslagen Vereniging (vanaf 1964)" — pero es la asociación/Vereniging, no la N.V., sin
explorar en profundidad esta sesión).

Además de los jaarverslagen completos, `ajax.nl/media/` aloja informes semestrales
("halfjaarlijkse financiële verslaglegging") de dic-2019 a dic-2025 — no descargados (no es el
ejercicio anual completo), quedan como complemento si se necesita un cierre a mitad de año.

## Qué se cargó al sitio (sesión de onboarding de Países Bajos)

**2 ejercicios cargados** (los más recientes de los 11 bajados): 2023/24 y 2024/25, en
`data/ajax-nl-data.js` (`clubId: 'ajax-nl'`). Transcripciones completas vía `pdftotext -layout`
(PDF con capa de texto nativa) en `Clubes/Países Bajos/Ajax/jaarverslag-2023-24.md` y
`jaarverslag-2024-25.md`. Tie-out verificado exacto contra los 2 documentos (Bedrijfsresultaat,
Resultaat vóór/na belastingen) y contra el motor real del sitio (`node tools/audit.js`, sin
hallazgos de descuadre). Color de marca: `#DA121A` (rojo) — footylogos.com
(color-codes/ajax-amsterdam), verificado 2026-09-25.

Quedan 8 ejercicios sin cargar del archivo ya bajado (2013/14 a 2022/23, falta 2017/18) — candidato
a profundizar en una sesión futura de histórico.

## Dudas / pendientes

- Profundizar 1998-2012 si Guido quiere la serie completa desde el IPO — requiere explorar
  `archief.ajax.nl` o pedir acceso a `financialfilings.com`.
- Cargar los 8 ejercicios 2013/14-2022/23 (falta 2017/18) ya bajados pero sin transcribir/cargar.
- Último chequeo: 2026-09-17. Carga al sitio: 2026-09-25.
