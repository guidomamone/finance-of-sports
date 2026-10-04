// ============================================================================
// tools/grupos-pais.mjs — los GRUPOS DE PAÍSES del pipeline y lo que cada grupo tiene de propio en cada etapa. Gratis (no lee nada pesado).
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-30): "debemos analizar partir lógicas según país. Argentina tiene el tema de la inflación, otros
// tienen otras lógicas. Podemos presentar un Formato Simplificado de todos modos para todos, pero el proceso para llevar puede partirse".
// El formato simplificado del sitio es el destino COMÚN; lo que cambia por país es el camino hasta él: qué documento publica cada país, con
// qué estructura, en qué escala y moneda, y qué convenciones de carga tiene. Medido el mismo día: de 40 ejercicios cargados cuya
// reconstrucción daba x1000 en la escala, 31 eran argentinos.
//
// LOS GRUPOS se arman por MARCO CONTABLE Y FORMA DEL DOCUMENTO, no por geografía ni por liga: Chile y Colombia van juntos (NIIF en moneda
// local, en miles) y separados de Argentina (normas propias, inflación, Anexos); Bélgica y Países Bajos juntos (esquemas de cuentas anuales
// con formato fijo). Un país sin grupo cae en 'otros'. Si un país se porta distinto que su grupo, se lo separa acá (un solo lugar).
//
// LA LÓGICA DE CADA GRUPO (`logica`, por etapa del proceso nuevo de Admin/HANDOFF-pipeline.md: 2 transcribir, 3 localizar, 4 validar,
// 5 extraer, 6 verificar, 7 categorizar, 8 cargar) es CONOCIMIENTO MEDIDO, cada punto con el documento real donde se vio. Regla al editarla: no escribir nada que no se haya visto
// en un documento (pedido de Guido: "hacés todo muy teórico"); lo que no se sabe todavía se deja como "nada propio conocido". Por ahora es
// documentación que muestra `node tools/estado.mjs --logica`; las tools de cada etapa todavía tienen reglas generales. La idea (pendiente,
// HANDOFF) es que estas diferencias pasen a ser configuración que las tools lean, grupo por grupo.
// LOS PUNTOS DE HOY se vieron con el PROCESO VIEJO (2026-09-30), que tenía otras etapas: 3 validar, 4 preparar (qué filas, qué escala),
// 5 categorizar, 6 cargar. La Versión 466 los pasó a las etapas nuevas sin reescribirlos: preparar → 3 localizar (todos son sobre qué
// tablas, escala o perímetro se eligen), validar → 4, categorizar → 7, cargar → 8. Por eso varios hablan de "la selección" (la etapa vieja).
//
// USO:
//   import { grupoDe, GRUPOS } from './grupos-pais.mjs';   grupoDe('Clubes/Argentina/Racing/balance2012.pdf') -> 'argentina'
//   node tools/grupos-pais.mjs            qué países van en cada grupo
// ============================================================================

