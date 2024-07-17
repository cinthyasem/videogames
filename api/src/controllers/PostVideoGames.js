const { Videogame, Genres, sequelize } = require ('../db')

async function postVideoGames (req, res) {
    const { name, description, platforms, genres, image, released, rating } = req.body

    try{
        const newVideogame = await Videogame.create({
            name, 
            description, 
            platforms, 
            image, 
            released, 
            rating,

        })


        if (genres && genres.length>0){
            const genreIds = [];
            for (let genreName of genres){
                let [genre] = await Genres.findOrCreate({
                    where: {name: genreName},
                })
                genreIds.push(genre.id)
            }
   
    
            await newVideogame.addGenres(genreIds)
        }

        res.status(201).json({ message: 'Videogame created successfully' });
  }     catch (error) {
        console.error('Error creating videogame:', error);
        res.status(500).json({ error: 'Error creating videogame' });
  }
}

module.exports = {
    postVideoGames,
};