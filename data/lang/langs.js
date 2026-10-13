// Los idiomas disponibles: el selector del header se dibuja leyendo esto (sumar un idioma = una entrada acá + su data/lang/<code>.js).
// `code`: ISO 639-1 de 2 letras (I18N.detect() compara con la primera parte de navigator.language). `name`: en ESE idioma. `flag`:
// solo decorativo (una bandera no es un idioma: el menú muestra siempre el nombre). El castellano es el idioma fuente: no tiene archivo.

window.LANGS = {
  es: { code: 'es', name: 'Español', flag: '🌐' },
  en: { code: 'en', name: 'English', flag: '🌐' }
};
