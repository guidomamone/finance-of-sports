#!/usr/bin/env python3
# uso: bgdl.py <UIC> <carpeta-destino> [--list] [--min-year=N]  -- baja los actos con documento (Годишен финансов отчет, доклад, одитор) del Registro Mercantil búlgaro
import sys, os, re, json, time, subprocess, urllib.parse, hashlib
uic, dest = sys.argv[1], sys.argv[2]
listonly = '--list' in sys.argv
miny = 0
for a in sys.argv:
    if a.startswith('--min-year='): miny = int(a.split('=')[1])
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36'
def curl(url, out=None, tries=5):
    for t in range(tries):
        args = ['curl','-s','-m','180','-A',UA,'-D','/dev/stderr','-w','%{http_code}', url]
        if out: args[1:1] = ['-o', out]
        r = subprocess.run(args, capture_output=True)
        code = r.stdout[-3:].decode()
        if code == '200': return r
        time.sleep(6*(t+1))
    return None
r = curl('https://portal.registryagency.bg/CR/api/Deeds/%s?entryDate=2030-01-01T00%%3A00%%3A00.000Z&loadFieldsFromAllLegalForms=false' % uic)
if not r: print('FALLO deed'); sys.exit(1)
d = json.loads(r.stdout[:-3])
html = ''
for s in d['sections']:
    for sd in s['subDeeds']:
        for g in sd['groups']:
            for f in g['fields']:
                if 'DocumentAccess' in f.get('htmlData',''):
                    html += f['htmlData']
recs = []
for rec in html.split("<hr class='hr--report' />"):
    m = re.search(r"DocumentAccess/([\w\-]+)'", rec)
    if not m: continue
    guid = m.group(1)
    # puede haber varios links en un mismo registro
    guids = re.findall(r"DocumentAccess/([\w\-]+)'", rec)
    y = re.search(r'Година: (\d+)', rec)
    dt = re.search(r'Дата на обявяване: ([\d\.]+) г\. ([\d:]+)', rec)
    title = re.sub(r'<[^>]+>', ' ', rec.split('<br')[0]).strip()
    title = re.sub(r"<div[^>]*>|<p[^>]*>", '', title)
    title = re.sub(r'\s+', ' ', title)
    recs.append((title, y.group(1) if y else '0000', guids, dt.group(1) if dt else '', ))
print('UIC', uic, 'registros con documento:', len(recs))
seen = {}
for title, year, guids, date in recs:
    if int(year) < miny and miny: continue
    if re.search(r'Покана|ОС|събрание', title) and 'отчет' not in title: continue
    for guid in guids:
        key = (year, date)
        seen[key] = seen.get(key, 0) + 1
        n = seen[key]
        print(year, date, title[:50], guid[:10], '#%d' % n)
        if listonly: continue
        os.makedirs(dest, exist_ok=True)
        tmp = os.path.join(dest, '_tmp.bin')
        rr = curl('https://portal.registryagency.bg/CR/api/Documents/' + guid, out=tmp)
        if not rr: print('   FALLO descarga', year); continue
        hdr = rr.stderr.decode(errors='ignore')
        m = re.search(r"filename\*=UTF-8''([^\r\n]+)", hdr)
        orig = urllib.parse.unquote(m.group(1)) if m else ''
        ext = os.path.splitext(orig)[1].lower() or '.bin'
        kind = 'fs' if 'финансов' in title else ('doklad' if 'доклад' in title else 'doc')
        final = os.path.join(dest, 'rm-%s-%s-%s-n%d%s' % (year, kind, date.replace('.', '-'), n, ext))
        os.replace(tmp, final)
        sz = os.path.getsize(final)
        pg = ''
        if ext == '.pdf':
            pi = subprocess.run(['pdfinfo', final], capture_output=True).stdout.decode(errors='ignore')
            mm = re.search(r'Pages:\s+(\d+)', pi); pg = (mm.group(1) + ' pag') if mm else 'NO-PDF'
        print('   ->', os.path.basename(final), sz, 'bytes', pg, '| orig:', orig)
        time.sleep(2)
