# ESTADO — clubes (finance-of-sports)

Este archivo es SOLO el bloque `CLUB-INDEX`, generado por `node tools/generate-club-index.js`.
No editar a mano — se sobreescribe entero en cada corrida del script.

Vivía adentro de `Admin/ESTADO.md` hasta la Versión 239 (to-do 63, auditoría de escala del
2026-09-26): a 161 clubes pesaba 12,35 KB de los 55,98 KB totales de ese archivo, que se acercaba
al umbral de 60 KB que usa `tools/audit.js` (`doc-peso-desfasado`) — con esos números el umbral se
cruzaba en ~218 clubes, 40-50 más al ritmo de carga de esa sesión. Se partió con el mismo mecanismo
que liberó a `index.html` de su comentario interno en la Versión 138: el bloque generado se muda a
un archivo propio y queda un puntero de una línea donde vivía. Ver `Admin/CHANGELOG.md` (Versión
239) y `Admin/ESTADO.md`, que sigue siendo el snapshot general del proyecto — esto es solo el
detalle club por club.

===== CLUB-INDEX:START (generado por tools/generate-club-index.js, no editar a mano) =====
QUÉ ES REAL POR CLUB
GENERADO AUTOMÁTICAMENTE — no editar a mano. Se regenera con:
    node tools/generate-club-index.js

Esta lista contesta QUÉ hay cargado de cada club. El POR QUÉ (qué supuesto se tomó,
qué salvedad tiene una cifra, qué quedó sin cargar y por qué) NO está acá y no puede
estarlo: vive en la evidencia de cada club, `Admin/carga-clubes/<club>.md`, que escriben
los mismos scripts que cargan el club (y quien carga a mano). Si querés entender un club,
abrí SU evidencia.

Todo ejercicio listado acá es REAL (sale de un documento oficial del club) y cierra
contra el total impreso de su propio documento — eso lo garantiza `auditAll()`, no
esta lista. Un club sin datos reales no aparece.

TOTAL: 259 clubes, 932 ejercicios, 18 países.

ARGENTINA (19)
  Almagro                        6 ejercicios (2017/2018 a 2022/2023), balance, ARS
  Argentinos Juniors             5 ejercicios (2014/2015 a 2018/2019), balance, ARS
  Banfield                       1 ejercicio (2019/2020), balance, ARS
  Boca Juniors                   4 ejercicios (2021/2022, 2022/2023, 2024/2025, 2026/2027), balance + presupuesto, ARS
  Estudiantes de La Plata        4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Ferro Carril Oeste             2 ejercicios (2021/2022 a 2022/2023), balance, ARS
  Gimnasia y Esgrima (La Plata)  4 ejercicios (2022/2023 a 2025/2026), balance + presupuesto y balance + presupuesto, ARS
  Godoy Cruz                     1 ejercicio (2019/2020), balance, ARS
  Independiente                  2 ejercicios (2023/2024, 2025/2026), balance, ARS
  Instituto ACC                  1 ejercicio (2023/2024), balance, ARS
  Los Andes                      2 ejercicios (2019/2020 a 2020/2021), balance, ARS
  Newell's Old Boys              1 ejercicio (2018/2019), balance, ARS
  Racing Club                    17 ejercicios (2008/2009, 2009/2010, 2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2023/2024, 2024/2025, 2025/2026, 2026/2027), balance + presupuesto y balance + presupuesto, USD/ARS
  River Plate                    2 ejercicios (2020/2021, 2023/2024), balance + balance de réplica no oficial, ARS
  Rosario Central                2 ejercicios (2022/2023, 2024/2025), balance, ARS
  San Lorenzo                    8 ejercicios (2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2023/2024), balance + presupuesto, ARS
  Talleres                       2 ejercicios (2024 a 2025), balance, ARS
  Unión                          4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Vélez Sarsfield                11 ejercicios (2014/2015 a 2024/2025), balance, ARS

BE (14)
  Anderlecht            1 ejercicio (2024/2025), balance, EUR
  Antwerp               1 ejercicio (2024/2025), balance, EUR
  Cercle Brugge         1 ejercicio (2024/2025), balance, EUR
  Charleroi             1 ejercicio (2024/2025), balance, EUR
  Club Brugge           1 ejercicio (2024/2025), balance, EUR
  Dender EH             1 ejercicio (2024/2025), balance, EUR
  Genk                  1 ejercicio (2024/2025), balance, EUR
  Gent                  1 ejercicio (2024/2025), balance, EUR
  Mechelen              1 ejercicio (2024/2025), balance, EUR
  Sint-Truiden          1 ejercicio (2024/2025), balance, EUR
  Standard Liège        1 ejercicio (2024/2025), balance, EUR
  Union Saint-Gilloise  1 ejercicio (2024/2025), balance, EUR
  Westerlo              1 ejercicio (2024/2025), balance, EUR
  Zulte Waregem         1 ejercicio (2024/2025), balance, EUR

