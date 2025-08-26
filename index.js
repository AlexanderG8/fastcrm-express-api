import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        "mensaje" : "Hola este es mi servidor de mi app plantillas WSP"
    });
});

app.listen(port, () =>{
    console.log(`Servidor funcionando en http://localhost:${port}`);
})
