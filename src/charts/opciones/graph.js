// ─── Gráfico: grafo de relaciones (graph, layout circular) ──────────────────
// Se usa layout 'circular' (determinista) en lugar de 'force' para que el
// render fuera de pantalla del PDF salga estable sin animación.

export function opcionGraph() {
  return {
    title: { text: 'Grafo de relaciones', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: {},
    series: [
      {
        type: 'graph',
        layout: 'circular',
        top: 46,
        bottom: 20,
        roam: false,
        circular: { rotateLabel: true },
        label: { show: true, position: 'right', fontSize: 10 },
        symbolSize: 26,
        data: [
          { name: 'Ventas' },
          { name: 'Marketing' },
          { name: 'Soporte' },
          { name: 'Producto' },
          { name: 'Finanzas' },
        ],
        links: [
          { source: 'Ventas', target: 'Marketing' },
          { source: 'Ventas', target: 'Soporte' },
          { source: 'Marketing', target: 'Producto' },
          { source: 'Producto', target: 'Finanzas' },
          { source: 'Soporte', target: 'Finanzas' },
        ],
        lineStyle: { color: '#94a3b8', curveness: 0.2 },
        itemStyle: { color: '#1d4ed8' },
      },
    ],
  }
}
