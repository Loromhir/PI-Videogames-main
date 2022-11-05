const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const videogameRouter= require('./videogame.js');
const genreRouter = require('./genre.js')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
