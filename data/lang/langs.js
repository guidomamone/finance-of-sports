// ============================================================================
// data/lang/langs.js - Registro de idiomas disponibles (Versión 115).
//
// ESTE ES EL ÚNICO ARCHIVO QUE HAY QUE TOCAR PARA SUMAR UN IDIOMA (además de
// crear su `data/lang/<code>.js`). El selector del header se dibuja leyendo esto,
// así que agregar una entrada acá la hace aparecer sola en el menú, igual que
// agregar un club a `data/clubs.js` lo hace aparecer solo en el selector de club.
//
// - `code`: el código que va en <html lang> y en localStorage. Usar el código
//   ISO 639-1 de 2 letras, porque `I18N.detect()` compara contra la primera
//   parte de `navigator.language` ("pt-BR" -> "pt").
// - `name`: el nombre del idioma EN ESE IDIOMA (así un brasileño encuentra
//   "Português" aunque el sitio esté en castellano), no traducido.
// - `flag`: emoji, solo decorativo. OJO: una bandera NO es un idioma (el
//   castellano no es "España", el inglés no es "Reino Unido"), por eso el menú
//   muestra SIEMPRE el nombre al lado y el botón del header usa un globo, no una
//   bandera.
//
// El castellano es el idioma fuente: no tiene `data/lang/es.js` porque el HTML
// del sitio ya está escrito en castellano. Ver el comentario de `js/i18n.js`.
//
// CANDIDATOS OBVIOS para cuando haya ganas de traducir (el sitio ya tiene clubes
// de esos países): português (Brasil, 4 clubes), 日本語 (Japón, 10 clubes).
// ============================================================================

window.LANGS = {
  es: { code: 'es', name: 'Español', flag: '🌐' },
  en: { code: 'en', name: 'English', flag: '🌐' }
};
