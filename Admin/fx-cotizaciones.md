<!-- md: registro de las cotizaciones usadas como tipo de cambio | leer: al cargar un tipo de cambio de mercado -->
# Cotizaciones de mercado: de dónde salió cada una

Lo que había como comentario en `FX_CLOSE` de `data/currency-map.js` (data/ se publica: to-do 209), movido tal cual. Cada
entrada de `FX_CLOSE` ya dice en su `label` qué serie y qué fecha es; acá queda el porqué (qué sesión la agregó, por qué esa serie, qué
se verificó). El modelo de monedas y tipos de cambio: `Admin/ARQUITECTURA.md`, "Monedas y tipo de cambio".

## Antes de 'ARS@2015-06-30' (y las que siguen)

```text
Las 5 de abajo vivían escritas a mano en data/ar/argentinosjuniors-ar-data.js (to-do 21(b),
movidas el 2026-09-20). Son la MISMA serie que la de 2014 de arriba — dólar vendedor BNA de
cierre, investigada en datos.gob.ar/series — así que su lugar es acá y no adentro de un club.
ANTES DE MOVERLAS SE CONFIRMÓ QUE DE VERDAD SON DE MERCADO, que es lo que el to-do pedía: los
3 balances auditados de Argentinos no declaran ningún tipo de cambio propio (no tienen Anexo
de moneda extranjera, solo notas con partidas en U$S/EUR ya convertidas a pesos, sin la
columna de cambio vigente). No es el caso de Unión, que estaba mal rotulado y sí salía de su
Anexo V (Versión 140).
OJO, NO CONTRADICEN a los `document_close` de San Lorenzo y Vélez para esas mismas fechas
(8,988 en 2015 y 14,94 en 2016): esos son el COMPRADOR que declara cada documento y estos son
el VENDEDOR del mercado. Son los dos lados del spread, no dos versiones del mismo número.
```

## Antes de 'ARS@2020-06-30' (y las que siguen)

```text
Sesión 2026-09-23 (onboarding de Banfield): ninguno de los 2 balances de Talleres ni el de
Banfield declara un TC de cierre propio confiable (ver comentario de cabecera de cada
data/<país>/<club>-data.js), así que las 3 entradas de abajo son cierres de mercado, dólar mayorista
BCRA (serie de Rava Bursátil, misma fuente que ya usan las entradas de 2024/2025 de arriba).
```

## Antes de 'ARS@2021-06-30' (y las que siguen)

```text
Sesión 2026-09-25 (onboarding de Los Andes, tanda de 20 transcripts al azar): verificado
contra nota de Ámbito Financiero del mismo día, no solo la serie BCRA sola.
```

## Antes de 'ARS@2024-12-31' (y las que siguen)

```text
Última rueda de cada año: el mercado mayorista no operó el 31/12 en ninguno de los 2 años
(30/12/2024 y 29/12/2025 fueron las últimas ruedas efectivas, confirmado contra Rava).
```

## Antes de 'ARS@2026-06-30' (y las que siguen)

```text
Sesión 2026-09-23 (onboarding de Gimnasia y Esgrima LP): el presupuesto 2025-26 (año standalone,
sin balance real todavía) no declara TC propio y no tiene un balance pareado del que tomarlo.
```

## Antes de 'ARS@2018-10-31' (y las que siguen)

```text
Sesión 2026-09-27 (onboarding de Almagro, cierre de ejercicio 31/10 los 6 años, ninguno de los
6 balances declara TC propio — no tienen Anexo de moneda extranjera): serie de Rava Bursátil,
mismo criterio/fuente que el resto de las entradas de mercado de esta tabla. 31/10/2020 y
31/10/2021 cayeron sábado y domingo respectivamente, así que el valor es el de la última rueda
hábil anterior (viernes).
```

## Antes de 'BRL@2017-12-31' (y las que siguen)

