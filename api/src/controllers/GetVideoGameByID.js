const { Videogame, Genres, relations_table } = require('../db'); // Asegúrate de ajustar la ruta según la estructura de tu proyecto
const axios = require('axios');

async function getVideogameByID(req, res) {
    try {
        const { id } = req.params;

        console.log(`Fetching videogame with ID: ${id}`);

        if (id.length > 5) {
            // Fetch videogame data from the database
            const videogame = await Videogame.findByPk(id, {
                attributes: ['id', 'name', 'description', 'released', 'rating', 'platforms', 'image'],
                include: [{
                    model: Genres,
                    through: {
                        model: relations_table
                    },
                    attributes: ['name']
                }]
            });

            if (videogame) {
                console.log(`Videogame found in database: ${videogame.name}`);
                const formatVideogame = {
                    id: videogame.id,
                    name: videogame.name,
                    description: videogame.description,
                    released: videogame.released,
                    rating: videogame.rating,
                    platforms: videogame.platforms,
                    image: videogame.image,
                    genres: videogame.Genres.map(genre => genre.name).join(', ') || 'NOT FOUND',
                };
                return res.status(200).json(formatVideogame); // Se usa return para asegurarnos de que la respuesta se envía
            } else {
                console.log('Videogame not found in database.');
                return res.status(404).json({ error: 'Videogame not found in database' }); // Responder si no se encuentra en la base de datos
            }
        } else {
            console.log('Fetching videogame from API.');
            
            // Fetch data from the API if not found in the database
            const apiResponse = await axios.get(`https://api.rawg.io/api/games/${id}?key=a82ae7739d4e49ccb508e03c46b7ec8c`);
            const apiData = apiResponse.data;

            console.log(`Videogame fetched from API: ${apiData.name}`);

            const apiVideogame = {
                id: apiData.id || 'NOT FOUND',
                name: apiData.name || 'NOT FOUND',
                description: apiData.description_raw || 'NOT FOUND',
                image: apiData.background_image || 'NOT FOUND',
                released: apiData.released || 'NOT FOUND',
                rating: apiData.rating || 'NOT FOUND',
                genres: apiData.genres.map(genre => genre.name).join(', ') || 'NOT FOUND',
                platforms: apiData.platforms ? apiData.platforms.map(platform => platform.platform.name).join(', ') : 'NOT FOUND'
            };

            return res.status(200).json(apiVideogame); // Se usa return para asegurarnos de que la respuesta se envía
        }
    } catch (error) {
        console.error('Error fetching videogame ID from the database:', error.message);
        return res.status(500).json({ error: 'Error fetching videogame ID from the database', details: error.message });
    }
}

module.exports = {
    getVideogameByID,
}
