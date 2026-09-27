# Bélgica — sin login y scriptable por API

La **Centrale des bilans** del Banco Nacional de Bélgica (`consult.cbso.nbb.be`) es gratis, sin
login, y con API JSON pública — no hace falta ni un browser real:
`.../api/rs-consult/published-deposits?enterpriseNumber=<BCE>` lista todos los depósitos de una
entidad, y `.../api/external/broker/public/deposits/pdf/<id>` baja cada PDF directo con `curl`. Es
un nivel más abierto que Companies House (UK) o Unternehmensregister (Alemania), que sí necesitan
navegación real en algún punto del flujo. Último chequeo: 2026-09-17.

- **Series muy largas**: Club Brugge (35 ejercicios, 1999-2025), Standard Liège (31), Union
  Saint-Gilloise (28) y Westerlo (27).
- **El nombre del club casi nunca es la razón social legal, y puede haber homónimos con turnover en
  blanco**: hay que buscar por el número de empresa (BCE) correcto, y cuando existan varias
  entidades con nombres parecidos, comparar el campo de turnover (Omzet) del depósito más reciente
  de cada una antes de elegir — la entidad real del fútbol profesional tiene turnover real, las
  otras (asociación histórica, sociedad patrimonial del estadio) lo dejan en blanco. Confirmado con
  3 casos: Club Brugge operaba como "De Klokke" hasta 2011; la entidad real de Zulte Waregem se
  llama "Grensverleggend NV"; OH Leuven tiene 2 entidades homónimas sin turnover real además de la
  BV correcta.
- **Techo de disponibilidad real, no de búsqueda**: 1999 es el año más antiguo con PDF disponible en
  la Centrale des bilans para cualquier entidad consultada — no vale la pena buscar más atrás ahí.
- **Deloitte Pro League Report**: la propia Pro League/Deloitte publican un estudio socioeconómico
  agregado de toda la liga (5 ediciones bajadas, 2019-2023) — mismo patrón de "agregado de liga
  entera" que funcionó con la DFL alemana y la ÖFBL austríaca, aunque acá es un estudio, no un
  Bilanz+GuV por club.
- Con esto, los 16 clubes de la Pro League belga 2025/26 quedaron cubiertos con datos reales.
