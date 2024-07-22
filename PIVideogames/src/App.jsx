//ESTE ES PARA IMPORTAR METODOS DE REACT REDUX
import { useDispatch } from "react-redux"
import { fetchAllVideogames } from "./redux/reducers/gamesSlice"
//estos import son para poder usar los componentes 
import FormVideoGame from "./Components/FormVideoGame/FormVideoGame"
import Home from "./Components/Home/Home"
import Nav from "./Components/Nav/Nav"
import LandingPage from "./Components/LandingPage/LandingPage"
//el import 8 son metodos de router dom PARA CONFIGURAR LAS RUTAS
import { Routes, Route, useLocation  } from 'react-router-dom'
//esto es para poder usar el metodo useEffect
import { useEffect, useState } from "react"
import Detail from "./Components/Detail/Detail"
import "./App.css"



function App() {
  //en este estado tenemos el input de Nav 
  const [searchString, setSearchString] = useState ('')
  //esta funcion toma el valor del input y setea el estado (el input que tenemos en Nav)
  const handleChange = (e) => {
      setSearchString(e.target.value)
  
  }
  
   

  const { pathname } = useLocation ();

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllVideogames());
  }, [dispatch]);
 

    //si el pathname es distinto a '/'se va a mostrar la barra de navegacion 
  return (
    <div className="divApp">
    
    { pathname !== '/' && 
      <Nav handleChange = {handleChange} /> }
    
      
        <Routes> 
         <Route path="/" element={<LandingPage/>}/>
         <Route path="/home" element={<Home searchString = {searchString}/>} />
         <Route path="/form" element={<FormVideoGame/>}/>
         <Route path="/detail/:id" element={<Detail/>}/>
        </Routes>
      
    </div>
  )
}

export default App
