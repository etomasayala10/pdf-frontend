// ─── Render de ECharts a imagen (para PDF) ──────────────────────────────────
// pdfmake no entiende gráficos, solo imágenes. Renderizamos la opción de
// ECharts en un contenedor fuera de pantalla y la exportamos como PNG base64.

import { init } from '../charts/echartsBase.js'

export async function opcionAImagen(opcion, { ancho = 760, alto = 380 } = {}) {
  // Contenedor temporal fuera de la vista.
  const contenedor = document.createElement('div')
  contenedor.style.cssText = `position:absolute;left:-9999px;top:0;width:${ancho}px;height:${alto}px;`
  document.body.appendChild(contenedor)

  const grafico = init(contenedor, null, { renderer: 'canvas', width: ancho, height: alto })
  grafico.setOption({ ...opcion, animation: false })

  // Espera un frame para asegurar el pintado del canvas.
  await new Promise((r) => requestAnimationFrame(() => r()))

  const dataUrl = grafico.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  })

  grafico.dispose()
  contenedor.remove()
  return dataUrl
}
