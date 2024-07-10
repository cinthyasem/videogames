import { Link } from 'react-router-dom'
import './LandingPage.css' 

function LandingPage (){
    
    return (
        <div className="landing-page"> 
            <h1>Bienvenido al PI VideoGames</h1>

            <Link to='/home'>
                    <button className="buttonHome">Home</button>
            </Link>
        </div>

    )
}

export default LandingPage;