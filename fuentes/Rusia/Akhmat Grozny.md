# Akhmat Grozny

- **Deporte**: Fútbol
- **Liga / competencia**: Российская Премьер-Лига (Rusia, 1ª división)
- **Entidad legal activa**: АНО РФК "Ахмат" (Автономная некоммерческая организация
  "Республиканский футбольный клуб "Ахмат"), ИНН 2020002521, ОГРН 1022002145989, КПП 201401001,
  registrada 2000-08-15. Sede: Грозный, ул. им. С.Ш. Лорсанова, д. 3. No confundir con АНО ХК
  "Ахмат" (ИНН 2014040141, hockey club, entidad distinta) ni con АНО "Конно-спортивный клуб Ахмат"
  (equitación).
- **Canal**: `bo.nalog.gov.ru`, ver `_notas-generales.md`. Ficha:
  `https://bo.nalog.gov.ru/organizations-card/430438`.

## Qué se bajó (sesión 2026-09-17/18)

**Solo 1 documento en 5 años consultados: las notas explicativas de 2025.** El listado
`/nbo/organizations/430438/bfo/` SÍ tiene un registro para cada año 2021-2025 (con `requiredAz:
true` los 5 años — la ley le exige dictamen de auditor), pero **NINGÚN año tiene el dictamen de
auditor cargado** (`hasAz: false` los 5 años, HTTP 400 al pedir `/download/audit/<id>` en los 5).
Las notas explicativas también fallan HTTP 400 en 2021-2024, solo 2025 tiene el PDF real.
`Clubes/Rusia/Akhmat Grozny/`:

- `2025-poyasneniya.pdf`

Los datos estructurados del balance/estado de resultados SÍ existen para los 5 años (visibles en
`https://bo.nalog.gov.ru/organizations-card/430438`), solo que sin PDF de auditor ni de notas
respaldándolos en 2021-2024.

## Verificación hecha en esta sesión

El único PDF descargado confirmado `PDF document` real vía `pdfinfo` (372 KB).

**CORRECCIÓN (2026-09-24, sesión de transcripción, Versión 214): `2025-poyasneniya.pdf` NO son las
notas explicativas de Akhmat, es la PLANTILLA LEGAL EN BLANCO** ("Приложение № 8 к ФСБУ 4/2023",
generada desde la base de datos legal KonsultantPlus) del formulario de notas al balance — ningún
valor cargado, ningún dato del club. Transcripción completa en
`Clubes/Rusia/Akhmat Grozny/2025-poyasneniya.md` confirma que las 21 páginas son el formulario
modelo, no el documento real de 2025. **Efecto: Akhmat Grozny sigue sin ningún documento real
descargado**, ni auditor ni notas — hay que volver a `bo.nalog.gov.ru` a confirmar si el archivo
correcto está en otro endpoint/nombre, o si el portal en verdad no tiene más que la plantilla para
este club en 2025.

## Dudas / pendientes

- **Candidato fuerte para `dudas-por-club.md`**: el club está legalmente obligado (`requiredAz:
  true`) a depositar el dictamen de su auditor externo ante el depósito estatal ФНС todos los años,
  pero nunca lo hizo en los 5 ejercicios 2021-2025 disponibles — a diferencia de los otros 15
  clubes rusos de esta sesión, que sí tienen al menos algún dictamen. Vale la pena preguntarle al
  club (o buscar si lo publicó por otro canal, ej. su propio sitio) si el dictamen existe y
  simplemente no se subió al registro, o si hay un problema de auditoría real de fondo.

- Último chequeo: 2026-09-18.
