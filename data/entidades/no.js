// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.
window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};
Object.assign(window.CLUB_ENTIDADES, {
 "aalesund-no": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "alesund-fotball-as",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.md",
     "linea": 289
    }
   }
  ],
  "entidades": {
   "aalesunds-fotballklubb": {
    "nombre": "Aalesunds Fotballklubb",
    "forma": "asociacion",
    "pais": "NO",
    "que": {
     "es": "La asociación del club (FLI)",
     "en": "The club's association (FLI)"
    },
    "fuente": {
     "md": "Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.md",
     "linea": 392
    }
   },
   "alesund-fotball-as": {
    "nombre": "Ålesund Fotball AS",
    "forma": "sociedad",
    "pais": "NO",
    "clubId": "aalesund-no",
    "que": {
     "es": "La sociedad con los derechos comerciales del club, que paga el fútbol de elite de Aalesunds Fotballklubb",
     "en": "The company with the club's commercial rights, which pays for Aalesunds Fotballklubb's elite football"
    },
    "fuente": {
     "md": "Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.md",
     "linea": 33
    }
   }
  },
  "relaciones": [
   {
    "de": "aalesunds-fotballklubb",
    "a": "alesund-fotball-as",
    "rel": "controla",
    "pct": 77.14,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.md",
     "linea": 392
    }
   }
  ]
 },
 "fredrikstad-no": {
  "cargas": [
   {
    "anio": 2024,
    "entidad": "fredrikstad-fotballklubb",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Noruega/Fredrikstad/wf-src-FFK_-_Årsmøte_2025.md",
     "linea": 1170
    }
   }
  ],
  "entidades": {
   "fredrikstad-fotballinvest-as": {
    "nombre": "Fredrikstad Fotballinvest AS",
    "forma": "sociedad",
    "pais": "NO",
    "que": {
     "es": "Vehículo de inversión sin empleados, dueño de derechos de jugadores del club; no es el club (sus cuentas no se cargan)",
     "en": "Investment vehicle with no employees that owns players' rights at the club; not the club (its accounts are not loaded)"
    },
    "fuente": {
     "md": "Clubes/Noruega/Fredrikstad/aarsregnskap-fotballinvest-as-2023.md",
     "linea": 458
    }
   },
   "fredrikstad-fotballklubb": {
    "nombre": "Fredrikstad Fotballklubb",
    "forma": "asociacion",
    "pais": "NO",
    "clubId": "fredrikstad-no",
    "que": {
     "es": "El club (FLI): sueldos y operación",
     "en": "The club (association): payroll and operations"
    },
    "fuente": {
     "md": "Clubes/Noruega/Fredrikstad/wf-src-FFK_-_Årsmøte_2025.md",
     "linea": 5
    }
   }
  },
  "relaciones": [
   {
    "de": "fredrikstad-fotballinvest-as",
    "a": "fredrikstad-fotballklubb",
    "rel": "vinculada",
    "desde": 2023,
    "fuente": {
     "md": "Clubes/Noruega/Fredrikstad/aarsregnskap-fotballinvest-as-2023.md",
     "linea": 458
    }
   }
  ]
 },
 "molde-no": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "molde-fotballklubb",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.md",
     "linea": 360
    }
   }
  ],
  "entidades": {
   "akerhallen-as": {
    "nombre": "Akerhallen AS",
    "forma": "sociedad",
    "pais": "NO",
    "que": {
     "es": "El pabellón Akerhallen, que usa el fútbol de elite y el de base",
     "en": "The Akerhallen indoor hall, used by elite and grassroots football"
    },
    "fuente": {
     "md": "Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.md",
     "linea": 808
    }
   },
   "molde-fotball-as": {
    "nombre": "Molde Fotball AS",
    "forma": "sociedad",
    "pais": "NO",
    "que": {
     "es": "Compra al club los derechos de marketing por contrato; no es el club (sus cuentas no se cargan)",
     "en": "Buys the club's marketing rights by contract; not the club (its accounts are not loaded)"
    },
    "fuente": {
     "md": "Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.md",
     "linea": 273
    }
   },
   "molde-fotballklubb": {
    "nombre": "Molde Fotballklubb",
    "forma": "asociacion",
    "pais": "NO",
    "clubId": "molde-no",
    "que": {
     "es": "La asociación del club (FLI)",
     "en": "The club's association (FLI)"
    },
    "fuente": {
     "md": "Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.md",
     "linea": 24
    }
   }
  },
  "relaciones": [
   {
    "de": "molde-fotballklubb",
    "a": "akerhallen-as",
    "rel": "controla",
    "pct": 50.5,
    "consolidada": false,
    "desde": 2025,
    "nota": {
     "es": "El documento dice que Akerhallen AS no está incorporada a las cuentas del club.",
     "en": "The document says Akerhallen AS is not included in the club's accounts."
    },
    "fuente": {
     "md": "Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.md",
     "linea": 813
    }
   },
   {
    "de": "molde-fotball-as",
    "a": "molde-fotballklubb",
    "rel": "vinculada",
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.md",
     "linea": 275
    }
   }
  ]
 },
 "sarpsborg08-no": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "sarpsborg-08-fotballforening",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.md",
     "linea": 771
    }
   }
  ],
  "entidades": {
   "prozo-norge-as": {
    "nombre": "Prozo Norge AS",
    "forma": "sociedad",
    "pais": "NO",
    "que": {
     "es": "Un negocio comercial aparte, que no es el fútbol del club",
     "en": "A separate commercial business, not the club's football"
    },
    "fuente": {
     "md": "Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.md",
     "linea": 771
    }
   },
   "sarpsborg-08-fotballforening": {
    "nombre": "Sarpsborg 08 Fotballforening",
    "forma": "asociacion",
    "pais": "NO",
    "clubId": "sarpsborg08-no",
    "fuente": {
     "md": "Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.md",
     "linea": 33
    }
   },
   "sarpsborg-fotball-invest-as": {
    "nombre": "Sarpsborg Fotball Invest AS",
    "forma": "sociedad",
    "pais": "NO",
    "que": {
     "es": "Tiene el 20 % de los derechos económicos del plantel; sin empleados. No es el club (sus cuentas no se cargan)",
     "en": "Holds 20% of the squad's economic rights; no employees. Not the club (its accounts are not loaded)"
    },
    "fuente": {
     "md": "Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotball-invest-as-2023.md",
     "linea": 598
    }
   }
  },
  "relaciones": [
   {
    "de": "sarpsborg-08-fotballforening",
    "a": "prozo-norge-as",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.md",
     "linea": 771
    }
   },
   {
    "de": "sarpsborg-fotball-invest-as",
    "a": "sarpsborg-08-fotballforening",
    "rel": "vinculada",
    "desde": 2023,
    "fuente": {
     "md": "Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotball-invest-as-2023.md",
     "linea": 598
    }
   }
  ]
 },
 "valerenga-no": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "valerenga-fotball-as",
    "perimetro": "individual",
    "fuente": {
     "md": "Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md",
     "linea": 232
    }
   }
  ],
  "entidades": {
   "magni-sports-as": {
    "nombre": "Magni Sports AS",
    "forma": "holding",
    "pais": "NO",
    "fuente": {
     "md": "Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md",
     "linea": 473
    }
   },
   "valerenga-fotball-as": {
    "nombre": "Vålerenga Fotball AS",
    "forma": "sociedad",
    "pais": "NO",
    "clubId": "valerenga-no",
    "que": {
     "es": "La sociedad que se queda con los ingresos del fútbol de elite y paga los gastos de Vålerenga Fotball Elite",
     "en": "The company that keeps the elite football income and pays Vålerenga Fotball Elite's costs"
    },
    "fuente": {
     "md": "Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md",
     "linea": 31
    }
   },
   "valerenga-fotball-elite": {
    "nombre": "Vålerenga Fotball Elite",
    "forma": "asociacion",
    "pais": "NO",
    "que": {
     "es": "La asociación (FLI) del fútbol de elite: contrata a los jugadores. Sus ingresos pasan casi todos a Vålerenga Fotball AS por el contrato de colaboración",
     "en": "The elite football association (FLI): it employs the players. Almost all its income goes to Vålerenga Fotball AS under the cooperation agreement"
    },
    "fuente": {
     "md": "Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md",
     "linea": 232
    }
   },
   "valerenga-sport-as": {
    "nombre": "Vålerenga Sport AS",
    "forma": "sociedad",
    "pais": "NO",
    "fuente": {
     "md": "Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md",
     "linea": 421
    }
   }
  },
  "relaciones": [
   {
    "de": "magni-sports-as",
    "a": "valerenga-fotball-as",
    "rel": "controla",
    "pct": 100,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md",
     "linea": 473
    }
   },
   {
    "de": "valerenga-fotball-elite",
    "a": "valerenga-fotball-as",
    "rel": "vinculada",
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md",
     "linea": 234
    }
   },
   {
    "de": "valerenga-fotball-as",
    "a": "valerenga-sport-as",
    "rel": "participa",
    "pct": 22.86,
    "consolidada": false,
    "desde": 2025,
    "nota": {
     "es": "45.265 de 198.000 acciones.",
     "en": "45,265 of 198,000 shares."
    },
    "fuente": {
     "md": "Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md",
     "linea": 421
    }
   }
  ]
 },
 "viking-no": {
  "cargas": [
   {
    "anio": 2025,
    "entidad": "viking-fotball-as",
    "perimetro": "consolidado",
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 922
    }
   }
  ],
  "entidades": {
   "endury-holding-as": {
    "nombre": "Endury Holding AS",
    "forma": "sociedad",
    "pais": "NO",
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1294
    }
   },
   "sparebank-1-sor-norge": {
    "nombre": "Sparebank 1 Sør-Norge ASA",
    "forma": "sociedad",
    "pais": "NO",
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1298
    }
   },
   "stiftelsen-viking-fk": {
    "nombre": "Stiftelsen Viking FK",
    "forma": "fundacion",
    "pais": "NO",
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1296
    }
   },
   "t-s-holding-as": {
    "nombre": "T S Holding AS",
    "forma": "sociedad",
    "pais": "NO",
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1297
    }
   },
   "tveteraae-invest-as": {
    "nombre": "Tveteraae Invest AS",
    "forma": "sociedad",
    "pais": "NO",
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1295
    }
   },
   "viking-fotball-as": {
    "nombre": "Viking Fotball AS",
    "forma": "sociedad",
    "pais": "NO",
    "clubId": "viking-no",
    "que": {
     "es": "La sociedad que opera el fútbol de elite",
     "en": "The company that runs elite football"
    },
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 920
    }
   },
   "viking-fotballklubb": {
    "nombre": "Viking Fotballklubb",
    "forma": "asociacion",
    "pais": "NO",
    "que": {
     "es": "La asociación del club (FLI), que contrata a los jugadores y a los entrenadores",
     "en": "The club's association (FLI), which employs the players and coaches"
    },
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1307
    }
   },
   "viking-stadion-as": {
    "nombre": "Viking Stadion AS",
    "forma": "sociedad",
    "pais": "NO",
    "que": {
     "es": "Inmuebles (el estadio)",
     "en": "Property (the stadium)"
    },
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 922
    }
   },
   "vikingklinikken-as": {
    "nombre": "Vikingklinikken AS",
    "forma": "sociedad",
    "pais": "NO",
    "que": {
     "es": "Servicios de salud",
     "en": "Health services"
    },
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 924
    }
   },
   "wewent-live-as": {
    "nombre": "WeWent Live AS",
    "forma": "sociedad",
    "pais": "NO",
    "que": {
     "es": "Organizador de actividades",
     "en": "Activity organiser"
    },
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 925
    }
   }
  },
  "relaciones": [
   {
    "de": "viking-fotball-as",
    "a": "viking-stadion-as",
    "rel": "controla",
    "pct": 100,
    "consolidada": true,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 922
    }
   },
   {
    "de": "viking-fotball-as",
    "a": "vikingklinikken-as",
    "rel": "participa",
    "pct": 49,
    "consolidada": false,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 924
    }
   },
   {
    "de": "viking-fotball-as",
    "a": "wewent-live-as",
    "rel": "participa",
    "pct": 49,
    "consolidada": false,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 925
    }
   },
   {
    "de": "viking-fotballklubb",
    "a": "viking-fotball-as",
    "rel": "participa",
    "pct": 2.44,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1307
    }
   },
   {
    "de": "endury-holding-as",
    "a": "viking-fotball-as",
    "rel": "participa",
    "pct": 10.49,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1294
    }
   },
   {
    "de": "tveteraae-invest-as",
    "a": "viking-fotball-as",
    "rel": "participa",
    "pct": 9.41,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1295
    }
   },
   {
    "de": "stiftelsen-viking-fk",
    "a": "viking-fotball-as",
    "rel": "participa",
    "pct": 6.51,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1296
    }
   },
   {
    "de": "t-s-holding-as",
    "a": "viking-fotball-as",
    "rel": "participa",
    "pct": 6.09,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1297
    }
   },
   {
    "de": "sparebank-1-sor-norge",
    "a": "viking-fotball-as",
    "rel": "participa",
    "pct": 5.09,
    "desde": 2025,
    "fuente": {
     "md": "Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md",
     "linea": 1298
    }
   }
  ]
 }
});
