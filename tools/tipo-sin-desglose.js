// tools/tipo-sin-desglose.js — qué ES la línea única que un documento no abre (`sinDesglose` / `no_breakdown`), por su rótulo: lo usan cargar-ejercicio.mjs al cargar un año y
// tools/sin-desglose-tipo.mjs para los años ya cargados. La pantalla lo lee para explicar el «s/d» (js/finanzas-render.js, tarjeta «Notas sobre este club»).
//
// Los valores son los de `no_breakdown[].kind` en data/schema/club-v2.json (un campo opcional):
//   ingresos:  gross_margin (margen bruto: ya descuenta costos, no es facturación) · net_sales (ventas o facturación total) · other (cualquier otra línea única)
//   gastos:    cost_of_sales (costo de ventas / costos directos) · gross_margin (un margen que el documento puso del lado de los gastos) · other
// Primero lo APRENDIDO (Admin/registros/tipos-sin-desglose.jsonl: un rótulo ya contestado por la cola, `aprender()`), después las palabras de los idiomas del corpus; un rótulo que ninguno
// reconoce da `other` en `tipoSinDesglose` y `null` en `tipoConocido` (cargar-ejercicio.mjs lo manda a la cola, y la respuesta se aprende: no se pregunta dos veces). No nombra ningún club.
const fs = require('fs');
const path = require('path');
const APRENDIDOS = path.resolve(__dirname, '..', 'Admin', 'registros', 'tipos-sin-desglose.jsonl');
const MARGEN = /bruttofortjeneste|bruto-?marge|marge brute|margem bruta|resultado bruto|bruttoergebnis|rohergebnis|rohertrag|brutowinst|margine lordo|bruttovinst|katetuotto|marża brutto|hrub[áa] mar[žz]e|brüt k[aâ]r|gross (profit|margin|result)|margen bruto|lucro bruto|валов|μικτ/i;
const OTRO_INGRESO = /otros ingresos|other (operating )?income|annen driftsinntekt|handel und sonstiges|andre driftsindt|altri ricavi|αγορές|other revenue/i;
const VENTAS = /omzet|umsatz|nettoomsætning|salgsinntekt|salgsinntekter|chiffre d.affaires|receita|vendas|prestaç|turnover|revenue|net sales|importe neto de la cifra|ingresos del segmento|bedrijfsopbrengsten|выручка|κύκλος εργασιών|πωλήσεις|tulu|müügist|ricavi|rendas de jogos|prestação/i;
const COSTO_VENTAS = /cost of sales|vareforbrug|κόστος πωλήσεων|себестоимость|satılan|custo das|custos das|costo de ventas|direkte kosten|kostprijs|coste de ventas|custo dos/i;

const normal = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').replace(/[\s:;,.·]+$/, '').trim(); // sin la puntuación final: «Ingresos operativos:» y «Ingresos operativos» son el mismo rótulo
const ladoDe = (lado) => (lado === 'expenses' || lado === 'gasto' || lado === 'expense' ? 'expenses' : 'revenue');
let _aprendidos = null;
function aprendidos() {
  if (_aprendidos) return _aprendidos;
  _aprendidos = new Map();
  if (fs.existsSync(APRENDIDOS)) for (const l of fs.readFileSync(APRENDIDOS, 'utf8').split('\n').filter(Boolean)) { const a = JSON.parse(l); _aprendidos.set(`${a.lado}|${normal(a.rotulo)}`, a.kind); }
  return _aprendidos;
}

// El tipo de la línea única `rotulo` si algo lo reconoce (lo aprendido o las palabras), o null.
function tipoConocido(rotulo, lado) {
  const l = ladoDe(lado); const r = String(rotulo || '');
  const a = aprendidos().get(`${l}|${normal(r)}`); if (a) return a;
  if (MARGEN.test(r)) return 'gross_margin';
  if (l === 'expenses') return COSTO_VENTAS.test(r) ? 'cost_of_sales' : null;
  if (OTRO_INGRESO.test(r)) return 'other';
  return VENTAS.test(r) ? 'net_sales' : null;
}
function tipoSinDesglose(rotulo, lado) { return tipoConocido(rotulo, lado) || 'other'; }

// Guarda una respuesta de la cola: ese rótulo es de ese tipo (no se repite si ya está).
function aprender(rotulo, lado, kind, fuente) {
  const l = ladoDe(lado);
  if (aprendidos().has(`${l}|${normal(rotulo)}`)) return false;
  fs.appendFileSync(APRENDIDOS, JSON.stringify({ rotulo: String(rotulo), lado: l, kind, fuente, fecha: new Date().toISOString().slice(0, 10) }) + '\n');
  aprendidos().set(`${l}|${normal(rotulo)}`, kind);
  return true;
}

module.exports = { tipoSinDesglose, tipoConocido, aprender };
