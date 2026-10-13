// uso: node validar.js N  -> chequea resultado-N.json contra lote-N.json
const fs=require('fs');const n=process.argv[2];
const lote=JSON.parse(fs.readFileSync(`lote-${n}.json`));const r=JSON.parse(fs.readFileSync(`resultado-${n}.json`));
const F=/^\d{4}-\d{2}-\d{2}$/;let prob=0;
for(const [pais,clubs] of Object.entries(lote)) for(const c of clubs){
  const R=(r.clubes||{})[c.clubId]; if(!R){console.log(`FALTA ${c.clubId}`);prob++;continue;}
  for(const g of R.gestiones||[]){const e=[];
    for(const k of ['nombre','corto','cargo','desde','fuente']) if(!g[k]) e.push('sin '+k);
    if(g.desde&&!F.test(g.desde)) e.push('desde mal');
    if(g.hasta!==null&&g.hasta!==undefined&&!F.test(g.hasta)) e.push('hasta mal');
    if(g.hasta&&g.desde&&g.hasta<g.desde) e.push('hasta<desde');
    if(typeof g.confirmada!=='boolean') e.push('confirmada no booleano');
    if(g.fuente&&!/^https?:\/\//.test(g.fuente)) e.push('fuente no URL');
    if(e.length){console.log(`${c.clubId} ${g.nombre}: ${e.join(', ')}`);prob++;}}
  const conf=(R.gestiones||[]).filter(g=>g.confirmada);
  for(const cierre of c.cierres){const q=conf.filter(g=>g.desde<=cierre&&(g.hasta===null||g.hasta>cierre));
    if(q.length!==1){console.log(`${c.clubId} cierre ${cierre}: ${q.length} gestiones confirmadas lo cubren`);prob++;}}
  if((R.dudas||[]).length) console.log(`  dudas ${c.clubId}: ${R.dudas.length}`);
}
console.log(`lote ${n}: ${prob} problemas`);
