// La raíz del sitio, calculada desde la URL de ESTE script (<raíz>/js/i18n.js): sirve servido (también en /club/<id> y /liga/<id>) y abierto
// como archivo, sin <base> ni rutas con "/". `fosUrl('data/x.js')` es la ruta de cualquier archivo del sitio para una carga o un link armados en JS.
window.FOS_RAIZ = window.FOS_RAIZ || (document.currentScript ? new URL('../', document.currentScript.src).href : '');
window.fosUrl = window.fosUrl || function (ruta) { return window.FOS_RAIZ ? new URL(ruta, window.FOS_RAIZ).href : ruta; };
// ============================================================================
// js/i18n.js - Motor de traducción del sitio, que escala a N idiomas sin reescribir el sitio.
//
// CÓMO ESCALA (leer antes de tocar nada):
//
//   Agregar un idioma nuevo = 2 pasos, ninguno toca este archivo ni index.html:
//     1. crear `data/lang/<code>.js` con el mismo patrón que `data/lang/en.js` (un objeto plano clave -> texto traducido);
//     2. agregar una entrada en `LANGS` de `data/lang/langs.js`.
//   El archivo del idioma se inyecta por convención (`data/lang/<code>.js`), igual que loadClubData() con
//   `data/<país>/<clubId>-data.js`. No hay ningún mapa de rutas a mano que mantener.
//
//   El CASTELLANO NO TIENE ARCHIVO DE DICCIONARIO, a propósito. El HTML ya está escrito en castellano, así que `apply()` guarda
//   el texto original de cada elemento la primera vez que corre y lo usa como valor "es". Consecuencias:
//     - traducir mal un idioma nuevo no puede romper el castellano;
//     - una clave que falta en `en.js` cae de vuelta al castellano (nunca una clave cruda en pantalla ni un hueco en blanco);
//     - el castellano no se puede "desincronizar" del HTML, porque ES el HTML.
//   Para strings generados en JS (que no viven en el HTML) el castellano se pasa como 2do argumento: `t('clave', 'texto')`.
//
// CÓMO SE USA:
//   - En el HTML: `<h1 data-i18n="finanzas.title">Finanzas</h1>`.
//     Variantes: `data-i18n-html` (respeta markup interno), `data-i18n-title`, `data-i18n-placeholder`, `data-i18n-aria-label`.
//   - En JS que genera HTML: `I18N.t('clave', 'castellano por default')`.
//   - Después de inyectar HTML nuevo en el DOM: `I18N.apply(elementoNuevo)`.
//   - Para re-renderizar una vista cuando cambia el idioma: `I18N.onChange(() => miRender())`. El motor NO adivina qué
//     re-renderizar.
//
// LOS RUBROS DE "Formato del club" salen textuales del balance de cada club y los datos conservan el texto original. Lo que se muestra es una glosa
// en el idioma elegido (data/<país>/<club>-glosas.js, con el original en el title de la celda); sin glosa, el original. Los buckets de
// "Formato simplificado" se traducen con las claves de este archivo: son categorías del sitio.
// ============================================================================

