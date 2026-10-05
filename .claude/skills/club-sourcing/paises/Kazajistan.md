# Kazajistán — DFO en modo invitado, solo para clubes con participación estatal

`opi.dfo.kz` (Depositario de Informes Financieros). Es un registro de OPI (sociedades por acciones,
estatales, emisores), no de empresas: cubre Aktobe, Ordabasy, Shakhter, Okzhetpes y Kaspiy, y **no**
a los privados (Astana, Kairat, Tobol: TOO, no aparecen).

1. **Buscar**: `GET /ru/opi/list?oq=&flBin=<БИН>&flNameRu=<texto en ruso>&flBlock=Active_Свободно`
   (`flBlock` es obligatorio).
2. `GET /ru/report-json/<id>/get-plugins` → plugin `665` (informe anual de no financieras);
   `get-reports?pluginId=` → un informe por ejercicio (el año anterior al de `LoadDate`);
   `get-nodes` → nodo 6 auditoría, 4 nota explicativa, 7 adjuntos.
3. `GET /ru/render-blocks/<id>/get-node-data?...&nodeId=<n>` → enlaces `/ru/file-download/<token>`,
   que devuelven el PDF directo. `curl` simple, sin User-Agent especial.

- El nodo 3 (formularios Ф1-Ф4) viene con las celdas vacías (los valores se cargan con token): usar
  el PDF del nodo 6.
- Los archivos pesan de 2 a 56 MB.
- Script: `Admin/sourcing-europa-este-scripts/dfo.py <БИН> <carpeta>`.
- Informes en ruso, escaneados: OCR `rus`.
