//ESTE ES PARA IMPORTAR METODOS DE REACT REDUX
import { useDispatch } from "react-redux"
import { fetchAllVideogames } from "./redux/reducers/gamesSlice"
//estos import son para poder usar los componentes 
import FormVideoGame from "./Components/FormVideoGame/FormVideoGame"
import Home from "./Components/Home/Home"
import Nav from "./Components/Nav/Nav"
import LandingPage from "./Components/LandingPage/LandingPage"
//el import 8 son metodos de router dom PARA CONFIGURAR LAS RUTAS
import { Routes, Route  } from 'react-router-dom'
//esto es para poder usar el metodo useEffect
import { useEffect } from "react"


function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllVideogames());
  }, [dispatch]);
 

  return (
    <>
    <Nav />
      
        <Routes> 
         <Route path="/" element={<LandingPage/>}/>
         <Route path="/home" element={<Home/>}/>
         <Route path="/form" element={<FormVideoGame/>}/>

        </Routes>
      
    </>
  )
}

export default App
