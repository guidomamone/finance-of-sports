# OGC Nice

- **Deporte**: Fútbol
- **Liga / competencia**: Ligue 1 (Francia, 1ª división)
- **Entidad legal**: SASP OLYMPIQUE GYMNASE CLUB NICE COTE AZ (sigla OGC NICE), SIREN 404 115 198,
  19 Boulevard Jean Luciano, 06200 Niza. Inmatriculada al RNE 29/02/1996. Forma jurídica exacta:
  "Société anonyme à directoire" (SASP en la nomenclatura deportiva). Auditor (commissaire aux comptes
  titulaire): IN EXTENSO AUDIT. Perímetro declarado a la DNCG 2022/23: "SASP OGC NICE + SARL
  PROMOFOOT + ASSOCIATION".
- **Canal**: informe agregado de la DNCG — ver `_notas-generales.md` secciones 0 y 1.

## Qué se bajó (sesión 2026-09-17)

Nada específico por separado. OGC Nice aparece con su bilan + cuenta de resultados propios dentro de
cada PDF compartido de `Clubes/Francia/_DNCG-Agregado-Liga/` — confirmado por grep de texto en el
ejercicio 2022/23.

## Verificación hecha en esta sesión

Este fue el club usado para confirmar en detalle CÓMO funciona (y dónde se traba) `data.inpi.fr`:
navegando directo a `https://data.inpi.fr/entreprises/404115198` (sin necesidad de login) se ve la
ficha de identidad completa gratis, y la pestaña "Documents associés" muestra que la sociedad tiene
**28 "Comptes annuels" depositados** — pero para desplegar la lista hay que resolver un captcha
(FriendlyCaptcha), y para descargar cualquiera de los 28 hace falta además una cuenta. Ninguna de las
dos cosas es algo que este agente pueda hacer (ver `_notas-generales.md` sección 0). Es la confirmación
más concreta de esta sesión de que el histórico SÍ existe y es rico, solo que inaccesible para un
agente.

## Dudas / pendientes

Si Guido crea su cuenta en `data.inpi.fr`, OGC Nice es un buen primer club para probar el flujo
completo (28 documentos confirmados, aunque no todos van a ser comptes annuels — el conteo probablemente
incluye actas/estatutos también, habría que filtrar dentro del sitio).

- Último chequeo: 2026-09-17.
