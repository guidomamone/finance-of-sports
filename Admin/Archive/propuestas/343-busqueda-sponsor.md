# 343 — Buscar el sponsor de camiseta con evidencia (propuesta, sin codear)

Pedido de Guido: «lo único que quiero es que se haya intentado buscarlo. Auditoría necesita evidencia de que buscaste, y no solo Wikipedia. Es una skill que falta.»

## Qué pasa hoy

- `tools/estadio-sponsor.mjs` lee el sponsor de las tablas de Wikipedia (temporada y página del club). Si no lo encuentra, la compuerta de `cargar.mjs` frena el año.
- Se sale de ahí de tres maneras: el sponsor a mano en `tools/contexto-manual.json` (con `fuente`); `"sin-fuente": { "sponsor": "<texto>" }` (regla de `CONVENCIONES-DATOS.md`: un dato de contexto sin fuente pública queda en `null` y el año se carga igual); o una liga en `SOLO_ESTADIO` / «amateur».
- El texto de `sin-fuente` es libre: nada comprueba que alguien haya buscado, ni dónde. Auditoría no puede distinguir «se buscó y no hay» de «no se buscó».

## Qué se propone

1. Una sección nueva de skill que dice cómo se busca y qué cuenta como haber buscado.
2. Un registro de evidencia con formato fijo, en el mismo lugar donde hoy vive el `sin-fuente` (no un archivo nuevo: una sola verdad).
3. Un cambio en la compuerta: `sin-fuente` del sponsor solo vale con un registro válido. Con una fuente real, la compuerta no pide más.

`SOLO_ESTADIO` y la liga amateur no cambian (son decisiones de Guido por liga).

## 1. El texto de la skill

**Dónde:** `club-sourcing`, como sección `0.5` (misma escalera de ángulos de 0.1 y mismo reparto de quién barre, 0.1b). No hace falta una skill nueva: es el mismo oficio (buscar en la web con registro de qué se probó), aplicado a un dato de contexto en vez de a un balance. `club-data-mapping` no se toca.

**Texto exacto de la sección (para pegar):**

> ### 0.5 Buscar el sponsor de camiseta de un ejercicio (y dejar la evidencia)
>
> El sponsor de camiseta (el del frente) de un ejercicio sale primero de Wikipedia (`tools/estadio-sponsor.mjs`: la tabla de camisetas de la temporada y de la página del club). Si ahí no está, la búsqueda sigue acá. Wikipedia no cuenta como búsqueda: ya la leyó la tool.
>
> **Las clases de fuente, en este orden (de la más barata y segura a la más cara):**
> 1. `informe-anual`: los documentos del club que ya están en `Clubes/` (el `.md` del balance o de la memoria): `grep -i -n "patroc\|sponsor\|sponsoring\|спонсор"`. Gratis. Un informe que dice «patrocinador principal» vale, con página y línea.
> 2. `club-oficial`: la web del club (noticias del lanzamiento de la camiseta de esa temporada, página de patrocinadores). Para años viejos, la versión archivada (Wayback) de esa página con fecha del ejercicio: es la clase `archivo-web`.
> 3. `prensa`: la presentación de la camiseta de la temporada, o la noticia del acuerdo de patrocinio, en un medio con fecha.
> 4. `base-camisetas`: una base de camisetas por temporada (Football Kit Archive, Historical Football Kits, o la equivalente del deporte). Si la base devuelve 403 o no abre, se anota `inaccesible`.
> 5. `patrocinador`: el comunicado de la propia empresa.
>
> **Qué cuenta como haber buscado.** Al menos tres intentos, de tres clases distintas, ninguna `wikipedia`, y entre ellos `informe-anual`, `club-oficial` o `archivo-web` (la versión archivada del sitio del club es la misma fuente). A lo sumo uno de los tres puede ser `inaccesible`. Cada intento dice DÓNDE (la URL, o la consulta exacta que se hizo) y QUÉ salió (`sin-dato`, `inaccesible` o `encontrado` con la cita).
>
> **Si algún intento da el sponsor:** el sponsor va a `tools/contexto-manual.json` con `fuente` (la URL o el documento con página y línea) y no hace falta más registro. Verificá que sea del FRENTE y de ESA temporada: un sponsor de manga, de espalda o de otra temporada no es el dato.
>
> **Si ninguno lo da:** el registro de intentos va en `sin-fuente.sponsor` (formato abajo) y el año se carga con el sponsor en `null`. Quien busca es un subagente Sonnet con Exa (0.1b); el registro lo escribe quien lo corrió, con su nombre y la fecha.
>
> **Un sponsor por club, no por año, cuando el acuerdo es plurianual:** una sola búsqueda puede cubrir varios ejercicios si la fuente dice el período; el registro se copia a cada año con la misma evidencia.

## 2. El formato del registro de evidencia

En `tools/contexto-manual.json`, el campo `sin-fuente.sponsor` pasa de texto libre a un objeto:

