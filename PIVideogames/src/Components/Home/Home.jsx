import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';
import './Home.css';


function Home( { searchString } ) {
    // Tomar el estado del store de redux para renderizar las cartas en el return
    const games = useSelector((state) => state.games);

    // Lógica para el paginado
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Lógica de filtros
    const [localFilters, setLocalFilters] = useState({
        id: 'All',
        name: '',
        genres: 'All',
        platforms: 'All',
        minRating: '', 
        maxRating: '',
        minReleased: '',
        maxReleased: '',
        nameOrder:'All',
        ratingOrder:'All',

    });

    
     // Actualizar localFilters.name cuando searchString cambie
     useEffect(() => {
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            name: searchString
        }));
    }, [searchString]);

    console.log(localFilters);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters({ ...localFilters, [name]: value });
    };

    // Filtrar juegos según los filtros locales
    const filteredGames = games.filter(game => {
        const { id, name, genres, platforms, minRating, maxRating, minReleased, maxReleased } = localFilters;
        
        const matchesName = game.name.toLowerCase().includes(name.toLowerCase());
        const matchesGenre = genres === 'All' || game.genres.includes(genres);
        const matchesPlatform = platforms === 'All' || game.platforms.includes(platforms);
        const matchesMinRating = minRating === '' || game.rating >= parseFloat(minRating);
        const matchesMaxRating = maxRating === '' || game.rating <= parseFloat(maxRating);
        const matchesMinReleased = minReleased === '' || new Date(game.released) >= new Date(minReleased);
        const matchesMaxReleased = maxReleased === '' || new Date(game.released) <= new Date(maxReleased);

        const isFromDataBase = id === 'DataBase';
        const isFromAPI = id === 'API';
        const idContainsLetters = /[a-zA-Z]/.test(`${game.id}`);
        
        if (id === 'All') {
            return matchesName && matchesGenre && matchesPlatform && matchesMinRating && matchesMaxRating && matchesMinReleased && matchesMaxReleased;
        } else if ((isFromDataBase && idContainsLetters) || (isFromAPI && !idContainsLetters)) {
            return matchesName && matchesGenre && matchesPlatform && matchesMinRating && matchesMaxRating && matchesMinReleased && matchesMaxReleased;
        }
        
        return false; 
    });

    // Lógica de ordenación
    const sortedGames = filteredGames.sort((a, b) => {
        if (localFilters.nameOrder === 'Ascendente') {
            return a.name.localeCompare(b.name);
        } else if (localFilters.nameOrder === 'Descendente') {
            return b.name.localeCompare(a.name);
        } else if (localFilters.ratingOrder === 'Ascendente') {
            return a.rating - b.rating;
        } else if (localFilters.ratingOrder === 'Descendente') {
            return b.rating - a.rating;
        }
        return 0;
    });

    // Calcular los productos que se mostrarán en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedGames.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage); 
    const totalPages = Math.ceil(sortedGames.length / itemsPerPage);

    // Funciones para cambiar de página
    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    // Reset current page to 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [localFilters]);

    return (
        <div>
            <div className='divFiltersCards'>
                <div className='filters'>
                    
                    <h1>Filters</h1>
                    <div>
                        <h3>Origin</h3>
                        <div>
                                <select name="id"
                                    onChange={handleInputChange}
                                    value={localFilters.id}
                                    >
                                    <option>All</option>
                                    <option>API</option>
                                    <option>DataBase </option>
                                </select>
                        </div>
                    </div>
                    <div>
                        <h3>Name</h3>
                        <select name="nameOrder"
                                onChange={handleInputChange}
                                value={localFilters.nameOrder}
                        >
                            <option value="All">All</option>
                            <option value="Ascendente">Ascendente</option>
                            <option value="Descendente">Descendente</option>
                        </select>

                    </div>
                    <div>
                        <h3>Genres</h3>
                        <div>
                            <select 
                                name='genres' 
                                onChange={handleInputChange} 
                                value={localFilters.genres}
                            >
                                <option>All</option>
                                <option>Action</option>
                                <option>RPG</option>
                                <option>Strategy</option>
                            </select>
                        </div>
                        
                    </div>
                    <div>
                        <h3>Released</h3>
                        <div>
                            <input 
                                type="date"
                                name='minReleased'   
                                onChange={handleInputChange} // Añadido onChange
                                value={localFilters.minReleased} // Añadido value
                            />
                            <input 
                                type="date"
                                name='maxReleased' 
                                onChange={handleInputChange} // Añadido onChange
                                value={localFilters.maxReleased} // Añadido value
                            />
                        </div>
                    </div>
                    <div>
                        <h3>Rating</h3>
                        <div>
                            <input 
                                type="text" 
                                name='minRating'
                                placeholder='minimum'
                                onChange={handleInputChange} // Añadido onChange
                                value={localFilters.minRating} // Añadido value
                            />
                            <input 
                                type='text'
                                name='maxRating'
                                placeholder='maximum'
                                onChange={handleInputChange} // Añadido onChange
                                value={localFilters.maxRating} // Añadido value
                            />
                        </div>
                        <div>
                            <h4>Ascendente o descendente</h4>
                                <select
                                name='ratingOrder'
                                onChange={handleInputChange}
                                value={localFilters.ratingOrder}
                                >
                                <option value="All">All</option>
                                <option value="Ascendente">Ascendete</option> 
                                <option value="Descendente">Descendente</option>
                                </select>
                    
                        </div>
                    </div>
                    <div>
                        <h3>Platforms</h3>
                        <div>
                            <select 
                                name='platforms' 
                                onChange={handleInputChange} // Añadido onChange
                                value={localFilters.platforms} // Añadido value
                            >
                                <option>All</option>
                                <option>PC</option>
                                <option>PS4</option>
                                <option>Xbox One</option>
                                <option>Switch</option>
                                <option>PS3</option>
                                <option>PS2</option>
                                <option>PS1</option>
                                <option>PS Vita</option>
                                <option>PS4 Pro</option>
                                <option>PS5</option>
                                <option>Xbox 360</option>
                                <option>Xbox</option>
                                <option>Xbox One X</option>
                                <option>3DS</option>
                                <option>Wii</option>
                                <option>Wii U</option>
                                <option>Android</option>
                                <option>iOS</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="CardsContainer">
                    {currentItems.length > 0 ? (
                        currentItems.map((game) => (
                            <Card
                                key={game.id}
                                id={game.id}
                                name={game.name}
                                image={game.image}
                                released={game.released}
                                rating={game.rating}
                                platforms={game.platforms}
                            />
                        ))
                    ) : (
                        <div className="NoContentMessage">There are no VideoGames with that name</div>
                    )}
                </div>
            </div>

            <div className="Pagination">
                <button className='flechas' onClick={handleFirstPage} disabled={currentPage === 1}>{'<<'}</button>
                <button className='flechas' onClick={handlePreviousPage} disabled={currentPage === 1}>{'<'}</button>
                <span>{`${currentPage} of ${totalPages}`}</span>
                <button className='flechas' onClick={handleNextPage} disabled={currentPage === totalPages}>{'>'}</button>
                <button className='flechas' onClick={handleLastPage} disabled={currentPage === totalPages}>{'>>'}</button>
            </div>
        </div>
    );
}

export default Home;
