// ─── Gráfico: coordenadas paralelas (parallel) ──────────────────────────────

export function opcionParallel() {
  return {
    title: { text: 'Coordenadas paralelas', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    parallelAxis: [
      { dim: 0, name: 'Ingresos' },
      { dim: 1, name: 'Gastos' },
      { dim: 2, name: 'Utilidad' },
      { dim: 3, name: 'Margen %' },
    ],
    parallel: { top: 60, bottom: 30, left: 70, right: 70 },
    series: [
      {
        type: 'parallel',
        lineStyle: { width: 2 },
        data: [
          [120, 85, 35, 29],
          [145, 92, 53, 37],
          [132, 88, 44, 33],
          [178, 110, 68, 38],
        ],
      },
    ],
  }
}
