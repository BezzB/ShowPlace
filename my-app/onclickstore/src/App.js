import React from 'react'
import "./styles/bootstrap/css/bootstrap.min.css"
import Navbar from './components/pages/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import {HomePage} from "./components/HomePage.jsx"
import {Categories} from "./components/Categories.jsx"
import {About} from "./components/About.jsx"
import {Services} from "./components/Services.jsx"
import {Users} from "./components/Users.jsx"

const App = () => {
  return (
    <><Navbar /><div className='container'>
      <Routes>
        <Route>
          <Route path = "/homepage" element ={<HomePage />}/>
          <Route path = "/categories" element ={<Categories />}/>
          <Route path = "/about" element ={<About />}/>
          <Route path = "/services" element ={<Services />}/>
          <Route path = "/users" element ={<Users />}/>
        </Route>
      </Routes>

    </div></>
  )
}

export default App
