// tools/hooks/texto-de-guido.mjs — qué archivos son texto que Guido lee en el diff del commit. Lo usan pre-tool.mjs (el commit va aparte y con el diff visto) y post-tool.mjs
// (el aviso de show_pane). Un documento nuevo de criterio se suma acá y los dos hooks lo toman.
export const esTextoDeGuido = (f) => f.startsWith('.claude/skills/') || f === 'CLAUDE.md'
  || /^Admin\/(CONVENCIONES(-DATOS)?|PANTALLA|PIPELINE|ESTADO|briefs-subagentes-siis)\.md$/.test(f)
  || /^Admin\/paises\/[^/]+\.md$/.test(f);
// lo que sí puede viajar en el mismo commit: la entrada del CHANGELOG y el TODO de esa tarea
export const ACOMPANA = /^Admin\/(CHANGELOG|TODO)\.md$/;
// una skill por commit: cada una se lee por separado
export const skillDe = (f) => f.match(/^\.claude\/skills\/([^/]+)\//)?.[1] || null;
