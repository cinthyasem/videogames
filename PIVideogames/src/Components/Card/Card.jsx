import './Card.css' 
import { Link } from 'react-router-dom'

function Card ({ id, name, image, released, rating, platforms}){
    
    return (
        <div> 
            <div className="Card">
                <Link to={`/detail/${id}`}>
                    <div className="Sub_Card">
                        <strong className="Id_Card"> {id} </strong>
                        <h4 className="Card_h4"> Rating: { rating } </h4>
                        <h4 className="Card_h4"> Released: { released } </h4>
                        <h2 className="Name_Card"> Name: { name }</h2>
                        <img className="Image_Card" src={ image } />
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Card;