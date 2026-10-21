# Sesión datos-sourcing (Sourcing 4) — to-do 336, informes por liga

**Qué cambió:** `data/informes.js` pasa de 3 a 10 informes; se suman 7, cada uno abierto y verificado público (PDF bajado y leído con `pdftotext`, sin Mistral: US$ 0) y con una cifra leída del propio documento: DFL Wirtschaftsreport 24/25 (`de-bundesliga`, `de-2bundesliga`: ganancia operativa Bundesliga €242,1 M), LaLiga Informe Económico Financiero 24/25 (`es-laliga`, `es-segunda`: ingresos normalizados €5.464 M, +8,1%), FIGC ReportCalcio 2025 (`it-seriea/b/c`: pérdida agregada €1.400 M → €731 M; el PDF del link es el comunicado de 14 págs., no el informe completo), EY Levantamento Financeiro 2025 (`br-serieA`: R$ 14.900 M, +33%), Toppfotballbarometeret 2026 (`no-eliteserien`, `no-1divisjon`: NOK 2.711 M, +25%), Supersociedades 2025 (`co-primeraA/B`: ingresos operacionales +16,6%; página oficial, el informe es un tablero Power BI; no verifiqué que cubra la B: la nota dice «34 clubes», sin dividir por categoría), J.League Season Review 2025 (`jp-j1`: ¥172.500 M, +14%, año fiscal 2024; página, no PDF). Ninguno es borrador. Los PDFs y los `.md` extraídos están en `Admin/sourcing/{Alemania,España,Brasil,Noruega,Italia}/` (`.md` en `.gitignore`, PDFs ya ignorados). `ASSET_V` 1534 → 1535 (`index.html`); regenerados `generate-fuentes-page.js` y `generate-club-pages.js` (por eso el commit toca `club/` y `liga/`). Verificado en el preview a 375 px: Noruega, Alemania, Brasil, Japón, Colombia B, Italia B, España B; sin desborde horizontal.

**Ligas sin informe (buscado, sin hallazgo utilizable):** Argentina (el «Informe de Clubes 2025» de la AFA trata socios e institucionalidad, no finanzas), México (nada público: solo prensa), Chile (solo análisis de prensa sobre las cuentas de la CMF), Perú, Grecia, Turquía (solo UEFA y KAP de los 4 cotizantes), Croacia, Estonia, Dinamarca (Divisionsforeningen sin informe agregado hallado), Escocia (la SPFL publica solo sus cuentas), Portugal (la Liga publica solo sus propias cuentas), Austria (la Bundesliga publica un dato agregado en diciembre; no lo hallé), Suiza (el estudio de la SFL es de impacto económico, no de finanzas), Países Bajos (el ranking financiero de la HAN que cita la prensa no apareció como documento; la KNVB no publica uno), Bélgica (las cifras de la Comisión de Licencias —pérdida de €70,6 M en 2025— solo las encontré en Sporza, sin documento oficial), Rusia (el reporte del RFS salió solo vía prensa; los datos son de bo.nalog.gov.ru). Quedó afuera lo de pago (Football Benchmark, Swiss Ramble). Francia no tiene ranking cargado: no se buscó.

**Qué queda:** que la principal mergee. Se podrían buscar de nuevo Austria, Bélgica, Países Bajos y Rusia dentro de unos meses. Sin tocar skills.

**Qué deja de ser cierto:** en TODO, el 336 pasa a «hecho el barrido de informes, falta el ok de Guido al paso de skill (abajo)». ESTADO: Ligas muestra informes de liga en 7 países nuevos (Alemania, España, Italia, Brasil, Noruega, Colombia, Japón) además de Inglaterra, de los 23 países con ranking.

## Paso de skill propuesto (para el ok de Guido)

**Dónde:** `club-sourcing`, como sección nueva `### 0.4 Informes agregados de la liga` justo después de 0.3 (y una línea en `club-or-year-onboarding`, en el paso de abrir una liga, que mande a esa sección). Es sourcing: se busca un documento, no se categoriza.

**Texto propuesto:**

> ### 0.4 Informes agregados de la liga (al abrir una liga nueva)
>
> Cuando se abre una liga (hay ranking en `data/rankings/`), buscar los informes públicos que resumen las finanzas de sus clubes y sumarlos a `data/informes.js`. Es una lista de lectura: ningún número de ahí entra en un ranking.
>
> 1. **Dónde mirar, en este orden:** la liga o la federación (informe económico anual; en Alemania la DFL, en España LaLiga, en Noruega Norsk Toppfotball con Deloitte); el regulador o el registro (Supersociedades en Colombia); la propia UEFA (el ECFIL ya está para toda liga de Europa: no se repite); una consultora (Deloitte, EY, KPMG Football Benchmark). Búsqueda: `<liga o país> informe económico financiero clubes <año>`, y el sitio de la liga y de la federación.
> 2. **Se abre el PDF o la página** y se confirma que es público y baja sin registro. Un informe de pago, con registro o que solo existe en prensa no se suma. Un informe que no se pudo abrir no entra, aunque la prensa lo cite.
> 3. **Una cifra de contexto, leída del documento** (no de la prensa), con su año y su fuente; si el informe es un borrador, `borrador: true`.
> 4. **Alta en `data/informes.js`** con el formato de las entradas existentes (`ambito`, `ligas`, `cubre`, `frase`, `cifra`, `url`, `urlTipo`; textos `{es, en}`). Sin opinión propia. Cada edición nueva reemplaza a la anterior.
> 5. **El PDF y su texto** van a `Admin/sourcing/<País>/`, sin trackear (`.gitignore`). Si hace falta leer un PDF largo, `pdftotext -layout` primero; Mistral solo si es un escaneo.
> 6. **Si no hay informe:** una línea en `Admin/sourcing/<País>/_notas-generales.md` con qué se buscó y por qué no sirvió (REGLA 2 de `Admin/sourcing/README.md`). No se inventa un informe para llenar la liga.
> 7. Subir `ASSET_V` y correr `generate-fuentes-page.js` y `generate-club-pages.js`.

---

# Sesión datos-sourcing (Sourcing 3) — to-do 332, segunda vuelta

**Qué cambió:** `Admin/sourcing/Inglaterra/informes-futbol-ingles.md` reescrita: resumen de los tres informes ingleses (Deloitte ARFF 2026, UEFA ECFIL 2025, IFR State of the Game 2026), tabla de informes parecidos de otras ligas y una propuesta de sección de informes para Ligas. Los tres PDFs están bajados y transcriptos con Mistral (US$ 1,65) en esa carpeta; los `.md` no están ignorados por `.gitignore` y NO se commitearon (decidir si se ignoran: la regla vigente dice que no se trackean). Se commitearon la nota, esta nota y el log de Mistral.
**Qué queda:** que Guido decida si abre una sección de informes o de noticias en Ligas. El 336 verifica, liga por liga, los informes de la tabla (Football Benchmark, LaLiga, EY, DFL sin abrir el PDF). Ediciones viejas de Deloitte sin bajar.
**Qué deja de ser cierto:** en TODO, el 332 ya no espera «buscar» ni «transcribir»: espera la decisión de Guido sobre la sección. Nada en ESTADO.
