// tools/eslint.config.mjs — la configuración de eslint para `node tools/fos.mjs indefinidos`. Solo reglas que encuentran errores reales (nada de estilo), medidas en Admin/mediciones/440-revisores-gratis.md:
//   - no-undef: un nombre que se usa y nadie definió; rompe al correr de verdad una rama que ningún ensayo recorre (una de --escribir o --ejecutar).
//   - ERRORES: 14 reglas que hoy dan 0 hallazgos en tools/ (no-inner-declarations quedó afuera: en un módulo eslint 10 no marca nada, lo mostró tools/probar-eslint.mjs) (una clave repetida en un objeto, código que nunca se alcanza, una constante reasignada…); si una aparece, es un error nuevo.
//   - no-unused-vars: solo se mira para los imports sin uso (indefinidos.mjs filtra el resto); es información (P4), no un error.
import globals from 'globals';

export const ERRORES = ['no-dupe-keys', 'no-unreachable', 'no-redeclare', 'no-const-assign', 'no-self-assign', 'no-dupe-else-if', 'no-case-declarations', 'no-fallthrough', 'no-cond-assign', 'no-prototype-builtins', 'no-unsafe-finally', 'no-loss-of-precision', 'no-async-promise-executor', 'no-unused-labels'];
const reglas = { 'no-undef': 'error', ...Object.fromEntries(ERRORES.map((r) => [r, 'error'])), 'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }] };
export default [
  { ignores: ['node_modules/**', 'archivo/**'] },
  { files: ['**/*.mjs'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.node } }, rules: reglas },
  { files: ['**/*.js'], languageOptions: { ecmaVersion: 'latest', sourceType: 'commonjs', globals: { ...globals.node } }, rules: reglas },
  // tres .js que usan import/export (se cargan como módulo)
  { files: ['**/lookup-brand-color.js', '**/lookup-club-league.mjs', '**/lookup-fx-close.js'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.node } }, rules: reglas },
];
