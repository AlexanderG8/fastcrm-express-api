# FastCRM Express API - Gestión de Plantillas WSP

Este proyecto es una API REST desarrollada con Express.js para gestionar plantillas de mensajes para WhatsApp en un CRM. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre las plantillas de mensajes.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AlexanderG8/fastcrm-express-api.git
   cd fastcrm-express-api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Instala CORS para permitir solicitudes desde diferentes orígenes:
   ```bash
   npm install cors
   ```

4. Crea un archivo `.env` en la raíz del proyecto con la siguiente información:
   ```
   MONGO_DB_URL=tu_url_de_mongodb
   ```

5. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

```
├── controllers/
│   └── templateController.js    # Controladores para las operaciones CRUD
├── models/
│   └── Template.js              # Modelo de datos para las plantillas
├── routes/
│   └── templateRuotes.js        # Definición de rutas de la API
├── index.js                     # Punto de entrada de la aplicación
├── test/
│   └── performanceTest.js       # Pruebas de rendimiento para las consultas
├── performance-notes.md         # Documentación de optimizaciones y resultados
├── performance-results.json     # Resultados detallados de las pruebas
├── runPerformanceTest.js        # Script para ejecutar pruebas de rendimiento
├── package.json
└── README.md
```

## Configuración de CORS

Para permitir solicitudes desde diferentes orígenes (por ejemplo, desde tu frontend en `http://localhost:5176`), se ha configurado CORS en el archivo `index.js`:

```javascript
import cors from 'cors';

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5176', // Permite solicitudes desde tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
}));
```

Para desarrollo, también puedes usar una configuración simplificada que permite solicitudes desde cualquier origen:

```javascript
app.use(cors());
```

## Endpoints de la API

La API proporciona los siguientes endpoints para gestionar las plantillas:

### Obtener todas las plantillas
- **URL**: `/api/templates`
- **Método**: `GET`
- **Parámetros de consulta opcionales**:
  - `q`: Búsqueda por palabras clave en el contenido (ej: `/api/templates?q=bienvenido`)
  - `type`: Filtrado por tipo de mensaje (ej: `/api/templates?type=welcome`)
  - Combinados: `/api/templates?q=bienvenido&type=welcome`
- **Tipos permitidos**: `welcome`, `seguimiento`, `bienvenida`, `cierre`, `notificaciones`
- **Respuesta exitosa**: Código 200
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "type": "welcome",
      "content": "Primera plantilla",
      "author": "Alexander Gomez",
      "createdAt": "2023-06-22T15:24:26.256Z"
    },
    {...}
  ]
  ```
- **Respuesta de error para tipo inválido**: Código 400
  ```json
  {
    "error": "Tipo de plantilla no válido",
    "allowedTypes": ["welcome", "seguimiento", "bienvenida", "cierre", "notificaciones"]
  }
  ```

### Obtener una plantilla específica
- **URL**: `/api/templates/:id`
- **Método**: `GET`
- **Respuesta exitosa**: Código 200
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "type": "welcome",
    "content": "Primera plantilla",
    "author": "Alexander Gomez",
    "createdAt": "2023-06-22T15:24:26.256Z"
  }
  ```
- **Respuesta de error**: Código 404 o 400
  ```json
  {
    "error": "Plantilla no encontrada"
  }
  ```

### Crear una nueva plantilla
- **URL**: `/api/templates`
- **Método**: `POST`
- **Cuerpo de la solicitud**:
  ```json
  {
    "content": "Nueva plantilla de prueba",
    "author": "Tester"
  }
  ```
- **Respuesta exitosa**: Código 201
  ```json
  {
    "template": {
      "_id": "60d21b4667d0d8992e610c87",
      "type": "welcome",
      "content": "Nueva plantilla de prueba",
      "author": "Tester",
      "createdAt": "2023-06-23T10:15:30.123Z"
    }
  }
  ```
- **Respuesta de error**: Código 400 o 500
  ```json
  {
    "error": "El contenido y el autor son obligatorios"
  }
  ```

### Actualizar una plantilla existente
- **URL**: `/api/templates/:id`
- **Método**: `PUT`
- **Cuerpo de la solicitud**:
  ```json
  {
    "content": "Contenido actualizado",
    "type": "notification"
  }
  ```
- **Respuesta exitosa**: Código 200
  ```json
  {
    "template": {
      "_id": "60d21b4667d0d8992e610c85",
      "type": "notification",
      "content": "Contenido actualizado",
      "author": "Alexander Gomez",
      "createdAt": "2023-06-22T15:24:26.256Z"
    }
  }
  ```
- **Respuesta de error**: Código 404, 400 o 500
  ```json
  {
    "error": "Plantilla no encontrada"
  }
  ```

### Eliminar una plantilla
- **URL**: `/api/templates/:id`
- **Método**: `DELETE`
- **Respuesta exitosa**: Código 200
  ```json
  {
    "message": "Plantilla eliminada correctamente"
  }
  ```
- **Respuesta de error**: Código 404, 400 o 500
  ```json
  {
    "error": "Plantilla no encontrada"
  }
  ```

## Ejemplos de Uso con curl

### Obtener todas las plantillas
```bash
curl -X GET http://localhost:3000/api/templates
```

### Buscar plantillas por palabras clave
```bash
curl -X GET "http://localhost:3000/api/templates?q=bienvenido"
```

### Filtrar plantillas por tipo
```bash
curl -X GET "http://localhost:3000/api/templates?type=welcome"
```

### Buscar y filtrar plantillas combinando parámetros
```bash
curl -X GET "http://localhost:3000/api/templates?q=bienvenido&type=welcome"
```

### Crear una nueva plantilla
```bash
curl -X POST http://localhost:3000/api/templates \
  -H "Content-Type: application/json" \
  -d '{"content": "Nueva plantilla de prueba", "author": "Tester"}'
```

### Actualizar una plantilla existente
```bash
curl -X PUT http://localhost:3000/api/templates/60d21b4667d0d8992e610c85 \
  -H "Content-Type: application/json" \
  -d '{"content": "Contenido actualizado", "type": "notification"}'
```

### Eliminar una plantilla
```bash
curl -X DELETE http://localhost:3000/api/templates/60d21b4667d0d8992e610c85
```

## Validaciones

El modelo de plantilla incluye validaciones básicas:

```javascript
const templateSchema = new Schema({
    type: {type: String, default: 'welcome'},
    content: {type: String, required: [true, 'El contenido es obligatorio']},
    labels: [{label: String}],
    author: {type: String, required: [true, 'El autor es obligatorio']},
    createdAt: {type: Date, default: Date.now}
});
```

## Optimizaciones de Rendimiento

Se han implementado las siguientes optimizaciones para mejorar el rendimiento de las consultas:

### Índices en MongoDB

```javascript
// Índice de texto en el campo content para optimizar búsquedas por palabras clave
templateSchema.index({content: 'text'});

// Índice simple en el campo type para optimizar filtrado por tipo
templateSchema.index({type: 1});
```

### Evaluación de Rendimiento

Se ha implementado un sistema de evaluación de rendimiento que utiliza el método `.explain('executionStats')` de MongoDB para analizar la eficiencia de las consultas. Los resultados detallados se pueden encontrar en el archivo `performance-notes.md`.

Para ejecutar las pruebas de rendimiento:

```bash
node runPerformanceTest.js
```

Esto generará un archivo `performance-results.json` con los resultados detallados de las pruebas y actualizará el archivo `performance-notes.md` con un resumen de los resultados.

