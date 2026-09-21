# AGF (Aarhus Gymnastikforening)

- **Deporte**: Fútbol
- **Liga / competencia**: Superliga (Dinamarca, 1ª división)
- **Entidad legal**: AGF A/S (CVR 83 83 99 10), Terp Skovvej 18A, 8260 Viby J. **Gotcha de
  identidad**: la misma sociedad figuraba como **"Aarhus Elite A/S"** en los ejercicios hasta
  2018/19 al menos (confirmado leyendo el propio PDF 2015/16, mismo CVR) — se renombró a "AGF A/S"
  para el ejercicio 2019/20. Serie continua y correcta, mismo patrón que Club Brugge/"De Klokke" en
  Bélgica.
- **Canal**: `distribution.virk.dk` (API pública de la Erhvervsstyrelsen). Ver
  `fuentes/Dinamarca/_notas-generales.md` para el mecanismo completo.

## Qué se bajó (sesión 2026-09-17)

**30 ejercicios, serie COMPLETA 1995-2025/26**, `Clubes/Dinamarca/AGF/`:

- Calendario (ene-dic) 1995 a 2001 — `aarsrapport-1995-12-31.tif` a `aarsrapport-2001-12-31.tif`
  (escaneos sin capa de texto).
- Fiscal julio-junio desde 2002/03 (`aarsrapport-2003-06-30.tif`) hasta 2024/25
  (`aarsrapport-2025-06-30.xhtml`) — sin ningún hueco.
- Formatos: `.tif` hasta 2013, `.pdf` con capa de texto real 2014-2021, `.xhtml` (ESEF/iXBRL) desde
  2022 en adelante.

## Verificación hecha en esta sesión

CVR 83 83 99 10 confirmado dentro del propio PDF 2015/16 ("Aarhus Elite A/S ... CVR-nr.: 83 83 99
10"). Dirección y forma societaria (Aktieselskab) cruzadas con `cvrapi.dk`.

## Dudas / pendientes

Ninguna bloqueante. No se confirmó la fecha exacta del cambio de nombre "Aarhus Elite A/S" → "AGF
A/S" (entre 2015/16 y 2019/20) — no es necesario para el sourcing, solo para una nota al cargar los
datos.

- Último chequeo: 2026-09-17.
