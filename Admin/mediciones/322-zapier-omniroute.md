# 322: Zapier MCP y OmniRoute (revisados, no se instalan)

Revisado el 2026-10-21 por Pruebas 1. Nada instalado ni conectado, sin gasto de API.

## Zapier MCP

Fuente: `zapier.com/mcp` y `zapier.com/pricing`.

- Conecta Claude con las aplicaciones de la cuenta de Zapier. Viene incluido en todos los planes.
- **Cada llamada de herramienta gasta 2 tareas** de la misma cuota de los Zaps. Plan gratis: 100 tareas por mes, o sea unas 50 llamadas. Professional, 750 tareas: 19,99 US$ por mes facturado anual (29,99 mensual); 1.500 tareas: 39 US$ anual (58,50 mensual). Team, 2.000 tareas: 69 US$ anual (103,50 mensual).
- Se elige qué aplicaciones y acciones se exponen; cada acción queda en el Historial y se puede revocar. Las credenciales de cada aplicación se quedan en la capa de Zapier y no pasan por el modelo.
- No se pudo leer cómo se autentica (la documentación está en `docs.zapier.com/mcp`).

**Conclusión:** solo sirve si el flujo de mails (335) o el de publicación (313) necesitan «respuesta → fila» o programar posts. El 335 ya tiene su camino (Resend, la cola en `Admin/outreach/` y `tools/outreach-send.js`) y hay un conector de Gmail; ninguno pide Zapier. Con 50 llamadas gratis por mes alcanza para probar un flujo, no para operarlo. No conectar ahora; reabrir cuando el 313 elija dónde se publica y si ese lugar no tiene su propio programador.

## OmniRoute

Fuente: el repo `diegosouzapw/OmniRoute` y su README.

- **Repo:** cuenta personal (`diegosouzapw`), MIT, creado 2026-02-13, último push 2026-10-21 (versión 3.8.52 del 2026-10-19), unas 79 mil estrellas y 11,5 mil bifurcaciones, 466 incidencias abiertas, 1 aviso de seguridad. El mantenedor tiene 5.625 contribuciones; el segundo, 378. Es un proyecto de una persona con mucha gente alrededor, no una organización.
- **Qué hace:** un servidor local (`localhost:20128/v1`, compatible con OpenAI) que reparte cada pedido entre 375 proveedores con reintento automático (suscripción, clave de API, barato, gratis), compresión de tokens y memoria opcional.
- **Qué concentra:** las claves de cada proveedor, los inicios de sesión OAuth de cuentas de suscripción y todos los prompts. Trae además una función de interceptar y descifrar tráfico (MITM/TPROXY, con una autoridad certificadora propia) y un instalador de `.env` en el `postinstall`. No se auditó el código ni el modelo de seguridad de nada de eso; el README dice que el cliente no sube prompts ni telemetría y no se verificó.
- **Con las reglas del proyecto:** el gasto de API se abarata hoy con la API de lotes y con pasar de Opus a Sonnet después de medir; Haiku no se usa. Un enrutador con «el más barato primero» o proveedores gratis empuja justo hacia modelos que el proyecto no usa y manda prompts de categorización a servicios gratuitos que pueden guardarlos. Usar suscripciones por OAuth fuera de la aplicación oficial puede violar sus términos (el propio README marca proveedores `tos: avoid`).

**Conclusión:** no instalar. El ahorro que promete ya lo cubren la API de lotes y la medición Opus a Sonnet, y el riesgo (todas las claves y prompts en un proceso local de un repo joven, con interceptación de tráfico) no compensa. Si se quisiera probar igual: solo en un contenedor o usuario aparte, sin las claves de `Admin/api-keys/`, con una clave de prueba con tope bajo, y leer antes `docs/security/` del repo.

## Sin ubicar

OpenSEO (SEO del 241), Book to Skill y Open Generative AI: faltan los links, hay que pedírselos a Guido.
