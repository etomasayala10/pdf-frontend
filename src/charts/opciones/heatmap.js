// ─── Gráfico: mapa de calor (heatmap) ───────────────────────────────────────

export function opcionHeatmap() {
  const horas = ['00h', '04h', '08h', '12h', '16h', '20h']
  const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  // Datos deterministas de ejemplo [x, y, valor].
  const data = []
  for (let d = 0; d < dias.length; d++) {
    for (let h = 0; h < horas.length; h++) {
      data.push([h, d, ((d * 7 + h * 3) % 10) + 1])
    }
  }

  return {
    title: { text: 'Mapa de calor (heatmap)', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { position: 'top' },
    grid: { left: 50, right: 24, top: 56, bottom: 64 },
    xAxis: { type: 'category', data: horas, splitArea: { show: true } },
    yAxis: { type: 'category', data: dias, splitArea: { show: true } },
    visualMap: { min: 0, max: 10, calculable: true, orient: 'horizontal', left: 'center', bottom: 8 },
    series: [{ type: 'heatmap', data, label: { show: false } }],
  }
}
