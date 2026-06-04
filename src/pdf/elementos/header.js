// ─── Cabecera del PDF (se ejecuta en cada página) ───────────────────────────
// Muestra el logo a la izquierda y el nombre de la empresa. La paginación NO
// va aquí, solo en el pie de página. `logoBase64` es opcional.

export function crearHeader({ empresa, anio, logoBase64 } = {}) {
  // No usa currentPage/pageCount: la cabecera es idéntica en todas las páginas.
  return () => ({
    stack: [
      // Columnas con anchos explícitos para evitar superposiciones:
      // logo (auto) y datos de la empresa (*).
      {
        columns: [
          // Logo (solo se define ancho → conserva la proporción original)
          logoBase64
            ? { image: logoBase64, width: 78, margin: [40, 12, 0, 0] }
            : { text: '', width: 40 },
          // Datos de la empresa (ocupa el espacio restante, alineado a la derecha)
          {
            width: '*',
            stack: [
              { text: empresa, bold: true, fontSize: 11, color: '#1a1a1a' },
              { text: `Reporte Anual ${anio}`, fontSize: 9, color: '#888888' },
            ],
            alignment: 'right',
            margin: [0, 13, 40, 0],
          },
        ],
      },
      // Línea divisoria entre la cabecera y el contenido
      {
        canvas: [
          { type: 'line', x1: 40, y1: 6, x2: 555, y2: 6, lineWidth: 0.7, lineColor: '#d1d5db' },
        ],
      },
    ],
  })
}
