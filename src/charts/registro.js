// ─── Registro central de gráficos ───────────────────────────────────────────
// Fuente única de verdad: cada entrada define un gráfico una sola vez y se
// reutiliza tanto en pantalla (vue-echarts) como en el PDF (PNG embebido).
//
// Campos de cada entrada:
//   id       → clave única (para :key en el v-for)
//   titulo   → título mostrado en el PDF
//   opcion   → función que devuelve la opción de ECharts
//   tamano   → { ancho, alto } del render para el PDF (opcional)
//   anchoPdf → ancho de la imagen dentro del PDF en pt (opcional, def. 515)

import { ventas } from '../data/ventas.js'

import { opcionVentasPorTrimestre } from './opciones/ventasPorTrimestre.js'
import { opcionTendenciaUtilidad } from './opciones/tendenciaUtilidad.js'
import { opcionDistribucionGastos } from './opciones/distribucionGastos.js'
import { opcionDesempenoAreas } from './opciones/desempenoAreas.js'
import { opcionCumplimientoMeta } from './opciones/cumplimientoMeta.js'
import { opcionScatter } from './opciones/scatter.js'
import { opcionEffectScatter } from './opciones/effectScatter.js'
import { opcionHeatmap } from './opciones/heatmap.js'
import { opcionTreemap } from './opciones/treemap.js'
import { opcionSunburst } from './opciones/sunburst.js'
import { opcionSankey } from './opciones/sankey.js'
import { opcionFunnel } from './opciones/funnel.js'
import { opcionGraph } from './opciones/graph.js'
import { opcionTree } from './opciones/tree.js'
import { opcionBoxplot } from './opciones/boxplot.js'
import { opcionCandlestick } from './opciones/candlestick.js'
import { opcionParallel } from './opciones/parallel.js'
import { opcionThemeRiver } from './opciones/themeRiver.js'
import { opcionPictorialBar } from './opciones/pictorialBar.js'

export const GRAFICOS = [
  { id: 'ventas', titulo: 'Ventas por trimestre', opcion: () => opcionVentasPorTrimestre(ventas) },
  { id: 'tendencia', titulo: 'Tendencia de utilidad', opcion: () => opcionTendenciaUtilidad(ventas) },
  { id: 'gastos', titulo: 'Distribución de gastos', opcion: opcionDistribucionGastos, tamano: { ancho: 600, alto: 420 }, anchoPdf: 360 },
  { id: 'desempeno', titulo: 'Desempeño por área', opcion: opcionDesempenoAreas, tamano: { ancho: 600, alto: 460 }, anchoPdf: 360 },
  { id: 'meta', titulo: 'Cumplimiento de meta', opcion: opcionCumplimientoMeta, tamano: { ancho: 600, alto: 420 }, anchoPdf: 360 },
  { id: 'scatter', titulo: 'Dispersión (scatter)', opcion: opcionScatter },
  { id: 'effectScatter', titulo: 'Dispersión con efecto', opcion: opcionEffectScatter },
  { id: 'heatmap', titulo: 'Mapa de calor (heatmap)', opcion: opcionHeatmap, tamano: { ancho: 600, alto: 420 }, anchoPdf: 420 },
  { id: 'treemap', titulo: 'Treemap', opcion: opcionTreemap },
  { id: 'sunburst', titulo: 'Sunburst', opcion: opcionSunburst, tamano: { ancho: 600, alto: 460 }, anchoPdf: 360 },
  { id: 'sankey', titulo: 'Diagrama de flujo (sankey)', opcion: opcionSankey },
  { id: 'funnel', titulo: 'Embudo (funnel)', opcion: opcionFunnel, tamano: { ancho: 600, alto: 440 }, anchoPdf: 360 },
  { id: 'graph', titulo: 'Grafo de relaciones', opcion: opcionGraph, tamano: { ancho: 600, alto: 460 }, anchoPdf: 360 },
  { id: 'tree', titulo: 'Organigrama (tree)', opcion: opcionTree },
  { id: 'boxplot', titulo: 'Diagrama de caja (boxplot)', opcion: opcionBoxplot },
  { id: 'candlestick', titulo: 'Velas financieras (candlestick)', opcion: opcionCandlestick },
  { id: 'parallel', titulo: 'Coordenadas paralelas', opcion: opcionParallel },
  { id: 'themeRiver', titulo: 'Río temático (themeRiver)', opcion: opcionThemeRiver },
  { id: 'pictorialBar', titulo: 'Barras pictóricas', opcion: opcionPictorialBar },
]
