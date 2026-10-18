// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "braga-pt": {
  "cargas": [
   {
    "anio": 2023,
    "entidad": "braga-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Braga/Relato_rio-Contas-2022-23-SAD.md",
     "linea": 173
    }
   }
  ],
  "entidades": {
   "braga-sad": {
    "nombre": "Sporting Clube de Braga – Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "braga-pt",
    "fuente": {
     "md": "Clubes/Portugal/Braga/Relato_rio-Contas-2022-23-SAD.md",
     "linea": 1849
    }
   },
   "sc-braga": {
    "nombre": "Sporting Clube de Braga",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación",
     "en": "The members' club"
    },
    "fuente": {
     "md": "Clubes/Portugal/Braga/Relato_rio-Contas-2022-23-SAD.md",
     "linea": 1612
    },
    "ingresos": {
     "2021": {
      "total": 3.847,
      "moneda": "EUR",
      "cierre": "2021-06-30",
      "fuente": {
       "md": "Clubes/Portugal/Braga/relatorio-contas-2020-21.md",
       "linea": 2004
      }
     }
    }
   }
  },
  "relaciones": [
   {
    "de": "sc-braga",
    "a": "braga-sad",
    "rel": "participa",
    "pct": 36.98,
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2020-21.md",
     "linea": 385
    }
   },
   {
    "de": "sc-braga",
    "a": "braga-sad",
    "rel": "participa",
    "pct": 36.99,
    "desde": 2023,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Braga/Relato_rio-Contas-2022-23-SAD.md",
     "linea": 1612
    }
   }
  ]
 },
 "tondela-pt": {
  "cargas": [
   {
    "anio": 2021,
    "entidad": "cd-tondela-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Tondela/relatorio-contas-2020-21.md",
     "linea": 49
    }
   }
  ],
  "entidades": {
   "cd-tondela": {
    "nombre": "Clube Desportivo de Tondela",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación",
     "en": "The members' club"
    },
    "fuente": {
     "md": "Clubes/Portugal/Tondela/relatorio-contas-clube-2021.md",
     "linea": 7
    },
    "ingresos": {
     "2021": {
      "total": 0.373,
      "moneda": "EUR",
      "cierre": "2021-12-31",
      "fuente": {
       "md": "Clubes/Portugal/Tondela/relatorio-contas-clube-2021.md",
       "linea": 683
      }
     }
    }
   },
   "cd-tondela-sad": {
    "nombre": "CD Tondela - Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "tondela-pt",
    "fuente": {
     "md": "Clubes/Portugal/Tondela/relatorio-contas-2020-21.md",
     "linea": 49
    }
   }
  },
  "relaciones": [
   {
    "de": "cd-tondela",
    "a": "cd-tondela-sad",
    "rel": "vinculada",
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/Tondela/relatorio-contas-clube-2021.md",
     "linea": 358
    }
   }
  ]
 },
 "vitoriaguimaraes-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "vitoria-sc-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/wf-src-Relatorio-e-Contas-2021-22-SAD.md",
     "linea": 38
    }
   }
  ],
  "entidades": {
   "vitoria-sc-sad": {
    "nombre": "Vitória Sport Clube - Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "vitoriaguimaraes-pt",
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/wf-src-Relatorio-e-Contas-2021-22-SAD.md",
     "linea": 38
    }
   },
   "vitoria-sport-clube": {
    "nombre": "Vitória Sport Clube",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación: los socios, las otras disciplinas",
     "en": "The members' club: members and the other sports"
    },
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/relatorio-contas-2021-22.md",
     "linea": 40
    },
    "ingresos": {
     "2022": {
      "total": 4.566,
      "moneda": "EUR",
      "cierre": "2022-06-30",
      "fuente": {
       "md": "Clubes/Portugal/Vitória Guimarães/relatorio-contas-2021-22.md",
       "linea": 1348
      }
     }
    }
   }
  },
  "relaciones": [
   {
    "de": "vitoria-sport-clube",
    "a": "vitoria-sc-sad",
    "rel": "controla",
    "pct": 65.8,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/relatorio-contas-2021-22.md",
     "linea": 230
    }
   }
  ]
 }
});
