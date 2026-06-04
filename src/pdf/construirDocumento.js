// ─── Construcción del documento pdfmake ─────────────────────────────────────
// Orquesta los elementos y secciones modulares. Es asíncrono porque la imagen
// y los gráficos deben convertirse a base64 antes de armar el PDF.

import { ventas, calcularTotales } from '../data/ventas.js'
import { urlABase64 } from '../utils/imagen.js'
import { opcionAImagen } from '../utils/echart.js'

import { opcionVentasPorTrimestre } from '../charts/opciones/ventasPorTrimestre.js'
import { opcionTendenciaUtilidad } from '../charts/opciones/tendenciaUtilidad.js'
import { opcionDistribucionGastos } from '../charts/opciones/distribucionGastos.js'

import { crearHeader } from './elementos/header.js'
import { crearFooter } from './elementos/footer.js'
import { estilos } from './estilos.js'

import { seccionPortada } from './secciones/portada.js'
import { seccionResumenEjecutivo } from './secciones/resumenEjecutivo.js'
import { seccionImagen } from './secciones/seccionImagen.js'
import { seccionGraficos } from './secciones/seccionGraficos.js'
import { seccionTablaTrimestral } from './secciones/tablaTrimestral.js'

// Rutas de imágenes servidas desde /public.
const RUTA_LOGO = '/images/logo.png'
const RUTA_IMAGEN_MUESTRA = '/images/image01.png'

export async function construirDocumento({ empresa, anio }) {
  const totales = calcularTotales(ventas)

  // Recursos asíncronos: logo, imagen de muestra y gráficos → base64.
  // Se cargan en paralelo para mayor velocidad.
  const [logoBase64, imagenMuestra, imgVentas, imgTendencia, imgGastos] = await Promise.all([
    urlABase64(RUTA_LOGO),
    urlABase64(RUTA_IMAGEN_MUESTRA),
    opcionAImagen(opcionVentasPorTrimestre(ventas)),
    opcionAImagen(opcionTendenciaUtilidad(ventas)),
    opcionAImagen(opcionDistribucionGastos(), { ancho: 600, alto: 420 }),
  ])

  return {
    info: {
      title: `Reporte Anual ${anio}`,
      author: empresa,
      subject: 'Reporte de ventas',
    },

    header: crearHeader({ empresa, anio, logoBase64 }),
    footer: crearFooter(),

    content: [
      ...seccionPortada({ empresa, anio, logoBase64 }),
      ...seccionResumenEjecutivo({ empresa, anio, totales }),
      ...seccionImagen({
        titulo: 'Imagen de muestra',
        imagenBase64: imagenMuestra,
        pie: 'Figura 1. Imagen de ejemplo embebida en el PDF.',
      }),
      ...seccionGraficos({
        graficos: [
          { titulo: 'Ventas por trimestre', imagenBase64: imgVentas },
          { titulo: 'Tendencia de utilidad', imagenBase64: imgTendencia },
          { titulo: 'Distribución de gastos', imagenBase64: imgGastos, ancho: 360 },
        ],
      }),
      ...seccionTablaTrimestral({ empresa, anio, ventas, totales }),
    ],

    styles: estilos,
    pageMargins: [40, 72, 40, 45],
    pageSize: 'A4',
  }
}
