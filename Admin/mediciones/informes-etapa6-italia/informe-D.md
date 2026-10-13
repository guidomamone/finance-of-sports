# Informe grupo D (Italia): Genoa 2022, Hellas 2023, Sampdoria 2018, Torino 2019 y 2023, Fiorentina 2022/2024/2025

Base de comandos: `node tools/ajustes.mjs --agregar "<pdf>" fila --valor V --etiqueta E --lado L --linea N [--reemplaza-linea N] --motivo "..." --evidencia "..."`. Nada se ejecutó.

HALLAZGO GENERAL: en Genoa, Hellas y Sampdoria el .md NO está cortado. El estado completo está transcripto; lo que falló fue extraer/localizar. No hay que re-transcribir ninguna página.

## GENOA 2022 individual (pág. 10 del visor; el pie no imprime número)
Qué pasa: la pág. 9 trae la tabla hasta 17) a) (L358-L423). La pág. 10 (.md L425-L497) está transcripta como TEXTO PLANO: un bloque de etiquetas y otro de importes, sin tabla. Se pierden 17) e), 17-bis), imposte y resultado. El PDF es escaneo; lo leí en imagen (pág. 10).
Importes de la pág. 10 (2022 | 2021):
- 17) e) altri oneri finanziari (5.297.416) | (7.174.373), L433
- 17 bis) a) utile su cambi 104, L441; b) perdite su cambi (23.945), L442
- TOTALE (C) (5.162.770)
- RISULTATO PRIMA DELLE IMPOSTE (71.124.931)
- 20) a) imposte correnti (847.954), L478; c) differite e anticipate 8.589.283, L482; d) consolidato fiscale 1.654.981, L486; total 9.396.310, L488
- UTILE (PERDITA) (61.728.621), L496

| caso | respuesta | evidencia |
|---|---|---|
| b468624 | corregir --valor "no: el estado continúa en pág. 10 del visor, ya transcripta como texto (.md L425-L497); se completa con ajustes fila" | .md L425-L497 |
| 6b93eaf | ídem: corregir --valor "no: no falta transcribir; se cargan por ajuste fila desde la imagen de la pág. 10" | idem |
| 3560b84 (primer-anio) | tras los ajustes, aceptar | ver cuenta |

Por qué falló: transcripción. Mistral dejó la página sin tabla, y extraer.mjs solo lee tablas o filas "etiqueta + importe" en una línea. Resultado: financiero 0,158 (solo los proventi de la pág. 9), impuesto 0, "no encontró el resultado impreso".

Ajustes (financiero = efecto en el resultado, como impreso; todos con evidencia "pág. 10 del visor"):
```
P="Clubes/Italia/Genoa/Genoa-bilancio-31.12.2022-individual.pdf"
node tools/ajustes.mjs --agregar "$P" fila --valor "(5.297.416)" --etiqueta "17) e) altri oneri finanziari" --lado financiero --linea 433 --motivo "pág. 10 transcripta sin tabla: importes sin etiqueta (cola 3560b84)" --evidencia "pág. 10 del visor, .md L433"
node tools/ajustes.mjs --agregar "$P" fila --valor "104" --etiqueta "17 bis) a) utile su cambi" --lado financiero --linea 441 --motivo "idem" --evidencia "pág. 10 del visor, .md L441"
node tools/ajustes.mjs --agregar "$P" fila --valor "(23.945)" --etiqueta "17 bis) b) perdite su cambi" --lado financiero --linea 442 --motivo "idem" --evidencia "pág. 10 del visor, .md L442"
node tools/ajustes.mjs --agregar "$P" fila --valor "(847.954)" --etiqueta "20) a) imposte correnti" --lado impuesto --linea 478 --motivo "idem" --evidencia "pág. 10 del visor, .md L478"
node tools/ajustes.mjs --agregar "$P" fila --valor "8.589.283" --etiqueta "20) c) imposte differite e anticipate" --lado impuesto --linea 482 --motivo "idem" --evidencia "pág. 10 del visor, .md L482"
node tools/ajustes.mjs --agregar "$P" fila --valor "1.654.981" --etiqueta "20) d) proventi e oneri da consolidato fiscale" --lado impuesto --linea 486 --motivo "idem" --evidencia "pág. 10 del visor, .md L486"
```
(El resultado impreso (61.728.621) está en L496 y en el patrimonio L287; si verificar no lo toma solo, agregar `resultado-final --valor "(61.728.621)" --linea 496`.)

