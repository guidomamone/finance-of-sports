# Slavia Praha

- **Deporte**: Fútbol
- **Liga / competencia**: Chance Liga (República Checa, 1ª división)
- **Entidad legal activa**: SK Slavia Praha - fotbal a.s., IČO 63999609, spisová značka B 3541
  vedená u Městského soudu v Praze. Sede: Praha 10, U Slavie 1540/2a.
- **Gotcha de identidad**: el club tiene MUCHAS otras entidades registradas con el nombre "SK Slavia
  Praha" (volejbal, házená/balonmano, floorball, futsal, atletismo, etc. — 21 resultados en total al
  buscar "SK Slavia Praha"), todas hermanas del multideporte pero sin relación con las finanzas del
  fútbol. La correcta es específicamente "SK Slavia Praha - fotbal a.s." (subjektId=706684 en el
  buscador de `or.justice.cz`).
- **Canal**: `or.justice.cz`, Sbírka listin. Ver `_notas-generales.md` para el patrón de descarga
  (curl + cookie-jar por documento).

## Qué se bajó (sesión 2026-09-17)

**28 ejercicios, 1996/97 a 2024/25 — la serie más larga y completa de los 16 clubes**, en
`Clubes/República Checa/Slavia Praha/`, nombrados `SL<número de listina>_<fecha de cierre>.pdf`:

- 1996/97 (`SL05`), 1997 (`SL08`), 1998 (`SL14`/`SL15`, dos depósitos del mismo cierre), 1999/2000
  transición (`SL19`), 2000/01 (`SL29`), 2001/02 (`SL37`), 2002/03 (`SL43`/`SL44`, dos depósitos),
  2003/04 (`SL47`), 2004/05 (`SL54`), 2005/06 (`SL55`), 2006/07 (`SL68`), 2007/08 (`SL77`), 2008/09
  (`SL78`), 2009/10 (`SL82`), 2010/11 (`SL92`), 2011/12 — tres depósitos parciales del mismo cierre
  30.6.2017 (`SL96` rozvaha, `SL97` completo, `SL98` otro parcial), 2012/13 (`SL105`), 2013/14
  (`SL108`), 2014/15 hasta 31.12.2020 — transición larga (`SL112`), 2021 (`SL113`), 2022 — dos
  depósitos (`SL120`, `SL125`), 2023 (`SL126`), y el ejercicio más reciente, un período de
  TRANSICIÓN de 18 meses del 1.1.2024 al 30.6.2025 (`SL139`, "VZ_SKS_30.06.2025 signed FINAL.pdf").
- El club cambió el cierre de ejercicio de diciembre a junio-junio en algún punto entre 2010 y 2019,
  con al menos dos transiciones (2019/20 y 2024/25) que cubren más o menos de 12 meses — confirmar
  las fechas exactas de cada PDF antes de mapear a `slaviaRevenueLinesByYear`.

## Verificación hecha en esta sesión

Los 28 PDF confirmados con `file`/`pdfinfo` como `PDF document` real, con capa de texto nativa
(cero OCR necesario). Tamaños entre 1 KB (dos réplicas fallidas descartadas y re-bajadas bien) y 24
MB. El primer intento de descarga (vía Browser pane con `fetch()+Blob+<a download>`) tuvo 3
documentos que fallaron en silencio por expiración del token de descarga — resueltos con el patrón
curl+cookie-jar puro descripto en `_notas-generales.md`, sin depender del navegador.

## Dudas / pendientes

- Los dos depósitos duplicados de un mismo ejercicio (1998: `SL14`/`SL15`; 2002/03: `SL43`/`SL44`;
  2022: `SL120`/`SL125`) no se abrieron para confirmar si son idénticos o si uno es una corrección —
  candidato para `dudas-por-club.md` si se llega a cargar alguno de estos ejercicios.
- El período de transición 1.7.2019-31.12.2020 (`SL112`, 18 meses) y el más reciente 1.1.2024-
  30.6.2025 (`SL139`) van a necesitar un criterio de cómo prorratear o presentar un ejercicio de más
  de 12 meses — ver `club-data-mapping/SKILL.md` antes de cargar.

- Último chequeo: 2026-09-17.
