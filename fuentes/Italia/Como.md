# Como (Como 1907)

- **Deporte**: Fútbol
- **Liga / competencia**: Serie A (Italia, 1ª división) — ascendido en 2024/25, primera vez en Serie A
  desde 2002/03.
- **Entidad legal**: Como 1907 S.r.l., propiedad de un consorcio indonesio (Mirwan Suwarso, hermanos
  Bakti — SENT Entertainment). No cotiza. Historia societaria muy corta como club de Serie A, así que
  la serie de bilanci empieza recién.
- **Canal**: `comofootball.com/en/documenti-societari/`, gratis, sin login — pero el PDF real no está
  en un `<a href>` normal, está embebido en un visor cuya URL final hay que extraer del HTML servido
  por el framework (Nuxt) del sitio.

## Qué se bajó (sesión 2026-09-17)

**2 ejercicios (3 archivos)**, en `Clubes/Italia/Como/`:
- `Como-fascicolo-bilancio-2024.pdf` (bilancio individual al 30/06/2024)
- `Como-gruppo-pro-forma-consolidamento-2024.pdf` y `Como-gruppo-pro-forma-consolidamento-2025.pdf`
  (prospetto pro-forma de consolidamento del grupo, no un bilancio consolidado en sentido estricto)

- **Gotcha de tooling**: cada documento vive en una página propia
  (`/en/como-1907-fascicolo-bilancio-30-06-2024/`) que muestra un visor de PDF embebido sin ningún
  `<a href=".pdf">` ni `<iframe src=".pdf">` visible en el DOM — el nombre real del archivo está
  escondido en el JSON de estado de Nuxt (`document.documentElement.outerHTML`, buscar
  `footer-link-storage/document/`), y el dominio base (`d251ktlxwvtnkw.cloudfront.net`) hay que
  sacarlo de OTRO recurso de la misma página (ej. las imágenes de sponsors en el footer, que sí usan
  URLs absolutas al mismo CloudFront). Une ambas partes a mano para armar la URL de descarga real.

## Verificación hecha en esta sesión

3 PDF confirmados `PDF document` real, entre 2,4 MB y 7,7 MB.

## Dudas / pendientes

No hay bilancio individual al 30/06/2025 publicado todavía en este canal (solo el pro-forma de
consolidamento) — puede que se publique más adelante en la temporada, retomar en una sesión futura.

- Último chequeo: 2026-09-17.
