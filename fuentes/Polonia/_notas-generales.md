# Polonia — notas generales

## Canal que funciona: el sitio propio de cada club S.A. (obligación de la licencia PZPN)

Los clubes de la Ekstraklasa son mayormente `spółka akcyjna` (S.A. / S.S.A.) y están obligados a
depositar sus cuentas anuales en el KRS (Código de Sociedades Comerciales + Ley de Contabilidad), pero
el repositorio oficial no es accesible desde este entorno (ver abajo). En la práctica cada club publica
sus estados en una sección permanente de su propio sitio, junto con la declaración de "wynagrodzenie
wypłacone pośrednikom transakcyjnym" — señal de que es un requisito de la licencia del PZPN (Criterio
F.01 "obowiązek informacyjny" / F.03 del Podręcznik Licencyjny), no una elección: mismo patrón que
la HNS en Croacia (`paises/Croacia.md`) y la licencia UEFA en Italia. Resultado de la primera pasada:
Legia, Lech, Pogoń, Raków y Jagiellonia con 5 a 8 ejercicios cada uno, PDF con capa de texto nativa en
la mayoría.

- **Ejercicio fiscal**: julio-junio (Legia, Lech, Pogoń, Raków; el de Raków 2020/21 fue de 18 meses por
  cambio de ejercicio) o año calendario (Jagiellonia). No mezclar al cargar.
- **Cada PDF suele traer** sprawozdanie finansowe + informe de gestión + dictamen del biegły rewident;
  a veces el dictamen viene aparte (Pogoń) o hay un "komentarz" de la dirección (Legia).

## Lo que NO sirve desde este entorno

- **RDF / Przeglądarka Dokumentów Finansowych** (`rdf-przegladarka.ms.gov.pl`, también accesible vía
  `ekrs.ms.gov.pl/rdf/rd/` → `prs.ms.gov.pl/rdf-informacja`): el Ministerio de Justicia lo protege con
  Incapsula/Imperva y devuelve "Access Denied, Error 16" a una IP de EE.UU. (probado con `curl` y con el
  Browser pane, 2026-10-03). Gratis y sin cuenta según el Ministerio, pero requiere IP polaca/UE: si
  Guido lo abre desde una conexión local debería funcionar. Gestión de Guido, no se insiste desde acá.
- `api-krs.ms.gov.pl/api/krs/OdpisAktualny/<KRS>?rejestr=P&format=json` (API abierta del KRS) SÍ responde
  (HTTP 200), pero es solo el extracto del registro (razón social, representantes, capital), no los
  estados financieros. Sirve para confirmar entidad/KRS antes de bajar un PDF.
- `imsig.pl`, `rejestr.io`, `krs-pobierz.pl`, `sprawozdaniefinansowe.pl`, `bizraport.pl`: espejos de lo
  que hay en el KRS. Solo leads, nunca se guardan ni se citan como fuente (fuente no oficial).

## Gotchas de tooling descubiertos

- Varios sitios de clubes (Pogoń, Raków) dan 403 a `curl` con User-Agent corto: con UA de Chrome +
  `Referer` del propio sitio bajan bien; las páginas de listado hay que leerlas con el Browser pane.
- Sitios rediseñados (Raków) pierden las noticias viejas: buscar la sección permanente, no el artículo.
- Sitios SPA (Jagiellonia, Legia): los links a PDF se sacan con `javascript_tool` desde el Browser pane
  en el mismo origen.

## Resto de la Ekstraklasa y 1ª liga (pasada 2, 2026-10-03)

