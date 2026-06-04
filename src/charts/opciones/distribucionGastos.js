// ─── Gráfico: distribución de gastos (dona) ─────────────────────────────────
// Datos de ejemplo independientes (composición del gasto anual).

const GASTOS_POR_AREA = [
  { name: 'Operaciones', value: 158000, color: '#1d4ed8' },
  { name: 'Personal', value: 132000, color: '#7c3aed' },
  { name: 'Marketing', value: 48000, color: '#db2777' },
  { name: 'Tecnología', value: 37000, color: '#0891b2' },
]

export function opcionDistribucionGastos(datos = GASTOS_POR_AREA) {
  return {
    title: { text: 'Distribución de gastos por área', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item', formatter: '{b}: S/ {c} ({d}%)' },
    legend: { bottom: 0 },
    series: [
      {
        name: 'Gastos',
        type: 'pie',
        radius: ['38%', '60%'],
        center: ['50%', '56%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        label: { formatter: '{d}%' },
        data: datos.map((d) => ({ name: d.name, value: d.value, itemStyle: { color: d.color } })),
      },
    ],
  }
}
