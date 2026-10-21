# 349: OpenSEO, Book to Skill y Open Generative AI (revisados, no se instalan)

Revisado el 2026-10-21 por Pruebas 1, con los links que pasó Guido. Se leyó el README y los documentos de instalación de cada repo con `gh`; no se instaló, clonó ni conectó nada, y no hubo gasto de API.

## OpenSEO — `every-app/open-seo`

- **Dueño y licencia:** organización `every-app`, MIT, creado 2026-02-27, último push 2026-10-20, unas 24 mil estrellas, no es un fork.
- **Qué hace:** alternativa de código abierto a Semrush y Ahrefs: investigación de palabras clave, seguimiento de posiciones, competidores, backlinks, auditoría de sitio y visibilidad en IA. Expone un servidor MCP y skills para agentes.
- **Costo:** el dato SEO viene de DataForSEO, que se paga aparte con clave propia: cuenta nueva con 1 US$ de prueba y **recarga mínima de 50 US$**. Autoalojarlo pide Docker (en una máquina propia) o Cloudflare, donde hay que activar R2, que exige tarjeta aun en el plan gratis. La versión alojada cuesta 10 US$ por mes y cobra 28 % extra sobre DataForSEO.
- **Para el proyecto (241, SEO de las páginas de club y liga):** lo que aportaría son volúmenes de búsqueda por idioma para elegir títulos y descripciones. El sitio es estático y esas páginas ya se generan desde los datos; la decisión de títulos se toma una vez, no a diario.
- **Conclusión:** no instalar ahora. Si el 241 necesita palabras clave, alcanza con una consulta puntual: con 50 US$ de recarga mínima se cubre de sobra, pero la plata y la clave son decisión de Guido y la clave iría a `Admin/api-keys/`. El servidor MCP no es necesario para eso.

## Book to Skill — `virgiliojr94/book-to-skill`

- **Dueño y licencia:** cuenta personal `virgiliojr94`, MIT, creado 2026-05-01, último push 2026-10-18, unas 35 mil estrellas, no es un fork. Además de la skill y la CLI, trae README en ruso y chino.
- **Qué hace:** convierte un libro técnico (PDF, EPUB, DOCX, MD...) o una carpeta de documentos en una skill con un archivo por capítulo, para que el agente lea el capítulo correcto y no el libro entero. Dice usar entre 24 y 51 veces menos tokens que pegar el libro; es una cifra del propio proyecto y no se verificó. Se instala clonando en `~/.agents/skills/` (fuera del repo) o con `npx skills add`. Destila con el modelo, así que cada libro cuesta tokens.
- **Para el proyecto:** no es para los balances. Los balances necesitan transcripción fiel, cifra por cifra, y eso lo hace el pipeline; resumir o «destilar estructura» es lo contrario de lo que se necesita. Donde podría servir: normas largas de contabilidad (NIIF, normas contables de un país, el manual de licencias de un regulador) como referencia que una sesión consulte por capítulo. Hoy eso lo cubren `club-data-mapping` y sus archivos de `referencia/`, y las skills del proyecto no se editan sin el ok de Guido.
- **Conclusión:** no instalar. Si aparece una norma larga que las sesiones releen una y otra vez, probar con una sola norma y medir tokens contra leerla a mano.

## Open Generative AI — `Anil-matcha/Open-Generative-AI`

- **Dueño y licencia:** cuenta personal `Anil-matcha` (el link de Guido estaba en minúsculas, el nombre real es con mayúsculas), MIT, creado 2023-05-09, último push 2026-10-21, unas 31 mil estrellas, no es un fork.
- **Qué hace:** una interfaz (aplicación de escritorio, instaladores para Mac, Windows y Linux) para generar imágenes y video con más de 600 modelos. **No es gratis ni corre los modelos local**: «Powered by MuAPI», una API comercial con créditos, a la que se mandan los prompts. El README promociona venderla con marca propia (plan de 49 US$ por mes) y presume de «sin filtros de contenido».
- **Para el proyecto:** el 313 (c) pide visuales para difundir datos. Una tarjeta con un dato sale mejor de los propios datos (el repo ya dibuja imágenes con `@resvg/resvg-js`), y un modelo de imagen puede inventar o deformar una cifra. Es la misma conclusión del 321 (Higgsfield).
- **Conclusión:** no instalar. Es un intermediario de una API de pago con un instalador que se corre en la máquina de Guido, para un uso que el proyecto no tiene.

## Resumen

| Herramienta | Dueño | Licencia | Costo de entrada | Decisión |
|---|---|---|---|---|
| OpenSEO | organización `every-app` | MIT | 50 US$ de recarga mínima (DataForSEO) | no ahora; una consulta puntual si el 241 la pide |
| Book to Skill | cuenta personal | MIT | tokens del modelo por libro | no; solo para una norma larga que se relea |
| Open Generative AI | cuenta personal | MIT | créditos de MuAPI | no |
