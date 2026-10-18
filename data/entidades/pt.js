// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "academica-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "academica-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Académica/9-RC-SDUQ-2021-2022.md",
     "linea": 819
    }
   },
   {
    "anio": 2023,
    "entidad": "academica-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Académica/10-RC-SDUQ-2022-2023.md",
     "linea": 2549
    }
   },
   {
    "anio": 2024,
    "entidad": "academica-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Académica/RC-SDUQ-2023-2024.md",
     "linea": 844
    }
   }
  ],
  "entidades": {
   "academica-sduq": {
    "nombre": "Associação Académica de Coimbra – Organismo Autónomo de Futebol, SDUQ, Lda",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "academica-pt",
    "fuente": {
     "md": "Clubes/Portugal/Académica/9-RC-SDUQ-2021-2022.md",
     "linea": 317
    }
   },
   "associacao-academica-coimbra": {
    "nombre": "Associação Académica de Coimbra – Organismo Autónomo de Futebol (AAC-OAF)",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club fundador, socio único de la SDUQ",
     "en": "The founding club, sole member of the SDUQ"
    },
    "fuente": {
     "md": "Clubes/Portugal/Académica/9-RC-SDUQ-2021-2022.md",
     "linea": 460
    }
   }
  },
  "relaciones": [
   {
    "de": "associacao-academica-coimbra",
    "a": "academica-sduq",
    "rel": "controla",
    "pct": 100,
    "desde": 2022,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Académica/9-RC-SDUQ-2021-2022.md",
     "linea": 460
    }
   }
  ]
 },
 "academicoviseu-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "academico-viseu-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-src-RC21_22.md",
     "linea": 33
    }
   },
   {
    "anio": 2023,
    "entidad": "academico-viseu-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-2022-2023-b797bc64.md",
     "linea": 35
    }
   },
   {
    "anio": 2024,
    "entidad": "academico-viseu-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-2023-2024-02d5741e.md",
     "linea": 132
    }
   },
   {
    "anio": 2025,
    "entidad": "academico-viseu-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-2024-2025-efe7ad0a.md",
     "linea": 30
    }
   }
  ],
  "entidades": {
   "academico-viseu-clube": {
    "nombre": "Académico de Viseu Futebol Clube",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, accionista de la SAD",
     "en": "The members' club, a shareholder of the SAD"
    },
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-src-RC21_22.md",
     "linea": 441
    }
   },
   "academico-viseu-sad": {
    "nombre": "Académico de Viseu Futebol Clube – Futebol SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "academicoviseu-pt",
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-2024-2025-efe7ad0a.md",
     "linea": 30
    }
   },
   "hobra": {
    "nombre": "HOBRA GMBH & CO. KG",
    "forma": "holding",
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-src-RC21_22.md",
     "linea": 88
    }
   }
  },
  "relaciones": [
   {
    "de": "hobra",
    "a": "academico-viseu-sad",
    "rel": "controla",
    "pct": 51,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-src-RC21_22.md",
     "linea": 442
    }
   },
   {
    "de": "hobra",
    "a": "academico-viseu-sad",
    "rel": "controla",
    "pct": 90,
    "desde": 2023,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-2024-2025-efe7ad0a.md",
     "linea": 162
    }
   },
   {
    "de": "academico-viseu-clube",
    "a": "academico-viseu-sad",
    "rel": "participa",
    "pct": 49,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-src-RC21_22.md",
     "linea": 441
    }
   },
   {
    "de": "academico-viseu-clube",
    "a": "academico-viseu-sad",
    "rel": "participa",
    "pct": 10,
    "desde": 2023,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Academico Viseu/wf-2024-2025-efe7ad0a.md",
     "linea": 455
    }
   }
  ]
 },
 "alverca-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "alverca-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2021-22.md",
     "linea": 11
    }
   },
   {
    "anio": 2023,
    "entidad": "alverca-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2022-23.md",
     "linea": 11
    }
   },
   {
    "anio": 2024,
    "entidad": "alverca-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2023-24.md",
     "linea": 210
    }
   },
   {
    "anio": 2025,
    "entidad": "alverca-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2024-25.md",
     "linea": 437
    }
   }
  ],
  "entidades": {
   "alverca-sad": {
    "nombre": "Futebol Clube de Alverca - Futebol SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "alverca-pt",
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2024-25.md",
     "linea": 437
    }
   },
   "fca-consulting": {
    "nombre": "FCA Consulting, Lda",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2021-22.md",
     "linea": 61
    }
   },
   "ribatejo-sports": {
    "nombre": "Ribatejo Sports Internac.",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2021-22.md",
     "linea": 61
    }
   },
   "universo-big-7": {
    "nombre": "Universo Big 7 SL",
    "forma": "sociedad",
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2024-25.md",
     "linea": 929
    }
   },
   "vicintin": {
    "nombre": "Ricardo Vicintín",
    "forma": "persona",
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2023-24.md",
     "linea": 178
    }
   }
  },
  "relaciones": [
   {
    "de": "vicintin",
    "a": "alverca-sad",
    "rel": "controla",
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2023-24.md",
     "linea": 178
    }
   },
   {
    "de": "fca-consulting",
    "a": "alverca-sad",
    "rel": "vinculada",
    "desde": 2022,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2024-25.md",
     "linea": 929
    }
   },
   {
    "de": "ribatejo-sports",
    "a": "alverca-sad",
    "rel": "vinculada",
    "desde": 2022,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2023-24.md",
     "linea": 748
    }
   },
   {
    "de": "universo-big-7",
    "a": "alverca-sad",
    "rel": "vinculada",
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Alverca/relatorio-contas-2024-25.md",
     "linea": 929
    }
   }
  ]
 },
 "arouca-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "arouca-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Arouca/relatorio-contas-2021-22.md",
     "linea": 10
    }
   },
   {
    "anio": 2023,
    "entidad": "arouca-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Arouca/relatorio-contas-2022-23.md",
     "linea": 10
    }
   },
   {
    "anio": 2024,
    "entidad": "arouca-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Arouca/relatorio-contas-2023-24.md",
     "linea": 10
    }
   },
   {
    "anio": 2025,
    "entidad": "arouca-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Arouca/wf-2024-2025-78053ec5.md",
     "linea": 18
    }
   }
  ],
  "entidades": {
   "arouca-sduq": {
    "nombre": "Futebol Clube de Arouca – Futebol, SDUQ, Lda",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "arouca-pt",
    "fuente": {
     "md": "Clubes/Portugal/Arouca/relatorio-contas-2021-22.md",
     "linea": 12
    }
   },
   "fc-arouca": {
    "nombre": "Futebol Clube de Arouca",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación; el documento no nombra al socio único de la SDUQ",
     "en": "The members' club; the document does not name the SDUQ's sole member"
    },
    "fuente": {
     "md": "Clubes/Portugal/Arouca/relatorio-contas-2021-22.md",
     "linea": 12
    }
   }
  },
  "relaciones": [
   {
    "de": "fc-arouca",
    "a": "arouca-sduq",
    "rel": "vinculada",
    "desde": 2022,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Arouca/relatorio-contas-2021-22.md",
     "linea": 12
    }
   }
  ]
 },
 "avs-pt": {
  "cargas": [
   {
    "anio": 2021,
    "entidad": "avs-sad",
    "perimetro": "individual",
    "nota": {
     "es": "En abril de 2023 la sociedad cambió su nombre de União Desportiva Vilafranquense Futebol, SAD a AVS Futebol, SAD; es la misma entidad.",
     "en": "In April 2023 the company changed its name from União Desportiva Vilafranquense Futebol, SAD to AVS Futebol, SAD; it is the same entity."
    },
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2020-21.md",
     "linea": 30
    }
   },
   {
    "anio": 2023,
    "entidad": "avs-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2022-23.md",
     "linea": 28
    }
   },
   {
    "anio": 2024,
    "entidad": "avs-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2023-24.md",
     "linea": 36
    }
   }
  ],
  "entidades": {
   "avs-sad": {
    "nombre": "AVS Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "avs-pt",
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2023-24.md",
     "linea": 36
    }
   },
   "numeros-mouriscos": {
    "nombre": "Números Mouriscos, Unipessoal, Lda",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2022-23.md",
     "linea": 767
    }
   },
   "ud-vilafranquense-clube": {
    "nombre": "União Desportiva Vilafranquense - Clube",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación de Vila Franca de Xira, accionista de la SAD",
     "en": "The Vila Franca de Xira members' club, a shareholder of the SAD"
    },
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2020-21.md",
     "linea": 1261
    }
   }
  },
  "relaciones": [
   {
    "de": "numeros-mouriscos",
    "a": "avs-sad",
    "rel": "controla",
    "pct": 90,
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2020-21.md",
     "linea": 1260
    }
   },
   {
    "de": "numeros-mouriscos",
    "a": "avs-sad",
    "rel": "controla",
    "pct": 99.99,
    "desde": 2023,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2022-23.md",
     "linea": 1175
    }
   },
   {
    "de": "numeros-mouriscos",
    "a": "avs-sad",
    "rel": "controla",
    "pct": 99.9993,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2023-24.md",
     "linea": 1381
    }
   },
   {
    "de": "ud-vilafranquense-clube",
    "a": "avs-sad",
    "rel": "participa",
    "pct": 10,
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/AVS/relatorio-contas-2020-21.md",
     "linea": 1261
    }
   }
  ]
 },
 "belenenses-pt": {
  "cargas": [
   {
    "anio": 2024,
    "entidad": "belenenses-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Belenenses/Belenenses-SDUQ-Relatorio-e-Contas-2023-2024.md",
     "linea": 362
    }
   },
   {
    "anio": 2025,
    "entidad": "belenenses-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.md",
     "linea": 238
    }
   }
  ],
  "entidades": {
   "belenenses-sduq": {
    "nombre": "Belenenses – Futebol, SDUQ, Lda",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "belenenses-pt",
    "fuente": {
     "md": "Clubes/Portugal/Belenenses/Belenenses-SDUQ-Relatorio-e-Contas-2023-2024.md",
     "linea": 362
    }
   },
   "cf-os-belenenses": {
    "nombre": "Clube de Futebol “Os Belenenses”",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club fundador, socio único de la SDUQ",
     "en": "The founding club, sole member of the SDUQ"
    },
    "fuente": {
     "md": "Clubes/Portugal/Belenenses/Belenenses-SDUQ-Relatorio-e-Contas-2023-2024.md",
     "linea": 44
    }
   }
  },
  "relaciones": [
   {
    "de": "cf-os-belenenses",
    "a": "belenenses-sduq",
    "rel": "controla",
    "pct": 100,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Belenenses/Belenenses-SDUQ-demonstracoes-financeiras-30junho2025.md",
     "linea": 573
    }
   }
  ]
 },
 "benfica-pt": {
  "cargas": [
   {
    "anio": 2006,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2005-06.md",
     "linea": 8
    }
   },
   {
    "anio": 2007,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2006-07.md",
     "linea": 31
    }
   },
   {
    "anio": 2008,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2007-08.md",
     "linea": 789
    }
   },
   {
    "anio": 2009,
    "entidad": "benfica-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2009-11-03.md",
     "linea": 1065
    }
   },
   {
    "anio": 2010,
    "entidad": "benfica-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2010-11-11.md",
     "linea": 4878
    }
   },
   {
    "anio": 2012,
    "entidad": "benfica-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2011-12.md",
     "linea": 1044
    }
   },
   {
    "anio": 2013,
    "entidad": "benfica-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2012-13-pos-AG.md",
     "linea": 1150
    }
   },
   {
    "anio": 2014,
    "entidad": "benfica-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2013-14-pos-AG.md",
     "linea": 1162
    }
   },
   {
    "anio": 2016,
    "entidad": "benfica-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2015-16.md",
     "linea": 1172
    }
   },
   {
    "anio": 2017,
    "entidad": "benfica-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2016-17-pos-AG.md",
     "linea": 1188
    }
   },
   {
    "anio": 2018,
    "entidad": "benfica-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2017-18.md",
     "linea": 1029
    }
   },
   {
    "anio": 2019,
    "entidad": "benfica-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2018-19.md",
     "linea": 5504
    }
   },
   {
    "anio": 2020,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2019-20-pos-AG.md",
     "linea": 1336
    }
   },
   {
    "anio": 2021,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2020-21.md",
     "linea": 1238
    }
   },
   {
    "anio": 2022,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2021-22.md",
     "linea": 1184
    }
   },
   {
    "anio": 2023,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2022-23-pos-AG.md",
     "linea": 1125
    }
   },
   {
    "anio": 2024,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2023-24.md",
     "linea": 1152
    }
   },
   {
    "anio": 2025,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2024-25-pos-AG.md",
     "linea": 1313
    }
   },
   {
    "anio": 2026,
    "entidad": "benfica-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2025-26.md",
     "linea": 1228
    }
   }
  ],
  "entidades": {
   "benfica-clube": {
    "nombre": "Sport Lisboa e Benfica",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación: los socios, las otras disciplinas",
     "en": "The members' club: members and the other sports"
    },
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2025-26.md",
     "linea": 1149
    }
   },
   "benfica-estadio": {
    "nombre": "Benfica Estádio – Construção e Gestão de Estádios, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Gestión de estadios e infraestructuras deportivas",
     "en": "Stadium and sports infrastructure management"
    },
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2017-18.md",
     "linea": 2676
    }
   },
   "benfica-sad": {
    "nombre": "Sport Lisboa e Benfica – Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "benfica-pt",
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2025-26.md",
     "linea": 1210
    }
   },
   "benfica-sgps": {
    "nombre": "Sport Lisboa e Benfica, SGPS, S.A.",
    "forma": "holding",
    "pais": "PT",
    "que": {
     "es": "Sociedad gestora de participaciones sociales del Clube, accionista de la SAD",
     "en": "The Clube's holding company, a shareholder of the SAD"
    },
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2025-26.md",
     "linea": 1150
    }
   },
   "benfica-stars-fund": {
    "nombre": "Benfica Stars Fund",
    "forma": "fondo",
    "pais": "PT",
    "que": {
     "es": "Fondo de inversión (gestión de activos)",
     "en": "Investment fund (asset management)"
    },
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2011-12.md",
     "linea": 2926
    }
   },
   "benfica-tv": {
    "nombre": "Benfica TV, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Televisión y medios del club (BTV)",
     "en": "Club television and media (BTV)"
    },
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2017-18.md",
     "linea": 2677
    }
   },
   "clinica-slb": {
    "nombre": "Clínica do SLB, Lda",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Servicios de salud (medicina y enfermería deportiva)",
     "en": "Health services (sports medicine and nursing)"
    },
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2009-11-03.md",
     "linea": 1444
    }
   }
  },
  "relaciones": [
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 55.87,
    "desde": 2006,
    "hasta": 2006,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2005-06.md",
     "linea": 1130
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 10.2,
    "desde": 2006,
    "hasta": 2006,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2005-06.md",
     "linea": 1552
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 55.71,
    "desde": 2007,
    "hasta": 2007,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2006-07.md",
     "linea": 1308
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 10.04,
    "desde": 2007,
    "hasta": 2007,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2006-07.md",
     "linea": 1734
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 55.72,
    "desde": 2008,
    "hasta": 2008,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2007-08.md",
     "linea": 1475
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 10.04,
    "desde": 2008,
    "hasta": 2008,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2007-08.md",
     "linea": 709
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 55.8,
    "desde": 2009,
    "hasta": 2009,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2009-11-03.md",
     "linea": 1430
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 10.06,
    "desde": 2009,
    "hasta": 2009,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2009-11-03.md",
     "linea": 985
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 67.94,
    "desde": 2010,
    "hasta": 2010,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2010-11-11.md",
     "linea": 6496
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 24.2,
    "desde": 2010,
    "hasta": 2010,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2010-11-11.md",
     "linea": 4811
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 67.38,
    "desde": 2012,
    "hasta": 2012,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2011-12.md",
     "linea": 2893
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.64,
    "desde": 2012,
    "hasta": 2012,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2011-12.md",
     "linea": 985
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 67.38,
    "desde": 2013,
    "hasta": 2013,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2012-13-pos-AG.md",
     "linea": 3007
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.64,
    "desde": 2013,
    "hasta": 2013,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2012-13-pos-AG.md",
     "linea": 1092
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.97,
    "desde": 2014,
    "hasta": 2014,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2013-14-pos-AG.md",
     "linea": 2814
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2014,
    "hasta": 2014,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2013-14-pos-AG.md",
     "linea": 1087
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.97,
    "desde": 2016,
    "hasta": 2016,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2015-16.md",
     "linea": 2842
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2016,
    "hasta": 2016,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2015-16.md",
     "linea": 1120
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.93,
    "desde": 2017,
    "hasta": 2017,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2016-17-pos-AG.md",
     "linea": 2820
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2017,
    "hasta": 2017,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2016-17-pos-AG.md",
     "linea": 1132
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.93,
    "desde": 2018,
    "hasta": 2018,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2017-18.md",
     "linea": 2666
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2018,
    "hasta": 2018,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2017-18.md",
     "linea": 974
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.93,
    "desde": 2019,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2018-19.md",
     "linea": 2859
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2019,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2018-19.md",
     "linea": 1175
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.93,
    "desde": 2020,
    "hasta": 2020,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2019-20-pos-AG.md",
     "linea": 3046
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2020,
    "hasta": 2020,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2019-20-pos-AG.md",
     "linea": 1236
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.98,
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2020-21.md",
     "linea": 3289
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2020-21.md",
     "linea": 1087
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.98,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2021-22.md",
     "linea": 1127
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2021-22.md",
     "linea": 1090
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.98,
    "desde": 2023,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2022-23-pos-AG.md",
     "linea": 1061
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2023,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2022-23-pos-AG.md",
     "linea": 1036
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 66.98,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2023-24.md",
     "linea": 1086
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2023-24.md",
     "linea": 1064
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 63.7,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2024-25-pos-AG.md",
     "linea": 1246
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2024-25-pos-AG.md",
     "linea": 1218
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sad",
    "rel": "controla",
    "pct": 63.7,
    "desde": 2026,
    "hasta": 2026,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2025-26.md",
     "linea": 1172
    }
   },
   {
    "de": "benfica-sgps",
    "a": "benfica-sad",
    "rel": "participa",
    "pct": 23.65,
    "desde": 2026,
    "hasta": 2026,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2025-26.md",
     "linea": 1150
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sgps",
    "rel": "controla",
    "pct": 100,
    "desde": 2012,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2011-12.md",
     "linea": 2893
    }
   },
   {
    "de": "benfica-clube",
    "a": "benfica-sgps",
    "rel": "controla",
    "desde": 2020,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2019-20-pos-AG.md",
     "linea": 1274
    }
   },
   {
    "de": "benfica-sad",
    "a": "benfica-estadio",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2010,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2010-11-11.md",
     "linea": 6528
    }
   },
   {
    "de": "benfica-sad",
    "a": "benfica-tv",
    "rel": "participa",
    "pct": 49.998,
    "consolidada": false,
    "desde": 2009,
    "hasta": 2012,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2009-11-03.md",
     "linea": 1445
    }
   },
   {
    "de": "benfica-sad",
    "a": "benfica-tv",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2013,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2012-13-pos-AG.md",
     "linea": 3035
    }
   },
   {
    "de": "benfica-sad",
    "a": "clinica-slb",
    "rel": "participa",
    "pct": 50,
    "consolidada": false,
    "desde": 2009,
    "hasta": 2017,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/prestacao-contas-2009-11-03.md",
     "linea": 1444
    }
   },
   {
    "de": "benfica-sad",
    "a": "benfica-stars-fund",
    "rel": "participa",
    "pct": 15,
    "consolidada": false,
    "desde": 2012,
    "hasta": 2014,
    "fuente": {
     "md": "Clubes/Portugal/Benfica/relatorio-contas-2011-12.md",
     "linea": 2926
    }
   }
  ]
 },
 "braga-pt": {
  "cargas": [
   {
    "anio": 2016,
    "entidad": "braga-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2015-16.md",
     "linea": 1358
    }
   },
   {
    "anio": 2017,
    "entidad": "braga-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2016-17.md",
     "linea": 1204
    }
   },
   {
    "anio": 2020,
    "entidad": "braga-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2019-20.md",
     "linea": 1817
    }
   },
   {
    "anio": 2022,
    "entidad": "braga-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2021-22.md",
     "linea": 1850
    }
   },
   {
    "anio": 2023,
    "entidad": "braga-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Braga/Relato_rio-Contas-2022-23-SAD.md",
     "linea": 173
    }
   },
   {
    "anio": 2024,
    "entidad": "braga-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2023-24.md",
     "linea": 2047
    }
   },
   {
    "anio": 2025,
    "entidad": "braga-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2024-25.md",
     "linea": 2019
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
   "qsi": {
    "nombre": "Qatar Sports Investments",
    "forma": "holding",
    "pais": "QA",
    "grupo": {
     "id": "qsi",
     "nombre": "Qatar Sports Investments",
     "alias": [
      "QSI",
      "Qatar Sports Investments"
     ]
    },
    "que": {
     "es": "Accionista de la Braga SAD; el documento dice que su beneficiario efectivo es el Estado de Qatar",
     "en": "Shareholder of Braga SAD; the document says its ultimate beneficial owner is the State of Qatar"
    },
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2023-24.md",
     "linea": 1772
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
   },
   {
    "de": "sc-braga",
    "a": "braga-sad",
    "rel": "participa",
    "pct": 36.69,
    "desde": 2016,
    "hasta": 2016,
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2015-16.md",
     "linea": 1854
    }
   },
   {
    "de": "sc-braga",
    "a": "braga-sad",
    "rel": "participa",
    "pct": 36.88,
    "desde": 2017,
    "hasta": 2017,
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2016-17.md",
     "linea": 979
    }
   },
   {
    "de": "sc-braga",
    "a": "braga-sad",
    "rel": "participa",
    "pct": 36.92,
    "desde": 2020,
    "hasta": 2020,
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2019-20.md",
     "linea": 1554
    }
   },
   {
    "de": "sc-braga",
    "a": "braga-sad",
    "rel": "participa",
    "pct": 36.98,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2021-22.md",
     "linea": 1590
    }
   },
   {
    "de": "sc-braga",
    "a": "braga-sad",
    "rel": "participa",
    "pct": 36.99,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Braga/relatorio-contas-2023-24.md",
     "linea": 1771
    }
   },
   {
    "de": "qsi",
    "a": "braga-sad",
    "rel": "participa",
    "pct": 29.6,
    "desde": 2023,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Braga/Relato_rio-Contas-2022-23-SAD.md",
     "linea": 1613
    }
   }
  ]
 },
 "casapia-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "casapia-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Casa Pia/relatorio-contas-2021-22.md",
     "linea": 498
    }
   },
   {
    "anio": 2023,
    "entidad": "casapia-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Casa Pia/relatorio-contas-2022-23.md",
     "linea": 407
    }
   },
   {
    "anio": 2024,
    "entidad": "casapia-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Casa Pia/relatorio-contas-2023-24.md",
     "linea": 394
    }
   },
   {
    "anio": 2025,
    "entidad": "casapia-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Casa Pia/relatorio-contas-2024-25.md",
     "linea": 528
    }
   }
  ],
  "entidades": {
   "casa-pia-ac": {
    "nombre": "Casa Pia Atlético Clube (Ateneu Casapiano)",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, socio único de la SDUQ",
     "en": "The members' club, sole member of the SDUQ"
    },
    "fuente": {
     "md": "Clubes/Portugal/Casa Pia/relatorio-contas-2021-22.md",
     "linea": 580
    }
   },
   "casapia-sduq": {
    "nombre": "Casa Pia Atlético Clube – Futebol, SDUQ, Lda",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "casapia-pt",
    "fuente": {
     "md": "Clubes/Portugal/Casa Pia/relatorio-contas-2021-22.md",
     "linea": 498
    }
   },
   "plantel-fundamental": {
    "nombre": "Plantel Fundamental Unipessoal, Lda",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Sociedad vehículo del inversor que gestiona el fútbol profesional según el Acuerdo de Gestión",
     "en": "The investor's vehicle company that runs professional football under the Management Agreement"
    },
    "fuente": {
     "md": "Clubes/Portugal/Casa Pia/relatorio-contas-2021-22.md",
     "linea": 253
    }
   }
  },
  "relaciones": [
   {
    "de": "casa-pia-ac",
    "a": "casapia-sduq",
    "rel": "controla",
    "pct": 100,
    "desde": 2022,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Casa Pia/relatorio-contas-2021-22.md",
     "linea": 580
    }
   },
   {
    "de": "plantel-fundamental",
    "a": "casapia-sduq",
    "rel": "vinculada",
    "desde": 2022,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Casa Pia/relatorio-contas-2021-22.md",
     "linea": 502
    }
   }
  ]
 },
 "chaves-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "chaves-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Chaves/RC-2021-2022_compressed-1.md",
     "linea": 76
    }
   },
   {
    "anio": 2023,
    "entidad": "chaves-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Chaves/RC-2022-2023-com.md",
     "linea": 108
    }
   }
  ],
  "entidades": {
   "chaves-sad": {
    "nombre": "Grupo Desportivo de Chaves – Futebol SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "chaves-pt",
    "fuente": {
     "md": "Clubes/Portugal/Chaves/RC-2021-2022_compressed-1.md",
     "linea": 599
    }
   },
   "francisco-carvalho": {
    "nombre": "Francisco José Gomes de Carvalho",
    "forma": "persona",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Chaves/RC-2021-2022_compressed-1.md",
     "linea": 236
    }
   },
   "gd-chaves": {
    "nombre": "Grupo Desportivo de Chaves",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, accionista de la SAD",
     "en": "The members' club, a shareholder of the SAD"
    },
    "fuente": {
     "md": "Clubes/Portugal/Chaves/RC-2021-2022_compressed-1.md",
     "linea": 236
    }
   }
  },
  "relaciones": [
   {
    "de": "francisco-carvalho",
    "a": "chaves-sad",
    "rel": "controla",
    "pct": 89.95,
    "desde": 2022,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Chaves/RC-2021-2022_compressed-1.md",
     "linea": 236
    }
   },
   {
    "de": "gd-chaves",
    "a": "chaves-sad",
    "rel": "participa",
    "pct": 10,
    "desde": 2022,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Chaves/RC-2021-2022_compressed-1.md",
     "linea": 236
    }
   }
  ]
 },
 "estorilpraia-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "estoril-praia-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2021-22.md",
     "linea": 17
    }
   },
   {
    "anio": 2023,
    "entidad": "estoril-praia-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2022-23.md",
     "linea": 69
    }
   },
   {
    "anio": 2024,
    "entidad": "estoril-praia-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2023-24.md",
     "linea": 77
    }
   },
   {
    "anio": 2025,
    "entidad": "estoril-praia-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.md",
     "linea": 66
    }
   }
  ],
  "entidades": {
   "estoril-praia-sad": {
    "nombre": "Estoril Praia – Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "estorilpraia-pt",
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2021-22.md",
     "linea": 76
    }
   },
   "gd-estoril-praia": {
    "nombre": "Grupo Desportivo Estoril Praia",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, fundador de la SAD",
     "en": "The members' club, founder of the SAD"
    },
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2021-22.md",
     "linea": 1949
    }
   },
   "globalon-football-holdings": {
    "nombre": "Globalon Football Holdings Group, S.L.",
    "forma": "holding",
    "pais": "ES",
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2021-22.md",
     "linea": 1948
    }
   }
  },
  "relaciones": [
   {
    "de": "globalon-football-holdings",
    "a": "estoril-praia-sad",
    "rel": "controla",
    "pct": 84.53,
    "desde": 2022,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2023-24.md",
     "linea": 1950
    }
   },
   {
    "de": "globalon-football-holdings",
    "a": "estoril-praia-sad",
    "rel": "controla",
    "pct": 92.27,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.md",
     "linea": 1849
    }
   },
   {
    "de": "gd-estoril-praia",
    "a": "estoril-praia-sad",
    "rel": "participa",
    "pct": 10.02,
    "desde": 2022,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2023-24.md",
     "linea": 1951
    }
   },
   {
    "de": "gd-estoril-praia",
    "a": "estoril-praia-sad",
    "rel": "participa",
    "pct": 5,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.md",
     "linea": 1850
    }
   }
  ]
 },
 "estreladaamadora-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "estrela-amadora-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Estrela da Amadora/relatorio-contas-2021-22.md",
     "linea": 11
    }
   },
   {
    "anio": 2023,
    "entidad": "estrela-amadora-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Estrela da Amadora/relatorio-contas-2022-23.md",
     "linea": 13
    }
   }
  ],
  "entidades": {
   "adventure-domain": {
    "nombre": "Adventure Domain, Lda.",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Estrela da Amadora/relatorio-contas-2021-22.md",
     "linea": 804
    }
   },
   "clube-sintra-football": {
    "nombre": "Clube Sintra Football",
    "forma": "club",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Estrela da Amadora/relatorio-contas-2021-22.md",
     "linea": 824
    }
   },
   "estrela-amadora-sad": {
    "nombre": "CFEA - Club Football Estrela, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "estreladaamadora-pt",
    "fuente": {
     "md": "Clubes/Portugal/Estrela da Amadora/relatorio-contas-2021-22.md",
     "linea": 284
    }
   }
  },
  "relaciones": [
   {
    "de": "adventure-domain",
    "a": "estrela-amadora-sad",
    "rel": "controla",
    "pct": 79.8,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Estrela da Amadora/relatorio-contas-2021-22.md",
     "linea": 284
    }
   },
   {
    "de": "clube-sintra-football",
    "a": "estrela-amadora-sad",
    "rel": "participa",
    "pct": 10,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Estrela da Amadora/relatorio-contas-2021-22.md",
     "linea": 824
    }
   }
  ]
 },
 "famalicao-pt": {
  "cargas": [
   {
    "anio": 2019,
    "entidad": "famalicao-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2018-19.md",
     "linea": 30
    }
   },
   {
    "anio": 2020,
    "entidad": "famalicao-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2019-20.md",
     "linea": 28
    }
   },
   {
    "anio": 2021,
    "entidad": "famalicao-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2020-21.md",
     "linea": 30
    }
   },
   {
    "anio": 2022,
    "entidad": "famalicao-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2021-22.md",
     "linea": 30
    }
   },
   {
    "anio": 2023,
    "entidad": "famalicao-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2022-23.md",
     "linea": 32
    }
   },
   {
    "anio": 2024,
    "entidad": "famalicao-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2023-24.md",
     "linea": 5
    }
   },
   {
    "anio": 2025,
    "entidad": "famalicao-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2024-25.md",
     "linea": 22
    }
   }
  ],
  "entidades": {
   "famalicao-sad": {
    "nombre": "Futebol Clube de Famalicão – Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "famalicao-pt",
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2018-19.md",
     "linea": 30
    }
   },
   "fc-famalicao": {
    "nombre": "Futebol Clube de Famalicão",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, fundador de la SAD",
     "en": "The members' club, founder of the SAD"
    },
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2018-19.md",
     "linea": 71
    }
   },
   "qpml": {
    "nombre": "Quantum Pacific Management Limited",
    "forma": "holding",
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2018-19.md",
     "linea": 71
    }
   }
  },
  "relaciones": [
   {
    "de": "qpml",
    "a": "famalicao-sad",
    "rel": "controla",
    "pct": 58,
    "desde": 2019,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2018-19.md",
     "linea": 574
    }
   },
   {
    "de": "qpml",
    "a": "famalicao-sad",
    "rel": "controla",
    "pct": 85,
    "desde": 2020,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2024-25.md",
     "linea": 50
    }
   },
   {
    "de": "fc-famalicao",
    "a": "famalicao-sad",
    "rel": "vinculada",
    "desde": 2019,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Famalicão/relatorio-contas-2024-25.md",
     "linea": 50
    }
   }
  ]
 },
 "felgueiras-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "felgueiras-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.md",
     "linea": 273
    }
   },
   {
    "anio": 2023,
    "entidad": "felgueiras-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Fecho-contas-2022-2023.md",
     "linea": 303
    }
   },
   {
    "anio": 2024,
    "entidad": "felgueiras-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Demonstracoes-Financeiras-Individuais-Epoca-2023-2024.md",
     "linea": 116
    }
   }
  ],
  "entidades": {
   "fc-felgueiras-1932": {
    "nombre": "Futebol Clube de Felgueiras 1932",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación",
     "en": "The members' club"
    },
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.md",
     "linea": 1663
    }
   },
   "felgueiras-sad": {
    "nombre": "Futebol Clube Felgueiras - Futebol SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "felgueiras-pt",
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Demonstracoes-Financeiras-Individuais-Epoca-2023-2024.md",
     "linea": 116
    }
   },
   "galaxia-regia-sgps": {
    "nombre": "Galaxia Regia SGPS",
    "forma": "holding",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.md",
     "linea": 1661
    }
   },
   "joao-reinaldo-teixeira": {
    "nombre": "João Reinaldo da Cunha Teixeira",
    "forma": "persona",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.md",
     "linea": 1662
    }
   }
  },
  "relaciones": [
   {
    "de": "galaxia-regia-sgps",
    "a": "felgueiras-sad",
    "rel": "controla",
    "pct": 51,
    "desde": 2022,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.md",
     "linea": 1661
    }
   },
   {
    "de": "joao-reinaldo-teixeira",
    "a": "felgueiras-sad",
    "rel": "participa",
    "pct": 28.5,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.md",
     "linea": 1662
    }
   },
   {
    "de": "fc-felgueiras-1932",
    "a": "felgueiras-sad",
    "rel": "participa",
    "pct": 20,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Felgueiras/Fecho-de-contas-SAD-2021-2022.md",
     "linea": 1663
    }
   }
  ]
 },
 "gilvicente-pt": {
  "cargas": [
   {
    "anio": 2021,
    "entidad": "gil-vicente-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/relatorio-contas-2020-21.md",
     "linea": 19
    }
   },
   {
    "anio": 2022,
    "entidad": "gil-vicente-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/wf-src-Relatorio_SDUQ_Final.md",
     "linea": 18
    }
   },
   {
    "anio": 2023,
    "entidad": "gil-vicente-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/relatorio-contas-2022-23.md",
     "linea": 937
    }
   },
   {
    "anio": 2024,
    "entidad": "gil-vicente-fc",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/relatorio-contas-2023-24.md",
     "linea": 150
    }
   },
   {
    "anio": 2025,
    "entidad": "gil-vicente-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.md",
     "linea": 15
    }
   }
  ],
  "entidades": {
   "gil-vicente-fc": {
    "nombre": "Gil Vicente Futebol Clube",
    "forma": "asociacion",
    "pais": "PT",
    "clubId": "gilvicente-pt",
    "que": {
     "es": "El club asociación, controlante del grupo",
     "en": "The members' club, parent of the group"
    },
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/relatorio-contas-2023-24.md",
     "linea": 150
    }
   },
   "gil-vicente-sduq": {
    "nombre": "Gil Vicente Futebol Clube – Futebol, SDUQ, Lda.",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "gilvicente-pt",
    "que": {
     "es": "La sociedad unipersonal del fútbol profesional",
     "en": "The single-member company running professional football"
    },
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/relatorio-contas-2023-24.md",
     "linea": 151
    }
   }
  },
  "relaciones": [
   {
    "de": "gil-vicente-fc",
    "a": "gil-vicente-sduq",
    "rel": "controla",
    "pct": 100,
    "desde": 2021,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/relatorio-contas-2020-21.md",
     "linea": 2052
    }
   },
   {
    "de": "gil-vicente-fc",
    "a": "gil-vicente-sduq",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/relatorio-contas-2023-24.md",
     "linea": 151
    }
   },
   {
    "de": "gil-vicente-fc",
    "a": "gil-vicente-sduq",
    "rel": "controla",
    "pct": 100,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.md",
     "linea": 2342
    }
   }
  ]
 },
 "leixoes-pt": {
  "cargas": [
   {
    "anio": 2023,
    "entidad": "leixoes-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2022-2023.md",
     "linea": 323
    }
   },
   {
    "anio": 2024,
    "entidad": "leixoes-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2023-2024.md",
     "linea": 395
    }
   },
   {
    "anio": 2025,
    "entidad": "leixoes-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Leixoes/Relatorio-de-Gestao-e-Contas-2024-2025.md",
     "linea": 249
    }
   }
  ],
  "entidades": {
   "leixoes-sad": {
    "nombre": "Leixões Sport Clube Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "leixoes-pt",
    "fuente": {
     "md": "Clubes/Portugal/Leixoes/Relatorio-de-Gestao-e-Contas-2024-2025.md",
     "linea": 249
    }
   },
   "leixoes-sport-clube": {
    "nombre": "Leixões Sport Clube",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, titular de las acciones de categoría A",
     "en": "The members' club, holder of the category A shares"
    },
    "fuente": {
     "md": "Clubes/Portugal/Leixoes/Relatorio-de-Gestao-e-Contas-2024-2025.md",
     "linea": 675
    }
   },
   "play-fair": {
    "nombre": "Play-Fair, Lda.",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2022-2023.md",
     "linea": 375
    }
   }
  },
  "relaciones": [
   {
    "de": "play-fair",
    "a": "leixoes-sad",
    "rel": "controla",
    "desde": 2023,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2022-2023.md",
     "linea": 375
    }
   },
   {
    "de": "leixoes-sport-clube",
    "a": "leixoes-sad",
    "rel": "participa",
    "pct": 40,
    "desde": 2023,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Leixoes/Relatorio-de-Gestao-e-Contas-2024-2025.md",
     "linea": 675
    }
   }
  ]
 },
 "mafra-pt": {
  "cargas": [
   {
    "anio": 2024,
    "entidad": "mafra-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md",
     "linea": 579
    }
   }
  ],
  "entidades": {
   "cd-mafra": {
    "nombre": "Clube Desportivo de Mafra",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación fundador, 1965",
     "en": "The founding members' club, 1965"
    },
    "fuente": {
     "md": "Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md",
     "linea": 585
    }
   },
   "football-collective": {
    "nombre": "Football Collective A/S",
    "forma": "holding",
    "fuente": {
     "md": "Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md",
     "linea": 585
    }
   },
   "footclub-investments": {
    "nombre": "Footclub Investments SGPS SA",
    "forma": "holding",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md",
     "linea": 585
    }
   },
   "mafra-sad": {
    "nombre": "Clube Desportivo de Mafra – Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "mafra-pt",
    "fuente": {
     "md": "Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md",
     "linea": 579
    }
   }
  },
  "relaciones": [
   {
    "de": "football-collective",
    "a": "mafra-sad",
    "rel": "controla",
    "pct": 80,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md",
     "linea": 585
    }
   },
   {
    "de": "footclub-investments",
    "a": "mafra-sad",
    "rel": "participa",
    "pct": 10,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md",
     "linea": 585
    }
   },
   {
    "de": "cd-mafra",
    "a": "mafra-sad",
    "rel": "participa",
    "pct": 10,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Mafra/PRESTACAO-CONTAS-EPOCA-2023_2024_Final.md",
     "linea": 585
    }
   }
  ]
 },
 "maritimo-pt": {
  "cargas": [
   {
    "anio": 2021,
    "entidad": "maritimo-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Maritimo/MaritimoSAD_RC_30.06.2021.md",
     "linea": 3
    }
   },
   {
    "anio": 2022,
    "entidad": "maritimo-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Maritimo/MaritimoSAD_RC_30.06.2022.md",
     "linea": 3
    }
   },
   {
    "anio": 2023,
    "entidad": "maritimo-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Maritimo/MaritimoSAD_RC_30.06.2023.md",
     "linea": 3
    }
   },
   {
    "anio": 2025,
    "entidad": "maritimo-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.md",
     "linea": 3
    }
   }
  ],
  "entidades": {
   "club-sport-maritimo": {
    "nombre": "Club Sport Marítimo",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, accionista de la SAD",
     "en": "The members' club, shareholder of the SAD"
    },
    "fuente": {
     "md": "Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.md",
     "linea": 1281
    }
   },
   "maritimo-sad": {
    "nombre": "Marítimo da Madeira - Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "maritimo-pt",
    "fuente": {
     "md": "Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.md",
     "linea": 3
    }
   },
   "regiao-autonoma-madeira": {
    "nombre": "Região Autónoma da Madeira",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "Gobierno regional, accionista minoritario",
     "en": "Regional government, minority shareholder"
    },
    "fuente": {
     "md": "Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.md",
     "linea": 1281
    }
   }
  },
  "relaciones": [
   {
    "de": "club-sport-maritimo",
    "a": "maritimo-sad",
    "rel": "controla",
    "pct": 91,
    "desde": 2021,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.md",
     "linea": 1281
    }
   },
   {
    "de": "regiao-autonoma-madeira",
    "a": "maritimo-sad",
    "rel": "participa",
    "pct": 2,
    "desde": 2021,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Maritimo/FUTEBOL-SAD_RC-30.06.2025.md",
     "linea": 1281
    }
   }
  ]
 },
 "moreirense-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "moreirense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2021-22.md",
     "linea": 15
    }
   },
   {
    "anio": 2023,
    "entidad": "moreirense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2022-23.md",
     "linea": 15
    }
   },
   {
    "anio": 2024,
    "entidad": "moreirense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2023-24.md",
     "linea": 15
    }
   },
   {
    "anio": 2025,
    "entidad": "moreirense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2024-25.md",
     "linea": 15
    }
   }
  ],
  "entidades": {
   "bkfc": {
    "nombre": "Black Knight Football Club Uk Limited",
    "forma": "holding",
    "pais": "GB",
    "grupo": {
     "id": "black-knight",
     "nombre": "Black Knight Football Club",
     "alias": [
      "Black Knight",
      "BKFC",
      "Bill Foley"
     ]
    },
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2024-25.md",
     "linea": 673
    }
   },
   "moreirense-fc": {
    "nombre": "Moreirense Futebol Clube",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, fundador de la SAD",
     "en": "The members' club, founder of the SAD"
    },
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2023-24.md",
     "linea": 748
    }
   },
   "moreirense-sad": {
    "nombre": "Moreirense Futebol Clube – Futebol SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "moreirense-pt",
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2023-24.md",
     "linea": 626
    }
   }
  },
  "relaciones": [
   {
    "de": "moreirense-fc",
    "a": "moreirense-sad",
    "rel": "controla",
    "pct": 75,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2021-22.md",
     "linea": 67
    }
   },
   {
    "de": "moreirense-fc",
    "a": "moreirense-sad",
    "rel": "controla",
    "pct": 75,
    "desde": 2023,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2023-24.md",
     "linea": 748
    }
   },
   {
    "de": "bkfc",
    "a": "moreirense-sad",
    "rel": "controla",
    "pct": 66.67,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2024-25.md",
     "linea": 826
    }
   },
   {
    "de": "moreirense-fc",
    "a": "moreirense-sad",
    "rel": "participa",
    "pct": 12.18,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Moreirense/relatorio-contas-2024-25.md",
     "linea": 826
    }
   }
  ]
 },
 "nacional-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "cd-nacional-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Nacional/relatorio-contas-2021-22.md",
     "linea": 13
    }
   },
   {
    "anio": 2023,
    "entidad": "cd-nacional-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Nacional/relatorio-contas-2022-23.md",
     "linea": 13
    }
   },
   {
    "anio": 2024,
    "entidad": "cd-nacional-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Nacional/relatorio-contas-2023-24.md",
     "linea": 13
    }
   },
   {
    "anio": 2025,
    "entidad": "cd-nacional-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Nacional/relatorio-contas-2024-25.md",
     "linea": 13
    }
   }
  ],
  "entidades": {
   "cd-nacional": {
    "nombre": "Clube Desportivo Nacional",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación",
     "en": "The members' club"
    },
    "fuente": {
     "md": "Clubes/Portugal/Nacional/relatorio-contas-2024-25.md",
     "linea": 401
    }
   },
   "cd-nacional-sad": {
    "nombre": "Clube Desportivo Nacional, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "nacional-pt",
    "fuente": {
     "md": "Clubes/Portugal/Nacional/relatorio-contas-2024-25.md",
     "linea": 13
    }
   },
   "cd-nacional-sgps": {
    "nombre": "Clube Desportivo Nacional SGPS, S.A.",
    "forma": "holding",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Nacional/relatorio-contas-2024-25.md",
     "linea": 400
    }
   }
  },
  "relaciones": [
   {
    "de": "cd-nacional-sgps",
    "a": "cd-nacional-sad",
    "rel": "controla",
    "desde": 2022,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Nacional/relatorio-contas-2024-25.md",
     "linea": 400
    }
   },
   {
    "de": "cd-nacional",
    "a": "cd-nacional-sgps",
    "rel": "controla",
    "desde": 2022,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Nacional/relatorio-contas-2024-25.md",
     "linea": 401
    }
   }
  ]
 },
 "oliveirense-pt": {
  "cargas": [
   {
    "anio": 2023,
    "entidad": "oliveirense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202223.md",
     "linea": 32
    }
   },
   {
    "anio": 2024,
    "entidad": "oliveirense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202324.md",
     "linea": 11
    }
   },
   {
    "anio": 2025,
    "entidad": "oliveirense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.md",
     "linea": 11
    }
   }
  ],
  "entidades": {
   "nuts-and-about": {
    "nombre": "Nuts & About, Inc.",
    "forma": "sociedad",
    "pais": "JP",
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.md",
     "linea": 1005
    }
   },
   "oliveirense-sad": {
    "nombre": "União Desportiva Oliveirense – Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "oliveirense-pt",
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202324.md",
     "linea": 817
    }
   },
   "onodera-holdings": {
    "nombre": "Onodera Holdings Co., Ltd",
    "forma": "holding",
    "pais": "JP",
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202324.md",
     "linea": 817
    }
   },
   "ud-oliveirense": {
    "nombre": "União Desportiva Oliveirense",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación",
     "en": "The members' club"
    },
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.md",
     "linea": 1004
    }
   }
  },
  "relaciones": [
   {
    "de": "onodera-holdings",
    "a": "oliveirense-sad",
    "rel": "controla",
    "pct": 52.5,
    "desde": 2023,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.md",
     "linea": 1001
    }
   },
   {
    "de": "ud-oliveirense",
    "a": "oliveirense-sad",
    "rel": "participa",
    "pct": 29,
    "desde": 2023,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.md",
     "linea": 1004
    }
   },
   {
    "de": "nuts-and-about",
    "a": "oliveirense-sad",
    "rel": "participa",
    "pct": 17.5,
    "desde": 2023,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Oliveirense/Relatorio-e-Contas-202425.md",
     "linea": 1005
    }
   }
  ]
 },
 "pacosdeferreira-pt": {
  "cargas": [
   {
    "anio": 2020,
    "entidad": "pacos-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Paços de Ferreira/47-DEMONSTRACOES-FINANCEIRAS_compressed.md",
     "linea": 178
    }
   },
   {
    "anio": 2022,
    "entidad": "pacos-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Paços de Ferreira/contas21_22.md",
     "linea": 162
    }
   },
   {
    "anio": 2023,
    "entidad": "pacos-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Paços de Ferreira/contas22_23.md",
     "linea": 162
    }
   },
   {
    "anio": 2024,
    "entidad": "pacos-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Paços de Ferreira/contas23_24.md",
     "linea": 163
    }
   },
   {
    "anio": 2025,
    "entidad": "pacos-sduq",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Paços de Ferreira/contas_2425.md",
     "linea": 110
    }
   }
  ],
  "entidades": {
   "fc-pacos-de-ferreira": {
    "nombre": "Futebol Clube de Paços de Ferreira",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, dueño único de la sociedad",
     "en": "The members' club, sole owner of the company"
    },
    "fuente": {
     "md": "Clubes/Portugal/Paços de Ferreira/47-DEMONSTRACOES-FINANCEIRAS_compressed.md",
     "linea": 181
    }
   },
   "pacos-sduq": {
    "nombre": "Futebol Clube de Paços de Ferreira, SDUQ, Lda.",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "pacosdeferreira-pt",
    "fuente": {
     "md": "Clubes/Portugal/Paços de Ferreira/47-DEMONSTRACOES-FINANCEIRAS_compressed.md",
     "linea": 178
    }
   }
  },
  "relaciones": [
   {
    "de": "fc-pacos-de-ferreira",
    "a": "pacos-sduq",
    "rel": "controla",
    "desde": 2020,
    "hasta": 2020,
    "fuente": {
     "md": "Clubes/Portugal/Paços de Ferreira/47-DEMONSTRACOES-FINANCEIRAS_compressed.md",
     "linea": 181
    }
   },
   {
    "de": "fc-pacos-de-ferreira",
    "a": "pacos-sduq",
    "rel": "controla",
    "pct": 100,
    "desde": 2023,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Paços de Ferreira/contas22_23.md",
     "linea": 196
    }
   }
  ]
 },
 "porto-pt": {
  "cargas": [
   {
    "anio": 2016,
    "entidad": "porto-clube",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md",
     "linea": 1153
    }
   },
   {
    "anio": 2017,
    "entidad": "porto-clube",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2016-17.md",
     "linea": 1029
    }
   },
   {
    "anio": 2018,
    "entidad": "porto-clube",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2017-18.md",
     "linea": 1024
    }
   },
   {
    "anio": 2019,
    "entidad": "porto-clube",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2018-19.md",
     "linea": 1125
    }
   },
   {
    "anio": 2021,
    "entidad": "porto-clube",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2020-21.md",
     "linea": 1012
    }
   },
   {
    "anio": 2022,
    "entidad": "porto-clube",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2021-22.md",
     "linea": 1044
    }
   },
   {
    "anio": 2023,
    "entidad": "porto-clube",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2022-23.md",
     "linea": 1145
    }
   },
   {
    "anio": 2024,
    "entidad": "porto-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 17
    }
   },
   {
    "anio": 2025,
    "entidad": "porto-sad",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2024-2025-6b41056f.md",
     "linea": 5525
    }
   }
  ],
  "entidades": {
   "avenida-dos-aliados": {
    "nombre": "Avenida dos Aliados, Sociedade de Comunicação, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Opera el canal de televisión por cable Porto Canal",
     "en": "Runs the cable TV channel Porto Canal"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2043
    }
   },
   "dragon-tour": {
    "nombre": "Dragon Tour, Agência de Viagens, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Agencia de viajes, entradas y reservas",
     "en": "Travel agency, ticketing and bookings"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2040
    }
   },
   "euroantas": {
    "nombre": "Euroantas, Promoção e Gestão de Empreendimentos Imobiliários, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Explota activos inmobiliarios, en particular el Estadio do Dragão",
     "en": "Real-estate assets, notably the Estádio do Dragão"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2042
    }
   },
   "fcp-media": {
    "nombre": "FC Porto – Media, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Producción y difusión de contenidos audiovisuales y multimedia",
     "en": "Audiovisual and multimedia production and distribution"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2041
    }
   },
   "investiantas": {
    "nombre": "Investiantas, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md",
     "linea": 1869
    }
   },
   "porto-clube": {
    "nombre": "Futebol Clube do Porto",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación: los socios y las demás disciplinas; controla el grupo",
     "en": "The members' club; it controls the group"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md",
     "linea": 1153
    }
   },
   "porto-comercial": {
    "nombre": "PortoComercial – Sociedade de Comercialização, Licenciamento e Sponsorização, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Comercialización de derechos de imagen, patrocinio, merchandising y licencias",
     "en": "Image rights, sponsorship, merchandising and licensing"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 1665
    }
   },
   "porto-estadio": {
    "nombre": "PortoEstádio – Gestão e Exploração de Equipamentos Desportivos, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Gestión y explotación de equipamiento deportivo",
     "en": "Management of sports facilities"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2038
    }
   },
   "porto-multimedia": {
    "nombre": "F.C.PortoMultimédia – Edições Multimédia, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Edición y producción multimedia, internet y publicaciones",
     "en": "Multimedia, internet and publications"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2036
    }
   },
   "porto-sad": {
    "nombre": "Futebol Clube do Porto – Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Participación en el fútbol profesional y organización de espectáculos deportivos",
     "en": "Professional football participation and sporting events"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 17
    }
   },
   "porto-seguro": {
    "nombre": "PortoSeguro – Sociedade Mediadora de Seguros do Porto, Lda.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Intermediación de seguros",
     "en": "Insurance brokerage"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 1669
    }
   },
   "porto-servicos-partilhados": {
    "nombre": "FC Porto, Serviços Partilhados, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md",
     "linea": 1870
    }
   },
   "porto-sladco": {
    "nombre": "Porto SladCo, S.A.",
    "forma": "sociedad",
    "pais": "PT",
    "que": {
     "es": "Gestión de las áreas VIP, eventos y museo del Estadio do Dragão",
     "en": "VIP areas, events and museum of the Estádio do Dragão"
    },
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2024-2025-6b41056f.md",
     "linea": 6248
    }
   }
  },
  "relaciones": [
   {
    "de": "porto-clube",
    "a": "porto-sad",
    "rel": "controla",
    "pct": 74.6,
    "consolidada": true,
    "desde": 2016,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md",
     "linea": 1871
    }
   },
   {
    "de": "porto-clube",
    "a": "euroantas",
    "rel": "controla",
    "pct": 52.996,
    "consolidada": true,
    "desde": 2016,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md",
     "linea": 1868
    }
   },
   {
    "de": "porto-clube",
    "a": "porto-servicos-partilhados",
    "rel": "controla",
    "pct": 96,
    "consolidada": true,
    "desde": 2016,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md",
     "linea": 1870
    }
   },
   {
    "de": "porto-clube",
    "a": "investiantas",
    "rel": "controla",
    "pct": 84,
    "consolidada": false,
    "desde": 2016,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2015-16.md",
     "linea": 1869
    }
   },
   {
    "de": "porto-clube",
    "a": "porto-sad",
    "rel": "controla",
    "pct": 74.59,
    "consolidada": true,
    "desde": 2021,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2020-21.md",
     "linea": 1715
    }
   },
   {
    "de": "porto-clube",
    "a": "euroantas",
    "rel": "controla",
    "pct": 52.996,
    "consolidada": true,
    "desde": 2021,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2020-21.md",
     "linea": 1712
    }
   },
   {
    "de": "porto-clube",
    "a": "porto-servicos-partilhados",
    "rel": "controla",
    "pct": 96,
    "consolidada": true,
    "desde": 2021,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2020-21.md",
     "linea": 1714
    }
   },
   {
    "de": "porto-clube",
    "a": "investiantas",
    "rel": "controla",
    "pct": 84,
    "consolidada": false,
    "desde": 2021,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Porto/relatorio-contas-consolidadas-2020-21.md",
     "linea": 1713
    }
   },
   {
    "de": "porto-clube",
    "a": "porto-sad",
    "rel": "controla",
    "pct": 74.59,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2790
    }
   },
   {
    "de": "porto-sad",
    "a": "porto-comercial",
    "rel": "controla",
    "pct": 94.73,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2025
    }
   },
   {
    "de": "porto-sad",
    "a": "porto-multimedia",
    "rel": "controla",
    "pct": 69.35,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2036
    }
   },
   {
    "de": "porto-sad",
    "a": "porto-estadio",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2038
    }
   },
   {
    "de": "porto-sad",
    "a": "porto-seguro",
    "rel": "controla",
    "pct": 90,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2039
    }
   },
   {
    "de": "porto-sad",
    "a": "dragon-tour",
    "rel": "controla",
    "pct": 93.53,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2040
    }
   },
   {
    "de": "porto-sad",
    "a": "euroantas",
    "rel": "participa",
    "pct": 47,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2042
    }
   },
   {
    "de": "porto-sad",
    "a": "avenida-dos-aliados",
    "rel": "controla",
    "pct": 81.42,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2043
    }
   },
   {
    "de": "porto-sad",
    "a": "fcp-media",
    "rel": "controla",
    "pct": 98.81,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2023-2024-293efed8.md",
     "linea": 2041
    }
   },
   {
    "de": "porto-sad",
    "a": "porto-sladco",
    "rel": "controla",
    "pct": 78.86,
    "consolidada": true,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Porto/wf-2024-2025-6b41056f.md",
     "linea": 6248
    }
   }
  ]
 },
 "rioave-pt": {
  "cargas": [
   {
    "anio": 2016,
    "entidad": "rioave-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2015-16.md",
     "linea": 334
    }
   },
   {
    "anio": 2017,
    "entidad": "rioave-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2016-17.md",
     "linea": 544
    }
   },
   {
    "anio": 2018,
    "entidad": "rioave-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2017-18.md",
     "linea": 450
    }
   },
   {
    "anio": 2019,
    "entidad": "rioave-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2018-19.md",
     "linea": 165
    }
   },
   {
    "anio": 2020,
    "entidad": "rioave-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2019-20.md",
     "linea": 204
    }
   },
   {
    "anio": 2022,
    "entidad": "rioave-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2021-22.md",
     "linea": 473
    }
   },
   {
    "anio": 2023,
    "entidad": "rioave-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/Relatorio_SDUQ_2022-2023.md",
     "linea": 366
    }
   },
   {
    "anio": 2024,
    "entidad": "rioave-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2023-24.md",
     "linea": 522
    }
   },
   {
    "anio": 2025,
    "entidad": "rioave-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2024-25.md",
     "linea": 543
    }
   }
  ],
  "entidades": {
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
   "rah-sports-investments": {
    "nombre": "RAH Sports Investments Limited",
    "forma": "sociedad",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2024-25.md",
     "linea": 1782
    }
   },
   "rioave-clube": {
    "nombre": "Rio Ave Futebol Clube",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación",
     "en": "The members' club"
    },
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2014-15.md",
     "linea": 23
    }
   },
   "rioave-sad": {
    "nombre": "Rio Ave Futebol Clube – Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "rioave-pt",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2024-25.md",
     "linea": 543
    }
   }
  },
  "relaciones": [
   {
    "de": "rioave-clube",
    "a": "rioave-sad",
    "rel": "controla",
    "pct": 100,
    "desde": 2016,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2015-16.md",
     "linea": 342
    }
   },
   {
    "de": "rioave-clube",
    "a": "rioave-sad",
    "rel": "vinculada",
    "desde": 2024,
    "nota": "El club asociación sigue como accionista; el documento no imprime su porcentaje.",
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2023-24.md",
     "linea": 530
    }
   },
   {
    "de": "rah-sports-investments",
    "a": "rioave-sad",
    "rel": "controla",
    "pct": 80,
    "desde": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Rio Ave/relatorio-contas-2023-24.md",
     "linea": 97
    }
   },
   {
    "de": "marinakis",
    "a": "rah-sports-investments",
    "rel": "controla",
    "desde": 2024,
    "fuente": {
     "url": "https://en.wikipedia.org/wiki/Rio_Ave_F.C."
    }
   }
  ]
 },
 "santaclara-pt": {
  "cargas": [
   {
    "anio": 2020,
    "entidad": "santa-clara-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2019-20.md",
     "linea": 341
    }
   },
   {
    "anio": 2021,
    "entidad": "santa-clara-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2020-21.md",
     "linea": 461
    }
   },
   {
    "anio": 2022,
    "entidad": "santa-clara-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2021-22.md",
     "linea": 106
    }
   },
   {
    "anio": 2023,
    "entidad": "santa-clara-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2022-23.md",
     "linea": 90
    }
   },
   {
    "anio": 2024,
    "entidad": "santa-clara-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2023-24.md",
     "linea": 58
    }
   },
   {
    "anio": 2025,
    "entidad": "santa-clara-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2024-25.md",
     "linea": 54
    }
   }
  ],
  "entidades": {
   "azul-internacional": {
    "nombre": "Azul Internacional, Lda.",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2020-21.md",
     "linea": 1151
    }
   },
   "cd-santa-clara": {
    "nombre": "Clube Desportivo Santa Clara",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación, titular de las acciones de categoría A",
     "en": "The members' club, holder of the Category A shares"
    },
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2019-20.md",
     "linea": 773
    }
   },
   "ikarus-business": {
    "nombre": "Ikarus Business Inc.",
    "forma": "sociedad",
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2022-23.md",
     "linea": 94
    }
   },
   "santa-clara-sad": {
    "nombre": "Santa Clara Açores - Futebol, S.A.D.",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "santaclara-pt",
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2019-20.md",
     "linea": 28
    }
   }
  },
  "relaciones": [
   {
    "de": "cd-santa-clara",
    "a": "santa-clara-sad",
    "rel": "participa",
    "pct": 40,
    "desde": 2020,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2019-20.md",
     "linea": 773
    }
   },
   {
    "de": "azul-internacional",
    "a": "santa-clara-sad",
    "rel": "participa",
    "pct": 47.6,
    "desde": 2020,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2019-20.md",
     "linea": 1084
    }
   },
   {
    "de": "azul-internacional",
    "a": "santa-clara-sad",
    "rel": "participa",
    "pct": 48.6,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2021-22.md",
     "linea": 736
    }
   },
   {
    "de": "ikarus-business",
    "a": "santa-clara-sad",
    "rel": "controla",
    "pct": 55.8,
    "desde": 2022,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Santa Clara/relatorio-contas-sad-2021-22.md",
     "linea": 110
    }
   }
  ]
 },
 "sportingcp-pt": {
  "cargas": [
   {
    "anio": 2000,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-1999.md",
     "linea": 177
    }
   },
   {
    "anio": 2001,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2000.md",
     "linea": 11
    }
   },
   {
    "anio": 2002,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2001.md",
     "linea": 3
    }
   },
   {
    "anio": 2003,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2002-03.md",
     "linea": 13
    }
   },
   {
    "anio": 2004,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2003-04.md",
     "linea": 7
    }
   },
   {
    "anio": 2005,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2004-05.md",
     "linea": 3
    }
   },
   {
    "anio": 2006,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2005-06.md",
     "linea": 3
    }
   },
   {
    "anio": 2007,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2006-07.md",
     "linea": 11
    }
   },
   {
    "anio": 2008,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2007-08.md",
     "linea": 3
    }
   },
   {
    "anio": 2011,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2010-11.md",
     "linea": 13
    }
   },
   {
    "anio": 2012,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2011-12.md",
     "linea": 15
    }
   },
   {
    "anio": 2013,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2012-13.md",
     "linea": 13
    }
   },
   {
    "anio": 2014,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2013-14.md",
     "linea": 11
    }
   },
   {
    "anio": 2015,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2014-15.md",
     "linea": 117
    }
   },
   {
    "anio": 2016,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2015-16.md",
     "linea": 5
    }
   },
   {
    "anio": 2017,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2016-17.md",
     "linea": 7
    }
   },
   {
    "anio": 2018,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2017-18.md",
     "linea": 5
    }
   },
   {
    "anio": 2019,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2018-19.md",
     "linea": 5
    }
   },
   {
    "anio": 2020,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2019-20.md",
     "linea": 7
    }
   },
   {
    "anio": 2021,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2020-21.md",
     "linea": 12
    }
   },
   {
    "anio": 2022,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2021-22.md",
     "linea": 7
    }
   },
   {
    "anio": 2023,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2022-23.md",
     "linea": 13
    }
   },
   {
    "anio": 2024,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2023-24.md",
     "linea": 13
    }
   },
   {
    "anio": 2025,
    "entidad": "sporting-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.md",
     "linea": 10
    }
   }
  ],
  "entidades": {
   "holdimo": {
    "nombre": "Holdimo - Participações e Investimentos, SA",
    "forma": "holding",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2014-15.md",
     "linea": 840
    }
   },
   "sporting-clube-de-portugal": {
    "nombre": "Sporting Clube de Portugal",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación: los socios, las otras disciplinas",
     "en": "The members' club: members and the other sports"
    },
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.md",
     "linea": 1648
    }
   },
   "sporting-sad": {
    "nombre": "Sporting Clube de Portugal, Futebol - SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "sportingcp-pt",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.md",
     "linea": 10
    }
   },
   "sporting-sgps": {
    "nombre": "SPORTING – Sociedade Gestora de Participações Sociais, SA",
    "forma": "holding",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2001.md",
     "linea": 290
    }
   }
  },
  "relaciones": [
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 60.7,
    "desde": 2002,
    "hasta": 2002,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2001.md",
     "linea": 290
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 17.5,
    "desde": 2002,
    "hasta": 2002,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2001.md",
     "linea": 291
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 44.3,
    "desde": 2003,
    "hasta": 2003,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2002-03.md",
     "linea": 257
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 17.5,
    "desde": 2003,
    "hasta": 2003,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2002-03.md",
     "linea": 258
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 41.3,
    "desde": 2004,
    "hasta": 2004,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2003-04.md",
     "linea": 283
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 58.8,
    "desde": 2004,
    "hasta": 2004,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2003-04.md",
     "linea": 288
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sgps",
    "rel": "controla",
    "desde": 2004,
    "hasta": 2004,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2003-04.md",
     "linea": 288
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 61.9,
    "desde": 2005,
    "hasta": 2005,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2004-05.md",
     "linea": 184
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 78.2,
    "desde": 2005,
    "hasta": 2005,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2004-05.md",
     "linea": 188
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sgps",
    "rel": "controla",
    "desde": 2005,
    "hasta": 2005,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2004-05.md",
     "linea": 188
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 61.9,
    "desde": 2006,
    "hasta": 2006,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2005-06.md",
     "linea": 198
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 78.2,
    "desde": 2006,
    "hasta": 2006,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2005-06.md",
     "linea": 203
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sgps",
    "rel": "controla",
    "desde": 2006,
    "hasta": 2006,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2005-06.md",
     "linea": 203
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 60,
    "desde": 2007,
    "hasta": 2007,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2006-07.md",
     "linea": 359
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 76.3,
    "desde": 2007,
    "hasta": 2007,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2006-07.md",
     "linea": 364
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sgps",
    "rel": "controla",
    "desde": 2007,
    "hasta": 2007,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2006-07.md",
     "linea": 364
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 52.268,
    "desde": 2008,
    "hasta": 2008,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2007-08.md",
     "linea": 1826
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 34835.63889,
    "desde": 2011,
    "hasta": 2011,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2010-11.md",
     "linea": 2143
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 24962.27,
    "desde": 2011,
    "hasta": 2011,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2010-11.md",
     "linea": 2132
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 89.322,
    "desde": 2012,
    "hasta": 2012,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2011-12.md",
     "linea": 1889
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 64.006,
    "desde": 2012,
    "hasta": 2012,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2011-12.md",
     "linea": 1879
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 89.364,
    "desde": 2013,
    "hasta": 2013,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2012-13.md",
     "linea": 2058
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 64.006,
    "desde": 2013,
    "hasta": 2013,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2012-13.md",
     "linea": 2048
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 89.32,
    "desde": 2014,
    "hasta": 2014,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2013-14.md",
     "linea": 755
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 64.006,
    "desde": 2014,
    "hasta": 2014,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2013-14.md",
     "linea": 746
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 63.955,
    "desde": 2015,
    "hasta": 2015,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2014-15.md",
     "linea": 838
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 37.257,
    "desde": 2015,
    "hasta": 2015,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2014-15.md",
     "linea": 829
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 29.851,
    "desde": 2015,
    "hasta": 2015,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2014-15.md",
     "linea": 840
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 63.955,
    "desde": 2016,
    "hasta": 2016,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2015-16.md",
     "linea": 858
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 37.257,
    "desde": 2016,
    "hasta": 2016,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2015-16.md",
     "linea": 849
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 29.851,
    "desde": 2016,
    "hasta": 2016,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2015-16.md",
     "linea": 860
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 63.957,
    "desde": 2017,
    "hasta": 2017,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2016-17.md",
     "linea": 790
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 37.257,
    "desde": 2017,
    "hasta": 2017,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2016-17.md",
     "linea": 777
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 29.851,
    "desde": 2017,
    "hasta": 2017,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2016-17.md",
     "linea": 792
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 63.921,
    "desde": 2018,
    "hasta": 2018,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2017-18.md",
     "linea": 922
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 37.257,
    "desde": 2018,
    "hasta": 2018,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2017-18.md",
     "linea": 901
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 29.851,
    "desde": 2018,
    "hasta": 2018,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2017-18.md",
     "linea": 924
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 63.819,
    "desde": 2019,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2018-19.md",
     "linea": 784
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 37.162,
    "desde": 2019,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2018-19.md",
     "linea": 776
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 29.851,
    "desde": 2019,
    "hasta": 2019,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2018-19.md",
     "linea": 786
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 63.819,
    "desde": 2020,
    "hasta": 2020,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2019-20.md",
     "linea": 861
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 37.162,
    "desde": 2020,
    "hasta": 2020,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2019-20.md",
     "linea": 853
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 29.851,
    "desde": 2020,
    "hasta": 2020,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2019-20.md",
     "linea": 863
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 63.819,
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2020-21.md",
     "linea": 934
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 37.162,
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2020-21.md",
     "linea": 926
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 29.851,
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2020-21.md",
     "linea": 936
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 63.819,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2021-22.md",
     "linea": 999
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 37.162,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2021-22.md",
     "linea": 992
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 29.851,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2021-22.md",
     "linea": 1001
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 83.895,
    "desde": 2023,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2022-23.md",
     "linea": 850
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 16.578,
    "desde": 2023,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2022-23.md",
     "linea": 844
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 13.283,
    "desde": 2023,
    "hasta": 2023,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2022-23.md",
     "linea": 852
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 87.994,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2023-24.md",
     "linea": 1139
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 12.358,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2023-24.md",
     "linea": 1134
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 9.901,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2023-24.md",
     "linea": 1141
    }
   },
   {
    "de": "sporting-clube-de-portugal",
    "a": "sporting-sad",
    "rel": "controla",
    "pct": 87.994,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.md",
     "linea": 1658
    }
   },
   {
    "de": "sporting-sgps",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 12.358,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.md",
     "linea": 1653
    }
   },
   {
    "de": "holdimo",
    "a": "sporting-sad",
    "rel": "participa",
    "pct": 9.901,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Sporting CP/relatorio-contas-2024-25.md",
     "linea": 1660
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
 "torreense-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "torreense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md",
     "linea": 26
    }
   },
   {
    "anio": 2023,
    "entidad": "torreense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2022-2023.md",
     "linea": 28
    }
   },
   {
    "anio": 2024,
    "entidad": "torreense-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2023-2024.md",
     "linea": 23
    }
   }
  ],
  "entidades": {
   "sc-uniao-torreense": {
    "nombre": "Sport Clube União Torreense",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación",
     "en": "The members' club"
    },
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md",
     "linea": 2003
    }
   },
   "scut-sgps": {
    "nombre": "SCUT, SGPS",
    "forma": "holding",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md",
     "linea": 1992
    }
   },
   "sintoverde": {
    "nombre": "SintoVerde Lda",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md",
     "linea": 2014
    }
   },
   "torreense-sad": {
    "nombre": "Sport Clube União Torreense Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "torreense-pt",
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md",
     "linea": 26
    }
   }
  },
  "relaciones": [
   {
    "de": "scut-sgps",
    "a": "torreense-sad",
    "rel": "participa",
    "pct": 25.01,
    "desde": 2022,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md",
     "linea": 1995
    }
   },
   {
    "de": "sc-uniao-torreense",
    "a": "torreense-sad",
    "rel": "participa",
    "pct": 21.09,
    "desde": 2022,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md",
     "linea": 2006
    }
   },
   {
    "de": "sintoverde",
    "a": "torreense-sad",
    "rel": "controla",
    "pct": 50.68,
    "desde": 2022,
    "hasta": 2022,
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2021-2022.md",
     "linea": 2017
    }
   },
   {
    "de": "sintoverde",
    "a": "torreense-sad",
    "rel": "participa",
    "pct": 33.06,
    "desde": 2023,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/Torreense/SAD_RelatorioContas2022-2023.md",
     "linea": 1584
    }
   }
  ]
 },
 "uniaodeleiria-pt": {
  "cargas": [
   {
    "anio": 2023,
    "entidad": "udl-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2022-2023.md",
     "linea": 113
    }
   },
   {
    "anio": 2024,
    "entidad": "udl-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2023-2024.md",
     "linea": 112
    }
   }
  ],
  "entidades": {
   "jubilantadvice": {
    "nombre": "Jubilantadvice, Lda",
    "forma": "sociedad",
    "pais": "PT",
    "fuente": {
     "md": "Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2022-2023.md",
     "linea": 115
    }
   },
   "udl-sad": {
    "nombre": "UDL – União de Leiria- Futebol, SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "uniaodeleiria-pt",
    "fuente": {
     "md": "Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2022-2023.md",
     "linea": 113
    }
   },
   "uniao-desportiva-leiria": {
    "nombre": "União Desportiva de Leiria",
    "forma": "asociacion",
    "pais": "PT",
    "que": {
     "es": "El club asociación",
     "en": "The members' club"
    },
    "fuente": {
     "md": "Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2022-2023.md",
     "linea": 115
    }
   }
  },
  "relaciones": [
   {
    "de": "jubilantadvice",
    "a": "udl-sad",
    "rel": "controla",
    "pct": 90,
    "desde": 2023,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2022-2023.md",
     "linea": 115
    }
   },
   {
    "de": "uniao-desportiva-leiria",
    "a": "udl-sad",
    "rel": "participa",
    "pct": 10,
    "desde": 2023,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Portugal/União de Leiria/Relatorio-Contas-UDL-SAD_2022-2023.md",
     "linea": 115
    }
   }
  ]
 },
 "vitoriaguimaraes-pt": {
  "cargas": [
   {
    "anio": 2021,
    "entidad": "vitoria-sc-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/relatorio-contas-2020-21.md",
     "linea": 743
    }
   },
   {
    "anio": 2022,
    "entidad": "vitoria-sc-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/wf-src-Relatorio-e-Contas-2021-22-SAD.md",
     "linea": 38
    }
   },
   {
    "anio": 2024,
    "entidad": "vitoria-sc-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/relatorio-contas-2023-24.md",
     "linea": 669
    }
   },
   {
    "anio": 2025,
    "entidad": "vitoria-sc-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/relatorio-contas-2024-25.md",
     "linea": 114
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
   },
   {
    "de": "vitoria-sport-clube",
    "a": "vitoria-sc-sad",
    "rel": "controla",
    "pct": 51.37,
    "desde": 2021,
    "hasta": 2021,
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/relatorio-contas-2020-21.md",
     "linea": 1747
    }
   },
   {
    "de": "vitoria-sport-clube",
    "a": "vitoria-sc-sad",
    "rel": "controla",
    "pct": 67.84,
    "desde": 2024,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/Portugal/Vitória Guimarães/relatorio-contas-2023-24.md",
     "linea": 1784
    }
   }
  ]
 },
 "vizela-pt": {
  "cargas": [
   {
    "anio": 2022,
    "entidad": "vizela-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Vizela/Relatorio-Contas-FCV-2021-22.md",
     "linea": 337
    }
   },
   {
    "anio": 2023,
    "entidad": "vizela-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Vizela/Relatorio-e-Contas-FCV-2022-23_Aprovadas.md",
     "linea": 17
    }
   },
   {
    "anio": 2024,
    "entidad": "vizela-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Vizela/Relatorio-Gestao-e-contas-FCV-2023-24-Ass.md",
     "linea": 49
    }
   },
   {
    "anio": 2025,
    "entidad": "vizela-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.md",
     "linea": 53
    }
   }
  ],
  "entidades": {
   "vizela-sad": {
    "nombre": "Futebol Clube de Vizela Futebol SAD",
    "forma": "sociedad",
    "pais": "PT",
    "clubId": "vizela-pt",
    "fuente": {
     "md": "Clubes/Portugal/Vizela/Relatorio-Contas-FCV-2021-22.md",
     "linea": 337
    }
   }
  },
  "relaciones": []
 }
});
