import './Card.css' //aqui importamos los estilos de card
import { Link } from 'react-router-dom'

//aqui estoy definiendo mi componente funcional card y sus props
function Card ({ id, name, image, released, rating, platforms, genres}){
    
    //defino como se va a mostrar mi componente
    return (
        <div> 
            <div className="Card">
                <Link to={`/detail/${id}`}>

                    <div className="Sub_Card">
                        <h2 className="Name_Card">  { name }</h2>
                        <strong className="Id_Card"> {id} </strong>
                        <h4 className='Genre_Card'>Genre: {genres}</h4>
                        <h4 className="Card_h4"> Rating: { rating } </h4>
                        <h4 className="Card_h4"> Released: { released } </h4>
                        <img className="Image_Card" src={ image } />
                        
                    </div>

                </Link>



            </div>
        </div>
    )
}

export default Card;