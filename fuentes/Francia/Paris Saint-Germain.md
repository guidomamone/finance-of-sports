# Paris Saint-Germain

- **Deporte**: Fútbol
- **Liga / competencia**: Ligue 1 (Francia, 1ª división)
- **Entidad legal**: PARIS SAINT GERMAIN FOOTBALL, SAS (SIREN 382 357 721), 24 Rue du Cdt Guilbaud,
  75016 París. Creada 12/06/1991. Cierre de ejercicio 30/06. Perímetro declarado a la DNCG 2022/23:
  "SASU + ASSOCIATION + PSG MERCHANDISING + SESE".
- **Canal principal**: informe agregado de la DNCG (ver `fuentes/Francia/_notas-generales.md` sección
  1) — PSG aparece con bilan + cuenta de resultados propios en cada `Comptes individuels des clubs`
  anual, `Clubes/Francia/_DNCG-Agregado-Liga/`.
- **Canal complementario, sin PDF completo**: `annuaire-entreprises.data.gouv.fr` (Etalab, gratis, sin
  login) expone una pestaña "Indicateurs financiers" con cifras clave por ejercicio, confirmada
  funcionando para este SIREN — no reemplaza el bilan completo, pero sirve para verificar un total
  rápido:
  `https://annuaire-entreprises.data.gouv.fr/entreprise/382357721` → pestaña "Données financières".
  - **9 ejercicios individuales** (COMPLET): 2015/16 a 2024/25, con Chiffre d'affaires, Marge brute,
    EBE y Résultat net por año (ej. 2024/25: CA 740,8 M€, Résultat net -60,7 M€).
  - **6 ejercicios consolidados** (CONSOLIDÉ, incluye filiales): 2018/19 a 2024/25 (ej. 2024/25: CA
    consolidado 785,5 M€, Résultat net -39,2 M€).
  - El PDF del bilan en sí (`Bilans au format PDF`) está bloqueado: solo accesible para agentes
    públicos con ProConnect, o para el público general vía `data.inpi.fr` — que a su vez exige crear
    una cuenta (ver `_notas-generales.md` sección 0), algo que este agente no puede hacer.
- **`data.inpi.fr`**: ficha de identidad confirmada libre
  (`https://data.inpi.fr/entreprises/382357721`), pero la sección "Documents associés" (comptes
  annuels) exige resolver un captcha y después tener cuenta — no completado esta sesión.

## Qué se bajó (sesión 2026-09-17)

Nada específico de PSG por separado — su bilan+cuenta de resultados de cada ejercicio 2002/03-2022/23
(salvo 2015/16) y 2024/25 está DENTRO de los PDF compartidos de `Clubes/Francia/_DNCG-Agregado-Liga/`
(uno por temporada, con todos los clubes de Ligue 1 y Ligue 2 juntos). Ver esa carpeta y
`_notas-generales.md` sección 1.

## Verificación hecha en esta sesión

SIREN 382 357 721 confirmado en `annuaire-entreprises.data.gouv.fr` y `data.inpi.fr` (ficha de
identidad completa, capital social 519.803.879,60 €, forma jurídica SAS). Presencia en el PDF DNCG
2022/23 confirmada por grep de texto ("PARIS SAINT-GERMAIN" aparece con su bilan propio).

## Dudas / pendientes

Ninguna específica de PSG. La pregunta genérica sobre `data.inpi.fr` (cuenta bloqueada para el agente)
está en `_notas-generales.md`, no es específica de este club.

- Último chequeo: 2026-09-17.
