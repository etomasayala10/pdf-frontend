// ─── Pie de página del PDF (se ejecuta en cada página) ──────────────────────

export function crearFooter() {
  return (currentPage, pageCount) => ({
    columns: [
      {
        text: 'Documento confidencial — uso interno',
        fontSize: 8,
        color: '#aaaaaa',
        margin: [40, 8, 0, 0],
      },
      {
        text: `Página ${currentPage} de ${pageCount}`,
        alignment: 'right',
        fontSize: 8,
        color: '#aaaaaa',
        margin: [0, 8, 40, 0],
      },
    ],
  })
}
