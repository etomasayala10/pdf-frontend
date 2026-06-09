<template>
  <div class="card">
    <h2>Reporte Anual {{ anio }}</h2>
    <p class="desc">
      El PDF generado incluye: cabecera con <strong>logo</strong> y título en cada página,
      pie de página con número de página, imagen de muestra embebida y
      gráficos estadísticos generados con <strong>ECharts</strong> (Usarlo desde laptop/pc, en dispositivos móviles podría no funcionar).
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

    <!-- Gráficos estadísticos interactivos (mismos datos que el PDF).
         La imagen de muestra NO se previsualiza aquí: solo va en el PDF. -->
    <section class="bloque">
      <h3>Datos estadísticos de ejemplo</h3>
      <div class="graficos">
        <GraficoECharts v-for="g in graficos" :key="g.id" :opcion="g.opcion" />
      </div>
    </section>

  </div>

  <!-- Menú flotante fijo (solo escritorio): siempre visible al hacer scroll -->
  <div class="menu-flotante">
    <button class="btn btn-primary" :disabled="generando" @click="descargar">
      {{ generando ? 'Generando…' : '⬇ Descargar PDF' }}
    </button>
    <button class="btn btn-secondary" :disabled="generando" @click="abrirEnPestana">
      ↗ Abrir en nueva pestaña
    </button>
  </div>

  <!-- Dock flotante de acciones (solo móvil) -->
  <nav class="barra-movil" aria-label="Acciones rápidas">
    <button class="tab tab-pdf" :disabled="generando" @click="descargar">
      <span class="tab-ico">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </span>
      <span class="tab-label">{{ generando ? '…' : 'PDF' }}</span>
    </button>

    <button class="tab tab-abrir" :disabled="generando" @click="abrirEnPestana">
      <span class="tab-ico">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </span>
      <span class="tab-label">Abrir</span>
    </button>

    <a class="tab tab-linkedin" href="https://www.linkedin.com/in/etomas-ti/" target="_blank" rel="noopener noreferrer">
      <span class="tab-ico">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17v-6.7H6.13V17h2.21zM7.23 9.39a1.28 1.28 0 1 0 0-2.56 1.28 1.28 0 0 0 0 2.56zM18 17v-3.67c0-1.96-.42-3.47-2.71-3.47-1.1 0-1.84.6-2.14 1.18h-.03V10.3H8.99V17h2.2v-3.32c0-.87.17-1.72 1.25-1.72 1.07 0 1.08 1 1.08 1.78V17H18z" />
        </svg>
      </span>
      <span class="tab-label">LinkedIn</span>
    </a>

    <a class="tab tab-whatsapp" href="https://wa.me/51943909993" target="_blank" rel="noopener noreferrer">
      <span class="tab-ico">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.17a8.13 8.13 0 0 1-4.15-1.14l-.3-.18-3 .79.8-2.93-.19-.3A8.17 8.17 0 1 1 12 20.17z" />
          <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.95-.27-.1-.46-.15-.65.15-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.5.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.58-.9-2.16-.24-.57-.48-.5-.65-.5l-.56-.01c-.2 0-.5.07-.77.37-.26.3-1 1-1 2.42s1.03 2.8 1.17 3c.15.2 2.03 3.1 4.92 4.35.69.3 1.22.47 1.64.6.69.22 1.31.19 1.81.12.55-.08 1.74-.71 1.98-1.4.25-.69.25-1.28.17-1.4-.07-.13-.26-.2-.56-.35z" />
        </svg>
      </span>
      <span class="tab-label">WhatsApp</span>
    </a>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import pdfMake from 'pdfmake/build/pdfmake'
import { vfs } from 'pdfmake/build/vfs_fonts'

import GraficoECharts from '../charts/GraficoECharts.vue'
import { GRAFICOS } from '../charts/registro.js'
import { construirDocumento } from '../pdf/construirDocumento.js'

pdfMake.vfs = vfs

const empresa = ref('Mi Empresa S.A.')
const anio = ref(2025)
const generando = ref(false)

// Gráficos en pantalla: se resuelven una vez desde el registro central
// (los mismos que se incrustan en el PDF).
const graficos = GRAFICOS.map((g) => ({ id: g.id, opcion: g.opcion() }))

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

.graficos {
  display: grid;
  gap: 1rem;
}

/* Menú flotante de acciones: fijo en la esquina inferior derecha */
.menu-flotante {
  position: fixed;
  right: 1.25rem;
  top: 1.25rem;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
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

/* Barra inferior estilo iOS: oculta por defecto (solo aparece en móvil) */
.barra-movil {
  display: none;
}

@media (max-width: 640px) {
  /* En móvil se oculta el menú flotante y manda la barra inferior */
  .menu-flotante {
    display: none;
  }

  /* Menos padding para que los gráficos aprovechen el ancho del móvil */
  .card {
    padding: 1.25rem 0.85rem;
  }

  /* Dock flotante, separado de los bordes (estilo moderno tipo isla) */
  .barra-movil {
    display: flex;
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: calc(12px + env(safe-area-inset-bottom));
    z-index: 60;
    gap: 8px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 24px;
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.18),
      0 2px 6px rgba(0, 0, 0, 0.08);
  }

  /* Cada acción: botón con gradiente, icono SVG y etiqueta */
  .barra-movil .tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 10px 4px;
    border: none;
    border-radius: 17px;
    cursor: pointer;
    text-decoration: none;
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2px;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
    transition: transform 0.12s ease, filter 0.12s ease;
  }

  .barra-movil .tab:active {
    transform: translateY(1px) scale(0.97);
    filter: brightness(0.95);
  }

  .barra-movil .tab:disabled {
    opacity: 0.55;
  }

  .barra-movil .tab-ico {
    display: flex;
  }

  .barra-movil .tab-ico svg {
    width: 21px;
    height: 21px;
    display: block;
  }

  .barra-movil .tab-label {
    line-height: 1;
  }

  /* Gradientes de marca por acción */
  .barra-movil .tab-pdf {
    background: linear-gradient(135deg, #3a3a3a, #000000);
  }

  .barra-movil .tab-abrir {
    background: linear-gradient(135deg, #818cf8, #4f46e5);
  }

  .barra-movil .tab-linkedin {
    background: linear-gradient(135deg, #2b8fe0, #0a66c2);
  }

  .barra-movil .tab-whatsapp {
    background: linear-gradient(135deg, #34e07a, #1fb855);
  }
}
</style>
