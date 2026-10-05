# Eslovaquia — `registeruz.sk`: API pública, sin cuenta ni captcha

Register účtovných závierok: están todos los documentos de las a.s./s.r.o., incluidos los informes
del auditor y las memorias, y se descargan sin login. Cadena de llamadas (todas GET, User-Agent de
navegador):

1. **Buscar el ID por nombre**: `https://www.registeruz.sk/cruz-public/domain/suggestion/search?query=<nombre>`
   → `id`, `entNumber` (IČO), `entityName`. La API no busca por IČO (el parámetro `ico` se ignora).
2. `.../cruz-public/api/uctovna-jednotka?id=<ID>` → `idUctovnychZavierok` (estados por año) e
   `idVyrocnychSprav` (memorias).
3. `.../api/uctovna-zavierka?id=<Z>` → `obdobieDo`, `typ` (saltear "Mimoriadna"),
   `idUctovnychVykazov`; `.../api/uctovny-vykaz?id=<V>` → `prilohy` (adjuntos).
4. **Descarga**: `.../cruz-public/domain/financialreport/attachment/<id-priloha>`, sin auth.

- `POD_...pdf` es el formulario oficial (Súvaha + Výkaz ziskov a strát), el de mejor extracción. La
  Správa audítora a veces trae los estados completos, escaneados.
- Las sociedades chicas no auditan: presentan solo notas + POD.
- Trampas de entidad: homónimos de hockey, básquet y tenis; cambios de figura jurídica (Komárno pasó
  de asociación a a.s. en 2024); entidades hermanas (Podbrezová tiene dos a.s. con el mismo domicilio,
  y la siderúrgica no es el club).