Cuenta de cierre (primer-anio): ingresos 84.663.638 contra 84.663.639 impreso (OK); gastos 150.625.802 contra 150.625.800 (OK). Resultado: 84.663.638 − 150.625.802 = −65.962.164 (impreso −65.962.161); + financiero (158.487 − 5.297.416 + 104 − 23.945 = −5.162.770, igual al TOTALE C impreso); + impuesto (−847.954 + 8.589.283 + 1.654.981 = +9.396.310) = −61.728.624 contra −61.728.621 impreso. Diferencia 3 EUR de redondeo.

## HELLAS VERONA individuale 2023 (pág. 7 y 8 del visor; impreso -6- y -7-)
Qué pasa: el .md trae todo el estado (L307-L418) en texto con layout. localizar dejó bloques con huecos (b11-b18) y extraer perdió filas. Lo que NO entró (verificado en el .md):
- L357 "11) Variazioni delle rimanenze" −25.971 (cost, negativo)
- L360 "12) Accantonamenti per rischi" 8.217.240
- C: L387 "d.5) Altri proventi diversi" 4.720; L390 "17) e) altri interessi e oneri finanziari" 4.520.228; L395 "17-bis) Utili e perdite su cambi" (10.210); total C (4.525.718), L399
- Lo demás sí está (7, 8 y 14 e) por notas). L351 "c) Atre svalutazioni" solo tiene 12.099 en la columna 2022.
Gastos extraídos 106.997053 contra 115.188.940 impreso (L374). Falta 8.191.269 = 8.217.240 − 25.971 − 0.000.. (queda 618 EUR por notas en miles).

| caso | respuesta | evidencia |
|---|---|---|
| c3ea81e | aceptar (sí falta en el índice) pero NO hay que "cargar desde el PDF": el .md ya lo tiene en L380-L399 | .md L383-L399 |
| 8c6bea8 | corregir --valor "no: no faltan líneas en el .md (L353-L361 y L372-L401 existen); faltaban en el índice de localizar. Se completan con ajustes fila" | .md L356-L374, L383-L399 |
| 9143e7a | aceptar (dejar afuera: 12.099 está en la columna 2022, la 2023 está vacía) | .md L351 |
| 648450d | se cierra con los ajustes de abajo | cuenta |
| a1650fd (primer-anio) | tras los ajustes, aceptar | cuenta |

Por qué falló: localizar.mjs eligió de menos. En un estado en texto con layout (no tabla) hizo bloques sueltos y saltó 11), 12), subtotales y toda la sección C. Después extraer.mjs no leyó lo que quedó fuera de bloque.

