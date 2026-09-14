# Warwickshire CCC

- **Deporte**: Cricket
- **Liga / competencia**: County Championship + Vitality Blast + Metro Bank One Day Cup (ECB, Inglaterra y Gales)
- **Entidad legal**: The Warwickshire County Cricket Club Limited — registered society n° **10253 (societyId)** (societyId interno de la FCA: `10253`)
- **Canal**: Mutuals Public Register de la FCA (`mutuals.fca.org.uk`), no Companies House.

## Qué se bajó (sesión 2026-09-13)

Formulario `Annual Return (AR30)` de la FCA **con los estados financieros auditados completos
adjuntos**, ejercicio cerrado el **31 de diciembre de 2025**.

- `Clubes/Inglaterra/Warwickshire CCC/warwickshire-ccc-annual-return-and-accounts-2025.pdf` — 37 páginas, ~113.000 caracteres de texto extraíble, **16 MB** (el más pesado del lote, tiene la memoria ilustrada adentro).

## Cifra de control ya verificada

`Turnover 40.389.579` — **£40,4 M**. El documento menciona además un salto a £15,3 M en un rubro que
pasó de £2,2 M en 2024: identificar cuál es antes de cargar (el club opera Edgbaston, sede de test
matches y de conciertos, así que el mix cambia fuerte por año).

Leída directo del estado de resultados del propio PDF con `pdftotext -layout`, no de prensa. Sirve
como tie-out para cuando se cargue el ejercicio.

## Serie disponible sin bajar

**37 memorias anuales, de 1993 a 2025** — la serie más larga de los cuatro condados bajados.

**Nota**: el club juega como "Birmingham Bears" en el torneo corto (T20) y como Warwickshire en el
resto. Es el mismo club y la misma sociedad, no dos entidades.

## Nota común a los condados de cricket: NO están en Companies House

Los condados no son sociedades limitadas sino **registered societies** (número terminado en `R`), y
depositan en el **Mutuals Public Register de la FCA**, no en Companies House. Buscados en Companies
House aparecen listados pero con el historial de presentaciones vacío — eso no significa que no
publiquen. El procedimiento completo (endpoints, el gotcha de las dos formas del JSON, y el CSV con
el padrón entero de 32.430 sociedades) está en `fuentes/Inglaterra/_notas-generales.md`, sección 4.

**Ventaja fuerte sobre Companies House**: estos PDFs tienen capa de texto de verdad, así que se leen
con `pdftotext -layout` y **no hace falta OCR**. Y el histórico es mucho más profundo.

- Último chequeo: 2026-09-13.
