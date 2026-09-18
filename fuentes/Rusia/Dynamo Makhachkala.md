# Dynamo Makhachkala

- **Deporte**: Fútbol
- **Liga / competencia**: Российская Премьер-Лига (Rusia, 1ª división)
- **Entidad legal activa**: АНО "Футбольный клуб Динамо" (Автономная некоммерческая организация),
  ИНН 0572023982, ОГРН 1190571008495, КПП 057201001, registrada 2019-06-20. Sede: Махачкала, ул.
  Дахадаева, д. 21А. Confirmada por escala (`gainSum` 2025: ~787.097 miles de ₽, en línea con un
  club recién ascendido) y por el sitio oficial del club (`dinamo-mx.ru`, footer).
- **Historia societaria compleja — 3 entidades descartadas antes de llegar a la correcta**:
  1. ООО "ФК "Динамо-Махачкала" (ИНН 0572006899, desde 2014) — **en proceso de liquidación desde
     2026-01-21** y sin NINGÚN resultado en `bo.nalog.gov.ru` (nunca depositó ahí).
  2. АНО ФК "Легион Динамо" → renombrada АНО ФК "Легион" en 2022 (ИНН 0572013695) — resultó estar
     ahora renombrada otra vez a **АНО ФК "Победа Нижний Новгород"**, con domicilio en Nizhni
     Nóvgorod y `gainSum` de solo 750 miles de ₽ — claramente NO es la entidad del club de
     Makhachkala en la RPL actual, sino que el mismo NIF fue reutilizado/reasignado a otro proyecto
     menor. Descartada.
  3. **АНО "Футбольный клуб Динамо" (ИНН 0572023982)** — la correcta, confirmada por el sitio
     oficial del club y por la escala de sus cifras.
- **Canal**: `bo.nalog.gov.ru`, ver `_notas-generales.md`. Ficha:
  `https://bo.nalog.gov.ru/organizations-card/11061103`.

## Qué se bajó (sesión 2026-09-17/18)

**3 documentos: dictamen de auditor 2024 y 2025, notas explicativas solo 2025.** 2021-2023 no
tienen ningún documento (`requiredAz: false` los 5 años — entidad exenta de auditoría obligatoria
por escala hasta 2024). `Clubes/Rusia/Dynamo Makhachkala/`:

- `2024-auditorskoe-zaklyuchenie.pdf`
- `2025-auditorskoe-zaklyuchenie.pdf` + `2025-poyasneniya.pdf`

## Verificación hecha en esta sesión

Los 3 PDF confirmados `PDF document` real vía `pdfinfo`. Tamaños entre 880 KB y 5,4 MB.

## Dudas / pendientes

- Ninguna sobre el club en sí (la identidad quedó bien confirmada pese al historial societario
  confuso). Vale la pena documentar el patrón para otros clubes rusos con historia de reorganización
  societaria: **un ИНН puede sobrevivir a un cambio de nombre completo del club que originalmente
  representaba** (el caso "Легион Динамо" → "Победа Нижний Новгород" es un cambio de CIUDAD, no
  solo de nombre) — no asumir que el primer candidato con nombre parecido y escala razonable es
  necesariamente el correcto sin cruzar domicilio/escala actual.

- Último chequeo: 2026-09-18.