Se cubrieron Górnik Zabrze, Śląsk Wrocław, Cracovia, Widzew Łódź, Piast Gliwice, Zagłębie Lubin, Korona
Kielce, Motor Lublin, Lechia Gdańsk, GKS Katowice, Radomiak Radom, Wisła Płock, Wisła Kraków y Arka
Gdynia. **Los 14 son `spółka akcyjna`** (S.A. o S.S.A.); ninguno era sp. z o.o. ni municipal. 13 de 14
tienen una sección permanente en el sitio con los estados (Arka es la excepción; Górnik, Śląsk, Zagłębie y
Motor solo muestran allí el último ejercicio). Confirmaciones explícitas del origen en la
licencia PZPN: Cracovia ("zgodnie z wytycznymi Podręcznika Licencyjnego dla Klubów Ekstraklasy"),
Radomiak ("sprawozdania zgodnie z wymogami Podręcznika Licencyjnego PZPN"), Piast ("Wymogi licencyjne"),
Zagłębie ("F.01 pkt 5 Roczne sprawozdanie finansowe"), Wisła Płock ("F.01 PKT 5"), Motor ("fin0101"),
Lechia ("fin.01.01-roczne-sprawozdanie-finansowe").

- **Ejercicio fiscal**: julio-junio — Piast, Korona, Lechia, Arka; Widzew y Wisła Kraków cambiaron de año
  calendario a julio-junio (ejercicio de transición: Widzew de 18 meses 01.01.2022-30.06.2023; Wisła
  Kraków rotulado "01.01.2021-30.06.2022", dudoso). Año calendario — Górnik, Śląsk, Cracovia, Zagłębie,
  Motor, GKS Katowice, Radomiak, Wisła Płock.
- **Patrón de cobertura**: un club de Ekstraklasa con historia larga publica de 4 a 9 ejercicios (GKS
  Katowice 9, Korona 8, Lechia 8, Wisła Kraków 8, Piast 7, Wisła Płock 7). Los clubes ascendidos
  recientemente (Motor 2024, Radomiak 2021, Widzew 2022) solo publican desde el ascenso: el canal es la
  licencia de Ekstraklasa, no la forma jurídica.
- **GKS Katowice es la excepción**: cotiza en NewConnect, así que su canal son los comunicados EBI/ESPI
  (`gkskatowice.eu/komunikaty-ebi` → `/announcement/<n>`, con PDFs adjuntos), 2011-2025, que son fuente
  oficial del propio emisor.
- **Sitios que SOBREESCRIBEN el mismo slot** (Cracovia `files-app/file_196/Sprawozdanie_finansowe.pdf`,
  Zagłębie `.../Sprawozdanie finansowe.pdf`): el club reemplaza el archivo cada año; el ejercicio viejo
  solo se recupera de Wayback con la captura de la fecha correcta. Ojo con bajar "la última" y creer que
  es el año del nombre.
- **PDF mezclado**: algunos "sprawozdanie finansowe" traen dictamen e informe de gestión adentro
  (Zagłębie 2019: 69 págs.), otros solo el estado (Wisła Płock 2021-2023, 15-16 págs.). Varios clubes
  publican la salida cruda del sistema `e-sprawozdania` ("wygenerowane": Śląsk 2018-2022, Górnik 2022): con
  capa de texto, sin dictamen.
- **Gotcha de DNS**: Cracovia entrega en el HTML crudo una URL de CloudFront cuyo DNS ya no resuelve; el
  JavaScript la reemplaza por `cdn.sportigio.com`. Sin Browser pane no se ve el link bueno. Wisła Kraków
  usa `cdn.shopify.com` (link visible solo con el Browser pane).
- **Wayback**: capturas truncadas a 1.048.576 bytes tiraron SF de Śląsk 2023, Widzew 2018 y Arka 2022/23
  (única captura); Zagłębie 2022/2023 se resolvió con una captura más tardía. Archive.org rechazó
  ráfagas (exit 7/504): consultas de a una.
- **Homonimia**: `wlokniarz.pl` es un sanatorio de Busko-Zdrój (no el club de speedway de Częstochowa, que
  es `wlokniarz.com`); `wks-slask.wroc.pl` es la asociación WKS Śląsk (CIT-D), `wks-slask.eu` es Śląsk
  Wrocław Basketball S.A.; `Fundacja Radomiak Radom` (KRS 0000942496) no es el club.
- **Sin canal propio**: Zagłębie solo tiene 2025 en la página actual; Górnik solo 2025; Motor solo 2025;
  Arka (1ª liga) no publica en el sitio nuevo. El resto de los años salió de Wayback.

