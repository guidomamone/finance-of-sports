# Rosario Central

- Memoria, Ejercicio 2022-23 — rosariocentral.com/wp-content/uploads/2023/10/Memeria-ClubAtleticoRosarioCentral.pdf
  (36 págs, reporte narrativo de gestión).
- Estados Contables + informe del auditor, mismo Ejercicio 2022-23 —
  .../uploads/2023/10/EECC-Club-Atletico-Rosario-Central-e-Informe-del-auditor-30.06.2023-Firma-FT-1-1-1.pdf
  (balance auditado real, con firma). Ambos descargados en `Clubes/Argentina/Rosario Central/`.
  **El Estados Contables YA CARGADO en el sitio (Versión 95)**: 6to club del motor genérico. Anexo
  V/VI con desglose muy granular (19 filas x 8 columnas de departamento en Recursos, 38 x 13 en
  Gastos). DÉFICIT real: $(3.107.221.597) ARS. Se encontró y corrigió un error de lectura de $201M
  (una fila desalineada por el layout de pdftotext) verificando la suma contra el total impreso —
  ver `data/rosariocentral-data.js`. La Memoria (36 págs) es narrativa, no se usó.
- **Estados Contables, Ejercicio 2024-25 (cierre 30/6/2025) — ENCONTRADO 2026-09-22, CARGADO al
  sitio en sesión posterior.** 41 págs. **CORRECCIÓN: la nota anterior decía "escaneo sin capa de
  texto" y estaba mal** — verificado con `pdftotext -layout`, el documento SÍ tiene texto nativo
  completo (172.616 caracteres en 41 páginas, muy por encima del umbral de ~1 char/página que
  distingue un escaneo real). No hizo falta OCR. Pág. 3: "Composición de la Comisión Directiva y
  Comisión Revisora de cuentas al 30 de junio de 2025", presidente Gonzalo Luis Belloso (sigue en el
  cargo, gestión extendida a `lastYear:2025`). Trae el ejercicio 2024 reexpresado en moneda de cierre
  30/6/2025 como comparativo (no usado para cargar datos, ver club-data-mapping sección 6 regla 5).
  URL oficial: `rosariocentral.com/wp-content/uploads/2025/10/Balance.pdf` — nombre genérico, sin año
  ni club, imposible de adivinar. Descargado en
  `Clubes/Argentina/Rosario Central/estados-contables-2024-2025.pdf`, transcripto completo a
  `estados-contables-2024-2025.md`. Anexo V/VI agrupa en 6 departamentos (menos granular que el
  ejercicio 2022-23, que tenía 12+). fx: USD 1.165 (Anexo IV, lado Activo/Créditos — consistente en
  sus 3 líneas, sin la ambigüedad que tuvo 2022-23). DÉFICIT real: $(13.410.007.536) ARS. Verificación
  numérica cierra exacto (revenue exacto, expense con $1 de redondeo del propio documento, resultado
  final exacto al peso) — ver comentario de cabecera de `data/rosariocentral-data.js`.
- Pendiente: ejercicio 2023-24, y todo lo anterior a 2022-23. Lo probado y fallido esta sesión:
  (1) el patrón `uploads/2024/<mes>/{Balance,balance,EECC,Memoria}.pdf` con 4 meses candidatos —
  todos 404; (2) las secciones `/institucional/` y `/prensa/` del sitio vivo no contienen NINGÚN
  link a `.pdf`; (3) el índice de Wayback Machine del dominio no devuelve PDFs con nombre de
  balance/memoria. La "Sede Virtual" (rosariocentral.miclub.info) sigue sin probarse y es el ángulo
  que queda, posiblemente con login de socio.
- Último chequeo: 2026-09-22.
- Contacto: sección Socios (rosariocentral.com/socios/) o Prensa (rosariocentral.com/prensa/);
  WhatsApp institucional +54 9 341 202-1889.
- Color de marca: `#0A3D72` — tabla por liga de footylogos (Liga Profesional Argentina), 2° color,
  exacto, verificado 2026-09-21. Es el azul, NO el amarillo que la tabla lista primero: bicolor en
  partes iguales que resolvió Guido en la Versión 178, gana el azul del escudo.
