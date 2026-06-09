// ─── Gráfico: dispersión (scatter) ──────────────────────────────────────────

export function opcionScatter() {
  const datos = [
    [10, 8.04], [8, 6.95], [13, 7.58], [9, 8.81], [11, 8.33],
    [14, 9.96], [6, 7.24], [4, 4.26], [12, 10.84], [7, 4.82], [5, 5.68],
  ]
  return {
    title: { text: 'Dispersión (scatter)', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item' },
    grid: { left: 50, right: 24, top: 56, bottom: 36 },
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    series: [{ type: 'scatter', symbolSize: 12, data: datos, itemStyle: { color: '#1d4ed8' } }],
  }
}
