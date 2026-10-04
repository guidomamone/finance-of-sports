#!/usr/bin/env python3
# uso: dfo.py <BIN> <outdir>  -> baja de opi.dfo.kz (modo invitado, sin login) los PDF de nodos "Аудиторский отчет"(6), "Пояснительная записка"(4) y adjuntos(7) de cada reporte anual (plugin 665)
import sys,re,subprocess,os,json,time,html,urllib.parse,base64,gzip
bin_,out=sys.argv[1],sys.argv[2]
B='https://opi.dfo.kz'
def get(u,fn=None):
    a=['curl','-s','-m','180','-L']+(['-o',fn] if fn else [])+[u]
    return subprocess.run(a,capture_output=True)
h=get(f'{B}/ru/opi/list?oq=&flBin={bin_}&flNameRu=&flBlock=Active_%D0%A1%D0%B2%D0%BE%D0%B1%D0%BE%D0%B4%D0%BD%D0%BE').stdout.decode('utf8','ignore')
m=re.search(r'/ru/opi/list/(\d+)/view',h)
if not m: print('NO OBJ',bin_); sys.exit(1)
oid=m.group(1)
name=re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',h[m.start():m.start()+900])))[:140]
print('OBJ',oid,name)
plugins=json.loads(get(f'{B}/ru/report-json/{oid}/get-plugins').stdout)
os.makedirs(out,exist_ok=True)
for p in plugins:
    if p['ReportsCount']==0: continue
    print(' PLUGIN',p['PluginName'][:70],p['ReportsCount'])
    if not p['PluginName'].startswith('665') and 'МСФО' not in p['PluginName']: continue
    reps=json.loads(get(f"{B}/ru/report-json/{oid}/get-reports?pluginId={p['PluginId']}").stdout)
    for r in reps:
        rid=r['ReportId']; ld=r['LoadDate'][:10]
        nodes=json.loads(get(f"{B}/ru/report-json/{oid}/get-nodes?pluginId={p['PluginId']}&reportId={rid}").stdout)
        info=get(f"{B}/ru/render-blocks/{oid}/get-node-data?pluginId={p['PluginId']}&reportId={rid}&nodeId=1").stdout.decode('utf8','ignore')
        txt=re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',info))
        yr=re.search(r'(20\d\d)',txt)
        print('  REPORT',rid,ld,txt[:160])
        # nodo 3: estados estructurados (F1 balance, F2 PyG, F3 flujo, F4 patrimonio) en base64+gzip
        jfn=f"{out}/rep{rid}-{ld}-n3-estados-estructurados.json"
        if not os.path.exists(jfn):
            h3=get(f"{B}/ru/render-blocks/{oid}/get-node-data?pluginId={p['PluginId']}&reportId={rid}&nodeId=3").stdout.decode('utf8','ignore')
            m3=re.search(r"book-content\[view-model\]='([^']+)'",h3)
            if m3:
                try:
                    open(jfn,'w').write(gzip.decompress(base64.b64decode(m3.group(1))).decode('utf8'))
                    print('   JSON',os.path.basename(jfn),os.path.getsize(jfn))
                except Exception as e: print('   JSON-FALLO',e)
        for n in nodes:
            if n['NodeId'] not in (4,6,7): continue
            hh=get(f"{B}/ru/render-blocks/{oid}/get-node-data?pluginId={p['PluginId']}&reportId={rid}&nodeId={n['NodeId']}").stdout.decode('utf8','ignore')
            for fm in re.finditer(r"href='(/ru/file-download/[^']+)'[^>]*>([^<]+)</a>\s*<p[^>]*>([^<]*)",hh):
                url,fname,size=fm.group(1),html.unescape(fm.group(2)).strip(),fm.group(3)
                safe=re.sub(r'[^\w.\-]+','-',fname)
                fn=f"{out}/rep{rid}-{ld}-n{n['NodeId']}-{safe}"
                if os.path.exists(fn) and os.path.getsize(fn)>1000: print('   YA',fn); continue
                ok=False
                isdoc=fname.lower().endswith(('.doc','.docx','.xls','.xlsx'))
                for i in range(3):
                    get(B+url,fn)
                    if os.path.exists(fn) and ((isdoc and os.path.getsize(fn)>500) or open(fn,'rb').read(5)==b'%PDF-'): ok=True; break
                    time.sleep(10)
                pg=[] if isdoc else subprocess.run(f"pdfinfo '{fn}' | grep -a Pages",shell=True,capture_output=True,text=True).stdout.split()
                print('   DL' if ok else '   FALLO',fn.split('/')[-1],size,pg[-1] if pg else 'NO-PDF')
                if not ok and os.path.exists(fn): os.remove(fn)
                time.sleep(2)
