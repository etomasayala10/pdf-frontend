// ─── Sección: resumen ejecutivo (con tarjetas de métricas) ──────────────────
import { fmtMoneda } from '../../utils/formato.js'
import { metricaCard } from '../elementos/metricaCard.js'

export function seccionResumenEjecutivo({ empresa, anio, totales }) {
  return [
    { text: 'Resumen Ejecutivo', style: 'h1', pageBreak: 'before' },
    {
      text:
        `Durante el año ${anio}, ${empresa} registró un crecimiento sostenido en sus ` +
        'principales indicadores financieros. Los ingresos totales superaron las proyecciones ' +
        'iniciales, impulsados principalmente por el desempeño del cuarto trimestre.',
      style: 'cuerpo',
    },
    { text: 'Indicadores clave', style: 'h2' },
    {
      columns: [
        metricaCard('Ingresos totales', fmtMoneda(totales.ingresos), '#1d4ed8'),
        metricaCard('Gastos totales', fmtMoneda(totales.gastos), '#b91c1c'),
        metricaCard('Utilidad neta', fmtMoneda(totales.utilidad), '#15803d'),
      ],
      columnGap: 12,
      margin: [0, 0, 0, 20],
    },
  ]
}
