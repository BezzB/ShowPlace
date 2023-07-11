import React from 'react'
import "./styles/bootstrap/css/bootstrap.min.css"
import Navbar from './components/pages/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import {HomePage} from "./components/pages/Home/HomePage.jsx"
import {About} from "./components/About.jsx"
import {Services} from "./components/Services.jsx"
import {Users} from "./components/Users.jsx"
import { Footer } from './components/footer/Footer'
import { SinglePage } from './components/watch/SinglePage'

const App = () => {
  return (
    <><Navbar />
      <Routes>
        <Route>
          <Route exact path = "/homePage" element ={<HomePage/> }/>
          <Route path='/singlepage/:id' component={SinglePage} exact />
          <Route path = "/about" element ={<About />}/>
          <Route path = "/services" element ={<Services />}/>
          <Route path = "/users" element ={<Users />}/>
        </Route>
      </Routes>
      <Footer />
   </>
  )
}

export default App
