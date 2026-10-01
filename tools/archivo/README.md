# tools/archivo — tools que ya no se usan

No se borran (su historia y sus resultados están en `Admin/CHANGELOG.md`), pero no forman parte de ningún proceso y nadie las llama.
Sus `import` relativos (`./rutas.mjs`, etc.) ya no resuelven desde esta carpeta: para correr una de nuevo, devolverla a `tools/`.

- `localizar-extraer.mjs` — el test "localizar y extraer por página" del 2026-10-01 (US$ 3,52, 31 años ya cargados). Descartado como
  proceso porque elegía páginas enteras; lo reemplazó el proceso nuevo (`indice-bloques`, `localizar`, `extraer`, `verificar`).
- `test-motores.mjs` — el test que comparó Mistral, Gemini y Claude para transcribir (resultados en `Admin/tests/test-motores-resultados.md`).
  Terminado: de ahí salió el criterio de transcripción de `CLAUDE.md`.
