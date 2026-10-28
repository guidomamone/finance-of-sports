#!/usr/bin/env node
// tools/brief-tool.mjs — imprime el cierre obligatorio que se pega al final del brief de un subagente que edita archivos de tools/.
//
// POR QUÉ. Lo que un subagente deja sin hacer vuelve a la sesión como retrabajo (el chequeo del código general que frena `cerrar-tool`, una tool nueva sin clasificar, los registros que
// sus pruebas ensuciaron). El texto vive en Admin/briefs-subagentes-tools.md, sección «El cierre»; un hook (`subagente-tools-con-cierre`, tools/hooks/pre-tool.mjs) rechaza el brief de un
// subagente que edita tools/ sin él.
// USO: node tools/brief-tool.mjs     imprime el cierre, listo para pegar al final del prompt del subagente. Solo lee.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const doc = resolve(import.meta.dirname, '..', 'Admin', 'briefs-subagentes-tools.md');
const t = readFileSync(doc, 'utf8').split('\n');
const ini = t.findIndex((l) => /^## El cierre/.test(l));
if (ini < 0) { console.error('Admin/briefs-subagentes-tools.md no tiene la sección «El cierre».'); process.exit(1); }
let fin = t.findIndex((l, i) => i > ini && /^## /.test(l)); if (fin < 0) fin = t.length;
console.log(t.slice(ini + 1, fin).join('\n').trim());
