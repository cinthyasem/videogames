const axios = require('axios');
const { relations_table, Videogame, Genres } = require('../db'); //estos son mis modelos y tablas de la db que se usaran para consultar y relacionar los datos

async function fetchAllVideogames(url, allVideogames = [], retries = 3, limit = 3) {
  if (limit === 0) {
    console.log('Limit reached, stopping further requests.');
    return allVideogames;
  }

  try {
    console.log(`Fetching data from: ${url}`);
    const response = await axios.get(url); //aca realizamos una solicitud a la api con axios
    const data = response.data;

    console.log(`Fetched ${data.results.length} videogames`);

    const videogames = data.results.map((videogame) => ({
      id: videogame.id || 'NOT FOUND',
      name: videogame.name || 'NOT FOUND',
      description: videogame.description || 'NOT FOUND',
      image: videogame.background_image || 'NOT FOUND',
      released: videogame.released || 'NOT FOUND',
      rating: videogame.rating || 'NOT FOUND',
      genres: videogame.genres.map((genres) => genres.name).join(', ') || 'NOT FOUND',
      platforms: videogame.platforms.map((platform) => platform.platform.name)
    }));

    allVideogames = allVideogames.concat(videogames);

    if (data.next && limit > 0) {
      console.log(`Next URL: ${data.next}`);
      return fetchAllVideogames(data.next, allVideogames, retries, limit - 1);
    } else {
      return allVideogames;
    }
  } catch (error) {
    console.error(`Error fetching data from API (retries left: ${retries}):`, error.message);
    if (retries > 0) {
      return fetchAllVideogames(url, allVideogames, retries - 1, limit);
    } else {
      throw new Error('Error fetching data from API');
    }
  }
}

//aca se crea la funcion que se encarga de hacer la consulta a la api 

async function getAllVideogames(req, res) {
  try {
    const initialUrl = 'https://api.rawg.io/api/games?key=9fbcb62b74ed4a7895eeb6f79f8c56d2&page_size=40';
    const videogames = await fetchAllVideogames(initialUrl);

    //intento de traer cosas de db
    const videogamesDb = await Videogame.findAll({
      attributes: ['id', 'name', 'released', 'platforms', 'rating', 'image', 'description'],
      include: [{
        model: Genres,
        through: {
          model: relations_table
        },
        attributes: ['name']
      }]
    });

    const formatVideogames = videogamesDb.map(videoGame => ({
      id: videoGame.id,
      name: videoGame.name,
      released: videoGame.released,
      platforms: videoGame.platforms,
      genres: videoGame.Genres.map(genre => genre.name).join(', ') || 'NOT FOUND',
      rating: videoGame.rating,
      image: videoGame.image,
      description: videoGame.description
    }));

    //aca se combinan los datos de la db y la API
    const videogamesApiDb = [...formatVideogames, ...videogames]
    res.status(200).json(
      videogamesApiDb
    );
  } catch (error) {
    console.error('Final error:', error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllVideogames,
};