// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "girona-es": {
  "cargas": [
   {
    "anio": 2020,
    "entidad": "girona-fc-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/España/Girona FC/cuentas-anuales-2019-2020.md",
     "linea": 17
    }
   },
   {
    "anio": 2025,
    "entidad": "girona-fc-sad",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 18
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
   "football-trustee": {
    "nombre": "Football Trustee Limited",
    "forma": "sociedad",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 6788
    }
   },
   "girona-fc-sad": {
    "nombre": "Girona Futbol Club, S.A.D.",
    "forma": "club",
    "pais": "ES",
    "clubId": "girona-es",
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 18
    }
   },
   "girona-football-group": {
    "nombre": "Girona Football Group, B.V.",
    "forma": "holding",
    "pais": "NL",
    "fuente": {
     "md": "Clubes/España/Girona FC/cuentas-anuales-2019-2020.md",
     "linea": 262
    }
   },
   "mc-girona-llc": {
    "nombre": "MC Girona LLC",
    "forma": "sociedad",
    "pais": "US",
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 6789
    }
   },
   "montilivi-ltd": {
    "nombre": "Montilivi, Ltd",
    "forma": "sociedad",
    "pais": "GB",
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 6787
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
   },
   {
    "de": "girona-football-group",
    "a": "girona-fc-sad",
    "rel": "controla",
    "desde": 2020,
    "hasta": 2020,
    "fuente": {
     "md": "Clubes/España/Girona FC/cuentas-anuales-2019-2020.md",
     "linea": 262
    }
   },
   {
    "de": "football-trustee",
    "a": "girona-fc-sad",
    "rel": "participa",
    "pct": 47.85,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 6788
    }
   },
   {
    "de": "city-football-group-midco",
    "a": "girona-fc-sad",
    "rel": "participa",
    "pct": 47.85,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 6811
    }
   },
   {
    "de": "montilivi-ltd",
    "a": "girona-fc-sad",
    "rel": "participa",
    "pct": 15.8948,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 6787
    }
   },
   {
    "de": "mc-girona-llc",
    "a": "girona-fc-sad",
    "rel": "participa",
    "pct": 35.0395,
    "desde": 2025,
    "hasta": 2025,
    "fuente": {
     "md": "Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md",
     "linea": 6789
    }
   }
  ]
 }
});
