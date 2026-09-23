# Ituano (Ituano Futebol Clube — no es SAF)

- Club nuevo esta sesión, mismo mecanismo que Mirassol (obligación de auditoría ante la Federação
  Paulista de Futebol). 1 PDF descargado a `Clubes/Brasil/Ituano/relatorio-auditoria-2024.pdf` —
  "Relatório dos Auditores Independentes sobre as Demonstrações Contábeis em 31 de dezembro de 2024",
  bajado del repositorio institucional de la federación (mismo archivo también espejado en
  ituanofc.com/files/, sitio propio del club).
- **RESUELTO el 2026-09-22 — el "pendiente: años anteriores a 2024" era un problema de
  descubrimiento, no de disponibilidad.** La Federação Paulista expone un índice JSON de todos sus
  clubes filiados año por año (ver `fuentes/Brasil/_notas-generales.md`, sección "La Federação
  Paulista tiene un índice JSON de TODOS sus clubes, 2010-2025"), y ahí Ituano aparece en **15
  ejercicios: 2010 a 2024, sin ningún hueco**. Se bajaron los 14 que faltaban (2010-2023), 21 PDFs
  en total contando los años que vienen partidos en varios anexos:
  - 2010: 1 anexo. 2011, 2012, 2013: 3 anexos cada uno (balanço / DRE / parecer, con nombres
    codificados `271A.pdf`/`271B.pdf`/`271C.pdf` — el `271` es el id de club en el padrón de la
    FPF). 2014, 2015: 1 anexo. 2016: 2 anexos.
  - 2017-2023: 1-2 anexos por año, ya con nombres legibles (`BALANÇO ITUANO 2019.pdf`,
    `BALANÇO ITUANO 2020 E PARECER DA AUDITORIA.pdf`, etc.).
  - Los archivos quedaron en `Clubes/Brasil/Ituano/` con el año en el nombre; los de 2010-2016, que
    en origen tienen nombre codificado, se guardaron como `<año>-anexo-<letra>.pdf`.
  - **Sin verificar todavía qué contiene cada anexo de los años viejos** (no se abrieron: esta
    sesión es sourcing puro, no transcripción). Antes de cargar cualquier ejercicio anterior a 2017
    hay que abrir los 3 anexos del año y ver cuál es el balanço, cuál la DRE y cuál el parecer.
  - **Ojo con la atribución**: el índice de la FPF lista al club como **"Ituano SAF"** en TODOS los
    años, incluidos los muy anteriores a la Lei 14.193/2021 — es el nombre actual de la entidad en
    el padrón de la federación, no evidencia de que el club fuera SAF en 2010. La ficha del club
    sigue siendo "no es SAF" hasta que se confirme en un documento.
  - Ituano NO aparece en el listado 2025 de la FPF (descendió a la Série C) — queda como el único
    ejercicio pendiente de la serie.
- Contacto: futebolpaulista.com.br/Repositorio/Institucional/<año>/Ituano.pdf; ituanofc.com/files/.
- Último chequeo: 2026-09-22.
- Color de marca: `#E2041A` — `theme-color` del sitio oficial, según lo que registró la Versión
  178; **NO re-verificado el 2026-09-21**, porque el sitio no responde: `ituanofc.com.br` devuelve
  HTTP 503 y el `www` no valida el certificado TLS. Tampoco hay con qué corroborarlo en un
  agregador: ni footylogos (no está en la tabla del Brasileirão A) ni teamcolorcodes ni logotyp.us
  tienen página de Ituano, y el artículo de pt.wikipedia no declara ningún hex. Lo que sí queda
  verificado el 2026-09-21 es la capa 1: el rojo es de la familia correcta (Galo Rubro-Negro, rojo
  y negro, con el rojo primero en el nombre). Si el sitio vuelve, confirmar el hex exacto.
