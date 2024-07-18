import "./Nav.css"
//estamos importando un metodo de react router Dom para las rutas
import { Link } from 'react-router-dom'


function Nav( { handleChange } ){

    
    return (
        <div className="divNav">

            <div>
                <Link to='/home'>
                    <button className="buttonNav">Home</button>
                </Link>
                <Link to='/form'>
                    <button className="buttonNav">Create Video Game</button>
                </Link>
                
            </div>
            <div>
                <input 
                    onChange={handleChange}
                    type="text"
                    className="inputNav" />
               
            </div>
        </div>
    )
}

export default Nav;