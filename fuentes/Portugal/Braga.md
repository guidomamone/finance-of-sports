# Braga (SC Braga)

- **Deporte**: Fútbol
- **Liga / competencia**: Primeira Liga (Portugal, 1ª división)
- **Entidad legal**: Sporting Clube de Braga – Futebol, SAD. No cotiza.
- **Canal**: sitio propio (`scbraga.pt`), publica el Relatório e Contas de la SAD cada año tras la
  Asamblea de accionistas.

## Qué se bajó (sesión 2026-09-17)

**8 ejercicios: 2015/16, 2016/17, 2019/20, 2020/21, 2021/22, 2022/23, 2023/24, 2024/25**, en
`Clubes/Portugal/Braga/`.

**Hueco real, no cerrado**: no se encontró 2017/18 ni 2018/19 (hay una noticia de prensa,
"Sócios aprovam Relatório e Contas 2018/19", pero la página en `scbraga.pt` que la anunciaba ya no
existe — 404). No se intentó Wayback específicamente para esos dos ejercicios por tiempo; sería el
próximo paso si se retoma.

## Gotcha de tooling (sesión 2026-09-17)

**El sitio scbraga.pt migró a una SPA nueva (framework propio "wbk") y TODAS las URLs viejas
`scbraga.pt/wp-content/uploads/...pdf` que encontraba Google/el buscador devuelven ahora HTTP 200
pero sirven el HTML shell de la app (`<title>SC Braga</title>`, sin contenido), no el PDF.** Mismo
patrón "sitio migró de CDN sin actualizar sus propios links viejos" ya visto en Italia
(Inter/Napoli/Udinese) y ahora confirmado en Portugal. La vuelta que funcionó: **todos los 7 PDF
antiguos (2015/16 a 2024/25 salvo el más nuevo) se rescataron de Wayback Machine** con
`web.archive.org/web/2024id_/<url original>` — Wayback SÍ tiene copias completas (no truncadas) de
estos, a diferencia del caso de Arouca (ver `fuentes/Portugal/Arouca.md`). Un gotcha adicional: la
respuesta de Wayback viene con `Content-Encoding: gzip` real, hace falta `curl --compressed` — sin
eso, `curl -sL` sin más guarda el `.pdf` como bytes gzip sin descomprimir (el archivo pasa el chequeo
de tamaño pero `file` lo identifica como "gzip compressed data", no como PDF).

## Dudas / pendientes

Buscar 2017/18 y 2018/19 en Wayback (no intentado esta sesión) antes de darlos por perdidos.

- Último chequeo: 2026-09-17.
