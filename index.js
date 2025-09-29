import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { templateRouter } from './routes/templateRuotes.js';
import { contactRouter } from './routes/contactRoutes.js';
import { companyRouter } from './routes/companyRoutes.js';
import { contactLogRouter } from './routes/contactLogRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Esta linea de código carga las variables de entorno desde el archivo .env
// Se agrego debido a que estamos trabajando con Nodemon y no se está cargando el archivo .env por defecto
(async () => {
    await process.loadEnvFile('.env');
})();

const app = express();
const port = 3000;
const mongodb_url = process.env.MONGO_DB_URL || '';

// Conexión a MongoDB
mongoose.connect(mongodb_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Conexión a MongoDB exitosa");
}).catch(()=>{
    console.log("Error al conectar a MongoDB");
});

// Configuración de CORS
/**
 * Origin: Permite solicitudes desde mi frontend
 * Methods: Métodos HTTP permitidos
 * allowedHeaders: Cebeceras permitidas
 */
// origin: 'http://localhost:5173',
app.use(cors({
    origin: ['https://fastcrm-react-app.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FastCRM Express API',
            version: '1.0.0',
            description: 'API para gestión de CRM con Express y MongoDB/PostgreSQL',
            contact: {
                name: 'FastCRM'
            },
            servers: [{
                url: 'http://localhost:3000'
            }]
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.json({
        "mensaje" : "FastCRM Express API"
    });
});

app.use('/api',templateRouter);
app.use('/api', contactRouter);
app.use('/api', companyRouter); // Añadir las rutas de empresas
app.use('/api', contactLogRouter); // Añadir las rutas de registros de contacto

// Middleware para manejar rutas no encontradas
app.use(notFound);

// Middleware para manejar errores
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Servidor funcionando en http://localhost:${port}`);
})
