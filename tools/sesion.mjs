// tools/sesion.mjs — la SESIÓN que gasta (to-do: gasto por sesión). Cada línea de Admin/registros/api/*.jsonl lleva `sesion` = el nombre de la carpeta del worktree
// (fos-pipeline, fos-onboarding...; en el repo principal, el nombre de su carpeta), o FOS_SESION si se quiere otro. tools/gasto.mjs --sesion <nombre> suma solo lo suyo.
import { basename, resolve } from 'node:path';
export const SESION = process.env.FOS_SESION || basename(resolve(import.meta.dirname, '..'));
