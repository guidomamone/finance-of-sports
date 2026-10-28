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

TOTAL: 346 clubes, 1571 ejercicios, 24 países.

ARGENTINA (19)
  Almagro                        6 ejercicios (2017/2018 a 2022/2023), balance, ARS
  Argentinos Juniors             5 ejercicios (2014/2015 a 2018/2019), balance, ARS
  Banfield                       1 ejercicio (2019/2020), balance, ARS
  Boca Juniors                   4 ejercicios (2021/2022, 2022/2023, 2024/2025, 2026/2027), balance + presupuesto, ARS
  Estudiantes de La Plata        4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Ferro Carril Oeste             3 ejercicios (2021/2022, 2022/2023, 2024/2025), balance, ARS
  Gimnasia y Esgrima (La Plata)  4 ejercicios (2022/2023 a 2025/2026), balance + presupuesto y balance + presupuesto, ARS
  Godoy Cruz                     1 ejercicio (2019/2020), balance, ARS
  Independiente                  2 ejercicios (2023/2024, 2025/2026), balance, ARS
  Instituto ACC                  2 ejercicios (2023/2024 a 2024/2025), balance, ARS
  Los Andes                      2 ejercicios (2019/2020 a 2020/2021), balance, ARS
  Newell's Old Boys              1 ejercicio (2018/2019), balance, ARS
  Racing Club                    17 ejercicios (2008/2009, 2009/2010, 2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2023/2024, 2024/2025, 2025/2026, 2026/2027), balance + presupuesto y balance + presupuesto, USD/ARS
  River Plate                    2 ejercicios (2020/2021, 2023/2024), balance + balance de réplica no oficial, ARS
  Rosario Central                2 ejercicios (2022/2023, 2024/2025), balance, ARS
  San Lorenzo                    8 ejercicios (2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2023/2024), balance + presupuesto, ARS
  Talleres                       2 ejercicios (2024 a 2025), balance, ARS
  Unión                          4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Vélez Sarsfield                11 ejercicios (2014/2015 a 2024/2025), balance, ARS

AT (1)
  Rapid Wien  13 ejercicios (2012/2013 a 2024/2025), balance, EUR, sin deuda/caja

