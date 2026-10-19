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
 }
});
