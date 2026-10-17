// Worker de Cloudflare "fos-supabase-ping": cada 3 días llama a ping() (tools/supabase/ping.sql) para que Supabase no pause el
// proyecto. Es un Worker aparte del que loggea el buscador, para no tocar ese código. Se pega entero en el editor del Worker; el
// reloj (Cron Trigger) se configura en Settings → Triggers. La URL y la key son las públicas de js/cuenta.js.
// Si Supabase no contesta 'ok', el Worker tira un error y la corrida queda marcada como fallida en el panel (Logs / Cron Events).

const SUPABASE_URL = 'https://qgupzttqsgtidoruipel.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndXB6dHRxc2d0aWRvcnVpcGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1Mjk3NjcsImV4cCI6MjEwNjEwNTc2N30.WN7q2ETX1SM92heDG03eQwMtDpqPq-j7U7f-aU7xQzQ';

async function ping() {
  const res = await fetch(SUPABASE_URL + '/rest/v1/rpc/ping', {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: '{}',
  });
  const text = await res.text();
  console.log('ping', res.status, text);
  if (!res.ok || text !== '"ok"') throw new Error('Supabase no contestó ok: ' + res.status + ' ' + text);
  return text;
}

export default {
  async scheduled(event, env, ctx) {
    await ping();
  },
  // Abrir la URL del Worker no dispara el ping: así nadie de afuera lo usa. Para probarlo a mano, el botón del panel.
  async fetch() {
    return new Response('fos-supabase-ping', { status: 404 });
  },
};
