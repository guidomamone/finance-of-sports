// tools/dictamenes-mistral.mjs — `dictamenes-md.mjs --mistral`: pasa por Mistral OCR los dictámenes escaneados (sin texto nativo y sin .md) y suma lo que costó (ítem 7 del punto 478).
// POR QUÉ. dictamenes-md.mjs listaba los escaneos con el comando de Mistral y la sesión corría uno por uno (Atlético Nacional 2015 a 2019: cinco comandos, US$ 0,07). Gasta dinero: solo con --mistral, y antes dice cuántos y cuánto.
// ENTRADA: la lista de pdfs a transcribir y `correr(pdf)` que devuelve la salida de mistral-ocr-transcribe.mjs (se inyecta: la prueba no gasta). SALIDA: { resultados: [{ pdf, ok, costo }], costo }.
// El costo sale de «costo=$0.0xx» de cada línea «OK …». USO: import { pasarEscaneos } from './dictamenes-mistral.mjs'.  Prueba: node tools/probar-dictamenes-mistral.mjs
export function pasarEscaneos(pdfs, correr) {
  const resultados = [];
  for (const pdf of pdfs) {
    let salida = ''; let ok = true;
    try { salida = String(correr(pdf)); } catch (e) { ok = false; salida = String(e.stdout || e.message || e); }
    const costo = Number((salida.match(/costo=\$([\d.]+)/) || [])[1] || 0);
    resultados.push({ pdf, ok: ok && /^OK /m.test(salida), costo });
  }
  return { resultados, costo: resultados.reduce((s, r) => s + r.costo, 0) };
}