Ajustes. Ojo: los ajustes de ingreso/gasto toman Math.abs(valor) en las lecturas 0-3, así que el −25.971 de 11) puede cargarse como +25.971. El error (51.942 EUR) queda dentro de la tolerancia relativa (0,05%), pero la fila quedaría con signo mal: revisar la fila al reverificar (ver patrón P4).
```
P="Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2023.pdf"
node tools/ajustes.mjs --agregar "$P" fila --valor "8.217.240" --etiqueta "12) Accantonamenti per rischi" --lado gasto --linea 360 --motivo "fila fuera del índice de localizar (cola 8c6bea8)" --evidencia "pág. 7 del visor (impreso 6), .md L360"
node tools/ajustes.mjs --agregar "$P" fila --valor "(25.971)" --etiqueta "11) Variazioni delle rimanenze (a favor)" --lado gasto --linea 357 --motivo "idem; costo negativo" --evidencia "pág. 7 del visor, .md L357"
node tools/ajustes.mjs --agregar "$P" fila --valor "4.720" --etiqueta "16) d.5) Altri proventi diversi" --lado financiero --linea 387 --motivo "sección C fuera del índice" --evidencia "pág. 8 del visor (impreso 7), .md L387"
node tools/ajustes.mjs --agregar "$P" fila --valor "(4.520.228)" --etiqueta "17) e) altri interessi e oneri finanziari" --lado financiero --linea 390 --motivo "idem" --evidencia "pág. 8 del visor, .md L390"
node tools/ajustes.mjs --agregar "$P" fila --valor "(10.210)" --etiqueta "17-bis) Utili e perdite su cambi" --lado financiero --linea 395 --motivo "idem" --evidencia "pág. 8 del visor, .md L395"
```
Cuenta de cierre: ingresos 98.444977 = 98.444.977 impreso (OK). Gastos 106.997053 + 8.217240 − 0.025971 = 115.188322 contra 115.188.940 (dif. 618 EUR por notas en miles). Resultado: 98.444977 − 115.188322 = −16.743345 (impreso −16.743.963); financiero (4.720 − 4.520.228 − 10.210 = −4.525.718, igual al total C impreso); impuesto −1.837.856 − 3.242.400 + 6.422.237 = +1.341.981; total −19.927.082 contra −19.927.700 impreso. Dif. 618 EUR (tolerancia 10.000).
Primer-anio: ingresos y resultado coinciden con lo impreso (el resultado ya figuraba −19.9277). Los gastos 106,997 NO coincidían: era el error, se arregla con 11) y 12).

## SAMPDORIA 2018 (pág. 26 y 27 del visor, impreso 26 y 27)
Qué pasa: pág. 26 trae la tabla con etiquetas hasta A−B (L972-L1000). En la pág. 27 la transcripción separó las etiquetas (texto, L1008-L1043) de los importes (tabla de una columna sin etiqueta, L1045-L1064, encabezado "0 | 0"). Leído en imagen de la pág. 27:
- 16) c) Da terzi 56.853 (L1048); 17) b.1) Interessi verso terzi (2.728.204) (L1051); 17 bis) a) 46 (L1053), b) (1) (L1054); total C (2.671.306) (L1056)
- Risultato prima imposte 19.022.174 (L1060); 22) a) imposte correnti (3.465.535) (L1061); b) differite (3.943.972) (L1062); c) anticipate 440.273 (L1063); Utile 12.052.939 (L1064)

| caso | respuesta | evidencia |
|---|---|---|
| addab79 (primer-anio) | tras los ajustes, aceptar | cuenta |
| 0b43be9 | aceptar (sí, continuación) | A−B 21.693.480 − 2.671.306 = 19.022.174 y − 6.969.234 = 12.052.939; imagen pág. 27 |
| f1b4f17 | aceptar y cargar por ajustes fila (la etiqueta sale de la imagen) | imagen pág. 27 |
| 9414130 (b63 imposte) | aceptar (afuera): repite el estado | b63 corrientes 3.465.535 = L1061; diferidas 3.503.699 = 3.943.972 − 440.273 = neto; total 6.969.234 = suma de las tres imposte (signos distintos solo por presentación neta) |
| 2f9021a (b62 interessi) | aceptar (afuera), mismo criterio que Bologna (respuesta ea8ca3e) | b62 suma 47+2.415+266 = 2.728 = L1051; no se abre como detalle |
| 075611c (b56) | corregir --valor "no": parcial (tesserati 49.434 contra 54.142 del renglón; criterio decidido) | .md L2467 |

