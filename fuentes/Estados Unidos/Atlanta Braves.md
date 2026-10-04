# Atlanta Braves

**Ángulos**: sitio oficial: no aplica (el emisor es la holding, no el club) · regulador/país: agotado (SEC EDGAR: los 3 10-K de la holding que existen desde la escisión de jul-2023 + 10-K de Liberty Media FY2019 y FY2022 para la etapa "Braves Group") · Wayback CDX: no aplica · búsqueda web: no hizo falta · barrido: 2 (Sonnet) — 2026-10-03

- **Actualización 2026-10-03 (sourcing Norteamérica): 4 ejercicios con estados propios (FY2022-FY2025) +
  la serie anterior vía Liberty Media.** Se bajaron (HTML con texto, sin OCR):
  - `atlanta-braves-holdings-10k-2023.htm` — 10-K FY2023 (accession `0001558370-24-002078`, 2024-02-29).
    OJO: la holding es "smaller reporting company" y este 10-K trae solo 2 años de estado de resultados
    (2023 y 2022), así que NO agrega un año nuevo; sí el balance al 31/12/2022 y la cifra original de 2023.
    Con los 10-K de 2024 y 2025, quedan cubiertos FY2022 a FY2025 con estados propios.
  - `liberty-media-10k-fy2022-braves-group.htm` y `liberty-media-10k-fy2019-braves-group.htm` — 10-K de
    **Liberty Media Corp** (CIK 1560385), accessions `0001558370-23-002514` y `0001558370-20-001494`.
    Hasta la escisión (jul-2023) el club era el "Braves Group" (tracking stock `BATRA`/`BATRK`) dentro de
    Liberty, y esos 10-K traen resultados y balance atribuidos al Braves Group para 2020-2022 (el de
    FY2022) y 2017-2019 (el de FY2019). **No se leyó en detalle qué tablas trae cada uno** (se confirmó que
    describen al Braves Group y su perímetro, no se extrajeron cifras): la sesión de mapeo tiene que ver
    si es información atribuida no auditada por grupo o segmentos del consolidado. Si se carga, los
    ejercicios 2017-2021 llegarían por ahí → 9 ejercicios posibles (2017-2025).

- **Deporte**: Béisbol
- **Liga / competencia**: MLB (Major League Baseball, Estados Unidos y Canadá) — División Este de la Liga Nacional
- **Entidad legal**: **Atlanta Braves Holdings, Inc.** (Nasdaq `BATRA`/`BATRK`) — CIK de la SEC
  **0001958140**. Presenta formulario **10-K** anual auditado.
- **Canal**: SEC EDGAR. Procedimiento en `fuentes/Estados Unidos/_notas-generales.md`.

## Por qué este es el mejor caso estadounidense del proyecto

A diferencia de MSG Sports (que mezcla dos clubes de dos deportes) y de Ollamani en México (que mezcla
el club con el estadio y con negocios que no son deporte), Atlanta Braves Holdings es una compañía
que se escindió de Liberty Media en 2023 **para ser exactamente esto**: el club de béisbol y su
desarrollo inmobiliario asociado. Es el perímetro más limpio de los tres casos bursátiles del
proyecto.

**Matiz igual**: la compañía reporta dos segmentos, el de béisbol y el de "mixed-use development"
(The Battery Atlanta, el complejo comercial pegado al estadio). Al cargar hay que decidir si se toma
el consolidado o solo el segmento de béisbol, y decirlo. Anotado en `dudas-por-club.md`.

## Qué se bajó (sesión 2026-09-13)

- `Clubes/Estados Unidos/Atlanta Braves/atlanta-braves-holdings-10k-2025.htm` — 10-K del ejercicio
  **1/1/2025 al 31/12/2025**, presentado el 26/2/2026. 2,9 MB de HTML, con capa de texto (sin OCR).
- `Clubes/Estados Unidos/Atlanta Braves/atlanta-braves-holdings-10k-2024.htm` — ejercicio 2024.

El ejercicio es el año calendario, que en béisbol coincide casi exacto con la temporada
(marzo-octubre) — no hay ejercicio a caballo de dos temporadas, a diferencia del fútbol europeo.

## Cifra de control ya verificada (leída del propio documento)

`Total revenue $ 732.492` (miles de USD) en el ejercicio 2025 — **USD 732,5 M**.

**Normativa contable**: US GAAP.

## Serie disponible sin bajar

**3 ejercicios de 10-K** (2023, 2024 y 2025) — la compañía existe como emisora separada recién desde
la escisión de 2023, así que esa es la serie completa, no un recorte.

- Último chequeo: 2026-09-13.
