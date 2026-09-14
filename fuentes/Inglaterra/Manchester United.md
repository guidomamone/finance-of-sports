# Manchester United

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: **Manchester United plc** (constituida en las Islas Caimán, cotiza en la Bolsa
  de Nueva York bajo `MANU`) — CIK de la SEC **0001549107**.
  Además, la sociedad operativa inglesa `MANCHESTER UNITED FOOTBALL CLUB LIMITED`
  (Companies House n° **00095489**) presenta su propia serie de cuentas: 14 ejercicios, de 30/6/2012
  a 30/6/2025.
- **Canal**: SEC EDGAR (formulario 20-F, el equivalente al 10-K para emisores extranjeros).

## Por qué este club es distinto a los otros 9 ingleses de esta sesión

Es el único que tiene **dos** canales oficiales a la vez, y el único con un documento que **ya viene
en texto** (no escaneado): el 20-F se publica como HTML en el sitio de la SEC. Eso lo convierte en el
candidato más barato de todo el lote para cargar al sitio — cero OCR.

## Qué se bajó (sesión 2026-09-13)

- `Clubes/Inglaterra/Manchester United/manchester-united-plc-20f-2024-25.htm` — 20-F del ejercicio
  cerrado el 30/6/2025, presentado el 18/9/2025. 4,4 MB de HTML, ~608.000 caracteres de texto.

## Cifras de control ya verificadas (leídas del propio documento)

Ingresos del ejercicio 2024/25, por las tres líneas con las que United reporta desde siempre:

| Línea | £'000 |
|---|---|
| Commercial | 333.274 |
| Broadcasting | 172.977 |
| Matchday | 160.263 |
| **Total** | **666.514** |

El documento también aclara que Commercial fue el 50,0% de los ingresos totales en 2025 (45,8% en
2024 y 46,7% en 2023), lo que da un chequeo cruzado del total: 333.274 / 0,50 ≈ 666,5 M. Cierra.

**Normativa contable**: IFRS (el documento lo dice explícitamente), no US GAAP — o sea comparable
directo con los clubes españoles y brasileños ya cargados, y distinto de los dos clubes
estadounidenses de esta misma sesión.

**Exposición cambiaria, dato para el criterio de moneda del sitio**: el propio 20-F dice que en 2025
el 4,7% de los ingresos se generó en euros y el 12,1% en dólares — el resto en libras. Reporta en
libras.

## Serie disponible sin bajar

**4 ejercicios de 20-F** verificados en EDGAR (2021/22 a 2024/25), y la serie sigue hacia atrás hasta
la salida a bolsa de 2012. Más los 14 ejercicios de la sociedad inglesa en Companies House.

## Cómo se llega (procedimiento, para repetirlo con otro emisor)

1. `https://www.sec.gov/files/company_tickers.json` → mapea ticker a CIK.
2. `https://data.sec.gov/submissions/CIK<cik de 10 dígitos>.json` → historial de presentaciones.
3. El documento está en
   `https://www.sec.gov/Archives/edgar/data/<cik>/<accessionNumber sin guiones>/<primaryDocument>`.

**Gotcha**: la SEC devuelve **HTTP 403** si el `User-Agent` no trae un contacto. Hay que mandar algo
con el formato `Nombre contacto@dominio` — con un User-Agent de navegador común no alcanza.

- Último chequeo: 2026-09-13.
