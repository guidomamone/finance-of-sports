// uso: node cmp.mjs dirA dirB [lista]  -> compara lo que se CARGA y los chequeos
import fs from 'fs'; import {execSync} from 'child_process';
const [A,B,lista]=process.argv.slice(2);
const L = lista? new Set(fs.readFileSync(lista,'utf8').split('\n').filter(Boolean)):null;
const load=(d)=>{const m=new Map(); for(const f of execSync(`find ${d}/Generados -name "*.verificacion.json"`,{maxBuffer:1e8}).toString().split('\n').filter(Boolean)){const v=JSON.parse(fs.readFileSync(f,'utf8')); m.set(v.pdf,v);} return m;};
const a=load(A), b=load(B);
const cargaSig=(v)=>JSON.stringify({l:(v.lineas||[]).map(x=>[x.etiqueta,x.lado,x.M,x.linea,x.categoria||null]),f:(v.financiero||[]).filter(x=>x.M).map(x=>[x.M,x.linea]).sort((p,q)=>p[1]-q[1]),i:(v.impuesto||[]).filter(x=>x.M).map(x=>[x.M,x.linea]).sort((p,q)=>p[1]-q[1]),r:v.totales?.resultadoParaCargar,s:v.signosCarga,e:v.escala?.factor});
const chk=(v)=>(v.chequeos||[]).map(c=>`${c.nombre}:${c.ok}`).join('|');
const chkDet=(v)=>(v.chequeos||[]).map(c=>`${c.nombre}:${c.ok}:${c.detalle}`).join('|');
const cola=(v)=>(v.cola||[]).map(c=>c.motivo+'|'+c.detalle).sort().join(';');
let nC=0,nK=0,nD=0,nQ=0,nE=0;
const verbose=process.env.V;
for(const [p,va] of a){ if(L&&!L.has(p))continue; const vb=b.get(p); if(!vb){console.log('SOLO EN A',p);continue;}
 const d=[]; if(cargaSig(va)!==cargaSig(vb)){d.push('CARGA');nC++;} if(chk(va)!==chk(vb)){d.push('CHEQUEOS');nK++;} else if(chkDet(va)!==chkDet(vb)){d.push('detalle');nD++;} if(cola(va)!==cola(vb)){d.push('COLA');nQ++;} if(va.estado!==vb.estado){d.push('ESTADO '+va.estado+'->'+vb.estado);nE++;}
 if(d.length) console.log(d.join(','),'::',p.replace('Clubes/',''));
}
console.log(`docs ${a.size}/${b.size}; carga distinta ${nC}; chequeos(ok) distintos ${nK}; solo detalle ${nD}; cola distinta ${nQ}; estado distinto ${nE}`);
