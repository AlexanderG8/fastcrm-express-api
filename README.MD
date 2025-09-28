# FastCRM Express API

API RESTful para un sistema CRM desarrollado con Express.js y PostgreSQL, diseñado para gestionar contactos, empresas, plantillas de mensajes y registros de comunicación.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **Express.js**: Framework web para crear APIs RESTful
- **PostgreSQL**: Sistema de gestión de base de datos relacional
- **Prisma ORM**: ORM para interactuar con la base de datos de forma segura y eficiente
- **Swagger/OpenAPI**: Documentación interactiva de la API
- **Jest**: Framework para pruebas unitarias y de integración
- **ESLint**: Herramienta de análisis de código estático

## Instrucciones de Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd fastcrm-express-api
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Crear un archivo `.env` en la raíz del proyecto
   - Añadir la configuración de la base de datos:
     ```
     DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/fastcrm?schema=public"
     PORT=3000
     ```

4. **Ejecutar migraciones de Prisma**
   ```bash
   npx prisma migrate dev
   ```

5. **Iniciar el servidor**
   ```bash
   npm run dev
   ```

6. **Acceder a la documentación de la API**
   - Abrir en el navegador: `http://localhost:3000/api-docs`

## Funcionalidades Implementadas

### Core
- CRUD completo para Contactos
- CRUD completo para Empresas
- CRUD completo para Plantillas de mensajes
- CRUD completo para Registros de contacto (ContactLog)

### Extras
- **Documentación con Swagger**: Interfaz interactiva para probar todos los endpoints
- **Middleware de manejo de errores**: Centralización del manejo de errores para respuestas consistentes
- **Middleware para rutas no encontradas**: Manejo adecuado de rutas inexistentes
- **Relaciones entre entidades**: Relaciones entre contactos, empresas y registros de contacto
- **Pruebas de rendimiento**: Scripts para evaluar el rendimiento de la API

## Decisiones Técnicas Clave

1. **Uso de Prisma ORM**:
   - Proporciona seguridad contra inyecciones SQL
   - Facilita la definición del esquema y migraciones
   - Genera tipos TypeScript automáticamente

2. **Arquitectura por capas**:
   - Separación clara entre rutas, controladores y modelos
   - Facilita el mantenimiento y la escalabilidad

3. **Middleware de errores centralizado**:
   - Manejo consistente de errores en toda la aplicación
   - Respuestas de error estandarizadas

4. **Documentación con Swagger**:
   - Documentación interactiva y actualizada de todos los endpoints
   - Facilita las pruebas y la integración con frontends

5. **Relaciones entre entidades**:
   - Diseño de base de datos normalizado
   - Integridad referencial garantizada por Prisma

## Enlaces

- **Repositorio**: [GitHub](https://github.com/usuario/fastcrm-express-api)
- **API Documentación**: [Swagger UI](https://fastcrm-express-api-h8j3.onrender.com/api-docs/)

## Endpoints Disponibles

### Contactos
- `GET /api/contacts` - Obtener todos los contactos
- `GET /api/contacts/:id` - Obtener un contacto por ID
- `POST /api/contacts` - Crear un nuevo contacto
- `PUT /api/contacts/:id` - Actualizar un contacto existente
- `DELETE /api/contacts/:id` - Eliminar un contacto

### Empresas
- `GET /api/companies` - Obtener todas las empresas
- `GET /api/companies/:id` - Obtener una empresa por ID
- `POST /api/companies` - Crear una nueva empresa
- `PUT /api/companies/:id` - Actualizar una empresa existente
- `DELETE /api/companies/:id` - Eliminar una empresa

### Plantillas
- `GET /api/templates` - Obtener todas las plantillas
- `GET /api/templates/:id` - Obtener una plantilla por ID
- `POST /api/templates` - Crear una nueva plantilla
- `PUT /api/templates/:id` - Actualizar una plantilla existente
- `DELETE /api/templates/:id` - Eliminar una plantilla

### Registros de Contacto
- `GET /api/contactlogs` - Obtener todos los registros
- `GET /api/contactlogs/:id` - Obtener un registro por ID
- `POST /api/contactlogs` - Crear un nuevo registro
- `PUT /api/contactlogs/:id` - Actualizar un registro existente
- `DELETE /api/contactlogs/:id` - Eliminar un registro
- `GET /api/contacts/:contactId/logs` - Obtener registros por contacto