# Epicentr (Kamianets-Podilskyi)

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: ГРОМАДСЬКА ОРГАНІЗАЦІЯ "ФУТБОЛЬНИЙ КЛУБ "ЕПІЦЕНТР" М.КАМ'ЯНЕЦЬ-
  ПОДІЛЬСЬКИЙ" (Public Organization "FC Epicentr" of Kamianets-Podilskyi), EDRPOU 43731024 — es una
  ГО (organización pública/civil sin fines de lucro), no una sociedad — y aun así publica estados
  financieros completos por el art. 14 de la Ley de Contabilidad (que no distingue por forma
  jurídica, solo por tamaño de empresa). No confundir con ТОВ "ЕПІЦЕНТР К" (EDRPOU 32490244), la
  cadena de retail homónima que patrocina al club — son entidades distintas.
- **Canal**: sitio oficial del club, `fcepicentr.com.ua` — una página separada por ejercicio
  (`/finansova-zvitnist-za-2022-rik/`, `-2023-rik`, `-2024-rik`, `-2025-rik`), cada una con 3 PDF
  (dictamen de auditor, estados financieros combinados, flujo de fondos). 100% scripteable por
  `curl`.

## Qué se bajó (sesión 2026-09-18)

**Serie de 4 ejercicios (2022-2025), sin huecos.** `Clubes/Ucrania/Epicentr/`:

- `epicentr-auditor-2022.pdf`, `epicentr-financiero-2022.pdf`, `epicentr-flujo-caja-2022.pdf`.
- `epicentr-auditor-2023.pdf`, `epicentr-financiero-2023.pdf`, `epicentr-flujo-caja-2023.pdf`.
- `epicentr-auditor-2024.pdf`, `epicentr-financiero-2024.pdf`, `epicentr-flujo-caja-2024.pdf`.
- `epicentr-auditor-2025.pdf`, `epicentr-financiero-2025.pdf`, `epicentr-flujo-caja-2025.pdf`.

12 archivos, paquete completo los 4 años. Cada página del sitio aclara explícitamente "Агентам
(посередникам) за [año] рік виплат не було" (no hubo pagos a agentes/intermediarios ese año).

## Verificación hecha en esta sesión

Los 12 archivos descargaron con HTTP 200, tamaños entre 444 KB y 3,3 MB (el dictamen de auditor es
consistentemente el más pesado, ~3-3,3 MB, en los 4 años).

## Dudas / pendientes

Ninguna. Caso limpio — la única particularidad es la forma jurídica ГО, documentada arriba para
que una sesión futura no la confunda con la retailer homónima.

- Último chequeo: 2026-09-18.
