// ─── Gráfico: sunburst (jerarquía radial) ───────────────────────────────────

export function opcionSunburst() {
  return {
    title: { text: 'Sunburst', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'sunburst',
        radius: [0, '88%'],
        center: ['50%', '56%'],
        label: { minAngle: 8 },
        data: [
          { name: 'Operaciones', value: 10, children: [
            { name: 'Producción', value: 6 },
            { name: 'Almacén', value: 4 },
          ] },
          { name: 'Personal', value: 8, children: [
            { name: 'Salarios', value: 6 },
            { name: 'Capacitación', value: 2 },
          ] },
          { name: 'Marketing', value: 5 },
          { name: 'Tecnología', value: 4 },
        ],
      },
    ],
  }
}
