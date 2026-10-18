// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "chelsea-gb": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "chelsea-fc-holdings",
    "perimetro": "consolidado",
    "nota": {
     "es": "El balance que Chelsea publica en Companies House es el del grupo Chelsea FC Holdings, no el de Chelsea Football Club Limited solo: incluye el hotel, los estacionamientos y los inmuebles. Lo que Chelsea le factura a Strasbourg (15,8 M £ en 2024/25) es una operación entre partes relacionadas y está dentro de los ingresos.",
     "en": "The accounts Chelsea files at Companies House are those of the Chelsea FC Holdings group, not of Chelsea Football Club Limited alone: they include the hotel, the car parks and the property. What Chelsea invoices Strasbourg (£15.8m in 2024/25) is a related-party transaction and is part of revenue."
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 113
    }
   }
  ],
  "entidades": {
   "blueco-22": {
    "nombre": "Blueco 22 Limited",
    "forma": "holding",
    "pais": "GB",
    "grupo": {
     "id": "blueco",
     "nombre": "BlueCo",
     "alias": [
      "BlueCo",
      "Blue Co",
      "Blueco 22"
     ]
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 209
    }
   },
   "blueco-22-midco": {
    "nombre": "Blueco 22 Midco Limited",
    "forma": "holding",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 3043
    }
   },
   "blues-investment-holdings": {
    "nombre": "Blues Investment Holdings Parent, L.P.",
    "forma": "fondo",
    "pais": "KY",
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 3045
    }
   },
   "chelsea-car-parks": {
    "nombre": "Chelsea Car Parks",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Estacionamientos",
     "en": "Car park management"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2601
    }
   },
   "chelsea-fc-foundation": {
    "nombre": "Chelsea FC Foundation",
    "forma": "fundacion",
    "pais": "GB",
    "que": {
     "es": "Fundación del club",
     "en": "The club's foundation"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2970
    }
   },
   "chelsea-fc-holdings": {
    "nombre": "Chelsea FC Holdings Limited",
    "forma": "holding",
    "pais": "GB",
    "clubId": "chelsea-gb",
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 7
    }
   },
   "chelsea-fc-merchandising": {
    "nombre": "Chelsea FC Merchandising Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Merchandising y venta por correo",
     "en": "Merchandising and mail order"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2597
    }
   },
   "chelsea-fc-pte": {
    "nombre": "Chelsea FC Pte Limited",
    "forma": "sociedad",
    "pais": "SG",
    "que": {
     "es": "Oficina de representación, Singapur",
     "en": "Representative office, Singapore"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2603
    }
   },
   "chelsea-football-club": {
    "nombre": "Chelsea Football Club Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "El club profesional",
     "en": "The professional club"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2596
    }
   },
   "hotel-at-chelsea": {
    "nombre": "The Hotel at Chelsea Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Hotel y catering",
     "en": "Hotel management and catering"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2598
    }
   },
   "stamford-bridge-securities": {
    "nombre": "Stamford Bridge Securities Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Inmuebles",
     "en": "Property holding"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2602
    }
   }
  },
  "relaciones": [
   {
    "de": "blues-investment-holdings",
    "a": "blueco-22",
    "rel": "controla",
    "desde": 2022,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2021-22.md",
     "linea": 1899
    }
   },
   {
    "de": "blueco-22",
    "a": "blueco-22-midco",
    "rel": "controla",
    "desde": 2022,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2018
    }
   },
   {
    "de": "blueco-22-midco",
    "a": "chelsea-fc-holdings",
    "rel": "controla",
    "desde": 2022,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2021-22.md",
     "linea": 1897
    }
   },
   {
    "de": "chelsea-fc-holdings",
    "a": "chelsea-football-club",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2596
    }
   },
   {
    "de": "chelsea-fc-holdings",
    "a": "chelsea-fc-merchandising",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2597
    }
   },
   {
    "de": "chelsea-fc-holdings",
    "a": "hotel-at-chelsea",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2598
    }
   },
   {
    "de": "chelsea-fc-holdings",
    "a": "chelsea-car-parks",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2601
    }
   },
   {
    "de": "chelsea-fc-holdings",
    "a": "stamford-bridge-securities",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2602
    }
   },
   {
    "de": "chelsea-fc-holdings",
    "a": "chelsea-fc-pte",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2603
    }
   },
   {
    "de": "chelsea-fc-foundation",
    "a": "chelsea-fc-holdings",
    "rel": "vinculada",
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md",
     "linea": 2970
    }
   }
  ]
 },
 "crystalpalace-gb": {
  "cargas": [
   {
    "anio": 2024,
    "entidad": "cpfc-2010",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2023-24.md",
     "linea": 1061
    }
   },
   {
    "anio": 2025,
    "entidad": "cpfc-2010",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 1154
    }
   }
  ],
  "entidades": {
   "cpfc-2010": {
    "nombre": "CPFC 2010 Limited",
    "forma": "holding",
    "pais": "GB",
    "clubId": "crystalpalace-gb",
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 12
    }
   },
   "cpfc-limited": {
    "nombre": "CPFC Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "El club profesional",
     "en": "Football Club"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 1854
    }
   },
   "cpfc-selhurst-park": {
    "nombre": "CPFC Selhurst Park Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Gestión del estadio",
     "en": "Stadium Management"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 1855
    }
   },
   "cpfc-women": {
    "nombre": "CPFC (Women) Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Club de fútbol",
     "en": "Football Club"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 1856
    }
   },
   "eagle-football": {
    "nombre": "Eagle Football Holdings Limited",
    "forma": "holding",
    "grupo": {
     "id": "eagle",
     "nombre": "Eagle Football",
     "alias": [
      "Eagle Football",
      "Eagle Football Holdings",
      "Eagle Football Group",
      "Eagle"
     ]
    },
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2025.md",
     "linea": 2122
    }
   },
   "john-textor": {
    "nombre": "John Charles Textor",
    "forma": "persona",
    "pais": "US",
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2023.md",
     "linea": 1077
    }
   },
   "palace-holdco-uk": {
    "nombre": "Palace Holdco UK Limited",
    "forma": "holding",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 2137
    }
   },
   "palace-midco": {
    "nombre": "Palace Midco Limited",
    "forma": "holding",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 2137
    }
   }
  },
  "relaciones": [
   {
    "de": "john-textor",
    "a": "eagle-football",
    "rel": "controla",
    "desde": 2023,
    "hasta": 2025,
    "fuente": {
     "url": "https://en.wikipedia.org/wiki/OL_Groupe"
    }
   },
   {
    "de": "palace-midco",
    "a": "cpfc-2010",
    "rel": "controla",
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 2137
    }
   },
   {
    "de": "palace-holdco-uk",
    "a": "palace-midco",
    "rel": "controla",
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 2137
    }
   },
   {
    "de": "eagle-football",
    "a": "palace-holdco-uk",
    "rel": "participa",
    "pct": 40,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "url": "https://en.wikipedia.org/wiki/OL_Groupe"
    }
   },
   {
    "de": "cpfc-2010",
    "a": "cpfc-limited",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 1854
    }
   },
   {
    "de": "cpfc-2010",
    "a": "cpfc-selhurst-park",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 1855
    }
   },
   {
    "de": "cpfc-2010",
    "a": "cpfc-women",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md",
     "linea": 1856
    }
   }
  ]
 },
 "everton-gb": {
  "cargas": [
   {
    "anio": 2024,
    "entidad": "everton-fc-company",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 735
    }
   },
   {
    "anio": 2025,
    "entidad": "everton-fc-company",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2024-25.md",
     "linea": 779
    }
   }
  ],
  "entidades": {
   "blue-horizon-investments": {
    "nombre": "Blue Horizon Investments Limited",
    "forma": "holding",
    "pais": "IM",
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 1358
    }
   },
   "dan-friedkin": {
    "nombre": "Thomas Dan Friedkin",
    "forma": "persona",
    "pais": "US",
    "grupo": {
     "id": "friedkin",
     "nombre": "Dan Friedkin",
     "alias": [
      "Dan Friedkin",
      "Thomas Dan Friedkin",
      "Friedkin Group",
      "The Friedkin Group",
      "Friedkin"
     ]
    },
    "fuente": {
     "md": "Clubes/Italia/AS Roma/AS-Roma-bilancio-2022-consolidato.md",
     "linea": 210
    }
   },
   "everton-fc-company": {
    "nombre": "Everton Football Club Company Limited",
    "forma": "sociedad",
    "pais": "GB",
    "clubId": "everton-gb",
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 730
    }
   },
   "everton-investments": {
    "nombre": "Everton Investments Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Emisora de bonos",
     "en": "Issuer of loan notes"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2365
    }
   },
   "everton-stadium-development": {
    "nombre": "Everton Stadium Development Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Desarrollo del estadio",
     "en": "Development company"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2367
    }
   },
   "everton-stadium-development-holding": {
    "nombre": "Everton Stadium Development Holding Company Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Desarrollo del estadio",
     "en": "Development company"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2368
    }
   },
   "everton-women": {
    "nombre": "Everton Football Club Women Limited",
    "forma": "club",
    "pais": "GB",
    "que": {
     "es": "Club profesional (femenino)",
     "en": "Professional football club"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2366
    }
   },
   "farhad-moshiri": {
    "nombre": "Farhad Moshiri",
    "forma": "persona",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 1361
    }
   },
   "friedkin-group": {
    "nombre": "The Friedkin Group, Inc.",
    "forma": "holding",
    "pais": "US",
    "fuente": {
     "md": "Clubes/Italia/AS Roma/AS-Roma-bilancio-2020.md",
     "linea": 166
    }
   },
   "goodison-park-stadium": {
    "nombre": "Goodison Park Stadium Limited",
    "forma": "sociedad",
    "pais": "GB",
    "que": {
     "es": "Instalaciones de entretenimiento futbolístico",
     "en": "Provision of football entertainment facilities"
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2364
    }
   },
   "roundhouse-capital-holdings": {
    "nombre": "Roundhouse Capital Holdings Limited",
    "forma": "holding",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2024-25.md",
     "linea": 1458
    }
   }
  },
  "relaciones": [
   {
    "de": "blue-horizon-investments",
    "a": "everton-fc-company",
    "rel": "controla",
    "pct": 94.1,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 1359
    }
   },
   {
    "de": "farhad-moshiri",
    "a": "blue-horizon-investments",
    "rel": "controla",
    "pct": 100,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 1361
    }
   },
   {
    "de": "roundhouse-capital-holdings",
    "a": "everton-fc-company",
    "rel": "controla",
    "pct": 99.5,
    "desde": 2024,
    "nota": {
     "es": "Desde el cierre de la compra, el 18 de diciembre de 2024 (posterior al cierre del ejercicio 2024).",
     "en": "Since the purchase closed on 18 December 2024 (after the 2024 year-end)."
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2024-25.md",
     "linea": 1459
    }
   },
   {
    "de": "dan-friedkin",
    "a": "roundhouse-capital-holdings",
    "rel": "controla",
    "desde": 2024,
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2024-25.md",
     "linea": 636
    }
   },
   {
    "de": "friedkin-group",
    "a": "everton-fc-company",
    "rel": "vinculada",
    "desde": 2024,
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 1413
    }
   },
   {
    "de": "everton-fc-company",
    "a": "goodison-park-stadium",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2364
    }
   },
   {
    "de": "everton-fc-company",
    "a": "everton-investments",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2365
    }
   },
   {
    "de": "everton-fc-company",
    "a": "everton-women",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2366
    }
   },
   {
    "de": "everton-fc-company",
    "a": "everton-stadium-development",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2367
    }
   },
   {
    "de": "everton-fc-company",
    "a": "everton-stadium-development-holding",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md",
     "linea": 2368
    }
   }
  ]
 },
 "mancity-gb": {
  "cargas": [
   {
    "anio": 2024,
    "entidad": "mancity-fc",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2023-24.md",
     "linea": 56
    }
   },
   {
    "anio": 2025,
    "entidad": "mancity-fc",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.md",
     "linea": 54
    }
   }
  ],
  "entidades": {
   "city-football-group": {
    "nombre": "City Football Group Limited",
    "forma": "holding",
    "pais": "GB",
    "grupo": {
     "id": "city-football-group",
     "nombre": "City Football Group",
     "alias": [
      "CFG",
      "City Football Group",
      "City Football Group Limited"
     ]
    },
    "fuente": {
     "md": "Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.md",
     "linea": 1033
    }
   },
   "city-football-group-midco": {
    "nombre": "City Football Group (Midco) Limited",
    "forma": "holding",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 6811
    }
   },
   "manchester-city-limited": {
    "nombre": "Manchester City Limited",
    "forma": "holding",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.md",
     "linea": 2236
    }
   },
   "mancity-fc": {
    "nombre": "Manchester City Football Club Limited",
    "forma": "club",
    "pais": "GB",
    "clubId": "mancity-gb",
    "fuente": {
     "md": "Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.md",
     "linea": 54
    }
   },
   "sheikh-mansour": {
    "nombre": "His Highness Sheikh Mansour bin Zayed Al Nahyan",
    "forma": "persona",
    "pais": "AE",
    "fuente": {
     "md": "Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.md",
     "linea": 2236
    }
   }
  },
  "relaciones": [
   {
    "de": "manchester-city-limited",
    "a": "mancity-fc",
    "rel": "controla",
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.md",
     "linea": 2236
    }
   },
   {
    "de": "city-football-group-midco",
    "a": "manchester-city-limited",
    "rel": "controla",
    "desde": 2023,
    "nota": {
     "es": "75 % o más de las acciones y los votos (registro de Companies House, desde el 3 de octubre de 2022; antes, City Football Group Limited).",
     "en": "75% or more of the shares and votes (Companies House register, since 3 October 2022; before that, City Football Group Limited)."
    },
    "fuente": {
     "url": "https://find-and-update.company-information.service.gov.uk/company/02989498/persons-with-significant-control"
    }
   },
   {
    "de": "city-football-group",
    "a": "city-football-group-midco",
    "rel": "controla",
    "desde": 2022,
    "nota": {
     "es": "75 % o más de las acciones y los votos (registro de Companies House).",
     "en": "75% or more of the shares and votes (Companies House register)."
    },
    "fuente": {
     "url": "https://find-and-update.company-information.service.gov.uk/company/14120242/persons-with-significant-control"
    }
   },
   {
    "de": "sheikh-mansour",
    "a": "city-football-group",
    "rel": "controla",
    "desde": 2017,
    "nota": {
     "es": "75 % o más de las acciones y los votos (registro de Companies House). Las cuentas del club nombran como sociedad dueña última a Newton Investment and Development LLC, de Abu Dhabi, también 100 % suya.",
     "en": "75% or more of the shares and votes (Companies House register). The club's accounts name Newton Investment and Development LLC, of Abu Dhabi, also wholly his, as the ultimate parent company."
    },
    "fuente": {
     "url": "https://find-and-update.company-information.service.gov.uk/company/08355862/persons-with-significant-control"
    }
   }
  ]
 },
 "nottinghamforest-gb": {
  "cargas": [
   {
    "anio": 2024,
    "entidad": "nottingham-forest-fc",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2023-24.md",
     "linea": 6
    }
   },
   {
    "anio": 2025,
    "entidad": "nottingham-forest-fc",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2024-25.md",
     "linea": 4
    }
   }
  ],
  "entidades": {
   "kominakis": {
    "nombre": "S Kominakis",
    "forma": "persona",
    "pais": "GR",
    "fuente": {
     "md": "Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2024-25.md",
     "linea": 70
    }
   },
   "marinakis": {
    "nombre": "Evangelos Marinakis",
    "forma": "persona",
    "pais": "GR",
    "grupo": {
     "id": "marinakis",
     "nombre": "Evangelos Marinakis",
     "alias": [
      "Marinakis",
      "Evangelos Marinakis",
      "Vangelis Marinakis"
     ]
    },
    "fuente": {
     "url": "https://en.wikipedia.org/wiki/Evangelos_Marinakis"
    }
   },
   "nf-football-investments": {
    "nombre": "NF Football Investments Limited",
    "forma": "holding",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2024-25.md",
     "linea": 2206
    }
   },
   "nottingham-forest-fc": {
    "nombre": "Nottingham Forest Football Club Limited",
    "forma": "sociedad",
    "pais": "GB",
    "clubId": "nottinghamforest-gb",
    "fuente": {
     "md": "Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2024-25.md",
     "linea": 4
    }
   }
  },
  "relaciones": [
   {
    "de": "nf-football-investments",
    "a": "nottingham-forest-fc",
    "rel": "controla",
    "pct": 100,
    "desde": 2024,
    "fuente": {
     "md": "Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2023-24.md",
     "linea": 1933
    }
   },
   {
    "de": "marinakis",
    "a": "nf-football-investments",
    "rel": "controla",
    "pct": 80,
    "desde": 2024,
    "fuente": {
     "md": "Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2023-24.md",
     "linea": 72
    }
   },
   {
    "de": "kominakis",
    "a": "nf-football-investments",
    "rel": "participa",
    "pct": 20,
    "desde": 2024,
    "fuente": {
     "md": "Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2023-24.md",
     "linea": 72
    }
   }
  ]
 }
});
