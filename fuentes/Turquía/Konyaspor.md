# Konyaspor

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: club-asociación (dernek), no cotiza en bolsa.
- **Canal**: sitio propio, con una página "Mali Tablolar" confirmada por búsqueda (mencionada en
  noticias del propio sitio como conteniendo "Lisans için başvuran kulübün denetçi raporu, TFF
  Bilanço, TFF Gelir Tablosu, TFF Nakit Akım Tablosu, UEFA Bilanço, UEFA Gelir Tablosu, UEFA Nakit
  Akım Tablosu" — mismo patrón de documentos que Alanyaspor). La URL exacta no es estable: se
  encontraron dos rutas de noticia distintas para la "misma" página
  (`konyaspor.org.tr/Haber/mali-tablolar/6751` y `.../9168`, ambos 404 al intentar `curl`/WebFetch
  en esta sesión) — el sitio parece usar el sistema de noticias (`/Haber/<slug>/<id>`) para publicar
  cada actualización de mali tablolar, con un ID nuevo cada vez, no una página fija.

## Qué se bajó (sesión 2026-09-18)

**Nada.** No se pudo acceder a ninguna de las URLs de "mali tablolar" encontradas por búsqueda
(ambas 404 vía `curl` — puede que las noticias hayan sido reemplazadas por una versión más nueva
con otro ID, o que requieran sesión/JS). El browser tool estuvo caído toda la sesión.

## Dudas / pendientes

- **Pendiente, prioridad media-alta**: con browser tool funcionando, entrar a `konyaspor.org.tr` y
  navegar a la sección de Mali Tablolar desde el menú (no adivinar el ID de noticia, que rota) —
  documentar la URL estable si existe una, o el patrón de búsqueda del sitio si no.
- Último chequeo: 2026-09-18.
