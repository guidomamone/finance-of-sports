# Grecia — 100% de la liga top cubierta con un solo canal

El **ΓΕΜΗ** (Γενικό Εμπορικό Μητρώο, el registro mercantil general griego,
`publicity.businessportal.gr`) funciona al mismo nivel que Bélgica/Dinamarca: gratis, sin login, sin
captcha, con descarga directa por API (`/api/download/financial/<id>?companyId=<ΓΕΜΗ>`) — ni
siquiera hace falta un click de navegador real, a diferencia de Alemania/UK. Los 14 clubes de la
Super League Greece 2025/26 quedaron cubiertos con documentos reales, sin ningún dead-end. Último
chequeo: 2026-09-17.

- **Buscar por razón social o "ΠΑΕ + nombre" no siempre alcanza**: varios clubes (Panathinaikos,
  Panetolikos, PAOK, Volos, Kifisia) necesitaron variantes de búsqueda para encontrar la ΠΑΕ
  (Ποδοσφαιρική Ανώνυμη Εταιρεία, la figura legal específica de club de fútbol profesional).
- **Rate-limit real**: el endpoint devuelve 429 después de ~10 descargas seguidas sin pausa —
  espaciar con `sleep 1.3-1.5s` entre requests, mismo criterio que cualquier API pública sin API key.
- **Varios clubes tienen múltiples entidades ΠΑΕ históricas** (activa + en liquidación) por
  quiebras/refundaciones societarias — elegir siempre la marcada "Ενεργή" (activa) en el registro,
  mismo patrón que Leeds United en Inglaterra (`paises/Reino-Unido.md`) o Panserraikos acá mismo (refundado en
  2020 tras liquidar la ΠΑΕ anterior).
- **Huecos genuinos sin explicación encontrada, no son bloqueos de portal**: Aris (FY2019/20),
  Atromitos (FY2017/18), Panetolikos (FY2018/19 y FY2020/21, el único con dos), PAOK (FY2017/18) —
  no se encontró ningún depósito para esos ejercicios puntuales pese a continuidad en el resto de
  la serie.
