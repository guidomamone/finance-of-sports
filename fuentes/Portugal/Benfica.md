# Benfica (SL Benfica)

- **Deporte**: Fútbol
- **Liga / competencia**: Primeira Liga (Portugal, 1ª división)
- **Entidad legal**: Sport Lisboa e Benfica – Futebol, SAD, una de los "3 grandes" y una de las
  únicas SAD portuguesas que **cotiza** en Euronext Lisbon — mismo patrón "holding/sociedad
  cotizante" ya visto en el proyecto (Juventus, Manchester United, Ajax), acá directo la sociedad
  del club.
- **Canal**: sección propia de Investor Relations / "Prestação de Contas Anuais"
  (`slbenfica.pt/pt-pt/instituicao/sad/prestacao-de-contas/contas-anuais`), gratis, sin login, sin
  captcha — la mejor serie histórica encontrada en todo el país.

## Qué se bajó (sesión 2026-09-17)

**21 ejercicios, 2005/06 a 2025/26, con un solo hueco (2010/11)**, en
`Clubes/Portugal/Benfica/`:

- `relatorio-contas-2005-06.pdf` a `relatorio-contas-2025-26.pdf` (nombre por ejercicio).
- Para los ejercicios donde el sitio publica DOS versiones (la comunicada a CMVM antes de la
  Asamblea y la versión "após aprovação em Assembleia Geral"), se bajaron ambas cuando estaban
  disponibles, con sufijo `-pos-AG` en la versión posterior (ej. `relatorio-contas-2022-23.pdf` +
  `relatorio-contas-2022-23-pos-AG.pdf`).
- Además se bajaron 3 "Prestação de Contas Anuais" sueltas de 2009-2010
  (`prestacao-contas-2009-11-03.pdf`, `prestacao-contas-2010-11-11.pdf`,
  `prestacao-contas-2010-12-06.pdf` — las dos últimas son el mismo documento, dos fechas de
  comunicado) que cubren el ejercicio 2009/10.

**Hueco real, no de búsqueda**: no hay ningún depósito para el ejercicio **2010/11** en la propia
sección de Contas Anuais del sitio — el índice salta de las "Prestação de Contas Anuais" de
2009/10 (nov-dic 2010) directo a "31-10-2012 Relatório e Contas... 2011/2012". No se encontró
ningún lead alternativo en la sesión.

## Verificación hecha en esta sesión

Todos los PDF confirmados con `file`/`pdfinfo` como documentos PDF reales (no HTML de error), entre
~1,3 MB (2006/07) y ~33 MB (2016/17 pos-AG). El más reciente, `relatorio-contas-2025-26.pdf`
(fechado 2026-09-08, ejercicio cerrado el 30-06-2026), vive en una ruta de CDN sin extensión `.pdf`
en la URL (`.../pdf/instituicao/.../Relatorio_Benfica_SAD_25-26`, sin `.pdf` al final) — Content-Type
`application/pdf` confirmado.

- **Gotcha de descarga**: `media.slbenfica.pt` devuelve **HTTP 599** a un `curl` sin `Referer` —
  hace falta mandar `-e "https://www.slbenfica.pt/pt-pt/instituicao/sad/prestacao-de-contas/contas-anuais"`
  para que sirva el PDF (200 OK). Sin headers especiales de otro tipo.

## Dudas / pendientes

Ninguna sobre el canal en sí. Si se retoma, confirmar si el hueco de 2010/11 existe en CMVM aunque
no esté en el sitio propio del club.

- Último chequeo: 2026-09-17.
