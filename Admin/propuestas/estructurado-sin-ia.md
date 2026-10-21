# Lo que ya viene estructurado no se paga con IA (ok de Guido)

Caso: el ensayo del lote 133 (68 cuentas británicas en iXBRL) daba US$16,48 de localizar y extraer con IA, cuando las cifras ya vienen etiquetadas. Nadie lo frenó: ni la sesión de carga, ni la principal, ni la Auditora. Guido: «no puede volver a pasar y hoy solo depende de que vos te acuerdes. Skill, convención, hook»; «auditoría debió habernos avisado»; «ok a skills».

## Texto exacto 1: skill `club-or-year-onboarding`, sección 4, después del punto «Para bajar el gasto de API»

- **Antes de pagar, el camino sin IA.** Si el ensayo da costo de localizar, extraer o transcribir en un documento que trae las cifras etiquetadas o en un formato que se lee sin interpretar (iXBRL o XBRL, el XML o CSV del depósito, los códigos NBB), no se corre: se le pide a Pipeline el escalón que lee esa estructura, y la IA queda solo para lo que ese escalón no cierra.

## Texto exacto 2: skill `auditoria-finance-of-sports`, sección 4, al final de «Sí se puede, y es donde conviene buscar»

- **Pagar IA por lo que ya viene estructurado es plata tirada, y la Auditora lo marca sin que se lo pidan.** Al aprobar una tool o un lote, y al comparar lo gastado en cada merge, mira si el formato del documento (iXBRL o XBRL, XML o CSV del depósito, códigos NBB) ya trae lo que se le pide a la IA. Si lo trae, lo frena y pide el escalón que lee esa estructura.

## Texto exacto 3: `Admin/CONVENCIONES.md`, después del punto del presupuesto de cada sesión

  - **Lo que ya viene estructurado no se paga con IA.** Si el documento trae las cifras etiquetadas o en un formato que se lee sin
    interpretar (iXBRL o XBRL, el XML o CSV del depósito, los códigos NBB), la carga sale de ahí; la IA entra solo para lo que esa
    lectura no cubre, y el ensayo lo dice documento por documento. Lo vigilan la skill de onboarding (sección 4), la de auditoría
    (sección 4) y el freno de `tools/lote.mjs`.

## Anclas (cómo queda cada texto con la línea que lo sigue)

- **Antes de pagar, el camino sin IA.** Si el ensayo da costo de localizar, extraer o transcribir en un documento que trae las cifras etiquetadas o en un formato que se lee sin interpretar (iXBRL o XBRL, el XML o CSV del depósito, los códigos NBB), no se corre: se le pide a Pipeline el escalón que lee esa estructura, y la IA queda solo para lo que ese escalón no cierra.
- **Ejemplos concretos:**

agregar el chequeo.
- **Pagar IA por lo que ya viene estructurado es plata tirada, y la Auditora lo marca sin que se lo pidan.** Al aprobar una tool o un lote, y al comparar lo gastado en cada merge, mira si el formato del documento (iXBRL o XBRL, XML o CSV del depósito, códigos NBB) ya trae lo que se le pide a la IA. Si lo trae, lo frena y pide el escalón que lee esa estructura.

---

## El freno en la tool (Pipeline 13, condición nueva: va a la Auditora por la sección 7)

`tools/lote.mjs --ejecutar` no llama a localizar, extraer ni transcribir pagos sobre un documento cuyo `.md` salió de un motor determinista (hoy «xhtml-ixbrl (determinista)») hasta que el escalón que lee las etiquetas haya corrido y no cierre; el ensayo muestra, por documento, si iría por etiquetas o por IA. Y un chequeo de `audit.js`, P1: una llamada paga registrada en `gasto.mjs` sobre un documento de motor determinista sin el escalón previo.
