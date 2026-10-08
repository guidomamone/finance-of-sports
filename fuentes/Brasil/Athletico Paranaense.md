# Athletico Paranaense (Club Athletico Paranaense — no es SAF)

**Ángulos**: sitio oficial: HIT (athletico.com.br/gestao, solo vía Browser pane; curl da 403) · federación/regulador: no hizo falta (FPF bucket tiene solo 2025) · Wayback CDX: no necesario · búsqueda web: no necesaria · barrido: 1 (Sonnet) — 2026-10-03

- Club nuevo esta sesión. **No convertido a SAF** (sigue como associação tradicional) pero publica
  demonstrações financeiras auditadas todos los años desde al menos 2016, con muy buena cobertura
  histórica. 2 ejercicios descargados a `Clubes/Brasil/Athletico Paranaense/`:
  `demonstracoes-financeiras-2025.pdf` (bajado del sitio oficial athletico.com.br) y
  `demonstracoes-financeiras-2024.pdf` (bajado de un mirror en static.poder360.com.br, portal de
  noticias, porque el intento directo a static.athletico.com.br con la URL con acentos dio 404 —
  revisar encoding si se retoma en una sesión futura).
- Pendiente: 2020-2023 — confirmado que existen (URLs de búsqueda: `Demonstrações-Contábeis-2022.pdf`
  y `Demonstracoes2023.pdf` en static.athletico.com.br), pero el 404 con la URL tal cual la devolvió
  la búsqueda sugiere un problema de encoding de acentos en la ruta que no se resolvió en esta sesión.
  También existe un ejercicio 2016 (URL encontrada pero devolvió error XML de S3, no el PDF).
- Contacto: athletico.com.br/gestao/ (listado oficial de todos los ejercicios);
  static.athletico.com.br/wp-content/uploads/ (bucket con los archivos, cuidado con encoding de acentos
  en la URL).
- Último chequeo: 2026-09-12.

## Cargado (sesión 2026-09-24)

- **2 ejercicios cargados en `data/athleticoparanaense-br-data.js`** (`clubId:
  'athleticoparanaense-br'`): 2024 (Superávit R$23,439 M) y 2025 (primer DÉFICIT real desde que hay
  balances cargados, -R$58,134 M). Columna Controladora (no Consolidado). Ver el comentario de
  cabecera del archivo de datos para la categorización completa y la verificación de tie-out.
- **Color de marca: #CE181E — teamcolorcodes.com ("Athletico Red"), confirmado contra pt.wikipedia.org
  (infobox: "suas cores tradicionais são o vermelho e o preto", rubro-negro), verificado 2026-09-24.**
  Bicolor rojo-negro en partes iguales (franjas verticales alternadas) — se desempató a favor del
  rojo porque "rubro" (rojo) es el primer componente del propio apodo "Rubro-Negro" del club, y
  porque teamcolorcodes.com lista el rojo primero en su tabla de códigos (aunque su texto introductorio
  dice "Black and Red" en ese orden — señal mixta, se priorizó el nombre del club sobre el orden de
  un agregador de terceros).

## Barrido 2026-10-03 (sourcing Brasil grupo B) — de 2 a 7 ejercicios en disco

- **Hallazgo clave**: `athletico.com.br/gestao/` (y `www.`) devuelve **403 por curl** (awselb), pero carga en el Browser pane;
  extrayendo los `href` por JS (`#grupo5` "Balanços do Clube") salen todos los PDF, alojados en el bucket
  `atleticopr-www-static.s3.sa-east-1.amazonaws.com/wp-content/uploads/...`, que **sí baja con curl directo** (con las
  tildes en NFD codificadas, `%CC%A7` etc., tal cual el href; lo que fallaba antes era el encoding, no el bucket).
- Nuevos en `Clubes/Brasil/Athletico Paranaense/` (todos Club Athletico Paranaense, columna del club; verificado en carátula/texto):
  `demonstracoes-financeiras-2023.pdf` (44 pp, "Demonstrações Financeiras 2023", mayormente imágenes), `-2022.pdf` (39 pp, 2022 y 2021),
  `-2021.pdf` (37 pp), `-2020.pdf` (35 pp, "NEs-Club-Athletico-Paranaense-2020"), `-2019.pdf` (42 pp, "CAP-DF-2019").
  md5 distintos entre todos (y contra 2024/2025 existentes).
- **Disponibles en la misma página y NO bajados** (la meta de 5 ya estaba cumplida): 2006-2018 (Club; 2018 tiene además "Relatório Financeiro 2018"),
  y la serie paralela de **CAP S.A. (Arena dos Paranaenses) 2016-2025** — es otra entidad (la sociedad de la Arena), no la del club.
  También pareceres del Conselho Fiscal 2022-2025 y actas de aprobación de cuentas.
- Link 2025 en el sitio: `.../2026/05/2559-26-Relatorio-Club-Athletico-Paranaense-2025.pdf` y 2024 `.../2026/04/Relatorio-de-Atividades-e-Demonstracoes-Contabeis-2024.pdf` (re-subidos; los ya en disco vienen de otras fuentes, no se comparó md5).
- Ejercicios en disco ahora: 2019, 2020, 2021, 2022, 2023, 2024, 2025.

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 2 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas ninguna; `wf-src-*`: 2 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
