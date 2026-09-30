# Test de los 3 motores de transcripción

Generado por `tools/test-motores.mjs` el 2026-09-29. Cada motor se compara contra el `.md` que ya existía al lado del PDF.
"Coincide" = todos los rubros que aparecen una sola vez en cada archivo tienen el mismo número. No significa que las dos estén bien si el canónico no es gold.

| PDF | pág | canónico | mistral (USD) | gemini (USD) |
|---|---|---|---|---|
| Argentina/Los Andes/balance-ejercicio-104-2019-20.pdf | 14 | gold | 20 disc. $0.056 | FALLÓ |
| Croacia/Osijek/financijsko-izvjesce-2025.pdf | 27 | gold | 1 disc. $0.108 | 1 disc. $0.082 |
| Croacia/Dinamo Zagreb/financijsko-izvjesce-2024.pdf | 33 | gold | 2 disc. $0.132 | FALLÓ |
| Brasil/Volta Redonda/balanco-2024.pdf | 27 | gold | 1 disc. $0.108 | FALLÓ |
| Colombia/Millonarios/estados-financieros-2025.pdf | 46 | gold | 3 disc. $0.184 | FALLÓ |
| Colombia/Envigado/estados-financieros-2025.pdf | 44 | gold | 10 disc. $0.176 | FALLÓ |
| Alemania/RB Leipzig/jahresabschluss-2023-24.pdf | 13 | gold | 1 disc. $0.052 | 1 disc. $0.059 |
| Alemania/Werder Bremen/konzernabschluss-2024-25.pdf | 20 | gold | 1 disc. $0.080 | 1 disc. $0.099 |
| Brasil/Ponte Preta/balanco-2023-2024.pdf | 5 | gold | 8 disc. $0.020 | coincide $0.054 |
| Brasil/Cruzeiro/informativo-financeiro-2023.pdf | 39 | gold | 1 disc. $0.156 | 1 disc. $0.142 |
| Argentina/Ferro Carril Oeste/balance-ejercicio-119-2022-23.pdf | 26 | gold | coincide $0.104 | coincide $0.108 |
| España/Athletic Club/cuentas-anuales-2024-2025.pdf | 34 | gold | coincide $0.136 | coincide $0.156 |
| Colombia/Aguilas Doradas/estados-financieros-2022.pdf | 17 | sin-gold | coincide $0.068 | coincide $0.050 |
| Argentina/Ferro Carril Oeste/memoria-y-balance-ejercicio-117-2020-21.pdf | 88 | sin-gold | 37 disc. $0.352 | FALLÓ |
| Brasil/Criciuma/balanco-2017.pdf | 29 | sin-gold | coincide $0.116 | FALLÓ |

| Motor | Generó .md | Coincide con el canónico | Costo real total |
|---|---|---|---|
| mistral | 15/15 | 4/15 | $1.85 |
| gemini | 8/15 | 4/8 | $0.75 |

Las discrepancias concretas (rubro, valor del canónico, valor del motor) están en `Admin/test-motores-resultados.jsonl`.
