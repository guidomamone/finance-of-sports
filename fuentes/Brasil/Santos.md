# Santos (Santos Futebol Clube — sociedade civil, no es SAF)

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
