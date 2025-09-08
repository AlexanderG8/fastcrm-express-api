import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { templateRouter } from './routes/templateRuotes.js';

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
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        "mensaje" : "FastCRM Express API"
    });
});

app.use('/api',templateRouter);

app.listen(port, () =>{
    console.log(`Servidor funcionando en http://localhost:${port}`);
})
