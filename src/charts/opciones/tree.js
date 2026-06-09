// ─── Gráfico: árbol (tree) ──────────────────────────────────────────────────

export function opcionTree() {
  return {
    title: { text: 'Organigrama (tree)', left: 'center', top: 8, textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [
      {
        type: 'tree',
        top: 46,
        bottom: 20,
        left: '14%',
        right: '18%',
        symbolSize: 10,
        label: { position: 'left', verticalAlign: 'middle', align: 'right', fontSize: 10 },
        leaves: { label: { position: 'right', verticalAlign: 'middle', align: 'left' } },
        expandAndCollapse: false,
        data: [
          {
            name: 'Empresa',
            children: [
              { name: 'Ventas', children: [{ name: 'Nacional' }, { name: 'Exportación' }] },
              { name: 'Operaciones', children: [{ name: 'Producción' }, { name: 'Logística' }] },
            ],
          },
        ],
      },
    ],
  }
}
