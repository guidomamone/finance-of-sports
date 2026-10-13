# Santos (Santos Futebol Clube — sociedade civil, no es SAF)

**Ángulos**: sitio oficial: no re-chequeado (ya documentado arriba) · federación/regulador: FPF índice JSON, serie 2010-2025 completa (2010-2016 en .jpg/.pdf sueltos) · Wayback CDX: no hizo falta · búsqueda web: no hizo falta · barrido: 9 ejercicios en disco (2017-2025) (Sonnet) — 2026-10-03

- Santos tiene portal de transparencia propio: `transparencia.santosfc.com.br` (y
  `santosfc.com.br/portal-transparencia/balancos/` como puerta de entrada), además de un dominio
  de medios espejo `media.santosfc.com.br` para el ejercicio más reciente. No es SAF.
- **3 ejercicios descargados a `Clubes/Brasil/Santos/`:**
  - `demonstracoes-financeiras-2020-2021.pdf` — exercício 2021, vía repositorio de la Federação
    Paulista (`Institucional/2021/DF'S 2021 SANTOS FUTEBOL CLUBE ASSINADA.pdf`). Es un ESCANEO sin
    capa de texto (`Creator: Scanner System`) — se verificó el club vía OCR de portada (Tesseract,
    página 1 y 3): "SANTOS FUTEBOL CLUBE — DEMONSTRAÇÕES FINANCEIRAS PARA O EXERCÍCIO FINDO EM 31 DE
    DEZEMBRO DE 2021", auditado por ML Legate (member de Morison Global). Pendiente transcripción a
    Markdown vía el flujo de OCR del proyecto si se decide onboardear este ejercicio.
  - `demonstracoes-financeiras-2023-2024.pdf` — exercício 2024, vía transparencia.santosfc.com.br
    (`Balanco-Auditado-Ano-2024.pdf`, espejado también como `Demonstracoes-Financeiras-2024-Auditado.pdf`
    en el mismo dominio, y como `Institucional/2024/Santos.pdf` en la federación — los 3 son el
    mismo archivo, confirmado por tamaño idéntico 1.428.968 bytes). Tiene capa de texto (DocuSign),
    confirmado "SANTOS FUTEBOL CLUBE" explícito en el texto.
  - `demonstracoes-financeiras-2024-2025.pdf` — exercício 2025, vía media.santosfc.com.br
    (`Demonstracoes_Financeiras-2025-assinada.pdf`; mismo archivo espejado en la federación como
    `Institucional/2025/Demonstrações_Financeiras 2025 assinada SFC.pdf` — confirmado por tamaño
    idéntico 1.359.506 bytes). Confirmado "SANTOS FUTEBOL CLUBE" explícito en el texto.
- **Gotcha de atribución evitado esta sesión**: el archivo de 2025 apareció en resultados de
  búsqueda mezclado con resultados de Guarani (ambos indexados en la misma carpeta
  `Institucional/2025/` de la federación); se descartó por comparación de tamaño de archivo antes
  de asumir el club — confirmar SIEMPRE contenido, no solo la carpeta/año de la URL.
- Pendiente: 2022 y 2023 standalone (no se buscaron explícitamente esta sesión, alta probabilidad
  de que estén en `transparencia.santosfc.com.br/documentos/` con el mismo patrón de nombre).
- Contacto: `transparencia.santosfc.com.br`; `santosfc.com.br/portal-transparencia/balancos/`;
  `futebolpaulista.com.br/Repositorio/Institucional/<año>/Santos.pdf` (mirror, confirmado idéntico
  para 2024).
- Último chequeo: 2026-09-16.

## Onboarding (2026-09-24)

- **2 ejercicios cargados en `data/santos-br-data.js`** (clubId `santos-br`): 2024 (de
  `demonstracoes-financeiras-2023-2024.md`, columna "exercício corrente" de ESE documento, nunca la
  comparativa) y 2025 (de `demonstracoes-financeiras-2024-2025.md`, ídem). Confirmado en la carátula
  de ambos PDF: "exercício social findo em 31 de dezembro de 2024/2025" — año calendario,
  `fiscalYearStart:'01-01'`.
