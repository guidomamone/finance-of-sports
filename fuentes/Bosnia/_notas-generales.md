# Bosnia y Herzegovina — notas generales (sourcing de la Premijer Liga, sesión 2026-10-03)

## Canal: sitio del club (licencia del NSBiH), no el registro
La licencia del Nogometni/Fudbalski savez BiH obliga a publicar en el sitio del club el formulario "Klupske finansijske informacije" con el dictamen del revisor, cada año hacia mayo (la prensa lo anuncia como "X objavio finansijski izvještaj"). Los clubes grandes suben además el informe completo.
- **Željezničar y Borac** publican informe completo + dictamen; **Sarajevo** (consolidado + individual), **Zrinjski** y **Velež** solo la plantilla de licencia (10-13 pág., escaneada). Todos con mediateca WordPress (`wp-json/wp/v2/media`) salvo Sarajevo (Nuxt/estático) y Borac nuevo (Webflow, 2026).
- Los sitios viejos se pierden al rediseñarse: Borac 2019-2024 y Sarajevo 2019-2023 salieron del Wayback CDX (`fkborac.net`, `fksarajevo.ba/static/articles/images`).
- Registro por entidad (FBiH / Republika Srpska, "APIF"/registro de la RS): **no se probó**; el canal del club ya da 5+ ejercicios en 4 de 5 clubes.
- Idioma OCR: `bos` (latino) o `hrv`; los escaneos de la plantilla de licencia tienen mucho ruido.

## Estado
Ver `fuentes/_indice/Bosnia.md`.

## Propuesta de texto para `paises/Bosnia.md`
Premijer Liga BiH: canal = sitio del club, sección financiera obligatoria por licencia NSBiH (informe de mayo de cada año). Si el sitio viejo desapareció, Wayback CDX del dominio `media.<club>.ba` / `/wp-content/uploads/`. El revisor es a menudo Recons (Sarajevo) o Aditon (Banja Luka).
