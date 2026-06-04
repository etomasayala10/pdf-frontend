// ─── Sección: portada ───────────────────────────────────────────────────────
import { fmtFechaLarga } from '../../utils/formato.js'

export function seccionPortada({ empresa, anio, logoBase64 }) {
  return [
    {
      stack: [
        logoBase64
          ? { image: logoBase64, width: 90, alignment: 'center', margin: [0, 40, 0, 16] }
          : { text: '', margin: [0, 40, 0, 0] },
        { text: empresa, style: 'portadaEmpresa', alignment: 'center', margin: [0, 0, 0, 8] },
        { text: `REPORTE ANUAL ${anio}`, style: 'portadaTitulo', alignment: 'center' },
        {
          canvas: [{ type: 'line', x1: 130, y1: 10, x2: 385, y2: 10, lineWidth: 1.5, lineColor: '#333333' }],
          margin: [0, 16, 0, 16],
        },
        {
          text: 'Resumen de resultados financieros y operativos.',
          style: 'portadaSubtitulo',
          alignment: 'center',
        },
        {
          text: `Generado el ${fmtFechaLarga()}`,
          fontSize: 10,
          color: '#888888',
          alignment: 'center',
          margin: [0, 8, 0, 0],
        },
      ],
    },
  ]
}