Por qué falló: transcripción (página con etiquetas separadas de importes) y, en cadena, extraer.mjs, que ignoró una tabla sin etiqueta en la sección C/imposte (financiero 0, impuesto 0, sin resultado impreso).
```
P="Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2018.pdf"
node tools/ajustes.mjs --agregar "$P" fila --valor "56.853" --etiqueta "16) c) proventi da terzi" --lado financiero --linea 1048 --motivo "pág. 27: importes sin etiqueta (cola f1b4f17)" --evidencia "pág. 27 del visor (impreso 27), .md L1048, imagen"
node tools/ajustes.mjs --agregar "$P" fila --valor "(2.728.204)" --etiqueta "17) b.1) interessi e altri oneri finanziari verso terzi" --lado financiero --linea 1051 --motivo "idem" --evidencia "pág. 27, .md L1051"
node tools/ajustes.mjs --agregar "$P" fila --valor "46" --etiqueta "17 bis) a) utile su cambi" --lado financiero --linea 1053 --motivo "idem" --evidencia "pág. 27, .md L1053"
node tools/ajustes.mjs --agregar "$P" fila --valor "(1)" --etiqueta "17 bis) b) perdite su cambi" --lado financiero --linea 1054 --motivo "idem" --evidencia "pág. 27, .md L1054"
node tools/ajustes.mjs --agregar "$P" fila --valor "(3.465.535)" --etiqueta "22) a) imposte correnti" --lado impuesto --linea 1061 --motivo "idem" --evidencia "pág. 27, .md L1061"
node tools/ajustes.mjs --agregar "$P" fila --valor "(3.943.972)" --etiqueta "22) b) imposte differite" --lado impuesto --linea 1062 --motivo "idem" --evidencia "pág. 27, .md L1062"
node tools/ajustes.mjs --agregar "$P" fila --valor "440.273" --etiqueta "22) c) imposte anticipate" --lado impuesto --linea 1063 --motivo "idem" --evidencia "pág. 27, .md L1063"
```
Cuenta de cierre (primer-anio): ingresos 141.773225 contra 141.773.568 (dif. 343, notas en miles); gastos 120.077712 contra 120.080.088 (dif. 2.376). Resultado: 141.773225 − 120.077712 = 21.695.513 (impreso A−B 21.693.480); financiero 56.853 − 2.728.204 + 46 − 1 = −2.671.306 (igual al total C impreso); impuesto −3.465.535 − 3.943.972 + 440.273 = −6.969.234; total 12.054.973 contra 12.052.939. Dif. 2.034 EUR (tolerancia 10.000), por las notas en miles.

## TORINO 2019 (pág. 13 del visor, impreso 13)
Qué pasa: mismo patrón. Etiquetas en bloque aparte (L562-L620), importes en tabla sin etiqueta (L622-L654). Los importes calzan por orden y por sumas: L624+L625 = 96.332.694 (L626); 6 a 14 = 113.076.752 (L642); L643 (16.744.058) = A−B; L648 (108.044) = 501.064 − 609.108 (= TOTALE C 15+16−17); L651 (16.852.102) antes de imposte; L654 resultado.
El script cargó L647 (609.108, el 17) como POSITIVO (financiero 1.110172 en vez de −0.108044): sin la etiqueta "17)" no aplicó el escalón "17) resta".

| caso | respuesta | evidencia |
|---|---|---|
| 5c25ef2 | aceptar (sí, orden civilístico) | sumas arriba |
| 26b6dbc | aceptar. Corrección fina: L638 = c) svalutazione immobilizzazioni (0 | 334.475); L639 = d) svalutazione crediti (650.000 | 500.000); L640 = 12) accantonamenti (0). 28.306.204 + 184.646 + 0 + 650.000 = 29.140.850 (L635) | .md L635-L640 |
| aa559e9 | aceptar: L652 (925.554) imposte correnti (costo), L653 3.806.190 differite/anticipate (a favor) | (16.852.102) − 925.554 + 3.806.190 = (13.971.466) |
| 93ca3b8 | ajuste (abajo) | cuenta |

