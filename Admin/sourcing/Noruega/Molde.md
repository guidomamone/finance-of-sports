# Molde Fotballklubb (Molde FK)

- **Deporte**: Fútbol
- **Liga / competencia**: Eliteserien (Noruega, 1ª división)
- **Entidad legal — DOS entidades, ambas activas y con serie completa**:
  - **MOLDE FOTBALLKLUBB**, org.nr. 942 562 241, forma jurídica FLI (el club-asociación). Fundada
    1911-06-19, Molde. **Es la de mayor ingreso operativo** (NOK ~129M en 2025) — el club en sí.
  - **MOLDE FOTBALL AS**, org.nr. 965 896 422, forma jurídica AS, næringskode "Aktiviteter i
    idrettslag og -klubber". Ingreso operativo bastante menor (NOK ~44M en 2025) — probablemente
    una sociedad comercial/de marketing paralela, no el perímetro completo del club.
- **Canal**: Regnskapsregisteret, descarga directa
  `https://data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/<orgnr>/<año>`.

## Qué se bajó (sesión 2026-09-17)

`Clubes/Noruega/Molde/`, **ambas entidades con serie COMPLETA de 18 ejercicios, 2008-2025, sin
huecos**:

- `aarsregnskap-fotballklubb-fli-2008.pdf` a `...-2025.pdf` (la FLI, el club).
- `aarsregnskap-molde-fotball-as-2008.pdf` a `...-2025.pdf` (la AS, comercial).

Todos ejercicio calendario. Escaneos sin capa de texto.

## Dudas / pendientes

- **¿Qué actividad concentra "Molde Fotball AS"?**: dado que su ingreso es bastante menor al de la
  FLI (que es la que parece llevar el peso real del club, jugadores incluidos), conviene abrir un
  ejercicio de cada una (post-OCR) para entender la relación exacta entre las dos antes de decidir
  cuál cargar como "el club" en el sitio (probablemente la FLI, pero falta confirmar si la AS es
  irrelevante o si conviene sumarlas).

- Último chequeo: 2026-09-17.

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 3 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas 2022-2023; `wf-src-*`: 2 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
