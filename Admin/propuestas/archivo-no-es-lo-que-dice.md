# Un archivo bajado que no es lo que dice su extensión (para el ok de Guido)

Caso: Brøndby 2025, `Clubes/Dinamarca/Brøndby/aarsrapport-2025-06-30.xhtml`, venía comprimido con gzip (el depósito lo sirvió así). Ninguna tool lo leía y nadie lo vio hasta que Pipeline 13 midió los 245 XHTML. Guido: «necesitamos una regla, skill o convención para casos así, para que no ocurra, o que haya un troubleshooting si ocurre».

## Texto exacto 1: skill `club-sourcing`, «Gotchas de tooling», como último punto

- **Un archivo bajado se mira antes de darlo por guardado: que sea lo que dice su extensión.** `file <archivo>` tiene que decir PDF, XHTML o HTML, o XML. Si dice gzip o Zip (un depósito que sirve el archivo comprimido, como `regnskaber.virk.dk`), se descomprime a un archivo nuevo, `<base>-descomprimido.<ext>`, y el original queda. Si un `.pdf` resulta ser HTML, es una página de error o de login, no el documento: se vuelve a bajar. Lo vigila `audit.js` (`archivo-no-es-lo-que-dice`).

Ancla (cómo queda con el punto anterior):

en paralelo que usan el browser, decírselo en el prompt.
- **Un archivo bajado se mira antes de darlo por guardado: que sea lo que dice su extensión.** `file <archivo>` tiene que decir PDF, XHTML o HTML, o XML. Si dice gzip o Zip (un depósito que sirve el archivo comprimido, como `regnskaber.virk.dk`), se descomprime a un archivo nuevo, `<base>-descomprimido.<ext>`, y el original queda. Si un `.pdf` resulta ser HTML, es una página de error o de login, no el documento: se vuelve a bajar. Lo vigila `audit.js` (`archivo-no-es-lo-que-dice`).

## Texto exacto 2: `Admin/PIPELINE.md`, «Documentos fuente», un párrafo nuevo (no es skill)

**Un documento que una tool no lee.** Primero `file <archivo>`. Si no es lo que dice la extensión (gzip, Zip, una página HTML de error), el problema es la descarga y no la tool: se descomprime a un archivo nuevo o se vuelve a bajar (skill `club-sourcing`, «Gotchas de tooling»). Si es lo que dice y la tool falla, va a `Admin/registros/frenados-por-script.jsonl` y lo arregla Pipeline.

## El chequeo (Pipeline; la Auditora lo aprueba por la sección 7)

`audit.js`, `archivo-no-es-lo-que-dice`, P2: un `.pdf`, `.xhtml` o `.xml` de `Clubes/` cuyos primeros bytes no son de ese formato (gzip `1f 8b`, Zip `PK`, o HTML en un `.pdf`), salvo que al lado exista su `<base>-descomprimido.<ext>`. Hoy daría 0 (Brøndby ya tiene su copia).
