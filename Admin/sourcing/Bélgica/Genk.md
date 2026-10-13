# Genk (KRC Genk)

- **Deporte**: Fútbol
- **Liga / competencia**: Pro League (Bélgica, 1ª división)
- **Entidad legal**: K. RACING CLUB GENK 322 (BE 0434.825.462) — sede Stadionplein 4, 3600 Genk.
  Es una **vereniging/ASBL** (asociación), no NV/SA, pero deposita esquema COMPLETO (no abreviado)
  todos los años y turnover siempre desglosado (EUR 33.515.090 en 2025) — la forma jurídica no
  implica automáticamente menos disclosure en este caso. El "322" en el nombre es el número de
  matrícula federativo histórico, no parte del nombre comercial. Existe una entidad separada "KRC
  GENK HORECA & EVENTS NV" (BE 0478.879.496) que NO se usó — es la subsidiaria de bares/eventos del
  estadio, no la operación futbolística.
- **Canal**: `consult.cbso.nbb.be` (Centrale des bilans / BNB).

## Qué se bajó (sesión 2026-09-17)

**19 ejercicios consecutivos, serie completa 2007-2025**, `Clubes/Bélgica/Genk/`:

- `jaarrekening-2025-06-30-individual.pdf` a `jaarrekening-2007-06-30-individual.pdf`, sin huecos,
  sin errores de descarga.

## Verificación hecha en esta sesión

Se comparó el turnover del depósito 2025 (EUR 33.5M) contra el de la entidad "KRC Genk Horeca &
Events" (turnover mucho menor, filings hasta 2019/20 según búsqueda externa) para confirmar que la
entidad correcta es la vereniging 0434.825.462, no la NV de horeca.

- Último chequeo: 2026-09-17.

## Cargado al sitio (2026-09-25, onboarding de Bélgica como país nuevo)

Se cargó el ejercicio 2025 (1/7/2024-30/6/2025), única versión disponible (individual,
no hay consolidado — es una vereniging/VZW, no una NV). `clubId`: `genk-be`. Esquema
VOL-VZW (distinto de Anderlecht/Gent, NV/VOL-kap): tiene una línea propia "Lidgeld,
schenkingen, legaten en subsidies" (cuotas+donaciones+subsidios) que se categorizó
como `member_dues`, y movimientos de reservas libres de impuesto/impuesto diferido
por 7.225.620 EUR de plusvalías de transferencias diferidas a ejercicios futuros (ver
comentario de cabecera de `data/genk-be-data.js`). Ver ese archivo para el detalle
completo y el tie-out verificado. Color de marca: `#00468F` (azul, logotyp.us,
confirmado contra la identidad "blauw-wit"/azul-blanco de Wikipedia — se usó el
acento no blanco), verificado 2026-09-25.

Pendiente para una sesión futura: el resto de la serie 2007-2024 sigue transcripta
en `Clubes/Bélgica/Genk/` y sin cargar.