```text
Sesión 2026-09-25 (onboarding de Chapecoense 2017 y Juventude 2020, tanda de 20 transcripts
al azar): PTAX consultado vía la API Olinda del propio Banco Central do Brasil.
```

## Antes de 'EUR@2021-06-30' (y las que siguen)

```text
Sesión 2026-09-25 (onboarding de Bayern Munich 2020/21, tanda de 20 transcripts al azar).
```

## Antes de 'EUR@2025-12-31' (y las que siguen)

```text
Osijek/Slaven Belupo (Croacia, ejercicio calendario 2025, onboarding sesión 2026-09-25).
```

## Antes de 'JPY@2025-12-31' (y las que siguen)

```text
Placeholder, no cotización: la J.League no declara ninguna en su Club
Licensing Report y los 10 clubes de Japón salen de ese mismo documento.
```

## Antes de 'PEN@2022-12-31' (y las que siguen)

```text
Perú (Alianza Lima, onboarding inicial del país): los EEFF 2019-2021 SÍ declaran su propio tipo de
cambio de cierre (Nota "Riesgo de tipo de cambio", promedio ponderado SBS compra/venta) y van como
fx literal + fxSource:'document_close' en data/pe/alianzalima-pe.json (`fx.rate`, `fx.source`), NO acá. Los EEFF 2022-2024
transcriptos para este club no incluyen esa nota (la transcripción llegó solo hasta los 3 estados
principales, no a las notas), así que estos 3 son cotizaciones de mercado investigadas aparte.
```

## Antes de 'EUR@2020-06-30' (y las que siguen)

```text
Sesión 2026-09-22 (onboarding de Getafe/Girona/Espanyol, Köln/Eintracht Frankfurt/Werder
Bremen/Augsburg/Stuttgart, Arsenal/Liverpool/Man City/Everton/Tottenham). Ninguno de estos
documentos declara su propio tipo de cambio a USD, así que las 8 entradas de abajo son cierres
BCE, calculados como EUR/USD publicado por el BCE (para EUR, directo) o cruzando GBP/EUR ×
EUR/USD del mismo boletín BCE (para GBP, que el BCE no publica contra USD directo).
```

## Antes de 'EUR@2023-12-31' (y las que siguen)

```text
El 31/12/2023 es domingo, sin cotización BCE: se usa el boletín del viernes anterior, mismo
criterio que ya usa 'BRL@2025-12-31' de arriba (boletín del 30/12 para un 31 sin cotización).
```

## Antes de 'GBP@2025-05-31' (y las que siguen)

```text
El 31/5/2025 es sábado, sin cotización BCE: se usa el boletín del viernes anterior.
```

## Antes de 'GBP@2024-06-30' (y las que siguen)

```text
El 30/6/2024 es domingo, sin cotización BCE: se usa el boletín del viernes anterior.
```

## Antes de 'GBP@2024-07-31' (y las que siguen)

```text
Sunderland (onboarding 2026-09-25, cierre de ejercicio 31/7, distinto del 30/6 del resto de los
clubes ingleses cargados hasta ahora).
```

## Antes de 'DKK@2019-06-30' (y las que siguen)

```text
Dinamarca (onboarding de FC København/Brøndby/FC Midtjylland, sesión 2026-09-25): mismo método
de cruce GBP/EUR × EUR/USD ya usado arriba, con DKK/EUR × EUR/USD.
```

## Antes de 'DKK@2019-12-31' (y las que siguen)

```text
FC Fredericia (2da tanda, misma sesión): mismo método de cruce.
```

## Antes de 'DKK@2021-06-30' (y las que siguen)

```text
AGF y Viborg FF (onboarding sesión 2026-09-25, tanda de 20 transcripts al azar), mismo método
de cruce DKK/EUR × EUR/USD del boletín BCE.
```

## Antes de 'DKK@2022-06-30' (y las que siguen)

```text
SønderjyskE (2da tanda, misma sesión).
```

## Antes de 'DKK@2023-06-30' (y las que siguen)