BE (23)
  Anderlecht            1 ejercicio (2024/2025), balance, EUR
  Antwerp               1 ejercicio (2024/2025), balance, EUR
  Beerschot             7 ejercicios (2018/2019 a 2024/2025), balance, EUR
  Cercle Brugge         2 ejercicios (2018/2019, 2024/2025), balance, EUR
  Charleroi             1 ejercicio (2024/2025), balance, EUR
  Club Brugge           1 ejercicio (2024/2025), balance, EUR
  Dender EH             7 ejercicios (2016/2017, 2018/2019, 2019/2020, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Genk                  1 ejercicio (2024/2025), balance, EUR
  Gent                  1 ejercicio (2024/2025), balance, EUR
  Lierse Kempenzonen    4 ejercicios (2017/2018 a 2020/2021), balance, EUR, sin deuda/caja
  Lierse SK             7 ejercicios (2018/2019 a 2024/2025), balance, EUR
  Lokeren-Temse         5 ejercicios (2020/2021 a 2024/2025), balance, EUR
  Lommel SK             8 ejercicios (2017/2018 a 2024/2025), balance, EUR
  Mechelen              1 ejercicio (2024/2025), balance, EUR
  OH Leuven             6 ejercicios (2018/2019, 2019/2020, 2020/2021, 2022/2023, 2023/2024, 2024/2025), balance, EUR, sin deuda/caja
  Patro Eisden          13 ejercicios (2012/2013 a 2024/2025), balance, EUR
  RAAL La Louvière      8 ejercicios (2017/2018 a 2024/2025), balance, EUR
  RWDM                  6 ejercicios (2019/2020 a 2024/2025), balance, EUR
  Sint-Truiden          1 ejercicio (2024/2025), balance, EUR
  Standard Liège        1 ejercicio (2024/2025), balance, EUR
  Union Saint-Gilloise  1 ejercicio (2024/2025), balance, EUR
  Westerlo              4 ejercicios (2014/2015, 2015/2016, 2016/2017, 2024/2025), balance, EUR
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
  Botafogo-SP           2 ejercicios (2024 a 2025), balance, BRL
  Ceará                 2 ejercicios (2024 a 2025), balance, BRL
  Chapecoense           4 ejercicios (2017, 2019, 2021, 2022), balance, BRL
  Corinthians           2 ejercicios (2024 a 2025), balance, BRL
  Coritiba              3 ejercicios (2023 a 2025), balance, BRL
  CRB                   6 ejercicios (2020 a 2025), balance, BRL
  Criciuma              14 ejercicios (2012 a 2025), balance, BRL
  Cruzeiro              4 ejercicios (2022 a 2025), balance, BRL
  Cuiaba                4 ejercicios (2022 a 2025), balance, BRL
  Ferroviaria           13 ejercicios (2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2021, 2022, 2023, 2024, 2025), balance, BRL
  Flamengo              2 ejercicios (2024 a 2025), balance, BRL
  Fluminense            2 ejercicios (2024 a 2025), balance, BRL
  Fortaleza             1 ejercicio (2025), balance, BRL
  Goiás                 18 ejercicios (2008 a 2025), balance, BRL
  Grêmio                2 ejercicios (2024 a 2025), balance, BRL
  Guarani               2 ejercicios (2024 a 2025), balance, BRL
  Internacional         2 ejercicios (2024 a 2025), balance, BRL
  Ituano                1 ejercicio (2024), balance, BRL
  Juventude             2 ejercicios (2020 a 2021), balance, BRL
  Mirassol              1 ejercicio (2024), balance, BRL
  Novorizontino         15 ejercicios (2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025), balance, BRL
  Operário Ferroviário  2 ejercicios (2024 a 2025), balance, BRL
  Palmeiras             2 ejercicios (2024 a 2025), balance, BRL
  Paysandu              4 ejercicios (2021, 2023, 2024, 2025), balance, BRL
  Ponte Preta           4 ejercicios (2022 a 2025), balance, BRL
  RB Bragantino         3 ejercicios (2019, 2024, 2025), balance, BRL
  Remo                  7 ejercicios (2019 a 2025), balance, BRL
  Santos                2 ejercicios (2024 a 2025), balance, BRL
  São Paulo             3 ejercicios (2023 a 2025), balance, BRL
  Sport Recife          1 ejercicio (2025), balance, BRL
  Vasco da Gama         1 ejercicio (2023), balance, BRL
  Vila Nova             9 ejercicios (2014, 2015, 2016, 2017, 2021, 2022, 2023, 2024, 2025), balance, BRL
  Vitória               1 ejercicio (2025), balance, BRL
  Volta Redonda         2 ejercicios (2024 a 2025), balance, BRL

CH (3)
  Basel       17 ejercicios (2005 a 2021), balance, CHF
  Luzern      7 ejercicios (2017/2018, 2018/2019, 2019/2020, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, CHF, sin deuda/caja
  St. Gallen  7 ejercicios (2018/2019 a 2024/2025), balance, CHF, sin deuda/caja

CHILE (3)
  Colo-Colo             5 ejercicios (2013, 2022, 2023, 2024, 2025), balance, CLP
  Universidad Católica  16 ejercicios (2010 a 2025), balance, CLP
  Universidad de Chile  5 ejercicios (2013, 2022, 2023, 2024, 2025), balance, CLP

COLOMBIA (30)
  Aguilas Doradas         10 ejercicios (2016 a 2025), balance, COP
  Alianza FC              10 ejercicios (2016 a 2025), balance, COP
  América de Cali         10 ejercicios (2016 a 2025), balance, COP
  Atletico Bucaramanga    10 ejercicios (2016 a 2025), balance, COP
  Atlético FC             10 ejercicios (2016 a 2025), balance, COP
  Atletico Huila          10 ejercicios (2016 a 2025), balance, COP
  Atlético Nacional       11 ejercicios (2015 a 2025), balance, COP
  Barranquilla FC         10 ejercicios (2016 a 2025), balance, COP
  Bogota FC               10 ejercicios (2016 a 2025), balance, COP
  Boyacá Chicó            10 ejercicios (2016 a 2025), balance, COP
  Cucuta Deportivo        8 ejercicios (2016, 2017, 2018, 2019, 2022, 2023, 2024, 2025), balance, COP
  Deportes Tolima         10 ejercicios (2016 a 2025), balance, COP
  Deportivo Cali          1 ejercicio (2025), balance, COP
  Deportivo Pereira       2 ejercicios (2024 a 2025), balance, COP
  Envigado FC             10 ejercicios (2016 a 2025), balance, COP
  Fortaleza CEIF          10 ejercicios (2016 a 2025), balance, COP
  Independiente Medellín  10 ejercicios (2016 a 2025), balance, COP
  Independiente Santa Fe  1 ejercicio (2025), balance, COP
  Inter de Palmira        6 ejercicios (2020 a 2025), balance, COP
  Jaguares                7 ejercicios (2016 a 2022), balance, COP, sin deuda/caja
  Junior de Barranquilla  1 ejercicio (2025), balance, COP
  La Equidad              10 ejercicios (2016 a 2025), balance, COP
  Leones FC               10 ejercicios (2016 a 2025), balance, COP
  Llaneros                1 ejercicio (2025), balance, COP
  Millonarios             1 ejercicio (2025), balance, COP
  Once Caldas             10 ejercicios (2016 a 2025), balance, COP
  Orsomarso               9 ejercicios (2016, 2017, 2018, 2020, 2021, 2022, 2023, 2024, 2025), balance, COP
  Real Cartagena          9 ejercicios (2017 a 2025), balance, COP
  Tigres FC               8 ejercicios (2016, 2017, 2018, 2019, 2020, 2021, 2022, 2024), balance, COP
  Unión Magdalena         10 ejercicios (2016 a 2025), balance, COP

CY (1)
  Omonia 29 Maiou  1 ejercicio (2023/2024), balance, EUR, sin deuda/caja

ALEMANIA (11)
  1. FC Köln                2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Bayern Munich             4 ejercicios (2020/2021, 2022/2023, 2023/2024, 2024/2025), balance, EUR, sin deuda/caja
  Borussia Dortmund         2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Borussia Mönchengladbach  4 ejercicios (2021 a 2024), balance, EUR
  Eintracht Frankfurt       2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  FC Augsburg               2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Hamburger SV              2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  RB Leipzig                4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  TSG Hoffenheim            2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  VfB Stuttgart             2 ejercicios (2023 a 2024), balance, EUR
  Werder Bremen             3 ejercicios (2022/2023 a 2024/2025), balance, EUR

DK (11)
  AGF              1 ejercicio (2020/2021), balance, DKK
  Brøndby          2 ejercicios (2020 a 2021), balance, DKK
  FC Fredericia    9 ejercicios (2017 a 2025), balance, DKK
  FC København     2 ejercicios (2024 a 2025), balance, DKK
  FC Midtjylland   2 ejercicios (2018/2019 a 2019/2020), balance, DKK
  FC Nordsjælland  2 ejercicios (2024 a 2025), balance, DKK
  Randers FC       3 ejercicios (2016/2017, 2021/2022, 2022/2023), balance, DKK
  Silkeborg IF     2 ejercicios (2024 a 2025), balance, DKK
  SønderjyskE      4 ejercicios (2021/2022 a 2024/2025), balance, DKK
  Vejle            3 ejercicios (2022, 2024, 2025), balance, DKK
  Viborg FF        5 ejercicios (2018/2019, 2019/2020, 2020/2021, 2023/2024, 2024/2025), balance, DKK

EE (9)
  FCI Levadia          7 ejercicios (2019 a 2025), balance, EUR
  Flora Tallinn        7 ejercicios (2019 a 2025), balance, EUR
  Harju JK Laagri      3 ejercicios (2023 a 2025), balance, EUR, sin deuda/caja
  Kuressaare           7 ejercicios (2019 a 2025), balance, EUR
  Narva Trans          7 ejercicios (2019 a 2025), balance, EUR
  Nõmme Kalju          7 ejercicios (2019 a 2025), balance, EUR
  Paide Linnameeskond  7 ejercicios (2019 a 2025), balance, EUR
  Tallinna Kalev       7 ejercicios (2019 a 2025), balance, EUR
  Tartu Tammeka        7 ejercicios (2019 a 2025), balance, EUR, sin deuda/caja

ESPAÑA (19)
  Athletic Club       1 ejercicio (2024/2025), balance, EUR
  Atlético de Madrid  1 ejercicio (2024/2025), balance, EUR
  CA Osasuna          2 ejercicios (2021/2022, 2023/2024), balance, EUR
  Celta de Vigo       1 ejercicio (2024/2025), balance, EUR
  Deportivo Alavés    1 ejercicio (2024/2025), balance, EUR
  Elche CF            2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  FC Barcelona        1 ejercicio (2024/2025), balance, EUR
  Getafe CF           2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Girona FC           5 ejercicios (2019/2020, 2020/2021, 2021/2022, 2022/2023, 2024/2025), balance, EUR
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

INGLATERRA (31)
  AFC Bournemouth          4 ejercicios (2021/2022 a 2024/2025), balance, GBP
  AFC Wimbledon            1 ejercicio (2024/2025), balance, GBP, sin deuda/caja
  Arsenal                  4 ejercicios (2021/2022 a 2024/2025), balance, GBP
  Aston Villa              7 ejercicios (2018/2019 a 2024/2025), balance, GBP
  Barnsley                 1 ejercicio (2024/2025), balance, GBP, sin deuda/caja
  Bath Rugby               5 ejercicios (2020/2021 a 2024/2025), balance, GBP
  Brentford                4 ejercicios (2021/2022 a 2024/2025), balance, GBP
  Brighton                 6 ejercicios (2019/2020 a 2024/2025), balance, GBP
  Burnley                  4 ejercicios (2021/2022 a 2024/2025), balance, GBP
  Burton Albion            1 ejercicio (2024/2025), balance, GBP, sin deuda/caja
  Carlisle United          1 ejercicio (2024/2025), balance, GBP, sin deuda/caja
  Celtic                   5 ejercicios (2020/2021 a 2024/2025), balance, GBP, sin deuda/caja
  Chelsea                  6 ejercicios (2019/2020 a 2024/2025), balance, GBP
  Chesterfield             1 ejercicio (2024/2025), balance, GBP, sin deuda/caja
  Crystal Palace           4 ejercicios (2021/2022 a 2024/2025), balance, GBP
  Everton                  4 ejercicios (2021/2022 a 2024/2025), balance, GBP
  Exeter City              1 ejercicio (2024/2025), balance, GBP, sin deuda/caja
  Fulham                   5 ejercicios (2020/2021 a 2024/2025), balance, GBP
  Gillingham               1 ejercicio (2024/2025), balance, GBP, sin deuda/caja
  Leeds United             7 ejercicios (2018/2019 a 2024/2025), balance, GBP
  Lincoln City             1 ejercicio (2024/2025), balance, GBP, sin deuda/caja
  Liverpool                4 ejercicios (2021/2022 a 2024/2025), balance, GBP
  Manchester City          5 ejercicios (2020/2021 a 2024/2025), balance, GBP
  Newcastle United         7 ejercicios (2018/2019 a 2024/2025), balance, GBP
  Nottingham Forest        4 ejercicios (2021/2022 a 2024/2025), balance, GBP
  Shrewsbury Town          1 ejercicio (2024/2025), balance, GBP, sin deuda/caja
  Sunderland               7 ejercicios (2018/2019 a 2024/2025), balance, GBP
  Tottenham Hotspur        4 ejercicios (2021/2022 a 2024/2025), balance, GBP
  West Ham United          6 ejercicios (2019/2020 a 2024/2025), balance, GBP
  Wigan Athletic           1 ejercicio (2023/2024), balance, GBP, sin deuda/caja
  Wolverhampton Wanderers  6 ejercicios (2019/2020 a 2024/2025), balance, GBP

GR (14)
  AEK Athens        10 ejercicios (2015/2016 a 2024/2025), balance, EUR
  AEL Larissa       10 ejercicios (2015/2016 a 2024/2025), balance, EUR
  Aris              6 ejercicios (2018/2019, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Asteras Tripolis  7 ejercicios (2018/2019 a 2024/2025), balance, EUR
  Atromitos         8 ejercicios (2015/2016, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Kifisia           4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Levadiakos        7 ejercicios (2018/2019 a 2024/2025), balance, EUR
  OFI Crete         8 ejercicios (2017/2018 a 2024/2025), balance, EUR
  Olympiacos        10 ejercicios (2015/2016 a 2024/2025), balance, EUR
  Panathinaikos     1 ejercicio (2024/2025), balance, EUR
  Panetolikos       8 ejercicios (2016/2017, 2017/2018, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Panserraikos      2 ejercicios (2022/2023, 2024/2025), balance, EUR
  PAOK              8 ejercicios (2016/2017, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR
  Volos NFC         7 ejercicios (2018/2019 a 2024/2025), balance, EUR

HR (8)
  Dinamo Zagreb  2 ejercicios (2024 a 2025), balance, EUR
  Gorica         1 ejercicio (2025), balance, EUR
  Hajduk Split   2 ejercicios (2024 a 2025), balance, EUR
  Istra 1961     1 ejercicio (2025), balance, EUR
  Osijek         1 ejercicio (2025), balance, EUR
  Rijeka         4 ejercicios (2022 a 2025), balance, HRK/EUR
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
  Fiorentina     6 ejercicios (2019, 2019/2020, 2020/2021, 2021/2022, 2023/2024, 2024/2025), balance, EUR
  Genoa          4 ejercicios (2022 a 2024/2025), balance, EUR
  Hellas Verona  6 ejercicios (2019/2020 a 2024/2025), balance, EUR
  Inter          8 ejercicios (2017/2018 a 2024/2025), balance, EUR
  Juve Stabia    1 ejercicio (2023/2024), balance, EUR
  Juventus       23 ejercicios (2002/2003 a 2024/2025), balance, EUR
  Lazio          26 ejercicios (1998/1999, 1999/2000, 2000/2001, 2003/2004, 2004/2005, 2005/2006, 2006/2007, 2007/2008, 2008/2009, 2009/2010, 2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025, 2025/2026), balance, ITL/EUR
  Monza          3 ejercicios (2022 a 2024), balance, EUR
  Napoli         8 ejercicios (2017/2018 a 2024/2025), balance, EUR
  Parma          9 ejercicios (2015/2016, 2016/2017, 2017/2018, 2018/2019, 2021, 2022, 2023, 2024, 2025), balance, EUR
  Salernitana    2 ejercicios (2021/2022 a 2022/2023), balance, EUR
  Sampdoria      4 ejercicios (2018 a 2021), balance, EUR
  Sassuolo       8 ejercicios (2018 a 2025), balance, EUR
  Torino         8 ejercicios (2018 a 2025), balance, EUR
  Udinese        2 ejercicios (2021/2022, 2024/2025), balance, EUR

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

NL (31)
  ADO Den Haag      1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  Ajax              2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Almere City       1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  AZ                2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  De Graafschap     1 ejercicio (2021/2022), balance, EUR, sin deuda/caja
  Excelsior         3 ejercicios (2018/2019, 2019/2020, 2023/2024), balance, EUR, sin deuda/caja
  FC Den Bosch      1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  FC Dordrecht      1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  FC Eindhoven      1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  FC Emmen          3 ejercicios (2018/2019 a 2020/2021), balance, EUR, sin deuda/caja
  FC Groningen      1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  FC Twente         1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  FC Utrecht        1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  FC Volendam       1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  Feyenoord         2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Fortuna Sittard   1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  Go Ahead Eagles   5 ejercicios (2020/2021 a 2024/2025), balance, EUR, sin deuda/caja
  Helmond Sport     1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  Heracles Almelo   1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  NAC Breda         1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  NEC               1 ejercicio (2023/2024), balance, EUR, sin deuda/caja
  PEC Zwolle        1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  PSV               2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Roda JC           1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  SC Cambuur        1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  SC Heerenveen     1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  Sparta Rotterdam  1 ejercicio (2023/2024), balance, EUR, sin deuda/caja
  Telstar           1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  Vitesse           1 ejercicio (2023/2024), balance, EUR, sin deuda/caja
  VVV-Venlo         1 ejercicio (2024/2025), balance, EUR, sin deuda/caja
  Willem II         1 ejercicio (2024/2025), balance, EUR, sin deuda/caja

NO (6)
  Aalesund      3 ejercicios (2018, 2023/2024, 2025), balance, NOK, sin deuda/caja
  Fredrikstad   8 ejercicios (2012, 2013, 2014, 2015, 2016, 2017, 2018, 2024), balance, NOK, sin deuda/caja
  Molde         18 ejercicios (2008 a 2025), balance, NOK, sin deuda/caja
  Sarpsborg 08  14 ejercicios (2008, 2012, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025), balance, NOK, sin deuda/caja
  Vålerenga     4 ejercicios (2022 a 2025), balance, NOK
  Viking        9 ejercicios (2017 a 2025), balance, NOK, sin deuda/caja

PERÚ (1)
  Alianza Lima  6 ejercicios (2019 a 2024), balance, PEN

PT (33)
  Académica           3 ejercicios (2021/2022 a 2023/2024), balance, EUR
  Academico Viseu     4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Alverca             4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  Arouca              4 ejercicios (2021/2022 a 2024/2025), balance, EUR
  AVS                 3 ejercicios (2020/2021, 2022/2023, 2023/2024), balance, EUR
  Belenenses          2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Benfica             20 ejercicios (2005/2006, 2006/2007, 2007/2008, 2008/2009, 2009/2010, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025, 2025/2026), balance, EUR
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
  Sporting CP         26 ejercicios (1999/2000 a 2024/2025), balance, PTE/EUR
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

TR (1)
  Beşiktaş  16 ejercicios (2005/2006, 2006/2007, 2007/2008, 2008/2009, 2009/2010, 2010/2011, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023), balance, TRY, sin deuda/caja

===== CLUB-INDEX:END =====
