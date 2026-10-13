# Polissya (Zhytomyr)

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: КОМУНАЛЬНЕ ПІДПРИЄМСТВО "ФУТБОЛЬНИЙ КЛУБ "ПОЛІССЯ" ЖИТОМИРСЬКОЇ
  МІСЬКОЇ РАДИ (Municipal Enterprise "Football Club Polissya" of the Zhytomyr City Council),
  EDRPOU 40372249 — es una empresa COMUNAL/municipal, propiedad del ayuntamiento de Zhytomyr, no
  una sociedad privada. Ojo: existe una segunda entidad con nombre parecido, ФУТБОЛЬНИЙ КЛУБ
  "ПОЛІССЯ" (EDRPOU 44547377) — no se confirmó la relación exacta entre ambas (¿la profesional vs.
  la comunal histórica?), ver duda abajo.
- **Canal**: sitio oficial del club, `polissyafc.com/klub/zvitnist` — la serie más profunda
  encontrada en el país, con documentos alojados en Google Drive (2016-2024) y en SharePoint/
  OneDrive corporativo (`bgvgm-my.sharepoint.com`, para 2025) en vez del dominio propio. Mismo
  criterio que otros países con hosting externo enlazado desde el sitio oficial (Ecuador,
  Deportivo Cuenca) — es igual de "fuente oficial" porque el LINK está en el sitio del club, aunque
  el archivo viva en otro dominio.

## Qué se bajó (sesión 2026-09-18)

**Serie de 9 ejercicios (2016-2024), la más profunda del país.** `Clubes/Ucrania/Polissya/`:

- 2024: `polissya-balance-2024.pdf`, `polissya-auditor-2024.pdf`, `polissya-patrimonio-2024.pdf`,
  `polissya-flujo-caja-2024.pdf`, `polissya-resultados-2024.pdf` (paquete completo, 5 estados).
- 2023: mismo paquete completo de 5 documentos (`polissya-*-2023.pdf`).
- 2022: balance, auditor, flujo de caja, resultados (4 documentos, sin patrimonio separado) +
  pagos a agentes.
- 2021: paquete completo (balance, resultados, patrimonio, flujo, auditor) + declaración fiscal +
  pagos a agentes/club (8 documentos).
- 2020: financiero combinado + dictamen de auditor (2 documentos).
- 2019: declaración fiscal + dictamen de auditor.
- 2018 y 2017: solo declaración fiscal cada uno (sin balance/resultados propios identificados por
  separado).
- 2017-2019 (combinado): un PDF único con estados financieros de los 3 años juntos.
- 2016: financiero combinado (1 documento).

28 archivos en total. **No se bajó** el paquete completo de 2025 (recién subido a SharePoint,
enlaces con token de acceso que puede expirar — están listados en `_notas-generales.md`/arriba con
sus URLs originales de `bgvgm-my.sharepoint.com` si se quiere completar en una sesión futura, no se
intentó la descarga por las dudas de que el token caduque para links compartidos así).

## Verificación hecha en esta sesión

Los 28 archivos descargados vía Google Drive (`uc?export=download&id=...`) dieron HTTP 200 con
tamaños entre 85 KB y 9,2 MB — confirmados como PDF reales con `file` (versión 1.4, con número de
páginas legible) en una muestra de 4 archivos, sin ninguna página de advertencia de virus de Google
Drive de por medio.

## Dudas / pendientes

- **Relación entre las dos entidades EDRPOU (40372249 comunal vs. 44547377)** no confirmada — antes
  de cargar los datos al sitio, confirmar cuál de las dos corresponde a los PDF descargados (los
  títulos de los documentos no siempre incluyen el EDRPOU). Candidata a `dudas-por-club.md` si
  `club-data-mapping` no lo puede inferir de los PDF mismos.
- El paquete de 2025 en SharePoint no se descargó (ver arriba) — pendiente para la sesión de
  onboarding de datos si Guido quiere el ejercicio más reciente también.

- Último chequeo: 2026-09-18.
