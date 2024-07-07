const axios = require ('axios');

async function getVideoGamesByID( req, res){
    
    try {
    const { id } = req.params;

    const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=a82ae7739d4e49ccb508e03c46b7ec8c`);
   

    const responseData = response.data;

    // Crea el objeto videogame con los datos extraídos
    const videogame = {

      id: responseData.id || 'NOT FOUND',
      name: responseData.name || 'NOT FOUND',
      description: responseData.description_raw || 'NOT FOUND', // Usamos 'description_raw' para obtener una descripción completa
      image: responseData.background_image || 'NOT FOUND',
      released: responseData.released || 'NOT FOUND',
      rating: responseData.rating || 'NOT FOUND',
      platforms: responseData.platforms ? responseData.platforms.map(platform => platform.platform.name) : 'NOT FOUND'
    };

    // Envía los datos del videojuego como respuesta
    res.status(200).json(videogame);
  } catch (error) {
    console.error('Error fetching videogame data:', error.message);
    res.status(500).json({ error: 'Error fetching videogame data' });
  }
}

module.exports = {
  getVideoGamesByID,
};