// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "botafogo": {
  "cargas": [
   {
    "anio": 2023,
    "entidad": "botafogo-saf",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2023.md",
     "linea": 1065
    }
   },
   {
    "anio": 2024,
    "entidad": "botafogo-saf",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2024.md",
     "linea": 1961
    }
   },
   {
    "anio": 2025,
    "entidad": "botafogo-saf",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2025.md",
     "linea": 1685
    }
   }
  ],
  "entidades": {
   "botafogo-fr": {
    "nombre": "Botafogo de Futebol e Regatas",
    "forma": "asociacion",
    "pais": "BR",
    "que": {
     "es": "El club asociación",
     "en": "The members' club"
    },
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2024.md",
     "linea": 1517
    }
   },
   "botafogo-saf": {
    "nombre": "Sociedade Anônima de Futebol Botafogo",
    "forma": "sociedad",
    "pais": "BR",
    "clubId": "botafogo",
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2024.md",
     "linea": 1501
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
   "saf-botafogo-base": {
    "nombre": "SAF Botafogo Base Ltda",
    "forma": "sociedad",
    "pais": "BR",
    "que": {
     "es": "Proyectos deportivos de formación (categorías de base)",
     "en": "Youth-development sports projects"
    },
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2025.md",
     "linea": 2266
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
    "de": "eagle-football",
    "a": "botafogo-saf",
    "rel": "controla",
    "pct": 90,
    "desde": 2023,
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2025.md",
     "linea": 1481
    }
   },
   {
    "de": "botafogo-fr",
    "a": "botafogo-saf",
    "rel": "participa",
    "pct": 10,
    "desde": 2023,
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2025.md",
     "linea": 1481
    }
   },
   {
    "de": "botafogo-saf",
    "a": "saf-botafogo-base",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "fuente": {
     "md": "Clubes/Brasil/Botafogo/demonstracoes-financeiras-2025.md",
     "linea": 2266
    }
   }
  ]
 },
 "vascodagama-br": {
  "cargas": [
   {
    "anio": 2023,
    "entidad": "vasco-saf",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Brasil/Vasco da Gama/demonstracoes-contabeis-2023.md",
     "linea": 1523
    }
   }
  ],
  "entidades": {
   "777-carioca": {
    "nombre": "777 Carioca LLC",
    "forma": "holding",
    "pais": "US",
    "fuente": {
     "md": "Clubes/Brasil/Vasco da Gama/demonstracoes-contabeis-2023.md",
     "linea": 1529
    }
   },
   "777-partners": {
    "nombre": "777 Partners",
    "forma": "fondo",
    "pais": "US",
    "grupo": {
     "id": "777",
     "nombre": "777 Partners",
     "alias": [
      "777 Partners",
      "777 Football Group",
      "Grupo 777"
     ]
    },
    "fuente": {
     "md": "Clubes/Brasil/Vasco da Gama/demonstracoes-contabeis-2023.md",
     "linea": 195
    }
   },
   "crvg": {
    "nombre": "Club de Regatas Vasco da Gama",
    "forma": "asociacion",
    "pais": "BR",
    "que": {
     "es": "El club asociación: los socios, el estadio y los otros deportes",
     "en": "The members' club: members, stadium and the other sports"
    },
    "fuente": {
     "md": "Clubes/Brasil/Vasco da Gama/dre-balanco-patrimonial-2024.md",
     "linea": 815
    }
   },
   "vasco-saf": {
    "nombre": "Vasco da Gama Sociedade Anônima do Futebol",
    "forma": "sociedad",
    "pais": "BR",
    "clubId": "vascodagama-br",
    "fuente": {
     "md": "Clubes/Brasil/Vasco da Gama/demonstracoes-contabeis-2023.md",
     "linea": 145
    }
   }
  },
  "relaciones": [
   {
    "de": "777-partners",
    "a": "777-carioca",
    "rel": "controla",
    "desde": 2022,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Brasil/Vasco da Gama/demonstracoes-contabeis-2023.md",
     "linea": 186
    }
   },
   {
    "de": "777-carioca",
    "a": "vasco-saf",
    "rel": "controla",
    "pct": 70,
    "desde": 2022,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Brasil/Vasco da Gama/demonstracoes-contabeis-2023.md",
     "linea": 1530
    }
   },
   {
    "de": "crvg",
    "a": "vasco-saf",
    "rel": "participa",
    "pct": 30,
    "desde": 2022,
    "fuente": {
     "md": "Clubes/Brasil/Vasco da Gama/demonstracoes-contabeis-2023.md",
     "linea": 1531
    }
   }
  ]
 }
});
