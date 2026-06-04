// ─── Carga de imágenes como base64 ──────────────────────────────────────────
// pdfmake solo acepta imágenes embebidas como Data URL (base64). Esta utilidad
// descarga una imagen servida por la app (carpeta /public) y la convierte.

export async function urlABase64(url) {
  const respuesta = await fetch(url)
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar la imagen: ${url} (${respuesta.status})`)
  }
  const blob = await respuesta.blob()

  return await new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onload = () => resolve(lector.result)
    lector.onerror = () => reject(lector.error)
    lector.readAsDataURL(blob)
  })
}
