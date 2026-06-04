// ─── Sección: tabla de resultados por trimestre ─────────────────────────────
import { fmtMoneda } from '../../utils/formato.js'

export function seccionTablaTrimestral({ empresa, anio, ventas, totales }) {
  return [
    { text: 'Resultados por Trimestre', style: 'h1', pageBreak: 'before' },
    {
      style: 'tabla',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [
            { text: 'Trimestre', style: 'thCell' },
            { text: 'Ingresos', style: 'thCell' },
            { text: 'Gastos', style: 'thCell' },
            { text: 'Utilidad', style: 'thCell' },
          ],
          ...ventas.map((r, i) => [
            { text: r.trimestre, style: i % 2 === 0 ? 'tdCellAlt' : 'tdCell' },
            { text: fmtMoneda(r.ingresos), style: i % 2 === 0 ? 'tdCellAlt' : 'tdCell', alignment: 'right' },
            { text: fmtMoneda(r.gastos), style: i % 2 === 0 ? 'tdCellAlt' : 'tdCell', alignment: 'right' },
            { text: fmtMoneda(r.utilidad), style: i % 2 === 0 ? 'tdCellAlt' : 'tdCell', alignment: 'right', color: '#15803d' },
          ]),
          [
            { text: 'TOTAL', bold: true, fillColor: '#f3f4f6', fontSize: 10 },
            { text: fmtMoneda(totales.ingresos), bold: true, alignment: 'right', fillColor: '#f3f4f6', fontSize: 10 },
            { text: fmtMoneda(totales.gastos), bold: true, alignment: 'right', fillColor: '#f3f4f6', fontSize: 10 },
            { text: fmtMoneda(totales.utilidad), bold: true, alignment: 'right', fillColor: '#f3f4f6', fontSize: 10, color: '#15803d' },
          ],
        ],
      },
      layout: {
        hLineWidth: (i) => (i === 0 || i === 1 ? 1 : 0.5),
        vLineWidth: () => 0,
        hLineColor: (i) => (i === 0 || i === 1 ? '#333333' : '#e5e7eb'),
        paddingLeft: () => 8,
        paddingRight: () => 8,
        paddingTop: () => 7,
        paddingBottom: () => 7,
      },
    },
    { text: 'Conclusiones', style: 'h2' },
    {
      text:
        `${empresa} cerró el año ${anio} con una utilidad neta de ${fmtMoneda(totales.utilidad)}, ` +
        `lo que representa una rentabilidad del ${((totales.utilidad / totales.ingresos) * 100).toFixed(1)}% ` +
        'sobre los ingresos totales. Los resultados reflejan la solidez del modelo de negocio y ' +
        'sientan las bases para los objetivos del próximo período.',
      style: 'cuerpo',
    },
  ]
}
