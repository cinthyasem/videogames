import { useDispatch } from "react-redux"
import FormVideoGame from "./Components/FormVideoGame/FormVideoGame"
import Layout from "./Components/Layout/Layout"
import Nav from "./Components/Nav/Nav"
import { Routes, Route  } from 'react-router-dom'


function App() {
 

  return (
    <>
    <Nav />
      
        <Routes> 
         <Route path="/" element={<Layout/>}/>
         <Route path="/form" element={<FormVideoGame/>}/>

        </Routes>
      
    </>
  )
}

export default App
