#!/usr/bin/env python3
# uso: chk.py <dir_país>  -> por club: años, páginas, chars de texto, 1ra línea con nombre
import sys,glob,os,subprocess,re
for d in sorted(glob.glob(sys.argv[1]+'/*/')):
    print('##',os.path.basename(d.rstrip('/')))
    for f in sorted(glob.glob(d+'*.pdf')):
        t=subprocess.run(['pdftotext','-l','3','-layout',f,'-'],capture_output=True,text=True).stdout
        pg=subprocess.run(['pdfinfo',f],capture_output=True,text=True).stdout
        m=re.search(r'Pages:\s+(\d+)',pg)
        print(' ',os.path.basename(f),m.group(1) if m else '?','pg',len(t),'chars |',re.sub(r'\s+',' ',t)[:110])
