# Notas generales — Italia

## Metodología y hallazgo regulatorio, sesión 2026-09-17 (décimo país nuevo, orden alfabético)

Italia resultó, junto con Alemania (Unternehmensregister + DFL) y Bélgica/Dinamarca (registros
mercantiles-API), uno de los países con MEJOR cobertura de liga completa del proyecto — pero por un
mecanismo distinto a todos los anteriores: acá el motor no es un registro mercantil central ni un
regulador de valores, es el **Manuale delle Licenze UEFA**, que exige a todo club que participa en
competiciones UEFA publicar sus estados financieros combinados en su propio sitio web. Varios PDF de
esta sesión (Atalanta, AS Roma) citan esa obligación explícitamente en su propio texto.

- **Registro Imprese (`registroimprese.it`) — CONFIRMADO PAGO**, como anticipaba el prompt de la
  sesión. Las visure/bilanci de terceros (no el titular de la empresa) se pagan con tarjeta según
  tarifas del decreto del Ministerio de Desarrollo Económico de 2007 — no hay tier gratis para
  consultar el bilancio de otra empresa. `ufficiocamerale.it` es un revendedor privado con el mismo
  problema (pago). No vale la pena para ningún club de esta liga mientras el sitio propio publique
  algo — que, sorprendentemente, resultó ser la mayoría.
- **Report Calcio (FIGC/PwC/AREL, `figc.it/media/.../report-calcio-2025.pdf`) — existe pero NO sirve
  como fuente por club**: es un estudio agregado anual (como el Deloitte Pro League Report de
  Bélgica o el Finanzkennzahlen de la DFL alemana), con cifras consolidadas de todo el sistema
  (Serie A+B+C) y series históricas de pérdidas agregadas — útil como cifra de contexto/control, no
  como balance individual descargable. A diferencia de la DFL alemana o la DNCG francesa, NO trae el
  bilancio de cada club por separado.
- **El mejor lead individual confirmado fue Juventus**, como anticipaba el prompt: cotiza en Borsa
  Italiana desde 2001 y publica una serie ININTERRUMPIDA de 23 ejercicios (2002/03-2024/25) en su
  propia sección de Investor Relations — la serie más profunda de cualquier club de fútbol de todo
  el proyecto. **S.S. Lazio también cotiza** (desde 1998, más antigua que Juventus) pero su sección
  de "Documenti" no es un archivo histórico navegable — solo expone los ~30 documentos más recientes
  de cualquier tipo — así que solo se pudo cargar el ejercicio 2024/25; el histórico bursátil
  1998-2024 de Lazio queda como la pista individual más prometedora sin agotar de todo el país.
- **La obligación de licencia UEFA generalizó el hallazgo mucho más allá de los 2 cotizantes**: 11 de
  los 20 clubes de Serie A 2025/26 publican voluntariamente el fascicolo completo (bilancio
  individual y/o consolidado) en su propio sitio, con series de 1 a 8 ejercicios según cuán prolijo
  sea el club manteniendo su propia página: Juventus (23), Lazio (1, pero con 26 de historia
  bursátil sin explotar), Inter (5), AC Milan (8), AS Roma (8), Napoli (6), Atalanta (8), Fiorentina
  (2), Genoa (4), Parma (6), Bologna (2), Udinese (2), Sassuolo (6), Hellas Verona (1), Como (2),
  Cremonese (2). **4 clubes quedaron en cero** (Torino, Pisa, Lecce, Cagliari) — ninguno por bloqueo
  estructural confirmado, sino por no tener (o no mantener visible) esa sección en su sitio; Cagliari
  es un caso aparte, tiene la sección pero el link a Google Drive está roto.
- **Gotcha transversal, encontrado en Inter, Napoli y Udinese**: varios clubes migraron de CDN/dominio
  con el tiempo (`static.inter.it`, `cdn.sscnapoli.iquii.info`, `cdn-assets.sscnapoli.it`,
  subcarpetas viejas de `udinese.it/club/compliance/`) y **dejaron sus propios links viejos rotos**
  sin actualizar — un patrón mucho más común en Italia que en cualquier país anterior del proyecto.
  Wayback Machine rescató los de Inter y Napoli sin problema; los de Udinese (2022/23 y 2023/24)
  solo tienen una captura disponible y viene TRUNCADA a 5 MB (ver `fuentes/Italia/Udinese.md` para el
  detalle del header `warning: wayback content truncated by "length"` — un gotcha de tooling nuevo
  para el proyecto, no visto en sesiones anteriores).
- **Transiciones de ejercicio fiscal, mismo patrón que UK/Dinamarca**: Genoa (dic→jun, 2023→2024) y
  Parma (jun→dic, alrededor de 2018) cambiaron la fecha de cierre de su ejercicio en algún momento de
  su historia reciente — chequear la duración real de cada ejercicio de transición antes de cargar.
- **Sassuolo y Torino cierran a fin de año calendario (31 de diciembre)**, no a 30 de junio como la
  mayoría — no es un error, es la convención de esos dos clubes en particular.

## Cómo mantener esta nota

Actualizar si algún club en cero (Torino/Pisa/Lecce/Cagliari) destraba su situación, si se completa el
histórico bursátil de Lazio, o si aparece un nuevo gotcha de CDN roto en otro club italiano no
cubierto todavía por esta sesión.
