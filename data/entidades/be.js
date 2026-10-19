// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "lokerentemse-be": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "lokeren-temse",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Bélgica/Lokeren-Temse/jaarrekening-2025-06-30-individual.md",
     "linea": 11
    }
   }
  ],
  "entidades": {
   "lokeren-temse": {
    "nombre": "Koninklijke Sporting Club Lokeren - Temse VZW",
    "forma": "asociacion",
    "pais": "BE",
    "clubId": "lokerentemse-be",
    "fuente": {
     "md": "Clubes/Bélgica/Lokeren-Temse/jaarrekening-2025-06-30-individual.md",
     "linea": 10
    }
   }
  },
  "relaciones": []
 },
 "lommelsk-be": {
  "cargas": [
   {
    "anio": 2018,
    "entidad": "lommel-sk",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Bélgica/Lommel SK/jaarrekening-2022-06-30-individual.md",
     "linea": 9
    }
   },
   {
    "anio": 2019,
    "entidad": "lommel-sk",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Bélgica/Lommel SK/jaarrekening-2022-06-30-individual.md",
     "linea": 9
    }
   },
   {
    "anio": 2020,
    "entidad": "lommel-sk",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Bélgica/Lommel SK/jaarrekening-2022-06-30-individual.md",
     "linea": 9
    }
   },
   {
    "anio": 2021,
    "entidad": "lommel-sk",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Bélgica/Lommel SK/jaarrekening-2022-06-30-individual.md",
     "linea": 9
    }
   },
   {
    "anio": 2025,
    "entidad": "lommel-sk",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Bélgica/Lommel SK/jaarrekening-2025-06-30-individual.md",
     "linea": 9
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
   "lommel-sk": {
    "nombre": "Voetbalclub Lommel SK NV",
    "forma": "club",
    "pais": "BE",
    "clubId": "lommelsk-be",
    "fuente": {
     "md": "Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.md",
     "linea": 2111
    }
   },
   "lommel-united": {
    "nombre": "Voetbalclub Lommel United VZW",
    "forma": "asociacion",
    "pais": "BE",
    "que": {
     "es": "Accionista de la NV, con 1 acción",
     "en": "Shareholder of the NV, with 1 share"
    },
    "fuente": {
     "md": "Clubes/Bélgica/Lommel SK/jaarrekening-2025-06-30-individual.md",
     "linea": 695
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
    "de": "lommel-united",
    "a": "lommel-sk",
    "rel": "vinculada",
    "desde": 2025,
    "hasta": 2025,
    "nota": {
     "es": "1 acción de 60.488 (City Football Group tiene las otras 60.487).",
     "en": "1 share out of 60,488 (City Football Group holds the other 60,487)."
    },
    "fuente": {
     "md": "Clubes/Bélgica/Lommel SK/jaarrekening-2025-06-30-individual.md",
     "linea": 695
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
   },
   {
    "de": "city-football-group",
    "a": "lommel-sk",
    "rel": "controla",
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.md",
     "linea": 2103
    }
   }
  ]
 },
 "patroeisden-be": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "patro-eisden",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Bélgica/Patro Eisden/jaarrekening-2025-06-30-individual.md",
     "linea": 10
    }
   }
  ],
  "entidades": {
   "patro-eisden": {
    "nombre": "Patro Eisden Maasmechelen VZW",
    "forma": "asociacion",
    "pais": "BE",
    "clubId": "patroeisden-be",
    "fuente": {
     "md": "Clubes/Bélgica/Patro Eisden/jaarrekening-2025-06-30-individual.md",
     "linea": 9
    }
   }
  },
  "relaciones": []
 },
 "standardliege-be": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "standard-de-liege",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Bélgica/Standard Liège/jaarrekening-2025-06-30-individual.md",
     "linea": 12
    }
   }
  ],
  "entidades": {
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
   "777-sdl": {
    "nombre": "777 SDL",
    "forma": "holding",
    "pais": "BE",
    "fuente": {
     "md": "Clubes/Bélgica/Standard Liège/jaarrekening-2022-06-30-individual.md",
     "linea": 2016
    }
   },
   "sdl-holding": {
    "nombre": "SDL Holding",
    "forma": "holding",
    "pais": "BE",
    "fuente": {
     "md": "Clubes/Bélgica/Standard Liège/jaarrekening-2025-06-30-individual.md",
     "linea": 2382
    }
   },
   "standard-de-liege": {
    "nombre": "Standard de Liège",
    "forma": "sociedad",
    "pais": "BE",
    "clubId": "standardliege-be",
    "fuente": {
     "md": "Clubes/Bélgica/Standard Liège/jaarrekening-2025-06-30-individual.md",
     "linea": 12
    }
   }
  },
  "relaciones": [
   {
    "de": "777-sdl",
    "a": "standard-de-liege",
    "rel": "controla",
    "desde": 2022,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Bélgica/Standard Liège/jaarrekening-2024-06-30-individual.md",
     "linea": 2053
    }
   },
   {
    "de": "777-partners",
    "a": "standard-de-liege",
    "rel": "controla",
    "pct": 100,
    "desde": 2022,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Bélgica/Standard Liège/jaarrekening-2022-06-30-individual.md",
     "linea": 2269
    }
   },
   {
    "de": "sdl-holding",
    "a": "standard-de-liege",
    "rel": "controla",
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Bélgica/Standard Liège/jaarrekening-2025-06-30-individual.md",
     "linea": 2382
    }
   }
  ]
 }
});
