//aca estamos importando la funcion detAllVideoGames 
const { getAllVideoGames } = require ('../controllers/GetAllVideoGames');
const { getVideoGamesByID } = require ('../controllers/GetVideoGameByID');
const { getVideoGameByName } = require('../controllers/GetVideoGamesByName'); 
const { getGenres } = require('../controllers/GetGenres');
const { postVideoGames } = require('../controllers/PostVideoGames');

const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//estamos configurando la ruta para usarla en tunderclient
//.get es un metodo con el que pedimos info a la API
//el primer parametro es la ruta a la cual vamos a pedir info '/getAllVideoGames'
//el segundo parametro getAllVideoGames es el controlador que nos esta trayendo la info
router.get('/getAllVideoGames', getAllVideoGames)

//definimos la ruta para obtrener un videojuego por ID
router.get('/getVideoGameByID/:id', getVideoGamesByID)

//definimos la ruta para obtrener un videojuego por nombre
router.get('/getVideoGamesByName/:name', getVideoGameByName)

router.get('/getGenres', getGenres)

router.post('/postVideoGames', postVideoGames)

module.exports = router;
