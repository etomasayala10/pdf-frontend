<template>
  <div class="app">
    <h1>Generador de PDF</h1>
    <p>Ejemplo con cabecera, pie de página y paginación usando <strong>vue-pdfmake</strong>.</p>
    <ReporteEjemplo />
  </div>
</template>

<script setup>
import ReporteEjemplo from './components/ReporteEjemplo.vue'
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  color: #1a1a1a;
}

.app {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

h1 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

p {
  color: #555;
  margin-bottom: 2rem;
}
</style>
