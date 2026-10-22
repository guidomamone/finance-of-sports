// tools/contexto-manual-escribir.mjs — serializa tools/contexto-manual.json con el MISMO formato que tiene a mano (un club por bloque, un año por línea), para que una escritura
// automática (estadio-sponsor.mjs, estadio «confirmado» por Wikidata y Wikipedia) no reformatee el archivo entero ni ensucie el diff.
export function serializar(man) {
  const campo = ([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`;
  const partes = Object.entries(man).map(([club, v]) => {
    if (club.startsWith('_')) return `  ${JSON.stringify(club)}: ${JSON.stringify(v)}`;
    const anios = Object.entries(v).map(([y, d]) => `    ${JSON.stringify(y)}: { ${Object.entries(d).map(campo).join(', ')} }`);
    return `  ${JSON.stringify(club)}: {\n${anios.join(',\n')}\n  }`;
  });
  return `{\n${partes.join(',\n')}\n}\n`;
}
