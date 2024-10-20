const axios = require('axios');
const { Genres } = require('../db');

async function getGenres(req, res) {
    try {
        // Consultamos los géneros desde la API
        const response = await axios.get('https://api.rawg.io/api/genres?key=a82ae7739d4e49ccb508e03c46b7ec8c');
        const genres = response.data.results.map((genre) => genre.name); // Obtenemos solo los nombres de los géneros

        
        // Guardamos los géneros en la base de datos
        const genrePromises = genres.map(async (genre) => {
            await Genres.findOrCreate({
                where: { name: genre }
            });
        });
        await Promise.all(genrePromises);

        // Respuesta con los géneros que obtuvimos y guardamos
        res.json(genres);
    } catch (error) {
        console.error('Error fetching videogame data:', error.message);
        res.status(500).json({ error: 'Error fetching videogame data' });
    }
}

module.exports = {
    getGenres
}

