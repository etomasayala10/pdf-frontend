// ─── Gráfico: desempeño por área (radar) ────────────────────────────────────
// Compara la meta vs. lo alcanzado en varios indicadores (datos de ejemplo).

const INDICADORES = [
  { name: 'Ventas', max: 100 },
  { name: 'Marketing', max: 100 },
  { name: 'Soporte', max: 100 },
  { name: 'Logística', max: 100 },
  { name: 'Calidad', max: 100 },
  { name: 'Innovación', max: 100 },
]

export function opcionDesempenoAreas() {
  return {
    title: { text: 'Desempeño por área (meta vs. real)', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item' },
    legend: { data: ['Meta', 'Real'], bottom: 0 },
    radar: {
      indicator: INDICADORES,
      center: ['50%', '55%'],
      radius: '62%',
    },
    series: [
      {
        type: 'radar',
        data: [
          { value: [90, 80, 85, 80, 90, 75], name: 'Meta', itemStyle: { color: '#94a3b8' }, areaStyle: { opacity: 0.1 } },
          { value: [95, 72, 88, 70, 93, 82], name: 'Real', itemStyle: { color: '#1d4ed8' }, areaStyle: { opacity: 0.25 } },
        ],
      },
    ],
  }
}