BRASIL (42)
  Amazonas              1 ejercicio (2024), balance, BRL
  América Mineiro       3 ejercicios (2023 a 2025), balance, BRL
  Athletico Paranaense  2 ejercicios (2024 a 2025), balance, BRL
  Atlético Goianiense   1 ejercicio (2025), balance, BRL
  Atlético Mineiro      3 ejercicios (2023 a 2025), balance, BRL
  Avai                  5 ejercicios (2021 a 2025), balance, BRL
  Bahia                 2 ejercicios (2024 a 2025), balance, BRL
  Botafogo              3 ejercicios (2023 a 2025), balance, BRL
  Botafogo-SP           1 ejercicio (2024), balance, BRL
  Ceará                 2 ejercicios (2024 a 2025), balance, BRL
  Chapecoense           2 ejercicios (2017, 2021), balance, BRL
  Corinthians           2 ejercicios (2024 a 2025), balance, BRL
  Coritiba              2 ejercicios (2023 a 2024), balance, BRL
  CRB                   6 ejercicios (2020 a 2025), balance, BRL
  Criciuma              14 ejercicios (2012 a 2025), balance, BRL
  Cruzeiro              4 ejercicios (2022 a 2025), balance, BRL
  Cuiaba                4 ejercicios (2022 a 2025), balance, BRL
  Ferroviaria           13 ejercicios (2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2021, 2022, 2023, 2024, 2025), balance, BRL
  Flamengo              2 ejercicios (2024 a 2025), balance, BRL
  Fluminense            2 ejercicios (2024 a 2025), balance, BRL
  Fortaleza             1 ejercicio (2025), balance, BRL
  Goiás                 15 ejercicios (2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2021, 2022, 2023, 2024, 2025), balance, BRL
  Grêmio                1 ejercicio (2024), balance, BRL
  Guarani               2 ejercicios (2024 a 2025), balance, BRL
  Internacional         2 ejercicios (2024 a 2025), balance, BRL
  Ituano                1 ejercicio (2024), balance, BRL
  Juventude             1 ejercicio (2020), balance, BRL
  Mirassol              1 ejercicio (2024), balance, BRL, sin deuda/caja
  Novorizontino         14 ejercicios (2010, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025), balance, BRL
  Operário Ferroviário  2 ejercicios (2024 a 2025), balance, BRL
  Palmeiras             2 ejercicios (2024 a 2025), balance, BRL
  Paysandu              4 ejercicios (2021, 2023, 2024, 2025), balance, BRL, sin deuda/caja
  Ponte Preta           3 ejercicios (2022 a 2024), balance, BRL
  RB Bragantino         2 ejercicios (2019, 2024), balance, BRL
  Remo                  7 ejercicios (2019 a 2025), balance, BRL
  Santos                2 ejercicios (2024 a 2025), balance, BRL
  São Paulo             2 ejercicios (2023 a 2024), balance, BRL
  Sport Recife          1 ejercicio (2025), balance, BRL
  Vasco da Gama         1 ejercicio (2023), balance, BRL
  Vila Nova             9 ejercicios (2014, 2015, 2016, 2017, 2021, 2022, 2023, 2024, 2025), balance, BRL
  Vitória               1 ejercicio (2025), balance, BRL
  Volta Redonda         2 ejercicios (2024 a 2025), balance, BRL

CHILE (3)
  Colo-Colo             3 ejercicios (2022 a 2024), balance, CLP
  Universidad Católica  16 ejercicios (2010 a 2025), balance, CLP
  Universidad de Chile  3 ejercicios (2022 a 2024), balance, CLP

COLOMBIA (12)
  América de Cali         1 ejercicio (2025), balance, COP
  Atlético Nacional       1 ejercicio (2025), balance, COP
  Boyacá Chicó            1 ejercicio (2024), balance, COP, sin deuda/caja
  Deportivo Cali          1 ejercicio (2025), balance, COP
  Deportivo Pereira       1 ejercicio (2025), balance, COP
  Envigado FC             1 ejercicio (2025), balance, COP
  Fortaleza CEIF          9 ejercicios (2017 a 2025), balance, COP
  Independiente Santa Fe  1 ejercicio (2025), balance, COP
  Junior de Barranquilla  1 ejercicio (2025), balance, COP
  Millonarios             1 ejercicio (2025), balance, COP
  Once Caldas             4 ejercicios (2022 a 2025), balance, COP
  Unión Magdalena         1 ejercicio (2018), balance, COP

