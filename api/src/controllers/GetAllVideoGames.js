const axios = require ('axios')

async function getAllVideoGames (req, res) {
   
    try {
        // Realiza la solicitud a la API
        const apiResponse = await axios.get('https://api.rawg.io/api/games?key=9fbcb62b74ed4a7895eeb6f79f8c56d2');
        //con .data estamos accediendo a toda la info
        const apiData = apiResponse.data.results.map((videogame) => ({
            //aqui estamos filtrando u ordenando la info 
            id: videogame.id || 'NOT FOUND',
            name: videogame.name || 'NOT FOUND',
            description: videogame.description  || 'NOT FOUND',
            image: videogame.background_image || 'NOT FOUND',
            updated: videogame.updated || 'NOT FOUND',
            rating: videogame.rating || 'NOT FOUND',
            platforms: videogame.platforms.map((platform) => {
                return platform.platform.name
            })
        }));
    
        


        // Envía los datos de los videojuegos como respuesta
        res.status(200).json(apiData);
      } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud a la API
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ error: 'Error fetching data from API' });
      }
    }
    
    module.exports = {
      getAllVideoGames,
    };