---
name: club-outreach
description: Proceso para escribirle un mail a un club de fútbol (pedirle un documento, o una aclaración de categorización) y mandarlo de verdad, sin que cada envío pase por la aprobación de Guido en el chat. Usar cuando un club tiene preguntas pendientes en `Admin/dudas-por-club.md` o quedó marcado "candidato a mail" por `club-sourcing` (sección 0.3) y llegó el momento de escribirle. Es el proceso de ENVÍO (redactar, revisar, mandar, hacer seguimiento) — no el criterio de CUÁNDO algo amerita un mail, que ya vive en `club-sourcing` 0.3 y en el propio `dudas-por-club.md`.
---

# Cómo escribirle a un club, de verdad

Reemplaza el modelo original del to-do 51 ("Claude redacta, Guido aprueba en el chat, envío por
Gmail") por un pipeline fuera del chat. Decisión de Guido, 2026-09-24, después de comparar
alternativas (Gmail/MCP, APIs transaccionales, no-code, agentes de mail dedicados — ver el doc de
comparación de esa sesión si hace falta el detalle de por qué se descartó cada una). Arranca
directo en la Etapa 1 de ese diseño: nada de "statu quo manual" primero.

## 0. La restricción que explica por qué esto existe

Cualquier sesión de Claude Code (esta plataforma, no Gmail ni ningún conector) exige confirmación
explícita en el momento para "mandar un mensaje en nombre del usuario" — sin excepción, sin importar
qué scope tenga un conector de mail. Eso hace que sea IMPOSIBLE mandar mails desatendidos mientras
todo el proceso viva adentro de una sesión de chat: cada envío, sin importar cuántos se aprueben
"de antemano", vuelve a pedir un sí explícito. La única forma real de lograr envío desatendido es
sacar el paso de ENVÍO, específicamente, afuera de cualquier sesión de chat.

Por eso el pipeline separa tajantemente tres pasos, y solo uno de ellos corre afuera del chat:

1. **Redactar el borrador** — lo hace una sesión de Claude Code. Escribir un archivo no es mandar un
   mensaje: no hay restricción acá.
2. **Revisar y aprobar** — lo hace Guido, editando archivos. Tampoco hay restricción.
3. **Enviar de verdad** (`tools/outreach-send.js`, llama a la API de Resend) — **esto SÍ tiene que
   correr afuera de cualquier sesión de Claude Code.** Guido lo corre él mismo desde su terminal (a
   mano, o con un cron/launchd propio de su Mac). Ninguna sesión de Claude Code lo ejecuta con el
   Bash tool, NI AUNQUE GUIDO LO PIDA EN EL CHAT ("mandalo", "corré el envío") — pedirlo en el chat y
   que una sesión lo corra ahí mismo es, en los hechos, la misma aprobación mensaje-por-mensaje que
   esto existe para evitar. Si Guido pide correrlo desde el chat, la respuesta es recordarle esto y
   pasarle el comando para que lo corra él, no ejecutarlo.

## 1. Etapa 1 (ACTIVA HOY): flujo completo

Sin regla de disparo automática todavía — Guido sigue decidiendo cuándo escribirle a un club. Lo que
cambia respecto del modelo viejo es SOLO el canal de envío (Resend en vez de Gmail) y que el envío
ya no necesita aprobación mensaje-por-mensaje en el chat una vez que Guido corre el script.

**Candidatos** (de dónde sale "a este club le escribimos"): preguntas acumuladas en
`Admin/dudas-por-club.md` para ese club, o un club marcado "candidato a mail" por `club-sourcing`
0.3 (documento confirmado que existe pero no descargable). Guido (o una sesión, si Guido lo pide)
decide cuándo un club está listo — no hay umbral automático en esta etapa.

**Redactar** (una sesión de Claude Code, con el Write tool):

- Leer las preguntas pendientes del club en `Admin/dudas-por-club.md` y/o el motivo de la escalada en
  `fuentes/<País>/<Club>.md`.
- **Contacto**: si el club ya tiene entrada en `Admin/outreach/contactos.json`, usar ese email. Si
  no, buscarlo en ese mismo momento (sitio oficial, nota de prensa, formulario de contacto — mismos
  canales que ya usa `club-sourcing`) y guardarlo recién ahí, en `contactos.json`, con `email`,
  `source` y `date` de hoy. **No depender de que una sesión de sourcing anterior lo haya guardado
  proactivamente** — es más confiable buscarlo en el momento en que de verdad hace falta que confiar
  en que nadie se olvidó un paso opcional en otra sesión (ver sección 3).
- Escribir el borrador en `Admin/outreach/cola/<clubId>-<fecha>.md`, con este formato exacto
  (lo parsea `tools/outreach-send.js` más adelante, tiene que ser preciso):

  ```
  ---
  club: velez
  to: prensa@velezsarsfield.com.ar
  subject: Consulta sobre el Balance 2024/25
  ---
  Cuerpo del mail en texto plano, tono personal (lo firma Guido), directo y corto.
  ```

- Tono: viene de la casilla personal de Guido en espíritu aunque el dominio técnico sea uno de
  proyecto — corto, directo, sin sonar a plantilla. Un mail por club, nunca un mismo texto calcado
  mandado a varios clubes la misma semana (ver blind spot de "señal de spam por parecido" en el doc
  de comparación).
- Avisarle a Guido en el chat que el borrador está listo en `cola/`, con el path exacto.

**Revisar y aprobar** (Guido, con los archivos): lee el `.md` en `cola/` (por Finder, `cat`, o
pidiéndole a una sesión que se lo muestre y lo edite si hace falta) y lo mueve a
`Admin/outreach/aprobados/` cuando está conforme. Un archivo que Guido descarta se borra de `cola/`
sin más.

**Enviar** (Guido, desde su terminal, NUNCA una sesión de Claude Code — ver sección 0):

```
source Admin/outreach/.env
node tools/outreach-send.js
```

El script manda cada `.md` de `aprobados/` vía Resend y lo mueve a `Admin/outreach/enviados/` con la
fecha en el nombre. Si algo falla (mail rebotado, API caída) el archivo se queda en `aprobados/` y
el script lo dice en la consola — no hace falta ir a buscar nada a mano. **No hay ningún archivo de
estado que se actualice aparte**: el historial de envíos ES la carpeta `enviados/` (nombre =
fecha, contenido = club/destinatario/asunto) — si algún día hace falta consultarlo por club, se lee
esa carpeta, no se mantiene un índice duplicado que nadie va a acordarse de tocar.

**Respuestas**: Resend tiene una función nativa de recepción (pestaña "Receiving" del dashboard,
lanzada 2025) — configura un registro MX en el subdominio y puede reenviar cada mail entrante a
otra casilla automáticamente, sin necesidad de armar forwarding a mano a nivel DNS (ver sección 2).
Configurarla para que reenvíe a la casilla de Gmail de Guido. No hay nada automático que detecte
"este club respondió" — si Guido ve la respuesta en Gmail, que lo diga en una sesión para sacar la
pregunta de `Admin/dudas-por-club.md` si ya se resolvió.

## 2. Infraestructura (bloqueado en Guido, no en una sesión de Claude Code)

Ninguna sesión de Claude Code puede crear cuentas ni tocar DNS por su cuenta — esto lo hace Guido:

1. **Cuenta de Resend** (resend.com) — hecho 2026-09-24 (Guido se conectó con GitHub). Plan Pro
   ($20/mes) recomendado para no toparse con el tope de 100 mails/día del free tier apenas el
   volumen crezca; a esta escala (Etapa 1) el free alcanzaría, pero conviene pasar a Pro si el
   volumen va a subir. Sigue en free hasta que Guido lo cambie — no urge para arrancar.
2. **Subdominio dedicado** (ej. `outreach.financeofsports.com`): en el dashboard, `Domains` → `Add
   Domain`, poner el subdominio. Resend devuelve los registros DNS que hay que agregar (SPF/DKIM, y
   uno MX si además se activa Receiving del punto 3) — se agregan donde esté el DNS de
   `financeofsports.com` (el panel de Netlify, o el registrador si el dominio no usa Netlify DNS).
   Después, en Resend, `Verify DNS Records`. Separado a propósito de cualquier otro uso de mail del
   dominio principal, para no mezclar reputación de envío.
3. **Recibir respuestas**: pestaña `Receiving` del dashboard de Resend (feature nativo, no hace
   falta configurar forwarding a mano) → activarla para el subdominio y apuntar el reenvío a la
   casilla de Gmail de Guido. Necesita el registro MX que Resend da en el mismo paso del punto 2.
4. **API key de Resend** → `API keys` en el dashboard → `Create API Key` (el valor solo se muestra
   una vez, copiarlo ahí mismo) → pegarlo en `Admin/outreach/.env` (gitignoreado, ver `.gitignore`
   — NUNCA se trackea):
   ```
   export RESEND_API_KEY="re_xxxxxxxx"
   export OUTREACH_FROM_EMAIL="Guido Mamone <info@outreach.financeofsports.com>"
   ```

Hasta que estos 4 pasos estén hechos, el pipeline de redacción/revisión funciona igual (los
borradores se acumulan en `cola/`/`aprobados/`), pero `tools/outreach-send.js` va a fallar con un
mensaje claro pidiendo las variables de entorno.

## 3. Candidatos: quién alimenta la cola

Dos fuentes, ya documentadas en otros skills — este skill no las duplica, solo las consume:

- **`Admin/dudas-por-club.md`**: preguntas de categorización/desglose sin resolver. Cuando una
  sesión de `club-data-mapping`/`club-or-year-onboarding` anota una pregunta ahí, no hace falta
  ningún paso extra para este skill — se lee directo de ahí al momento de redactar.
- **`club-sourcing` sección 0.3**: clubes marcados "candidato a mail" (documento confirmado que
  existe pero no descargable). Si en el camino de buscar el documento aparece un email de contacto
  (prensa@, secretaría@, relaciones institucionales), `club-sourcing` puede guardarlo en
  `Admin/outreach/contactos.json` de una vez porque no cuesta nada en ese momento — pero esto es
  oportunista, no un paso obligatorio a recordar: si no queda guardado, `club-outreach` lo busca
  igual al momento de redactar (sección 1). Ningún club queda trabado por esto.

## 4. Etapa 2, 3 y 4 — documentadas, NO ACTIVAS todavía

No se activan sin que Guido lo decida explícitamente, y no antes del check-in del 2026-10-24 (ver
`Admin/outreach/checkin-2026-10-24.md`). Quedan documentadas acá para no tener que rediseñarlas
cuando llegue el momento:

- **Etapa 2 — regla de disparo automática**: un club entra a la cola solo cuando acumula 3+
  preguntas pendientes sin resolver, O la más vieja lleva 90+ días — lo que pase primero. Corre en
  batch (ej. un chequeo semanal), no en tiempo real. Con follow-up no invasivo: un único mail de
  seguimiento si no hay respuesta en 3-4 semanas, y si tampoco hay respuesta a ese, cooldown de 4-6
  meses antes de volver a escribirle (bundleando lo viejo + lo nuevo acumulado en el reintento,
  nunca un reenvío del mismo pedido). Una segunda vuelta de silencio extiende el cooldown a 12 meses
  y requiere que Guido lo reactive a mano.
- **Etapa 3 — autonomía gradual por categoría**: separar los mails formulaicos ("¿tienen el balance
  del ejercicio X?") de los que necesitan matiz (explicar una categorización puntual). Los
  formulaicos pueden saltear la cola de revisión una vez que Guido vio suficientes sin necesitar
  cambios; los de matiz se quedan bajo revisión humana indefinidamente.
- **Etapa 4 — volumen alto**: el mismo pipeline aguanta sin cambios estructurales (Resend Pro ya
  cubre hasta 50.000/mes); el único ajuste real es el ritmo de warm-up de reputación del subdominio
  si el crecimiento es abrupto.

## 5. El check-in de 30 días

Programado para el 2026-10-24 (30 días desde que arrancó la Etapa 1). Ver
`Admin/outreach/checkin-2026-10-24.md` para qué evaluar exactamente. Hay además una tarea programada
fuera de esta sesión que va a preguntarlo en esa fecha — el archivo es el respaldo por si esa tarea
no corre (la app tiene que estar abierta para que dispare).

## Cómo mantener este skill

Actualizar la sección 1 (flujo de Etapa 1) si cambia el formato del frontmatter del borrador o el
comportamiento de `tools/outreach-send.js` — tienen que quedar sincronizados, el script es la fuente
de verdad de qué formato acepta. Actualizar la sección 4 (Etapas 2-4) recién cuando Guido decida
activar alguna — mover la sección correspondiente de "documentada, no activa" a la sección 1 como
flujo real, no dejarla duplicada en las dos partes. Si el check-in del 2026-10-24 ya pasó, borrar la
sección 5 (o reemplazarla por el resultado) y archivar `Admin/outreach/checkin-2026-10-24.md` en
`Admin/Archive/`.
