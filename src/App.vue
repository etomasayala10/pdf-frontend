<template>
  <div class="app">
    <h1>Generador de PDF</h1>
    <p>Ejemplo con cabecera, pie de página y paginación usando <strong>vue-pdfmake</strong>.</p>
    <ReporteEjemplo />

    <!-- Enlaces sociales: flotantes y siempre visibles al hacer scroll -->
    <nav class="social-flotante" aria-label="Redes y contacto">
      <p class="disclaimer">💬 Si necesitas ayuda con tus proyectos o ideas, contáctame</p>
      <a class="enlace linkedin" href="https://www.linkedin.com/in/etomas-ti/" target="_blank" rel="noopener noreferrer">
        Visita mi LinkedIn
      </a>
      <a class="enlace whatsapp" href="https://wa.me/51943909993" target="_blank" rel="noopener noreferrer">
        Escríbeme por WhatsApp
      </a>
    </nav>
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
  padding: 3rem 2rem 7rem;
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

/* Menú flotante de redes: fijo en la esquina superior izquierda */
.social-flotante {
  position: fixed;
  left: 1.25rem;
  top: 1.25rem;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 220px;
  padding: 14px 16px;
  background: #ffffff;
  border: 2px solid #1a1a1a;
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
}

.social-flotante .disclaimer {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}

.social-flotante .enlace {
  display: block;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.88rem;
  color: #ffffff;
  padding: 9px 12px;
  border-radius: 8px;
  transition: opacity 0.15s, transform 0.1s;
}

.social-flotante .enlace:hover {
  opacity: 0.9;
}

.social-flotante .enlace:active {
  transform: scale(0.97);
}

.social-flotante .linkedin {
  background: #0a66c2;
}

.social-flotante .whatsapp {
  background: #25d366;
}

/* En móvil se ocultan los flotantes; las acciones pasan a la barra inferior
   fija (estilo iOS) definida en ReporteEjemplo.vue */
@media (max-width: 640px) {
  .social-flotante {
    display: none;
  }

  .app {
    /* Menos padding lateral para dar ancho a los gráficos;
       espacio inferior para que la barra fija no tape el contenido */
    padding: 1.5rem 0.75rem 5.5rem;
  }
}
</style>
