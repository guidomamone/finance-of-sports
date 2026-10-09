import fs from 'fs'; import {execSync} from 'child_process';
const [A,B]=process.argv.slice(2);
const load=(d)=>{const m=new Map(); for(const f of execSync(`find ${d}/Generados -name "*.verificacion.json"`,{maxBuffer:1e8}).toString().split('\n').filter(Boolean)){const v=JSON.parse(fs.readFileSync(f,'utf8')); m.set(v.pdf,v);} return m;};
const a=load(A),b=load(B);
const sel=(v)=>v.chequeos.filter(c=>/^documento del año|^año anterior cargado/.test(c.nombre));
let mejora=0,empeora=0,igual=0,cambiaNum=0, tot=0;
const nums=(d)=>String(d).match(/-?\d+\.\d+|\d{3,}/g)?.join(' ')||'';
for(const [p,va] of a){const vb=b.get(p); const sa=sel(va), sb=sel(vb);
 const ma=new Map(sa.map(c=>[c.nombre,c])), mb=new Map(sb.map(c=>[c.nombre,c]));
 for(const [n,ca] of ma){ const cb=mb.get(n); tot++; if(!cb){console.log('PERDIDO',p,n);continue;}
  if(ca.ok===cb.ok){ igual++; if(nums(ca.detalle)!==nums(cb.detalle)){cambiaNum++; console.log('  ok igual ('+ca.ok+') pero números cambian ::',p.replace('Clubes/Italia/',''),'|',n,'|',nums(ca.detalle),'->',nums(cb.detalle));} continue;}
  const tag = (ca.ok===false&&cb.ok===true)?'MEJORA false->true': (ca.ok===true&&cb.ok===false)?'EMPEORA true->false': `CAMBIA ${ca.ok}->${cb.ok}`;
  if(/MEJORA/.test(tag))mejora++; else if(/EMPEORA/.test(tag))empeora++;
  console.log(tag,'::',p.replace('Clubes/Italia/',''),'|',n,'\n      antes:',ca.detalle.slice(0,170),'\n      desp.:',cb.detalle.slice(0,170),'\n      estado',va.estado,'->',vb.estado);
 }
 for(const n of mb.keys()) if(!ma.has(n)) console.log('NUEVO',p,n,mb.get(n).ok);
}
console.log({tot,igual,mejora,empeora,cambiaNum});
