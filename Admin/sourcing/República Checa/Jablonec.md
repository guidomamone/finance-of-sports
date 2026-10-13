# Jablonec

- **Deporte**: Fútbol
- **Liga / competencia**: Chance Liga (República Checa, 1ª división)
- **Entidad legal activa**: Fotbalový Klub Jablonec, a.s., IČO 25023144, spisová značka B 1010
  vedená u Krajského soudu v Ústí nad Labem. Sede: U Stadionu 4904/5, Jablonec nad Nisou.
- **Gotcha de identidad, el más marcado de la sesión**: buscar "FK Jablonec" o "Jablonec" en
  `or.justice.cz` NO devuelve esta entidad — hay que buscar la razón social completa "Fotbalový Klub
  Jablonec" o directo por IČO. Buscando solo "Jablonec" aparecen 33 entidades sin relación (empresas
  inmobiliarias, asociaciones vecinales, etc.) y una "Jablonecký fotbal s.r.o." (IČO 23700254)
  constituida recién el 9.9.2025 — una sociedad nueva sin ninguna Sbírka listin todavía, NO
  confundir con la entidad histórica del club (verificado con WebSearch antes de perder tiempo
  investigándola).
- **Canal**: `or.justice.cz`, Sbírka listin. Ver `_notas-generales.md`.

## Qué se bajó (sesión 2026-09-17)

**31 documentos cubriendo 1997 a 2025**, `Clubes/República Checa/Jablonec/`: 1997 (3 fragmentos),
1998 (3 fragmentos), 1999, 2000, 2001, 2002, 2003, 2004, 2005 (dos depósitos), 2006, 2007 (4
fragmentos), huecos 2008-2012, 2013 (dos depósitos), 2018, 2019, 2021, 2022 (dos depósitos, uno tipo
"předána prostřednictvím správce daně z příjmů"), 2023 (dos depósitos, uno de ellos XML puro), 2024
("předána..."), 2025 ("předána...").

- **El depósito `SL148` (ejercicio 2023, "předána prostřednictvím správce daně z příjmů") es un
  archivo XML/iXBRL puro**, no PDF — corregido a `SL148_2023-predana-spravci-dane.xml` en la carpeta
  del proyecto. Ver nota en `_notas-generales.md` sobre el `.gitignore`.
- **Huecos grandes reales**: 2008-2012 y 2014-2017 — no se investigó la causa.

## Verificación hecha en esta sesión

30 de los 31 archivos confirmados `PDF document` real; el restante (`SL148`) confirmado XML con
`file`. Tamaños entre 13 KB (el XML) y 3,2 MB.

## Dudas / pendientes

- Por qué hay dos huecos de varios años cada uno (2008-2012, 2014-2017) en una entidad que sí
  deposita de forma regular en el resto de la serie — candidato para `dudas-por-club.md` si se carga
  este club.
- Confirmar qué contienen exactamente los dos nuevos tipos de depósito "předána prostřednictvím
  správce daně z příjmů" (2022, 2023, 2024, 2025) antes de mapear — por el nombre parecen ser
  transmisiones automáticas vía la agencia tributaria en vez de un depósito manual, y el de 2023 es
  XML puro sin PDF legible directo.

- Último chequeo: 2026-09-17.
