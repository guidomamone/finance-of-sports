# Anderlecht (R.S.C. Anderlecht)

- **Deporte**: Fútbol
- **Liga / competencia**: Pro League (Bélgica, 1ª división)
- **Entidad legal**: ROYAL SPORTING CLUB ANDERLECHT NV/SA (BE 0823.379.451) — la sociedad de capital
  que corre el fútbol profesional. Existe también una **ASBL histórica separada** ("Royal Sporting
  Club Anderlecht", BE 0407.663.482) que no se usó: la NV es la que deposita cuentas con cifras de
  primera división (turnover 2024/25 informado en prensa: EUR 111.008.609) y filings desde 2011.
- **Canal**: `consult.cbso.nbb.be` (Centrale des bilans / BNB).

## Qué se bajó (sesión 2026-09-17)

**15 ejercicios consecutivos, serie completa 2011-2025**, `Clubes/Bélgica/Anderlecht/`, todos con
esquema completo (turnover desglosado, sin huecos de "Verkort schema"):

- `jaarrekening-2025-06-30-individual.pdf` a `jaarrekening-2011-06-30-individual.pdf` (una por año,
  sin correcciones, sin ejercicios faltantes).

No se encontraron cuentas consolidadas depositadas (solo modelo "kapitaalvennootschap"/sociedad de
capital, individual, todos los años).

## Verificación hecha en esta sesión

Nombre confirmado en la respuesta JSON de la API (`enterpriseName: "ROYAL SPORTING CLUB
ANDERLECHT"`) para los 15 depósitos, y turnover del ejercicio 2024/25 (~EUR 111M) consistente con lo
reportado por prensa (footnews.be, "Anderlecht bénéficiaire pour la deuxième année consécutive").

- Último chequeo: 2026-09-17.

## Cargado al sitio (2026-09-25, onboarding de Bélgica como país nuevo)

Se cargó el ejercicio 2025 (1/7/2024-30/6/2025), única versión disponible (individual,
no hay consolidado para este club). `clubId`: `anderlecht-be`. La categorización de
"Omzet" y "Andere bedrijfsopbrengsten" quedó gruesa (`lump_football_operations` /
`player_sales`) porque las notas 6.10 del propio filing (desglose de la cifra de
negocios) no tienen ningún valor cargado por el club — ver la pregunta anotada en
`Admin/dudas-por-club.md`. Ver `data/anderlecht-be-data.js` para el detalle completo
y el tie-out verificado. Color de marca: `#4C2484` (violeta, schemecolor.com,
confirmado contra la identidad "paars-wit"/púrpura-blanco de Wikipedia — se usó el
acento no blanco), verificado 2026-09-25.

Pendiente para una sesión futura: el resto de la serie 2011-2024 sigue transcripta
en `Clubes/Bélgica/Anderlecht/` y sin cargar.
