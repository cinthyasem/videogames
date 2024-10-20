import PropTypes from 'prop-types';
import "./Nav.css"
//estamos importando un metodo de react router Dom para las rutas
import { Link } from 'react-router-dom'


function Nav( { handleChange, searchString } ){

    
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
                    onChange= {handleChange}
                    value= {searchString}
                    type="text"
                    className="inputNav" 
                    placeholder="Search..."
                />
               
            </div>
        </div>
    )
}

//estas son validaciones para las props que le estamos pasando a nav 
Nav.propTypes = {
    handleChange: PropTypes.func.isRequired,
    searchString: PropTypes.string.isRequired,
};
export default Nav;