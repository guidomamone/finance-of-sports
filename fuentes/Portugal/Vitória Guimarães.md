# Vitória Guimarães (Vitória Sport Clube)

- **Deporte**: Fútbol
- **Liga / competencia**: Primeira Liga (Portugal, 1ª división)
- **Entidad legal**: Vitória Sport Clube – Futebol, SAD. No cotiza.
- **Canal**: sitio propio (`vitoriasc.pt`), páginas individuales por ejercicio en
  `vitoriasc.pt/en/rc-sad-<año>-<año+1>/` con el PDF embebido.

## Qué se bajó (sesión 2026-09-17)

**4 ejercicios: 2020/21, 2021/22, 2023/24, 2024/25**, en `Clubes/Portugal/Vitória Guimarães/`.

**Hueco: 2022/23 no se pudo confirmar.** La página `vitoriasc.pt/en/rc-sad-2022-23/` existe y tiene
el mismo título que las demás, pero no expone ningún link a PDF en el HTML (a diferencia de las
otras 4 páginas del mismo patrón, que sí lo tienen inline) — parece un problema de contenido faltante
en esa página puntual del sitio, no un bloqueo. Búsqueda externa tampoco encontró el nombre de
archivo exacto (se probaron varias variantes por `curl`, pero el sitio devuelve HTTP 200 con
`Content-Type: text/html` para CUALQUIER ruta de `wp-content/uploads` — ver gotcha abajo — así que
no sirve para confirmar existencia).

## Gotcha de tooling (sesión 2026-09-17)

**`vitoriasc.pt` devuelve HTTP 200 con `text/html` para cualquier URL, exista o no el archivo**
(confirmado probando 4 variantes de nombre inventadas para el PDF de 2022/23, las 4 dieron 200) —
es una SPA con catch-all de servidor. Esto invalida cualquier técnica de "adivinar la URL y probar
con `curl -I`" en este sitio: hay que confirmar SIEMPRE mirando el `Content-Type` real de la
respuesta (o el contenido), nunca solo el código de estado.

## Dudas / pendientes

Confirmar 2022/23 con un ángulo distinto (Wayback de la página `rc-sad-2022-23`, o prensa que cite
el PDF directo) si se retoma.

- Último chequeo: 2026-09-17.
