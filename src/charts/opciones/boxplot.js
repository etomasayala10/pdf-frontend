// ─── Gráfico: diagrama de caja (boxplot) ────────────────────────────────────
// Datos ya resumidos: [mínimo, Q1, mediana, Q3, máximo].

export function opcionBoxplot() {
  return {
    title: { text: 'Diagrama de caja (boxplot)', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item' },
    grid: { left: 50, right: 24, top: 56, bottom: 36 },
    xAxis: { type: 'category', data: ['T1', 'T2', 'T3', 'T4'] },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'boxplot',
        data: [
          [70, 80, 90, 100, 110],
          [75, 85, 95, 105, 120],
          [60, 78, 88, 98, 108],
          [90, 100, 110, 120, 135],
        ],
        itemStyle: { color: '#c7d2fe', borderColor: '#1d4ed8' },
      },
    ],
  }
}
