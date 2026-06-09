# vue-pdfmake-ejemplo

Ejemplo de generación de PDF con **cabecera**, **pie de página** y **paginación** usando [pdfmake](https://pdfmake.github.io/), con **imágenes embebidas** y **gráficos estadísticos** generados con [ECharts](https://echarts.apache.org/) (vía [vue-echarts](https://github.com/ecomfe/vue-echarts)).

## Características del PDF generado

- ✅ **Cabecera con logo** a la izquierda y datos de la empresa ("Mi Empresa S.A." / "Reporte Anual {año}") alineados a la derecha, en **todas las páginas**
- ✅ **Línea divisoria** que separa la cabecera del contenido
- ✅ Pie de página con "Página X de Y" y texto de confidencialidad (la **paginación va solo en el pie**, no en la cabecera)
- ✅ Página de portada con logo centrado
- ✅ **Imagen de muestra** embebida como base64 (`/public/images/image01.png`)
- ✅ **Gráficos estadísticos** generados con ECharts e incrustados como imagen. Se incluye un ejemplo de **cada tipo de gráfico** de la librería: barras, línea, dona/pastel, radar, gauge/medidor, scatter, effectScatter, heatmap, treemap, sunburst, sankey, funnel, graph, tree, boxplot, candlestick, parallel, themeRiver y pictorialBar (se excluyen `map`/`lines`, que requieren datos geográficos GeoJSON, y `custom`, que requiere funciones de render)
- ✅ Tabla con filas alternadas y fila de totales
- ✅ Tarjetas de métricas resumidas
- ✅ Saltos de página explícitos (`pageBreak: 'before'`)
- ✅ Nombre de empresa y año editables desde la UI

## Cambios recientes en el diseño del PDF

- 🆕 **Logo en la cabecera**: se añadió `DATA/images/logo.png` a la izquierda de la cabecera (ancho 78pt, conserva proporción). El logo también aparece centrado en la portada.
- 🆕 **Textos de cabecera a la derecha**: el nombre de la empresa y el año se alinean a la derecha del logo.
- 🆕 **Paginación movida al pie**: el indicador de página se quitó de la cabecera; ahora solo aparece en el pie como "Página X de Y".
- 🆕 **Línea divisoria** gris debajo de la cabecera para separarla del contenido (se subió el margen superior de página a 72pt para dar aire).
- 🆕 **Imágenes de prueba** embebidas en el PDF.
- 🆕 **Gráficos ECharts** (barras, línea y dona) renderizados fuera de pantalla y embebidos como PNG.

## Cambios en la interfaz (web)

- 🆕 **Menú flotante fijo** (esquina superior derecha) con los botones *Descargar PDF* y *Abrir en nueva pestaña*, siempre visible al hacer scroll.
- 🆕 **Enlaces de LinkedIn y WhatsApp flotantes** (esquina superior izquierda) con disclaimer destacado, siempre visibles al hacer scroll.
- 🆕 **Responsive (móvil)**: en pantallas ≤ 640px los menús flotantes se ocultan y las acciones (PDF, Abrir, LinkedIn, WhatsApp) pasan a una **barra inferior fija estilo iOS** (tab bar con icono + etiqueta, blur y safe-area).
- 🆕 Vista previa en pantalla de los gráficos interactivos (mismos datos que el PDF). La imagen de muestra **no se previsualiza**: solo se incrusta en el PDF.
- 🆕 Los gráficos se definen en un **registro central** (`src/charts/registro.js`); pantalla y PDF iteran sobre él, así que añadir o quitar un gráfico es editar un solo archivo.

## Instalación y uso

### Opción 1: Local con Node.js

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

### Opción 2: Con Docker

Requiere tener instalado [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/).

```bash
# 1. Construir y levantar el contenedor
docker compose up --build

# 2. Abrir en el navegador
# http://localhost:5173
```

Para detener el contenedor:

```bash
docker compose down
```

Alternativamente, sin docker-compose:

```bash
docker build -t vue-pdfmake-ejemplo .
docker run --rm -it -p 5173:5173 -v "$(pwd)":/app -v /app/node_modules vue-pdfmake-ejemplo
```

## Estructura del proyecto

El proyecto está organizado de forma **modular**: cada elemento del PDF, cada
gráfico y cada utilidad vive en su propio archivo, para facilitar el mantenimiento.

```
vue-pdfmake-ejemplo/
├── index.html
├── package.json
├── vite.config.js
├── Dockerfile
├── docker-compose.yml
├── public/
│   └── images/                        # Imágenes servidas en runtime (logo, muestra)
└── src/
    ├── main.js                        # Punto de entrada
    ├── App.vue                        # Raíz + menús flotantes (redes)
    ├── data/
    │   └── ventas.js                  # Fuente única de datos + totales
    ├── utils/
    │   ├── formato.js                 # Formato de moneda / fecha
    │   ├── imagen.js                  # urlABase64()  (imagen → base64)
    │   └── echart.js                  # opcionAImagen() (gráfico → PNG base64)
    ├── charts/
    │   ├── echartsBase.js             # Registro de módulos ECharts (tipos + componentes)
    │   ├── GraficoECharts.vue         # Componente genérico (gráfico en pantalla)
    │   ├── registro.js                # Registro central: lista de todos los gráficos
    │   └── opciones/                   # Un archivo por gráfico (1 ejemplo de cada tipo)
    │       ├── ventasPorTrimestre.js  # barras
    │       ├── tendenciaUtilidad.js   # línea
    │       ├── distribucionGastos.js  # dona
    │       ├── desempenoAreas.js      # radar
    │       ├── cumplimientoMeta.js    # gauge
    │       └── ...                    # scatter, effectScatter, heatmap, treemap,
    │                                  # sunburst, sankey, funnel, graph, tree, boxplot,
    │                                  # candlestick, parallel, themeRiver, pictorialBar
    ├── pdf/
    │   ├── estilos.js                 # Estilos compartidos
    │   ├── construirDocumento.js      # Ensambla el docDefinition (async)
    │   ├── elementos/                  # header (con logo), footer, metricaCard
    │   └── secciones/                  # portada, resumen, imagen, gráficos, tabla
    └── components/
        └── ReporteEjemplo.vue         # Orquestador: UI + menú flotante de PDF
```

## Puntos clave del código

### Cabecera con logo (`header`)

La paginación NO va en la cabecera (solo en el pie). Una fila de columnas con
anchos explícitos evita superposiciones; el logo solo define `width` para
conservar su proporción.

```js
() => ({
  stack: [
    {
      columns: [
        { image: logoBase64, width: 78, margin: [40, 12, 0, 0] },
        {
          width: '*',
          stack: [
            { text: empresa, bold: true, fontSize: 11 },
            { text: `Reporte Anual ${anio}`, fontSize: 9, color: '#888888' },
          ],
          alignment: 'right',
          margin: [0, 13, 40, 0],
        },
      ],
    },
    // Línea divisoria entre cabecera y contenido
    { canvas: [{ type: 'line', x1: 40, y1: 6, x2: 555, y2: 6, lineWidth: 0.7, lineColor: '#d1d5db' }] },
  ],
})
```

### Pie de página con paginación (`footer`)

```js
(currentPage, pageCount) => ({
  columns: [
    { text: 'Documento confidencial — uso interno', margin: [40, 8, 0, 0] },
    { text: `Página ${currentPage} de ${pageCount}`, alignment: 'right', margin: [0, 8, 40, 0] },
  ],
})
```

### Imágenes y gráficos embebidos

```js
// Imagen → base64 (pdfmake solo acepta Data URLs)
const logoBase64 = await urlABase64('/images/logo.png')

// Gráfico ECharts → PNG base64 (render fuera de pantalla)
const imgVentas = await opcionAImagen(opcionVentasPorTrimestre(ventas))
```

### Márgenes

```js
// [izquierda, arriba, derecha, abajo]
// El top (72) deja espacio para la cabecera con logo + línea divisoria
pageMargins: [40, 72, 40, 45]
```

### Salto de página

```js
{ text: 'Nueva sección', style: 'h1', pageBreak: 'before' }
```

## Dependencias

| Paquete | Versión |
|---------|---------|
| vue | ^3.4 |
| pdfmake | ^0.2.10 |
| echarts | ^6.1 |
| vue-echarts | ^8.0 |
| vite | ^5.0 |
