#!/usr/bin/env python3
# uso: ocrdir.py <lang> <lineas> <pdf>...   OCR de la pagina 1 (150 dpi) de cada pdf
import sys,subprocess,os,tempfile,glob
lang,n=sys.argv[1],int(sys.argv[2])
T='/private/tmp/claude-501/-Users-guidopablomamonesoneira-Claude-Projects-finance-of-sports/22d04170-782b-46dc-bf69-c079c7b3b1b2/scratchpad/_ocr'
os.makedirs(T,exist_ok=True)
for pdf in sys.argv[3:]:
    for f in glob.glob(T+'/p*'): os.remove(f)
    subprocess.run(['pdftoppm','-png','-r','150','-f','1','-l','1',pdf,T+'/p'],capture_output=True)
    imgs=sorted(glob.glob(T+'/p*.png'))
    if not imgs: print('===',os.path.basename(pdf),'(sin imagen)'); continue
    t=subprocess.run(['tesseract',imgs[0],'-','-l',lang,'--psm','6'],capture_output=True,text=True).stdout
    ls=[l.strip() for l in t.splitlines() if l.strip()][:n]
    print('===',os.path.basename(pdf)); print('\n'.join(ls))
