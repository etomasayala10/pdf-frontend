// ─── Sección: gráficos estadísticos ─────────────────────────────────────────
// Recibe una lista de gráficos ya renderizados como imagen base64 y los
// dispone en el PDF, cada uno con su título.

export function seccionGraficos({ graficos = [] }) {
  if (!graficos.length) return []

  const contenido = [{ text: 'Análisis estadístico', style: 'h1', pageBreak: 'before' }]

  graficos.forEach((g) => {
    if (!g.imagenBase64) return
    if (g.titulo) contenido.push({ text: g.titulo, style: 'h2' })
    contenido.push({
      image: g.imagenBase64,
      width: g.ancho ?? 515,
      alignment: 'center',
      margin: [0, 4, 0, 12],
    })
  })

  return contenido
}