Ajuste (invierte el 17) a costo):
```
node tools/ajustes.mjs --agregar "Clubes/Italia/Torino/Torino-bilancio-2019.pdf" fila --valor "(609.108)" --etiqueta "17) d) oneri diversi (17, costo)" --lado financiero --linea 647 --reemplaza-linea 647 --motivo "el 17) se imprime en positivo y se resta por posición (TOTALE C = 15+16-17 = (108.044), L648); la fila perdió la etiqueta con '17)'" --evidencia "pág. 13 del visor (impreso 13), .md L644-L648"
```
Cuenta de cierre: ingresos 96.332 (96.332.694 impreso) − gastos 113.076854 (113.076.752) = −16.744854; financiero 0.501064 − 0.609108 = −0.108044 (igual a L648); impuesto −0.925554 + 3.80619 = +2.880636; total −13.972262 contra −13.971466 impreso. Dif. 796 EUR (miles en las notas).
Nota: 5c25ef2 figura dos veces en la cola de este grupo (mismo id).

## TORINO 2023 (pág. 15 del visor, impreso 15)
68dc65d: aceptar. L533 Imposte correnti 1.584.259 es positivo = beneficio; L534 (398.865) costo. Cuenta: antes de imposte (10.748.061) + 1.584.259 − 398.865 = (9.562.667) = L535 impreso. El script ya cierra "como impresos" (financiero −2.439001, impuesto +1.185394, resultado −9.562667). Además: ingresos 101.144112 contra 101.143.743 y gastos 109.452488 contra 109.452.803, OK.
Por qué preguntó: la IA vio una convención de signo "inversa" aunque verificar.mjs ya había cerrado exacto. La duda sobraba.

## FIORENTINA 2021-22 (pág. 31 y 32 del visor; impreso 31 y 32)
Qué pasa: ingresos extraídos 241.109658 contra 233.233.006. Sobran 7.876.652 = a) ricavi da gare 5.513.770 (L970) + b) abbonamenti 2.362.883 (L971): hijos de 1) (7.917.332) que ya está abierto por nota b45 (pág. 61, sus filas suman 7.917.332 exacto; la diferencia 40.680 es "Gare fuori casa Coppa Italia"). Se contaban dos veces. No hace falta nada de la nota b45: a)+b) no suman 1) por 40.679.
```
P="Clubes/Italia/Fiorentina/Fiorentina-bilancio-2021-22-issuu.pdf"
node tools/ajustes.mjs --agregar "$P" fila --valor "0" --etiqueta "(sale) a) ricavi da gare" --lado ingreso --linea 970 --reemplaza-linea 970 --motivo "hijo de 1) abierto por la nota b45; se contaba dos veces (a+b = 7.876.653; 1) = 7.917.332, dif. 40.680 de Coppa Italia fuori casa)" --evidencia "pág. 31 del visor, .md L969-L971; nota b45 .md L2064-L2079"
node tools/ajustes.mjs --agregar "$P" fila --valor "0" --etiqueta "(sale) b) abbonamenti" --lado ingreso --linea 971 --reemplaza-linea 971 --motivo "idem" --evidencia "idem"
```
| caso | respuesta | evidencia |
|---|---|---|
| 03b22c4 | resuelto por los 2 ajustes | 241.109658 − 7.876.653 = 233.233005 contra 233.233.006 |
| b9c3deb | idem | cuenta |
| 6078d5d | aceptar tras los ajustes | cuenta |
| 2168732 | corregir --valor "no: se cargan las filas del estado (suman 3.196.937 = 3.196.938 impreso); la nota b55 reagrupa distinto (a) 63.324 contra 95.499 del estado) y no se abre como desglose" | .md L1007-L1013 y L2350-L2357 |

Cuenta de cierre: ingresos 233.233005 contra 233.233.006; gastos 161.476024 contra 161.476.028; financiero +1.059972 − 1.079759 + 1.452827 = 1.43304 (impreso 1.433.041); impuesto −5.891336 − 0.00374 + 0.586993 − 21.05199 = −26.360073 (impreso); resultado 233.233005 − 161.476024 + 1.43304 − 26.360073 = 46.829948 contra 46.829.946. OK.
Por qué falló: extraer.mjs/verificar.mjs no reconoció a) y b) como hijos de 1): sus importes no suman 1) (hueco de 40.679 del propio documento), así que se trataron como renglones.

