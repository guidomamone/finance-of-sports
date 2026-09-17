# Daejeon Hana Citizen

- **Entidad legal**: 대전시티즌 주식회사 (Daejeon Citizen Co., Ltd.) — mantiene el nombre legal
  histórico "시티즌" en DART aunque el club se rebrandeó como "Daejeon Hana Citizen" al recibir el
  patrocinio/inversión de **Hana Financial Group** (하나금융그룹, KRX: 086790) desde enero de 2020.
  Distinto de los otros 3 hallazgos de este país (Jeonbuk/FC Seoul/Jeju SK, todos filiales 100% de un
  chaebol desde su fundación): Daejeon Citizen nació como un club "ciudadano" financiado por
  accionistas locales (pequeños inversores/empresas de Daejeon), lo que le dio una obligación de
  disclosure DISTINTA — no por ser filial de grupo designado, sino por haber sido **소액공모법인**
  (sociedad que hizo oferta pública de acciones a pequeña escala) bajo la ley de mercado de
  capitales.
- **Encontrado en DART como `사업보고서` (informe de negocio anual completo), no `감사보고서`**: un
  사업보고서 es más completo que un simple informe de auditoría — incluye además de los estados
  financieros auditados, la descripción del negocio, accionistas, gobierno corporativo, remuneración
  de directivos, transacciones con partes relacionadas, etc.
  - **4 ejercicios anuales descargados** (los únicos `사업보고서` disponibles, sin huecos):
    - FY2019 (제24기, 2019.01.01-2019.12.31), presentado 2020.03.31 →
      `Clubes/Corea del Sur/Daejeon Hana Citizen/annual-report-fy2019.pdf`.
    - FY2018 (제23기), presentado 2019.03.28 → `annual-report-fy2018.pdf`.
    - FY2017 (제22기), presentado 2018.03.29 → `annual-report-fy2017.pdf`.
    - FY2016 (제21기), presentado 2017.03.29 → `annual-report-fy2016.pdf`.
  - **La serie se corta abruptamente después de FY2019** — coincide exactamente con la
    reestructuración de enero de 2020 (entrada de Hana Financial Group como inversor/patrocinador
    principal, cambio de nombre del club). Lectura más probable: al reestructurarse la propiedad, la
    entidad dejó de calificar como "소액공모법인" con obligación de disclosure periódico (o pasó a
    depender de otra figura societaria) — no se confirmó la causa exacta, es una inferencia razonable
    a partir del timing, no un dato leído en ningún documento. **Duda real para reach-out** (ver
    reporte final / `dudas-por-club.md`): ¿existe algún disclosure posterior a 2019 bajo otra figura o
    entidad, y por qué se discontinuó el 사업보고서?
  - DART también tenía, en el mismo período, `분기보고서`/`반기보고서` (informes trimestrales y
    semestrales) intermedios — NO se descargaron por no ser el foco (el sitio carga ejercicios
    anuales/auditados), pero quedan listados en DART bajo la misma búsqueda por si se quiere
    completar el detalle intra-anual más adelante.
- **Cómo se encontró**: "대전하나" no dio resultados en el buscador de DART (ni con substring); el
  nombre que sí funcionó fue "대전시티즌" (el nombre legal histórico, sin "하나"). Sin filtro de
  `외부감사관련` (el `사업보고서` cae bajo la categoría `정기공시`, no `외부감사관련`) — búsqueda simple
  por compañía con rango de 10 años.
- **Cómo se descargaron los 4 PDFs**: mismo procedimiento en dos pasos con `curl` + cookie jar
  documentado en `Jeonbuk Hyundai Motors.md` / `_notas-generales.md` de este país.
- Último chequeo: 2026-09-17.
