# Alanyaspor

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: club-asociación (dernek), NO cotiza en bolsa — a diferencia de los 4 grandes,
  no está sujeto a disclosure de KAP.
- **Canal**: sitio propio, `alanyaspor.org.tr/mali-tablolar` — página dedicada de "Mali Tablolar"
  (obligación de transparencia ligada a la licencia de la TFF/UEFA, ver nota general de Turquía),
  con PDFs alojados en `cdn.alanyaspor.org.tr/upload/financialStatements/<año>-mali-tablolar<slug>
  <hash-corto>.pdf`. El MEJOR canal encontrado hasta ahora entre los clubes chicos: URLs estables,
  descargables directo por `curl`, sin WAF.

## Qué se bajó (sesión 2026-09-18, arranque limpio — no había nada previo de este club)

**17 documentos en 4 grupos de ejercicio**, en `Clubes/Turquía/Alanyaspor/`:

- **2025** (`alanyaspor-mali-tablolar-2025.pdf`): 1 documento combinado con dictamen de auditoría +
  estados financieros + notas, al 31-05-2025.
- **2022-2023** (`alanyaspor-mali-tablolar-2022-2023.pdf`): 1 documento combinado, cubre ambos
  ejercicios juntos.
- **2021** (7 documentos separados): TFF Bilanço, TFF Gelir Tablosu, TFF Nakit Akım Tablosu, UEFA
  Bilanço, UEFA Gelir Tablosu, UEFA Nakit Akım Tablosu, y el dictamen del auditor para la
  licencia ("Lisans İçin Başvuran Kulübün Denetçi Raporu").
- **2020** (8 documentos separados): Bilanço, Gelir Tablosu, Nakit Akım Tablosu y Özkaynak Değişim
  Tablosu del club, más las 3 versiones UEFA (Bilanço/Gelir/Nakit), más UEFA Asgari Bilgiler
  Finansal Durum, más el dictamen del auditor.

**Huecos**: la página no tiene nada publicado para 2015/16-2019, ni para 2024 (aislado — el ejercicio
2024 puede estar cubierto dentro del combinado "2022-2023" con otro nombre, o directamente faltar;
no se confirmó cuál).

## Dudas / pendientes

- Confirmar si el hueco 2024 es real o si el ejercicio quedó fusionado en otro documento con
  nombre distinto al esperado (no crítico para sourcing, pero relevante para la sesión de mapeo).
- Todos los PDFs de 2020/2021 están separados por estado financiero individual en vez de venir
  combinados como los de 2022-2023 y 2025 — al mapear, atar cada grupo de 6-8 archivos a su mismo
  ejercicio.
- Último chequeo: 2026-09-18.
