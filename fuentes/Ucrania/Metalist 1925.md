# Metalist 1925 (Kharkiv)

- **Deporte**: Fútbol
- **Liga / competencia**: Прем'єр-ліга України (Ucrania, 1ª división)
- **Entidad legal activa**: ТОВ "ФК "Металіст 1925" Харків" (LLC), EDRPOU 40751891. **El club se
  rebrandeó a "ФК Харків" (FC Kharkiv) durante 2026** — el dominio viejo `metalist1925.com` ahora
  es solo una página de redirección ("Оберіть потрібний ресурс") que apunta al sitio nuevo,
  `fckharkiv.com`. Si se busca el club por su nombre viejo, hay que seguir la redirección, no
  descartarlo como caído.
- **Canal**: sitio oficial nuevo, `fckharkiv.com/pages/financial` — solo muestra el ejercicio MÁS
  RECIENTE (2025), sin selector de años anteriores visible en la página actual. Un resultado de
  búsqueda cacheado por Google mencionaba estados financieros de 2021 publicados en el dominio
  viejo (`metalist1925.com/club/all/financiality/`), pero esa página ya no existe (redirige al
  nuevo sitio) — no se pudo confirmar ni recuperar ese PDF de 2021 en esta sesión.

## Qué se bajó (sesión 2026-09-18)

**1 ejercicio (2025), paquete completo.** `Clubes/Ucrania/Metalist 1925/`:

- `metalist1925-balance-2025.pdf`, `metalist1925-resultados-2025.pdf`,
  `metalist1925-flujo-caja-2025.pdf`, `metalist1925-auditor-2025.pdf`,
  `metalist1925-pagos-agentes-2025.pdf`.

5 archivos, todos con HTTP 200, tamaños entre 282 KB y 1,8 MB (auditor 3 páginas, confirmado con
`file`).

## Dudas / pendientes

- **El ejercicio 2021 (y posiblemente 2022-2024) puede existir pero no se encontró tras el
  rebranding a "ФК Харків"** — vale la pena reintentar en una sesión futura con Wayback Machine
  sobre `metalist1925.com/club/all/financiality/` (la URL vieja, antes de que empezara a
  redireccionar) para ver si hay copias archivadas de años previos.

- Último chequeo: 2026-09-18.

## Chequeo 2026-10-03 (sesión Europa del Este)

**Ángulos**: sitio oficial: agotado (`metalist1925.com/club/all/financiality/`, solo 2025 en vivo) · Wayback CDX (`metalist1925.com`): agotado (ejercicios 2022 y 2023 recuperados; los archivos viejos son `club/all/financiality/file/<n>.pdf`) · barrido: 2 (Sonnet).

- **Entidad confirmada** (balance 2022, 2023): ТОВ "ФУТБОЛЬНИЙ КЛУБ "МЕТАЛІСТ 1925" ХАРКІВ" (hoy rebrandeado "ФК Харків").
- **Nuevo en disco** (`Clubes/Ucrania/Metalist 1925/`): **2022** completo (`metalist1925-balance-2022.pdf`, `-flujo-caja-2022`, `-resultados-2022`, `-auditor-2022`, esta última de Аудит-Класик, ЄДРПОУ 24143394, con carta de abril 2023) y **2023** parcial (`-balance-2023`, `-flujo-caja-2023`, `-auditor-2023`; falta el reporte de resultados 2023, no apareció). Con el 2025 existente son 3 ejercicios.
- **Gotcha**: de los 10 archivos `file/1..10.pdf` del sitio viejo (capturas de 2023), 4 venían truncados a 1 MiB (borrados) y 2 eran cartas de presentación sin datos (borradas). El año de cada uno se identificó por OCR ("за Рік 2022 р.").
- **Pendiente**: 2021 y 2024; probable que el club rebrandeado `fckharkiv.com` los tenga: ver su sección financiera.
