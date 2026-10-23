// tools/lexico-js.mjs: lo usa tools/partir-fases.mjs. Recorre el código de una función (strings, plantillas con ${}, regex, comentarios) y devuelve: la profundidad de llaves al empezar cada
// línea, las declaraciones del nivel superior de la función y los identificadores usados en el código (no en strings ni comentarios).
export function lexico(src, desdeLinea = 1) {
  const n = src.length; const prof = []; // profundidad al empezar cada línea (índice = línea relativa 0)
  const declaradas = []; const ids = []; // declaradas: { nombre, linea }
  let brace = 0, paren = 0, brack = 0, linea = 0; prof[0] = 0;
  let prevSig = ''; let prevPalabra = '';
  const KW_ANTES_DE_REGEX = new Set(['return', 'typeof', 'case', 'in', 'of', 'delete', 'void', 'throw', 'new', 'else', 'do']);
  let lastTokLine = 0; const fnStack = []; const exprStack = []; let pendingFn = false; let pendingFnParen = 0; let pendingArrow = false; const asignaciones = []; const tokens = []; const stk = []; const declStmts = []; const idLineas = []; const retornos = [];
  const podarExpr = () => { while (exprStack.length) { const t = exprStack.at(-1); if (paren < t.p || brack < t.k || brace < t.b) exprStack.pop(); else break; } };
  const nl = () => { linea++; prof[linea] = brace; };
  let i = 0;
  const leerPlantilla = () => { // i está después del ` inicial
    while (i < n) {
      const c = src[i];
      if (c === '\\') { i += 2; continue; }
      if (c === '\n') { i++; nl(); continue; }
      if (c === '`') { i++; return; }
      if (c === '$' && src[i + 1] === '{') { i += 2; leerCodigo(true); continue; }
      i++;
    }
  };
  function leerCodigo(enPlantilla = false) {
    let b0 = 0;
    while (i < n) {
      const c = src[i];
      if (c === '\n') { i++; nl(); continue; }
      if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }
      if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
      if (c === '/' && src[i + 1] === '*') { i += 2; while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') { i++; nl(); } else i++; } i += 2; continue; }
      if (c === '"' || c === "'") { const q = c; i++; while (i < n && src[i] !== q) { if (src[i] === '\\') i++; i++; } i++; prevSig = 'x'; prevPalabra = ''; continue; }
      if (c === '`') { i++; leerPlantilla(); prevSig = 'x'; prevPalabra = ''; continue; }
      if (c === '/') {
        const regexOk = prevSig === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prevSig) || KW_ANTES_DE_REGEX.has(prevPalabra);
        if (regexOk) { // regex literal
          i++; let enClase = false;
          while (i < n) { const d = src[i]; if (d === '\\') { i += 2; continue; } if (d === '[') enClase = true; else if (d === ']') enClase = false; else if (d === '/' && !enClase) break; i++; }
          i++; while (/[a-z]/i.test(src[i] || '')) i++;
          prevSig = 'x'; prevPalabra = ''; continue;
        }
        i++; prevSig = '/'; prevPalabra = ''; continue;
      }
      if (c === '{') { const esObj = ('(,=:[?!&|'.includes(prevSig) && prevSig !== '') || prevPalabra === 'return' || prevPalabra === 'typeof' || prevPalabra === 'case'; stk.push((pendingArrow || (pendingFn && paren === pendingFnParen)) ? 'b' : esObj ? 'o' : 'b'); if (pendingArrow || (pendingFn && paren === pendingFnParen)) { fnStack.push(brace + 1); pendingArrow = false; pendingFn = false; } if (enPlantilla) b0++; brace++; i++; prevSig = '{'; prevPalabra = ''; continue; }
      if (c === '}') {
        if (enPlantilla && b0 === 0) { i++; return; }
        if (enPlantilla) b0--;
        stk.pop(); brace--; while (fnStack.length && brace < fnStack.at(-1)) fnStack.pop(); podarExpr(); i++; prevSig = '}'; prevPalabra = ''; continue;
      }
      if (c === '(') { stk.push('p'); paren++; i++; prevSig = '('; prevPalabra = ''; continue; }
      if (c === ')') { stk.pop(); paren--; podarExpr(); i++; prevSig = ')'; prevPalabra = ''; continue; }
      if (c === '[') { stk.push('a'); brack++; i++; prevSig = '['; prevPalabra = ''; continue; }
      if (c === ']') { stk.pop(); brack--; podarExpr(); i++; prevSig = ']'; prevPalabra = ''; continue; }
      if (/[A-Za-z_$]/.test(c)) {
        let j = i; while (j < n && /[\w$]/.test(src[j])) j++;
        const w = src.slice(i, j); const antes = (src[i - 1] === '.' && src[i - 2] === '.') ? ' ' : src[i - 1];
        if (antes !== '.') { ids.push(w); idLineas.push(linea); let q = j; while (/\s/.test(src[q] || '')) q++; tokens.push({ nombre: w, ini: i, fin: j, linea, inner: stk.at(-1) || '', prev: prevSig, prevPal: prevPalabra, next: src[q] || '' }); }
        if (w === 'function') { pendingFn = true; pendingFnParen = paren; }
        if (w === 'return' && antes !== '.' && fnStack.length === 1 && exprStack.length === 0) retornos.push(linea);
        if (antes !== '.' && prevPalabra !== 'let' && prevPalabra !== 'const' && prevPalabra !== 'var') {
          let k2 = j; while (src[k2] === ' ' || src[k2] === '\t') k2++;
          const o3 = src.slice(k2, k2 + 3); const o2 = o3.slice(0, 2);
          const pre2 = src.slice(i - 2, i);
          const asigna = o2 === '++' || o2 === '--' || pre2 === '++' || pre2 === '--' || /^(\|\|=|&&=|\?\?=|\*\*=)/.test(o3) || /^[-+*\/%&|^]=/.test(o2) || (src[k2] === '=' && src[k2 + 1] !== '=' && src[k2 + 1] !== '>');
          if (asigna) asignaciones.push({ nombre: w, linea, enFuncion: fnStack.length > 1 || exprStack.length > 0 });
        }
        // declaraciones del nivel superior (llave 1, sin paréntesis ni corchetes abiertos)
        if (!enPlantilla && brace === 1 && paren === 0 && brack === 0 && (w === 'const' || w === 'let' || w === 'var' || w === 'function') && (prevSig === ';' || prevSig === '{' || prevSig === '}' || prevSig === '' || lastTokLine < linea)) {
          let k = j; while (/\s/.test(src[k])) k++;
          if (w === 'function' && src[k] === '*') k++, (k = k);
          if (src[k] !== '{' && src[k] !== '[') { let m0 = k; while (m0 < n && /[\w$]/.test(src[m0])) m0++; if (m0 > k) declStmts.push({ nombre: src.slice(k, m0), tipo: w, kwIni: i, nombreFin: m0, linea, simple: true }); } else declStmts.push({ tipo: w, linea, simple: false });
          if (src[k] === '{' || src[k] === '[') { // destructuring
            const cierre = src[k] === '{' ? '}' : ']'; let d = 1; let m = k + 1; while (m < n && d > 0) { if (src[m] === src[k]) d++; else if (src[m] === cierre) d--; m++; }
            const patron = src.slice(k + 1, m - 1);
            for (const p of patron.split(',')) { const nom = p.split(':').pop().split('=')[0].replace('...', '').trim(); if (/^[A-Za-z_$][\w$]*$/.test(nom)) declaradas.push({ nombre: nom, linea, tipo: w }); }
          } else { let m = k; while (m < n && /[\w$]/.test(src[m])) m++; if (m > k) declaradas.push({ nombre: src.slice(k, m), linea, tipo: w }); }
        }
        prevPalabra = w; prevSig = 'x'; lastTokLine = linea; i = j; continue;
      }
      if (/[0-9]/.test(c)) { let j = i; while (j < n && /[\w.]/.test(src[j])) j++; i = j; prevSig = 'x'; prevPalabra = ''; continue; }
      if (c === '=' && src[i + 1] === '>') { i += 2; let k3 = i; while (/\s/.test(src[k3] || '')) k3++; if (src[k3] === '{') pendingArrow = true; else exprStack.push({ p: paren, k: brack, b: brace }); prevSig = '>'; prevPalabra = ''; continue; }
      if (c === ',' || c === ';') { while (exprStack.length) { const t = exprStack.at(-1); if (paren === t.p && brack === t.k && brace === t.b) exprStack.pop(); else break; } }
      prevSig = c; prevPalabra = ''; i++;
    }
  }
  leerCodigo(false);
  return { prof, declaradas, tokens, declStmts, ids, idLineas, asignaciones, retornos, lineas: linea + 1 };
}
