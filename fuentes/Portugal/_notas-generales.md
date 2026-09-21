# Notas generales — Portugal

## Metodología y hallazgo regulatorio, sesión 2026-09-17 (decimotercer país nuevo, orden alfabético)

Portugal resultó, junto con Bélgica/Dinamarca/Grecia, uno de los países con MEJOR cobertura de liga
completa del proyecto — pero por un mecanismo distinto a todos: acá NO hizo falta ningún registro
mercantil central (pago o gratis), el canal real fue casi 100% el **sitio propio de cada club**,
sostenido por la obligación de licenciamiento de la Liga Portugal/FPF (mismo patrón "mandato de
licencia" ya visto en Croacia/HNS, Italia/UEFA y Países Bajos/KNVB-F.04) combinada con que 2 de los
3 "grandes" (Benfica, Sporting) **cotizan en bolsa** desde hace más de dos décadas y publican series
larguísimas por obligación de disclosure de mercado, no solo de licencia deportiva.

- **Registro societario (`publicacoes.mj.pt` / BDCA — Base de Dados das Contas Anuais, operada por
  el Instituto dos Registos e do Notariado)**: la REGISTRACIÓN de las cuentas de una empresa ante
  este sistema es PAGA (85€, o 80€ para ejercicios desde 2012, según fuentes de contabilidad
  consultadas) — pero eso lo paga la propia empresa al depositar, no un tercero que quiere
  consultar. La CONSULTA por un tercero no quedó 100% confirmada: el enlace "Consulta de Certidão
  de Prestação de Contas" del portal `publicacoes.mj.pt` redirige a una página de gov.pt que a su
  vez devolvió 404 en el intento de esta sesión (parece un enlace roto del lado del gobierno, no un
  bloqueo de pago explícito). **No se insistió más porque no hizo falta**: los 3 grandes cotizantes
  y la mayoría del resto de la liga publican voluntariamente en su propio sitio series más
  profundas que lo que este registro podría ofrecer de todos modos. Si se retoma en el futuro,
  probar `Pedir certidão` desde cero (capturando el redirect real) antes de asumir que es un
  callejón sin salida — a diferencia de Austria/Croacia/Francia/Italia/Países Bajos (confirmados
  PAGOS de punta a punta), acá quedó ambiguo, no confirmado como bloqueo.
- **Los 3 grandes cotizantes dieron las series más largas de todo el país, y Sporting resultó ser
  el mejor hallazgo individual de TODO EL PROYECTO hasta ahora**: Sporting CP publica una serie
  ININTERRUMPIDA de **26 ejercicios (1999 a 2024/25)** en su propia sección de Investor Relations —
  más larga que Juventus (23, Italia) y que cualquier club de Bélgica/Dinamarca (registros
  mercantiles vía API). Benfica publica 21 ejercicios (2005/06-2025/26, un solo hueco en 2010/11).
  FC Porto, aunque también SAD y con obligaciones de disclosure a la CMVM por sus emisiones de
  deuda, solo expone 10 ejercicios en su sitio (2015/16-2024/25) — no se confirmó si CMVM tiene más
  atrás, queda pendiente para una sesión futura.
- **La obligación de licencia de la Liga Portugal/FPF generalizó el hallazgo al resto de la liga,
  igual que UEFA en Italia o F.04/KNVB en Países Bajos**: de los 15 clubes restantes, **14
  publican voluntariamente en su propio sitio** con series de 3 a 8 ejercicios cada uno — Braga (8),
  Rio Ave (10, la mejor serie de un club "chico"), Santa Clara (6), Famalicão (7), Vitória
  Guimarães/Casa Pia/Estoril Praia/Moreirense/Alverca/Nacional (4 cada uno), Gil Vicente (4),
  Estrela da Amadora (3), AVS (3), Tondela (1, parcial, vía archivo nacional). **Solo Arouca quedó
  en cero** — no por bloqueo estructural sino porque el club rediseñó su sitio y perdió sus propios
  links viejos (ver `fuentes/Portugal/Arouca.md`).
- **NO existe un agregado de liga entera tipo DFL alemana/ÖFBL austríaca/DNCG francesa**: se buscó
  explícitamente un informe tipo "Liga Portugal Business Report" con datos por club — lo único
  encontrado fue el "Relatório de Atividades e Contas" de la propia Liga Portugal (las cuentas DE
  LA LIGA como organización, no de los clubes) y un benchmark agregado del UEFA European Club
  Finance and Investment Landscape Report (cifras de todo el país sumadas, no por club). No vale la
  pena insistir con este ángulo para Portugal.
- **3 de los 18 clubes NO son SAD**: Arouca, Gil Vicente y Casa Pia son **SDUQ** (Sociedade
  Desportiva Unipessoal por Quotas) — una cuota única en manos del club fundador, sin accionistas
  externos, a diferencia de la SAD que reparte capital en acciones. Igual publican Relatório e
  Contas por la misma obligación de licencia — no cambia el canal, solo la forma jurídica.
- **Formato de los documentos: mezcla, no homogéneo como Italia (100% texto nativo) ni como Noruega
  (100% escaneo)**. Benfica/Sporting/Porto/Braga/Rio Ave/Santa Clara/Famalicão/Estoril
  Praia/Moreirense/Casa Pia/Nacional entregan PDF con texto nativo (cero OCR necesario). Alverca y
  Estrela da Amadora (clubes recién profesionalizados, con SAD/SDUQ muy jóvenes) entregan un
  formato CONDENSADO de 2-6 páginas (una ficha de balance, no un reporte narrativo completo) — igual
  de válido, solo más corto. Tondela y los 2 documentos rescatados de arquivo.pt vienen sin capa de
  texto (escaneo), pendiente OCR si se cargan al sitio.

## Gotcha transversal de esta sesión: sitios rediseñados que rompen sus propios links viejos, con
## Wayback como single point of failure adicional

Se repitió, más que en cualquier país anterior, el patrón "el club migró/rediseñó su sitio y sus
propios links de PDF de años anteriores quedaron rotos" (visto antes en Italia con
Inter/Napoli/Udinese, sección 21 del skill): pasó con **SC Braga** (migró a una SPA nueva,
framework "wbk"), **Gil Vicente** (varias rutas 404) y **Moreirense** (toda la página institucional
vieja 404, rescatada solo vía Wayback). La vuelta que funcionó para Braga y Gil Vicente fue Wayback
Machine — pero **Arouca mostró el límite de esa vuelta**: sus 4 PDF solo tienen UN snapshot cada
uno en Wayback, y los 4 vienen truncados a 5 MB por el mismo motivo ya documentado para Udinese
(captura vía Common Crawl). Cuando Wayback también falla (o trunca), vale la pena probar
**arquivo.pt** (el archivo web NACIONAL portugués, `arquivo.pt`, con API CDX compatible en
`arquivo.pt/wayback/cdx?url=...` y replay en `arquivo.pt/wayback/<timestamp>id_/<url>`) — funcionó
para rescatar el único ejercicio real de Tondela, que ni el sitio en vivo ni Wayback tenían. **Para
cualquier país con archivo web nacional propio (España tiene uno, Francia tiene uno, etc.), vale la
pena agregarlo como tercera opción después de Wayback antes de dar un club por perdido.**

## Cómo mantener esta nota

Actualizar si Arouca destraba su situación (PDF reencontrados sin truncar, o el club los resube),
si se completa el hueco de Vitória Guimarães 2022/23 o el de Braga 2017/18-2018/19, o si se
confirma/descarta el registro `publicacoes.mj.pt`/BDCA como canal de consulta gratuita.
