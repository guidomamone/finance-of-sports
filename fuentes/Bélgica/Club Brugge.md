# Club Brugge

- **Deporte**: Fútbol
- **Liga / competencia**: Pro League (Bélgica, 1ª división)
- **Entidad legal**: CLUB BRUGGE NV (BE 0460.444.251, Naamloze vennootschap / SA) — sede Herenweg 9,
  8300 Knokke-Heist. **Gotcha de identidad**: el mismo número de empresa (0460.444.251) aparece
  registrado bajo el nombre **"DE KLOKKE"** hasta el ejercicio 2011 (confirmado leyendo el propio
  PDF: campo "Naam" = "DE KLOKKE" en el depósito de 2011, con cifras minúsculas — brutomarge de solo
  EUR 304.020 — imposibles para un club de primera). El PDF de 2012 ya dice "CLUB BRUGGE" con el
  mismo número, así que es la MISMA sociedad renombrada, no una entidad distinta — la serie completa
  1999-2025 es continua y correcta.
- **Canal**: `consult.cbso.nbb.be` (Centrale des bilans / Centrale voor de balansen del Banque
  Nationale de Belgique). Ver `fuentes/Bélgica/_notas-generales.md` para el mecanismo completo.

## Qué se bajó (sesión 2026-09-17)

**35 ejercicios, serie CASI completa desde 1999 hasta 2025** (falta solo 1998, ver abajo),
`Clubes/Bélgica/Club Brugge/`, más 5 ejercicios adicionales de **cuentas consolidadas** (2020-2025):

- `jaarrekening-2025-06-30-individual.pdf` + `jaarrekening-2025-06-30-consolidado.pdf` — cerrado
  30/6/2025.
- `jaarrekening-2024-06-30-individual.pdf` + `-consolidado.pdf`.
- `jaarrekening-2023-06-30-individual.pdf` (+ `-correction.pdf`) + `-consolidado.pdf`.
- `jaarrekening-2022-06-30-individual.pdf` + `-consolidado.pdf`.
- `jaarrekening-2021-06-30-individual.pdf` + `-consolidado.pdf`.
- `jaarrekening-2020-06-30-individual.pdf` (+ `-correction.pdf`) + `-consolidado.pdf`.
- `jaarrekening-2019-06-30-individual.pdf` a `jaarrekening-2011-06-30-individual.pdf` — solo cuentas
  individuales (todavía no había obligación/depósito de consolidadas), esquema "Volledig
  schema"/"Schéma complet" (turnover SÍ desglosado).
- `jaarrekening-2013-06-30-individual.pdf` tiene además una `-correction.pdf` (depósito de
  corrección posterior, mismo ejercicio).
- `jaarrekening-2010-06-30-individual.pdf` a `jaarrekening-1999-06-30-individual.pdf` — esquema
  **abreviado** ("Verkort schema"): el campo Omzet (cifra de negocios) queda EN BLANCO, solo se
  publica el agregado "Brutomarge" (margen bruto). Ver duda anotada más abajo.
- **NO se pudo bajar 1998** (`Verkort schema kapitaalvennootschap`, tipo de archivo `MICROFILM` en
  el listado de la API): la API devuelve 404 al pedir el PDF — es el único ejercicio de todo el
  país donde el depósito consta en el listado pero no está disponible online (probablemente porque
  es anterior a la digitalización, y la Centrale des bilans solo sirve PDF desde 1999 en adelante,
  confirmado también en otros 4 clubes de esta misma sesión).

## Verificación hecha en esta sesión

Se leyó el texto completo (vía `pdftotext -layout`) de los depósitos de 2011 (para confirmar el
gotcha "De Klokke"), 2012-2016 (para confirmar el cambio de nombre y de esquema) y se comparó el
campo "Naam"/nombre en cada uno. BCE 0460.444.251 = Club Brugge NV en todos los años desde 2012;
antes de eso, misma sociedad bajo "De Klokke".

## Duda para `dudas-por-club.md`

Los ejercicios 1999-2010 (esquema abreviado, "Verkort schema") no publican el campo Omzet
individual, solo el agregado "Brutomarge" — no hay forma de recuperar el desglose de ingresos para
esos años desde este documento. Si se llega a cargar alguno de esos ejercicios al sitio, la
categorización de revenueLines quedará necesariamente incompleta o habrá que buscar otra fuente
(prensa de la época) para el desglose.

- Último chequeo: 2026-09-17.
