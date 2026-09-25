#!/usr/bin/env node
// tools/outreach-send.js — manda los mails aprobados en Admin/outreach/aprobados/ vía Resend.
//
// ESTE SCRIPT LO CORRE GUIDO, DESDE SU PROPIA TERMINAL. Ninguna sesión de Claude Code lo ejecuta
// por su cuenta, ni aunque se lo pidan en el chat ("mandalo", "corré el envío") — hacerlo desde
// adentro de una sesión de chat es, en los hechos, mandar un mensaje en nombre de Guido desde el
// chat, exactamente lo que la Opción 3 (ver el doc de comparación y
// .claude/skills/club-outreach/SKILL.md) existe para evitar. El punto de este script es correr
// AFUERA de cualquier sesión — a mano, o con un cron/launchd propio de la Mac de Guido.
//
// Uso:
//   1. Setear las variables de entorno (una vez por sesión de terminal):
//        source Admin/outreach/.env
//      Ese archivo (gitignoreado, ver .gitignore) tiene:
//        export RESEND_API_KEY="re_xxxxxxxx"
//        export OUTREACH_FROM_EMAIL="Guido Mamone <contacto@outreach.financeofsports.com>"
//   2. node tools/outreach-send.js
//
// Formato de cada archivo en Admin/outreach/aprobados/*.md (frontmatter simple, 3 campos):
//   ---
//   club: velez
//   to: prensa@velezsarsfield.com.ar
//   subject: Consulta sobre el Balance 2024/25
//   ---
//   Cuerpo del mail en texto plano.
//
// El historial de envíos NO se guarda en ningún archivo de estado aparte: cada mail mandado queda
// en Admin/outreach/enviados/<fecha>-<archivo original>.md, con el club, el destinatario y el
// asunto adentro — eso ES el registro. Si en el futuro hace falta consultarlo por club, se lee esa
// carpeta, no se mantiene un índice duplicado a mano.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const APROBADOS_DIR = path.join(ROOT, 'Admin', 'outreach', 'aprobados');
const ENVIADOS_DIR = path.join(ROOT, 'Admin', 'outreach', 'enviados');

function fail(msg) {
  console.error(`\nERROR: ${msg}\n`);
  process.exit(1);
}

function parseDraft(raw, filename) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) fail(`${filename}: no tiene el frontmatter esperado (--- club/to/subject ---)`);
  const [, frontmatter, body] = match;
  const fields = {};
  for (const line of frontmatter.split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) fields[m[1]] = m[2].trim();
  }
  for (const key of ['club', 'to', 'subject']) {
    if (!fields[key]) fail(`${filename}: falta el campo '${key}' en el frontmatter`);
  }
  return { ...fields, body: body.trim() };
}

async function sendOne(draft, apiKey, fromEmail) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: draft.to,
      subject: draft.subject,
      text: draft.body,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  return data.id;
}

async function main() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.OUTREACH_FROM_EMAIL;
  if (!apiKey) fail("falta RESEND_API_KEY — corré 'source Admin/outreach/.env' primero (ver el comentario de cabecera de este script).");
  if (!fromEmail) fail("falta OUTREACH_FROM_EMAIL — mismo archivo que RESEND_API_KEY.");

  if (!fs.existsSync(APROBADOS_DIR)) fail(`no existe ${APROBADOS_DIR}`);
  const files = fs.readdirSync(APROBADOS_DIR).filter((f) => f.endsWith('.md'));
  if (files.length === 0) {
    console.log('Nada para mandar: Admin/outreach/aprobados/ no tiene borradores .md.');
    return;
  }

  let ok = 0;
  let fallaron = 0;

  for (const filename of files) {
    const filePath = path.join(APROBADOS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf8');
    const draft = parseDraft(raw, filename);

    try {
      const resendId = await sendOne(draft, apiKey, fromEmail);
      const today = new Date().toISOString().slice(0, 10);

      fs.mkdirSync(ENVIADOS_DIR, { recursive: true });
      fs.renameSync(filePath, path.join(ENVIADOS_DIR, `${today}-${filename}`));

      console.log(`OK   ${draft.club} <${draft.to}> — "${draft.subject}" (${resendId})`);
      ok++;
    } catch (err) {
      console.error(`FALLÓ ${draft.club} <${draft.to}> — ${err.message}`);
      fallaron++;
    }
  }

  console.log(`\n${ok} enviados, ${fallaron} fallaron.`);
  if (fallaron > 0) process.exit(1);
}

main();
