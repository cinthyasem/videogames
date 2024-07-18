// controllers/genresController.js
const Genres  = require('../models/Genres');

async function getGenres2(req, res) {
  try {
    const genres = await Genres.findAll({
      attributes: ['id', 'name']
    });
    res.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getGenres2 };
