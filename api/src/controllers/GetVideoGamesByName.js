const axios = require ( 'axios');

async function getVideoGameByName ( req, res){

    const { name } = req.params;

    try {
    
        const apiResponse = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=9fbcb62b74ed4a7895eeb6f79f8c56d2`);
        const apiVideoGame = apiResponse.data.results.map((videogame) => ({
            //aqui estamos filtrando u ordenando la info 
            id: videogame.id || 'NOT FOUND',
            name: videogame.name || 'NOT FOUND',
            description: videogame.description  || 'NOT FOUND',
            image: videogame.background_image || 'NOT FOUND',
            released: videogame.released|| 'NOT FOUND',
            rating: videogame.rating || 'NOT FOUND',
            platforms: videogame.platforms.map((platform) => {
                return platform.platform.name
           }) 
        }));

    
res.status(200).json(apiVideoGame);
} catch (error) {
    console.error('Error fetching video game data:', error.message);
    res.status(500).json({ error: 'Error fetching video game data' });
}
}

module.exports = {
getVideoGameByName,
};