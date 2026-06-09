// ─── Gráfico: barras pictóricas (pictorialBar) ──────────────────────────────

export function opcionPictorialBar() {
  return {
    title: { text: 'Barras pictóricas', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: {},
    grid: { left: 50, right: 24, top: 56, bottom: 36 },
    xAxis: { type: 'category', data: ['T1', 'T2', 'T3', 'T4'] },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'pictorialBar',
        symbol: 'roundRect',
        symbolRepeat: true,
        symbolSize: ['60%', '12%'],
        symbolMargin: '20%',
        data: [35, 53, 44, 68],
        itemStyle: { color: '#15803d' },
      },
    ],
  }
}
