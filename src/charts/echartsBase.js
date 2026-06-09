// ─── Configuración base de ECharts (tree-shaking) ───────────────────────────
// Registra una sola vez todos los tipos de gráfico y componentes que usa la
// app. Tanto el componente de pantalla (vue-echarts) como el render para PDF
// dependen de esta configuración, por lo que basta importar este archivo.

import { use, init } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GaugeChart,
  ScatterChart,
  EffectScatterChart,
  HeatmapChart,
  TreemapChart,
  SunburstChart,
  SankeyChart,
  FunnelChart,
  GraphChart,
  TreeChart,
  BoxplotChart,
  CandlestickChart,
  ParallelChart,
  ThemeRiverChart,
  PictorialBarChart,
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  RadarComponent,
  VisualMapComponent,
  ParallelComponent,
  SingleAxisComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  // Tipos de gráfico
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GaugeChart,
  ScatterChart,
  EffectScatterChart,
  HeatmapChart,
  TreemapChart,
  SunburstChart,
  SankeyChart,
  FunnelChart,
  GraphChart,
  TreeChart,
  BoxplotChart,
  CandlestickChart,
  ParallelChart,
  ThemeRiverChart,
  PictorialBarChart,
  // Componentes (ejes, leyendas, sistemas de coordenadas…)
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  RadarComponent,
  VisualMapComponent,
  ParallelComponent,
  SingleAxisComponent,
])

// Reexportamos `init` para el render fuera de pantalla (PDF).
export { init }
