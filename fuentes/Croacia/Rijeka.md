# Rijeka

- **Entidad legal**: HRVATSKI NOGOMETNI KLUB RIJEKA sportsko dioničko društvo (s.d.d.).
- **El mejor hallazgo del barrido croata — 9 ejercicios consecutivos sin ningún hueco**,
  descargados a `Clubes/Croacia/Rijeka/`: 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025.
- **Cómo se encontró**: el sitio propio tiene una página dedicada `nk-rijeka.hr/izvjesce/` que
  lista los 9 ejercicios con un link directo a cada PDF (`wp-content/uploads/<año>/<mes>/...pdf`)
  — no hizo falta buscar año por año, la página los tiene todos juntos. El ejercicio 2024 en
  particular es en inglés y trae firma digital (`NK-Rijeka_FS_HRV_2024-FINAL_signed.pdf`).
- Todos los archivos descargaron limpios (PDF nativo, sin necesidad de OCR ni de Wayback Machine).
- **Pendiente**: nada de la serie individual — 2017-2025 completa, el mejor caso de todo el barrido
  de Croacia.
- **Además del informe INDIVIDUAL de cada año, existe un informe COMBINADO 2024** (exigido desde
  el Pravilnik o licenciranju i financijskoj održivosti de octubre de 2024 de la HNS), que consolida
  HNK Rijeka s.d.d. con Stadion Kantrida d.o.o. (la sociedad que administra el estadio y vende las
  entradas). Descargado a `Clubes/Croacia/Rijeka/financijsko-izvjesce-2024-kombinirani.pdf` (25
  páginas, con capa de texto nativa, sin necesidad de OCR) y transcripto íntegro a su `.md`. El total
  de ingresos combinado (8.370.280 EUR en 2024) es MAYOR que el del informe individual — no cargar
  ambos como si fueran el mismo ejercicio si en algún momento se onboardea este club al sitio; hay
  que decidir cuál de los dos representa mejor al club antes de esa carga (ver `club-data-mapping`).
- Último chequeo: 2026-09-22 (el informe combinado apareció como archivo suelto en `~/Downloads`,
  dejado ahí por un subagente de sourcing anterior; se movió a esta carpeta y se transcribió recién
  ahora — ver CHANGELOG).
- **CARGADO al sitio (2026-09-25)**: ejercicio 2024, `data/rijeka-hr-data.js` (clubId `rijeka-hr`).
  Se usó el informe COMBINADO (HNK Rijeka s.d.d. + Stadion Kantrida d.o.o., la sociedad que
  administra el estadio y factura las entradas) en vez del individual, exigido desde octubre de
  2024 por el Pravilnik o licenciranju de la HNS — el individual habría subestimado el revenue
  real del club (las entradas se facturan a través de la subsidiaria). Tie-out exacto.
