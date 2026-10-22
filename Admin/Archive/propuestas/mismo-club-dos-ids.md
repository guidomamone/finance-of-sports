# Skill contrato-de-datos-finance-of-sports: sección nueva «¿Es el mismo club?» (propuesta, 2026-10-21)

Guido: «armemos un proceso para estos casos, yo no conozco la liga amateur de Bélgica de memoria». Caso: Lierse, con `liersekempenzonen-be` (2018-21) y `liersesk-be` (2022-25).

## Texto exacto

## ¿Es el mismo club? (dos ids, un cambio de nombre, una refundación)

Cuando dos fichas parecen el mismo club, no se decide de memoria: se decide con la entidad legal.

1. **Juntar la evidencia, de cada ficha:** el número de la entidad que firma el balance (registro mercantil o de asociaciones del país: KBO/BCE en Bélgica, CNPJ en Brasil, Companies House en el Reino Unido, CUIT en Argentina), el número de afiliación a la federación (el «stamnummer» o «matricule» en Bélgica) y, si hay, la fecha de fundación. Sale de la primera página del `.md` del balance y del registro público; cada dato con su cita.
2. **Decidir con esta tabla:**
   - **misma entidad legal** (mismo número de registro), aunque cambie el nombre → es el mismo club: un solo id, el viejo como alias en `data/club-aliases.js`, los años juntos en una ficha;
   - **entidad distinta**, aunque herede nombre, escudo o estadio (una refundación, un club nuevo que compró la plaza) → son dos clubes: dos ids, y cada ficha dice de quién es sucesor;
   - **no se puede saber** (falta el número en los documentos) → queda como está y la pregunta va a `Admin/dudas-por-club.md`.
3. **Quién decide:** la Auditora, con la evidencia del punto 1 en `Admin/registros/auditoria-proceso.jsonl`. Si la tabla no alcanza, se vota (`votacion-de-criterios`). Guido no decide de memoria: ve el resultado.
4. **Cómo se aplica:** el cambio de id lo hace una sesión de datos con `tools/migrar-v2.mjs` de modelo (alias, redirect 301 de `fuentes/` en `netlify.toml`, `data/club-leagues/`), con `audit.js` sin P0 ni P1 y el trailer `Corrige:`.

## Cómo mantener esta skill

(Aprobado por Guido el 2026-10-21: «aprobado». Va antes de «Cómo mantener esta skill».)
