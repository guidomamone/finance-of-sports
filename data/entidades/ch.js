// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "basel-ch": {
  "cargas": [
   {
    "anio": 2021,
    "entidad": "fc-basel-1893-ag",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 31
    }
   }
  ],
  "entidades": {
   "david-degen": {
    "nombre": "David Degen",
    "forma": "persona",
    "pais": "CH",
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 844
    }
   },
   "fc-basel-1893-ag": {
    "nombre": "FC Basel 1893 AG",
    "forma": "sociedad",
    "pais": "CH",
    "clubId": "basel-ch",
    "que": {
     "es": "La sociedad que organiza el fútbol profesional",
     "en": "The company that runs professional football"
    },
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 31
    }
   },
   "fc-basel-1893-verein": {
    "nombre": "Verein FC Basel 1893",
    "forma": "asociacion",
    "pais": "CH",
    "que": {
     "es": "La asociación de socios del club; sus cuentas no se cargan",
     "en": "The club's members' association; its accounts are not loaded"
    },
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 45
    }
   },
   "fc-basel-holding-ag": {
    "nombre": "FC Basel Holding AG",
    "forma": "holding",
    "pais": "CH",
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 45
    }
   },
   "stadiondienst-ag": {
    "nombre": "Stadiondienst AG",
    "forma": "sociedad",
    "pais": "CH",
    "que": {
     "es": "Servicios de seguridad en eventos; presenta sus cuentas aparte",
     "en": "Event security services; files its own accounts"
    },
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 601
    }
   }
  },
  "relaciones": [
   {
    "de": "fc-basel-holding-ag",
    "a": "fc-basel-1893-ag",
    "rel": "controla",
    "pct": 75,
    "desde": 2021,
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 45
    }
   },
   {
    "de": "fc-basel-1893-verein",
    "a": "fc-basel-1893-ag",
    "rel": "participa",
    "pct": 25,
    "desde": 2021,
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 45
    }
   },
   {
    "de": "david-degen",
    "a": "fc-basel-holding-ag",
    "rel": "controla",
    "pct": 100,
    "desde": 2021,
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 844
    }
   },
   {
    "de": "fc-basel-1893-ag",
    "a": "stadiondienst-ag",
    "rel": "controla",
    "pct": 100,
    "consolidada": false,
    "desde": 2021,
    "fuente": {
     "md": "Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md",
     "linea": 601
    }
   }
  ]
 },
 "luzern-ch": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "fcl-holding-ag",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md",
     "linea": 1245
    }
   }
  ],
  "entidades": {
   "fc-luzern-innerschweiz-ag": {
    "nombre": "FC Luzern-Innerschweiz AG",
    "forma": "sociedad",
    "pais": "CH",
    "que": {
     "es": "La sociedad que juega: tiene el fútbol profesional",
     "en": "The playing company: it holds the professional football"
    },
    "fuente": {
     "md": "Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md",
     "linea": 1245
    }
   },
   "fcl-holding-ag": {
    "nombre": "FCL Holding AG",
    "forma": "holding",
    "pais": "CH",
    "clubId": "luzern-ch",
    "que": {
     "es": "La sociedad cabeza del grupo FC Luzern (Konzernrechnung)",
     "en": "The parent company of the FC Luzern group (consolidated accounts)"
    },
    "fuente": {
     "md": "Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md",
     "linea": 167
    }
   },
   "stadion-luzern-ag": {
    "nombre": "Stadion Luzern AG",
    "forma": "sociedad",
    "pais": "CH",
    "que": {
     "es": "La dueña del estadio",
     "en": "The stadium's owner"
    },
    "fuente": {
     "md": "Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md",
     "linea": 1252
    }
   },
   "swissporarena-events-ag": {
    "nombre": "swissporarena events ag",
    "forma": "sociedad",
    "pais": "CH",
    "fuente": {
     "md": "Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md",
     "linea": 1246
    }
   }
  },
  "relaciones": [
   {
    "de": "fcl-holding-ag",
    "a": "fc-luzern-innerschweiz-ag",
    "rel": "controla",
    "pct": 86.34,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2024,
    "fuente": {
     "md": "Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md",
     "linea": 1245
    }
   },
   {
    "de": "fcl-holding-ag",
    "a": "fc-luzern-innerschweiz-ag",
    "rel": "controla",
    "pct": 71.45,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md",
     "linea": 1245
    }
   },
   {
    "de": "fcl-holding-ag",
    "a": "swissporarena-events-ag",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2024,
    "hasta": 2024,
    "nota": {
     "es": "Ya no está en el consolidado al 30-06-2025 (0 %).",
     "en": "No longer in the consolidation at 30-06-2025 (0%)."
    },
    "fuente": {
     "md": "Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md",
     "linea": 1246
    }
   },
   {
    "de": "fcl-holding-ag",
    "a": "stadion-luzern-ag",
    "rel": "participa",
    "pct": 40,
    "consolidada": false,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md",
     "linea": 1252
    }
   }
  ]
 },
 "stgallen-ch": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "fc-st-gallen-ag",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Suiza/St. Gallen/geschaeftsbericht-2024-25.md",
     "linea": 253
    }
   }
  ],
  "entidades": {
   "fc-st-gallen-ag": {
    "nombre": "FC St.Gallen AG",
    "forma": "sociedad",
    "pais": "CH",
    "clubId": "stgallen-ch",
    "que": {
     "es": "La sociedad del fútbol profesional",
     "en": "The professional football company"
    },
    "fuente": {
     "md": "Clubes/Suiza/St. Gallen/geschaeftsbericht-2024-25.md",
     "linea": 38
    }
   },
   "fc-st-gallen-event-ag": {
    "nombre": "FC St.Gallen Event AG",
    "forma": "sociedad",
    "pais": "CH",
    "que": {
     "es": "La operadora del estadio (kybunpark); paga a la AG una compensación por la comercialización. Entra en el consolidado junto con la AG",
     "en": "The stadium operator (kybunpark); it pays the AG a fee from the marketing income. It is consolidated together with the AG"
    },
    "fuente": {
     "md": "Clubes/Suiza/St. Gallen/geschaeftsbericht-2024-25.md",
     "linea": 182
    }
   }
  },
  "relaciones": [
   {
    "de": "fc-st-gallen-event-ag",
    "a": "fc-st-gallen-ag",
    "rel": "participa",
    "pct": 49.6,
    "desde": 2025,
    "nota": {
     "es": "El informe presenta las dos sociedades en una sola cuenta de resultados consolidada; no dice quién controla a quién.",
     "en": "The report presents the two companies in a single consolidated income statement; it does not say who controls whom."
    },
    "fuente": {
     "md": "Clubes/Suiza/St. Gallen/geschaeftsbericht-2024-25.md",
     "linea": 182
    }
   }
  ]
 }
});
