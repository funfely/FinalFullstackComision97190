const express = require('express');
const adoptionRouter = require('./routes/adoption.router');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares globales de producción
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint de verificación de salud (Healthcheck)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Rutas de la API
app.use('/api/adoptions', adoptionRouter);

// Control global de errores para evitar crasheos inesperados
app.use((err, req, res, next) => {
    console.error(`[Global Error]: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

// ESCUCHA DE PUERTO: Solo se activa si NO estamos testeando
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${PORT} en modo ${process.env.NODE_ENV || 'development'}`);
    });
}

module.exports = app; // Exportación limpia para Supertest