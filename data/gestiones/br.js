// ============================================================================
// data/gestiones/br.js: quién condujo cada club de Brasil y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'atleticomineiro-br': [
    // SAF con cuatro accionistas personas (Menin, Guimaraes, Salvador): sin dueño unico, se carga el Diretor Presidente que firma el balance.
    // Muzzi: la fuente solo dice "desde 2022" (oficializacion de la SAF), dia 01/01 aproximado. Dejo el 31/12/2025.
    { nombre:'Bruno Muzzi', corto:'Muzzi', cargo:'Diretor Presidente', desde:'2022-01-01', hasta:'2026-01-01',
      fuente:'https://www.cnnbrasil.com.br/esportes/futebol/atletico-mineiro/atletico-anuncia-saida-de-bruno-muzzi-do-cargo-de-ceo-ao-fim-de-2025/', confirmada:true },
    // Pedro Daniel firma el balance 2025 (relatorio integrado) aunque asume el 01/01/2026: firmo [2025].
    { nombre:'Pedro Daniel', corto:'Pedro Daniel', cargo:'Diretor Presidente', desde:'2026-01-01', hasta:null, firmo:[2025],
      fuente:'https://atletico.com.br/pedro-daniel-e-o-novo-ceo-do-atletico/', confirmada:true },
  ],
  'bahia-br': [
    // SAF controlada por City Football Group (sociedad, sin dueño persona). Raul Aguirre Zegarra firma los balances como "Presidente"; la prensa lo llama CEO.
    { nombre:'Raul Aguirre Zegarra', corto:'Aguirre', cargo:'Presidente', desde:'2023-05-04', hasta:null,
      fuente:'https://www.ecbahia.com/politica/raul-aguirre-e-o-ceo-do-bahia-saiba-quem-e-e-como-ele-trabalhara/', confirmada:true },
  ],
  'chapecoense-br': [
    // Plinio: aclamado el 16/12/2016. Magro: la prensa dice "desde agosto de 2019" (renuncia formal de Plinio el 01/11/2019), dia 01/08/2019 aproximado.
    { nombre:'Plinio David De Nes Filho', corto:'De Nes', cargo:'Presidente', desde:'2016-12-16', hasta:'2019-08-01',
      fuente:'https://istoe.com.br/plinio-david-de-nes-filho-renuncia-ao-cargo-de-presidente-da-chapecoense/', confirmada:true },
    // Magro murio el 30/12/2020; Sbeghen (vice administrativo-financiero) lo reemplaza, oficializado el 04/01/2021.
    { nombre:'Paulo Magro', corto:'Magro', cargo:'Presidente', desde:'2019-08-01', hasta:'2021-01-04',
      fuente:'https://www.gazetaesportiva.com/times/chapecoense/chapecoense-oficializa-gilson-sbeghen-como-novo-presidente-do-clube/', confirmada:true },
    { nombre:'Gilson Sbeghen', corto:'Sbeghen', cargo:'Presidente', desde:'2021-01-04', hasta:'2021-12-14',
      fuente:'https://www.gazetaesportiva.com/times/chapecoense/chapecoense-oficializa-gilson-sbeghen-como-novo-presidente-do-clube/', confirmada:true },
    // Nei Maidana en la prensa; firma el balance como Nei Roque Mohr.
    { nombre:'Nei Roque Mohr', corto:'Mohr', cargo:'Presidente', desde:'2021-12-14', hasta:'2023-12-11',
      fuente:'https://diregional.com.br/diario-do-iguacu/esporte/chapecoense/2021-12-14-nei-maidana-sera-eleito-presidente-da-chapecoense-por-aclamacao-na-noite-desta-terca-feira-14', confirmada:true },
    // Mandato 2024/25 (posse 11/12/2023). No se verifico si hubo reeleccion en diciembre de 2025.
    { nombre:'Alex Passos', corto:'Passos', cargo:'Presidente', desde:'2023-12-11', hasta:null,
      fuente:'https://canalmaissports.com.br/2023/12/12/nova-diretoria-da-chapecoense-e-empossada-para-bienio-2024-25/', confirmada:true },
  ],
  'corinthians-br': [
    // Afastamiento por el Conselho Deliberativo la noche del lunes 26/05/2025 (el balance 2025 dice que Stabile asumio el 28/05; la prensa, el 26/05).
    { nombre:'Augusto Melo', corto:'Melo', cargo:'Presidente', desde:'2024-01-02', hasta:'2025-05-26',
      fuente:'https://trivela.com.br/brasil/augusto-melo-posse-corinthians/', confirmada:true },
    // Interino desde el 26/05/2025, efectivado el 25/08/2025 (mandato hasta el 31/12/2026): una sola gestion continua.
    { nombre:'Osmar Stábile', corto:'Stábile', cargo:'Presidente', desde:'2025-05-26', hasta:null,
      fuente:'https://www.cnnbrasil.com.br/esportes/futebol/corinthians/quem-e-osmar-stabile-novo-presidente-interino-do-corinthians/', confirmada:true },
  ],
  'flamengo-br': [
    // Landim: termino de mandato 01/01/2019 (algunas notas dicen que el acto formal fue el 02/01).
    { nombre:'Rodolfo Landim', corto:'Landim', cargo:'Presidente', desde:'2019-01-01', hasta:'2025-01-01',
      fuente:'https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Clube_de_Regatas_do_Flamengo', confirmada:true },
    // Baptista asume el 01/01/2025 y firma las demostraciones financieras 2024 (cerradas con Landim): firmo [2024].
    { nombre:'Luiz Eduardo Baptista', corto:'Baptista', cargo:'Presidente', desde:'2025-01-01', hasta:null, firmo:[2024],
      fuente:'https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Clube_de_Regatas_do_Flamengo', confirmada:true },
  ],
  'fluminense-br': [
    // Asumio el 10/06/2019; reelecto, segundo mandato desde el 15/12/2022 (una sola gestion continua).
    { nombre:'Mário Bittencourt', corto:'Bittencourt', cargo:'Presidente', desde:'2019-06-10', hasta:'2025-12-19',
      fuente:'https://www.lance.com.br/fluminense/mario-bittencourt-novo-presidente.html', confirmada:true },
    // Asume el 19/12/2025, antes del cierre: el ejercicio 2025 es suyo (y firma el balance).
    { nombre:'Mattheus Montenegro', corto:'Montenegro', cargo:'Presidente', desde:'2025-12-19', hasta:null,
      fuente:'https://www.fluminense.com.br/noticia/mattheus-montenegro-toma-posse-como-novo-presidente-do-fluminense', confirmada:true },
  ],
  gremio: [
    // Electo en noviembre de 2022; la fuente dice "desde enero de 2023", dia 01/01/2023 aproximado. Roman asume el 01/01/2026.
    { nombre:'Alberto Jerônimo Guerra Neto', corto:'Guerra', cargo:'Presidente', desde:'2023-01-01', hasta:'2026-01-01',
      fuente:'https://www.lance.com.br/gremio/um-gremio-ainda-maior-alberto-guerra-e-o-novo-presidente-do-imortal-para-2023-25.html', confirmada:true },
    { nombre:'Odorico Roman', corto:'Roman', cargo:'Presidente', desde:'2026-01-01', hasta:null,
      fuente:'https://www.espn.com.br/futebol/gremio/artigo/_/id/15933306/novo-presidente-gremio-odorico-roman-promete-solucoes-para-problemas-do-clube', confirmada:true },
  ],
  'internacional-br': [
    // Asumio el 01/01/2021; reelecto el 09/12/2023 para 2024-2026 (una sola gestion continua).
    { nombre:'Alessandro Barcellos', corto:'Barcellos', cargo:'Presidente', desde:'2021-01-01', hasta:null,
      fuente:'https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Sport_Club_Internacional', confirmada:true },
  ],
  'palmeiras-br': [
    // Mandato desde el 15/12/2021; reelecta en 2024 para 2025-2027 (una sola gestion continua).
    { nombre:'Leila Pereira', corto:'Leila', cargo:'Presidente', desde:'2021-12-15', hasta:null,
      fuente:'https://www.palmeiras.com.br/noticias/leila-pereira-e-eleita-e-se-torna-primeira-mulher-a-presidir-o-palmeiras-na-historia/', confirmada:true },
  ],
  'santos-br': [
    { nombre:'Marcelo Teixeira', corto:'Teixeira', cargo:'Presidente', desde:'2024-01-01', hasta:null,
      fuente:'https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Santos_Futebol_Clube', confirmada:true },
  ],
  'saopaulo-br': [
    // Reelecto para 2024-2026 (una sola gestion). Afastado/renuncia en enero de 2026 (Wikipedia: 16/01/2026; otras notas dicen 21/01).
    { nombre:'Julio Casares', corto:'Casares', cargo:'Presidente', desde:'2021-01-01', hasta:'2026-01-16',
      fuente:'https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_S%C3%A3o_Paulo_Futebol_Clube', confirmada:true },
    { nombre:'Harry Massis Junior', corto:'Massis', cargo:'Presidente', desde:'2026-01-16', hasta:null,
      fuente:'https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_S%C3%A3o_Paulo_Futebol_Clube', confirmada:true },
  ],
  'voltaredonda-br': [
    // Transicion el 08/12/2014; reelecto (tercer mandato en noviembre de 2022, vigente hasta noviembre de 2026). Una sola gestion continua.
    { nombre:'Flávio Horta Jardim', corto:'Horta', cargo:'Presidente', desde:'2014-12-08', hasta:null,
      fuente:'http://fferj.com.br/Noticias/View/9498', confirmada:true },
  ],
  'athleticoparanaense-br': [
    // Aclamado el 14/12/2019 para el cuadrienio 2020-2023; la fuente no da la fecha de posse, 01/01/2020 aproximado.
    { nombre:'Mario Celso Petraglia', corto:'Petraglia', cargo:'Presidente', desde:'2020-01-01', hasta:null,
      fuente:'https://pt.wikipedia.org/wiki/Mario_Celso_Petraglia', confirmada:true },
  ],
  'guarani-br': [
    // Marconatto: electo el 12/03/2023, asume el 01/04/2023. Presidente del Conselho de Administracao.
    { nombre:'André Marconatto', corto:'Marconatto', cargo:'Presidente', desde:'2023-04-01', hasta:'2024-10-10',
      fuente:'https://carlosbatista.com.br/guarani-andre-marconatto-vence-eleicoes-e-assume-conselho-de-administracao/', confirmada:true },
    // Rômulo Amaro: interino desde el 10/10/2024 (Marconatto se aparta por salud), reelecto en diciembre de 2025 para 2026-2028.
    { nombre:'Rômulo Aleksander Moreno Amaro', corto:'Amaro', cargo:'Presidente', desde:'2024-10-10', hasta:null,
      fuente:'https://correio.rac.com.br/esportes/presidente-do-guarani-se-afasta-do-cargo-1.1575342', confirmada:true },
  ],
  'operarioferroviario-br': [
    // SIN FECHA DE POSSE: solo se encontro que figura como Presidente del Conselho Diretor en la relacion de dirigentes 2023-2024 y firma el balance 2025. 01/01/2023 es un supuesto.
    { nombre:'Juarez Costa Pinto', corto:'Costa Pinto', cargo:'Presidente', desde:'2023-01-01', hasta:null,
      fuente:'https://www.operarioferroviario.com.br/wp-content/uploads/2024/02/2023-2024-Relacao-de-Dirigentes.pdf', confirmada:false },
  ],
  'vitoria-br': [
    // Interino desde octubre de 2021 (la fuente no da el dia, 01/10/2021 aproximado), efectivo en 2022, reelecto el 13/12/2025 hasta 2028. Una sola gestion continua.
    { nombre:'Fábio Rios Mota', corto:'Mota', cargo:'Presidente', desde:'2021-10-01', hasta:null,
      fuente:'https://www.lance.com.br/vitoria/com-folga-fabio-mota-e-reeleito-presidente-do-vitoria-veja-resultados.html', confirmada:true },
  ],
});
