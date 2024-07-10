import { useSelector } from 'react-redux'
import Card from '../Card/Card';

function Home (){

    const games = useSelector((state) => state.games);
    console.log(games);

    return (
        <div>
            <div className="CardsContainer">
                {games.map((game) => (
                    <Card
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        image={game.image}
                        released={game.released}
                        rating={game.rating}
                        platforms={game.platforms}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;