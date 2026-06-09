// ─── Gráfico: velas financieras (candlestick) ───────────────────────────────
// Cada dato es [apertura, cierre, mínimo, máximo].

export function opcionCandlestick() {
  return {
    title: { text: 'Velas financieras (candlestick)', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    grid: { left: 50, right: 24, top: 56, bottom: 36 },
    xAxis: { type: 'category', data: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] },
    yAxis: { type: 'value', scale: true },
    series: [
      {
        type: 'candlestick',
        data: [
          [20, 34, 18, 38],
          [34, 28, 25, 40],
          [28, 40, 26, 42],
          [40, 36, 33, 48],
          [36, 50, 34, 52],
        ],
      },
    ],
  }
}
