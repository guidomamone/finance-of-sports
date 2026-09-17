# AC Milan

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división)
- **Entidad legal**: Associazione Calcio Milan S.p.A., propiedad de RedBird Capital Partners desde
  2022. No cotiza, pero publica voluntariamente una serie completa en su propio sitio.
- **Canal**: `acmilan.com/it/club/informazioni-finanziarie` ("Bilanci e Relazioni"), gratis, sin
  login. Los PDF están hospedados en un CDN de contenido (`assets-eu-01.kc-usercontent.com`), no en
  el dominio propio, pero el link sale del sitio oficial del club.

## Qué se bajó (sesión 2026-09-17)

**8 ejercicios, serie COMPLETA 2017/18-2024/25 sin huecos**, en `Clubes/Italia/AC Milan/`:
`AC-Milan-bilanci-relazioni-<ejercicio>.pdf` para cada temporada.

- **Gotcha de la página**: el acordeón "BILANCI E RELAZIONI" lista 8 años pero el HTML solo trae 2
  `<a href>` visibles a simple vista — los otros 6 están en el DOM pero no se ven hasta expandir el
  acordeón (o inspeccionarlo directo con JS: `document.querySelectorAll('a[href*=".pdf"]')` los trae
  a todos igual, sin necesidad de clickear cada año).

## Verificación hecha en esta sesión

8 PDF confirmados `PDF document` real, entre 2,5 MB y 16,8 MB.

## Dudas / pendientes

Ninguna. Serie completa desde que el club existe como S.p.A. bajo RedBird (y antes, con Elliott
Management) — no hay ejercicios anteriores a 2017/18 publicados en este canal.

- Último chequeo: 2026-09-17.
