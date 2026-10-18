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
 }
});
