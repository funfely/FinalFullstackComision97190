const express = require('express');
const adoptionRouter = require('./routes/adoption.router');

const app = express();

app.use(express.json());

// Inyección limpia del módulo router
app.use('/api/adoptions', adoptionRouter);

// El servidor solo abre el puerto real si NO estamos testeando
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server processing on port ${PORT}`);
    });
}

module.exports = app;