# Independiente Medellín (Corporación Deportiva Independiente Medellín)

- **Dead-end de esta sesión (2026-09-22), con causa societaria identificada pero no cerrada del
  todo.** Es el único club de la Primera A chequeado esta sesión que NO aparece en SIIS
  (Supersociedades) por ninguna vía, a diferencia de los otros 7 clubes nuevos que sí aparecieron.
- Ángulos probados, los 3 sin resultado:
  1. **SIIS / Supersociedades, por nombre.** Con la API de búsqueda del portal (ver la nota
     metodológica nueva en `fuentes/Colombia/_notas-generales.md`) se buscó `"INDEPENDIENTE
     MEDELLIN"` como frase exacta sobre `nombreEmpresa`: **0 hits**. También se listaron TODAS las
     entidades del índice con CIIU deportivo (R9311 gestión de instalaciones deportivas, R9312
     clubes deportivos, R9319 otras actividades deportivas) — 454 documentos, 131 razones sociales
     distintas en R9312 — y el club no está en ninguna de las tres listas.
  2. **SIIS por NIT.** Se probó el NIT que circula en directorios empresariales para la sociedad
     (890900575): **0 hits** en el índice.
  3. **Sitio oficial `dimoficial.com`.** Menú completo revisado (Inicio, Club, Noticias, Fútbol,
     Boletería, Prensa, Abonos) más el pie de página: NO hay sección de transparencia, estados
     financieros, balance, informe de gestión ni asamblea de accionistas. Los únicos dos documentos
     colgados son la política de tratamiento de datos y el código de ética.
- **Causa probable, sin confirmar**: los directorios empresariales (datacreditoempresas.com.co,
  informacolombia.com, einforma.co) listan `DEPORTIVO INDEPENDIENTE MEDELLIN S.A.` con la marca
  **"En liquidación"**, mientras que la entidad que opera hoy el club se identifica como
  **Corporación Deportiva Independiente Medellín** — una corporación, no una sociedad comercial, y
  por lo tanto fuera del perímetro de vigilancia de Supersociedades que sí alcanza al resto de los
  clubes-S.A. Es la misma clase de bloqueo estructural que ya está documentado para los clubes
  peruanos organizados como asociación civil (ver `club-sourcing` sección 6). **No confirmado**: la
  pregunta concreta quedó anotada en `Admin/dudas-por-club.md`.
- Ángulo que queda pendiente para una sesión futura, sin probar todavía: el **Informe de
  comportamiento financiero del fútbol colombiano** que publica Supersociedades cada año
  (supersociedades.gov.co/informe-comportamiento-financiero-del-futbol-colombiano-2024) dice cubrir
  34 clubes-sociedad más 2 asociaciones (Cali y Pasto) — si el DIM aparece ahí, la entidad exacta
  que reporta quedaría identificada y con ella el camino a sus estados financieros. Es un agregado,
  no da el balance por club, pero sirve como lista de candidatos (mismo uso que ya tiene documentado
  el informe agregado viejo en `_notas-generales.md`).
- Contacto: dimoficial.com; info@dimoficial.com; siis.ia.supersociedades.gov.co.
- Último chequeo: 2026-09-22.

## Barrido 2026-10-08 (año de sourcing 2023) — RESUELTO el dead-end de SIIS

**Ángulos**: regulador/país (SIIS Supersociedades): **HIT** — la sociedad es **EL EQUIPO DEL PUEBLO S.A.** (NIT 900577148, domicilio Medellín, constituida por escritura pública 6722 del 11-dic-2012, CIIU R9312) · barrido: 3 (Sonnet) — 2026-10-08

- La búsqueda previa por "Independiente Medellín" y por el NIT 890900575 daba 0 hits porque la sociedad que opera el club NO lleva ese nombre: "El Equipo del Pueblo" es el apodo del DIM, y Wikipedia (ficha del equipo femenino) lista "El Equipo del Pueblo S.A." como dueña del 100%. La hipótesis de la nota anterior ("corporación fuera de Supersociedades") era incorrecta.
- **10 ejercicios bajados** en `Clubes/Colombia/Independiente Medellin/` (carpeta antes llamada "El Equipo del Pueblo"): estados financieros 2016-2025 con certificación y dictamen del revisor fiscal. SIIS lista exactamente esos 10 registros.
- Confirmar contra el primer PDF que el objeto social sea el club (se leyó que el objeto incluye "deporte competitivo de alto rendimiento con deportistas bajo remuneración").
