// ─── Sección: imagen de prueba ──────────────────────────────────────────────
// Inserta una imagen embebida (base64) con título y pie de figura.

export function seccionImagen({ titulo = 'Imagen de muestra', imagenBase64, pie }) {
  if (!imagenBase64) return []

  return [
    { text: titulo, style: 'h2' },
    {
      image: imagenBase64,
      width: 515, // ancho útil de la página A4 con márgenes de 40
      margin: [0, 4, 0, 4],
    },
    pie ? { text: pie, style: 'pie', alignment: 'center' } : {},
  ]
}
