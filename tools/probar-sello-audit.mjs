// tools/probar-sello-audit.mjs — prueba de tools/sello-audit.js en un repositorio temporal: el sello vale solo sobre el estado exacto en que se escribió.
// USO: node tools/fos.mjs probar-sello-audit    (sale 1 si algún caso falla; no toca el repositorio del proyecto)
import { mkdtempSync, writeFileSync, rmSync, utimesSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const { estadoDelArbol, escribirSello, selloVale, borrarSello } = createRequire(import.meta.url)('./sello-audit.js');
const dir = mkdtempSync(join(tmpdir(), 'sello-'));
const git = (...a) => execFileSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@t', ...a], { cwd: dir, stdio: 'ignore' });
git('init', '-q'); writeFileSync(join(dir, 'a.txt'), 'uno'); git('add', 'a.txt'); git('commit', '-q', '-m', 'primero');
let fallas = 0; const caso = (nombre, ok) => { console.log(`${ok ? 'ok ' : 'MAL'} ${nombre}`); if (!ok) fallas++; };

caso('sin sello no vale', !selloVale(dir));
escribirSello(dir, estadoDelArbol(dir));
caso('árbol limpio recién sellado vale', selloVale(dir));
writeFileSync(join(dir, 'a.txt'), 'dos');
caso('editar un archivo trackeado invalida', !selloVale(dir));
git('checkout', '--', 'a.txt');
caso('deshacer la edición lo vuelve a validar', selloVale(dir));
writeFileSync(join(dir, 'nuevo.txt'), 'x');
caso('un archivo nuevo invalida', !selloVale(dir));
escribirSello(dir, estadoDelArbol(dir));
caso('sellado con el archivo nuevo vale', selloVale(dir));
git('add', 'nuevo.txt');
caso('un git add no invalida (el contenido es el mismo)', selloVale(dir));
const t = new Date(Date.now() + 5000); utimesSync(join(dir, 'nuevo.txt'), t, t);
caso('cambiar el mtime de un archivo invalida', !selloVale(dir));
escribirSello(dir, estadoDelArbol(dir)); git('commit', '-q', '-m', 'segundo');
caso('un commit nuevo invalida (cambia HEAD)', !selloVale(dir));
escribirSello(dir, estadoDelArbol(dir)); writeFileSync(join(dir, 'nuevo.txt'), 'mas largo'); writeFileSync(join(dir, 'nuevo.txt'), 'x');
caso('reescribir un archivo con el contenido de HEAD no cambia nada que la auditoría pueda ver: sigue valiendo', selloVale(dir));
writeFileSync(join(dir, 'nuevo.txt'), 'otra cosa');
caso('reescribirlo con otro contenido invalida', !selloVale(dir));
escribirSello(dir, estadoDelArbol(dir)); borrarSello(dir);
caso('sin el archivo del sello no vale', !selloVale(dir));
rmSync(dir, { recursive: true, force: true });
console.log(fallas ? `${fallas} caso(s) con falla` : 'todos ok'); process.exit(fallas ? 1 : 0);
