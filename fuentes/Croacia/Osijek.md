# Osijek

- **Entidad legal**: NOGOMETNI KLUB OSIJEK sportsko dioničko društvo (s.d.d.) za obavljanje
  sportskih djelatnosti.
- **7 de 8 ejercicios posibles descargados** a `Clubes/Croacia/Osijek/`: 2018, 2019, 2020, 2022,
  2023, 2024, 2025 — falta 2021 (ver "Pendiente").
- **Cómo se encontró**: cada ejercicio tiene su propia nota de prensa en `nk-osijek.hr/vijesti/`
  ("FINANCIJSKI IZVJEŠTAJ NK OSIJEK s.d.d. ZA <año>. GODINU") con el PDF adjunto en
  `nk-osijek.hr/files/documents/<id>/<archivo>.pdf`. El de 2025 se encontró vía una nota de
  prensa de terceros (sib.net.hr) que linkeaba directo al PDF del club — el artículo propio del
  club para 2025 no apareció en la búsqueda.
  - **Gotcha de encoding**: varios nombres de archivo tienen tildes/diacríticos croatas (š, ć)
    codificados con caracteres Unicode COMBINANTES (ej. `s` + `̌` en vez de `š` precompuesto)
    — un `curl` con el nombre "obvio" (š precompuesto) da 404 aunque el archivo exista; hace
    falta copiar el `href` exacto tal como lo devuelve el DOM del navegador (`querySelectorAll('a')`)
    y pasarlo a `curl -g` sin re-normalizar los acentos.
- **Pendiente — ejercicio 2021**: no se encontró ninguna nota de prensa en `nk-osijek.hr/vijesti/`
  para ese año (búsquedas específicas no devolvieron la URL del artículo), y no se intentó
  adivinar el ID numérico del documento en `files/documents/<id>/` al azar (los IDs de 2020 y
  2022 son 137 y 160 respectivamente, así que 2021 debería estar en un ID intermedio, pero no se
  probó exhaustivamente por no ser un uso eficiente del tiempo). Sugerencia para la próxima
  sesión: probar IDs 138-159 en `nk-osijek.hr/files/documents/<id>/gfi_nakon_revizije_2021.pdf`
  (mismo patrón de nombre que 2020), o revisar el archivo de prensa local de Osijek
  (glas-slavonije.hr, sib.net.hr) por una nota de esa época con el link directo.
- Último chequeo: 2026-09-17.
