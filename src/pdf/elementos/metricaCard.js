// ─── Tarjeta de métrica para el resumen ejecutivo ───────────────────────────

export function metricaCard(label, valor, color) {
  return {
    stack: [
      { text: label, fontSize: 9, color: '#666666', margin: [0, 0, 0, 4] },
      { text: valor, fontSize: 13, bold: true, color },
    ],
    fillColor: '#f9fafb',
    margin: [0, 0, 0, 0],
  }
}
