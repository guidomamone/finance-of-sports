// tools/tipo-sin-desglose.js — qué ES la línea única que un documento no abre (`sinDesglose` / `no_breakdown`), por su rótulo: lo usan cargar-ejercicio.mjs al cargar un año y
// tools/sin-desglose-tipo.mjs para los años ya cargados. La pantalla lo lee para explicar el «s/d» (js/finanzas-render.js, tarjeta «Notas sobre este club»).
//
// Los valores son los de `no_breakdown[].kind` en data/schema/club-v2.json (un campo opcional):
//   ingresos:  gross_margin (margen bruto: ya descuenta costos, no es facturación) · net_sales (ventas o facturación total) · other (cualquier otra línea única)
//   gastos:    cost_of_sales (costo de ventas / costos directos) · gross_margin (un margen que el documento puso del lado de los gastos) · other
// Se mira solo el rótulo, en los idiomas del corpus; lo que no reconoce da `other` (la pantalla lo explica con un texto genérico). No nombra ningún club.
const MARGEN = /bruttofortjeneste|bruto-?marge|marge brute|margem bruta|resultado bruto|bruttoergebnis|rohergebnis|rohertrag|brutowinst|margine lordo|bruttovinst|katetuotto|marża brutto|hrub[áa] mar[žz]e|brüt k[aâ]r|gross (profit|margin|result)|margen bruto|lucro bruto|валов|μικτ/i;
const OTRO_INGRESO = /otros ingresos|other (operating )?income|annen driftsinntekt|handel und sonstiges|andre driftsindt|altri ricavi|αγορές|other revenue/i;
const VENTAS = /omzet|umsatz|nettoomsætning|salgsinntekt|salgsinntekter|chiffre d.affaires|receita|vendas|prestaç|turnover|revenue|net sales|importe neto de la cifra|ingresos del segmento|bedrijfsopbrengsten|выручка|κύκλος εργασιών|πωλήσεις|tulu|müügist|ricavi|rendas de jogos|prestação/i;
const COSTO_VENTAS = /cost of sales|vareforbrug|κόστος πωλήσεων|себестоимость|satılan|custo das|custos das|costo de ventas|direkte kosten|kostprijs|coste de ventas|custo dos/i;

function tipoSinDesglose(rotulo, lado) {
  const r = String(rotulo || '');
  if (MARGEN.test(r)) return 'gross_margin';
  if (lado === 'expenses' || lado === 'gasto') return COSTO_VENTAS.test(r) ? 'cost_of_sales' : 'other';
  if (OTRO_INGRESO.test(r)) return 'other';
  return VENTAS.test(r) ? 'net_sales' : 'other';
}

module.exports = { tipoSinDesglose };
