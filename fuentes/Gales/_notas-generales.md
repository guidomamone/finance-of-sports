# Gales — notas generales (sesión 2026-10-03)

Mismo Companies House que Inglaterra (números de 8 dígitos; los clubes de la Cymru Premier son sociedades de Inglaterra y Gales). Procedimiento, tipos de presentación y gotcha del OCR (`-l eng`, PDF escaneados): `fuentes/Inglaterra/_notas-generales.md`. Cardiff City, Swansea City y Wrexham ya están bajo `Clubes/Inglaterra/` y `fuentes/Inglaterra/`; no se duplican acá.

**Regla P&L (la que decide todo en Gales):** los clubes de la Cymru Premier son *small companies* y casi todos usan la exención de la s.444 (no depositan el Income Statement). Verificado por OCR (2026-10-03):

- **Con cuenta de resultados:** Aberystwyth Town (6 cierres, nov-2019 a nov-2024) y Haverfordwest County (6: 2016, 2018, 2021-2024).
- **Sin P&L en Companies House:** The New Saints, Bala Town, Penybont, Caernarfon Town. Los "Total exemption full accounts" de Caernarfon (8 págs.) no traen P&L.
- **The New Saints es la excepción útil:** en `tnsfc.co.uk` (WordPress) publica `company financial information` anual y dos de esos documentos (FY2021 y FY2025) incluyen el Profit and Loss Account con comparativo, a diferencia del filing de Companies House.
- `tnsfc.co.uk` da 403 a `curl` con User-Agent corto; con User-Agent de Chrome completo + `Accept: application/pdf` baja bien.
- Bala, Penybont y Caernarfon: sin publicación propia encontrada; no hay señal de que exista otra versión, así que son dead-end real (regla 0.3).
- Penybont tiene una sociedad nueva (`Penybont Community Football Club Limited`, 15765521, 2024) sin ejercicios aún: revisar en 2027.
