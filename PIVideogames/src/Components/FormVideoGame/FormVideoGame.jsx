import './FormVideoGame.css'
import { useState } from 'react';


function FormVideoGame (){
    const [data, setData] = useState({
        name: '',
        released: '',
        platforms: '',
        genres: [],
        rating: '',
        image: '',
        description: '',
        
    });

    //esta es nuestra funcion para setear el estado con los input
    //esta funcion sirve para tomar los datos del input(en los div) y pasarselos a la funcion 
    //que envia los datos al back
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
            });
            };

        console.log(data);   
        
    
    //esta es nuetsra funcion que envia los datos de nuestro formulario al back
    const submit = async (e) => {
        e.preventDefault();

        const errors = validate(data)

        if (Object.keys(errors).length > 0) {
          const errorMessage = Object.values(errors)[0]; // Obtener el primer mensaje de error
          return alert(errorMessage);
        }

        try {
            const postVideogame = await fetch('http://localhost:3001/postVideoGames', {
                method: 'POST',
                headers: {
                    Accept:'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    });
            
                alert('Your VideoGame have been posted succesfully!')
                    
                setData({
                    name: '',
                    description: '',
                    platforms: '',
                    image: '',
                    released: '',
                    rating: '',
                    genres: [],
                })

        } catch (error) {
            console.error('There is an error with the VideoGame:', error)
        }
    }


    //esta funcion es para validar los datos que ingresa el cliente 
    //ej: que no permita campos vacios o, informacion erronea.
    const validate = (input) => {

        


        let errors = {};
        if (!input.name) {
            errors.name = 'The name is required';
        } else if (!/^[A-Za-z0-9\s]+$/.test(input.name)) {
            errors.name = 'The name can only contain letters, numbers, and spaces';
        } else if (input.name.length > 20) {
            errors.name = 'The name is too long';
        } else if (input.name.length < 2) {
            errors.name = 'The name is too short';
        }


                
        if (!input.released) {
            errors.released = 'The realesed date is  required.';
        } 



        if (!input.platforms) {
            errors.platforms = 'The platforms are required.';
        }


        if (!input.genres) {
            errors.genres = 'The genres are required.';
        }



        if (!input.rating) {
            errors.rating = 'The rating is required.';
        } else if (isNaN(input.rating) || input.rating < 0 || input.rating > 5) { //isNan = is not a number
            errors.rating = 'The rating most be a number between 0 and 5.';
        }



        if (!input.image) {
            errors.image = 'The URL is required.';
        } else if (input.image.length > 256 ) {
            errors.image = 'The URL is too long'
        }

        



        if (!input.description) {
            errors.description = 'La descripción es obligatoria.';
        } else if (input.description.length < 50) {
            errors.description = 'The description is too long. It most contained 100 characteres.';
        } else if (input.description.length > 256) {
            errors.description = 'The description is too short. It most conttained 200 characteres.';
        }

        return errors;
    };
    


    return(
        
        <div>
            <form className='FormVideoGame' action='POST' onSubmit={submit}>
                <div>
                    <h1>Create Your VideoGame</h1>
                    <h1>You can add more than one genre and Platform to your VideoGame</h1>
                    <div className='divInputLabel'>
                        <label>Name:</label>
                        <input 
                            onChange={handleInputChange}
                            type='text' 
                            name='name' 
                            placeholder='name'
                            value={data.name}
                        />
                    </div>
                    
                    <div className='divInputLabel'>
                        <label>Released:</label>
                        <input
                            onChange={handleInputChange}
                            type='date'
                            name='released'
                            placeholder='DD/MM/YYYY'
                            value={data.released}
                            maxLength='8'
                        />
                    </div>

                    <div className='divInputLabel'>
                        <label>Platforms:</label>
                        <input 
                            onChange={handleInputChange}
                            type='text' 
                            name='platforms' 
                            placeholder='platforms'
                            value={data.platforms}
                        />
                    </div>

                    <div className='divInputLabel'>
                        <label>Genres:</label>
                        <input 
                            onChange={handleInputChange}
                            type='text' 
                            name='genres' 
                            placeholder='genres'
                            value={data.genres}
                        />
                    </div>
                    
                    <div className='divInputLabel'>
                        <label>Rating:</label>
                        <input 
                            onChange={handleInputChange}
                            type='text' 
                            name='rating' 
                            placeholder='rating'
                            value={data.rating}
                        />
                    </div>

                    <div className='divInputLabel'>
                        <label>Image:</label>
                        <input
                            onChange={handleInputChange}
                            type='text' 
                            name='image' 
                            placeholder='image'
                            value={data.image}
                        />
                    </div>

                    <div className='divInputLabel'>
                        <label>Description:</label>
                        <textarea 
                            onChange={handleInputChange}
                            type='text' 
                            name='description' 
                            placeholder='description'
                            value={data.description}
                        />
                    </div>

                    <div className='divButton'>
                        <input className='buttonCreate' type="submit" value="Create" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormVideoGame;
