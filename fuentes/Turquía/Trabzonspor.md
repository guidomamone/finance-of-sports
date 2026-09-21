# Trabzonspor

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: Trabzonspor Sportif Yatırım ve Futbol İşletmeciliği Ticaret A.Ş., cotizante en
  Borsa İstanbul (ticker TSPOR). **IPO confirmado en 2005** (ver "Dudas / pendientes" — resuelto en
  la sesión 2026-09-18 leyendo el propio İzahname 2025 ya descargado: "payları 2005 yılında halka
  arz edilmiş olup", pág. con la sección B.5 de información del grupo). Mismo esquema que los otros
  3 grandes: club-asociación dueño mayoritario de la sociedad cotizante. Ejercicio fiscal 01/06-31/05.
- **Canal principal**: **KAP** (`kap.org.tr`), código TSPOR. Con el Browser pane funcionando
  (sesión 2026-09-18, ver nota general), "Detailed Search" filtrando por compañía + rango de fechas
  de a lo sumo 1 año (límite duro del propio formulario) + Notification Type dio acceso completo a
  todo el historial de "Financial Report" — no hizo falta nada del canal secundario de abajo.
- **Canal secundario, usado en la sesión anterior cuando el browser estaba caído**:
  `cdn.trabzonspor.org.tr/trabzonspor_<hash-hex-32>.pdf` — el propio sitio del club aloja ahí sus
  "Faaliyet Raporu" (informes de actividad trimestrales del directorio). El hash es opaco, solo
  sirve para rescatar documentos ya indexados por Google. No hizo falta esta sesión.

## Qué se bajó

**Serie COMPLETA de 10 ejercicios consecutivos, 2015/16-2024/25 (sin ningún hueco)**, en
`Clubes/Turquía/Trabzonspor/`, todos vía KAP:

- `trabzonspor-sportif-finansal-tablolar-31-05-2016.pdf` (sesión anterior, formato viejo de 5
  bildirim por el mismo archivo — ver Beşiktaş.md para el mismo patrón)
- `...-31-05-2017.pdf` — filed 31.07.2017, `TRABZONSPOR - 31.05.2017 - SPK - TR (FİNAL).pdf`
- `...-31-05-2018.pdf` — filed 30.07.2018, `TRABZONSPOR 31.05.2018 SPK Final.pdf`
- `...-31-05-2019.pdf` — filed 31.07.2019, `TRABZONSPOR 31.05.2019 final.pdf`
- `...-31-05-2020.pdf` — filed 30.07.2020, `Trabzonspor - 31.05.2020 Report_Final.pdf`
- `...-31-05-2021.pdf` — filed 09.08.2021, `Trabzonspor -31.05.2021_SPK_final.pdf`
- `...-31-05-2022.pdf` — filed 09.08.2022, `Trabzonspor Sportif Yatırım ve Futbol İşletmeciliği
  A.Ş. - 31.05.2022.pdf`
- `...-31-05-2023.pdf` — filed 09.08.2023, `Trabzonspor Sportif Yatırım ve Futbol İşletmeciliği
  A.Ş. - SPK Rapor - 31.05.2023.pdf`
- `...-31-05-2024.pdf` — filed 30.07.2024, `31.05.2024 Finansal Rapor Trabzonspor-SPK.pdf`
- `...-31-05-2025.pdf` — filed 11.08.2025, `Trabzonspor_BDR_31.05.2025.pdf`

Todos bajados en la sesión 2026-09-18 (browser tool ya funcionando) navegando KAP "Detailed
Search" año por año (el formulario limita el rango a 1 año exacto, así que hizo falta una
búsqueda por ejercicio), filtrando por bildirim tipo "Financial Report" con Period=Annual. Cada
descarga vía `fetch()` dentro del Browser pane + decodificación manual del wrapper "Java
serialization data" (mismo procedimiento que Fenerbahçe/Beşiktaş, ver notas de esos archivos).

Documentos previos que quedan como referencia (no sustituyen al bilanço, son informes de
actividad interinos): `trabzonspor-sportif-faaliyet-raporu-2014-06-01_2015-02-28.pdf`,
`...-2021-06-01_2022-02-28.pdf`, `...-2022-06-01_2022-08-31.pdf`, y el
`trabzonspor-sportif-izahname-2025.pdf` (prospecto de aumento de capital, 183 páginas — fuente que
confirmó el año de IPO, ver abajo).

## Dudas / pendientes

- **Ninguna pendiente de sourcing** — serie completa 2015/16-2024/25.
- **Duda de `dudas-por-club.md` RESUELTA**: el İzahname 2025 (ya en la carpeta del club) confirma
  textualmente que Trabzonspor Sportif salió a bolsa en **2005** ("Trabzonspor Sportif Yatırım ve
  Futbol İşletmeciliği A.Ş., payları 2005 yılında halka arz edilmiş olup..."). La entidad operativa
  (Futbol A.Ş.) se había constituido el 21 de abril de 2004 en Trabzon. Avisar a Guido para que
  actualice `dudas-por-club.md` (esta sesión no lo edita, por instrucción explícita).
- Último chequeo: 2026-09-18.
