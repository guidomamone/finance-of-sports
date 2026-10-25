// ============================================================================
// tools/vocabulario-datos.mjs — la tabla del vocabulario contable por concepto y por idioma (datos); las funciones que la compilan y la consultan están en vocabulario.mjs
// Mudado de tools/vocabulario.mjs sin cambiar una línea (salvo `export`); tools/vocabulario.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================

import { VOCABULARIO_2 } from './vocabulario-datos-2.mjs';


// ---------------------------------------------------------------- EL VOCABULARIO, por concepto y por idioma
// Idiomas: es español, pt portugués, en inglés, de alemán, fr francés, it italiano, nl neerlandés, da danés, no noruego, sv sueco, fi finés,
// cs checo, sk eslovaco, pl polaco, hr croata/bosnio/serbio (latino), sr serbio (cirílico), sl esloveno, hu húngaro, ro rumano, bg búlgaro,
// el griego, tr turco, ru ruso, uk ucraniano, zh chino, ja japonés, ko coreano, ar árabe, he hebreo.
// Clave 'xx': términos de VARIOS idiomas agregados juntos por un mismo motivo (explicado en el comentario del concepto); no es un idioma.
export const IDIOMAS = ['es', 'pt', 'en', 'de', 'fr', 'it', 'nl', 'da', 'no', 'sv', 'fi', 'cs', 'sk', 'pl', 'hr', 'sr', 'sl', 'hu', 'ro', 'bg', 'el', 'tr', 'ru', 'uk', 'zh', 'ja', 'ko', 'ar', 'he'];