## FIORENTINA 2023-24 (pág. 31 y 32 del visor)
caf65f8: ingresos 428.650203 y gastos 409.33104 son el doble. Dos causas:
1. L854 "- altri contributi in conto esercizio" 28.844.321 se cuenta además de las filas de la nota que abre a) contributi (2025-2031, suman 28.844.322). Con ese doble las filas (228.747262) superan el total impreso (199.902941) y el script pasó a sumar L866 y L903 (los TOTALE) como renglones, duplicando todo.
2. L885 "11) variazioni delle rimanenze" +87.751 (positivo en un estado con costos en negativo = a favor) entró como costo +0.087751. Hace falta restar: diferencia 0.175502 en gastos (204.753271 contra 204.577.769). Sin eso gastos no cierran.
```
P="Clubes/Italia/Fiorentina/Fiorentina-bilancio-2023-24.pdf"
node tools/ajustes.mjs --agregar "$P" fila --valor "0" --etiqueta "(sale) - altri contributi in conto esercizio" --lado ingreso --linea 854 --reemplaza-linea 854 --motivo "hijo de a) contributi, ya abierto por la nota (2025-2031 suman 28.844.322); se contaba dos veces" --evidencia "pág. 31 del visor, .md L852-L854"
```
Para 11): el ajuste fila de gasto usa valor absoluto en las lecturas 0 a 3, así que no puedo darte un comando que garantice el signo. Esperable: con L854 fuera, la lectura "signos impresos" (4: un renglón positivo en un estado de costos negativos resta) debería cerrar. Si tras reverificar la fila L885 sigue sumando, es el patrón P4 (cambio de script).
2daea52 (b53): corregir --valor "no". La tabla b53 (14.283.626) es el mismo h) que el estado ya abre en sus dos hijos L862 premi 6.969.960 (= suma de los jugadores 2.500.000+1.830.480+1.000.000+487.000+500.000+239.931+224.126+188.423) y L863 proventi diversi 7.313.666 (= Diritti di opzione 7.000.000 + solidarietà FIFA 313.666). Repite renglones del estado, y a nivel jugador: no se carga (criterio decidido).
Cuenta de cierre: ingresos 199.902941 (TOTALE A impreso 199.902.941); gastos 204.753271 − 0.175502 = 204.577769 (impreso); A−B = −4.674828; financiero +0.492664 (L916); impuesto −1.807483 (L925); total −5.989647 contra −5.989.648 impreso. OK.

