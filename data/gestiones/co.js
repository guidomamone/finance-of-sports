// ============================================================================
// data/gestiones/co.js: quién condujo cada club de Colombia y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'junior-co': [
    // Antonio Char asumió de nuevo a principios de 2025 (la prensa lo anunció el 18/1/2025 "desde el lunes"): 20/1/2025 es aproximada.
    // Presidió antes 2016-12 a 2020-12 (reemplazado por Alejandro Arteta el 21/12/2020); ese tramo no hace falta para los años cargados.
    { nombre:'Antonio Char Chaljub', corto:'Char', cargo:'Presidente', desde:'2025-01-20', hasta:null,
      fuente:'https://www.colombia.com/futbol/futbol-colombiano/junior-confirmo-el-cambio-de-mandatario-para-la-siguiente-temporada-502108', confirmada:true },
  ],
  'atlnacional-co': [
    // Cargo: Presidente (representante legal). El dueño es la Organización Ardila Lulle, una sociedad sin dueño persona: no se carga como gestión.
    { nombre:'Sebastián Arango Botero', corto:'Arango', cargo:'Presidente', desde:'2024-05-01', hasta:null,
      fuente:'https://www.futbolred.com/futbol-colombiano/liga-betplay/sebastian-arango-botero-es-nuevo-presidente-de-atletico-nacional-208523', confirmada:true },
  ],
  'americadecali-co': [
    // Marcela Gómez Giraldo (hija del accionista mayoritario Tulio Gómez) es la presidente y firma como representante legal; Tulio Gómez no ejerce el cargo.
    { nombre:'Marcela Gómez Giraldo', corto:'Gómez', cargo:'Presidente', desde:'2024-01-04', hasta:null,
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Am%C3%A9rica_de_Cali', confirmada:true },
  ],
  'depcali-co': [
    // Tinoco: la nueva junta directiva se oficializó el 19-20/11/2025 (las fuentes difieren por un día); renunció el 21/4/2026 y asumió Joaquín Losada Fina (fecha de relevo aproximada).
    { nombre:'Rafael Tinoco Kipps', corto:'Tinoco', cargo:'Presidente', desde:'2025-11-20', hasta:'2026-04-21',
      fuente:'https://www.publimetro.co/deportes/2025/11/20/deportivo-cali-tiene-nuevo-presidente-y-tan-pronto-llego-hizo-una-fuerte-advertencia/', confirmada:true },
    { nombre:'Joaquín Losada Fina', corto:'Losada', cargo:'Presidente', desde:'2026-04-21', hasta:null,
      fuente:'https://www.elpais.com.co/deportes/joaquin-losada-fina-asume-la-presidencia-de-la-junta-directiva-del-deportivo-cali-conozca-los-detalles-2100.html', confirmada:true },
  ],
  'millonarios-co': [
    // Camacho: presidente desde 2014, tras la renuncia de Juan Carlos Saldarriaga (Noticias Caracol; solo el año: dia 01). Sigue en 2026. El accionista mayoritario es un fondo (Amber Capital, vía Blas de Lezo Inversiones, 86,61%): no es una persona, no se carga como dueño.
    { nombre:'Enrique Camacho Matamoros', corto:'Camacho', cargo:'Presidente', desde:'2014-01-01', hasta:null,
      fuente:'https://www.noticiascaracol.com/golcaracol/futbol-colombiano/quien-es-el-dueno-de-millonarios-so35', confirmada:true },
  ],
  'santafe-co': [
    // Méndez: asumió en la asamblea extraordinaria del 1/8/2019 (reemplazó a Juan Andrés Carreño). Wikipedia lista a Diego Perdomo con el 85% de las acciones; se carga al presidente que conduce el club (criterio a confirmar por Guido).
    { nombre:'Luis Eduardo Méndez Bustos', corto:'Méndez', cargo:'Presidente', desde:'2019-08-01', hasta:null,
      fuente:'https://www.elespectador.com/deportes/futbol-colombiano/santa-fe/eduardo-mendez-es-el-nuevo-presidente-de-santa-fe-article-874019/', confirmada:true },
  ],
  'deportivopereira-co': [
    // López Bedoya: presidente, representante legal y máximo accionista (Supersociedades lo multó en 12/2025 y 4/2026 como representante legal). La fecha de inicio no se pudo confirmar:
    // la familia López Bedoya recuperó el club en 9/2010 (Wikipedia en inglés) y Las2orillas dice que lleva 16 años en el equipo en 2026. Desde aproximado: 2010-09-01, sin confirmar. El anuncio de venta a Group Empresarios Full CCI Dubai (11/2025) no se concretó según las fuentes.
    { nombre:'Álvaro de Jesús López Bedoya', corto:'López', cargo:'Presidente', desde:'2010-09-01', hasta:null,
      fuente:'https://www.vanguardia.com/deportes/futbol/2025/12/15/deportivo-pereira-suma-otro-golpe-supersociedades-multa-a-su-presidente-por-desatender-las-ordenes/', confirmada:false },
  ],
  'boyacachico-co': [
    // Dueño: Eduardo Pimentel, persona con nombre (dueño y gestor del proyecto desde la fundación del club en 2002, Wikipedia; Publimetro 2024 lo llama "dueño del Boyacá Chicó"). Su hijo Nicolás Pimentel es el presidente/gerente que firma (Publimetro, 10/2024): sin fecha de inicio, queda fuera por el criterio del dueño.
    { nombre:'Eduardo Pimentel', corto:'Pimentel', cargo:'Dueño', desde:'2002-01-01', hasta:null,
      fuente:'https://www.publimetro.co/deportes/2024/02/21/pimentel-dueno-del-boyaca-chico-culpo-al-gobierno-petro-de-la-crisis-que-atraviesa-el-futbol-colombiano/', confirmada:true },
  ],
  'unionmagdalena-co': [
    // Méndez Bustos: presidente en enero de 2018 (convenio por el estadio Sierra Nevada) y todavía en junio de 2019 (El Heraldo); asumió la presidencia de Santa Fe el 1/8/2019. Se desconoce cuándo llegó a Unión Magdalena: desde aproximado (primera fecha documentada), sin confirmar.
    { nombre:'Luis Eduardo Méndez Bustos', corto:'Méndez', cargo:'Presidente', desde:'2018-01-01', hasta:'2019-08-01',
      fuente:'https://www.elheraldo.co/deportes/2018/11/15/el-calvario-que-duro-13-anos-566242/', confirmada:false },
  ],
  'fortalezaceif-co': [
    // Barato: fundador de CEIF, presidente y representante legal (firma las certificaciones 2017 y 2019 y el informe 2021 en Clubes/Colombia/Fortaleza CEIF/). Win Sports ubica el cambio de administración en 2015 (solo el año: dia 01).
    // Hasta: el club anunció su salida el 25/11/2025 (Wikipedia en inglés). Quién lo sucedió no se pudo confirmar: el ejercicio 2025 queda sin cubrir.
    { nombre:'Carlos Alberto Barato Méndez', corto:'Barato', cargo:'Presidente', desde:'2015-01-01', hasta:'2025-11-25',
      fuente:'https://www.winsports.co/futbol-colombiano/noticias/feliz-cumpleanos-amix-fortaleza-celebra-12-anos-de-historia-68898', confirmada:true },
  ],
  'aguilasdoradas-co': [
    // Dueño: José Fernando Salazar Olano, máximo accionista; lideró en 2008 el grupo de inversores que fundó el club como Itagüí Ditaires (Wikipedia). La representante legal y presidenta formal es Paola Andrea Salazar Olano
    // (firma las certificaciones 2016 a 2025 de Talento Dorado S.A., Clubes/Colombia/Aguilas Doradas/): queda fuera por el criterio del dueño.
    { nombre:'José Fernando Salazar Olano', corto:'Salazar', cargo:'Dueño', desde:'2008-07-16', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/%C3%81guilas_Doradas', confirmada:true },
  ],
  'alianzafc-co': [
    // Ferreira: presidente, máximo propietario y representante legal (firma las certificaciones 2016 a 2025 de Alianza Petrolera y luego Alianza FC, Clubes/Colombia/Alianza FC/). Wikipedia en inglés lo lista de presidente sin año de inicio:
    // desde aproximado (primer ejercicio con documento), sin confirmar. Alianza Petrolera se disolvió en enero de 2024 y Alianza FC ocupó su lugar.
    { nombre:'Carlos Orlando Ferreira Pinzón', corto:'Ferreira', cargo:'Presidente', desde:'2016-01-01', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Alianza_Petrolera_F.C.', confirmada:false },
  ],
  'atleticobucaramanga-co': [
    // Dueño: Óscar Enrique Álvarez Ascanio, máximo accionista (74,29% al cierre de 2024, estados-financieros-2024.md); compró la mayoría de las acciones el 31/5/2012 (Vanguardia). Firma como representante legal 2017 a 2020.
    // Presidentes formales que quedan fuera por el criterio del dueño: Óscar Upegui (presentado el 3/10/2019, Vanguardia) y su hijo Óscar Álvarez Júnior (desde 8/2024, tras la renuncia de Jaime Elías Quintero).
    { nombre:'Óscar Enrique Álvarez Ascanio', corto:'Álvarez', cargo:'Dueño', desde:'2012-05-31', hasta:null,
      fuente:'https://www.vanguardia.com/deportes/futbol-colombiano/video-oscar-alvarez-se-llevara-al-atletico-bucaramanga-para-ocana-esto-es-lo-que-se-sabe-YD7467991', confirmada:true },
  ],
  'deportestolima-co': [
    // Gabriel Camargo: presidente ininterrumpido desde 2003 (Pulzo) hasta marzo de 2022 (solo el mes: dia 01), cuando su cáncer lo apartó; falleció el 21/11/2022. Firma las certificaciones 2016 a 2022. Era el máximo accionista.
    { nombre:'Gabriel Camargo Salamanca', corto:'Gabriel Camargo', cargo:'Presidente', desde:'2003-01-01', hasta:'2022-03-01',
      fuente:'https://www.pulzo.com/deportes/deportes-tolima-hoy-como-esta-salud-gabriel-camargo-presidente-club-PP1865394A', confirmada:true },
    // César Camargo: hijo, asumió de hecho la presidencia cuando su padre se apartó (marzo de 2022); firma las certificaciones 2023 y 2024 como Cesar Alejandro Camargo Serrano. La familia Camargo Serrano es la propietaria.
    { nombre:'César Alejandro Camargo Serrano', corto:'César Camargo', cargo:'Presidente', desde:'2022-03-01', hasta:null,
      fuente:'https://www.pulzo.com/deportes/deportes-tolima-hoy-como-esta-salud-gabriel-camargo-presidente-club-PP1865394A', confirmada:true },
  ],
  'laequidad-co': [
    // Zuluaga: presidente desde 2013 (Las2orillas, solo el año: dia 01), tras la renuncia de Clemente Jaimes; firma las certificaciones 2017 a 2024. Dejó el club al ser elegido presidente de la Dimayor el 25/3/2025 (hasta aproximado).
    // El club era de Equidad Seguros y Fundequidad (organizaciones solidarias, no personas); en 1/2025 lo compró el grupo Tylis-Porter.
    { nombre:'Carlos Mario Zuluaga Pérez', corto:'Zuluaga', cargo:'Presidente', desde:'2013-01-01', hasta:'2025-03-25',
      fuente:'https://www.las2orillas.co/la-buena-hora-del-presidente-de-la-equidad-quien-pica-en-punta-para-la-presidencia-de-la-dimayor/', confirmada:true },
    // Maya: representante legal que firma la certificación 2025 (Clubes/Colombia/La Equidad/certificacion-ef-2025.md); co-presidente de la junta desde la compra (1/2025). Desde aproximado: la salida de Zuluaga.
    { nombre:'Nicolás Maya Medina', corto:'Maya', cargo:'Presidente', desde:'2025-03-25', hasta:null,
      fuente:'https://forbes.co/2025/08/21/deportes-2/club-deportivo-la-equidad-nuevos-duenos/', confirmada:true },
  ],
  'llaneros-co': [
    // Mateus: presidente desde 2013 (El Heraldo, 6/2020; solo el año: dia 01); firma las certificaciones 2016 a 2018 como "Presidente - Representante Legal". Hasta aproximado: la primera certificación de su sucesora es la de 2019.
    { nombre:'Héctor Mateus Samper', corto:'Mateus', cargo:'Presidente', desde:'2013-01-01', hasta:'2019-01-01',
      fuente:'https://www.elheraldo.co/deportes/2020/06/25/si-jorge-enrique-velez-debe-dar-un-paso-al-costado-hector-matheus-737215/', confirmada:true },
    // Guzmán de los Ríos: firma la certificación 2019 como "Presidente - Representante Legal"; no se encontró ninguna fuente externa ni las fechas de su gestión. Sin confirmar.
    { nombre:'Catalina Guzmán de los Ríos', corto:'Guzmán', cargo:'Presidente', desde:'2019-01-01', hasta:'2020-01-01',
      fuente:'Clubes/Colombia/Llaneros/certificacion-ef-2019.md', confirmada:false },
    // Trujillo: llegó al club en 2020 (Las2orillas; solo el año: dia 01); firma las certificaciones 2020 a 2024 como representante legal. Preside el club en 2026.
    { nombre:'Juan Carlos Trujillo Velásquez', corto:'Trujillo', cargo:'Presidente', desde:'2020-01-01', hasta:null,
      fuente:'https://www.las2orillas.co/?p=918944', confirmada:true },
  ],
});