export const VOCABULARIO = {
  // ---- Título de un ESTADO DE RESULTADOS (o de recursos y gastos, o de ingresos y egresos). Se busca en la sección + columnas de una tabla
  // y en las líneas cortas (títulos) de la página. Incluye las formas gramaticales: nominativo/genitivo/plural ("výkaz zisku a ztráty" /
  // "zisků a ztrát"; "финансовые результаты" / "о финансовых результатах"; "фінансові результати" / "фінансових результатів").
  TITULO_RESULTADOS: {
    // "pérdidas y ganancias" suelto aparece en notas españolas ("imputación a pérdidas y ganancias", nota de impuestos de Atlético de Madrid):
    // esas formas no son un título.
    es: ['resultado*', 'cuenta de perdidas*', { re: '(?<!imputacion a )(?<!imputad[oa]s? a )(?<!imputad[oa]s? en )(?<!reconocid[oa]s? en )perdidas y ganancias' },
      'estado de ganancias y perdidas', 'recursos y gastos', 'recursos y erogaciones', 'estado de recursos',
      // NO "ingresos y gastos" suelto: en España el "Estado de ingresos y gastos reconocidos" es parte del estado de cambios en el patrimonio
      // neto, y "17. Ingresos y gastos" es una nota.
      'estado* de ingresos y egresos', 'cuadro* de ingresos y egresos', 'estado de actividades', 'estado de excedentes', { re: 'concepto (?:del )?(?:ingreso|gasto)' }],
    pt: ['demonstracao d* resultado*', 'rendimentos e gastos', 'rendimentos e perdas', 'gastos e perdas', 'demonstracao d* superavit*',
      'demonstracao d* deficit*', 'conta de resultados', 'demonstracao das receitas e despesas'],
    en: ['income statement*', 'statement* of income', 'profit and loss', 'profit or loss', 'comprehensive income', 'statement* of operations',
      'statement* of activities', 'income and expenditure', 'statement* of financial performance', 'revenue and expenditure', 'statement* of revenue*'],
    de: ['gewinn- und verlust*', 'guv', '*erfolgsrechnung*', '*ergebnisrechnung*', 'betriebsrechnung', 'aufwands- und ertragsrechnung'],
    fr: ['compte* de resultat*', 'compte* des resultats', 'compte de pertes et profits', 'etat du resultat*', 'compte d exploitation'],
    it: ['conto economico', 'rendiconto gestionale', 'rendiconto della gestione'],
    nl: ['winst- en verlies*', '*resultatenrekening*', 'staat van baten en lasten', 'exploitatierekening'],
    da: ['*resultatopgor*'],
    no: ['*resultatregnskap*'],
    sv: ['*resultatrakning*'],
    fi: ['tulos*'],
    cs: ['vykaz zisk*', 'zisk* a ztrat*', 'vysledovka'],
    sk: ['vykaz zisk* a strat*', 'vysledovka'],
    pl: ['rachunek zysk* i strat*', 'zysk* i strat*'],
    hr: ['racun dobit*', 'dobit* i gubit*', 'izvjestaj o dobit*', 'izvestaj o dobit*', 'bilans usp*ha', 'izvjestaj o sveobuhvatno* dobit*',
      'izvestaj o ostalom rezultatu'],
    sr: ['биланс успеха', 'извештај о осталом резултату'],
    sl: ['izkaz poslovnega izida', 'izkaz uspeha', 'izkaz vseobsegajocega donosa'],
    hu: ['eredmeny-kimutatas*'],
    ro: ['cont* de profit si pierdere', 'situatia rezultatului global'],
    bg: ['отчет за приходите и разходите', 'отчет за доходите', 'отчет за всеобхватния доход', 'отчет за печалбата или загубата'],
    el: ['αποτελεσμα*', 'συνολικ* εισοδημα*'],
    tr: ['gelir tablosu', 'kar veya zarar*', 'kar zarar*', 'kar ve zarar*', 'kapsamli gelir tablosu'],
    ru: ['финансов* результат*', 'прибыл* и убыт*', 'совокупн* доход*'],
    uk: ['фінансов* результат*', 'прибутк* та збитк*', 'звіт про сукупн* дохід*'],
    // CJK: el título seguido de una partícula es una mención en una oración ("손익계산서에 인식된 금액" = "importes reconocidos EN el estado de
    // resultados", nota de arrendamientos de FC Seoul), no el título del estado.
    zh: [{ re: '(?:利润表|损益表|損益表|综合收益表|收支表)(?!中)' }],
    ja: [{ re: '(?:損益計算書|収支計算書|正味財産増減計算書|活動計算書)(?![にのでへ])' }],
    ko: [{ re: '손익계산서(?![에의])' }],
    ar: ['قائمة الدخل', 'بيان الدخل', 'الارباح والخسائر', 'الارباح او الخسائر', 'قائمة الانشطة'],
    he: ['רווח והפסד', 'דוח על הפעילויות', 'דוחות על הפעילויות'],
  },

  // ---- Título que es SOLO la palabra del lado ("Recursos", "Gastos", "Revenues"): cuenta como estado de resultados solo si es el texto
  // ENTERO de la sección + columnas (una palabra suelta en una frase no dice nada).
  TITULO_SOLO: {
    es: ['recursos', 'gastos', 'ingresos', 'egresos'],
    pt: ['receitas', 'despesas'],
    en: ['revenue', 'revenues', 'expenses', 'income', 'expenditure'],
    de: ['ertrage', 'aufwendungen'],
    fr: ['produits', 'charges'],
    it: ['ricavi', 'costi'],
  },

  // ---- Palabras de INGRESOS / ventas / recursos. Dan el lado 'revenue' (de una tabla por su título y columnas, de una fila por su etiqueta)
  // y hacen "relevante" una tabla (extract-table-rows.mjs).
  INGRESOS: {
    // "venta(s)" / "vendas" / "ventes" / "πωλήσεις" NO cuentan dentro de "costo de ventas", "custo das vendas", "coût des ventes", "κόστος πωλήσεων"
    // (medido: sin esta exclusión "COSTO DE VENTAS" de Universidad Católica quedaba sin lado y sus filas heredaban el lado
    // 'revenue' de la tabla).
    es: ['ingres*', 'recurso*', 'recaudac*'],
    pt: ['receita*', 'rendiment*', { re: '(?<!custos? das )(?<!custos? de )(?<![\\p{L}\\p{N}])venda' }, 'faturamento*', 'proveito*'],
    en: ['revenue*', 'income*'],
    de: ['*umsatz*', { re: '(?<!v)ertr(?:ag|aeg)' }, '*erlose*', '*erloes*', '*einnahme*'],
    fr: ['produit*', 'recette*', 'chiffre d affaires', { re: '(?<!couts? des )(?<![\\p{L}\\p{N}])ventes(?![\\p{L}\\p{N}])' }],
    it: ['ricav*', 'provent*', 'vendit*', 'valore della produzione'],
    nl: ['*opbrengst*', '*omzet*', '*baten', 'inkomsten'],
    da: ['*indtaegt*', '*indtagt*', '*omsaetning*'],
    no: ['*inntekt*', '*omsetning*'],
    sv: ['*intakt*', '*intaekt*', '*omsattning*'],
    fi: ['tulot', 'tuotot', '*liikevaihto*', '*myyntituotot*'],
    cs: ['vynos*', 'trzb*', 'prodej*', 'prijm*'],
    sk: ['vynos*', 'trzb*', 'prijm*'],
    pl: ['przychod*', 'sprzedaz*'],
    hr: ['prihod*'],
    sr: ['приход*'],
    sl: ['prihod*'],
    hu: ['*bevetel*'],
    ro: ['venit*', 'cifra de afaceri'],
    bg: ['приход*', 'продажб*'],
    el: ['εσοδ*', { re: '(?<!κοστοσ )(?<![\\p{L}\\p{N}])πωλησ' }, 'κυκλος εργασιων'],
    // "Satışların maliyeti" (costo de ventas): 'satis' seguido de 'maliyet' no es ingreso.
    tr: ['gelir*', 'hasilat*', { re: '(?<![\\p{L}\\p{N}])satis(?!\\p{L}*[^\\p{L}\\p{N}]+maliyet)' }],
    ru: ['доход*', 'выручк*'],
    uk: ['дохід*', 'доход*', 'виручк*'],
    zh: ['收入', '收益', '营业额'],
    ja: ['収益', '収入', '売上'],
    // NO '매출' solo ('매출채권' = cuentas por cobrar) ni '수입' solo (también "importación").
    ko: ['수익', '매출액', '영업수익'],
    ar: ['ايراد', 'مبيعات'],
    he: ['הכנסות', 'הכנסה', 'מכירות'],
  },

  // ---- Palabras de ingreso que dicen el lado de una FILA pero NO hacen relevante una tabla ni dan el lado de una tabla entera: aparecen en
  // títulos de notas de balance ("Subvenciones, donaciones y legados", "Investments in subsidiaries", "Related party transactions: sales"),
  // y medido, sumarlas a la relevancia metía esas notas como rubros (Atlético de Madrid 70 -> 128, Mercedes F1 45 -> 77).
  INGRESOS_FILA: {
    es: ['subsidio*', 'subvenc*'], pt: ['subsidio*', 'subvenc*'], en: [{ re: '(?<!cost of )(?<![\\p{L}\\p{N}])sales(?![\\p{L}\\p{N}])' }, 'grant* receivable', 'subsidy', 'subsidies'],
    de: ['*zuschuss*', '*zuschuess*', '*zuschusse*'], fr: ['subvention*'], it: ['contribut* in conto esercizio'],
  },

  // ---- Palabras de ingreso que dicen el lado de una fila Y de una tabla, pero NO hacen relevante una tabla: 'turnover' aparece en la prosa
  // de las notas inglesas ("All turnover arose within the United Kingdom. 5. Operating loss ... stated after charging:") y volvía relevante la
  // tabla de gastos de abajo, con lado 'revenue' (Wolverhampton 2023-24). Antes tampoco estaba en la relevancia.
  INGRESOS_LADO: { en: ['turnover'] },

  // ---- Palabras de ingreso que hacen relevante una tabla y dicen el lado de una TABLA, pero NO el de una FILA suelta: "Cuotas entidades
  // deportivas" (cuotas que el club PAGA a la federación, gasto) y "Operacionales de venta" (gastos de ventas, Colombia) quedaban como
  // ingreso. Antes estaban en la relevancia y en el lado de la tabla, no en el de la fila.
  INGRESOS_TABLA: { es: [{ re: '(?<!cost[oe]s? de )(?<!cost[oe]s? de las )(?<![\\p{L}\\p{N}])venta' }, 'cuota*'] },

  // ---- Palabras de GASTOS / costos / egresos.
  GASTOS: {
    es: ['gasto*', 'egreso*', 'costo', 'costos', 'coste', 'costes', 'erogacion*', 'quebranto*'],
    pt: ['despesa*', 'custo', 'custos', 'gasto*', 'encargo*'],
    en: ['expens*', 'expenditure*', 'cost', 'costs', 'charges'],
    de: ['*aufwand*', '*aufwend*', '*kosten*', '*ausgabe*'],
    fr: ['charges', 'depense*', 'cout', 'couts'],
    it: ['costi', 'oneri', 'spese'],
    nl: ['*kosten*', '*lasten', 'uitgaven'],
    da: ['*omkostning*', '*udgift*'],
    no: ['*kostnad*', '*utgift*'],
    sv: ['*kostnad*', '*utgift*'],
    fi: ['*kulut', '*menot', 'kustannu*'],
    cs: ['naklad*', 'vydaj*'],
    sk: ['naklad*', 'vydavk*'],
    pl: ['koszt*', 'wydatk*'],
    hr: ['rashod*', 'trosk*', 'izdac*'],
    sr: ['расход*', 'трошк*'],
    sl: ['odhodk*', 'odhodek', 'strosk*'],
    hu: ['*raforditas*', '*koltseg*'],
    ro: ['cheltuiel*'],
    bg: ['разход*'],
    el: ['εξοδ*', 'δαπαν*', 'κοστ*'],
    tr: ['gider*', 'maliyet*', 'harcama*'],
    ru: ['расход*', 'затрат*', 'себестоимост*'],
    uk: ['витрат*', 'собівартіст*'],
    zh: ['费用', '費用', '支出', '成本'],
    ja: ['費用', '支出', '原価', '経費'],
    // NO '원가' solo: '상각후원가' = costo amortizado (notas de instrumentos financieros).
    ko: ['비용', '매출원가', '지출'],
    ar: ['مصروفات', 'مصاريف', 'تكاليف', 'تكلفة'],
    he: ['הוצאות', 'עלות', 'עלויות'],
  },

  // ---- IMPUESTOS: "Income tax", "Imposto sobre o rendimento", "Steuern vom Einkommen und vom Ertrag" tienen una palabra de ingreso adentro
  // (income/rendimento/Ertrag) pero son un GASTO (filas-rubro.mjs, ladoPorPalabras).
  IMPUESTOS: {
    es: ['impuesto*'], pt: ['imposto*', 'irpj', 'csll'], en: ['tax*'], de: ['*steuer*'], fr: ['impot*'], it: ['impost*'], nl: ['*belasting*'],
    da: ['skat', 'skatter', '*skat'], no: ['skatt', '*skatt'], sv: ['skatt', '*skatt', '*skatter'], fi: ['vero', 'verot', '*verot'],
    cs: ['dan', 'dane'], sk: ['dan', 'dane'], pl: ['podat*'], hr: ['porez*'], sr: ['порез*'], sl: ['davek', 'davk*'], hu: ['ado', '*adok'],
    ro: ['impozit*'], bg: ['данък*', 'данъц*'], el: ['φορο*', 'φορου*', 'φορων'], tr: ['vergi*'], ru: ['налог*'], uk: ['податок', 'податк*'],
    zh: ['所得税', '税金', '税费'], ja: ['法人税', '税金'], ko: ['법인세'], ar: ['ضريب'], he: ['מסים', 'מס הכנסה'],
  },

  // ---- RESULTADO al COMIENZO de una etiqueta de fila ("Resultado del ejercicio", "Ergebnis nach Steuern", "Výsledek hospodaření",
  // "Прибыль до налогообложения", "当期純利益"): la fila es un resultado/margen calculado, no un rubro (filas-rubro.mjs, RESULTADO_RE).
  // OJO: solo palabras que en ese idioma SON un resultado al principio de la etiqueta. "Pérdida por deterioro", "Verlies op vorderingen",
  // "Gewinne aus Transfers" son rubros: por eso "perdida", "winst", "gewinn" solos NO están acá, solo en frases.
  // El RESULTADO INTEGRAL ("Total comprehensive income", "Toplam Kapsamlı Gelir", "Сукупний дохід") también es un resultado: sin esto, un
  // renglón "Toplam Kapsamlı Gelir" (que ahora se reconoce como total por 'toplam') le daba lado 'revenue' a todo el estado de resultados de
  // arriba por la regla de posición (Trabzonspor 2021 y Fenerbahçe 2016, medido).
  RESULTADO_INICIO: {
    xx: ['total comprehensive*', 'comprehensive income*', 'other comprehensive*', 'total resultado*', 'total do resultado*', 'toplam kapsamli*',
      'kapsamli gelir*', 'diger kapsamli*', 'gesamtergebnis*', 'совокупн* доход*', 'совокупн* финансов* результат*', 'сукупн* дохід*',
      'інш* сукупн* дохід*', 'συγκεντρωτικ* συνολικ*', 'totale utile*', 'totale conto economico complessivo', 'resultat global*', 'total du resultat global'],
    // "utilidad" y "excedente" solo en frases: "Utilidad en venta de activos" (5 palabras) es un rubro colombiano y se descartaría.
    es: ['resultado*', 'ganancia*', 'superavit*', 'deficit*', 'margen*', 'utilidad neta', 'utilidad bruta', 'utilidad operacional', 'utilidad operativa',
      'utilidad antes*', 'utilidad del ejercicio', 'utilidad del periodo', 'utilidad perdida*', 'excedente del ejercicio', 'excedente neto', 'excedente bruto',
      'excedente operacional', 'perdida neta', 'perdida del ejercicio',
      'perdida del periodo', 'perdida bruta', 'perdida operacional', 'perdida antes*'],
    pt: ['resultado*', 'lucro*', 'superavit*', 'deficit*', 'prejuizo do exercicio', 'prejuizo liquido'],
    en: ['ebit', 'ebitda', 'ebt', 'gross profit*', 'gross margin*', 'gross result*', 'operating profit*', 'operating result*', 'operating income*',
      'operating loss*', 'net profit*', 'net income*', 'net loss*', 'net result*', 'net finance*', 'net financial*', 'profit before*', 'profit after*',
      'profit for*', 'loss for*', 'loss before*', 'loss after*', 'result', 'surplus*', 'deficit*', 'margin*'],
    de: ['ergebnis*', 'rohergebnis*', 'betriebsergebnis*', 'finanzergebnis*', 'jahresergebnis*', 'jahresueberschuss*', 'jahresuberschuss*',
      'jahresfehlbetrag*', 'bilanzgewinn*', 'bilanzverlust*'],
    fr: ['resultat*', 'benefice*', 'perte nette', 'perte de l exercice', 'excedent*'],
    it: ['risultato*', 'utile*', 'perdita d esercizio', 'perdita dell esercizio', 'avanzo*', 'disavanzo*'],
    nl: ['resultaat*', 'bedrijfsresultaat*', 'nettowinst*', 'winst voor*', 'winst na*', 'verlies voor*', 'verlies na*'],
    da: ['resultat*', 'arets resultat*', 'aarets resultat*', 'overskud*', 'underskud*', 'ordinaert*'],
    no: ['resultat*', 'arsresultat*', 'aarsresultat*', 'driftsresultat*', 'ordinaert*', 'netto finans*', 'finansresultat*', 'overskudd*', 'underskudd*'],
    sv: ['resultat*', 'arets resultat*', 'rorelseresultat*'],
    fi: ['tulos*', 'tilikauden tulos*', 'tilikauden voitto*', 'tilikauden tappio*', 'liikevoitto*', 'liiketappio*'],
    cs: ['zisk*', 'ztrata*', 'vysledek*'],
    sk: ['zisk*', 'strata*', 'vysledok*'],
    pl: ['zysk*', 'strata*', 'wynik*'],
    hr: ['dobit*', 'gubitak*', 'neto dobit*', 'neto gubit*'],
    sr: ['добит*', 'губитак*', 'нето добит*'],
    sl: ['cisti dobicek*', 'cista izguba*', 'poslovni izid*', 'dobicek*'],
    hu: ['eredmeny*', 'adozott eredmeny*', 'adozas elotti eredmeny*', 'uzemi eredmeny*', 'merleg szerinti eredmeny*'],
    ro: ['profitul*', 'pierderea*', 'rezultatul*'],
    bg: ['печалба*', 'загуба*', 'финансов резултат*', 'нетна печалба*'],
    el: ['αποτελεσμα*', 'αποτελεσματα*', 'μικτο*', 'κερδη*', 'ζημι*', 'καθαρ*'],
    tr: ['kar', 'zarar*', 'net donem kar*', 'donem kar*', 'brut kar*', 'faaliyet kar*', 'esas faaliyet kar*'],
    ru: ['результат*', 'прибыл*', 'убыт*', 'чистая*', 'валовая*'],
    // NO 'чистий' solo: "Чистий дохід від реалізації продукції" es la línea de INGRESOS de los formularios ucranianos.
    uk: ['результат*', 'прибут*', 'збит*', 'чистий прибут*', 'чистий збит*', 'чистий фінансов* результат*', 'валовий прибут*', 'валовий збит*', 'фінансов* результат*'],
    zh: ['净利润', '利润总额', '营业利润', '毛利', '净亏损', '亏损'],
    ja: ['当期純利益', '当期純損失', '経常利益', '経常損失', '営業利益', '営業損失', '税引前', '売上総利益', '当期正味財産増減額'],
    ko: ['당기순이익', '당기순손실', '영업이익', '영업손실', '법인세비용차감전', '매출총이익'],
    ar: ['صافي الربح', 'صافي الخسارة', 'الربح', 'الخسارة', 'ربح', 'خسارة'],
    he: ['רווח', 'הפסד'],
  },

  // ---- GANANCIA / PÉRDIDA en CUALQUIER parte de la etiqueta ("Profit/(loss) before net finance charges", "Share of ... operating loss"):
  // un subtotal así no dice de qué lado son sus sumandos (filas-rubro.mjs, ladosPorEstructura) y no se "abre" en una nota (proponer-carga).
  GANANCIA_PERDIDA: {
    es: ['*resultado*', '*superavit*', '*deficit*', '*margen*', '*beneficio*', '*perdida*', 'utilidad*', 'excedente*'],
    pt: ['*lucro*', '*prejuizo*', '*resultado*'],
    en: ['*profit*', '*loss', 'ebit', 'ebitda', '*margin*', '*surplus*', 'comprehensive income'], xx: ['kapsamli gelir*', 'сукупн* дохід*', 'совокупн* доход*'],
    de: ['*ergebnis*', '*gewinn*', '*verlust*', '*ueberschuss*', '*uberschuss*', '*fehlbetrag*'],
    fr: ['*resultat*', 'benefice*', 'perte', 'perte nette', 'excedent*'],
    it: ['*risultato*', '*utile*', 'perdita', 'avanzo', 'disavanzo'],
    nl: ['*winst*', '*verlies*', 'resultaat*'],
    da: ['*resultat*', '*overskud*', '*underskud*'], no: ['*resultat*', '*overskudd*', '*underskudd*'], sv: ['*resultat*', '*vinst*', '*forlust*'],
    fi: ['*tulos', '*voitto', '*tappio'],
    cs: ['zisk*', 'ztrat*', 'vysled*'], sk: ['zisk*', 'strata', 'straty', 'vysled*'], pl: ['zysk*', 'strata', 'straty', 'wynik*'],
    hr: ['dobit*', 'gubit*'], sr: ['добит*', 'губит*'], sl: ['dobicek*', 'izguba', 'izid*'], hu: ['*eredmeny*'],
    ro: ['profit*', 'pierdere*', 'pierderea*'], bg: ['печалб*', 'загуб*'], el: ['κερδ*', 'ζημι*', 'αποτελεσμ*'],
    tr: ['kar', 'kari', 'zarar*'], ru: ['прибыл*', 'убыт*', 'результат*'], uk: ['прибут*', 'збит*', 'результат*'],
    zh: ['利润', '亏损'], ja: ['利益', '損失', '損益'], ko: ['이익', '손실'], ar: ['ربح', 'خسار'], he: ['רווח', 'הפסד'],
  },

  // ---- Palabras de resultado que hacen RELEVANTE una tabla aunque su título no diga "estado de resultados" (extract-table-rows.mjs, heredado
  // de RELEVANT_KEYWORDS: 'regnskap' = "cuentas" en noruego, 'ergebnis', 'результат', 'zisk'...).
  RESULTADO_RELEVANTE: {
    es: ['resultado*'], de: ['*ergebnis*'], no: ['*regnskap*'], nl: ['*winst*', '*verlies*'], cs: ['zisk*', 'ztrat*', 'vysled*'], pl: ['wynik*'],
    tr: ['zarar*'], ru: ['результат*', 'прибыл*', 'убыт*'], uk: ['результат*', 'прибут*', 'збит*'], en: ['*sponsor*'],
    zh: ['利润', '营业'], ja: ['損益', '営業'], ko: ['손익'],
  },

  // ---- TOTAL / subtotal al COMIENZO de la etiqueta ("Total ingresos", "Sum driftsinntekter", "Итого по разделу", "Toplam", "合計").
  TOTAL_INICIO: {
    es: ['total*', 'sub-total*', 'suma', 'sumas'], pt: ['total*', 'sub-total*', 'soma'], en: ['total*', 'sub-total*', 'sum'],
    de: ['gesamt*', 'summe*', 'insgesamt'], fr: ['total*', 'sous-total*'], it: ['total*', 'subtotal*'], nl: ['totaal*', 'subtotaal*'],
    da: ['i alt', 'sum'], no: ['sum', 'totalt'], sv: ['summa*', 'totalt'], fi: ['yhteensa'],
    cs: ['celkem', 'soucet'], sk: ['spolu', 'celkom', 'sucet'], pl: ['razem', 'ogolem', 'suma'], hr: ['ukupn*', 'svega'], sr: ['укупн*', 'свега'],
    sl: ['skupaj', 'skupno'], hu: ['osszes*'], ro: ['total*'], bg: ['общо', 'всичко'], el: ['συνολ*'], tr: ['toplam*'],
    ru: ['итог*', 'всего'], uk: ['разом', 'усього', 'всього', 'підсумок*'],
    zh: ['合计', '总计', '小计', '總計', '合計', '小計'], ja: ['合計', '小計', '総計'], ko: ['합계', '총계', '소계'],
    ar: ['المجموع', 'مجموع', 'اجمالي', 'الاجمالي'], he: ['סה"כ', 'סך הכל', 'סך'],
  },

  // ---- TOTAL al FINAL de la etiqueta: idiomas que ponen el "total" después ("Tržby celkem", "Indtægter i alt", "Liikevaihto yhteensä",
  // "Bevételek összesen", "Gelirler toplamı", "Receitas totais", "Ingresos totales", "Доходы всего").
  TOTAL_FIN: {
    es: ['totales'], pt: ['totais'], en: ['total'], de: ['insgesamt', 'gesamt'], da: ['i alt'], no: ['i alt', 'totalt'], sv: ['totalt', 'summa'],
    fi: ['yhteensa'], cs: ['celkem'], sk: ['spolu', 'celkom'], pl: ['razem', 'ogolem'], hr: ['ukupno', 'svega'], sr: ['укупно'], sl: ['skupaj'],
    hu: ['osszesen'], bg: ['общо'], tr: ['toplami'], ru: ['итого', 'всего'], uk: ['разом', 'усього', 'всього'],
    zh: ['合计', '总计', '合計'], ja: ['合計'], ko: ['합계', '총계', '소계'], ar: ['الاجمالي'],
  },

  // ---- SIGNO DE UNA FILA DEL FINANCIERO POR SU RÓTULO (escalón 2 de la compuerta del resultado en verificar.mjs). Un documento
  // puede imprimir los intereses cobrados y los pagados los dos en positivo (Volos 2021-2025: "Πιστωτικοί τόκοι" y "Χρεωστικοί τόκοι"); el
  // rótulo dice cuál suma y cuál resta. Una fila que matchea los dos (o ninguno) queda con su signo impreso.
  FIN_INGRESO: {
    es: ['ingresos financieros', 'ingreso financiero', 'intereses ganados', 'intereses cobrados', 'rendimientos financieros'],
    pt: ['receitas financeiras', 'receita financeira', 'rendimentos financeiros', 'juros ativos', 'juros recebidos', 'juros auferidos', 'rendimentos similares obtidos'],
    en: ['finance income', 'financial income', 'interest income', 'interest receivable', 'interest received', 'investment income'],
    de: ['zinsertrage', 'zinsen und ahnliche ertrage', 'finanzertrage', 'finanzertrag'], fr: ['produits financiers'],
    it: ['proventi finanziari', 'interessi attivi'], nl: ['financiele baten', 'rentebaten', 'financiele opbrengsten'],
    // noruego en singular: cubre el plural ("finansinntekt" está dentro de "finansinntekter"); ver FIN_GASTO.
    da: ['finansielle indtaegter', 'renteindtaegter'], no: ['finansinntekt', 'renteinntekt', 'finansielle inntekter', 'inntekt pa investering'],
    sv: ['finansiella intakter', 'ranteintakter'], hr: ['financijski prihodi', 'prihodi od kamata'], cs: ['financni vynosy', 'vynosove uroky'],
    pl: ['przychody finansowe'], tr: ['finansman gelirleri', 'finansal gelirler', 'faiz gelirleri'],
    el: ['πιστωτικοι τοκοι', 'χρηματοοικονομικα εσοδα', 'εσοδα τοκων'], ru: ['проценты к получению', 'финансовые доходы'], ja: ['受取利息', '金融収益'],
  },
  FIN_GASTO: {
    es: ['gastos financieros', 'gasto financiero', 'intereses pagados', 'costos financieros', 'costes financieros'],
    pt: ['despesas financeiras', 'despesa financeira', 'juros passivos', 'juros pagos', 'encargos financeiros', 'gastos similares suportados'],
    en: ['finance costs', 'finance cost', 'financial expense*', 'financial costs', 'interest expense', 'interest payable', 'interest paid'],
    // el esquema NBB belga: "Financiële kosten" (65/66B), "Recurrente/Andere financiële kosten",
    // "Kosten van schulden" (650) y en francés "Charges des dettes" se imprimen positivos; con el rótulo, verificar.mjs les pone el signo
    // (escalón "financiero por rótulo"). Caso: Beerschot 2025 cierra exacto sin sus ajustes `fila` de signo. Medido: 376 documentos, 375 idénticos.
    de: ['zinsaufwand', 'zinsaufwendungen', 'zinsen und ahnliche aufwendungen', 'finanzaufwand', 'finanzaufwendungen'], fr: ['charges financieres', 'charges des dettes'],
    it: ['oneri finanziari', 'interessi passivi'], nl: ['financiele lasten', 'rentelasten', 'financiele kosten', 'kosten van schulden'],
    // el formato noruego NRS imprime los costos financieros en positivo y en SINGULAR: "Annen
    // finanskostnad", "Annen rentekostnad", "Rentekostnad". Con el plural solo, no se reconocían y se sumaban como ingreso financiero. El
    // singular cubre el plural. Casos: Viking AS 2025 L296 y Fredrikstad FLI 2018 L545 cierran exacto sin ajustes; Vålerenga AS 2025 L123,
    // Aalesund AS 2025 L593-594 y Sarpsborg 08 FLI 2025 L1383-1384 dejan de dar "no cierra".
    da: ['finansielle omkostninger', 'renteudgifter'], no: ['finanskostnad', 'rentekostnad', 'finansielle kostnader', 'nedskrivning av finansielle'],
    sv: ['finansiella kostnader', 'rantekostnader'], hr: ['financijski rashodi', 'rashodi od kamata'], cs: ['financni naklady', 'nakladove uroky'],
    pl: ['koszty finansowe'], tr: ['finansman giderleri', 'finansal giderler', 'faiz giderleri'],
    el: ['χρεωστικοι τοκοι', 'χρηματοοικονομικα εξοδα', 'εξοδα τοκων'], ru: ['проценты к уплате', 'финансовые расходы'], ja: ['支払利息', '金融費用'],
  },

  // ---- "DE LOS CUALES" al comienzo de una etiqueta: la fila es una PARTE de la de arriba, no un renglón más.
  // Caso: Bélgica, esquema abreviado, "Waarvan: niet-recurrente bedrijfsopbrengsten" (76A) debajo de la Brutomarge (Lierse SK 2025, L256).
  DE_LOS_CUALES: {
    es: ['de los cuales', 'de las cuales', 'del cual', 'de la cual'], pt: ['dos quais', 'das quais'], en: ['of which'], de: ['davon'],
    fr: ['dont'], it: ['di cui'], nl: ['waarvan'], da: ['heraf'], no: ['herav'], sv: ['varav'],
  },

  // ---- TOTAL DE INGRESOS al comienzo de una etiqueta (proponer-carga.mjs: detecta la fila del total de ingresos del documento).
  TOTAL_INGRESOS: {
    es: ['total de ingresos', 'total ingresos', 'total de recursos', 'total recursos', 'ingresos totales', 'recursos totales', 'ingresos de actividades ordinarias'],
    pt: ['total de receitas', 'total receitas', 'receita* liquida*', 'receita* bruta*', 'receita* operaciona* liquida*', 'receita* operaciona* bruta*', 'receitas totais'],
    en: ['total revenue*', 'total income', 'total operating revenue*', 'total turnover', 'revenue*', 'turnover', 'net sales'],
    de: ['umsatzerlose', 'umsatzerloese', 'gesamtertrage', 'gesamtertraege', 'gesamtleistung', 'summe ertrage', 'summe der ertrage', 'betriebsertrag*'],
    fr: ['chiffre d affaires', 'total des produits', 'produits d exploitation', 'total produits'],
    it: ['ricavi totali', 'totale ricavi', 'totale proventi', 'valore della produzione', 'total ricavi', 'total proventi'],
    nl: ['netto-omzet', 'totaal opbrengsten', 'total opbrengsten', 'totaal baten', 'som der bedrijfsopbrengsten'],
    da: ['nettoomsaetning', 'omsaetning', 'indtaegter i alt'], no: ['sum inntekter', 'sum driftsinntekter'],
    sv: ['nettoomsattning', 'summa intakter', 'summa rorelsens intakter'], fi: ['liikevaihto', 'tuotot yhteensa'],
    // checo/eslovaco: "Tržby z prodeje..." / "Tržby za prodej zboží" son COMPONENTES en el formulario oficial, no el total.
    cs: ['vynosy celkem'], sk: ['vynosy spolu'], pl: ['przychody ogolem', 'przychody netto*', 'przychody razem'],
    hr: ['ukupni prihodi', 'prihodi ukupno', 'poslovni prihodi', 'ukupno prihodi'], sr: ['пословни приходи', 'укупни приходи'],
    sl: ['cisti prihodki od prodaje', 'prihodki skupaj', 'kosmati donos*'], hu: ['ertekesites netto arbevetele', 'osszes bevetel'],
    ro: ['cifra de afaceri*', 'venituri totale', 'total venituri'], bg: ['нетни приходи*', 'общо приходи', 'приходи общо'],
    el: ['κυκλος εργασιων', 'συνολο εσοδων'], tr: ['hasilat', 'satis gelirleri', 'toplam gelir*', 'net satislar'],
    ru: ['выручка*', 'доходы всего', 'итого доходов'], uk: ['чистий дохід*', 'виручка*', 'разом доход*'],
    zh: ['营业收入', '营业总收入', '收入合计', '营业额'], ja: ['売上高', '営業収益', '経常収益', '収益合計'], ko: ['매출액', '영업수익', '수익합계'],
    ar: ['اجمالي الايرادات', 'مجموع الايرادات', 'الايرادات'], he: ['סך הכנסות', 'סך ההכנסות', 'הכנסות'],
  },

  // ---- RESULTADO DEL EJERCICIO al comienzo de una etiqueta (proponer-carga.mjs: la fila del resultado final del documento).
  RESULTADO_EJERCICIO: {
    es: ['resultado del ejercicio', 'resultado neto', 'utilidad neta', 'utilidad del ejercicio', 'perdida neta', 'perdida del ejercicio', 'excedente del ejercicio', 'superavit*', 'deficit*'],
    pt: ['resultado do exercicio', 'resultado liquido do exercicio', 'resultado do periodo', 'resultado liquido do periodo', 'lucro liquido*', 'prejuizo do exercicio', 'prejuizo liquido*', 'superavit*', 'deficit*'],
    en: ['profit*', 'net profit*', 'net income*', 'net loss*', 'loss for the year', 'loss for the period', 'net result*'],
    de: ['jahresueberschuss*', 'jahresuberschuss*', 'jahresfehlbetrag*', 'jahresergebnis*'],
    fr: ['resultat*', 'benefice net', 'perte nette'], it: ['utile*', 'risultato netto', 'risultato d esercizio', 'risultato dell esercizio', 'perdita d esercizio', 'perdita dell esercizio'],
    nl: ['nettoresultaat', 'netto resultaat', 'resultaat na belasting*', 'nettowinst', 'totaalresultaat*', 'resultaat boekjaar', 'resultaat van het boekjaar'], da: ['arets resultat', 'aarets resultat', 'resultat*', 'arets overskud', 'arets underskud'],
    no: ['arsresultat*', 'aarsresultat*', 'resultat*'], sv: ['arets resultat*', 'resultat*'], fi: ['tilikauden tulos', 'tilikauden voitto', 'tilikauden tappio'],
    cs: ['vysledek hospodareni za ucetni obdobi', 'vysledek hospodareni po zdaneni'], sk: ['vysledok hospodarenia za uctovne obdobie', 'vysledok hospodarenia po zdaneni'],
    pl: ['zysk netto', 'strata netto', 'zysk (strata) netto'], hr: ['neto rezultat', 'dobit*', 'gubitak', 'dobit razdoblja', 'gubitak razdoblja', 'neto dobit*'],
    sr: ['нето добитак', 'нето губитак'], sl: ['cisti dobicek*', 'cista izguba*'], hu: ['adozott eredmeny', 'merleg szerinti eredmeny'],
    ro: ['profitul net', 'pierderea neta', 'rezultatul net*'], bg: ['нетна печалба', 'нетна загуба'], el: ['καθαρα κερδη', 'καθαρες ζημιες'],
    tr: ['net donem kar*', 'donem net kar*', 'net donem zarar*', 'donem net zarar*'], ru: ['чистая прибыль', 'чистый убыток'],
    uk: ['чистий прибуток', 'чистий збиток', 'чистий фінансовий результат'], zh: ['净利润', '净亏损'], ja: ['当期純利益', '当期純損失'],
    ko: ['당기순이익', '당기순손실'], ar: ['صافي الربح', 'صافي الخسارة'], he: ['רווח נקי', 'הפסד נקי'],
  },

  ...VOCABULARIO_2, // desde FLUJO_EFECTIVO: tools/vocabulario-datos-2.mjs
};

// Todos los términos de un concepto (todos los idiomas, o solo algunos).
