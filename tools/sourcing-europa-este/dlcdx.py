#!/usr/bin/env python3
# uso: dlcdx.py <outdir> <listfile>   listfile: lineas "ts url" (salida de cdxm.sh) o "- url" (solo vivo).
# Para cada una: prueba la URL viva; si no es PDF válido, Wayback id_ (ts). Valida %PDF, pdfinfo y que no sea truncado (1048576).
import sys,os,subprocess,urllib.parse,time,re
out=sys.argv[1]; lst=sys.argv[2]
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
os.makedirs(out,exist_ok=True)
def good(fn):
    if not os.path.exists(fn) or os.path.getsize(fn)<500: return False
    if open(fn,'rb').read(5)!=b'%PDF-': return False
    r=subprocess.run(['pdfinfo',fn],capture_output=True,text=True).stdout
    return 'Pages:' in r and os.path.getsize(fn)!=1048576
def curl(url,fn,ref=None):
    a=['curl','-s','-L','-m','150','-A',UA,'-o',fn]
    if ref: a+=['-H','Referer: '+ref]
    subprocess.run(a+[url])
for line in open(lst):
    p=line.split()
    if len(p)<2: continue
    ts,url=p[0],p[1]
    name=urllib.parse.unquote(url.split('/')[-1]).split('?')[0]
    name=re.sub(r'[^\w.\-]+','-',name)
    m=re.search(r'/uploads/(\d{4})/(\d\d)/',url)
    if m and os.environ.get('YPFX'): name=f'up{m.group(1)}-{name}'
    fn=os.path.join(out,name)
    if good(fn): print('YA',name); continue
    ok=False
    live=url.replace(':80/','/')
    if ts=='-' or True:
        curl(live,fn,live.split('/')[0]+'//'+live.split('/')[2]+'/')
        ok=good(fn)
        if not ok and os.path.exists(fn): os.remove(fn)
    if not ok and ts!='-':
        for i in range(3):
            curl(f'http://web.archive.org/web/{ts}id_/{url}',fn)
            ok=good(fn)
            if ok: break
            if os.path.exists(fn): os.remove(fn)
            time.sleep(10*(i+1))
        src='WB'+ts
    else: src='LIVE'
    if ok:
        pg=subprocess.run(f"pdfinfo '{fn}' | grep -a Pages",shell=True,capture_output=True,text=True).stdout.split()[-1]
        print('OK ',src if not ok or ts=='-' else src,name,os.path.getsize(fn),pg+'pg')
    else: print('FALLO',name,url)
    time.sleep(2)
