# 318: Open Notebook sobre las transcripciones (NO PROBADO)

Cerrado el 2026-10-21 por Pruebas 1, por decisión de la sesión principal. Si Guido quiere Docker, se reabre.

## Qué se verificó

- Repo: `lfnovo/open-notebook`, cuenta personal `lfnovo` (tipo User), no es un fork, MIT, creado 2024-10-21, último push 2026-10-20, unas 40 mil estrellas. Descripción: implementación abierta de Notebook LM.
- Instalación: Docker Compose (camino principal). Desde el código fuente también hace falta Docker, para SurrealDB, más Python 3.11-3.12, uv, Node 20.9+ y cuatro procesos (base, API, worker, frontend).
- Modelos: ninguna clave al instalar; se cargan en la interfaz. Pide un modelo de lenguaje y uno de embeddings; Anthropic no ofrece embeddings, así que habría que sumar otro proveedor (en `Admin/api-keys/` hay `gemini.env`).

## Por qué no se probó

1. Docker y el modelo de embeddings son una instalación de sistema: esta máquina no tiene Docker (ni uv ni SurrealDB) y Docker Desktop pide la contraseña de Guido. Cargar además una clave de otro proveedor en una app de terceros no se hizo.
2. Para las preguntas de ejemplo, un `grep` da lo mismo. Línea de base medida en `Clubes/Argentina/` (205 `.md`, 26 MB): «préstamos de socios o accionistas» da 0 clubes con `grep -i -E "pr[eé]stamos? (de|del|a) (socios|accionistas|directivos)|aportes? irrevocables|deudas? con (socios|directivos)"`, porque son asociaciones civiles. La pregunta es de patrón léxico y la contesta una expresión regular; lo que una base vectorial agregaría (preguntas por sentido, sin palabras fijas) no es lo que hoy hace falta para `dudas-por-club.md` ni para las referencias de `club-data-mapping`.

Queda sin medir: calidad de respuesta, tiempo y costo de embeddings sobre 26 MB, y si encuentra algo que el `grep` no.