export const GRUPOS = [
  {
    id: 'argentina', corto: 'ARG', nombre: 'Argentina', paises: ['Argentina'],
    marco: 'Normas contables argentinas (FACPCE). Asociaciones civiles: "Memoria y Balance" con Estado de Recursos y Gastos y Anexos que abren cada línea.',
    logica: {
      3: [
        'Escala: pesos enteros o miles, a veces MEZCLADOS en el mismo documento (Los Andes 2009-10: estado en miles, anexo en pesos).',
        'La inflación hace inútil comparar contra otros años del club para adivinar la escala: Racing va de 185 millones (2012) a 143.118 (2026/27), y tiene 2009-2011 cargados en USD. Así Racing 2012 salió x1000.',
        'Bug del "000" adentro de un número ("363,750,000.00" leído como "en miles"): Almagro 2023, Racing 2012. Arreglado en la Versión 321.',
        'El detalle vive en los Anexos de Recursos y de Gastos, no en el estado: la selección abre cada renglón del estado en su Anexo.',
      ],
      7: [
        'Jev acierta menos que en otros países (74% en el backtest): cada club tiene agrupaciones curadas propias.',
        'El sector va entre paréntesis y cambia la categoría: "Seguros (Fútbol)" es wages_squad, "Seguros (Estadio)" es admin_general_expense.',
      ],
      8: [
        'Perímetro: son asociaciones civiles, no grupos. Vélez 2021 se marcó "consolidado" por 4 menciones de la palabra (falso).',
        'Resultado financiero con RECPAM (resultado por inflación): Los Andes 2021 tiene netInterest 27,0 en producción que el estado no muestra como fila.',
        'Tipo de cambio: el anexo de moneda extranjera declara varios valores (Racing 2012: 4,7260 activo y 4,7660 pasivo).',
      ],
    },
  },
  {
    id: 'brasil', corto: 'BRA', nombre: 'Brasil', paises: ['Brasil'],
    marco: 'Normas brasileñas (CPC, ITG 2003 para entidades deportivas). "Demonstrações financeiras" con DRE; associação o SAF.',
    logica: {
      3: [
        'Consolidado y controladora en la MISMA tabla, en columnas: America Mineiro 2024 cargaba los dos. Producción usa el primero.',
        'Presupuesto en la misma tabla que el real ("ORÇADO"): Palmeiras 2025 tomó el presupuesto.',
        'Subtotales con nombre de rubro ("RECEITAS OPERACIONAIS", "DESPESAS FINANCEIRAS" con sus componentes abajo, Athletic Club 2024).',
      ],
      7: ['Jev 80% en el backtest (convenciones curadas por club, como Argentina).'],
      8: ['Nada propio medido todavía (sale del test de carga de los 159).'],
    },
  },
  {
    id: 'latam', corto: 'LAT', nombre: 'Latinoamérica NIIF', paises: ['Chile', 'Colombia', 'Perú', 'Ecuador', 'México'],
    marco: 'NIIF (IFRS) en moneda local, en miles (Chile M$). Colombia además con el plan de cuentas PUC.',
    logica: {
      3: [
        'La escala se dice una vez, en el encabezado de los estados, y las notas no la repiten (Atlético Nacional 2025, "en miles de pesos").',
        'Notas de segmentos que repiten el estado (Colo-Colo: ingresos 47.333 dos veces) y cuadros de movimiento ("Saldo inicial").',
        'Colombia: tablas PUC sin título de estado reconocible (Once Caldas 2024 quedaba sin rubros; con la Versión 321 Once Caldas 2016-2020 sí tienen).',
        'La selección toma partidas de balance como ingresos (Atlético Nacional 2025: "Ingresos recibidos por anticipado").',
      ],
      7: ['Colombia 90% en el backtest de Jev.'],
      8: [
        'Tipo de cambio: CLP sin serie local (27 documentos); el rango plausible de COP sin decidir (to-do 112).',
        'Período: Colo-Colo 2024 cita más el 31/12/2023 que su propio cierre y se marcaba con el nombre que no coincide.',
        'Universidad Católica: tabla con dos columnas de año, el tipo de cambio toma los dos ("855,86 | 844,69").',
      ],
    },
  },
  {
    id: 'iberica', corto: 'IBE', nombre: 'Ibérica', paises: ['España', 'Portugal'],
    marco: 'España: Plan General Contable (cuentas anuales, partidas "a) b) c)", euros con céntimos). Portugal: SNC.',
    logica: {
      4: ['Rayo Vallecano 2025: una página transcripta con separadores mezclados ("1.990,518,60", "3,155.611,58") que la validación dejó pasar.'],
      3: ['Notas en miles dentro de un documento en euros (Osasuna 2022: "Ingresos excepcionales 3.654" leído x1000).'],
      7: ['España 89% en el backtest de Jev. Sueldos con confianza baja de Claude (Osasuna "a) Sueldos, salarios y asimilados" 0,4).'],
      8: ['Real Madrid 2005-06: falta la cotización EUR de 2006-06-30; los gastos difieren 0,12 millones del total impreso (no es redondeo).'],
    },
  },
  {
    id: 'britanica', corto: 'GBR', nombre: 'Británica', paises: ['Inglaterra', 'Escocia'],
    marco: 'Cuentas anuales de Companies House (UK GAAP / FRS 102 o IFRS), en £\'000, con "player trading" separado.',
    logica: {
      3: [
        'La selección toma la conciliación del impuesto como estado de resultados (Leeds 2025: "Effect of expenses not deductible for tax").',
        'Una nota en £\'000 leída como millones (Arsenal 2025: gastos 10.077 en vez de 754).',
        'Interés de la nota y del estado contados dos veces (Sunderland 2025; la Versión 321 deja el resultado financiero entero).',
      ],
      7: ['Inglaterra 90% en el backtest de Jev.'],
      8: [
        'Convención de producción: "profit on disposal of players\' registrations" se carga como ingreso (Fulham).',
        'Tipo de cambio falso tomado del texto: "£0.6 million denominated in US dollars" (Arsenal).',
      ],
    },
  },
  {
    id: 'germanica', corto: 'GER', nombre: 'Germánica', paises: ['Alemania', 'Austria', 'Suiza'],
    marco: 'HGB (Alemania, Austria) y OR (Suiza): Jahresabschluss / Konzernabschluss, GuV numerada, euros con céntimos o TEUR.',
    logica: {
      3: [
        'La GuV tiene DOS columnas por año (sub-partidas y total de la partida): Werder 2024 perdía "1. Umsatzerlöse".',
        'Entra el Anlagenspiegel (cuadro de activo fijo) como si fuera resultado: RB Leipzig "Spielerwerte 547,9" categorizado como amortización.',
        'La prosa de la página dice "Mio. €" arriba de una tabla en euros (Eintracht 2024): no se puede leer la escala de la página entera.',
        'Hoffenheim 2025: la GuV del Konzern no quedaba marcada relevante (sin rubros).',
      ],
      7: ['Alemania 91% en el backtest de Jev. Amortización de intangibles con confianza baja (Werder, 0,5).'],
      8: ['Konzern o Einzelabschluss: producción a veces usa el HGB de la KGaA y no el consolidado (Dortmund).'],
    },
  },
  {
    id: 'benelux', corto: 'BNL', nombre: 'Benelux', paises: ['Bélgica', 'Países Bajos'],
    marco: 'Bélgica: cuentas anuales en el esquema del Banco Nacional (códigos por partida). Países Bajos: jaarrekening.',
    logica: {
      3: [
        'Bélgica: en las individuales la selección toma el BALANCE ("SCHULDEN 17/49", Antwerp 2017-2022) y no el resultado: quedan 3 filas.',
        'Países Bajos: consolidado y de la entidad en el mismo informe (PSV: "Totaalresultaat van de rechtspersoon" se abría en la nota equivocada).',
      ],
      7: [
        'Bélgica 93% en el backtest de Jev.',
        'Mismo renglón escrito distinto de un año a otro ("Vergoedingsommen" / "Vergoedingssommen"): lo resuelve la familia de etiquetas (Versión 321) si se conoce el lado.',
      ],
      8: ['PSV hereda "consolidado" de sus años cargados; la fila de impuestos sale entera ("Belastingen (22)").'],
    },
  },
  {
    id: 'nordica', corto: 'NOR', nombre: 'Nórdica', paises: ['Dinamarca', 'Noruega', 'Suecia', 'Finlandia'],
    marco: 'Årsrapport (DK) / årsregnskap (NO): resultatopgørelse/resultatregnskap, en coronas enteras o en miles.',
    logica: {
      3: [
        'El mismo estado impreso dos veces (Sandefjord 2019, págs. 2 y 6) y grupo + sociedad madre lado a lado (Brann 2018: konsern y morselskap).',
        'Balance que entraba como resultado ("Aktiver" / "Passiver", Vejle).',
      ],
      7: ['Dinamarca 95% en el backtest de Jev.'],
      8: [
        'Perímetro: "koncern" en el texto aunque producción carga la sociedad individual (Vejle 2014).',
        'DKK sin cotización salvo 2024-12-31 (9 documentos).',
      ],
    },
  },
  {
    id: 'este', corto: 'EST', nombre: 'Centro y Este de Europa', paises: ['República Checa', 'Croacia', 'Rusia', 'Ucrania', 'Serbia', 'Eslovaquia', 'Polonia'],
    marco: 'Formularios oficiales de estados financieros con código por fila (výkaz zisku a ztrát, formas rusas/ucranianas), y moneda propia o legado.',
    logica: {
      2: ['PDFs con texto en cirílico ilegible (mojibake) por fuentes sin mapa: hay que tratarlos como escaneo (Kolos Kovalivka).'],
      3: [
        'El título del estado está en el texto de la página y no en la tabla (Baník Ostrava 1997, Versión 312).',
        'Flujo de efectivo en croata que entraba como resultado ("Izvještaj o novčanim tokovima", Dinamo Zagreb).',
      ],
      7: ['Croacia 98% en el backtest de Jev.'],
      8: ['Croacia antes de 2023 está en HRK y el sitio no tiene la moneda legado (decisión pendiente, to-do 112).'],
    },
  },
  {
    id: 'mediterranea', corto: 'MED', nombre: 'Mediterránea', paises: ['Italia', 'Grecia', 'Turquía', 'Francia'],
    marco: 'Italia: bilancio con el esquema CEE (A valor de la producción, B costos). Grecia: IFRS e informes del directorio. Turquía: TFRS. Francia: informe agregado de la DNCG (no por club).',
    logica: {
      3: [
        'Italia: individual y consolidado del mismo club (Parma 2025) y estados de patrimonio en el medio.',
        'Grecia: los informes del directorio no tienen estado de resultados (Asteras 2021-2024: 1 fila).',
        'Turquía: la venta de pases dice "karı" (ganancia) y una regla de "fila de resultado" la descartaba (Fenerbahçe, Versión 321).',
        'Francia: el documento de la DNCG es de toda la liga, no de un club.',
      ],
      7: ['Nada propio medido todavía.'],
      8: ['Perímetros consolidados pendientes de decisión: Inter, Atalanta, Başakşehir, Trabzonspor (to-do 112).'],
    },
  },
  {
    id: 'asia', corto: 'ASI', nombre: 'Asia', paises: ['Japón', 'Corea del Sur', 'China'],
    marco: 'Japón: documento agregado de la J.League (todos los clubes). Corea: informes de auditoría K-IFRS.',
    logica: {
      3: ['Japón: 14 documentos y ninguno con estado de resultados reconocido (Admin/tests/test-vocabulario.md).'],
    },
  },
  {
    id: 'otros', corto: 'OTR', nombre: 'Otros', paises: [],
    marco: 'Países sin grupo propio todavía (Estados Unidos).',
    logica: {},
  },
];

const PAIS_A_GRUPO = new Map(GRUPOS.flatMap((g) => g.paises.map((p) => [p, g.id])));
// El país es la carpeta de Clubes/<País>/<Club>/ (CLAUDE.md, estructura de carpetas).
export const paisDe = (ruta) => String(ruta).split('/')[1] || '';
export const grupoDe = (ruta) => PAIS_A_GRUPO.get(paisDe(ruta)) || 'otros';
export const GRUPO = Object.fromEntries(GRUPOS.map((g) => [g.id, g]));

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const g of GRUPOS) console.log(`${g.corto}  ${g.nombre.padEnd(24)} ${g.paises.join(', ') || '(el resto)'}`);
}
