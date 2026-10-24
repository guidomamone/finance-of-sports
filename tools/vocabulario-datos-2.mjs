// ============================================================================
// tools/vocabulario-datos-2.mjs — la segunda mitad de la tabla del vocabulario contable (flujo de efectivo, patrimonio, balance, notas); la primera y las funciones que la
// consultan están en vocabulario-datos.mjs, que la incluye al final de VOCABULARIO. Mudada sin cambiar una línea (salvo el `export const` que la envuelve).
// ============================================================================

export const VOCABULARIO_2 = {
  // ---- Estado de FLUJO DE EFECTIVO (no tiene rubros de ingresos/gastos para el sitio, pero sus filas dicen "resultado", "amortizaciones").
  FLUJO_EFECTIVO: {
    es: ['flujo* de efectivo', 'flujo* de fondos', 'flujo* de caja', 'origen y aplicacion de fondos'],
    pt: ['fluxo* de caixa'], en: ['cash-flow*'], de: ['*kapitalflussrechnung*', '*geldflussrechnung*', '*mittelflussrechnung*', 'cashflow*'],
    fr: ['flux de tresorerie', 'tableau des flux*'], it: ['flusso di cassa', 'flussi di cassa', 'rendiconto finanziario'], nl: ['kasstroom*'],
    da: ['*pengestrom*'], no: ['kontantstrom*'], sv: ['kassaflode*'], fi: ['rahoituslaskelma', 'kassavirta*'],
    cs: ['penezn* tok*', 'penezn* toc*'], sk: ['penazn* tok*', 'penazn* toc*'], pl: ['przeplyw* pienie*', 'rachunek przeplywow'],
    hr: ['novcan* tok*', 'novcan* tijek*'], sr: ['новчан* ток*'], sl: ['denarn* tok*'], hu: ['penzforgalm*'], ro: ['flux* de numerar', 'flux* de trezorerie'],
    bg: ['паричн* поток*'], el: ['ταμειακ* ρο*'], tr: ['nakit akis*', 'nakit akim*'], ru: ['движени* денежн*', 'денежн* поток*'],
    uk: ['рух грошов*', 'грошов* поток*'], zh: ['现金流量', '現金流量'], ja: ['キャッシュ・フロー', 'キャッシュフロー', '資金収支計算書'],
    ko: ['현금흐름'], ar: ['التدفقات النقدية', 'تدفقات نقدية'], he: ['תזרים מזומנים', 'תזרימי מזומנים', 'תזרים המזומנים'],
  },

  // ---- Estado de CAMBIOS EN EL PATRIMONIO (evolución del patrimonio neto).
  CAMBIOS_PATRIMONIO: {
    es: ['cambios en el patrimonio', 'evolucion del patrimonio', 'variacion* del patrimonio', 'variacion* en el patrimonio', 'cambios en el capital'],
    pt: ['mutacoes do patrimonio', 'mutacoes no patrimonio', 'mutacoes do patrimonio liquido', 'alteracoes no capital proprio', 'alteracoes nos capitais proprios'],
    en: ['changes in equity', 'changes in net assets', 'changes in shareholders* equity', 'changes in members* funds', 'movement* in reserves'],
    de: ['*eigenkapitalveranderung*', '*eigenkapitalveraenderung*', '*eigenkapitalspiegel*', 'entwicklung des eigenkapitals'],
    fr: ['variation* des capitaux propres'], it: ['variazioni del patrimonio', 'variazioni di patrimonio'],
    nl: ['verloop van het eigen vermogen', 'mutatieoverzicht eigen vermogen', 'mutaties in het eigen vermogen'],
    da: ['egenkapitalopgorelse*'], no: ['egenkapitaloppstilling*', 'endring* i egenkapital*'], sv: ['forandring* i eget kapital'],
    fi: ['oman paaoman muutok*', 'oman paaoman muutos*'], cs: ['zmen* vlastniho kapitalu', 'zmenach vlastniho kapitalu'],
    sk: ['zmen* vo vlastnom iman*', 'zmen* vlastneho imania'], pl: ['zmian* w kapitale wlasnym', 'zestawienie zmian w kapitale*'],
    hr: ['promjen* kapital*', 'promjen* u kapital*', 'promjen* glavnice', 'promen* na kapital*'], sr: ['промен* на капитал*'],
    sl: ['spremem* lastnisk* kapital*'], hu: ['sajat toke valtozas*'], ro: ['modificar* capitalur* propri*'], bg: ['промен* в собствения капитал'],
    el: ['μεταβολ* ιδιων κεφαλαιων'], tr: ['ozkaynak degisim*', 'ozkaynaklar degisim*'], ru: ['собственного капитала', 'изменени* капитала'],
    uk: ['власного капіталу'], zh: ['所有者权益变动', '股东权益变动', '權益變動'], ja: ['株主資本等変動', '純資産変動'], ko: ['자본변동'],
    ar: ['التغيرات في حقوق', 'التغير في حقوق'], he: ['שינויים בהון'],
  },

  // ---- Primeras filas de un cuadro de MOVIMIENTOS de saldos (saldo inicial -> altas/bajas -> saldo final): no es un estado de resultados.
  SALDO_INICIAL: {
    es: ['saldo inicial', 'saldo al inicio', 'saldos al inicio'], pt: ['saldo inicial', 'saldos iniciais'],
    en: ['opening balance*', 'balance at the beginning', 'balance at beginning', 'at beginning of'], de: ['anfangsbestand', 'stand am anfang'],
    fr: ['solde a l ouverture', 'solde d ouverture', 'solde au debut'], it: ['saldo iniziale'], nl: ['beginsaldo', 'stand begin'],
    cs: ['stav k pocatku', 'pocatecni stav', 'pocatecni zustatek'], sk: ['pociatocny stav', 'zostatok na zaciatku'], pl: ['bilans otwarcia', 'stan na poczatek'],
    hr: ['pocetno stanje', 'stanje na pocetku'], ro: ['sold initial', 'sold la inceputul'], tr: ['donem basi bakiye*', 'acilis bakiye*'],
    ru: ['остаток на начало', 'сальдо на начало'], uk: ['залишок на початок'], bg: ['начално салдо', 'салдо в началото'],
  },

  // ---- Títulos de BALANCE (situación patrimonial). Los usa caja-deuda.mjs para encontrar el balance; para excluir tablas no
  // (proponer-carga.mjs tiene su propia NO_PL_RE, más amplia).
  TITULO_BALANCE: {
    es: ['balance general', 'estado de situacion*', 'balance de situacion'], pt: ['balanco patrimonial', 'demonstracao da posicao financeira', 'balanco'],
    en: ['balance sheet*', 'statement* of financial position'], de: ['bilanz'], fr: ['bilan'], it: ['stato patrimoniale'], nl: ['balans'],
    no: ['balanse'], sv: ['balansrakning'], fi: ['tase'], et: ['bilanss'], // et: (Estonia: "Bilanss") cs: ['rozvaha'], sk: ['suvaha'], pl: ['bilans'], hr: ['bilanca*', 'bilans stanja'],
    sr: ['биланс стања'], sl: ['bilanca stanja'], hu: ['merleg'], ro: ['bilant*'], bg: ['счетоводен баланс'], el: ['ισολογισμ*'],
    tr: ['bilanco', 'finansal durum tablosu'], ru: ['бухгалтерский баланс', 'баланс'], uk: ['баланс', 'звіт про фінансовий стан'],
    zh: ['资产负债表', '資產負債表'], ja: ['貸借対照表'], ko: ['재무상태표', '대차대조표'], ar: ['الميزانية العمومية', 'قائمة المركز المالي'], he: ['מאזן'],
  },

  // ---- CAJA y DEUDA FINANCIERA del balance. Al comienzo de una etiqueta. Caja: lo que el sitio
  // guarda en fiscalYearMeta.cash. Deuda financiera: el criterio por defecto de grossDebt para un club sin precedente (club-data-mapping/referencia/formato-simplificado.md, "grossDebt", ok de Guido): préstamos y obligaciones bancarias/financieras, corriente + no corriente; NUNCA el total del pasivo.
  CAJA: {
    es: ['efectivo y equivalente*', 'caja y banco*', 'caja y equivalente*', 'disponibilidades', 'caja'], pt: ['caixa e equivalente*', 'disponibilidades', 'caixa e bancos', 'caixa e depositos bancarios'], // el último: rubro del formato SNC (to-do caja y deuda; 135 de 186 documentos de Portugal)
    en: ['cash and cash equivalent*', 'cash at bank*', 'cash and bank*', 'cash'], de: ['flussige mittel', 'kassenbestand*', 'guthaben bei kreditinstitut*', 'liquide mittel'],
    fr: ['tresorerie et equivalent*', 'disponibilites'], it: ['disponibilita liquide', 'cassa e disponibilita*'], nl: ['liquide middelen', 'geldmiddelen'], et: ['raha'], // et: ("Raha", Tallinna Kalev 2019 L90)
    da: ['likvide beholdninger', 'likvide midler'], no: ['bankinnskudd*', 'kontanter og bankinnskudd'], sv: ['kassa och bank', 'likvida medel'],
  },
  DEUDA_FINANCIERA: {
    es: ['prestamo*', 'otros pasivos financieros', 'pasivos financieros', 'deudas bancarias*', 'deudas financieras', 'obligaciones financieras', 'obligaciones con bancos*', 'deudas con entidades de credito'],
    pt: ['emprestimo*', 'financiamento*', 'emprestimos e financiamentos', 'mutuo*', 'dividas a instituicoes de credito*'], // mutuo: (Novorizontino, préstamo de I-9 Sports); dívidas a instituições de crédito: la deuda bancaria del formato POC
    // la lista `en` había quedado DENTRO del comentario de arriba : ningún balance en inglés encontraba su
    // deuda por diccionario. Más los términos del formato italiano en inglés (Juventus: "Due to banks" 2005-2006, "Loans and other
    // financial payables/liabilities" 2007 y 2011-2021, "Bonds and other financial liabilities" 2008-2010).
    en: ['borrowings', 'bank loans*', 'loans and borrowings', 'bank overdraft*', 'loans', 'due to banks', 'loans and other financial*', 'bonds and other financial liabilities'],
    de: ['verbindlichkeiten gegenuber kreditinstitut*', 'darlehen', 'finanzverbindlichkeiten'], fr: ['emprunts*', 'dettes financieres'],
    // italiano: además de banche, las obligaciones y los préstamos de socios (cuentan como deuda,
    // decisión). Con solo banche la compuerta aceptaba el error porque el vecino lo repetía (Bologna 2025: 19,36 M de banche
    // contra 28,59 M con soci 9.235.000, .md L1033-1035). "altri finanziatori" NO entra: es factoring, que en Monza 2024 no es deuda y en
    // Genoa 2022 sí (medido: metía un error nuevo en Monza 2024).
    it: ['debiti verso banche', 'debiti finanziari', 'obbligazioni*', 'debiti verso soci per finanziament*'], nl: ['schulden aan kredietinstellingen', 'leningen'], da: ['gaeld til kreditinstitutter', 'bankgaeld'],
    no: ['gjeld til kredittinstitusjoner', 'banklan'], sv: ['skulder till kreditinstitut', 'banklan'],
    // estonio: sin "Bilanss", "Raha" ni "Laenukohustised" ninguna fila estonia era del balance y
    // caja-deuda escribía 0 de 126 datos ("sin páginas de balance"). Medido con los 9 clubes de la principal: de 2 a 32 datos; --medir idéntico.
    et: ['laenukohustised'],
  },

  // ---- TOTAL DEL ACTIVO y TOTAL DEL PASIVO (+ patrimonio) al comienzo de una etiqueta. Para chequeos-gratis.mjs (activo = pasivo + patrimonio);
  // hoy esa tool tiene sus propias ACTIVO_RE / PASIVO_RE (no se editó): estas listas las amplían.
  TOTAL_ACTIVO: {
    es: ['total del activo', 'total de activo', 'total activo*', 'activo total'], pt: ['total do ativo', 'total ativo', 'ativo total'],
    en: ['total assets'], de: ['summe aktiva', 'aktiva gesamt', 'bilanzsumme', 'summe der aktiva'], fr: ['total de l actif', 'total actif', 'actif total'],
    it: ['totale attivo', 'totale dell attivo', 'attivo totale'], nl: ['totaal activa', 'totaal der activa', 'balanstotaal'],
    da: ['aktiver i alt', 'aktiver ialt'], no: ['sum eiendeler', 'eiendeler i alt'], sv: ['summa tillgangar'], fi: ['vastaavaa yhteensa'],
    cs: ['aktiva celkem'], sk: ['spolu majetok', 'aktiva spolu', 'majetok spolu'], pl: ['aktywa razem', 'suma aktywow'], hr: ['ukupna aktiva', 'ukupno aktiva', 'ukupna imovina'],
    sr: ['укупна актива', 'пословна имовина'], sl: ['sredstva skupaj'], hu: ['eszkozok osszesen', 'eszkozok (aktivak) osszesen'], ro: ['total active'],
    bg: ['сума на актива', 'общо активи'], el: ['συνολο ενεργητικου'], tr: ['toplam varlik*', 'varliklar toplami'],
    ru: ['итого актив*', 'баланс'], uk: ['баланс', 'усього активів'], zh: ['资产总计', '資產總計'], ja: ['資産合計', '資産の部合計'], ko: ['자산총계'],
    ar: ['مجموع الموجودات', 'اجمالي الاصول', 'مجموع الاصول'], he: ['סך הנכסים', 'סה"כ נכסים'],
  },
  TOTAL_PASIVO: {
    es: ['total del pasivo', 'total pasivo*', 'total de pasivo', 'total pasivo y patrimonio*', 'total pasivo mas patrimonio*', 'total patrimonio neto y pasivo'],
    pt: ['total do passivo', 'total passivo', 'total do passivo e patrim*', 'total passivo e patrim*'],
    en: ['total liabilities and*', 'total equity and liabilities'], de: ['summe passiva', 'passiva gesamt', 'summe der passiva'],
    fr: ['total du passif', 'total passif', 'passif total'], it: ['totale passivo', 'totale del passivo', 'totale passivo e patrimonio netto'],
    nl: ['totaal passiva', 'totaal der passiva'], da: ['passiver i alt', 'passiver ialt'], no: ['sum egenkapital og gjeld'], sv: ['summa eget kapital och skulder'],
    fi: ['vastattavaa yhteensa'], cs: ['pasiva celkem'], sk: ['spolu vlastne imanie a zavazky', 'pasiva spolu'], pl: ['pasywa razem', 'suma pasywow'],
    hr: ['ukupna pasiva', 'ukupno pasiva', 'ukupno kapital i obveze'], sr: ['укупна пасива'], sl: ['obveznosti do virov sredstev skupaj', 'viri sredstev skupaj'],
    hu: ['forrasok osszesen', 'forrasok (passzivak) osszesen'], ro: ['total capitaluri proprii si datorii'], bg: ['сума на пасива', 'общо собствен капитал и пасиви'],
    el: ['συνολο παθητικου', 'συνολο ιδιων κεφαλαιων και υποχρεωσεων'], tr: ['toplam kaynak*', 'kaynaklar toplami'],
    ru: ['итого пассив*', 'баланс'], uk: ['баланс', 'усього пасивів'], zh: ['负债和所有者权益总计', '负债和股东权益总计', '負債及權益總計'],
    ja: ['負債純資産合計', '負債及び純資産合計', '負債・純資産合計'], ko: ['부채와자본총계', '부채및자본총계'],
    ar: ['مجموع المطلوبات وحقوق', 'اجمالي الخصوم وحقوق'], he: ['סך ההתחייבויות וההון', 'סה"כ התחייבויות והון'],
  },

  // ---- Encabezado de la columna de NOTAS / anexo / código de fila: NO es la columna de importes (filas-rubro.mjs, columnaDeImportes).
  // NOTAS_ENTERO: el encabezado ENTERO es esto (abreviaturas cortas que como palabra suelta dirían otra cosa: "no", "ref", "код").
  NOTAS_ENTERO: {
    es: ['nota', 'notas', 'anexo', 'anexos', 'ref', 'ref.', 'nº', 'n°', 'no', 'no.', 'n.o'], pt: ['nota', 'notas', 'nota explicativa', 'ne'],
    en: ['note', 'notes', 'nr', 'nr.', 'ref', 'ref.', 'no', 'no.'], de: ['anhang', 'anm', 'anm.', 'tz', 'tz.', 'ziffer'], fr: ['note', 'notes', 'annexe'],
    it: ['nota', 'note', 'allegato'], nl: ['noot', 'toel', 'toel.', 'toelichting'], da: ['note', 'noter'], no: ['note', 'noter'], sv: ['not', 'noter'],
    fi: ['liite', 'liitetieto'], cs: ['pozn', 'pozn.', 'poznamka', 'c. r.', 'radek', 'cis. rad.', 'oznaceni'], sk: ['pozn', 'pozn.', 'poznamka', 'c. r.', 'riadok', 'oznacenie'],
    pl: ['nota', 'noty'], hr: ['biljeska', 'bilj', 'bilj.', 'napomena', 'aop', 'aop oznaka'], sr: ['напомена', 'аоп', 'ознака аоп'], sl: ['pojasnilo', 'pojasnila'],
    hu: ['megjegyzes', 'sorszam'], ro: ['nota', 'nr. rd.', 'nr. rand'], bg: ['бележка', 'бележки', 'пояснение'], el: ['σημειωση', 'σημειωσεις', 'σημ', 'σημ.'],
    tr: ['dipnot', 'dipnotlar', 'dipnot referanslari'], ru: ['примечание', 'прим', 'прим.', 'пояснения', 'код', 'код строки'],
    uk: ['примітка', 'прим', 'прим.', 'примітки', 'код', 'код рядка'], zh: ['附注', '注释', '行次'], ja: ['注記', '注記番号'], ko: ['주석'], ar: ['ايضاح', 'ايضاحات'],
    he: ['ביאור', 'באור'],
  },
  // NOTAS_EN: palabras que, en CUALQUIER lugar del encabezado, dicen que la columna es de notas (heredado: 'nota' y 'note' en cualquier lugar).
  NOTAS_EN: {
    es: ['nota*'], pt: ['nota*'], en: ['note*'], de: ['anhang*', 'anmerkung*'], fr: ['note*', 'annexe*'], it: ['nota', 'note', 'allegat*'], nl: ['noot', 'toelichting*'],
    da: ['note*'], no: ['note*'], sv: ['noter'], fi: ['liite*'], cs: ['poznamk*', 'cis* rad*', 'cislo radku'], sk: ['poznamk*', 'cislo riadku'], pl: ['nota', 'noty'],
    hr: ['biljesk*', 'napomen*', 'aop'], sr: ['напомен*', 'аоп'], sl: ['pojasnil*'], hu: ['megjegyzes*'], bg: ['бележк*', 'пояснени*'], el: ['σημειωσ*'],
    tr: ['dipnot*'], ru: ['примечани*', 'код строки'], uk: ['примітк*', 'код рядка'], zh: ['附注', '注释'], ja: ['注記'], ko: ['주석'], ar: ['ايضاح'], he: ['ביאור', 'באור'],
  },
};