(function () {
  'use strict';

  var STORAGE_KEY = 'fos_lang';
  var SOURCE_LANG = 'es'; // el idioma en el que está escrito el HTML

  var I18N = {
    current: SOURCE_LANG,
    SOURCE_LANG: SOURCE_LANG,
    strings: {},      // { en: {clave: 'texto'}, pt: {...} } - lo llenan data/lang/<code>.js
    _originals: null, // Map(elemento -> {prop: textoCastellanoOriginal})
    _listeners: [],
    _loading: {}
  };

  // --------------------------------------------------------------------------
  // Traducción de una clave suelta.
  // `fallbackEs` es el castellano para strings que se generan en JS y por lo
  // tanto no existen en el HTML. Si no hay traducción, devuelve el castellano;
  // si tampoco hay castellano, devuelve la clave (visible, para detectar el
  // agujero rápido en vez de mostrar vacío).
  // --------------------------------------------------------------------------
  I18N.t = function (key, fallbackEs) {
    if (I18N.current !== SOURCE_LANG) {
      var dict = I18N.strings[I18N.current];
      if (dict && typeof dict[key] === 'string') return dict[key];
    }
    return typeof fallbackEs === 'string' ? fallbackEs : key;
  };

  // --------------------------------------------------------------------------
  // Atributos soportados en el HTML. Agregar uno nuevo es sumar una línea acá.
  // --------------------------------------------------------------------------
  var ATTR_MAP = [
    { attr: 'data-i18n', apply: function (el, v) { el.textContent = v; }, read: function (el) { return el.textContent; } },
    { attr: 'data-i18n-html', apply: function (el, v) { el.innerHTML = v; }, read: function (el) { return el.innerHTML; } },
    { attr: 'data-i18n-title', apply: function (el, v) { el.title = v; }, read: function (el) { return el.title; } },
    { attr: 'data-i18n-placeholder', apply: function (el, v) { el.placeholder = v; }, read: function (el) { return el.placeholder; } },
    { attr: 'data-i18n-aria-label', apply: function (el, v) { el.setAttribute('aria-label', v); }, read: function (el) { return el.getAttribute('aria-label') || ''; } }
  ];

  // --------------------------------------------------------------------------
  // Aplica el idioma actual a un subárbol del DOM. Idempotente: se puede llamar
  // las veces que haga falta, y hay que llamarla cada vez que se inyecta HTML
  // nuevo que tenga atributos data-i18n.
  // --------------------------------------------------------------------------
  I18N.apply = function (root) {
    root = root || document;
    if (!I18N._originals) I18N._originals = new WeakMap();

    ATTR_MAP.forEach(function (spec) {
      var nodes = root.querySelectorAll('[' + spec.attr + ']');
      Array.prototype.forEach.call(nodes, function (el) {
        var key = el.getAttribute(spec.attr);
        if (!key) return;

        // Primera vez que vemos este elemento: su contenido actual ES el castellano.
        var saved = I18N._originals.get(el);
        if (!saved) { saved = {}; I18N._originals.set(el, saved); }
        if (!(spec.attr in saved)) saved[spec.attr] = spec.read(el);

        spec.apply(el, I18N.t(key, saved[spec.attr]));
      });
    });
  };

  // --------------------------------------------------------------------------
  // Carga el archivo de un idioma por convención (data/lang/<code>.js), igual que loadClubData(). Devuelve una Promise. El
  // castellano no tiene archivo.
  // --------------------------------------------------------------------------
  // `window.I18N_BASE` es lo que hay que anteponer para llegar a la raíz del sitio desde la página que corre: '' (o sin definir)
  // en la raíz, '../' en las páginas de fuentes por club (`fuentes/<clubId>.html`). Este src es relativo al DOCUMENTO, no a
  // js/i18n.js: sin I18N_BASE esas páginas pedían `fuentes/data/lang/en.js`, se comían un 404 y se quedaban en castellano sin que se
  // viera roto. UNA PÁGINA NUEVA FUERA DE LA RAÍZ tiene que declarar su I18N_BASE.
  I18N.load = function (code) {
    if (code === SOURCE_LANG) return Promise.resolve();
    if (I18N.strings[code]) return Promise.resolve();
    if (I18N._loading[code]) return I18N._loading[code];

    var base = window.I18N_BASE != null ? window.I18N_BASE : window.FOS_RAIZ;
    I18N._loading[code] = new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = base + 'data/lang/' + code + '.js' + (window.ASSET_V ? '?v=' + window.ASSET_V : '');
      s.onload = function () { resolve(); };
      s.onerror = function () {
        // Un idioma que no carga no puede romper el sitio: se queda en castellano.
        console.warn('[i18n] no se pudo cargar ' + base + 'data/lang/' + code + '.js, sigo en castellano');
        resolve();
      };
      document.head.appendChild(s);
    });
    return I18N._loading[code];
  };

  // --------------------------------------------------------------------------
  // Cambia el idioma: carga el diccionario si hace falta, lo aplica al DOM,
  // persiste la elección, actualiza <html lang> y avisa a los renderers.
  // --------------------------------------------------------------------------
  I18N.setLang = function (code) {
    if (!window.LANGS || !window.LANGS[code]) code = SOURCE_LANG;
    return I18N.load(code).then(function () {
      I18N.current = code;
      document.documentElement.lang = code;
      try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* modo privado: no persiste, no importa */ }
      I18N.apply(document);
      I18N._listeners.forEach(function (fn) {
        try { fn(code); } catch (e) { console.error('[i18n] listener falló', e); }
      });
    });
  };

  // Los renderers se suscriben acá para re-dibujar lo que generan en JS.
  I18N.onChange = function (fn) { I18N._listeners.push(fn); };

  // --------------------------------------------------------------------------
  // Idioma inicial: 1) el que el visitante eligió antes, 2) el del navegador si
  // lo tenemos, 3) castellano.
  // --------------------------------------------------------------------------
  I18N.detect = function () {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignorado */ }
    if (saved && window.LANGS && window.LANGS[saved]) return saved;

    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    var base = String(nav).toLowerCase().split('-')[0];
    if (window.LANGS && window.LANGS[base]) return base;
    return SOURCE_LANG;
  };

  I18N.init = function () { return I18N.setLang(I18N.detect()); };

  window.I18N = I18N;
})();
