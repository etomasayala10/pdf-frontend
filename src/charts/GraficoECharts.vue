<!-- Componente genérico para mostrar cualquier opción de ECharts en pantalla.
     Reutilizable: recibe una `opcion` y la pinta de forma interactiva. -->
<template>
  <div class="grafico">
    <VChart class="chart" :option="opcion" autoresize />
  </div>
</template>

<script setup>
import VChart from 'vue-echarts'
import '../charts/echartsBase.js' // registra los módulos de ECharts (side-effect)

defineProps({
  opcion: { type: Object, required: true },
})
</script>

<style scoped>
.grafico {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px;
}

.chart {
  width: 100%;
  height: 300px;
}
</style>
