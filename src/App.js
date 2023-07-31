import React from 'react'
import "./styles/bootstrap/css/bootstrap.min.css"
import Navbar from './components/pages/Navbar'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import {HomePage} from "./components/pages/Home/HomePage.jsx"
import { Footer } from './components/footer/Footer'
import { SinglePage } from './components/watch/SinglePage'

const App = () => {
  return (
    <><Navbar />
      <Routes>
        <Route>
          <Route exact path = "/" element ={<HomePage/> }/>
          <Route path='/singlepage/:id' component={SinglePage} exact />         
        </Route>
      </Routes>
      <Footer />
   </>
  )
}

export default App