```json
"bathrugby-gb": {
  "2022": {
    "estadio": "The Recreation Ground",
    "fuente": "https://...",
    "sin-fuente": {
      "sponsor": {
        "buscado": "2026-10-21",
        "por": "Claude (subagente Sonnet)",
        "intentos": [
          { "clase": "informe-anual", "donde": "Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2021-22.md, grep patroc|sponsor", "resultado": "sin-dato" },
          { "clase": "club-oficial", "donde": "https://www.bathrugby.com/news/ (lanzamiento de la camiseta 2021-22)", "resultado": "sin-dato" },
          { "clase": "base-camisetas", "donde": "https://www.footballkitarchive.com/ (403)", "resultado": "inaccesible" },
          { "clase": "prensa", "donde": "búsqueda «Bath Rugby 2021-22 shirt sponsor»: 8 resultados, ninguno nombra el sponsor del frente", "resultado": "sin-dato" }
        ]
      }
    }
  }
}
```

Reglas del objeto (las comprueba la compuerta, abajo):
- `buscado` (fecha ISO) y `por` (quién lo corrió): obligatorios.
- `intentos[]`: cada uno con `clase` (`informe-anual`, `club-oficial`, `archivo-web`, `prensa`, `base-camisetas`, `patrocinador`; `wikipedia` se acepta pero no cuenta), `donde` (no vacío) y `resultado` (`sin-dato` o `inaccesible`; si fue `encontrado`, no se escribe `sin-fuente`: se escribe el sponsor).
- Los años que hoy tienen un texto libre (los que dejó la regla del 2026-10-20) se congelan UNA vez en una lista, `tools/sponsor-legacy.json` (`{ "<clubId>": [<años>] }`), y su objeto pasa a `{ "legacy": true, "texto": "<el texto de hoy>" }`. La compuerta acepta `legacy:true` solo para las claves (club y año) de esa lista; `audit.js` da P1 `sponsor-legacy-fuera-de-lista` a un `legacy` que no está en ella, y P3 `sponsor-sin-registro` a los de la lista, para completarlos cuando alguien toque el club. La lista no crece: agregar una clave es una decisión de Guido.

## 3. El cambio en la compuerta

En `estadio-sponsor.mjs`, donde hoy se arma `sf` (campos `sin-fuente` con texto) y `resuelto(k)`:

- Para `estadio`, `capacidad` y `marca` no cambia nada (el texto de `sin-fuente` sigue valiendo).
- Para `sponsor`, `sin-fuente.sponsor` cuenta como resuelto solo si:
  - es un objeto con `legacy: true` y `texto`, y el club y el año están en `tools/sponsor-legacy.json`; o
  - es un objeto con `buscado`, `por` y `intentos` que cumple: al menos 3 intentos, de al menos 3 clases distintas sin contar `wikipedia`, uno de ellos `informe-anual`, `club-oficial` o `archivo-web`, a lo sumo uno `inaccesible`, y `donde` no vacío en todos.
- Un `sin-fuente.sponsor` que es un texto suelto, o un objeto que no cumple, NO cuenta: la compuerta frena el año diciendo qué falta («sponsor: el registro de búsqueda tiene 2 clases, hacen falta 3 sin contar Wikipedia (skill club-sourcing 0.5)»), igual que hoy cuando falta el sponsor.
- La salida de `--ensayo` y de la compuerta lista, junto a cada año sin sponsor, qué clases ya están probadas.
- `audit.js`: P1 `sponsor-sin-busqueda` si un `sin-fuente.sponsor` de `contexto-manual.json` no cumple (para que no dependa de que alguien corra la compuerta); P3 `sponsor-sin-registro` por cada `legacy`.

**Qué no cambia:** una liga en `SOLO_ESTADIO` o «amateur» sigue pasando sin sponsor y sin registro. La regla «la falta de un dato de contexto nunca frena una carga» queda: el año se carga con el sponsor en `null` en cuanto el registro es válido; lo que cambia es que ya no basta decirlo, hay que mostrar que se buscó.

## Medición antes de codear (pedida por la Auditora 4)

`tools/contexto-manual.json` tiene hoy 26 años con `sin-fuente.sponsor` en 8 clubes, los 26 como texto libre. Todos entran en `tools/sponsor-legacy.json`: con la regla nueva quedan frenados 0 años de los que hoy se resuelven con texto libre. Lo que cambia es para los años de ahora en adelante. La compuerta valida la forma del registro, no que la búsqueda haya ocurrido; la Auditora propone un control en el eje datos (re-ejecutar una muestra de los registros nuevos por país).

## Costo y quién lo corre

- Un barrido de un club (todos sus años sin sponsor, una sola búsqueda por acuerdo plurianual): un subagente Sonnet con Exa, del orden de unos centavos de dólar; la clase `informe-anual` es un `grep` gratis.
- Lo corre la sesión de onboarding cuando la compuerta frena por sponsor, antes de pedirle nada a Guido.

## Para decidir

1. ¿Va en `club-sourcing` 0.5 (recomendado) o en una skill nueva?
2. ¿Tres intentos de tres clases es el mínimo que Guido quiere? (Recomiendo tres: con dos, un portal caído más un 404 alcanza.)
3. Los años de hoy con texto libre pasan como `legacy` congelado en una lista (recomendado, aprobado por la Auditora) o se vuelven a buscar todos.