ALEMANIA (11)
  1. FC Köln                2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Bayern Munich             4 ejercicios (2020/2021, 2022/2023, 2023/2024, 2024/2025), balance, EUR, sin deuda/caja
  Borussia Dortmund         2 ejercicios (2023/2024 a 2024/2025), balance, EUR, sin deuda/caja
  Borussia Mönchengladbach  2 ejercicios (2023 a 2024), balance, EUR
  Eintracht Frankfurt       2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  FC Augsburg               2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Hamburger SV              2 ejercicios (2023/2024 a 2024/2025), balance, EUR, sin deuda/caja
  RB Leipzig                4 ejercicios (2021/2022 a 2024/2025), balance, EUR, sin deuda/caja
  TSG Hoffenheim            2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  VfB Stuttgart             2 ejercicios (2023 a 2024), balance, EUR
  Werder Bremen             3 ejercicios (2022/2023 a 2024/2025), balance, EUR, sin deuda/caja

DK (11)
  AGF              1 ejercicio (2020/2021), balance, DKK
  Brøndby          1 ejercicio (2020), balance, DKK, sin deuda/caja
  FC Fredericia    1 ejercicio (2019), balance, DKK
  FC København     1 ejercicio (2024), balance, DKK, sin deuda/caja
  FC Midtjylland   1 ejercicio (2018/2019), balance, DKK, sin deuda/caja
  FC Nordsjælland  1 ejercicio (2024), balance, DKK
  Randers FC       1 ejercicio (2022/2023), balance, DKK
  Silkeborg IF     1 ejercicio (2024), balance, DKK
  SønderjyskE      1 ejercicio (2021/2022), balance, DKK
  Vejle            1 ejercicio (2024), balance, DKK
  Viborg FF        1 ejercicio (2023/2024), balance, DKK

ESPAÑA (19)
  Athletic Club       1 ejercicio (2024/2025), balance, EUR
  Atlético de Madrid  1 ejercicio (2024/2025), balance, EUR
  CA Osasuna          2 ejercicios (2021/2022, 2023/2024), balance, EUR
  Celta de Vigo       1 ejercicio (2024/2025), balance, EUR
  Deportivo Alavés    1 ejercicio (2024/2025), balance, EUR
  Elche CF            2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  FC Barcelona        1 ejercicio (2024/2025), balance, EUR
  Getafe CF           2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Girona FC           2 ejercicios (2019/2020, 2024/2025), balance, EUR
  Levante UD          1 ejercicio (2024/2025), balance, EUR
  Rayo Vallecano      1 ejercicio (2024/2025), balance, EUR
  RCD Espanyol        2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  RCD Mallorca        1 ejercicio (2024/2025), balance, EUR
  Real Betis          1 ejercicio (2024/2025), balance, EUR
  Real Madrid         1 ejercicio (2024/2025), balance, EUR
  Real Oviedo         1 ejercicio (2024/2025), balance, EUR
  Sevilla FC          1 ejercicio (2024/2025), balance, EUR
  Valencia CF         1 ejercicio (2024/2025), balance, EUR
  Villarreal CF       1 ejercicio (2023/2024), balance, EUR

INGLATERRA (19)
  AFC Bournemouth          2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Arsenal                  2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Aston Villa              1 ejercicio (2024/2025), balance, GBP
  Brentford                2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Brighton                 2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Burnley                  2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Chelsea                  1 ejercicio (2024/2025), balance, GBP
  Crystal Palace           2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Everton                  2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Fulham                   2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Leeds United             2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Liverpool                2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Manchester City          2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Newcastle United         1 ejercicio (2024/2025), balance, GBP
  Nottingham Forest        2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Sunderland               2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Tottenham Hotspur        2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  West Ham United          1 ejercicio (2024/2025), balance, GBP
  Wolverhampton Wanderers  2 ejercicios (2023/2024 a 2024/2025), balance, GBP

