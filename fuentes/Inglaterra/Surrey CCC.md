# Surrey CCC

- **Deporte**: Cricket
- **Liga / competencia**: County Championship + Vitality Blast + Metro Bank One Day Cup (ECB, Inglaterra y Gales)
- **Entidad legal**: Surrey County Cricket Club Limited — registered society n° **27896R** (societyId interno de la FCA: `23803`)
- **Canal**: Mutuals Public Register de la FCA (`mutuals.fca.org.uk`), no Companies House.

## Qué se bajó (sesión 2026-09-13)

Formulario `Annual Return (AR30)` de la FCA **con los estados financieros auditados completos
adjuntos**, ejercicio cerrado el **31 de enero de 2026**.

- `Clubes/Inglaterra/Surrey CCC/surrey-ccc-annual-return-and-accounts-2025.pdf` — 37 páginas, ~58.000 caracteres de texto extraíble.
- `Clubes/Inglaterra/Surrey CCC/surrey-ccc-annual-return-and-accounts-2024.pdf` — ejercicio anterior.

## Cifra de control ya verificada

`Turnover 60.320` (miles de £) contra `48.681` del ejercicio anterior — o sea **£60,3 M de ingresos**,
el condado más grande de los cuatro bajados.

Leída directo del estado de resultados del propio PDF con `pdftotext -layout`, no de prensa. Sirve
como tie-out para cuando se cargue el ejercicio.

## Serie disponible sin bajar

**35 memorias anuales, de 1994 a 2026.** Es la serie histórica más larga de cualquier club de
cualquier país del proyecto — 32 años consecutivos.

## Gotcha propio de Surrey: el ejercicio NO es el año calendario

A diferencia de los otros tres condados (que cierran el 31 de diciembre), Surrey cierra el **31 de
enero**, así que su ejercicio va de febrero a enero. El documento bajado como "2025" cubre en
realidad el año terminado el 31/1/2026. Al cargarlo hay que decidir explícitamente a qué temporada
se le atribuye — la misma clase de decisión que ya se tomó para los ejercicios irregulares de Racing.

## Nota común a los condados de cricket: NO están en Companies House

Los condados no son sociedades limitadas sino **registered societies** (número terminado en `R`), y
depositan en el **Mutuals Public Register de la FCA**, no en Companies House. Buscados en Companies
House aparecen listados pero con el historial de presentaciones vacío — eso no significa que no
publiquen. El procedimiento completo (endpoints, el gotcha de las dos formas del JSON, y el CSV con
el padrón entero de 32.430 sociedades) está en `fuentes/Inglaterra/_notas-generales.md`, sección 4.

**Ventaja fuerte sobre Companies House**: estos PDFs tienen capa de texto de verdad, así que se leen
con `pdftotext -layout` y **no hace falta OCR**. Y el histórico es mucho más profundo.

- Último chequeo: 2026-09-13.
