// ─── Configuración base de ECharts (tree-shaking) ───────────────────────────
// Registra una sola vez los módulos de ECharts que usa la app. Tanto el
// componente de pantalla (vue-echarts) como el render para PDF dependen de
// esta configuración, por lo que basta importar este archivo.

import { use, init } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
])

// Reexportamos `init` para el render fuera de pantalla (PDF).
export { init }
