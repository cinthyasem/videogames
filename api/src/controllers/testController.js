
const { relations_table, Videogame, Genres } = require('../db');


async function getVideoGamesFromDb(req, res) {


  try {
    const videogames = await Videogame.findAll({
      attributes: ['id', 'name', 'released', 'platforms', 'rating', 'image', 'description'],
      include: [{
        model: Genres,
        through: {
          model: relations_table
        },
        attributes: ['name']
      }]
    });

    const formatVideogames = videogames.map(videoGame => ({
      id: videoGame.id,
      name: videoGame.name,
      released: videoGame.released,
      platforms: videoGame.platforms,
      genres: videoGame.Genres.map(genre => genre.name) || '',
      rating: videoGame.rating,
      image: videoGame.image,
      description: videoGame.description
    }));

    res.json(formatVideogames);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching videogames', error });
  }
}

module.exports = { getVideoGamesFromDb };
