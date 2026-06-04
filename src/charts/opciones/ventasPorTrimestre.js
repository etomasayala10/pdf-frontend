// ─── Gráfico: ventas por trimestre (barras agrupadas) ───────────────────────
// Recibe los datos y devuelve la opción de ECharts. Independiente de dónde se
// pinte (componente Vue en pantalla o imagen para el PDF).

export function opcionVentasPorTrimestre(ventas) {
  return {
    title: { text: 'Ingresos, gastos y utilidad por trimestre', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['Ingresos', 'Gastos', 'Utilidad'], top: 28 },
    grid: { left: 60, right: 24, top: 70, bottom: 32 },
    xAxis: { type: 'category', data: ventas.map((v) => v.trimestre) },
    yAxis: { type: 'value', axisLabel: { formatter: (v) => `S/ ${v / 1000}k` } },
    series: [
      { name: 'Ingresos', type: 'bar', data: ventas.map((v) => v.ingresos), itemStyle: { color: '#1d4ed8' } },
      { name: 'Gastos', type: 'bar', data: ventas.map((v) => v.gastos), itemStyle: { color: '#b91c1c' } },
      { name: 'Utilidad', type: 'bar', data: ventas.map((v) => v.utilidad), itemStyle: { color: '#15803d' } },
    ],
  }
}
