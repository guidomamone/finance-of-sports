# Eslovaquia — notas generales (sourcing Niké Liga, sesión 2026-10-03)

## Canal: registeruz.sk (Register účtovných závierok) — SÍ es scripteable, abierto y gratis, sin captcha ni cuenta

Verificado (sesión 2026-10-03). Todos los documentos de las sociedades (a.s., s.r.o.) están ahí, incluidos los
informes del auditor y las memorias, y se descargan sin login. Cadena de llamadas (todas GET, UA de navegador):

1. **Buscar el ID por nombre** (la API pública NO tiene búsqueda por nombre/IČO, el parámetro `ico` se ignora):
   `https://www.registeruz.sk/cruz-public/domain/suggestion/search?query=<nombre>` -> JSON con `id` (= id de la
   unidad contable), `entNumber` (IČO) y `entityName`. Es el autocomplete del sitio. Ojo con homónimos (clubes
   de hockey/básquet/tenis del mismo nombre).
2. `https://www.registeruz.sk/cruz-public/api/uctovna-jednotka?id=<ID>` -> `idUctovnychZavierok` (estados
   contables por año) e `idVyrocnychSprav` (memorias anuales). `konsolidovana: true` = también consolida (Slovan).
3. `.../api/uctovna-zavierka?id=<Z>` -> `obdobieDo`, `typ` (Riadna / Mimoriadna), `datumPrilozeniaSpravyAuditora`,
   `idUctovnychVykazov`. `.../api/uctovny-vykaz?id=<V>` -> `prilohy` (id, `meno`, `mimeType`, `velkostPrilohy`).
   `.../api/vyrocna-sprava?id=<S>` -> `prilohy` de la memoria.
4. **Descarga**: `https://www.registeruz.sk/cruz-public/domain/financialreport/attachment/<id-priloha>` (sin auth).

Qué viene por año (varía según el tamaño): **Správa audítora** (muchas veces el PDF incluye los estados completos
auditados, pesa MB y es escaneo/mixto), **Príloha k účtovnej závierke / Účtovná závierka** (notas), `POD_...pdf`
(formulario oficial de Súvaha + Výkaz ziskov a strát, ~445 KB, el de mejor extracción), `POD_OS_...` (aviso de
aprobación, ~130 KB), **Výročná správa**. Algunos años las notas están SOLO como .docx/.rtf/.xlsx (los .xlsx no se
bajaron; los .docx/.rtf sí).

## Gotchas
- **Ejercicio abierto**: el 2025 (cerrado 31-dic-2025) tiene estados presentados en 2026 pero a veces aún sin informe del auditor.
- **Cambio de figura jurídica**: Komárno (KFC Komárno asociación `37859170`, desde 2024 `KFC Komárno futbal, a.s.` `55960669`, más
  una `KFC Komárno, s.r.o.` `54471249` menor). Podbrezová tiene dos entidades con el mismo domicilio y fecha: `FK Železiarne
  Podbrezová a.s.` (la del primer equipo) y `ŠK Železiarne Podbrezová a.s.`; se bajó la primera. La casa matriz `Železiarne
  Podbrezová a.s.` (siderúrgica) NO es el club.
- **Pequeñas no auditan**: Zemplín Michalovce y Tatran Prešov presentan solo notas + POD (sin informe del auditor, salvo
  Michalovce 2019). Eso es lo que hay; el balance/PyG oficial está en el `POD_...pdf`.
- Spartak Trnava = `FC Spartak, a.s.` (IČO 36247057; confirmado por OCR del informe del auditor 2024: "FC Spartak, a.s., Dolné bašty 14, Trnava").
- Documentos con "Mimoriadna" (extraordinaria) se saltearon (Žilina 2020-03).

## Pendientes (venían del TODO)

- (ex to-do 134) **Reintentar capturas de Wayback truncadas a 1.048.576 bytes** cuando aparezca otra captura: [...] Tampoco están probados: Skalica/Dukla Banská Bystrica/Košice (Eslovaquia).
