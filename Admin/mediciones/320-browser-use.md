# 320: Browser Use (cerrado, no se prueba)

Revisado el 2026-10-21 por Pruebas 1. Sin instalar nada y sin gasto de API.

## Qué es (verificado en el repo)

`browser-use/browser-use`: organización, MIT, creado 2024-10-31, último push 2026-10-20, unas 118 mil estrellas. Librería Python (3.11 o más, con `uv`) que maneja un navegador con un modelo de lenguaje; también una CLI y una nube propia con navegadores «stealth». La instalación local pide una clave de modelo (el README muestra OpenAI) y la nube regala 1 US$ de crédito a los registros nuevos. Su demo estrella incluye «handle the CAPTCHA».

## Por qué no hay portal donde probarlo

Se buscó en las 121 notas de `Admin/sourcing/` un portal con formulario de secuencia fija que hoy cueste mucho contexto del Browser pane. Cada candidato cae por una razón distinta:

- **Con captcha** (Hungría e-beszamolo con ALTCHA, Eslovenia AJPES, Francia, Perú INDECOPI): resolver o saltar un captcha no se hace desde estas sesiones; quedan en manos de Guido, como ya dicen las notas. Un agente que «maneja el CAPTCHA» no es una ventaja acá, es lo que no corresponde.
- **El caso más parecido, INDECOPI (Perú, 4 pasos: pestaña, razón social, captcha, modal)**, ya está confirmado como callejón sin salida: el detalle del expediente es texto procesal, nunca un PDF ni una cifra (`Admin/sourcing/Perú/Universitario de Deportes.md`).
- **Con bloqueo geográfico** (Polonia RDF: Incapsula pide IP polaca o de la UE): un agente local no cambia la IP.
- **Los que sí se pueden recorrer ya se recorren con `curl`**: Colombia SIIS (API JSON abierta, sin captcha), República Checa, Bélgica, Dinamarca, Grecia, Noruega. Un script determinista cuesta cero tokens por corrida; un agente con modelo cobra por cada paso.

## Conclusión

No sirve hoy. Los portales con secuencia fija o tienen captcha, o tienen bloqueo geográfico, o ya se scriptean. Se reabre si aparece un portal con formulario en secuencia, sin captcha, que no se pueda scriptear con `curl` y que cueste mucho en el Browser pane; en ese caso, probar la CLI contra ese único portal y medir tokens contra el Browser pane, con tope de gasto escrito antes (la clave del modelo iría a `Admin/api-keys/`, nunca pegada en una página).
