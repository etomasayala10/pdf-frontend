<template>
  <div class="card">
    <h2>Reporte Anual {{ anio }}</h2>
    <p class="desc">
      El PDF generado incluye: cabecera con <strong>logo</strong> y título en cada página,
      pie de página con número de página, imagen de muestra embebida y
      gráficos estadísticos generados con <strong>ECharts</strong>.
    </p>

    <!-- Opciones del reporte -->
    <div class="opciones">
      <label>
        Empresa:
        <input v-model="empresa" type="text" />
      </label>
      <label>
        Año:
        <input v-model="anio" type="number" min="2000" max="2099" />
      </label>
    </div>

    <!-- Vista previa de la imagen de muestra -->
    <section class="bloque">
      <h3>Imagen de muestra</h3>
      <img class="preview" src="/images/image01.png" alt="Imagen de muestra" />
    </section>

    <!-- Gráficos estadísticos interactivos (mismos datos que el PDF) -->
    <section class="bloque">
      <h3>Datos estadísticos de ejemplo</h3>
      <div class="graficos">
        <GraficoECharts :opcion="opcionVentas" />
        <GraficoECharts :opcion="opcionTendencia" />
        <GraficoECharts :opcion="opcionGastos" />
      </div>
    </section>

    <div class="botones">
      <button class="btn btn-primary" :disabled="generando" @click="descargar">
        {{ generando ? 'Generando…' : '⬇ Descargar PDF' }}
      </button>
      <button class="btn btn-secondary" :disabled="generando" @click="abrirEnPestana">
        ↗ Abrir en nueva pestaña
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import pdfMake from 'pdfmake/build/pdfmake'
import { vfs } from 'pdfmake/build/vfs_fonts'

import GraficoECharts from '../charts/GraficoECharts.vue'
import { ventas } from '../data/ventas.js'
import { opcionVentasPorTrimestre } from '../charts/opciones/ventasPorTrimestre.js'
import { opcionTendenciaUtilidad } from '../charts/opciones/tendenciaUtilidad.js'
import { opcionDistribucionGastos } from '../charts/opciones/distribucionGastos.js'
import { construirDocumento } from '../pdf/construirDocumento.js'

pdfMake.vfs = vfs

const empresa = ref('Mi Empresa S.A.')
const anio = ref(2025)
const generando = ref(false)

// Opciones de gráficos en pantalla (reutilizan los mismos datos que el PDF).
const opcionVentas = computed(() => opcionVentasPorTrimestre(ventas))
const opcionTendencia = computed(() => opcionTendenciaUtilidad(ventas))
const opcionGastos = computed(() => opcionDistribucionGastos())

async function generarPdf() {
  return await construirDocumento({ empresa: empresa.value, anio: anio.value })
}

async function descargar() {
  generando.value = true
  try {
    const doc = await generarPdf()
    pdfMake.createPdf(doc).download(`reporte-${anio.value}.pdf`)
  } finally {
    generando.value = false
  }
}

async function abrirEnPestana() {
  generando.value = true
  try {
    const doc = await generarPdf()
    pdfMake.createPdf(doc).open()
  } finally {
    generando.value = false
  }
}
</script>

<style scoped>
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
}

.desc {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.opciones {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.opciones label {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  color: #555;
  gap: 4px;
}

.opciones input {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.9rem;
  width: 220px;
}

.opciones input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.bloque {
  margin-bottom: 1.75rem;
}

.preview {
  max-width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.graficos {
  display: grid;
  gap: 1rem;
}

.botones {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: opacity 0.15s, transform 0.1s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: progress;
}

.btn:not(:disabled):hover {
  opacity: 0.88;
}

.btn:not(:disabled):active {
  transform: scale(0.97);
}

.btn-primary {
  background: #1a1a1a;
  color: #ffffff;
}

.btn-secondary {
  background: #f3f4f6;
  color: #1a1a1a;
  border: 1px solid #d1d5db;
}
</style>
