<template>
  <div class="card">
    <h2>Reporte Anual 2025</h2>
    <p class="desc">
      El PDF generado incluye:
      cabecera con logo y título en cada página,
      pie de página con número de página ("Página X de Y"),
      saltos de página explícitos y tabla de datos.
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

    <div class="botones">
      <button class="btn btn-primary" @click="descargar">
        ⬇ Descargar PDF
      </button>
      <button class="btn btn-secondary" @click="abrirEnPestana">
        ↗ Abrir en nueva pestaña
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import pdfMake from 'pdfmake/build/pdfmake'
import { vfs } from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = vfs

const empresa = ref('Mi Empresa S.A.')
const anio = ref(2025)

// Datos de ejemplo para la tabla
const ventas = [
  { trimestre: 'T1', ingresos: 120000, gastos: 85000, utilidad: 35000 },
  { trimestre: 'T2', ingresos: 145000, gastos: 92000, utilidad: 53000 },
  { trimestre: 'T3', ingresos: 132000, gastos: 88000, utilidad: 44000 },
  { trimestre: 'T4', ingresos: 178000, gastos: 110000, utilidad: 68000 },
]

const totalIngresos = ventas.reduce((s, r) => s + r.ingresos, 0)
const totalGastos = ventas.reduce((s, r) => s + r.gastos, 0)
const totalUtilidad = ventas.reduce((s, r) => s + r.utilidad, 0)

const fmt = (n) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(n)

