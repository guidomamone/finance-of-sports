# Escocia — notas generales (sesión 2026-09-13)

Escocia **no tiene un registro separado**: es el mismo Companies House que Inglaterra y Gales, con
números que empiezan con `SC` en vez de ser solo numéricos. Todo el procedimiento, los tipos de
presentación y el gotcha del OCR están en `fuentes/Inglaterra/_notas-generales.md` y valen igual acá.

Lo único propio de Escocia es a quién buscar: el fútbol profesional escocés está mucho más
concentrado (Celtic y Rangers) y varios clubes históricos son sociedades chicas, así que es probable
que presenten cuentas abreviadas (`Accounts for a medium company` o incluso `small`) — conviene
chequear el tipo de presentación antes de bajar, no después.

## Barrido de profundidad (sesión 2026-10-03)

Se cubrieron los 18 clubes de la Premiership/Championship/League One con cuentas en Companies House (carpetas `Clubes/Escocia/<Club>/`, PDF sin trackear). Reglas que salieron, además de las de Inglaterra:

- **Verificar por OCR si la cuenta trae P&L (regla s.444).** Con P&L en las 5 presentaciones: Celtic, Rangers (grupo), Aberdeen (grupo), Hearts, Hibernian, Dundee United, Kilmarnock, Motherwell, St Mirren, Partick Thistle, Ross County. Parciales: St Johnstone (4), Falkirk (2), Hamilton (1), Livingston (1), Raith (1). **Cero: Queen of the South.** Dundee (6) sale de su sitio oficial y de Wayback, no de Companies House.
- **El sitio oficial puede tener lo que el club no depositó.** Dundee sube a su WordPress (media library `d3g6oc0sv9dsl4.cloudfront.net`) los estados completos con Statement of Comprehensive Income 2016-2019, mientras que en Companies House presentó versiones de 7-14 págs. sin P&L. Mismo patrón en The New Saints (Gales) y Derry City. **Antes de dar un club small por muerto, listar la media library de su WordPress**: `https://<dominio>/wp-json/wp/v2/media?per_page=100&page=N` y filtrar `.pdf` por nombre.
- **La entidad con el nombre del club puede ser un cascarón.** Ross County Football Club Limited (SC033275) es una controlante inmediata durmiente; la operativa es Ross County Football Club (1998) Limited (SC171034). Raith Rovers FC Holdings Limited (SC149552) presenta micro-cuentas de 3 págs. sin ingresos.
- La etiqueta `medium company` (Partick Thistle 2023/24-2024/25) SÍ traía cuenta de resultados; `Total exemption full accounts` (Hamilton 2023/24) también, mientras que otras `small` no.
- Sin P&L hoy y sin señal de documento publicado: Queen of the South, Livingston (salvo 2017/18), Hamilton (salvo 2023/24), Raith (salvo 2012/13). Revisar sin fecha fija.
