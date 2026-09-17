# Slaven Belupo (NK Slaven Belupo, Koprivnica)

- **Entidad legal**: no se confirmó a fondo esta sesión (quedó pendiente, no bloqueó el
  sourcing) — el nombre completo visto en los documentos es "Nogometni klub Slaven Koprivnica" /
  "NK Slaven Belupo". Vale confirmar si ya se convirtió a sportsko dioničko društvo o sigue como
  asociación (Belupo, el laboratorio farmacéutico, es sponsor/nombrante, no necesariamente dueño
  societario — no asumir).
- **2 ejercicios descargados** a `Clubes/Croacia/Slaven Belupo/`: 2024 y 2025. **5 ejercicios más
  (2019-2023) están identificados pero NO se pudieron descargar** — ver "Pendiente".
- **Cómo se encontró**: el sitio actual (`nk-slaven-belupo.hr/o-klubu/dokumenti`) tiene una
  página "Dokumenti" que lista los 7 ejercicios 2019-2025 con sus links.
- **Pendiente — ejercicios 2019 a 2023**: los 5 links de esos años apuntan a un subdominio
  `arhiva.nk-slaven-belupo.hr` (el "archivo" del sitio viejo, de antes de un rediseño) que
  devuelve **401 Unauthorized real** — confirmado tanto con `curl` como navegando con el browser,
  no es un bloqueo de bot ni un problema de user-agent. Se intentó recuperar esos 5 PDFs vía la
  Wayback Machine (mismo patrón que funcionó para Dinamo Zagreb) pero **Archive.org tuvo una
  interrupción de servicio real y prolongada** durante esta sesión ("Internet Archive:
  Temporarily Offline" / 504 Gateway Timeout en la API CDX) — no se pudo completar. Reintentar
  en sesión futura, primero contra Wayback (debería funcionar apenas el servicio esté de vuelta),
  y si no, evaluar si vale la pena pedirle el acceso al `arhiva.` subdominio directamente al club.
- Último chequeo: 2026-09-17.
