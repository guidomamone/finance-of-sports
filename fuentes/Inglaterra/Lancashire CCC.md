# Lancashire CCC

- **Deporte**: Cricket
- **Liga / competencia**: County Championship + Vitality Blast + Metro Bank One Day Cup (ECB, Inglaterra y Gales)
- **Entidad legal**: Lancashire County Cricket Club Limited — registered society n° **28451R** (societyId interno de la FCA: `7724`)
- **Canal**: Mutuals Public Register de la FCA (`mutuals.fca.org.uk`), no Companies House.

## Qué se bajó (sesión 2026-09-13)

Formulario `Annual Return (AR30)` de la FCA **con los estados financieros auditados completos
adjuntos**, ejercicio cerrado el **31 de diciembre de 2025**.

- `Clubes/Inglaterra/Lancashire CCC/lancashire-ccc-annual-return-and-accounts-2025.pdf` — 34 páginas, ~94.000 caracteres de texto extraíble.

## Cifra de control ya verificada

`Turnover 64.007.000` en el formulario AR30, y `Total income for the year 64.007` (miles) contra
`34.130` del ejercicio anterior en el estado — o sea **£64,0 M**, casi el doble que el año previo.
Ese salto es enorme y tiene que tener una explicación en el documento (Old Trafford es sede de test
matches y de conciertos, el calendario cambia mucho de año a año): **no cargar esta cifra sin leer
primero la nota que la explica.**

Leída directo del estado de resultados del propio PDF con `pdftotext -layout`, no de prensa. Sirve
como tie-out para cuando se cargue el ejercicio.

## Serie disponible sin bajar

**33 memorias anuales, de 1996 a 2025.**

## Nota común a los condados de cricket: NO están en Companies House

Los condados no son sociedades limitadas sino **registered societies** (número terminado en `R`), y
depositan en el **Mutuals Public Register de la FCA**, no en Companies House. Buscados en Companies
House aparecen listados pero con el historial de presentaciones vacío — eso no significa que no
publiquen. El procedimiento completo (endpoints, el gotcha de las dos formas del JSON, y el CSV con
el padrón entero de 32.430 sociedades) está en `fuentes/Inglaterra/_notas-generales.md`, sección 4.

**Ventaja fuerte sobre Companies House**: estos PDFs tienen capa de texto de verdad, así que se leen
con `pdftotext -layout` y **no hace falta OCR**. Y el histórico es mucho más profundo.

- Último chequeo: 2026-09-13.