## FIORENTINA 2024-25 (pág. 31 y 32 del visor)
bb14921: ingresos 609.464382 y gastos 462.272144 contra 198.608.828 y 216.241.841 impresos. Dobles identificados (suman exacto):
- Ingresos (diferencia 410.855554 sobre el total): L912 altri contributi 21.493.476 (ya en nota 2117-2123); L920+L921 (2.752.935 + 673.632 = 3.426.567 = h) abierto por nota 2190-2199); L923 "Totale altri ricavi e proventi" 187.326.683 entra como renglón; y L924 (el total) entra como renglón. 21.493.476 + 3.426.567 + 187.326.683 = 212.246.726; 198.608.828 + 212.246.726 = 410.855.554.
- Gastos (diferencia 29.788.462): L955 "14) oneri diversi" 25.897.570 (padre de las filas a-e) y L960+L961 (3.268.853 + 622.041 = 3.890.894 = d)). 25.897.570 + 3.890.894 = 29.788.464. Más L963 (total) como renglón.
```
P="Clubes/Italia/Fiorentina/Fiorentina-bilancio-2024-25.pdf"
node tools/ajustes.mjs --agregar "$P" fila --valor "0" --etiqueta "(sale) - altri contributi in conto esercizio" --lado ingreso --linea 912 --reemplaza-linea 912 --motivo "hijo de a) abierto por la nota (2117-2123 suman 21.493.476)" --evidencia "pág. 31 del visor, .md L910-L912"
node tools/ajustes.mjs --agregar "$P" fila --valor "0" --etiqueta "(sale) - premi e/o indennizzi attivi" --lado ingreso --linea 920 --reemplaza-linea 920 --motivo "hijo de h) abierto por la nota (2190-2199 suman 3.426.567)" --evidencia "pág. 31, .md L919-L921"
node tools/ajustes.mjs --agregar "$P" fila --valor "0" --etiqueta "(sale) - proventi diversi da trasferimento" --lado ingreso --linea 921 --reemplaza-linea 921 --motivo "idem" --evidencia "idem"
node tools/ajustes.mjs --agregar "$P" fila --valor "0" --etiqueta "(sale) - premi e/o indennizzi passivi" --lado gasto --linea 960 --reemplaza-linea 960 --motivo "hijo de d) (3.268.853 + 622.041 = 3.890.894)" --evidencia "pág. 32 del visor, .md L959-L961"
node tools/ajustes.mjs --agregar "$P" fila --valor "0" --etiqueta "(sale) - oneri diversi da trasferimento" --lado gasto --linea 961 --reemplaza-linea 961 --motivo "idem" --evidencia "idem"
```
Efecto en cascada esperado: L923 y L955 son subtotales exactos de las filas de abajo, y al sacar los dobles el script debería reconocerlos y dejar de sumarlos (igual que en 2023-24, donde L897 no se carga). Si L923 o L955 siguen, agregar el mismo ajuste con valor 0 en L923 (ingreso) y L955 (gasto). El 11) de este año (−76.272) ya entra bien (costo +0.076272).
Cuenta de cierre: ingresos 198.608828; gastos 216.241841; A−B −17.633013 (impreso −17.633.012); financiero −0.077642 (L976); impuesto −5.523235 (L985); total −23.23389 contra −23.233.889. OK.
0980fea: corregir --valor "sí" (se deja afuera). La nota b59 solo cubre tesserati (80.329.850 contra 85.963.704 del renglón L930). Criterio decidido: desglose parcial no se carga. El propio verificar ya la descartó ("no suma el renglón: quedó el renglón del estado").

## PATRONES PARA MEJORAR EL SCRIPT

P1. Estado cuyas etiquetas quedan separadas de los importes (texto sin tabla o tabla sin columna de etiquetas)
- Herramienta: transcripción (Mistral) y localizar.mjs/extraer.mjs.
- Casos: Genoa b468624, 6b93eaf, 3560b84; Sampdoria 0b43be9, f1b4f17, addab79; Torino 2019 5c25ef2, 26b6dbc, aa559e9, 93ca3b8 (10 de 27).
- Ejemplo: Torino 2019 .md L562-L620 (etiquetas) y L622-L654 (importes 6.694.210 … (13.971.466)); Genoa 2022 L425-L497, importes (5.297.416), (847.954), 8.589.283, 1.654.981 sin etiqueta; esperado: financiero −5.162.770 e impuesto +9.396.310; obtenido: financiero +0.158 e impuesto 0.
- Escalón con UNA compuerta: emparejar etiquetas con importes por orden SI la aritmética del propio estado cierra con el emparejamiento (A = suma de sus partes, B ídem, A−B, C, antes de imposte, resultado). Si no cierra, a la cola como hoy.

P2. Estado en texto con layout (no tabla): localizar deja huecos dentro del estado
- Herramienta: localizar.mjs (bloques b11-b18 de Hellas).
- Casos: Hellas c3ea81e, 8c6bea8, a1650fd, 648450d (4).
- Ejemplo: Hellas 2023 pág. 7-8, bloques saltan L353-L364 y L372-L401: 12) Accantonamenti 8.217.240 (L360), 11) −25.971 (L357) y toda la sección C (L383-L399) quedaron fuera; gastos 106.997 contra 115.189 impreso.
- Escalón con una compuerta: el estado va de "CONTO ECONOMICO" hasta "Utile (perdita) dell'esercizio" como UN rango continuo; si hay huecos entre bloques dentro del rango, se extiende el último bloque hasta el final (sin pedir nada a la IA).

