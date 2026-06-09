// ─── Gráfico: río temático (themeRiver) ─────────────────────────────────────

export function opcionThemeRiver() {
  return {
    title: { text: 'Río temático (themeRiver)', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    singleAxis: { type: 'time', top: 50, bottom: 50 },
    series: [
      {
        type: 'themeRiver',
        label: { show: false },
        data: [
          ['2025-01-01', 10, 'Ventas'], ['2025-02-01', 15, 'Ventas'], ['2025-03-01', 12, 'Ventas'], ['2025-04-01', 18, 'Ventas'],
          ['2025-01-01', 8, 'Marketing'], ['2025-02-01', 6, 'Marketing'], ['2025-03-01', 9, 'Marketing'], ['2025-04-01', 7, 'Marketing'],
          ['2025-01-01', 5, 'Soporte'], ['2025-02-01', 7, 'Soporte'], ['2025-03-01', 6, 'Soporte'], ['2025-04-01', 8, 'Soporte'],
        ],
      },
    ],
  }
}
