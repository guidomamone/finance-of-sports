# Galatasaray

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: Galatasaray Sportif Sınai ve Ticari Yatırımlar A.Ş., cotizante en Borsa
  İstanbul (ticker GSRAY) — el club-asociación (dernek) es dueño mayoritario de la sociedad que
  cotiza, un esquema poco común: un club de socios que cotiza en bolsa DIRECTAMENTE, sin holding
  intermedia. Ejercicio fiscal 01/06-31/05.
- **Canal principal**: **KAP** (Kamuyu Aydınlatma Platformu, `kap.org.tr`) — el equivalente turco a
  EDGAR/HKEXnews. Sujeto a disclosure obligatorio por ser emisor de valores. Confirmado como el
  mejor canal individual de todo el país (ver sección 0 y nota general de Turquía).
- **Canal secundario/backup**: sitio propio en `galatasaray.blob.core.windows.net/files/...` (Azure
  Blob Storage propio) — aloja los mismos "konsolide rapor" (informe consolidado, = bilanço +
  estado de resultados + notas + dictamen de auditoría) y además "Faaliyet Raporu" (informes de
  actividad trimestrales/semestrales del directorio, con datos financieros pero no el juego
  completo de estados). Útil como fuente alternativa si KAP no es navegable (ver nota de la sesión
  sobre el browser tool caído). Ejemplos vistos: `.../files/sportif2017/Sportif/2014/31.05.2014
  Sportif/GS Sportif Konsolide Rapor 31 05 2014 FINAL IMZALI.pdf`,
  `.../files/2025-resmi/GS Sportif 31.05.2025_konsolide rapor.pdf`. Sin explorar en profundidad
  esta sesión porque KAP ya cubría la serie completa.

## Qué se bajó (sesión 2026-09-18, continuación de intento previo cortado por rate-limit)

**13 ejercicios, serie completa 2012/13-2024/25**, en `Clubes/Turquía/Galatasaray/`:
`galatasaray-sportif-bilanco-31-05-2013.pdf` a `...-31-05-2025.pdf` (uno por año). Descargados de
KAP en una sesión anterior (no de esta). Verificados en esta sesión con `file`/`pdfinfo`: los 13
son PDF válidos, sin corrupción (el chequeo de integridad que introdujo esta sesión, ver nota
general de Turquía, no encontró ningún problema acá — a diferencia de Fenerbahçe/Trabzonspor).

No se re-navegó KAP para esta entidad en esta sesión (el browser tool estuvo caído toda la sesión,
ver nota general) porque la serie ya estaba completa 2013-2025 de la sesión anterior.

## Dudas / pendientes

- Ninguna. Serie completa. Si en el futuro hace falta un backup o un chequeo cruzado, usar
  `galatasaray.blob.core.windows.net` (ver arriba).
- Último chequeo: 2026-09-18.
