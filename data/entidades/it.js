// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "inter-it": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "fc-internazionale",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 1239
    }
   }
  ],
  "entidades": {
   "fc-internazionale": {
    "nombre": "F.C. Internazionale Milano S.p.A.",
    "forma": "sociedad",
    "pais": "IT",
    "clubId": "inter-it",
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 361
    }
   },
   "grand-tower": {
    "nombre": "Grand Tower S.à.r.l.",
    "forma": "holding",
    "pais": "LU",
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 363
    }
   },
   "inter-brand": {
    "nombre": "Inter Brand S.r.l.",
    "forma": "sociedad",
    "pais": "IT",
    "que": {
     "es": "Desde 2015, actividad mínima: cobra créditos que le quedaron",
     "en": "Since 2015, minimal activity: collects its remaining receivables"
    },
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 1246
    }
   },
   "inter-media": {
    "nombre": "Inter Media and Communication S.p.A.",
    "forma": "sociedad",
    "pais": "IT",
    "que": {
     "es": "Recibió los negocios de Inter Brand en 2014; en junio de 2025 emitió bonos por 350 M €",
     "en": "Took over Inter Brand's business in 2014; issued €350m of bonds in June 2025"
    },
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 1245
    }
   },
   "m-i-stadio": {
    "nombre": "M-I Stadio S.r.l.",
    "forma": "sociedad",
    "pais": "IT",
    "que": {
     "es": "Gestiona el estadio Meazza",
     "en": "Runs the Meazza stadium"
    },
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 1248
    }
   },
   "oaktree": {
    "nombre": "Oaktree Capital Management, LP",
    "forma": "fondo",
    "pais": "US",
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 361
    }
   }
  },
  "relaciones": [
   {
    "de": "oaktree",
    "a": "grand-tower",
    "rel": "controla",
    "desde": 2024,
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 361
    }
   },
   {
    "de": "grand-tower",
    "a": "fc-internazionale",
    "rel": "controla",
    "desde": 2024,
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 1209
    }
   },
   {
    "de": "fc-internazionale",
    "a": "inter-media",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 1250
    }
   },
   {
    "de": "fc-internazionale",
    "a": "inter-brand",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 1246
    }
   },
   {
    "de": "fc-internazionale",
    "a": "m-i-stadio",
    "rel": "participa",
    "pct": 50,
    "consolidada": false,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2024-25.md",
     "linea": 1248
    }
   }
  ]
 }
});
