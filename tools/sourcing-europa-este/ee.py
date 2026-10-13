#!/usr/bin/env python3
# uso: ee.py <regcode> <outdir> [minyear]  -> baja PDFs de aruanne válidos de ariregister.rik.ee (curl SIN User-Agent: con UA devuelve 520)
import sys,re,subprocess,os,html,time,glob
code,out=sys.argv[1],sys.argv[2]; miny=int(sys.argv[3]) if len(sys.argv)>3 else 2019
def get(url,fn=None):
    a=['curl','-s','-m','90','-L']+(['-o',fn] if fn else [])+[url]
    return subprocess.run(a,capture_output=True)
h=''
for i in range(6):
    h=get(f'https://ariregister.rik.ee/eng/company/{code}').stdout.decode('utf8','ignore')
    if '/file/' in h: break
    time.sleep(20*(i+1))
if '/file/' not in h: print('PAGE FAIL',code,h[:50]); sys.exit(1)
t=re.search(r'<title>(.*?)</title>',h,re.S); print(code,html.unescape(t.group(1).strip()) if t else '')
os.makedirs(out,exist_ok=True)
for f in glob.glob(out+'/*.pdf'):
    if open(f,'rb').read(5)!=b'%PDF-': os.remove(f)
seen={}
for r in re.findall(r'<tr[^>]*>(.*?)</tr>',h,re.S):
    m=re.search(r'/file/(\d+)"',r)
    if not m: continue
    txt=re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',r))).strip()
    p=re.search(r'(\d\d)\.(\d\d)\.(\d{4}) - (\d\d)\.(\d\d)\.(\d{4})',txt)
    if not p: continue
    yr=int(p.group(6))
    if 'Valid' in txt and yr>=miny and yr not in seen: seen[yr]=m.group(1)
for yr,fid in sorted(seen.items()):
    fn=f'{out}/aruanne-{yr}.pdf'
    if os.path.exists(fn) and os.path.getsize(fn)>1000: continue
    ok=False
    for i in range(6):
        get(f'https://ariregister.rik.ee/eng/company/{code}/file/{fid}',fn)
        if os.path.exists(fn) and open(fn,'rb').read(5)==b'%PDF-': ok=True; break
        if os.path.exists(fn): os.remove(fn)
        time.sleep(15*(i+1))
    if not ok: print('  FAIL',yr,fid); continue
    pg=subprocess.run(f"pdfinfo '{fn}' | grep -a Pages",shell=True,capture_output=True,text=True).stdout.strip()
    print('  DL',yr,fid,os.path.getsize(fn),pg or 'NO-PDF'); time.sleep(3)
