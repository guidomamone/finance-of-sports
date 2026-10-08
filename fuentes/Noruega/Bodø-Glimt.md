# FK Bodø/Glimt

- **Deporte**: Fútbol
- **Liga / competencia**: Eliteserien (Noruega, 1ª división)
- **Entidad legal**: FK BODØ-GLIMT, org.nr. 970 189 815, forma jurídica **FLI**
  (Forening/lag/innretning) — sin AS separada para el fútbol profesional, mismo patrón que
  Rosenborg/Brann/Molde/Viking/Start/Tromsø. Fundado 1916-09-16, Bodø. **"GLIMT AS"** (org.nr.
  922735654) es una entidad homónima sin relación real: fundada en 2019, næringskode de comercio
  minorista, con ingresos de apenas ~NOK 308.000 en 2024 — no es la sociedad del club, descartada.
- **Canal**: Regnskapsregisteret (Brønnøysundregistrene), vía descarga directa
  `https://data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/970189815/<año>`. Ver
  `fuentes/Noruega/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-17)

**13 ejercicios**, `Clubes/Noruega/Bodø-Glimt/`: `aarsregnskap-2008.pdf` a `aarsregnskap-2017.pdf`
(10 años seguidos) + `aarsregnskap-2023.pdf`, `aarsregnskap-2024.pdf`, `aarsregnskap-2025.pdf`.

**Hueco real de 5 ejercicios, 2018-2022** — confirmado con reintentos individuales (no es un fallo
transitorio del script ni del servidor, cada año devuelve 404 limpio). Llamativo porque es
justamente el período del ascenso y primeros títulos del club (campeón Eliteserien 2020 y 2021) —
no se encontró ninguna explicación en esta sesión (no hay entidad alternativa que absorba esos años:
"Glimt AS" es una sociedad de retail sin relación, ver arriba).

Todos ejercicio calendario. Escaneos sin capa de texto.

## Dudas / pendientes

- **¿Por qué falta 2018-2022 en Regnskapsregisteret?**: candidato fuerte para `dudas-por-club.md` —
  vale la pena escribirle al club para confirmar si esos ejercicios se depositaron bajo otra entidad,
  o si hubo alguna dispensa/atraso de presentación durante esos años.

- Último chequeo: 2026-09-17.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: registro Brønnøysund: agotado (ambas entidades revisadas año por año 2008-2025) · barrido: 2 (Sonnet) — 2026-10-08

- Cerrado el hueco 2018-2022 de la sesión anterior: la entidad **922735654** tiene depósitos 2019, 2020, 2021 y 2022 (`aarsregnskap-2019..2022.pdf`, 8/10/6/6 págs.). La entidad 970189815 solo llega hasta 2017 y reaparece en 2023-2025.
- **Solo falta 2018**: no está en ninguna de las dos entidades (404 en `kopi/<orgnr>/2018`). Serie 2008-2025 completa salvo 2018.
- Ojo al cargar: el cambio de entidad en 2019 es un cambio de perímetro (ver la duda en `Admin/dudas-por-club.md`).

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 3 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas 2022-2023, 2024-2025; `wf-src-*`: 1 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
