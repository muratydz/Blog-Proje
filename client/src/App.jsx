import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Headers from './compoments/Headers'
import Home from './page/Home'
import About from './page/About'
import AdminSignUp from './page/AdminSignUp'

function App() {

  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/adminpage' element={<AdminSignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
