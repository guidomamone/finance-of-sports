# LaLiga — Liga Nacional de Fútbol Profesional (`es-laliga`, `es-segunda`)

**Ángulos**: sitio oficial: agotado (laliga.com/transparencia/gestion-economica/cuentas-anuales, cuentas de la LNFP y del grupo con
informe del auditor) · regulador/país: no intentado (no hizo falta) · barrido: 1 (Opus, sesión) — 2026-10-18

- Canal: `https://www.laliga.com/transparencia/gestion-economica/cuentas-anuales`. Los links salen del HTML renderizado (con `curl` la
  página no trae ningún `.pdf`: hay que leerla en el navegador). Cierre 30 de junio.
- Cada temporada hay dos juegos (LNFP sola y LNFP con sociedades dependientes), cada uno en dos versiones: un escaneo (Aspose, 145
  páginas) y una **cartera PDF** (Adobe Portfolio) con dos adjuntos digitales, las cuentas firmadas y el informe del auditor. Los adjuntos
  se sacan con `pdfdetach -saveall`. Conviene la cartera.
- 2024-25, grupo: cartera `https://assets.laliga.com/assets/2025/12/01/originals/c76ce11041f81526293dfa6e60aa46dc.pdf` →
  `Ligas/España/LaLiga/` (cartera, cuentas consolidadas de 137 páginas e informe de 9 páginas, con sus `.md`). Auditor: Netadia
  Europa, S.L.P., por encargo del Consejo Superior de Deportes; opinión sin salvedades, sin incertidumbre de continuidad.
- También está la 2023-24 (mismas dos formas) y otras temporadas más viejas en la misma página; además, las cuentas de LALIGA Group
  International, S.L. (la sociedad con CVC), que no es la entidad que organiza la liga.
