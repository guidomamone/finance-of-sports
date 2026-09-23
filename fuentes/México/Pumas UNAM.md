# Pumas UNAM (Club Universidad Nacional, A.C.)

- Sin PDF. Es el club de Liga MX con la figura jurídica más prometedora a primera vista y la más
  decepcionante al revisarla: **Club Universidad Nacional es una Asociación Civil PRIVADA**, aunque su
  dueña de hecho sea la UNAM, que sí es sujeto obligado de la Ley General de Transparencia.
- **Qué se probó y falló (sesión 2026-09-22)**:
  1. `pumas.mx` (HTTP 200) — barrido de la home por "transparencia", "estados financieros", "informe
     anual", "inversionistas", "memoria anual", "reporte anual": **cero hits**.
  2. **Portal de transparencia de la UNAM** (`transparencia.unam.mx/obligaciones/`): tiene las
     obligaciones que uno querría —"Resultados de la dictaminación de los estados financieros",
     "Informes financieros contables, presupuestales y programáticos", "Resultados de auditorías
     realizadas", "Presupuesto asignado anual", "Ejercicio de los egresos presupuestarios"— pero
     **todas son de la Universidad, no del club**: la A.C. es una persona moral distinta y privada, y
     no consolida en los estados dictaminados de la UNAM. Las tablas además se sirven por JavaScript
     con descarga diferida, no por un PDF directo.
  3. **La vía INAI da el subsidio, no el balance.** El INAI ordenó a la UNAM transparentar los montos
     que entrega a Club Universidad Nacional A.C. (resolución de enero de 2022, con antecedente
     RRA-10748/19), razonando explícitamente que **aunque la información del club es de naturaleza
     privada, la UNAM sí puede entregar lo que ella misma le transfirió**. De ahí salieron cifras
     sueltas y verificables —15 millones de pesos adelantados en marzo de 2020 por compra de boletos
     para el Apertura 2020 y la Copa MX; 26 millones de pesos pagados en junio de 2018 al amparo de un
     convenio de colaboración— pero **es el flujo UNAM→club, no los ingresos ni los gastos del club**.
  4. **SEC EDGAR full-text**: `"Pumas UNAM"` → 0 resultados; `"Club Universidad Nacional"` → 22
     resultados, todos ruido (menciones de otras entidades homónimas). **BMV**: no es emisora
     (verificado contra el listado completo al 22/09/2026).
- **Ángulo pendiente, y es el más concreto de todo México**: presentar una **solicitud de acceso a la
  información por la Plataforma Nacional de Transparencia** dirigida a la UNAM, pidiendo (a) el
  convenio de colaboración vigente con Club Universidad Nacional A.C., (b) los montos transferidos por
  ejercicio, y (c) el reparto de boletos del Estadio Olímpico Universitario. El precedente del INAI ya
  dice que la UNAM está obligada a contestar eso. No cubre el balance del club, pero sería la primera
  cifra oficial y citable de un club de Liga MX fuera de Ollamani. Es además el candidato más claro de México para sumar a `Admin/dudas-por-club.md` (no se tocó ese
  archivo en esta sesión de sourcing).
- **Contexto estructural que aplica a todo México (no repetirlo club por club)**: los 18 clubes de la
  LIGA MX SÍ producen estados financieros dictaminados por un tercero independiente — el **Reglamento
  de Control Económico de la FMF/LIGA MX** los exige por escrito, en año calendario y con fecha límite
  el 30 de abril — pero su **artículo 12 los declara expresamente confidenciales**. Ver
  `_notas-generales.md` para el detalle y la cita. Es decir: el documento existe y está auditado, pero
  el regulador deportivo lo exige y lo blinda.
- Último chequeo: 2026-09-22.
