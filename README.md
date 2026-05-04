# vue-pdfmake-ejemplo

Ejemplo de generación de PDF con **cabecera**, **pie de página** y **paginación** usando [vue-pdfmake](https://github.com/betterwrite/vue-pdfmake) + [pdfmake](https://pdfmake.github.io/).

## Características del PDF generado

- ✅ Cabecera con nombre de empresa y número de página en **todas las páginas**
- ✅ Pie de página con "Página X de Y" y texto de confidencialidad
- ✅ Página de portada
- ✅ Tabla con filas alternadas y fila de totales
- ✅ Tarjetas de métricas resumidas
- ✅ Saltos de página explícitos (`pageBreak: 'before'`)
- ✅ Nombre de empresa y año editables desde la UI

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

```
vue-pdfmake-ejemplo/
├── index.html
├── package.json
├── vite.config.js
├── Dockerfile
├── docker-compose.yml
└── src/
    ├── main.js                        # Registra el plugin VuePdfmake
    ├── App.vue                        # Componente raíz
    └── components/
        └── ReporteEjemplo.vue         # Lógica del PDF + botones
```

## Puntos clave del código

### Cabecera (`header`)

```js
header(currentPage, pageCount) {
  return {
    columns: [
      { text: 'Mi Empresa S.A.', bold: true, margin: [40, 12, 0, 0] },
      { text: `${currentPage} / ${pageCount}`, alignment: 'right', margin: [0, 16, 40, 0] },
    ],
  }
}
```

### Pie de página (`footer`)

```js
footer(currentPage, pageCount) {
  return {
    columns: [
      { text: 'Documento confidencial', margin: [40, 8, 0, 0] },
      { text: `Página ${currentPage} de ${pageCount}`, alignment: 'right', margin: [0, 8, 40, 0] },
    ],
  }
}
```

### Márgenes recomendados

```js
// [izquierda, arriba, derecha, abajo]
// El margen top/bottom debe ser >= altura del header/footer
pageMargins: [40, 55, 40, 45]
```

### Salto de página

```js
{ text: 'Nueva sección', style: 'h1', pageBreak: 'before' }
```

## Dependencias

| Paquete | Versión |
|---------|---------|
| vue | ^3.4 |
| vue-pdfmake | ^0.2 |
| pdfmake | ^0.2.10 |
| vite | ^5.0 |
