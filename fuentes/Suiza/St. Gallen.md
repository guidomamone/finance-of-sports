# FC St. Gallen

- **Deporte**: Fútbol
- **Liga / competencia**: Super League (Suiza, 1ª división)
- **Entidad legal**: FC St.Gallen AG (Zefix firm/742008) — hay además una "FC St. Gallen Event AG"
  separada (Zefix firm/793308), probablemente la operadora del estadio/eventos (mismo patrón que la
  "Event AG" de otros clubes suizos con estadio propio importante).
- **Canal**: sitio propio, `fcsg.ch/pages/geschaeftsbericht` (plataforma "aico.swiss", igual que FC
  Basel — ver `fuentes/Suiza/_notas-generales.md` sección 4). El listado completo de años solo aparece
  al renderizar la página con JS (`document.querySelectorAll('a[href*=".pdf"]')` en el Browser pane);
  un `curl` plano no trae los links.

## Qué se bajó (sesión 2026-09-17)

**9 documentos, `Clubes/Suiza/St. Gallen/`**, cubriendo **7 ejercicios consecutivos (2018/19-2024/25)**:

- `geschaeftsbericht-2018-19.pdf` a `geschaeftsbericht-2024-25.pdf` — un Geschäftsbericht por
  temporada, serie sin huecos.
- `revisionsbericht-ag-2024-25.pdf` y `revisionsbericht-event-ag-2024-25.pdf` — informes de auditoría
  separados de la AG y de la Event AG, solo para el último ejercicio (los años anteriores no tenían
  este documento separado listado en la página).

El ejercicio 2025/26 todavía no cerró — la página solo tiene el "Protokoll der GV vom 20. Oktober
2025" (acta de la asamblea), sin Geschäftsbericht todavía.

## Verificación

No se corrió `pdftotext` línea por línea sobre los 9 archivos (esa verificación fila-por-fila es tarea
de mapeo de datos, fuera de este alcance de sourcing), pero el nombre y tamaño de cada PDF (3-16 MB)
es consistente con un Geschäftsbericht completo, no un resumen.

- Último chequeo: 2026-09-17.