- Los 2 `.md` se leyeron coherentes, sin mojibake (texto nativo DocuSign, portugués legible de punta
  a punta) — no aplicó el gotcha de CLAUDE.md sobre fuentes no embebidas (ese caso era cirílico sin
  ToUnicode, acá no hay ese problema).
- Tie-out verificado con Node, exacto los 2 años: 2024 revenue 379,070 M BRL / expenses -411,303 M
  BRL / PAT -105,206 M BRL (déficit real); 2025 revenue 624,922 M BRL / expenses -628,410 M BRL / PAT
  -79,396 M BRL (déficit real, segundo año consecutivo).
- FX: ninguno de los 2 documentos declara tipo de cambio de cierre propio (solo política contable
  genérica) — PTAX BCB vía `FX_CLOSE`: BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).
- grossDebt = Nota 11 "Empréstimos e Antecipação de recebíveis" (2024: 129,591 M BRL; 2025: 94,338 M
  BRL). cash = "Caixa e equivalentes de caixa" (2024: 0,170 M BRL; 2025: 0,295 M BRL) — valores muy
  chicos, reflejan la crisis de liquidez que el propio Relatório da Administração 2024 documenta en
  detalle (déficit financeiro de R$62 M a fines de 2023).
- Gestión: Marcelo Pirilo Teixeira (2024-2026), confirmado directo en la firma de ambos balances —
  cubre los 2 ejercicios cargados.
- **Color de marca: #000000 — pt.wikipedia.org (Santos Futebol Clube, infobox "Cores": "branco e
  preto (alvinegro)" desde el 31/3/1913), mismo criterio que Botafogo (también alvinegro, mismo hex).
  Blanco descartado por ser el color no-distintivo (mismo criterio que River/Vélez), negro confirmado
  como el acento identificador consistente. Verificado 2026-09-24.**
- Pendiente sin cargar: 2020-2021 (escaneo sin capa de texto, transcripción a Markdown pendiente vía
  OCR) y 2022/2023 standalone (no buscados esta sesión).

## Barrido 2026-10-03 (objetivo ≥5 ejercicios: CUMPLIDO, 3 → 9)

Fuente: índice JSON de la Federação Paulista (idClube Santos, años 2010-2025 todos presentes; 2010 y 2011 son
imágenes/anexos sueltos, 2012-2016 `3383A.pdf`). Bajados con curl + UA, `pdfinfo` OK, entidad y ejercicio
verificados por OCR liviano de la carátula (tesseract, solo páginas 1-3, no transcripción): todos "SANTOS FUTEBOL
CLUBE", ejercicio = año de la carpeta (2017 con comparativo 2016, etc.). Todos son escaneos sin capa de texto
(`pdftotext` vacío) salvo los ya existentes. Md5 distinto entre todos los años.
- `demonstracoes-financeiras-2016-2017.pdf` — ej. 2017, `Institucional/2017/Balanço-Patrimonial-2017.pdf` (35 MB, 50 pp.)
- `demonstracoes-financeiras-2017-2018.pdf` — ej. 2018, `Institucional/2018/DF´S 2018 ASSINADAS EM 20032019.pdf`
- `demonstracoes-financeiras-2018-2019.pdf` — ej. 2019, `Institucional/2019/BP -Santos FC 2019.pdf`
- `demonstracoes-financeiras-2019-2020.pdf` — ej. 2020, `Institucional/2020/BP 2020 - Santos FC.pdf`
- `demonstracoes-financeiras-2021-2022.pdf` — ej. 2022, `Institucional/2022/DF´s AUDITADA SANTOS FUTEBOL CLUBE ANO 2022.pdf`
- `demonstracoes-financeiras-2022-2023.pdf` — ej. 2023, `Institucional/2023/DF´S 2023 SFC VERSÃO FINAL ASSINADA.pdf`
Serie en disco: 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025. (Nota de nombres: `2020-2021` = ej. 2021, `2023-2024` = ej. 2024, `2024-2025` = ej. 2025,
convención vieja; los nuevos siguen "<año anterior>-<ejercicio>".) Sin probar: 2010-2016 (disponibles en el índice, no bajados: ya sobra).
