# Yorkshire CCC

- **Deporte**: Cricket
- **Liga / competencia**: County Championship + Vitality Blast + Metro Bank One Day Cup (ECB, Inglaterra y Gales)
- **Entidad legal**: The Yorkshire County Cricket Club Limited — registered society n° **28611R** (societyId interno de la FCA: `9495`)
- **Canal**: Mutuals Public Register de la FCA (`mutuals.fca.org.uk`), no Companies House.

## Qué se bajó (sesión 2026-09-13)

Formulario `Annual Return (AR30)` de la FCA **con los estados financieros auditados completos
adjuntos**, ejercicio cerrado el **31 de diciembre de 2025**.

- `Clubes/Inglaterra/Yorkshire CCC/yorkshire-ccc-annual-return-and-accounts-2025.pdf` — 55 páginas, ~131.000 caracteres de texto extraíble.

## Cifra de control ya verificada

`Turnover 18.872.262` — **£18,9 M**, el más chico de los cuatro. La memoria narrativa del propio
documento aporta el desglose: los ingresos comerciales pasaron de £2,6 M en 2024 a £3,6 M en 2025.

Leída directo del estado de resultados del propio PDF con `pdftotext -layout`, no de prensa. Sirve
como tie-out para cuando se cargue el ejercicio.

## Serie disponible sin bajar

**33 memorias anuales, de 1999 a 2025.**

**Nota**: el número de registro `28611R` está tomado del padrón de la FCA por el nombre de la
sociedad; el identificador que sí se usó y se verificó en esta sesión es el `societyId` 9495, que es
el que hace falta para bajar los documentos. Confirmar el número de registro contra el PDF antes de
citarlo públicamente.

## Nota común a los condados de cricket: NO están en Companies House

Los condados no son sociedades limitadas sino **registered societies** (número terminado en `R`), y
depositan en el **Mutuals Public Register de la FCA**, no en Companies House. Buscados en Companies
House aparecen listados pero con el historial de presentaciones vacío — eso no significa que no
publiquen. El procedimiento completo (endpoints, el gotcha de las dos formas del JSON, y el CSV con
el padrón entero de 32.430 sociedades) está en `fuentes/Inglaterra/_notas-generales.md`, sección 4.

**Ventaja fuerte sobre Companies House**: estos PDFs tienen capa de texto de verdad, así que se leen
con `pdftotext -layout` y **no hace falta OCR**. Y el histórico es mucho más profundo.

- Último chequeo: 2026-09-13.
