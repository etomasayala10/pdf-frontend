// ─── Datos de ejemplo: ventas por trimestre ────────────────────────────────
// Fuente única de datos tabulares. Cada sección/gráfico consume estos datos,
// así que para cambiar el reporte solo se edita este archivo.

export const ventas = [
  { trimestre: 'T1', ingresos: 120000, gastos: 85000, utilidad: 35000 },
  { trimestre: 'T2', ingresos: 145000, gastos: 92000, utilidad: 53000 },
  { trimestre: 'T3', ingresos: 132000, gastos: 88000, utilidad: 44000 },
  { trimestre: 'T4', ingresos: 178000, gastos: 110000, utilidad: 68000 },
]

// Totales derivados (se calculan una vez y se reutilizan).
export function calcularTotales(filas = ventas) {
  return filas.reduce(
    (acc, r) => ({
      ingresos: acc.ingresos + r.ingresos,
      gastos: acc.gastos + r.gastos,
      utilidad: acc.utilidad + r.utilidad,
    }),
    { ingresos: 0, gastos: 0, utilidad: 0 },
  )
}
