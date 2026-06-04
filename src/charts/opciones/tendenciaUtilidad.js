// ─── Gráfico: tendencia de utilidad (línea suave) ───────────────────────────

export function opcionTendenciaUtilidad(ventas) {
  return {
    title: { text: 'Tendencia de utilidad neta', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    grid: { left: 60, right: 24, top: 56, bottom: 32 },
    xAxis: { type: 'category', boundaryGap: false, data: ventas.map((v) => v.trimestre) },
    yAxis: { type: 'value', axisLabel: { formatter: (v) => `S/ ${v / 1000}k` } },
    series: [
      {
        name: 'Utilidad',
        type: 'line',
        smooth: true,
        data: ventas.map((v) => v.utilidad),
        lineStyle: { color: '#15803d', width: 3 },
        itemStyle: { color: '#15803d' },
        areaStyle: { color: 'rgba(21,128,61,0.12)' },
      },
    ],
  }
}
