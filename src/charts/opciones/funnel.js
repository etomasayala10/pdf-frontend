// ─── Gráfico: embudo (funnel) ───────────────────────────────────────────────

export function opcionFunnel() {
  return {
    title: { text: 'Embudo de conversión (funnel)', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    legend: { bottom: 0 },
    series: [
      {
        type: 'funnel',
        top: 46,
        bottom: 40,
        left: '10%',
        width: '80%',
        min: 0,
        max: 100,
        label: { show: true, position: 'inside' },
        data: [
          { value: 100, name: 'Visitas' },
          { value: 80, name: 'Registros' },
          { value: 60, name: 'Cotizaciones' },
          { value: 40, name: 'Negociación' },
          { value: 20, name: 'Ventas' },
        ],
      },
    ],
  }
}
