import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Headers from './compoments/Headers'
import Home from './page/Home'
import About from './page/About'
import SignIn from './page/SignIn'

function App() {

  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/admin-signin' element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