P3. Filas hijo ("- premi…", "- altri contributi…", a)/b) de 1)) contadas junto a su padre o su nota; el desajuste rompe en cascada el reconocimiento de subtotales y de totales
- Herramienta: verificar.mjs/extraer.mjs (lectura "total como renglón").
- Casos: Fiorentina 03b22c4, b9c3deb, 6078d5d, caf65f8, bb14921 (5).
- Ejemplo: Fiorentina 2024-25: L912 21.493.476 (ya en notas) y L920+L921 3.426.567 se suman dos veces; entonces L923 187.326.683 y el TOTALE L924 198.608.828 pasan a ser "renglones": ingresos 609.464 contra 198.609 impreso. 2021-22: a)+b) 7.876.653 de más sobre 1) 7.917.332.
- Escalón con una compuerta: antes de probar lecturas, sacar toda fila cuyo importe es igual a la suma de las filas que desglosan a su padre (nota) o de sus hijos, aunque no haya marcador "di cui". Y NUNCA tratar el total impreso (TOTALE VALORE/COSTI DELLA PRODUZIONE) como renglón mientras no se haya descartado primero esta duplicación.

P4. Costo negativo (variación de existencias a favor) cargado con valor absoluto
- Herramienta: extraer.mjs/verificar.mjs, y `fila` de ajustes.mjs (Math.abs en las lecturas 0 a 3).
- Casos: Fiorentina caf65f8 (L885 +87.751 en estado de costos negativos: cargado como costo); Hellas a1650fd/648450d (L357 −25.971 ni siquiera se cargó; un ajuste fila daría +25.971).
- Ejemplo: gastos 204.753271 en vez de 204.577769 (diferencia 0.175502 = 2 × 87.751).
- Escalón con una compuerta: en gastos, el signo de cada fila se lee relativo al signo dominante del estado (gastosNeg ya existe): una fila con signo contrario al dominante resta. Aplicarlo también al valor de un ajuste `fila` de gasto/ingreso.

P5. El 17) sin la etiqueta "17)" se suma como ingreso
- Herramienta: verificar.mjs (escalón "17) resta", to-do 155).
- Caso: Torino 93ca3b8 (1).
- Ejemplo: Torino 2019 L647 609.108 sumado (+0.609); esperado −0.609108 (L648 TOTALE C = (108.044) = 501.064 − 609.108). Financiero 1.110172 contra −0.108044.
- Escalón con una compuerta: si el documento imprime TOTALE (C) y con el 17) restando da exacto y sumando no, restar, aunque la etiqueta no diga "17)".

P6. Dudas de la IA que el propio cierre ya resolvió o que repiten un criterio decidido
- Herramienta: la etapa de dudas de extraer/localizar (envío a la cola).
- Casos: Torino 68dc65d (signo imposte con cierre exacto "como impresos"); Hellas 9143e7a (12.099 en la columna 2022); Sampdoria 9414130, 2f9021a (cuadros de nota que repiten estado; Bologna ea8ca3e), 075611c y Fiorentina 0980fea (desglose parcial); Fiorentina 2168732 y 2daea52 (nota que reagrupa/repite) (8).
- Ejemplo: Torino 2023 imposte: (10.748.061) + 1.584.259 − 398.865 = (9.562.667) exacto; la duda sobraba.
- Escalón con una compuerta: no mandar a la cola una duda de extraer si el chequeo del resultado que la toca cierra exacto y la duda es solo de signo o de cuadro que repite; y para parciales, auto-responder "no" cuando el total de la nota ≠ el renglón y no hay fila "altri" que complete.

## [GUIDO]
Ninguna decisión de criterio nueva. Todo se resolvió con criterios ya decididos (cuadros de nota que repiten, desglose parcial, 17) y signos, filas "di cui" a cero como Sampdoria 2021). Nota para vos: el ajuste 11) rimanenze de Fiorentina 2023-24 y Hellas puede requerir un cambio de script (P4), no una decisión.
