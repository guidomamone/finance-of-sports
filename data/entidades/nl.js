// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "goaheadeagles-nl": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "go-ahead-eagles-holding",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Países Bajos/Go Ahead Eagles/wf-2024-2025-31bca08b.md",
     "linea": 316
    }
   }
  ],
  "entidades": {
   "go-ahead-eagles-holding": {
    "nombre": "Go Ahead Eagles Holding B.V.",
    "forma": "holding",
    "pais": "NL",
    "clubId": "goaheadeagles-nl",
    "que": {
     "es": "La holding del club: opera el fútbol y es dueña del estadio",
     "en": "The club's holding: it runs the football and owns the stadium"
    },
    "fuente": {
     "md": "Clubes/Países Bajos/Go Ahead Eagles/wf-2024-2025-31bca08b.md",
     "linea": 3
    }
   },
   "go-ahead-eagles-voetbal": {
    "nombre": "Go Ahead Eagles Voetbal B.V.",
    "forma": "sociedad",
    "pais": "NL",
    "que": {
     "es": "La sociedad del fútbol profesional",
     "en": "The professional football company"
    },
    "fuente": {
     "md": "Clubes/Países Bajos/Go Ahead Eagles/wf-2024-2025-31bca08b.md",
     "linea": 311
    }
   }
  },
  "relaciones": [
   {
    "de": "go-ahead-eagles-holding",
    "a": "go-ahead-eagles-voetbal",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Países Bajos/Go Ahead Eagles/wf-2024-2025-31bca08b.md",
     "linea": 311
    }
   }
  ]
 }
});