```text
Randers FC (2da tanda, misma sesión): cotización DIRECTA DKK/USD del Danmarks Nationalbank
(banco central danés), no una cruzada BCE — fuente más precisa cuando está disponible.
```

## Antes de 'ITL@1999-06-30' (y las que siguen)

```text
Italia antes del euro (Versión 607, Lazio en liras): ITL por 1 USD = 1.936,27 (paridad fija con el euro, Reglamento CE 2866/98) x EUR por USD de la serie del BCE.
```

## Quién agregó cada cotización (las que agregaron los scripts)

| Clave | Nota |
|---|---|
| CLP@2010-12-31 | tools/cargar.mjs 2026-10-02 (tools/fx-reference/) |
| CLP@2011-12-31 | tools/cargar.mjs 2026-10-02 (tools/fx-reference/) |
| CLP@2012-12-31 | tools/cargar.mjs 2026-10-02 (tools/fx-reference/) |
| CLP@2013-12-31 | tools/cargar.mjs 2026-10-02 (tools/fx-reference/) |
| CLP@2014-12-31 | tools/cargar.mjs 2026-10-02 (tools/fx-reference/) |
| COP@2017-12-31 | tools/cargar.mjs 2026-10-02 (tools/fx-reference/) |
| COP@2019-12-31 | tools/cargar.mjs 2026-10-02 (tools/fx-reference/) |
| COP@2020-12-31 | tools/cargar.mjs 2026-10-02 (tools/fx-reference/) |
| COP@2021-12-31 | tools/cargar.mjs 2026-10-02 (tools/fx-reference/) |
| BRL@2008-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| BRL@2009-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| BRL@2010-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| BRL@2011-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| BRL@2012-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| BRL@2013-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| BRL@2015-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| BRL@2014-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| BRL@2016-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| BRL@2018-12-31 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2018-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2017-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2016-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2019-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2012-06-30 | alta-club.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2013-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2014-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2015-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2007-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2009-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2010-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2003-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2004-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2005-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2006-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2008-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2011-06-30 | tools/cargar.mjs 2026-10-03 (tools/fx-reference/) |
| EUR@2021-12-31 | alta-club.mjs 2026-10-07 (tools/fx-reference/) |
| EUR@2022-12-31 | alta-club.mjs 2026-10-07 (tools/fx-reference/) |
| EUR@2018-12-31 | tools/cargar.mjs 2026-10-07 (tools/fx-reference/) |
| EUR@2020-12-31 | tools/cargar.mjs 2026-10-08 (tools/fx-reference/) |
| EUR@2019-12-31 | tools/cargar.mjs 2026-10-08 (tools/fx-reference/) |
| EUR@2026-06-30 | tools/cargar.mjs 2026-10-08 (tools/fx-reference/) |
| EUR@2008-12-31 | tools/cargar.mjs 2026-10-08 (tools/fx-reference/) |
| EUR@2009-12-31 | tools/cargar.mjs 2026-10-08 (tools/fx-reference/) |
| EUR@2010-12-31 | tools/cargar.mjs 2026-10-08 (tools/fx-reference/) |
| EUR@2011-12-31 | tools/cargar.mjs 2026-10-08 (tools/fx-reference/) |
| EUR@2012-12-31 | tools/cargar.mjs 2026-10-08 (tools/fx-reference/) |
| EUR@2013-12-31 | tools/cargar.mjs 2026-10-08 (tools/fx-reference/) |
| RUB@2021-12-31 | alta-club.mjs 2026-10-10 (tools/fx-reference/) |
| RUB@2022-12-31 | tools/cargar.mjs 2026-10-10 (tools/fx-reference/) |
| RUB@2023-12-31 | tools/cargar.mjs 2026-10-10 (tools/fx-reference/) |
| RUB@2024-12-31 | tools/cargar.mjs 2026-10-10 (tools/fx-reference/) |
| RUB@2025-12-31 | tools/cargar.mjs 2026-10-10 (tools/fx-reference/) |
