<!-- md: los balances cargados cuyo informe del auditor no está en el documento, por país y club | leer: al buscar documentos de un país o club, para completar el informe que falta -->
# Informes del auditor que faltan

Balances cargados cuyo documento no trae el informe del auditor, aunque el propio documento muestra que existe (`dictamen: falta_transcripcion` en `Admin/registros/auditoria.jsonl`). La lista viva: `node tools/auditoria.mjs --pendientes`. Mientras falten, el sitio no publica auditor ni dictamen de ese año.

**Qué buscar:** el informe del auditor (opinión y firma) del mismo ejercicio, en otro documento publicado por el club o por el registro del país (ver el archivo del país en `paises/`). **Qué no hace falta:** volver a transcribir con Mistral los que dicen «el PDF no lo trae»: el PDF no tiene más que el .md (se comprobó con `pdftotext`). Al cargar el informe nuevo, la línea `falta_transcripcion` se reemplaza por la del dictamen y el auditor.

Dos tipos: **el PDF no lo trae** (hay que conseguir otro documento) y **el .md no lo trae** (el PDF quizá sí: mirar las páginas con `node tools/fos.mjs informe-en-pdf`).

## Argentina

- `argentinosjuniors-ar` — el PDF no lo trae: 2015
- `sanlorenzo-ar` — el PDF no lo trae: 2011, 2012

## Austria

- `rapidwien-at` — el .md no lo trae: 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022

## Brasil

- `botafogosp-br` — el .md no lo trae: 2025

## Bélgica

- `dender-be` — el .md no lo trae: 2022, 2023, 2024
- `liga be-proleague` — el PDF no lo trae: 2025
- `lommelsk-be` — el .md no lo trae: 2020
- `patroeisden-be` — el .md no lo trae: 2019
- `westerlo-be` — el .md no lo trae: 2016

## Estonia

- `nommekalju-ee` — el PDF no lo trae: 2021

## Italia

- `asroma-it` — el PDF no lo trae: 2022
- `bologna-it` — el PDF no lo trae: 2025
- `hellasverona-it` — el PDF no lo trae: 2020, 2021, 2022, 2023, 2024
- `lazio-it` — el PDF no lo trae: 2007, 2008, 2009, 2010, 2017
- `napoli-it` — el PDF no lo trae: 2018, 2020

## Japón

- `cerezoosaka-jp` — el PDF no lo trae: 2025
- `fctokyo-jp` — el PDF no lo trae: 2025
- `gambaosaka-jp` — el PDF no lo trae: 2025
- `kashimaantlers-jp` — el PDF no lo trae: 2025
- `kawasakifrontale-jp` — el PDF no lo trae: 2025
- `nagoyagrampus-jp` — el PDF no lo trae: 2025
- `sanfreccehiroshima-jp` — el PDF no lo trae: 2025
- `urawareddiamonds-jp` — el PDF no lo trae: 2025
- `visselkobe-jp` — el PDF no lo trae: 2025
- `yokohamafmarinos-jp` — el PDF no lo trae: 2025

## Noruega

- `sarpsborg08-no` — el .md no lo trae: 2021

## Países Bajos

- `adodenhaag-nl` — el .md no lo trae: 2025
- `fcdenbosch-nl` — el .md no lo trae: 2025
- `fcemmen-nl` — el .md no lo trae: 2019, 2020, 2021
- `goaheadeagles-nl` — el PDF no lo trae: 2025
- `sccambuur-nl` — el .md no lo trae: 2025
- `spartarotterdam-nl` — el .md no lo trae: 2024
- `telstar-nl` — el .md no lo trae: 2025

## Portugal

- `academicoviseu-pt` — el PDF no lo trae: 2022, 2023, 2024, 2025
- `alverca-pt` — el PDF no lo trae: 2024, 2025
- `casapia-pt` — el PDF no lo trae: 2022
- `chaves-pt` — el PDF no lo trae: 2022, 2023
- `felgueiras-pt` — el PDF no lo trae: 2024
- `mafra-pt` — el PDF no lo trae: 2024
- `maritimo-pt` — el PDF no lo trae: 2021, 2022, 2023, 2024, 2025
- `nacional-pt` — el PDF no lo trae: 2022, 2023, 2024, 2025
- `portimonense-pt` — el PDF no lo trae: 2022, 2023, 2024
- `rioave-pt` — el PDF no lo trae: 2016, 2017
- `vizela-pt` — el PDF no lo trae: 2022

## Suiza

- `basel-ch` — el .md no lo trae: 2007
- `luzern-ch` — el .md no lo trae: 2018
- `stgallen-ch` — el .md no lo trae: 2019, 2020, 2021, 2022, 2023, 2024
