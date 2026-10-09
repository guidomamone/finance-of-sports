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
estarlo: vive en el comentario de cabecera de cada `data/<club>-data.js`, que es el
archivo que sí o sí se toca al cargar un club y por lo tanto el único que no se puede
desincronizar. Si querés entender un club, abrí SU archivo.

Todo ejercicio listado acá es REAL (sale de un documento oficial del club) y cierra
contra el total impreso de su propio documento — eso lo garantiza `auditAll()`, no
esta lista. Un club sin datos reales no aparece.

TOTAL: 190 clubes, 532 ejercicios, 16 países.

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

BRASIL (34)
  Amazonas              1 ejercicio (2024), balance, BRL
  América Mineiro       3 ejercicios (2023 a 2025), balance, BRL
  Athletico Paranaense  2 ejercicios (2024 a 2025), balance, BRL
  Atlético Goianiense   1 ejercicio (2025), balance, BRL
  Atlético Mineiro      3 ejercicios (2023 a 2025), balance, BRL
  Bahia                 2 ejercicios (2024 a 2025), balance, BRL
  Botafogo              3 ejercicios (2023 a 2025), balance, BRL
  Botafogo-SP           1 ejercicio (2024), balance, BRL
  Ceará                 2 ejercicios (2024 a 2025), balance, BRL
  Chapecoense           2 ejercicios (2017, 2021), balance, BRL
  Corinthians           2 ejercicios (2024 a 2025), balance, BRL
  Coritiba              2 ejercicios (2023 a 2024), balance, BRL
  Cruzeiro              4 ejercicios (2022 a 2025), balance, BRL
  Flamengo              2 ejercicios (2024 a 2025), balance, BRL
  Fluminense            2 ejercicios (2024 a 2025), balance, BRL
  Fortaleza             1 ejercicio (2025), balance, BRL
  Goiás                 15 ejercicios (2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2021, 2022, 2023, 2024, 2025), balance, BRL, sin deuda/caja
  Grêmio                1 ejercicio (2024), balance, BRL
  Guarani               2 ejercicios (2024 a 2025), balance, BRL
  Internacional         2 ejercicios (2024 a 2025), balance, BRL
  Ituano                1 ejercicio (2024), balance, BRL
  Juventude             1 ejercicio (2020), balance, BRL
  Mirassol              1 ejercicio (2024), balance, BRL, sin deuda/caja
  Novorizontino         14 ejercicios (2010, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025), balance, BRL
  Operário Ferroviário  2 ejercicios (2024 a 2025), balance, BRL
  Palmeiras             2 ejercicios (2024 a 2025), balance, BRL
  Ponte Preta           3 ejercicios (2022 a 2024), balance, BRL
  RB Bragantino         2 ejercicios (2019, 2024), balance, BRL
  Santos                2 ejercicios (2024 a 2025), balance, BRL
  São Paulo             2 ejercicios (2023 a 2024), balance, BRL
  Sport Recife          1 ejercicio (2025), balance, BRL
  Vasco da Gama         1 ejercicio (2023), balance, BRL
  Vitória               1 ejercicio (2025), balance, BRL
  Volta Redonda         2 ejercicios (2024 a 2025), balance, BRL

CHILE (3)
  Colo-Colo             3 ejercicios (2022 a 2024), balance, CLP, sin deuda/caja
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
  Once Caldas             4 ejercicios (2022 a 2025), balance, COP, sin deuda/caja
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

GR (2)
  AEL Larissa    10 ejercicios (2015/2016 a 2024/2025), balance, EUR
  Panathinaikos  1 ejercicio (2024/2025), balance, EUR

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
  AC Milan       14 ejercicios (2007/2008, 2008/2009, 2009/2010, 2010/2011, 2011/2012, 2012/2013, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR, sin deuda/caja
  AS Roma        17 ejercicios (2006/2007, 2007/2008, 2008/2009, 2010/2011, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR, sin deuda/caja
  Atalanta       7 ejercicios (2017/2018, 2018/2019, 2019/2020, 2020/2021, 2022/2023, 2023/2024, 2024/2025), balance, EUR, sin deuda/caja
  Bologna        8 ejercicios (2017/2018 a 2024/2025), balance, EUR, sin deuda/caja
  Chievo Verona  3 ejercicios (2013/2014 a 2015/2016), balance, EUR, sin deuda/caja
  Como           2 ejercicios (2023/2024 a 2024/2025), balance, EUR, sin deuda/caja
  Cremonese      4 ejercicios (2021/2022 a 2024/2025), balance, EUR, sin deuda/caja
  Fiorentina     5 ejercicios (2018/2019, 2020/2021, 2021/2022, 2023/2024, 2024/2025), balance, EUR, sin deuda/caja
  Genoa          3 ejercicios (2021/2022, 2022/2023, 2024/2025), balance, EUR, sin deuda/caja
  Hellas Verona  6 ejercicios (2019/2020 a 2024/2025), balance, EUR, sin deuda/caja
  Inter          7 ejercicios (2017/2018, 2018/2019, 2019/2020, 2021/2022, 2022/2023, 2023/2024, 2024/2025), balance, EUR, sin deuda/caja
  Juve Stabia    1 ejercicio (2023/2024), balance, EUR, sin deuda/caja
  Juventus       23 ejercicios (2002/2003 a 2024/2025), balance, EUR
  Lazio          24 ejercicios (1998/1999, 1999/2000, 2000/2001, 2004/2005, 2005/2006, 2006/2007, 2007/2008, 2008/2009, 2009/2010, 2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024, 2024/2025, 2025/2026), balance, ITL/EUR, sin deuda/caja
  Monza          3 ejercicios (2022 a 2024), balance, EUR, sin deuda/caja
  Napoli         8 ejercicios (2017/2018 a 2024/2025), balance, EUR, sin deuda/caja
  Parma          9 ejercicios (2016, 2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025), balance, EUR, sin deuda/caja
  Salernitana    2 ejercicios (2021/2022 a 2022/2023), balance, EUR, sin deuda/caja
  Sampdoria      3 ejercicios (2018, 2019, 2021), balance, EUR, sin deuda/caja
  Sassuolo       7 ejercicios (2019 a 2025), balance, EUR, sin deuda/caja
  Torino         8 ejercicios (2018 a 2025), balance, EUR, sin deuda/caja
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

===== CLUB-INDEX:END =====
