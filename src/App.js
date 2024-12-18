import React from 'react'
import "./styles/bootstrap/css/bootstrap.min.css"
import Navbar from './components/pages/Navbar'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from "./components/pages/Home/HomePage"
import { SinglePage } from './components/watch/SinglePage'
import { Footer } from './components/footer/Footer'
import GenrePage from './components/pages/Genre/GenrePage'

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path='/singlepage/:id' element={<SinglePage />} />
          <Route path='/genre/:id' element={<GenrePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
