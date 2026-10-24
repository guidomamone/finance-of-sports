// tools/eslint.config.mjs — la configuración de eslint para `node tools/fos.mjs indefinidos`: SOLO la regla no-undef (un nombre que se usa y nadie definió),
// que es lo que un ensayo no ve y rompe al correr de verdad (una rama de --escribir o --ejecutar que ningún lote recorre). Nada de estilo.
import globals from 'globals';

const reglas = { 'no-undef': 'error' };
export default [
  { ignores: ['node_modules/**', 'archivo/**'] },
  { files: ['**/*.mjs'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.node } }, rules: reglas },
  { files: ['**/*.js'], languageOptions: { ecmaVersion: 'latest', sourceType: 'commonjs', globals: { ...globals.node } }, rules: reglas },
  // tres .js que usan import/export (se cargan como módulo)
  { files: ['**/lookup-brand-color.js', '**/lookup-club-league.js', '**/lookup-fx-close.js'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.node } }, rules: reglas },
];
