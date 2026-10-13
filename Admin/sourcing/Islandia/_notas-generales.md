# Notas generales — Islandia

**País nuevo del sourcing del 2026-10-08.**

## Canal: el sitio oficial de cada club (no hay registro abierto probado)

- Los clubes islandeses son asociaciones multideportivas con un *knattspyrnudeild* (departamento de fútbol) que presenta su propio **ársreikningur** a la asamblea; muchos lo cuelgan en el sitio del club (Breiðablik, Víkingur, Valur, Fram, KA, HK, Keflavík, Afturelding, Þróttur, Njarðvík, Grótta, ÍR, Selfoss, Þór, Fjölnir, Haukar, Völsungur, ÍA). Series de 2-8 años según el club; muchos de 2022-2025.
- Método: `Firecrawl map` con `search: "ársreikningur"` sobre el dominio (con `includeSubdomains`) y filtrar PDF por nombre; complementado con Exa («<club> knattspyrnudeild ársreikningur pdf»), que además devuelve PDF de OTROS clubes (descartar por dominio).
- **Hay dos niveles por club**: `aðalstjórn` (todo el club, todos los deportes) y `knattspyrnudeild` (solo fútbol); algunos publican también `BUR` (barna- og unglingaráð, fútbol base) y `mfl.` (meistaraflokkur, plantel profesional) por separado (Grótta). Hay que escoger cuál transcribir; para el sitio el relevante es el departamento de fútbol (o mfl. + BUR sumados).
- Otros documentos útiles: las memorias (`ársskýrsla`) y los estados consolidados de la federación (KSÍ publica `ársreikningur samstæðu KSÍ`, no es de club).
- Sin documentos: KR (solo la ársskýrsla 2021 en un CDN que da 403), FH, Stjarnan, Fylkir, ÍBV, Vestri, Leiknir R., Grindavík, Víkingur Ó., Ægir, Þróttur V., Kári. Sus sitios no publican PDF financieros o están detrás de un CDN; pendiente probar Wayback y pedir por mail (KSÍ licencia de clubes exige estados auditados).
