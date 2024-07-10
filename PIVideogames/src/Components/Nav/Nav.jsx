import "./Nav.css"
//estamos importando un metodo de react router Dom para las rutas
import { Link } from 'react-router-dom'


function Nav( ){


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
                <input type="text"
                       className="inputNav" />
                <button>Search</button>

            </div>
        </div>
    )
}

export default Nav;