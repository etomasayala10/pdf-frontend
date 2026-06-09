// ─── Gráfico: cumplimiento de meta anual (gauge / medidor) ──────────────────

export function opcionCumplimientoMeta(porcentaje = 87) {
  return {
    title: { text: 'Cumplimiento de meta anual', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    series: [
      {
        type: 'gauge',
        center: ['50%', '58%'],
        radius: '78%',
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        progress: { show: true, width: 16 },
        axisLine: { lineStyle: { width: 16 } },
        axisLabel: { distance: 22, fontSize: 10 },
        pointer: { length: '60%' },
        anchor: { show: true, size: 12, itemStyle: { color: '#1a1a1a' } },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          fontSize: 22,
          color: '#1a1a1a',
          offsetCenter: [0, '70%'],
        },
        data: [{ value: porcentaje }],
      },
    ],
  }
}
