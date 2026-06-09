// ─── Gráfico: dispersión con efecto (effectScatter) ─────────────────────────

export function opcionEffectScatter() {
  return {
    title: { text: 'Dispersión con efecto', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item' },
    grid: { left: 50, right: 24, top: 56, bottom: 36 },
    xAxis: { type: 'category', data: ['T1', 'T2', 'T3', 'T4'] },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'effectScatter',
        symbolSize: 18,
        rippleEffect: { scale: 3 },
        data: [35000, 53000, 44000, 68000],
        itemStyle: { color: '#db2777' },
      },
    ],
  }
}
