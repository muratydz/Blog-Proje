import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Headers from './compoments/Headers'
import Home from './page/Home'
import About from './page/About'
import SignIn from './page/SignIn'
import OnlyAdminPrivateRoute from './compoments/OnlyAdminPrivateRoute'
import AdminPanel from './page/AdminPanel'

function App() {

  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/admin-signin' element={<SignIn />} />
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/admin-panel' element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
