# Eslovenia — notas generales (sourcing PrvaLiga, sesión 2026-10-03)

## Canal estatal: AJPES (ajpes.si/jolp, "Javni objavi letnih poročil") — buscador scripteable, pero el DESCARGAR exige captcha: gestión de Guido

- El buscador `https://www.ajpes.si/jolp/rezultati.asp?maticna=&naziv=<nombre>&ulica=&kraj=&davcna=` es un GET abierto y devuelve la
  lista de sociedades con su `maticna` (ej. NK Maribor d.o.o.: `podjetje.asp?maticna=1490494000`; DNK = hinchada: otra entidad).
- Pero la ficha `podjetje.asp?maticna=…` pide **"prepišite kodo za dostop" (transcribir un código captcha) + marcar "Strinjam se s splošnimi
  pogoji"** antes de mostrar los informes (se probó incluso con la sesión "Vstopi kot anonimni uporabnik"). Un captcha no se resuelve desde un
  agente. Los informes de Maribor, Celje, Mura, Radomlje y Primorje solo están ahí. Los servicios "Fi=Po"/bonitete de AJPES son de pago.
- La prensa (Večer, Planet Nogomet, Sobotainfo) cita las cifras de AJPES de cada año (ej.: Maribor 2024 ingresos 10,2 M€, gastos 11,8 M€ / pérdida 1,6 M€; Celje 2024 pérdida 5,1 M€; Mura 2024 pérdida 1,84 M€ sobre ingresos 1,77 M€): sirven para cruzar un total, no como fuente.

## El canal real: sitio de cada club (cuando lo publica) — NZS exige los estados revisados para la licencia
Publican estados auditados en su web: Olimpija, Domžale, Koper, Bravo. Maribor solo publicó un resumen de una página por año (2018-2020). Celje, Mura,
Radomlje y Primorje no tienen nada en su sitio (Radomlje/Primorje: dominio no resuelto desde el entorno; Celje: `nkcelje.si` 502 y `nk-celje.si` sin sección de documentos).
Los informes anuales de la NZS (nzs.si) NO son de los clubes.

## Gotchas
- **Wayback**: las capturas de PDF más viejas (2020-2023) de `nkdomzale.si` vienen truncadas a 1.048.576 B; las capturas de 2024 en adelante están completas. Siempre `curl --compressed`.
- `nkolimpija.si/data/file/…` y las URLs `wp-content/uploads` viejas dan 404 hoy (el sitio rediseñó): usar Wayback con el timestamp del CDX.
- `fckoper.si/klub/` lista 4 de los 6 años; los de 2022 y 2024 se encuentran por CDX de dominio (`wp-content/uploads/2023/05/…2022-ok.pdf`, `2025/05/…2024.pdf`); el link de 2023 apunta a `wp-admin` (roto) pero la ruta correcta salió del CDX.
- `nk-bravo.si/Klub`: los estados son **consolidados** (NK Bravo + subsidiarias).

## Texto propuesto para `paises/Eslovenia.md`
Canal: sitio del club (Olimpija, Domžale, Koper, Bravo publican); AJPES JOLP con captcha de código de acceso (gestión de Guido; buscador
`rezultati.asp` scripteable). Cuidar capturas Wayback truncadas. Ver `fuentes/Eslovenia/_notas-generales.md`.
