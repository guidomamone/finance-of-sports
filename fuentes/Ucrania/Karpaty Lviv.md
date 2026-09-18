# Karpaty Lviv

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: ТОВ "Футбольний клуб Карпати" (Football Club Karpaty LLC), EDRPOU
  43868103, Львів. Hay una SEGUNDA entidad relacionada, ТОВ "Карпати Арена" (dueña/operadora del
  estadio), cuyos estados financieros el club publica de forma CONSOLIDADA junto con los propios
  cada año (ver abajo) — mismo patrón de "holding/entidad del estadio separada" ya visto en otros
  países (ej. Hamburger SV en Alemania).
- **Canal**: sitio oficial del club, `fckarpaty.org.ua/about/finansova-zvitnist/` — sección
  "Фінансова звітність" con documentos individuales (no consolidados) Y consolidados (Karpaty +
  Karpaty Arena) por separado, más "Витяг" (extracto) de información de fundadores/socios por año.
  100% scripteable por `curl` directo, sin login ni JS.

## Qué se bajó (sesión 2026-09-18)

**Serie de 5 ejercicios (2021-2025), la más profunda encontrada en el país junto con Polissya.**
`Clubes/Ucrania/Karpaty Lviv/`:

- `karpaty-financiero-2021.pdf` — único documento disponible para 2021 (paquete combinado).
- `karpaty-financiero-2022.pdf`, `karpaty-flujo-caja-2022.pdf`, `karpaty-consolidado-2022.pdf`,
  `karpaty-auditor-consolidado-2022.pdf`.
- `karpaty-balance-resultados-2023.pdf`, `karpaty-flujo-caja-2023.pdf`,
  `karpaty-consolidado-2023.pdf`, `karpaty-auditor-consolidado-2023.pdf`.
- `karpaty-balance-resultados-2024.pdf`, `karpaty-flujo-caja-2024.pdf`, `karpaty-auditor-2024.pdf`,
  `karpaty-consolidado-2024.pdf`, `karpaty-auditor-consolidado-2024.pdf`.
- `karpaty-balance-resultados-2025.pdf`, `karpaty-flujo-caja-2025.pdf`, `karpaty-auditor-2025.pdf`,
  `karpaty-consolidado-2025.pdf`, `karpaty-auditor-consolidado-2025.pdf`.

19 PDF en total. No se bajaron los "Витяг" de información de fundadores (no son estados
financieros, son fichas societarias) ni el dictamen de auditor individual (no consolidado) de 2022
y 2023 — están en la misma página del sitio si se quiere completar.

## Verificación hecha en esta sesión

Los 19 archivos descargaron con HTTP 200 y tamaños entre 290 KB y 5,7 MB — consistente con PDF
reales (no se corrió `pdfinfo` uno por uno, pero ninguna descarga fue sospechosamente chica).

## Dudas / pendientes

- El balance/resultados INDIVIDUAL del club (sin Karpaty Arena) para 2024 y 2025 está etiquetado
  igual que el de años previos pero el nombre de archivo sugiere que podría ya incluir el
  consolidado dentro — hay que abrir el PDF para confirmar cuál perímetro (club solo vs. club +
  estadio) usar al cargar los datos, mismo criterio que Hamburger SV en Alemania. No es una
  pregunta para el club, es un paso de mapeo de datos (`club-data-mapping`).

- Último chequeo: 2026-09-18.