// ─── Definición del documento pdfmake ──────────────────────────────────────
const docDefinition = computed(() => ({

  // Información del documento
  info: {
    title: `Reporte Anual ${anio.value}`,
    author: empresa.value,
    subject: 'Reporte de ventas',
  },

  // ── CABECERA — se ejecuta en cada página ─────────────────────────────────
  header(currentPage, pageCount) {
    return {
      columns: [
        {
          // Lado izquierdo: nombre de la empresa
          stack: [
            {
              text: empresa.value,
              bold: true,
              fontSize: 11,
              color: '#1a1a1a',
            },
            {
              text: `Reporte Anual ${anio.value}`,
              fontSize: 9,
              color: '#888888',
            },
          ],
          margin: [40, 12, 0, 0],
        },
        {
          // Lado derecho: indicador de página
          text: `${currentPage} / ${pageCount}`,
          alignment: 'right',
          fontSize: 9,
          color: '#888888',
          margin: [0, 16, 40, 0],
        },
      ],
    }
  },

  // ── PIE DE PÁGINA — se ejecuta en cada página ────────────────────────────
  footer(currentPage, pageCount) {
    return {
      columns: [
        {
          text: 'Documento confidencial — uso interno',
          fontSize: 8,
          color: '#aaaaaa',
          margin: [40, 8, 0, 0],
        },
        {
          text: `Página ${currentPage} de ${pageCount}`,
          alignment: 'right',
          fontSize: 8,
          color: '#aaaaaa',
          margin: [0, 8, 40, 0],
        },
      ],
    }
  },

  // ── CONTENIDO ────────────────────────────────────────────────────────────
  content: [

    // ── Página 1: Portada ─────────────────────────────────────────────────
    {
      stack: [
        {
          text: empresa.value,
          style: 'portadaEmpresa',
          margin: [0, 60, 0, 8],
        },
        {
          text: `REPORTE ANUAL ${anio.value}`,
          style: 'portadaTitulo',
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0, y1: 10,
              x2: 515, y2: 10,
              lineWidth: 1.5,
              lineColor: '#333333',
            },
          ],
          margin: [0, 16, 0, 16],
        },
        {
          text: 'Resumen de resultados financieros y operativos.',
          style: 'portadaSubtitulo',
        },
        {
          text: `Generado el ${new Date().toLocaleDateString('es-PE', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}`,
          fontSize: 10,
          color: '#888888',
          margin: [0, 8, 0, 0],
        },
      ],
    },

    // ── Página 2: Resumen ejecutivo ───────────────────────────────────────
    {
      text: 'Resumen Ejecutivo',
      style: 'h1',
      pageBreak: 'before',
    },
    {
      text:
        `Durante el año ${anio.value}, ${empresa.value} registró un crecimiento sostenido en sus ` +
        'principales indicadores financieros. Los ingresos totales superaron las proyecciones ' +
        'iniciales, impulsados principalmente por el desempeño del cuarto trimestre.',
      style: 'cuerpo',
    },
    {
      text: 'Indicadores clave',
      style: 'h2',
    },
    // Tabla de métricas resumidas (3 columnas)
    {
      columns: [
        metricaCard('Ingresos totales', fmt(totalIngresos), '#1d4ed8'),
        metricaCard('Gastos totales', fmt(totalGastos), '#b91c1c'),
        metricaCard('Utilidad neta', fmt(totalUtilidad), '#15803d'),
      ],
      columnGap: 12,
      margin: [0, 0, 0, 20],
    },
    {
      text: 'Análisis trimestral',
      style: 'h2',
    },
    {
      text:
        'La siguiente tabla detalla el desglose de ingresos, gastos y utilidad por trimestre. ' +
        'Se observa una tendencia positiva a lo largo del año, con el mejor desempeño registrado en T4.',
      style: 'cuerpo',
    },

    // ── Página 3: Tabla detallada ─────────────────────────────────────────
    {
      text: 'Resultados por Trimestre',
      style: 'h1',
      pageBreak: 'before',
    },
    {
      style: 'tabla',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          // Encabezado
          [
            { text: 'Trimestre', style: 'thCell' },
            { text: 'Ingresos', style: 'thCell' },
            { text: 'Gastos', style: 'thCell' },
            { text: 'Utilidad', style: 'thCell' },
          ],
          // Filas de datos
          ...ventas.map((r, i) => [
            { text: r.trimestre, style: i % 2 === 0 ? 'tdCellAlt' : 'tdCell' },
            { text: fmt(r.ingresos), style: i % 2 === 0 ? 'tdCellAlt' : 'tdCell', alignment: 'right' },
            { text: fmt(r.gastos), style: i % 2 === 0 ? 'tdCellAlt' : 'tdCell', alignment: 'right' },
            { text: fmt(r.utilidad), style: i % 2 === 0 ? 'tdCellAlt' : 'tdCell', alignment: 'right', color: '#15803d' },
          ]),
          // Fila de totales
          [
            { text: 'TOTAL', bold: true, fillColor: '#f3f4f6', fontSize: 10 },
            { text: fmt(totalIngresos), bold: true, alignment: 'right', fillColor: '#f3f4f6', fontSize: 10 },
            { text: fmt(totalGastos), bold: true, alignment: 'right', fillColor: '#f3f4f6', fontSize: 10 },
            { text: fmt(totalUtilidad), bold: true, alignment: 'right', fillColor: '#f3f4f6', fontSize: 10, color: '#15803d' },
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
    {
      text: 'Conclusiones',
      style: 'h2',
    },
    {
      text:
        `${empresa.value} cerró el año ${anio.value} con una utilidad neta de ${fmt(totalUtilidad)}, ` +
        `lo que representa una rentabilidad del ${((totalUtilidad / totalIngresos) * 100).toFixed(1)}% ` +
        'sobre los ingresos totales. Los resultados reflejan la solidez del modelo de negocio y ' +
        'sientan las bases para los objetivos del próximo período.',
      style: 'cuerpo',
    },
  ],

  // ── ESTILOS ───────────────────────────────────────────────────────────────
  styles: {
    portadaEmpresa: {
      fontSize: 14,
      bold: true,
      color: '#555555',
    },
    portadaTitulo: {
      fontSize: 28,
      bold: true,
      color: '#1a1a1a',
    },
    portadaSubtitulo: {
      fontSize: 13,
      color: '#444444',
    },
    h1: {
      fontSize: 18,
      bold: true,
      color: '#1a1a1a',
      margin: [0, 0, 0, 12],
    },
    h2: {
      fontSize: 13,
      bold: true,
      color: '#1a1a1a',
      margin: [0, 16, 0, 6],
    },
    cuerpo: {
      fontSize: 10,
      color: '#444444',
      lineHeight: 1.5,
      margin: [0, 0, 0, 10],
    },
    tabla: {
      fontSize: 10,
      margin: [0, 0, 0, 16],
    },
    thCell: {
      bold: true,
      fontSize: 10,
      fillColor: '#1a1a1a',
      color: '#ffffff',
    },
    tdCell: {
      fontSize: 10,
      color: '#1a1a1a',
    },
    tdCellAlt: {
      fontSize: 10,
      color: '#1a1a1a',
      fillColor: '#f9fafb',
    },
  },

  // ── MÁRGENES — espacio para header (top=55) y footer (bottom=45) ─────────
  pageMargins: [40, 55, 40, 45],

  // Tamaño de página
  pageSize: 'A4',
}))

function descargar() {
  pdfMake.createPdf(docDefinition.value).download(`reporte-${anio.value}.pdf`)
}

function abrirEnPestana() {
  pdfMake.createPdf(docDefinition.value).open()
}

// Utilidad: genera una "tarjeta" de métrica para el resumen
function metricaCard(label, valor, color) {
  return {
    stack: [
      {
        text: label,
        fontSize: 9,
        color: '#666666',
        margin: [0, 0, 0, 4],
      },
      {
        text: valor,
        fontSize: 13,
        bold: true,
        color,
      },
    ],
    fillColor: '#f9fafb',
    border: [false, false, false, false],
    margin: [0, 0, 0, 0],
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

.btn:hover {
  opacity: 0.88;
}

.btn:active {
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
