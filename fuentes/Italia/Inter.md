# Inter (FC Internazionale Milano)

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: F.C. Internazionale Milano S.p.A. (Gruppo FC Inter), dueño desde mayo 2024:
  Oaktree Capital Management (ejecutó la prenda sobre las acciones de Suning/Grand Tower tras el
  default de la deuda). El club NO cotiza directo, pero SÍ publica estados financieros completos
  porque **una subsidiaria del grupo, Inter Media and Communication S.p.A., emitió bonos** (Senior
  Secured Notes) que cotizan y la obligan a disclosure — mismo patrón "vehículo de deuda cotizante"
  que abre la puerta a las cuentas del club entero.
- **Canal**: sección propia `inter.it/en/club/investor-relations`, gratis, sin login. Publica DOS
  perímetros distintos que no hay que confundir: "Inter Media and Communication S.p.A." (el emisor
  del bono, un vehículo de derechos de media/sponsor, NO el club entero) e "FC Inter Group" /
  "Gruppo FC Inter" (el grupo consolidado completo, lo que corresponde cargar al sitio).

## Qué se bajó (sesión 2026-09-17)

**5 ejercicios del perímetro "FC Inter Group" (consolidado completo)**, en `Clubes/Italia/Inter/`:
FY2019/20, FY2021/22, FY2022/23, FY2023/24 y FY2024/25 —
`Inter-fascicolo-bilancio-consolidato-<ejercicio>.pdf`.

- **FY2019/20 se recuperó de Wayback Machine**: la URL original (`static.inter.it/media/downloads/...`)
  ya no resuelve — el subdominio `static.inter.it` fue dado de baja. `curl` a esa URL da
  `Could not resolve host`. Snapshot de Wayback del 2022-01-23 sirvió el PDF completo (4,6 MB,
  `pdfinfo` OK).
- **FY2020/21 NO se encontró como "FC Inter Group" completo** — el selector de esa temporada solo
  ofrece el reporte de "Inter Media and Communication S.p.A." (el vehículo de deuda, no el club
  entero) más un "Management Report" suelto sin los estados contables completos. No se cargó nada de
  ese ejercicio para no mezclar perímetros.
- **FY2017/18 y FY2018/19 tampoco tienen "FC Inter Group"**: solo existe el reporte de Inter Media
  (perímetro distinto, ver arriba) — mismo criterio, no se bajaron.

## Verificación hecha en esta sesión

5 PDF confirmados `PDF document` real, entre 4,7 MB y 24,7 MB. Sin truncamientos.

## Dudas / pendientes

Confirmar con Guido si el perímetro "Inter Media and Communication S.p.A." (que SÍ tiene serie
ininterrumpida 2017-2025, con textos íntegros en inglés y cero necesidad de OCR) vale la pena cargar
como dato complementario o directamente descartarlo por no ser el club entero — candidato para
`dudas-por-club.md`.

- Último chequeo: 2026-09-17.
