// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
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
