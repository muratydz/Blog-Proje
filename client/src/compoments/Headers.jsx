import React from 'react'
import "../css/header.css"
import logo1 from "../image/logo1.png"
import { Link } from 'react-router-dom'

const Headers = () => {
  return (
    <div className='header'>
      <div className='container'>
        <div>
          <Link to={"/"} className='logo'>
            <img src={logo1} alt="logo" />
            <h1>Buse Knitting</h1>
          </Link>
        </div>
        <div className='link'>
          <Link to={"/"}>
            <h1>Home</h1>
          </Link>
          <Link to={"/about"}>
            <h1>About</h1>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Headers