## Otros deportes (probado 2026-10-03, 8 clubes)

**Conclusión: el canal "sitio del club por licencia" NO se extiende a otros deportes.** La licencia PZPN
(Podręcznik Licencyjny, F.01) aplica solo al fútbol. Las demás ligas profesionales (PLK, PlusLiga,
PGE Ekstraliga de speedway) tienen reglamentos de licencia propios, pero no se encontró ningún club que
publique sus estados en su sitio. La obligación legal de depositar en el KRS (ver RDF) sí alcanza a todas
las S.A., pero el RDF está bloqueado desde EE.UU. Los espejos (`imsig.pl`, `rejestr.io`) confirman que los
estados existen, solo leads.

| Deporte | Club (entidad) | Qué se probó | Resultado |
|---|---|---|---|
| Vóley PlusLiga | Jastrzębski Węgiel (`Klub Sportowy Jastrzębski Węgiel S.A.`, KRS 0000233145) | `jastrzebskiwegiel.pl` (200, sin sección de sprawozdania ni "akcjonariusze" en el menú); Wayback CDX del dominio sin PDFs financieros | Sin canal propio. Existe en KRS (ingresos 2024 de 25,1 M PLN según espejos). Es S.A. pero el sitio no publica. |
| Vóley PlusLiga | ZAKSA Kędzierzyn-Koźle (`ZAKSA S.A.`, KRS 0000195237) | `zaksa.pl/akcjonariusze/` ("informacje i komunikaty", "Komunikaty do pobrania") | Sin sprawozdania en la página; los espejos listan 2023-2025 en el KRS. Sin canal propio. |
| Básquet PLK | Śląsk Wrocław Basketball S.A. (KRS 0000477904) | `wks-slask.eu/dla-akcjonariuszy-3/` | Solo avisos de desmaterialización de acciones (2020). Sin estados. |
| Speedway Ekstraliga | Włókniarz Częstochowa S.A. | `wlokniarz.com/dla-akcjonariuszy/` | Solo "wezwanie a depositar documentos de acciones" (2020). Sin estados. |
| Speedway Ekstraliga | Unia Leszno (`"Unia Leszno" Sportowa S.A.`, KRS 0000237219) | `unia.leszno.pl` (solo reglamentos, ofertas); Wayback del dominio sin PDFs financieros | Sin canal propio. Los espejos listan ejercicios **noviembre-octubre** (01.11.2023-31.10.2024, etc.): ejercicio distinto al calendario. |
| Speedway | Motor Lublin żużel | Los estados de `Motor Lublin S.A.` (fútbol) son del club de fútbol; la rama de speedway no apareció publicada aparte | Sin canal. No se confirmó si es la misma S.A. |

Candidatos a mail (no escritos): ninguno justificado todavía; el camino para estos deportes es el RDF
(gestión de Guido desde IP polaca o con ayuda de un tercero) o pedir a cada club.

## Pendientes (venían del TODO)

- (ex to-do 133, 2026-10-03) **Gestiones de Guido que desbloquean varios países de Europa del Este** (sesión 2026-10-03; ninguna es tarea de sourcing, cada una exige IP, cuenta, captcha o pago de una persona): (a) **IP polaca/UE** para el repositorio RDF/KRS (`rdf-przegladarka.ms.gov.pl`, bloquea EE.UU.): completa huecos de Polonia (Górnik 2024, Śląsk 2021/2023, Cracovia 2021, Zagłębie 2020, Motor 2024, Arka 2022/23+) y otros deportes.
- (ex to-do 134) **Reintentar capturas de Wayback truncadas a 1.048.576 bytes** cuando aparezca otra captura: Śląsk 2023, Widzew 2018, Arka 2022/23.
- (ex to-do 135) **Candidatos a mail (existencia confirmada o muy probable, no escritos; Guido decide y aprueba cada envío, proceso en `club-outreach`)**: Górnik, Śląsk, Cracovia, Zagłębie, Motor, Arka.
