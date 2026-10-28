// scratch: responde los 14 casos verificar (anio-vecino y no-cierra) de Atlético Nacional con el motivo de cada par
import { spawnSync } from 'node:child_process';
const R = '/Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports';
const D = 'Clubes/Colombia/Atletico Nacional/siis-estado-';
const fila = (y) => `la diferencia de ingresos es exactamente la fila «Otras ganancias (pérdidas)» de ${y}, con el mismo importe en los dos estados; la comparación la cuenta como ingreso en uno y no en el otro, no hay reexpresión de SIIS. El resultado del año coincide.`;
const casos = [
  // [id, año del documento del caso, nota, seguridad]
  ['a7776f5', 2015, 'Reexpresión: el estado de 2016 informa 2015 con «Otros ingresos» 315.560 en lugar de 2.944.225, «Gastos de ventas» 61.996.771 en lugar de 63.935.069 y «Otros gastos» 0 en lugar de 690.367 (miles); la diferencia de ingresos (2.628.665) es el cambio de «Otros ingresos» y el resultado del año no cambia. Cada año se carga como lo informó su propio estado.', 'media'],
  ['9524c04', 2016, 'Reexpresión (mismo par 2015/2016): ver el caso de 2015; el estado de 2016 netea «Otros ingresos» de 2015 contra gastos, sin cambiar el resultado.', 'media'],
  ['d730231', 2016, 'Reexpresión (mismo par 2015/2016): el estado de 2016 informa 2015 con «Otros ingresos» 315.560 en lugar de 2.944.225 y menos gastos; el resultado del año no cambia.', 'media'],
  ['0b54f8b', 2015, 'Reexpresión (mismo par 2015/2016): el estado de 2015 informa «Otros ingresos» 2.944.225 y el de 2016 los netea contra gastos; el resultado no cambia.', 'media'],
  ['6fc99d5', 2018, 'Reexpresión: el estado de 2019 informa 2018 con los 13.741.103 de «Otros ingresos» como «Otras ganancias (pérdidas)» (la diferencia de ingresos es ese importe) y pasa 84.121.335 de «Gastos de ventas» a «Costo de ventas»; el resultado del año no cambia. Cada año se carga como lo informó su propio estado.', 'media'],
  ['ba34120', 2019, 'Reexpresión (mismo par 2018/2019): el estado de 2019 reclasifica «Otros ingresos» de 2018 a «Otras ganancias (pérdidas)» (13.741.103) y gastos entre costo y gastos de ventas; el resultado no cambia.', 'media'],
  ['7918aca', 2019, fila(2019), 'alta'],
  ['908faee', 2020, fila(2019), 'alta'],
  ['ed1e59b', 2020, fila(2020), 'alta'],
  ['56c5bfe', 2021, fila(2020), 'alta'],
  ['48c9fd9', 2023, fila(2023), 'alta'],
  ['baf0128', 2024, fila(2023), 'alta'],
  ['cc272cf', 2024, fila(2024), 'alta'],
  ['a9a2a61', 2025, fila(2024), 'alta'],
];
for (const [id, y, nota, seg] of casos) {
  const r = spawnSync('node', [`${R}/tools/cola.mjs`, '--responder', id, 'aceptar', '--nota', nota, '--evidencia', `${D}${y}.md:11-24`, '--seguridad', seg, '--causa', 'lectura-del-documento'], { cwd: R, encoding: 'utf8' });
  console.log(id, y, r.status, ((r.stdout || '') + (r.stderr || '')).trim().split('\n').slice(-1)[0].slice(0, 120));
}
