// ─── Gráfico: treemap (rectángulos jerárquicos) ─────────────────────────────

export function opcionTreemap() {
  return {
    title: { text: 'Treemap', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    series: [
      {
        type: 'treemap',
        top: 46,
        roam: false,
        data: [
          { name: 'Operaciones', value: 158000, children: [
            { name: 'Producción', value: 90000 },
            { name: 'Almacén', value: 68000 },
          ] },
          { name: 'Personal', value: 132000, children: [
            { name: 'Salarios', value: 100000 },
            { name: 'Capacitación', value: 32000 },
          ] },
          { name: 'Marketing', value: 48000 },
          { name: 'Tecnología', value: 37000 },
        ],
      },
    ],
  }
}
