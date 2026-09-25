# Rayo Vallecano de Madrid, S.A.D.

- **Hit bueno (2026-09-16).** 1 ejercicio real descargado a `Clubes/España/Rayo Vallecano/`,
  encontrado por búsqueda puntual (WebSearch) del PDF directo en
  `statics-maker.llt-services.com/ray/...` (mismo CMS compartido de otros clubes, ver
  `_notas-generales.md`), sin necesitar navegar `rayovallecano.es/club/ley-de-transparencia/
  cuentas-anuales-e-informe-de-auditoria`:
  - `informe-auditoria-cuentas-anuales-2024-2025.pdf` (50 págs., **con capa de texto real**,
    `pdftotext` funciona sin OCR) — confirmado por texto interno "RAYO VALLECANO DE MADRID, S.A.D.
    Informe de auditoría, Cuentas Anuales e Informe de Gestión del ejercicio cerrado a 30 de junio de
    2025". **Opinión de auditoría CON SALVEDADES** (no limpia) — anotar esto al mapear, puede afectar
    qué cifras se toman como definitivas.
- No se navegó la página de transparencia propia del club esta sesión (se encontró el PDF directo por
  búsqueda) — pendiente para una sesión futura: entrar a la página y ver si lista ejercicios
  anteriores con links propios, en vez de depender de que aparezcan indexados en buscadores.
- Pendiente: todos los ejercicios anteriores a 2024-25.
- Contacto: `rayovallecano.es/ley-de-transparencia`.
- Último chequeo: 2026-09-16.

## Cargado a Finanzas (2026-09-25)

- Ejercicio 2024/25 cargado en `data/rayovallecano-es-data.js` (`clubId: 'rayovallecano-es'`), a
  partir de `Clubes/España/Rayo Vallecano/informe-auditoria-cuentas-anuales-2024-2025.md`. La opinión
  de auditoría CON SALVEDADES (AUDRIA, S.L.) es por la valoración del derecho de uso sobre el Campo
  de Fútbol de Vallecas (Convenio con la Comunidad de Madrid, 5/7/2019): el auditor no recibió una
  tasación de un experto independiente. Es una salvedad de VALORACIÓN DE ACTIVO NO CORRIENTE, no
  afecta directamente ninguna línea de ingresos/gastos operativos cargada — queda documentada en el
  `note` de `sources{}` del archivo de datos y como duda abierta en `Admin/dudas-por-club.md` (si el
  derecho de concesión figura o no en el Activo No Corriente). La Cuenta de P&G perdió los números de
  su sección financiera/impositiva en la extracción de texto; se reconstruyeron por residuo cruzando
  el "Resultado del ejercicio" (impreso 2 veces, Balance y Nota 13) contra el desglose de impuesto de
  la memoria — ver comentario de cabecera del archivo de datos.
- Color de marca: `null`. Camiseta blanca dominante con franja diagonal roja (diseño desde 1949-50,
  inspirado en River Plate, según Wikipedia en español) — mismo bucket que River/Vélez/Sevilla/Real
  Madrid, verificado 2026-09-25.
- Pendiente sigue igual: todos los ejercicios anteriores a 2024-25, y navegar la página de
  transparencia propia del club.
