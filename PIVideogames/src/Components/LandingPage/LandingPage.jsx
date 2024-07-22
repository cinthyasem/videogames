import { Link } from 'react-router-dom'
import './LandingPage.css' 
import imgFornite from "../../assets/personajesLanding/fornite_d.png"
import imgPrincesaMario from "../../assets/personajesLanding/princessaMario.png"
import imgAngel1 from "../../assets/personajesLanding/angel1.png"
import imgPubg from "../../assets/personajesLanding/pubg_d.png"


function LandingPage (){
    
    return (
        

        <div className="bienvenida-container">
            <div className="bienvenida-texto">
                <h1>Bienvenido al PI VideoGames</h1>

                <Link to='/home'>
                        <button className="buttonHome">Home</button>
                </Link>
            </div>
            <img src={imgFornite} alt="Personaje 1" className="esquina esquina-1" />
            <img src={imgAngel1} alt="Personaje 2" className="esquina esquina-2" />
            <img src={imgPrincesaMario} alt="Personaje 3" className="esquina esquina-3" />
            <img src={imgPubg} alt="Personaje 4" className="esquina esquina-4" />
        </div>  

    )
}

export default LandingPage;