GR (14)
  AEK Athens        10 ejercicios (2015/2016 a 2024/2025), balance, EUR
  AEL Larissa       10 ejercicios (2015/2016 a 2024/2025), balance, EUR
  Aris              6 ejercicios (2018/2019, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Asteras Tripolis  7 ejercicios (2018/2019 a 2024/2025), balance, EUR
  Atromitos         8 ejercicios (2015/2016, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Kifisia           4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Levadiakos        7 ejercicios (2018/2019 a 2024/2025), balance, EUR
  OFI Crete         8 ejercicios (2017/2018 a 2024/2025), balance, EUR, sin deuda/caja
  Olympiacos        10 ejercicios (2015/2016 a 2024/2025), balance, EUR
  Panathinaikos     1 ejercicio (2024/2025), balance, EUR
  Panetolikos       8 ejercicios (2016/2017, 2017/2018, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Panserraikos      2 ejercicios (2022/2023, 2024/2025), balance, EUR, sin deuda/caja
  PAOK              8 ejercicios (2016/2017, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Volos NFC         7 ejercicios (2018/2019 a 2024/2025), balance, EUR, sin deuda/caja

HR (8)
  Dinamo Zagreb  1 ejercicio (2024), balance, EUR
  Gorica         1 ejercicio (2025), balance, EUR
  Hajduk Split   1 ejercicio (2024), balance, EUR
  Istra 1961     1 ejercicio (2025), balance, EUR, sin deuda/caja
  Osijek         1 ejercicio (2025), balance, EUR
  Rijeka         1 ejercicio (2024), balance, EUR
  Slaven Belupo  1 ejercicio (2025), balance, EUR
  Varaždin       1 ejercicio (2025), balance, EUR

IT (22)
  AC Milan       14 ejercicios (2008, 2009, 2010, 2011, 2012, 2013, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  AS Roma        21 ejercicios (2004/2005 a 2024/2025), balance, EUR
  Atalanta       8 ejercicios (2018 a 2024/2025), balance, EUR
  Bologna        8 ejercicios (2017/2018 a 2024/2025), balance, EUR
  Chievo Verona  3 ejercicios (2013/2014 a 2015/2016), balance, EUR
  Como           2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Cremonese      4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Fiorentina     5 ejercicios (2019, 2020/2021, 2021/2022, 2023/2024, 2024/2025), balance, EUR
  Genoa          3 ejercicios (2022, 2023, 2024/2025), balance, EUR
  Hellas Verona  6 ejercicios (2019/2020 a 2024/2025), balance, EUR
  Inter          8 ejercicios (2017/2018 a 2024/2025), balance, EUR
  Juve Stabia    1 ejercicio (2023/2024), balance, EUR
  Juventus       23 ejercicios (2002/2003 a 2024/2025), balance, EUR
  Lazio          26 ejercicios (1998/1999, 1999/2000, 2000/2001, 2003/2004, 2004/2005, 2005/2006, 2006/2007, 2007/2008, 2008/2009, 2009/2010, 2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025, 2025/2026), balance, ITL/EUR
  Monza          3 ejercicios (2022 a 2024), balance, EUR
  Napoli         8 ejercicios (2017/2018 a 2024/2025), balance, EUR
  Parma          9 ejercicios (2015/2016, 2016/2017, 2017/2018, 2018/2019, 2021, 2022, 2023, 2024, 2025), balance, EUR
  Salernitana    2 ejercicios (2021/2022 a 2022/2023), balance, EUR
  Sampdoria      4 ejercicios (2018 a 2021), balance, EUR, sin deuda/caja
  Sassuolo       8 ejercicios (2018 a 2025), balance, EUR
  Torino         8 ejercicios (2018 a 2025), balance, EUR
  Udinese        2 ejercicios (2021/2022, 2024/2025), balance, EUR, sin deuda/caja

JAPÓN (10)
  Cerezo Osaka         1 ejercicio (2025), balance, JPY, sin deuda/caja
  FC Tokyo             1 ejercicio (2025), balance, JPY, sin deuda/caja
  Gamba Osaka          1 ejercicio (2025), balance, JPY, sin deuda/caja
  Kashima Antlers      1 ejercicio (2025), balance, JPY, sin deuda/caja
  Kawasaki Frontale    1 ejercicio (2025), balance, JPY, sin deuda/caja
  Nagoya Grampus       1 ejercicio (2025), balance, JPY, sin deuda/caja
  Sanfrecce Hiroshima  1 ejercicio (2025), balance, JPY, sin deuda/caja
  Urawa Red Diamonds   1 ejercicio (2025), balance, JPY, sin deuda/caja
  Vissel Kobe          1 ejercicio (2025), balance, JPY, sin deuda/caja
  Yokohama F. Marinos  1 ejercicio (2025), balance, JPY, sin deuda/caja

MÉXICO (1)
  Club América  1 ejercicio (2025), balance, MXN, sin deuda/caja

NL (4)
  Ajax       2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  AZ         2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Feyenoord  2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  PSV        2 ejercicios (2023/2024 a 2024/2025), balance, EUR

PERÚ (1)
  Alianza Lima  6 ejercicios (2019 a 2024), balance, PEN

PT (33)
  Académica           3 ejercicios (2021/2022 a 2023/2024), balance, EUR
  Academico Viseu     4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Alverca             4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Arouca              4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  AVS                 3 ejercicios (2020/2021, 2022/2023, 2023/2024), balance, EUR
  Belenenses          2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Benfica             19 ejercicios (2005/2006, 2006/2007, 2007/2008, 2008/2009, 2009/2010, 2011/2012, 2012/2013, 2013/2014, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025, 2025/2026), balance, EUR
  Boavista            1 ejercicio (2023/2024), balance, EUR
  Braga               7 ejercicios (2015/2016, 2016/2017, 2019/2020, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Casa Pia            4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Chaves              2 ejercicios (2021/2022 a 2022/2023), balance, EUR
  Estoril Praia       4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Estrela da Amadora  2 ejercicios (2021/2022 a 2022/2023), balance, EUR
  Famalicão           7 ejercicios (2018/2019 a 2024/2025), balance, EUR
  Felgueiras          3 ejercicios (2021/2022 a 2023/2024), balance, EUR
  Gil Vicente         5 ejercicios (2020/2021 a 2024/2025), balance, EUR
  Leixoes             3 ejercicios (2022/2023 a 2024/2025), balance, EUR
  Mafra               1 ejercicio (2023/2024), balance, EUR
  Maritimo            5 ejercicios (2020/2021 a 2024/2025), balance, EUR
  Moreirense          4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Nacional            4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Oliveirense         3 ejercicios (2022/2023 a 2024/2025), balance, EUR
  Paços de Ferreira   5 ejercicios (2019/2020, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Portimonense        4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Porto               9 ejercicios (2015/2016, 2016/2017, 2017/2018, 2018/2019, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Rio Ave             9 ejercicios (2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Santa Clara         6 ejercicios (2019/2020 a 2024/2025), balance, EUR
  Sporting CP         24 ejercicios (1999/2000, 2000/2001, 2001/2002, 2002/2003, 2003/2004, 2004/2005, 2005/2006, 2006/2007, 2007/2008, 2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, PTE/EUR
  Tondela             1 ejercicio (2020/2021), balance, EUR
  Torreense           3 ejercicios (2021/2022 a 2023/2024), balance, EUR
  União de Leiria     2 ejercicios (2022/2023 a 2023/2024), balance, EUR
  Vitória Guimarães   4 ejercicios (2020/2021, 2021/2022, 2023/2024, 2024/2025), balance, EUR
  Vizela              4 ejercicios (2021/2022 a 2024/2025), balance, EUR

RU (16)
  Akhmat Grozny          4 ejercicios (2022 a 2025), balance, RUB
  Akron Tolyatti         5 ejercicios (2021 a 2025), balance, RUB
  Baltika Kaliningrad    4 ejercicios (2022 a 2025), balance, RUB
  CSKA Moscow            5 ejercicios (2021 a 2025), balance, RUB
  Dynamo Makhachkala     5 ejercicios (2021 a 2025), balance, RUB
  Dynamo Moscow          5 ejercicios (2021 a 2025), balance, RUB
  Krasnodar              5 ejercicios (2021 a 2025), balance, RUB
  Krylia Sovetov Samara  5 ejercicios (2021 a 2025), balance, RUB
  Lokomotiv Moscow       5 ejercicios (2021 a 2025), balance, RUB
  Orenburg               5 ejercicios (2021 a 2025), balance, RUB
  Pari Nizhny Novgorod   5 ejercicios (2021 a 2025), balance, RUB
  Rostov                 5 ejercicios (2021 a 2025), balance, RUB
  Rubin Kazan            5 ejercicios (2021 a 2025), balance, RUB
  Sochi                  5 ejercicios (2021 a 2025), balance, RUB
  Spartak Moscow         5 ejercicios (2021 a 2025), balance, RUB
  Zenit                  5 ejercicios (2021 a 2025), balance, RUB

===== CLUB-INDEX:END =====
