// ─── Gráfico: sankey (flujo) ────────────────────────────────────────────────
// Flujo de 3 niveles: Ingresos → (Costos | Utilidad) → áreas de costo.
// Se deja margen derecho amplio para que las etiquetas de la última columna
// no se recorten.

export function opcionSankey() {
  return {
    title: { text: 'Diagrama de flujo (sankey)', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [
      {
        type: 'sankey',
        top: 46,
        bottom: 20,
        left: 24,
        right: 120,
        nodeGap: 14,
        nodeWidth: 14,
        emphasis: { focus: 'adjacency' },
        label: { fontSize: 11, color: '#1a1a1a' },
        data: [
          { name: 'Ingresos' },
          { name: 'Costos' },
          { name: 'Utilidad' },
          { name: 'Operaciones' },
          { name: 'Personal' },
          { name: 'Marketing' },
          { name: 'Tecnología' },
        ],
        links: [
          { source: 'Ingresos', target: 'Costos', value: 375 },
          { source: 'Ingresos', target: 'Utilidad', value: 200 },
          { source: 'Costos', target: 'Operaciones', value: 158 },
          { source: 'Costos', target: 'Personal', value: 132 },
          { source: 'Costos', target: 'Marketing', value: 48 },
          { source: 'Costos', target: 'Tecnología', value: 37 },
        ],
        lineStyle: { color: 'gradient', curveness: 0.5 },
      },
    ],
  }
}
